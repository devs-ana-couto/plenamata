<?php
function activities_activation() {
    global $wpdb;
    $table_name = $wpdb->prefix . "activities";
    $sql = "CREATE TABLE $table_name (
        activity_id mediumint(9) NOT NULL AUTO_INCREMENT,
        activity_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id mediumint(9) NOT NULL,
        object_type varchar(55) NOT NULL DEFAULT '',
        object_id mediumint(9) NOT NULL,
        action varchar(50) NOT NULL,
        activity_description mediumtext,
        PRIMARY KEY (activity_id)
    );";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
activities_activation();