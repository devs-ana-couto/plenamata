<?php 
// Header
get_header(); ?>

	<section id="content" class="page-ultimas-noticias">

		<div class="list-items center">

			<header>

				<h2>Outras notícias</h2><?php 

				// Filters
				echo Posts::getFilter(); ?>
			
			</header><?php 
			
			if( have_posts() ): ?>
				<div class="list-teasers"><?php

					while( have_posts() ):

						the_post();
						global $post;

						get_template_part( 
							'components/teaser-post', null,
							[ 
								'post' => $post,
								'title_tag' => 'h3',
								'editoria' => $term,
								'excerpt' => ( $term->term_id == 1 )
							]
						);
					
					endwhile; ?>
					
				</div><?php

		        Pager::show( 
		            false,
		            [
		            	'type' => 'default',
			            'target' => '#content',
			            'list' => '.list-teasers',
			            'item' => '.teaser',
			            'max_results' => 100
			        ]
		        );

		    else:

		    	get_template_part( 'components/no-results' );

		    endif ?>
		
		</div>

	</section>

</div><?php

// Footer
get_footer(); ?>
