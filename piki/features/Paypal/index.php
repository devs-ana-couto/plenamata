<?php
require_once( Piki::path( __FILE__ ) . '/braintree/lib/autoload.php' );

// Client ID - AediVUaRmPuaCvVMHdI8e5R70sYw5DciLDCW5PWHISzmgnJzx0SRl8EWH2aerXOKd6PatBieYUVdMQiW
// Secret - EObIkR4vUCdzuibg6ff_I2NsNUvjUM-1tOYLO53-E-Soa0QyQOrx9P17hOJosTo943cllKhCm-LWgX3T

//daa0b7eae78ac185c938b81af4ea0564f1cc7bde
define( 'BRAINTREE_ENVIROMENT', 'sandbox' );
define( 'BRAINTREE_MERCHANT_ID', 'zpstwqkvsv9xhrcp' );
define( 'BRAINTREE_PUBLIC_KEY', '3dp9tvh7krdwv4k6' );
define( 'BRAINTREE_PRIVATE_KEY', '7f6056998085bc680d1dc7fa118c3bb3' );

//Set useful variables for paypal form
define( 'PAYPAL_URL_SANDBOX', 'https://www.sandbox.paypal.com/cgi-bin/webscr' ); //Test PayPal API URL
define( 'PAYPAL_URL_LIVE', 'https://www.sandbox.paypal.com/cgi-bin/webscr' ); //Test PayPal API URL
define( 'PAYPAL_ID', 'thiago.borges28-facilitator_api1.gmail.com' ); //Business Email

class PayPal {

    function __construct(){
    	//$this->make_transition();    
    }

    public static function get_paypal_url(){
    	if( WP_ENVIROMENT === 'sandbox' ):
    		return PAYPAL_URL_SANDBOX;
    	else:
    		return PAYPAL_URL_LIVE;
    	endif;
    }

    public static function get_paypal_id(){
    	return PAYPAL_ID;
    }

    public function make_transition(){

    	// Configure credentials
		Braintree_Configuration::environment( BRAINTREE_ENVIROMENT );
		Braintree_Configuration::merchantId( BRAINTREE_MERCHANT_ID );
		Braintree_Configuration::publicKey( BRAINTREE_PUBLIC_KEY );
		Braintree_Configuration::privateKey( BRAINTREE_PRIVATE_KEY );

		// Get client token
		echo( $clientToken = Braintree_ClientToken::generate() );
		exit;

		// Nonce from client
		//$nonceFromTheClient = $_POST[ 'payment_method_nonce' ];

		/* Use payment method nonce here */

		// Transaction
		//$result = Braintree_Transaction::sale(array(
		//	'amount' => '10.00',
		//	'paymentMethodNonce' => $nonceFromTheClient,
		//	'options' => array(
		//		'submitForSettlement' => True
		//	)
		//));

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
	    //wp_enqueue_script( 'paypal-button-scripts', 'https://www.paypalobjects.com/api/checkout.js', array( 'jquery' ) );
	    //wp_enqueue_script( 'paypal-scripts', $filesdir . 'scripts.js', array( 'jquery' ) );
	    

	    //wp_enqueue_script( 'braintreegateway-client-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/client.min.js', array( 'jquery' ) );
	    //wp_enqueue_script( 'braintreegateway-paypal-scripts', 'https://js.braintreegateway.com/web/3.12.0/js/paypal.min.js', array( 'jquery' ) );
	    // Styles
	    //wp_enqueue_style( 'paypal-styles', $filesdir . 'styles.css' ); 
	}

} 
$PayPal = new PayPal();

add_action( 'wp_enqueue_scripts', array( 'PayPal', 'add_files' ) );
/*
add_filter( 'activity_title', array( 'PikiLike', 'activity_title' ), 10, 2 );
add_action( 'init', array( 'PikiLike', 'init' ) );
add_filter( 'query_vars', array( 'PikiLike', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiLike', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiLike', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiLike', 'flush_rules' ) );
*/