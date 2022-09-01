<?php

class WordPress_Custom_Status {
  
  // ...
  
	/**
	* Register Post Status using WordPress API
	*/
  	public function register_status() {
		register_post_status( $this->slug, $this->settings );
	}
	
	// ...
}