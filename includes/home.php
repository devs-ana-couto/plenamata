<?php
class Home {

    STATIC $defaultBlocks = [ 'campanhas-home', 'historias-reais', 'convite-hashtag', 'noticias-home', 'webstories-home', 'quem-somos-home', 'bloco-coringa', 'footer-buttons' ];

    public static function getBlocks(){

        // Meta
        $meta = new PostMeta();

        // Ordereds blocks
        $blocos = Home::getBlocksList();        
        foreach( $blocos as $template ):
            get_template_part( 'components/' . $template, null, [ 'meta' => $meta ] );
        endforeach;

    }

    public static function getBlocksList(){
        $actual_order = get_option( 'home_order__order' );
        return empty( $actual_order ) ? Home::$defaultBlocks : $actual_order;
    }

    public static function ajaxSaveOrder(){

        $sent = _post( 'sentido' );
        $block_key = _post( 'block_key' );

        if( !$sent || !$block_key ) die( 'Ops! Algo deu errado.' );

        $actual_order = get_option( 'home_order__order' );
        if( empty( $actual_order ) ):
            $actual_order = Home::$defaultBlocks;
        endif;

        $actual_key = array_search( $block_key, $actual_order );
        if( $actual_key === false ) die( 'Ops! Algo deu errado.' );

        $new_key = $sent == 'down' ? $actual_key+1 : $actual_key-1;

        unset( $actual_order[ $actual_key ] );

        $new_order = array_merge(
            array_slice( $actual_order, 0, $new_key ),
            [ $block_key ],
            array_slice( $actual_order, $new_key )
        );

        update_option( 'home_order__order', $new_order );

        Piki::success();

    }

}
add_action( 'wp_ajax_home_save_order', [ 'Home', 'ajaxSaveOrder' ] );
