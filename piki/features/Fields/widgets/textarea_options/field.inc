<?php
class textarea_options extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Caixa de lista de opções' );
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

		// Se o valor é um array
		if( is_array( $field[ 'value' ] ) ):
			
			// Primeiro valor do array
			$vkeys = array_keys( $field[ 'value' ] );
			$first_value = $field[ 'value' ][ array_shift( $vkeys ) ];

			// Se for falso, não faz nada
			if( $first_value === false ):

				$field[ 'value' ] = false;

			// Se o primeiro valor é uma string, implodimos
			elseif( is_array( $first_value ) ):
				
				$field[ 'value' ] = self::implode_value( $first_value );

			elseif( is_string( $first_value ) ):
				
				$field[ 'value' ] = self::implode_value( $field[ 'value' ] );

			endif; 
		
		endif;

		$html = '<div class="hold-textarea"><textarea name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'"';
		parent::set_attributes( $html, $field );
		$html .= '>';
		
		// Valor fornecido
		if( !empty( $field[ 'value' ] ) ):
			
			$html .= $field[ 'value' ];

		// Campo em branco com valor padrão
		elseif( $field[ 'value' ] === false && !empty( $field[ 'default_value' ] ) ):
			$html .= self::implode_value( $field[ 'default_value' ] );
		
		endif;

		$html .= '</textarea></div>';
		return $html;
	
	}

	// Salva os dados no banco
	public static function save_meta( $field, $ID, $value ){
		
		$splited = self::explode_value( $value );
		
		self::merge_values( $splited, $field );
		
		$serial = self::db_encode( $field, $splited );
		
		call_user_func( 'add_'. $field[ 'data_type' ] .'_meta', $ID, $field[ 'machine_name' ], $serial );
	
	}

	// Formato para banco
	public static function db_encode( $field, $value ){
		// Quebra a string
		if( is_string( $value ) ):
			$value = self::explode_value( $value );
		endif;
		// Faz o merge com os valores padrão
		self::merge_values( $value, $field );
		// Encoda para o formato de banco
		return base64_encode( serialize( $value ) );
	}

	// Formato para aplicação
	public static function db_decode( $field, $value ){
		if( is_array( $value ) ):
			foreach( $value as &$value_item ):
				$value_item = @unserialize( @base64_decode( $value_item ) );
			endforeach;
			return $value;
		else:
			return unserialize( base64_decode( $value ) );
		endif;
	}

	// Se existem valores padrões a serem mesclados com os valores informados
	public static function merge_values( &$value, $field ){
		
		if( is_string( $value ) && $value != '' ):
			self::explode_value( $value );
		endif;
		
		if( isset( $field[ 'default_value' ] ) && on( $field, 'merge_with_defaults' ) ):
			if( is_string( $field[ 'default_value' ] ) && $field[ 'default_value' ] != '' ):
				$defaults = self::explode_value( $field[ 'default_value' ] );
			else:
				$defaults = $field[ 'default_value' ];
			endif;
			$value = !$value ? $defaults : array_merge( $defaults, $value );
		endif;
	}

	// Transforma o array de valores em string
	public static function implode_value( $value ){
		// Se não for um array
		if( is_string( $value ) ):
			return $value;
		endif;

		// Implode o array de valores
		$tostr = array();
		foreach ( $value as $key => $item ):
			if( $item === false ) continue;
			$tostr[] = $key . '|' . $item;
		endforeach;
		return implode( "\r", $tostr );
	
	}

	// Transoforma a string do valor em array
	public static function explode_value( $value ){
		
		if ( !$value || $value == '' ) {
			return false;
		}

		$exploded = $array = preg_split("/\r\n|\n|\r/", trim( $value ) );
		$options = array();
		
		foreach ( $exploded as $key_item => $item_value ):
			$pcs = explode( '|', trim( $item_value ) );
			if ( count( $pcs ) == 1 ):
				$options[ $key_item ] = trim( $pcs[ 0 ] );
			else:
				$options[ trim( $pcs[ 0 ] ) ] = trim( $pcs[ 1 ] );
			endif;
		endforeach;
		
		return $options;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
