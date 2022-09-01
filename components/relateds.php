<?php extract($args); ?>
<div class="relateds">

	<h3><?php __( 'Leia mais sobre', 'amazonia' ); ?> <?php echo $editoria->name; ?></h3><?php 

	// With image
	if( $sticky ):
		// Data
		$sdata = as_get_post_teaser_data( 
			$sticky, 
			[ 
				'check_sticky' => true, 
				'excerpt' => true,
			] 
		); ?>
		<div class="teaser related with-image <?php echo $sdata->editoria->slug; ?>">
			<div class="inner"><?php
				if( $sdata->thumb ): ?>
					<a href="<?php echo get_permalink( $sticky->ID ); ?>" class="media-wrapper" title="<?php echo strip_tags( $sdata->title ); ?>"><?php 
						echo $sdata->thumb; ?>
					</a><?php
				else: ?>
					<span class="media-wrapper"><picture></picture></span><?php
				endif; ?>
				<div><?php
					// Editoria
					echo plenamata_single_category( $sdata->meta ); 
					// Título ?>
					<h4 class="title">
						<a href="<?php echo get_permalink( $sticky->ID ); ?>" title="<?php echo strip_tags( $sdata->title ); ?>">
							<?php echo $sdata->title; ?>
						</a>
					</h4><?php
					// Exerpt
					if( $sdata->subtitle ): ?>
					<em><?php echo $sdata->subtitle; ?></em><?php 
					endif; ?>
				</div>
			</div>
		</div><?php
	endif; 

	// Without images
	if( $normals ):
		foreach( $normals as $normal ):
			$ndata = as_get_post_teaser_data( $normal, [ 'check_sticky' => true, 'excerpt' => true ] ); ?>
			<div class="teaser related with-image <?php echo $ndata->editoria->slug; ?>">
				<div><?php
					// Editoria
					echo plenamata_single_category( $ndata->meta ); 
					// Título ?>
					<h4 class="title">
						<a href="<?php echo get_permalink( $normal->ID ); ?>" title="<?php echo strip_tags( $ndata->title ); ?>">
							<?php echo $ndata->title; ?>
						</a>
					</h4><?php
					// Exerpt
					if( $ndata->subtitle ): ?>
					<em><?php echo $ndata->subtitle; ?></em><?php 
					endif; ?>
				</div>
			</div><?php
		endforeach;
	endif;
	?> 

</div>