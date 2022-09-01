<?php global $post; ?>
<div class="clearfix form-preview historia">
	<div class="content">
		<h2><?php echo $post->post_title; ?></h2>
		<div class="conteudo"><?php echo apply_filters( 'the_content', $post->post_content ); ?></div>
		<p class="assunto">Assunto: <?php
			$assunto = wp_get_post_terms( $post->ID, Historias_taxonomy, array("fields" => "names") );
			echo array_shift( $assunto );
		?></p>
		<p class="tags">Tags: <?php 
			$tags = wp_get_post_tags( $post->ID );
			foreach ( $tags as $key => $tag):
				if( $key > 0 ): echo ', '; endif;
			 	echo $tag->name;
			endforeach;
		?></p>
	</div>
	<input type="hidden" name="preview_item_id" id="preview_item_id" value="<?php echo $post->ID; ?>" class="preview-item-id" />
</div>