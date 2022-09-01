<?php
get_header( null, [ 'context' => 'embed' ] );
$home = Piki::get_post( 'inicio' );
$meta = new PostMeta( $home );
get_template_part( 
	'components/estimatives-area', null, 
	[ 
		'meta' => $meta, 
		'context' => 'embed' 
	] 
);
get_footer( null, [ 'context' => 'embed' ] );