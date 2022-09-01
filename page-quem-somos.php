<?php /* Template Name: Quem somos */ ?>
<?php 
// Header
get_header(); 
// Meta
$meta = new PostMeta(); 

$cover = Piki::get_cover(); 
if( $cover ): ?>
<section class="single-cover">
	<span>
		<span>
			<h1><?php echo $meta->render( 'title' ); ?></h1><?php 
			if( !$meta->empty( 'top_subtitle' ) ): ?>
			<em><?php echo $meta->render( 'top_subtitle' ); ?></em><?php 
			endif; ?>
		</span>
	</span>
	<picture><img src="<?php echo $cover; ?>" alt=""></picture>
</section><?php 
endif; ?>

<section class="texts-cards center">
	<div class="texts">
		<span><?php 
			echo $meta->render( 'body', [ 'apply_filter' => true ] ); ?>
		</span>	
		<em><?php echo $meta->render( 'excerpt' ); ?></em>
	</div><?php 
	if( !$meta->empty( 'cards' ) ): ?>
	<div class="cards slider-when-needs" data-max-to-sliding="580">
		<div class="swiper">
			<div class="swiper-wrapper"><?php 
		 		foreach( $meta->getAll( 'cards' ) as $card ): ?>
		 		<div class="card-item swiper-slide">
		 			<span><?php echo $card->card_icon->render(); ?></span>
		 			<em><?php echo $card->card_title->render(); ?></em>
		 			<div><?php echo $card->card_text->render([ 'apply_filter' => true ]); ?></div>
		 		</div><?php 
		 		endforeach; ?>
			</div>
		</div>
	</div><?php 
	endif; ?>
</section><?php 

// Nossos conteúdos
if( !$meta->empty( 'editorias' ) ): 
	$editorias = $meta->getFirst( 'editorias' ); ?>
	<section class="nossos-conteudos">
		
		<h2>Nossos conteúdos</h2>

		<ul><?php 
			$edittrhee = Piki::getTaxonomyThree( 'category', [ 41 ], true );
			foreach( $edittrhee as $edit ): ?>
			<li class="item <?php echo $edit->slug; ?>">
				<div>
					<a href="<?php echo get_site_url( null, '/artigos/#outras-noticias?categoria=' . $edit->slug ) ?>" title="<?php echo $edit->name; ?>">
						<span class="texts">
							<h3><span><?php echo $edit->name; ?></span></h3>
							<div><?php echo $edit->description; ?></div>
						</span><?php
						if( !$editorias->{$edit->slug}->isempty() ): ?>
							<picture><?php 
								echo $editorias->{$edit->slug}->render([ 'nowrap' => true ]); ?>
								<span class="mask-teaser"><span></span></span>
							</picture><?php
						endif;  ?>
					</a>
				</div>
			</li><?php 
			endforeach; ?>
		</ul>

	</section><?php
endif;

// Parceiros
plenamata_partners([ 
	'style' => 'slider',
	'title' => 'Nossos parceiros'
]);

// Parceiros
plenamata_partners([
	'title' => 'Nossos apoiadores',
	'style' => 'list',
	'apoiadores' => true,
]); 

// Banner floresta
if( !$meta->empty( 'banner_hastag' ) ): 

	$banner = $meta->getFirst( 'banner_hastag' ); ?>
	<section class="floresta-hashtag">
		
		<span class="center">

			<h3><?php echo $banner->ban_title->render([ 'tags' => true ]); ?></h3>

			<span class="text-share">
				<em><?php echo $banner->ban_text->render([ 'tags' => true ]); ?></em><?php 
				// Sharing
				echo do_shortcode( '[pikishare services="twitter,linkedin,facebook,whatsapp" widget_title="Compartilhe nas redes" style="2" class="color--2"]' ) ?>
			</span>
			
		</span><?php
		if( !$banner->ban_image->isempty() ):
			echo $banner->ban_image->render();
		endif; ?>

	</section><?php

endif;

// Footer
get_footer();