<?php 
$post_id = get_the_ID();
$updated = plenamata_get_updated( $post_id ); 
$authors = plenamata_get_author( $post_id ); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">

		<div class="author-date"><?php 
			if( $authors ): ?>
			<em class="authors-list color--2">por <?php echo $authors; ?></em><?php 
			endif; ?>
			<em class="date"><?php echo plenamata_get_date( $post_id ); echo( $updated ? ' (' . $updated . ')' : '' ); ?></em>
		</div>

		<h3 class="post-excerpt"><?php
			global $post;
			if(! boolval(get_theme_mod('disable_excerpt_in_all_posts', false)) && ! boolval(get_post_meta($post->ID, 'hide_post_excerpt', true ))):
				the_excerpt();
			endif;?>
		</h3><?php
		
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'amazonia' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			)
		);

		if( get_post_meta( get_the_ID(), 'enable-post-erratum', true ) ) { ?>
			<div class="sorry-said-wrong" id="erratum">
				<div class="wrong-title">
					<?php __( 'Desculpe, nós erramos', 'amazonia' ); ?>
				</div>
				<p class="wrong-content">
					<?php echo get_post_meta(get_the_ID(), 'post-erratum', true); ?>
				</p>
			</div>
		<?php }

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'amazonia' ),
				'after'  => '</div>',
			)
		);
		
		if ( is_active_sidebar( 'article-2' ) && is_single() ) {
			dynamic_sidebar( 'article-2' );
		}
		?>
	</div><!-- .entry-content -->

	<?php if (get_post_meta(get_the_ID(), 'project-link', true) && !empty(get_post_meta(get_the_ID(), 'project-link', true))) : ?>
		<a class="project-link" href="<?php echo get_post_meta(get_the_ID(), 'project-link', true) ?>">
			<?php echo __( 'Access project page', 'amazonia' ) ?>
		</a>
	<?php endif; ?>

	<footer class="entry-footer"><?php 

		$tags = wp_get_post_tags( get_the_ID() );
		if( !empty( $tags ) ): ?>
		<span class="tags-links">
			<span>Tagged:</span><?php 
			foreach( $tags as $tag ): ?>
			<a href="<?php echo get_site_url( null, '?s=' . $tag->name ) ?>" rel="tag" title="<?php echo $tag->name; ?>"><?php echo $tag->name; ?></a><?php 
			endforeach; ?>
		</span> <?php 
		endif; 

		// Sharing
		echo do_shortcode( '[pikishare services="twitter,linkedin,facebook,whatsapp" widget_title="' . __( 'Compartilhe nas redes', 'amazonia' ) . '" style="2" class="color--2"]' ) ?>

	</footer><!-- .entry-footer -->

	<?php if ( ! is_singular( 'attachment' )  && get_post_meta(get_the_ID(), 'author-bio-display', true)) : ?>
		<?php get_template_part( 'template-parts/post/author', 'bio' ); ?>
	<?php endif; ?>

</article><!-- #post-${ID} -->
