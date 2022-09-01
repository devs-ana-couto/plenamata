<?php
global $wpdb;
$sql = "
CREATE TABLE {$wpdb->prefix}linkedin_content (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    content text NOT NULL,
    chave VARCHAR(255) DEFAULT '' NOT NULL,
    status TINYINT NULL DEFAULT 0,
    UNIQUE KEY id (id)
);
";
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
dbDelta( $sql );

// Clear rules
flush_rewrite_rules( true );
