<?php
class Posts {

    var $post;
    var $postsOut = [];
    
    // List query
    static $listQuery;

    // Editoria
    static $editoria;
    
    // Category
    static $categ;
   
    // Subcategory
    static $subcateg;

    // Category stickies
    static $categStickies;

    function __construct(){

        Posts::$subcateg = _get( 'subeditoria' );

        add_filter( 'body_class', [ $this, 'customClass' ] );
        add_action( 'init', [ 'Posts', 'init' ] );

        // Pre get posts
        add_action( 'pre_get_posts', [ $this, 'preGetPosts' ] );

        // Editoria form fields
        add_action( 'category_add_form_fields', [ $this, 'editoriaAddFields' ] );
        add_action( 'category_edit_form_fields', [ $this, 'editoriaEditFields' ] );
        add_action( 'created_category', [ $this, 'editoriaSaveFields' ] );
        add_action( 'edited_category', [ $this, 'editoriaSaveFields' ] );
    
    }

    public function preGetPosts( $query ){

        if( is_admin() || !is_main_query() || !$query->is_main_query() || $query->get( 'not_main_query' ) == 'true' ):
            return true;
        endif;

    }

    public static function addPostsOut( $posts ){

        global $Posts;

        // Not empty
        if( empty( $posts ) ) return true;
        
        // Allways array
        if( !is_array( $posts ) ) $posts = [ $posts ];

        // Insert
        $Posts->postsOut = array_merge( $Posts->postsOut, $posts );

    }

    public static function getPostsOut(){
        global $Posts;
        return array_unique( $Posts->postsOut );
    }
    
    // Editoria form fields
    public function editoriaAddFields( $taxonomy ) {

        echo '<div class="form-field">
            <label for="order">Ordem</label>';
            echo number::get_field([
                'ftype' => 'number',
                'machine_name' => 'order',
                'label' => 'Ordem',
                'name_html' => 'order',
            ]);
            echo '
        </div>';

    }
    public function editoriaEditFields( $term ){

        $value = get_term_meta( $term->term_id, 'order', true );
        
        echo '<tr class="form-field">
            <th>
                <label for="order">Ordem</label>
            </th>
            <td>' . 
                number::get_field([
                    'ftype' => 'number',
                    'machine_name' => 'order',
                    'label' => 'Ordem',
                    'name_html' => 'order',
                    'value' => $value
                ]) . '
            </td>
        </tr>';

    }
    public function editoriaSaveFields( $term_id ) {
        update_term_meta(
            $term_id,
            'order',
            $_POST[ 'order' ]
        );
    }

    // Change dashboard Posts to News
    public static function init() {

        // Remove custom fields support
        remove_post_type_support( 'post', 'custom-fields' );
        add_post_type_support( 'post', 'thumbnail' );

        // Change post type labels
        $get_post_type = get_post_type_object( 'post' );
        $get_post_type->gender = 'a';
        $labels = $get_post_type->labels;
        $labels->name = 'Notícias';
        $labels->singular_name = 'Notícia';
        $labels->add_new = 'Adicionar nova';
        $labels->add_new_item = 'Adicionar nova notícia';
        $labels->edit_item = 'Editar notícia';
        $labels->new_item = 'Nova notícia';
        $labels->view_item = 'Ver notícia';
        $labels->search_items = 'Buscar notícias';
        $labels->not_found = 'Nenhuma notícia encontrada';
        $labels->not_found_in_trash = 'Nenhuma notícia na lixeira';
        $labels->all_items = 'Todas as notícias';
        $labels->menu_name = 'Notícias';
        $labels->name_admin_bar = 'Notícias';

    }

    public static function editoriaOptions(){

        $editorias = get_terms( 
            'category', 
            [ 
                'hide_empty' => true,
                'parent' => 0, 
            ]
        );
        
        return array_combine( 
            array_column( $editorias, 'slug' ), 
            array_column( $editorias, 'name' ) 
        );

    }

    public function customClass( $classes ){

        global $post;

        if( !is_home() && !empty( $post ) && $post->post_type == 'post' ):

            // Notice type
            $type = get_post_meta( $post->ID, 'type', true );
            if( empty( $type ) ) $type = 'noticia';
            
            // Add class
            $classes[] = 'single-' . $type; 

        endif;
        
        return $classes;

    }

    // Categoria na URL
    public static function getCateg(){
        if( is_null( self::$categ ) ):
            self::$categ = _get( 'categoria', '' );
        endif;
        return self::$categ;
    }

    // Recupera lista de posts
    public static function getList( $options = [] ){
        global $Posts;
        return $Posts->_getList( $options );
    }

    // Recupera lista de posts
    public function _getList( $options = [] ){

        global $wp_query;

        // Category selected
        $categ = Posts::getCateg();

        // Query args
        $args = [ 
            'posts_per_page' => 13,
            'post__not_in' => Posts::getPostsOut(),
            'paged' => $wp_query->get( 'paged' ) == '' ? 1 : $wp_query->get( 'paged' )
        ];

        // Posts out
        $outs = $this->getPostsOut();
        if( !empty( $outs ) ):
            $args[ 'post__not_in' ] = $outs;
        endif;
        
        // Category query
        if( $categ ):
            $args[ 'tax_query' ] = [
                [
                    'taxonomy' => 'category',
                    'field' => 'slug',
                    'terms' => $categ,

                ]
            ];
        endif;

        // Regiao
        $region = _get( 'regiao' );
        if( $region ):
            $args[ 'meta_query' ] = [
                [
                    'key' => 'regiao',
                    'value' => $region,
                ],
            ];
        endif;

        // Queryng
        Posts::$listQuery = new WP_Query( $args );

        // Set return
        $return = [
            'posts' => Posts::$listQuery->have_posts() ? Posts::$listQuery->posts : false,
            'pager' => Posts::getPager(),
            'filter' => Posts::getFilter(),
        ];

        // Reset query
        wp_reset_query();

        return $return;

    }

    // Pager
    public static function getPager(){

        $args = [ 
            'type' => 'default',
            'target' => '#outras-noticias',
            'list' => '#lista-outras',
            'item' => '.teaser',
            'print' => false,
        ];

        return Pager::show( 
            Posts::$listQuery, 
            $args
        );

    }

    // Destaques
    public static function getDestaques( $type = 'home', $template = '' ){
        global $Posts;
        return $Posts->_getDestaques( $type, $template );
    }
    public function _getDestaques( $type, $template ){

        // Return object
        $return = new stdClass();

        // Home ID
        $home_id = apply_filters( 'wpml_object_id', get_option( 'page_on_front' ) );
        
        // Destaque maior, com foto
        $sticky_id = get_post_meta( $home_id, 'news_sticky' );
        if( !empty( $sticky_id ) ):
            // Get sticky post
            $return->sticky = get_post( reset( $sticky_id ) );
            // Insere no array de posts já mostrados
            if( $return->sticky ):
                array_push( $this->postsOut, $return->sticky->ID );
            endif;
        else:
            $return->sticky = false;
        endif;
        
        // Anothers
        $seconds_ids = get_post_meta( $home_id, 'news_seconds' );
        if( !empty( $seconds_ids ) ):

            $return->seconds = get_posts([ 'post__in' => $seconds_ids ]);
            if( empty( $return->seconds ) ):
            
                $return->seconds = false;
            
            else:

                $keyeds = array_combine( array_column( $return->seconds, 'ID' ), $return->seconds );
                $return->seconds = array_flip( $seconds_ids );
                foreach( $return->seconds as $post_id => &$post ):
                    $post = $keyeds[ $post_id ];
                endforeach;
            
                array_push( $this->postsOut, array_column( $return->seconds, 'ID' ) );
            
            endif;
            
        endif;

        return ( ( !$return->sticky && empty( $return->seconds ) ) ? false : $return );

    }

    public static function getRelateds(){

        global $post;

        $meta = new PostMeta( $post->ID );
        if( !$meta ) return '';

        // Editoria
        $editoria = plenamata_get_editoria( $post );

        // Posts out
        $outs = [ $post->ID ];

        // Query options
        $query_options = [
            'posts_per_page' => 1,
            'tax_query' => [
                [
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => [ $editoria->term_id ]
                ]
            ],
            'meta_query' => [
                'thumb' => [
                    'key' => 'thumb',
                    'compare' => 'EXISTS'
                ],
            ],
            'post__not_in' => $outs,
        ];

        // With image
        $sticky = get_posts( $query_options );
        $sticky = empty( $sticky ) ? false : reset( $sticky );

        // Simples
        $query_options[ 'posts_per_page' ] = $sticky ? 2 : 3;
        if( $sticky ):
            $query_options[ 'post__not_in' ][] = $sticky->ID;
        endif;
        unset( $query_options[ 'meta_query' ] );
        
        // Query normals
        $normals = get_posts( $query_options );

        // Empty
        if( !$sticky && empty( $normals ) ) return false;

        return [
            'sticky' => $sticky ,
            'normals' => empty( $normals ) ? false : $normals,
            'editoria' => $editoria
        ];
        
    }

    public static function getFilter(){

        // Fields
        $fields = [];

        // Get category three
        $categs = Piki::getTaxonomyThree( 'category', [ 41 ], true );
        if( $categs ):
            $fields[] = '<div class="filter-item editorias">
                <em>' . __( 'Filtrar por assunto', 'amazonia' ) . ':</em>' . 
                Posts::renderFilterThree( $categs ) . '
            </div>';
        endif;

        // Regions
        $field_region = select::get_field([
            'ftype' => 'select',
            'name_html' => 'regiao',
            'id' => 'regiao',
            'options' => plenamata_get_regions(),
            'placeholder' => __( 'Todas as regiões', 'amazonia' ),
            'value' => _get( 'regiao', '' ),
            'attr' => [ 'style' => 'opacity:0;width:100%;' ]
        ]);
        
        $fields[] = '
        <div class="filter-item region">
            <em>' . __( 'Filtrar por região', 'amazonia' ) . ':</em>' . 
            $field_region . '
        </div>';

        if( !empty( $fields ) ):
            return '<form action="./#outras-noticias" id="filter-noticias" class="filter">
                <button type="button" class="close" data-action="close" title="' . __( 'Fechar', 'amazonia' ) . '"></button>
                <fieldset>
                    '. implode( '', $fields ) . '
                </fieldset>
                <div class="controls">
                    <button type="submit" data-action="apply" title="' . __( 'Aplicar filtros', 'amazonia' ) . '">' . __( 'Aplicar filtros', 'amazonia' ) . '</button>
                    <a href="' . Piki::permalang( 'artigos' ) . '" class="button inline color--4" title="' . __( 'Limpar filtros', 'amazonia' ) . '">' . __( 'Limpar filtros', 'amazonia' ) . '</a>
            </form>';
        endif;

    }

    public static function renderFilterThree( $terms, $parent = false ){

        $filter_value = _get( 'categoria', '' );

        $html = '<ul'.( $parent ? ' class="sublist"' : '' ).'>';

        // Parent and All
        if( $parent ):
            $add_id = 'filter-categ-' . $parent->term_id;
            $add_value = $parent->slug;
        else:
            $add_id = 'filter-categ-all';
            $add_value = '';
        endif;
        $html .= '
        <li>
            <label for="'. $add_id .'">
                <input type="radio" id="'. $add_id .'" name="categoria" value="'. $add_value .'"'. ( $filter_value == $add_value ? ' checked="checked"' : '' ) .'>
                    <strong>Todos</strong>
                </label>
            </label>
        </li>';

        // Others items
        foreach( $terms as $term ):

            $has_children = !empty( $term->children );

            $id = 'filter-categ-' . $term->term_id;
            $html .= '
            <li'. ( $has_children ? ' class="has-child"' : '' ) .'>';

                if( $has_children ):

                    $is_active = array_search( $filter_value, array_column( $term->children, 'slug' ) ) !== false || $term->slug == $filter_value;
                    
                    $html .= '<button class="clear'. ( $is_active ? ' active' : '' ) .'" type="button" data-action="toggle">'. $term->name .'</button>';
                    $html .= Posts::renderFilterThree( $term->children, $term );
                
                else:
                
                    $html .= '<label for="'. $id .'">
                    <input type="radio" id="'. $id .'" name="categoria" value="'. $term->slug .'"'. ( $filter_value == $term->slug ? ' checked="checked"' : '' ) .'>
                        <strong>'. $term->name .'</strong>
                    </label>';
                
                endif;
            
            $html .= '
            </li>';
        
        endforeach;
        
        $html .= '
        </ul>';

        return $html;
    
    }

    // Form settings
    public static function formSettings(){
        return array(
            'key' => 'post',
            'post_type' => 'post',
            'post_type_active' => true
        );
    }

    // Form Fields
	public function getFields( $settings = false ){

        global $post;

        // Post id
        $post_id = empty( $post ) ? _get( 'post' ) : $post->ID;

        // Type
        $type = get_post_meta( $post_id, 'type', true );

        // Stikcy conditions
        $sticky_conds = [
            'field' => 'destaque_position',
            'value' => '50',
        ];
        
        // Return
        $return = [
            'title' => [
                'machine_name' => 'title',
                'ftype' => 'title',
                'label' => 'Título',
                'maxlength' => 120,
            ],
            'body' => [
                'machine_name' => 'body',
                'ftype' => 'body',
                'label' => 'Conteúdo',
                'required' => true,
            ],
            'excerpt' => [
                'machine_name' => 'excerpt',
                'ftype' => 'excerpt',
                'label' => 'Resumo',
                'maxlength' => 150,
            ],            
            'external-source-link' => [
                'machine_name' => 'external-source-link',
                'ftype' => 'text',
                'label' => 'URL do parceiro',
            ],            
            'categ' => [
                'machine_name' => 'categ',
                'ftype' => 'taxonomy',
                'label' => 'Categoria',
                'taxonomy' => 'category',
                'required' => true,
            ],
            'regiao' => [
                'machine_name' => 'regiao',
                'ftype' => 'select',
                'label' => 'Região',
                'options' => plenamata_get_regions(),
            ],
            'cover' => [
                'machine_name' => 'cover',
                'ftype' => 'imagewp',
                'label' => 'Imagem principal',
                'description' => 'Resolução da imagem: 3840 x 1124 píxels',
                'crop' => [
                    'status' => true,
                    'ratio' => '1920x562',
                ],
                'styles' => [ 'ret' => [ 'width' => '50%' ] ],
            ],
            'thumb' => [
                'machine_name' => 'thumb',
                'ftype' => 'imagewp',
                'label' => 'Thumbnail para listagens',
                'description' => 'Resolução mínima da imagem: 576 x 358',
                'crop' => [
                    'status' => true,
                    'ratio' => '576x358',
                ],
                'styles' => [ 'ret' => [ 'width' => '50%' ] ],
                //'required' => true,
            ],
            'destaque' => [
                'machine_name' => 'destaque',
                'ftype' => 'fieldset',
                'label' => 'Dados para destaque',
                'subfields' => [
                    'destaque_image' => [
                        'machine_name' => 'destaque_image',
                        'ftype' => 'imagewp',
                        'title' => 'Destaque principal maior',
                        'label' => 'Imagem para desktop',
                        'description' => 'Resolução mínima da imagem: 608x674',
                        'crop' => [
                            'status' => true,
                            'ratio' => '1216x1348',
                        ],
                        'styles' => [ 'ret' => [ 'width' => '50%' ] ],
                        'wrapper_class' => 'no-border-bottom',
                        'required' => [ $sticky_conds ],
                        'show_when' => [ $sticky_conds ],
                    ],
                    'destaque_image_mob' => [
                        'machine_name' => 'destaque_image_mob',
                        'ftype' => 'imagewp',
                        'label' => 'Imagem para mobile',
                        'description' => 'Resolução mínima da imagem: 720x852',
                        'crop' => [
                            'status' => true,
                            'ratio' => '848x892',
                        ],
                        'styles' => [ 'ret' => [ 'width' => '50%' ] ],
                        'show_when' => [ $sticky_conds ],
                    ],
                ],
            ],
        ];

        return $return;
		
	}

}
$Posts = new Posts();

// Form settings
function pikiform_post_settings(){
    global $Posts;
    return $Posts->formSettings();
}
function pikiform_post_fields(){
    global $Posts;
    return $Posts->getFields( $settings );
}