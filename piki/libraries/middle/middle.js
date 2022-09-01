(function($){
	$.fn.middle = function( method ){
		return this.each(function(){			
			
			var $this = $( this );
			var data = $this.data( 'Middle' );
			
			if( method === undefined ){
				method = false;
			}
			
			if( $this.attr( 'id' ) == 'navbar' ){
				console.info( 'this' );
				console.log( $this.css( 'margin-top' ) );
			}
			
			if( !data ){
				$this.css({ 'transition' : 'all .2s linear', '-webkit-transition' : 'all .2s linear' });
				data = {
					parent : $this.parent(),
					originalMargin : { top : $this.css( 'margin-top' ), bottom : $this.css( 'margin-bottom' ) }
				};
				$this.data( 'Middle', data );
			}
			if( method == 'reset' ){
				$this.css({ 'margin-top' : data.originalMargin.top, 'margin-bottom' : data.originalMargin.bottom });
			}
			else {
				var scrolltop, parentHeight;
				if( data.parent.is( 'body' ) ) {
					scrolltop  = parseInt( piki_get_scrolltop() );
					parentHeight = piki_get_viewport().height;
				}
				else {
					scrolltop = data.parent.scrollTop();
					parentHeight = data.parent.outerHeight();			
				}
				// Tamanho vertical do box
				var boxheight = parseInt( $this.outerHeight() );
				// Posição central do box
				var top = ( parentHeight - boxheight ) / 2;
				// Se a posição central for menor do que 0, é setado zero
				if ( top < 0 ) { top = 0; }
				// Adiciona a posição x da barra à posição vertical do box
				top += scrolltop;
				// Centraliza o objeto
				$this.css( 'margin-top', top );
			}
			$( window ).bind( 'resize', function(){
				$this.middle();
			});
		});
	};
})(jQuery);
