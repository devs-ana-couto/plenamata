<?php
// Destaques de notícias
$noticias = Posts::getDestaques();
if( $noticias ): ?>
<section class="destaques-home center" data-template-name="<?php plenamata_template_name( __FILE__ ); ?>">
	<header>
		<h2><?php _e( 'Notícias' ); ?></h2>
		<em><?php _e( 'Fique por dentro do que está acontecendo na Amazônia', 'amazonia' ) ?>.</em>
		<a href="<?php echo Piki::permalang( 'artigos' ); ?>" class="button clean green desktop" title="<?php _e( 'Ver todas as notícias', 'amazonia' ); ?>"><?php _e( 'Ver todas as notícias', 'amazonia' ); ?></a>
	</header><?php 
	get_template_part( 'components/destaques', 'news', [ 'destaques' => $noticias ] ); ?>
	<a href="<?php echo Piki::permalang( 'artigos' ); ?>" class="button clean green mobile" title="<?php _e( 'Ver todas as notícias', 'amazonia' ); ?>"><?php _e( 'Ver todas as notícias', 'amazonia' ); ?></a>
</section><?php
endif;