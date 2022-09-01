<?php
class text extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Texto de uma linha' );

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

		$html = '<input type="'. _array_get( $field, 'tagType', 'text' ) .'" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';

		if( isset( $field[ 'mask_type' ] ) && $field[ 'mask_type' ] != 'off' ):
			parent::add_attributes( $field, array( 'class' => array( 'ftype-' . $field[ 'mask_type' ] ) ));
		endif;

		// Pattern
		$pattern = _array_get( $field, 'pattern' );
		if( $pattern ):
			parent::add_attributes( $field, array( 'pattern' => '\d*' ) );
		endif;

		// Value
		$value = isset( $field[ 'value' ] ) ? $field[ 'value' ] : '';
		if( is_array( $value ) ):
			$value = array_shift( $value );
		endif;
		if( $value === false && isset( $field[ 'default_value' ] ) && $field[ 'default_value' ] !== '' ):
			$value = $field[ 'default_value' ];
		endif;
		$html .= " value='" . $value . "'";

		// Contador
		if( on( $field, 'show_counter' ) ):

			parent::add_attributes( $field, array(
				'--counter' => 'true',
				'class' => array( 'with-counter' )
			));
			Piki::add_library( 'counter' );

		endif;

		// Atributos
		parent::set_attributes( $html, $field );
		$html .= ">";
	
		return $html;
	
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){

		global $wpdb;

		if( on( $field, 'save_in_body' ) ):
			$wpdb->query($wpdb->prepare(
				"UPDATE $wpdb->posts SET post_content = %s WHERE ID = %d",
				[ $value, $ID ]
			));
		endif;
		
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );
	
	}

	public static function renderize_values( $field, $options = false ){

		if( empty( $field[ 'value' ] ) ):
			return '';
		endif;

		$value = _array_get( $field, 'value' );

		// Apply options
		$value = self::apply_options( $value, $options );

		$mask = _array_get( $field, 'mask_type' );
		switch ( $mask ):
			case 'time-hm':
				$format = isset( $options[ 'format' ] ) ? $options[ 'format' ] : 'H\hi';
				return date( $format, strtotime( $value ) );
			break;
			default:
				return $value;
			break;
		endswitch;
	}

	public static function apply_options( $value, $options ){
		
		// Apenas breaklines
		if( on( $options, 'breakline' ) ):
			$value = text::breaklines( $value );
		// Remove double spaces
		else:
			$value = str_replace( array( ' [br]', '  ', '  ', '  ' ), ' ', $value );
		endif;

		// Tags
		if( on( $options, 'tags' ) ):
			$value = text::tags( $value );
		else:
			$value = text::clearTags( $value );
		endif;

		// Trim text
		$trim = _array_get( $options, 'trim' );
		if( $trim ):
			$more = _array_get( $options, 'trim_more' );
			$value = wp_trim_words( $value, $trim, $more );
		endif;

		// Maybe url
		if( on( $options, 'maybe_url' ) ):
			$value = Piki::maybeURL( $value, $options );
		endif;

		// Strip tags
		if( on( $options, 'strip' ) ):
			$value = strip_tags( $value );
		endif;	

		return $value;
	
	}

	// Apenas tags
	public static function tags( $text, $break = false ){

		$text = strtr( $text, array(
			'[b]' => '<strong>',
			'[/b]' => '</strong>',
			'[span]' => '<span>',
			'[/span]' => '</span>',
			'[em]' => '<em>',
			'[/em]' => '</em>',
			'[u]' => '<u>',
			'[/u]' => '</u>',
			'[i]' => '<i>',
			'[/i]' => '</i>',
			'[c]' => '<code>',
			'[/c]' => '</code>',
			'[div]' => '<div>',
			'[/div]' => '</div>',
			'[mark]' => '<mark>',
			'[/mark]' => '</mark>',
			'[br]' => ' <br>',
		));
		
		if( $break ):
			$text = text::breaklines( $text );
		endif;
		
		return $text;
	
	}

	// Clear custom tags
	public static function clearTags( $text ){

		$cleared = str_replace(
			 [
				'[b]',
				'[/b]',
				'[span]',
				'[/span]',
				'[em]',
				'[/em]',
				'[u]',
				'[/u]',
				'[i]',
				'[/i]',
				'[c]',
				'[/c]',
				'[div]',
				'[/div]',
				'[mark]',
				'[/mark]',
				'[br]',
			],
			'',
			$text 
		);

		return $cleared;
	
	}

	// Apenas breaklines
	public static function breaklines( $text ){
		$text = preg_replace( "/\n/", ' <br>', $text );
		$text = str_replace( array( ' [br]', '  ', '  ', '  ' ), ' <br>', $text );
		return $text;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'placeholder', 'minlength', 'maxlength', 'required', 'hide_label' ) );
		$fields[ 'mask_type' ] = array(
			'label' => 'Máscara',
			'machine_name' => 'mask_type',
			'ftype' => 'select',
			'options' => array(
				'off' => 'Nenhuma',
				'bairro' => 'Bairro',
				'logradouro' => 'Logradouro',
				'complemento' => 'Complemento',
				'time-hm' => 'Horário',
				'time' => 'Tempo',
			),
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function dummy( $field ){

		$text = file_get_contents( __DIR__ .  '/dummy.txt' );
		$text = preg_split( "/\r\n|\n|\r/", $text );
		shuffle( $text );
		$text = array_slice( $text, 0, 5 );
		$text = implode( "\r\n\r\n", array_filter( $text ) );
		$max = _array_get( $field, 'maxlength' );

		return !$max ? $text : Piki::trim( $text, $max, 'chars', false );

	}

}
