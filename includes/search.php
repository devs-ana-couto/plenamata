<?php
class Search {

    static $dateLimit;

    function __construct(){
        add_action( 'pre_get_posts', [ $this, 'filter' ] );
    }

    public static function getTotalResults(){
        global $wp_query;
        return $wp_query->found_posts;
    }

    public function filter( &$query ){

        if( !is_admin() && $query->is_main_query() && $query->is_search() ):

            $keyword = _get( 's' );

            // Order filter
            add_filter( 'posts_orderby', [ 'Search', 'setOrder' ], 10, 2 );

            // Post type
            if( $keyword  ):
                $query->set( 'post_type', 'post' );
            else:
                $query->set( 'post_type', 'noposttypetosearch' );
            endif;

            // Editoria
            $editoria = _get( 'editoria' );
            if( $editoria ):
                $query->set( 
                    'tax_query',
                    [
                        [
                            'taxonomy' => 'category',
                            'field' => 'slug',
                            'terms' => $editoria,
                        ]
                    ]
                );                
            endif;

            // Período
            $periodo = _get( 'periodo' );
            if( $periodo ):

                switch( $periodo ):
                    case 'ultima-hora':
                        $time = strtotime( '-1 hour' );
                    break;
                    case 'ultimas-24-horas':
                        $time = strtotime( '-1 day' );
                    break;
                    case 'ultima-semana':
                        $time = strtotime( '-1 week' );
                    break;
                    case 'ultimo-mes':
                        $time = strtotime( '-1 month' );
                    break;
                    case 'ultimo-ano':
                        $time = strtotime( '-1 year' );
                    default:
                    break;
                endswitch;

                $limit = date( 'Y-m-d H:i:s', $time );
                $query->set( 
                    'date_query', 
                    [
                        [
                            'after' => date( 'Y-m-d H:i:s', $time )
                        ]
                    ] 
                );

            endif;

        endif;

    }

    public static function setOrder( $orderby, $query ){

        global $wpdb;

        // Order
        $order = _get( 'ordenar-por' );
        if( !$order ):
            $orderby = $wpdb->posts . '.views_count DESC';
        endif;

        return $orderby;

    }

    public static function getOrder(){ ?>
    
        <div class="field order">
            <label><?php _e( 'Ordenar por:', 'amazonia' ); ?></label>
            <span class="field-wrapper"><?php 
                echo plenamata_get_dropradios([
                    'id' => 'ordenar-por', 
                    'options' => [
                        '' => __( 'Mais relevantes', 'amazonia' ),
                        'mais-recentes' => __( 'Mais recentes', 'amazonia' ),
                    ], 
                    'value' => _get( 'ordenar-por', '' ),
                    'placeholder' => __( 'Mais relevantes', 'amazonia' ),
                    'force_filled' => true,
                    'toggle_class' => 'inline',
                ]); ?>
            </span>
        </div><?php
    
    }

    public static function getFilters(){

        // Editoria options
        $editoria_options = array_merge( 
            [ '' => __( 'Todas as editorias', 'amazonia' ) ],
            Posts::editoriaOptions()
        );

        $keyword = _get( 's' );

        // HTML ?>

        <fieldset class="search <?php echo( $keyword ? 'filled' : 'empty' ); ?>">
            <input type="text" name="s" value="<?php echo _get( 's', '' ); ?>" placeholder="<?php _e( 'Buscar', 'amazonia' ); ?>...">
            <button type="button" class="clear" data-action="clear" title="<?php _e( 'Limpar', 'amazonia' ); ?>"></button>
            <button type="submit" class="lupa-esq" <?php echo( !$keyword ? 'disabled="disabled"' : '' ); ?>><strong><?php _e( 'Buscar', 'amazonia' ); ?></strong></button>
        </fieldset>
        <fieldset class="filters" style="<?php echo( !$keyword ? 'style="display:none"' : '' ); ?>">
            <em>Filtros</em>
            <div class="field periodo"><?php 
                echo plenamata_get_dropradios([
                    'id' => 'periodo',
                    'options' => [
                        '' => __( 'Todos os períodos', 'amazonia' ),
                        'ultima-hora' => __( 'Última hora', 'amazonia' ),
                        'ultimas-24-horas' => __( 'Últimas 24 horas', 'amazonia' ),
                        'ultima-semana' => __( 'Última semana', 'amazonia' ),
                        'ultimo-mes' => __( 'Último mês', 'amazonia' ),
                        'ultimo-ano' => __( 'Último ano', 'amazonia' ),
                    ], 
                    'value' => _get( 'periodo', '' ),
                    'placeholder' => __( 'Período', 'amazonia' ),
                    'toggle_class' => 'ico-calendar color--2',
                ]); ?>
            </div>
            <div class="field editoria"><?php 
                echo plenamata_get_dropradios([
                    'id' => 'editoria', 
                    'options' => $editoria_options, 
                    'value' => _get( 'editoria', '' ),
                    'placeholder' => __( 'Editorial' , 'amazonia' ),
                    'toggle_class' => 'ico-unordered color--2',
                ]); ?>
            </div>
        </fieldset><?php

    }

}
$Search = new Search();