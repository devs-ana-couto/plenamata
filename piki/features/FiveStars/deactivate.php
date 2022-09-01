<?php
function piki_fivestars_deactivation() {
    global $wpdb;
    $table = $wpdb->prefix . "piki_fivestars";
    $wpdb->query( "DROP TABLE IF EXISTS $table" );
}
piki_fivestars_deactivation();