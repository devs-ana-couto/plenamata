var Videos;

(function($){

    // Vídeos
    Videos = {

        players : [],
        timeout : false,

        init : function( options ){

            var defaults = {
                context : false,
                itemSelector : '.video-wrapper',
                titleSelector : false,
                triggerSelector : 'self',
                closeLabel : 'fechar',
                closePosition: 'relative',
                htmlFooter : false,
                items : false,
                autoPlay : false,
                showInfo : false,
                openInModal : true,
                onStateChange : false,
                onReady : false

            };
            var data = $.extend({}, defaults, options );

            // Actual
            data.playing = false;

            // Context
            if( data.context === false ){
                data.context = $( 'body' );
            }
            else {
                data.context = $( data.context );
            }

            // Ítems
            data.items = $( data.itemSelector, data.context );

            // No ítems founded
            if( !data.items ) return data;

            // Configure each video
            data.items.each(function(index){

                this.$ = this.$ || $( this );
                
                var PData = {
                    item : this.$,
                    disabled : false,
                    configured: false,
                    videoReady : false,
                    forcedPause : false,
                    index : index,
                    videoCode : false,
                    autoplay : ( this.$.data( 'autoplay' ) && this.$.data( 'autoplay' ) !== false ),
                    $video : this.$.find( 'video' ),
                    title : false,
                    $trigger : false,
                    openInModal : data.openInModal,
                    onStateChange : data.onStateChange,
                    onReady : data.onReady
                };

                // Title
                if( data.titleSelector ){
                    var $title = $( data.titleSelector, this.$ );
                    if( $title.length ){
                        PData.title = $title.html();
                    }
                }

                // Modal
                if( this.$.data( 'open-in-modal' ) !== undefined ){
                    PData.openInModal = this.$.data( 'open-in-modal' );
                }

                // Trigger
                if( data.triggerSelector !== 'self' ){
                    PData.$trigger = $( data.triggerSelector, this.$ );
                }
                else {
                    PData.$trigger = this.$;
                }

                // Video object configuration
                if( PData.$video.length ){
                    
                    PData.videoCode = PData.$video.data( 'video-code' );
                    
                    PData.$trigger.on( 'click', function(e){
                        
                        e.preventDefault();
                        
                        PData.disabled = true;
                        
                        // Hiding video trigger
                        if( data.triggerSelector !== 'self' ){
                            PData.$trigger.stop().fadeOut();
                        }

                        // Starting video
                        Videos.startVideo( data, PData );
                    
                    });
                
                }

                this.$.data( 'Videos', PData );

            });

            $( 'body' ).on( 'click', function(e){
                e.target.$ = e.target.$ || $( e.target );
                if( e.target.$.hasClass( 'controll-button' ) || e.target.$.hasClass( 'icon-arrow-right3' ) ){
                    return;
                }
                else {
                    Videos.pauseVideos();
                }
            });

        },

        videoOpen : function( data, PData ){

            var $_wrapper = $( '<div class="video-wrapper" id="video-wrapper-' + PData.videoCode + '" rel="'+ PData.videoCode +'"></div>' );
            var $_video = PData.$video.clone().show().attr( 'id', 'video-' + PData.videoCode ).appendTo( $_wrapper );

            this.modal.get( data, {
                onClose : function(){
                    Videos.pauseVideos();
                    data.playing = false;
                }
            });

            // Set title
            if( PData.title ){
                this.modal.setTitle( PData.title );
            }

            // Add vídeo
            this.modal.addVideo( $_wrapper );

            // Show loader
            this.modal.showLoader();
            
            // Init Vídeo
            this.APIWait(function(){
                
                // Inicia o vídeo
                PData.player = new YT.Player( 'video-' + PData.videoCode, {
                    
                    height: '100%',
                    width: '100%',
                    videoId: PData.videoCode,
                    playerVars: { autoplay : data.autoPlay, showinfo : data.showInfo, rel : 0 },
                    
                    events: {
                        
                        onReady: function( event ){
                            
                            PData.videoReady = true;
                            PData.item.pikiLoader( 'close' );

                            if( PData.onReady !== false ){
                                PData.onReady( PData );
                            }
                        
                        },
                        
                        onStateChange : function( event ){

                            Videos.videoStateChange( event, PData, data );

                            if( PData.onStateChange !== false ){
                                PData.onStateChange( PData );
                            }

                        }
                    
                    }

                });
            
            });

            PData.configured = true;
            Videos.players.push( PData );

            this.modal.open( PData );
        
        },

        modal : function(){

            return {

                _data : false,
                _timeout : false,
                _this : this,

                get : function( data, options ){

                    if( this._data ){
                        return this._data;
                    }

                    var defaults = {
                        onClose : false
                    };
                    this._data = $.extend( defaults, options );                    

                    this._data.$ = $( '<div />', { 'class': "videos-modal", css: { zIndex: 99998 } } );
                    this._data.$header = false;
                    this._data.$title = false;
                    this._data.$footer = false;

                    // Modal
                    this._data.$.appendTo( _body );

                    // Wrapp content
                    this._data.$inner = $( '<div class="videos-modal-inner" />' ).css({ zIndex : 99999 }).appendTo( this._data.$ );

                    // Wrapp content
                    this._data.$header = $( '<header class="clear" />' ).appendTo( this._data.$inner );
                    
                    // Video title
                    this._data.$title = $( '<div class="title" />' ).appendTo( this._data.$header );
                                    
                    // Close button
                    var closeWrapper = data.closePosition === 'absolute' ? this._data.$ : this._data.$header;
                    this._data.$close = $( '<button class="close-button native '+ data.closePosition +'">'+ data.closeLabel +'<span class="icone"></span></button>' ).prependTo( closeWrapper ); 
                    
                    // Video wrapper
                    this._data.$content = $( '<div class="videos-modal-content" />' ).appendTo( this._data.$inner );
                    
                    // Video wrapper
                    this._data.$video = $( '<div class="videos-modal-video" />' ).appendTo( this._data.$content );

                    // Footer
                    if( data.htmlFooter ){
                        this._data.$footer = $( '<footer class="clear" />' ).appendTo( this._data.$inner );
                        this._data.$footer.html( data.htmlFooter );
                    }

                    // Close action
                    this._data.$.on( 'click', '.close-button', function(e){
                        e.preventDefault();
                        _this.close();
                    });

                    return this._data;

                },

                showLoader : function(){

                    this._data.$video.children().hide();
                    this._data.$video.pikiLoader();

                },
                
                setTitle : function( title ){
                    this._data.$title.html( title );
                },
                
                addVideo : function( $video ){
                    
                    this._data.$video.children().hide();
                    $video.appendTo( this._data.$video ).show();
                
                },

                open : function( PData ){

                    // Disable scroll
                    this.disableScroll();

                    // Show just the video
                    var $videos = this._data.$video.children().hide();
                    $videos.filter( '[rel="'+ PData.videoCode +'"]' ).show();
                    
                    // Show video
                    this._data.$.fadeIn();
                    
                    // Keep visible
                    this.keepVisible();
                
                },

                close : function(){

                    // Callback
                    if( this._data.onClose ){
                        this._data.onClose();
                    }

                    this.enableScroll();
                    this._data.$.fadeOut();
                
                },

                // Mantém o vídeo visível
                keepVisible : function(){
                    
                    _this = this;
                    
                    _window.bind( 'resize', function(){
                        
                        if( _this._timeout ){
                            clearTimeout( _this._timeout );
                        }
                        
                        _this._timeout = setTimeout(function(){
                            _this.ajustSize();
                        }, 50 );
                    
                    }).resize();
                
                },

                ajustSize : function(){

                    var ratio = 16/9;

                    // Modal sizes
                    var modalWidth = this._data.$.innerWidth();
                    var modalHeight = this._data.$.innerHeight();

                    this._data.$inner.css( 'margin-top', 0 );
                    var innerWidth = this._data.$inner.outerWidth();
                    
                    // Discounts header and footer
                    var discounts = this._data.$header.outerHeight();
                    if( this._data.$footer ){
                        discounts += this._data.$footer.outerHeight();
                    }

                    var newHeight = modalHeight - discounts;

                    var newRatio = innerWidth / newHeight;

                    if( newRatio < ratio ){
                        var newHeight = Math.ceil( innerWidth / ratio );
                    }

                    this._data.$video.css( 'height', newHeight + 'px' );

                    var innerHeight = this._data.$inner.outerHeight();                    

                    if( innerHeight < modalHeight ){
                        var mrgTop = Math.round( ( modalHeight - innerHeight ) / 2 );
                        this._data.$inner.css( 'margin-top', mrgTop + 'px' );
                    }
                
                },

                // Desabilita o scroll vertical
                disableScroll : function(){
                    document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "hidden";
                    document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "hidden";
                },

                // Habilita o scroll vertical
                enableScroll : function(){
                    document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "auto";
                    document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "auto";
                }

            };
    
        }(),

        // Restart video forced pause
        resumeVideo : function( data ){

            // Pausing all videos
            Videos.pauseVideos();

            // Resuming actual
            var $slide = data.$slides.eq( data.playing );
            var PData = $slide.data( 'Videos' );
            if( PData !== undefined && PData.forcedPause === true ){
                this.playVideo( data, PData );
            }

        },

        playVideo : function( data, PData ){

            if( PData.openInModal === true ){
                this.modal.open( PData );
            }

            PData.player.playVideo();

        },

        // Pause all videos
        pauseVideos : function(){

            // Total de vídeos
            var total = Videos.players.length;
            
            // No videos
            if( total < 1 ) return;
            
            // Pausing videos
            for ( var i = 0; i < total; i++ ) {
                
                var data = Videos.players[ i ];
                
                if( data.player.getPlayerState === undefined ){
                    continue;
                }

                if( data.player.getPlayerState() === YT.PlayerState.PLAYING ){
                    data.forcedPause = true;
                    data.player.pauseVideo();
                }
            
            }
        
        },

        // Starging a video
        startVideo : function( data, PData ){

            if( PData.configured === false ){
                Videos.configureVideo( data, PData );
            }
            else {
                this.playVideo( data, PData );
            }
            
            data.playing = PData.index;

        },

        // Configure video
        configureVideo : function( data, PData ){

            // Have no video
            if( PData.videoCode === false ){
                return;
            }

            if( PData.openInModal === true ){

                this.videoOpen( data, PData );

            }
            else {

                // Hiding button
                if( data.triggerSelector !== 'self' ){
                    PData.$trigger.stop().fadeOut();
                }

                Videos.APIWait(function(){
                    
                    // Inicia o vídeo
                    PData.player = new YT.Player( PData.$video.attr( 'id' ), {
                        
                        height: '100%',
                        width: '100%',
                        videoId: PData.videoCode,
                        playerVars: { 
                            'autoplay' : 1, 
                            'rel' : 0,
                            'showinfo' : 0, 
                            'controls' : 1,
                            'modestbranding' : 1
                        },
                        events: {
                            onReady: function( event ){
                                PData.videoReady = true;
                                PData.item.pikiLoader( 'close' );
                            },
                            onStateChange : function( event ){
                                Videos.videoStateChange( event, PData, data );
                            }
                        }
                    
                    });

                    PData.configured = true;
                    Videos.players.push( PData );

                });

            }


            return PData;

        },

        // On video state change
        videoStateChange : function( event, PData, data ){

            // Video state
            var state = event.target.getPlayerState();

            // Se o vídeo começa a reprodução, mas não é o slide atual
            if( state === YT.PlayerState.PLAYING ){
                if( data.playing !== PData.index ){
                    event.target.pauseVideo();
                    PData.forcedPause = true;
                }
                else {
                    PData.forcedPause = false;
                }
            }

            // Botão de play
            if( state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED ){
                PData.disabled = false;
                if( data.triggerSelector !== 'self' ){
                    PData.$trigger.fadeIn();
                }
            } 
            else {
                PData.disabled = true;
                if( data.triggerSelector !== 'self' ){
                    PData.$trigger.fadeOut();
                }
            }

        },

        // Waiting youtube API
        APIWait : function( callback ){
            if( typeof( YT ) === 'undefined' || typeof( YT.Player ) === 'undefined' ){
                if( Videos.timeout ){
                    clearTimeout( Videos.timeout );
                }
                Videos.timeout = setTimeout(function(){
                    Videos.APIWait( callback );
                }, 50);
            }
            else {
                clearTimeout( Videos.timeout );
                callback();
            }
        }

    };


})(jQuery);
