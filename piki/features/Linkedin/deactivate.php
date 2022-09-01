<?php
global $wpdb;
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}linkedin_content" );
