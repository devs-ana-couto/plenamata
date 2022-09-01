<?php
global $wpdb;
$sql = "
CREATE TABLE " . $wpdb->prefix . "pikiimages_queue_posts (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    post_type VARCHAR(255) DEFAULT '' NOT NULL,
    post_id mediumint(9) NOT NULL,
    post_title text NOT NULL,
    status mediumint(9) NOT NULL,
    UNIQUE KEY id (id)
);
CREATE TABLE " . $wpdb->prefix . "pikiimages_queue_images (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    post_id mediumint(9) NOT NULL,
    local_path mediumtext NOT NULL,
    remote_path mediumtext NOT NULL,
    status mediumint(9) NOT NULL,
    report mediumtext NOT NULL,
    UNIQUE KEY id (id)
);
";
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
dbDelta( $sql );
