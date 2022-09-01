<?php
class body extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Body' );
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

	// Constroi o campo do tipo select
	public static function get_field( $field ){

		if( on( $field, 'simple_text' ) ):
			
			$field[ 'ftype' ] = 'text';
			return text::get_field( $field );

		else:
			
			$field[ 'ftype' ] = 'textarea';
			return textarea::get_field( $field );

		endif;
	
	}

	public static function add_files(){
		textarea::add_files();
	}

	public static function get_meta( $field, $post_id ){
		$content = get_post_field( 'post_content', $post_id );
		return $content;
	}

	public static function save_meta( $field, $ID, $value ){
	 	// double execute prevention
	    if ( !defined( $field[ 'machine_name' ] . '_SAVE_POST_DATA' ) ):
	        define( $field[ 'machine_name' ] . '_SAVE_POST_DATA', TRUE );    
			$post = array(
				'ID'			=> $ID,
				'post_content'	=> $value
			);
			wp_update_post( $post );
	    endif;
	}

	public static function renderize_values( $field, $options=array() ){
		return textarea::renderize_values( $field, $options );
	}

	public static function get_settings_fields( $values ){
		return textarea::get_settings_fields( $values );
	}

}
