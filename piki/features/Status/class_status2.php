<?php

class WordPress_Custom_Status {
  
  // ...
  
  /**
   * Register the post status if everything that is required is set
   */
	public function __construct( $args = array() ) {

		if( empty( $args ) ) {
			return;
		}

		if( ! isset( $args['post_type'] ) || empty( $args['post_type'] ) ) {
			return;
		}

		if( ! isset( $args['slug'] ) || $args['slug'] == '' ) {
			return;
		}

		$this->post_type = $args['post_type'];
		$this->slug = $args['slug'];

		if( isset( $args['action'] ) && in_array( $args['action'], array( false, true, 'publish', 'edit' ) ) ) {
			$this->enable_action = $args['action'];
		}

		if( ! isset( $args['label'] ) || $args['label'] == '' ) {
			$args['label'] = ucfirst( $args['slug'] );
		}

		if( ! isset( $args['label_count'] ) || $args['label_count'] == '' ) {
			$args['label_count'] = _n_noop( $args['label'] . ' <span class="count">(%s)</span>',  $args['label'] . ' <span class="count">(%s)</span>');
		}

		unset( $args['slug'] );
		unset( $args['post_type'] );
		unset( $args['action'] );
		$this->settings = wp_parse_args( $args, $this->defaults );
		add_action( 'init', array( $this, 'register_status' ) );
		add_action( 'admin_footer', array( $this, 'set_status' ) );
	}
	
	// ...
}