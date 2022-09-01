<?php
// Tipo de post
define( 'HISTORIA_TYPE', 'historia' );
define( 'HISTORIA_TAX', 'categ' );

class Historias {

    static $types = [
        'video' => 'Vídeo',
        'audio' => 'Áudio',
        'fotos' => 'Fotos'
    ];

    function __construct(){
        add_action( 'init', [ 'Historias', 'registerPostType' ] );
    }

    // Change dashboard Historias to News
    public static function registerPostType() {

        $labels = array(
            'name'               => __( 'História', 'plenamata' ),
            'singular_name'      => __( 'Histórias', 'plenamata' ),
            'menu_name'          => __( 'Histórias', 'plenamata' ),
            'name_admin_bar'     => __( 'Histórias', 'plenamata' ),
            'add_new'            => __( 'Adicionar nova', 'plenamata' ),
            'add_new_item'       => __( 'Adicionar nova história', 'plenamata' ),
            'new_item'           => __( 'Nova história', 'plenamata' ),
            'edit_item'          => __( 'Editar história', 'plenamata' ),
            'view_item'          => __( 'Ver histórias', 'plenamata' ),
            'all_items'          => __( 'Todas as histórias', 'plenamata' ),
            'search_items'       => __( 'Procurar história', 'plenamata' ),
            'parent_item_colon'  => __( 'História mãe:', 'plenamata' ),
            'not_found'          => __( 'Nenhuma história encontrada.', 'plenamata' ),
            'not_found_in_trash' => __( 'Nenhuma história na lixeira.', 'plenamata' )
        );

        $args = [
            'labels'             => $labels,
            'description'        => __( 'Histórias', 'plenamata' ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'show_in_rest'       => true,
            'has_archive'        => true,
            'hierarchical'       => false,
            'capability_type'    => 'post',
            'menu_icon'          => 'dashicons-book',
            'rewrite'            => [ 'slug' => 'historias' ],
            'supports'           => [ 'title', 'excerpt', 'revisions' ],
            'menu_position'      => 0,
        ];

        register_post_type( HISTORIA_TYPE, $args );

    }

    // Recupera lista de posts
    public static function getList( $options = [] ){
        global $Historias;
        return $Historias->_getList( $options );
    }

    // Recupera lista de posts
    public function _getList( $options = [] ){

        global $wp_query;

        // Query args
        $args = [ 
            'post_type' => HISTORIA_TYPE,
            'posts_per_page' => -1,
            'meta_query' => [
                [
                    'key' => 'thumb',
                    'compare' => 'NOT EMPTY'
                ],
                [
                    'key' => 'thumb',
                    'value' => '',
                    'compare' => '!='
                ],
            ]
        ];

        // Queryng
        $listQuery = new WP_Query( $args );

        // Set return
        $return = $listQuery->have_posts() ? $listQuery->posts : false;

        // Reset query
        wp_reset_query();

        return $return;

    }

    // Single type
    public static function getSingleType( $meta = false, $format = 'title' ){
        if( !$meta ) $meta = new PostMeta();
        $type = !$meta->empty( 'video' ) ? 'video' : ( !$meta->empty( 'audio' ) ? 'audio' : ( !$meta->empty( 'fotos' ) ? 'Fotos' : false ) );
        return !$type ? false : ( $format == 'title' ? Historias::$types[ $type ] : $type );
    }

    // Rizes for home
    public static function getForHome( $term ){

        $posts_out = Historias::getHistoriasOut();

        $args = [
            'types' => 'post',
            'out' => $posts_out,
            'total' => 3,
            'filter_out' => true,
            'tax_query' => [
                'taxonomy' => 'category',
                'value' => $term->term_id
            ]
        ];
        return PostViews::getRizes( $args );
    
    }

    // Form settings
    public static function formSettings(){
        return array(
            'key' => HISTORIA_TYPE,
            'post_type' => HISTORIA_TYPE,
            'post_type_active' => true
        );
    }

    // Form Fields
	public function getFields( $settings = false ){

        global $post;

        // Return
        $return = [
            'title' => [
                'machine_name' => 'title',
                'ftype' => 'title',
                'label' => 'Título',
                'maxlength' => 120,
            ],
            'excerpt' => [
                'machine_name' => 'excerpt',
                'ftype' => 'excerpt',
                'label' => 'Resumo',
                'maxlength' => 255,
            ],            
            'author' => [
                'machine_name' => 'author',
                'ftype' => 'text',
                'label' => 'Autor',
                'maxlength' => 40,
            ],
            'ufcidade' => [
                'machine_name' => 'ufcidade',
                'ftype' => 'ufcidade',
                'label' => 'Estado/Cidade',
            ],
            'external_url' => [
                'machine_name' => 'external_url',
                'ftype' => 'url',
                'label' => 'URL externa',
            ],
            'thumb' => [
                'machine_name' => 'thumb',
                'ftype' => 'imagewp',
                'label' => 'Thumbnail para listagens',
                'description' => 'Resolução mínima da imagem: 440x644',
                'crop' => [
                    'status' => true,
                    'ratio' => '440x644',
                ],
                'styles' => [ 'ret' => [ 'width' => '50%' ] ],
                'required' => true,
            ],
            'type' => [
                'machine_name' => 'type',
                'ftype' => 'select',
                'label' => 'Tipo de mídia',
                'options' => [
                    'video' => 'Vídeo',
                    'audio' => 'Áudio',
                    'foto' => 'Foto',
                ],
            ],
            'video' => [
                'machine_name' => 'video',
                'ftype' => 'youtube',
                'label' => 'Código ou URL do vídeo (youtube)',
            ],
            'audio' => [
                'machine_name' => 'audio',
                'ftype' => 'soundcloud',
                'label' => 'Código do áudio (soundcloud)',
                'description' => 'URL no atributo src do iframe de incorporação (aba embed)',
            ],
            'fotos' => [
                'machine_name' => 'fotos',
                'ftype' => 'imagewp',
                'gallery' => true,
                'label' => 'Fotos',
            ],

        ];

        return $return;
		
	}

}
$Historias = new Historias();

// Form settings
function pikiform_historia_settings(){
    global $Historias;
    return $Historias->formSettings();
}
function pikiform_historia_fields( $settings ){
    global $Historias;
    return $Historias->getFields( $settings );
}