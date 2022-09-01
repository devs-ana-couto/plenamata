<?php
class PikiYoutubeSettingsPage {
   
    private $options;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    # Add options page
    public function add_plugin_page() {

        $this->options = get_option( 'pikiyoutube_options' );
        
        add_menu_page(
            'Configurações do Piki Youtube Gallery', 
            'PikiYoutube', 
            'manage_options', 
            'pikiyoutube-dashboard', 
            array( $this, 'create_admin_page' ), 
            Piki::url( 'img/youtube-icon.png', __FILE__ )
        );
        add_submenu_page(
            'pikiyoutube-dashboard', 
            'Configurações gerais', 
            'Configurações gerais', 
            'manage_options', 
            'pikiyoutube-dashboard'
        );
    }

    # Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Opções do Piki Youtube Gallery:</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikiyoutube_option_group' );   
                do_settings_sections( 'pikiyoutube-setting-admin' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    # Register and add settings
    public function page_init() {

        # Configuraçõe gerais
        register_setting(
            'pikiyoutube_option_group', // Option group
            'pikiyoutube_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

            # Youtube Settings
            
            add_settings_section(
                'pikiyoutube_setting', // ID
                'Configurações gerais', // Title
                FALSE, // Callback
                'pikiyoutube-setting-admin' // Page
            ); 
            
                # Fields
                add_settings_field(
                    'user_id', // ID
                    'User ID:', // Title 
                    array( $this, 'field_user_id' ), // Callback
                    'pikiyoutube-setting-admin', // Page
                    'pikiyoutube_setting' // Section           
                );      
                add_settings_field(
                    'api_key', // ID
                    'API Key:', // Title 
                    array( $this, 'field_api_key' ), // Callback
                    'pikiyoutube-setting-admin', // Page
                    'pikiyoutube_setting' // Section           
                );      
                add_settings_field(
                    'playlist_id', // ID
                    'Playlist ID:', // Title 
                    array( $this, 'field_playlist_id' ), // Callback
                    'pikiyoutube-setting-admin', // Page
                    'pikiyoutube_setting' // Section           
                );      

            # View Settings
            
            add_settings_section(
                'pikiyoutube_view_settings', // ID
                'Opções de mostragem', // Title
                FALSE, // Callback
                'pikiyoutube-setting-admin' // Page
            ); 
            
                # Fields
                add_settings_field(
                    'total_per_page', // ID
                    'Items per page:', // Title 
                    array( $this, 'field_items_per_page' ), // Callback
                    'pikiyoutube-setting-admin', // Page
                    'pikiyoutube_view_settings' // Section           
                );

            # Cache Settings
            
            add_settings_section(
                'pikiyoutube_cache_options', // ID
                'Opções de Cache', // Title
                FALSE, // Callback
                'pikiyoutube-setting-admin' // Page
            ); 
            
                # Fields
                add_settings_field(
                    'cache_lifetime', // ID
                    'Cache life time:', // Title 
                    array( $this, 'field_cache_lifetime' ), // Callback
                    'pikiyoutube-setting-admin', // Page
                    'pikiyoutube_cache_options' // Section           
                );      
    }

    # GENERAL

        # User ID
        public function field_user_id() {
            echo '<input type="text" id="pikiyoutube_user_id" name="pikiyoutube_options[user-id]" value="', ( isset( $this->options[ 'user-id' ] ) ? $this->options[ 'user-id' ] : '' ), '" />';
        }
        # API Key
        public function field_api_key() {
            echo '<input type="text" id="pikiyoutube_api_key" name="pikiyoutube_options[api-key]" value="', ( isset( $this->options[ 'api-key' ] ) ? $this->options[ 'api-key' ] : '' ), '" />';
        }
        # Playlist ID
        public function field_playlist_id() {
            echo '<input type="text" id="pikiyoutube_playlist_id" name="pikiyoutube_options[playlist-id]" value="', ( isset( $this->options[ 'playlist-id' ] ) ? $this->options[ 'playlist-id' ] : '' ), '" />';
        }

    # VIEW

        # Lifetime
        public function field_items_per_page() {
            echo '<input type="text" id="pikiyoutube_items_per_page" name="pikiyoutube_options[items-per-page]" value="', ( isset( $this->options[ 'items-per-page' ] ) ? $this->options[ 'items-per-page' ] : '' ), '" />';
        }

    # CACHE

        # Lifetime
        public function field_cache_lifetime() {
            echo '<input type="text" id="pikiyoutube_cache_lifetime" name="pikiyoutube_options[cache-lifetime]" value="', ( isset( $this->options[ 'cache-lifetime' ] ) ? $this->options[ 'cache-lifetime' ] : '' ), '" />';
        }


    # Valida os valores
    public function sanitize( $input ) {

        $new_input = array();

        if( isset( $input[ 'user-id' ] ) ):
            $new_input[ 'user-id' ] = $input[ 'user-id' ];
        endif;
        if( isset( $input[ 'api-key' ] ) ):
            $new_input[ 'api-key' ] = $input[ 'api-key' ];
        endif;
        if( isset( $input[ 'playlist-id' ] ) ):
            $new_input[ 'playlist-id' ] = $input[ 'playlist-id' ];
        endif;
        if( isset( $input[ 'items-per-page' ] ) && $input[ 'items-per-page' ] != '' ):
            $new_input['items-per-page'] = $input[ 'items-per-page' ];
        endif;
        if( isset( $input[ 'cache-lifetime' ] ) && (int)$input[ 'cache-lifetime' ] > 0 ):
            $new_input[ 'cache-lifetime' ] = $input[ 'cache-lifetime' ];
        else:
            $new_input[ 'cache-lifetime' ] = '0';
        endif;

        return $new_input;
    }

}
if( is_admin() ):
    $pikiyoutube_settings_page = new PikiYoutubeSettingsPage();
    add_action( 'wp_ajax_pikiyoutube_load_options', array( 'PikiYoutubeSettingsPage', 'load_options' ) );
    add_action( 'wp_ajax_pikiyoutube_change_status', array( 'PikiYoutubeSettingsPage', 'change_status' ) );
endif;