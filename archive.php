<?php 
// Header
get_header(); 
// Destaques
$destaques = Campanhas::getDestaques(); ?>
<section id="content" class="page-ultimas-noticias"><?php 

	// Destaques
	get_template_part( 'components/destaques', 'campanhas', [ 'destaques' => $destaques ] ); ?>

	<h2 class="center"><?php _e( 'Outras campanhas', 'amazonia' ); ?></h2>
	
	<div id="outras-noticias" class="list-items center">

		<header>
			<h2><?php _e( 'Outras notícias', 'amazonia' ); ?></h2><?php 
			// Filters
			echo $noticias[ 'filter' ]; ?>
		</header><?php 
		
		if( !empty( $noticias[ 'posts' ] ) ): ?>
			<div id="lista-outras" class="list-teasers"><?php

				foreach( $noticias[ 'posts' ] as $item ):
					get_template_part( 
						'components/teaser-post', null,
						[ 
							'item' => $item,
							'title_tag' => 'h3',
							'editoria' => $term,
							'excerpt' => ( $term->term_id == 1 )
						]
					);
				endforeach; ?>
				
			</div><?php

			echo $noticias[ 'pager' ];

	    else:

	    	get_template_part( 'components/no-results' );

	    endif ?>
	
	</div>

</section><?php

// Footer
get_footer(); ?>




<?php get_header(); ?>
<div class="destaques center style--2"><?php 
	
	// Sticked
	if( $destaques->sticky ): 
		$smeta = plenamata_get_teaser_data( $destaques->sticky, [ 'image_field' => 'destaque_image', 'excerpt' => true ] ); ?>
		<div class="item sticky">
		
			<span class="content"><?php
				// Editoria
				if( $smeta->editoria ):
					echo plenamata_single_category( $smeta->meta, true, _array_get( $args, 'editoria' ) );
				endif; ?>
				<h2><?php echo $smeta->title; ?></h2><?php 
				if( $data->subtitle ): ?>
				<em class="excerpt"><?php echo $data->subtitle; ?></em><?php 
				endif; ?>
				<button type="button" class="clean white" title="Conheça e participe">Conheça e participe</button>
				<a href="<?php echo $smeta->url; ?>" title="<?php echo $smeta->title; ?>" class="back-link"></a>
			</span>
			
			<a href="<?php echo $smeta->url; ?>" class="image-wrapper" title="<?php echo $smeta->title; ?>"><?php 
				echo $smeta->image; ?>
			</a>
		
		</div><?php 
	endif; 

	// Seconds
	if( have_posts() ): ?>
	<div class="list-teasers"><?php
		while( have_posts() ):
			the_post();
			global $post;
			get_template_part( 
				'components/teaser-campanha', null,
				[ 
					'item' => $post,
					'title_tag' => 'h3',
					'excerpt' => true,
				]
			);
		endwhile; ?>
	</div><?php 
	endif; ?>

</div><?php
get_footer(); ?>