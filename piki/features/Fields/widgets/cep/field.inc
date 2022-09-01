<?php
class cep extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'CEP' );
		// Configurações específicas do campo

	}
	
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'maxlength' ] = 9;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo do tipo select
	public static function get_field( $field ){

		$html = '<input type="text" name="' . $field[ 'name_html' ] . '" id="' . $field[ 'id' ] . '"';
		parent::set_value( $html, $field );
		parent::add_attributes( $field, array( 'class' => 'ftype-text', 'maxlength' => '8' ) );
		if( on( $field, 'usebase' ) ):
			parent::add_attributes( $field, array( 'data-use-database' => 'true' ) );
		endif;
		parent::set_attributes( $html, $field );
		$html .= " />";

		// Help with CEP
		$hide_help = !isset( $field[ 'hide_help' ] ) || $field[ 'hide_help' ] === true;
		if( !$hide_help ):
			$html .= '<a href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCep.cfm" class="link-consulta-cep" target="_blank">Não sei meu CEP</a>';
		endif;
		
		return $html;

	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			return PikiField::getErrorMessage( $field, 'required' );
		endif;
		
		if( !empty( $field[ 'value' ] ) ):

			if( !self::validate_format( $field[ 'value' ] ) ):
				return PikiField::getErrorMessage( $field, 'format' );
			elseif( !self::check_value( $field[ 'value' ] ) ):
				return PikiField::getErrorMessage( $field, 'invalid' );
			endif;

		endif;

		return true;
	
	}

	public static function validate_format( $cep ){
		return preg_match( "/^[0-9]{5}-[0-9]{3}$/", $cep );
	}

	public static function check_value( $cep ){

		$cep = preg_replace( '/[^0-9]/', '', $cep );

		// Minimum value
		if( intVal( $cep ) < intVal( '01001000' ) ):
			return false;
		endif;

		return true;
		
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		$fields[ 'usebase' ] = array(
			'label' => 'Consltar na base?',
			'ftype' => 'boolean',
			'machine_name' => 'usebase'
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}