<?php 
// Header
get_header( null, [ 'context' => 'search' ]); 
// Keyword
$keyword = _get( 's' ); 
// Is empty
$noResults = !have_posts(); 
// Labels result
$label_sing = __( 'resultado', 'amazonia' );
$label_plural = __( 'resultados', 'amazonia' ); ?>
<section id="page-search" class="page-search <?php echo $keyword ? 'filled' : 'empty'; echo( $keyword && $noResults ? ' no-results' : ' initial' ); ?>" id="content">

	<form class="search-filteres" action="<?php echo plenamata_home_link(); ?>">
	
		<header>
			<h2 class="initial"><?php _e( 'O que você está procurando?', 'amazonia' ); ?></h2>
			<h2 class="empty"><?php _e( 'Nenhum resultado encontrado.', 'amazonia' ); ?></h2>
			<em><?php _e( 'Por favor refaça a pesquisa.', 'amazonia' ) ?></em>
		</header><?php
		
		// Filters
		Search::getFilters(); ?>

	</form><?php 

	// Posts list
	$total = $keyword ? Search::getTotalResults() : ''; ?>

	<div id="results" class="results">

		<span>

			<header>
				<em><?php _e( 'Resultados da busca', 'amazonia' ); ?></em>
				<span>
					<strong data-type="overview"><?php echo $total; ?> <?php echo( $total < 2 ? $label_sing : $label_plural ); ?></strong><?php 
					Search::getOrder(); ?>
				</span>
			</header>

			<div class="list-teasers search"><?php
				if( have_posts() ):
					while( have_posts() ):
						the_post(); 
						plenamata_get_search_teaser();
					endwhile; 
				endif; ?>
			</div><?php

			// Pager
		    Pager::show( 
		        false, 
		        [ 
			        'type' => 'default',
			        'target' => '#results',
			        'list' => '.list-teasers',
			        'item' => '.teaser',
			    ]
		    ); ?>
			
		</span>
	
	</div>

</section><?php

// Footer
get_footer(); 
