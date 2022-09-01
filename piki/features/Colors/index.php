<?php
define( 'COLORS_CTYPE', 'color' );
define( 'COLORS_TRANSITIENT', 'color_values' );

// Tipo de post para cores
class PikiColors {

	// Registra o tipo de post
	public static function register_post_type(){
	    
	    // Tipo de post
	    $labels = array(
	        'name'              => __( 'Cores', 'piki' ),
	        'singular_name'     => __( 'Cor', 'piki' ),
	        'add_new'           => __( 'Adicionar nova', 'piki' ),
	        'add_new_item'      => __( 'Adicionar nova cor', 'piki' ),
	        'edit_item'         => __( 'Editar cor', 'piki' ),
	        'new_item'          => __( 'Nova cor', 'piki' ),
	        'view_item'         => __( 'Ver cor', 'piki' ),
	        'search_items'      => __( 'Buscar cores', 'piki' ),
	        'not_found'         => __( 'Nenhuma cor encontrada', 'piki' ),
	        'not_found_in_trash'=> __( 'Nenhuma cor na lixeira', 'piki' ),
	        'parent_item_colon' => __( 'Cor mãe', 'piki' ),
	    );      
	    $args = array(
	        'labels'                => $labels,
	        'public'                => true,
	        'publicly_queryable'    => false,
	        'query_var'             => false,
	        'rewrite'               => false,
	        'hierarchical'          => false,
	        'menu_position'         => 5,
	        'exclude_from_search'   => true,
	        'supports'              => array( 'title', 'thumbnail' ),
	        'show_ui'               => true, 
	        'show_in_menu'          => true,
	        'menu_icon'             => Piki::url( 'images/menu-icon.png' , __FILE__ ),
	        'capability_type'       => 'post',
	    );
	    register_post_type( COLORS_CTYPE, $args );
	}

	// Remove o cache de opções, quando um ítem é alterado
	public static function remove_cache( $post_ID ) {
		if( get_post_type( $post_ID ) == COLORS_CTYPE ):
			delete_transient( COLORS_TRANSITIENT );
		endif;
	}

	// Recupera a lista de cores
	public static function get_colors(){
		
		global $wpdb;

		// Se o cache ainda não foi escrito, fazemos as consultas
		if ( false === ( $colors_options = get_transient( COLORS_TRANSITIENT ) ) ):

			// Query
			$colors_posts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->posts WHERE post_type = '" . COLORS_CTYPE . "' AND post_status = 'publish' ORDER BY ID DESC");

			// Array com os valores necessários
			$colors_options = array();
			foreach( $colors_posts as $key => $color ):
				$colors_options[ $color->ID ] = array(
					'ID' => $color->ID,
					'label' => $color->post_title,
					'thumbnail' => Piki::get_cover( $color->ID ),
					'hexadecimal' => get_post_meta( $color->ID, 'codigo_hexadecimal', true ),
				);
			endforeach;

			// Seta o cache
			set_transient( COLORS_TRANSITIENT, $colors_options, 365 * DAY_IN_SECONDS );

		endif;

		return $colors_options;
	
	}

	// Hexadecimal
	public static function register_fields( $meta_boxes ){
	    $meta_boxes[] = array(
	        'id'         => 'extras',
	        'title'      => 'Extras',
	        'post_types'      => array( COLORS_CTYPE ),
	        'context'    => 'normal',
	        'priority'   => 'high',
	        'show_names' => true,
	        'fields'     => array(
	            array(
	                'label' => 'Cór sólida',
	                'machine_name' => 'codigo_hexadecimal',
	                'ftype' => 'colorpicker',
	            ),
	        ),
	    );
	    return $meta_boxes;
	}


}
// Registra o tipo de post
add_action(  'init',  array( 'PikiColors', 'register_post_type' ) );
// Registra os campos extras do tipo de post
//add_action( 'pkmeta_register_fields', array( 'PikiColors', 'register_fields' ) );
// Remove o cache das cores quando uma cor é salva
add_action(  'save_post',  array( 'PikiColors', 'remove_cache' ), 10, 3 );


