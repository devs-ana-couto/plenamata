<?php
function sitelock_check_access(){
	# Páginas permitidas sem estar logado
	$allow = array( 'wp-login.php' );
	# Nome do arquivo chamado
	$scriptname = basename( $_SERVER[ "SCRIPT_FILENAME" ] );
	# Bloqueia o site para usuários não logados
	if( !is_admin() && !is_user_logged_in() && !in_array( $scriptname, $allow ) ):
	    exit;
	endif;	
}
add_action( 'init', 'sitelock_check_access' );
?>