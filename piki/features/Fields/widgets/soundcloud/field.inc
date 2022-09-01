<?php
class soundcloud extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Soundcloud (áudio)' );
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
		return text::get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		elseif( !empty( $field[ 'value' ] ) && !self::validate_url( $field[ 'value' ] ) ):
			$error = PikiField::getErrorMessage( $field, 'invalid', array( '{OVALOR}' => 'A URL' ) );
		endif;
		
		if( $error != '' ):
			return $error;
		endif;
		
		return true;
	
	}
	
	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		if( !empty( $value ) ):
			$value = soundcloud::extract_id( $value );
		endif;
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );
	}

	public static function validate_url( $url ){
		$id = self::extract_id( $url );
		return !empty( $id );
	}

	public static function extract_id( $url, $debug = false ){

		if( is_numeric( $url ) && strlen( $url ) >= 9 && strlen( $url ) <= 13 ):
			return $url;
		endif;
		
		$url = urldecode( $url );

		if( strpos( $url, '?' ) !== false ):
			$peaces = parse_url( $url );
			$query = _array_get( $peaces, 'query' );
			$code = reset( explode( '&', end( explode( 'tracks/', $query ) ) ) );
		else:
			$code = end( explode( '/', rtrim( $url ) ) );
		endif;

		$code = intVal( $code );
		if( is_numeric( $code ) && strlen( $code ) >= 8 && strlen( $code ) <= 13 ):
			return $code;
		else:
			return false;
		endif;

	
	}

	public static function renderize_values( $field, $options = [] ){

		// Código do vídeo
		$code = self::extract_id( $field[ 'value' ] );
		if( empty( $code ) ):
			return '';
		endif;

		$title = _array_get( $options, 'title', 'Assita o vídeo' );

		// Just code
		if( _array_get( $options, 'just-code' ) ):
			return $videocode;
		endif;

		return self::render_url( $code );

		return $html;

	}

	public static function render_url( $code ){

		wp_enqueue_script( 'soundcloud-api', 'https://connect.soundcloud.com/sdk/sdk-3.3.2.js' );

		return '<div class="audio-container">
			<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'. $code .'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" data-media-type="soundcloud" class="soundcloud"></iframe>
		</div>';
	
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

	// Dummy text
	public static function dummy( $field ){

		$text = file_get_contents( __DIR__ .  '/dummy.txt' );
		$urls = preg_split( "/\r\n|\n|\r/", $text );
		$key = array_rand( $urls, 1 );
		return $urls[ $key ];
		
	}

}
