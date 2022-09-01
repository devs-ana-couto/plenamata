<?php
class record extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Gravação' );

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

		session_start();
		unset( $_SESSION[ 'pikiform_video_recorded_id' ] );

		$html = '<input type="hidden" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';
		parent::set_value( $html, $field );
		parent::set_attributes( $html, $field );
		$html .= " />";
		$html .= do_shortcode( '[record_video]' );

		return $html;
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		
		$error = '';
		
		session_start();
		
		$video_id = isset( $_SESSION[ 'pikiform_video_recorded_id' ] ) ? $_SESSION[ 'pikiform_video_recorded_id' ] : false;
		
		if( parent::is_required( $field ) && !$video_id ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		endif;
		
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}


	public static function renderize_values( $field, $value ){

		if( !$value || empty( $value ) ):
			return '';
		endif;

		global $wpdb;

		if( !is_array( $value ) ):
			$value = array( $value );
		endif;

		global $wpdb;
		$filename = $wpdb->get_var($wpdb->prepare( "SELECT filename FROM " . $wpdb->prefix . "video_capture WHERE id=%d", $value));
		if( $filename && !empty( $filename ) ):
			return 'http://txbh2l.cloud.influxis.com/videoRecorder/streams/_definst_/' . $filename;
		else:
			return '';
		endif;

	}

	public static function save_meta( $field, $ID, $value ){
		session_start();
		$video_id = isset( $_SESSION[ 'pikiform_video_recorded_id' ] ) ? $_SESSION[ 'pikiform_video_recorded_id' ] : false;
		if( (int)$video_id > 0 ):
			call_user_func( 'update_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $video_id );
		endif;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required', 'hide_label' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}