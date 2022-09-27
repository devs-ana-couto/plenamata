<?php 
get_header( null, [ 'context' => 'embed', 'preview' => _get( 'preview' ) ] ); 
extract($args); ?>
<section class="page-embed-share">

	<div class="desc-filters">
		<span class="center">
			<div>
				<strong>Por período:</strong>
				<em>Ano de <?php echo date( 'Y' ); ?></em>
			</div>
		</span>
	</div>

	<div class="item-number big">
		<span>
			<header>
				<h2><?php 
					switch( $type ):
						case 'area': ?>
							<strong>Área devastada</strong> em equitares<?php
						break;
						default: ?>
							<strong>Árvores derrubadas</strong> por desmatamento<?php
						break;
					endswitch; ?>
				</h2>
			</header><?php 
				switch( $type ):
					case 'area': ?>
						<em data-deter="hectaresThisYear"></em><?php 
					break;
					default: ?>
						<em data-deter="treesEstimative"></em><?php 
					break;
				endswitch; ?>
		</span>
	</div>
	<div class="item-number small">
		<span>
			<?php 
			switch( $type ):
				case 'area': ?>
					<em data-deter="hectaresPerDay"></em>
					<strong>campos de futebol</strong><?php
				break;
				default: ?>
					<em data-deter="treesPerDay"></em>
					<strong>árvores/dia</strong><?php
				break;
			endswitch; ?>
		</span>
	</div>

	<footer>
		
		<div class="conheca">
			<em>Conheça e faça parte do movimento</em>
			<a href="<?php echo get_site_url(); ?>" class='button clean white' title="Site Plenamata" target="_blank" rel="noreferrer noopener">Acesse o site Plenamata</a>
		</div>

		<div class="fonte">
			Fonte: <strong>INFOAMAZONIA</strong>
		</div>

	</footer>
	
</section><?php

get_footer( null, [ 'context' => 'embed' ] ); ?>