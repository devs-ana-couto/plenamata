<?php
// Arguments
extract($args);
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' );
// Teaser data
$data = plenamata_get_teaser_data( $item, $args ); ?>
<div class="teaser post pager-item <?php echo _array_get( $args, 'class' ) . ' ' . ( $data->editoria ? $data->editoria->slug : '' ) . ( !$data->remove_image ? ' with-image' : ' no-image' ); ?>"><?php 

	// Editoria
	if( $data->editoria ):
		echo plenamata_single_category( $data->meta, true, _array_get( $args, 'editoria' ) );
	endif; ?>

	<a href="<?php echo $data->url; ?>" title="<?php echo strip_tags( $data->title ); ?>" <?php echo $data->target; ?>><?php

		// With image
		if( !$data->remove_image ): ?>
		<span class="top">
			<span class="media-wrapper"><?php
				// Default image
				if( !$data->image ): 
					get_template_part( 'components/default-teaser-image' );
				// Selected image
				else:
					echo $data->image;
				endif; ?>
				<span class="ver-mais">Ver mais</span>
			</span>
		</span><?php
		endif; ?>

		<span class="author-date">
			<div class="authors-list">Por <strong><?php echo $data->author; ?></strong></div>
			<em><?php the_date( 'd/m/Y' ); ?></em>
		</span><?php

		// Título ?>
		<<?php echo $ttag; ?> class="title">
			<?php echo $data->title; ?>
		</<?php echo $ttag; ?>>

	</a>

</div>