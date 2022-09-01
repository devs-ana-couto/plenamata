<?php
class fieldset extends PikiField {
	
	function __construct(){
		
		// Label do campo
		self::set_label( 'Agrupamento de campos' );
	
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		
		$field[ 'sqlrpc' ] = self::getReplacement();
		
		// Se ainda não há um subampo
		if( !isset( $field[ 'subfields' ] ) ):
			$field[ 'subfields' ] = array();
		endif;
		
		// Campo de peso de multiplos fieldsets
		$field[ 'subfields' ][ 'weight' ] = array(
			'ftype' => 'hidden',
			'machine_name' => 'weight',
			'default_value' => 0,
			'nowrap' => true,
		);

		// Opção para esconder os headers dos campos
		if( on( $field, 'hide_headers' ) ):
			parent::add_attributes( $field, array( 
				'data-no-labels' => 'true',
				'class' => 'hide-headers' 
			));
		endif;

		// Allways array
		$multiple = _array_get( $field, 'multiple' );
		if( $multiple ):

			if( !is_array( $multiple ) ):
				$field[ 'multiple' ] = [ 'status' => $multiple ];
			endif;

			// Delete alert message
			$alert = $multiple[ 'delete_alert' ];
			if( $alert ):
				parent::add_attributes( $field, array( 'data-delete-alert' => $alert ) );
			endif;
		
		endif;

		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Retorna as configurações do campo
	public static function prepare_fields( $field, $settings ){
		$settings[ 'parents' ] = array( $field[ 'machine_name' ] );
		$field[ 'subfields' ] = PikiFields::prepare_fields( $field[ 'subfields' ], $settings );
		return $field;
	}

	// constroi o campo
	public static function get_field( $fieldset, $form = false ){

		// Linhas a escever
		$tomake = 1;

		// Valores
		$values = _array_get( $fieldset, 'value', array() );

		
		// Total de campos de acordo com as opções de campo múltiplo
		if( PikiField::is_multiple( $fieldset ) ):
			
			// Mínimo de ítems
			$min_items = PikiField::min_items( $fieldset );
			
			// Ítems inicialmente abertos
			$init_items = PikiField::init_items( $fieldset );
			
			if( !empty( $values ) && !self::_is_empty( $fieldset[ 'subfields' ], $values[ 0 ] ) ):
				
				$init_items = count( $values );
			
			endif;
			
			// Total 
			$tomake = $init_items > $min_items ? $init_items : $min_items;
			
			// Scripts para campos multiplos
			self::add_files();

		else:

			if( count( $values ) > 1 ):
				$values = array_slice( 0, 1 );
			endif;
		
		endif;
		
		// Se o número de valores que temos, é superior ao inicial
		if ( count( $values ) > $tomake ):
			$tomake = count( $values );
		endif;

		// Retorno
		$return = array();
		
		// Faz as linhas
		for( $i = 0; $i < $tomake; $i++ ):
			
			// Valores para a linha
			$row_values = isset( $values[ $i ] ) ? $values[ $i ] : array();
			
			// Recupera a linha renderizada
			$return[] = self::get_row( $fieldset, $i, $row_values, $form );
		
		endfor;
		
		// Retorna as linhas implodidas
		return implode( '', $return );
	
	}

	// Faz as linhas do fieldset
	public static function get_row( $fieldset, $index, $values = array(), $form = false ){

		// Zebra
		$zebra = $index%2 ? 'odd' : 'even';
		
		// Normalisa o tipo de $values
		$values = !is_array( $values ) ? array() : $values;

		$html = '<div ';
		if( isset( $fieldset[ 'multiple' ][ 'add_label' ] ) ):
			parent::add_attributes( $fieldset, array( 'data-add-label' => $fieldset[ 'multiple' ][ 'add_label' ] ) );
		endif;
		parent::add_attributes( $fieldset, array( 'class' => array( 'fieldset-group-fields clearfix ' . $zebra ) ) );
		parent::set_attributes( $html, $fieldset );
		$html .= '>';

		// Se existem sucampos
		if( isset( $fieldset[ 'subfields' ] ) && is_array( $fieldset[ 'subfields' ] ) && !empty( $fieldset[ 'subfields' ] ) ):
			
			// Percorre os subcampos
			foreach ( $fieldset[ 'subfields' ] as $key => $subfield ):

				// Insere o valor no campo
				$subfield[ 'value' ] = !isset( $values[ $subfield[ 'machine_name' ] ] ) ? false : $values[ $subfield[ 'machine_name' ] ];
				// Insere o index do fieldset no campo
				array_push( $subfield[ 'parents' ], $index );
				
				// Adiciona a renderizaçõa do campo
				$html .= form::renderize_field_form( $subfield, $form );
			
			endforeach;
		
		endif;
		
		$html .= '</div>';
		
		return $html;

	}

	// Validação do campo
	public static function validate( $field, $settings ){
		
		// Classe de validação
		$val = new valida( $settings );
		$val->action = $field[ 'form_action' ];

		// Array com os erros
		$errors = array();
		
		// Se o campo é múltiplo
		$multiple = PikiField::is_multiple( $field );

		// Total de valores
		$total_items = count( $field[ 'value' ] );
		$min_items = PikiField::min_items( $field );

		// Verifica se o mínimo de ítems foi postado
		if( $multiple && $total_items < $min_items ):
			return 'O grupo de campos <i>' . $field[ 'label' ] . '</i> deve ter no mínimo ' . $min_items . ' ítem' . ( $min_items > 1 ? 's' : '' ) . ' preenchido' . ( $min_items > 1 ? 's' : '' );
		endif;

		// Emptys rows
		$emptys = array();

		// Valida cada linha
		foreach ( $field[ 'value' ] as $key => $row_values ):
			
			// Verify if is empty
			if( fieldset::_is_empty( $field[ 'subfields' ], $row_values ) === true ):
				$emptys[] = $key;
			endif;

			// Verifica se há erros na linha
			$validate = $val->valida( $field[ 'subfields' ], $row_values );
			if( isset( $validate[ 'errors' ] ) && !empty( $validate[ 'errors' ] ) ):
				$errors[ $key ] = $validate;
			endif;

		endforeach;

		// Se é múltiplo, só marcamos erros na quantidade mínima de ítens
		if( $multiple ):

			// If no min items, but has required fields
			if( $min_items == 0 && PikiField::hasRequired( $field[ 'subfields' ] ) ):
				$min_items = 1;
			endif;

			// Total de ítems preenchidos
			$filleds = $total_items - count( $emptys );
			
			// Número de ítems que faltam
			$falta = $min_items - $filleds;
			
			// Se a quantidade de ítens vazios é maior do que o número que falta, não marcamos o excedente	
			if( $falta == 0 || count( $emptys ) > $falta ):
				
				// Chaves dos ítens a serem removidos do array de erros
				$toremove = $falta < 1 ? $emptys : array_slice( $emptys, $falta );
				if( !empty( $toremove ) ):
					foreach( $toremove as $krem ):
						unset( $errors[ $krem ] );
					endforeach;
				endif;
			
			endif;

		endif;

		// Se não existem erros
		if( empty( $errors ) ):
			return $errors;
		endif;

		return $errors;
	
	}

	// Prepara os valores
	public static function prepare_meta( $field, $values, $key = '' ){

		// Empty values
		if( empty( $values ) ) return $values;

		// Each values set
		foreach( $values as $i => &$value ):

			// Each field value
			foreach( $value as $fname => &$fvalue ):

				$_field = _array_get( $field[ 'subfields' ], $fname );
                if( method_exists( $_field[ 'ftype' ], 'prepare_meta' ) ):
                    $fvalue = call_user_func( array( $_field[ 'ftype' ], 'prepare_meta' ), $_field, $fvalue , $key );
                endif;
			
			endforeach;
			
		endforeach;

		return $values;

	}

	// Salva os valores do fieldset
	public static function save_meta( $field, $ID, $values ){

		// Se o valor é vazio, deletamos o conteúdo
		if( !is_array( $values ) || empty( $values ) ):	
			return true;
		endif;

		// Table
		$table = _array_get( $field, 'table' );

		// Prevent duplicate non multiple field
		if( count( $values ) > 1 && !PikiField::is_multiple( $field ) ):
			$values = array( end( $values ) );
		endif;
		
		// Salva cada linha
		foreach( $values as $weight => $value ):
			
			if( self::_is_empty( $field[ 'subfields' ], $value ) === false ):
				
				// Custom table field
				if( !empty( $table ) ):
					
					fieldset::saveMeta( $ID, $field, $value, $weight );
				
				// Default database storage
				else:

					// Form settings					
					$_settings = _array_get( $field, 'form_settings' );
					$_settings[ 'fields' ] = $field[ 'subfields' ];

					// Saving meta
					PKMeta::save_post_meta( $ID, $_settings, $value, 'insert', $field[ 'machine_name' ] );
				
				endif;
			
			endif;
		
		endforeach;	

		return true;
	
	}

	// Deleta os valores do fieldset
	public static function delete_meta( $field, $ID, $data_type = 'post', $table = false, $new_value = false ){

		// Se o valor é vazio, deletamos o conteúdo
		if( !is_array( $field[ 'subfields' ] ) || empty( $field[ 'subfields' ] ) ):
			
			return true;
		
		// Senão, inserimos os subcampos	
		else:

			$table = _array_get( $field, 'table' );

			// Auxiliar table
			if( !empty( $table ) ):

				fieldset::deleteMeta( $ID, $field );


			// Default meta table
			else:
				
				// Deleta cada linha
				foreach( $field[ 'subfields' ] as $key => $subfield ):

					$data_type = _array_get( $field, 'data_type', 'post' );
					$data_table = _array_get( $field, 'data_table', null );
					
					// if( $new_value ):

					// 	if( isset( $new_value[ 0 ] ) ):

					// 		$_value = _array_get( $new_value[ 0 ], $subfield[ 'machine_name' ] );
						
					// 	else:
						
					// 		$_value = _array_get( $new_value, $subfield[ 'machine_name' ] );
						
					// 	endif;
					
					// else:
					
					 	$_value = false;
					
					// endif;

					PKMeta::delete_field_value( $subfield, $ID, $data_type, $data_table, $_value );
				
				endforeach;

			endif;
		
		endif;
		
		return true;
	
	}

	public static function deleteMeta( $ID, $field ){

		global $wpdb;

		// Data table
		$table = $wpdb->prefix . _array_get( $field, 'table' );
		
		// Query
		$query = $wpdb->prepare(
			"DELETE FROM $table WHERE parent_type = %s AND parent_id = %d",
			array( _array_get( $field, 'data_type' ), $ID )
		);
		
		return $wpdb->query( $query );

	}

	// Save meta on table
	public static function saveMeta( $ID, $field, $values, $weight = 0 ){

		global $wpdb;

		// Data table
		$table = $wpdb->prefix . _array_get( $field, 'table' );

		// Data type and table
		$type = _array_get( $field, 'data_type', 'post' );

		// Remove weight field
		if( isset( $field[ 'subfields' ][ 'weight' ] ) ) unset( $field[ 'subfields' ][ 'weight' ] );

		// Base query
		$query = "INSERT INTO $table SET parent_type=%s, parent_id=%d, weight=%d";
		$fields_queries = array();
		$vals = array(
			_array_get( $field, 'data_type' ),
			$ID, 
			$weight 
		);

		foreach( $field[ 'subfields' ] as $f => $field ):

			// Query field
			$fields_queries[] = $field[ 'machine_name' ] . "=" . $field[ 'sqlrpc' ];

			// Get value
			$value = _array_get( $values, $field[ 'machine_name' ], '' );
			
			$vals[] = is_array( $value ) ? serialize( $value ) : $value;

		endforeach;

		if( !empty( $fields_queries ) ):
			$query .= ', ' . implode( ', ', $fields_queries );
		endif;

		return $wpdb->query( $wpdb->prepare( $query, $vals ) );

	}

	// Verifica se a linha está vazia
	public static function _is_empty( $fields, $values ){

		if(  empty( $values ) ) return true;

		unset( $fields[ 'weight' ] );
		unset( $values[ 'weight' ] );

		foreach( $fields as $key => $field ):

			$field_value = !isset( $values[ $field[ 'machine_name' ] ] ) ? false : $values[ $field[ 'machine_name' ] ];

			if( !$field_value ):
				continue;
			endif;

			$field[ 'value' ] = $field_value;

			if( !parent::is_empty_field( $field ) ):
				return false;
			endif;

		endforeach;

		return true;

	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = null ){

		// Subcampos
		$subfields = _array_get( $field, 'subfields' );
		if( empty( $subfields ) || !is_array( $subfields ) ):
			return false;
		endif;

		// Recupera os valores dos campos do fieldset
		$table = _array_get( $field, 'table' );
			
		if( $table ):
			
			$rows = _array_get( $values, $field[ 'machine_name' ], array() );

		else:
			
			$values = PKMeta::organize_meta_data( $field[ 'subfields' ], $values, $data_type, $data_table );

			// Linhas do fieldset
			$rows = array();
			
			// Reparte os valores dos camops em linhas
			$weight = 0;
			
			// Se loop deve ser finalizado
			$continue = true;
			
			// Percorrendo linhas
			while( $continue == true ):
				
				// O loop será finalizado se não houver nenhum campo com valores
				$continue = false;
				
				// Nova linha de valores
				$new_row = array();
				
				// Percorremos o array de campo em busca de valores correspondentes à linha
				foreach( $field[ 'subfields' ] as $key => $subfield ):
					
					// Se existe o valor, adicionamos o valor
					if( isset( $values[ $subfield[ 'machine_name' ] ][ $weight ] ) ):
						$new_row[ $subfield[ 'machine_name' ] ] = $values[ $subfield[ 'machine_name' ] ][ $weight ];
						// O loop deve continuar
						$continue = true;
					
					// Se não existe valor, setamos como false
					else:
						$new_row[ $subfield[ 'machine_name' ] ] = false;
					endif;
				
				endforeach;

				// Se algum valor foi encontrado, inserimos a linha no array de campos
				if( $continue && self::_is_empty( $field[ 'subfields' ], $new_row ) === false ):
					$rows[ $weight ] = $new_row;
				endif;
				
				// Próxima linha
				$weight++;

			endwhile;
		
		endif;

		// Retorno
		return !empty( $rows ) ? $rows : false;

	}

	// Renderiza os valores do campo
	public static function renderize_values( $field, $values ){

		if( isset( $values[ 'weight' ] ) && is_array( $values[ 'weight' ] ) ):
			$weights = $values[ 'weight' ];
		else:
			$weights = array( 0 );
		endif;		
		
		$items = array();
		foreach ( $weights as $key => $weight ) {
			$return[ $weight ] = array();
			foreach ( $values as $key_field => $value ) {
				$items[ $weight ][ $key_field ] = array( $value[ $weight ] );
			}
		}

		// Faz o merge de cada set de campos
		$merged = array();
		foreach( $items as $key => $item ):
			$merged[] = PikiFields::mergeWithData( $field[ 'subfields' ], $item );
		endforeach;

		return $merged;

	}

	// Configura grupos de campos
	private static function configure_fields_group( $fields, $values ){
		$configured = form::get_fields_settings( $fields, $form_id, false, $values );
	}

    // Scripts
    public static function add_files(){
    	// Scroll to
    	Piki::add_library( 'scrollto' );
    	// Field scripts
        wp_enqueue_script( 'fieldset-scripts', Piki::url( 'field.js', __FILE__ ), array( 'jquery' ) );
    }

    // Retorna uma linha de um fieldset
    public static function ajax_get_row(){

    	// Chave do formulário
    	$form_key = _post( 'form_key' );

    	// Nome do campo
        $field_name = _post( 'fieldset_id' );
    	
    	// Nome do campo
        $field_index = _post( 'field_index', 0 );

        // Metabox ID
        $metabox_id = _post( 'metabox_id' );

        if( $form_key ):

	        // Configurações do formulário
	        $form_settings = PikiForms::get_form_settings( $form_key );

	        // Campos configurados do form
			$fields = PikiFields::prepare_fields( $form_settings[ 'fields' ], $form_settings );
			
			// Configurações do campo
	        $field = PikiFields::extract_field( $fields, $field_name );


	    elseif( $metabox_id ):

	    	$field = PKMetaBox::searchMetaField( $metabox_id, $field_name );

        endif;
        
        // Retorna o resultado
        Piki::return_json(array(
            'status' => 'success',
            'field'  => self::get_row( $field, $field_index, false, $form_settings ),
        ));

    }

    // Quando um post é apagado
	public static function post_delete( $field, $post ){

		$subs = _array_get( $field, 'subfields' );
		if( empty( $subs ) ) return true;

		foreach( $subs as $sub ):
            if( method_exists( $sub[ 'ftype' ], 'post_delete' ) ):
                call_user_func( array( $sub[ 'ftype' ], 'post_delete' ), $sub, $post );
            endif;
		endforeach;

	}

	// Campos de configuração do campo
	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'multiple' ) );
		$fields[ 'hide_headers' ] = array(
			'machine_name' => 'hide_headers',
			'ftype' => 'boolean',
			'label' => 'Esconder headers dos ítems'
		);
		unset( $fields[ 'required' ] );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
