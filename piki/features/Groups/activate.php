<?php
// Plugin settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );
// Requires
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

function piki_grous_activate(){
	
	global $wpdb;
	
	// Adding capability
	$role = get_role( 'administrator' );
	$role->add_cap( GROUPS_CAP ); 
	
	// Nome da tablea
	$table_name = $wpdb->prefix . GROUPS_TABLE;
	// Query
	$sql = "CREATE TABLE $table_name (
	    ID mediumint(9) NOT NULL AUTO_INCREMENT,
	    status varchar(30) NOT NULL DEFAULT '',
	    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	    modified timestamp NULL,
	    name varchar(30) NOT NULL DEFAULT '',
	    description varchar(255) NOT NULL DEFAULT '',
	    PRIMARY KEY (ID),
	    INDEX status (status)
	);";
	// Executando a query
	dbDelta( $sql );

}
piki_grous_activate();
    
    
