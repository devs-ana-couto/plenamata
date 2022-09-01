<?php
class url extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'URL' );

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

		parent::add_attributes( $field, array( 'class' => array( 'ftype-text' ) ) );

		$html = '<input type="text" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';

		if( isset( $field[ 'mask_type' ] ) && $field[ 'mask_type' ] != 'off' ):
			parent::add_attributes( $field, array( 'class' => array( 'ftype-' . $field[ 'mask_type' ] ) ));
		endif;

		parent::set_value( $html, $field );
		parent::set_attributes( $html, $field );
		$html .= " />";
		return $html;
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		$value = _array_get( $field, 'value' );

		// Verifica se o campo está vazio
		if( parent::is_required( $field ) && empty( $value ) ):
			
			$error = PikiField::getErrorMessage( $field, 'required' );
		
		// Verifica se o link inicia corretamente
		elseif( !empty( $value ) ):
		
			// Verifica se o link inicia corretamente
			if( on( $field, 'force_http' ) && strpos( $value, 'http://' ) !== 0 && strpos( $field[ 'value' ], 'https://' ) !== 0 ):
			
				$error = 'A URL deve começar com http:// ou https://';

			// Verifica o formato do host definido
			elseif( !off( $field, 'host' ) && !empty( $field[ 'host' ] ) ):				

				// Youtube
				if ( $field[ 'host' ] == 'youtube' ):
					$rx = '~^(?:https?://)?(?:www\.)?(?:youtube\.com|youtu\.be)/watch\?v=([^&]+)~x';
				// Vimeo
				elseif ( $field[ 'host' ] == 'vimeo' ):
					$rx = '/http:\/\/?(?:www\.)*vimeo\.com\/.*/';
				endif;
				
				$has_match = preg_match( $rx, $field[ 'value' ], $matches );
				
				if( empty( $has_match ) ):
					$error = PikiField::getErrorMessage( $field, 'invalid' );
				endif;

			endif;
		
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required', 'hide_label' ) );
		$fields[ 'host' ] = array(
			'label' => 'Host',
			'machine_name' => 'host',
			'ftype' => 'select',
			'options' => array(
				'off' => 'Nenhum',
				'youtube' => 'Youtube',
				'vimeo' => 'Vímeo',
				'facebook' => 'Facbook',
			),
		);
		$fields[ 'force_http' ] = array(
			'label' => 'Exigir http://',
			'machine_name' => 'force_http',
			'ftype' => 'boolean',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function renderize_values( $field, $options = [] ){
		
		// Value
		$url = _array_get( $field, 'value' );
		if( !$url ) return '';

		// Relative url's
		if( strpos( $url, '/' ) === 1 ):
			$url = get_site_url( null, $url );
		endif;

		// Get just URL
		if( _array_get( $options, 'just_url' ) ):
			return $url;
		endif;

		$class = _array_get( $options, 'class' );
		$label = _array_get( $options, 'label', $field[ 'value' ] );
		$title = _array_get( $options, 'title', $label );
		$target = _array_get( $options, 'target' ) == 'blank' ? ' target="_blank"' : '';
		$prefix = _array_get( $options, 'prefix', '' );
		$icone = _array_get( $options, 'icone', '' );

		return $prefix . '<a href="'. $url .'" ' . $target . ' title="'. $title .'" class="'. $class .'">' . $icone. '<span>'. $label .'</span></a>';

	}

	public static function extract_code( $URL, $type = 'youtube' ){

		preg_match( "#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $URL, $matches );
		if( empty( $matches ) ):
			return false;
		else:
			return array_shift( $matches );
		endif;

	}

}
