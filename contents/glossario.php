<?php extract( $args );vdump ?>
<section id="glossario" class="page-glossario">
	<header>
		<span class="center">
			<h1><?php echo $page->render( 'title' ); ?></h1>
			<div>
				<em class="excerpt"><?php echo $page->render( 'body' ); ?></em><?php 
				echo $data->filter; ?>
			</div>
		</span>
	</header><?php 
	// More searcheds
	if( $data->moreSearcheds ): ?>
	<div class="more-searcheds">
		<span class="center">
			<div class="top">
				<em><?php _e( 'Palavras mais pesquisadas', 'amazonia' ); ?></em>
				<nav class="slider-nav compact"></nav>
			</div>
			<div class="slider-wrapper">
				<ul><?php 
					foreach( $data->moreSearcheds as $moreitem ): 
						$thumb = Piki::get_cover( $moreitem->ID ); ?>
						<li class="slider-item">
							<div>
								<a href="<?php echo Glossario::getVerbeteURL( $moreitem ); ?>" title="<?php echo $moreitem->post_title; ?>">
									<em><?php echo $moreitem->post_title; ?></em><?php 
									if( $thumb ): ?>
									<img src="<?php echo $thumb; ?>" alt="<?php echo $moreitem->post_title; ?>"><?php 
									endif; ?>
								</a>
							</div>
						</li><?php 
					endforeach; ?>
				</ul>
			</div>
		</span>
	</div><?php 
	endif; ?>
	<div class="content">
		<span class="center">
			<nav class="menu-terms">
		        <h2 data-action="toggle-parent"><?php echo __( 'Seções', 'amazonia' ); ?></h2>
		        <ul><?php 
		        	foreach( $data->sections as $section ): ?>
	                <li class="<?php echo $section->active ? 'active' : ''; ?>">
	                    <a href="<?php echo Glossario::termURL( $section ); ?>" title="<?php echo $section->name; ?>"><?php 
	                    	echo $section->name; ?>
	                    </a>
	                </li><?php 
	            	endforeach; ?>
		        </ul>
	        </nav>
	        <div class="list-items"><?php 
	        	// Lista de ítems
	        	if( $context === 'archive' ):
	        		if( $data->list ): ?>
	        		<h3 class="list-title"><?php echo $data->activeTerm->name; ?></h3>
		        	<nav class="links-list"><?php 
		        		foreach( $data->list as $item ): ?>
		        		<a href="<?php echo Glossario::getVerbeteURL( $item ); ?>" title="<?php echo $item->post_title; ?>"><?php echo $item->post_title; ?></a><?php 
		        		endforeach; ?>
		        	</nav><?php 
		        	endif;
		        else: 
		        	// Imagem
		        	$cover = Piki::get_cover(); ?>
		        	<article>
		        		<a href="javascript:history.back();" class="back"><?php _e( 'Voltar', 'amazonia' ); ?></a>
		        		<h2><?php echo $meta->render( 'title' ); ?></h2>
		        		<em><?php echo $meta->render( 'excerpt' ); ?></em><?php 
		        		if( $cover ): ?>
		        		<img src="<?php echo $cover; ?>" alt=" "><?php 
		        		endif; ?>
		        		<div><?php echo $meta->render( 'body', [ 'apply_filter' => true ] ); ?></div>
		        	</article><?php
		        endif; ?>
	        </div>
		</span>
	</div>
</section>