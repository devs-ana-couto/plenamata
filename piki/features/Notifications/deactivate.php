<?php
function notifications_deactivation() {
    global $wpdb;
    $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}notificacoes" );
}
notifications_deactivation();