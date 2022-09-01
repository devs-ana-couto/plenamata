<?php
// DOWNLOAD DE ARQUIVOS
Class forceDownload {
    
    public static function init(){

        // Shorcode button
        add_shortcode( 'force-download', array(  'forceDownload', 'shortcode_button' ) );

    }

    // Shortcode que mostra formulários
    public static function shortcode_button( $atts ) {
        
        // Opções
        $defaults = array(
            'id' => get_the_ID(),
            'title' => 'Fazer download',
        );        
        $options = array_merge( $defaults, $atts );        

        $html = '<a href="'. forceDownload::url( $options[ 'id' ] ) .'" class="download" title="Baixar arquivo">'. $options[ 'title' ] .'</a>';

        return $html;
        
    }

    public static function url( $post ){
        
        // POST
        if( is_numeric( $post ) ):
            $post = get_post( $post );
        endif;
        
        // Só baixa arquivos da galeria
        if( $post->post_type != 'attachment' ):
            exit( 'O Post informado não é um arquivo' );
        endif;

        // File extension
        $file = get_attached_file( $post->ID );

        // File info
        $pathinfo = pathinfo( $file );

        // Download URL
        return get_bloginfo( 'url' ) . '/download/' . $post->post_name . '.' . $pathinfo[ 'extension' ];
    
    }

    public static function generate_rewrite_rules() {
    
        global $wp_rewrite; 
        $new_rules[ 'download/([^/]+)' ] = 'index.php?download=true&post-name=$matches[1]';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    
    }

    public static function query_vars( $qvars ) {
    
        $qvars[] = 'download';
        $qvars[] = 'post-name';
        return $qvars;
    
    }

    public static function template_redirect_intercept(){
    
        global $wp_query, $wpdb;
        
        if( $wp_query->get( 'download' ) == 'true' ):
            
            // ID do post
            $filename = $wp_query->get( 'post-name' );
            $peaces_name = explode( '.', $filename );
            array_pop( $peaces_name );
            $post_name = implode( '.', $peaces_name );

            $post_id = $wpdb->get_var($wpdb->prepare( 
                "SELECT ID, post_name FROM $wpdb->posts WHERE post_name = %s AND post_type = 'attachment'", 
                $post_name 
            ));
            
            // Tipos para download
            $candown = array( 
                'audio/mpeg', 
                'video/mp4', 
                'image/jpg', 
                'image/jpeg', 
                'image/png', 
                'image/gif', 
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/msword',
                'application/excel',
                'application/pdf',
            );
            
            // Mimetype do arquivo
            $mimetype = get_post_mime_type( $post_id );
            
            // Verifica se é um tipo de arquivo que pode ser baixado
            if( in_array( $mimetype, $candown ) ):

                $path = get_attached_file( $post_id );
                
                header( "Content-Description: Transferência de arquivo" ); 
                header( "Content-Transfer-Encoding: Binary"); 
                header( "Content-disposition: attachment; filename=" . basename( $path ) );
                header( "Content-type: " . $mimetype );
                readfile( $path );
                exit;
            
            endif;
        
        endif;
    
    }

}
add_action( 'init', array( 'forceDownload', 'init' ) );
add_action( 'generate_rewrite_rules', array( 'forceDownload', 'generate_rewrite_rules' ) );
add_filter( 'query_vars', array( 'forceDownload', 'query_vars' ) );
add_action( 'template_redirect', array( 'forceDownload', 'template_redirect_intercept' ) );
