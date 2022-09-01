<?php
function FiveStars_activation() {
    
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	
    global $wpdb;
    
    $sql = "CREATE TABLE ".$wpdb->prefix."piki_fivestars (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_id mediumint(9) NOT NULL,
        object_id mediumint(9) NOT NULL,
        object_type varchar(30) NOT NULL,
        ip varchar(15) NOT NULL,
        score tinyint(3) NOT NULL,
        UNIQUE KEY id (id)
    );";
	
    dbDelta( $sql );
    
}
FiveStars_activation();
