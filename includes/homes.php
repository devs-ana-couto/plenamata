<?php
define( 'HOME_KEY', 'home' );

class Homes {

    function __construct(){
        add_action( 'init', [ $this, 'registerPostType' ] );
    }

    public static function registerPostType(){

        $labels = array(
            'name'               => __( 'Homes', 'piki' ),
            'singular_name'      => __( 'Home', 'piki' ),
            'menu_name'          => __( 'Homes', 'piki' ),
            'name_admin_bar'     => __( 'Homes', 'piki' ),
            'add_new'            => __( 'Adicionar nova', 'piki' ),
            'add_new_item'       => __( 'Adicionar nova home', 'piki' ),
            'new_item'           => __( 'Nova home', 'piki' ),
            'edit_item'          => __( 'Editar home', 'piki' ),
            'view_item'          => __( 'Ver homes', 'piki' ),
            'all_items'          => __( 'Todas as homes', 'piki' ),
            'search_items'       => __( 'Procurar home', 'piki' ),
            'parent_item_colon'  => __( 'Home mãe:', 'piki' ),
            'not_found'          => __( 'Nenhuma home encontrada.', 'piki' ),
            'not_found_in_trash' => __( 'Nenhuma home na lixeira.', 'piki' )
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __( 'Homes', 'piki' ),
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => false,
            'rewrite'            => false,
            'show_in_rest'       => false,
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 0,
            'capability_type'    => 'post',
            'supports'           => array( 'title', 'revisions' ),
            'menu_icon'          => 'dashicons-admin-home',
        );

        register_post_type( HOME_KEY, $args );

    }

}
$Homes = new Homes();

// Form settings
function pikiform_home_settings(){
    return [
        'key' => HOME_KEY,
        'post_type' => HOME_KEY,
        'post_type_active' => true
    ];
}
function pikiform_home_fields( $settings ){

    $id = _get( 'post' );
    $type = $id ? get_post_meta( $id, 'type', true ) : false;
    
    $fields = [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Nome da home',
        ],
        'type' => [
            'machine_name' => 'type',
            'ftype' => 'select',
            'label' => 'Tipo de home',
            'options' => [
                '' => 'Selecione',
                '1' => 'Padrão (hero + 3 teasers com foto',
                '2' => 'Destaque grande com foto à esquerda + dois destaques menores com foto, à direita',
                '3' => 'Destaque grande com foto à esquerda + um destaque menor com foto, e dois destaques sem foto, à direita',
            ]
        ],
    ];

    if( $type ):

        switch( $type ):

            case '1':
            default:

                $fields[ 'hero' ] = [
                    'machine_name' => 'hero',
                    'ftype' => 'fieldset',
                    'label' => 'Destaque principal',
                    'subfields' => [
                        'hero_id' => [
                            'machine_name' => 'hero_id',
                            'ftype' => 'posts_inside',
                            'label' => 'Post de destino',
                            'mode' => 'select',
                            'post_type' => [ 'post', PODS_KEY, VIDEOS_KEY, IMAGES_KEY ]
                        ],
                    ]
                ];
            
            break;

        endswitch;

    endif;

    return $fields;

    /*
    return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Nome da home',
            'maxlength' => 120,
        ],
        'categ' => [
            'machine_name' => 'categ',
            'ftype' => 'taxonomy',
            'label' => 'Categoria',
            'taxonomy' => 'category'
        ],
        'url' => [
            'machine_name' => 'url',
            'ftype' => 'url',
            'label' => 'URL da home',
        ],
        'cover' => [
            'machine_name' => 'cover',
            'label' => 'Imagem para destaque',
            'ftype' => 'imagewp',
            'crop' => [
                'status' => true,
                'ratio' => '2090x1138'
            ],
            'styles' => [
                'ret' => [ 'width' => '1045' ],
            ]
        ],
        'thumb' => [
            'machine_name' => 'thumb',
            'label' => 'Thumb para listagem',
            'ftype' => 'imagewp',
            'crop' => [
                'status' => true,
                'ratio' => '712x452'
            ],
            'styles' => [
                'ret' => [ 'width' => '356' ],
            ]
        ],
        'sticky' => [
            'machine_name' => 'sticky',
            'ftype' => 'boolean',
            'label' => 'Destacar na home',
        ]
    ];
    */

}
