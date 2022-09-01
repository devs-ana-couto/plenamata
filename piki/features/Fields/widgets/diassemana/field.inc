<?php
class diassemana extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Didas da semana';
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){

		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'options' ] = [
			'segunda' => 'Segunda',
			'terca' => 'Terça',
			'quarta' => 'Quarta',
			'quinta' => 'Quinta',
			'sexta' => 'Sexta',
			'sabado' => 'Sábado',
			'domingo' => 'Domingo',
		];

		return $field;

	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){
		$c = new checkboxes;
		return $c->get_field( $field );
		return $html;
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		return checkboxes::validate( $field, $settings );
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){

		// Desc
		$desc_values = array();
		
		// Opções
		foreach( $field[ 'options' ] as $key => $label ):
			
			// Valor
			$option_value = isset( $value[ $key ] ) ? $key : '';
			
			// Desc values
			if( $option_value !== '' ):
				$desc_values[] = $label;
			endif;
			
			// Adiciona o valor do dia
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_' . $key, $option_value );
		
		endforeach;
		
		// Adiciona o valor textual
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], implode( ', ', $desc_values ) );

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){

		// Opções
		foreach( $field[ 'options' ] as $key => $label ):
			// Remove o valor
			call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_' . $key );
		endforeach;
		// Remove o valor textual
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );

	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = false ){

		// Retorno
		$return = array();

		// Nome do campo
		$mname = $field[ 'machine_name' ];

		// Textual values
		$textuals = isset( $values[ $mname ] ) ? $values[ $mname ] : array();

		foreach( $textuals as $weight => $value ):

			$return[ $weight ] = array();

			foreach( $field[ 'options' ] as $key_dia => $label_dia ):

				$subname = $mname . '_' . $key_dia;
				$subvalue = isset( $values[ $subname ][ $weight ] ) ? $values[ $subname ][ $weight ] : false;

				if( $subvalue == $key_dia ):
					$return[ $weight ][ $key_dia ] = $key_dia;
				endif;

			endforeach;

		endforeach;

		// Retorno
		return $return;

	}

	// Renderiza os valores do campo
	public static function renderize_values( $field, $options=false ){

		// Valores avulços
		$values = array();
		
		// Valores unidos
		$unions = array();
		
		foreach ( $field[ 'options' ] as $key => $label ):
			// Se o valor foi marcado
			if( isset( $field[ 'value' ][ $key ] ) ):
				$unions[] = $key;
			// Valor não marcado
			else:
				// Se temos ítems unidos
				if( !empty( $unions ) ):
					// Se os ítems unidos são maiores ou iguais a 3
					if( count( $unions ) > 2 ):
						// Adicionamos o intervalo
						$values[] = array(
							array_shift( $unions ),
							array_pop( $unions ),
						);
					// Adicionamos os valores avulços
					else:
						$values = $values + $unions;
					endif;
				endif;
				$unions = array();
			endif;
		endforeach;

		// Se sobrarem valores no array de uniões
		if( !empty( $unions ) ):
			if( count( $unions ) > 2 ):
				$values[] = array(
					array_shift( $unions ),
					array_pop( $unions ),
				);
			else:
				$values = $values + $unions;
			endif;
		endif;

		$plural = isset( $options[ 'plural' ] ) ? 's' : '';

		// Setting descs
		$towrite = array();
		foreach( $values as $key2 => $value2 ):
			if( is_array( $value2 ) ):
				$towrite[] = $field[ 'options' ][ $value2[ 0 ] ] . $plural . ' à ' . $field[ 'options' ][ $value2[ 1 ] ] . $plural;
			else:
				$towrite[] = $field[ 'options' ][ $value2 ] . $plural;
			endif;
		endforeach;

		// Apenas um valor
		if( count( $towrite ) === 1 ):
			return array_shift( $towrite );
		// Dois valores
		elseif( count( $towrite ) === 2 ):
			return implode( ' e ', $towrite );
		// Mais de dois valores
		else:
			$last = array_pop( $towrite );
			return implode( ', ', $towrite ) . ' e ' . $last;
		endif;

	}


	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}


}