<?php
class NewsletterSettingsPage {
   
    private $settings;

    public function __construct() {

        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    
    }

    # Add settings page
    public function add_plugin_page() {
        $this->settings = get_option( 'newslettter_settings' );
        add_submenu_page(
            'piki-dashboard',
            'Newsletter Settings',
            'Newsletter',
            'manage_options',
            'piki-newsletter-settings',
            array( $this, 'create_admin_page' )
        );
    }

    # Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Newsletter Settings:</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'newslettter_option_group' );   
                do_settings_sections( 'newslettter-setting-admin' );
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
            'newslettter_option_group', // Option group
            'newslettter_settings', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

            # Youtube Settings
            
            add_settings_section(
                'mailchimp_settings', // ID
                'Mailchimp', // Title
                FALSE, // Callback
                'newslettter-setting-admin' // Page
            );

                # Fields
                add_settings_field(
                    'mailchimp_active', // ID
                    'Integrar com mailchimp?', // Title 
                    array( $this, 'field_mailchimp_active' ), // Callback
                    'newslettter-setting-admin', // Page
                    'mailchimp_settings' // Section           
                );      
                add_settings_field(
                    'mailchimp_api_key', // ID
                    'API Key:', // Title 
                    array( $this, 'field_mailchimp_api_key'  ), // Callback
                    'newslettter-setting-admin', // Page
                    'mailchimp_settings'  
                );      
                add_settings_field(
                    'mailchimp_list_id', // ID
                    'List ID:', // Title 
                    array( $this, 'field_mailchimp_list_id'  ), // Callback
                    'newslettter-setting-admin', // Page
                    'mailchimp_settings'     
                );   

            # Sendpress Settings

            if( class_exists( 'SendPress_Data' ) ):
            
                add_settings_section(
                    'sendpress_settings', // ID
                    'Sendpress', // Title
                    FALSE, // Callback
                    'newslettter-setting-admin' // Page
                ); 
                
                    # Fields
                    add_settings_field(
                        'sendpress_active', // ID
                        'Integrar com o Sendpress?', // Title 
                        array( $this, 'field_sendpress_active' ), // Callback
                        'newslettter-setting-admin', // Page
                        'sendpress_settings' // Section           
                    );   

                    add_settings_field(
                        'sendpress_lists', // ID
                        'Listas para adesão:', // Title 
                        array( $this, 'field_sendpress_lists' ), // Callback
                        'newslettter-setting-admin', // Page
                        'sendpress_settings' // Section           
                    );

            endif;
    }

    # Mailchimp

        # Active?
        public function field_mailchimp_active() {
            echo '<input type="checkbox" id="mailchimp_active" name="newslettter_settings[mailchimp][active]" value="on"', ( $this->settings[ 'mailchimp' ][ 'active' ] === true ? ' checked="checked"' : '' ), '" />';
        }

        # API Key
        public function field_mailchimp_api_key(){
            echo '<input type="text" id="mailchimp_api_key" name="newslettter_settings[mailchimp][api_key]" value="', $this->settings[ 'mailchimp' ][ 'api_key' ], '" />';
        }

        # API Key
        public function field_mailchimp_list_id(){
            echo '<input type="text" id="mailchimp_list_id" name="newslettter_settings[mailchimp][list_id]" value="', $this->settings[ 'mailchimp' ][ 'list_id' ], '" />';
        }

    # Sendpress

        # Se o formulário será integrado com o sendpress
        public function field_sendpress_active() {
            echo '<input type="checkbox" id="sendpress_active" name="newslettter_settings[sendpress][active]" value="on"', ( $this->settings[ 'sendpress' ][ 'active' ] === true ? ' checked="checked"' : '' ), '" />';
        }

        # Listas para o usuário cadastrado
        public function field_sendpress_lists() {
            
            $lists = SendPress_Data::get_lists( array(), false );

            if( empty( $lists ) ):
                echo 'Nenhuma lista disponível para seleção';
                return;
            endif;
            foreach( $lists as $key => $list ):
                $checked = isset( $this->settings[ 'sendpress' ][ 'lists' ][ $list->ID ] );
                echo '<p class="list-item" style="clear:both;float:left;width:100%;"><label for="sendpress_list_'. $list->ID .'"><input type="checkbox" id="sendpress_list_'. $list->ID .'" name="newslettter_settings[sendpress][lists]['. $list->ID .']" value="on"', ( $checked === true ? ' checked="checked"' : '' ), '" />'. $list->post_title .'</label></p>';           
            endforeach;
        }

    # Valida os valores
    public function sanitize( $input ) {

        $new_input = array();

        # Mailchimp
        $new_input[ 'mailchimp' ] = array(
            'active' => isset( $input[ 'mailchimp' ][ 'active' ] ) ? true : false,
            'api_key' => empty( $input[ 'mailchimp' ][ 'api_key' ] ) ? '' : $input[ 'mailchimp' ][ 'api_key' ],
            'list_id' => empty( $input[ 'mailchimp' ][ 'list_id' ] ) ? '' : $input[ 'mailchimp' ][ 'list_id' ],
        );

        # Sendpress
        $new_input[ 'sendpress' ] = array(
            'active' => isset( $input[ 'sendpress' ][ 'active' ] ) ? true : false,
            'lists' => $input[ 'sendpress' ][ 'lists' ]
        );

        return $new_input;

    }

}
$newslettter_settings_page = new NewsletterSettingsPage();