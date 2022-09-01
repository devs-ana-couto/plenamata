(function($){
	$(function(){

		// Mesmo tamanho vertical
		var $sameHeights = $( '.allSameHeight' );
		if( $sameHeights.length ){
			$sameHeights.allSameHeight();
		}

		// Multimídias
		$( '.piki-view.media-actions' ).on( 'click', 'a.list-item', function(event){
			
			event.preventDefault();

			var $this = $( this );
			var ID = $this.attr( 'rel' );

			// Vídeo
			if( $this.is( '.type-video' ) ){
				
				$.fancybox( $this, {
					href : ID,
					openEffect  : 'none',
					closeEffect : 'none',
				    autoDimensions : true,
				    autoScale : true,
				    aspectRatio : true,
					helpers : {
						media : {}
					}
				});

			}

			// Imagens
			else if( $this.is( '.type-foto' ) ){

				$.fn.pikiLoader();

				$.ajax({
					type : 'POST',
					dataType : 'JSON',
					url: Piki.ajaxurl,
					data : {
						'action' : 'pikiviews_get_attachments',
						'ids' : ID
					}
				}).done( function( response ) {
					$.fn.pikiLoader( 'close' );
					if( !response.length ){
						alert(  'Nenhuma imagem para mostrar');
						return;
					}
					var images = [];
					$.each( response, function( index, value ){
						images[ index ] = {
							href : value.guid,
							title : value.post_title
						};
					});
					$.fancybox( images, {
						openEffect  : 'none',
						closeEffect : 'none',
					    autoDimensions : true,
					    autoScale : true
					});
				});

			}

			// Audio
			else if( $this.is( '.type-audio' ) ){		

				// Player
				var $wrapper = $( '<div class="audio-wrapper"></div>' ).appendTo( 'body' );
				var $player = $( '<audio src="'+ ID +'" type="audio/mp3" controls="controls"></audio>' ).appendTo( $wrapper );
				// Modal
				$wrapper.PikiModal({
					maxWidth : 600,
					height : 80,
					modal : true,
					autoOpen : true,
					classname : 'audio-player',
					onClose : function( $modal ){
						$modal.find( 'audio' ).pause();
					},
					onOpen : function( $modal ){
						$modal.find( 'audio' ).mediaelementplayer({ 
							audioWidth : '100%', 
							audioHeight: 40 
						});
					}
				});

			}

			// Clipping
			else if( $this.is( '.type-clipping' ) ){

				$.fn.pikiLoader();

				var modal_id = 'pikiview-modal-' + ID;
				var $modal = $( modal_id );

				if( $modal.length ){
					$.fn.pikiLoader( 'close' );
					$modal.PikiModal( 'open' );
				}
				else {

					$.ajax({
						dataType : 'html',
						url: $this.attr( 'href' ),
					}).done( function( response ) {
						$.fn.pikiLoader( 'close' );
						$( '<div id="'+ modal_id +'">' + response + '</div>' ).appendTo( 'body' ).PikiModal({
							maxWidth : 800,
							modal : true,
							autoOpen : true
						});

					});

				}

			}

		});

	});
	
	$.fn.PikiModal = function( method ) {
		
		return this.each(function(){
			
			var $this = $( this );
			var data = $this.data( 'PikiModal' );

			if( data == undefined ){

				// Opções informadas
				var options = typeof( method ) !== 'string' ? method : {};
			    // Default options
			    var defaults = { 
				    zIndex: 500,
				    target: $this,
					maxWidth : 800,
					modal : true,
					autoOpen : true,
					height : false,
					onClose : false,
					onOpen : false,
					classname : false
			    }; 
			    data = $.extend( {}, defaults, options );

			    data.modal = $( '<div class="pikiview-modal '+ ( !!data.classname ? data.classname : '' ) +'"><span class="close-button"></span><div class="modal-content"></div></div></div>' ).appendTo( 'body' ).hide();
				$this.appendTo( data.modal.find( '.modal-content' ).first() );

				data.closeButton = data.modal.children( '.close-button' );
				data.closeButton.on( 'click', function(event){
					$( this ).parent().PikiModal( 'close' );
				});

				$this.data( 'PikiModal', data );

				// Abertura imediata
				if( options.autoOpen ){
					$this.PikiModal( 'open' );
				}

				$( window ).bind( 'resize', function(){
					$this.PikiModal( 'resize' );
				});
						
			}

			if( typeof( method ) !== 'string' ){
				options = method;
				method = 'configure';
			}
			else if( method == '' ){
				method = 'open';
			}
			
			switch( method ){

				// Configura o índice
				case 'open':

					// Botões de compartilhamento
					try{
						addthis.toolbox( '.addthis_toolbox' );
					}
					catch( err ){
						console.info( 'Addthis não está configurado' );
					}

					$( 'html' ).css( 'overflow', 'hidden' );

				    if( data.modal ){
				    	$.fn.pikiLoader({ toBehind : $this, stop : true });
				    }
				    $this.PikiModal( 'resize' );
					
					data.modal.fadeIn( 'medium', function(){
						if( data.onOpen ){
							data.onOpen( data.modal );
						}
					});

				break;

				// Redimensiona
				case 'resize':

					var _width;
					var _left;
					var _viewport = window.piki_get_viewport();
					var _css = {};
					
					// Horizontal
					if( data.maxWidth && _viewport.width > ( data.maxWidth + 40 ) ){
						_css.width = data.maxWidth;
					}
					else {
						_css.width = _viewport.width - 40;
					}
					_css.left = Math.round( ( _viewport.width - _css.width ) / 2 );

					// Vertical
					if( data.height ){
						_css.height = data.height;
						_css.top = '50%';
						_css.marginTop = ( data.height / 2 ) * -1;
					}
					
					data.modal.css( _css );

				break;


				// Configura o índice
				case 'close':

					$( 'html' ).css({ 'overflow-y' : 'scroll', 'overflow-x' : 'hidden' });

				    $.fn.pikiLoader( 'close' );
					$this.hide();

					console.info( 'this' );
					console.log( data );

					if( data.onClose ){
						data.onClose( data.modal );
					}

				break;


			}

		});
	};

})(jQuery);