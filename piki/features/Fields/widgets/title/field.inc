<?php
class title extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		title::set_label( 'Título' );
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
		$field[ 'ftype' ] = 'text';
		return text::get_field( $field );
	}

	// Recupera o valor no banco
	public static function get_meta( $field, $post_id ){
		$title = get_the_title( $post_id );
		return !$title ? '' : array( $title );
	}

	// Salva o valor no banco
	public static function save_meta( $field, $ID, $value ){
	 	
	 	// double execute prevention
	    if ( !defined( $field[ 'machine_name' ] . '_SAVE_POST_'. $ID .'_DATA' ) ):
	    
	        define( $field[ 'machine_name' ] . '_SAVE_POST_'. $ID .'_DATA', TRUE );    
			
			$post = array(
				'ID'			=> $ID,
				'post_title'	=> trim( $value ),
			);
			wp_update_post( $post );
		
		endif;
	
	}

	// Valida valor único
	public static function validate_unique( $field, $form_settings ){

		global $wpdb;

		$value = _array_get( $field, 'value' );

		$ID = $wpdb->get_var($wpdb->prepare(
			"SELECT ID FROM $wpdb->posts WHERE post_type = %s AND post_title = %s",
			[ 
				_array_get( $form_settings, 'post_type', 'post' ), 
				_array_get( $field, 'value' ),
			]
		));

		return empty( $ID ) ? true : PikiField::getErrorMessage( $field, 'unique' );
		
	}

	public static function renderize_values( $field, $options = false ){
		return text::renderize_values( $field, $options );
	}

	// Campos de cofiguração do campo
	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'placeholder', 'minlength', 'maxlength' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

	public static function add_files(){
	    wp_enqueue_script( 'pktitle-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
	}

}
