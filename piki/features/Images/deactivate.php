<?php
global $wpdb;
$wpdb->query( "DROP TABLE IF EXISTS $wpdb->prefix" . PIKIIMAGES_QUEUE_POSTS_TABLE );
$wpdb->query( "DROP TABLE IF EXISTS $wpdb->prefix" . PIKIIMAGES_QUEUE_IMAGES_TABLE );
