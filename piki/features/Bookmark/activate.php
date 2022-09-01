<?php
// Instalando
require( ABSPATH . 'wp-admin/includes/upgrade.php' );
function bookmark_activate(){
    
    global $wpdb;
    $sql = "CREATE TABLE {$wpdb->prefix}bookmark (
        id mediumint(11) NOT NULL AUTO_INCREMENT,
        post_id mediumint(11) NOT NULL,
        user_id mediumint(11) NOT NULL,
        user_code varchar(50) NULL,
        title VARCHAR(255) NULL DEFAULT NULL,
        context VARCHAR(255) NULL DEFAULT NULL,
        UNIQUE KEY id (id),
        INDEX user_id (user_id),
        INDEX user_code (user_code)
    );";
    dbDelta( $sql );
    
    // Rules
    flush_rewrite_rules( true );

}
bookmark_activate();
