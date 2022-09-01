<?php
# Página de administração dos pikiforms
if( is_admin() ):
    //require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

class PikiViews {

    public static function init() {

        # Shortcodes
        add_shortcode( 'pikiviews', array(  'PikiViews', 'shortcode' ) );
        add_shortcode( 'pikiviews_gallery', array(  'PikiViews', 'shortcode_gallery' ) );

        # Arquivos
        $filesdir = Piki::url( '/', __FILE__ );
        wp_enqueue_script( 'piki-views-scripts', $filesdir . 'scripts.js', array( 'jquery' ) );
        wp_enqueue_style( 'piki-views-styles', $filesdir . 'styles.css' );

        # Libraries
        Piki::add_library( 'jquery-ui' );
        Piki::add_library( 'fancybox', array( 'fancybox-media.js' ) );
        Piki::add_library( 'mediaelement' );    
        if( class_exists( 'PikiFloater' ) ):
            PikiFloater::add_files();
        endif;

    }

    # Redirecionar as páginas solicitadas para os devidos arquivos 
    public static function template_intercept(){
        global $wp_query, $wp_rewrite;
        if( $wp_query->is_single() ):
            # Fotos
            if( $wp_query->get( 'post_type' ) == 'foto' ):
            endif;
        endif;
    }


    public static function get_posts( $post_type, $total_items=3, $orderby='post_date', $order='' ){
        $items = new WP_Query(array(
            'post_type' => $post_type,
            'posts_per_page' => $total_items,
            'orderby' => $orderby,
            'order' => $order,
        ));
        if( $items->have_posts() ):
            $items = $items->get_posts();
            wp_reset_query();
            foreach ( $items as $key => &$item ):
                $item->permalink = get_permalink( $item->ID );
                $meta = new PostMeta( $item->ID );
                $item->values = $meta->values;
            endforeach;
            return $items;
        endif;
        return false;
    }


    # Shortcode que mostra formulários
    public static function shortcode( $atts ) {
        
        # Extrai os parâmetros
        $defaults = array(
            'post_type' => 'any',
            'template' => 'default',
            'total_items' => get_option( 'posts_per_page' ),
            'orderby' => false,
            'order' => false,
            'view_all_link' => true,
            'view_all_label' => false,
            'view_all_slug' => false,
            'view_all_position' => 'top',
            'title' => false,
            'header_icon' => 'th-list',
            'pager' => false,
            'items_per_line' => 2,
            'links_type' => 'single',
            'media_actions' => false,
            'class' => '',
            'exclude_actual' => false,
            'thumb_size' => '500x316',
        );
        global $options;
        $options = shortcode_atts( $defaults, $atts, 'pikiviews' );

        # Tamanho do thumbnail
        if( !strpos( $options[ 'thumb_size' ], 'x' ) ):
            $options[ 'thumb_size' ] = 'full';
        else:
            $thumb_size_parts = explode( 'x', $options[ 'thumb_size' ] );
            $options[ 'thumb_size' ] = array(
                'width' => $thumb_size_parts [ 0 ],
                'height' => $thumb_size_parts[ 1 ]
            );
        endif;

        # Classe de ítems por linha
        if( $options[ 'items_per_line' ] == 2 ):
            $options[ 'line_class' ] = 'sz8';
        elseif( $options[ 'items_per_line' ] == 4 ):
            $options[ 'line_class' ] = 'sz4';
        elseif( $options[ 'items_per_line' ] == 6 ):
            $options[ 'line_class' ] = 'sz2';
        else:
            $options[ 'line_class' ] = 'sz16';
        endif;

        # Classes aidicionais
        if( $options[ 'template' ] == 'multimidia' || $options[ 'template' ] == 'multimidia-widget' ):
            $options[ 'class' ] .= ' multimidia media-actions';
        endif;

        # Parametros
        $pars = array(
            'post_type' => explode( ',', $options[ 'post_type' ] ),
            'posts_per_page' => $options[ 'total_items' ]
        );
        # Pager
        if( $options[ 'pager' ] ):
            # Escondemos o link de ver todos os ítems
            $options[ 'view_all_link' ] = false;
            # Colocamos o parametr da paginação
            $pars[ 'paged' ] = get_query_var( 'paged' ) != '' ? get_query_var( 'paged' ) : 1;
            $pars[ 'page' ] = get_query_var( 'page' ) != '' ? get_query_var( 'page' ) : 1;
        endif;
        # Remove o post atual
        if( $options[ 'exclude_actual' ] ):
            $pars[ 'post__not_in' ] = array( get_the_ID() );
        endif;
        
        # ORDER
        if( $options[ 'orderby' ] ):
            $pars[ 'orderby' ] = $options[ 'orderby' ];
        endif;
        if( $options[ 'order' ] ):
            $pars[ 'order' ] = $options[ 'order' ];
        endif;

        global $posts;
        $posts = new WP_Query( $pars );

        if( $posts->have_posts() ):

            $post_type = is_array( $options[ 'post_type' ] ) ? $options[ 'post_type' ][ 0 ] : $options[ 'post_type' ];
            $options[ 'post_type_object' ] = get_post_type_object( $post_type );

            # Título
            if( !$options[ 'title' ] ):
                $options[ 'title' ] = $options[ 'post_type_object' ]->label;
            endif;

            # Link para listagem geral
            if( !$options[ 'view_all_slug' ] ):
                $options[ 'view_all_url' ] = get_post_type_archive_link( $post_type );
            else:
                $options[ 'view_all_url' ] = get_site_url( NULL, $options[ 'view_all_slug' ] );
            endif;
            
            # Label do link para listagem geral
            if( !$options[ 'view_all_label' ] ):
                $options[ 'view_all_label' ] = '+ Ver ' . $options[ 'post_type_object' ]->labels->all;
            endif;

            echo '<div class="piki-view ' . $options[ 'template' ] . ' '. $options[ 'class' ] . ' ' . ( $options[ 'header_icon' ] == 'no' ? 'no' : 'with' ) . '-header-icon">';
            Piki::search_template( 'piki-views', $options[ 'template' ], Piki::path( __FILE__ ) . 'templates/', false );
            if( $options[ 'pager' ] ):
                Piki::pager( $posts );
            endif;
            echo '</div>';
        
        endif;

        wp_reset_query();

    }

    # Shortcode que mostra formulários
    public static function shortcode_gallery( $atts ) {
        
        # Extrai os parâmetros
        $defaults = array(
            'gallery_id' => false,
            'ids' => false,
            'show_thumbs' => true,
        );
        global $options;
        $options = shortcode_atts( $defaults, $atts, 'pikiviews' );
        extract( $options );

        if( !$ids && !$gallery_id ):
            $gallery_id = get_the_ID();
        endif;

        /*
        if( $ids ):
        else:
            $meta = get_post_meta( get_the_ID(), 'photo', true );
        if( $meta == '' || !isset( $meta[ 'ids' ] ) ||  )
            $images_ids = $meta[ 'ids' ];
            echo '<pre>';
            var_dump( $meta );
            exit;
        endif;

       echo '<pre>';
       exit;
       */

    }

    public static function item_url( $type, $ID=false ){
        # ID do laço
        if( !$ID ): $ID = get_the_ID(); endif;

        switch ( $type ):
            case 'anchor':
                $post_type = get_post_type( $ID );
                return get_post_type_archive_link( $post_type ) . '#' . get_post_field( 'post_name', $ID );
            break;
            default:
                return get_permalink( $ID );
            break;
        endswitch;

    }

    public static function ajax_get_attachments(){
        $attachs = new WP_Query(array(
            'post_type' => 'attachment',
            'post__in' => explode( ',', $_POST[ 'ids' ] ),
            'post_status' => 'any',
        ));
        Piki::return_json( $attachs->get_posts() );
    }

}
# Actions
add_action( 'init', array( 'PikiViews', 'init' ) );
add_action( 'template_redirect', array( 'PikiViews', 'template_intercept' ) );

# Ajax galerias
add_action( 'wp_ajax_nopriv_pikiviews_get_attachments', array( 'PikiViews', 'ajax_get_attachments' ) );
add_action( 'wp_ajax_pikiviews_get_attachments', array( 'PikiViews', 'ajax_get_attachments' ) );

