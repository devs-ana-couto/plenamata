<?php
class PKMeta {

	// Recupera os valores de um post e organiza de acordo com a estrutura de campos
	//
	// 	$item: ID do ítem, ou objeto do ítem
	//	$fields: Array de campos
	//	$data_type: Tipo de dada ( post, user, custom )
	//	$data_table: Tabela de dados, no caso de data_type = custom	
	//
	public static function db_data( $item, $fields = null, $data_type = 'post', $data_table = null ){

		// Remove os campos que não são processados por padrão
		PikiFields::remove_fields( $fields, true, 'no_proccess' );
		
		// Se o ítem já é um objeto
		if( is_object( $item ) ):
			
			$ID = $item->ID;
		
		// Buscando o objeto pelo ID
		else:

			// ID passado
			$ID = $item;

			// Buscamos o ítem de acordo com o tipo
			switch( $data_type ):

				// Custom data
				case 'custom':
					$item = get_custom( $ID, $data_table );
				break;
				
				// User
				case 'user':
					$item = get_user_by( 'id', $ID );
				break;

				// posts
				default:
					$item = get_post( $ID );
				break;

			endswitch;
		
		endif;

		// Recupera os meta dados
		if( $data_type == 'custom' ):

			$meta = get_custom_meta( $ID, $data_table, $fields );
		
		else:
		
			$meta = call_user_func( 'get_'. $data_type .'_meta', $ID );

			// Check if post is locked
			$meta_locked = _array_get( $meta, '_edit_lock' );
			
			if( $meta_locked ):
			
				list( $time, $user_id ) = explode( ':', reset( $meta_locked ) );

				$timelimit = $time + ( MINUTE_IN_SECONDS * 10 );
				$meta_locked = get_current_user_id() != $user_id  && time() < $timelimit;
			
			endif;
				
			$item->locked = $meta_locked;			
		
		endif;

		// Get auxiliar tables data
		if( !empty( $fields ) ):
		
			foreach( $fields as $f => &$field ):

				if( $field[ 'ftype' ] != 'fieldset' || empty( $field[ 'subfields' ] ) ) continue;

				$table = _array_get( $field, 'table' );

				if( !$table ) continue;

				$meta[ $field[ 'machine_name' ] ] = self::getAuxiliarTableData( $field, $ID );
				
			endforeach;

		endif;

		// Dados de usuário
		if( $data_type === 'user' ):
			
			$meta = array_merge( $meta, (array)$item->data );

			$meta[ 'user_pass' ] = '';
			$meta[ 'user_pass_confirm' ] = '';

			// Set array
			foreach( $meta as $i => $i_meta ):
				if( !is_array( $i_meta ) ):
					$meta[ $i ] = array( $i_meta );
				endif;
			endforeach;
		
		endif;

		// Item
		$meta[ 'post_item' ] = $item;

		// Organizando os dados
		if( !empty( $fields ) ):
		
			// Organiza os dados recuperados
			$organized = self::organize_meta_data( $fields, $meta, $data_type, $data_table );

			// Meta dados
			$item->meta = $organized;

		endif;
		
		// Retorna os dados organizados
		return $item;
	
	}

	public static function getAuxiliarTableData( $field, $parent_id ){

		global $wpdb;

		$table = _array_get( $field, 'table' );

		$q_fields = array( $table . '.ID' );
		foreach( $field[ 'subfields' ] as $subfield ):

			if( on( $subfield, 'no_proccess' ) ) continue;

			$q_fields[] = $table . ".". $subfield[ 'machine_name' ];

		endforeach;

		// Get results
		return $wpdb->get_results($wpdb->prepare(
			"SELECT " . implode( ',', $q_fields ) . " FROM " . $wpdb->prefix . $table . " AS " . $table . " WHERE " . $table . ".parent_type=%s AND $table.parent_id=%d",
			_array_get( $field, 'data_type' ), $parent_id
		), ARRAY_A );

	}

	// Organiza os valores
	public static function organize_meta_data( $fields, $meta, $data_type = 'post', $data_table = null ){

		// Se está vazio retorna falso
		if( !is_array( $meta ) || empty( $meta ) ):
			return false;
		endif;

		// ID do ítem
		$ID = $meta[ 'post_item' ]->ID;

		// Retorno
		$return = array();
		
		// Passando por cada campo
		foreach ( $fields as $key => $field ):
			
			// Valor existente no array
			$item_data = isset( $meta[ $field[ 'machine_name' ] ] ) ? $meta[ $field[ 'machine_name' ] ] : false;
			
			// Método customizado para recuperação de dados no banco
			if( method_exists( $field[ 'ftype' ], 'get_meta' ) ):
				$item_data = call_user_func( array( $field[ 'ftype' ], 'get_meta' ), $field, $ID, $data_type, $data_table );
			endif;

			// Método que formata o valor vindo do banco
			if( $item_data !== false && method_exists( $field[ 'ftype' ], 'db_decode' ) ):
				$item_data = call_user_func( array( $field[ 'ftype' ], 'db_decode' ), $field, $item_data );
				$data[ $field[ 'machine_name' ] ] = $item_data;
			endif;

			// Se existe um método próprio do campo para modificar os valores recuperados do banco
			if( method_exists( $field[ 'ftype' ], 'change_meta_values' ) ):	
				
				$return[ $field[ 'machine_name' ] ] = call_user_func( array( $field[ 'ftype' ], 'change_meta_values' ), $field, $meta, $data_type, $data_table );
			
			// Valores nos formatos padrões
			else:

				$return[ $field[ 'machine_name' ] ] = maybe_unserialize( $item_data );

			endif;

		endforeach;

		return empty( $return ) ? false : $return;
	
	}

	public static function field_render( $field, $options = null, $unique = true ){
		
		// Se não possui um valor
		if( !isset( $field[ 'value' ] ) || empty( $field[ 'value' ] ) ):
			return false;
		endif;
		
		// Tem que ser um array
		if( !is_array( $field[ 'value' ] ) ):
			$field[ 'value' ] = array( $field[ 'value' ] );
		endif;
		
		// Se é único, pega só o primeiro
		if( $unique ):
			$field[ 'value' ] = array_slice( $field[ 'value' ], 0, 1 );
		endif;
		
		// Método
		$method = method_exists( $field[ 'ftype' ], 'renderize_values' ) ? array( $field[ 'ftype' ], 'renderize_values' ) : false;
		$return = array();
		
		foreach ( $field[ 'value' ] as $key => $value ):
			
			if( $method ):
				$return[] = call_user_func( $method, $field, $value, $options );
			else:
				$return[] = is_array( $value ) ? implode( ', ', $value ) : $value;
			endif;

		endforeach;
		
		return implode( ', ', $return );
	
	}

    public static function add_files(){
        wp_enqueue_script( 'piki-meta-scripts', Piki::url( 'meta.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_enqueue_style( 'piki-meta-styles', Piki::url( 'meta.css', __FILE__ ) ); 
        add_action( 'wp_footer', array( 'PikiForms', 'add_iframe' ) );
	}

	public static function skip_edition( $field, $action ){
		return 
			// No processable fields
			on( $field, 'no_proccess' ) 
			|| 
			// Confirmations fields
			_array_get( $field, 'confirm_origin' ) 
			|| 
			// Not updatable fields
			( $action != 'insert' && on( $field, 'lock_edit' ) )
		;
	}

	public static function save_post_meta( $ID, $settings, $posted, $action = 'insert', $fieldset_name = false ){

		global $wpdb;
		
		error_log(
		    'save_post_meta',
		    0
		);
		
		// Fields
		$fields = _array_get( $settings, 'fields' );

		// Data type and table
		$data_type = _array_get( $settings, 'data_type', 'post' );
		$data_table = _array_get( $settings, 'data_table' );

		// Mantém todos os campos para o do_action
		$_fields = $fields;

		// Pevine data type vazio
		if( empty( $data_type ) ):
			$data_type = 'post';
		endif;

		if( $data_type == 'custom' ):

			// Se a tabela não foi informada
			if( empty( $data_table ) ):
				Piki::error( 'A tabela de dados no banco não foi informada.' );
			endif;
			
			// Valores
			$values = array();
			
			// Placeholders
			$sqlrpcs = array();

			// Formata os valores e adiciona os placeholders
			foreach( $_fields as $key => $field ):
				
				// Verifica se o campo não é processado	
				if( self::skip_edition( $field, $action ) ):
					continue;
				endif;

				// Valor
				$value = $posted[ $field[ 'machine_name' ] ];
				if ( method_exists( $field[ 'ftype' ], 'db_encode' ) ):
					$value = call_user_func( array( $field[ 'ftype' ], 'db_encode' ), $field, $value );
				endif;

				// Se é um array, serializamos
				if( is_array( $value ) ):
					$value = serialize( $value );
				endif;
				
				// Adiciona o valor na query
				$values[ $field[ 'machine_name' ] ] = $value;
				$sqlrpcs[] = $field[ 'sqlrpc' ];
			
			endforeach;

			// Updata no banco
            $result = $wpdb->update( 
				$wpdb->prefix . $data_table, 
				$values, 
				[ 'ID' => $ID ], 
				$sqlrpcs, 
				[ '%d' ]
			);

		else:

			// Remove os campos nativos, se existirem
			if( Piki::isRealAdmin() ):
				PikiFields::remove_fields( $_fields, [ 'title', 'body', 'excerpt' ] );
			endif;

			// Posts table fields
			$posts_table_query = [
				'values' => [],
				'queries' => [],
			];

			// Salva cada campo
			foreach( $_fields as $key => $field ):

				// Verifica se o campo não é processado	
				if( self::skip_edition( $field, $action ) ):
					continue;
				endif;
				
				// Valor do campo
				$value = _array_get( $posted, $field[ 'machine_name' ], false );

				// Tipo de data que o campo vai manipular
				$field[ 'data_type' ] = $data_type;

				// Salva os novos valores
				PKMeta::save_field_value( $field, $ID, $value, $data_type, $data_table );

				// Posts table fields
				if( on( $field, 'save_in_posts_table' ) ):

					// Encode para o Banco
					$db_encode = method_exists( $field[ 'ftype' ], 'db_encode' );
					if( $db_encode ):
						$value = call_user_func( [ $field[ 'ftype' ], 'db_encode' ], $field, $value );
					endif;

					// Boolean field
					if( $field[ 'ftype' ] == 'boolean' ):
						$value = ( $value === 'on' ) ? 1 : 0;
					endif;

					// Keep values
					$posts_table_query[ 'queries' ][] = $field[ 'machine_name' ] . ' = ' . call_user_func([ $field[ 'ftype' ], 'getReplacement' ]);
					$posts_table_query[ 'values' ][] = $value;
				
				endif;

			endforeach;

			if( !empty( $posts_table_query[ 'values' ] ) ):

				// Input ID
				$posts_table_query[ 'values' ][] = $ID;

				// Update fields
				$update_fields = implode( ',', $posts_table_query[ 'queries' ] );

				// Updata no banco
				$update = $wpdb->query($wpdb->prepare(
					"UPDATE $wpdb->posts SET $update_fields WHERE ID = %d",
					$posts_table_query[ 'values' ]
				));

			endif;

		endif;
		
		// Triggering actions
		do_action( 'piki_meta_saved_meta', $ID, $fields, $posted, $data_type, $data_table );

		return true;

	}

	// Verify if field value has changed
	public static function fild_values_changed( $field, $value, $before ){

		// New value
		$new_value = !is_array( $value ) ? serialize( array( $value ) ) : serialize( $value );
		
		// Old value
		$before_value = !is_array( $before ) ? serialize( array( $before ) ) : serialize( $before );
		
		// Compare
		return ( $new_value !== $before_value );
	
	}

	// Remove os valores de um campo
	public static function delete_post_meta( $ID, $settings, $values = false ){

		// Extract options
		$fields = _array_get( $settings, 'fields' );
		$data_type = _array_get( $settings, 'data_type', 'post' );
		$data_table = _array_get( $settings, 'data_table' );

		// Action
		$action = _array_get( $settings, 'action' );

		// Each field
		foreach( $fields as $f => $field ):

			// Fields that can't be edited
			if( PKMeta::skip_edition( $field, $action ) ) continue;
			
			// Value to compare
			$value = _array_get( $values, $field[ 'machine_name' ] );
			
			// Remove os valores atuais
			self::delete_field_value( $field, $ID, $data_type, $data_table, $value );
		
		endforeach;
	
	}

	// Salva o valor de um campo
	public static function save_field_value( $field, $ID, $value, $data_type = 'post', $table = false ){

		global $wpdb;

		$db_encode = method_exists( $field[ 'ftype' ], 'db_encode' );

		// Campos customizados
		if( $data_type == 'custom' ):

			// Encode para o Banco
			if( $db_encode ):
				$value = call_user_func( [ $field[ 'ftype' ], 'db_encode' ], $field, $value );
			endif;

			add_custom_meta( $field, $ID, $value, $table );
		
		// Post and User
		else:

			// Método específico do tipo de campo
			if( method_exists( $field[ 'ftype' ], 'save_meta' ) ):
				
				call_user_func( array( $field[ 'ftype' ], 'save_meta' ), $field, $ID, $value );				
			
			// Método padrão
			else:

				// Encode para o Banco
				if( $db_encode ):
					$value = call_user_func( [ $field[ 'ftype' ], 'db_encode' ], $field, $value );
				endif;
				
				call_user_func( 'add_'. $data_type .'_meta', $ID, $field[ 'machine_name' ], $value );
			
			endif;

		endif;
	}

	// Remove o valor de um campo
	public static function delete_field_value( $field, $ID, $data_type = 'post', $data_table = false, $value = false ){

		// Campos que não devem ter seus valores removidos
		if( on( $field, 'no_process' ) || on( $field, 'prevent_delete' ) ):
			return;
		endif;

		// Custom data
		if( $data_type == 'custom' ):
		
			delete_custom_meta( $field, $ID, $data_table, $value );
		
		// Posts data
		else:

			// Método customizado
			if( method_exists( $field[ 'ftype' ], 'delete_meta' ) ):
			
				call_user_func( array( $field[ 'ftype' ], 'delete_meta' ), $field, $ID, $data_type, $data_table, $value );
			
			// Método padrão
			else:				
			
				call_user_func( 'delete_'. $data_type .'_meta', $ID, $field[ 'machine_name' ] );
			
			endif;
		
		endif;
	
	}

	// Recupera o valor de um campo
	public static function get_field_value( $field, $ID, $data_type='post', $table = false ){

		// Custom data
		if( $data_type == 'custom' ):
			
			$values = get_custom_meta( $ID, $table, $field[ 'machine_name' ] );
		
		else:
			
			// Método específico do tipo de campo
			if ( method_exists( $field[ 'ftype' ], 'get_meta' ) ):
				$values = call_user_func( array( $field[ 'ftype' ], 'get_meta' ), $field, $ID );
			else:
				$values = call_user_func( 'get_' . $data_type . '_meta', $ID, $field[ 'machine_name' ] );
			endif;
		
		endif;

		// Método que formata o valor vindo do banco
		if( $values !== false && method_exists( $field[ 'ftype' ], 'db_decode' ) ):
			$values = call_user_func( array( $field[ 'ftype' ], 'db_decode' ), $field, $values );
		endif;

		// Evoca o método próprio do campo para altera o valor
		if( method_exists( $field[ 'ftype' ], 'change_meta_values' ) ):

			$meta = get_post_meta( $ID );
			$values = call_user_func( array( $field[ 'ftype' ], 'change_meta_values' ), $field, $meta, $data_type, $table );
		
		endif;
		
		return $values;
	
	}

}

class PostMeta extends EntityMeta {

	function __construct( $key = false, $extract = false ){


		$ID = EntityMeta::resolveID( $key );
		$item = is_object( $key ) ? $key : get_post( $ID );

		parent::__construct( $item, 'post', $extract );

	}

}

class UserMeta extends EntityMeta {
	
	function __construct( $key = false, $form_key = 'user', $extract = false ){

		global $__PK__USER_METAS;

		$ID = EntityMeta::resolveID( $key );
		$item = is_object( $key ) ? $key : get_userdata( $ID );

		parent::__construct( $item, 'user', $extract, $form_key );

	}

}

class EntityMeta {

	var $ID;
	var $item;
	var $items;
	var $fields;
	var $post_type;
	var $settings; 
	var $meta;
	var $values;
	var $extract;
	var $CACHE;

	function __construct( $item, $data_type = 'post', $extract = false, $form_key = false ){

		// Object item
		$this->item = $item;
		if( empty( $this->item ) ) return false;
		
		// Item ID
		$this->ID = $item->ID;

		// Se todos os campos devem ser extraídos para o mesmo nível
		$this->extract = $extract;
		
		// Configurações do tipo de post
		if( $data_type == 'user' ):
			$this->settings = PikiForms::get_form_settings([
                'key' => $form_key,
                'item' => $this->item
            ]);
		else:
			$this->settings = PikiForms::get_form_settings([
				'key' => $this->item->post_type, 
				'item' => $this->item
			]);
		endif;

		// Se não existe um form de configurações, buscamos campos registrados
		if( !$this->settings ):
			$this->fields = [];
		else:
			$this->fields = $this->settings[ 'fields' ];
			unset( $this->settings );
		endif;
		
		// Values
		$this->values = (object)array();
		
		// Meta dados do post
		$this->item = PKMeta::db_data( $this->item, $this->fields, $data_type );
	
		// Valores
		if( !empty( $this->fields ) ):
			$this->values = $this->configure_fields( $this->fields, $this->item->meta );
		endif;

	}

	function configure_fields( $fields, $meta ){

		$return = array();

		// Se os valores devem ser extraídos para o mesmo nível
		if( $this->extract ):
			
			// Campos
			foreach( $fields as $key => $field ):

				// Fieldsets
				if( $field[ 'ftype' ] === 'fieldset' ):

					// Campos
					$subs = isset( $field[ 'subfields' ] ) && !empty( $field[ 'subfields' ] ) ? $field[ 'subfields' ] : false;
					if( $subs ):
						unset( $fields[ $key ] );
						if( isset( $subs[ 'weight' ] ) ):
							unset( $subs[ 'weight' ] );
						endif;
						$fields = array_merge( $fields, $subs );
					endif;
					
					// Valores
					$values = isset( $meta[ $field[ 'machine_name' ] ] ) ? $meta[ $field[ 'machine_name' ] ] : false;
					if( !empty( $values ) ):
						$values = array_pop( $values );
						unset( $meta[ $field[ 'machine_name' ] ] );
					endif;
					$meta = array_merge( $meta, $values );
				
				endif;

			endforeach;

		endif;

		foreach( $fields as $key => &$field ):

			$value = isset( $meta[ $field[ 'machine_name' ] ] ) ? $meta[ $field[ 'machine_name' ] ] : false;

			if( $field[ 'ftype' ] === 'fieldset' ):

				// Allways array
				if( !is_array( $value  ) ):
					$value = [ $value ];
				endif;

				// Values
				$values_to_insert = array();
				foreach( $value as $_key => $_values ):
					$values_to_insert[] = $this->configure_fields( $field[ 'subfields' ], $_values );
				endforeach;

				// Get class
				$return[ $field[ 'machine_name' ] ] = new FieldsetMeta( $field, $value, $values_to_insert );
			
			else:
				
				$field[ 'value' ] = $value;
				$return[ $field[ 'machine_name' ] ] = new FieldMeta( $field );
			
			endif;

		endforeach;

		return (object)$return;

	}

	function exists( $mname ){		

		if( is_array( $mname ) ):

			list( $fset_name, $fname ) = $mname;
			return $this->values->{$fset_name}->exists( $fname );

		else:
			return isset( $this->values->{$mname} );
		endif;
	
	}

	function empty( $mname, $cond = false ){
	
		if( !isset( $this->values->{$mname} ) ):

			if( $cond ):
				exit( 'O campo ' . $mname . ' não existe.' );
			else:
				return true;
			endif;
		
		endif;
	
		return $this->values->{$mname}->isempty();
	
	}

	function render( $mname, $options = null ){

		if( !isset( $this->values->{$mname} ) ):
			exit( 'O campo ' . $mname . ' não existe.' );
		endif;

		// All ok
		if( is_object( $this->values->{$mname} ) && method_exists( $this->values->{$mname}, 'render' ) ):
			return $this->values->{$mname}->render( $options );
		endif;

		if( $this->values->{$mname}->field[ 'ftype' ] == 'fieldset' ):
			die( 'O campo do tipo "fieldset" não possui o método "render"' );
		endif;

	}

	function is_fieldset( $mname ){
		if( is_array( $this->values->{$mname}->field ) ):
			return $this->values->{$mname}->field[ 'ftype' ] == 'fieldset';
		else:
			return $this->values->{$mname}->field->ftype == 'fieldset';
		endif;
	}

	function post_name(){
		return $this->item->post_name;
	}

	function post_type(){
		return $this->item->post_type;
	}

	function getAll( $mname ){
		if( !isset( $this->values->{$mname} ) ):
			exit( 'O campo ' . $mname . ' não existe.' );
		endif;
		return $this->values->{$mname}->getAll();
	}

	function getFirst( $mname, $default = false ){

		if( !isset( $this->values->{$mname} ) ):

			echo '<pre>';
			echo 'O campo ' , $mname . ' não existe', '<br>';
			var_dump( debug_backtrace() );
			exit();
			
			exit( 'O campo ' . $mname . ' não existe.' );
		endif;
		
		return $this->values->{$mname}->getFirst( $default );
	
	}

	function getValues( $mname ){

		if( !isset( $this->values->{$mname} ) ):
			exit( 'O campo ' . $mname . ' não existe.' );
		endif;
		
		return $this->values->{$mname}->getValues();

	}

	function getType(){
		return $this->item->post_type;
	}

	function getTypeLabel( $singular = false ){
		$post_type = get_post_type_object( $this->item->post_type );
		if( $singular ):
			return $post_type->labels->singular_name;
		else:
			return $post_type->label;
		endif;
	}

	public static function resolveID( $KEY, $data_type = 'post' ){

		$ID = false;

		// Se foi passado um POST
		if( is_object( $KEY ) ):

			$ID = $KEY->ID;

		// numeric value
		elseif( intVal( $KEY ) > 0 ):

			// ID do Post
			$ID = $KEY;
		
		// Recupera um post pelo nome
		elseif( is_string( $KEY ) && intVal( $KEY ) === 0 && $KEY != '' ):

			if( $data_type == 'post' ):

				$this->item = $wpdb->get_row($wpdb->prepare(
					"SELECT * FROM $wpdb->posts WHERE post_type <> 'nav_menu_item' && post_name = %s",
					$KEY
				));

			else:

				echo '<pre>';
				echo 'Implements get user by login or email' . "\r\n";
				exit;
				
			endif;

		// Se naõ foi passado nada, pega o atual
		else:		

			if( $data_type == 'post' ):

				// ID do Post
				$ID = get_the_ID();

			else:

				// ID do usuário
				$ID = get_current_user_id();

			endif;
			
		endif;

		return $ID;

	}

}

// Fieldset
class FieldsetMeta {
	
	var $values = array();

	function __construct( $field, $values, $items ){

		$this->field = $field;
		$this->values = $values;
		$this->items = $items;

		return $this;

	}

	// Get first value
	public function getFirst(){
		if( $this->isempty() ) return false;
		return reset( $this->items );
	}

	// Get all values
	public function getAll(){
		if( $this->isempty() ) return false;
		return $this->items;
	}

	// Get just values
	public function getValues(){
		return $this->values;
	}

	public function exists( $key ){
		return isset( $this->field[ 'subfields' ][ $key ] );
	}

	// Check if is empty
	public function isempty(){

		if( empty( $this->values ) ) return true;

		foreach( $this->values as $row_values ):			

			if( empty( $row_values ) ) continue;

			if( !fieldset::_is_empty( $this->field[ 'subfields' ], $row_values ) ):
				return false;
			endif;

		endforeach;

		return true;
		
	}

	public function is( $ftype ){
		return $ftype == $this->field[ 'ftype' ];
	}

}

// Single field
class FieldMeta {

	var $field;
	var $value;
	var $ftype;
	var $render;

	function __construct( $field ){

		$this->field = (object)$field;

		$this->value = maybe_unserialize( $field[ 'value' ] );
		
		if( is_array( $this->value ) ):
			foreach( $this->value as &$item_value ):
				$item_value = maybe_unserialize( $item_value );
			endforeach;
		endif;
		
		// Tem que ser um array
		if( !is_array( $this->value ) ):
			$this->value = array( $this->value );
		endif;
	
	}

	public function getValues( $first = false ){

		// Valor vazio
		if( empty( $this->value ) ):
			return false;
		endif;
		// Se for um array, retornamos só o primeiro ítem
		if( $first == true ):
			$keys = array_keys( $this->value );
			return $this->value[ $keys[ 0 ] ];
		endif;
		// Retorna todos os valores
		return $this->value;
	
	}

	public function render( $options = null ){
		
		// Se não possui um valor
		if( !isset( $this->value ) || empty( $this->value ) ):
			return false;
		endif;

		// Método
		$this->render = _array_get( $options, 'render' );
		
		// Método
		if( empty( $this->render ) && method_exists( $this->field->ftype, 'renderize_values' ) ):
			$this->render = array( $this->field->ftype, 'renderize_values' );
		endif;

		$return = array();

		if( on( $this->field, 'multiple' ) ):
		
			// Renderiza cada valor
			foreach ( $this->value as $key => $value ):

				$return[] = $this->render_item( $value, $options );
			
			endforeach;

		else:

			// Single fields with multiple items
			if( _object_get( $this->field, 'maxitems' ) > 1 ):

				$value_to_pass = $this->value;

			// Default
			else:

				$values_keys = array_keys( $this->value );
				$value_to_pass = is_numeric( $keyfirst = array_shift( $values_keys ) ) ? $this->value[ $keyfirst ] : $this->value;

			endif;
			
			$return[] = $this->render_item( $value_to_pass, $options );

		endif;

		if( on( $options, 'get_object' ) || on( $options, 'make_object' ) || on( $options, 'get_array' ) || on( $options, 'make_array' ) ):
			return reset( $return );
		else:
			return implode( ', ', $return );
		endif;
	
	}

	public function render_item( $value, $options ){
			
		// Dados do campo para renderização
		$field_to_render = (array)$this->field;
		
		// Atruibuimos o valor ao campo
		$field_to_render[ 'value' ] = $value;
		
		// Se existe um método customizado para a renderização
		if( $this->render ):

			return call_user_func( $this->render, $field_to_render, $options );
		
		// Renderização padrão
		else:

			return is_array( $value ) ? implode( ', ', $value ) : $value;
		
		endif;

	}

	public function getFirst( $default = false ){
		if( $this->isempty() ) return $default;
		$value = $this->getValues( true );
		return is_array( $value ) ? reset( $value ) : $value;
	}

	public function isempty(){
		$toemtpy = (array)$this->field;
		$toemtpy[ 'value' ] = $this->value;
		return PikiField::is_empty_field( $toemtpy );
	}

	public function is( $ftype ){
		return $ftype == $this->field[ 'ftype' ];
	}

}

// Recupera os ítems de um tipo customizado
function get_customs( $table, $fields = array(), $orderby = 'created', $order = 'ASC' ){
    global $wpdb;
	// Fields
	if( empty( $fields ) ):
		$fields = array( 'ID', 'created', 'modified', 'status' );
	elseif( !is_array( $fields ) ):
		$fields = array( $fields );
	endif;
    // Query
    $table = $wpdb->prefix . $table;
    return $wpdb->get_results($wpdb->prepare(
    	"SELECT ". implode( ',', $fields ) ." FROM $table ORDER BY %s %s",
    	array( $orderby, $order ) 
    ));
}

// Recupera meta dados
function get_custom( $ID, $table ){

    global $wpdb;
    
    // Query
    $result = $wpdb->get_row($wpdb->prepare( 
        "SELECT ID, created, modified, status FROM $wpdb->prefix". $table ." WHERE ID = %d", 
        $ID
    ));

    // Tabela
    if( !empty( $result ) ):
        $result->table = $table;
    endif;

    return $result;

}

// Recupera custom meta
function get_custom_meta( $ID, $table, $fields = null ){
    global $wpdb;
    // Todos os campos
    if( empty( $fields ) ):
    	$fields = "*";
   	// Array de campos
   	elseif( is_array( $fields ) ):
   		$_fields = array();
   		foreach ( $fields as $key => $field ):
   			// Campo que não guarda dados
   			if( on( $field, 'no_process' ) ):
   				continue;
   			endif;
   			$_fields[] = $field[ 'machine_name' ];
   		endforeach;
   		$fields = implode( ',', $_fields );
   	endif;
	$query = $wpdb->prepare( 
        "SELECT ". $fields ." FROM $wpdb->prefix". $table ." WHERE ID = %d", 
        $ID
    );
    $result = $wpdb->get_row( $query, ARRAY_A );
    return $result;
}

// Adiciona custom meta
function add_custom_meta( $field, $ID, $value, $table ){
    echo '<pre>';
    var_dump( 'Implementar add_custom_meta' );
    exit;
}

// Atualiza custom meta
function update_custom_meta( $table, $ID, $field, $value ){
	global $wpdb;
	// Serializando arrays
	if( is_array( $value ) ){ $value = serialize( $value ); }
	// Tabela
	$table = $wpdb->prefix . $table;
	// Fazendo o update
	return $wpdb->query($wpdb->prepare( 
		"UPDATE $table SET $field = %s WHERE ID = %d", 
		array( $value, $ID )
	));
}

// Remove custom meta
function delete_custom_meta( $field, $ID, $table ){
    echo '<pre>';
    var_dump( 'Implementar delete_custom_meta' );
    exit;
}

/*
add_action( 'deleted_postmeta', function( $dis ){
	echo '<pre>';
	echo 'debug_backtrace()' . "\r\n";
	var_dump( debug_backtrace() );
	exit;
});
*/
