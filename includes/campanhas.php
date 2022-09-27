<?php
// Tipo de post
define( 'CAMPANHA_TYPE', 'campanha' );
define( 'CAMPANHA_TAX', 'categ' );

class Campanhas {

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
    var $archiveStickies;

    function __construct(){

        Campanhas::$subcateg = _get( 'subeditoria' );

        add_action( 'init', [ 'Campanhas', 'registerPostType' ] );
        add_action( 'init', [ 'Campanhas', 'registerTaxonomy' ] );

        // Pre get posts
        add_action( 'pre_get_posts', [ $this, 'preGetCampanhas' ] );

        // Editoria form fields
        add_action( 'category_add_form_fields', [ $this, 'editoriaAddFields' ] );
        add_action( 'category_edit_form_fields', [ $this, 'editoriaEditFields' ] );
        add_action( 'created_category', [ $this, 'editoriaSaveFields' ] );
        add_action( 'edited_category', [ $this, 'editoriaSaveFields' ] );
    
    }

    public function preGetCampanhas( $query ){

        if( is_admin() || !is_main_query() || !$query->is_main_query() || $query->get( 'not_main_query' ) == 'true' ):
            return true;
        endif;

        // Editories homes
        if( is_archive() ):

            // Campanhas
            if( $query->get( 'post_type' ) == 'campanha' ):

                $this->_getArchiveDestaques();

                $query->set( 'post__not_in', $this->postsOut );
                $query->set( 'posts_per_page', 8 );

                // Filter by category
                $categ = _get( 'categoria' );
                if( $categ ):
                    $query->set( 
                        'tax_query', 
                        [[
                                'taxonomy' => CAMPANHA_TAX,
                                'field' => 'slug',
                                'terms' => [ $categ ]
                        ]]
                    );
                endif;
                
                // Regiao
                $region = _get( 'regiao' );
                if( $region ):
                    $query->set( 
                        'meta_query', 
                        [[
                            'key' => 'regiao',
                            'value' => $region,
                        ]]
                    );
                endif;

            endif;

        endif;

    }

    // Campains page list stickies posts
    public static function getArchiveDestaques(){
    
        global $Campanhas;

        if( !$Campanhas->archiveStickies ) return '';

        foreach( $Campanhas->archiveStickies as &$item ):            
            $item = plenamata_get_teaser_data( $item, [ 'image_field' => 'cover', 'excerpt' => false ] );
        endforeach;
        
        get_template_part( 'components/slider', 'covers', [ 'items' => $Campanhas->archiveStickies ] );
    
    }

    public function _getArchiveDestaques(){

        if( is_null( $this->archiveStickies ) ):

            $destaques = new WP_Query([
                'post_type' => CAMPANHA_TYPE,
                'posts_per_page' => 5,
                'meta_query' => [
                    [
                        'key' => 'destaque_archive',
                        'value' => 'on',
                    ],
                    [
                        'key' => 'cover',
                        'compare' => 'EXISTS',
                    ],
                    [
                        'key' => 'cover',
                        'value' => '',
                        'compare' => '!=',
                    ],
                ],
            ]);

            if( !empty( $destaques ) ):

                $this->addCampanhasOut( array_column( $destaques->posts, 'ID' ) );
                $this->archiveStickies = $destaques->posts;
                
            else:

                $this->archiveStickies = false;
            
            endif;

        endif;

        /*
        //get_template_part( 'components/destaques', 'campanhas', [ 'destaques' => $destaques ] );
        */

        return $this->archiveStickies;
        
    }

    public static function addCampanhasOut( $posts ){

        global $Campanhas;

        // Not empty
        if( empty( $posts ) ) return true;
        
        // Allways array
        if( !is_array( $posts ) ) $posts = [ $posts ];

        // Insert
        $Campanhas->postsOut = array_merge( $Campanhas->postsOut, $posts );

    }

    public static function getCampanhasOut(){
        global $Campanhas;
        return array_unique( $Campanhas->postsOut );
    }
    
    // Editoria form fields
    public function editoriaAddFields( $taxonomy ) {

        echo '<div class="form-field">
            <label for="order">Imagem na home</label>';
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

    // Custom taxonomy
    public static function registerTaxonomy(){

        // Add new taxonomy, make it hierarchical (like categories)
        $labels = [
            'name'              => __( 'Categorias', 'amazonia' ),
            'singular_name'     => __( 'Categoria', 'amazonia' ),
            'search_items'      => __( 'Buscar categorias', 'amazonia' ),
            'all_items'         => __( 'Todas as Catagorias', 'amazonia' ),
            'parent_item'       => __( 'Categoria mãe', 'amazonia' ),
            'parent_item_colon' => __( 'Categoria mãe:', 'amazonia' ),
            'edit_item'         => __( 'Editar Categoria', 'amazonia' ),
            'update_item'       => __( 'Atualizar Categoria', 'amazonia' ),
            'add_new_item'      => __( 'Adicionar nova categoria', 'amazonia' ),
            'new_item_name'     => __( 'Novo nome de categoria', 'amazonia' ),
            'menu_name'         => __( 'Categorias', 'amazonia' ),
        ];
     
        $args = [
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => [ 'slug' => false ],
        ];
     
        register_taxonomy( CAMPANHA_TAX, [ CAMPANHA_TYPE ], $args );

    }

    // Change dashboard Campanhas to News
    public static function registerPostType() {

        $labels = array(
            'name'               => __( 'Campanha', 'amazonia' ),
            'singular_name'      => __( 'Campanhas', 'amazonia' ),
            'menu_name'          => __( 'Campanhas', 'amazonia' ),
            'name_admin_bar'     => __( 'Campanhas', 'amazonia' ),
            'add_new'            => __( 'Adicionar nova', 'amazonia' ),
            'add_new_item'       => __( 'Adicionar nova amazonia', 'amazonia' ),
            'new_item'           => __( 'Nova campanha', 'amazonia' ),
            'edit_item'          => __( 'Editar campanha', 'amazonia' ),
            'view_item'          => __( 'Ver campanhas', 'amazonia' ),
            'all_items'          => __( 'Todas as campanhas', 'amazonia' ),
            'search_items'       => __( 'Procurar campanha', 'amazonia' ),
            'parent_item_colon'  => __( 'Mensagem mãe:', 'amazonia' ),
            'not_found'          => __( 'Nenhuma campanha encontrada.', 'amazonia' ),
            'not_found_in_trash' => __( 'Nenhuma campanha na lixeira.', 'amazonia' )
        );

        $args = [
            'labels'             => $labels,
            'description'        => __( 'Campanhas', 'amazonia' ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true,
            'query_var'          => true,
            'rewrite'            => [ 'slug' => 'campanhas' ],
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 0,
            'taxonomies'         => [ CAMPANHA_TAX ],
            'supports'           => [ 'title', 'excerpt', 'editor', 'revisions' ],
            'menu_icon'          => 'dashicons-laptop',
        ];

        register_post_type( CAMPANHA_TYPE, $args );

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
        global $Campanhas;
        return $Campanhas->_getList( $options );
    }

    // Recupera lista de posts
    public function _getList( $options = [] ){

        global $wp_query;

        // Category selected
        $categ = Campanhas::getCateg();

        // Query args
        $args = [ 
            'post_type' => CAMPANHA_TYPE,
            'posts_per_page' => 6,
            'post__not_in' => Campanhas::getCampanhasOut(),
            'paged' => $wp_query->get( 'paged' ) == '' ? 1 : $wp_query->get( 'paged' )
        ];

        // Campanhas out
        $outs = $this->getCampanhasOut();
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
        Campanhas::$listQuery = new WP_Query( $args );

        // Set return
        $return = [
            'posts' => Campanhas::$listQuery->have_posts() ? Campanhas::$listQuery->posts : false,
            'pager' => Campanhas::getPager(),
            'filter' => Campanhas::getFilter(),
        ];

        // Reset query
        wp_reset_query();

        return $return;

    }

    // Pager
    public static function getPager(){

        $args = [ 
            'type' => 'default',
            'target' => '#outras-campanhas',
            'list' => '#lista-outras',
            'item' => '.teaser',
            'print' => false,
        ];

        return Pager::show( 
            Campanhas::$listQuery, 
            $args
        );

    }

    // Rizes for home
    public static function getForHome( $term ){

        $posts_out = Campanhas::getCampanhasOut();

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

    // Últimas notícias
    public static function getLasts(){
        global $Campanhas;
        return $Campanhas->_getLasts();
    }
    public function _getLasts(){

        // Return object
        $return = new stdClass();
        // Destaque maior, com foto
        $return->sticky = false;
        // Destaque menor, com foto
        $return->second = false;
        // Destaque textual
        $return->thirds = false;
        // Outs
        $outs = [];
        
        // Sticky post
        $args = [
            'post_type' => 'post',
            'posts_per_page' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
            'meta_query' => [
                [
                    'key' => 'thumb',
                    'compare' => 'EXISTS',
                ],
                [
                    'key' => 'thumb',
                    'compare' => '!=',
                    'value' => '',
                ],
            ],
        ];
        
        $sticky = new WP_Query( $args );
        
        // Exclude sticky from list, if fouded
        if( $sticky->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->sticky = reset( $sticky->posts );
            // Insere no array de posts já mostrados
            array_push( $outs, $return->sticky->ID );
        endif;

        // Second sticked post
        $args_second = $args;
        $args_second[ 'posts_per_page' ] = '1';
        if( !empty( $outs ) ):
            $args_second[ 'post__not_in' ] = $outs;
        endif;
        unset( $args_second[ 'meta_query' ] );
        // Queryng
        $second = new WP_Query( $args_second );
        // Exclude sticky from list, if fouded
        if( $second->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->second = reset( $second->posts );
            // Insere no array de posts já mostrados
            array_push( $outs, $return->second->ID );
        endif;

        // Thirds sticked post
        $args[ 'posts_per_page' ] = '2';
        if( !empty( $outs ) ):
            $args[ 'post__not_in' ] = $outs;
        endif;
        // Queryng
        $thirds = new WP_Query( $args );
        // Exclude sticky from list, if founded
        if( $thirds->have_posts() ):
            // Guarda o post no objeto de retorno
            $return->thirds = $thirds->posts;
            // Insere no array de posts já mostrados
            $outs = array_merge( $outs, array_column( $return->thirds, 'ID' ) );
        endif;
        
        Campanhas::addCampanhasOut( $outs );

        // Reset query
        wp_reset_query();

        return $return;

    }

    // Destaques
    public static function getDestaques( $type = 'home', $template = '' ){
        global $Campanhas;
        return $Campanhas->_getDestaques( $type, $template );
    }
    public function _getDestaques( $type, $template ){

        // Return object
        $return = new stdClass();
        
        // Destaque maior, com foto
        $return->sticky = false;

        // Destaque menor, com foto
        $return->seconds = [];

        // Key
        $meta_key = 'destaque_position';
        
        // Sticky post
        $args_sticky = [
            'post_type' => CAMPANHA_TYPE,
            'posts_per_page' => 1,
            'post__not_in' => Campanhas::getCampanhasOut(),
            'meta_query' => [
                'sticky' => [
                    'key' => $meta_key,
                    'value' => '50'
                ],
                'cover' => [
                    'key' => 'cover',
                    'compare' => 'EXISTS',
                ],
            ],
        ];        
        $sticky = new WP_Query( $args_sticky );
        
        // Exclude sticky from list, if fouded
        if( $sticky->have_posts() ):

            // Sticky post
            $sticky = reset( $sticky->posts );

            // Sticky data
            $return->sticky = $sticky;

            // Insere no array de posts já mostrados
            array_push( $this->postsOut, $sticky->ID );

        // Empty post for selection
        elseif( is_admin() ):
        
            $return->sticky = Campanhas::getEmptyCapaItem();
        
        endif;

        // Anothers
        foreach( [ 40, 30, 20, 10 ] as $weight ):

            $args_sticky[ 'meta_query' ][ 'sticky' ][ 'value' ] = $weight;
            $args_sticky[ 'meta_query' ][ 'cover' ][ 'key' ] = 'thumb';
            $args_sticky[ 'post__not_in' ] = Campanhas::getCampanhasOut();

            $another = new WP_Query( $args_sticky );

            if( $another->have_posts() ):

                // Sticky post
                $another = reset( $another->posts );

                // Sticky data
                $return->seconds[] = $another;

                // Insere no array de posts já mostrados
                array_push( $this->postsOut, $another->ID );

            // Empty post for selection
            elseif( is_admin() ):

               $return->seconds[] = Campanhas::getEmptyCapaItem();
            
            endif;
            
        endforeach;

        // Complete if has no enough
        $total_seconds = count( $return->seconds );
        /*
        if( !is_admin() && $total_seconds < 4 ):
            $tocomplete = new WP_Query([
                'post_type' => CAMPANHA_TYPE,
                'posts_per_page' => ( 4 - $total_seconds ),
                'post__not_in' => Campanhas::getCampanhasOut(),
                'meta_query' => [
                    'cover' => [
                        'key' => 'thumb',
                        'compare' => 'EXISTS',
                    ],
                ],
            ]);
            if( $tocomplete->have_posts() ):
                foreach( $tocomplete->posts as $comp_item ):
                    // Sticky data
                    $return->seconds[] = $comp_item;
                    // Insere no array de posts já mostrados
                    array_push( $this->postsOut, $comp_item->ID );
                endforeach;
            endif;
        endif;
        */
        // Empty seconds
        if( empty( $return->seconds ) ) $return->seconds = false;

        // Reset query
        wp_reset_query();

        return ( ( !$return->sticky && empty( $return->seconds ) ) ? false : $return );

    }

    public static function getArchiveYears(){

        global $wpdb;

        $years = $wpdb->get_col("
            SELECT DISTINCT YEAR(POS.post_date) 
            FROM {$wpdb->posts} AS POS
            LEFT JOIN {$wpdb->prefix}term_relationships AS CAT ON CAT.object_id = POS.ID
            WHERE 
                POS.post_type = 'post'
                AND
                POS.post_status = 'publish'
                AND
                CAT.term_taxonomy_id = 1
            ORDER BY YEAR(POS.post_date) DESC
        ");

        return empty( $years ) ? [] : array_combine( $years, $years );

    }

    public static function getRelateds(){

        global $post;

        $meta = new PostMeta( $post->ID );
        if( !$meta ) return '';

        // Editoria
        $editoria = plenamata_get_editoria( $post );

        // Campanhas out
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
        $sticky = new WP_Query( $query_options );
        $sticky = !$sticky->have_posts() ? false : reset( $sticky->posts );

        // Simples
        $query_options[ 'posts_per_page' ] = $sticky ? 2 : 3;
        if( $sticky ):
            $query_options[ 'post__not_in' ][] = $sticky->ID;
        endif;
        unset( $query_options[ 'meta_query' ] );
        
        // Query normals
        $normals = new WP_Query( $query_options );

        // Empty
        if( !$sticky && !$normals->have_posts() ) return false;

        return [
            'sticky' => $sticky ,
            'normals' => !$normals->have_posts() ? false : $normals->posts,
            'editoria' => $editoria
        ];
        
    }

    public static function getFilter(){

        // Fields
        $fields = [];

        // Get category three
        $categs = Piki::getTaxonomyThree( CAMPANHA_TAX, [ 41 ], true );
        if( $categs ):
            $fields[] = '<div class="filter-item editorias">' . Campanhas::renderFilterThree( $categs ) . '</div>';
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
        $fields[] = '<div class="filter-item region">' . $field_region . '</div>';

        if( !empty( $fields ) ):
            return '<form action="./#outras-campanhas" id="filter-noticias" class="filter">
                <fieldset>
                    '. implode( '', $fields ) . '
                </fieldset>
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
                    <strong>' . __( 'Todos', 'amazonia' ) . '</strong>
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
                    $html .= Campanhas::renderFilterThree( $term->children, $term );
                
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
            'key' => CAMPANHA_TYPE,
            'post_type' => CAMPANHA_TYPE,
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
                'maxlength' => 180,
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
            'external_url' => [
                'machine_name' => 'external_url',
                'ftype' => 'url',
                'label' => 'URL externa',
            ],
            'thumb' => [
                'machine_name' => 'thumb',
                'ftype' => 'imagewp',
                'label' => 'Thumbnail para listagens',
                'description' => 'Resolução mínima da imagem: 576 x 358',
                'crop' => [
                    'status' => true,
                    'ratio' => '576x1000',
                ],
                'styles' => [ 'ret' => [ 'width' => '50%' ] ],
                'required' => true,
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
                'required' => [[ 
                    'field' => 'destaque_archive',
                    'value' => 'notempty',
                ]],
            ],
            'destaque_archive' => [
                'machine_name' => 'destaque_archive',
                'ftype' => 'boolean',
                'label' => 'Destacar na página de listagem',
            ],
            'destaque' => [
                'machine_name' => 'destaque',
                'ftype' => 'fieldset',
                'label' => 'Dados para destaque na home',
                'subfields' => [
                    'destaque_position' => [
                        'machine_name' => 'destaque_position',
                        'ftype' => 'select',
                        'label' => 'Posição de destaque na home',
                        'options' => [
                            '0' => 'Sem destaque',
                            '50' => 'Destaque principal',
                            '40' => 'Destaque secundário (posição 1)',
                            '30' => 'Destaque secundário (posição 2)',
                            '20' => 'Destaque secundário (posição 3)',
                            '10' => 'Destaque secundário (posição 4)',
                        ],
                    ],
                    'destaque_title' => [
                        'machine_name' => 'destaque_title',
                        'ftype' => 'text',
                        'label' => 'Título',
                        'maxlength' => '110',
                        'show_when' => [ $sticky_conds ],
                    ],
                    'destaque_subtitle' => [
                        'machine_name' => 'destaque_subtitle',
                        'ftype' => 'text',
                        'label' => 'Subtítulo',
                        'maxlength' => '190',
                        'show_when' => [ $sticky_conds ],
                    ],
                ],
            ],
        ];

        return $return;
		
	}

}
$Campanhas = new Campanhas();

// Form settings
function pikiform_campanha_settings(){
    global $Campanhas;
    return $Campanhas->formSettings();
}
function pikiform_campanha_fields( $settings ){
    global $Campanhas;
    return $Campanhas->getFields( $settings );
}