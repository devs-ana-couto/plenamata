<?php
class PikiFloater {

    // Constructor
    function __construct(){
    
        // Initing
        add_action( 'init', array( $this, 'init' ) );

        // Message scripts
        Piki::add_library( 'message' );
    
    }
    
    // Initing
    public static function init() {
        add_shortcode( 'pikifloater', array(  'pikifloater', 'shortcode' ) );
    }

    // Arquivos
    public static function add_files(){
        Piki::add_library( 'fancybox' );
        wp_enqueue_script( 'PikiFloater-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'PikiFloater-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

    public static function url( $id ){
        if( is_string( $id ) && !is_numeric( $id ) ):
            $url = $id;
        else:
            $url = get_permalink( $id );
        endif;
        return $url;
    }

    public static function shortcode( $atts ) {
        
        shortcode_atts([
            'id' => false,
            'slug' => false,
            'url' => false,
            'label' => false,
            'class' => false,
            'modal-title' => false,
            'callback' => false,
            'callback_args' => false,
        ], $atts );

        // URL
        $url = _array_get( $atts, $url );
        
        // Post
        $post = false;
        $slug = _array_get( $atts, 'slug' );
        $id = _array_get( $atts, 'id' );
        if( $slug ):
            $post = Piki::get_post( $slug );
        elseif( $id ):
            $post = get_post( $id );
        endif;        

        // Empty URL and have Post
        if( empty( $url ) ):

            if( $post ):
                $url = get_permalink( $post->ID );
            endif;
        
        else:

            $url = str_replace( '%home%', get_bloginfo( 'url' ),  $atts[ 'url' ] );
            $url = Piki::http( $url );

        endif; 
        if( empty( $url ) ) return '';

        $label = trim( _array_get( $atts, 'label', '' ) );
        if( empty( $label ) ):
            $label = $post ? $post->post_title : 'Enviar';
        endif;
        
        // Attributes
        $modal_title = _array_get( $atts, 'modal-title' );
        $fit_screen = _array_get( $atts, 'fit-screen' );
        $class = _array_get( $atts, 'class', '' );
        $callback = _array_get( $atts, 'callback' );
        $callback_args = _array_get( $atts, 'callback_args' );
        $better_token = uniqid();

        self::add_files();

        return '<a href="'. $url .'" class="piki-page-floater ' . $class . '"'. ( $callback ? ' --callback="'. $callback .'"' : '' ) . ( $callback_args ? ' --callback-args="'. $callback_args .'"' : '' ) .' rel="floater-'. $better_token .'"'. ( $modal_title ? 'data-modal-title="'. $modal_title .'"' : '' ) .''. ( $fit_screen ? 'data-fit-screen="true"' : '' ) .'>'. $label .'</a>';

    }

} 
$PikiFloater = new PikiFloater();
