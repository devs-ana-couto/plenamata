<?php 
extract( $args );
$context = _array_get( $args, 'context' );
// Cover
if( !$meta->empty( 'cover' ) ): 
	
	$cover = $meta->getFirst( 'cover' ); ?>

	<section class="estimatives-area" id="estimatives-area"><?php

		// Image or video
		if( !$cover->cvr_clip->isempty() ): ?>
			<div class="video-fullsize set-cover">
				<div class="media-wrapper"><?php
					echo $cover->cvr_clip->render([ 'background' => true ]);?>
				</div>
			</div><?php
		else:
			echo $cover->cvr_image->render();
		endif; ?>

		<div class="content" class="main-data">

			<div>
				
				<ul class="menu">
					<li>
						<button class="ico-three inline active" rel="arvores">
							<span>
								<strong><?php _e( 'Árvores derrubadas', 'amazonia' ); ?></strong>
							</span>
						</button>
					</li>
					<li>
						<button class="ico-area inline" rel="area">
							<span>
								<strong><?php _e( 'Área devastada', 'amazonia' ); ?></strong>
							</span>
						</button>
					</li>
				</ul>

				<div class="infodata">

					<h1><?php _e( 'Desmatamento na Amazônia em', 'amazonia' ); ?> <?php echo date( 'Y' ); ?></h1>

					<div>
						
						<div class="info-item arvores active" rel="arvores">

					       	<em data-deter="treesEstimative"></em>
					        
					        <div>

					        	<div>
					        		<div class="media">
					        			<em><?php _e( 'média diária', 'amazonia' ); ?></em>
					        			<strong data-deter="treesPerDay"></strong>
					        		</div>
					        		<div class="estimativa"><?php 
					        			_e( 'Estimativa em tempo real', 'amazonia' ); ?>
					        			<div class="matatips">
					        				<button type="button" data-action="open-matatip"><?php _e( 'Abrir', 'amazonia' ); ?></button>
					        				<em><?php _e( '<strong>Fonte</strong>: MapBiomas com base na média do desmatamento diário detectado pelo INPE em 2022.' ) ?></em>
					        			</div>
					        		</div>
					        	</div>
					        	
								<strong class="unity-type"><?php _e( 'de árvores derrubadas', 'amazonia' ); ?></strong>
					        
					        </div>
						
						</div>

						<div class="info-item area" rel="area">

					       	<em data-deter="hectaresThisYear"></em>
					        
					        <div>

					        	<div>
					        		<div class="media">
					        			<em><?php _e( 'média diária', 'amazonia' ); ?></em>
					        			<strong data-deter="hectaresPerDay"></strong>
					        		</div>
					        		<div class="estimativa"><?php 
					        			_e( 'Estimativa em tempo real', 'amazonia' ); ?>
					        			<div class="matatips">
					        				<button type="button" data-action="open-matatip"><?php _e( 'Abrir', 'amazonia' ); ?></button>
					        				<em><?php _e( '<strong>Fonte</strong>: MapBiomas com base na média do desmatamento diário detectado pelo INPE em 2022.' ) ?></em>
					        			</div>
					        		</div>
					        	</div>
					        	
								<strong class="unity-type"><?php _e( 'Campos de futebol', 'amazonia' ); ?></strong>
					        
					        </div>
						
						</div>

					</div>
				
				</div>

			</div>

		    <footer>

		    	<a href="<?php echo Piki::permalang( 'monitor' ); ?>" class="button" title="<?php _e( 'Acesse nosso monitor', 'amazonia' ); ?>"><?php _e( 'Acesse nosso monitor', 'amazonia' ); ?></a><?php 

		    	if( $context != 'embed' ): ?>
		    	<button class="inline do-scroll">
		    		<strong><?php _e( 'Saiba como manter a floresta em pé', 'amazonia' ); ?></strong>
		    		<span><span></span></span>
		    	</button><?php 
		    	endif; ?>

		    	<button type="button" class="ico-share ico-right inline" data-action="share" data-context="estimatives-area" data-url="<?php echo get_site_url( null, 'estimativas' ); ?>" title="<?php _e( 'Compartilhe nas redes', 'amazonia' ); ?>" data-share-description="<?php _e( 'Saiba como manter a floresta em pé', 'amazonia' ); ?>" data-share-title="<?php _e( 'Compartilhe nas redes', 'amazonia' ); ?> - Plenamata">
		    		<span><?php _e( 'Compartilhe nas redes', 'amazonia' ); ?></span>
		    	</button>
		    	
		    </footer>
			
		</div>

	</section><?php
endif;

