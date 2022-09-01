<?php
class PKDummySettingsPage {
   
    private $options;
    private $dummys;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }
    // Add options page
    public function add_plugin_page() {
        add_submenu_page(
            'piki-dashboard',
            'Dummy',
            'Dummy',
            'manage_options',
            'piki-dummys',
            array( $this, 'admin_dummys' )
        );
    }
    // Página de administração
    public function admin_dummys() {
        ?>
        <div class="wrap">
            <h2>Dummy content</h2>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikiforms_dummys_group' );   
                do_settings_sections( 'pikiforms-dummys-settings' );
                //submit_button();
                ?>
            </form> 
        </div>
    <?php
    }
    // Register and add settings
    public function page_init() {
        
        wp_enqueue_script( 'piki-dummys-scripts', Piki::url( '/dummy.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_enqueue_style( 'piki-dummys-styles', Piki::url( '/dummy.css', __FILE__ ) );

        register_setting(
            'pikiforms_dummys_group', // Option group
            'pikiforms_dummys_settings', // Option name
            array( $this, 'sanitize_dummys' ) // Sanitize
        );
        add_settings_section(
            'pikiforms_dummys_settings', // ID
            'Geração de conteúdo', // Title
            NULL, // Callback
            'pikiforms-dummys-settings' // Page
        );  
        add_settings_field(
            'status', // ID
            false, // Title 
            [ $this, 'field_dummys_build' ], // Callback
            'pikiforms-dummys-settings', // Page
            'pikiforms_dummys_settings' // Section           
        );
    }

    // Valida os valores
    public function sanitize_dummys( $input ) {
        $new_input = array();

        echo '<pre>';
        var_dump( $input[ 'preset-versions' ] );
        exit;

        if( isset( $input[ 'imagens' ] ) ):
            $new_input['imagens'] = array_slice( $input[ 'imagens' ], 0, $this->options[ 'total' ] );
        endif;
        return $new_input;
    }

    // Status
    public function field_dummys_build() {
        
        // Tipos de post
        $post_types = get_post_types([ '_builtin' => false ]);
        
        // Tipos de posts que não entram
        $excludes = [ 'pikiform', 'sp_newsletters', 'sp_report', 'sptemplates', 'sendpress_list' ];
        // Options para o select
        $options = [
            '' => 'Selecione um tipo de Post',
            'post' => 'Post',
            'page' => 'Page',
        ];
        foreach( $post_types as $type ):
            if( in_array( $type, $excludes ) ):
                continue;
            endif;
            $_type = get_post_type_object( $type );
            $options[ $type ] = $_type->labels->singular_name;
        endforeach;

        echo 
        '<div id="pikiforms_dummys_build">
            <div class="post-type-selection">',
                select::get_field([
                    'machine_name'  => 'post_types',
                    'ftype'         => 'select',
                    'id'            => 'piki_dummys_post_type',
                    'name_html'     => 'piki_dummys_post_type',
                    'options'       => $options
                ]),
            '</div>
            <div class="total-items">',
                text::get_field([
                    'machine_name'  => 'total_items',
                    'ftype'         => 'text',
                    'id'            => 'piki_dummys_total',
                    'name_html'     => 'piki_dummys_total',
                    'placeholder'   => 'Digite o total de posts a ser gerado'
                ])
            ,'</div>
            <input type="button" id="field_dummys_build" name="pikiforms_options[field_dummys_build]" value="Iniciar geração de conteúdo" class="button button-primary" />
            <div class="status"></div>
        </div>';
    }

}
// Inicia a página de administração
$pikidummys_settings_page = new PKDummySettingsPage();
// Recupera os posts que tem imagens a ser geradas
add_action( 'wp_ajax_piki_dummys_generate', array( 'PKDummy', 'generateContent' ) );
