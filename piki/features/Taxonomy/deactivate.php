<?php
function piki_taxonomy_deactivation() {
    global $wpdb;
    $table = $wpdb->prefix . "piki_taxonomy";
    $wpdb->query( "DROP TABLE IF EXISTS $table" );
}
piki_taxonomy_deactivation();