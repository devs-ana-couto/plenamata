<?php
class post_connect extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Post Connect' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		
		$field[ 'sqlrpc' ] = self::getReplacement();

		// Preenche o array de opções
		$field[ 'options' ] = post_connect::getOptionsList( $field );
		
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Options list
	public static function getOptionsList( $field ){

		// Post type
		$post_type = _array_get( $field, 'post_type' );
						
		// Lista de Posts
		$posts_list = self::get_posts_list( $field[ 'post_type' ] );
		
		// Se não há posts
		if( empty( $posts_list ) ):
			return array();
		endif;

		// Preenche o array de opções
		$options = array();
		foreach( $posts_list as $key => $post ):
			$options[ $post->ID ] = $post->post_title;
		endforeach;

		return $options;

	}

	// Constroi o campo
	public static function get_field( $field ){

		// Preenche o array de opções
		if( empty( $field[ 'options' ] ) ):
			$field[ 'options' ] = post_connect::getOptionsList( $field );
		endif;
		
		// Select
		$field[ 'ftype' ] = 'select';
		
		$s = new select();
		return $s->get_field( $field );

	}

	public static function get_posts_list( $post_type ){
	
		global $wpdb;
	
		// Allway array
		if( !is_array( $post_type ) ):
			$post_type = [ $post_type ];
		endif;

		// Replacements
		$rpcs = implode( ',', array_fill( 0, count( $post_type  ), '%s' ) );

		// Quering
		$posts = $wpdb->get_results($wpdb->prepare(
			"SELECT ID, post_title FROM $wpdb->posts WHERE post_type IN( $rpcs ) AND post_status IN ( 'publish', 'future', 'private', 'pending', 'draft' ) ORDER BY post_date ASC",
			$post_type
		));
		if( empty( $posts ) ):
			return false;
		endif;
		return $posts;
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		if( on( $field, 'use_as_parent' ) ):
			if( isset( $meta[ 'post_item' ]->post_parent ) && !empty( $meta[ 'post_item' ]->post_parent ) ):
				return $meta[ 'post_item' ]->post_parent;
			else:
				return '';
			endif;
		else:
			return isset( $meta[ $field[ 'machine_name' ] ] ) && !empty( $meta[ $field[ 'machine_name' ] ] ) ? $meta[ $field[ 'machine_name' ] ] : '';
		endif;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$error = '';
		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			$error = PikiField::getErrorMessage( $field, 'doselect' );
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){

		global $wpdb;
		
		if( on( $field, 'use_as_parent' ) ):
			$wpdb->query($wpdb->prepare(
				"UPDATE $wpdb->posts SET post_parent = %d WHERE ID = %d",
				array( (int)$value, $ID )
			));
		endif;

		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], (int)$value );

	}

	// Renderizando os valores
	public static function renderize_values( $field, $options = array() ){

		if( empty( $field[ 'value' ] ) ):
			return '';
		endif;
		$connected = get_post( $field[ 'value' ] );
		if( isset( $options[ 'field' ] ) ):
			if( isset( $connected->$options[ 'field' ] ) ):
				return $connected->$options[ 'field' ];
			elseif( ( $meta = get_post_meta( $connected->ID, $options[ 'field' ], true ) ) !== '' ):
				return $meta;
			endif;
		endif;
		return $connected->post_title;
	}

	public static function change_for_filter( $field ){

		global $wpdb;

		$posts_ids = array();
		$rpcts = array();

		// IDs de posts
		foreach( $field[ 'options' ] as $key => $option ):
			if( (int)$key > 0 ):
				$posts_ids[] = $key;
				$rpcts[] = '%d';
			endif;
		endforeach;

		// Nomes dos posts
		$posts_names = $wpdb->get_results($wpdb->prepare(
			"SELECT ID, post_name FROM $wpdb->posts WHERE ID in ( ". implode( ',', $rpcts ) ." )",
			$posts_ids
		));

		// Coloca os ids dos posts como chaves
		$keyed_names = array();
		foreach ( $posts_names as $name_key => $name):
			$keyed_names[ $name->ID ] = $name->post_name;
		endforeach;

		// Novo array de opções
		$new_options = array();		
		foreach( $field[ 'options' ] as $key => $option ):
			if( isset( $keyed_names[ $key ] ) ):
				$new_options[ $keyed_names[ $key ] ] = $field[ 'options' ][ $key ];
			else:
				$new_options[ $key ] = $option;
			endif;
		endforeach;

		// Atribui as novas opções ao campo
		$field[ 'options' ] = $new_options;
		unset( $new_options, $keyed_names, $posts_names );

		return $field;

	}

	public static function change_filter_query( $query, $field ){
		
		global $wpdb;
		
		// Total values
		$total_pars = count( $query[ 'value' ] );
		
		// Query replacements
		$rpcts = implode( ',', array_fill( 0, count( $query[ 'value' ] ), '%s' ) );
		
		// Query posts by post_name
		$posts = $wpdb->get_results($wpdb->prepare(
			"SELECT ID, post_name FROM $wpdb->posts WHERE post_name IN ( $rpcts )",
			$query[ 'value' ]
		) );
		
		// Values for compare
		$fliped = array_flip( $query[ 'value' ] );
		
		// Replace post names for post ID
		$keyeds = array();
		foreach ( $posts as $key => $post ):
			if( isset( $fliped[ $post->post_name ] ) ):
				$query[ 'value' ][ $fliped[ $post->post_name ] ] = $post->ID;
			endif;
		endforeach;
		
		// REQUIRED
		return $query;
	
	}

	public static function get_settings_fields( $values ){
		// Post types
		$post_types = get_post_types( array( '_builtin' => false ) );
		unset( $post_types[ 'pikiform' ] );
		$fields = PikiFields::get_comum_fields( array( 'required', 'hide_label' ) );
		$fields[ 'post_type' ] = array(
			'label' => 'Tipo de post',
			'machine_name' => 'post_type',
			'ftype' => 'select',
			'options' => $post_types,
		);
		$fields[ 'use_as_parent' ] = array(
			'label' => 'Usar como post pai',
			'machine_name' => 'use_as_parent',
			'ftype' => 'boolean',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

	public static function dummy( $field ){

		global $wpdb;

		// Post type
		$ptype = _array_get( $field, 'post_type' );
		if( !$ptype ) return '';

		// Post ID
		$post_id = $wpdb->get_var($wpdb->prepare("
			SELECT ID 
			FROM {$wpdb->posts}
			WHERE 
				post_type = %s AND 
				post_status = 'publish' 
			ORDER BY RAND() 
			LIMIT 1
		", $ptype ));		

		return empty( $post_id ) ? '' : $post_id;
		
	}

}
