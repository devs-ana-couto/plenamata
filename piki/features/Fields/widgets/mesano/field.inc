<?php
class mesano extends PikiField {
	
	function __construct(){
		// Label do campo
		self::$label = 'Mês/Ano';
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

	// Constroi o campo do tipo select
	public static function get_field( $field ){

		$options = self::get_options();
		$s = new select();

		if( is_array( $field[ 'value' ] ) && !isset( $field[ 'value' ][ 'month' ] ) ):
			$field[ 'value' ] = array_shift( $field[ 'value' ] );
		endif;

		// Years Field
		$field_years = $field;
		$field_years[ 'options' ] = $options[ 'years' ];
		$field_years[ 'placeholder' ] = 'Ano';
		$field_years[ 'id' ] = PikiField::get_subfield_id( $field_years, 'year' );
		$field_years[ 'name_html' ] = PikiField::get_subfield_name( $field_years, 'year' );
		$field_years[ 'value' ] = $field[ 'value' ][ 'year' ];
		PikiField::add_attributes( $field_years, array(
			'class' => array( 'years' ),
		));
		$field_years = $s->get_field( $field_years );

		// Monts Field
		$field_months = $field;
		$field_months[ 'options' ] = $options[ 'months' ];
		$field_months[ 'placeholder' ] = 'Mês';
		$field_months[ 'id' ] = PikiField::get_subfield_id( $field_months, 'month' );
		$field_months[ 'name_html' ] = PikiField::get_subfield_name( $field_months, 'month' );
		$field_months[ 'value' ] = $field[ 'value' ][ 'month' ];
		PikiField::add_attributes( $field_months, array(
			'class' => array( 'months' ),
		));
		$field_months = $s->get_field( $field_months );

		return $field_months . $field_years;
	}

	public static function get_options(){
		// Anos
		$years = range( date('Y')-120, date('Y') );
		rsort( $years );
		$years = array_combine ( $years, $years );
		// Meses
		$months = array(
			'1' => 'Janeiro',
			'2' => 'Fevereiro',
			'3' => 'Março',
			'4' => 'Abril',
			'5' => 'Maio',
			'6' => 'Junho',
			'7' => 'Julho',
			'8' => 'Agosto',
			'9' => 'Setembro',
			'10' => 'Outubro',
			'11' => 'Novembro',
			'12' => 'Dezembro',
		);
		// Retorno
		return array(
			'years' => $years,
			'months' => $months,
		);
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


	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		
		// Mês
		$month = isset( $value[ 'month' ] ) && !empty( $value[ 'month' ] ) ? str_pad( $value[ 'month' ], 2, 0, STR_PAD_LEFT )  : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_month', $month );
		
		// Ano
		$year = isset( $value[ 'year' ] ) && !empty( $value[ 'year' ] ) ? $value[ 'year' ] : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_year', $year );
		
		// Valor completo
		$complete = !empty( $month ) && !empty( $year ) ? $year . '-' . $month : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $complete );
	
	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor completo
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		// Remove o valor do mês
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_month' );
		// Remove o valor do ano
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_year' );
	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = false ){

		// Se não existe um valor cadastrado ainda
		if( !isset( $values[ $field[ 'machine_name' ] ] ) ):
			return array( array( 'month' => '', 'year' 	=> '' ) );
		endif;

		$value = array();
		foreach( $values[ $field[ 'machine_name' ] ] as $weight => $item ):
			$value[ $weight ] = array(
				'month' => $values[ $field[ 'machine_name' ] . '_month' ][ $weight ], 
				'year' => $values[ $field[ 'machine_name' ] . '_year' ][ $weight ],
			);
		endforeach;
		return $value;
	}

	public static function renderize_values( $field, $values, $key=0 ){
		$itemval = $values[ $key ];
		if( empty( $itemval[ 'month' ] ) && empty( $itemval[ 'year' ] ) ):
			return 'Não informada';
		endif;
		$options = self::get_options();
		if( !empty( $itemval[ 'month' ] ) ):
			$itemval[ 'month' ] = $options[ 'months' ][ $itemval[ 'month' ] ];
		endif;
		return implode( ' de ', $itemval );
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}