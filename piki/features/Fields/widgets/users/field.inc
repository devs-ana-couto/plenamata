<?php
class users extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Usuários' );
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

	// constroi o campo
	public static function get_field( $field ){

		global $post;
		
		$users = empty( $field[ 'value' ] ) ? false : $field[ 'value' ];
		if( $users ):
			$users = users::get_users( $users );
		endif;

		$field[ 'label' ] = '';
		$field[ 'ftype' ] = 'select';
		$field[ 'options' ] = $users;
		$field[ 'multiple' ] = true;

		PikiField::set_attribute( $field, 'data-field-type', 'users' );

		$html = select::get_field( $field );
		
		self::add_files();

		return $html;

	}

	public static function add_files(){
		Piki::add_library( 'select2' );
	    wp_enqueue_script( 'field-posts-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	    wp_enqueue_style( 'field-posts-styles', Piki::url( 'styles.css', __FILE__ ) );
	}

	public static function save_meta( $field, $ID, $value ){

		// Retiramos o ítem vazio
		$first = array_shift( $value );
		if( $first !== '' ): 
			array_unshift( $value, $first );
		endif;

		// Se não existe nenhum valor
		if( empty( $value ) ):
			return call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		endif;

		// Atualiza o valor no banco
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );

	}

	public static function get_settings_fields( $values ){

		// Post types
		$post_types = get_post_types( array( '_builtin' => false ) );
		unset( $post_types[ 'pikiform' ] );

		$fields = PikiFields::get_comum_fields( array( 'required', 'hide_label' ) );
		//$fields[ 'post_type' ] = array(
		//	'label' => 'Tipo de post',
		//	'machine_name' => 'post_type',
		//	'ftype' => 'select',
		//	'options' => $post_types,
		//);

		PikiFields::set_fields_values( $fields, $values );

		return $fields;

	}

	# Quando o pai é deletado, seus filhos vão juntos
	public static function deleted_user( $user_ID ){
		//echo '<pre>';
		//var_dump( 'Usuário deletado!' );
		//exit;
		//$user_ID
		//$childs = self::get_post_childs( $post_ID );
		//if( !$childs ) return;
		//foreach( $childs as $key => $ID ):
		//	wp_delete_user( $ID, true );
		//endforeach;
	}

	public static function search_users(){
		global $wpdb;
		$q = isset( $_POST[ 'q' ] ) && !empty( $_POST[ 'q' ] ) ? $_POST[ 'q' ] : '';
		if( $q === '' ):
			Piki::error( 'Parâmetro de busca não informado.' );
		endif;
		$q = $wpdb->esc_like( $q );
		$q = '%' . $q . '%';
		$users = $wpdb->get_results($wpdb->prepare(
			"SELECT ID AS id, display_name AS text FROM $wpdb->users WHERE display_name LIKE %s || user_email LIKE %s || user_nicename LIKE %s",
			array( $q, $q, $q )
		));
		Piki::return_json(array(
			'total_count' => count( $users ),
			'incomplete_results' => false,
			'items' => $users
		));
	}

	public static function get_users( $ids ){
		
		global $wpdb;
		
		$users = get_users([
			'include' => $ids,
			'fields' => [ 'ID', 'display_name' ],
			'number' => -1
		]);
		if( empty( $users ) ) return false;

		// combine 
		return array_combine(
			array_column( 'ID' ),
			array_column( 'display_name' ),
		);

		return $return;
	
	}

}

// Quando um usuário é deletado
add_action( 'deleted_user', array( 'posts', 'delete_user' ) );
