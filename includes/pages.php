<?php
class Pages {

    function __construct(){
        add_action( 'init', [ $this, 'init' ] );
    }

    public function init(){
        add_post_type_support( 'page', 'excerpt' );
    }

    // Get page template
    public static function getTemplate( $ID ){

        if( empty( $ID ) ) return false;

        $template = get_page_template_slug( $ID );
        if( !empty( $template ) ):
            return str_replace( '.php', '', $template );
        else: 
            return false;
        endif;

    }
    // Cover fields
    public static function coverFields( &$fields, $opts = [] ){

        $cover_type = _array_get( $opts, 'type', 'full' );
        $fixed_type = _array_get( $opts, 'fixed_type' );

        // Cover fields
        $fields[ 'cover' ] = [

            'machine_name' => 'cover',
            'ftype' => 'fieldset',
            'label' => 'Destaque',
            'subfields' => [
                'cvr_image' => [
                    'machine_name' => 'cvr_image',
                    'label' => 'Imagem de capa (2432 x 1440)',
                    'ftype' => 'imagewp',
                    'styles' => [
                        'ret' => [ 'width' => '50%' ],
                    ]
                ],
                'cvr_clip' => [
                    'machine_name' => 'cvr_clip',
                    'label' => 'Vídeo de capa',
                    'ftype' => 'youtube',
                    'description' => 'URL ou ID no youtube'
                ],
            ]

        ];

    }

    // Form Fields
	public function getFields( $settings = false ){

        // Pasted settings
        if( $settings && ( $_post = _array_get( $settings, 'item' ) ) ):
            $this->post = $_post;
        // There is no settings
        else:
            // Global post
            global $post;
            // Post item
            if( empty( $post ) ):
                $this->post = get_post( _get( 'post' ) );
            endif;
        endif;
        // There is no post
        if( empty( $this->post ) ) return [];

        // Return
        $fields = [
            'title' => [
                'machine_name' => 'title',
                'ftype' => 'title',
                'label' => 'Título',
            ],
            'body' => [
                'machine_name' => 'body',
                'ftype' => 'body',
                'label' => 'Conteúdo',
            ],
            'excerpt' => [
                'machine_name' => 'excerpt',
                'ftype' => 'excerpt',
                'label' => 'Resumo',
            ],
        ];

        // Templte
        $this->template = Pages::getTemplate( $this->post->ID );        

        // Homes
        $isHome = $this->template == 'page-inicio';
        if( $isHome ):
        
            // Cover
            self::coverFields( $fields );

            // Quem somos
            $fields[ 'about' ] = [
                'machine_name' => 'about',
                'ftype' => 'fieldset',
                'label' => 'Quem somos',
                'subfields' => [
                    'about_title' => [
                        'machine_name' => 'about_title',
                        'label' => 'Título',
                        'ftype' => 'text',
                    ],
                    'about_desc' => [
                        'machine_name' => 'about_desc',
                        'label' => 'Descrição',
                        'ftype' => 'textarea',
                    ],
                    'about_video' => [
                        'machine_name' => 'about_video',
                        'label' => 'Vídeo (youtube)',
                        'ftype' => 'youtube',
                    ],
                ],

            ];

        endif;

        // Quem somos
        if( $this->template == 'page-quem-somos' ):

            $fields[ 'top_subtitle' ] = [
                'machine_name' => 'top_subtitle',
                'ftype' => 'textarea',
                'label' => 'Subítulo do topo',
            ];

            $fields[ 'cards' ] = [
                'machine_name' => 'cards',
                'ftype' => 'fieldset',
                'label' => 'Cards',
                'multiple' => true,
                'subfields' => [
                    'card_title' => [
                        'machine_name' => 'card_title',
                        'label' => 'Título',
                        'ftype' => 'text',
                    ],
                    'card_text' => [
                        'machine_name' => 'card_text',
                        'label' => 'Texto',
                        'ftype' => 'textarea',
                    ],
                    'card_icon' => [
                        'machine_name' => 'card_icon',
                        'label' => 'Imagem',
                        'ftype' => 'imagewp',
                    ],
                ],

            ];

            $fields[ 'banner_hastag' ] = [
                'machine_name' => 'banner_hastag',
                'ftype' => 'fieldset',
                'label' => 'Banner hastag',
                'subfields' => [
                    'ban_title' => [
                        'machine_name' => 'ban_title',
                        'label' => 'Título',
                        'ftype' => 'text',
                    ],
                    'ban_text' => [
                        'machine_name' => 'ban_text',
                        'label' => 'Texto',
                        'ftype' => 'textarea',
                    ],
                    'ban_image' => [
                        'machine_name' => 'ban_image',
                        'label' => 'Imagem',
                        'ftype' => 'imagewp',
                        'styles' => [ 'ret' => [ 'width' => '50%' ] ]
                    ],
                ],

            ];

            // Editorias
            $fields[ 'editorias' ] = [
                'machine_name' => 'editorias',
                'ftype' => 'fieldset',
                'label' => 'Editorias',
                'subfields' => [],
            ];
            $editorias = Piki::getTaxonomyThree( 'category', [ 41 ], true );
            foreach( $editorias as $editoria ):
                $fields[ 'editorias' ][ 'subfields' ][ $editoria->slug ] = [
                    'machine_name' => $editoria->slug,
                    'ftype' => 'imagewp',
                    'label' => 'Imagem para editoria ' . $editoria->name,
                    'styles' => [ 'ret'=> [ 'width' => '50%' ] ],

                ];
            endforeach;

        endif;

        return $fields;
		
	}

    // Form settings
    public static function formSettings(){
        return array(
            'key' => 'page',
            'post_type' => 'page',
            'post_type_active' => true
        );
    }

}
$Pages = new Pages();

// Form settings
function pikiform_page_settings(){
    global $Pages;
    return $Pages->formSettings();
}
function pikiform_page_fields( $settings ){
    global $Pages;
    return $Pages->getFields( $settings );
}


