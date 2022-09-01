<?php
class serial extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Serial' );
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'no_form' ] = true;
		$field[ 'no_validate' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%d';
	}

	// constroi o campo
	public static function get_field( $field ){
		return false;
	}

	public static function save_meta( $field, $ID, $value ){
		
		global $wpdb;

		// No POST ID
		if( empty( intVal( $ID ) ) ) return true;

		// Post type
		$ptype = get_post_type( $ID );

		// Se o número já foi inserido, não fazmos nada
		$actual = call_user_func( 'get_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], true );
		if( !empty( $actual ) ) return true;

		// Code prefix
		$code_prefix = _array_get( $field, 'code_prefix' );
		$index_key = $ptype . '_' . $field[ 'machine_name' ] . ( $code_prefix ? '_' . $code_prefix : '' );

		// Actual indiex
		$actual_index = get_option( $index_key );

		// New index
		$new_index = str_pad( empty( $actual_index ) ? 1 : $actual_index + 1, 4, '0', STR_PAD_LEFT );

		// Code to insert
		$serialcode = ( $code_prefix ? $code_prefix : '' ) . $new_index;
		
		// Actualize index value
		update_option( $index_key, $new_index );
		
		// Atribui o novo número ao post
		call_user_func( 'update_'. $field[ 'data_type' ] .'_meta', $ID, $field[ 'machine_name' ], $serialcode );
	
	}

	public static function renderize_values( $field, $options = [] ){

		$value = _array_get( $field, 'value' );
		if( is_array( $value ) ) $value = reset( $value );
		return empty( $value ) ? '' : $value;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}