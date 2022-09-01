<?php
class boxtext extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Elemento com texto';

	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'no_proccess' ] = true;
		$field[ 'nowrap' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	public static function get_field( $field ){
		return $field[ 'content' ];
	}

	public static function prepare_to_select( $confs, $table ){
		return $table . "." . $confs["name"] . " AS " . $confs["name_request"];
	}

	public static  function get_show_value( $confs, $data ){
	}

	public static function execute_related_boxtext($confs, $data){
		return true;
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		return true;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'content' ] = array(
			'ftype' => 'textarea',
			'label' => 'Conteúdo:',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}