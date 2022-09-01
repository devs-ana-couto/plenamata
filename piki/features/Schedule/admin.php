<?php
class ScheduleAdmin {

    var $form_key;
    var $settings;
    var $action;

    public function __construct() {

    }

    // Páginas de opções do plugin
    public function add_plugin_page() {
        add_menu_page(
            'Schedule', 
            'Schedule',
            'manage_options', 
            'schedule-dashboard', 
            array( $this, 'create_admin_page' ), 
            Piki::url( 'images/menu-icon.png', __FILE__ )
        );
        add_submenu_page(
            'schedule-dashboard', 
            'Schedule', 
            'Schedule', 
            'manage_options', 
            'schedule-dashboard'
        );
   }

    // Options page
    public function create_admin_page() {
        $this->smtp_options = get_option( 'schedule_options' );
        ?>
        <div class="wrap">
            <h2>Schedule</h2>           
            <form method="post" action="options.php">
            <?php
                $calendar = new Calendar(array(
                    'type' => 'schedule',
                    'id' => 'schedule-calendar',
                    'print' => true,
                    'get_days_method' => array( $this, 'get_active_days' ),
                ));
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    // Get active days
    public function get_active_days( $inicio, $fim ){

        return array();

        echo '<pre>';
        var_dump( $inicio );
        exit;

    }

    // Register and add settings
    public function page_init() {

        // Configuraçõe de SMTP
        register_setting(
            'schedule_group', // Option group
            'schedule_options', // Option name
            array( $this, 'sanitize_fields' ) // Sanitize
        );

            // Section
            add_settings_section(
                'schedule_settings', // ID
                '', // Title
                FALSE, // Callback
                'schedule' // Page
            ); 

            // Fields
            add_settings_field(
                'status', // ID
                'Enviar emails via SMTP?', // Title 
                array( $this, 'field_smtp_status' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );      
            add_settings_field(
                'host', // ID
                'Host:', // Title 
                array( $this, 'field_smtp_host' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );      
            add_settings_field(
                'host', // ID
                'Host:', // Title 
                array( $this, 'field_smtp_host' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );      
            add_settings_field(
                'port', // ID
                'Porta:', // Title 
                array( $this, 'field_smtp_port' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );      
            add_settings_field(
                'username', // ID
                'Username:', // Title 
                array( $this, 'field_smtp_username' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );      
            add_settings_field(
                'password', // ID
                'Password:', // Title 
                array( $this, 'field_smtp_password' ), // Callback
                'schedule', // Page
                'schedule_settings' // Section           
            );

    }

    // Status
    public function field_smtp_status() {
        echo '<input type="checkbox" id="piki_smtp_status" name="piki_smtp_options[status]" ', ( isset( $this->smtp_options[ 'status' ] ) && $this->smtp_options[ 'status' ] == 'on' ? 'checked="checked"' : '' ), ' /> Sim';
    }
    // Host
    public function field_smtp_host() {
        echo '<input type="text" id="piki_smtp_host" name="piki_smtp_options[host]" value="', ( isset( $this->smtp_options[ 'host' ] ) ? $this->smtp_options[ 'host' ] : '' ), '" />';
    }
    // Port
    public function field_smtp_port() {
        echo '<input type="text" id="piki_smtp_port" name="piki_smtp_options[port]" value="', ( isset( $this->smtp_options[ 'port' ] ) ? $this->smtp_options[ 'port' ] : '' ), '" />';
    }
    // Username
    public function field_smtp_username() {
        echo '<input type="text" id="piki_smtp_username" name="piki_smtp_options[username]" value="', ( isset( $this->smtp_options[ 'username' ] ) ? $this->smtp_options[ 'username' ] : '' ), '" />';
    }
    // Username
    public function field_smtp_password() {
        echo '<input type="text" id="piki_smtp_password" name="piki_smtp_options[password]" value="', ( isset( $this->smtp_options[ 'password' ] ) ? $this->smtp_options[ 'password' ] : '' ), '" />';
    }

    // Valida os valores
    public function sanitize_fields( $input ) {

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
        if( isset( $input[ 'password' ] ) && $input[ 'password' ] != '' ):
            $new_input[ 'password' ] = $input[ 'password' ];
        endif;

        return $new_input;
    }

    public function save_meta( $ID, $fields, $posted, $data_type, $data_table ){

        // Office our
        if( empty( $posted[ 'officeour' ] ) ):
            return;
        endif;
        $officeour = officeour::parse_value( $posted[ 'officeour' ] );

        // Period size
        if( empty( $posted[ 'period_size' ] ) ):
            return;
        endif;
        $period_size = $posted[ 'period_size' ];
        
        // Size of period in ours
        $period_ours = $period_size / 60;

        $tosave = array();

        // Each day
        foreach( $officeour as $day => $periods ):

            // Array of days 
            $tosave[ $day ] = array();

            // ID do horário
            $i = 1;

            // Passando pelos períodos
            foreach ( $periods as $key => $period ):

                // Se o período está vazio
                if( $period[ 'init' ] === $period[ 'end' ] ):
                    continue;
                endif;

                // Tamanho do intervalo do período
                $interval = $period[ 'end' ] - $period[ 'init' ];

                // Quantidade de horários disponíveis
                $spaces = $interval / $period_ours;

                // Próximo horário inicial
                $next_start = $period[ 'init' ];

                // Passando pelas vagas
                for( $sp = 1; $sp <= $spaces; $sp++ ):

                    // Horário de término da vaga
                    $end = $next_start + $period_ours;

                    // Se a vaga não passa do tempo limite do período
                    if( $end <= $period[ 'end' ] ):

                        $tosave[ $day ][ $i ] = array(
                            'init' => $next_start,
                            'end' => $end,
                        );

                        $i++;

                        // Próximo início de vaga
                        $next_start = $end;

                    endif;

                endfor;

            endforeach;

            // Remove valores antigos
            delete_post_meta( $ID, VACANCIES_META . $day );
            // Se existe vaga, insere no banco
            if( !empty( $tosave[ $day ] ) ):
                add_post_meta( $ID, VACANCIES_META . $day, $tosave[ $day ] );
            endif;

        endforeach;

    }

}
$ScheduleAdmin = new ScheduleAdmin();

// Ajax de validação
//add_action( 'wp_ajax_admin_form_validate', array( 'ScheduleAdmin', 'form_validate' ) );

// Adiciona o link no menu
add_action( 'admin_menu', array( $ScheduleAdmin, 'add_plugin_page' ) );
// Registra os campos na página de administração
add_action( 'admin_init', array( $ScheduleAdmin, 'page_init' ) );
// Salvando post
add_action( 'saved_post_meta', array( $ScheduleAdmin, 'save_meta' ), 10, 5 );


//add_action( 'admin_menu', array( $ScheduleAdmin, 'admin_form_fields' ) );
// Permite o upload de imagens
//add_action( 'post_edit_form_tag' , array( $ScheduleAdmin, 'edit_form_tag' ) );
// Salva os campos adicionais no formulário do admin
//add_action( 'save_post', array( 'ScheduleAdmin', 'save_custom_fields' ), 20 );