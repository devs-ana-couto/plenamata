<?php echo imagewp::renderResponsive([
	'meta' => $meta,
	'default' => [
		'field_name' => 'image',
	],
	'breakpoints' => [
		[
			'field_name' => 'image_tablet',
			'media' => '(min-width:461px) and (max-width:768px)',
		],
		[
			'field_name' => 'image_mob',
			'media' => '(max-width:460px)',
		]
	],
	'options' => [
		'alt' => $meta->render( 'title', [ 'strip' => true ] ),
	]
]); ?>
}
