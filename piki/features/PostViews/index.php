<?php
// Cache time
define( 'POSTVIEWS_CACHE_TIME', 30 );

// Post views
class PostViews {

    // Initing
    public static function pre_get_posts( $query ){
        // Enqueue Script
        if( !is_admin() && $query->is_main_query() && $query->is_single() ):
            add_action( 'wp_enqueue_scripts', array( 'PostViews', 'add_files' ) );
            add_action( 'wp_head', array( 'PostViews', 'head_vars' ), 0 );
        endif;
    }
    
    // Javascript do header
    public static function head_vars(){
        echo "\r\n" . '<script type="text/javascript" data-cfasync="false">PostViewsID="'. get_the_ID() .'";</script>';
    }

    // Contabiliza as visualizações
    public static function checkPostView(){

        global $wpdb;

        // Apenas em páginas de posts
        if( ( !is_page() && !is_single() ) || is_admin() || is_super_admin() || PostViews::isRobot() ):
            return;
        endif;

        // Add view
        PostViews::addView( get_the_ID() );
        
    }

    public static function addView( $post_id ){

        global $wpdb;
                
        // ID do post
        $post = get_post( $post_id );
        if( empty( $post ) ):
            return;
        endif;

        /*
        // Popula tabela de views
        $wpdb->query($wpdb->prepare(
            "INSERT INTO {$wpdb->prefix}views SET post_id = %d, post_type = %s",
            [ $post->ID, $post->post_type ]
        ));
        */

        // Incrementa o campo de views na tabela de posts
        $wpdb->query($wpdb->prepare( 
            "UPDATE $wpdb->posts SET views_count = ( views_count + 1 ) WHERE ID = %d",
            $post->ID
        ));
    
    }

    // Increment post view
    public static function ajaxSetPostView(){

        // Post ID
        $ID = _post( 'post_id' );
        if( empty( $ID ) ) return;
    
        // Add post view
        PostViews::addView( $ID );
        
        Piki::success();
    
    }

    public static function getRizes( $args = [] ){

        global $wpdb;

        // Post types
        $types = _array_get( $args, 'types', [ 'post' ] );
        if( !is_array( $types ) ) $types = [ $types ];

        // Eclude posts by ID
        $out = _array_get( $args, 'out' );
        
        // Total of results
        $total = _array_get( $args, 'total', 6 );

        // Limit time
        $limit_time = _array_get( $args, 'timelimit', '-30 day' );

        // Posts fields
        $post_fields = "DISTINCT(POSTS.ID), POSTS.views_count, POSTS.post_type, POSTS.post_title, POSTS.post_name";
        // Additional posts fields
        $add_fields = _array_get( $args, 'post_fields', [
            'post_content',
            'post_excerpt',
            'post_date',
            'post_modified',
            'post_parent'
        ]);
        if( !empty( $add_fields ) ):
            $post_fields .= ", POSTS." . implode( ', POSTS.', $add_fields );
        endif;

        // WHERE
        $where_query = " WHERE POSTS.post_status = 'publish'";
        // Post type
        $where_rpcs = implode( ',', array_fill( 0, count( $types ), "%s" ) );
        $where_query .= $wpdb->prepare( " AND POSTS.post_type IN({$where_rpcs})", $types );
        // Excluding
        if( !empty( $out ) ):
            $out_rpcs = implode( ',', array_fill( 0, count( $out ), "%d" ) );
            $where_query .= $wpdb->prepare( " AND POSTS.ID NOT IN ({$out_rpcs})", $out );
        endif;
        // Time limit
        if( !empty( $limit_time ) ):
            $time = strtotime( $limit_time );
            $views_where .= $wpdb->prepare( " AND POSTS.post_modified >= %s", date( 'Y-m-d H', $time ) . ':00:00' );
            /*
            $views_where .= $wpdb->prepare( " AND VIEWS.time >= %s", date( 'Y-m-d H', $time ) . ':00:00' );
            */
        else:
            $views_where = '';
        endif;

        // Filter by tax
        $tax = _array_get( $args, 'tax_query' );
        if( $tax  ):

            $terms_ids = [ $tax[ 'value' ] ];

            // Childs
            $childs = get_terms([
                'taxonomy' => $tax[ 'taxonomy' ],
                'fields' => 'tt_ids',
                'child_of' => $tax[ 'value' ],
            ]);
            if( !empty( $childs ) ):
                $terms_ids = array_merge( $terms_ids, $childs );
            endif; 

            $tax_join = "LEFT JOIN $wpdb->term_relationships AS TAXS ON POSTS.ID = TAXS.object_id";
            $tax_group = ", TAXS.term_taxonomy_id";
            $where_query .= $wpdb->prepare(
                " AND TAXS.term_taxonomy_id IN(" . implode( ',', array_fill( 0, count( $terms_ids ), "%d" ) ) . ")",
                $terms_ids
            );

        else:
                
            $tax_join = "";
            $tax_group = "";

        endif;

        // Out key
        if( _array_get( $args, 'filter_out' ) ):
            $where_query .= " AND POSTS.postviews_exclude = 0 ";
        endif;
        
        // Quering
        /*
        $query = "
            SELECT 
                {$post_fields},
                COUNT(VIEWS.post_id) AS views
            FROM {$wpdb->posts} POSTS
            LEFT JOIN {$wpdb->prefix}views AS VIEWS ON POSTS.ID = VIEWS.post_id $views_where
            {$tax_join}
            {$where_query}
            GROUP BY POSTS.ID, VIEWS.post_id {$tax_group}
            ORDER BY COUNT(VIEWS.post_id) DESC, POSTS.post_date DESC
            LIMIT {$total}
        ";
        */
        $query = "
            SELECT {$post_fields}
            FROM {$wpdb->posts} POSTS
            {$tax_join}
            {$where_query} {$views_where}
            GROUP BY POSTS.ID {$tax_group}
            ORDER BY POSTS.views_count DESC, POSTS.post_modified DESC
            LIMIT {$total}
        ";

        // Cache query
        $trans_key = 'pv_rizes_' . md5( $query );
        // Cache get
        $rizes = POSTVIEWS_CACHE_TIME === 0 ? false : get_transient( $trans_key );
        if( $rizes === false ):
        
            $rizes = $wpdb->get_results( $query );
            $rizes = empty( $rizes ) ? [] : $rizes;
        
            set_transient( $trans_key, $rizes, MINUTE_IN_SECONDS * POSTVIEWS_CACHE_TIME );
        
        endif;

        return empty( $rizes ) ? false : $rizes;

    }

    public static function getPostCount( $ID = false ){
        
        global $wpdb;
        
        if( $ID == false ) $ID = get_the_ID();
        $total = $wpdb->get_var($wpdb->prepare(
            "SELECT views_count FROM $wpdb->posts WHERE ID = %d AND post_status NOT IN ( 'inherit', 'auto-draft' )",
            $ID
        ));
        
        return intVal( $total );
    
    }

    // Verifica se o chamador é um robô
    public static function isRobot() {
        
        if ( !isset( $_SERVER[ 'HTTP_USER_AGENT' ] ) || ( isset( $_SERVER[ 'HTTP_USER_AGENT' ] ) && trim( $_SERVER[ 'HTTP_USER_AGENT' ] ) === '' ) ):
            return false;
        endif;
        
        $robots = [
            'bot', 'b0t', 'Acme.Spider', 'Ahoy! The Homepage Finder', 'Alkaline', 'Anthill', 'Walhello appie', 'Arachnophilia', 'Arale', 'Araneo', 'ArchitextSpider', 'Aretha', 'ARIADNE', 'arks', 'AskJeeves', 'ASpider (Associative Spider)', 'ATN Worldwide', 'AURESYS', 'BackRub', 'Bay Spider', 'Big Brother', 'Bjaaland', 'BlackWidow', 'Die Blinde Kuh', 'Bloodhound', 'BSpider', 'CACTVS Chemistry Spider', 'Calif', 'Cassandra', 'Digimarc Marcspider/CGI', 'ChristCrawler.com', 'churl', 'cIeNcIaFiCcIoN.nEt', 'CMC/0.01', 'Collective', 'Combine System', 'Web Core / Roots', 'Cusco', 'CyberSpyder Link Test', 'CydralSpider', 'Desert Realm Spider', 'DeWeb(c) Katalog/Index', 'DienstSpider', 'Digger', 'Direct Hit Grabber', 'DownLoad Express', 'DWCP (Dridus\' Web Cataloging Project)', 'e-collector', 'EbiNess', 'Emacs-w3 Search Engine', 'ananzi', 'esculapio', 'Esther', 'Evliya Celebi', 'FastCrawler', 'Felix IDE', 'Wild Ferret Web Hopper #1, #2, #3', 'FetchRover', 'fido', 'KIT-Fireball', 'Fish search', 'Fouineur', 'Freecrawl', 'FunnelWeb', 'gammaSpider, FocusedCrawler', 'gazz', 'GCreep', 'GetURL', 'Golem', 'Grapnel/0.01 Experiment', 'Griffon', 'Gromit', 'Northern Light Gulliver', 'Harvest', 'havIndex', 'HI (HTML Index) Search', 'Hometown Spider Pro', 'ht://Dig', 'HTMLgobble', 'Hyper-Decontextualizer', 'IBM_Planetwide', 'Popular Iconoclast', 'Ingrid', 'Imagelock', 'IncyWincy', 'Informant', 'Infoseek Sidewinder', 'InfoSpiders', 'Inspector Web', 'IntelliAgent', 'Iron33', 'Israeli-search', 'JavaBee', 'JCrawler', 'Jeeves', 'JumpStation', 'image.kapsi.net', 'Katipo', 'KDD-Explorer', 'Kilroy', 'LabelGrabber', 'larbin', 'legs', 'Link Validator', 'LinkScan', 'LinkWalker', 'Lockon', 'logo.gif Crawler', 'Lycos', 'Mac WWWWorm', 'Magpie', 'marvin/infoseek', 'Mattie', 'MediaFox', 'MerzScope', 'NEC-MeshExplorer', 'MindCrawler', 'mnoGoSearch search engine software', 'moget', 'MOMspider', 'Monster', 'Motor', 'Muncher', 'Muninn', 'Muscat Ferret', 'Mwd.Search', 'Internet Shinchakubin', 'NDSpider', 'Nederland.zoek', 'NetCarta WebMap Engine', 'NetMechanic', 'NetScoop', 'newscan-online', 'NHSE Web Forager', 'Nomad', 'nzexplorer', 'ObjectsSearch', 'Occam', 'HKU WWW Octopus', 'OntoSpider', 'Openfind data gatherer', 'Orb Search', 'Pack Rat', 'PageBoy', 'ParaSite', 'Patric', 'pegasus', 'The Peregrinator', 'PerlCrawler 1.0', 'Phantom', 'PhpDig', 'PiltdownMan', 'Pioneer', 'html_analyzer', 'Portal Juice Spider', 'PGP Key Agent', 'PlumtreeWebAccessor', 'Poppi', 'PortalB Spider', 'GetterroboPlus Puu', 'Raven Search', 'RBSE Spider', 'RoadHouse Crawling System', 'ComputingSite Robi/1.0', 'RoboCrawl Spider', 'RoboFox', 'Robozilla', 'RuLeS', 'Scooter', 'Sleek', 'Search.Aus-AU.COM', 'SearchProcess', 'Senrigan', 'SG-Scout', 'ShagSeeker', 'Shai\'Hulud', 'Sift', 'Site Valet', 'SiteTech-Rover', 'Skymob.com', 'SLCrawler', 'Inktomi Slurp', 'Smart Spider', 'Snooper', 'Spanner', 'Speedy Spider', 'spider_monkey', 'Spiderline Crawler', 'SpiderMan', 'SpiderView(tm)', 'Site Searcher', 'Suke', 'suntek search engine', 'Sven', 'Sygol', 'TACH Black Widow', 'Tarantula', 'tarspider', 'Templeton', 'TeomaTechnologies', 'TITAN', 'TitIn', 'TLSpider', 'UCSD Crawl', 'UdmSearch', 'URL Check', 'URL Spider Pro', 'Valkyrie', 'Verticrawl', 'Victoria', 'vision-search', 'Voyager', 'W3M2', 'WallPaper (alias crawlpaper)', 'the World Wide Web Wanderer', 'w@pSpider by wap4.com', 'WebBandit Web Spider', 'WebCatcher', 'WebCopy', 'webfetcher', 'Webinator', 'weblayers', 'WebLinker', 'WebMirror', 'The Web Moose', 'WebQuest', 'Digimarc MarcSpider', 'WebReaper', 'webs', 'Websnarf', 'WebSpider', 'WebVac', 'webwalk', 'WebWalker', 'WebWatch', 'Wget', 'whatUseek Winona', 'Wired Digital', 'Weblog Monitor', 'w3mir', 'WebStolperer', 'The Web Wombat', 'The World Wide Web Worm', 'WWWC Ver 0.2.5', 'WebZinger', 'XGET'
        ];
    
        foreach( $robots as $robot ):
            if ( stripos( $_SERVER[ 'HTTP_USER_AGENT' ], $robot ) !== false ):
                return true;
            endif;
        endforeach;
    
        return false;
    
    }

    // Exclude field
    public static function excludeField( &$fields, $opts = [] ){

        $label = _array_get( $opts, 'label', 'Excluir dos blocos de posts mais vistos' );
        $fields[ 'postviews_exclude' ] = [
            'machine_name' => 'postviews_exclude',
            'ftype' => 'boolean',
            'label' => $label,
            'save_in_posts_table' => true,
        ];

    }

    // Enqueue Script
    public static function add_files(){
        wp_enqueue_script( 'postviews-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
    }
    
}
// Init
add_action( 'pre_get_posts', [ 'PostViews', 'pre_get_posts' ] );
// Contabiliza as visualizações
add_action( 'wp', [ 'PostViews', 'checkPostView' ] );
// Counter by ajax
add_action( 'wp_ajax_post_view_add', [ 'PostViews', 'ajaxSetPostView' ] );
add_action( 'wp_ajax_nopriv_post_view_add', [ 'PostViews', 'ajaxSetPostView' ] );