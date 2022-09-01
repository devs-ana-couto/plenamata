<?php
class SMTPSettingsPage {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }
    // Add options page
    public function add_plugin_page() {
        add_submenu_page(
            'piki-dashboard',
            'SMTP',
            'SMTP',
            'manage_options',
            'piki-smtp',
            array( $this, 'admin_smtp' )
        );
    }

    // SMTP options page
    public function admin_smtp() {

        $this->smtp_options = get_option( 'piki_smtp_options' ); ?>
        
        <div class="wrap">
            <h2>Piki Pack</h2>           
            <form method="post" action="options.php"><?php
                settings_fields( 'piki_smtp_group' );   
                do_settings_sections( 'piki-smtp' );
                submit_button(); ?>
            </form>
        </div><?php

    }

    // Register and add settings
    public function page_init() {

        // Configuraçõe de SMTP
        register_setting(
            'piki_smtp_group', // Option group
            'piki_smtp_options', // Option name
            array( $this, 'sanitize_smtp' ) // Sanitize
        );

            // Section
            add_settings_section(
                'piki_setting_smtp', // ID
                'Configurações de SMTP', // Title
                FALSE, // Callback
                'piki-smtp' // Page
            ); 

            // Fields
            add_settings_field(
                'status', // ID
                'Enviar emails via SMTP?', // Title 
                array( $this, 'field_smtp_status' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );      
            add_settings_field(
                'host', // ID
                'Host:', // Title 
                array( $this, 'field_smtp_host' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );      
            add_settings_field(
                'host', // ID
                'Host:', // Title 
                array( $this, 'field_smtp_host' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );      
            add_settings_field(
                'port', // ID
                'Porta:', // Title 
                array( $this, 'field_smtp_port' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );      
            add_settings_field(
                'username', // ID
                'Username:', // Title 
                array( $this, 'field_smtp_username' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );      
            add_settings_field(
                'password', // ID
                'Password:', // Title 
                array( $this, 'field_smtp_password' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );
            add_settings_field(
                'secure', // ID
                'Segurança:', // Title 
                array( $this, 'field_smtp_secure' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );
            add_settings_field(
                'sender', // ID
                'Email de origem:', // Title 
                array( $this, 'field_smtp_sender' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );
            add_settings_field(
                'from_name', // ID
                'Nome de origem:', // Title 
                array( $this, 'field_smtp_from_name' ), // Callback
                'piki-smtp', // Page
                'piki_setting_smtp' // Section           
            );

    }

    // Status
    public function field_smtp_status() {
        echo '<input type="checkbox" id="piki_smtp_status" name="piki_smtp_options[status]" ', ( isset( $this->smtp_options[ 'status' ] ) && $this->smtp_options[ 'status' ] == 'on' ? 'checked="checked"' : '' ), ' /> Sim';
    }
    // Host
    public function field_smtp_host() {
        echo '<input type="text" id="piki_smtp_host" name="piki_smtp_options[host]" value="', ( isset( $this->smtp_options[ 'host' ] ) ? $this->smtp_options[ 'host' ] : '' ), '">';
    }
    // Port
    public function field_smtp_port() {
        echo '<input type="text" id="piki_smtp_port" name="piki_smtp_options[port]" value="', _array_get( $this->smtp_options, 'port', '' ), '">';
    }
    // Username
    public function field_smtp_username() {
        echo '<input type="text" id="piki_smtp_username" name="piki_smtp_options[username]" value="', _array_get( $this->smtp_options, 'username', '' ), '">';
    }
    // Passowrd
    public function field_smtp_password() {
        echo '<input type="password" id="piki_smtp_password" name="piki_smtp_options[password]" value="', _array_get( $this->smtp_options, 'password' ), '">';
    }
    // Secure
    public function field_smtp_secure() {
        echo '<select id="piki_smtp_secure" name="piki_smtp_options[secure]">
            <option value="">Nenhuma</option>
            <option value="tls"'. ( $this->smtp_options[ 'secure' ] === 'tls' ? ' selected="selected"' : '' ) .'>TLS</option>
            <option value="ssl"'. ( $this->smtp_options[ 'secure' ] === 'ssl' ? ' selected="selected"' : '' ) .'>SSL</option>
        </select>';
    }
    // Sender
    public function field_smtp_sender() {
        echo '<input type="text" id="piki_smtp_sender" name="piki_smtp_options[sender]" value="', _array_get( $this->smtp_options, 'sender', '' ), '">';
    }
    // From name
    public function field_smtp_from_name() {
        echo '<input type="text" id="piki_smtp_from_name" name="piki_smtp_options[from_name]" value="', _array_get( $this->smtp_options, 'from_name', '' ), '">';
    }

    // Valida os valores
    public function sanitize_smtp( $input ) {

        $new_input = array();

        // Status
        if( isset( $input[ 'status' ] ) && $input[ 'status' ] == 'on' ):
            $new_input[ 'status' ] = 'on';
        endif;
        // Host
        if( isset( $input[ 'host' ] ) ):
            $new_input[ 'host' ] = $input[ 'host' ];
        endif;
        // Host
        if( isset( $input[ 'port' ] ) ):
            $new_input[ 'port' ] = $input[ 'port' ];
        endif;
        // Username
        if( isset( $input[ 'username' ] ) ):
            $new_input[ 'username' ] = $input[ 'username' ];
        endif;
        // Password
        if( isset( $input[ 'password' ] ) ):
            $new_input[ 'password' ] = $input[ 'password' ];
        endif;
        // Secure
        if( isset( $input[ 'secure' ] ) ):
            $new_input[ 'secure' ] = $input[ 'secure' ];
        endif;
        // From
        if( isset( $input[ 'sender' ] ) && $input[ 'sender' ] != '' ):
            $new_input[ 'sender' ] = $input[ 'sender' ];
        endif;
        // From name
        if( isset( $input[ 'from_name' ] ) && $input[ 'from_name' ] != '' ):
            $new_input[ 'from_name' ] = $input[ 'from_name' ];
        endif;

        return $new_input;
    }

}
if( is_admin() ):
    $smtp_settings_page = new SMTPSettingsPage();
endif;
