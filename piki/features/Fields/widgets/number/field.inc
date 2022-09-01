<?php
class number extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Número' );
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%d';
	}

	// Constroi o campo
	public static function get_field( $field ){
		$field[ 'tagType' ] = 'number';
		$field[ 'pattern' ] = '[0-9]*';
		return text::get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		$value = _array_get( $field, 'value' );
		$default  = isset( $field[ 'default_value' ] ) ? $field[ 'default_value' ] : false;

		// Default zero value
		if( !$value && $default === '0' ) return true;

		if( PikiField::is_required( $field ) && ( $field[ 'value' ] === '' || $field[ 'value' ] === false ) ):

			$error = PikiField::getErrorMessage( $field, 'required' );
		
		elseif( !empty( $field[ 'value' ] ) && !is_numeric( $field[ 'value' ] ) ):
		
			$error = PikiField::getErrorMessage( $field, 'justnumbers' );
		
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;
	
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){

		$default  = isset( $field[ 'default_value' ] ) ? $field[ 'default_value' ] : false;
		if( empty( $value ) && ( $default === '0' || $default === 0 ) ):
			$value = '0';
		endif;	

		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], intval( $value ) );

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields(array( 'maxlength', 'required' ));
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function dummy( $field ){

		$min = _array_get( $field, 'min', 0 );
		$max = _array_get( $field, 'max', 99 );
		return rand( $min, $max );

	}

}
