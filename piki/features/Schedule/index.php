<?php
define( 'SCHEDULE_TYPE', 'schedule' );
define( 'VACANCIES_META', '_vacancies_' );

// Events
require_once( Piki::path( __FILE__ ) . 'includes/events.php' );

class Schedule {
	
	public function __construct() { 
		add_action( 'wp_ajax_schedule_get_month', array( 'Schedule', 'get_month' ) );
		add_action( 'wp_ajax_nopriv_schedule_get_month', array( 'Schedule', 'get_month' ) );
		add_action( 'init', array( 'Schedule', 'register_post_type' ) );
	}

    public static function register_post_type(){
		
		$args = array(
			'labels'             => array(
				'name'               => __( 'Schedules' ),
				'singular_name'      => __( 'Schedule' ),
				'menu_name'          => __( 'Schedules' ),
				'name_admin_bar'     => __( 'Schedule' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Schedule' ),
				'new_item'           => __( 'New Schedule' ),
				'edit_item'          => __( 'Edit Schedule'  ),
				'view_item'          => __( 'View Schedule' ),
				'all_items'          => __( 'All Schedules' ),
				'search_items'       => __( 'Search Schedules' ),
				'parent_item_colon'  => __( 'Parent Schedules:' ),
				'not_found'          => __( 'No Schedules found.' ),
				'not_found_in_trash' => __( 'No Schedules found in Trash.' )
			),
	        'description'        => __( 'Inteligent schedules.' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'menu_icon'			 => Piki::url( 'images/menu-icon.png', __FILE__ ),
 			'query_var'          => true,
			'rewrite'            => array( 'slug' => SCHEDULE_TYPE . 's' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => 4,
			'supports'           => array( 'title' ),
		);

		register_post_type( SCHEDULE_TYPE, $args );
	
    }

    public static function get_calendar_options(){

        global $pagenow;

        $post = false;
        if( $pagenow === 'post.php' && isset( $_GET[ 'post' ] ) ):
            $post = get_post( $_GET[ 'post' ] );
        endif;

        // Prevent infinite loops
        if( !$post || defined( '__CALENDAR_GET_OPTIONS_' . $post->ID ) ):
            return false;
        endif;
        define( '__CALENDAR_GET_OPTIONS_' . $post->ID, true );
        
        $fields = pikiform_schedule_fields();

        $post = PKMeta::db_data( $post, $fields );

        // Calendar options
        $options = array(
            'id' => 'schedule-post-field',
            'post_id' => $post->ID,
            'select_type' => isset( $post->meta[ 'select_type' ] ) ? array_shift( $post->meta[ 'select_type' ] ) : 'day',
            'multiple_selection' => isset( $post->meta[ 'multiple_selection' ] ) && $post->meta[ 'multiple_selection' ] === 'on' ? true : false,
            'period_size' => isset( $post->meta[ 'period_size' ] ) ? array_shift( $post->meta[ 'period_size' ] ) : 60,
            'vacancies_by_period' => isset( $post->meta[ 'vacancies_by_period' ] ) ? array_shift( $post->meta[ 'vacancies_by_period' ] ) : 1,
        );

        // Disabled week days
        $officeOur = officeour::parse_value( array_shift( $post->meta[ 'officeour' ] ) );
        $disableds = array();
        foreach( $officeOur as $day => $periods ):
            $empty = true;
            foreach( $periods as $period ):
                if( $period[ 'init' ] !== $period[ 'end' ] ):
                    $empty = false;
                endif;
            endforeach;
            if( $empty ):
                $disableds[] = $day;
            endif;
        endforeach;
        $options[ 'disabled_week_days' ] = $disableds;

        return $options;

    }

    public static function get_day(){

        // Date
        $date = Piki::posted( 'date', 'The date is required.' );

        // Post ID
        $ID = Piki::posted( 'post_id', 'The post ID is required.' );

        // Month day
        $month_day = strtolower( date( 'l', strtotime( $date ) ) );

        // Vacancies
        $vacancies = get_post_meta( $ID, VACANCIES_META . $month_day, true );

        // Retorno
        $return = array();

        // Escrevendo as vagas
        foreach( $vacancies as $key => $vacancie ):
            $id = $date . '_' . $key;
            $class = 'start-' . ( strpos( $vacancie[ 'init' ], '.' ) ? str_replace( '.', '-', $vacancie[ 'init' ] ) : $vacancie[ 'init' ] . '-0' );
            $return[] = '<div class="vacancie event '. $class .'"><input type="checkbox" id="'. $id .'" value="'. $date . '_' . $key .'" /><label for="'. $id .'"><span></span>'. $vacancie[ 'init' ] .' to '. $vacancie[ 'end' ] .'</label></div>';
        endforeach;

        Piki::return_json(array(
            'status' => 'success',
            'month_day' => $month_day,
            'content' => implode( '', $return ),
        ));

    }

    public static function grid_day(){



    }

    public static function save_post( $settings, $posted ){

        echo '<pre>';
        var_dump( $settings );
        exit;

        //schedule

    }

    public static function add_files(){
        // Scripts e estilos
        wp_enqueue_script( 'schedule-scripts', Piki::url( 'schedule.js', __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'schedule-styles', Piki::url( 'schedule.css', __FILE__ ) );
    }

}
$Schedule = new Schedule();

// Admin page
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

// Styles and Scripts
add_action( 'wp_enqueue_scripts', array( 'Schedule', 'add_files' ) );
add_action( 'admin_enqueue_scripts', array( 'Schedule', 'add_files' ) );

// Ajax
add_action( 'wp_ajax_schedule_get_day', array( 'Schedule', 'get_day' ) );
add_action( 'wp_ajax_nopriv_schedule_get_day', array( 'Schedule', 'get_day' ) );

// Dados do formulário de cadastro
function pikiform_schedule_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => false,
        'key' => SCHEDULE_TYPE,
        'title' => '',
        'description' => '',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'success_message' => '<h2>Agenda criado com sucesso.</h2></p>',
        'error_messages' => array(
            'tooltip' => 'tooltip',
        ),
        'edit_success_message' => '',
        'classname' => '',
        'attributes' => '',
        'submit_button_label' => 'Criar agenda',
        'edit_button_label' => 'Salvar agenda',
        'email' => array(
            'send' => false,
            'subject' => '',
            'sender' => '',
            'to' => '',
            'replyto' => '',
        ),
        'public' => true,
        'post_type' => SCHEDULE_TYPE,
        'post_type_active' => true,
    );
}

// Campos do formulário de cadastro
function pikiform_schedule_fields(){
    return array(

        'select_type' => array(
            'label' => __( 'Type' ),
            'description' => __( 'Type with user will select on schedule.' ),
            'ftype' => 'select',
            'machine_name' => 'select_type',
            'options' => array(
            	'day' => __ ( 'Day' ),
            	'days' => __( 'Interval of days' ),
            	'period' => __( 'Period' ),
            )
        ),

        'period_size' => array(
            'label' => __( 'Period size' ),
            'description' => 'The size of the period, in minuts.',
            'required' => array( 'select_type' => 'period' ),
            'ftype' => 'number',
            'machine_name' => 'period_size',
        ),

        'officeour' => array(
            'label' => __( 'Office ours' ),
            'description' => 'Available office ours in calendar.',
            'ftype' => 'officeour',
            'machine_name' => 'officeour',
            'required' => true,
        ),

        'vacancies_by_period' => array(
            'label' => __( 'Vacancies by period' ),
            'description' => 'Number of available vacancies in each calendar period.',
            'ftype' => 'number',
            'machine_name' => 'vacancies_by_period',
        ),

        'multiple_selection' => array(
            'label' => __( 'Multiple selection' ),
            'description' => 'If checked, the user can select multiple values.',
            'ftype' => 'boolean',
            'machine_name' => 'multiple_selection',
        ),

        'calendar' => array(
            'label' => __( 'Calendar' ),
            'ftype' => 'calendarr',
            'machine_name' => 'calendar',
            'select_type' => 'period',
            'options' => Schedule::get_calendar_options(),
        ),

    );
}
