<?php
class unidade extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Unidade' );
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){

		global $wpdb;
		
		$field[ 'sqlrpc' ] = self::getReplacement();

		// Opções do campo
		$unidades = get_posts([
			'post_type' => 'unidade',
			'posts_per_page' => -1,
			'order' => 'ASC'
		]);

		// Options
		$options = [];
		foreach( $unidades as $unidade ):
			$home = $wpdb->get_row("SELECT ID, post_name, post_title FROM $wpdb->posts P LEFT JOIN $wpdb->postmeta M ON P.ID = M.post_id WHERE M.meta_key = '__ccbb_is_home_for__' AND M.meta_value = $unidade->ID" );
			if( !empty( $home ) ):
				$options[ $home->post_name ] = $unidade->post_title;
			else:
				$options[ $unidade->post_name ] = $unidade->post_title;
			endif;
		endforeach;

		$field[ 'options' ] = $options;
		
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%d';
	}

	// Constroi o campo
	public static function get_field( $field ){

		// Se não existem posts disponíveis
		if( empty( $field[ 'options' ] ) ):
			return 'Nenhuma unidade disponível para conexão';
		endif;

		// Select
		$field[ 'ftype' ] = 'select';
		
		$s = new select();
		return $s->get_field( $field );

	}

	// Renderizando os valores
	public static function renderize_values( $field, $options=array() ){
		if( empty( $field[ 'value' ] ) || is_numeric( $field[ 'value' ] ) ):
			return '';
		endif;
		return $field[ 'options' ][ $field[ 'value' ] ];
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}
}