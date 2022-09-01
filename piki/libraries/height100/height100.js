(function($){
	// Rodapé sempre no fim da página
	window.height100 = function(){
		var timeout;
		_window.bind( 'resize', function(){
			// Header
			var $header = $( '#masthead' ).first().addClass( 'clearfix' );
			// Footer
			var $footer = $( '#colophon' ).first().addClass( 'clearfix' );
			// Content
			var $content = $( '#main' ).first().addClass( 'clearfix' );
			// Viewport
			var viewport = window.piki_get_viewport();
			// Tamanho total do vieport
			var _content_height = viewport.height;
			// Se houver header, removemos o tamanho do mesmo
			if( $header.length ){
				_content_height -= parseInt( $header.outerHeight() );
			} 
			// Se houver o footer, removemos o tamanho do mesmo
			if( $footer.length ){
				_content_height -= parseInt( $footer.outerHeight() );
			}
			// Redimensiona
			clearTimeout( timeout );
			timeout = setTimeout( "window.height100_do("+ _content_height +");", 20 );

		}).resize();
	};
	window.height100_do = function( height ){
		$( '#main' ).css( 'min-height', height + 'px' );
	};
})(jQuery);