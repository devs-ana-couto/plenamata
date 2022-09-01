<?php extract($args);
if( $items ): ?>
<div class="destaques full style--2 slider"><?php 
	foreach( $items as $item ):
		get_template_part( 
			'components/destaque', 
			'campanha', 
			[ 
				'smeta' => $item,
				'class' => 'size--2',
			] 
		);
	endforeach; ?>
</div><?php
endif; ?>