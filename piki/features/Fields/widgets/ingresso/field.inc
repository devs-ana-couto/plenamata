<?php
class ingresso extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Ingresso';
	}
		
	// Configurações específicas do campo
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
		$val_inteira = isset( $field[ 'value' ][ 'inteira' ] ) ? $field[ 'value' ][ 'inteira' ] : '';
		
		// Valor máximo
		$val_meia = isset( $field[ 'value' ][ 'meia' ] ) ? $field[ 'value' ][ 'meia' ] : '';

		$t = new text();

		$inteira = $field; $inteira[ 'value' ] = $val_inteira;
		$meia = $field; $meia[ 'value' ] = $val_meia;
		
		parent::set_as_child( $inteira, 'inteira' );
		parent::set_as_child( $meia, 'meia' );
		
		$html = '<div class="child-item"><span>Inteira:</span>' . $t->get_field( $inteira ) . '</div>';
		$html .= '<div class="child-item"><span>Meia:</span>' . $t->get_field( $meia ) . '</div>';

		return $html;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		exit( 'field ingresso : Implementar validação' );
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		
		// Adiciona o mínimo
		$inteira = isset( $value[ 'inteira' ] ) ? $value[ 'inteira' ] : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_inteira', $inteira );
		
		// Adiciona o máximo
		$meia = isset( $value[ 'meia' ] ) ? $value[ 'meia' ] : '';
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_meia', $meia );		

	}

	public static function get_meta( $field, $ID ){
		
		// Inteira
		$inteira = get_post_meta( $ID, $field[ 'machine_name' ] . '_inteira' );
		// Meia
		$meia = get_post_meta( $ID, $field[ 'machine_name' ] . '_meia' );
		
		// Retorno
		$values = array();

		// Se existe algum estado cadastrado, organizamos os valores
		if( is_array( $inteira ) ):
			
			// Percorre os estados
			foreach( $inteira as $weight => $inteira_value ):
				// Adiciona o estado no array de valores
				$values[ $weight ] = array( 'inteira' => $inteira_value );
				// Se a cidade foi escolhida, adicionamos o ID da cidade no array
				$values[ $weight ][ 'meia' ] = isset( $meia[ $weight ] ) ? $meia[ $weight ] : 0;
			endforeach;
		
		else:
			
			// Array com valor vazio
			$values[] = array(
				'inteira' => false,
				'meia' => false
			);
		
		endif;

		// Retorno
		return $values;

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_inteira' );
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_meia' );
	}


	public static function renderize_values( $field, $options=array() ){

		$desc = '<span class="ico-info cor-8">$</span>';

		if( empty( $field[ 'value' ][ 'inteira' ] ) && empty( $field[ 'value' ][ 'meia' ] ) ):
			$desc .= '<strong>Entrada franca</strong>';
		else:
			$desc .= '<span class="item"><strong>Inteira</strong> ' . $field[ 'value' ][ 'inteira' ] . '</span>';
			if( !empty( $field[ 'value' ][ 'meia' ] ) ):
				$desc .= '<span class="item"><strong>Meia</strong> ' . $field[ 'value' ][ 'meia' ] . '</span>';
			endif;
		endif;
		
		return $desc;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}