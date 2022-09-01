<?php
class PikiCommSettingsPage {
   
    private $options;
    private $networks;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    // Add options page
    public function add_plugin_page() {

        $this->options = get_option( 'pikicomm_options' );

        add_submenu_page(
            'piki-dashboard',
            'Comments',
            'Comments',
            'manage_options',
            'piki-comments',
            array( $this, 'create_admin_page' )
        );

    }

    // Options page callback
    public function create_admin_page() {
        ?>
        <div class="wrap">
            <h2>Piki Comments</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikicomm_option_group' );   
                do_settings_sections( 'pikicomm-setting-admin' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    // Register and add settings
    public function page_init() {

        // Configuraçõe gerais
        register_setting(
            'pikicomm_option_group', // Option group
            'pikicomm_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );
        add_settings_section(
            'pikicomm_settings', // ID
            'Configurações gerais', // Title
            FALSE, // Callback
            'pikicomm-setting-admin' // Page
        ); 
        
        add_settings_field(
            'blacklist_words', // ID
            'Lista de palavras indesejadas:', // Title 
            array( $this, 'field_blacklist_words' ), // Callback
            'pikicomm-setting-admin', // Page
            'pikicomm_settings' // Section           
        );   
        add_settings_field(
            'blacklist_phrases', // ID
            'Lista de frases indesejadas:', // Title 
            array( $this, 'field_blacklist_phrases' ), // Callback
            'pikicomm-setting-admin', // Page
            'pikicomm_settings' // Section           
        );   

    }

    // GENERAL

        // Palavras indesejadas
        public function field_blacklist_words( $args ) {
            $value = isset( $this->options[ 'blacklist_words' ] ) ? $this->options[ 'blacklist_words' ] : '';
            echo '<textarea name="pikicomm_options[blacklist_words] id="pikicomm_options_blacklist_words" style="width:400px;height:200px;">'. $value .'</textarea>';
        }
        // Frases indesejadas
        public function field_blacklist_phrases( $args ) {

            $value = isset( $this->options[ 'blacklist_phrases' ] ) ? $this->options[ 'blacklist_phrases' ] : '';
            echo '<textarea name="pikicomm_options[blacklist_phrases] id="pikicomm_options_blacklist_phrases" style="width:600px;height:200px;">'. $value .'</textarea>';
        }

    // Valida os valores
    public function sanitize( $input ) {
        $new_input = array();
        $new_input[ 'blacklist_words' ] = !isset( $input[ 'blacklist_words' ] ) ? '' : $input[ 'blacklist_words' ];
        $new_input[ 'blacklist_phrases' ] = !isset( $input[ 'blacklist_phrases' ] ) ? '' : $input[ 'blacklist_phrases' ];
        return $new_input;
    }

}
$PikiCommSettingsPage = new PikiCommSettingsPage();