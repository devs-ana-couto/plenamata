<?php

new WordPress_Custom_Status( array(
	'post_type' => array( 'post', 'page' ),
	'slug' => 'custom_status',
	'label' => _x( 'Custom Status', 'ibenic' ),
	'action' => 'edit',
	'label_count' => _n_noop( 'Custom <span class="count">(%s)</span>', 'Custom <span class="count">(%s)</span>' ),
));