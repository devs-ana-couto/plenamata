<?php
define( 'PARTS_KEY', 'parceiro' );

class Partners {

    function __construct(){
        add_action( 'init', [ $this, 'init' ] );
    }

	public function init(){
		$this->registerPostType();
	}

    public static function getFilters(){
        global $Partners;
        return $Partners->filters;
    }

	public function registerPostType(){

		$labels = array(
			'name'               => __( 'Parceiros', 'piki' ),
			'singular_name'      => __( 'Parceiro', 'piki' ),
			'menu_name'          => __( 'Parceiros', 'piki' ),
			'name_admin_bar'     => __( 'Parceiros', 'piki' ),
			'add_new'            => __( 'Adicionar novo', 'piki' ),
			'add_new_item'       => __( 'Adicionar novo parceiro', 'piki' ),
			'new_item'           => __( 'Novo parceiro', 'piki' ),
			'edit_item'          => __( 'Editar parceiro', 'piki' ),
			'view_item'          => __( 'Ver Parceiros', 'piki' ),
			'all_items'          => __( 'Todos os Parceiros', 'piki' ),
			'search_items'       => __( 'Procurar parceiro', 'piki' ),
			'parent_item_colon'  => __( 'Parceiro pai:', 'piki' ),
			'not_found'          => __( 'Nenhum parceiro encontrado.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhum parceiro na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Parceiros', 'piki' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'parceiros' ),
			'show_in_rest'       => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 0,
			'taxonomies'		 => [],
			'supports'           => array( 'title', 'excerpt', 'revisions' ),
			'menu_icon'			 => 'dashicons-megaphone',
		);

		register_post_type( PARTS_KEY, $args );

    }

    // Apoiadores
    public static function getApoiadores( $total = 3, $image_field = 'logo_header' ){
        return getList( $total, $image_field, true );
    }

    // Lista
    public static function getList( $total = 12, $image_field = false, $apoiadores = false ){

        $confs = [
            'post_type' => PARTS_KEY,
            'posts_per_page' => $total,
        ];

        // Meta query
        $meta_query = [];
        
        // Images
        if( $image_field ):
            $meta_query[] = [
                'key' => $image_field,
                'compare' => 'IS NOT NULL'
            ];
            $meta_query[] = [
                'key' => $image_field,
                'compare' => '!=',
                'value' => '',
            ];
        endif;
        
        // Apoiadores
        if( $apoiadores ):
            $meta_query[] = [
                    'key' => 'apoiador',
                    'value' => 'on',
            ];
        endif;

        // Adding meta
        if( !empty( $meta_query ) ):
            $confs[ 'meta_query' ] = $meta_query;
        endif;
        
        // Get items
        $items = new WP_Query( $confs );

        return $items->have_posts() ? $items->posts : false;

    }

}
$Partners = new Partners();

// Form settings
function pikiform_parceiro_settings(){
	return [
		'key' => PARTS_KEY,
        'post_type' => PARTS_KEY,
        'post_type_active' => true
	];
}
function pikiform_parceiro_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Nome',
            'maxlength' => 120,
        ],
        'excerpt' => [
            'machine_name' => 'excerpt',
            'ftype' => 'excerpt',
            'label' => 'Descrição',
            'maxlength' => 550,
        ],
        'site' => [
            'machine_name' => 'site',
            'ftype' => 'url',
            'label' => 'URL do site',
        ],
        'logo' => [
            'machine_name' => 'logo',
            'ftype' => 'imagewp',
            'label' => 'Logo para listagem',
            'styles' => [ 'ret' => [ 'width' => '50%' ] ],
        ],
        'logo_header' => [
            'machine_name' => 'logo_header',
            'ftype' => 'imagewp',
            'label' => 'Logo para o header',
            'styles' => [ 'ret' => [ 'width' => '50%' ] ],
        ],
        'logo_footer' => [
            'machine_name' => 'logo_footer',
            'ftype' => 'imagewp',
            'label' => 'Logo para o rodapé',
            'styles' => [ 'ret' => [ 'width' => '50%' ] ],
        ],
        'apoiador' => [
            'machine_name' => 'apoiador',
            'ftype' => 'boolean',
            'label' => 'Mostrar como apoiador',
        ],
    ];
}
