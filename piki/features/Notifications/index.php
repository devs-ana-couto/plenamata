<?php
define( 'NOTIFICS_KEY', 'notificacao' );

class Notifications {

    static $types = [
        '1' => 'novidade',
        '2' => 'atualização',
    ];

    function __construct(){

        // Initig
        add_action( 'init', [ $this, 'registerType' ] );

        // Styles and scrips
        add_action( 'wp_enqueue_scripts', [ $this, 'addFiles' ] );
        
        // Shortcode
        add_shortcode( 'notifications', [ $this, 'shortcode' ] );

        // Recuperar notifiações via ajax
        add_action( 'wp_ajax_get_notifications', [ $this, 'ajaxGetNotifications' ] );
        add_action( 'wp_ajax_notification_set_view', [ $this, 'ajaxSetView' ] );
        add_action( 'wp_ajax_notification_singup', [ $this, 'ajaxSignup' ] );

    }

    public function ajaxGetNotifications(){

        if( !is_user_logged_in() ):
            Piki::error([
                'error_type' => 'not_logged'
            ]);
        endif;

        // User
        $user = wp_get_current_user();

        // Data
        $data = $this->getNotifications( $user );

		// Return json
        Piki::return_json( $data );

    }

    public function ajaxSignup(){

        // Logged in
        if( !is_user_logged_in() ):
            Piki::error([
                'error_type' => 'not_logged'
            ]);
        endif;

        // User
        $user = wp_get_current_user();

        // Set option
        if( _post( 'status' ) == 'in' ):
            update_user_meta( $user->ID, 'notifications_signup', 'true' );
        else:
            delete_user_meta( $user->ID, 'notifications_signup' );
        endif;

        Piki::success();

    }

    public function ajaxSetView(){

        global $wpdb;

        // Logged in
        if( !is_user_logged_in() ):
            Piki::error([
                'error_type' => 'not_logged'
            ]);
        endif;

        // Notification ID
        $notification_id = _post( 'notification_id' );
        if( !$notification_id ):
            Piki::error([
                'error_type' => 'not_notification_id'
            ]);
        endif;

        // User
        $user = wp_get_current_user();

        // Verify if just inserted
        $query_exists = $wpdb->prepare(
            "SELECT COUNT(0) FROM {$wpdb->prefix}notificacoes WHERE user_id = %d and activity_id = %d",
            [ $user->ID, $notification_id ]
        );
        $exists = $wpdb->get_var( $query_exists );
        if( intVal( $exists ) < 1 ):
            $wpdb->insert( 
                $wpdb->prefix . 'notificacoes', 
                [ 
                    'user_id' => $user->ID, 
                    'activity_id' => $notification_id
                ],
                [
                    '%d',
                    '%d'
                ]
            );
        endif;

        Piki::success();

    }

    public function getNotifications( $user ){

        global $wpdb;

        // Return
        $return = new stdClass();
        $return->items = false;
        $return->pendings = 0;

        // Date limit
        $date_limit = date( 'Y-m-d', strtotime( $user->data->user_registered ) );

        // Per page
        $per_page = 20;

        // Filter
        $filter = _post( 'filter' );

        // Where
        $where = $wpdb->prepare(
            "
                post_type = %s
                AND
                post_status = 'publish'
                AND
                post_date >= %s
            ",
            [
                NOTIFICS_KEY,
                $date_limit,
            ]
        );
        
        // Filter
        if( $filter ):

            if( $filter == 'unreads' ):
                $where .= " AND VI.id IS NULL";
            elseif( $filter == 'news' ):
                $where .= " AND TY.meta_value = 1";
            elseif( $filter == 'actualizations' ):
                $where .= " AND TY.meta_value = 2";
            endif;
            
        endif;

        // All list
        $query_items = $wpdb->prepare("
            SELECT 
                NO.ID, 
                NO.post_title, 
                TY.meta_value as type, 
                SE.meta_value as section, 
                UR.meta_value as url,
                VI.id as readed
            FROM $wpdb->posts NO
            LEFT JOIN $wpdb->postmeta TY ON TY.post_id = NO.ID AND TY.meta_key = 'type'
            LEFT JOIN $wpdb->postmeta SE ON SE.post_id = NO.ID AND SE.meta_key = 'section'
            LEFT JOIN $wpdb->postmeta UR ON UR.post_id = NO.ID AND UR.meta_key = 'url'
            LEFT JOIN {$wpdb->prefix}notificacoes VI ON VI.activity_id = NO.ID AND VI.user_id = %d
            WHERE $where
            GROUP BY NO.ID
            ORDER BY post_date DESC
            LIMIT %d
            ",
            [ 
                $user->ID,
                $per_page 
            ]
        );
        $return->items = $wpdb->get_results( $query_items );
        if( !empty( $return->items ) ):
            foreach( $return->items as &$item ):

                // Status
                $item->status = empty( $item->readed ) ? 'pending' : 'readed';

                // Type
                $item->type_label = Notifications::$types[ $item->type ];

                // Absolute
                if( strpos( $item->url, 'http' ) ):
                    $item->absolute = true;
                // Relative
                else:
                    $item->url = get_site_url( null, $item->url );
                    $item->absolute = false;
                endif;
            
            endforeach;
        else:
        endif;

        // Total pendings
        $query_pendings = $wpdb->prepare("
            SELECT COUNT(NO.ID)
            FROM $wpdb->posts NO 
            LEFT JOIN {$wpdb->prefix}notificacoes VI ON VI.activity_id = NO.ID AND VI.user_id = %d
            WHERE 
                NO.post_type = %s
                AND
                NO.post_status = 'publish'
                AND
                VI.id IS NULL
            ",
            [ $user->ID, NOTIFICS_KEY ]
        );
        $return->pendings = $wpdb->get_var( $query_pendings );

        // User too
        $return->user = $user;
        $return->signup = get_user_meta( $user->ID, 'notifications_signup', true );

        return $return;

    }

    public static function getTotalPendings( $user_id = false ){

        global $wpdb;

        // Just logged
        if( !is_user_logged_in() ) return false;

        // Has notifications
        $query_pendings = $wpdb->prepare("
            SELECT COUNT(NO.ID)
            FROM $wpdb->posts NO 
            LEFT JOIN {$wpdb->prefix}notificacoes VI ON VI.activity_id = NO.ID AND VI.user_id = %d
            WHERE 
                NO.post_type = %s
                AND
                NO.post_status = 'publish'
                AND
                VI.id IS NULL
            ",
            [ $user->ID, NOTIFICS_KEY ]
        );
        return $wpdb->get_var( $query_pendings );

    }

    public function shortcode( $atts ){

        if( !is_user_logged_in() ) return '';

        $options = shortcode_atts(
            [ 'button_class' => '' ],
            $atts 
        );

        $HTML = '
        <div id="wiget-notifications" data-pendings="" data-user-id="">
            <button class="active toggle ' . _array_get( $options, 'button_class' ) . '" data-action="toggle-notifications" title="Notificações">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.80799 19.019H9.82197C9.83403 19.564 10.062 20.0818 10.4558 20.4588C10.8496 20.8357 11.377 21.0408 11.9219 21.029C12.4779 21.0375 13.0155 20.8304 13.4219 20.451C13.6184 20.2676 13.7753 20.046 13.8829 19.7997C13.9906 19.5534 14.0468 19.2878 14.048 19.019H15.031C15.0128 19.8271 14.6747 20.5949 14.0908 21.1539C13.5069 21.7128 12.725 22.0171 11.9169 22C11.1097 22.0158 10.3291 21.7109 9.74634 21.1521C9.16355 20.5933 8.8261 19.8262 8.80799 19.019ZM4.50794 18.999C4.40554 19.0001 4.30521 18.9701 4.22022 18.9129C4.13523 18.8558 4.06963 18.7742 4.03199 18.679C3.99832 18.5839 3.99483 18.4806 4.02204 18.3834C4.04924 18.2862 4.10579 18.1998 4.18396 18.136C4.9475 17.5594 5.56537 16.8119 5.98804 15.9536C6.41072 15.0952 6.62648 14.1497 6.61799 13.193C6.61799 8.91997 8.07894 7.01699 9.81794 6.26899V4.869C9.86654 4.35048 10.1094 3.8695 10.4977 3.5225C10.8861 3.17551 11.3913 2.98815 11.912 2.998C12.4328 2.98813 12.9381 3.17544 13.3266 3.52241C13.7151 3.86938 13.9581 4.3504 14.007 4.869V6.19899C15.822 6.89899 17.384 8.77299 17.384 13.191C17.3759 14.1478 17.5919 15.0932 18.0148 15.9515C18.4376 16.8099 19.0555 17.5573 19.819 18.134C19.897 18.1979 19.9535 18.2843 19.9807 18.3815C20.0079 18.4786 20.0045 18.5818 19.971 18.677C19.9333 18.7722 19.8677 18.8538 19.7827 18.9109C19.6977 18.9681 19.5973 18.9981 19.4949 18.997L4.50794 18.999ZM12.0079 6.79298C9.06594 6.83198 7.63599 8.90998 7.63599 13.172C7.65929 14.9697 6.99128 16.7077 5.76996 18.027H12.089L18.2449 18.018C17.025 16.6978 16.3573 14.9604 16.379 13.163C16.379 8.94697 14.9789 6.79298 12.0859 6.79298H12.0079ZM10.8409 4.86997V5.94697C11.1989 5.87944 11.5618 5.84065 11.926 5.83097H12.089C12.3945 5.84049 12.6991 5.86956 13.001 5.91798V4.869C12.9693 4.60648 12.8413 4.36506 12.6417 4.19157C12.4422 4.01808 12.1853 3.92485 11.921 3.92997C11.6554 3.92357 11.3969 4.01629 11.1959 4.19007C10.995 4.36385 10.866 4.60623 10.834 4.86997H10.8409Z" fill="#000000"/></svg>
                <em data-meta-key="total-unreads"></em>
            </button>
            <div class="list user-block">
                <nav>
                    <button data-action="filter" class="active" title="Tudo" rel="all">Tudo</button>
                    <button data-action="filter" title="Não lidas" rel="unreads">Não lidas</button>
                    <button data-action="filter" title="Novidades" rel="news">Novidades</button>
                    <button data-action="filter" title="Atualizações" rel="actualizations">Atualizações</button>
                    <button data-action="toggle-settings" title="Configurações" class="floater-toggle" rel="settings"><span></span></button>
                </nav>
                <div class="items">
                    <ul>
                        <li>
                            <em></em>
                            <a>
                                <strong></strong>
                                <span></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="menu-settings">
                    <div>
                        <button class="check-all" data-action="check-all" title="marcar todas como lidas">marcar todas como lidas</button>
                    </div>
                    <div>
                        <button class="check-signup" data-action="toggle-signup" title="receber notificações via e-mail">receber notificações via e-mail</button>
                        <em>Notificações ativadas</em>
                        <div class="slider">
                            <div class="email">
                                <label>e-mail</label>
                                <em class="email" data-meta-key="email">email@email.com.br</em>
                            </div>
                            <div class="field boolean">
                                <input type="checkbox" name="mail-signup" id="mail-signup">
                                <label for="mail-signup">
                                    <strong>Receber notificações por email</strong>
                                    <span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>';
        
        return $HTML;

    }

    public static function registerType(){

        // Tipo de conteúdo
        $post_type_settings = array(
            'labels' => array (
                'name' => 'Notificações',
                'singular_name' => 'Notificação',
                'add_new' => 'Adicionar nova',
                'add_new_item' => 'Adicionar nova notificação',
                'edit_item' => 'Editar notificação',
                'new_item' => 'Nova notificação',
                'view_item' => 'Ver notificação',
                'search_items' => 'Procurar notificaçãos',
                'not_found' => 'Nenhuma notificação encontrado',
                'not_found_in_trash' => 'Nada econtrado na lixeira',
                'all' => 'todos',
            ),
            'has_archive' => false,
            'public'                => false,
            'publicly_queryable'    => false,
            'query_var'             => false,
            'rewrite'               => false,
            'hierarchical'          => false,
            'menu_position'         => 9,
            'exclude_from_search'   => true,
            'supports'              => [ 'title' ],
            'show_ui'               => true, 
            'show_in_menu'          => true,
            'menu_icon' => 'dashicons-bell',
        );

        register_post_type( NOTIFICS_KEY, $post_type_settings );
    
    }

    // Scripts e estilos
    public function addFiles(){
        $path = Piki::url( '/' , __FILE__ );
        wp_enqueue_script( 'notifications-scripts', $path . 'scripts.js', [ 'jquery' ] );
        wp_enqueue_style( 'notifications-styles', $path . 'styles.css' );
    }

}
$Notifications = new Notifications();

// Dados do formulário de cadastro
function pikiform_notificacao_settings(){
    return [
        'key' => NOTIFICS_KEY,
        'error_general' => false,
        'post_type' => NOTIFICS_KEY,
        'post_type_active' => true,
    ];
}

// Campos do formulário de cadastro
function pikiform_notificacao_fields(){

    return [
        'type' => [
            'machine_name' => 'type',
            'ftype' => 'select',
            'label' => 'Tipo de notificação',
            'required' => true,
            'options' => Notifications::$types,
        ],
        'section' => [
            'machine_name' => 'section',
            'label' => 'Seção',
            'ftype' => 'text',
            'required' => true,
        ],
        'url' => [
            'machine_name' => 'url',
            'label' => 'URL',
            'ftype' => 'text',
            'description' => 'Para endereços internos, retirar o ' . get_site_url() . '. <br>Para endreços externos, usar endereços absolutos, com https:// no início.',
            'required' => true,
        ],
    ];

}
