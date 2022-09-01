<?php
define( 'PRODUCTS_TYPE', 'product' );

class Products {

    function __construct(){
    	//$this->make_transition();    
    }

    public function init(){

    	Products::register_post_types();

    }

    public static function register_post_types(){
		
		$args = array(
			'labels'             => array(
				'name'               => __( 'Products' ),
				'singular_name'      => __( 'Product' ),
				'menu_name'          => __( 'Products' ),
				'name_admin_bar'     => __( 'Product' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Product' ),
				'new_item'           => __( 'New Product' ),
				'edit_item'          => __( 'Edit Product'  ),
				'view_item'          => __( 'View Product' ),
				'all_items'          => __( 'All Products' ),
				'search_items'       => __( 'Search Products' ),
				'parent_item_colon'  => __( 'Parent Products:' ),
				'not_found'          => __( 'No Products found.' ),
				'not_found_in_trash' => __( 'No Products found in Trash.' )
			),
	        'description'        => __( 'Store products.' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'menu_icon'			 => Piki::url( 'images/product-icon.png', dirname( __FILE__ ) ),
 			'query_var'          => true,
			'rewrite'            => array( 'slug' => PRODUCTS_TYPE . 's' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 4,
			'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
		);
		register_post_type( PRODUCTS_TYPE, $args );	
	
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
$Products = new Products();

add_action( 'init', array( $Products, 'init' ) );
/*
add_filter( 'activity_title', array( 'PikiLike', 'activity_title' ), 10, 2 );
add_filter( 'query_vars', array( 'PikiLike', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiLike', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiLike', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiLike', 'flush_rules' ) );
*/

// Dados do formulário de cadastro
function pikiform_product_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => false,
        'key' => PRODUCTS_TYPE,
        'title' => '',
        'description' => '',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'success_message' => '<h2>Produto criado com sucesso.</h2></p>',
        'error_messages' => array(
            'tooltip' => 'tooltip',
        ),
        'edit_success_message' => '',
        'classname' => '',
        'attributes' => '',
        'submit_button_label' => 'Criar produto',
        'edit_button_label' => 'Salvar produto',
        'email' => array(
            'send' => false,
            'subject' => '',
            'sender' => '',
            'to' => '',
            'replyto' => '',
        ),
        'public' => true,
        'post_type' => PRODUCTS_TYPE,
        'post_type_active' => true,
    );
}

// Campos do formulário de cadastro
function pikiform_product_fields(){
    return array(
        'price' => array(
            'label' => __( 'Price' ),
            'description' => 'Price of product',
            'required' => 'on',
            'ftype' => 'money',
            'machine_name' => 'price',
        ),
        'photos' => array(
        	'label' => __( 'Photos' ),
        	'Description' => _( 'Photos and Images of the product' ),
            'required' => 'on',
            'ftype' => 'imagewp',
            'machine_name' => 'photos',
            'gallery' => 'on',
            'cover' => 'on'
        ),
    );
}