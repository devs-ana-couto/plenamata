<?php extract($args); ?>
<div class="single-intro materia">

	<div class="floater-box"><?php 
		// Dates and share
		get_template_part( 'components/dates-share', null, [ 'class' => 'inner' ] ); ?>
	</div>

	<div class="content"><?php
		
		// Dates and share
		get_template_part( 'components/dates-share' ); 
		
		// Body content
		if( $type == 'especial' && !$meta->empty( 'body' ) ): ?>
			<div class="text-content">
				<?php echo $meta->render( 'body', [ 'apply_filter' => true ]); ?>
			</div><?php 
		// Simple Materia excerpt
		elseif( $type == 'simples' && !$meta->empty( 'excerpt' ) ): ?>
			<div class="text-content"><?php 
				echo $meta->render( 'excerpt', [ 'apply_filter' => true, 'tags' => true ]); ?>
			</div><?php 
		endif; ?>
		
	</div>
	
</div>