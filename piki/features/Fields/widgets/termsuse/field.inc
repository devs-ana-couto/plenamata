<?php
class termsuse extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( __( 'Terms of use', 'piki' ) );

	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'hide_label' ] = 'on';
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo do tipo select
	public static function get_field( $field ){
		// Get field
		return boolean::get_field( $field );
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$error = '';
		if( parent::is_required( $field ) && $field [ 'value' ] !== 'on' ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}

	public static function save_meta( $field, $ID, $value ){

		// Valor final
		$value = ( $value === 'on' || $value === true ) ? 'on' : 'off';
		
		// Adicionamos o valor ao campo
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );

		// Se há um número máximo de ítems marcados, garantimos isso.
		if( $value === 'on' && (int)$field[ 'max_items' ] > 0 ):
			self::uncheck_others( $field, $ID, $value );
		endif;
	
	}

	public static function uncheck_others( $field, $ID, $value ){

		global $wpdb;

		// Post atual
		$post = get_post( $ID );

		// Total de ítems permitido
		$max_others = ( (int)$field[ 'max_items' ] ) - 1;

		// Ítems marcados
		$checkeds = $wpdb->get_col($wpdb->prepare(
			"SELECT ID FROM $wpdb->posts P LEFT JOIN $wpdb->postmeta M ON M.post_id = P.ID WHERE P.post_type = %s AND P.ID <> %d AND M.meta_key = %s AND M.meta_value = %s ORDER BY P.post_modified DESC",
			array(
				$post->post_type,
				$post->ID,
				$field[ 'machine_name' ],
				'on'
			)
		));

		// Se não temos ítems a mais, não fazemos nada
		if( empty( $checkeds ) || count( $checkeds ) <= $max_others ):
			return false;
		endif;

		// Ítems para serem desmarcados
		$touncheck = array_slice( $checkeds, $max_others );

		// Desmarca os valores
		foreach( $touncheck as $uncheck ):

			// Remove o valor
			call_user_func( 'update_' . $field[ 'data_type' ] . '_meta', $uncheck, $field[ 'machine_name' ], 'off' );		
		endforeach;
		return true;
	}

	public static function renderize_values( $field, $values, $key=0 ){

		if( isset( $values[ $key ] ) && $values[ $key ] == 'on' ):
			return isset( $field[ 'label_option' ] ) ? $field[ 'label_option' ] : 'Sim';
		else:
			return 'Não';
		endif;
		
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'hide_label' ] = array(
			'ftype' => 'boolean',
			'hide_label' => true,
			'label' => 'Esconder nome do campo',
		);
		$fields[ 'label_option' ] = array(
			'ftype' => 'text',
			'label' => 'Label do checkbox',
			'required' => true,
		);
		$fields[ 'max_items' ] = array(
			'ftype' => 'number',
			'label' => 'Máximo de ítems',
			'required' => false,
		);
		$fields[ 'default_value' ] = array(
			'ftype' => 'radios',
			'label' => 'Valor padrão:',
			'required' => true,
			'options' => array(
				'on' => 'Marcado',
				'off' => 'Desmarcado'
			),
			'default_value' => 'off',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}