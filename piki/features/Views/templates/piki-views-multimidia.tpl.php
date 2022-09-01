<?php global $posts, $options; ?>
<header class="clearfix">
	<i class="icon-<?php echo $options[ 'header_icon' ]; ?> icon"></i>
	<h2 class="title"><?php echo $options[ 'title' ]; ?></h2>
	<?php if( $options[ 'view_all_link' ] ): ?>
	<a href="<?php echo $options[ 'view_all_url' ]; ?>" class="view-all-link" title="<?php echo $options[ 'view_all_label' ]; ?>"><?php echo $options[ 'view_all_label' ]; ?></a>
	<?php endif; ?>
</header>
<div class="list-items clearfix allSameHeight">
	<?php
	while ( $posts->have_posts() ): 
		$posts->the_post();
		$type = get_post_type();
		$rel = '';
		if( $type == 'video' ):
			$rel = get_post_meta( get_the_ID(), 'video', true );
		elseif( $type == 'foto' ):
			$meta = maybe_unserialize( get_post_meta( get_the_ID(), 'photo', true ) );
			$rel = $meta[ 'ids' ];
		elseif( $type == 'audio' ):
			$attachment = maybe_unserialize( get_post_meta( get_the_ID(), 'audio', true ) );
			$rel = wp_get_attachment_url( $attachment[ 'ids' ] );
		elseif( $type == 'clipping' ):
			$rel = get_the_ID();
		endif;
		?>
		<a href="<?php the_permalink(); ?>" class="list-item <?php echo $options[ 'line_class' ]; ?> type-<?php echo $type; ?> <?php echo( !!$thumb ? 'with-thumb' : '' ); ?>" title="<?php the_title(); ?>" post-id="<?php echo get_the_ID(); ?>" rel="<?php echo $rel; ?>">
			<span class="item-content">
				<h3 class="item-title"><?php the_title(); ?></h3>
				<p class="excerpt"><?php echo get_post_meta( get_the_ID(), 'descricao', true ); ?></p>
				<i class="icon-<?php echo $type; ?> icon circle"></i>
			</span>
		</a>
	<?php
	endwhile;
	?>
</div>