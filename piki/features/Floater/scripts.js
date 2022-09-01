(function($){
	
	$(function(){
		
		$body = $( 'body' );
		$html = $( 'html' );
		
		$body.on( 'click', 'a.piki-page-floater', function(e){
			e.preventDefault();
			pikiFloater.bindClick( this );
		});
	
	});

	var pikiFloater = {

		bindClick : function( el ){

			el.$ = el.$ || $( el );
			var data = el.$.data( 'pikiFloater' );
			
			if( data === undefined ){
			
				data = {
					_ : el,
					$ : el.$,
					url : el.$.attr( 'href' ),
					content_id : el.$.attr( 'rel' ),
					title : el.$.data( 'modal-title' ),
					fitScreen : el.$.data( 'fit-screen' )
				};
				
				el.$.data( 'pikiFloater', data );
			
			}

			pikiFloater.requestContent( data );

		},
		requestContent : function( data ){
			
			var request = $.ajax({
				url: data.url,
				type: 'GET',
				beforeSend: function(){
					$.fn.pikiLoader()
				}
			});
			request.done(function( response ) {

				// Close loader
				$.fn.pikiLoader( 'close' );

				// Content
				var $content = $( response );
				if( !$content.is( '#content' ) ){
					$content = $content.find( '#content' );
				}

				// Not founded content
				if( !$content.length ){
					console.log( 'O conteúdo da página ' + _this.url + ' não foi encontrado' );
					return false;
				}

				Message.open({
					title : data.title !== undefined ? data.title : false,
					classname : data.class !== undefined ? data.class : false,
					fitScreen : data.fitScreen !== undefined ? true : false,
					message : $content.html()
				});
			
			});
			request.fail(function( jqXHR, textStatus ){
				$.fn.pikiLoader( 'close' );
				console.log( "Falha na requisição: " + textStatus );
			});
		}

	};

	$.fn.pikiFloater = function(){
		
		var $this = $( this );
		var _this = this;

		// Configura
		this.configure = function(){
			
			$this.on( 'click', function(e){
				e.preventDefault();
				if( _this.opened === true ){
					_this.closeFloater();
				}
				else{
					_this.openFloater();
				}
			});
			
			// URL
			this.url = $this.attr( 'href' );
			
			// ID do conteúdo
			this.content_id = $this.attr( 'rel' );
			
			// Configurado
			this.configured = true;
			
			// Página 
			this.requestContent();
		
		}

	}

})(jQuery);