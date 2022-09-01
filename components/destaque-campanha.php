<?php 
extract( $args ); 
// Target
$target = $smeta->target === '_blank' ? ' target="_blank"' : ''; ?>
<div class="item sticky <?php echo _array_get( $args, 'class', '' ); ?>">
		
	<span class="content"><?php
		// Editoria
		if( $smeta->editoria ):
			echo plenamata_single_category( $smeta->meta, true );
		endif; ?>
		<h2><?php echo $smeta->title; ?></h2><?php 
		if( $smeta->subtitle ): ?>
		<em class="excerpt"><?php echo $smeta->subtitle; ?></em><?php 
		endif; ?>
		<button type="button" class="clean white" title="<?php _e( 'Conheça e participe', 'amazonia' ); ?>"><?php _e( 'Conheça e participe', 'amazonia' ); ?></button>
		<a href="<?php echo $smeta->url; ?>" title="<?php echo $smeta->title; ?>" class="back-link" <?php echo $target; ?>></a>
	</span>
	
	<a href="<?php echo $smeta->url; ?>" class="image-wrapper" title="<?php echo $smeta->title; ?>" <?php echo $target; ?>><?php 
		echo $smeta->image; ?>
		<span class="mask"><span></span></span>
	</a>

</div>