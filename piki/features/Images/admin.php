<?php
class PikiImagesSettingsPage {
   
    private $options;
    private $images;

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }
    // Add options page
    public function add_plugin_page() {
        add_submenu_page(
            'piki-dashboard',
            'Images',
            'Images',
            'manage_options',
            'piki-images',
            array( $this, 'admin_images' )
        );
    }
    // Página de administração
    public function admin_images() {
        ?>
        <div class="wrap">
            <h2>Pikiforms - Images</h2>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields( 'pikiforms_images_group' );   
                do_settings_sections( 'pikiforms-images-settings' );
                //submit_button();
                ?>
            </form> 
        </div>
    <?php
    }
    // Register and add settings
    public function page_init() {
        
        wp_enqueue_script( 'piki-images-scripts', Piki::url( 'images.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_enqueue_style( 'piki-images-styles', Piki::url( 'images.css', __FILE__ ) );

        register_setting(
            'pikiforms_images_group', // Option group
            'pikiforms_images_settings', // Option name
            array( $this, 'sanitize_images' ) // Sanitize
        );
        add_settings_section(
            'pikiforms_images_settings', // ID
            'Geração de imagens', // Title
            NULL, // Callback
            'pikiforms-images-settings' // Page
        );  
        add_settings_field(
            'status', // ID
            'Refazer imagens', // Title 
            array( $this, 'field_images_rebuild' ), // Callback
            'pikiforms-images-settings', // Page
            'pikiforms_images_settings' // Section           
        );
    }

    // Valida os valores
    public function sanitize_images( $input ) {
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
    public function field_images_rebuild() {
        
        // Selectbox
        $s = new select();
        
        // Tipos de post
        $post_types = get_post_types(array( '_builtin' => false ));
        
        // Tipos de posts que não entram
        $excludes = array( 'pikiform', 'sp_newsletters', 'sp_report', 'sptemplates', 'sendpress_list' );        
        
        // Options para o select
        $options = array( '' => 'Selecione um tipo de Post' );
        foreach( $post_types as $type ):
            if( in_array( $type, $excludes ) ):
                continue;
            endif;
            $_type = get_post_type_object( $type );
            $options[ $type ] = $_type->labels->singular_name;
        endforeach;

        echo 
        '<div id="pikiforms_images_rebuild">',
            '<div class="post-type-selection">',
                $s->get_field(array(
                    'machine_name'  => 'post_types',
                    'ftype'         => 'select',
                    'id'            => 'piki_images_post_type',
                    'name_html'     => 'piki_images_post_type',
                    'options'       => $options
                )),
            '</div>',
            '<input type="button" id="field_images_rebuild" name="pikiforms_options[field_images_rebuild]" value="Iniciar geração de imagens" class="button button-primary" />',
            '<div class="status"></div>
            <table class="wp-list-table widefat fixed posts">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>';
    }

}
// Inicia a página de administração
$pikiimages_settings_page = new PikiImagesSettingsPage();
// Recupera os posts que tem imagens a ser geradas
add_action( 'wp_ajax_piki_images_to_rebuild', array( 'PikiImages', 'images_to_rebuild' ) );
// Processa um post
add_action( 'wp_ajax_piki_images_proccess_post', array( 'PikiImages', 'proccess_post' ) );
