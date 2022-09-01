<?php
class avatar extends PikiField {
	
	function __construct(){
		// Label do campo
		self::$label = 'Avatar';
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

	// Constroi o campo do tipo Avatar
	public static function get_field( $field ){

		$s = new select();
		$options = self::get_options();

		self::normalize_value( $field );

		// Select
		$select = $field;

		$select[ 'ftype' ] = 'select';
		$select[ 'required' ] = 'false';
		$select[ 'options' ] = $options;
		$select[ 'placeholder' ] = 'Escolha';

		$html = $s->get_field( $select );

		$html .= '
		<div class="widget">
			<span class="mask"></span>
			<div class="options">
		';
		foreach ( $options as $key => $option ) {
			// Se o campo está marcado
			$html .= '<img src="'. self::get_path() .'/'. $option .'" alt="Opção '. $key .'" rel="' . $key . '" />';
		}
		$html .= '
			</div>
			<span class="arrow left">Anterior</span>
			<span class="arrow right">Próximo</span>
		</div>
		';

		return $html;

	}

	public static function normalize_value( &$field ){
		$value = false;
		if( is_array( $field[ 'value' ] ) ):
			$value = $field[ 'value' ][ $field[ 'field_index' ] ];
		endif;
		if( !is_numeric( $value ) ):
			$value = unserialize( $value );
		elseif( is_numeric( $value ) ):
			$value = array( $value );
		endif;
		$field[ 'value' ] = $value;
		return $field;
	}

	public static function get_path(){
		return Piki::url( 'images/', __FILE__ );
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$error = '';
		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			$error = 'O campo "' . $field[ 'label' ] . '" é obrigatório.';
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}

	public static function renderize_values( $field, $values, $key=0 ){

		if( !isset( $values[ $key ] ) ):
			return '';
		endif;

		$field[ 'value' ] = $values;
		$field[ 'field_index' ] = $key;

		self::normalize_value( $field );

		return self::get_item_url( $field[ 'value' ] );
	}

	public static function get_options(){

		return array(
			'1' => 'avatar-01.png',
			'2' => 'avatar-02.png',
			'3' => 'avatar-03.png',
			'7' => 'avatar-07.png',
			'4' => 'avatar-04.png',
			'5' => 'avatar-05.png',
			'6' => 'avatar-06.png',
			'8' => 'avatar-08.png',
			'9' => 'avatar-09.png',
			'10' => 'avatar-10.png',
		);

	}

	public static function get_item_url( $item ){
		$options = self::get_options();
		if( is_array( $item ) ):
			$item = array_shift( $item );
		endif;
		return self::get_path() . '/' . $options[ $item ];
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}