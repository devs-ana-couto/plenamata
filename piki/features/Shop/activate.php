<?php
/*
global $wpdb;
// Plugin settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );
// Requires
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
// Nome da tablea
$table_name = $wpdb->prefix . PAYPAL_PAYS_TABLE;
// Query
$sql = "CREATE TABLE $table_name (
    ID mediumint(11) NOT NULL AUTO_INCREMENT,
    order_id mediumint(11) NOT NULL,
    status varchar(30) NOT NULL DEFAULT '0',
    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    currency_code varchar(5) NOT NULL,
		gross float(10,2) NOT NULL,
	txn_id varchar(255) NOT NULL,
    description varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (ID),
    INDEX status (status),
    INDEX order_id (order_id)
);";
// Executando a query
dbDelta( $sql );
*/
Products::register_post_types();
flush_rewrite_rules();
