<?php
class taxonomy_select extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Taxonomia' );

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
	public static function get_field( $field ){
		
		$options = get_taxonomies();
		array_unshift( $options, 'Selecione' );

		$field[ 'options' ] = $options;
		
		$s = new select();
		return $s->get_field( $field );
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$s = new select();
		return $s->validate( $field, $settings );
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'required', 'hide_label' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
