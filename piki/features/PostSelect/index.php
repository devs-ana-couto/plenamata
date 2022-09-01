<?php
class PostSelect {

    static $PerPage = 25;

    function __construct(){

        // Ajax
        add_action( 'wp_ajax_post_select_list', [ $this, 'getSelection' ] );
        add_action( 'wp_ajax_post_select_items', [ $this, 'getItems' ] );

        // Scripts and Styles
        if( is_admin() ):
            add_action( 'admin_enqueue_scripts', [ $this, 'add_files' ] );
        endif;

    }

    public static function getSelection(){

        global $wpdb;

        // Post types
        $post_types = explode( ',', _post( 'post_types' ) );
        // Parent ID
        $parent_id = _post( 'parent_id' );
        // Actuals
        $actual_ids = _post( 'actual_ids' );
        // Posts out
        $posts_out = _post( 'posts_out' );
        // Group
        $group = _post( 'group' );
        // Group
        $template = _post( 'template' );
        // Pager
        $paged = _post( 'page', 1 );

        // Query total
        $ptyps_rpces = implode( ',', array_fill( 0, count( $post_types ), '%d' ) );
        $query = "SELECT count(0) FROM {$wpdb->posts} P WHERE P.post_type IN( $ptyps_rpces ) AND P.post_status = 'publish'";

        // Values
        $vals = explode( ',', $ptyps_rpces );

        // Removing
        if( !empty( $posts_out ) ):

            $out_rpcs = implode( ',', array_fill( 0, count( $posts_out ), "%s" ) );
            $query .= " AND P.ID NOT IN($out_rpcs)";

            $vals = array_merge( $vals, $posts_out );
   
        endif;

        $query .= " ORDER BY post_date DESC";

        // Total de ítems
        $total = $wpdb->get_var($wpdb->prepare( $query, $vals ));

        $pager_id = md5(uniqid(rand(), true));

        // Ítems
        $items = PostSelect::getItems([
            'post_types' => $post_types,
            // Parent ID
            'parent_id' => $parent_id,
            // Actuals
            'actual_ids' => $actual_ids,
            // Posts out
            'posts_out' => $posts_out,
            // Pager
            'paged' => $paged,
            // Group
            'group' => $group,
            // Pager
            'template' => $template,
        ]);
        
        $HTML = '
        <div class="posts-select-selection" data-items-per-page="' . PostSelect::$PerPage . '" data-total-items="' . ( $items ? $items[ 'total_items' ] : '0' ) . '" data-next-page="">
            <header>
                <form>
                    <fieldset>
                        <div><input type="text" name="palavra-chave" id="palavra-chave" placeholder="Buscar por palavra-chave"></div>
                    </fieldset> 
                    <button type="button" class="button button-primary" data-action="do-filter">Filtrar</button>
                </form>
            </header>
            <ul class="posts-list">'. ( $items ? $items[ 'content' ] : 'Nenhum post encontrado' ) .'</ul>
            <footer>
                <button type="button" data-action="do-select" class="button button-primary add" title="Selecionar" disabled="disabled">Selecionar</button>
            </footer>
        </div>
        ';

        echo $HTML;
        exit();

    }

    public function getItems( $settings = false ){

        $ajax = false;

        if( empty( $settings ) ):

            $ajax = true;

            $settings = [
                // Post types
                'post_types' => _post( 'post_types' ),
                // Parent ID
                'parent_id' => _post( 'parent_id' ),
                // Actuals
                'actual_ids' => _post( 'actual_ids' ),
                // Posts out
                'posts_out' => _post( 'posts_out' ),
                // Filters
                'filters' => _post( 'filters' ),
                // Group
                'group' => _post( 'group' ),
                // Template
                'template' => _post( 'template' ),
                // Pager
                'paged' => _post( 'page', 1 ),
            ];            

        endif;

        // Extract settings
        extract( $settings );

        // IDs
        if( $actual_ids ):
            $actual_ids = explode( ',', $actual_ids );
        endif;

        // Arguments
        $query = array(
            'post_type' => $post_types,
            'post_status' => 'publish',
            'posts_per_page' => PostSelect::$PerPage,
            'orderby' => 'post_date',
            'order' => 'DESC',
            'paged' => $paged
        );

        // Removing
        if( !empty( $posts_out ) ):
            $query[ 'post__not_in' ] = $posts_out;
        endif;

        // Filters
        PostSelect::applyFilters( $settings, $query );

        // Others plugins
        $query = apply_filters( 'post_select_query', $query, $settings );

        // Query posts
        $posts = new WP_Query( $query );
        if( !$posts->have_posts() ):
            if( $settings ):
                return false;
            else:
                Piki::success(array(
                    'content' => false
                ));
            endif;
        endif;

        $HTML = '';
        foreach( $posts->posts as $post ):

            $cover = Piki::get_cover( $post->ID );
            
            $id = 'post-select-item-' . $post->ID;
            
            $HTML .= '<li data-id="'. $post->ID .'"><input type="radio" name="post-select" id="'. $id .'" value="'. $post->ID .'"' . ( $actual_ids && in_array( $post->ID, $actual_ids ) ? ' checked="checked"' : '' ) . '><label for="' . $id . '">'. ( !$cover ? '' : '<span style="background-image:url('. $cover .');"></span>' ) .'<strong class="title">'. $post->post_title .'</strong></label></li>';
        
        endforeach;

        $return = array(
            'total_items' => $posts->found_posts,
            'content' => $HTML
        );

        if( $ajax ):
            Piki::success( $return );
        else:
            return $return;
        endif;

    }

    public static function getItemFields( $args ){

        $name = _array_get( $args, 'name' );
        $values = _array_get( $args, 'values' );
        $parent_id = _array_get( $args, 'parent_id' );
        $labels = _array_get( $args, 'labels' );
        $label_ini = empty( $values ) ? $labels[ 'select' ] : $labels[ 'replace' ];
        $group = _array_get( $args, 'group' );
        $attr = _array_get( $args, 'attr', '' );

        $post_type = _array_get( $args, 'post_type' );
        if( !is_array( $post_type ) ):
            $post_type = [ $post_type ];
        endif;

        return '
        <input 
            type="hidden" 
            data-group="post-select" 
            name="'. $name .'" 
            value="'. ( empty( $values ) ? '' : implode( ',', $values ) ) .'"
        >
        <button 
            type="button" 
            class="button" 
            title="'. $label_ini .'"
            data-action="post-select-open" 
            data-group="'. $group .'" 
            data-post-types="'. implode( ',', $post_type ) .'" 
            data-post-parent="'. $parent_id .'" 
            data-label-select="'. $labels[ 'select' ] .'" 
            data-label-replace="'. $labels[ 'replace' ] .'" ' .
            $attr .'
        ><span class="dashicons dashicons-admin-post"></span></button>';

    }

    // Apply filters
    public static function applyFilters( $settings, &$query ){
        
        $filters = _post( 'filters' );

        // Keyword
        $keyword = _array_get( $filters, 'palavra-chave' );
        if( $keyword ):
            $query[ 's' ] = $keyword;
        endif;
        
    }

    // Arquivos
    public static function add_files(){
        Piki::add_library( 'modal' );
        Piki::add_library( 'pagination' );
        wp_enqueue_script( 'post-select-scripts', Piki::url( 'scripts.js', __FILE__ ) );
        wp_enqueue_style( 'post-select-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

}
$PostSelect = new PostSelect();
