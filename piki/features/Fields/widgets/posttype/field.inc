<?php
class posttype extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Post type' );

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
		$t = new text();
		return $t->get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$t = new text();
		return $t->validate( $field, $settings );
	}

	public static function save_meta( $field, $ID, $value ){
		global $wpdb;
		// Tipo de conteúdo atual
		$actual = get_post_meta( $ID, $field[ 'machine_name' ], true );
		// Se o tipo de conteúdo for modificado, atualizamos os registros existentes
		if( $value != '' && $actual != $value ):
			$wpdb->query($wpdb->prepare( "UPDATE $wpdb->posts SET post_type = '%s' WHERE post_type='%s'", array( $value, $actual )));
		endif;
		// Atualiza o meta value
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required', 'hide_label' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
