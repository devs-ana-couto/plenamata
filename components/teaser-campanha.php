<?php
// Arguments
extract($args);
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' );
// Teaser data
$data = plenamata_get_teaser_data( $item, $args ); ?>
<div class="teaser campanha pager-item <?php echo _array_get( $args, 'class' ) . ' ' . ( $data->editoria ? $data->editoria->slug : '' ) . ( !$data->remove_image ? ' with-image' : ' no-image' ); ?>"><?php

	// With image
	if( !$data->remove_image ): ?>
	<a href="<?php echo $data->url; ?>" class="media-wrapper" title="<?php echo strip_tags( $data->title ); ?>" <?php echo( $data->target ? ' target="_blank"' : '' ); ?>><?php
		// Default image
		if( !$data->image ): 
			get_template_part( 'components/default-teaser-image' );
		// Selected image
		else:
			echo $data->image;
		endif; ?>
		<span class="ver-mais">Ver mais</span>
		<span class="mask-teaser effect--2"><span></span></span>
	</a><?php
	endif; ?>

	<div class="content">

		<span class="top"><?php 

			// Editoria
			if( $data->editoria ):
				echo plenamata_single_category( $data->meta, true, _array_get( $args, 'editoria' ) );
			endif; ?>

			<a href="<?php echo $data->url; ?>" title="<?php echo strip_tags( $data->title ); ?>" <?php echo( $data->target ? ' target="_blank"' : '' ); ?>><?php 
				// Ttitle ?>
				<<?php echo $ttag; ?> class="title">
					<?php echo $data->title; ?>
				</<?php echo $ttag; ?>><?php 
				// Subtítulo
				if( $data->subtitle ): ?>
				<em class="excerpt"><?php echo $data->subtitle; ?></em><?php
				endif; ?>
			</a><?php

			// Back link ?>
			<a href="<?php echo $data->url; ?>" title="<?php echo strip_tags( $data->title ); ?>" class="back-link" <?php echo( $data->target ? ' target="_blank"' : '' ); ?>></a>

		</span>

		<a href="<?php echo $data->url; ?>" class="button clean true-white <?php echo( $data->target ? ' ico-external ico-right' : '' ); ?>" title="<?php _e( 'Conheça e participe', 'amazonia' ); ?>" <?php echo( $data->target ? ' target="_blank"' : '' ); ?>><span><?php _e( 'Conheça e participe', 'amazonia' ) ?></span></a>

	</div>

</div>