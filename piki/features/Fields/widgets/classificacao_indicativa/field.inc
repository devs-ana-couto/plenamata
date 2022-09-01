<?php
class classificacao_indicativa extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Classificação indicativa';
	}

	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		parent::add_attributes( $field, array( 'class' => 'inline-childs' ) );
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		// Valor único
		if( isset( $field[ 'value' ][ 0 ] ) ):
			$field[ 'value' ] = array_shift( $field[ 'value' ] );
		endif;

		// Valor mínimo
		$val_min = isset( $field[ 'value' ][ 'min' ] ) && (int)$field[ 'value' ][ 'min' ] > 0 ? $field[ 'value' ][ 'min' ] : '';
		// Valor máximo
		$val_max = isset( $field[ 'value' ][ 'max' ] ) && (int)$field[ 'value' ][ 'max' ] > 0 ? $field[ 'value' ][ 'max' ] : '';

		$n = new number();

		$min = $field; $min[ 'maxlength' ] = 2; $min[ 'value' ] = $val_min;
		$max = $field; $max[ 'maxlength' ] = 2; $max[ 'value' ] = $val_max;
		
		parent::set_as_child( $min, 'min' );
		parent::set_as_child( $max, 'max' );
		
		$html = '<div class="child-item"><span>Mínimo:</span>' . $n->get_field( $min ) . '</div>';
		$html .= '<div class="child-item"><span>Máximo:</span>' . $n->get_field( $max ) . '</div>';

		return $html;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		exit( 'classificacao_indicativa : Implementar validação' );
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		
		// Adiciona o mínimo
		$min = isset( $value[ 'min' ] ) ? $value[ 'min' ] : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_min', $min );
		
		// Adiciona o máximo
		$max = isset( $value[ 'max' ] ) ? $value[ 'max' ] : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_max', $max );

	}

	public static function get_meta( $field, $ID ){
		
		// Recupera os estados
		$min = get_post_meta( $ID, $field[ 'machine_name' ] . '_min' );
		// Recupera as cidades
		$max = get_post_meta( $ID, $field[ 'machine_name' ] . '_max' );
		
		// Retorno
		$values = array();

		// Se existe algum estado cadastrado, organizamos os valores
		if( is_array( $min ) ):
			// Percorre os estados
			foreach( $min as $weight => $min_value ):
				// Adiciona o estado no array de valores
				$values[ $weight ] = array( 'min' => $min_value );
				// Se a cidade foi escolhida, adicionamos o ID da cidade no array
				$values[ $weight ][ 'max' ] = isset( $max[ $weight ] ) ? $max[ $weight ] : 0;
			endforeach;
		else:
			// Array com valor vazio
			$values[] = array(
				'min' => false,
				'max' => false
			);
		endif;

		// Retorno
		return $values;

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_min' );
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_max' );
	}

	public static function renderize_values( $field, $options=array() ){

		global $wpdb;

		$min = empty( $field[ 'value' ][ 'min' ] ) ? 0 : (int)$field[ 'value' ][ 'min' ];
		$desc = $min === 0 ? 'L' : $min;
		if( isset( $field[ 'value' ][ 'max' ] ) && !empty( $field[ 'value' ][ 'max' ] ) && (int)$field[ 'value' ][ 'max' ] > $min ):
			$desc = $field[ 'value' ][ 'min' ] . ' a ' . $field[ 'value' ][ 'max' ] . ' anos';
		endif;

		$cor = '1';
		if( $min >= 1 ):
			if( $min <= 10 ):
				$cor = '2';
			elseif( $min > 10 && $min <= 12 ):
				$cor = '3';
			elseif( $min > 12 && $min <= 14 ):
				$cor = '4';
			elseif( $min > 14 && $min <= 16 ):
				$cor = '5';
			elseif( $min >= 18 ):
				$cor = '6';
			endif;
		endif;

		return '<span class="ico-info cor-' . $cor . '">'. $desc .'</span>';

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}