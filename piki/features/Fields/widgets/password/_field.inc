<?php
class password extends PikiField {
	
	function __construct(){

		# Label do campo
		self::set_label( 'Senha' );

	}
		
	# Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = '%s';
		$field[ 'required' ] = true;
		$field[ 'double' ] = $field;
		$field[ 'double' ][ 'label' ] = '';
		$field[ 'double' ][ 'placeholder' ] = 'Confirme a senha';
		$field[ 'double' ][ 'machine_name' ] = $field[ 'machine_name' ] . '_confirm';
		$field[ 'double' ][ 'no_proccess' ] = true;
		return $field;
	}

	// constroi o campo
	public static function get_field( $field ){

		$html = '<input type="password" name="' . $field[ 'name_html' ] . '" autocomplete="off" id="' . $field[ 'id' ] . '"';
		parent::set_attributes( $html, $field );
		$html .= ' />';

		return $html;
	}

	public static function confirm_field( $matriz, $complete=true ){
		$confirm = $matriz;
		$confirm[ 'machine_name' ] = $confirm[ 'machine_name' ] . '_confirm';
		if( $complete ):
			$confirm[ 'name_html' ] = parent::get_field_name( $confirm );
			$confirm[ 'id' ] = parent::get_field_id( $confirm );
			parent::add_attributes( $confirm, array( 'class' => 'confirm' ) );
		endif;
		return $confirm;
	}

	public static function posted_values( $field, $values ){

		$return = array();
		# Senha
		if( !isset( $values[ $field[ 'machine_name' ] ] ) ):
			$return[ 'value' ] = 'noposted';
		else:
			$return[ 'value' ] = $values[ $field[ 'machine_name' ] ];
		endif;
		# Confirmação da senha
		if( !isset( $values[ $field[ 'machine_name' ] . '_confirm' ] ) ):
			$return[ 'confirm_value' ] = 'noposted';
		else:
			$return[ 'confirm_value' ] = $values[ $field[ 'machine_name']  . '_confirm' ];
		endif;

		return $return;

	}

	# Validação do campo
	public static function validate( $field, $action ){

		$error = array();
		$confirm_field = self::confirm_field( $field, false );

		$senha = is_array( $field[ 'value' ][ 'value' ] ) ? array_shift( $field[ 'value' ][ 'value' ] ) : $field[ 'value' ][ 'value' ];
		$confirma = is_array( $field[ 'value' ][ 'confirm_value' ] ) ? array_shift( $field[ 'value' ][ 'confirm_value' ] ) : $field[ 'value' ][ 'confirm_value' ];

		if( $action != 'novo' && $action != 'insert' && ( $senha == '' || $confirma == '' ) ):
			return true;
		endif;

		# Se o campo da senha está vazio
		if( $senha == '' ):
			$error[ 'field' ] = array(
				'field' => $field,
				'error' => PikiField::getErrorMessage( $field, 'required' ),
			);
		endif;

		# Se a confirmação está vazia
		if( $confirma == '' ):
			$error[ 'confirm' ] = array(
				'field' => $confirm_field,
				'error' => PikiField::getErrorMessage( $confirm_field, 'required' ),
			);
		endif;

		#  Se os campos não são idênticos
		if( $senha != '' && $confirma != '' && $senha != $confirma ):
			$error[ 'field' ] = array(
				'field' => $field,
				'error' => 'As senhas não conferem',
			);
			$error[ 'confirm' ] = array(
				'error' => 'As senhas não conferem',
				'field' => $confirm_field,
			);
		endif;

		if( count( $error ) > 0 ):
			return $error;
		endif;

		return true;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( 'placeholder' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}