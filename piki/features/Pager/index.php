<?php
// Paginação
class Pager {

    public static function show( $object = false, $options = array() ){
        
        global $wp_query;

        $defaults = [
            'type' => 'modern',
            'load_label' => false, 
            'target' => '#content', 
            'list' => '.list-items',
            'item' => 'li',
            'onscroll' => false, 
            'randomize' => false,
            'pager_key' => false,
            'max_results' => false,
            'print' => true,
        ];
        extract(array_merge( $defaults, $options ));

        // Se o objeto não é informado, fazemos a paginação para a query mãe
        if( !!$object ):
            $saved_query = $wp_query;
            $wp_query = $object;
        endif;

        // Paginação atual
        $paged = $wp_query->get( 'paged' );
        if( empty( $paged ) ) $paged = 1;
        
        // Se existe uma home para a listagem
        $with_home = isset( $wp_query->with_home ) ? $wp_query->with_home : false;
        
        // Se estamos na home da listagem
        $is_home = isset( $wp_query->home_contents ) ? $wp_query->home_contents : false;
        
        // Se não temos paginação a mostrar
        if( ( $wp_query->max_num_pages < 2 && !$is_home ) || $wp_query->found_posts == 0 ):
            return '';
        endif;

        // Label
        $label = !$load_label ? __( 'See more', 'piki' )  : $load_label;

        if( !$print ) ob_start();

        if( $type == 'default' ):

            $pagerurl = str_replace( '/2', '/[index]', get_pagenum_link(2) ); ?>
            <div class="piki-pager default" role="navigation" data-type="<?php echo $type; ?>" data-pages="<?php echo $wp_query->max_num_pages; ?>" data-total="<?php echo $wp_query->found_posts; ?>" data-per-page="<?php echo $wp_query->get( 'posts_per_page' ); ?>" data-source="<?php echo $pagerurl; ?>" data-target="<?php echo $target; ?>" data-list="<?php echo $list; ?>" data-item="<?php echo $item; ?>" data-randomize="<?php var_export( $randomize ); ?>"></div><?php

        else: ?>

            <nav class="piki-pager modern" role="navigation" data-type="<?php echo $type; ?>" data-onscroll="<?php var_export( $onscroll ); ?>" data-target="<?php echo $target; ?>" data-list="<?php echo $list; ?>" data-item="<?php echo $item; ?>" data-randomize="<?php var_export( $randomize ); ?>" data-max-results="<?php echo( empty( $max_results ) ? 'false' : $max_results ); ?>">

                <strong class="screen-reader-text"><?php echo __( 'Navigation', 'piki' ); ?></strong>
               
                <?php if( $paged > 1 ): ?>
                <div class="nav-previous"><a href="<?php echo get_pagenum_link( $paged - 1 ); ?>" class="button cor3 size3"><?php echo __( 'Previous', 'piki' ); ?></a></div>
                <?php endif; ?>
                
                <?php 
                if( $paged < $wp_query->max_num_pages || $is_home ):
                    $real_paged = $paged + 1;
                    if( $with_home ) $real_paged++;
                    $next_url = get_pagenum_link( $real_paged );
                    if( !!$pager_key ):
                        $next_url .= ( strpos( $next_url, '?' ) !== false  ? '&' : '?' ) . 'target=' . $target;
                    endif;
                    ?>
                    <div class="nav-next">
                        <a href="<?php echo $next_url; ?>" class="button small" ajax-label="<?php echo $label; ?>">
                            <span><?php echo $label; ?></span>
                            <i></i>
                        </a>
                    </div>
                    <?php 
                endif; 
                ?>

            </nav>

        <?php endif; ?>

        <?php
        self::add_files();

        if( !!$object ):
            $wp_query = $saved_query;
            unset( $saved_query );
        endif;

        if( !$print ):
            $content = ob_get_contents();
            ob_clean();
            return $content;
        endif;
        
    }

    public static function add_files(){

        Piki::add_library( 'pagination' );

        wp_enqueue_script( 'piki-pager-scripts', Piki::minified( '/scripts.js' , __FILE__ ), [ 'jquery' ], false, true );
        wp_enqueue_style( 'piki-pager-styles', Piki::url( '/styles.css', __FILE__ ) );
    
    }

}
