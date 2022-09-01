<?php extract($args); ?>
<div class="link-bar logo--<?php echo _array_get( $args, 'logo', 'sebrae' ); ?> style--<?php echo _array_get( $args, 'style', '1' ); ?> size--<?php echo _array_get( $args, 'size', '1' ); ?> <?php echo _array_get( $args, 'class', '' ); ?>">
	<div>
		<span class="center">
			<em><?php echo $title; ?></em>
			<a href="<?php echo $link_url; ?>" target="_blank" class="arrow-right" rel="noreferrer" title="<?php echo $link_label; ?>"><?php echo $link_label; ?></a>
		</span>
	</div>
</div>