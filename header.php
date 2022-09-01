<?php 
$assets = get_template_directory_uri() . '/assets/'; 
$context = _array_get( $args, 'context', 'site' ); 
$body_class = 'menu-initial plnmt-wrapper' . ( $context == 'embed' ? ' is-embed' : '' ); ?>
<!DOCTYPE html>
<html lang="pt-br">
  	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
	    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="apple-touch-icon" sizes="57x57" href="<?php echo $assets; ?>favicon/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="<?php echo $assets; ?>favicon/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="<?php echo $assets; ?>favicon/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="<?php echo $assets; ?>favicon/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="<?php echo $assets; ?>favicon/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="<?php echo $assets; ?>favicon/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="<?php echo $assets; ?>favicon/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="<?php echo $assets; ?>favicon/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="<?php echo $assets; ?>favicon/apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="<?php echo $assets; ?>favicon/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $assets; ?>favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="<?php echo $assets; ?>favicon/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $assets; ?>favicon/favicon-16x16.png">
		<link rel="manifest" href="<?php echo $assets; ?>/favicon/manifest.json">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="<?php echo $assets; ?>favicon/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">

 		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

	    <script type="application/ld+json">
	    {
	        "@context": "http://schema.org",
	        "@type": "WebPage",
	        "name": "Plenamata",
	        "description": "",
	        "image": "<?php echo $assets; ?>images/img-share.png",
	        "URL": "<?php echo get_site_url(); ?>"
	    }
	    </script>

    	<title><?php wp_title( ' | ' ); ?></title>

		<?php wp_head(); ?>

  	</head>
	
  	<body <?php body_class( $body_class ); ?>><?php 

  		// Do action on body open
		do_action('wp_body_open');

		// Before header
		do_action('before_header'); ?>
  		<header id="masthead" class="site-header initial <?php echo( _get( 's' ) ? 'searching' : '' ); ?>">

  			<div>

	  			<div><?php

	  				// Logo
	  				echo plenamata_logo();
	  			
	  				// Partners
	  				echo plenamata_partners([ 
	  					'title' => __( 'Oferecido por', 'amazonia' ),
	  					'image_field' => 'logo_header',
	  					'partner' => true,
	  					'total' => 2, 
	  				]); ?>
		  		
		  		</div><?php 

		  		if( $context === 'site' ):

		  			// Menu
					wp_nav_menu([ 
	  					'theme_location' => 'main',
	  					'menu_class' => 'main-menu desktop',
	  					'container' => false,
		  			]); ?>

			  		<div class="mobile-floater"><?php
			  			
						// Menu
		  				wp_nav_menu([ 
		  					'theme_location' => 'footer',
		  					'menu_class' => 'main-menu mobile',
		  					'container' => false,
		  				]); ?>

			  			<a href="<?php echo Piki::permalang( 'monitor' ); ?>" class="button acess-dashboard" title="<?php _e( 'Acesse nosso monitor', 'amazonia' ); ?>"><?php _e( 'Acesse nosso monitor', 'amazonia' ); ?></a><?php

			  			// Language switcher
			  			Common::menuLangs(); ?>

					</div>

					<button class="search clean" data-action="toggle-search" title="<?php _e( 'Buscar', 'amazonia' ) ?>"><span><?php _e( 'Buscar', 'amazonia' ) ?></span></button><?php

					get_template_part( 'components/menu-toggle' ); 

				endif; ?>
  				
  			</div>

  		</header>

	    <main>
	    