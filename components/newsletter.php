<?php 
$lang = Common::getActualLang(); ?>
<div class="widget-newsletter" id="newsletter">
	<div>
		<div class="center">
			<header>
				<span>
					<h3><?php _e( 'Newsletter PlenaMata', 'amazonia' ); ?></h3>
					<p><?php _e( 'ASSINE E FAÇA PARTE DO MOVIMENTO', 'amazonia' ); ?></p>
				</span>
				<em>
					<span><?php _e( 'árvores derrubadas em', 'amazonia' ); ?> <?php echo date( 'Y' ); ?></span>
					<em data-deter="treesEstimative"></em>
				</em>
			</header>
			<div class="form-wrapper"><?php 
				switch( $lang ):
					case 'en': ?>
						<iframe src="https://landing.mailerlite.com/webforms/landing/q9t5i3"></iframe><?php 
					break;
					case 'es': ?>
						<iframe src="https://landing.mailerlite.com/webforms/landing/o8r7q3"></iframe><?php 
					break;
					case 'pt-BR':
					default: ?>
						<iframe src="https://landing.mailerlite.com/webforms/landing/c0g1r5"></iframe><?php 
					break;
				endswitch; ?>
				<?php 
				//echo do_shortcode( '[newsletter title=""]' ); ?>		
			</div>
		</div>
	</div>
</div>
<div class="floater-newsletter" id="newsletter-floater">
	<div class="center">
		<h3><?php _e( 'Newsletter PlenaMata', 'amazonia' ); ?></h3>
		<em>
			<strong data-deter="treesEstimative"></strong>
			<span><?php _e( 'de árvores derrubadas em', 'amazonia' ); ?> <?php echo date( 'Y' ); ?></span>
		</em><?php 
		// Partners
		echo plenamata_partners([ 
			'title' => __( 'Oferecido por', 'amazonia' ),
			'image_field' => 'logo_header',
			'partner' => true,
			'total' => 2, 
		]); ?>
	</div>
</div>
