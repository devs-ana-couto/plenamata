<?php
class code extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Código' );
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

		// Valor
		$value = is_array( $field[ 'value' ] ) ? reset( $field[ 'value' ] ) : $field[ 'value' ];

		// Campo number
		$number_settings = $field;
		$number_settings[ 'ftype' ] = 'number';
		$number_settings[ 'value' ] = $value;
		// Disabilita o campo, se já foi informado algum valor
		if( (int)$value > 0 ):
			//Parent::add_attributes( $number_settings, array( 'disabled' => 'disabled' ) );
		endif;

		// Classe do campo número
		$n = new number();
		return $n->get_field( $number_settings );

	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		elseif( !empty( $field[ 'value' ] ) && !is_numeric( $field[ 'value' ] ) ):
			$error = PikiField::getErrorMessage( $field, 'justnumbers' );
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;
	
	}

	public static function save_meta( $field, $ID, $value ){

		global $wpdb;

		// Tipo de post
		$post_type = get_post_type( $ID );
		// Valor atual
		$actual_value = get_post_meta( $ID, $field[ 'machine_name' ], true );

		// Se o valor já foi setado, não fazemos nada
		if( (int)$actual_value > 0 ) return;

		// Verificamos se o valor existe
		$exists = $wpdb->get_var($wpdb->prepare(
			"SELECT POST.ID FROM $wpdb->posts POST, $wpdb->postmeta META WHERE META.post_id = POST.ID AND META.meta_key = '%s' AND META.meta_value = '%s' AND POST.post_type = '%s' AND POST.ID <> %d LIMIT 1",
			array(
				$field[ 'machine_name' ], // Nome do campo
				$value, // Valor informado
				$post_type, // Tipo de post,
				$ID // ID do post
			)
		));
		if( (int)$exists > 0 ) return;

		// Fazemos o update no banco
		call_user_func( 'update_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );

	}


	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required' ));
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
