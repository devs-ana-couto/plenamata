<?php
// Arguments
extract($args);
// Meta
$meta = new PostMeta( $post );
// Remove image
$image = _array_get( $args, 'remove-image' ) != true;
// Editoria
$editoria = plenamata_get_editoria( $post );
// Title
$title = $meta->render( 'title' );
// URL
$url = get_permalink( $post->ID );
// Title tag
$ttag = _array_get( $args, 'title_tag', 'h4' );
// Classes
$class = 'teaser ' . $editoria->slug . ( $image ? ' with-image' : ' no-image' ) . ' ' . _array_get( $args, 'class', '' ); ?>
<div class="<?php echo $class; ?>">
	<div class="inner"><?php 
		
		// With image
		if( $image ): ?>

			<a href="<?php echo $url; ?>" class="media-wrapper" title="<?php echo strip_tags( $title ); ?>"><?php

				if( $meta->empty( 'thumb' ) ): 

					get_template_part( 'components/default-teaser-image' );

				else:
				
					// Imagem
					echo imagewp::renderResponsive([
						'meta' => $meta,
						'default' => [
							'field_name' => 'thumb',
							'media' => '(max-width:480px)',
						],
						'breakpoints' => [
							[
								'field_name' => 'thumb',
								'style' => 'desktop',
								'media' => '(min-width:481px)',
							]
						],
						'options' => [
							'style' => 'resized',
						],
					]); 

				endif;?>
				
				<i href="<?php echo $url; ?>" class="icon white big <?php echo $meta->getType(); ?>"><?php $meta->getTypeLabel(); ?></i>
			
			</a><?php
		
		// Without image
		else: ?>
		
			<a href="<?php echo $url; ?>" class="icon <?php echo $meta->getType(); ?>"><?php $meta->getTypeLabel(); ?></a><?php
		
		endif; ?>
		<div><?php
			// Editoria
			echo plenamata_single_category( $meta, _array_get( $args, 'link_subs' ) ); 
			// Título ?>
			<<?php echo $ttag; ?> class="title">
				<a href="<?php echo $url; ?>" title="<?php echo strip_tags( $title ); ?>">
					<?php echo $meta->render( 'title', [ 'breakline' => true ] ); ?>
				</a>
			</<?php echo $ttag; ?>>
		</div>
	</div>
</div>