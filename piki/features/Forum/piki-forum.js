(function($){
	window.pikiforms_formtopico_submit = function( $form, title, message ){
		var $description = $( '#page-description' );
		$description.slideUp( 'fast', function(){
			$( this )
				.html( '<p>Seu tópico foi criado com sucesso</p>' ).slideDown( 'medium' )
				.after( '<div class="report-message"><p>Obrigado por participar do nosso grupo de discussões. Leia outros tópicos sugeridos e participe.</p><a href="'+ Piki.blogurl +'/topicos/" class="button">Ver tópicos</a></div>' );
		})
		$form.slideUp( '100', function(){
			$( this ).remove();
			$(window).scrollTo( $description );
		});
	}
})(jQuery);