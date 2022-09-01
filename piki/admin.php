<?php
class PikiSettingsPage {

    private $features;
    private $features_list;
    private $features_dir;
    private $requireds = [ 'Meta', 'Fields', 'Forms' ];

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'add_plugin_page' ], 1, 1 );
        add_action( 'admin_init', [ $this, 'page_init' ] );
        // Diretórios das features
        $this->features_dir = Piki::path( __FILE__, 'features/' );
    }

    // Lista de features
    public function get_features_list(){
        return get_option( 'piki_features_options', [] );
    }

    // Seta a lista de features
    public function set_features_list( $features ){
        update_option( 'piki_features_options', $features );
    }

    // Recupera a lista de features na pasta
    public function extract_features(){
        
        $actual_list = $this->get_features_list();
        
        // Diretórios
        $dirs = array_diff( scandir( $this->features_dir ), [ '..', '.' ] );
        $dirs = array_diff( $dirs, $this->requireds );
        
        // Features encontradas
        $features = array_fill_keys( $this->requireds, 'on' );

        foreach( $dirs as $key => $feature ):
            // Apenas diretórios
            if( is_dir( $this->features_dir . $feature ) ):
                $features[ $feature ] = isset( $actual_list[ $feature ] ) && $actual_list[ $feature ] === 'on' ? 'on' : 'off';
            endif;
        endforeach;

        // Atualiza a lista de features no banco
        $this->set_features_list( $features );
        
        // Verifica features que foram desativadas
        $this->check_changeds_satatus( $actual_list, $features );
        
        // Retorna
        return $features;
    
    }

    // Páginas de opções do plugin
    public function add_plugin_page() {
        add_menu_page(
            'Piki', 
            'Piki',
            'manage_options',
            'piki-dashboard',
            [ $this, 'create_admin_page' ],
            Piki::url( 'images/piki-icon.png', __FILE__ )
        );
        add_submenu_page(
            'piki-dashboard',
            'Features',
            'Features',
            'manage_options',
            'piki-dashboard'
        );
   }

    // Página de opções de features
    public function create_admin_page() {
        // Features marcadas
        $this->features = get_option( 'piki_features_options' );
        Piki::add_library( 'custom-fields' ); ?>
        <div class="wrap">
            
            <h2>Piki Pack</h2>           
            
            <h3>Features:</h3>           
            
            <form method="post" action="options.php" id="piki-features">
            
                <fieldset id="features-fields"><?php
                    
                    // This prints out all hidden setting fields
                    settings_fields( 'piki_features_group' );
                    
                    // Busca as features na pasta
                    $features = self::extract_features(); 
                    
                    // Lista todas as features disponíveis
                    foreach ( $features as $feature => $status ):
                        if( in_array( $feature, $this->requireds ) ):
                            $value = 'checked="checked" disabled="disabled"';
                            $class = 'required';
                        else:
                            $value = $status === 'on' ? 'checked="checked"' : '';
                            $class = 'optional';
                        endif;
                        echo 
                        '<div class="item-check">
                            <label for="piki_features_'. $feature .'" class="'. $class .'">
                                <input type="checkbox" class="piki-feature-'. $feature .'" id="piki_features_'. $feature .'" name="piki_features_options['. $feature .']" value="on"', $value, ' piki-check-background="'. Piki::url( 'features/'. $feature .'/images/feature-icon.png', __FILE__ ) .'">
                                <span class="text">'. $feature .'</span>
                            </label>
                        </div>';
                    endforeach; ?>

                </fieldset>

                <div class="obs">(*) This Feature is required, and can't be disabled.</div><?php 
                submit_button(); ?>
            
            </form>
        </div>

        <script type="text/javascript">jQuery(function(){jQuery('#features-fields input').pikiCheckbox()});</script><?php
    
    }

    // Register and add settings
    public function page_init(){

        // Configuraçõe gerais
        register_setting(
            'piki_features_group', // Option group
            'piki_features_options', // Option name
            [ $this, 'sanitize_features' ] // Sanitize
        );

        // Section
        add_settings_section(
            'piki_features_section', // ID
            'Features', // Title
            NULL, // Callback
            'piki-features' // Page
        ); 
        
        // Fields
        add_settings_field(
            'features', // ID
            'Features disponíveis', // Title 
            [ $this, 'field_features' ], // Callback
            'piki-features', // Page
            'piki_features_section' // Section           
        );

    }

    // Valida os valores
    public function sanitize_features( $input ) {

        // Apenas quando postado
        if( !isset( $_POST[ 'piki_features_options' ] ) || empty( $_POST[ 'piki_features_options' ] ) ):
            return $input;
        endif;

        // Lista de features atualizadas no banco
        $features_list = $this->get_features_list();

        // Lista o estado de cada feature
        $new_input = [];
        foreach( $features_list as $feature => $status ):
            // Insere a feature na lista
            $new_input[ $feature ] = in_array( $feature, $this->requireds ) || on( $input, $feature ) ? 'on' : 'off';
        endforeach;

        // Chama os métods das features que mudaram de status
        $this->check_changeds_satatus( $features_list, $new_input );

        // Escreve o arquivo de features
        if( is_writable( PIKI_FEATURES_FILE ) ):
            $this->write_features_file( $new_input );
        endif;
        
        // Retorna
        return $new_input;
    }

    // Atualiza os status das features
    public function check_changeds_satatus( $before, $after ){
        // Passa pelo array de features
        foreach( $after as $feature => $status ):
            // A feature foi ativada
            if( $status == 'on' && _array_get( $before, $feature ) == 'off' ):
                $this->activate_feature( $feature );
            // A feature foi desativada
            elseif( !isset( $before[ $feature ] ) || ( $status == 'off' && _array_get( $before, $feature ) == 'on' ) ):
                $this->deactivate_feature( $feature );
            endif;
        endforeach;
    }

    // Ativa uma feature
    private function activate_feature( $feature ){
        $activate_file = $this->features_dir . $feature . '/activate.php';
        if( is_file( $activate_file ) ):
            require_once( $activate_file );
        endif;
    }

    // Desativa uma feature
    private function deactivate_feature( $feature ){
        $deactivate_file = $this->features_dir . $feature . '/deactivate.php';
        if( is_file( $deactivate_file ) ):
            require_once( $deactivate_file );
        endif;
    }

    // Escreve o arquivo e plugins
    private function write_features_file( $features ){

        // Quebra de linha
        $br = "\n";
        // PHP
        $towrite  = '<?php' . $br;

        // Plugins obrigatórios
        $base = [
            'Meta' => 'on', 
            'Fields' => 'on', 
            'Forms' => 'on',
            'Pager' => 'on'
        ];
        $plugins = array_merge( $base, $features );

        // Escreve os includes
        foreach( $features as $feature => $status ):
            if( $status == 'on' ):
                $towrite  .= '// ' . $feature . $br;
                $towrite  .= 'require_once( Piki::path( __FILE__, \'features/'. $feature .'/index.php\' ) );' . $br;
            endif;
        endforeach;

        // Escreve o arquivo
        if( !file_put_contents( PIKI_FEATURES_FILE, $towrite, FILE_TEXT ) ):
            Piki::error( 'O arquivo ' . PIKI_FEATURES_FILE . ' não pôde ser criado.' );
        endif;

        // Carrega o novo arquivo
        require( PIKI_FEATURES_FILE );
        
        // Flush rules
        global $wp_rewrite;
        $wp_rewrite->flush_rules();

    }

}
if( is_admin() ):
    $piki_settings_page = new PikiSettingsPage();
    add_action( 'wp_ajax_piki_load_options', array( 'PikiSettingsPage', 'load_options' ) );
    add_action( 'wp_ajax_piki_change_status', array( 'PikiSettingsPage', 'change_status' ) );
endif;
