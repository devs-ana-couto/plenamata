<?php extract($args); ?>
<section class="destaques-home style--2 template--<?php echo $template[ 'id' ]; ?>"><?php 
	
	// Sticky
	if( $posts->sticky ):
		get_template_part( 
			'components/teaser-post', null,
			[ 

				'item' => $posts->sticky,
				'is_admin' => $is_admin,
				'class' => 'home',
				'title_tag' => 'h2',
				'image_field' => 'destaque_image_small',
				'excerpt' => true,
			]
		);
	endif; 

	// Subdestaques
	if( $posts->seconds || $posts->thirds ): ?>
	<div class="substaques"><?php

		// Seconds
		if( $posts->seconds ):
			foreach( $posts->seconds as $second ):
				get_template_part( 
					'components/teaser-post', null,
					[ 
						'item' => $second,
						'is_admin' => $is_admin,
						'title_tag' => 'h3',
					]
				);
			endforeach;
		endif;

		// Thirds
		if( $posts->thirds ):
			if( $template[ 'id' ] == '8' ):
				echo '<span class="thirds">';
			endif;
			foreach( $posts->thirds as $third ):
				get_template_part( 
					'components/teaser-post', null,
					[ 
						'item' => $third,
						'is_admin' => $is_admin,
						'remove-image' => true,
						'title_tag' => ( $posts->seconds ? 'h4' : 'h3' ),
					]
				);
			endforeach;
			if( $template[ 'id' ] == '8' ):
				echo '<span class="thirds">';
			endif;
		endif; ?>

	</div><?php 
	endif; ?>

</section>