<?php
function notifications_activation() {

    global $wpdb;
    
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    
    $sql = "CREATE TABLE {$wpdb->prefix}notificacoes (
        id mediumint(11) NOT NULL AUTO_INCREMENT,
        activity_id mediumint(11) NOT NULL,
        user_id mediumint(9) NOT NULL,
        PRIMARY KEY (id),
        INDEX activity_id (activity_id),
        INDEX user_id (user_id)
    );";
    
    dbDelta( $sql );

    // Flush rules
    flush_rewrite_rules( true );

}
notifications_activation();