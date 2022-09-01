<?php
// Desativando
function postviews_uninstall(){

    global $wpdb;

    if( defined( 'MULTISITE' ) && MULTISITE ):

        $blogs = get_sites();
        foreach( $blogs as $blog ):

            $prefix = $wpdb->prefix . ( $blog->blog_id >= 2 ? $blog->blog_id . '_' : '' );

            $wpdb->query( "DROP TABLE IF EXISTS {$prefix}views" );
            //$wpdb->query( "ALTER TABLE {$prefix}posts DROP views_count" );

        endforeach;

    else:

        $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}views" );
        //$wpdb->query( "ALTER TABLE {$wpdb->posts} DROP views_count" );

    endif;

}
postviews_uninstall();