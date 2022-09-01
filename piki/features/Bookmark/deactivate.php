<?php
// Desativando
function bookmark_uninstall(){
    global $wpdb;
    //$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}bookmark" );
}
bookmark_uninstall();
