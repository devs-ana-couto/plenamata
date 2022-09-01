<?php extract($args);
if( $destaques ): ?>
<div class="destaques center style--1 <?php echo( $destaques->sticky ? 'with-sticky' : '' ); ?>"><?php 
	
	// Sticked
	if( $destaques->sticky ): 
		$smeta = plenamata_get_teaser_data( $destaques->sticky, [ 'image_field' => 'destaque_image', 'excerpt' => true ] ); ?>
		<div>
			<div class="item sticky"><?php 
				// Editoria
				if( $smeta->editoria ):
					echo plenamata_single_category( $smeta->meta, true, _array_get( $args, 'editoria' ) );
				endif; ?>
				<a  href="<?php echo $smeta->url; ?>"class="content" title="<?php echo $smeta->title; ?>">
					<span>
						<em class="date"><?php the_date( 'd/m/Y' ); ?></em>
						<h2><?php echo $smeta->title; ?></h2><?php 
						if( !empty( $smeta->subtitle ) ): ?>
						<p><?php echo $smeta->subtitle; ?></p><?php 
						endif; ?>
						<div class="author authors-list">Por <?php echo $smeta->author; ?></div>
					</span>
				</a>
				<a href="<?php echo $smeta->url; ?>" class="image-wrapper" title="<?php echo $smeta->title; ?>"><?php 
					echo $smeta->image; ?>
				</a>
			</div>
		</div><?php 
	endif; 

	// Seconds
	if( $destaques->seconds ): ?>
	<div class="list-teasers slider-when-needs <?php echo( $destaques->sticky ? 'half' : '' ); ?>" data-max-to-sliding="540">
		<div class="swiper">
			<div class="swiper-wrapper"><?php
			foreach( $destaques->seconds as $item ):
				get_template_part( 
					'components/teaser-post', null,
					[ 
						'item' => $item,
						'title_tag' => 'h3',
						'class' => 'swiper-slide'
					]
				);
			endforeach; ?>
			</div>
		</div>
	</div><?php 
	endif; ?>

</div><?php
endif; ?>