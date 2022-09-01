<?php
define( 'PIKIIMAGES_QUEUE_POSTS_TABLE', 'pikiimages_queue_posts' );
define( 'PIKIIMAGES_QUEUE_IMAGES_TABLE', 'pikiimages_queue_images' );

// Optimize images
use Spatie\ImageOptimizer\OptimizerChainFactory;
use WebPConvert\WebPConvert;

class PikiImages {

    private $options;
    private $images;

    public static function render( $meta, $options = array() ){
        /*
        <picture>
            <source srcset="<?php echo $meta->render( 'logo', [ 'urls' => true ]); ?>.webp" media="(min-width: 650px)" type="image/webp">
            <source srcset="<?php echo $meta->render( 'logo', [ 'urls' => true ]); ?>" media="(min-width: 650px)" type="image/png"> 
            <img src="<?php echo $meta->render( 'logo', [ 'urls' => true ]); ?>" alt="<?php echo $meta->render( 'title' ); ?>">
        </picture>
        */
    }

    // Init
    public static function init(){
        $i = new PikiImages();
        add_shortcode( 'pikiimages', array(  $i, 'shortcode' ) );
    }

    // Set jpg default quality
    public static function jpeg_quality(){
        return 100;
    }

    // Busca as imagens que precisam ser atualizadas e geradas
    public static function images_to_rebuild(){
        
        global $wpdb;

        // Posts por página
        $posts_per_page = 100;

        // Tipo de post
        $post_type = $_POST[ 'post_type' ];
        if( empty( $post_type ) ):
            Piki::error( 'O tipo de post não foi informado' );
        endif;
                
        // Campos
        $image_fields = self::get_post_type_image_fields( $post_type );
         
        // Se não existem campos, passamos para o próximo tipo de post
        if ( empty( $image_fields ) ):
            Piki::return_json(array(
                'status' => 'no_fields',
                'message' => 'Este tipo de post não tem nenhum campo de imagem.',
            ));
        endif;

        // Posts
        $paged = isset( $_POST[ 'paged' ] ) && (int)$_POST[ 'paged' ] > 1 ? $_POST[ 'paged' ] : 1;

        // Queue status
        $status = PikiImages::getQueueStatus( $post_type );

        // Posts
        $posts = false;

        // Continue queue
        if( $status == 'running' ):
            
            $posts = $wpdb->get_results($wpdb->prepare(
                "SELECT post_id as ID, post_type, post_title FROM {$wpdb->prefix}" . PIKIIMAGES_QUEUE_POSTS_TABLE . " WHERE post_type = %s LIMIT $posts_per_page OFFSET " . ( ( $paged * $posts_per_page ) - $posts_per_page ),
                $post_type
            ));

            $total = $wpdb->get_var($wpdb->prepare(
                "SELECT count(0) FROM $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " WHERE post_type = %s",
                $post_type
            ));
        
        else:

            // Set status
            PikiImages::setQueueStatus( $post_type, 'searching' );

            $posts = new WP_Query(array(
                'post_type' => $post_type,
                'post_status' => 'any',
                'posts_per_page' => $posts_per_page,
                'paged' => $paged,
                'orderby' => 'ID',
                'order' => 'DESC',
            ));

            // Se não existe post para análise
            if( !$posts->have_posts() ):
                Piki::return_json(array(
                    'status' => 'no_posts',
                    'message' => 'Nenhum post a ser analisado.',
                ));
            endif;

            // Posts
            $total = $posts->found_posts;
            $posts = $posts->get_posts();

            // Se for a primeira requisição, limpamos a tabela
            if( $paged == 1 ):
                $wpdb->query( "TRUNCATE TABLE $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE );
                $wpdb->query( "ALTER TABLE $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " AUTO_INCREMENT = 1" );
            endif;
            
            // Colocando os posts na fila para análise
            foreach( $posts as $post ):
                $wpdb->insert( 
                    $wpdb->prefix . PIKIIMAGES_QUEUE_POSTS_TABLE, 
                    array( 
                        'post_id' => $post->ID, 
                        'post_type' => $post->post_type,
                        'post_title' => $post->post_title,
                    ), 
                    array( 
                        '%d', 
                        '%s',
                        '%s'
                    ) 
                );
            endforeach;

        endif;

        // Next page
        $next = ( ( $posts_per_page * $paged ) < $total ) ? $paged + 1 : false;
        
        // Say this running
        if( !$next && $status == 'searching' ):
            PikiImages::setQueueStatus( $post_type, 'running' );
        endif;

        // Return
        Piki::return_json(array(
            'status' => 'success',
            'total_posts' => $total,
            'next_page' => $next,
            'posts' => $posts
        ));

    }

    public static function setQueueStatus( $post_type, $status ){
        return update_option( 'piki_images_' . $post_type . '_status', $status );
    }

    public static function getQueueStatus( $post_type ){
        return get_option( 'piki_images_' . $post_type . '_status' );
    }

    // Busca campos de imagens de um tipo de post
    public static function get_post_type_image_fields( $post_type ){
        
        // Configurações do tipo de post
        $settings = PikiForms::get_form_settings( $post_type );

        // Se não existem campos para o tipo de post
        if( !$settings || empty( $settings[ 'fields' ] ) ):
            return false;
        endif;

        // Campos de imagens, atrelados ao tipo de post
        return PikiFields::extract_field( $settings[ 'fields' ], array( 'image', 'imagewp' ), 'ftype', false );
    
    }

    public static function proccess_post(){

        global $wpdb;

        Piki::preventScriptStop();

        // Post info
        $post_id = _post( 'post_id' );
        $post_type = _post( 'post_type' );

        $status = $wpdb->get_var($wpdb->prepare(
            "SELECT status FROM $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " WHERE post_id = %d",
            $post_id
        ));

        if( $status == '2' ):
            Piki::return_json(array(
                'status' => 'success',
                'result' => $results,
            ));
        endif;

        // Save values
        $results = PikiImages::_proccess_post( $post_id, $post_type );

        // Has items
        $lasts = $wpdb->get_var($wpdb->prepare(
            "SELECT count(0) FROM $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " WHERE post_type = %s",
            $post_type
        ));

        // Finish status
        if( empty( $lasts ) ):
            PikiImages::setQueueStatus( $post_type, 'finished' );
        endif;
                    
        // Retorna o json de sucesso
        Piki::return_json(array(
            'status' => 'success',
            'result' => $results,
            'has_next' => !empty( $lasts )
        ));

    }

    public static function _proccess_post( $post_id, $post_type ){

        global $wpdb;

        // Set status to proccess
        PikiImages::setPostStatus( $post_id, 2 );

        // Campos
        $all_fields = self::get_post_type_image_fields( $post_type );
        if( empty( $all_fields ) ):
            Piki::error( 'Este post não tem nenhum campo de imagem.' );
        endif;
        
        // Retorno
        $results = array();
        
        // Passa por cada tipo de campo
        foreach( $all_fields as $ftype => $fields ):

            // Passa pelos campos
            foreach( $fields as $f => $field ):

                // Valor atual do campo
                $value = PikiField::get_field_value( $field, $post_id );
                image::rebuildMeta( $field, $post_id, $value );
                
            endforeach;
        
        endforeach;

        // Remove o post da fila
        $wpdb->query($wpdb->prepare(
            "DELETE FROM $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " WHERE post_id = %d",
            $post_id
        ));

        return $results;

    }

    public static function setPostStatus( $post_id, $status ){
        global $wpdb;
        $wpdb->query($wpdb->prepare(
            "UPDATE $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE . " SET status = %d WHERE post_id = %d",
            array( $status, $post_id )
        ));
    }

    // Disable generated image sizes
    public static function automaticSizes( $sizes ){        

        unset( $sizes[ 'medium' ] );
        unset( $sizes[ 'medium_large' ] );
        unset( $sizes[ 'large' ] );
        unset( $sizes[ '1536x1536' ] );
        unset( $sizes[ '2048x2048' ] );

        return $sizes;
        
    }

    // Optimize images
    public static function optimizeImage( $path ){

        if( empty( $path ) ) return false;

        $path_parts = pathinfo( $path );
        $extension = _array_get( $path_parts, 'extension' );
        
        // Optimize
        $optimizerChain = OptimizerChainFactory::create();
        $optimizerChain->optimize( $path );
        
        // Generate webp version
        if( USE_WEBP ):
            PikiImages::generateWEBP( $path );
        endif;

    }

    // Generate webp version
    public static function generateWEBP( $path ){

        // Webp path
        $wpath = $path . '.webp';

        // Mime type
        $mimetype = mime_content_type( $path );

        // Not try convert svg
        if( $mimetype == 'image/svg' || $mimetype == 'image/gif' ):
            return false;
        endif;

        try {

            WebPConvert::convert( 
                $path, 
                $wpath, 
                [
                    'png' => [
                        'encoding' => 'auto',
                        'near-lossless' => 60,
                        'quality' => 90,
                        'sharp-yuv' => true,
                    ],
                    'jpeg' => [
                        'encoding' => 'auto',
                        'quality' => 'auto',
                        'max-quality' => 90,
                        'default-quality' => 85,
                        'sharp-yuv' => true,
                    ]
                ] 
            );            
            return $wpath;

        }
        catch( Exception $e ){

            echo '<pre>';
            echo '$e' . "\r\n";
            var_dump( $e );
            exit;
            
        }
              
    }

    // Uploaded image
    public static function attachmentMetadata( $metadata, $attachment_id, $context ){

        if( !wp_attachment_is_image( $attachment_id ) ):
            return $metadata;
        endif;
                
        // Root files
        $updir = wp_get_upload_dir();
        $updir = _array_get( $updir, 'basedir' );
        
        // Optimize original file
        $original_path = $updir . '/' . _array_get( $metadata, 'file' );
        PikiImages::optimizeImage( $original_path );

        return $metadata;

    }

    // Delete generated attachment childs
    public static function deleteAttachment( $post_id, $post ){

        $childs = get_post_meta( $post_id, 'pkchilds', true );
        if( !empty( $childs ) ):

            foreach( $childs as $child ):

                $path = rtrim( ABSPATH, '/' ) . '/' . $child;

                if( file_exists( $path ) ):
                    wp_delete_file( $path );
                endif;
            
                $webp = $path . '.webp';
                if( file_exists( $webp ) ):
                    wp_delete_file( $webp );
                endif;
            
            endforeach;
        
        endif;

    }

}

// Initing
add_action( 'init' , array( 'PikiImages', 'init' ) );
// JPG default quality
add_filter( 'jpeg_quality', array( 'PikiImages', 'jpeg_quality' ) );
// Optimize images
add_filter( 'wp_generate_attachment_metadata', array( 'PikiImages', 'attachmentMetadata' ), 10, 3 );
// disable generated image sizes
add_action( 'intermediate_image_sizes_advanced', array( 'PikiImages', 'automaticSizes' ) );
// Delete attachment
add_action( 'delete_attachment', array( 'PikiImages', 'deleteAttachment' ), 10, 2 );

// Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

