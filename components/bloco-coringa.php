<?php
$data = Jokers::get(); 
if( $data ): ?>
<section class="bloco-coringa" data-template-name="<?php plenamata_template_name( __FILE__ ); ?>">

	<span>
		
		<header><?php 

			// Logo
			echo $data->logo; ?>
			
			<h3><?php echo $data->title; ?></h3><?php 

			if( $data->excerpt ): ?>
			<div><?php echo $data->excerpt; ?></div><?php 
			endif; ?>

			<span class="baseline"><?php 
				if( $data->url ): ?>
				<a href="<?php echo $data->url; ?>" class="button clean true-white ico-external ico-right" target="_blank"><span><?php echo( $data->button_label ? $data->button_label : __( 'Acessar', 'amazonia' ) ); ?></span></a><?php 
				endif; ?>
			</span>

		</header><?php 

		if( !empty( $data->blocks ) ): ?>
		<div class="blocks"><?php 
			foreach( $data->blocks as $block ): ?>
				<div class="block">
					<?php echo( $block->url ? '<a href="'. $block->url .'" target="_blank">' : '' ); ?>
					<span class="top"><?php
						if( $block->tag ): ?>
						<em class="tag"><?php echo $block->tag; ?></em><?php 
						endif;
						echo $block->foto; ?>	
					</span><?php 
					if( $block->author ): ?>
					<em class="author">Por: <strong><?php echo $block->author; ?></strong></em><?php 
					endif; ?>
					<h4><?php echo $block->title; ?></h4>
					<?php echo( $block->url ? '</a>' : '' ); ?>
				</div><?php 
			endforeach; ?>
		</div><?php
		endif; ?>
		
	</span><?php

	if( $data->imagem ) echo $data->imagem; ?>

</section><?php 
endif; ?>