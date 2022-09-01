<?php
// Instalando
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
function postviews_activate(){
    
    global $wpdb;

    if( defined( 'MULTISITE' ) && MULTISITE ):

        $blogs = get_sites();
        foreach( $blogs as $blog ):

            $prefix = $wpdb->prefix . ( $blog->blog_id >= 2 ? $blog->blog_id . '_' : '' );

            // Views field
            $cols = array_column( $wpdb->get_results( "SHOW COLUMNS FROM {$prefix}posts" ), 'Field' );
            // Counter
            if( !in_array( 'views_count', $cols ) ):
                $wpdb->query( "ALTER TABLE {$prefix}posts ADD views_count bigint(20) NOT NULL DEFAULT '0' AFTER comment_count;" );
            endif;
            // Rizes exclude
            if( !in_array( 'postviews_exclude', $cols ) ):
                $wpdb->query( "ALTER TABLE {$prefix}posts ADD postviews_exclude tinyint(1) NOT NULL DEFAULT '0' AFTER comment_count;" );
            endif;

            // Views table
            dbDelta("CREATE TABLE IF NOT EXISTS {$prefix}views (
                id mediumint(11) NOT NULL AUTO_INCREMENT,
                post_id mediumint(11) NOT NULL,
                post_type varchar(30) NULL,
                time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY id (id),
                INDEX post_id (post_id),
                INDEX post_type (post_type),
                INDEX time (time)
            );");

        endforeach;

    else:
        
        // Views field
        $cols = array_column( $wpdb->get_results( "SHOW COLUMNS FROM {$prefix}posts" ), 'Field' );
        if( !in_array( 'views_count', $cols ) ):
    	   $wpdb->query( "ALTER TABLE {$wpdb->posts} ADD views_count bigint(20) NOT NULL DEFAULT '0' AFTER comment_count;" );
        endif;
        if( !in_array( 'postviews_exclude', $cols ) ):
           $wpdb->query( "ALTER TABLE {$wpdb->posts} ADD postviews_exclude tinyint(1) NOT NULL DEFAULT '0' AFTER comment_count;" );
        endif;

        // Views table
        dbDelta("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}views (
            id mediumint(11) NOT NULL AUTO_INCREMENT,
            post_id mediumint(11) NOT NULL,
            post_type varchar(30) NULL,
            time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY id (id),
            INDEX post_id (post_id),
            INDEX post_type (post_type),
            INDEX time (time)
        );");

    endif;
    
    // Rules
    flush_rewrite_rules();

}
postviews_activate();