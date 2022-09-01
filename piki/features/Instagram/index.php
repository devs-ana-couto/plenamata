<?php
/*
	Plugin Name: Instagram
	Description: Busca imagens no instagram baseados em uma #hashtag
	Version: 0.1
	Author: Thiago Borges (Piki)
	Author URI: http://pikiweb.com.br
	Author Email: thiago@pikiweb.com.br
*/

define( 'INSTAGRAM_CACHE_TABLE', 'instagram_cache' );
define( 'INSTAGRAM_CONTENT_TABLE', 'instagram_content' );

class PKInstagram {

    private $options;
    private $images;
    private $api_host = 'https://api.instagram.com';

    # Init
    public static function init(){
        $i = new PKInstagram();
        add_shortcode( 'instagram', array(  $i, 'shortcode' ) );
    }

    # Para banner
    public function get_for_banner( $total, $width=300, $height=300 ){

        global $wpdb;
        $this->options = get_option( 'instagram_options' );
        $image = $wpdb->get_row($wpdb->prepare( "SELECT * FROM $wpdb->prefix" . INSTAGRAM_CONTENT_TABLE . " WHERE hashtag = '%s' AND status = '2' ORDER BY RAND() LIMIT 1", $this->options[ 'hashtag' ] ) );
        if( empty( $image ) ):
            return false;
        endif;
        $info = json_decode( $image->content );
        return '<img src="'. Piki::image_resize( $width, $height, $info->images->standard_resolution->url ) .'" />';
    }

    # Para listagem
    public function get_for_list( $width=239, $height=239 ){
        global $wpdb;

        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        $post_per_page = intval(get_query_var('posts_per_page'));
        $offset = ($paged - 1)*$post_per_page;

        $where = "WHERE hashtag = '%s' AND status = '2'";
        
        $this->options = get_option( 'instagram_options' );
        $images = $wpdb->get_results($wpdb->prepare( "SELECT * FROM $wpdb->prefix" . INSTAGRAM_CONTENT_TABLE . " $where ORDER BY id DESC LIMIT " . $offset . ", " . $post_per_page, $this->options[ 'hashtag' ] ) );
        if( !$images || empty( $images ) ):
            return '<h2>Nenhuma imagem postada com a hashtag #' . $this->options[ 'hashtag' ] . '</h2>';
        endif;

        $sql_posts_total = $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM $wpdb->prefix" . INSTAGRAM_CONTENT_TABLE . " $where", $this->options[ 'hashtag' ] ));
        $max_num_pages = ceil( $sql_posts_total / $post_per_page );

        echo '<div id="content">';
        echo '  <div class="instagram-page-list list-items clearfix">';
        foreach ( $images as $key => $image ):
            $info = json_decode( $image->content );
            echo '<a href="'. $info->images->standard_resolution->url .'" target="_blank"><img src="' . Piki::image_resize( $width, $height, $info->images->standard_resolution->url ) . '" width="239" height="239" /></a>';
        endforeach;
        echo '  </div>';

        if( $max_num_pages > 1 ):
            echo '<div class="piki-ajaax-nav">';
            echo paginate_links(array(
                'base' => add_query_arg( 'paged', '%#%' ),
                'format' => '',
                'prev_text' => __('&laquo;'),
                'next_text' => __('&raquo;'),
                'total' => $max_num_pages,
                'current' => $paged
            ));
            echo '</div>';
        endif;

        echo '</div>';

    }

    # Shortcode
    public function shortcode( $atts ) {
        extract( shortcode_atts( array(
            'total' => false,
            'type' => 'banner',
            'width' => false,
            'height' => false,
        ), $atts ) );

        # Tipo de listagem
        $type = !isset( $atts[ 'type' ] ) ? 'banner' : 'list';
        # Tamanho horizontal
        $width = !isset( $atts[ 'width' ] ) ? 280 : $atts[ 'width' ];
        # Tamanho vertica
        $height = !isset( $atts[ 'height' ] ) ? $width : $atts[ 'height' ];
        if( $type == 'banner' ):
            $total = !isset( $atts[ 'total' ] ) || $atts[ 'total' ] == '' || $atts[ 'total' ] == 0 ? 5 : $atts[ 'count' ];
            return $this->get_for_banner( $total, $width, $height );
        else:
            return $this->get_for_list();
        endif;
    }

    # Busca por hashtag
    public function get_by_rashtag( $next_id=false ){
        # Opções
        $this->options = get_option( 'instagram_options' );
        # URL
        $url = $this->api_host . '/v1/tags/'. $this->options[ 'hashtag' ] .'/media/recent?client_id=' . $this->options[ 'app_id' ];
        # Paginação
        if( $next_id ):
            $url .= '&max_tag_id=' . $next_id;
        endif;
        # Chama a API
        $photos = $this->call_instagram( $url );
        if( !isset( $photos->data ) || empty( $photos->data ) ):
            return false;
        endif;
        return $photos;
    }

    # Chamada ao instagram
    public function call_instagram( $url, $cache=30 ){

        global $wpdb;

        # Chave do cache
        $cache_key = md5( $url );
        # Tbela de cache
        $cache_table = $wpdb->prefix . INSTAGRAM_CACHE_TABLE;
        # Timestamp atual
        $current_time = current_time( 'timestamp' );
        # Tempo do cache
        if( (int)$cache < 1 ):
            $cache_time = 5*60;
        else:
            $cache_time = $cache*60;
        endif;

        //$cached = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $cache_table WHERE chave = '%s'", $cache_key ) );
        $cached = NULL;

        if( is_null( $cached ) || $current_time > ( $cached->time + $cache_time ) ):
            # Remove o registro, se existir
            $wpdb->delete( $cache_table, array( 'chave' => $cache_key ) );

            # Faz a requisição no PKInstagram
            $ch = curl_init();
            curl_setopt_array( $ch, array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => 2
            ) );
            $result = curl_exec( $ch );
            curl_close( $ch );

            /*
            echo '<pre>';
            var_dump( json_decode( $result ) );
            exit;
            */

            # Insere o resultado no banco
            $wpdb->insert( 
                $cache_table, 
                array( 'chave' => $cache_key, 'content' => $result, 'time' => $current_time ), 
                array( '%s', '%s', '%s' ) 
            );
            $content = json_decode( $result );
        else:
            $content = json_decode( $cached->content );        
        endif;
        return $content;
    }

    public static function clear_cache(){
        global $wpdb;
        $truncate = $wpdb->query( "DELETE FROM $wpdb->prefix" . INSTAGRAM_CACHE_TABLE );
        echo Piki::return_json(array(
            'status' => !!$truncate
        ));        
    }

}
add_action( 'init' , array( 'PKInstagram', 'init' ) );

class InstagramSettingsPage {
   
    private $options;
    private $images;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }
    # Add options page
    public function add_plugin_page() {

        $this->options = get_option( 'instagram_options' );
        $images_options = get_option( 'instagram_images' );
        $this->images = isset( $images_options[ 'imagens' ] ) ? $images_options[ 'imagens' ] : array();

        add_menu_page( 
            'Configurações do Instagram', 
            'Instagram', 
            'manage_options', 
            'instagram-dashboard', 
            array( $this, 'create_admin_page' ), 
            Piki::url( 'images/icon.png', __FILE__ )
        );
        add_submenu_page( 
            'instagram-dashboard', 
            'Configurações', 
            'Configurações', 
            'manage_options', 
            'instagram-dashboard'
        );
        add_submenu_page(
            'piki-dashboard', 
            'Instagram', 
            'Instagram', 
            'manage_options', 
            'instagram-dashboard'
        );
        add_submenu_page( 
            'instagram-dashboard', 
            'Selecionar imagens', 
            'Selecionar imagens',
            'manage_options', 
            'instagram-select-images',
            array( $this, 'admin_select_images' )
        );
    }
    # Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Opções do Instagram:</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'instagram_option_group' );   
                do_settings_sections( 'instagram-setting-admin' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }
    # Options page callback
    public function admin_select_images() {
        wp_enqueue_script( 'instagram-scripts', plugin_dir_url( __FILE__ ) . 'instagram.js', array( 'jquery' ) );
        wp_enqueue_style( 'instagram-styles', plugin_dir_url( __FILE__ ) . 'instagram.css' );
        ?>
        <div class="wrap">
            <h2>Instagram - Selecionar imagens:</h2>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields( 'instagram_images_group' );   
                do_settings_sections( 'instagram-images' );
                ?>
            </form> 
        </div>

    <?php
    }
    # Register and add settings
    public function page_init() {

        # Configuraçõe gerais

            register_setting(
                'instagram_option_group', // Option group
                'instagram_options', // Option name
                array( $this, 'sanitize' ) // Sanitize
            );
            add_settings_section(
                'instagram_setting_count', // ID
                false, // Title
                array( $this, 'print_section_info' ), // Callback
                'instagram-setting-admin' // Page
            );  
            add_settings_field(
                'app_id', // ID
                'APP ID', // Title 
                array( $this, 'field_app_id' ), // Callback
                'instagram-setting-admin', // Page
                'instagram_setting_count' // Section           
            );      
            add_settings_field(
                'app_secret', // ID
                'APP Secret', // Title 
                array( $this, 'field_app_secret' ), // Callback
                'instagram-setting-admin', // Page
                'instagram_setting_count' // Section           
            );      
            add_settings_field(
                'hashtag', // ID
                'Hashtag', // Title 
                array( $this, 'field_hashtag' ), // Callback
                'instagram-setting-admin', // Page
                'instagram_setting_count' // Section           
            );      
            add_settings_field(
                'total', // ID
                'Total', // Title 
                array( $this, 'field_total' ), // Callback
                'instagram-setting-admin', // Page
                'instagram_setting_count' // Section           
            );      
            add_settings_field(
                'cache_time', // ID
                'Tempo do cache (em minutos)', // Title 
                array( $this, 'field_cache_time' ), // Callback
                'instagram-setting-admin', // Page
                'instagram_setting_count' // Section           
            ); 

        # Imagens

            register_setting(
                'instagram_images_group', // Option group
                'instagram_images', // Option name
                array( $this, 'sanitize_images' ) // Sanitize
            );
            add_settings_section(
                'instagram_images', // ID
                false, // Title
                array( $this, 'print_section_info' ), // Callback
                'instagram-images' // Page
            );  
            add_settings_field(
                'clear_cache', // ID
                'Limpar o cache', // Title 
                array( $this, 'field_clear_cache' ), // Callback
                'instagram-images', // Page
                'instagram_images' // Section           
            ); 
            add_settings_field(
                'images', // ID
                'Imagens', // Title 
                array( $this, 'field_images' ), // Callback
                'instagram-images', // Page
                'instagram_images' // Section           
            );      
    }
    # Valida os valores
    public function sanitize( $input ) {
        $new_input = array();
        if( isset( $input[ 'app_id' ] ) ):
            $new_input[ 'app_id' ] = sanitize_text_field( $input[ 'app_id' ] );
        endif;
        if( isset( $input[ 'app_secret' ] ) ):
            $new_input[ 'app_secret' ] = sanitize_text_field( $input[ 'app_secret' ] );
        endif;
        if( isset( $input[ 'hashtag' ] ) ):
            $new_input[ 'hashtag' ] = sanitize_text_field( $input[ 'hashtag' ] );
        endif;
        if( isset( $input[ 'total' ] ) ):
            $new_input['total'] = absint( $input[ 'total' ] );
        endif;
        if( isset( $input[ 'cache_time' ] ) ):
            $new_input['cache_time'] = absint( $input[ 'cache_time' ] );
        endif;
        return $new_input;
    }

    # Valida os valores
    public function sanitize_images( $input ) {
        $new_input = array();
        if( isset( $input[ 'imagens' ] ) ):
            $new_input['imagens'] = array_slice( $input[ 'imagens' ], 0, $this->options[ 'total' ] );
        endif;
        return $new_input;
    }

    # Print the Section text
    public function print_section_info(){
        return false;
    }
    # APP ID
    public function field_app_id() {
        printf( '<input type="text" id="app_id" name="instagram_options[app_id]" value="%s" />', isset( $this->options[ 'app_id' ] ) ? esc_attr( $this->options[ 'app_id' ] ) : '' );
    }
    # APP Secret
    public function field_app_secret() {
        printf( '<input type="text" id="app_secret" name="instagram_options[app_secret]" value="%s" />', isset( $this->options[ 'app_secret' ] ) ? esc_attr( $this->options[ 'app_secret' ] ) : '' );
    }
    # Hashtag
    public function field_hashtag() {
        printf( '<input type="text" id="hashtag" name="instagram_options[hashtag]" value="%s" />', isset( $this->options[ 'hashtag' ] ) ? esc_attr( $this->options[ 'hashtag' ] ) : '' );
    }
    # Total
    public function field_total() {
        printf( '<input type="text" id="total" name="instagram_options[total]" value="%s" />', isset( $this->options[ 'total' ] ) ? esc_attr( $this->options[ 'total' ] ) : '' );
    }
    # Total
    public function field_cache_time() {
        printf( '<input type="text" id="cache_time" name="instagram_options[cache_time]" value="%d" />', isset( $this->options[ 'cache_time' ] ) ? esc_attr( $this->options[ 'cache_time' ] ) : '' );
    }
    # Clear cache
    public function field_clear_cache() {
        print( '<input type="button" id="instagram-clear-cache" name="instagram_options[clear_cache]" value="Limpar cache" class="button" />' );
    }
    # Total
    public function field_images() {
        
        $i = new PKInstagram();
        $result = $i->get_by_rashtag();
        $images = empty( $result->data ) ? false : $result->data;

        # Se nenhuma imagem for encontrada
        if( !$images ):
            echo 'Nenhuma imagem encontrada com a hastag #' . $this->options[ 'hashtag' ];
            return;
        endif;

        Piki::add_library( 'fancybox' );

        echo '<div class="instagram-field wp-core-ui clearfix">';
        echo $this->render_fields( $images, $this->images );
        if( isset( $result->pagination->next_max_tag_id ) ):
            echo '<input type="button" value="Carregar mais fotos" class="button button-primary load-more-button" rel="'. $result->pagination->next_max_tag_id .'" />';
        endif;
        echo '</div>';
    }

    public static function change_status(){
        global $wpdb;
        # Permissão
        if( !current_user_can( 'manage_options' ) ):
            die( 'Você não tem permissão para realizar esta operação.' );
        endif;
        $status = $_POST[ 'status' ] == 'aproved' ? 2 : 1;
        $update = $wpdb->update( 
            $wpdb->prefix . INSTAGRAM_CONTENT_TABLE, 
            array( 'status' => $status ), 
            array( 'chave' => $_POST[ 'chave' ] ), 
            array(  '%d' ), 
            array( '%s' ) 
        );
        if( $update ):
            $return = array(
                'status' => 'success',
                'new_state' => $_POST[ 'status' ],
            );
        else:
            $return = array(
                'status' => 'error',
            );
        endif;
        exit( json_encode( $return ) );
    }

    public static function load_options(){
        
        # Chave da paginação
        $next_id = $_POST[ 'next_max_tag_id' ];
        # Classe Instagram
        $inst = new PKInstagram();
        # Faz a consulta
        $result = $inst->get_by_rashtag( $next_id );
        # Imagens
        $images = empty( $result->data ) ? false : $result->data;
        
        # Se nenhuma imagem for encontrada
        if( !$images ):
            exit(json_encode(array(
                'status' => 'empty'
            )));
        endif;

        # Valores existentes
        $images_options = get_option( 'instagram_images' );
        $values = isset( $images_options[ 'imagens' ] ) ? $images_options[ 'imagens' ] : array();

        $insta = new InstagramSettingsPage();

        # Retorna
        exit(json_encode(array(
            'status' => 'success',
            'options' => $insta->render_fields( $images, $values ),
            'next_id' => isset( $result->pagination->next_max_tag_id ) ? $result->pagination->next_max_tag_id : false,
        )));

    }

    public function render_fields( $images, $values ){

        global $wpdb;

        # Inserteds
        $this->get_images_status( $images );
        
        # Tabela de conteúdo
        $content_table = $wpdb->prefix . INSTAGRAM_CONTENT_TABLE;

        # Retorno
        $return = '';

        foreach ( $images as $key => $image ):

            $status = 'pending';
            if( $image->status == '1' ) $status = 'reproved';
            if( $image->status == '2' ) $status = 'aproved';

            $return .= '<div class="item-image '. $status .'">';
            $return .= '    <div class="actions">';
            $return .= '        <input type="button" class="action-button aprovar" value="Aprovar" />';
            $return .= '        <input type="button" class="action-button reprovar" value="Reprovar" />';
            $return .= '        <input type="hidden" class="image-key" value="'. $image->id .'" />';
            $return .= '        <a href="' . $image->images->standard_resolution->url . '" class="action-button ampliar" target="_blank">Ampliar</a>';
            $return .= '    </div>';
            $return .= '    <img src="' . Piki::image_resize( 220, 220, $image->images->standard_resolution->url ) . '" width="220" height="220" />';
            $return .= '</div>';

        endforeach;
        return $return;
    }

    public function get_images_status( &$images ){

        global $wpdb;

        # Se não há imagens, returna vazi
        if( !$images || empty( $images ) ):
            return $images;
        endif;

        # Tabela com as imagens
        $content_table = $wpdb->prefix . INSTAGRAM_CONTENT_TABLE;

        # IDs das imagens recuperadas
        $ids = array();
        foreach ( $images as $key => $image ):
            $ids[] = $image->id;
        endforeach;

        # Placeholders para as imagens
        $placeholders = array_fill( 0, count( $images ), '%s');

        # Parâmetros para comparação na query
        $parameters = $ids;
        array_unshift( $parameters, $this->options[ 'hashtag' ] );

        # Inserteds
        $inserteds = $wpdb->get_results($wpdb->prepare(
            "SELECT 
                chave, status 
            FROM $content_table 
            WHERE 
                hashtag = '%s' AND 
                chave IN ( '". implode( "','", $placeholders ) ."' )
            ", 
            $parameters
        ));
        $tocompare = array();

        # Cria um array com os ID's como chave
        if( !empty( $inserteds ) ):
            foreach ( $inserteds as $key => $item ):
                $tocompare[ $item->chave ] = $item;
            endforeach;
        endif;

        # Insere as que ainda não estão no banco, e atribuem o status às que já estão
        foreach ( $images as $key => &$image ):
            # Se já foi cadastrada, atribui o status
            if( array_key_exists( $image->id, $tocompare ) ):

                $image->status = $tocompare[ $image->id ]->status;

            # Se não foi cadastrada, cadastra
            else:
                # Insere no banco
                $wpdb->insert( 
                    $content_table, 
                    array( 'chave' => $image->id, 'hashtag' => $this->options[ 'hashtag' ], 'content' => json_encode( $image ), 'status' => '0' ), 
                    array( '%s', '%s', '%s', '%d' )
                );
                $image->status = 0;
            endif;
        endforeach;

        return $images;

    }

}
if( is_admin() ):
    $instagram_settings_page = new InstagramSettingsPage();
    add_action( 'wp_ajax_instagram_load_options', array( 'InstagramSettingsPage', 'load_options' ) );
    add_action( 'wp_ajax_instagram_change_status', array( 'InstagramSettingsPage', 'change_status' ) );
    add_action( 'wp_ajax_instagram_clear_cache', array( 'Instagram', 'clear_cache' ) );
endif;

# Instalação do plugin
register_activation_hook( __FILE__, 'instagram_activate' );
function instagram_activate(){
    global $wpdb;
    $sql = "
    CREATE TABLE $wpdb->prefix" . INSTAGRAM_CACHE_TABLE . " (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        content text NOT NULL,
        time INT DEFAULT '0',
        chave VARCHAR(255) DEFAULT '' NOT NULL,
        UNIQUE KEY id (id)
    );
    CREATE TABLE $wpdb->prefix" . INSTAGRAM_CONTENT_TABLE . " (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        content text NOT NULL,
        chave VARCHAR(255) DEFAULT '' NOT NULL,
        hashtag VARCHAR(255) DEFAULT '' NOT NULL,
        status TINYINT NULL DEFAULT 0,
        UNIQUE KEY id (id)
    );
    ";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}

# Desinstalação do plugin
register_deactivation_hook( __FILE__, 'instagram_deactivate' );
function instagram_deactivate(){
    global $wpdb;
    $wpdb->query( "DROP TABLE IF EXISTS $wpdb->prefix" . INSTAGRAM_CACHE_TABLE );
}


