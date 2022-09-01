<?php
class roles extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Papéis de usuário';
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

		// Papéis de usuário
		$roles = self::get_roles();
		// Opções para os checkboxes
		$options = array();
		foreach( $roles as $role_key => $role ):
			$options[ $role_key ] = $role[ 'name' ];
		endforeach;

		$cks_field = $field;
		$cks_field[ 'options' ] = $options;

		if( off( $field, 'multiple' ) ):
			$cks = new radios();
		else:
			$cks = new checkboxes();
		endif;

		return $cks->get_field( $cks_field );

	}

	public static function get_roles( $just_editable=true ){
		global $wp_roles;
		$roles = $wp_roles->roles;
		if( $just_editable ):
			$roles = apply_filters( 'editable_roles', $roles );
		endif;
		unset( $roles[ 'administrator' ] );
		return $roles;
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$error = '';
		if( parent::is_required( $field ) && off( $field, 'value' ) ):
			$error = PikiField::getErrorMessage( $field, 'doselect' );
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;	
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}