<?php

define( 'FIELD_CIDADE_TABLE', 'correios_localidades' );

class cidade extends PikiField {
	
	function __construct(){
		// Label do campo
		self::$label = 'Cidade';
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%d';
	}

	// Constroi o campo do tipo select
	public static function get_field( $field ){

		global $wpdb;

		$cidades = array();

		$connect = _array_get( $field, 'conect_to' );
		
		$value = _array_get( $field, 'value' );

		//if( !empty( $value ) ):
		//	$cidades = self::get_all_cidades( $value );
		//else:
			$cidades = [];
		//endif;

		$field[ 'attributes' ] = array(
			'class' => array( 'cidade' ),
			'data-initial-value' => $value
		);

		$html = select::get_field( $field );
		$html .= '<span class="preloader">Carregando...</span>';

		return $html;
	
	}

	public static function extract_item_value( $value, $key ){
		if( !isset( $value[ $key ] ) || !$value[ $key ] ):
			return 0;
		elseif( is_array( $value[ $key ] ) ):
			return array_shift( $value[ $key ] );
		else:
			return $item_value;
		endif;
	}

	public static function add_files(){
	    wp_enqueue_script( 'field-cidade', Piki::url( 'cidade.js', __FILE__ ) );
	    wp_enqueue_style( 'field-cidade', Piki::url( 'cidade.css', __FILE__ ) );
	}

	public static function get_cidades( $ids = [] ){
		if ( !is_array($ids) ) {
			return false;
		}
		global $wpdb;
		$pars = str_replace(',,',',',implode(',', $ids));
		$cidades = $wpdb->get_results("
			SELECT id, nome
			FROM {$wpdb->prefix}ufcidade_cidade
			WHERE id in ($pars)
			ORDER BY nome ASC
		");
		return $cidades;
	}

	public static function getTable(){
		global $wpdb;
		return $wpdb->prefix . FIELD_CIDADE_TABLE;
	}

	public static function get_all_cidades( $UF ){
		return json_decode(file_get_contents( __DIR__ . '/sources/'. $UF .'.json' ));	
	}

	public static function get_cidade( $UF, $cidade_id ){
		$cidades = cidade::get_all_cidades( $UF );
		return isset( $cidades->{$cidade_id} ) ? $cidades->{$cidade_id} : false;
	}

	public static function getCidadeBy( $key, $value ){
		global $wpdb;
		$table = self::getTable();
		return $wpdb->get_row($wpdb->prepare(
			"SELECT id, nome, sigla_estado FROM $table WHERE $key = '%d' LIMIT 1",
			$value 
		));
	}

	// Changing meta values
	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Se não existem valores para o campo
		if( !isset( $meta[ $field[ 'machine_name' ] ] ) || !is_array( $value = $meta[ $field[ 'machine_name' ] ] ) ):
			return false;
		endif;

		// Se nenhum valor foi gravado
		foreach ( $value as $key => &$item ):
			$item = unserialize( base64_decode( $item ) );
		endforeach;
		
		// Retorna o array de resultados		
		return $value;
	
	}

	public static function get_show_value( $name, $meta=false ){
		exit( 'Field cidade: get_show_value' );
	}

	public static function renderize_values( $field, $value ){

		global $wpdb;

		if( !$value || empty( $value ) ):
			return '';
		endif;

		$table = self::getTable();

		if( !is_array( $value ) ):
			$value = array( $value );
		endif;

		$cidade_vals = $wpdb->get_col($wpdb->prepare("SELECT nome as nome_cidade FROM $table WHERE id IN ( '%s' ) ORDER BY nome ASC", implode( "','", $value ) ) );

		if( empty( $cidade_vals ) ):
			return '';
		else:
			return implode( ', ', $cidade_vals );
		endif;
	}

	public static function get_name_by_id( $id ){
		global $wpdb;
		$table = self::getTable();
		return $wpdb->get_var($wpdb->prepare("SELECT nome as nome_cidade FROM $table WHERE id = %d", $id ) );
	}

	public static function get_settings_fields( $values ){

		$estados = self::get_estados();
		$options = array();
		foreach ( $estados as $key => $uf ):
			$options[ $uf->id ] = $uf->nome;
		endforeach;

		$fields = PikiFields::get_comum_fields();
		$fields[ 'estado' ] = array(
			'ftype' => 'select',
			'label' => 'Estado:',
			'options' => $options,
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}

add_filter( 'query_vars', array( 'ufcidade', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'ufcidade', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'ufcidade', 'template_redirect_intercept' ) );