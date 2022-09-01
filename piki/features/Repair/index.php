<?php
# URL's
$oldurl = 'localhost/bb/imoveis/app';
$newurl = 'localhost/bb/imoveis/git/app';
# Update das homes
update_option( 'siteurl',  'http://' . $newurl );
update_option( 'home', 'http://' . $newurl );
# Atualiza os links nos conteúdos
$wpdb->query($wpdb->prepare(
	"UPDATE ". $wpdb->prefix ."posts SET post_content = REPLACE( post_content, %s, %s ), guid = REPLACE( guid, %s, %s )",
	array( $oldurl, $newurl, $oldurl, $newurl )
));
$wpdb->query($wpdb->prepare(
	"UPDATE ". $wpdb->prefix ."options SET option_value = REPLACE( option_value, %s, %s )",
	array( $oldurl, $newurl )
));
