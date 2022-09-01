<?php extract($args); ?>
<section class="center destaques">
		
	<h2 class="size--2"><?php echo $title; ?></h2>

	<div><?php 
	
		// Sticky
		if( $posts->sticky ): 
			$sticky_meta = new PostMeta( $posts->sticky ); 
			$url = get_permalink( $posts->sticky->ID ); 
			$title = $sticky_meta->render( 'title', [ 'strip' => true ] ); 
			$cover = $sticky_meta->empty( 'cover' ) ? false : $sticky_meta->getFirst( 'cover' ); ?>
			<div class="destaque <?php echo $sticky_meta->render( 'categ', [ 'slug' => true ] ) ?>">
				<a href="<?php echo $url ?>" class="icon white big <?php echo $sticky_meta->getType(); ?>"><?php $sticky_meta->getTypeLabel(); ?></a>
				<div>
					<?php echo plenamata_editoria_link( $sticky_meta, 'rounded' ); ?>
					<a href="<?php echo $url; ?>" title="<?php echo $title; ?>">
						<h3><?php echo $sticky_meta->render( 'title', [ 'breakline' => true ] ); ?></h3>
						<?php if( !$sticky_meta->empty( 'excerpt' ) ): ?>
						<em><?php echo $sticky_meta->render( 'excerpt' ); ?></em>
						<?php endif; ?>
					</a>
				</div>
				<a href="<?php echo $url ?>" title="<?php echo $title; ?>" class="cover-wrapper"><?php 
					if( $cover ):
						echo $cover->cover_image->render();
					endif; ?>
				</a>
			</div><?php 
		endif; ?>

		<div class="substaques">

			<?php 
			// Second
			if( $posts->second ): 
				get_template_part( 
					'components/teaser', null,
					[ 'post' => $posts->second ]
				);
			endif; 

			// Third
			if( $posts->third ):
				get_template_part( 
					'components/teaser', null,
					[ 
						'post' => $posts->third,
						'remove-image' => true
					]
				);
			endif; 
			?>

		</div><?php 

		// Rizes
		if( $posts->rizes ):
			get_template_part( 
				'components/em-alta', null, 
				[ 'posts' => $posts->rizes ] 
			); 
		endif; ?>

	</div>

</section>