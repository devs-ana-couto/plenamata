<?php
/*
	Plugin Name: Piki
	Description: Suite de ferramentas e funcionalidades utilizadas para desenvolvimento
	Version: 0.1
	Author: Thiago Borges (Piki)
	Author URI: http://pikiweb.com.br
	Author Email: thiago@pikiweb.com.br
*/

// Require
require_once( __DIR__ . '/vendor/autoload.php' );

// Constants
if( !defined( 'USE_WEBP' ) ):
    define( 'USE_WEBP', false );
endif;

// Translation
add_action( 'plugins_loaded', 'piki_load_textdomain' );
function piki_load_textdomain() {
    load_plugin_textdomain( 'piki', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}

// Caminho para o arquivo de includes de features
define( 'PIKI_FEATURES_FILE', Piki::path( __FILE__, 'features.php' ) );

// Piki
class Piki {

    // Load features by database
    public static function loadFeatures(){

        // Database options
        $features_options = get_option( 'piki_features_options' );
        if( !empty( $features_options ) ):
            foreach( $features_options as $feature => $status ):
                if( $status == 'on' ):
                    require_once( Piki::path( __FILE__, 'features/'  . $feature . '/index.php' ) );
                endif;
            endforeach;
        endif;
        
    }

    public static function token( $lenght = 13 ){
        // uniqid gives 13 chars, but you could adjust it to your needs.
        if( function_exists( 'random_bytes' ) || function_exists( 'random_bytes' ) ):
        
            $bytes = function_exists( 'random_bytes' ) ? random_bytes( ceil( $lenght / 2 ) ) : openssl_random_pseudo_bytes( ceil( $lenght / 2 ) );
            return substr( bin2hex( $bytes ), 0, $lenght );
        
        else:
        
            $bytes = md5( uniqid( rand() ) );
            return substr( $bytes, 0, $lenght );
        
        endif;

    }

    // Redirecting
    public static function redirect( $url = false ){
        wp_redirect( !$url ? get_site_url() : $url );
        exit();
    }

    public static function fullURL(){
        return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }

    public static function æctualURL(){
        return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    }

    // Check if localhost
    public static function isDevServer(){
        if( strpos( $_SERVER[ 'HTTP_HOST' ], 'pikiweb' ) !== false ):
            return true;
        endif;
        return false;
    }

    // Dev email
    public static function devEmail(){
        return 'thiago.borges28@gmail.com';
    }

    // Get post by slug
    public static function get_post( $slug ){
        global $wpdb;
        $post = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $wpdb->posts WHERE post_name = %s AND post_type <> 'nav_menu_item'",
            $slug
        ));
        return empty( $post ) ? false : $post;
    }

    // Get post by slug
    public static function getPermalink( $slug ){
        $post = Piki::get_post( $slug );
        return empty( $post ) ? false : get_permalink( $post->ID );
    }

    // URL para sites multilínguas
    public static function permalang( $slug ){

        global $wpdb;

        // Default URL
        $URL = get_site_url( null, '/'. $slug .'/' );

        // Get post
        $post_ID = $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_status = 'publish'",
            $slug
        ));
        if( empty( $post_ID ) ) return $URL;

        // Translate funcions
        if( function_exists( 'pll_current_language' ) ):
            $lang = pll_current_language();
        elseif( has_filter( 'wpml_current_language' ) ):
            $lang = apply_filters( 'wpml_current_language', NULL );
        endif;

        // Just default language
        if( $lang == 'pt' || $lang == 'pt-br' ) return $URL;

        // Get translation post
        if( function_exists( 'pll_get_post' ) ):
            $transl_id = pll_get_post( $post_ID, $lang );
        elseif( has_filter( 'wpml_object_id' ) ):
            $transl_id = apply_filters( 'wpml_object_id', $post_ID, 'post', false, $lang );
        endif;
 
        return get_permalink( empty( $transl_id ) ? $post_ID : $transl_id );
    
    }

    public static function init(){

        if( isset( $_GET[ 'piki-empty-cache' ] ) ):
            self::cache_clear();
        endif;
  
        if( !is_admin() ):
            show_admin_bar( false );
        endif;

        Piki::add_library( 'jquery-ui' );

    }

    public static function thumbnail( $postID, $width, $height=null, $zc=1 ){
        $image_url = wp_get_attachment_image_src( get_post_thumbnail_id( $postID ), 'full' );
        if ( !$image_url ):
            return false;       
        endif;
        return self::image_resize( $width, $height, $image_url[0], $zc );
    }
    public static function image_resize( $width, $height, $img_url, $zc=1 ){
        $quality = 100;
        $url = get_template_directory_uri();
        $sizes = '';
        if( $width !== 0 || $height === 0 ):
          $sizes .= '&w='.$width;
        endif;
        if( $height !== 0 ):
          $sizes .= '&h='.$height;
        endif;
        $img_url = $url.'/timthumb.php?src='.$img_url.$sizes.'&zc='.$zc.'&q='.$quality;
        return urldecode($img_url);
    }

    public static function get_post_image( $postID, $width, $height, $render = false, $rel = false ){

        $image_id = get_post_thumbnail_id( $postID );

        if( empty( $image_id ) ):
          return false;
        endif;

        $image = get_post( $image_id );
        if ( !is_object( $image ) ):
            return false;        
        endif;
        $url_image = self::image_resize( $width, $height, $image->guid );
        if ( !$render ):
            return array(
                'url' => $url_image,
                'title' => $image->post_title,
                'caption' => $image->post_excerpt,
            );
        else:
            return '<a href="'.$image->guid.'"'.(!$rel?'':' rel="'.$rel.'[]"').'><img src="'.$url_image.'" alt="'.$image->post_title.'" /></a>';     
        endif;
    }

    public static function get_cover( $postID = false, $size = 'full' ){
        
        if( !$postID ) $postID = get_the_ID();
        
        $image_url = wp_get_attachment_image_src( get_post_thumbnail_id( $postID ), $size );
        if( !$image_url ) return false;
        
        return $image_url[ 0 ];
    
    }

    public static function getAttachURL( $id ){
      $image_url = wp_get_attachment_image_src( $id );
      return $image_url[ 0 ];
    }

    public static function post_images( $ID=false ){
        $attachments = get_posts([
            'post_type' => 'attachment',
            'posts_per_page' => -1,
            'post_parent' => !$ID ? get_the_ID() : $ID,
            'post_mime_type' => 'image',
        ]);
        if( !$attachments ) return false;
        return $attachments;
    }

    public static function attach_src( $attach_id, $width, $height=0 ){
        $image_data = wp_get_attachment_image_src( $attach_id, 'full' );
        return self::image_resize( $width, $height, $image_data[ 0 ] );
    }

    public static function get_attach_url( $postID, $meta_key, $size=full ){
      $meta = get_post_meta( $postID, $meta_key, true );
      $image_url = wp_get_attachment_image_src( $meta, $size );
      return $image_url[ 0 ];
    }

    public static function get_alphabetic_indice(){
      $letters = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
      $html = '<ul class="alpha-indice clearfix">';
      foreach ( $letters as $key => $letter ) {
        $html .= '<li><a href="#'.$letter.'" rel="'.$letter.'">'.$letter.'</a></li>';
      }
      $html .= '</ul>';
      return $html;
    }

    // Pages menu tree
    public static function get_menu_pages_tree( $parent ){
        $linkpre = $parent->post_content != '' ? '<a href="'. get_permalink( $parent->ID ) .'">' : '';
        $linkpos = $parent->post_content != '' ? '</a>' : '';
        return '<h2 class="ui-state-active">' . $linkpre . $parent->post_title . $linkpos . '</h2><ul>' . wp_list_pages([
            'child_of'    =>  $parent->ID,
            'depth'       =>  1,
            'sort_column' => 'menu_order',
            'echo'        =>  false,
            'title_li'    =>  '',
            'link_before' => '<span class="ico"></span>',
        ]) . '</ul>';
    }

    // Retorna um array como json
    public static function return_json( $array ){
        header('HTTP/1.1 200 OK');
        header( 'Content-type: application/json; charset=utf-8' );
        echo json_encode( $array );
        die();
    }

    // Return rest
    public static function returnRest( $object ){
        $response = new WP_REST_Response( $object );
        $response->set_status( 200 );
        return $response;

    }

    // Erro em json
    public static function error( $error_message = false, $error_type = false, $force_ajax = false ){
        if( $force_ajax || self::ajax() ):
            self::return_json(array( 
                'status' => 'error',
                'error_type' => $error_type,
                'error_message' => $error_message,
            ));
        else:
            $error = '<strong>ERROR</strong>';
            if ( $error_type ):
                $error .= '<br />Type: ' . $error_type;
            endif;
            if ( $error_message ):
                $error .= '<br />Message: ' . $error_message;
            endif;
            wp_die( __( $error, 'piki' ) );
        endif;
    }

    // Erro em json
    public static function success( $message = false, $redirect = false, $force_ajax = false, $extras = false ){
        if( $force_ajax || self::ajax() ):
            if( is_array( $message ) ):
                $message[ 'status' ] = 'success';
                self::return_json( $message );
            else:
                self::return_json(array( 
                    'status' => 'success',
                    'message' => $message,
                    'redirect' => $redirect,
                ));
            endif;
        else:
            $text = '<strong>SUCCESS</strong>';
            if ( $message ):
                $text .= '<br />' . $message;
            endif;
            if ( $redirect ):
                $text .= '<a href="'.$redirect.'">'.$redirect.'</a>';
            endif;
            wp_die( __( $text, 'piki' ) );
        endif;
    }

    public static function set404(){
        
        global $wp_query;
        if( $wp_query ):
            $wp_query->is_home = false;
        endif;

        status_header( 404 );
        nocache_headers();
        include( get_query_template( '404' ) );
        die();

    }

    public static function minified( $path, $script = false ){
        $origin = Piki::url( $path, $script );
        $urlmin = str_replace( '.js', '.min.js', $origin );
        $minpath = Piki::url_to_path( $urlmin );
        return file_exists( $minpath ) ? $urlmin : $origin;
    }

    // Javascripts
    public static function add_scripts(){
        self::add_library( 'loader-mask' );
        wp_enqueue_script( 'piki-scripts', Piki::minified( '/piki.js' ), array( 'jquery' ), false, true );
        wp_enqueue_style( 'piki-styles', Piki::url( '/piki.css' ) );
    }
    
    // Javascript do header
    public static function head_configs(){

        // Site url
        if( has_filter( 'wpml_home_url' ) ):
            $siteurl = apply_filters( 'wpml_home_url', get_option( 'home' ) );
        else:
            $siteurl = get_site_url();
        endif;

        // Baseurl
        $baseurl = rtrim( $siteurl, '/' ) . substr( __DIR__, strpos( __DIR__, '/wp-content' ) );

        echo '<script type="text/javascript" data-cfasync="false">Piki={ baseurl : "' . $baseurl . '", blogurl : "'. $siteurl .'", themeurl : "'. get_template_directory_uri() .'", pluginsurl : "'. plugins_url() .'", ajaxurl : "'. get_site_url( null, '/wp-admin/admin-ajax.php' ) . '", is_admin : '. ( is_admin() ? 'true' : 'false' ) .' };</script>';
    
    }

    // Slug #home// para ítems do menu
    public static function nav_menu_items( $items ) {
        $items = str_replace( '#home#', get_bloginfo( 'url' ), $items );
        return $items;
    }

    // Adiciona arquivos de uma library
    public static function add_library( $lib, $add_files = false ){

        if( is_array( $lib ) ):

            $dirname = trim( $lib[ 0 ] );
            $filename = trim( $lib[ 1 ] );
        else:

            $dirname = trim( $lib );
            $filename = trim( $lib );
        
        endif;
        $lib_dir = Piki::path( __FILE__, 'libraries/' . $dirname . '/' );
        // Se a library existe
        if( !is_dir( $lib_dir ) ):
            return false;
        endif;

        // URL dos arquivos
        $lib_url = Piki::url( 'libraries/' . $dirname . '/' );
                
        // Javascript
        if( !WP_DEBUG === TRUE && file_exists( $lib_dir . $filename . '.min.js' ) ):
            $toinclude = $lib_url . $filename . '.min.js';
        else:
            $toinclude = $lib_url . $filename . '.js';
        endif;
        wp_enqueue_script( $filename . '-script', $toinclude, array( 'jquery' ), false, true );
        
        // Styles
        if( file_exists( $lib_dir . $filename . '.css' ) ):
            wp_enqueue_style( $filename . '-style', $lib_url . $filename . '.css' );
        endif;
        
        // Arquivos adicionais
        if( is_array( $add_files ) && !empty( $add_files ) ):

            foreach( $add_files as $key => $filename ):
            
                $extension = pathinfo( $filename, PATHINFO_EXTENSION );
                $filename = pathinfo( $filename, PATHINFO_FILENAME );
                $add_url = $lib_url . $filename;
            
                if( $extension == 'js' ):
                    if( is_file( $add_url . '-min.js' ) ):
                        $add_url .= '-min';
                    endif;
                    wp_enqueue_script( $filename . '-scripts', $add_url . '.js', array( 'jquery' ) );
                else:
                    wp_enqueue_style( $filename . '-styles', $add_url . '.css' );
                endif;
            
            endforeach;
        
        endif;

    }

    public static function slug( $string, $length = -1, $separator = '_' ) {

        if( empty( $length ) ):
            $length = -1;
        endif;
        
        // transliterate
        $string = transliterate( $string );
        
        // replace non alphanumeric and non underscore charachters by separator
        $string = preg_replace('/[^a-z0-9]/i', $separator, $string );
        
        // replace multiple occurences of separator by one instance
        $string = preg_replace( '/' . preg_quote( $separator ) .'['. preg_quote($separator) .']*/', $separator, $string );

        // cut off to maximum length
        if ( $length > -1 && strlen( $string ) > $length ):
            $string = substr( $string, 0, $length );
        endif;
        
        // remove separator from start and end of string
        $string = preg_replace( '/' . preg_quote( $separator ) . '$/', '', $string );
        $string = preg_replace( '/^' . preg_quote( $separator ) . '/', '', $string );

        return $string;
    
    }

    public static function slugKeys( &$string, $key ){
        $string = Piki::slug( $string, -1, '_' );
    }

    public static function ajax(){
      return isset( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] === 'XMLHttpRequest';
    }

    public static function isRest(){
        return defined( 'REST_REQUEST' ) && REST_REQUEST == true;
    }

    public static function isRealAdmin(){

        // WP admin test
        if( !is_admin() ) return false;

        // If is admin ajax, check if referrer is admin
        $script_name = _array_get( $_SERVER, 'SCRIPT_NAME' );
        $is_wp_ajax = strpos( $script_name, '/wp-admin/admin-ajax.php' ) !== false;
        $http_referrer = _array_get( $_SERVER, 'HTTP_REFERER' );
        $is_admin_referer = strpos( $http_referrer, '/wp-admin' ) !== false;
        
        // Not admin referrer
        if( $is_wp_ajax && !$is_admin_referer ) return false;

        // Is real admin submission
        return true;

    }

    // Force http://
    public static function http( $link ){
        $scheme = check_https() ? 'https' : 'http';
        if( strpos( $link, $scheme . '://' ) !== 0 ):
            $link = $scheme . '://' . $link;
        endif;
        return $link;
    }

    public static function search_template( $basename, $subname = false, $plugin_uri, $exit = true, $args = [] ){
        
        // URI do tema atual
        $theme_uri = get_template_directory() . '/';
        
        // URI da pasta de templates do plugin
        $plugin_uri = rtrim( $plugin_uri, '/' ) . '/templates/';
        
        // Nome do arquivo
        $name_file = $basename . '.php';

        // Nome mais profundo do arquivo
        if( $subname ):
            $subname_file = $basename . '-' . $subname . '.php';
        endif;

        // Busca o template com a extensão na pasta do tema
        if( $subname && is_file( $theme_uri . $subname_file ) ):
            
            load_template( $theme_uri . $subname_file, true, $args );
            if( $exit ): exit(); endif;
        
        // Busca o template genérico na pasta do tema
        elseif( is_file( $theme_uri . $name_file ) ):
            
            load_template( $theme_uri . $name_file, true, $args );
            if( $exit ): exit(); endif;
        
        // Busca o template com a extensção na pasta do plugin
        elseif( $subname && is_file( $plugin_uri . $subname_file ) ):
            
            load_template( $plugin_uri . $subname_file, true, $args );
            if( $exit ): exit(); endif;
        
        // Busca o template com a extensção na pasta do plugin
        else:
            
            load_template( $plugin_uri . $name_file, true, $args );
            if( $exit ): exit(); endif;
        
        endif;

    }

    public static function check_http_method( $method, $die=true ){
        if ( strtoupper( $method ) != strtoupper( $_SERVER[ 'REQUEST_METHOD' ] ) ) {
            if( !$die ):
                return false;
            else:
                wp_die( __( 'O método usado não é permitido neste caso', 'piki' ) );
            endif;
        }
        return true;
    }

    public static function plural( $total, $sing, $plural, $vazio = 'Nenhum ítem encontrado' ){
        // Valor inteiro
        $total = intVal( $total );
        // Vazio
        if( empty( $total ) ) return $vazio;
        // Plural
        return printf( __( ( $total > 1 ? $plural : $sing ), 'piki' ), $total );
    }

    public static function get_url_var( $url, $var ){
        $my_array_of_vars = array();
        parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
        if( isset( $my_array_of_vars[ $var ] ) ):
            return $my_array_of_vars[ $var ];
        else:
            return false;
        endif;
    }

    public static function trim( $text, $length = 55, $type = 'words', $rets = true ){
        
        $no_shortcodes = preg_replace( '|\[(.+?)\](.+?\[/\\1\])?|s', '', $text );
        $no_tags = wp_strip_all_tags( $text );
        
        if( $type == 'chars' ):
        
            if( strlen( $text ) <= $length ):
                return $text;
            endif;
        
            $striped = substr( $text, 0, $length );
            $striped = explode( ' ', $striped );
            array_pop( $striped );

        else:
        
            $words = explode( ' ', $text );
            if( count( $words ) <= $length ) return $text;
            $striped = array_slice( $words, 0, $length );
            
        endif;

        $text = implode( ' ', $striped ) . '{';
        $text = trim( $text, ',!?:/\\[]{}()-_@#$%&*+-=' );
        $text = trim( $text );

        return $text . ( $rets ? '...' : '' );
    }

    public static function last_comment_date( $post_id=false, $format=false ){
        global $wpdb;
        if( !$post_id ):
            $post_id = get_the_ID();
        endif;
        $date = $wpdb->get_var($wpdb->prepare("SELECT comment_date FROM $wpdb->comments WHERE comment_post_ID = %d ORDER BY comment_date DESC LIMIT 1", $post_id));
        return date_i18n( 'd M Y', strtotime( $date ) );
    }

    public static function url_to_path( $url ){
        $relative = ltrim( wp_make_link_relative( $url ), '/' );    
        if( ( $wpcontent = strpos( $relative, 'wp-content' ) ) !== 0 ):
            $relative = substr( $relative, $wpcontent );
        endif;
        return rtrim( ABSPATH, '/' ) . '/' . $relative;
        //$this->directory = rtrim( dirname( $this->realpath ), '/' );
    }

    public static function asu( $default, $cleaned ){
        // URL do site
        $baseurl = get_bloginfo( 'url' );
        // URL
        if( get_option( 'permalink_structure' ) == '' ):
            return $baseurl . $default;
        else:
            return $baseurl . $cleaned;
        endif;
    }

    public static function ago( $time=false ){

        if( !$time ):
            $time = get_the_time( 'U', true );
        endif;
       
        $periods = [ 'segundo', 'minuto', 'hora', 'dia', 'semana', 'mês', 'ano', 'década' ];
        $lengths = [ '60', '60', '24', '7', '4.35', '12', '10' ];

        $now = time();

        $difference  = $now - $time;
        $tense       = 'atrás';

        for( $j = 0; $difference >= $lengths[$j] && $j < count( $lengths ) -1; $j++ ):
            $difference /= $lengths[$j];
        endfor;

        $difference = round($difference);

        if( $difference != 1 ):
            $periods[ $j ] .= 's';
        endif;

        return "$difference $periods[$j] atrás ";
    
    }

    public static function post_type(){

        static $post_types, $labels = '';
        empty( $post_types ) AND $post_types = get_post_types( 
            array( 
                'show_in_menu' => true,
                '_builtin'     => false,
            ),
            'objects'
        );
        empty( $labels ) AND $labels = wp_list_pluck( $post_types, 'labels' );
        $names = wp_list_pluck( $labels, 'singular_name' );
        $names[ 'page' ] = 'Página';
        $name = $names[ get_post_type() ];
        return $name;
    
    }

    public static function wp_head(){

        global $post;
        
        if( is_admin() ) return;

        $ogdata = new stdClass(); 

        if( is_front_page() || empty( $post ) ):

            $ogdata->title = false;
            $ogdata->description = false;
            $ogdata->image = false;
            $ogdata->url = rtrim( get_site_url(), '/' );

        else:

            // Meta
            $meta = new PostMeta( $post );

            // Title
            $ogdata->title = $post->post_title;

            // Description
            if( $meta->exists( 'excerpt' ) && !$meta->empty( 'excerpt' ) ):
                $ogdata->description = $meta->render( 'excerpt', [ 'strip' => true ] );
            endif;
            if( empty( $ogdata->description ) && $meta->exists( 'chamada' ) && !$meta->empty( 'chamada' ) ):
                $ogdata->description = $meta->render( 'chamada', [ 'strip' => true ] );
            endif;
            if( empty( $ogdata->description ) && $meta->exists( 'body' ) && !$meta->empty( 'body' ) ):
                $ogdata->description = $meta->render( 'body', [ 'strip' => true, 'trim' => '55' ] );
            endif;
            if( empty( $ogdata->description ) ):
                // Excerpt
                $ogdata->description = get_post_meta( $post->ID, 'post_excerpt', true );
                // Body
                if( $ogdata->description == '' ):
                    $ogdata->description = $post->post_content;
                endif;
            endif;
            // Normalize
            if( !empty( $ogdata->description ) ):
                $ogdata->description = Piki::trim( 
                    strip_tags( strip_shortcodes( $ogdata->description ) ), 
                    300, 
                    'chars' 
                );
            endif;
            
            // Image
            if( $meta->exists( 'cover' ) && !$meta->empty( 'cover' ) ):

                if( $meta->is_fieldset( 'cover' ) ):
                    $cover = $meta->getFirst( 'cover' );
                    $ogdata->image = $cover->cover_image->render([ 'urls' => true ]);
                else:
                    $ogdata->image = $meta->render( 'cover', [ 'urls' => true ] );
                endif;

            elseif( $meta->exists( 'destaque_image' ) ):
                $ogdata->image = $meta->render( 'destaque_image', [ 'urls' => true ] );
            else:
                $ogdata->image = Piki::get_cover( $post->ID );
            endif;
            
            $ogdata->url = rtrim( get_permalink( $post->ID ), '/' );
        
        endif;

        // Imagem padrão
        if( empty( $ogdata->image ) ):
            $ogdata->image = get_site_url() . '/open-graph.png';
        endif;

        if( empty( $ogdata->title ) ):
            $ogdata->title = get_bloginfo( 'name' );
        endif;

        if( empty( $ogdata->description ) ):
            $ogdata->description = get_bloginfo( 'description' );
        endif;
        
        // Filter
        $ogdata = apply_filters( 'piki_graph_tags', $ogdata, $post );
        
        // Open Graph Tags
        echo '<link rel="canonical" href="' . $ogdata->url . '">
        <meta name="description" content="'. $ogdata->description .'">
        <meta property="og:locale" content="pt_BR">
        <meta property="og:type" content="article">
        <meta property="og:title" content="' . $ogdata->title . '">
        <meta property="og:description" content="' . $ogdata->description . '">
        <meta property="og:url" content="' . $ogdata->url . '/">
        <meta property="og:site_name" content="' . get_bloginfo( 'name' ) . '">
        <meta property="og:image" content="' . $ogdata->image . '">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="' . $ogdata->url . '/">
        <meta name="title:title" content="' . $ogdata->title . '">
        <meta name="twitter:description" content="' . $ogdata->description . '">
        <meta name="twitter:image" content="' . $ogdata->image . '">';
    
    }

    public static function cache_clear(){
        global $wpdb;
        $wpdb->query( "DELETE FROM $wpdb->options WHERE option_name LIKE 'piki_cache_%'" );
        $wpdb->query( "DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_%'" );
        $wpdb->query( "DELETE FROM $wpdb->options WHERE option_name LIKE '_site_transient_%'" );
    }

    public static function cache_key( $key ){
        global $post;
        if( !$key ):
            $page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
            return 'piki_cache_' . md5( $post->ID . '_page' . $page . '_' . $_SERVER['QUERY_STRING'] );
        else:
            return 'piki_cache_' . md5( $key );
        endif;
    }

    public static function cache_start( $key ){

        global $post;

        $cache_key = self::cache_key( $key );

        $cache_time = (int)get_option( $cache_key );
        
        $expires = $cache_time + ( 30 * MINUTE_IN_SECONDS );
        
        if( time() > $expires ):
            define( $cache_key . '_STARTED', true );
            ob_start();
            return false;
        else:
            $cache_dir = get_template_directory() . '/cache/piki';
            require_once( $cache_dir . '/' . $cache_key . '.html' );
            return true;
        endif;
    }

    public static function cache_end( $key ){
        
        global $post;

        $cache_key = self::cache_key( $key );

        // Cria o cache
        if( defined( $cache_key . '_STARTED' ) ):
            $content = ob_get_contents();
            ob_clean();
            $cache_dir = get_template_directory() . '/cache/piki';
            $pathfile = $cache_dir . '/' . $cache_key . '.html';
            // Escreve o arquivo
            if( file_exists( $pathfile ) ):
                try { unlink( $pathfile ); } 
                catch ( Exception $e ) { Piki::error( $e->getMessage() ); }
            endif;
            file_put_contents( $pathfile, $content, FILE_TEXT );
            require_once( $pathfile );
            update_option( $cache_key, time() );
        endif;
    }

    public static function fix_autop( $content ) {
        $html = trim( $content );
        if ( $html === '' ):
            return '';  
        endif;
        $blocktags = 'address|article|aside|audio|blockquote|canvas|caption|center|col|del|dd|div|dl|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|header|hgroup|iframe|ins|li|nav|noframes|noscript|object|ol|output|pre|script|section|table|tbody|td|tfoot|thead|th|tr|ul|video';
        $html = preg_replace( '~<p>\s*<('.$blocktags.')\b~i', '<$1', $html );
        $html = preg_replace( '~</('.$blocktags.')>\s*</p>~i', '</$1>', $html );
        return $html;
    }

    public static function user_can( $post_type, $action = 'edit', $post_ID = FALSE ){
        
        // Post type object
        $ptype_object = get_post_type_object( $post_type );
        
        // check permissions
        if( empty( $post_ID ) ):
            return current_user_can( $action . '_' . $ptype_object->capability_type . 's' );
        else:
            return current_user_can( $action . '_' . $ptype_object->capability_type, $post_ID );
        endif;
    
    }

    // Function to get the client IP address
    public static function client_ip(){

        $ipaddress = '';
        
        if ( isset( $_SERVER[ 'HTTP_X_SUCURI_CLIENTIP' ] ) ):
            $ipaddress = $_SERVER[ 'HTTP_X_SUCURI_CLIENTIP' ];
        elseif ( isset( $_SERVER[ 'HTTP_CLIENT_IP' ] ) ):
            $ipaddress = $_SERVER[ 'HTTP_CLIENT_IP' ];
        elseif( isset( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] ) ):
            $ipaddress = $_SERVER[ 'HTTP_X_FORWARDED_FOR' ];
        elseif( isset( $_SERVER[ 'HTTP_X_FORWARDED' ] ) ):
            $ipaddress = $_SERVER[ 'HTTP_X_FORWARDED' ];
        elseif( isset( $_SERVER[ 'HTTP_FORWARDED_FOR' ] ) ):
            $ipaddress = $_SERVER[ 'HTTP_FORWARDED_FOR' ];
        elseif( isset( $_SERVER[ 'HTTP_FORWARDED'] ) ):
            $ipaddress = $_SERVER[ 'HTTP_FORWARDED'];
        elseif( isset( $_SERVER[ 'REMOTE_ADDR' ] ) ):
            $ipaddress = $_SERVER[ 'REMOTE_ADDR' ];
        else:
            $ipaddress = 'UNKNOWN';
        endif;
        
        return $ipaddress;
    
    }

    public static function home_urls( $content ){
        return str_replace( '#home#', get_site_url(), $content );
    }

    public static function isDev(){
        return defined( 'WP_ENV' ) && WP_ENV === 'devel';
    }

    public static function actualURL(){
       return ( isset( $_SERVER[ 'HTTPS' ] ) && $_SERVER[ 'HTTPS' ] === 'on' ? 'https' : 'http' ) . '://' . $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ];
    }

    public static function preventScriptStop(){
        ini_set( 'memory_limit', '-1' );
        set_time_limit( 0 );
        ignore_user_abort( TRUE );
    }

    // Menu forms
    public static function termsByPostType( $taxonomy, $post_type ) {
        
        global $wpdb;
        
        $query = $wpdb->get_col($wpdb->prepare(
            "
                SELECT t.term_id from $wpdb->terms AS t 
                INNER JOIN $wpdb->term_taxonomy AS tt ON t.term_id = tt.term_id 
                INNER JOIN $wpdb->term_relationships AS r ON r.term_taxonomy_id = tt.term_taxonomy_id 
                INNER JOIN $wpdb->posts AS p ON p.ID = r.object_id
                WHERE 
                    p.post_type = %s AND 
                    tt.taxonomy  = %s
                GROUP BY t.term_id
            ",
            array(
                $taxonomy,
                $post_type
            )
        ));
        
        return $query;
    
    }

    public static function createPath( $path ){
        
        if( is_dir( $path ) ) return true;

        $prev_path = substr( $path, 0, strrpos( $path, '/', -2 ) + 1 );
        $return = createPath( $prev_path );
        
        return( $return && is_writable( $prev_path ) ) ? mkdir( $path, 0755, true ) : false;
        
    }

    // Path
    public static function path( $file, $add = false ){
        return dirname( $file ) . '/' . ( $add ? $add : '' );
    }

    // URL
    public static function url( $filepath = '', $script = false ){

        $theme = wp_get_theme();
        $theme_slug = get_template();

        // Base path
        $theme_rel_path = str_replace( ABSPATH, '', __DIR__ );
        
        // Base url
        $url = get_site_url( null, $theme_rel_path );
        $url = rtrim( $url, '/' ) . '/';

        // If there is no parameters
        if( empty( $filepath ) && empty( $script ) ) return $url;

        // Script based path
        if( !empty( $script ) ):

            $path = dirname( $script );
            $path_rel = str_replace( ABSPATH, '', $path );

            $url = get_site_url( null, $path_rel );
            $url = rtrim( $url, '/' ) . '/';

        endif;

        // Script filepath
        if( !empty( $filepath ) && $filepath != '/' ):
            $url .= ltrim( $filepath, '/' );
        endif;

        return $url;

    }

    function maybeURL( $text, $options = [] ){
    
        if( strpos( $text, 'http' ) === 0 ):

            $title = _array_get( $options, 'title' );
            $label = _array_get( $options, 'label', $text );

            return '<a href="'. $text .'"' . ( $title ? ' title="'. $title .'"' : '' ) . '>'. $label .'</a>';
        
        else:
    
            return $text;
        
        endif;
    
    }

    public static function titleTag( $title, $sep, $seplocation ){

        // Blog name
        $blogname = get_bloginfo( 'name' );

        // Empty title
        if( empty( $title ) ):
            return $blogname;
        endif;
        
        // Normalize
        $peaces = explode( $sep, $title );
        foreach( $peaces as $kp => &$peace ):
            $peace = text::clearTags( trim( $peace ) );
            if( empty( $peace ) ):
                unset( $peaces[ $kp ] );
            endif;
        endforeach;

        // Total of items
        $total_peaces = count( $peaces );

        // If is one, but not has blog name
        if( $total_peaces == 1 ):
        
            if( reset( $peaces ) == $blogname ):
                return $blogname;
            else:
                $peaces[] = $blogname;
                return implode( $sep, $peaces );
            endif;
        
        // More than one peaces
        else:
            // Blog name is first
            if( reset( $peaces ) == $blogname ):
                array_shift( $peaces );
            endif;

            // Allways blogname in the end
            if( end( $peaces ) != $blogname ):
                $peaces[] = $blogname;
            endif;
        
        endif;

        return implode( $sep, $peaces );
        
    }

    // Get category three
    public static function getTaxonomyThree( $taxonomy, $outs = false, $field_order = false ){
        
        // Editorias
        $terms = get_terms( 
            $taxonomy, 
            [ 
                'hide_empty' => true,
                'exclude' => $outs
            ] 
        );
        if( empty( $terms ) ) return false;

        // Orderyng by order field
        if( $field_order ):
        
            foreach( $terms as &$term ):
                $term->order = intVal( get_term_meta( $term->term_id, 'order', true ) );
            endforeach;

            $sortvals = array_column( $terms, 'order' );
            array_multisort( $sortvals, SORT_ASC, $terms );
        
        endif;

        $sorteds = [];
        Piki::sortTerms( $terms, $sorteds );

        return $sorteds;

    }

    public static function sortTerms( &$cats, &$into, $parentId = 0 ){

        foreach( $cats as $i => $cat ):
            if( $cat->parent == $parentId ):
                $into[ $cat->term_id ] = $cat;
                unset( $cats[ $i ] );
            endif;
        endforeach;

        foreach( $into as $topCat ):
            $topCat->children = [];
            Piki::sortTerms( $cats, $topCat->children, $topCat->term_id );
        endforeach;

    }

    // Envio de emails
    public static function mail( $to, $subject, $message, $from = false, $replyto = false ){

        // Headers
        $headers = [];

        // From
        if( empty( $from ) ):
            if( isset( $smtp_options[ 'sender' ] ) && !empty( $smtp_options[ 'sender' ] ) ):
                $from = $smtp_options[ 'sender' ];
            else:
                $from = get_option( 'admin_email' );
            endif;
        endif;
        if( is_array( $from ) ):
            list( $from_name, $from_email ) = $from;
        else:
            if( strpos( $from, '<' ) > -1 ):
                list( $from_name, $from_email ) = explode( '<', str_replace( '>', '', $from ) );
            else:
                $from_email = $from;
                $from_name = get_bloginfo( 'name' );
                $from_name = _array_get( $smtp_options, 'from_name', get_bloginfo( 'name' ) );
            endif;
        endif;
        $from_name = str_replace( [ ':', '(', ')' ], '-', $from_name );
        $from_name = str_replace( '--', '-', $from_name );
        $from_name = str_replace( [ '<', '>' ], '', $from_name );
        $headers[] = 'From: '. $from_name .' <' . $from_email . '>';

        // To
        if( !is_array( $to ) ):
            $to = explode( ',', $to );
        endif;
        foreach( $to as $kto => &$item_to ):
            $item_to = trim( $item_to );
        endforeach;

        // Reply To
        if( $replyto ):
            $headers[] = 'Reply-To: ' . $replyto;
        endif;

        // Subject
        //$subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';

        // Headers
        $headers = implode( PHP_EOL, $headers );

        // Send email
        try {
            $response = wp_mail( $to, $subject, $message, $headers );
            return $response;
        }
        catch( Exception $e ){
            Piki::error( 'Não foi possível enviar o email: ' . $response );
        }

    }

    public static function makeUrltoLink( $string ){
     
        // The Regular Expression filter
        $reg_pattern = "/(((http|https|ftp|ftps)\:\/\/)|(www\.))[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\:[0-9]+)?(\/\S*)?/";
     
        // make the urls to hyperlinks
        return preg_replace( $reg_pattern, '<a href="$0" target="_blank" rel="noopener noreferrer">$0</a>', $string );

    }

}

// Load features
if( is_writable( PIKI_FEATURES_FILE ) ):
    // By archive
    require_once( PIKI_FEATURES_FILE );
else:
    // By database
    Piki::loadFeatures();
endif;

// Shorcode para a home no conteúdo dos posts
add_filter( 'the_content', [ 'Piki', 'home_urls' ] );
add_filter( 'the_excerpt', [ 'Piki', 'home_urls' ] );

// Normalizando as tags P do conteúdo
//add_filter('the_content', [ 'Piki', 'fix_autop' ] );
//add_filter('the_excerpt', [ 'Piki', 'fix_autop' ] );

// Qualidade das imagens
add_action( 'init', [ 'Piki', 'init' ] );
add_action( 'wp_head', [ 'Piki', 'wp_head' ] );
add_action( 'init', [ 'Piki', 'add_scripts' ] );
add_action( 'admin_init', [ 'Piki', 'add_scripts' ] );
add_action( 'admin_head', [ 'Piki', 'head_configs' ], 0 );
add_action( 'wp_head', [ 'Piki', 'head_configs' ], 0 );
add_filter( 'wp_nav_menu_items', [ 'Piki', 'nav_menu_items' ] );

// Title
add_filter( 'wp_title', [ 'Piki', 'titleTag' ], 10, 3 );

// Apenas ADMIN
if( is_admin() ):
    // Página de administração
    require_once( Piki::path( __FILE__, '/admin.php' ) );
    // Métodos para administração
    require_once( Piki::path( __FILE__, '/includes/admin-features.php' ) );
endif;

// Organiza um array de ítems pelo campo 'parent'
function piki_organize_by_taxonomy( $items, $taxonomy ){

    if( !is_array( $items ) || empty( $items ) ):
        return false;
    endif;
    
    $return = [];
    foreach ( $items as $key => $item ):
        $idades = wp_get_post_terms( $item->ID, $taxonomy );
        foreach ( $idades as $key => $idade ):
            if ( !array_key_exists( $idade->slug, $return ) ):
                $return[ $idade->slug ] = $idade;
                $return[ $idade->slug ]->items = [];
            endif;
            $return[ $idade->slug ]->items[] = $item;
        endforeach;
    endforeach;
    
    return $return;

}

// Check if is https 
function check_https() {
    if( ( !empty( $_SERVER[ 'HTTPS' ] ) && $_SERVER[ 'HTTPS' ] !== 'off' ) || $_SERVER[ 'SERVER_PORT' ] == 443 ):
        return true; 
    endif;
    return false;
}

// Recupera as páginas filhas de uma determinada página
function piki_get_page_childs( $parent ){

    $args = [
        'sort_order' => 'ASC',
        'sort_column' => 'menu_order',
        'hierarchical' => false,
        'exclude' => '',
        'child_of' => $parent,
        'post_type' => 'page',
        'post_status' => 'publish'
    ];

    return get_pages( $args ); 

}

// Recupera e salva uma imagem
function piki_rack_file( $fileurl, $path, $newFileName=false ){
    
    // Se o path for indicado com um / no final, ela é removida
    $path = rtrim( $path, '/' );
    $return = [
        'status' => 'error',
        'message' => '',
    ];

    // Exists
    $fheaders = @get_headers( $fileurl );
    $fstatus = strtoupper( $fheaders[ 0 ] );
    if( strpos( $fstatus, 'NOT FOUND' ) !== false ):
        Piki::error( 'A url informada não de um arquivo válido, ou o arquivo não pode ser copiado.' );
    endif;
    
    // Verifica se o diretório de destino existe
    if ( !is_dir( $path ) && !@mkdir( $path )  ):
        Piki::error( 'A pasta informada não existe e não pôde ser criada.' );
    endif;  
    
    // Verifica se o diretório de destino está apto a receber o arquivo
    if ( !is_writable( $path ) && !@chmod( $path, 0775 ) ):
        Piki::error( 'A pasta informada não tem permissão de escrita e não pode ser alterada.' );
    endif;
        
    // Nome do arquivo
    $fileName = basename( $fileurl );

    // Tipo de arquivo
    $fileType = strtolower( pathinfo( $fileurl, PATHINFO_EXTENSION ) );
    
    // Novo nome do arquivo
    if( !$newFileName ):
        $newFileName = get_new_file_name( $path, $fileName );
    endif;

    // Absolute path
    $newPath = $path . '/' . $newFileName;
    
    // Pega a imagem
    $userAgent = 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0';
    $origem = curl_init( $fileurl );
    $destino = fopen( $newPath, 'wb' );
    curl_setopt( $origem, CURLOPT_FILE, $destino );
    curl_setopt( $origem, CURLOPT_HEADER, 0 );
    curl_setopt( $origem, CURLOPT_USERAGENT, $userAgent );
    curl_exec( $origem );
    curl_close( $origem );
    fclose( $destino );
    
    $return = array(
        'status' => 'success',
        'filepath' => $newPath,
        'filename' => $newFileName,
        'type' => $fileType,
    );

    if( in_array( $fileType, [ 'jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp' ] ) ):
        
        $imgInfo = getimagesize( $newPath );
        
        if( !empty( $imgInfo ) ):
            $return[ 'width' ] = $imgInfo[ 0 ];
            $return[ 'height' ] = $imgInfo[ 1 ];
        endif;
    
    endif;

    return $return;

}

// Redirecionando para a listagem, depois de salvar o ítem
/*
function piki_redirect_after_save( $location, $post_id ) {
    // Partes da URL
    list( $url, $qstring ) = explode( '?', $location );
    // Parsing query string
    parse_str( $qstring, $GET );
    // Página carregada
    $page = basename( $url );
    if( $page === 'post.php' && is_array( $GET ) && isset( $GET[ 'action' ] ) && $GET[ 'action' ] === 'edit' ):
        $post_type = get_post_type( $post_id );
        $location = admin_url( 'edit.php?post_type=' . $post_type );
        if( isset( $GET[ 'message' ] ) ):
            $location .= '&message=' . $GET[ 'message' ];
        endif;
    endif;
    return $location;
}
add_filter( 'redirect_post_location', 'piki_redirect_after_save', 10, 2 );
*/

// Retorna o nome do arquivo a ser gravado
function get_new_file_name( $dir, $file_name ){

    // Remove extenções no nome
    if( strpos( $file_name, '?' ) ):
        $paces_name = explode( '?', $file_name );
        $file_name = array_shift( $paces_name );
    endif;

    // Pedaços do nome
    $peaces = explode( ".", $file_name );
    
    // Extensão do arquivo
    $extensao = array_pop( $peaces );
    
    // Nome consolidado
    $name = implode( '_', $peaces );
    $name = Piki::slug( $name );
    
    // Novo nome
    $file_name = $name . '.' . $extensao;
    
    // URL default do arquivo
    $url_default = $dir . '/' . $file_name;
    
    // Se o arquivo já existe, é gerado um novo nome
    if( is_file( $url_default ) ):

        $new_name = '';
       
        $cont = 1;
        
        while( $new_name == '' ){
            
            $name_test = $name . '(' . $cont . ').' . $extensao;
           
            $url_test = $dir . '/' . $name_test;
            
            if( !is_file( $url_test ) ):
                $new_name = $name_test;
            endif;
            
            $cont++;
        
        }
    
    else:
        
        $new_name = $file_name;     
    
    endif;
    
    return $new_name;

}

function array_flatten( $array ){ 
    if( !is_array( $array ) ):
        return FALSE; 
    endif;
    $result = []; 
    foreach( $array as $key => $value ):
        if ( is_array( $value ) ): 
            $result = array_merge( $result, array_flatten( $value ) ); 
        else:
            $result[ $key ] = $value; 
        endif;
    endforeach;
    return $result; 
} 

// Object keys
function object_keys( $object ){
    if( is_array( $object ) ) return $object;
    $array = (array)$object;
    return array_keys( $array );
}

// Ferify if is real empty
function isempty( $val ){
    if ( !isset( $val ) || is_null( $val ) || $val === false ):
        return true;
    elseif( ( is_string( $val ) && $val == '' ) || ( is_array( $val ) && count( $val ) == 0 ) ):
        return true;
    else:
        return false;
    endif;
}

// Transliterate
function transliterate( $string, $separator = '_' ){
    // Remove accents
    $no_accents = remove_accents( $string );
    // Remove white spaces
    $no_white_spaces = str_replace( array( ' ', '-', '_' ), $separator, $no_accents );
    // Just numbers and letters
    $translitated = preg_replace( "/[^A-Za-z0-9". $separator ."]/", "", $no_white_spaces );
    // transliterate
    return strtolower( $translitated );
}

function is( $array, $key, $value ) {
    return isset( $array[ $key ] ) && $array[ $key ] == $value;
}
function off( $array, $variable ){
    $array = (array)$array;
    return !is_array( $array ) || !isset( $array[ $variable ] ) || $array[ $variable ]  !== 'on';
}

function on( $source, $variable ){

    // Not array or object
    if( !is_array( $source ) && !is_object( $source ) ): 
        return $source === 'on' || $source === true || $source === 'true';
    endif;

    // if is object
    if( is_object( $source ) ):

        // Conditions
        return isset( $source->{$variable} ) && ( $source->{$variable} === 'on' || $source->{$variable} === 'true' || $source->{$variable}  === true );
    
    // if is array
    else:
    
        // Conditions
        return isset( $source[ $variable ] ) && ( $source[ $variable ] === 'on' || $source[ $variable ] === 'true' || $source[ $variable ]  === true );
    
    endif;

}

function _array_get( $arr, $key, $default = false, $first = false ){
    $return = isset( $arr[ $key ] ) && !empty( $arr[ $key ] ) ? $arr[ $key ] : $default;
    return is_array( $return ) && $first ? reset( $return ) : $return;
}

function _object_get( $obj, $key, $default = false ){
    return isset( $obj->{$key} ) && !empty( $obj->{$key} ) ? $obj->{$key} : $default;
}

function _get( $var, $default = false ){
    return isset( $_GET[ $var ] ) && !empty( $_GET[ $var ] ) ? $_GET[ $var ] : ( $default === false ? false : $default );
}

function _post( $var, $default = false ){
    return isset( $_POST[ $var ] ) && !empty( $_POST[ $var ] ) ? $_POST[ $var ] : ( $default === false ? false : $default );
}
function _server( $var, $default = false ){
    return _array_get( $_SERVER, $var, $default );
}

function _request( $var, $default = false ){
    return isset( $_REQUEST[ $var ] ) && !empty( $_REQUEST[ $var ] ) ? $_REQUEST[ $var ] : ( $default === false ? false : $default );
}

// Criando cookie
function _setcookie( $key, $value, $time = false ){

    // Start session
    if( session_status() == PHP_SESSION_NONE ): 
        try { @session_start(); }
        catch( Exception $e ){}
    endif;

    // Set value
    if( is_array( $value ) ) $value = serialize( $value );
    if( !$time ) $time = time() + YEAR_IN_SECONDS;
    setcookie( $key, $value, $time, '/' );

}

// Recuperando cookie
function _getcookie( $key ){

    // Start session
    if( session_status() == PHP_SESSION_NONE ): 
        try { @session_start(); }
        catch( Exception $e ){}
    endif;

    // Get value    
    $cook = _array_get( $_COOKIE, $key );
    return $cook ? maybe_unserialize( stripslashes( $cook ) ) : false;

}
