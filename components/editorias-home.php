<section class="editorias-home"><?php 

	// Each category
	foreach( $args as $editoria ): 
		$imgpath = get_template_directory_uri() . '/assets/images' ; ?>
		<div class="<?php echo $editoria->term->slug; ?>">

			<header>

				<span class="image-wrapper">
					<picture class="imagewp">
						<source type="image/jpeg" srcset="<?php echo $imgpath; ?>/widget-<?php echo $editoria->term->slug; ?>-mob.jpeg 1x, <?php echo $imgpath; ?>/widget-<?php echo $editoria->term->slug; ?>-mob@2x.jpeg 2x" media="(max-width:550px)">
						<source srcset="<?php echo $imgpath; ?>/widget-<?php echo $editoria->term->slug; ?>.jpeg 1x, <?php echo $imgpath; ?>/widget-<?php echo $editoria->term->slug; ?>@2x.jpeg 2px" type="image/jpeg">
						<img src="<?php echo $imgpath; ?>/widget-<?php echo $editoria->term->slug; ?>.jpeg" alt="<?php echo $editoria->term->name; ?>">		
					</picture>
					<span class="firula"><span></span></span>
				</span>
			
				<h3 class="<?php echo $editoria->term->slug; ?>"><?php echo $editoria->term->name; ?></h3>
			
			</header>
			
			<div class="list-items"><?php 
				// First with thumb
				get_template_part( 
					'components/teaser-post', null,
					[ 
						'post' => array_shift( $editoria->items ),
						'excerpt' => true,
						'class' => 'sticky texts-right',
						'image_field' => 'thumb',
						'editoria' => $editoria->term,
					]
				); 
				// with excerpt
				if( !empty( $editoria->items ) ):
					get_template_part( 
						'components/teaser-post', null,
						[ 
							'post' => array_shift( $editoria->items ),
							'excerpt' => true,
							'remove-image' => true,
							'editoria' => $editoria->term,
						]
					);
				endif;
				// without excerpt
				if( !empty( $editoria->items ) ):
					get_template_part( 
						'components/teaser-post', null,
						[ 
							'post' => array_shift( $editoria->items ),
							'excerpt' => false,
							'remove-image' => true,
							'editoria' => $editoria->term,
						]
					);
				endif; ?>
			</div>

		</div><?php 
	endforeach; ?>

</section>