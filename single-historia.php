<?php 
// Header
get_header(); 
// The post conf
the_post(); 
// Meta
$meta = new PostMeta(); 
// Type
$type = Historias::getSingleType( $meta, 'slug' ); 
// Prev
$next = get_previous_post();
// Next
$prev = get_next_post(); ?>
<article class="historia-real <?php echo $type; ?>"><?php 
	if( !empty( $prev ) ): ?>
	<a href="<?php echo get_permalink( $prev->ID ); ?>" class="page-nav prev" title="<?php echo $prev->post_title; ?>"><?php echo $prev->post_title; ?></a><?php 
	else: ?>
	<span class="page-nav prev disabled"></span><?php
	endif; ?>
	<div class="inner">
		<header>
			<h1><?php echo $meta->render( 'title' ); ?></h1>
			<em><?php echo $meta->render( 'excerpt' ); ?></em>
		</header>
		<div class="media-wrapper"><?php 
			// Vídeo
			if( !$meta->empty( 'video' ) ):
				echo $meta->render( 'video' );
			elseif( !$meta->empty( 'fotos' ) ):
				echo $meta->render( 'fotos', [ 'theme' => 'simple' ] );
			elseif( !$meta->empty( 'audio' ) ):
				echo $meta->render( 'audio' );
			endif;?>
		</div>
		<footer><?php 
		 	if( !$meta->empty( 'author' ): ?>
			<strong><?php echo $meta->render( 'author' ); ?></strong><?php
			endif;
			if( !$meta->empty( 'ufcidade' ) ): ?>
			<em><?php echo $meta->render( 'ufcidade', [ 'format' => '<strong>[cidade]</strong> | Município [prep] [estado]' ] ) ?></em><?php
			endif; ?>
		</footer>
	</div><?php 
	if( !empty( $next ) ): ?>
	<a href="<?php echo get_permalink( $next->ID ); ?>" class="page-nav next" title="<?php echo $next->post_title; ?>"><?php echo $next->post_title; ?></a><?php
	else: ?>
	<span class="page-nav next disabled"></span><?php
	endif; ?>
</article><?php
// Footer
get_footer(); 
