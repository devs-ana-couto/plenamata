<?php
define( 'PODS_KEY', 'podcast' );
define( 'VIDEOS_KEY', 'video' );
define( 'IMAGES_KEY', 'imagem' );

class Multimidia {

    var $postsOut = [];
    var $listQuery;
    var $filters;
    var $keyword;

    static $filterList = [
        'estado',
        'editoria',
        'tipo-de-midia',
    ];
    static $totalItems;

    static $types = [
        PODS_KEY => [
            'slug' => 'podcasts',
            'labels' => [
                'singular' => 'Podcast',
                'plural' => 'Podcasts',
                'gender' => 'o',
            ],
            'menu_icon' => 'dashicons-megaphone',
        ],
        VIDEOS_KEY => [
            'slug' => 'videos',
            'labels' => [
                'singular' => 'Vídeo',
                'plural' => 'Vídeos',
                'gender' => 'o',
            ],
            'menu_icon' => 'dashicons-format-video',
        ],
        IMAGES_KEY => [
            'slug' => 'imagens',
            'labels' => [
                'singular' => 'Imagem',
                'plural' => 'Imagens',
                'gender' => 'a',
            ],
            'menu_icon' => 'dashicons-format-image',
        ],
    ];

    function __construct(){

        // Extract filters
        $this->extractFilters();

        add_action( 'init', [ $this, 'init' ] );
        add_action( 'pikiform_get_fields', [ $this, 'formFields' ], 10, 2 );
        add_filter( 'post_type_link', [ $this, 'postsLink' ], 10, 4 );

    }

    public static function typesKeys(){
        return array_keys( self::$types );
    }

    public function postsLink( $post_link, $post, $leavename, $sample ){

        if( in_array( $post->post_type, array_keys( Multimidia::$types ) ) ):
            $editoria = plenamata_get_editoria( $post );
            if( $editoria ):
                $post_link = str_replace( '%category%' , $editoria->slug, $post_link );
            endif;
        endif;

        return $post_link;  

    }

    // Extract filters
    private function extractFilters(){

        // Filter values
        foreach( self::$filterList as $filter ):
            $this->filters[ $filter ] = _get( $filter );
        endforeach;

        // Palavra chave
        $this->keyword = _get( 'buscar-por', '' );
        
    }

	public function init(){
		$this->registerPostTypes();
	}

    public static function getFilters(){
        global $Multimidia;
        return $Multimidia->filters;
    }

    public function getFilter( $key, $default = false ){
        return _array_get( $this->filters, $key, $default );
    }

	public function registerPostTypes(){

        foreach( Multimidia::$types as $post_type => $ptype ):

            $singular_min = strtolower( $ptype[ 'labels' ][ 'singular' ] );
            $plural_min = strtolower( $ptype[ 'labels' ][ 'singular' ] );
            $gender = $ptype[ 'labels' ][ 'gender' ];

    		$labels = array(
    			'name'               => $ptype[ 'labels' ][ 'plural' ],
    			'singular_name'      => $ptype[ 'labels' ][ 'singular' ],
    			'menu_name'          => $ptype[ 'labels' ][ 'plural' ],
    			'name_admin_bar'     => $ptype[ 'labels' ][ 'plural' ],
    			'add_new'            => 'Adicionar nov' . $gender,
    			'add_new_item'       => 'Adicionar nov'. $gender .' ' . $singular_min,
    			'new_item'           => 'Nov'. $gender .' ' . $singular_min,
    			'edit_item'          => 'Editar ' . $singular_min,
    			'view_item'          => 'Ver ' . $plural_min,
    			'all_items'          => 'Tod'. $gender .'s '. $gender .'s ' . $plural_min,
    			'search_items'       => 'Procurar ' . $singular_min,
    			'parent_item_colon'  => $ptype[ 'labels' ][ 'singular' ] . ' ' . ( $gender == 'a' ? 'mãe' : 'pai' ) . ':',
    			'not_found'          => 'Nenhum ' . $singular_min . ' encontrado.',
    			'not_found_in_trash' => 'Nenhum ' . $singular_min . ' na lixeira.',
    		);
            $rewrite = array(
                'slug'                  => $ptype[ 'slug' ] . '/%category%',
                'with_front'            => true,
                'pages'                 => true,
                'feeds'                 => true,
            );
    		$args = array(
    			'labels'             => $labels,
    			'description'        => $ptype[ 'labels' ][ 'plural' ],
    			'public'             => true,
    			'publicly_queryable' => true,
    			'show_ui'            => true,
    			'show_in_menu'       => true,
    			'query_var'          => true,
    			'rewrite'            => $rewrite,
    			'show_in_rest'       => true,
                'map_meta_cap'       => true,
    			'capability_type'    => $post_type,
    			'has_archive'        => $ptype[ 'slug' ],
    			'hierarchical'       => false,
    			'menu_position'      => 0,
    			'taxonomies'		 => [ 'category' ],
    			'supports'           => [ 'title', 'excerpt', 'editor', 'revisions' ],
    			'menu_icon'			 => $ptype[ 'menu_icon' ],
                'gender'              => $gender
    		);

    		register_post_type( $post_type, $args );

        endforeach;

    }

    public static function getDestaques(){
        global $Multimidia;
        return $Multimidia->_getDestaques();
    }

    public static function getForHome( $type ){
        global $Multimidia;
        return $Multimidia->_getForHome( $type );
    }

    public function _getForHome( $type ){

        // Type
        $typeInfo = $this::$types[ $type ];

        // Query args
        $args = [
            'post_type' => $type,
            'posts_per_page' => 3,
            'meta_query' => [
                [
                    'key' => 'home',
                    'value' => 'on'
                ],
            ]
        ];

        // Queryng
        $request = new WP_Query( $args );
        $posts = $request->have_posts() ? $request->posts : false;
        
        wp_reset_query();

        if( $posts ):

            foreach( $posts as &$post ):

                $meta = new PostMeta( $post );

                // Title
                $title = $meta->render( 
                    'title', 
                    [ 
                        'tags' => true, 
                        'breakline' => true 
                    ] 
                );

                // Picture 
                // image_home
                $cover = $meta->empty( 'cover' ) ? false : $meta->getFirst( 'cover' );
                if( $cover && !$cover->image_home->isempty() ):                    
                    
                    $thumb_url = $cover->image_home->render([ 'urls' => true, 'style' => 'ret' ]);
                    $thumb_url_retina = $cover->image_home->render([ 'urls' => true ]);
                    $thumb = '<picture class="imagewp">
                        <source media="(max-width:480px)" srcset="'. $thumb_url .' 1x, '. $thumb_url_retina .' 2x"> 
                        <img src="'. $thumb_url .'" alt="'. strip_tags( $title ) .'">
                    </picture>';

                // Default thumbnail
                else:

                    $thumb = '<picture class="imagewp thumb">
                        <img src="' . get_template_directory_uri() . '/assets/images/thumb-default.png" alt="'. strip_tags( $title ) .'">
                    </picture>';
                
                endif;

                $post = (object)[
                    'title' => $meta->render( 
                        'title', 
                        [ 
                            'tags' => true, 
                            'breakline' => true 
                        ] 
                    ),
                    'cover' => $thumb,
                    'url' => get_permalink( $post->ID ),
                    'typeLabel' => $typeInfo[ 'labels' ][ 'singular' ],
                    'duration' => $meta->render( 'duration' ),
                    'editoria' => plenamata_get_editoria( $meta ),
                ];

            endforeach;

        endif;

        return $posts;

    }

    public function _getDestaques(){

        // Post types to search
        $post_types = [ PODS_KEY, VIDEOS_KEY, IMAGES_KEY ];

        // Query args
        $args = [
            'post_type' => $post_types,
            'posts_per_page' => 9,
        ];

        // Return object
        $return = new stdClass();
        // Destaque maior, com foto
        $return->sticky = false;
        // Destaque menor, com foto
        $return->second = false;
        // Destaque textual
        $return->third = false;
        // Em alta
        $return->rizes = false;
        
        // Sticky post
        $args_sticky = $args;
        $args_sticky[ 'posts_per_page' ] = 1;
        $args_sticky[ 'meta_query' ] = [
            'sticky' => [
                'key' => 'sticky',
                'value' => '50'
            ],
            'cover' => [
                'key' => 'cover_image',
                'compare' => 'EXISTS'
            ],
            'cover' => [
                'key' => 'cover_image',
                'value' => '',
                'compare' => '!='
            ],
        ];
        
        // Queryng
        $sticky = new WP_Query( $args_sticky );
        // Exclude sticky from list, if fouded
        if( $sticky->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->sticky = reset( $sticky->posts );
            // Insere no array de posts já mostrados
            array_push( $this->postsOut, $return->sticky->ID );
        endif;

        // Second sticked post
        $args_second = $args_sticky;
        $args_second[ 'meta_query' ] = [
            'sticky' => [
                'key' => 'sticky',
                'value' => '40'
            ],
            'cover' => [
                'key' => 'thumb',
                'compare' => 'EXISTS'
            ],
            'cover' => [
                'key' => 'thumb',
                'value' => '',
                'compare' => '!='
            ],
        ];

        if( !empty( $this->postsOut ) ):
            $args_second[ 'post__not_in' ] = $this->postsOut;
        endif;
        // Queryng
        $second = new WP_Query( $args_second );
        // Exclude sticky from list, if fouded
        if( $second->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->second = reset( $second->posts );
            // Insere no array de posts já mostrados
            array_push( $this->postsOut, $return->second->ID );
        endif;

        // Third sticked post
        $args_third = $args_sticky;
        $args_third[ 'meta_query' ][ 'sticky' ][ 'value' ] = '30';
        unset( $args_third[ 'meta_query' ][ 'cover' ] );
        if( !empty( $this->postsOut ) ):
            $args_third[ 'post__not_in' ] = $this->postsOut;
        endif;
        // Queryng
        $third = new WP_Query( $args_third );
        // Exclude sticky from list, if fouded
        if( $third->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->third = reset( $third->posts );
            // Insere no array de posts já mostrados
            array_push( $this->postsOut, $return->third->ID );
        endif;

        // Reset query
        wp_reset_query();
        
        // Em alta
        $return->rizes = Multimidia::getRizes( 6, $this->postsOut );

        return $return;

    }

    public static function getRizes( $total = 6, $out = [] ){

        // Post types to search
        $post_types = [ PODS_KEY, VIDEOS_KEY, IMAGES_KEY ];

        return PostViews::getRizes([
            'types' => $post_types,
            'out' => $out,
            'total' => $total,
        ]);

    }

    // Request list
    public static function getList( $total = 9 ){
        global $Multimidia;
        return $Multimidia->_getList( $total );
    }
    public function _getList( $total ){

        global $wp_query;

        // Post types to search
        $post_types = $this->getFilter( 'tipo-de-midia', [ PODS_KEY, VIDEOS_KEY, IMAGES_KEY ] );
        
        // Pager
        $paged = $wp_query->get( 'paged' ) < 2 ? 1 : $wp_query->get( 'paged' );
        
        // Initial args
        $types_query = !is_array( $post_types ) ? explode( ',', $post_types ) : $post_types;
        $args = [
            'post_type' => $types_query,
            'posts_per_page' => $total,
            'paged' => $paged,
            'meta_query' => [],
        ];

        // Estado
        $estado = $this->getFilter( 'estado' );
        if( $estado ):
            $args[ 'meta_query' ][] = [
                'key' => 'estado',
                'value' => $estado,
            ];
        endif;

        // Editoria
        $editoria = $this->getFilter( 'editoria' );
        if( $editoria ):
            $args[ 'tax_query' ] = [
                [
                    'taxonomy' => 'category',
                    'field' => 'slug',
                    'terms' => [ $editoria ],
                ],
            ];
        endif;

        // Search
        if( !empty( $this->keyword ) && strlen( $this->keyword ) >= 3 ):
            $args[ 's' ] = $this->keyword;
        endif;

        // Query items
        $this->listQuery = new WP_Query( $args );
        // Keep totals
        $this::$totalItems = $this->listQuery->found_posts;

        // Have posts
        if( $this->listQuery->have_posts() ):
            $return = $this->listQuery->posts;
        // Not found
        else:
            $return = false;        
        endif;

        wp_reset_query();

        return $return;

    }
    // Pager
    public static function getPager(){

        global $Multimidia;
        
        $args = [ 
            'type' => 'default',
            'target' => '#content',
            'list' => '.list-teasers',
            'item' => '.teaser',
        ];

        Pager::show( 
            $Multimidia->listQuery, 
            $args
        );

    }

    public function formSettings( $post_type ){
        return [
            'key' => $post_type,
            'post_type' => $post_type,
            'post_type_active' => true
        ];
    }

    public function getTypesOptions(){

        $options = [];
        foreach( self::$types as $key => $type ):
            $options[ $key ] = $type[ 'labels' ][ 'plural' ];
        endforeach;
        return $options;

    }

    public function formFields( $fields, $settings ){

        // Key form
        $key = _array_get( $settings, 'key' );
        if( !isset( Multimidia::$types[ $key ] ) ):
            return $fields;
        endif;

        // Type info
        $type = _array_get( $this::$types, $key );

        $fields = [
            'title' => [
                'machine_name' => 'title',
                'ftype' => 'title',
                'label' => 'Título',
                'maxlength' => 110,
            ],
            'body' => [
                'machine_name' => 'body',
                'ftype' => 'body',
                'label' => 'Conteúdo textual',
                'required' => true,
            ],
            'excerpt' => [
                'machine_name' => 'excerpt',
                'ftype' => 'excerpt',
                'label' => 'Descrição',
                'maxlength' => 255,
            ],
            'author' => [
                'machine_name' => 'author',
                'ftype' => 'text',
                'label' => 'Autor',
                'maxlength' => '40',
                'required' => true,
            ],
            'categ' => [
                'machine_name' => 'categ',
                'ftype' => 'taxonomy',
                'label' => 'Categoria',
                'taxonomy' => 'category',
                'required' => true,
            ],
        ];

        switch( $key ):
            // Podcasts
            case PODS_KEY:
                $fields[ 'typemidia' ] = [
                    'machine_name' => 'typemidia',
                    'ftype' => 'select',
                    'label' => 'Fonte do podcast',
                    'required' => true,
                    'placeholder' => 'Selecione',
                    'placeholder_disable' => false,
                    'options' => [
                        'spotify' => 'Spotify',
                        'soundcloud' => 'Soundcloud',
                        'youtube' => 'Youtube',
                    ],
                ];
                $fields[ 'spotify' ] = [
                    'machine_name' => 'spotify',
                    'ftype' => 'text',
                    'label' => 'ID no Spotify',
                    'description' => 'O ID de uma Track não é suportado. Insira o ID de um Episode',
                    'show_when' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'spotify',
                        ]
                    ],
                    'required' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'spotify',
                        ]
                    ],
                ];
                $fields[ 'soundcloud' ] = [
                    'machine_name' => 'soundcloud',
                    'ftype' => 'text',
                    'label' => 'ID no Soundcloud',
                    'description' => 'O ID de uma Playlist não é suportado. Insira o ID de uma Track',
                    'show_when' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'soundcloud',
                        ]
                    ],
                    'required' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'soundcloud',
                        ]
                    ],
                ];
                $fields[ 'youtube' ] = [
                    'machine_name' => 'youtube',
                    'ftype' => 'youtube',
                    'label' => 'ID no Youtube',
                    'show_when' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'youtube',
                        ]
                    ],
                    'required' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'youtube',
                        ]
                    ],
                ];
                $fields[ 'duration' ] = [
                    'machine_name' => 'duration',
                    'ftype' => 'text',
                    'label' => 'Duração do podcast',
                    'description' => 'Formato: mm:ss',
                    'maxlength' => '20',
                    'required' => true,
                ];
            break;
            // Vídeo
            case VIDEOS_KEY:
                $fields[ 'typemidia' ] = [
                    'machine_name' => 'typemidia',
                    'ftype' => 'select',
                    'label' => 'Fonte do vídeo',
                    'required' => true,
                    'placeholder' => 'Selecione',
                    'placeholder_disable' => false,
                    'options' => [
                        'youtube' => 'Youtube',
                        'vimeo' => 'Vímeo',
                    ],
                ];
                $fields[ 'youtube' ] = [
                    'machine_name' => 'youtube',
                    'ftype' => 'youtube',
                    'label' => 'ID no Youtube',
                    'show_when' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'youtube',
                        ]
                    ],
                    'required' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'youtube',
                        ]
                    ],
                ];
                $fields[ 'vimeo' ] = [
                    'machine_name' => 'vimeo',
                    'ftype' => 'vimeo',
                    'label' => 'ID no Vimeo',
                    'intro' => false,
                    'show_when' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'vimeo',
                        ]
                    ],
                    'required' => [
                        [
                            'field' => 'typemidia',
                            'value' => 'vimeo',
                        ]
                    ],
                ];
                $fields[ 'duration' ] = [
                    'machine_name' => 'duration',
                    'ftype' => 'text',
                    'label' => 'Duração do vídeo',
                    'description' => 'Formato: mm:ss',
                    'maxlength' => '20',
                    'required' => true,
                ];
            break;
            // Imagem
            case IMAGES_KEY:
                $fields[ 'fotos' ] = [
                    'machine_name' => 'fotos',
                    'ftype' => 'imagewp',
                    'gallery' => true,
                    'label' => 'Fotos da galeria',
                    'styles' => [ 
                        'ret' => [ 'width' => '50%' ],
                        'thumb' => [ 'width' => '336', 'height' => '222', 'crop' => 'cc' ],
                        'thumb_ret' => [ 'width' => '168', 'height' => '111', 'crop' => 'cc' ],
                    ],
                    'required' => true,
                ];
            break;
        endswitch;

        // Imagens para listas e destaques
        plenamata_images_fields(
            $fields, 
            [ 
                'title' => 'Página principal de Multimídia',
                'label' => false,
                'type_slug' => $type[ 'slug' ],
            ]
        );

        return $fields;

    }

}
$Multimidia = new Multimidia();

// Form settings
function pikiform_podcast_settings(){
    global $Multimidia;
    return $Multimidia->formSettings( PODS_KEY );
}
function pikiform_video_settings(){
    global $Multimidia;
    return $Multimidia->formSettings( VIDEOS_KEY );
}
function pikiform_imagem_settings(){
    global $Multimidia;
    return $Multimidia->formSettings( IMAGES_KEY );
}