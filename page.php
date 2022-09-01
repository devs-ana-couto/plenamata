<?php 
get_header();
$meta = new PostMeta(); ?>
<article class="page"><?php

	// Cover
	if( !$meta->empty( 'cover' ) ): ?>
	<div class="single-cover"><?php  

		echo imagewp::renderResponsive([
			'meta' => $meta->getFirst( 'cover' ),
			'default' => [
				'field_name' => 'cover_image',
				'media' => '(min-width:541px)',
			],
			'breakpoints' => [
				[
					'field_name' => 'cover_image_mob',
					'media' => '(max-width:540px)',
				]
			]
		]); ?>

	</div><?php
	endif; ?>

	<div id="content" class="content">

		<h2 class="page-title"><?php 
			echo( $meta->empty( 'title_inline' ) ? $meta->render( 'title' ) : $meta->render( 'title_inline' ) ); ?>
		</h2>
		
		<div><?php 

			// Conteúdo
			echo $meta->render( 'body', [ 'apply_filter' => true ] ); ?>

			</footer>
		
		</div>
		
	</div>

</article>
<?php get_footer(); ?>
