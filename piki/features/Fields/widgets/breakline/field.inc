<?php
class breakline extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Quebra de linha' );

	}

	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'no_proccess' ] = true;
		$field[ 'nowrap' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){
		return '<br style="clear:both" />';
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		return true;
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'label', 'ftype', 'machine_name' ), true );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}