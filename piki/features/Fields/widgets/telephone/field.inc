<?php
class telephone extends PikiField {
	
	function __construct(){
		// Label do campo
		self::$label = 'Telefone';
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
	
		// Modelagem banco
		$field[ 'sqlrpc' ] = self::getReplacement();

		// Mask
		$field[ 'format' ] = _array_get( $field, 'format', 'mobile' );
		$field[ 'mask' ] = ( $field[ 'format' ] == 'mobile' ? '(00) 00000-0000' : '(00) 0000-0000' );

		// Prefixo
		if( on( $field, 'prefixo' ) ):
			parent::add_classname( $field, 'with-prefix' );
		endif;
	
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){
		
		$html = on( $field, 'prefixo' ) ? '<div class="ftype-phone-wrapper with-prefix">' : '';
	
		// Formato
		$format = _array_get( $field, 'format', 'mobile' );
		
		// Maxlength
		$maxlength = strlen( $field[ 'mask' ] );

		// Prefixo
		if( on( $field, 'prefixo' ) ):
			
			$val_prefixo = isset( $field[ 'value' ][ 'prefixo' ] ) ? $field[ 'value' ][ 'prefixo' ] : '';
			$html .= '<span class="wrapper-prefix"><input type="tel" name="'. parent::get_subfield_name( $field, 'prefixo' ) . '" id="'. parent::get_subfield_id( $field, 'prefixo' ) .'" class="prefix" value="'. $val_prefixo .'" maxlength="2" /></span>';
			
			// HTML
			$val_number = isset( $field[ 'value' ][ 'number' ] ) ? $field[ 'value' ][ 'number' ] : '';
			$html .= '<span class="wrapper-number"><input type="tel" name="'. parent::get_subfield_name( $field, 'number' ) . '" id="'. parent::get_subfield_id( $field, 'number' ) .'" class="number" data-format="'. $format .'"  value="'. $val_number .'" maxlength="'. $maxlength .'" /></span>';
			$html .= '</div>';

		else:

			PikiField::add_attributes(
				$field, 
				array(
					'maxlength' => $maxlength,
					'class' => 'number',
					'data-format' => $format,
				)
			);
			$html .= text::get_field( $field );

		endif;

		$html .= on( $field, 'prefixo' ) ? '</div>' : '';

		Piki::add_library( 'fields-masks' );
	
		return $html;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		// Com prefixo
		if( on( $field, 'prefixo' ) ):

			$prefix = _array_get( $field[ 'value' ], 'prefixo', '' );
			$number = _array_get( $field[ 'value' ], 'number', '' );
			$empty = empty( $prefix ) && empty( $number );

		else:

			$number = _array_get( $field, 'value', '' );
			$empty = empty( $number );

		endif;

		// Se todo o campo está vazio
		if( $empty ):
			
			if( on( $field, 'required' ) ):
				return PikiField::getErrorMessage( $field, 'required' );
			endif;
		
		// Se alguma parte foi preenchida
		else:

			// Prefixo
			if( on( $field, 'prefixo' ) ):
				
				if( empty( $prefix ) ):
					return 'Informe o prefixo no campo ' . $field[ 'label' ];
				elseif( !ctype_digit( $prefix ) ):
					return 'O prefixo no campo ' . $field[ 'label' ] . ' deve conter apenas números';
				elseif( strlen( $prefix ) < 2 ):
					return 'O prefixo no campo ' . $field[ 'label' ] . ' deve conter 2 dígitos';
				endif;

			endif;

			// Number
			if( empty( $number ) ):

				return 'Informe o número no campo ' . $field[ 'label' ];

			else:
				
				$format = _array_get( $field, 'format', 'mobile' );
				
				if( !self::isPhoneNumber( $number, $format ) ):				
					return PikiField::getErrorMessage( $field, 'format', array( '{FORMAT}' => $field[ 'mask' ] ), 'O número no campo {LABEL} deve ter o formato {FORMAT}' );
				endif;

			endif;

		endif;

		return true;	
	
	}

	public static function isPhoneNumber( $number, $format = 'mobile' ){
		$regex = $format == 'mobile' ? "/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/" : "/^\([0-9]{2}\) [0-9]{4}-[0-9]{4}$/";
		return preg_match( $regex, $number );
	}

	public static function db_encode( $field, $value ){
		// Verifiva se o número digitado contém todos os digitos
	    return preg_replace('/[^0-9]/', '', $value );
	}

	public static function db_decode( $field, $value ){

		if( !is_array( $value ) ) return self::decode_item( $field, $value );

		foreach( $value as &$item ):
			if( on( $field, 'prefixo' ) && !is_array( $item ) ):
				$item = maybe_unserialize( $item );
			endif;
		endforeach;

		return $value;
	
	}

	public static function decode_item( $field, $value ){
		
		if( on( $field, 'prefixo' ) ):
		
			if( empty( $value ) || empty( $value[ 'number' ] ) ):
				return $value;
			endif;
			
			$value = maybe_unserialize( $value );

		endif;

		return $value;

	}

	public static function format( $value ){

		if( is_array( $value ) && isset( $value[ 'number' ] ) ):

			if( empty( $value[ 'number' ] ) ):
				return '';
			endif;
			
			// Tamanho
			$size = strlen( $value[ 'number' ] );
			// Primeira parte
			$number = substr( $value[ 'number' ], 0, ( $size === 9 ? 5 : 4 ) );
			// Segunda parte
			$parte_dois = substr( $value[ 'number' ], ( $size === 9 ? 5 : 4 ), 4 );
			if( !empty( $parte_dois ) ):
				$number .= '-' . $parte_dois;
			endif;

			// Prefixo
			if( !empty( $value[ 'prefixo' ] ) ): 
				$number = '(' . $value[ 'prefixo' ] . ') ' . $number;
			endif;

		else:

			$value = is_array( $value ) ? reset( $value ) : $value;
			$number = self::_format( $value );

		endif;

		return $number;
	
	}

	public static function _format( $phone ){

	    $formatedPhone = preg_replace('/[^0-9]/', '', $phone);
	    $matches = [];
	    preg_match('/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/', $formatedPhone, $matches);
	    if ($matches) {
	        return '('.$matches[1].') '.$matches[2].'-'.$matches[3];
	    }

	    return $phone;
	}

	// Create phone URL
	public static function url( $number, $country = '55' ){

		if( empty( $number ) ) return false;

		$output = preg_replace( '/[^0-9]/', '', $number );

		if( $country === '55' && strpos( $output, '55' ) !== 0 ):
			$output = '55' . $output;
		endif;

		return 'tel:+' . $output;

	}

	public static function renderize_values( $field, $options = [] ){

		$value = _array_get( $field, 'value' );
		if( empty( $value ) ) return '';

		if( on( $options, 'whatsapp' ) ):

			$title = _array_get( $options, 'title', 'Iniciar conversa' );

			return '<a href="https://wa.me/' . ( strpos( $value, '55' ) === false ? '55' : '' ) . $value . '" title="' . $title . '" target="_blank">' . self::format( $value ) . '</a>';
		
		else:
		
			return self::format( $value );
		
		endif;
		
	}


	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'placeholder', 'required' ) );
		$fields[ 'prefixo' ] = array(
			'label' => 'Mostrar campo de prefixo?',
			'machine_name' => 'prefixo',
			'ftype' => 'boolean',
			'hide_label' => false,
			'required' => false,
		);
		$fields[ 'format' ] = array(
			'label' => 'Formato',
			'machine_name' => 'format',
			'ftype' => 'select',
			'options' => array(
				'fixo' => 'Fixo',
				'celular' => 'Celular',
			),
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
