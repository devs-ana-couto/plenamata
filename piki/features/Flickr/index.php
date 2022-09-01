<?php
include dirname( __FILE__ ) . '/scb/load.php';
function _piki_flickr_init() {
	
	require_once dirname( __FILE__ ) . '/core.php';
	
	$options = __piki_flickr_get_options();

	PikiFlickr_Core::init( $options->get());
	
	if ( is_admin() ) {
		require_once dirname( __FILE__ ) . '/admin.php';
		new PikiFlickr_Options_Page( __FILE__, $options );
	}

}
scb_init( '_piki_flickr_init' );

function PFOpenAlbum() {
	$album_id = $_POST["photoset"];
	print __piki_flickr_get_photos_album($album_id);
	die();
}
add_action('wp_ajax_PFOpenAlbum', 'PFOpenAlbum');
add_action('wp_ajax_nopriv_PFOpenAlbum', 'PFOpenAlbum');

function __piki_flickr_init_api($api_key="", $cachetime=0){
	global $wpdb;
	$table = $wpdb->prefix . "piki_flickr_cache";
	$connection =  array(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	include dirname( __FILE__ ) . '/phpFlickr.php';
	$f = new phpFlickr($api_key);
	if($cachetime > 0){
		$f->enableCache ("db", $connection, $cachetime, $table);
	}
	return $f;
}

function __piki_flickr_get_options(){
	$options = new scbOptions( 
		'piki_flickr_options', 
		__FILE__,
		array(
			'apikey_text'    => '',
			'userid_text'    => '',
			'apisecret_text' => '',
			'total_page_itens' => '6',
			'total_links' => '5',
			'itensperline' => '3',
			'cachetime' => '300',
		) 
	);
	return $options;
}