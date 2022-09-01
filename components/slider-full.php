<?php extract($args); ?>
<div class="slider-full">
	<div class="center-slider">
		<div class="swiper swiper-slider fixed-height <?php echo $class; ?>">
			<div class="swiper-wrapper"><?php 
				foreach( $items as $item ):
					?><div class="swiper-slide">
						<?php
						// Static image
						echo $item[ 'image' ]; 
						// Legenda
						if( $item[ 'caption' ] ):
							echo $item[ 'caption' ];
						endif;
						?>
					</div><?php
				endforeach; ?>
			</div>
		</div>
	</div>
</div>