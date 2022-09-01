<?php
class hidden extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Oculto' );

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'label' ] = false;
		$field[ 'hide_label' ] = true;
		$field[ 'nowrap' ] = true;

		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// constroi o campo do tipo hidden
	public static function get_field( $field ){
		$html = '<input type="hidden" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';
		parent::set_value( $html, $field );
		parent::set_attributes( $html, $field );
		$html .= " />";
		if( isset( $field[ 'txt_to_show' ] ) && !isempty( $field[ 'txt_to_show' ] ) ){
			$html .= '<div class="txt-to-show">' . $field[ 'txt_to_show' ] . '</div>';
		}
		return $html;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
