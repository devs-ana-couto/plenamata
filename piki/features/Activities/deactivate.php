<?php
function activities_deactivation() {
    global $wpdb;
    $table = $wpdb->prefix . "activities";
    $wpdb->query( "DROP TABLE IF EXISTS $table" );
}
activities_deactivation();