<?php
class nonce extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Nonce' );
	}
			
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'label' ] = false;
		$field[ 'no_proccess' ] = true;
		$field[ 'nowrap' ] = true;
		return $field;
	}
	
	// constroi o campo do tipo hidden
	public static function get_field( $field ){
		$field[ 'ftype' ] = 'hidden';
		$field[ 'value' ] = $field[ 'value' ];
		return hidden::get_field( $field );
	}
	
	// Validação do campo
	public static function validate( $field, $settings ){
		return true;
	}
	
	// Configurações
	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
