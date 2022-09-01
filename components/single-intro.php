<?php 
// Arguments
extract($args); 
// Post type
$type = $meta->getType(); 
// Link subeditoria
$links_subeditoria = !in_array( $type, [ PODS_KEY, VIDEOS_KEY, IMAGES_KEY ] ); ?>
<div class="single-intro default">

	<div class="floater-box"><?php 
		// Dates and share
		get_template_part( 'components/dates-share', null, [ 'class' => 'inner' ] ); ?>
	</div>

	<div class="content"><?php

		if( $meta->getType() != 'post' ): ?>
		<em><?php echo $meta->getTypeLabel( true ); ?></em><?php 
		endif; ?>

		<?php echo plenamata_single_category( false, $links_subeditoria ); ?>

		<h2><?php echo $meta->render( 'title' ); ?></h2>

		<?php if( !empty( 'author' ) ): ?>
		<div class="author">
			Por <strong><?php echo $meta->render( 'author' ); ?></strong>
		</div>
		<?php endif; ?>

		<?php 
		// Dates and share
		get_template_part( 
			'components/dates-share', null,
			[ 'post_id' => $meta->ID ]
		); 

		// Body
		if( !$meta->empty( 'body' ) ): ?>
		
			<div class="text-content">
				<?php echo $meta->render( 'body', [ 'apply_filter' => true ]); ?>
			</div><?php 

		endif;

		get_template_part( 
			'components/share-contact', null,
			[ 'post_id' => $meta->ID ]
		); ?>
		
	</div>
	
</div>