<?php
define( 'SERVICES_TYPE', 'service' );

class Services {

    function __construct(){
    	//$this->make_transition();    
    }

    public function init(){
    	Services::register_post_types();
    }

    public static function register_post_types(){
		
		$args = array(
			'labels'             => array(
				'name'               => __( 'Services' ),
				'singular_name'      => __( 'Service' ),
				'menu_name'          => __( 'Services' ),
				'name_admin_bar'     => __( 'Service' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Service' ),
				'new_item'           => __( 'New Service' ),
				'edit_item'          => __( 'Edit Service'  ),
				'view_item'          => __( 'View Service' ),
				'all_items'          => __( 'All Services' ),
				'search_items'       => __( 'Search Services' ),
				'parent_item_colon'  => __( 'Parent Services:' ),
				'not_found'          => __( 'No Services found.' ),
				'not_found_in_trash' => __( 'No Services found in Trash.' )
			),
	        'description'        => __( 'Store services.' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'menu_icon'			 => Piki::url( 'images/service-icon.png', dirname( __FILE__ ) ),
 			'query_var'          => true,
			'rewrite'            => array( 'slug' => SERVICES_TYPE . 's' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 4,
			'supports'           => array( 'title', 'editor', 'excerpt' ),
		);
		register_post_type( SERVICES_TYPE, $args );	
	
    }

    public function header_scripts(){

		/*

		<!-- Use the components. We'll see usage instructions next. -->
		<script>
		braintree.client.create();
		</script>
		*/

    }

	// Load the required components.
	public static function add_files(){
	    /*
	    $filesdir = Piki::url( '/', __FILE__ );
	    // Scripts
	    wp_enqueue_script( 'braintreegateway-client-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/client.min.js', array( 'jquery' ) );
	    wp_enqueue_script( 'braintreegateway-paypal-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/paypal.min.js', array( 'jquery' ) );
	    wp_enqueue_script( 'paypal-scripts', $filesdir . 'scripts.js', array( 'jquery' ) );
	    // Styles
	    wp_enqueue_style( 'paypal-styles', $filesdir . 'styles.css' );
	    */
	}

} 
$Services = new Services();

add_action( 'init', array( $Services, 'init' ) );
/*
add_filter( 'activity_title', array( 'PikiLike', 'activity_title' ), 10, 2 );
add_filter( 'query_vars', array( 'PikiLike', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiLike', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiLike', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiLike', 'flush_rules' ) );
*/

// Dados do formulário de cadastro
function pikiform_service_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => false,
        'key' => SERVICES_TYPE,
        'title' => '',
        'description' => '',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'success_message' => '<h2>Serviço criado com sucesso.</h2></p>',
        'error_messages' => array(
            'tooltip' => 'tooltip',
        ),
        'edit_success_message' => '',
        'classname' => '',
        'attributes' => '',
        'submit_button_label' => 'Criar serviço',
        'edit_button_label' => 'Salvar serviço',
        'email' => array(
            'send' => false,
            'subject' => '',
            'sender' => '',
            'to' => '',
            'replyto' => '',
        ),
        'public' => true,
        'post_type' => SERVICES_TYPE,
        'post_type_active' => true,
    );
}

// Campos do formulário de cadastro
function pikiform_service_fields(){
    return array(
        'price' => array(
            'label' => __( 'Price' ),
            'description' => 'Price of service',
            'required' => 'on',
            'ftype' => 'money',
            'machine_name' => 'price',
        ),
        'photos' => array(
            'label' => __( 'Photos' ),
            'Description' => _( 'Photos and Images of the service' ),
            'required' => 'on',
            'ftype' => 'imagewp',
            'machine_name' => 'photos',
            'gallery' => 'on',
            'cover' => 'on',
        ),
        'duration' => array(
            'label' => __( 'Duration (minuts)' ),
            'Description' => _( 'Duration of the service (in minuts)' ),
            'required' => 'on',
            'ftype' => 'number',
            'machine_name' => 'duration',
        ),
        'offer' => array(
        	'label' => __( 'Is an offer?' ),
        	'Description' => _( 'If is checked, this service appear on Offers list.' ),
            'ftype' => 'boolean',
            'machine_name' => 'offer',
        ),
    );
}