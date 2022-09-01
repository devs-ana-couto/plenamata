<?php
class user_meta extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Dados de usuário' );
		// Configurações específicas do campo

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field, $form ){
		
		$rel = _array_get( $field, 'relation' );

		// Aditional options
		$field[ 'options' ] = _array_get( $field, 'options', array() );

		// Items
		$items = self::getOptions( $rel, $form );
		if( !empty( $items ) ):

			// Custom formatter
			$formatter = _array_get( $field, 'options_formatter' );
			if( $formatter ):
			
				$field[ 'options' ] = call_user_func( $formatter, $field, $items );
			
			// Default formater
			else:

				foreach( $items as $i => $item ):

					if( is_array( $rel[ 'field_label' ] ) ):
						
						$label = array();
						foreach( $rel[ 'field_label' ] as $klabel ):
							$label[] = $item[ $klabel ];
						endforeach;
						$label = implode( ', ', $label );
					
					else:
					
						$label = $item[ $rel[ 'field_label' ] ];
					
					endif;
				
					$field[ 'options' ][ $item[ 'ID' ] ] = $label;
				
				endforeach;

			endif;

		endif;

		return select::get_field( $field );
	
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Return
		$return = array();

		// Get field value
		$values = _array_get( $meta, $field[ 'machine_name' ] );
		if( empty( $values ) ) return $return;

		// Relation options
		$relation = _array_get( $field, 'relation' );

		// Get field relation
		if( !empty( $relation ) ):

			// Relation form settings
			$form_key = _array_get( $field, 'form_key' );
			$form_settings = PikiForms::get_form_settings( $form_key );
			$form_settings[ 'data' ] = $meta[ 'post_item' ];

			// Get options
			$options = user_meta::getOptions( $relation, $form_settings );

			if( empty( $options ) ) return $return;

			// Extract values
			foreach( $options as $o => $option ):

				if( in_array( $option[ 'ID' ], $values ) ):
					$return[] = $option;
				endif;

			endforeach;
			
		endif;

		return $return;
	
	}

	public static function renderize_values( $field, $options = array() ){

		$value = _array_get( $field, 'value' );

		if( empty( $value ) ) return '';

		if( on( $options, 'array' ) ) return $value;

		return $value[ 'logradouro' ] . ', ' . $value[ 'complemento' ] . ', ' . $value[ 'bairro' ] . ', ' . $value[ 'cidade' ] . '/' . uf::getLabel( $value[ 'estado' ] ) . ' - ' . $value[ 'cep' ];

	}


	public static function getOptions( $rel, $form ){
		
		$fsettings = PikiForms::get_form_settings( $rel[ 'form_key' ] );

		$_field = PikiFields::extract_field( $fsettings[ 'fields' ], $rel[ 'field' ] );

		$item = _array_get( $form, 'data' );

		// Edition
		if( $item ):
			if( !is_object( $item ) ):
				$item = get_post( $item );
			endif;
			$user_id = $item->post_author;
		// Insert
		else:
			$user_id = get_current_user_id();
		endif;

		$items = PKMeta::getAuxiliarTableData( $_field, $user_id );

		// Retorna o array de resultados		
		return $items;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

};