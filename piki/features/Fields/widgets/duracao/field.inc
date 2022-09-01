<?php
class duracao extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Duração';
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

		$value = _array_get( $field, 'value' );
		
		if( parent::is_required( $field ) && empty( $value ) ):
			
			$error = PikiField::getErrorMessage( $field, 'required' );
		
		elseif( !empty( $value ) ):


			echo '<pre>';
			echo 'teste' . "\r\n";
			exit;
			

			if( !preg_match( '/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/', $value[ 'date' ] ) ):
			
				$error = PikiField::getErrorMessage( $field, 'invalid' );

			else:

				// Validando a data o formato
				$date = DateTime::createFromFormat( 'd/m/Y H:i', $value[ 'date' ] . ' ' . $value[ 'hour' ] );
				if( !$date ):
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
		$fields = PikiFields::get_comum_fields();
		return $fields;
	}

}
