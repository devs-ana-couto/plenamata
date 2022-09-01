<?php
class money extends PikiField {
	
	// Label do campo
	function __construct(){
		self::set_label( 'Money' );
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

		// Script
		$html = '<input type="text" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'" data-int="'. ( on( $field, 'int' ) ? 'true' : 'false' ) .'"';
		parent::set_value( $html, $field );
		parent::set_attributes( $html, $field );
		$html .= ">";
		
		return $html;
	}

	// Formato para banco
	public static function db_encode( $field, $value ){
		if( !is_array( $value ) ):
			$return = str_replace( '.', '', $value );
		else:
			$return = array();
			foreach( $value as $key => $val ):
				if( !empty( $val ) ):
					$return[ $key ] = str_replace( '.', '', $val );
				endif;
			endforeach;
		endif;
		return $return;
	}

	// Formato para aplicação
	public static function db_decode( $field, $value ){
		if( !is_array( $value ) ):
			$return = money::format( $value, $field );
		else:
			$return = array();
			foreach( $value as $key => $val ):
				if( !empty( $val ) ):
					if( !is_numeric( $val ) ):
						$val = str_replace( ',', '.', $val );
					endif;
					$return[ $key ] = money::format( $val, $field );
				endif;
			endforeach;
		endif;
		return $return;
	}

	// Renderize values
	public static function renderize_values( $field, $options = array() ){

		$value = _array_get( $field, 'value' );
		$int = on( $options, 'int' ) || on( $field, 'int' );

		if( on( $options, 'descs' ) ):

			$value = money::descNumber( $value );

		elseif( on( $options, 'clear' ) ):

			$value = str_replace( '.', '', $value );

		elseif( $int ):

			$value = explode( ',', $value );
			$value = reset( $value );
		
		endif;

		return $value;

	}

	public static function descNumber( $total ){
			
		$desc = explode( ',', $total );
		$desc = reset( $desc );
		$desc = str_replace( '.', '', $desc );

		// Bililions
		$bilions = $desc / 1000000000;
		// Miliions
		$milions = $desc / 1000000;
		// Thousands
		$thousands = $desc / 1000;

		if( $bilions >= 1 ):
			$return = trim( !is_int( $bilions ) ? number_format( $bilions, 2, ',', '.' ) : $bilions, '0' ) . ( $bilions > 1 ? ' bi<span>lhões</span>' : ' bi<span>lhão</span>' );
		elseif( $milions >= 1 ):
			$return = trim( !is_int( $milions ) ? number_format( $milions, 2, ',', '.' ) : $milions, '0' ) . ( $milions > 1 ? ' mi<span>lhões</span>' : ' mi<span>lhão</span>' );
		elseif( $thousands >= 1 ):
			$return = trim( !is_int( $thousands ) ? number_format( $thousands, 2, ',', '.' ) : $thousands, '0' ) . ' mil';
		else:
			$return = $desc;
		endif;

		return $return;

	}

	public static function format( $value, $field = false ){
		if( on( $field, 'int' ) ):
			return number_format( $value, 0, ',', '.' );
		else:
			return number_format( $value, 2, ',', '.' );
		endif; 
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function dummy( $field ){

		$min = _array_get( $field, 'min', 10 );
		$max = _array_get( $field, 'max', 1000 );
		return rand( $min, $max );

	}

}
