<?php 
$data = Historias::getList();
if( !empty( $data ) ): ?>
<section id="historias-reais" class="historias-reais" data-template-name="<?php plenamata_template_name( __FILE__ ); ?>">
	
	<div class="inner">

		<header>
			<span>
				<h2><?php _e( 'Histórias reais', 'amazonia' ); ?></h2>
				<em><?php _e( 'Pessoas e organizações que estão mudando a realidade da Amazônia', 'amazonia' ); ?></em>
				<p><?php _e( 'Em todos os cantos do território surgem histórias inspiradoras, de quem atua pela floresta em pé e pelo bem-estar das pessoas. Conheça algumas delas!', 'amazonia' ); ?></p>
			</span>
		</header>
		
		<div class="mosaic">
			<ul>
				<li><?php 
				$total = count( $data );
				$i = 0;
				$t = 0;
				foreach( $data as $index => $item ):

					$i++;
					$t++;

					$meta = new PostMeta( $item );
					$type = Historias::getSingleType( $meta ); 
					$url = !$meta->empty( 'external_url' ) ? $meta->getFirst( 'external_url' ) : get_permalink( $meta->ID );
					$target = !$meta->empty( 'external_url' ) ? '_blank' : 'self'; ?>
					<a href="<?php echo $url; ?>" class="item" title="Ver história" data-item-id="<?php echo $meta->ID; ?>" <?php echo( $target == '_blank' ? 'target="_blank" rel="noreferrer noopener"' : '' ); ?>>
						<span>
							<span>
								<em><?php echo $type; ?></em>
								<h3><?php echo $meta->render( 'title' ); ?></h3>
							</span>
							<button class="clean white <?php echo $target == '_blank' ? 'ico-external ico-right' : ''; ?>"><span><?php _e( 'Ver história', 'amazonia' ) ?></span></button>
						</span><?php 
						echo $meta->render( 'thumb' ); ?>
					</a><?php

					// New <li>
					if( ( $t < $total ) && ( $i == 14 || $i === 1 || ( $i % 2 != 0 ) ) ): ?>
					</li><li><?php 
					endif;
					// Reset counter
					if( $i == 14 ) $i = 0;

				endforeach; ?></li>
			</ul>
		</div>

		<em class="scroll-to-view"><?php _e( 'Scrole para o lado e veja mais hitórias inspiradoras', 'amazonia' ); ?></em>
		
	</div>

</section>
<div id="modal-historias" class="modal-historias" style="display:none;">
	<button type="button" data-action="prev" class="arrow-nav prev" title="<?php _e( 'Pródima história', 'amazonia' ); ?>" style="display:none;"></button>
	<div class="main-slider"></div>
	<button type="button" data-action="next" class="arrow-nav next" title="<?php _e( 'História anterior', 'amazonia' ); ?>" style="display:none;"></button>
	<button type="button" data-action="close" class="close" title="<?php echo _e( 'Fechar', 'amazonia' ); ?>"></button>
</div><?php 
endif; ?>