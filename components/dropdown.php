<?php extract($args); ?>
<div class="dropdown field <?php echo _array_get( $args, 'class', '' ); ?>" data-label="<?php echo $label; ?>" data-key="<?php echo $token; ?>">
	<button type="button" class="arrow-right label" data-action="toggle" title="<?php __( 'Open', 'amazonia' ); ?>">
		<strong><?php echo( empty( $value ) ? $label : $options[ $value ] ); ?></strong>
		<?php get_template_part( 'components/arrow-button' ); ?>
	</button>
	<ul data-parent="<?php echo $token; ?>">
		<span>
			<?php foreach( $options as $option_key => $options_label ):?>
			<li>
				<button type="button" value="<?php echo $option_key; ?>" class="<?php echo( $option_key == $value ? 'selected' : '' ); ?>"><?php echo $options_label; ?></button>
			</li>
			<?php endforeach; ?>
		</span>
	</ul>
	<input type="hidden" name="<?php echo $key; ?>" value="<?php echo $value; ?>">
</div>