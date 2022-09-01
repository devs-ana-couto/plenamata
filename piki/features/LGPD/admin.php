<?php
class LGPDSettingsPage {
   
    private $options;
    private $lgpd;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }
    // Add options page
    public function add_plugin_page() {
        add_submenu_page(
            'piki-dashboard',
            'LGPD',
            'LGPD',
            'manage_options',
            'piki-lgpd',
            array( $this, 'admin_lgpd' )
        );
    }
    // Página de administração
    public function admin_lgpd() {
        $this->lgpd_options = get_option( 'pklgpd_options' );
        ?>
        <div class="wrap">
            <h2>LGPD</h2>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields( 'pklgpd_group' );   
                //do_settings_sections( 'pikiforms-lgpd-settings' );
                do_settings_sections( 'piki-lgpd' );
                submit_button();
                ?>
            </form> 
        </div>
    <?php
    }
    // Register and add settings
    public function page_init() {

        register_setting(
            'pklgpd_group', // Option group
            'pklgpd_settings', // Option name
            array( $this, 'sanitize_lgpd' ) // Sanitize
        );

        // Configuraçõe de LGPD
        register_setting(
            'pklgpd_group', // Option group
            'pklgpd_options', // Option name
            array( $this, 'sanitize_lgpd' ) // Sanitize
        );

            // Section
            add_settings_section(
                'piki_setting_lgpd', // ID
                'Configurações de LGPD', // Title
                FALSE, // Callback
                'piki-lgpd' // Page
            ); 

            // Fields
            add_settings_field(
                'status', // ID
                'Mostrar box LGPD?', // Title 
                array( $this, 'field_lgpd_status' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section           
            );      
            add_settings_field(
                'titulo', // ID
                'Título:', // Title 
                array( $this, 'field_lgpd_titulo' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );  
            add_settings_field(
                'texto', // ID
                'Texto:', // Title 
                array( $this, 'field_lgpd_texto' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );  
            add_settings_field(
                'accept_label', // ID
                'Label do botão de aceitação:', // Title 
                array( $this, 'field_lgpd_accept_label' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );      
            add_settings_field(
                'reject_label', // ID
                'Label do botão de rejeição:', // Title 
                array( $this, 'field_lgpd_reject_label' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );      
            add_settings_field(
                'label_link', // ID
                'Label do link para página de política de privacidade:', // Title
                array( $this, 'field_lgpd_label_link' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );      
            add_settings_field(
                'page_slug', // ID
                'Slug da página de política de privacidade:', // Title
                array( $this, 'field_lgpd_page_slug' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );
            add_settings_field(
                'privacy_file', // ID
                'Arquivo da política de privacidade para download:', // Title
                array( $this, 'field_lgpd_privacy_file' ), // Callback
                'piki-lgpd', // Page
                'piki_setting_lgpd' // Section
            );

    }

    // Status
    public function field_lgpd_status(){
        echo boolean::get_field([
            'ftype' => 'boolean',
            'name_html' => 'pklgpd_options[status]',
            'id' => 'pklgpd_status',
            'value' => _array_get( $this->lgpd_options, 'status' )
        ]);
    }
    // Título
    public function field_lgpd_titulo(){
        echo text::get_field([
            'ftype' => 'text',
            'name_html' => 'pklgpd_options[titulo]',
            'id' => 'pklgpd_titulo',
            'value' => _array_get( $this->lgpd_options, 'titulo' )
        ]);
    }
    // Texto
    public function field_lgpd_texto(){
        echo textarea::get_field([
            'ftype' => 'textarea',
            'name_html' => 'pklgpd_options[texto]',
            'id' => 'pklgpd_texto',
            'value' => _array_get( $this->lgpd_options, 'texto' )
        ]);
    }
    // Accept button label
    public function field_lgpd_accept_label() {
        echo text::get_field([
            'ftype' => 'text',
            'name_html' => 'pklgpd_options[accept_label]',
            'id' => 'pklgpd_accept_label',
            'value' => _array_get( $this->lgpd_options, 'accept_label' )
        ]);
    }
    // Reject button label
    public function field_lgpd_reject_label() {
        echo text::get_field([
            'ftype' => 'text',
            'name_html' => 'pklgpd_options[reject_label]',
            'id' => 'pklgpd_reject_label',
            'value' => _array_get( $this->lgpd_options, 'reject_label' )
        ]);
    }
    // Label do link para página de política de cookoies
    public function field_lgpd_label_link() {
        echo text::get_field([
            'ftype' => 'text',
            'name_html' => 'pklgpd_options[label_link]',
            'id' => 'pklgpd_label_link',
            'value' => _array_get( $this->lgpd_options, 'label_link' )
        ]);
    }
    // Passowrd
    public function field_lgpd_page_slug() {
        echo text::get_field([
            'ftype' => 'text',
            'name_html' => 'pklgpd_options[page_slug]',
            'id' => 'pklgpd_page_slug',
            'value' => _array_get( $this->lgpd_options, 'page_slug' )
        ]);
    }
    // Privacy policy file to download
    public function field_lgpd_privacy_file() {
        echo '<div class="linha-field ftype-filewp">' . 
            filewp::get_field([
                'ftype' => 'filewp',
                'name_html' => 'pklgpd_options[privacy_file]',
                'id' => 'pklgpd_privacy_file',
                'value' => _array_get( $this->lgpd_options, 'privacy_file' )
            ]) . '
        </div>';
    }

    // Valida os valores
    public function sanitize_lgpd( $input ) {

        $new_input = array();

        // Status
        $new_input[ 'status' ] = _array_get( $input, 'status', '' );
        // Texto
        $new_input[ 'titulo' ] = _array_get( $input, 'titulo', '' );
        // Texto
        $new_input[ 'texto' ] = _array_get( $input, 'texto', '' );
        // Accept button label
        $new_input[ 'accept_label' ] = _array_get( $input, 'accept_label', '' );
        // Reject button label
        $new_input[ 'reject_label' ] = _array_get( $input, 'reject_label', '' );
        // Label do link para página de política de cookoies
        $new_input[ 'label_link' ] = _array_get( $input, 'label_link', '' );
        // Slug para a página de política de cookies
        $new_input[ 'page_slug' ] = _array_get( $input, 'page_slug', '' );
        // Privacy policy file to download
        $new_input[ 'privacy_file' ] = _array_get( $input, 'privacy_file', '' );

        return $new_input;

    }


}
// Inicia a página de administração
$pikilgpd_settings_page = new LGPDSettingsPage();
// Recupera os posts que tem imagens a ser geradas
add_action( 'wp_ajax_pklgpd_to_rebuild', array( 'LGPD', 'lgpd_to_rebuild' ) );
// Processa um post
add_action( 'wp_ajax_pklgpd_proccess_post', array( 'LGPD', 'proccess_post' ) );
