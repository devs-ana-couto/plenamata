<?php
// Autoload
function piki_fields_autoload( $className ){
	
	$filePath = Piki::path( __FILE__, 'widgets/' . $className . '/field.inc' );

	// Otheres plugins fields
	$filePath = apply_filters( 'pikifields_autoload', $filePath, $className );

	// Search for file
	if ( file_exists( $filePath ) ):
		require_once( $filePath );
	endif;

}
spl_autoload_register( 'piki_fields_autoload' );

class PikiFields {

	// Filters
	public static function theTitle( $title ){
		// Trim text
		$title = trim( $title );
		// Replace tags
		return text::tags( $title, true );
	}
	public static function titleForField( $title ){
		// Trim text
		$title = trim( $title );
		// Replace tags
		return text::clearTags( $title, true );
	}

	// Edition files
	public static function add_files(){
        wp_enqueue_script( 'post-types-scripts', Piki::minified( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	}

	// Prepare fields
	public static function prepare_fields( $fields, $settings = [] ){

		$return  = array();
		
		// Se não for passado um array de campos, ou se estiver vazio, retorn falso
		if( !is_array( $fields ) || empty( $fields ) ):
			return false;
		endif;

		// Se é passado apenas um campo
		$ftype_field = array_key_exists( 'ftype', $fields ) ? $fields[ 'ftype' ] : false;
		if( $ftype_field && ( !is_array( $ftype_field ) || !array_key_exists( 'ftype', $ftype_field ) ) ):
			$fields = array( $fields );
		endif;
		
		// Percorre o array de campos
		foreach ( $fields as $key => $field ):

			// Nome do campo definido pela chave do array
			if( !isset( $field[ 'machine_name' ] ) ):
				$field[ 'machine_name' ] = $key;
			endif;

			// Prepara o campo
			PikiField::prepare_field( $field, $settings );

			// False fields
			if( empty( $field ) ):
				unset( $fields[ $key ] );
				continue;
			endif;

			// Se o campo deve ser excluído do admin
			if( 
				( on( $field, 'just_admin' ) && !is_admin() ) 
				|| 
				( on( $field, 'just_front' ) && is_admin() )
				||
				$field[ 'ftype' ] == 'value'
			):
				continue;
			endif;

			// Se for um fieldset
			if( $field[ 'ftype' ] == 'fieldset' ):

				// Settings para o fielset
				$settings_to_fset = $settings;
				
				// Coloca o fieldset como parent dos subcampos
				if( isset( $settings_to_fset[ 'parents' ] ) && !empty( $settings_to_fset[ 'parents' ] ) ):
					if( is_array( $settings_to_fset[ 'parents' ] ) ):
						$settings_to_fset[ 'parents' ][] = $field[ 'machine_name' ];
					else:
						$settings_to_fset[ 'parents' ] = array( $settings_to_fset[ 'parents' ], $field[ 'machine_name' ] );
					endif;
				else:
					$settings_to_fset[ 'parents' ] = array( $field[ 'machine_name' ] );
				endif;
				
				// Configura os subcampos
				$field[ 'subfields' ] = self::prepare_fields( $field[ 'subfields' ], $settings_to_fset );

				// Se não sobrou nenhum campo
				if( empty( $field[ 'subfields' ] ) ):
					continue;
				endif;

			endif;
			
			// Adiciona o campo ao array de retorno
			$return[ $key ] = $field;

			// Double fields
			if( isset( $field[ 'double' ] ) && is_array( $field[ 'double' ] ) ):
				$return[ $field[ 'double' ][ 'machine_name' ] ] = $field[ 'double' ];
			endif;
		
		endforeach;

        // Permite que outros plugins altere as configurações do formulário
        $filtered = apply_filters( 'prepare_fields', $return, $settings );
        if( !is_null( $filtered ) ):
			$return = $filtered;
		endif;

		return $return;
	
	}

	// Remove campos de um array
	public static function remove_fields( &$fields, $to_remove, $key_compare = 'ftype' ){
		
		// Apenas se houverem campos 
		if( !$fields || empty( $fields ) ) return;
		
		// Se não for um array, encapsulamos
		if( !is_array( $to_remove ) ) $to_remove = array( $to_remove );
		
		// Passa pelos campos
		foreach ( $fields as $key => &$field ):
			
			// Se houverem subcampos
			if( isset( $field[ 'subfields' ] ) ):
				
				// Passa os subfields no loop
				self::remove_fields( $field[ 'subfields' ], $to_remove, $key_compare );
			
			// Se é um campo, removemos, se for o que procuramos
			elseif( isset( $field[ $key_compare ] ) && in_array( $field[ $key_compare ], $to_remove ) ):
				
				unset( $fields[ $key ] );
			
			endif;
		
		endforeach;
	
	}

	public static function get_comum_fields( $keys=array(), $exclude_defaults=false, $values=false ){

		$comums = array(
			'label' => array(
				'label' => __( 'Name', 'piki' ),
				'ftype' => 'text',
				'required' => true,
				'attr' => array( 'placeholder' => __( 'Type a name', 'piki' ) ),
			),
			'placeholder' => array(
				'label' => 'Placeholder',
				'ftype' => 'text',
				'required' => false,
				'attr' => array( 'placeholder' => __( 'Label within the field', 'piki' ) ),
			),
			'machine_name' => array(
				//'label' => 'ID único',
				//'desc' => 'Apenas letras, números e _',
				//'ftype' => 'text',
				'ftype' => 'hidden',
				'required' => true,
			),
			'description' => array(
				'label' => 'Descrição',
				'ftype' => 'text',
				'required' => false,
				'attr' => array( 'placeholder' => __( 'Type a description', 'piki' ) ),
			),
			'icone' => array(
				'label' => 'Ícone',
				'ftype' => 'text',
				'required' => false,
				'attr' => array( 'placeholder' => __( 'Enter the classname of an icon', 'piki' ) ),
			),
			'tooltip' => array(
				'label' => 'Tooltip',
				'ftype' => 'text',
				'required' => false,
				'attr' => array( 'placeholder' => __( 'Field Notes', 'piki' ) ),
			),
			'minlength' => array(
				'label' => __( 'Minimum number of characters', 'piki' ),
				'ftype' => 'number',
				'required' => false,
				'attr' => array( 'placeholder' => 'Ex: 3' ),
			),
			'maxlength' => array(
				'label' => __( 'Maximum number of characters', 'piki' ),
				'ftype' => 'number',
				'required' => false,
				'attr' => array( 'placeholder' => 'Ex: 255' ),
			),
			'ftype' => array(
				'ftype' => 'hidden',
				'required' => true,
			),
			'weight' => array(
				'ftype' => 'hidden',
				'default_value' => 0, 
			),
			'options' => array(
				'ftype' => 'textarea_options',
				'label' => 'Options',
				'description' => __( 'One value per line, in the format key|Value', 'piki' ),
			),
			'hide_label' => array(
				'label' => __( 'Hide label', 'piki' ),
				'ftype' => 'boolean',
				'hide_label' => false,
				'required' => false,
			),
			'required' => array(
				'label' => __( 'Required', 'piki' ),
				'ftype' => 'boolean',
				'hide_label' => true,
				'required' => false,
			),
			'unique' => array(
				'label' => __( 'Unique value', 'piki' ),
				'ftype' => 'boolean',
				'required' => false,
			),
			'multiple' => array(
				'label' => __( 'Multiple', 'piki' ),
				'ftype' => 'multiple',
				'required' => false,
			),
			'max_items' => array(
				'label' => __( 'Maximum items', 'piki' ),
				'ftype' => 'number',
				'hide_label' => false,
				'required' => false,
			),
			'confirm' => array(
				'label' => __( 'Confirm field?', 'piki' ),
				'ftype' => 'boolean',
				'hide_label' => false,
				'required' => false,
			),
			'just_admin' => array(
				'label' => 'Mostrar apenas no Admin',
				'ftype' => 'boolean',
				'hide_label' => true,
				'required' => false,
			),
			'just_front' => array(
				'label' => 'Mostrar apenas no front',
				'ftype' => 'boolean',
				'hide_label' => true,
				'required' => false,
			),
			'lock_edit' => array(
				'label' => __( 'Valor fixo na edição', '' ),
				'ftype' => 'boolean',
				'hide_label' => true,
				'required' => false,
			),
		);
 
		if ( !$exclude_defaults ) {
			$defaults = array( 'label', 'machine_name', 'description', 'icone', 'tooltip', 'required', 'unique', 'hide_label', 'ftype', 'just_admin', 'just_front' );
		}
		else {
			$defaults = array( 'ftype', 'machine_name' );
		}

		if( $keys === false ):
			$keys = array();
		elseif ( !is_array( $keys ) && isset( $comums[ $keys ] ) ):
			$keys = array( $keys );
		elseif( !is_array( $keys ) && !isset( $comums[ $keys ] ) ):
			return false;
		endif;

		$merged = array_unique( array_merge( $defaults, $keys ) );

		$fields = array();
		foreach ($merged as $i => $item) {
			$fields[ $item ] = $comums[ $item ];
		}

		if ( $values && is_array( $values ) ) {
			$fields = self::set_fields_values( $fields, $values );
		}

		return $fields;

	}

	public static function add_comum_field( &$fields, $keys ){
		$adds = self::get_comum_fields( $keys, true );
		$fields = $fields + $adds;
		return $fields;
	}

	// Atribui um array de valores, a um array de campos
	public static function set_fields_values( &$fields, $values ){
		foreach ($fields as $key => $field) {
			if ( array_key_exists( $key, $values ) ) {
				$fields[ $key ][ 'value' ] = $values[ $key ];
			}
		}
		return $fields;
	}

	// Extrai um campo do array de campos
	public static function extractFields( $fields, $key_name, $key_compare = 'machine_name', $filters = false ){
		return self::extract_field( $fields, $key_name, $key_compare, $filters );
	}

	// Extrai um campo do array de campos
	public static function extract_field( $fields, $key_name, $key_compare = 'machine_name', $first = true, $filters = false ){

		// Buscando fieldsets e campos já no primeiro nível do array
		if( $key_compare == 'machine_name' && !is_array( $key_name ) && isset( $fields[ $key_name ] ) ):
			return $fields[ $key_name ];
		endif;
		
		// Extrai todos os campos para a mesma dimensão no array
		$all = self::extract_all( $fields );
		
		// Campos encontrados
		$founded = array();
		
		// Busca os campos
		foreach ( $all as $key => $field ):

			// Filtrando o campo
			if( $filters && !self::filterField( $field, $filters ) ):
				continue;
			endif;

			// Se busca por várias chaves
			if( is_array( $key_name ) && in_array( $field[ $key_compare ], $key_name ) ):

				// Se busca a penas o primeiro campo
				if( $first === true ):
					return $field;
				endif;

				// Must be array
				if( !isset( $founded[ $field[ $key_compare ] ] ) ): 
					$founded[ $field[ $key_compare ] ] = array();
				endif;

				// Adiciona o campo no array da chave
				$founded[ $field[ $key_compare ] ][] = $field;

			// Se busca por uma única chave
			elseif( $field[ $key_compare ] == $key_name ):

				// Se busca a penas o primeiro campo
				if( $first ):
					return $field;
				endif;

				$founded[] = $field;

			endif;
		endforeach;

		// Se não existe nenhum campo 
		if( empty( $founded ) ):
			return false;
		endif;

		// Retorna o array de campos
		return $founded;

	}

	// Filtra um campo específico por chave
	public static function filterField( $field, $filters = false ){

		if( !$filters ) return $field;

		foreach( $filters as $fkey => $fval ):
			if( _array_get( $field, $fkey ) !== $fval ) return false;
		endforeach;

		return $field;

	}

	// Coloca todos os campos do form em um mesmo array, sem fieldsets
	public static function extract_all( $fields, $remove_fsets = false ){

		if( !$fields ):
			return array();
		endif;

		$all_fields = array();
		
		foreach ( $fields as $key => $field ) {
			if( isset( $field[ 'subfields' ] ) ):
				$tomerge = self::extract_all( $field[ 'subfields' ] );
				if( !empty( $tomerge ) ):
					$all_fields = array_merge( $all_fields, $tomerge );
				endif;
				if( $remove_fsets ):
					unset( $fields[ $key ] );
					if( isset( $fields[ 'weight' ] ) ):
						unset( $fields[ 'weight' ] );
					endif;
				endif;
			else:
				$all_fields[ $key ] = $field;
			endif;
		}
		
		return $all_fields;
	
	}

	public static function distributeFields( $groups, $fields ){

		foreach( $groups as &$group ):

			if( empty( $group[ 'fields' ] ) ) continue;

			$keyeds = [];
		
			foreach( $group[ 'fields' ] as $field_name ):

				// Get field
				$field = _array_get( $fields, $field_name );
				$keyeds[ $field_name ] = $field;
				unset( $fields[ $field_name ] );

				// Doubles fields
				$double = _array_get( $field, 'double' );
				if( $double ):

					$double_name = _array_get( $double, 'machine_name' );
					$keyeds[ $double_name ] = $fields[ $double_name ];
					unset( $fields[ $double_name ] );

				endif;
			
			endforeach;
		
			$group[ 'fields' ] = $keyeds;

		endforeach;
		
		return $groups;

	}

	public static function ajax_callback(){
		
		$ftype = _post( 'field_type' );
		$action = _post( 'field_action' );
		
		if( !method_exists( $ftype, $action ) ):
			Piki::error( 'O método ' . $action . ' da classe ' . $ftype . ' não existe.' );
		endif;
		
		call_user_func( array( $ftype, $action ) );
	
	}

	// Todos os tipos de campos
	public static function get_types(){
		
		STATIC $return;
		
		if( is_null( $return ) ):
			
			$fields = array( 
				'ano', 
				'avatar', 
				'body', 
				'boolean', 
				'boxtext', 
				'breakline', 
				'button', 
				'capabilities', 
				'cep',
				'checkboxes',
				'cidade',
				'classificacao_indicativa',
				'cnpj',
				'code',
				'colorpicker',
				'colors',
				'cpf',
				'crop',
				'custompath',
				'date',
				'datahora',
				'diassemana',
				'duracao',
				'email',
				'espaco',
				'excerpt',
				'fieldset',
				'file',
				'fileupload',
				'filewp',
				'gmap',
				'hidden',
				'horario',
				'image',
				'imagewp',
				'ingresso',
				//'interval',
				'mesano',
				'money',
				'multiple',
				'nivel_conhecimento',
				'number',
				'password',
				'post_connect',
				'posts_inside',
				'posttype',
				'radios',
				'record',
				'select',
				'serial',
				'step',
				'tags',
				'taxonomy',
				'taxonomy_select',
				'telephone',
				'termsuse',
				'text',
				'textarea',
				'textarea_lined',
				'textarea_options',
				//'timeinterval',
				'title',
				//'token',
				'uf',
				'ufcidade',
				'unidade',
				'url',
				'user_meta',
				'username',
				'vimeo',
				'youtube',
			);

			// Others Plugins fields
			$fields = apply_filters( 'pikifields_list', $fields );
 
			// Keys and Labels
			foreach ( $fields as $key => $field ) {
				$f = new $field;
				$return[ $field ] = $f->get_label();
			}

			// Ordena pelo título
			asort( $return );

		endif;

		return $return;

	}

	// Merge field with data
	public static function mergeWithData( $fields, $data ){

		// Se não temos dados
		if( !is_array( $data ) || empty( $data ) ): 
			return $fields; 
		endif;

		// Atribui o valor de cada campo
		foreach( $fields as $key => &$field ):
			
			// Field value
			if( method_exists( $field[ 'ftype' ], 'posted_values' ) ):				
				$field[ 'value' ] = call_user_func( array( $field[ 'ftype' ], 'posted_values' ), $field, $data );
			else:
				$field[ 'value' ] = _array_get( $data, $field[ 'machine_name' ], false );
			endif;

			// Confirm value
			if( isset( $field[ 'confirm_origin' ] ) ):
				$f_origin = PikiFields::extract_field( $fields, $field[ 'confirm_origin' ] );
				$field[ 'origin_value' ] = valida::getPostedFieldValues( $f_origin, $data );
			endif;
		
		endforeach;
		
		// retorna o array de campos com seus valores
		return $fields;
	
	}

}

// Classe do campo
class PikiField {

	static $piki_filetypes;
	static $piki_maxfilesize;
	static $label;

	public static function prepare_field( &$field, $settings ){

		// Merge with defaults
		$defaults = array(
			'machine_name' => '',
			'sqlrpc' => '',
			'ftype' => '',
			'data_type' => 'post',
			'data_table' => false,
			'label' => '',
			'placeholder' => '',
			'machine_name' => '',
			'description' => '',
			'desc_position' => 'above', //below
			'icone' => '',
			'tooltip' => '',
			'minlength' => 0,
			'maxlength' => 0,
			'weight' => 0,
			'options' => '',
			'hide_label' => false,
			'required' => false,
			'unique' => false,
			'multiple' => false,
			'max_items' => false,
			'just_admin' => false,
			'just_front' => false,
			'roles' => array(),
			'messages' => array(),
			'lock_edit' => false,
			'just_insert' => false
		);
		$field = array_merge( $defaults, $field );

		// Nome do campo
		$mname = $field[ 'machine_name' ];

		// Data type and table
		$field[ 'data_type' ] = _array_get( $settings, 'data_type' );
		$field[ 'data_table' ] = _array_get( $settings, 'data_table' );

		// Form key
		$field[ 'form_key' ] = _array_get( $settings, 'key' );

		// Form action
		$action = _array_get( $settings, 'action' );
		
		$field[ 'form_action' ] = $action;

		// Form settings
		$field[ 'form_settings' ] = $settings;

		// Pais do campo
		$parents = array();
		if( isset( $settings[ 'key' ] ) ):
			$parents[] = $settings[ 'key' ];
		endif;
		if( isset( $settings[ 'parents' ] ) ):
			if( !is_array( $settings[ 'parents' ] ) ):
				$settings[ 'parents' ] = array( $settings[ 'parents' ] );
			endif;
			$parents = array_merge( $parents, $settings[ 'parents' ] );
		endif;
		$field[ 'parents' ] = $parents;

		// Definindo os valores do campo
		if( empty( $field[ 'value' ] ) ):
			if( isset( $settings[ 'data' ][ $mname ] ) ):
				$field[ 'value' ] = $settings[ 'data' ][ $mname ];
			elseif( isset( $settings[ 'data' ][ 'post_meta' ][ $mname ] ) ):
				$field[ 'value' ] = $settings[ 'data' ][ 'post_meta' ][ $mname ];
			else:
				$field_value = false;
			endif;
		endif;

		// Método que seta as configurações especiais dos campos
		if( method_exists( $field[ 'ftype' ], 'set_confs' ) ):
			$field = call_user_func( array( $field[ 'ftype' ], 'set_confs' ), $field );
		endif;

		// Confirm fields
		$_confirm = _array_get( $field, 'confirm' );
		if( $_confirm && !( $action == 'edit' && _array_get( $field, 'lock_edit' ) ) ):
			$field[ 'double' ] = PikiField::confirmField( $field );
		endif;

		// Se o campo for setado para ser oculto, mudamos seu tipo para 'hidden'
		if( isset( $field[ 'hide' ] ) && $field[ 'hide' ] == true ):
			$field[ 'ftype' ] = "hidden";
		endif;

		// Action do form
		$field[ 'action' ] = _array_get( $settings, 'action', null );

		// Report
		$field[ 'report_type' ] = _array_get( $settings, 'error_fields', false );
		
		// Placeholder
		if( !is_admin() && on( $settings, 'placeholders' ) ):
			$field[ 'label_inside' ] = true;
		endif;
		
		// Se houver um método alternativo para a renderização do campo
		if( method_exists( $field[ 'ftype' ], 'prepare_fields' ) ):
			$field = call_user_func( array( $field[ 'ftype' ], 'prepare_fields' ), $field, $settings );
		endif;

		return $field;
		
	}

	public static function childsGroup( $field, $fields ){
 
		// Value
		$value = _array_get( $field, 'value' );
		if( is_array( $value ) && isset( $value[ 0 ] ) ) $value = unserialize( reset( $value ) );

		foreach( $fields as &$sub ):

			// Duplicate field settigns
			$_field = $field;
			$_field = PikiField::set_as_child( $_field, $sub[ 'machine_name' ] );
			$_field = array_merge( $_field, $sub );
			$_field[ 'value' ] = _array_get( $value, $sub[ 'machine_name' ] );
			$_field[ 'parents' ][] = $field[ 'machine_name' ];

			$sub = $_field;
		
		endforeach;

		return form::renderize_fields_form(
			[ 'fields' => $fields ],
			$field[ 'form_settings' ]
		);

	}

	// Check if field has minimum settings
	public static function check( &$field ){

		// Field type
		if( !isset( $field[ 'ftype' ] ) ):
			$ftype = get_called_class();
			if( !empty( $ftype ) ) $field[ 'ftype' ] = $ftype;
		endif;

		// ID
		if( !isset( $field[ 'id' ] ) ):
			$field[ 'id' ] = PikiField::get_field_id( $field );
		endif;

		// HTML name
		if( !isset( $field[ 'name_html' ] ) ):
			$field[ 'name_html' ] = PikiField::get_field_name( $field );
		endif;
	
	}

	public static function set_label( $label ){
		self::$label = $label;
	}

	public static function get_label(){
		return self::$label;
	}

	public static function is( $field, $prop ){
		if( !isset( $field[ $prop ] ) || $field[ $prop ] != 'on' ) return false;
		return true;
	}

	// Get value on meta array
	public static function get_value_from_meta( $field, $meta ){
		return _array_get( $meta, $field[ 'machine_name' ], false );
	}

	// Adicionando atributos
	public static function set_attributes( &$html, $field ){

		// Form settings
		$form_settings = _array_get( $field, 'form_settings' );

		//Seta o atributo maxlenght
		if( isset( $field[ 'maxlength' ] ) && !isset( $field[ 'attr' ][ 'maxlength' ] ) && !empty( $field[ 'maxlength' ] ) ):
			$attrs[ 'maxlength' ] = $field[ 'maxlength' ];
		endif;

		// Classes adicionais
		$attrs[ 'class' ] = array( 'ftype-' . str_replace( "_", "-", $field[ 'ftype' ] ) ); 
		if( isset( $field[ 'machine_name' ] ) ):
			$attrs[ 'class' ][] = $field[ 'machine_name' ];
		endif;

		// Required
		if( on( $field, 'required' ) ):
			$attrs[ 'class' ][] = 'required';
		endif;

		// Disabled
		if( on( $field, 'disabled' ) ):
			$attrs[ 'class' ][] = 'disabled';
			$html .= ' disabled="disabled"';
		endif;

		// Multiple
		if( PikiField::is_multiple( $field ) ):
			$attrs[ 'class' ][] = 'multiple';
		endif;

		// Disable
		$action = _array_get( $field, 'form_action' );
		if( on( $field, 'lock_edit' ) && $action == 'edit' ):
			$attrs[ 'disabled' ] = 'disabled';
		endif;

		// Machine name
		$attrs[ 'data-machine-name' ] = $field[ 'machine_name' ];

		// No cache
		$attrs[ 'autocomplete' ] = 'off';

		// Placeholder
		if( PikiForms::isMaterialize( $form_settings ) ):

			$html .= ' placeholder=" "';

		else:

			if( in_array( $field[ 'ftype' ], [ 'textarea', 'date', 'textarea_options', 'cep', 'cpf', 'title', 'text', 'password', 'email', 'number', 'telephone', 'money', 'url' ] ) ):

				$placeholder = _array_get( $field, 'placeholder' );
				if( $placeholder ):
					$html .= ' placeholder="'. $placeholder .'"';
				elseif( on( $field, 'label_inside' ) ):
					$html .= ' placeholder="'. $field[ 'label' ] .'"';
				endif;

			endif;
		
		endif;

		self::add_attributes( $field, $attrs );

		// Adittional attributes
		if( isset( $field[ 'attributes' ] ) ):
			self::add_attributes( $field, $field[ 'attributes' ] );
		endif;

		// Seta o atributo class
		if( isset( $field[ 'attr' ][ 'class' ] ) ):
			if ( is_array( $field[ 'attr' ][ 'class' ] ) ):
				$field[ 'attr' ][ 'class' ] = implode( ' ', array_unique( $field[ 'attr' ][ 'class' ] ) );
			endif;
			$html .= ' class="' . $field[ 'attr' ][ 'class' ] . '"';
			unset( $field[ 'attr' ][ 'class' ] );
		endif;
		
		// Seta o restante dos attributos			
		foreach( $field[ 'attr' ] as $attr => $value ){
			if( is_array( $value ) ):
				$value = implode( ' ', array_unique( $value ) );
			endif;
			$html .= ' ' . $attr . "='" . $value . "'";
		}

	}

	// Adicionando atributos
	public static function add_attributes( &$field, $attrs ){
		if ( !isset( $field[ 'attr' ] ) ):
			$field[ 'attr' ] = $attrs;
		else:
			$field[ 'attr' ] = array_merge_recursive( $field[ 'attr' ], $attrs );
		endif;
	}

	// Adicionando classes no CSS
	public static function add_classname( &$field, $class ){
		if( !is_array( $class ) ){ $class = array( $class ); }
		$tomerge = array( 'class' => $class );
		if( !isset( $field[ 'attr' ] ) ):
			$field[ 'attr' ] = $tomerge;
		else:
			$field[ 'attr' ] = array_merge_recursive( $field[ 'attr' ], $tomerge );
		endif;
	}

	// Setando um atributo específico
	
	public static function set_attribute( &$field, $attr, $value ){
		if ( !isset( $field[ 'attr' ] ) ):
			$field[ 'attr' ] = array( $attr => $value );
		else:
			$field[ 'attr' ][ $attr ] = $value;
		endif;
	}

	// Setando o campo como filho
	public static function set_as_child( &$field, $add_name, $group = false ){
		$field[ 'id' ] = self::get_subfield_id( $field, $add_name, $group );
		$field[ 'name_html' ] = self::get_subfield_name( $field, $add_name, $group );
		return $field;
	}

	// Retorna o nome do campo que será inserido no html
	public static function get_field_name( $field ){
		
		$name = '';
		// Se existem pais do campo
		if( is_array( $field[ 'parents' ] ) && !empty( $field[ 'parents' ] ) ):
			$name .= array_shift( $field[ 'parents' ] );
			// Campos pais
			if ( !empty( $field[ 'parents' ] ) ):
				$name .= '['. implode( '][', $field[ 'parents' ] )  .']';
			endif;
			$name .= '[' . $field[ 'machine_name' ] . ']';
		// Apenas o nome do campo
		else:
			$name .= $field[ 'machine_name' ];
		endif;
		// Se existe um índex para o campo
		if ( isset( $field[ 'item_index' ] )  ):
			$name .= '[' . $field[ 'item_index' ] . ']';
		endif;
		// Retorna o nome do campo
		return $name;
	}

	// Nome de um campo com multiplas opções
	public static function get_subfield_name( $field, $i, $group = false ){

		// Return
		$return = $field[ 'name_html' ];
		
		if( $group ):
			$return .= '[' . $group . ']';
		endif;
		
		$return .=  '[' . $i . ']';

		// Índex do campo
		if ( isset( $field[ 'index' ] ) ):
			$return .=  '['. $field[ 'index' ] .']';
		endif;

		return $return;

	}

	// Retorna o id do campo que será inserido no html
	public static function get_field_id( $field ){
		$id = '';
		// Se existem pais do campo
		if( is_array( $field[ 'parents' ] ) && !empty( $field[ 'parents' ] ) ):
			$id .= array_shift( $field[ 'parents' ] );
			// Campos pais
			if ( !empty( $field[ 'parents' ] ) ):
				$id .= '_'. implode( '_', $field[ 'parents' ] );
			endif;
			$id .= '_' . $field[ 'machine_name' ];
		// Apenas o nome do campo
		else:
			$id .= $field[ 'machine_name' ];
		endif;
		// Se existe um índex para o campo
		if ( isset( $field[ 'item_index' ] )  ):
			$id .= '_' . $field[ 'item_index' ];
		endif;
		// Retorna o nome do campo
		return $id;
	}

	// ID de um campo com multiplas opções
	public static function get_subfield_id( $field, $i, $group = false ){
		
		$return = array();
		
		// ID do form
		if( isset( $field[ 'form_id' ] ) )
			$return[] = $field[ 'form_id' ];
		
		// Campos pais
		if ( isset( $field[ 'parents' ] ) && count( $field[ 'parents' ] ) > 0  )
			$return[] = is_array( $field[ 'parents' ] ) ? implode( '_', $field[ 'parents' ] ) : $field[ 'parents' ];
		
		// Nome do campo
		$return[] = $field[ 'machine_name' ];
		
		// Índex do campo
		if ( $group ):
			$return[] = $group;
		endif;
		
		// Índice do campo
		$return[] = $i;
		
		// Índex do campo
		if ( isset( $field[ 'index' ] ) ):
			$return[] = $field[ 'index' ];
		endif;
		
		return implode( '_', $return );
	
	}

	// Recupera o valor de um campo
	public static function get_field_value( $field, $ID, $data_type = 'post', $data_table = null ){

		// Item values
		$post = PKMeta::db_data( $ID, null, $data_type, $data_table );

		// Meta values
		$meta = call_user_func( 'get_' . $data_type . '_meta', $ID );

		// Método específico do tipo de campo
		if ( method_exists( $field[ 'ftype' ], 'get_meta' ) ):
			
			$values = call_user_func( array( $field[ 'ftype' ], 'get_meta' ), $field, $ID );
		
		// Método padrão
		else:
			$values = _array_get( $meta, $field[ 'machine_name' ], array() );			
		
		endif;
				
		// Método que formata o valor vindo do banco
		if( method_exists( $field[ 'ftype' ], 'db_decode' ) ):
			$values = call_user_func( array( $field[ 'ftype' ], 'db_decode' ), $field, $values );
		endif;

		// Evoca o método próprio do campo para altera o valor
		if( method_exists( $field[ 'ftype' ], 'change_meta_values' ) ):
			
			$values = call_user_func( array( $field[ 'ftype' ], 'change_meta_values' ), $field, $meta );
		
		endif;
		
		return $values;
	
	}

	public static function get_real_value( $field ){
		if( isset( $field[ 'value' ] ) ):
			return $field[ 'value' ];
		elseif( isset( $field[ 'default_value' ] ) ):
			return $field[ 'default_value' ];
		else:
			return '';
		endif;
	}

	// Recupera o valor de um campo, em um array de valores
	public static function get_indexed_value( $field ){
		// Se não há um índex para o campo, setamos como 0
		if( !isset( $field[ 'field_index' ] ) ):
			$field[ 'field_index' ] = 0;
		endif;
		// Se não existe o valor
		if( !isset( $field[ 'value' ] ) ):
			return false;
		endif;
		// Se não for um array, retorna apenas o valor
		if( !is_array( $field[ 'value' ] ) ):
			return $field[ 'value' ];
		endif;
		// Se é um array, mas não existe o valor com a chave do campo
		if( !isset( $field[ 'value' ][ $field[ 'field_index' ] ] ) ):
			return false;
		endif;
		// Retorna o valor indexado
		return $field[ 'value' ][ $field[ 'field_index' ] ];
	}

	// Seta o valor de um campo
	public static function set_value( &$field, $confs ){
		
		$value = form::get_insert_value( $confs );
		
		switch( $confs[ 'ftype' ] ):
			
			case 'checkbox':
			case 'boolean':
				
				$field .= ' value="on"';
				if( $value == 'on' || $value == 'true' ):
					$field .= ' checked="checked"';
				endif;
			
			break;
			
			case 'textarea':
			case 'textarea_options':
				
				if( $value ):
					$field .= $value;
				elseif( isSet( $confs[ 'content' ] ) && !empty( $confs[ 'content' ] ) ):
					$field .= $confs[ 'content' ];
				endif;
			
			break;
			
			default:

				$field .= " value='" . stripslashes( $value ) ."'";
			
			break;
		
		endswitch;
	
	}

	// Recupera o valor postado para um campo
	public static function get_posted_value( $field, $fields, $posted ){
		
		// Se o campo possuir um método que extrai os valores postados
		if( method_exists( $field[ 'ftype' ], 'posted_values' ) ):
			
			return call_user_func( array( $field[ 'ftype' ], 'posted_values' ), $field, $posted );
		
		// Se o valor do campo está no array postado
		elseif( isset( $posted[ $field[ 'machine_name' ] ] ) ):
			
			return $posted[ $field[ 'machine_name' ] ];
		
		endif;
		
		// Se não tem, procuramos nos subcampos
		foreach( $fields as $key => $field_item ):
			
			// Se não há subcampos, passamos
			if( !isset( $field_item[ 'subfields' ] ) ):
				continue;
			endif;
			
			// Faz a verificação nos subcampos
			$to_group = isset( $posted[ $field_item[ 'machine_name' ] ] ) ? $posted[ $field_item[ 'machine_name' ] ] : $posted;
			// If is multiple, get first
			if( isset( $to_group[ 0 ] ) ):
				$to_group = $to_group[ 0 ];
			endif;
			
			$get_group_value = self::get_posted_value( $field, $field_item[ 'subfields' ], $to_group );
			
			if( $get_group_value ):
				return $get_group_value;
			endif;
		
		endforeach;
		
		return false;
	
	}

	// Verifica se o campo está vazio
	public static function is_empty_field( $field ){
		
		// Método peculiar do campo, se existir
		if( method_exists( $field[ 'ftype' ], 'is_empty' ) ):
			return call_user_func( array( $field[ 'ftype' ], 'is_empty' ), $field );
		endif;
		
		if( empty( $field[ 'value' ] ) ):
			return true;
		elseif( is_array( $field[ 'value' ] ) ):
			$first_value = array_shift( $field[ 'value' ] );
			if( empty( $first_value ) ):
				return true;
			endif;
		endif;

		return false;
	
	}

	// verifica se o campo é multiplo
	public static function is_multiple( $field ){
		return isset( $field[ 'multiple' ] ) && on( $field[ 'multiple' ], 'status' );
	}

	public static function check_bool( $field, $key_value ){
		return isset( $field[ $key_value ] ) && $field[ $key_value ] !== 'false' && $field[ $key_value ] !== false;
	}

	public static function max_items( $field ){
		// Se não é múltiplo
		if( !self::is_multiple( $field ) )
			return 1;
		// Retorna o valor setado nas configurações
		return (int)_array_get( $field[ 'multiple' ], 'maximo' );
	}

	public static function min_items( $field ){

		// Se não é múltiplo
		if( !self::is_multiple( $field ) ):
			return false;
		endif;

		// Get minimum option
		return intVal( _array_get( $field[ 'multiple' ], 'minimo' ) );

	}

	// Test if group of fields has required one
	public static function hasRequired( $fields ){
		
		// Get required columns
		$requireds = array_column( $fields, 'required' );
		// If has required options
		if( !empty( $requireds ) ):
			// Test each field
			foreach( $requireds as $reqstatus ):
				if( $reqstatus === true || $reqstatus === 'true' || $reqstatus === 'on' ):
					return true;
				endif;
			endforeach;
		endif;

		return false;
	
	}

	public static function init_items( $field ){
		// Se não é múltiplo
		if( !self::is_multiple( $field ) )
			return false;
		// Retorna o valor setado nas configurações
		$return = (int)_array_get( $field[ 'multiple' ], 'abertos', 1 );
		return $return < 1 ? 1 : $return;
	}

	// Adiciona parametros a um campo
	public static function field_add_parameter( &$field, $ftype, $parameter, $value=true){
		if( is_array( $parameter ) ){
			$field[ $ftype ] = array_merge( $field[ $ftype ], $parameter );
		}
		else{
			$field[ $ftype ][ $parameter ] = $value;
		}
	}

	// Retorna o primeiro valor de um array de valores de um campo
	public static function get_first_field_value( $value, $type = 'show_value' ){
		return $value[ 0 ][ $type ];
	}

	// Retorna a mensagem de um campo, de acordo com o erro
	public static function getDefaultErrorMessage( $field, $type_erro, $position, $alternative = false ){

		// Mensagens mostradas junto ao campo
		if( $position == 'inline' ):
		
			$messages = array(
				'required' => 'Campo obrigatório',
				'maxlength' => 'Mádimo de {MAXLENGTH} caracteres',
				'minlength' => 'Mínimo de {MINLENGTH} caracteres',
				'format' => 'O formato é inválido',
				'value' => 'Valor inválido',
				'invalid' => 'Valor inválido',
				'unique' => 'Valor já registrado',
				'justnumbers' => 'Somente números',
				'doselect' => 'Seleção obrigatória',
				'confirm' => 'Valores não são iguais',
				'maxsize' => 'Máximo de {SIZE}',
				'limit_start' => 'Valor mínimo de {LIMITSTART}',
				'limit_end' => 'Valor máximo de {LIMITEND}',
				'limit' => 'A data limite é {LIMIT}',
			);
		
		// Mensagem mostradas em conjunto
		else:
		
			$messages = array(
				'required' => "O campo “{LABEL}” é obrigatório", 
				'maxlength' => strtr( __( '{OVALOR} %s in the `{LABEL}` field must be max {MAXLENGTH} characters.', 'piki' ), array( '%s' => __( 'entered', 'piki' ) ) ),
				'minlength' => strtr( __( '{OVALOR} %s in the `{LABEL}` field must be min {MINLENGTH} characters', 'piki' ), 
				array( '%s' => __( 'entered', 'piki' ) ) ),
				'format' => strtr( __( '{OVALOR} %s in the `{LABEL}` field must have {FORMAT} format.', 'piki' ), array( '%s' => __( 'entered', 'piki' ) ) ),
				'value' => strtr( __( '{OVALOR} %s1 in the `{LABEL}` field is %s2', 'piki' ), 
				array( '%s1' => __( 'entered', 'piki' ), '%s2' => __( 'invalid', 'piki' ) ) ),
				'invalid' => strtr( __( '{OVALOR} %s1 in the `{LABEL}` field is %s2', 'piki' ), array( '%s1' => __( 'entered', 'piki' ), '%s2' => __( 'invalid', 'piki' ) ) ),
				'unique' => strtr( __( '{OVALOR} %s1 in the `{LABEL}` field already %s2', 'piki' ), array( '%s1' => __( 'entered', 'piki' ), '%s2' => __( 'registered', 'piki' ) ) ),
				'justnumbers' => __( "The `{LABEL}` field only accept numbers", 'piki' ),
				'doselect' => __( "Select {UMVALOR} in the `{LABEL}` field", 'piki' ),
				'confirm' => __( "The `{LABEL}` field value do not match", 'piki' ),
				'maxsize' => __( "The file in the field `{LABEL}` should have a maximum of {SIZE}", 'piki' ),
				'limit_start' => 'O valor do campo {LABEL} deve ser a partir que {LIMITSTART}',
				'limit_end' => 'O valor do campo {LABEL} deve ser no máximo de {LIMITEND}',
				'limit' => __( "A data no vampo `{LABEL}` deve ser até {LIMIT}", 'piki' ),
			);

		endif;

		// Custom
		if( isset( $field[ 'messages' ] ) ):
			$return = _array_get( $field[ 'messages' ], $type_erro );
		endif;
		// Default
		if( !$return ):
			$return = _array_get( $messages, $type_erro, $alternative );
		endif;
		
		return $return;
	
	}

	// Retorna a mensagem padrão de campos, de acordo com o tipo passado
	public static function getErrorMessage( $field, $key, $replaces = array(), $position = 'inline', $default = '' ){

		$_message = Pikifield::getDefaultErrorMessage( $field, $key, $position, $default );

		// Replace tokens from field message
		$_replaces = array(
			'{LABEL}' => $field[ 'label' ],
			'{UMVALOR}' => __( 'a value', 'piki' ),
			'{OVALOR}' => __( 'the value', 'piki' ),
		);

		// Replaces 
		if( !empty( $replaces ) ):

			// Se veio só um replace
			if( is_array( $replaces ) ):
				$_replaces = $_replaces + $replaces;
			else:
				$_replaces[ '{'. strtoupper( $key ) .'}' ] = $replaces;
			endif;
		
		endif;

		$message = strtr( $_message, $_replaces );

		return $message ? ucfirst( $message ) : false;
	
	}

	// Validações padrão para os campos
	public static function validate( $field, $settings ){

		// Required
		if( !PikiField::is_required( $field ) ):
			return true;
		endif;

		// Removing side spaces
		$value = trim( $field[ 'value' ] );
		
		// Empty
		if( $value === '' || $value === false || $value === 0 ):
			return PikiField::getErrorMessage( $field, 'required' );
		endif;
				
		// Minlength
		if( PikiField::minlength( $field ) && mb_strlen( $value ) < PikiField::minlength( $field ) ):
			return PikiField::getErrorMessage( $field, 'minlength', PikiField::minlength( $field ) );
		endif;
		
		// Maxlength
		if( PikiField::maxlength( $field ) && mb_strlen( $value ) > PikiField::maxlength( $field ) ):
			return PikiField::getErrorMessage( $field, 'maxlength', PikiField::maxlength( $field ) );
		endif;

		// Confirm field
		$is_confirm = isset( $field[ 'confirm_origin' ] );
		if( $is_confirm && $field[ 'origin_value' ] != $field[ 'value' ] ):
			return PikiField::getErrorMessage( $field, 'confirm' );
		endif;

		return true;
	
	}

	// Obrigatoriedade
	public static function is_required( $field ){
		return on( $field, 'required' );
	}

	// Tamanho mínimo
	public static function minlength( $field ){
		return _array_get( $field, 'minlength', false );
	}

	// Tamanho máximo
	public static function maxlength( $field ){
		return _array_get( $field, 'maxlength', false );
	}

	public static function normalize( $value ){

		// Inválidos
		if( is_null( $value ) ):
			return false;
		endif;

		// String
		if( is_string( $value ) ):
			if( $value == '' ):
				return false;
			elseif( ( $unserial = unserialize( $value ) ) !== false ):
				return $unserial;
			else:
				return $value;
			endif;
		endif;

		// Array
		if( is_array( $value ) ):
			if( empty( $value ) ):
				return false;
			else:
				return $value;
			endif;
		endif;

		return $value;

	}

	public static function confirmField( $matriz, $complete = true, $label = false ){

		$options = _array_get( $matriz, 'confirm' );

		// Confirm field
		$confirm = $matriz;
		$confirm[ 'machine_name' ] = $matriz[ 'machine_name' ] . '_confirm';
		$confirm[ 'confirm_origin' ] = $matriz[ 'machine_name' ];
		unset( $confirm[ 'confirm' ] );

		// Label
		$confirm[ 'label' ] = _array_get( $options, 'label', sprintf( __( 'Confirme %s', 'piki' ), $matriz[ 'label' ] ) );
		$confirm[ 'messages' ] = _array_get( $options, 'messages', _array_get( $matriz, 'messages' ) );

		// Placeholder
		$placehoder = _array_get( $options, 'placeholder', false );
		if( $placehoder !== false ):
			$confirm[ 'placeholder' ] = $placehoder;
		endif;

		// Complete set double
		if( $complete ):
			
			$confirm[ 'name_html' ] = PikiField::get_field_name( $confirm );
			$confirm[ 'id' ] = PikiField::get_field_id( $confirm );
			
			PikiField::add_attributes( $confirm, array( 'class' => 'confirm' ) );
		
		endif;

		$confirm[ 'label_suffix' ] = false;
		$confirm[ 'label_prefix' ] = false;
		
		return $confirm;
	
	}


}

// Fields Hooks
require_once( Piki::path( __FILE__, 'hooks.php' ) );

// Scripts
add_action( 'init', array( 'PikiFields', 'add_files' ) );
add_action( 'admin_init', array( 'PikiFields', 'add_files' ) );

// Normalize titles
add_filter( 'the_title', array( 'PikiFields', 'theTitle' ), 10 );
add_filter( 'list_pages', array( 'PikiFields', 'titleForField' ), 10 );

// Wordpress hooks
add_action( 'wp_ajax_piki_field_ajax', array( 'PikiFields', 'ajax_callback' ) );
add_action( 'wp_ajax_nopriv_piki_field_ajax', array( 'PikiFields', 'ajax_callback' ) );

// Textarea hooks
add_filter( 'tiny_mce_before_init', [ 'textarea', 'formatTinyMCE' ] );
add_action( 'admin_enqueue_scripts', [ 'textarea', 'admin_enqueue_scripts' ] );
add_action( 'current_screen', [ 'textarea', 'tinymce' ] );

// Página de administração
//if( is_admin() ):
//    require_once( Piki::path( __FILE__, 'admin.php' ) );
//endif;
