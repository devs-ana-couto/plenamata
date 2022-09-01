<?php
class ano extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Ano';

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){

		$field[ 'sqlrpc' ] = self::getReplacement();
		
		// End year
		$end_year = (int)date( 'Y' );
		
		// Ano inicial
		$start_year = isset( $field[ 'start_year' ] ) && strlen( $field[ 'start_year' ] ) === 4 ? (int)$field[ 'start_year' ] : ( $end_year - 30 );
		
		// Options
		$field[ 'options' ] = array();
		for( $y = $end_year; $y >= $start_year; $y-- ):
			$field[ 'options' ][ $y ] = $y;
		endfor;
		
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){
		$s = new select();
		return $s->get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		
		$error = '';
		
		$month = !empty( $values[ 'month' ] ) ? $values[ 'month' ] : false;
		$year = !empty( $values[ 'year' ] )  ? $values[ 'year' ] : false;
		
		if( parent::is_required( $field ) && !$month ):
			
			$error = 'Escolha um mês';
		
		elseif( parent::is_required( $field ) && !$year ):
			
			$error = 'Escolha um ano';
		
		endif;
		
		if( $error != '' ):
			return $error;
		endif;
		
		return true;
	}

	// Renderiza o valor do campo
	public static function renderize_values( $field, $options ){
		if( empty( $field[ 'value' ] ) ):
			return 'Não informado';
		else:
			return $field[ 'value' ];
		endif;
	}

	public static function get_settings_fields( $values ){

		$fields_1 = PikiFields::get_comum_fields( array( 'ftype', 'label', 'machine_name', 'description' ) );
		$fields_2 = array(
			'start_year' => array(
				'label' => 'Ano inicial',
				'ftype' => 'number',
				'minlength' => 2,
				'maxlength' => 4,
				'machine_name' => 'start_year',
			)
		);
		$fields_3 = PikiFields::get_comum_fields( array( 'required', 'unique', 'hide_label' ) );
		$fields = array_merge( $fields_1, $fields_2, $fields_3 );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}