(function($){

 	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[ 0 ];
	firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

	$(function(){
		$( 'body' ).delegate( '.youtube-inline-widget', 'click', function(event){
			event.preventDefault();
			$( this ).youtubeField();
		});
	});

	// Máscara de carregamento
	var youtubeFieldMethods = {

		configure : function( options ) {
			
			return this.each(function(){

			    // Default options
			    var defaults = {
					afterLoad: false,
					afterChange: false,
					afterClear: false,
					afterReset: false
			    }; 

				var data = $.extend( {}, defaults, options );

				data.$ = $( this );
				data.self = this;

				// Se o vídeo já está pronto
				data.videoReady = false;
				
				// ID do vídeo
				data.targetToken = data.$.attr( 'video-token' );
				
				// Código do vídeo no Youtube
				data.videoCode = data.$.attr( 'video-code' );

				// Box do vídeo
				data.videoBox = $( '<div class="youtube-inline-box clear"></div>' ).insertAfter( data.$ ).hide();
				
				// Vídeo fluido
				data.videoWrapper = $( '<div class="video-container"></div>' ).appendTo( data.videoBox );
				data.videoWrapper.pikiLoader();
				
				// Objeto do vídeo
				data.video = $( '<div id="'+ data.targetToken +'"></div>' ).appendTo( data.videoWrapper );
				
				// Close button
				data.closeButton = $( '<span class="close-button">Fechar<span class="icon"></span></span>' ).appendTo( data.videoBox );
				data.closeButton.on( 'click', function(event){
					data.$.youtubeField( 'close' );
				});

				data.$.data( 'youtubeField', data );

				data.$.youtubeField( 'open' );

				/*
				// Resize
				data.timeout = false;
				data.resize = function(){
			    	var wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			    	if( wWidth <= 640 ){
			    		if( data.actualMode !== 'phone' ){
			    			data.$.listTypes( 'setMode', 'phone' );
			    		}
			    	}
			    	else {
			    		if( data.actualMode === 'phone' ){
			    			if( data.beforeMode === 'grid' ){
			    				data.$.listTypes( 'setMode', 'grid' );
			    			}
			    			else {
			    				data.$.listTypes( 'setMode', 'list' );
			    			}
			    		}
			    	}
				};

				// Size
				$( window ).bind( 'resize', function(){
					data.$.listTypes( 'resizeBind' );
				}).resize();
				*/

			});
		
		},

		createPlayer : function( data ){
			return this.each(function(){

				// Inicia o vídeo
				data.player = new YT.Player( data.targetToken, {
					height: '315',
					width: '420',
					videoId: data.videoCode,
					playerVars: { 'autoplay' : 1, 'rel' : 0 },
					events: {
						onReady: function(event){
							data.videoReady = true;
							data.videoWrapper.pikiLoader( 'close' );
						}
					}
				});

			});
		},

		open : function( data ){
			return this.each(function(){
				data.closeButton.show();
				data.$.stop().slideUp();
				data.videoBox.stop().slideDown( 600, function(){
					if( data.videoReady === true ){
						data.player.playVideo();
					}
					else {
						data.$.youtubeField( 'createPlayer' );
					}
				});
			});
		},

		close : function( data ){
			return this.each(function(){
				data.closeButton.hide();
				data.$.stop().slideDown();
				data.videoBox.stop().slideUp( 500, function(){
					if( data.videoReady === true ){
						data.player.pauseVideo();
					}
					else {
						data.player.destroy();
					}
				});

			});
		},

		resizeBind : function( data ){
			return this.each(function(){
				clearTimeout( data.timeout );
				data.timeout = setTimeout( data.resize, 200 );
			});
		}

	};

	$.fn.youtubeField = function( method ) {
		var data = this.data( 'youtubeField' );
		if( data === undefined ){
			return youtubeFieldMethods.configure.apply( this, arguments );
		}
		else { 
			var args;
			if( youtubeFieldMethods[ method ] ){
				args = Array.prototype.slice.call( arguments, 1 );
			}
			else {
				method = 'open';
				args = arguments;
			}
			args = ( args.length && args.unshift( data ) ) || [ data ];
			return youtubeFieldMethods[ method ].apply( this, args );
		}
	};

})(jQuery);