<?php
# Requires
global $wpdb;
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
# Nome da tablea
$table_name = $wpdb->prefix . "piki_taxonomy";
# Query
$sql = "CREATE TABLE $table_name (
    
    ID mediumint(9) NOT NULL AUTO_INCREMENT,
    status varchar(30) NOT NULL DEFAULT '',
    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified timestamp NULL,
    taxonomy varchar(30) NOT NULL DEFAULT '',
    label varchar(255) NOT NULL DEFAULT '',
    labels LONGTEXT NOT NULL,
    description varchar(255) NOT NULL DEFAULT '',
    post_types MEDIUMTEXT NOT NULL,
    public TINYINT(1) NOT NULL DEFAULT 0,
    show_ui TINYINT(1) NOT NULL DEFAULT 0,
    show_in_menu TINYINT(1) NOT NULL DEFAULT 0,
    show_in_nav_menus TINYINT(1) NOT NULL DEFAULT 0,
    show_tagcloud TINYINT(1) NOT NULL DEFAULT 0,
    show_in_quick_edit TINYINT(1) NOT NULL DEFAULT 0,
    meta_box_cb varchar(255) NOT NULL DEFAULT '',
    show_admin_column TINYINT(1) NOT NULL DEFAULT 0,
    hierarchical TINYINT(1) NOT NULL DEFAULT 0,
    update_count_callback varchar(255) NOT NULL DEFAULT '',
    query_var MEDIUMTEXT NOT NULL,
    slug varchar(255) NOT NULL DEFAULT '',
    sort TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (ID),
    KEY taxonomy (taxonomy),
    INDEX status (status)
);";
# Executando a query
dbDelta( $sql );
    
    
