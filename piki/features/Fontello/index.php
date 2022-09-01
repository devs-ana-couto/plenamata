<?php
class Fontello {

    function __construct(){
        add_filter( 'wp_nav_menu' , array( $this, 'menu' ), 10, 2 );
    }

    function menu( $nav ){
        $menu_item = preg_replace_callback(
            '/(<li[^>]+class=")([^"]+)("?[^>]+>[^>]+>)([^<]+)<\/a>/',
            array( $this, 'replace' ),
            $nav
        );
        return $menu_item;
    }

    function replace( $a ){
        $start = $a[ 1 ];
        $classes = $a[ 2 ];
        $rest = $a[ 3 ];
        $text = $a[ 4 ];
        $before = true;
        $class_array = explode( ' ', $classes );
        $pikiicon_classes = array();
        foreach( $class_array as $key => $val ){
            if( 'icon' == substr( $val, 0, 4 ) ){
                if( 'icon' == $val ){
                    unset( $class_array[ $key ] );
                } elseif( 'icon-after' == $val ){
                    $before = false;
                    unset( $class_array[ $key ] );
                } else {
                    $pikiicon_classes[] = $val;
                    unset( $class_array[ $key ] );
                }
            }
        }
        if( !empty( $pikiicon_classes ) ){
            $pikiicon_classes[] = 'icon';
            if( $before ){
                $text = ' '.$text;
                $newtext = '<i class="'.implode( ' ', $pikiicon_classes ).'"></i><span class="pikiicon-text">'.$text.'</span>';
            } else {
                $text = $text.' ';
                $newtext = '<span class="icon-text">'.$text.'</span><i class="'.trim( implode( ' ', $pikiicon_classes ) ).'"></i>';
            }
        } else {
            $newtext = $text;
        }
        
        $item = $start.implode( ' ', $class_array ).$rest.$newtext.'</a>';
        return $item;
    }

    public static function enqueue_scripts(){
        wp_enqueue_style( 'fontello-styles', Piki::url( 'css/fontello.css', __FILE__ ) );
    }

}
$fontello = new Fontello();
add_action( 'wp_enqueue_scripts', array( 'Fontello', 'enqueue_scripts' ) );

# Modifyin menu
class Fontello_Walker_Nav_Menu extends Walker {

    public $tree_type = array( 'post_type', 'taxonomy', 'custom' );

    public $db_fields = array( 'parent' => 'menu_item_parent', 'id' => 'db_id' );

    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<div class=\"sub-menu\"><ul>\n";
    }

    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul></div>\n";
    }

    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names .'>';

        $atts = array();
        $atts[ 'title' ]  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts[ 'target' ] = ! empty( $item->target )     ? $item->target     : '';
        $atts[ 'rel' ]    = ! empty( $item->xfn )        ? $item->xfn        : '';
        $atts[ 'href' ]   = ! empty( $item->url )        ? $item->url        : '';
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ):
            if ( ! empty( $value ) ):
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            endif;
        endforeach;

        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    public function end_el( &$output, $item, $depth = 0, $args = array() ) {
        $output .= "</li>\n";
    }

}