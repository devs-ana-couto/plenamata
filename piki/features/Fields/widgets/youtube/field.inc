<?php
class youtube extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Youtube (vídeo)' );
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

		// Base url for thumbnail
		$thumb_base_url = 'http://i3.ytimg.com/vi/[code]/hqdefault.jpg';

		// Thumbnail if has value
		$value = _array_get( $field, 'value' );
		if( !empty( $value ) ):
			$code = self::extract_id( $value );
			$thumb = '<img src="'. str_replace( '[code]', $code, $thumb_base_url ) .'" alt=" ">';
		else:
			$thumb = '';
		endif;

		$html = '<div class="youtube-field-wrapper">
			<div class="thumbnail" data-base-url="'. $thumb_base_url .'">'. $thumb .'</div>
			<input type="text" name="' . $field[ 'name_html' ] . '" id="' . $field[ 'id' ] . '"';
			parent::set_value( $html, $field );
			parent::set_attributes( $html, $field );
			$html .= '>
		</div>';

	    wp_enqueue_script( 'youtube-field-scripts', Piki::url( '/admin.js' , __FILE__ ), [ 'jquery' ] );
	    wp_enqueue_style( 'youtube-admin-styles', Piki::url( '/admin.css' , __FILE__ ) );

		return $html;
	
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

	public static function validate_url( $url ){
		$id = self::extract_id( $url );
		return !empty( $id );
	}

	public static function extract_id( $url, $debug=false ){
		
		// Code is past
		$length = strlen( $url );
		if( $length >= 10 && $length <= 12 ):
			return $url;
		endif;

		$pattern = 
	        '%^// Match any youtube URL
	        (?:https?://)?  // Optional scheme. Either http or https
	        (?:www\.)?      // Optional www subdomain
	        (?:             // Group host alternatives
	          youtu\.be/    // Either youtu.be,
	        | youtube\.com  // or youtube.com
	          (?:           // Group path alternatives
	            /embed/     // Either /embed/
	          | /v/         // or /v/
	          | /watch\?v=  // or /watch\?v=
	          )             // End path alternatives.
	        )               // End host alternatives.
	        ([\w-]{10,12})  // Allow 10-12 for 11 char youtube id.
	        $%x'
	    ;
		$result = preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $url, $matches );
	    
	    if ( $result && isset( $matches[ 1 ] ) ):
	        return $matches[ 1 ];
	    endif;
	   
	    return false;
	
	}


	public static function renderize_values( $field, $options = [] ){

		// Código do vídeo
		$videocode = self::extract_id( $field[ 'value' ] );
		if( empty( $videocode ) ):
			return '';
		endif;

		// Formato
		$format = _array_get( $options, 'format', 'player' );

		// Título
		$title = _array_get( $options, 'title', 'Assita o vídeo' );

		// Just code
		if( _array_get( $options, 'just-code' ) ):
			return $videocode;
		endif;

		// Token
		$better_token = md5(uniqid(rand(), true));

		// Background attributes on URL
		$attrs = '';
		$background = _array_get( $options, 'background' );
		if( $background ):
			$attrs .= '&autoplay=1&mute=1&loop=1&playlist='. $videocode .'&controls=0&showinfo=0&modestbranding=1&fs=0&disablekb=0';
		// Default
		else:
			$controls = ( !isset( $options[ 'controls' ] ) || $options[ 'controls' ] != false ) ? '1' : '0';
			$autoplay = _array_get( $options, 'autoplay' ) === true ? '1' : '0';
			$mute = ( $autoplay || _array_get( $options, 'mute' ) === true ) ? '1' : '0';
			$attrs .= '&autoplay='. $autoplay .'&mute='. $mute .'&controls=' . $controls;
		endif;

		// Renderizando
		switch ( $format ):

			case 'videocode':
				return $videocode;
			break;

			// URL do vídeo
			case 'url':
				return 'https://www.youtube.com/watch?gl=BR&v='. $videocode;
			break;

			// Link para o vídeo
			case 'link':

				// Efeito
				$effect = isset( $options[ 'effect' ] ) ? $options[ 'effect' ]: 'slide';

				$html = '
					<a href="https://www.youtube.com/watch?gl=BR&v='. $videocode .'&hl=pt" title="'. $title .'" rel="_blank" class="youtube-inline-widget" video-code="'. $videocode .'" video-token="video-'. $better_token .'" data-video-effect="'. $effect .'">'. $title .'</a>
				';
				
			    wp_enqueue_script( 'youtube-field-scripts', Piki::url( '/scripts.js' , __FILE__ ), array( 'jquery' ) );
			    wp_enqueue_style( 'youtube-field-styles', Piki::url( '/styles.css' , __FILE__ ) );
			
			break;

			// Link para o vídeo
			case 'api':

				$html = '
					<video data-video-url="https://www.youtube.com/watch?gl=BR&v='. $videocode .'&hl=pt&rel=0" data-video-title="'. $title .'" class="youtube-api-widget" data-video-code="'. $videocode .'" id="video-'. $better_token .'"></video>
				';
			
			break;

			// Player do vídeo
			default:

				$nowrap = _array_get( $options, 'nowrap' );
				$url = 'https://www.youtube.com/embed/'. $videocode .'?version=3&enablejsapi=1&rel=0&modestbranding=0&showinfo=0'. $attrs;
				$html = ( !$nowrap ? '<div class="video-sizer"><div class="video-container" data-background="'. ( $background ? 'true' : 'false' ) .'">' : '' ) . '
					<iframe id="'. $better_token .'" data-video-code="'. $videocode .'" width="560" height="315" src="' . $url .'" frameborder="0" allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture" data-media-type="youtube" allowfullscreen></iframe>
				' . ( !$nowrap ? '</div></div>' : '' );

			break;

		endswitch;
			
		wp_enqueue_script( 'youtube-api-scripts', 'https://www.youtube.com/iframe_api', [ 'jquery' ] );

		return $html;

	}

	public static function render_url( $url ){
	
		// Código do vídeo
		$videocode = self::extract_id(  $url );
		if( empty( $videocode ) ):
			return '';
		endif;

		return '<div class="video-container">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/'. $videocode .'?enablejsapi=1&rel=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
