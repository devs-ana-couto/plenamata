<?php
class excerpt extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::set_label( 'Excerpt' );
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
		$t = new textarea();
		$field[ 'ftype' ] = 'textarea';
		return $t->get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$t = new textarea();
		return $t->validate( $field, $settings );
	}

	// Recupera o valor no banco
	public static function get_meta( $field, $post_id ){
		$excerpt =  get_post_field( 'post_excerpt', $post_id );
		return empty( $excerpt ) ? '' : array( $excerpt );
	}

	// Salva o valor no banco
	public static function save_meta( $field, $ID, $value ){

	 	// double execute prevention
		$breakkey = $field[ 'machine_name' ] . '_SAVE_'. $ID .'_EXCERPT';
	    if ( !defined( $breakkey ) ):
	        define( $breakkey, TRUE );  
			$post = array(
				'ID'			=> $ID,
				'post_excerpt'	=> trim( $value ),
			);
			wp_update_post( $post );
		endif;
		
	}

	// Renderize
	public static function renderize_values( $field, $options = [] ){
		return textarea::renderize_values( $field, $options );
	}

	// Campos de cofiguração do campo
	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'minlength', 'maxlength' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}
	
	// Dummy
	public static function dummy( $field ){
		return text::dummy( $field );
	}

}
