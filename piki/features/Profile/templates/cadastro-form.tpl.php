<?php get_header(); ?>

<div id="main-content" class="center-full perfil-form">
    
	<div id="primary" class="alignleft content-area">
		
		<h2 class="page-title">Cadastro</h2>
		
		<div id="content" class="site-content" role="main">
			<div id="page-description"><p>Preencha o formulário abaixo para participar dos grupos de discussão, compartilhar a sua história ou cadastrar sua instituição. Sua identidade será mantida em SIGILO.</p></div>
            <?php echo PKPerfil::form(); ?>
		</div><!-- #content -->
		
	</div><!-- #primary -->

	<div id="sidebar-right">
		<?php get_template_part( 'widget-participe' ); ?>
	</div>

</div><!-- #main-content -->
<?php 
# Floater
PikiFloater::add_files();
get_footer(); 
?>