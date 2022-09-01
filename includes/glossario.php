<?php
define( 'GLOSSARIO_KEY', 'verbete' );
define( 'GLOSSARIO_TAX', 'secao' );

class Glossario {

    var $sections;
    var $activeSection;
    var $keyword = false;
    var $terms;
    var $listIDs;

    function __construct(){

        $this->section = _get( 'secao', '' );
        $this->keyword = _get( 'palavra-chave', '' );

        add_action( 'init', [ $this, 'registerPostType' ] );
        add_action( 'init', [ $this, 'registerTaxonomy' ] );
        add_filter( 'pre_get_posts', [ $this, 'setSearchType' ] );
    
    }

    public function setSearchType( $query ){
        if( !empty( $this->keyword ) && !$query->is_main_query() ):
            //$query->set( 'post_type', [ GLOSSARIO_TAX ] );
        endif;
    }

	public function registerPostType(){

		$labels = [
			'name'               => __( 'Glossário', 'plenamata' ),
			'singular_name'      => __( 'Glossário', 'plenamata' ),
			'menu_name'          => __( 'Glossario', 'plenamata' ),
			'name_admin_bar'     => __( 'Glossario', 'plenamata' ),
			'add_new'            => __( 'Adicionar novo', 'plenamata' ),
			'add_new_item'       => __( 'Adicionar novo verbete', 'plenamata' ),
			'new_item'           => __( 'Novo verbete', 'plenamata' ),
			'edit_item'          => __( 'Editar verbete', 'plenamata' ),
			'view_item'          => __( 'Ver verbetes', 'plenamata' ),
			'all_items'          => __( 'Todos os verbete', 'plenamata' ),
			'search_items'       => __( 'Procurar verbete', 'plenamata' ),
			'parent_item_colon'  => __( 'Projeto pai:', 'plenamata' ),
			'not_found'          => __( 'Nenhum verbete encontrado.', 'plenamata' ),
			'not_found_in_trash' => __( 'Nenhum verbete na lixeira.', 'plenamata' )
		];
		$args = [
			'labels'             => $labels,
			'description'        => __( 'Glossario', 'plenamata' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'show_in_rest'       => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
            'rewrite'            => [ 'slug' => 'verbete' ],
			'menu_position'      => 0,
			'supports'           => [ 'title', 'excerpt', 'thumbnail', 'editor' ],
			'menu_icon'			 => 'dashicons-editor-ol',
		];

		register_post_type( GLOSSARIO_KEY, $args );

    }

    // Add new taxonomy, make it hierarchical (like categories)
    public function registerTaxonomy(){
        
        $labels = [
            'name'              => _x( 'Seções', 'taxonomy general name', 'plenamata' ),
            'singular_name'     => _x( 'Seção', 'taxonomy singular name', 'plenamata' ),
            'search_items'      => __( 'Buscar seções', 'plenamata' ),
            'all_items'         => __( 'Todas as seções', 'plenamata' ),
            'parent_item'       => __( 'Seção mãe', 'plenamata' ),
            'parent_item_colon' => __( 'Seção mãe:', 'plenamata' ),
            'edit_item'         => __( 'Editar seção', 'plenamata' ),
            'update_item'       => __( 'Atualiar seção', 'plenamata' ),
            'add_new_item'      => __( 'Adicionar nova seção', 'plenamata' ),
            'new_item_name'     => __( 'Novo nome de seção', 'plenamata' ),
            'menu_name'         => __( 'Seções', 'plenamata' ),
        ];
        $args = [
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => [ 'slug' => false ],
        ];
     
        register_taxonomy( GLOSSARIO_TAX, [ GLOSSARIO_KEY ], $args );
    
    }

    public function moreSearcheds(){

        global $wpdb;

        $current_lang = apply_filters( 'wpml_current_language', NULL );

        $items = $wpdb->get_results($wpdb->prepare(
            "
            SELECT PO.ID, PO.post_title, PO.search_count, TB.meta_value as thumbnail_id
            FROM {$wpdb->posts} PO 
            LEFT JOIN {$wpdb->prefix}icl_translations TR ON TR.element_type = 'post_verbete' AND TR.element_id = PO.ID
            LEFT JOIN {$wpdb->postmeta} TB ON TB.post_id = PO.ID AND TB.meta_key = '_thubnail_id'
            WHERE 
                PO.post_type = 'verbete'
                AND
                PO.post_status = 'publish'
                AND
                TR.language_code = %s
            GROUP BY 
                PO.ID
            ORDER BY 
                PO.search_count DESC,
                PO.post_date DESC
            LIMIT 12
            ",
            $current_lang
        ));
        
        return empty( $items ) ? false : $items;

    }

    public static function getForPage( $context ){

        global $Glossario, $wpdb;

        $return = new stdClass();

        $terms = [];
        
        // Listagem
        $return->list = $Glossario->getList();

        // More searcheds
        if( $context == 'archive' ):
            $return->moreSearcheds = $Glossario->moreSearcheds();
        endif;

        if( !empty( $return->list ) && !empty( $Glossario->keyword ) ):


            // Set search counter
            if( $context == 'archive' ):
                // Replacements
                $rpcs = implode( ',', array_fill( 0, count( $Glossario->listIDs ), '%d' ) );
                // Queryng
                $wpdb->query($wpdb->prepare(
                    "UPDATE {$wpdb->posts} SET search_count = ( search_count + 1 ) WHERE ID IN($rpcs)",
                    $Glossario->listIDs
                ));
            endif;
        
        endif;

        // Menu
        $return->sections = $Glossario->getMenuOptions();

        // Active term
        $return->activeSection = $Glossario->activeSection;

        // Filter
        $return->filter = $Glossario->getFilter();

        return $return;

    }

    public function getSection(){
        $this->section = $this->section == '' ? $this->sections[ 0 ]->slug : $this->section;        
        return $this->section;
    }

    public function getMenuOptions(){

        $args = [ 
            'taxonomy' => GLOSSARIO_TAX, 
            'hide_empty' => true,
        ];

        if( !empty( $this->listIDs ) ):
            $args[ 'object_ids' ] = $this->listIDs;
        endif;

        $terms = get_terms( $args );
        
        $section = $this->getSection();
        
        $key_active = array_search( $section, array_column( $terms, 'slug' ) );
        
        $terms[ $key_active ]->active = true;

        $this->activeSection = $terms[ $key_active ];

        return $terms;
    
    }

    public function getFilter(){

        global $wp_query;

        $url = Piki::permalang( 'glossario' );

        return '<form action="' . $url . '">
            <input type="text" name="palavra-chave" value="' . $this->keyword . '"  placeholder="' . __( 'Search for a term', 'plenamata' ) . '">
            <button type="submit">Ok</button>
        </form>';

    }

    public function getList(){

        global $wpdb;

        // Arguments for menu
        $terms_args = [ 
            'taxonomy' => GLOSSARIO_TAX, 
            'hide_empty' => true,
        ];

        // Arguments for posts
        $posts_args = [
            'post_type' => GLOSSARIO_KEY,
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ];

        // Palavra chave
        if( $this->keyword ):

            $args[ 's' ] = $this->keyword;

        else:

            // Get all sections
            $this->sections = get_terms([ 
                'taxonomy' => GLOSSARIO_TAX, 
                'hide_empty' => true,
            ]);

            // Filter by section
            $args[ 'tax_query' ] = [[
                'taxonomy' => GLOSSARIO_TAX,
                'field' => 'slug',
                'terms' => [ $this->getSection() ],
            ]];
        
        endif;

        // Get items
        $items = new WP_Query( $args );
        if( !$items->have_posts() ) return false;

        // Filter by section
        if( $this->keyword ):

            // Keep list ids
            $this->listIDs = array_column( $items->posts, 'ID' );

            // Get sections
            $this->sections = get_terms([
                'taxonomy' => GLOSSARIO_TAX, 
                'hide_empty' => true,
                'object_ids' => $this->listIDs,
            ]);

            // Actual section
            $section = $this->getSection();

            // Filter by actual section
            foreach( $items->posts as $kp => $post ):

                $terms = get_the_terms( $post->ID, GLOSSARIO_TAX );
                if( !in_array( $section, array_column( $terms, 'slug' ) ) ):
                    unset( $items->posts[ $kp ] );
                endif;
            
            endforeach;
        
        endif;

        wp_reset_query();

        return $items->posts;

    }

    public static function getVerbeteURL( $item ){

        global $Glossario;

        $base = get_permalink( $item->ID );

        $qvars = [];
        if( $Glossario->keyword ):
            $qvars[] = 'palavra-chave=' . $Glossario->keyword;
        endif;
        if( $Glossario->section ):
            $qvars[] = 'secao=' . $Glossario->section;
        endif;

        if( !empty( $qvars ) ):
            $base .= '?' . implode( '&', $qvars );
        endif;

        return $base;
    
    }

    public static function termURL( $term ){

        global $Glossario;
    
        $URL = Piki::permalang( 'glossario' ) . '?secao=' . $term->slug;

        if( $Glossario->keyword ):
            $URL .= '&palavra-chave=' . $Glossario->keyword;
        endif;
        
        return $URL;
    
    }

}
$Glossario = new Glossario();

// Form settings
function pikiform_verbete_settings(){
	return [
		'key' => GLOSSARIO_KEY,
        'post_type' => GLOSSARIO_KEY,
        'post_type_active' => true,
	];
}
function pikiform_verbete_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Seu nome',
            'required' => true,
        ],
        'excerpt' => [
            'machine_name' => 'excerpt',
            'ftype' => 'excerpt',
            'label' => 'Resumo',
            'required' => true,
        ],
        'body' => [
            'machine_name' => 'body',
            'ftype' => 'body',
            'label' => 'Conteúdo',
            'required' => true,
        ],
    ];
}
