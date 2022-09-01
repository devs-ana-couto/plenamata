<?php
Class Slugs {
    
    var $checkterm = false;

    static $default_taxies;
    static $post_type;
    
    public $taxonomy;
    public $term;
    public $paged;
    public $post_taxonomy;
    public $post_term;
    public $post_post_type;

    function __construct(){
        self::$default_taxies = get_taxonomies( array( '_builtin' => true ) );
    }

    public function parse_request( &$WP ){

        global $wp_query;

        // Home
        if( empty( $WP->request ) ):
            return;
        endif;

        // Preview dos posts
        if( isset( $_GET[ 'preview_id' ] ) && !empty( $_GET[ 'preview_id' ] ) ):
            return;
        endif;

        // Parâmetros
        $pr = explode( '/', $WP->request );

        // Primeiro parâmetro
        $first = array_shift( $pr );
        $second = empty( $pr ) ? false : array_shift( $pr );
        $third = empty( $pr ) ? false : array_shift( $pr );
        $fourth = empty( $pr ) ? false : array_shift( $pr );

        // Tipo de post
        self::$post_type = $this->get_post_type( $first );
        if( !self::$post_type ):
            return;
        endif;

        // Seta o tipo de post
        $WP->query_vars = array(
            'post_type' => self::$post_type->name
        );

        if( !isset( self::$post_type->slugtax ) || !self::$post_type->slugtax ):
            $this->taxonomy = false;
        else:
            $this->taxonomy = get_taxonomy( self::$post_type->slugtax );
        endif;

        // Single post sem taxonomia
        if( $second && !$third && !$this->taxonomy ):
            $WP->query_vars[ 'name' ] = $second;
            return;
        endif;

        // Paginação da listagem geral do tipo de post
        #// postype/page/index
        if( $second && $second === 'page' ):
            $WP->query_vars[ 'paged' ] = $third;
            return;
        endif;

        // Single ítem
        if( $third && $third !== 'page' ):
            $WP->query_vars[ 'name' ] = $third;
            return;
        endif;

        // Paginação da listagem do termo
        #// postype/page/index
        if( $second === 'page' ):
            $WP->query_vars[ 'paged' ] = $third;
            return;
        endif;

        // Taxonomia
        if( !$this->taxonomy ):
            return;
        endif;
        
        // Listagem de termos
        // taxonomy/term
        if( $third === false ):      
            $this->term = get_term_by( 'slug', $second, $this->taxonomy->name );
            return;
        endif;
        
        // Paginação na listagem de termos
        // taxomomy/term/page/index
        if( $third === 'page' ):
            $this->term = get_term_by( 'slug', $second, $this->taxonomy->name );
            $WP->query_vars[ 'paged' ] = $fourth;
            return;
        endif;

    }

    public function get_post_type( $compare ){
        // Posts types
        $types = get_post_types( array( '_builtin' => false ) );
        if( empty( $types ) ):
            return false;
        endif;
        // Cada tipo de post
        foreach ( $types as $key => $type ):
            // TIpo de post
            $type = get_post_type_object( $type );
            // Recupara um tipo de post
            if( $type->name === $compare || ( isset( $type->rewrite[ 'slug' ] ) && $type->rewrite[ 'slug' ] === $compare ) ):
                return $type;
            endif;
        endforeach;
        return false;
    }

    // Parseando a query
    public function parse_query( $wp_query ){

        // Apenas main querys
        if( !$wp_query->is_main_query() ):
            return;
        endif;

        // Setando o filtro por taxonomia
        if( !empty( $this->taxonomy ) && !empty( $this->term  ) ):
            $wp_query->set( 'tax_query', array(
                array(
                    'taxonomy' => $this->taxonomy->name,
                    'terms' => array( $this->term->term_id )
                ),
            ));
        endif;

    }

    public function post_link( $post_link, $post, $leavename ){

        global $wp_query;

        $going_preview = is_admin() && isset( $_POST[ 'wp-preview' ] ) && $_POST[ 'wp-preview' ] === 'dopreview';

        
        $get_preview = isset( $_GET[ 'preview_id' ] ) || isset( $_GET[ 'preview' ] );

        if( $going_preview || ( !is_admin() && ( is_preview() || $preview_get ) ) ):
            return $post_link;
        endif;

        // Remove a / do fim
        $post_link = rtrim( $post_link, '/' );

        // Tipo de post
        $post_type = get_post_type_object( $post->post_type );

        // Se não houver um slugtax selecionado
        if( !isset( $post_type->slugtax ) || !$post_type->slugtax ):
            return $post_link;
        endif;

        // Taxonomia
        $this->post_taxonomy = get_taxonomy( $post_type->slugtax );
        if( !$this->post_taxonomy ):
            return $post_link;
        endif;

        // Termo deve ser tratado na URL
        $this->checkterm = true;

        $terms = wp_get_object_terms( $post->ID, $this->post_taxonomy->name );

        if( !empty( $terms ) ):
            
            $this->post_term = array_shift( $terms );

        else:
            
            // Primeiro termo
            $terms = get_terms(
                $this->post_taxonomy->name,
                array( 
                    'hide_empty' => false,
                    'orderby' => 'count',
                    'order' => 'DESC',
                    'number' => 1
                )
            );

            // Se ainda não há nenhum termo cadastrado
            if( empty( $terms ) ):
                return $post_link;
            endif;
           
            $this->post_term = array_shift( $terms );               

            wp_set_post_terms( $post->ID, array( $this->post_term->term_id ), $this->post_term->taxonomy );
        
        endif;

        // Inserindo termo na URL
        $peaces_link = explode( '/', $post_link );
        $name = array_pop( $peaces_link );
        array_push( $peaces_link, $this->post_term->slug, $name );
        $post_link = implode( '/', $peaces_link );
        
        return $post_link;

    }

    public static function link_choose_term(){

        session_start();

        // Verify nonce
        check_ajax_referer( 'samplepermalink', 'samplepermalinknonce' );

        $ID = isset( $_POST[ 'ID' ] ) && !empty( $_POST[ 'ID' ] ) ? $_POST[ 'ID' ] : false;
        $term_id = isset( $_POST[ 'term_id' ] ) && !empty( $_POST[ 'term_id' ] ) ? $_POST[ 'term_id' ] : false;
        $title = isset( $_POST[ 'title' ] ) && !empty( $_POST[ 'title' ] ) ? $_POST[ 'title' ] : '';

        if( !$ID || !$term_id ):
            Piki::error( 'Dados insuficientes.' );
        endif;

        $term = get_term( $term_id );

        if( empty( $term ) || is_wp_error( $term ) ):
            Piki::error( 'Termo inexistente.' );
        endif;

        // Mudando a categoria do Post
        wp_set_post_terms( $ID, array( (int)$term->term_id ), $term->taxonomy );
        
        // Recuperando a nova URL       
        wp_die( get_sample_permalink_html( $ID, $title, NULL ) );

    }

    public function admin_footer(){

        global $post, $wp_query, $pagenow;
                
        // Páginas permitidas
        $edit_pages = array( 'post-new.php', 'post.php' );
        if( !in_array( $pagenow, $edit_pages ) ):
            return;
        endif;

        // Só analisa quando necessário
        if( $this->checkterm !== true ):
            return;
        endif;
       
        $reponse = array(
            'taxonomy' => $this->post_taxonomy,
            'term' => $this->post_term,
            'post' => $post
        );
        
        echo '<script type="text/javascript">Piki.post_type_link = '. json_encode( $reponse ) .';</script>';
        echo '<script type="text/javascript" src="'. Piki::url( 'scripts.js', __FILE__ ) . '"></script>';
    }

}
$Slugs = new Slugs();

add_filter( 'post_type_link', array( $Slugs, 'post_link' ), 1, 3 );
add_action( 'parse_request', array( $Slugs, 'parse_request' ) );
add_action( 'parse_query', array( $Slugs, 'parse_query' ) );
add_action( 'admin_footer', array( $Slugs, 'admin_footer' ) );
add_action( 'wp_ajax_ptl_choose_term', array( 'Slugs', 'link_choose_term' ) );


// Pattern na URL
//preg_match_all( '/\[[\w_-]*\]/', $post_link, $matches );
//$rpcts = array_shift( $matches );
?>
