<?php /* Template Name: Home */ ?>
<?php 
// Header
get_header();

// Meta
$meta = new PostMeta();

// Monitor
get_template_part( 'components/estimatives-area', null, [ 'meta' => $meta ] ); ?>

<div class="ordered-blocks"><?php 
	// Get home blocks
	Home::getBlocks( $meta ); ?>
</div><?php

// Footer
get_footer();