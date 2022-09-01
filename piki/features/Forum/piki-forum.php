<?php
/*
    Plugin Name: Piki Forum
    Description: Tópicos de discussão enviados pelos usuários
    Version: 0.1
    Author: Thiago Borges (Piki)
    Author URI: http://pikiweb.com.br
    Author Email: thiago@pikiweb.com.br
*/

define( 'PKForum_ptype', 'topico' );
define( 'PKForum_taxonomy', 'tipo-de-dependencia' );

class PKForum {
  
    public static function template_redirect_intercept(){
        global $wp_query;
        if( $wp_query->get( 'pikiforms' ) == true && $wp_query->get( 'post-type' ) == PKForum_ptype ):
            PKForum::add_files();
        endif;
    }

    public static function ptype(){
        return PKForum_ptype;
    }

    public static function register_post_type(){

        # Post type topico
        $settings = array(
            'labels' => array(
                'name' => __('Tópicos', 'post type general name'),
                'singular_name' => __('Tópico', 'post type singular name'),
                'add_new' => __('Adicionar História', 'book'),
                'add_new_item' => __('Adicionar Novo Tópico'),
                'edit_item' => __('Editar Tópico'),
                'new_item' => __('Novo Tópico'),
                'view_item' => __('Ver Tópico'),
                'search_items' => __('Buscar Tópico'),
                'not_found' =>  __('Nenhum tópico encontrado'),
                'not_found_in_trash' => __('Nenhum tópico na lixeira'),
                'parent_item_colon' => ''
            ),
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true, 
            'rewrite' => array( 'slug' => 'topicos' ),
            'capability_type' => 'post',
            'taxonomies' => array( 'post_tag' ),
            'hierarchical' => false,
            'has_archive' => true,
            'menu_position' => 5,
            'supports' => array( 'title', 'editor', 'comments' ),
            'menu_icon' => Piki::url( 'images/menu-icon.png', __FILE__ ),
            'capability_type' => PKForum_ptype,
            'map_meta_cap' => true,
        );

        register_post_type( PKForum_ptype, $settings );

    }

    public static function comments_form( $options, $post_type=false ){
        if( $post_type == 'topico' ):
            $options[ 'title_reply' ] = 'Responder tópico';
        endif;
        return $options;
    }

    public static function add_button( $text='Criar um tópico' ){
        if( is_user_logged_in() ):
            $link = get_bloginfo( 'url' ) . '/enviar/' . PKForum_ptype;
        else:
            $link = wp_registration_url();
        endif;
        return '<a href="' . $link . '" class="button send-topic-button" title="'. $text .'">'. $text .'</a>';
    }

    public static function add_files(){
        # Scripts
        wp_register_script( 'topicos-scripts', Piki::url( 'piki-forum.js', __FILE__ ) . '', array('jquery') );
        wp_enqueue_script( 'topicos-scripts' );
    }

    public static function activity_title( $title, $activity ){
        if ( $activity->target->post_type == 'topico' ) {
            $title = 'Criou o tópico <a href="'. get_permalink( $activity->target->ID ) .'">'. $activity->target->post_title .'</a>'; 
        }
        return $title;
    }

}

add_filter( 'activity_title', array( 'PKForum', 'activity_title' ), 10, 2 );
add_filter( 'piki_comments_form', array( 'PKForum', 'comments_form' ), 10, 2 );
add_action( 'template_redirect', array( 'PKForum', 'template_redirect_intercept' ) );
add_action( 'init', array( 'PKForum', 'register_post_type' ), 0 );


# Desinstalação do plugin
register_deactivation_hook( __FILE__, 'topicos_deactivate' );
function topicos_deactivate(){
    $form_id = get_option( 'topicos_fid', false );
    wp_delete_post( $form_id, true );
    delete_option( 'topicos_fid' );
}

# Instalação do plugin
register_activation_hook( __FILE__, 'topicos_activate' );
function topicos_activate(){
    require_once( dirname( __FILE__ ) . '/activate.php' );
}