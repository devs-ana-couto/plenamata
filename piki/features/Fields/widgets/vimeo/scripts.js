var VimField;

(function($){

	VimField = {

		$videos : false,

		init : function(){

			$videos = $( 'div[data-type="vimeo"]' );
			if( !$videos.length ) return;

			for( var vsi=0; vsi<$videos.length; vsi++ ){
				VimField.configure( $videos.eq( vsi ).get(0) );
			}
			
		},

		configure : function( video ){

			video.$ = video.$ || $( video );

			var data = video.$.data( 'VimField' );
			if( data !== undefined ) return data;

			// Create data
			data = {
				_ : video,
				$ : video.$,
				$video : $( '.video-element', video.$ ),
				$trigger : $( 'a', video.$ ),
				$mask : $( 'span.mask', video.$ ),
				widget: video.$.data( 'widget' ),
				videoCode : video.$.data( 'videocode' ),
				controls : video.$.data( 'controls' ),
				muted : video.$.data( 'muted' ),
				autoplay : true,
				background : video.$.data( 'background' ),
				responsive : video.$.data( 'responsive' ),
				loop : video.$.data( 'loop' ),
				init : video.$.data( 'init' ) > 0 ? video.$.data( 'init' ) : 0,
				time : video.$.data( 'time' ) > 0 ? video.$.data( 'time' ) : 5,
				player: false,
				timeout: false,
				active: false,
				initialState: true,
				autopause : false
			};

			if( data.widget === 'clip' ){
				data.background = true;
				data.autoplay = true;
				data.muted = true;
				data.autopause = false;
			}
			
			if( data.$video.length ){

				data.videoID = data.$video.attr( 'id' );

				var video_settings = {
				    id: data.videoCode,
				    width: 640,
				    loop: data.loop === true,
				    controls: data.controls === true,
				    responsive: true,
				    byline: false,
				    background: data.background === true,
				    muted: true,
				    autoplay: data.autoplay === true,
				    title: false
				};

				// Vídeo pleayer
				data.player = new Vimeo.Player( data.videoID, video_settings );

				data.player.on( 'loaded', function( confs ){
					data.player.setCurrentTime( data.init );
				});

				data.player.on( 'timeupdate', function( info ){
					if( data.active === false ){
						if( info.seconds >= ( data.init + data.time ) ){
							data.player.setCurrentTime( data.init );
						}
					}
				});

				$( '.mask', data.$ ).on( 'click', function(){
					if( data.active == true ){
						VimField.clickPause( data  );
					}
					else {
						VimField.clickPlay( data );
					}
				});

				$( 'a', data.$ ).on( 'click', function( e ){
					e.preventDefault();
					VimField.clickPlay( data );
				});
				
				data.player.on( 'pause', function() {
					VimField.setStopped( data, false );
				});

				data.player.on( 'ended', function(){;
					VimField.setStopped( data, true );
				});
			
			}
			else {
			
				data.$video = false;
			
			}

			// Keeping data
			video.$.data( 'VimField', data ); 

			data.$trigger.hover(
				function(){
					data.$.addClass( 'hover' );
				},
				function(){
					data.$.removeClass( 'hover' );
				}
			);
			
		
		},
		
		setStopped : function( data, reset ){
		    data.active = false;
		    data.$trigger.stop( true, true ).fadeIn();
			data.$.removeClass( 'playing' );
		},

		clickPause : function( data ){
			data.player.pause();
		},

		clickPlay : function( data ){

			data.active = true;

			if( data.initialState === true ){
				data.initialState = false;
				data.player.setCurrentTime( 0 );
				data.player.setVolume( 1 );
			}
			else {
				data.player.play();
			}

			data.$trigger.stop( true, true ).fadeOut();
			data.$mask.stop( true, true ).fadeOut();

			data.$.addClass( 'playing' );

		}

	};
	$(function(){
		VimField.init();
	});

})(jQuery);
