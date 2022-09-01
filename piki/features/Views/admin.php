<?php
class PikiformsSettingsPage {
   
    private $options;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    # Add options page
    public function add_plugin_page() {

        Piki::add_library( 'jquery-ui' );
        $this->options = get_option( 'pikiforms_options' );
        
        add_menu_page(
            'Configurações dos Piki Forms', 
            'Pikiforms', 
            'manage_options', 
            'pikiforms-dashboard', 
            array( $this, 'create_admin_page' ), 
            Piki::url( 'images/piki-icon.png', __FILE__ )
        );
        add_submenu_page(
            'pikiforms-dashboard', 
            'Configurações gerais', 
            'Configurações gerais', 
            'manage_options', 
            'pikiforms-dashboard'
        );
        add_submenu_page( 
            'pikiforms-dashboard', 
            'Pikiforms', 
            'Forms', 
            'manage_options', 
            'edit.php?post_type=' . PikiForms_ptype
        );
    }

    # Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Opções dos Pikiforms:</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikiforms_option_group' );   
                do_settings_sections( 'pikiforms-setting-admin' );
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
            'pikiforms_option_group', // Option group
            'pikiforms_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

            # Section
            add_settings_section(
                'pikiforms_setting_smtp', // ID
                'Configurações de SMTP', // Title
                FALSE, // Callback
                'pikiforms-setting-admin' // Page
            ); 
            
            # Fields
            add_settings_field(
                'status', // ID
                'Enviar emails via SMTP?', // Title 
                array( $this, 'field_smtp_status' ), // Callback
                'pikiforms-setting-admin', // Page
                'pikiforms_setting_smtp' // Section           
            );      
            add_settings_field(
                'host', // ID
                'Host:', // Title 
                array( $this, 'field_smtp_host' ), // Callback
                'pikiforms-setting-admin', // Page
                'pikiforms_setting_smtp' // Section           
            );      
            add_settings_field(
                'port', // ID
                'Porta:', // Title 
                array( $this, 'field_smtp_port' ), // Callback
                'pikiforms-setting-admin', // Page
                'pikiforms_setting_smtp' // Section           
            );      
            add_settings_field(
                'username', // ID
                'Username:', // Title 
                array( $this, 'field_smtp_username' ), // Callback
                'pikiforms-setting-admin', // Page
                'pikiforms_setting_smtp' // Section           
            );      
            add_settings_field(
                'password', // ID
                'Password:', // Title 
                array( $this, 'field_smtp_password' ), // Callback
                'pikiforms-setting-admin', // Page
                'pikiforms_setting_smtp' // Section           
            );

    }

    # Status
    public function field_smtp_status() {
        echo '<input type="checkbox" id="pikiforms_smtp_status" name="pikiforms_options[smtp-status]" ', ( isset( $this->options[ 'smtp-status' ] ) && $this->options[ 'smtp-status' ] == 'on' ? 'checked="checked"' : '' ), ' /> Sim';
    }
    # Host
    public function field_smtp_host() {
        echo '<input type="text" id="pikiforms_smtp_host" name="pikiforms_options[smtp-host]" value="', ( isset( $this->options[ 'smtp-host' ] ) ? $this->options[ 'smtp-host' ] : '' ), '" />';
    }
    # Port
    public function field_smtp_port() {
        echo '<input type="text" id="pikiforms_smtp_port" name="pikiforms_options[smtp-port]" value="', ( isset( $this->options[ 'smtp-port' ] ) ? $this->options[ 'smtp-port' ] : '' ), '" />';
    }
    # Username
    public function field_smtp_username() {
        echo '<input type="text" id="pikiforms_smtp_username" name="pikiforms_options[smtp-username]" value="', ( isset( $this->options[ 'smtp-username' ] ) ? $this->options[ 'smtp-username' ] : '' ), '" />';
    }
    # Username
    public function field_smtp_password() {
        echo '<input type="text" id="pikiforms_smtp_password" name="pikiforms_options[smtp-password]" value="', ( isset( $this->options[ 'smtp-password' ] ) ? $this->options[ 'smtp-password' ] : '' ), '" />';
    }


    # Valida os valores
    public function sanitize( $input ) {

        $new_input = array();

        # Status
        if( isset( $input[ 'smtp-status' ] ) && $input[ 'smtp-status' ] == 'on' ):
            $new_input['smtp-status'] = 'on';
        endif;
        # Host
        if( isset( $input[ 'smtp-host' ] ) ):
            $new_input['smtp-host'] = $input[ 'smtp-host' ];
        endif;
        # Host
        if( isset( $input[ 'smtp-port' ] ) ):
            $new_input['smtp-port'] = $input[ 'smtp-port' ];
        endif;
        # Username
        if( isset( $input[ 'smtp-username' ] ) ):
            $new_input['smtp-username'] = $input[ 'smtp-username' ];
        endif;
        # Password
        if( isset( $input[ 'smtp-password' ] ) && $input[ 'smtp-password' ] != '' ):
            $new_input['smtp-password'] = $input[ 'smtp-password' ];
        endif;

        return $new_input;
    }

}
if( is_admin() ):
    $pikiforms_settings_page = new PikiformsSettingsPage();
    add_action( 'wp_ajax_pikiforms_load_options', array( 'PikiformsSettingsPage', 'load_options' ) );
    add_action( 'wp_ajax_pikiforms_change_status', array( 'PikiformsSettingsPage', 'change_status' ) );
endif;