<?php
define( 'VIDEOS_KEY', 'video' );

class Podcasts {

    function __construct(){
        add_action( 'init', [ $this, 'init' ] );
    }

	public function init(){
		$this->registerPostType();
	}

    public static function getFilters(){
        global $Podcasts;
        return $Podcasts->filters;
    }

	public function registerPostType(){

		$labels = array(
			'name'               => __( 'Vídeos', 'piki' ),
			'singular_name'      => __( 'Vídeo', 'piki' ),
			'menu_name'          => __( 'Vídeos', 'piki' ),
			'name_admin_bar'     => __( 'Vídeos', 'piki' ),
			'add_new'            => __( 'Adicionar novo', 'piki' ),
			'add_new_item'       => __( 'Adicionar novo vídeo', 'piki' ),
			'new_item'           => __( 'Novo vídeo', 'piki' ),
			'edit_item'          => __( 'Editar vídeo', 'piki' ),
			'view_item'          => __( 'Ver Vídeos', 'piki' ),
			'all_items'          => __( 'Todos os Vídeos', 'piki' ),
			'search_items'       => __( 'Procurar vídeo', 'piki' ),
			'parent_item_colon'  => __( 'Vídeo pai:', 'piki' ),
			'not_found'          => __( 'Nenhum vídeo encontrado.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhum vídeo na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Vídeos', 'piki' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'videos' ),
			'show_in_rest'       => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 0,
			'taxonomies'		 => [ 'category' ],
			'supports'           => array( 'title', 'excerpt', 'revisions' ),
			'menu_icon'			 => 'dashicons-megaphone',
		);

		register_post_type( VIDEOS_KEY, $args );

    }
    
    public static function getYears(){

        global $wpdb;
        
        return $wpdb->get_col("
            SELECT DISTINCT( DATE_FORMAT( post_date, '%Y' ) ) 
            FROM $wpdb->posts
            WHERE  post_status = 'publish'
        ");
    
    }

    public static function getList( $total = 12 ){

        $confs = [
            'post_type' => VIDEOS_KEY,
            'posts_per_page' => $total
        ];

        $items = new WP_Query( $confs );

        wp_reset_query();

        return empty( $items->posts ) ? false : $items->posts;

    }

}
$Podcasts = new Podcasts();

// Form settings
function pikiform_video_settings(){
	return [
		'key' => VIDEOS_KEY,
        'post_type' => VIDEOS_KEY,
        'post_type_active' => true
	];
}
function pikiform_video_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Título',
            'maxlength' => 120,
        ],
        'excerpt' => [
            'machine_name' => 'excerpt',
            'ftype' => 'excerpt',
            'label' => 'Descrição',
            'maxlength' => 255,
        ],
        'spotify' => [
            'machine_name' => 'spotify',
            'ftype' => 'text',
            'label' => 'Código no Spotify',
        ],
        'soundcloud' => [
            'machine_name' => 'soundcloud',
            'ftype' => 'text',
            'label' => 'Código no Soundcloud',
        ],
        'author' => [
            'machine_name' => 'author',
            'ftype' => 'text',
            'label' => 'Autor',
        ],
        'categ' => [
            'machine_name' => 'categ',
            'ftype' => 'taxonomy',
            'label' => 'Categoria',
            'taxonomy' => 'category'
        ],
        'thumb' => [
            'machine_name' => 'thumb',
            'ftype' => 'imagewp',
            'label' => 'Thumbnail (448 x 252)',
            'styles' => [ 'ret' => [ 'width' => '50%' ] ],
        ],

        // 'sticky' => [
        //     'machine_name' => 'sticky',
        //     'ftype' => 'boolean',
        //     'label' => 'Destacar na home',
        // ]

    ];
}
