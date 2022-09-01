<?php
class vimeo extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Vímeo (vídeo)' );
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

		$value = _array_get( $field, 'value' );
		if( is_array( $value ) && !isset( $value[ 'codigo' ] ) ):
			$value = reset( $value );
		endif;

		// Código
		$code = $field;
		$code[ 'value' ] = _array_get( $value, 'codigo', '' );
		PikiField::set_as_child( $code, 'codigo' );

		// Início
		$intro_start = $field;
		$intro_start[ 'value' ] = _array_get( $value, 'intro_start', '' );
		PikiField::set_as_child( $intro_start, 'intro_start' );

		// Início
		$intro_duration = $field;
		$intro_duration[ 'value' ] = _array_get( $value, 'intro_duration', '' );
		PikiField::set_as_child( $intro_duration, 'intro_duration' );

		return '<div class="vimeo-fields subfield-field-group">
			<div>' . text::get_field( $code )  . '</div>
			<div style="display:none;"><em>Início da introdução:</em>' . text::get_field( $intro_start )  . '</div>
			<div style="display:none;"><em>Duração da introdução:</em>' . text::get_field( $intro_duration )  . '</div>
		</div>';

		/*
		// 530413476
		return PikiField::childsGroup(
			$field,
			[
				[ 'ftype' => 'text', 'machine_name' => 'code', 'label' => 'Código' ],
				[ 'ftype' => 'text', 'machine_name' => 'title', 'label' => 'Título' ], 
				[ 'ftype' => 'textarea', 'machine_name' => 'excerpt', 'label' => 'Descrição' ],
				[ 'ftype' => 'imagewp', 'machine_name' => 'cover', 'label' => 'Imagem de capa (desktop)' ], 
				[ 'ftype' => 'imagewp', 'machine_name' => 'cover_mob', 'label' => 'Imagem de capa (mobile)' ], 
				[ 'ftype' => 'text', 'machine_name' => 'ratio', 'placeholder' => 'ex: 1920x1080', 'label' => 'Tamanho do vídeo (largura x altura)' ], 
				[ 'ftype' => 'boolean', 'machine_name' => 'mask', 'label_option' => 'Usar máscara?', 'hide_label' => true, 'label' => 'Usar máscara?' ], 
				[ 'ftype' => 'number', 'machine_name' => 'init', 'label' => 'Ponto de início da introdução' ], 
				[ 'ftype' => 'number', 'machine_name' => 'time', 'label' => 'Tempo to loop de introdução' ], 
			]
		);
		*/
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		$value = _array_get( $field, 'value' );
		$code = _array_get( $value, 'codigo' );

		if( parent::is_required( $field ) && empty( $code ) ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		elseif( !empty( $code ) && intVal( $code ) <= 0 ):
			$error = PikiField::getErrorMessage( $field, 'invalid', array( '{OVALOR}' => 'O código' ) );
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

	public static function extract_id( $url, $debug = false ){

		// Just code
		if( strpos( $url, '/' ) === false && strpos( $url, '?' ) === false ):
			return $url;
		endif;

		// Code is past
		$purls = explode( '/', $url );
		$id = array_pop( $purls );
	   	$psid = intVal( reset( explode( '?', $id ) ) );
	   	return empty( $psid ) ? false : $psid;
	}

	// Saving meta
	public static function save_meta( $field, $ID, $value ){

		$subs = [ 'codigo', 'intro_start', 'intro_duration' ];

		foreach( $subs as $sub ):

			// Get value
			$itemval = _array_get( $value, $sub, '' );

			// Inicial
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_' . $sub, $itemval );

		endforeach;
	
	}
	
	// Change meta
	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = false ){

		$return = [];

		// Machine name
		$mname = $field[ 'machine_name' ];
		// Subfields
		$subs = [ 'codigo', 'intro_start', 'intro_duration' ];

		// First key
		$fist_key = reset( $subs );

		// First value
		$first_vals = _array_get( $values, $mname . '_' . $fist_key );
		if( empty( $first_vals ) ) return [];

		// Get subfields values
		foreach( $first_vals as $index => $fval ):

			$newval = [];
			foreach( $subs as $sub ):
				$item_val = _array_get( $values, $mname . '_' . $sub );
				$newval[ $sub ] = _array_get( $item_val, $index );
			endforeach;
			$return[ $index ] = $newval;
		
		endforeach;

		return $return;

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		$subs = [ 'codigo', 'intro_start', 'intro_duration' ];
		foreach( $subs as $sub ):
			call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_' . $sub );		
		endforeach;
	}

	public static function renderize_values( $field, $options = array() ){

		wp_enqueue_script( 'vimeo-api-scripts', 'https://player.vimeo.com/api/player.js', array( 'jquery' ) );

		// Valores
		$value = _array_get( $field, 'value' );		

		// Código do vídeo
		$code = _array_get( $value, 'codigo' );
		$videocode = Vimeo::extract_id( $code );
		if( !$videocode ) return false;

		// Widget type
		$widget = _array_get( $options, 'widget', 'compact' );

		// Widget
		$better_token = md5(uniqid(rand(), true));

		// ID
		$id = 'video-' . md5(uniqid(rand(), true));

		// Thumb
		$thumb = '<img srcset="https://vumbnail.com/'. $videocode .'.jpg 640w, https://vumbnail.com/'. $videocode .'_large.jpg 640w, https://vumbnail.com/'. $videocode .'_medium.jpg 200w, https://vumbnail.com/' . $videocode . '_small.jpg 100w" sizes="(max-width: 640px) 100vw, 640px" src="https://vumbnail.com/'. $videocode .'.jpg" alt="Asisstir o vídeo" />';
		
		// Default
		if( $widget == 'default' ):

			$html = '<div class="video-container">
				<iframe src="https://player.vimeo.com/video/'. $videocode .'" width="640" height="480" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
			</div>';
		
		// Code
		elseif( $widget == 'code' ):

			$html = '<div id="'. $id .'" class="vimeo-code-item" data-videocode="'. $videocode .'" >
				<div id="'. $better_token .'" class="video-element"></div>
				<div class="preview-wrapper">'. $thumb .'</div>
				<a href="https://vimeo.com/'. $videocode .'" data-action="play-video" class="play" title="assistir" target="_blank">assistir</a>
			</div>';

		else:

			$title = _array_get( $value, 'title' );
			$excerpt = _array_get( $value, 'excerpt' );
			//$ratio = _array_get( $value, 'ratio' );
			$ratio = '1280x700';
			$init = _array_get( $value, 'intro_start', '0' );
			$time = _array_get( $value, 'intro_duration', '5' );
			$class = _array_get( $options, 'class' );

			// Controls
			if( isset( $options[ 'controls' ] ) ):
				$controls = _array_get( $options, 'controls' );
			else:
				$controls = $widget == 'clip' ? 'false' : 'true';
			endif;

			$html = '
			<div 
				id="' . $id . '"
				class="vimeo-video' . ' ' . $class . ' '. $widget .'" 
				data-type="vimeo" 
				data-widget="'. $widget .'"
				data-videocode="'. $videocode .'" 
				data-controls="' . $controls . '" 
				data-responsive="'. _array_get( $options, 'responsive', 'true' ) .'"
				data-autoplay="'. _array_get( $options, 'autoplay', 'false' ) .'"
				data-muted="'. _array_get( $options, 'muted', 'false' ) .'"
				data-loop="'. _array_get( $options, 'loop', 'false' ) .'"
				data-init="'. $init .'" 
				data-time="'. $time .'"
				data-background="'. _array_get( $options, 'background', 'false' ) .'"' . 
			'>
				<div id="'. $better_token .'" class="video-element"></div>
				' . (
					( $widget != 'clip' )
					? 
						'<span class="mask">' . ( $widget == 'inline' ? $thumb : '' ) . '</span>
						' . (
							$widget == 'inline' 
							? '<a href="https://player.vimeo.com/video/'. $code .'" data-action="play-video" class="play" title="assistir" target="_blank">assistir</a>'
							: '<a href="https://player.vimeo.com/video/'. $code .'" data-action="open-video" class="open" title="Maximizar vídeo" target="_blank">Maximizar</a>'
						)
					: ''

				) . '
				
			</div>';

			wp_enqueue_script( 'vimeo-field-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );

		endif;

		//wp_enqueue_style( 'vimeo-field-styles', Piki::url( 'styles.css', __FILE__ ) );
		
		return $html;

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
