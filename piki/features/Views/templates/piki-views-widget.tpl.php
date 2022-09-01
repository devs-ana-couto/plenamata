<?php global $posts, $options; ?>
<header class="clearfix">
	<i class="icon-<?php echo $options[ 'header_icon' ]; ?> icon"></i>
	<h2 class="title"><?php echo $options[ 'title' ]; ?></h2>
</header>
<div class="list-items clearfix">
	<?php
	while ( $posts->have_posts() ): 
		$posts->the_post();
		?>
		<a href="<?php the_permalink(); ?>" class="list-item <?php echo $options[ 'line_class' ]; ?> <?php echo( !!$thumb ? 'with-thumb' : '' ); ?>" title="Ver mais">
			<h3 class="item-title"><?php the_title(); ?></h3>
			<span class="data clearfix"><i class="icon-calendar icon"></i><?php echo date_i18n( 'd \d\e F \d\e Y', strtotime( get_the_date( 'm/d/Y' ) ) ); ?></span>
			<p class="excerpt"><?php echo Piki::trim( get_post_meta( get_the_ID(), 'chamada', true ), 14 ); ?></p>
		</a>
	<?php
	endwhile;
	?>
</div>	
<?php if( $options[ 'view_all_link' ] ): ?>
<span class="clearfix">
	<a href="<?php echo $options[ 'view_all_url' ]; ?>" class="view-all-link" title="<?php echo $options[ 'view_all_label' ]; ?>"><?php echo $options[ 'view_all_label' ]; ?></a>
</span>
<?php endif; ?>
