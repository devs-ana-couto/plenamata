<?php
global $wpdb;
// Plugin settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );
// Remove a tabela
$table = $wpdb->prefix . PAYPAL_PAYS_TABLE;
$wpdb->query( "DROP TABLE IF EXISTS $table" );
