<?php
class colorpicker extends PikiField {

	function __construct(){
		// Label do campo
		self::set_label( 'Color Picker' );
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

	// constroi o campo
	public static function get_field( $field ){

		$tf = $field;

		$html = text::get_field( $tf );

		Piki::add_library( 'farbtastic' );

		//$html .= '<script>jQuery(function(){jQuery("'. $tf[ 'id' ] .'").colorpicker({ flat: true });});</script>';

		return $html;
	}

	// Valida o campo
	public static function validate( $field, $settings ){
		return checkboxes::validate( $field, $settings );
	}

	public static function add_files(){
	    wp_enqueue_script( 'field-colors-scripts', Piki::url( 'colors.field.js', __FILE__ ), array( 'jquery' ) );
	}

	//public static function renderize_values( $field, $options = array() ){
	//	return _array_get( $field, 'value' );
	//}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
