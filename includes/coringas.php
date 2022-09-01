<?php
define( 'JOKERS_KEY', 'coringa' );

class Jokers {

    function __construct(){
        add_action( 'init', [ $this, 'init' ] );
    }

	public function init(){
		$this->registerPostType();
	}

    public static function getFilters(){
        global $Jokers;
        return $Jokers->filters;
    }

	public function registerPostType(){

		$labels = array(
			'name'               => __( 'Coringas', 'piki' ),
			'singular_name'      => __( 'Coringa', 'piki' ),
			'menu_name'          => __( 'Blocos Coringa', 'piki' ),
			'name_admin_bar'     => __( 'Coringas', 'piki' ),
			'add_new'            => __( 'Adicionar novo', 'piki' ),
			'add_new_item'       => __( 'Adicionar novo coringa', 'piki' ),
			'new_item'           => __( 'Novo coringa', 'piki' ),
			'edit_item'          => __( 'Editar coringa', 'piki' ),
			'view_item'          => __( 'Ver Coringas', 'piki' ),
			'all_items'          => __( 'Todos os Coringas', 'piki' ),
			'search_items'       => __( 'Procurar coringa', 'piki' ),
			'parent_item_colon'  => __( 'Coringa pai:', 'piki' ),
			'not_found'          => __( 'Nenhum coringa encontrado.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhum coringa na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Coringas', 'piki' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'coringas' ),
			'show_in_rest'       => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 0,
			'taxonomies'		 => [],
			'supports'           => array( 'title', 'excerpt', 'revisions' ),
			'menu_icon'			 => 'dashicons-embed-photo',
		);

		register_post_type( JOKERS_KEY, $args );

    }

    public static function get(){

        $last = new WP_Query([
            'post_type' => JOKERS_KEY,
            'posts_per_page' => 1
        ]);

        if( !$last->have_posts() ) return false;

        $last = reset( $last->posts );

        $meta = new PostMeta( $last );

        $return = new stdClass();
        $return->title = $meta->render( 'title' );
        $return->logo = $meta->empty( 'logo' ) ? '' : $meta->render( 'logo' );
        $return->excerpt = $meta->empty( 'excerpt' ) ? false : $meta->render( 'excerpt' );
        $return->url = $meta->empty( 'site' ) ? false : $meta->getFirst( 'site' );
        $return->button_label = $meta->empty( 'button_label' ) ? false : $meta->getFirst( 'button_label' );
        $return->imagem = $meta->empty( 'imagem' ) ? false : $meta->render( 'imagem' );
        $return->blocks = [];

        for( $b = 1; $b <= 2; $b++ ):
        
            if( !$meta->empty( 'bloco' . $b ) ):

                $bloco = $meta->getFirst( 'bloco' . $b );
                $bloco_data = new stdClass();
                foreach( [ 'title','tag','author','foto','url' ] as $field ):

                    $fname = 'blc' . $b . '_' . $field;

                    if( $bloco->{$fname}->isempty() ):
                        $bloco_data->{$field} = false;
                    else:
                        $bloco_data->{$field} = $field === 'url' ? $bloco->{$fname}->getFirst() : $bloco->{$fname}->render();
                    endif;

                endforeach;

                $return->blocks[] = $bloco_data;

            endif;

        endfor;

        return $return;

    }

}
$Jokers = new Jokers();

// Form settings
function pikiform_coringa_settings(){
	return [
		'key' => JOKERS_KEY,
        'post_type' => JOKERS_KEY,
        'post_type_active' => true
	];
}
function pikiform_coringa_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Título',
            'maxlength' => 120,
        ],
        'logo' => [
            'machine_name' => 'logo',
            'ftype' => 'imagewp',
            'label' => 'Logo',
        ],
        'excerpt' => [
            'machine_name' => 'excerpt',
            'ftype' => 'excerpt',
            'label' => 'Chamada',
            'maxlength' => 550,
        ],
        'site' => [
            'machine_name' => 'site',
            'ftype' => 'url',
            'label' => 'URL',
        ],
        'button_label' => [
            'machine_name' => 'button_label',
            'ftype' => 'text',
            'label' => 'Label do botão',
        ],
        'imagem' => [
            'machine_name' => 'imagem',
            'ftype' => 'imagewp',
            'label' => 'Imagem de fundo',
            'styles' => [ 'ret' => [ 'width' => '50%' ] ],
        ],
        'bloco1' => [
            'machine_name' => 'bloco1',
            'ftype' => 'fieldset',
            'label' => 'Bloco 1',
            'subfields' => [
                'blc1_title' => [
                    'machine_name' => 'blc1_title',
                    'ftype' => 'text',
                    'label' => 'Título',
                    'maxlength' => 120,
                ],
                'blc1_tag' => [
                    'machine_name' => 'blc1_tag',
                    'ftype' => 'text',
                    'label' => 'Tag',
                ],
                'blc1_author' => [
                    'machine_name' => 'blc1_author',
                    'ftype' => 'text',
                    'label' => 'Autor',
                ],
                'blc1_foto' => [
                    'machine_name' => 'blc1_foto',
                    'ftype' => 'imagewp',
                    'label' => 'Imagem (576x350)',
                ],
                'blc1_url' => [
                    'machine_name' => 'blc1_url',
                    'ftype' => 'url',
                    'label' => 'URL',
                ],
            ]
        ],
        'bloco2' => [
            'machine_name' => 'bloco2',
            'ftype' => 'fieldset',
            'label' => 'Bloco 2',
            'subfields' => [
                'blc2_title' => [
                    'machine_name' => 'blc2_title',
                    'ftype' => 'text',
                    'label' => 'Título',
                    'maxlength' => 120,
                ],
                'blc2_tag' => [
                    'machine_name' => 'blc2_tag',
                    'ftype' => 'text',
                    'label' => 'Tag',
                ],
                'blc2_author' => [
                    'machine_name' => 'blc2_author',
                    'ftype' => 'text',
                    'label' => 'Autor',
                ],
                'blc2_foto' => [
                    'machine_name' => 'blc2_foto',
                    'ftype' => 'imagewp',
                    'label' => 'Imagem (288x175)',
                ],
                'blc2_url' => [
                    'machine_name' => 'blc2_url',
                    'ftype' => 'url',
                    'label' => 'URL',
                ],
            ]
        ],
    ];
}
