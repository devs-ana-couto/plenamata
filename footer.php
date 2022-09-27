<?php $context = _array_get( $args, 'context', 'site' ); ?>		
	
		</main><?php 

		// Share
		get_template_part( 'components/sharebox' );

		// Not embed footer components
		if( $context == 'site' ):

			// Newsletter
			get_template_part( 'components/newsletter' );

			// Do actions before footer
			do_action( 'before_footer' ); ?>
		    <footer>
		    	<div>
		    		<div class="logo-menu"><?php 
		    			// Logo
		  				echo plenamata_logo(); 
		  				// Menu
		  				wp_nav_menu([ 
		  					'theme_location' => 'footer',
		  					'menu_class' => 'main-menu style--2',
		  					'container' => false,
		  				]); ?>
		    		</div><?php 
		  			// Partners
	  				echo plenamata_partners([ 
	  					'title' => __( 'Realizadores', 'amazonia' ),
	  					'image_field' => 'logo_footer',
	  					'total' => 6,
	  				]);
		  			// Copyrith and Use terms ?>
		    		<div class="copy-terms">
		    			<em>Copyright © <?php echo date( 'Y' ); ?> PlenaMata</em>
		    			<a href="#" title="<?php _e( 'Declaração de Privacidade', 'amazonia' ); ?>"><?php _e( 'Declaração de privacidade', 'amazonia' ); ?></a>
		    		</div>
		    	</div>
		    </footer><?php 

		endif;

	    // Footer additions
	    wp_footer(); ?>

  	</body>

</html>