(function($){
	//$( 'ul.alpha-indice' ).AlphaIndice();
	$.fn.AlphaIndice = function( method ) {
		return this.each(function(){
			var $this = $(this);
			var data = $this.data( 'AlphaIndice' );
			switch( method ){
				
				// Configura o índice
				case 'click':
					if( $this.is( '.active' ) ){
						return ;
					}
					var main = data.target.data( 'AlphaIndice' );
					main.listItems.children( '.item' ).hide();
					main.listItems.children( '.item[rel="'+ $this.attr( 'rel' ) +'"]' ).show();
					main.target.find( 'li a' ).removeClass( 'active' );
					$this.addClass( 'active' );
				break;

				// Filtra pelo índice
				default:
					if( !data ){
						data = {
							target : $this,
							botoes : $this.find( 'li a' ),
							listItems : $this.parent().find( '.pager-items' ).eq(0)
						};
						$this.data( 'AlphaIndice', data );
						var totalItems = 0;
						data.botoes.each(function(){
							$i = $(this);
							$i.data( 'AlphaIndice', { target: $this } );
							totalItems = data.listItems.children( '.item[rel="'+ $i.attr('rel') +'"]' ).length;
							if( totalItems > 0 ){
								$i.click(function( event ){
									$(this).AlphaIndice( 'click' );
								}).addClass( 'on' );
							}
							else{
								$(this).addClass( 'off' );
								$(this).click(function(event){event.preventDefault();});
							}
						});

						var anchor = document.location.href.split( '#' );
						if( anchor.length > 0 ){
							data.botoes.filter( '[rel="'+anchor[1]+'"]' ).click();
						}

					}
				break;
			}
		});
	};
})(jQuery);
