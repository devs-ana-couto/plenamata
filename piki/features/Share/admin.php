<?php
class PikiShareSettingsPage {
   
    private $options;
    private $networks;

    public function __construct() {

        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    
    }

    // Add options page
    public function add_plugin_page() {
        $this->options = get_option( 'pikishare_options' );
        add_submenu_page(
            'piki-dashboard',
            'Share',
            'Share',
            'manage_options',
            'piki-share-settings',
            array( $this, 'create_admin_page' )
        );
    }

    // Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Redes sociais:</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikishare_option_group' );   
                do_settings_sections( 'pikishare-setting-admin' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    // Register and add settings
    public function page_init() {

        global $PIKISHARE_NETWORKS;

        // Configuraçõe gerais
        register_setting(
            'pikishare_option_group', // Option group
            'pikishare_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

            // Youtube Settings
            
            add_settings_section(
                'pikishare_setting', // ID
                'Links das redes sociais', // Title
                FALSE, // Callback
                'pikishare-setting-admin' // Page
            ); 
            
                // Fields
                foreach( $PIKISHARE_NETWORKS as $key => $label ):
                    add_settings_field(
                        $key, // ID
                        $label . ':', // Title 
                        array( $this, 'field_url'  ), // Callback
                        'pikishare-setting-admin', // Page
                        'pikishare_setting',
                        array( $key ) // Section           
                    );      
                endforeach;

            // Cache Settings
            
            add_settings_section(
                'pikishare_target_options', // ID
                'Opções de abertura dos links', // Title
                FALSE, // Callback
                'pikishare-setting-admin' // Page
            ); 
            
                // Fields
                add_settings_field(
                    'target', // ID
                    'Abrir links em uma nova janela?', // Title 
                    array( $this, 'field_target' ), // Callback
                    'pikishare-setting-admin', // Page
                    'pikishare_target_options' // Section           
                );      
    }

    // GENERAL

        // URL
        public function field_url( $args ) {
            $key = array_shift( $args );
            $value = isset( $this->options[ $key ] ) ? $this->options[ $key ] : '';
            echo '<input type="text" id="pikishare_', $key. '" name="pikishare_options[', $key, ']" value="', $value, '" />';
        }

    // TARGET

        // Abrir em uma nova janela
        public function field_target() {
            echo '<input type="checkbox" id="pikishare_target" name="pikishare_options[target]" value="on"', ( isset( $this->options[ 'target' ] ) && $this->options[ 'target' ] == '_blank' ? ' checked="checked"' : '' ), '" />';
        }

    // Valida os valores
    public function sanitize( $input ) {

        global $PIKISHARE_NETWORKS;

        $new_input = array();

        // Target
        if( on( $input, 'target' ) ):
            $new_input[ 'target' ] = '_blank';
        else:
            $new_input[ 'target' ] = '_self';
        endif;

        // URLs
        foreach( $PIKISHARE_NETWORKS as $key => $label ):
            if( $key == 'whatsapp' ):
                $new_input[ $key ] = $input[ $key ];
            elseif( !!( $valid = filter_var( $input[ $key ], FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED ) ) ):
                $new_input[ $key ] = $valid;
            endif;
        endforeach;        

        return $new_input;

    }

}
$pikishare_settings_page = new PikiShareSettingsPage();