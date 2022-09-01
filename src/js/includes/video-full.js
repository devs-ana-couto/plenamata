var VideoFull;

(function($){

    VideoFull = {

        $fulls : false,
        initedResize : false,
        timeResize : false,
        timeAPI : false,

        init : function(){

            // Full vídeo
            VideoFull.$fulls = $( 'div.video-fullsize' );
            if( VideoFull.$fulls.length ){

                // Initing
                VideoFull.$fulls.each(function(){
                    VideoFull.configureFull( this );
                });
            
                // Binding resize
                if( !VideoFull.initedResize ){

                    VideoFull.initedResize = true;
                    
                    $(window).resize(function(){
                        if( VideoFull.timeResize ) clearTimeout( VideoFull.timeResize );
                        VideoFull.timeResize = setTimeout( VideoFull.bindResize, 100 );
                    });
                    VideoFull.bindResize();
                
                }

            }
        
        },

        configureFull : function( video ){

            video.$ = video.$ || $( video );
            
            var data = video.$.data( 'VideoFull' );
            if( data !== undefined ){ 
                VideoFull.ajustVideoSize( data );
                return data;
            }

            data = {
                $ : video.$,
                $video : $( '.video-sizer', video.$ ),
                $trigger : $( '[data-action="play-video"]', video.$ ),
                $mask : $( 'picture', video.$ ),
                videocode : video.$.data( 'videocode' ),
                player: false,
                loop : video.$.data( 'loop' ),
                background : video.$.data( 'background' ),
                setCover : video.$.hasClass( 'set-cover' )
            };
            data.videoID = data.$video.attr( 'id' );

            // Keep data
            video.$.data( 'VideoFull', data );
                    
            // Init Vídeo
            this.APIWait(function(){
                VideoFull.ajustVideoSize( data );
            });

            // Spacer
            data.$spacer = data.$.parents( '.full' );

        },

        // Binding resize
        bindResize : function(){

            if( !VideoFull.$fulls.length ) return true;

            VideoFull.$fulls.each(function(){
                this.$ = this.$ || $( this );
                var data = this.$.data( 'VideoFull' );
                if( data !== undefined ){
                    VideoFull.ajustVideoSize( data );
                }

            });

        },

        ajustVideoSize : function( data ){

            data.$video.css( 'width', '' );

            setTimeout(function(){
                var
                    width = data.$video.outerWidth(),
                    height = Math.floor( data.$video.outerHeight() ),
                    spaceHeight = Math.ceil( data.$.innerHeight() )
                ;
                if( height < spaceHeight ){
                    var newWidth = ( width * spaceHeight / height ) + 4;
                    data.$video.css( 'width', newWidth  + 'px' );
                }
            }, 50 );
            
        },

        // Waiting youtube API
        APIWait : function( callback ){
            if( typeof( YT ) === 'undefined' || typeof( YT.Player ) === 'undefined' ){
                if( VideoFull.timeAPI ) clearTimeout( VideoFull.timeAPI );
                VideoFull.timeAPI = setTimeout(function(){
                    VideoFull.APIWait( callback );
                }, 50);
            }
            else {
                clearTimeout( VideoFull.timeAPI );
                callback();
            }
        }

    };
    $(function(){
        VideoFull.init();
    })

})(jQuery);
