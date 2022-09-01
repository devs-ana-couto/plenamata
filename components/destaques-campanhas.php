<?php extract($args);
if( $destaques ): ?>
<div class="destaques center style--2"><?php 
	
	// Sticked
	if( $destaques->sticky ): 
		get_template_part( 
			'components/destaque', 
			'campanha', 
			[ 
				'smeta' => plenamata_get_teaser_data( 
					$destaques->sticky, 
					[ 
						'image_field' => 'cover', 
						'excerpt' => false 
					] 
				)
			] 
		);
	endif; 

	// Seconds
	if( $destaques->seconds ): ?>
	<div class="list-teasers slider-when-needs count--<?php echo count( $destaques->seconds ); ?>">
		<div class="swiper">
			<div class="swiper-wrapper"><?php
			foreach( $destaques->seconds as $item ):
				get_template_part( 
					'components/teaser-campanha', null,
					[ 
						'item' => $item,
						'title_tag' => 'h3',
						'class' => 'swiper-slide',
						'excerpt' => true,
						'image_field' => count( $destaques->seconds ) == 1 ? 'cover' : 'thumb'
					]
				);
			endforeach; ?>
			</div>
		</div>
	</div><?php 
	endif; ?>

</div><?php
endif; ?>