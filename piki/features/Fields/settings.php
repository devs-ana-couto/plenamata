<?php
// KEY
define( 'PIKIFIELDS_TABLE', 'piki_fields' );

// Tabela no banco
define( 'PIKIFIELDS_KEY', 'pikifields' );

// Autoload
function piki_fields_autoload( $className ){
	$filePath = Piki::path( __FILE__ ) . 'widgets/' . $className . '/field.inc';
	if( file_exists( $filePath ) ):
		require_once( $filePath );
	endif;
}
spl_autoload_register( 'piki_fields_autoload' );