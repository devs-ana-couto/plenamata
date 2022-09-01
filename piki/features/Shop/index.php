<?php
// Products
require_once( Piki::path( __FILE__ ) . 'includes/products.php' );
// Services
require_once( Piki::path( __FILE__ ) . 'includes/services.php' );

class Store {

    function __construct(){
    	//$this->make_transition();    
    }

    public function init(){

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
	    $filesdir = Piki::url( '/', __FILE__ );
	    // Scripts
	    wp_enqueue_script( 'braintreegateway-client-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/client.min.js', array( 'jquery' ) );
	    wp_enqueue_script( 'braintreegateway-paypal-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/paypal.min.js', array( 'jquery' ) );
	    wp_enqueue_script( 'paypal-scripts', $filesdir . 'scripts.js', array( 'jquery' ) );
	    // Styles
	    wp_enqueue_style( 'paypal-styles', $filesdir . 'styles.css' ); 
	}

} 
$Store = new Store();

add_action( 'init', array( $Store, 'init' ) );
/*
add_filter( 'activity_title', array( 'PikiLike', 'activity_title' ), 10, 2 );
add_filter( 'query_vars', array( 'PikiLike', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiLike', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiLike', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiLike', 'flush_rules' ) );
*/