<?php 
// Header
get_header(); 
// Destaques
$destaques = Campanhas::getDestaques(); ?>
<section id="content" class="page-archive ultimas-noticias"><?php 

	// Slider de destaques
	Campanhas::getArchiveDestaques(); ?>
	
	<div id="outras-campanhas" class="anothers center">

		<header>
			<h2><?php _e( 'Outras campanhas', 'amazonia' ); ?></h2><?php 
			// Filters
			echo Campanhas::getFilter(); ?>
		</header><?php 
		
		if( have_posts() ): ?>

			<div id="lista-outras" class="list-teasers"><?php

				while( have_posts() ):
					the_post();
					global $post;
					get_template_part( 
						'components/teaser', 
						'campanha',
						[ 
							'item' => $item,
							'title_tag' => 'h3',
							'excerpt' => true,
						]
					);
				endwhile; ?>
				
			</div><?php

			echo Campanhas::getPager();

	    else:

	    	get_template_part( 'components/no-results' );

	    endif ?>
	
	</div>

</section>

<section class="to-engage center" style="display:none;">
	<div>
		<h3><?php _e( '3 bons motivos para engajar', 'amazonia' ); ?></h3>
		<ul>
			<li class="descaso"><?php _e( 'Descaso do governo', 'amazonia' ); ?></li>
			<li class="urgencia"><?php _e( 'Urgência para agir', 'amazonia' ); ?></li>
			<li class="especies"><?php _e( 'Salvar espécies ameaçadas', 'amazonia' ); ?></li>
		</ul>
	</div>
</section>

<section class="form-projeto">
	<div class="center">
		<header>
			<span>
				<em><?php _e( 'Tem um projeto e quer ver aqui?', 'amazonia' ); ?></em>
				<p><?php _e( 'Envie seu projeto que nossa equipe vai analisar.', 'amazonia' ); ?></p>
			</span>
			<strong class="obs desktop"><?php _e( 'Projeto: Caminho das águas*', 'amazonia' ); ?></strong>
		</header>
		<div><?php 
			// Form
			echo do_shortcode( '[pikiforms key="'. PROJETO_KEY .'"]' ); ?>
		</div>
		<strong class="obs mobile"><?php _e( 'Projeto: Caminho das águas*', 'amazonia' ); ?></strong>
	</div>
</section><?php

// Footer
get_footer(); ?>