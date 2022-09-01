<?php
session_start();

// Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

class PKLGPD {

    var $options;

    function __construct(){
        add_action( 'wp_footer', [ $this, 'wpFooter' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'addFiles' ] );
    }

    // Write code
    function wpFooter(){
        
        // Get admin options
        $this->options = get_option( 'pklgpd_options' );
        if( _array_get( $this->options, 'status' ) !== 'on' ) return '';

        // File url
        $file_id = _array_get( $this->options[ 'privacy_file' ], 'ids' );
        if( !empty( $file_id ) ):
            $this->options[ 'file_url' ] = wp_get_attachment_url( $file_id );
            $this->options[ 'texto' ] = str_replace( '[FILEURL]', $this->options[ 'file_url' ], $this->options[ 'texto' ] );
        else:
            $this->options[ 'file_url' ] = false;
        endif;

        Piki::search_template( 'widget-lgpd', false, __DIR__, false, $this->options ); 
        
    }

    // Files
    function addFiles( $hook ){
        wp_enqueue_script( 'pklgpd-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'pklgpd-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

}
$PKLGPD = new PKLGPD();

