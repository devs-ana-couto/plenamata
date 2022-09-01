<?php
class username extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Apelido' );
		// Configurações específicas do campo

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'lock_edit' ] = true;
		$field[ 'unique' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){
		$html = '<input type="text" name="' . $field[ 'name_html' ] . '" id="' . $field[ 'id' ] . '"';
		parent::set_value( $html, $field );
		parent::set_attributes( $html, $field );
		if( $field[ 'action' ] == 'edit' ):
			$html .= ' disabled="disabled"';
		endif;
		$html .= " />";
		return $html;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}