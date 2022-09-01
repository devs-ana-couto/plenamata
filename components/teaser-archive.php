<?php
// Arguments
extract($args);
// Admin
$is_admin = _array_get( $args, 'is_admin' ) || is_admin();
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' );
// Teaser data
$data = plenamata_get_teaser_data( $item, $args ); ?>
<div class="teaser post teaser-post <?php echo _array_get( $args, 'class' ) . ' ' . ( $data->editoria ? $data->editoria->slug : '' ); ?>">

	<div class="inner">

		<div><?php

			// Editoria
			if( $data->editoria ):
				echo plenamata_single_category( $data->meta, true, _array_get( $args, 'editoria' ) );
			endif;
		
			// Título ?>
			<<?php echo $ttag; ?> class="title">
				<a href="<?php echo $data->url; ?>" title="<?php echo strip_tags( $data->title ); ?>">
					<?php echo $data->title; ?>
				</a>
			</<?php echo $ttag; ?>><?php
		
			// Exerpt
			if( $data->subtitle ): ?>
			<em><?php echo $data->subtitle; ?></em><?php 
			endif; ?>
		
		</div>
	
	</div>

</div>