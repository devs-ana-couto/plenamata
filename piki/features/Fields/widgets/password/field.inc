<?php
class password extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Senha' );
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){

		$field[ 'sqlrpc' ] = self::getReplacement();
		
		// Mínimo de 6 e máximo de 12 caracteres
		//$field[ 'minlength' ] = 8;
		//$field[ 'maxlength' ] = 12;

		return $field;

	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// constroi o campo
	public static function get_field( $field ){

		$html = '<input type="password" name="' . $field[ 'name_html' ] . '" autocomplete="off" id="' . $field[ 'id' ] . '"';
		parent::set_attributes( $html, $field );
		$html .= ' />';

		return $html;
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		if( $settings[ 'action' ] == 'edit' && empty( $field[ 'value' ] ) ):
			return true;
		endif;
		
		// Default errors
		return PikiField::validate( $field, $settings );
	
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields = PikiFields::get_comum_fields( 'placeholder' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}