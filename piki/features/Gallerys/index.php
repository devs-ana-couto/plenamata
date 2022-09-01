<?php
/*
    Plugin Name: Piki Gallerys
    Description: Galerias de imagens
    Version: 0.1
    Author: Thiago Borges (Piki)
    Author URI: http://pikiweb.com.br
    Author Email: thiago@pikiweb.com.br
*/

define( 'Gallery_ptype', 'pikigallery' );

class Gallery {

    public static function init() {
        self::register_post_type();
        add_shortcode( 'gallery', array(  'Gallery', 'shortcode' ) );
    }

    public static function register_post_type(){
        
        # Tipo de post
        $labels = array(
            'name'              => __( 'Galerias', 'piki' ),
            'singular_name'     => __( 'Galeria', 'piki' ),
            'add_new'           => __( 'Adicionar nova', 'piki' ),
            'add_new_item'      => __( 'Adicionar nova Galeria', 'piki' ),
            'edit_item'         => __( 'Editar Galeria', 'piki' ),
            'new_item'          => __( 'Nova Galeria', 'piki' ),
            'view_item'         => __( 'Ver Galeria', 'piki' ),
            'search_items'      => __( 'Busacar Galerias', 'piki' ),
            'not_found'         =>  __( 'Nada encontrado', 'piki' ),
            'not_found_in_trash'=> __( 'Nada encontrado na lixeira', 'piki' ),
            'parent_item_colon' => __(' Parent item colon', 'piki' ),
        );      
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'galerias' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'supports'              => array( 'title', 'thumbnail' ),
            'show_in_menu'          => true,
            'menu_position'      => 5,
            'menu_icon'             => Piki::url( 'images/menu-icon.png', __FILE__ ),
        );
        register_post_type( Gallery_ptype, $args );

    }

    # Campos do formulário
   public static function register_fields( $meta_boxes ){

        $meta_boxes[] = array(
            'id'         => 'extras',
            'title'      => 'Galeria',
            'post_types'      => array( Gallery_ptype ),
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Descrição da galeria',
                    'machine_name' => 'description',
                    'ftype' => 'textarea',
                ),
                array(
                    'label' => 'Imagens',
                    'machine_name' => 'images',
                    'ftype' => 'imagewp',
                    'gallery' => 'on'
                ),
            ),
        );

        return $meta_boxes;

    }

}

# Init
add_action( 'init', array( 'Gallery', 'init' ) );
# Campos
//add_action( 'pkmeta_register_fields', array( 'Gallery', 'register_fields' ) );
