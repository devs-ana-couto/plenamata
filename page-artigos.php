<?php /* Template Name: Home de notícias */ ?>
<?php 
// Header
get_header(); 
// Destaques
$destaques = Posts::getDestaques();
// Noticias
$noticias = Posts::getList(); ?>
<section id="content" class="page-archive style--1">

	<h2 class="center"><?php _e( 'Notícias', 'amazonia' ); ?></h2><?php 

	// Destaques
	get_template_part( 'components/destaques', 'news', [ 'destaques' => $destaques ] ); 

	// Webstories
	plenamata_get_webstories([ 'class' => 'bgcolor--2' ]); ?>
	
	<div id="outras-noticias" class="anothers center">

		<header>
			<div>
				<h2><?php _e( 'Outras notícias', 'amazonia' ); ?></h2>
				<button class="button ico-filter clean color--3 filtrar" title="<?php _e( 'Filtrar', 'amazonia' ); ?>" data-action="toggle-form"><span><?php _e( 'Filtrar', 'amazonia' ); ?></span></button>
			</div><?php 
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
