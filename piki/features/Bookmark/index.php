<?php
// Nome do cookie usado na minha virada
define( 'BOOKMARK_COOKIE_POSTS', 'bookmark_posts' );
// Nome do cookie usado na minha virada
define( 'BOOKMARK_COOKIE_UCODE', 'bookmark_user_code' );
// Campo de eventos
define( 'BOOKMARK_TABLE', 'bookmark' );
// Campo de contagem dos likes
define( 'BOOKMARK_META_KEY', '_bokmark_score' );

class Bookmark {

    var $user_code;
    var $user_id;
    var $post_id;
    var $context;

    public function __construct(){

        // User ID
        $this->user_id = intVal( get_current_user_id() );
        
        // User ID
        $this->user_code = Bookmark::getUserCode();
        
        // Post ID
        $this->post_id = _post( 'post_id' );
        
        // Context
        $this->context = _post( 'context', '' );

        // Marca e desmarca o like de um evento
        //add_action( 'wp_ajax_nopriv_bookmark_toggle', [ $Bookmark, 'toggle' ] );
        add_action( 'wp_ajax_bookmark_toggle', [ $this, 'toggle' ] );

        // Inserindo bookmarks gravados por cookie na base
        add_action( 'user_register', [ $this, 'useRegister' ], 10, 1 );

        // Ajax liked
        add_action( 'wp_ajax_nopriv_bookmark_check', [ $this, 'bookmarked' ] );
        add_action( 'wp_ajax_bookmark_check', [ $this, 'bookmarked' ] );

        // Recupera os likes do usuário
        add_action( 'wp_ajax_nopriv_bookmark_get_likes', [ 'Bookmark', 'getBookmarks' ] );
        add_action( 'wp_ajax_bookmark_get_likes', [ 'Bookmark', 'getBookmarks' ] );

        // Button
        add_shortcode( 'bookmark', [ 'Bookmark', 'shortcode' ] );
        add_shortcode( 'bookmark_widget', [ 'Bookmark', 'shortcode_widget' ] );
    
        // URL's
        add_filter( 'query_vars', [ $this, 'queryVars' ] );
        add_action( 'generate_rewrite_rules', [ $this, 'rewriteRules' ] );
        add_action( 'template_redirect', [ $this, 'redirectIntercept' ] );

    }

    // Initing plugin
    public static function init(){
        // Instancia a classe
        $Bookmark = new Bookmark();
    }
    
    // Create rewrite rules
    public function rewriteRules() {
        global $wp_rewrite;
        $new_rules[ 'favoritos' ] = 'index.php?bookmarks=true';
        $new_rules[ 'bookmark' ] = 'index.php?bookmarks=true';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    }

    // Adiciona variaveis de busca
    public function queryVars( $qvars ) {
        $qvars[] = 'favoritos';
        $qvars[] = 'bookmark';
        $qvars[] = 'bookmarks';
        return $qvars;
    }

    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public function redirectIntercept(){
       
        global $wp_query;

        // Página
        if( $wp_query->get( 'bookmarks' ) == 'true' ):

            // Redireciona
            if( !is_user_logged_in() ):
                wp_redirect( get_site_url() ); 
                exit;
            endif;

            $return = new stdClass();
            
            // Likes
            $likes = $this->getUserLikesData();
            if( !empty( $likes ) ):

                // Normalize and Distribute
                $return->pages = [];
                foreach( $likes as $kl => &$like ):

                    // Title
                    $like->title = !empty( $like->title ) ? $like->title : $like->post_title;
                    
                    // URL
                    $like->url = Bookmark::getLikeURL( $like );

                    // Media ( Image or clip )
                    $like->media = false;
                    if( !empty( $like->image ) ):
                        $like->media = imagewp::render_value( $like->image, [ 'unserialize' => true ] );
                    elseif( !empty( $like->clip ) ):
                        $like->clip = unserialize( $like->clip );
                    endif;

                    // Pages
                    if( empty( $like->context ) && !empty( $like->media ) ):
                        $return->pages[] = $like;
                        unset( $likes[ $kl ] );
                    endif;
                
                endforeach;

                // Contents
                $return->contents = empty( $likes ) ? false : $likes;

            endif;
            
            Piki::search_template( 
                'page', 
                'bookmarks', 
                dirname( __FILE__ ),
                true,
                $return
            );

       endif;
    
    }

    public static function getLikeURL( $like ){

        if( empty( $like->context ) ):

            $url = get_permalink( $like->ID );

        else:

            if( intVal( $like->context ) > 0 ):

                $post_context = get_post( $like->context );
                $url = get_permalink( $like->context ) . '#' . $like->post_name;

            else:

                $url = get_permalink( $like->ID ) . '#' . $like->context;

            endif;

        endif;
        
        return $url;

    }

    // Recupera os likes do usuário
    public function getUserLikesData( $user_ID = NULL ){

        global $wpdb;
        
        if( !$user_ID ) $user_ID = get_current_user_id();

        $table = $wpdb->prefix . BOOKMARK_TABLE;
        $query = $wpdb->prepare(
            "
            SELECT 
                BO.id as bookmark_id,
                BO.post_id,
                BO.context,
                BO.title,
                PO.ID,
                PO.post_type,
                PO.post_title,
                PO.post_name,
                PO.post_parent,
                IM.meta_value as image,
                CL.meta_value as clip
            FROM
                {$table} AS BO
                LEFT JOIN {$wpdb->posts} AS PO ON BO.post_id = PO.ID
                LEFT JOIN {$wpdb->postmeta} AS IM ON IM.post_id = BO.post_id AND IM.meta_key = 'cvr_image'
                LEFT JOIN {$wpdb->postmeta} AS CL ON CL.post_id = BO.post_id AND CL.meta_key = 'cvr_clip'
            WHERE
                BO.user_id = %d
            GROUP BY
                BO.id, 
                BO.post_id, 
                BO.context,
                BO.title,
                IM.meta_value, 
                CL.meta_value
            ORDER BY
                BO.context ASC,
                BO.id DESC
            ",
            $user_ID
        );
        $data = $wpdb->get_results( $query );

        return empty( $data ) ? false : $data;

    }

    public function toggle(){
        
        global $wpdb;

        if( empty( $this->post_id ) ):
            Piki::error( 'O ID do post não foi informado.' );
        endif;

        // If user liked this post
        $bookmarked = $this->bookmarked();

        // Adiciona nos favoritos
        if( !$bookmarked ):
            $this->doLike();
        // Remove dos favoritos
        else:
            $this->doUnlike();
        endif;

        // Get total score
        $total = $this->getTotalBookmarks();
        
        // Atribui o score ao post
        $this->actualizePostScore( $total );

        Piki::return_json(array(
            'status' => 'success',
            'bookmarked' => !$bookmarked,
            'total' => $total,
            'total_user' => Bookmark::getUserTotal(),
            'counter_label' => $this->getScoreLabel( $total )
        ));

    }

    // Verifica se o post já foi selecionado
    public function bookmarked(){
        
        global $wpdb;

        // Where 
        $where = "post_id = %d AND context = %s";
        $vals  = [ $this->post_id, $this->context ];

        if( !empty( $this->user_id ) ):
            $where .= " AND user_id = %d";
            $vals[] = $this->user_id;
        else:
            $where .= " AND user_code = %s";
            $vals[] = $this->user_code; 
        endif;

        // Query
        $query = $wpdb->prepare(
            "SELECT count(0) FROM {$wpdb->prefix}bookmark WHERE $where",
            $vals
        );
        $voted = $wpdb->get_var( $query );

        if( _post( 'single_check' ) ):

            $total = $this->getTotalBookmarks();
        
            Piki::return_json(array(
                'status' => 'success',
                'bookmarked' => !empty( $voted ),
                'total' => $total,
                'counter_label' => Bookmark::getScoreLabel( $total )
            ));
        
        else:
        
            return !empty( $voted );
        
        endif;
    
    }

    private function doLike(){
        
        global $wpdb;

        $values = [
            'post_id' => $this->post_id,
            'context' => $this->context,
            'user_code' => $this->user_code,
        ];
        $rpcs = [
            '%d',
            '%s',
            '%s' 
        ];

        // Title
        $title = _post( 'title' );
        if( $title ):
            $values[ 'title' ] = $title;
            $rpcs[] = '%s';
        endif;

        // User id
        if( $this->user_id ):
            $values[ 'user_id' ] = $this->user_id;
            $rpcs[] = '%d';
        endif;

        return $wpdb->insert(
            $wpdb->prefix . BOOKMARK_TABLE,
            $values, 
            $rpcs 
        );

    }

    private function doUnlike(){

        global $wpdb;

        $where = array(
            'post_id' => $this->post_id
        );
        $rpcs = array(
            '%d'
        );

        if( !empty( $this->user_id ) ):
            $where[ 'user_id' ] = $this->user_id;
            $rpcs[] = '%d';
        else:
            $where[ 'user_code' ] = $this->user_code;
            $rpcs[] = '%s';
        endif;

        return $wpdb->delete( 
            $wpdb->prefix . BOOKMARK_TABLE,
            $where,
            $rpcs
        );

    }

    public static function shortcode_widget( $atts ){

        // Opções
        $defaults = array(
            'slug' => 'favoritos'
        );
        $options = shortcode_atts( $defaults, $atts );
        $options = array_merge( $defaults, $options );
       
        // Styles and scripts
        Bookmark::add_files();
        
        return '<div class="bookmark-widget" data-label-sing="Fornecedor favorita" data-label-plural="Fornecedores favoritas">
            <a href="'. get_site_url( null, $options[ 'slug' ] ) .'" title="Fornecedores favoritas" style="display:none;"><strong></strong><em></em></a>
        </div>';
    
    }

    public static function shortcode( $atts ){

        global $wpdb;

        // Opções
        $defaults = [
            'label' => 'Adicionar <br>ao favoritos',
            'label_remove' => 'Remover <br>do favoritos',
            'counter' => true,
            'context' => false,
            'title' => false,
            'id' => false,
            'is_single' => false
        ];
        $options = shortcode_atts( $defaults, $atts );
        $options = array_merge( $defaults, $options );

        // Post id
        if( empty( $options[ 'id' ] ) ):
            $options[ 'id' ] = get_the_ID();
        endif;
        if( empty( $options[ 'id' ] ) ):
            return '';
        endif;

        // HTML
        $html = '<div class="bookmark-box '. ( $options[ 'is_single' ] ? 'single' : 'compact' ) .'" data-post-id="'. $options[ 'id' ] .'" data-context="' . ( empty( $options[ 'context' ] ) ? '' : $options[ 'context' ] ) . '" data-title="'. _array_get( $options, 'title', '' ) .'">
            <button type="button" class="bookmark loading" data-remove-label="'. $options[ 'label_remove' ] .'" data-add-label="'. $options[ 'label' ] .'" rel="' . $options[ 'id' ] .'" title="' . strip_tags( $options[ 'label' ] ) . '">
                <strong class="label">' . $options[ 'label' ] . '</strong>
                <span></span>
                <span></span>
                <span></span>
            </button>';

        if( $options[ 'counter' ] !== 'false' ):

            // Get total likes
            $total = $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(0) FROM {$wpdb->prefix}bookmark WHERE post_id = %d",
                $options[ 'id' ]
            ));

            // Write counter
            $html .= '<em class="score">' . Bookmark::getScoreLabel( $total ) . '</em>';

        endif;

        $html .= '</div>';
        
        // Styles and scripts
        Bookmark::add_files();

        return $html;

    }

    // Score label
    public static function getScoreLabel( $total ){
       
        if( !empty( $total ) ):

            if( $total > 1 ):
                return sprintf( '<strong>%s</strong> <span>pessoas já favoritaram</span>', $total );
            else:
                return '<strong>1</strong> <span>pessoa já favoritou</span>';
            endif;

        endif;

        return false;

    }

    public static function currentOwner(){

        global $wp_query;
   
        $nicename = $wp_query->get( 'nicename' );
        if( !empty( $nicename ) ):
            $usuario = get_user_by( 'slug', $wp_query->get( 'nicename' ) );
        else:
            $usuario = get_user_by( 'id', get_current_user_id() );
        endif;
   
        return $usuario;
    }

    // User code
    public static function getUserCode(){

        // Existent key
        $user_code = _getcookie( BOOKMARK_COOKIE_UCODE );
        if( !empty( $user_code ) ) return $user_code;

        $user_code = md5( uniqid( rand(), true ) );

        _setcookie( BOOKMARK_COOKIE_UCODE, $user_code );

        return $user_code;

    }

    // Get total post Bookmarks
    public function getTotalBookmarks(){
        global $wpdb;
        $result = $wpdb->get_var($wpdb->prepare(
            "SELECT count(0) FROM {$wpdb->prefix}bookmark WHERE post_id = %d",
            $this->post_id
        ));
        return intVal( $result );
    }

    // Atualiza a quantidade de likes de um post
    private function actualizePostScore( $total ){
        update_post_meta( $post_ID, BOOKMARK_META_KEY, $total );
   }

    // Recupera os likes do usuário
    public static function getBookmarks(){
        $likes = self::get_user_likes();
        Piki::return_json( $likes );
    }

    // Recupera o total de curtidas do usuário
    public static function getUserTotal( $user_ID = NULL ){
        
        global $wpdb;
        
        // Se não está logado
        if( is_null( $user_ID ) && is_user_logged_in() ):
            $user_ID = get_current_user_id();
        endif;
        
        // Usuários logados
        if( !empty( $user_ID ) ):
            $where = " user_id = %d";
            $ukey = $user_ID;
        else:
            $where = " user_code = %s";
            $ukey = _getcookie( BOOKMARK_COOKIE_UCODE );
        endif;

        $table = $wpdb->prefix . BOOKMARK_TABLE;
        $total = $wpdb->get_var($wpdb->prepare("
            SELECT count(0) 
            FROM $table B 
            LEFT JOIN $wpdb->posts P ON P.ID = B.post_id 
            WHERE 
            $where 
            AND 
            P.post_status = 'publish' 
            AND 
            P.ID IS NOT NULL",
            $ukey
        ));

        return intVal( $total );
        
    }

    // Recupera os likes do usuário
    public static function get_user_likes( $user_ID = NULL ){
        
        global $wpdb;

        $table = $wpdb->prefix . BOOKMARK_TABLE;
        
        // Se não está logado
        if( is_null( $user_ID ) && is_user_logged_in() ):
            $user_ID = get_current_user_id();
        endif;
        
        // Usuários logados
        if( !empty( $user_ID ) ):
            $where = " user_id = %d";
            $ukey = $user_ID;
        else:
            $where = " user_code = %s";
            $ukey = _getcookie( BOOKMARK_COOKIE_UCODE );
        endif;

        $items_query = $wpdb->prepare(
            "SELECT
                B.id AS bookmark_id,
                B.context,
                B.title,
                B.post_id,
                P.post_status 
            FROM 
                $table B 
            LEFT JOIN $wpdb->posts P ON P.ID = B.post_id WHERE 
            $where",
            $ukey
        );        
        $items = $wpdb->get_results( $items_query );

        // No bookmarks
        if( empty( $items ) ) return 0;

        $return = [];
        $toRemove = [ $ukey ];
        foreach( $items as $item ):

            if( empty( $item->post_id ) ):
            
                $toRemove[] = $item->post_id;
            
            elseif( $item->post_status == 'publish' ):
            
                $return[] = [
                    'post_id' => $item->post_id,
                    'context' => ( intVal( $item->context ) > 0 ? intVal( $item->context ) : $item->context ),
                    'title' => empty( $item->title ) ? false : $item->title,
                    'bookmark_id' => $item->bookmark_id,
                ];
            
            endif;
        
        endforeach;

        if( count( $toRemove ) > 1 ):
            
            $rpcs = array_fill( 0, ( count( $toRemove ) - 1 ), "%d" );
            $rpcs = implode( ',', $rpcs );

            $wpdb->query($wpdb->prepare(
                "DELETE FROM $table WHERE $where AND post_id IN($rpcs)",
                $toRemove
            ));

        endif;

        return empty( $return ) ? false : $return;
    
    }

    // Atribui o ID do usuário aos seus bookmarks criados com cookie
    public static function useRegister( $user_id ){
        $this->setBookmarksUserID( $user_id );
    }
    public static function useLogin( $user_login, $user ){
        $this->setBookmarksUserID( $user->ID );
    }

    public function setBookmarksUserID( $user_id ){

        global $wpdb;

        $wpdb->update( 
            $wpdb->prefix . BOOKMARK_TABLE, 
            array( 'user_id' => $user_id ), 
            array( 'user_code' => $this->user_code ), 
            array( '%d' ), 
            array( '%s' ) 
        );

    }

    public static function getBookmarkeds( $post_type = false, $total = 12 ){

        global $wp_query;

        $likes = Bookmark::get_user_likes();

        $paged = $wp_query->get( 'paged' );
        $search = new WP_Query(array(
            'post_type' => 'fornecedor',
            'post_status' => 'publish',
            'posts_per_page' => $total,
            'post__in' => array_column( $likes, 'post_id' ),
            'paged' => ( empty( $paged ) ? 1 : intVal( $paged ) )
        ));

        if( $search->have_posts() ):
            return $search;
        endif;

        return false;

    }

    public static function add_files(){
        // Scripts e estilos
        wp_enqueue_script( 'bookmark-scripts', Piki::url( 'scripts.js' , __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'bookmark-styles', Piki::url( 'styles.css' , __FILE__ ) );
    }

}

// Initing
add_action( 'init', array( 'Bookmark', 'init' ) );
