<?php extract( $args ); ?>
<div class="lista-parceiros <?php echo $position, ' ', $style; ?>">

	<em><?php echo $title; ?></em>

	<div>

		<ul><?php
	
			foreach( $items as $item ):
				
				$meta = new PostMeta( $item->ID );
				$title = $meta->render( 'title' );
				$site = $meta->empty( 'site' ) ? false : $meta->render( 'site', [ 'just_url' => true ] ); ?>
				
				<li>

					<div><?php

						// Open link
						if( $site && $style == 'default' ):
							echo '<a href="' . $site . '" target="_blank" rel="noreferrer" title="'. $title .'">';
						endif;
						
						// Title
						echo $meta->render( $image_field, [ 'alt' => $title ] );

						// Excerpt
						if( $style == 'slider' && !$meta->empty( 'excerpt' ) ): ?>
						<div><?php echo $meta->render( 'excerpt', [ 'apply_filter' => true ] ); ?></div><?php
						endif;
						
						// Close link or button
						if( $site ):
							if( $style == 'default' ): ?>
								</a><?php
							elseif( $style == 'slider' ): ?>
								<a href="<?php echo $site; ?>" class="button ico-external ico-right" title="Conheça o site" target="_blank" rel="noreferrer noopener">
									<span><?php _e( 'Conheça o site', 'amazonia' ); ?></span>
								</a><?php
							endif; 
						endif; ?>

					</div>

				</li><?php
			
			endforeach; ?>
		
		</ul>
	
	</div>

</div>
