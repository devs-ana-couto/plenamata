(function($){

	PikiSlider = function(){
		return {

			players : [],
			timeout : false,
			timeoutToPlay : false,

			init : function( $sld ){

				// Data
				var data = $sld.data( 'PikiSlider' );
				if( data !== undefined ) return;
				data = {
					$ : $sld,
					_ : $sld.get(0),
					videos : $sld.find( '.box-player' ),
					$slides : $( '.slide-item', $sld ),
					$menu : $sld.children( '.menu' ),
					$slider : $sld.children( '.slider-slideshow' ),
					timeResize : false
				};
				
				// Slick options
				data.slickOptions = {
					infinite: false
					,adaptiveHeight: false
					,pauseOnDotsHover: true
					,dotsClass: 'slider-pager'
					,dots: data.$slider.attr( 'slider-pager' ) === 'true'
					,arrows: data.$slider.attr( 'slider-arrows' ) === 'true'
					,respondTo: 'slider'
					,waitForAnimate: true
				};
				
				// Pager
				data.pagerWrapper = $( '.pager-wrapper', data.$ );
				if( data.pagerWrapper.length ){
					data.pager = data.pagerWrapper.children( '.slider-pager' )
					options.dots = true;
					options.dotsClass = 'slider-pager';
				}

	            data.$slides.each(function( index ){

	            	this.$ = this.$ || $( this );
					
					var PData = {
						$slide : this.$,
						actual: false,
						disabled : false,
						configured: false,
						forcedPause : false,
						index : index,
						videoCode : false,
						$video : this.$.find( 'video' ).show(),
						$button : $( 'a.controll-button', this.$ ),
						$box : this.$.find( '.box-player' )
					};

					if( PData.$video.length ){
						
						PData.videoCode = PData.$video.attr( 'data-video-code' );

						// Configure vídeo
						PikiSlider.configureVideo( data, PData );

						PData.$button.on( 'mouseup', function(e){
							e.preventDefault();
							PikiSlider.bindClickVideo( data, PData );						
						});
					
					}

					this.$.data( 'PikiSlider', PData );

	            });

				// Slick events
	            data.$slider.on( 'init', function( event, slick ){
	            	// Play first vídeo, if exists
	            	PikiSlider.initSlick( data, event, slick );
	            });			

				// Slick
				data.slick = data.$slider.slick( data.slickOptions );

				// Carrossel principal
	            data.$slider.on( 'beforeChange', function( slick, currentSlide, nextSlide ){
	            	// Pausing all videos
	            	PikiSlider.pauseVideos( true );
	            });			
	            data.$slider.on( 'afterChange', function( event, slick, currentSlide, nextSlide ){
	            	// Resume vídeo, if forced pause
	            	PikiSlider.resumeVideo( data );
	            });

				// Disabled arrow
				$( '.slick-arrow.slick-disabled' ).on( 'click', function(e){
					e.preventDefault();
					e.stopPropagation();
					return false;
				});

				// Menu
				if( data.$menu.length ){					
					data.$menu.on( 'click', 'a', function(e){
						e.preventDefault();
						this.$ = this.$ || $( this );
						PikiSlider.goTo( data, this );
					});
				}

				$( 'body' ).on( 'click', function(e){

					e.target.$ = e.target.$ || $( e.target );

					var $sliderMenu = e.target.$.parents( '.slider-pager' );

					if( e.target.$.hasClass( 'controll-button' ) || e.target.$.hasClass( 'icon-arrow-right3' ) || $sliderMenu.length ){
						return;
					}
					else {
		            	// Pausing all videos
		            	PikiSlider.pauseVideos();
					}
				
				});

			},

			bindClickVideo : function( data, PData ){

				if( PData.configured === true && PData.player.getPlayerState() === YT.PlayerState.PLAYING ) {
					PData.disabled = false;
					PikiSlider.pauseVideo( data, PData );
				}
				else {
					PData.disabled = true;
					PikiSlider.startVideo( data, PData );
				}
				
			},

			// Restart video forced pause
			resumeVideo : function( data ){

            	// Resuming actual
				var current = data.$slider.slick( 'slickCurrentSlide' );
				var $slide = data.$slides.eq( current );
				var PData = $slide.data( 'PikiSlider' );

				if( PData !== undefined && PData.forcedPause === true ){
					PData.player.playVideo();
				}

			},

			// Pause all videos
			pauseVideos : function( forced ){

				// Total de vídeos
				var total = PikiSlider.players.length;
				
				// No videos
				if( total < 1 ) return;
				
				// Pausing videos
				for ( var i = 0; i < total; i++ ) {
					
					var data = PikiSlider.players[ i ];
					
					if( data.player.getPlayerState === undefined ){
						continue;
					}

					if( data.player.getPlayerState() === YT.PlayerState.PLAYING ){
						data.forcedPause = ( forced === true );
						data.player.pauseVideo();
					}
				
				}
			
			},

			// Pause single vídeo
			pauseVideo : function( data, PData ){

				PData.$box.removeClass( 'playing' );
				PData.actual = false;
				PData.player.pauseVideo();

			},

			// Starging a video
			startVideo : function( data, PData ){

				PData.$box.addClass( 'playing' );

				if( PikiSlider.timeoutToPlay !== false ){
					clearTimeout( PikiSlider.timeoutToPlay );
				}

				// Start play vídeo
				if( PData.configured === true ){

					PData.player.playVideo();
					PData.actual = true;
				
				}
				// Wait video be ready
				else {

					PikiSlider.timeoutToPlay = setTimeout(function(){
						PikiSlider.startVideo( data, PData );
					}, 100 );

				}
				
			},

			getSizes : function( data ){
				return {
					'window' : Math.max( document.documentElement.clientWidth, window.innerWidth || 0 ),
					'wrapper' : data.$.outerWidth()
				};
			},

			// Iniciando slick
			initSlick : function( data, event, slick ){

				// Current
				//var current = slick.$slides[ slick.currentSlide ];
				//var $current = $( current );
				//var PData = $current.data( 'PikiSlider' );

				// Box video
				//if( PData.videoCode !== false ){
				//	PikiSlider.startVideo( data, PData );
				//}

				//data.sizes = PikiSlider.getSizes( data );
				//
				//setInterval(function(){
				//	PikiSlider.resizeCheck( data );
				//}, 100 );

			},

			resizeCheck : function( data ){
				var _sizes = PikiSlider.getSizes( data );
				if( _sizes.window === data.sizes.window && _sizes.wrapper !== data.sizes.wrapper ){
					data.$slider.slick( 'refresh' );
				}
				data.sizes = _sizes;
			},

			// Configure video
			configureVideo : function( data, PData ){

				// Have no video
				if( PData.videoCode === false || PData.configured === true ){
					return;
				}

				PikiSlider.APIWait(function(){

					// Inicia o vídeo
					PData.player = new YT.Player(PData.$video.attr( 'id' ), {
						
						height: '100%',
						width: '100%',
						videoId: PData.videoCode,
						playerVars: { 
							enablejsapi: 1,
							mute: 0,
							autoplay : 0,
							rel: 0,
							controls: 0,
							loop: 0,
							modestbranding: 1
						},
						events: {
							onReady: function( event ){
								PData.configured = true;
								PData.$slide.pikiLoader( 'close' );
							},
							onStateChange : function( event ){
								PikiSlider.videoStateChange( event, PData, data );
							}
						}
					
					});

					PikiSlider.players.push( PData );

				});

			},

			// On video state change
			videoStateChange : function( event, PData, data ){

				// Video state
				var state = event.target.getPlayerState();
				
				// Current slide
				var current = data.$slider.slick( 'slickCurrentSlide' );

				// Se o vídeo começa a reprodução, mas não é o slide atual
				if( state === YT.PlayerState.PLAYING ){
					if( current !== PData.index ){
						event.target.pauseVideo();
						PData.forcedPause = true;
					}
					else {
						PData.forcedPause = false;
					}
				}

				// Botão de play
				if( state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED || state === YT.PlayerState.UNSTARTED ){
					PData.disabled = false;
					PData.$box.removeClass( 'playing' );
				} 
				else {
					PData.disabled = true;
					PData.$box.addClass( 'playing' );
				}

			},

			// Go to an slide
			goTo : function( data, el ){
				var i = el.$.index();	
				var current = data.$slider.slick( 'slickCurrentSlide' );
				if( current === i ){
					return;
				}
				data.menu.children( 'a' ).removeClass();
				data.$slider.slick( 'slickGoTo', i );
				el.$.addClass( 'opened' );
			
			},

			// Waiting youtube API
			APIWait : function( callback ){
				if( typeof( YT ) === 'undefined' || typeof( YT.Player ) === 'undefined' ){
					if( PikiSlider.timeout ){
						clearTimeout( PikiSlider.timeout );
					}
					PikiSlider.timeout = setTimeout(function(){
						PikiSlider.APIWait( callback );
					}, 50);
				}
				else {
					clearTimeout( PikiSlider.timeout );
					callback();
				}
			}
		
		};
	}();


	$(function(){

		var $sliders = $( '.slider-wrapper' );
		if( $sliders.length ){
			$sliders.each(function(){
				this.$ = this.$ || $( this );
				PikiSlider.init( this.$ );
			});
		}

	});

	window.piki_slides_slide_data = function( slide ){
		var $slide = $( slide );
		var data = $slide.data( 'pikiSlides' );
		if( !data ){
			var $texts = $slide.children( '.texts' ).first();
			if( !$texts.length ){
				$texts = false;
			} 
			data = { target : $slide, texts : $texts };
			$slide.data( 'pikiSlides', data );
		}
		return data;
	}

})(jQuery);