<?php 
// Arguments
extract($args);
// Image field
$args[ 'image_field' ] = 'destaque_image';
// Data
$data = plenamata_get_teaser_data( $item, $args ); 
// Link
$link = !isset( $args[ 'link' ] ) || $args[ 'link' ] != false; 
// Hide legend
$hide_legend = _array_get( $args, 'hide_legend' );
// Hide legend
$hide_author = _array_get( $args, 'hide_author' ); 
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' ); ?>
<div class="cover-full <?php echo _array_get( $args, 'class', '' ); ?>">

	<a href="<?php echo $data->url; ?>" class="media-wrapper" title="<?php echo strip_tags( $data->title ); ?>">
		<picture class="imagewp">
			<?php echo $data->image; ?>
		</picture>
	</a><?php 

	// Editoria
	if( $data->editoria ):
		echo plenamata_editoria_link( $data->meta, 'skew' ); 
	endif; ?>

	<a href="<?php echo $data->url; ?>" class="link-texts" title="<?php echo strip_tags( $data->title ); ?>"><?php

		// Title ?>
		<<?php echo $ttag; ?> class="title"><?php echo $data->title; ?></<?php echo $ttag; ?>><?php 

		// Subtitle
		if( isset( $data->subtitle ) && $data->subtitle ): ?>
		<p><?php echo $data->subtitle; ?></p><?php
		endif;

		// Author
		if( !$hide_author && $data->author ): ?>
		<em class="author">Por <strong><?php echo $data->author; ?></strong></em><?php
		endif; ?>
	
	</a><?php 

	// Admin
	if( $is_admin ):
		Capas::getTeaserFields([
			'post_id' => $data->post_id,
			'group' => $data->group,
			'template' => __FILE__,
		]); 
	endif; ?>

</div><?php  

if( !$hide_legend && isset( $data->legend ) && $data->legend ): ?>
<cite class="cover-full-legend"><?php echo $data->legend; ?></cite><?php 
endif; ?>