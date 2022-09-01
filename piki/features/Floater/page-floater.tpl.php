<?php the_post(); ?>
<h2 class="page-title" class="clearfix">
	<?php the_title(); ?>
	<a class="button close" title="Fechar">Fechar</a>
</h2>
<div class="page-body" class="clearfix">
	<?php echo apply_filters( 'the_content', get_the_content() ); ?>
</div>

