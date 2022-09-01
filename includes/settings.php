<?php
class ASN {

    STATIC $options;

    function __construct(){
        // Menu
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ), 1, 1 );
    }

    // Páginas de opções do plugin
    public function add_plugin_page() {
        add_menu_page(
            'ASN', 
            'ASN', 
            'manage_options', 
            'asn', 
            array( $this, 'general_admin_page' ), 
            'dashicons-admin-settings'
        );
        add_submenu_page(
            'asn', 
            'Configurações', 
            'Configurações',
            'manage_options', 
            'asn',
            array( $this, 'general_admin_page' )
        );
    }

    // Get option
    public static function getOption( $key, $first = true ){

        $options = self::getOptions();
        $option = _array_get( $options, $key );
        
        return !$option ? false : ( is_array( $option ) && $first ? reset( $option ) : $option );
    
    }

    // Get all options
    public static function getOptions(){

        if( is_null( self::$options ) ):
            $form_data = unserialize( get_option( 'asn' ) );
            self::$options = $form_data;
        endif;

        return self::$options;

    }

    // Página de opções de about
    public function general_admin_page() {

        // Fields maks
        Piki::add_library( 'fields-masks' );

        ?>
        <div class="wrap">
            <h2><strong>ASN</strong> - Configurações gerais</h2> 
            <?php 
            $form_data = get_option( 'asn' );
            $form_data = unserialize( $form_data );
            $form = PikiForms::get_form( 'asn', $form_data ); 
            echo $form[ 'html' ];
            ?>
        </div>
        <?php
    }

}
$ASN = new ASN();

// Destaques
function pikiform_plenamata_settings(){
    return array(
        'key' => 'asn',
        'classname' => 'settings-form',
        'success_message' => '<div id="message" class="updated notice notice-success"><p>Dados atualizados com sucesso.</div>',
        'submit_button_label' => 'Salvar',
        'edit_button_label' => 'Salvar',
        'email' => array(
            'send' => false,
        ),
        'public' => true,
        'isSettingsForm' => true
    );
}
function pikiform_plenamata_fields(){
    
    $fields = [];

    $fields[ 'home_template' ] = [
        'machine_name' => 'home_template',
        'ftype' => 'select',
        'label' => 'Template dos destaques da home',
        'options' => [
            '' => 'Padrão (hero + 3 teasers com foto',
            '2' => 'Destaque grande com foto à esquerda + dois destaques menores com foto, à direita',
            '3' => 'Destaque grande com foto à esquerda + um destaque menor com foto, e dois destaques sem foto, à direita',
        ],
    ];

    return $fields;

}

