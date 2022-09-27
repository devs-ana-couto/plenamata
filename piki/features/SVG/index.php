<?php
Class SVGSupport {

    protected $sanitizer;

    function __construct() {
        $this->sanitizer = new enshrined\svgSanitize\Sanitizer();
        $this->sanitizer->minify( true );

        add_filter( 'upload_mimes', array( $this, 'allowType' ) );
        add_filter( 'wp_handle_upload_prefilter', array( $this, 'check_for_svg' ) );
        add_filter( 'wp_check_filetype_and_ext', array( $this, 'fixMimeType' ), 75, 4 );
        add_filter( 'admin_post_thumbnail_html', array( $this, 'featured_image_fix' ), 10, 3 );
        add_filter( 'wp_calculate_image_srcset_meta', array( $this, 'disable_srcset' ), 10, 4 );
    }

    public function allowType( $mimes ) {
        $mimes['svg']  = 'image/svg+xml';
        $mimes['svgz'] = 'image/svg+xml';

        return $mimes;
    }

    public function fixMimeType( $data = null, $file = null, $filename = null, $mimes = null ) {
        $ext = isset( $data['ext'] ) ? $data['ext'] : '';
        if ( strlen( $ext ) < 1 ) {
            $exploded = explode( '.', $filename );
            $ext      = strtolower( end( $exploded ) );
        }
        if ( $ext === 'svg' ) {
            $data['type'] = 'image/svg+xml';
            $data['ext']  = 'svg';
        } elseif ( $ext === 'svgz' ) {
            $data['type'] = 'image/svg+xml';
            $data['ext']  = 'svgz';
        }

        return $data;
    }

    public function check_for_svg( $file ) {

        // Ensure we have a proper file path before processing
        if( ! isset( $file['tmp_name'] ) ) return $file;

        $file_name   = isset( $file['name'] ) ? $file['name'] : '';
        $wp_filetype = wp_check_filetype_and_ext( $file['tmp_name'], $file_name );
        $type        = ! empty( $wp_filetype['type'] ) ? $wp_filetype['type'] : '';

        if ( $type === 'image/svg+xml' ) {
            if ( ! $this->sanitize( $file['tmp_name'] ) ) {
                $file['error'] = __( "Sorry, this file couldn't be sanitized so for security reasons wasn't uploaded",
                    'safe-svg' );
            }
        }

        return $file;
    
    }

    protected function sanitize( $file ) {
        
        $dirty = file_get_contents( $file );
        
        $clean = $this->sanitizer->sanitize( $dirty );
        if( $clean === false ) return false;

        file_put_contents( $file, $clean );

        return true;
    }

    public function featured_image_fix( $content, $post_id, $thumbnail_id ) {
        $mime = get_post_mime_type( $thumbnail_id );

        if ( 'image/svg+xml' === $mime ) {
            $content = sprintf( '<span class="svg">%s</span>', $content );
        }

        return $content;
    }

    function metadata_error_fix( $data, $post_id ) {
        if ( is_wp_error( $data ) ) {
            $data = wp_generate_attachment_metadata( $post_id, get_attached_file( $post_id ) );
            wp_update_attachment_metadata( $post_id, $data );
        }
        return $data;
    }

    public function disable_srcset( $image_meta, $size_array, $image_src, $attachment_id ) {
        if( $attachment_id && 'image/svg+xml' === get_post_mime_type( $attachment_id ) ):
            $image_meta['sizes'] = [];
        endif;
        return $image_meta;
    }

}

$SVGSupport = new SVGSupport();
