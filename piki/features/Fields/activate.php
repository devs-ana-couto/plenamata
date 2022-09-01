<?php
// Settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );

// Upgrade file
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

function piki_fields_activate(){

    global $wpdb;
    
    // Nome da tablea
    $table_name = $wpdb->prefix . PIKIFIELDS_TABLE;
    
    // Query
    $sql = "CREATE TABLE $table_name(
        ID mediumint(9) NOT NULL AUTO_INCREMENT,
        status varchar(30) NOT NULL DEFAULT '',
        created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified timestamp NULL,
        active TINYINT(1) NOT NULL DEFAULT 0,
        label varchar(255) NOT NULL DEFAULT '',
        description varchar(255) NOT NULL DEFAULT '',
        public TINYINT(1) NOT NULL DEFAULT 0,
        capabilities LONGTEXT NOT NULL,
        PRIMARY KEY (ID),
        INDEX status (status)
    );";
    
    // Executando a query
    dbDelta( $sql );

}
piki_fields_activate();