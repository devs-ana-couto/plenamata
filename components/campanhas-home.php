<?php
// Current language
$current_lang = apply_filters( 'wpml_current_language', NULL );
if( $current_lang != 'es' ):

	// Campanhas em destaque
	$campanhas = Campanhas::getDestaques(); 
	if( $campanhas ): ?>
	<section id="campanhas" class="destaques-home style--2 center" data-template-name="campanhas-home">
		<h2 class="title"><?php _e( 'Conheça e participe de uma campanha', 'amazonia' ); ?></h2><?php 
		get_template_part( 'components/destaques', 'campanhas', [ 'destaques' => $campanhas ] ); ?>
		<a href="<?php echo Piki::permalang( 'campanhas' ); ?>" class="button clean green" title="<?php _e( 'Ver todas as campanhas', 'amazonia' ); ?>"><?php _e( 'Ver todas as campanhas', 'amazonia' ); ?></a>
	</section><?php
	endif;

endif;