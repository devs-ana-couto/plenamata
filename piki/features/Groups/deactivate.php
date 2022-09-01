<?php
// Plugin settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );
// Desactivate
function piki_groups_deactivation() {
    global $wpdb;
	
	// Remove capability
	$roles = get_editable_roles();
	foreach( $roles as $role_name => $role_info ):
		$role = get_role( $role_name );
		$role->remove_cap( GROUPS_CAP ); 
	endforeach;

    // Remove a tabela
    $table = $wpdb->prefix . GROUPS_TABLE;
    $wpdb->query( "DROP TABLE IF EXISTS $table" );
    //  Remove os meta dados
    $wpdb->query($wpdb->prepare( "DELETE FROM $wpdb->usermeta WHERE meta_key = %s", GROUPS_META_KEY ));
}
piki_groups_deactivation();