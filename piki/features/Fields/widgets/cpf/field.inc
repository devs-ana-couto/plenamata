<?php
class cpf extends PikiField {
	
	function __construct(){
		// Label do campo
		self::$label = 'CPF';
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		//$field[ 'mask' ] = "999.999.999-99";
		$field[ 'maxlength' ] = 11;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%d';
	}

	// Monta o campo
	public static function get_field( $field ){
		
		$html = '<input type="tel" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';
		
		// Value
		$value = isset( $field[ 'value' ] ) ? $field[ 'value' ] : '';
		if( is_array( $value ) ):
			$value = array_shift( $value );
		endif;
		if( $value === false && isset( $field[ 'default_value' ] ) && $field[ 'default_value' ] !== '' ):
			$value = $field[ 'default_value' ];
		endif;
		
		$html .= ' value="'. $value .'"';
		
		// Atributos
		parent::set_attributes( $html, $field );
		
		$html .= " />";
		
		return $html;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		if( parent::is_required( $field ) ):
		 	if( empty( $field[ 'value' ] ) ):
				return PikiField::getErrorMessage( $field, 'required' );
			elseif( !empty( $field[ 'value' ] ) && !self::is_cpf( $field[ 'value' ] ) ):
				return PikiField::getErrorMessage( $field, 'invalid' );
			endif;
		endif;
		return true;	
	}

	public static function is_cpf( $value ) {
		
		// Verifiva se o número digitado contém todos os digitos
	    $cpf = preg_replace( '/[^0-9]/', '', $value );

		// Verifica se nenhuma das sequências abaixo foi digitada, caso seja, retorna falso
	    if ( strlen( $cpf ) !== 11 || $cpf == '00000000000' || $cpf == '11111111111' || $cpf == '22222222222' || $cpf == '33333333333' || $cpf == '44444444444' || $cpf == '55555555555' || $cpf == '66666666666' || $cpf == '77777777777' || $cpf == '88888888888' || $cpf == '99999999999'):

			return false;
	   
		// Calcula os números para verificar se o CPF é verdadeiro
		else:

	        for ($t = 9; $t < 11; $t++) {
	            for ($d = 0, $c = 0; $c < $t; $c++) {
	                $d += $cpf{$c} * (($t + 1) - $c);
	            }
	 
	            $d = ((10 * $d) % 11) % 10;
	 
	            if ($cpf{$c} != $d) {
	                return false;
	            }
	        }
	 
	        return true;

	    endif;
	}

	public static function db_encode( $field, $value ){
		// Verifiva se o número digitado contém todos os digitos
	    return str_pad( preg_replace('/[^0-9]/', '', $value ), 11, '0', STR_PAD_LEFT );
	}

	public static function db_decode( $field, $value ){
		
		return $value;
		
		if( is_array( $value ) ):
			$value = array_shift( $value );
		endif;
		if( empty( $value ) ):
			return $value;
		endif;

		return self::format( $value );
	}

	public static function format( $value ){

		// Primeira parte
		$_value = substr( $value, 0, 3 );
		// Segunda parte
		$parte_dois = substr( $value, 3, 3 );
		if( !empty( $parte_dois ) ):
			$_value .= '.' . $parte_dois;
		endif;
		// Terceira parte
		$parte_tres   = substr( $value, 6, 3 );
		if( !empty( $parte_tres ) ):
			$_value .= '.' . $parte_tres;
		endif;
		// Quarta parte
		$parte_quatro   = substr( $value, 9, 2 );
		if( !empty( $parte_quatro ) ):
			$_value .= '-' . $parte_quatro;
		endif;
		return $_value;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields(array( 'placeholder', 'required' ));
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}