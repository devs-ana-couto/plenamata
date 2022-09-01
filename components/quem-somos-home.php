<?php
extract($args);
// Quem somos
if( !$meta->empty( 'about' ) ): 
	$about = $meta->getFirst( 'about' ); ?>
	<section class="quem-somos" data-template-name="<?php plenamata_template_name( __FILE__ ); ?>">
		
		<div class="center">
			
			<header>
				<span>
					<h2><?php _e( 'Quem somos', 'amazonia' ); ?></h2>
					<em><?php echo $about->about_title->render(); ?></em>
				</span>
				<span><?php 
					echo $about->about_desc->render([ 'apply_filter' => true ]); ?>
				</span>
			</header><?php 
			
			// Vídeo
			echo $about->about_video->render(); ?>	

		</div>

	</section><?php 
endif; ?>
