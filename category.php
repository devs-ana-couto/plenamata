<?php 
// Header
get_header(); 
// Term
$term = get_queried_object();
// Label
$label = 'Notícias ' . ( $term->term_id == 1 ? ' arquivadas' : 'sobre ' . $term->name );
// Stickies
$stickies = Posts::getCagetoryStickies(); ?>
<section class="home-editoria <?php echo $term->slug; ?> <?php echo $stickies ? '' : 'no-stickies'; ?>"><?php 

	// Title
	if( $term->term_id != 1 || ( $term->term_id == 1 && $stickies ) ): ?>
	<header>
		<em>Editoria</em>
		<h2 class="<?php echo $term->slug; ?>"><?php echo $term->name; ?></h2>
	</header><?php 
	endif;

	// Stickies
	if( $stickies ): ?>

		<div class="destaques"><?php

			if( !empty( $stickies->sticky ) ):
				get_template_part( 
					'components/cover-full', null, 
					[ 
						'item' => $stickies->sticky,
						'hide_legend' => true,
						'title_tag' => 'h3'
					] 
				);
			endif;

			if( !empty( $stickies->seconds ) ): ?>
				<div class="list-teasers"><?php 
					foreach( $stickies->seconds as $second ): 
						get_template_part( 
							'components/teaser-post', null,
							[ 
								'post' => $second,
								'title_tag' => empty( $stickies->sticky ) ? 'h3' : 'h4'
							]
						);
					endforeach; ?>
				</div><?php
			endif; ?>

		</div><?php

		// Link bar
		// get_template_part( 
		// 	'components/link-bar', null,
		// 	[
		// 		'title' => 'Acompanhe nossa cobertura sobre o novo Coronavírus',
		// 		'link_label' => 'leia agora',
		// 		'link_url' => 'https://www.sebrae.com.br/',
		// 		'logo' => 'corona',
		// 		'style' => '2',
		// 		'size' => '2',
		// 	] 
		// );

	endif; ?>

	<section id="content" data-key="search-content" data-offset="40" class="lista-conteudo">

		<div>

			<header>
				<h2 class="style--2">
					<strong><?php echo $label; ?></strong>
					<span></span>
				</h2><?php 
				// Filters
				get_template_part( 
					'components/filters', null,
					[ 
						'type' => $term->term_id != 1 ? 'category' : 'archive',
						'term' => $term
					]
				); ?>
			</header><?php 
			if( have_posts() ): ?>

				<div class="list-teasers <?php echo( $term->term_id == 1 ? 'full-lines' : '' ); ?>"><?php

					while( have_posts() ):

						the_post();
						global $post;

						get_template_part( 
							'components/teaser', ( $term->term_id == 1 ? 'archive' : 'post' ),
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
			        ]
		        );

		    else:

		    	get_template_part( 'components/no-results' );

		    endif ?>
			
		</div>

	</section>
	
</section>

<?php get_footer(); ?>
