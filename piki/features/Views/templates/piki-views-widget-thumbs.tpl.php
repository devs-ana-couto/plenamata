<?php global $posts, $options; ?>
<header class="clearfix">
	<?php if( $options[ 'header_icon' ] != 'no' ): ?>
	<i class="icon-<?php echo $options[ 'header_icon' ]; ?> icon"></i>
	<?php endif; ?>
	<h2 class="title"><?php echo $options[ 'title' ]; ?></h2>
	<?php if( $options[ 'view_all_link' ] && $options[ 'view_all_position' ] == 'top' ): ?>
	<a href="<?php echo $options[ 'view_all_url' ]; ?>" class="view-all-link" title="<?php echo $options[ 'view_all_label' ]; ?>"><?php echo $options[ 'view_all_label' ]; ?></a>
	<?php endif; ?>
</header>
<div class="list-items clearfix">
	<?php
	$item_tag = $options[ 'no_links' ] == 'on' ? 'div' : 'a';
	while ( $posts->have_posts() ): 
		$posts->the_post();
		?>
		<a href="<?php echo PikiViews::item_url( $options[ 'links_type' ] ); ?>" class="list-item <?php echo $options[ 'line_class' ]; ?> <?php echo( !!$thumb ? 'with-thumb' : '' ); ?>" title="Ver mais">
			<?php $url_image = is_array( $options[ 'thumb_size' ] ) ? Piki::thumbnail( get_the_ID(), $options[ 'thumb_size' ][ 'width' ], $options[ 'thumb_size' ][ 'height' ] ) : Piki::get_cover(); ?>
			<img src="<?php echo $url_image; ?>" alt="<?php the_title(); ?>" />
			<h3 class="item-title"><?php the_title(); ?></h3>
		</a>
	<?php
	endwhile;
	?>
</div>	
<?php if( $options[ 'view_all_link' ] && $options[ 'view_all_position' ] == 'bottom' ): ?>
<span class="clearfix view-all-wrapper">
	<a href="<?php echo $options[ 'view_all_url' ]; ?>" class="view-all-link" title="<?php echo $options[ 'view_all_label' ]; ?>"><?php echo $options[ 'view_all_label' ]; ?></a>
</span>
<?php endif; ?>
