<?php 
// Args
extract($args); 
// Empty
$empty = empty( $posts ); ?>
<div class="list-teasers <?php echo( $empty ? 'no-results' : '' ); ?>"><?php 

	if( !$empty ):
	
		foreach( $posts as $post ):
			get_template_part( 
				'components/teaser', null,
				[ 
					'post' => $post,
					'link_subs' => _array_get( $args, 'link_subs' ),
				]
			);
		endforeach;
	
	else: 

		get_template_part( 'components/no-results' );
	
	endif; ?>

</div>