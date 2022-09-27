<?php
// Arguments
extract($args);
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' );
// Teaser data
$data = plenamata_get_teaser_data( $item, $args ); 
// Editoria
$editoria = plenamata_get_editoria( $item ); ?>
<div class="teaser post pager-item <?php echo _array_get( $args, 'class' ) . ' ' . ( $data->editoria ? $data->editoria->slug : '' ) . ( !$data->remove_image ? ' with-image' : ' no-image' ); ?>"><?php 

	// Editoria
	if( $data->editoria ): ?>
		<a href="<?php echo plenamata_editoria_url( $editoria ); ?>" class="editoria-crumb <?php echo $editoria->slug; ?>"><?php echo $editoria->name; ?></a><?php
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