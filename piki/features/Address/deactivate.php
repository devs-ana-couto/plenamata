<?php
global $wpdb;
$table = $wpdb->prefix . "piki_address";
$wpdb->query( "DROP TABLE IF EXISTS $table" );
