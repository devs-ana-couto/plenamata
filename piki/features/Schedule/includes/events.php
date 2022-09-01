<?php
define( 'EVENTS_TYPE', 'event' );

class Events { 
	
	public function __construct() { 
		add_action( 'init', array( $this, 'init' ) );
	}

	public function init(){
		$this->register_post_type();
	}

	private function register_post_type(){
		
		$args = array(
			'labels'             => array(
				'name'               => __( 'Events' ),
				'singular_name'      => __( 'Event' ),
				'menu_name'          => __( 'Events' ),
				'name_admin_bar'     => __( 'Event' ),
				'add_new'            => __( 'Add New' ),
				'add_new_item'       => __( 'Add New Event' ),
				'new_item'           => __( 'New Event' ),
				'edit_item'          => __( 'Edit Event'  ),
				'view_item'          => __( 'View Event' ),
				'all_items'          => __( 'All Events' ),
				'search_items'       => __( 'Search Events' ),
				'parent_item_colon'  => __( 'Parent Events:' ),
				'not_found'          => __( 'No Events found.' ),
				'not_found_in_trash' => __( 'No Events found in Trash.' )
			),
	        'description'        => __( 'Events' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'menu_icon'			 => Piki::url( 'images/events-menu-icon.png', dirname( __FILE__ ) ),
 			'query_var'          => true,
			'rewrite'            => array( 'slug' => EVENTS_TYPE . 's' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 9,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' )
		);

		register_post_type( EVENTS_TYPE, $args );	
	
	}

}
$Events = new Events();