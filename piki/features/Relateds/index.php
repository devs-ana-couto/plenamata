<?php
class Relateds {
    
    function __construct( $options = [] ){

        global $post;

        add_action( 'init', [ 'Relateds', 'init' ] );
        
    }

    public static function init(){
        add_shortcode( 'relateds', array(  'Relateds', 'shortcode' ) );
    }

    public static function shortcode( $atts ){

        global $post;

        // Opções
        $options = shortcode_atts( [
            'taxonomy' => 'post_tag',
            'title' => 'Veja também:',
            'more_button' => false,
            'more_button_label' => 'Ver todos',
            'more_button_position' => 'footer', // footer, header
            'template' => false,
            'total' => 6,
            'meta_query' => false,
            'orderby' => false,
            'order' => 'DESC'
        ], $atts );

        // Post
        if( isset( $options[ 'post' ] ) ):
            $post = $options[ 'post' ];
        endif;

        // Taxonomy
        $taxonomy = _array_get( $options, 'taxonomy', 'category' );
        
        // Total
        $total = _array_get( $options, 'total', 3 );

        $template = _array_get( $options, 'template', 'relateds' );

        $args = array(
            'post_type'         => $post->post_type,
            'post__not_in'      => [ $post->ID ],
            'post_status'       => 'publish',
            'orderby'           => 'post_date',
            'order'             => 'DESC',
            'posts_per_page'    => $total,
        );
       
        // Taxonomy
        if( $taxonomy && taxonomy_exists( $taxonomy ) ):
            
            $terms = wp_get_post_terms( $post->ID, $taxonomy );

            if( !empty( $terms ) ):
                
                $slugs = [];
                
                foreach ( $terms as $key => $term ):
                    $slugs[] = $term->slug;
                endforeach;
                
                $args[ 'tax_query' ] = [
                    [
                        'taxonomy' => $taxonomy,
                        'field' => 'slug',
                        'terms' => $slugs,
                    ],
                ];

            endif;

        endif;

        // Do search
        query_posts( $args );

        // If have relateds
        if( have_posts() ):
            get_template_part( $template, null, $options );
        endif;

        // Reset
        wp_reset_query();
        wp_reset_postdata();

    }

    public function write_html(){ ?>

        <div id="conteudo-relacionado" class="widget">
           
            <header>
                <h2 class="widget-title"><?php echo $this->title; ?></h2><?php 
                if( $this->more_button && $this->more_button_position == 'header' ):
                    $this->moreButton();
                endif; ?>
            </header>
       
            <div class="list-items zebra"><?php

                $cont = 0;
                while( have_posts() ): the_post(); ?>
                <a href="<?php the_permalink(); ?>" class="item <?php echo ($cont%2?'even':'odd'); ?>" title="<?php the_title(); ?>">
                    <span class="title"><?php the_title(); ?></span>
                </a>
                <?php 
                $cont++;
                endwhile; ?>

            </div><?php 

            // More button
            if( $this->more_button && $this->more_button_position == 'footer' ):
                $this->moreButton();
            endif; ?>
        
        </div><?php

    }

    public function moreButton(){
        return '<a href="' . get_post_type_archive_link( $this->post->post_type ) . '" class="button full" title="' . $this->more_button_label . '">' . $this->more_button_label . '</a>';
    }

}
$Relateds = new Relateds();
