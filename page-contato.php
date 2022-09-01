<?php /* Template Name: Contato */ ?>
<?php 
// Header
get_header();
// Meta
$meta = new PostMeta(); ?>
<div>
	<span>
		<h1><?php echo $meta->render( 'title' ); ?></h1>
		<div class="content-body"><?php
			// Body 
			echo $meta->render( 'body', [ 'apply_filter' => true ] ); ?>
		</div>
	</span>
</div>
<div style="background-image:url('<?php echo Piki::get_cover(); ?>');">
	<span><?php 
  		echo plenamata_logo();  ?>
		<em><?php echo sprintf( __( 'Use a hashtag %s e compartilhe nas redes', 'amazonia' ), '<strong>#PlenaMata</strong>' ); ?>  </em><?php 
		echo do_shortcode( '[pikishare services="twitter,linkedin,facebook,whatsapp" widget_title="' . __( 'Acesse nossas redes e compartilhe', 'amazonia' ) . '"]' ) ?>
	</span>
</div><?php
// Footer
get_footer();