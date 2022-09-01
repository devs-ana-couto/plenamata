var Historys;

(function($){

    Historys = {

        $ : null,
        $items : {},
        $modal : false,
        $slider : false,
        $sliderItems : false,
        players : [],
        apiTimeout : false,

        init : function(){

            this.$ = $( 'section#historias-reais' );
            if( !this.$.length ) return true;

            Historys.configure();
        
        },

        configure : function(){

            this.$list = $( '.mosaic ul', this.$ );
            this.$items = $( 'li', this.$list );
            this.$links = $( 'a', this.$list );

            // Bind sizes
            this.checkSizes();
            $(window).resize(function(){
                Historys.checkSizes();
            });

            //  Bind clicks
            this.$links.on( 'click', function(e){

                this.$ = this.$ || $( this );

                if( this.$.attr( 'target' ) === '_blank' ){
                    return true;
                }
                else {
                    e.preventDefault();
                    Historys.bindClick( this );
                }
            
            });

        },

        // Retrieve slide content
        getSlideContent : async function( link, $slide ){

            Loader();

            var request = await $
                .ajax({
                    url : link.href,
                    type : 'GET',
                    dataType : 'HTML'
                })
                .done(function( response ){

                    let $article = $( '<div>' + response + '</div>' ).find( 'article' );

                    // Remove navigation arrows
                    $article.find( '.page-nav' ).remove();
                    
                    // Insert data
                    $slide.append( $article );

                    // Configure media
                    Historys.configureMedia( $slide );

                    Loader( 'close' );

                })
                .fail(function( error ){

                    Loader( 'close' );
                    console.info( "error" );
                    console.log( error );
                
                })
            ;

            return true;

        },

        // Binding card click
        bindClick : async function( link ){

            link.$ = link.$ || $( link );

            if( link.$ )

            await this.getModal();

            var 
                $slide = this.$sliderItems.filter( '[data-item-id="'+ link.$.data( 'item-id' ) +'"]' )
                itemIndex = $slide.parents( '.slick-slide' ).first().index()
            ;

            if( $slide.data( 'Historys' ) === undefined ){
                // Get slide content
                await Historys.getSlideContent( link, $slide );
            }

            this.openModal();

            Historys.$slider.slick( 'slickGoTo', itemIndex );

        },

        // Check if slide has content
        checkSlide : function( index ){
            
            // Slide
            let $slide = Historys.$sliderItems.eq( index );
            
            // Data
            let data = $slide.data( 'Historys' );
            if( data === undefined ){
                var link = this.$links.get( index );
                this.getSlideContent( link, $slide );
            }
        
        },

        // Configure slide media
        configureMedia : async function( $slide ){

            let data = {
                $ : $slide,
                self : $slide.get( 0 )
            };

            // Fotos
            let $gallery = $( 'div.imagewp-theme', $slide );
            if( $gallery.length ){
                data.typeMedia = 'gallery';
                data.$gallery = $gallery;
                data.$arrows = $gallery.children( 'nav' );                
                data.$slider = $gallery.children( '.slider' );
                data.$slider.slick({
                    infinite: false,
                    appendArrows : data.$arrows
                });
            }

            // Soundcloud
            let $scloud = $( 'iframe[data-media-type="soundcloud"]', $slide );
            if( $scloud.length ){
                data.typeMedia = 'soundcloud';
                data.$iframe = $scloud;
                data.source = $scloud.attr( 'src' );
            }

            // Youtube
            let $youtube = $( 'iframe[data-media-type="youtube"]', $slide );
            if( $youtube.length ){
            
                data.typeMedia = 'youtube';
                data.$iframe = $youtube;
                data.videocode = data.$iframe.data( 'video-code' );
                data.ID = data.$iframe.attr( 'id' );

                // Inicia o vídeo
                await Historys.youtubeWait(function(){
                    data.player = new YT.Player( data.ID, {
                        height: '100%',
                        width: '100%',
                        videoId: data.videocode,
                        playerVars: { 
                            autoplay : 0,
                            showinfo : 0, 
                            rel : 0 
                        },
                    });
                });
                
            }

            $slide.data( 'Historys', data );

        },

        openModal : function(){
            Utils.lockScroll();
            this.$modal.addClass( 'opened' );
        },

        closeModal : function(){

            Utils.unlockScroll();
            
            this.$modal.removeClass( 'opened' );

            // Stop current media
            let current = this.$slider.slick( 'slickCurrentSlide' );
            Historys.stopMedia( current );
        
        },

        getModal : async function(){

            // Modal
            if( this.$modal.length ) return true;
            this.$modal = $( '#modal-historias' );

            // Close modal button
            this.$close = $( '[data-action="close"]', this.$modal );
            this.$close.on( 'click', function(e){
                e.preventDefault();
                Historys.closeModal();
            });

            // Slider
            this.$slider = this.$modal.children( '.main-slider' ).first();
            
            // Each slider item
            this.$links.each(function(){
                this.$ = this.$ || $( this );
                $( '<div class="history-item" data-item-id="'+ this.$.data( 'item-id' ) +'"></div>' ).appendTo( Historys.$slider );
            });
            
            // Get itens on slider init
            this.$slider.on( 'init', function(){
                Historys.$sliderItems = Historys.$slider.find( '.history-item' );
            });
            this.$slider.on( 'beforeChange', function( e, slick, currentSlide, nextSlide ){
                if( slick.$slider.hasClass( 'main-slider' ) && nextSlide !== currentSlide ){ 
                    Historys.stopMedia( currentSlide );
                    Historys.checkSlide( nextSlide );
                }
            });
            this.$slider.on( 'afterChange', function( e, slick, currentSlide ){
                if( slick.$slider.hasClass( 'main-slider' ) ){
                    Historys.resumeMedia( currentSlide );
                }
            });
            // Start carousel
            this.$slider.slick({
                infinite: false
            });

        },

        stopMedia : function( currentSlide ){

            // Slide
            let $slide = Historys.$sliderItems.eq( currentSlide );
            
            // Data
            let data = $slide.data( 'Historys' );
            if( data === undefined ) return true;

            // Soundcloud
            if( data.typeMedia == 'soundcloud' ){
                data.$iframe.attr( 'src', 'about:blank' );
            }

            // Youtube
            if( data.typeMedia == 'youtube' && data.player !== undefined ){
                // Mark as forced pause
                if( data.player.getPlayerState !== undefined && data.player.getPlayerState() === YT.PlayerState.PLAYING ){
                    data.forcedPause = true;
                }
                // Pause vídeo
                if( data.player.pauseVideo !== undefined ){
                    data.player.pauseVideo();
                }
            }

        },

        resumeMedia : function( currentSlide ){

            // Slide
            let $slide = Historys.$sliderItems.eq( currentSlide );
            
            // Data
            let data = $slide.data( 'Historys' );
            if( data === undefined ) return true;

            // Soundcloud
            if( data.typeMedia === 'soundcloud' ){
                data.$iframe.attr( 'src', data.source );
            }
            else if( data.typeMedia === 'youtube' && data.forcedPause ){
                data.player.playVideo();
                data.forcedPause = false;
            }

        },

        checkSizes : function(){
            var newWidth = 0;
            this.$items.each(function(){
                this.$ = this.$ || $( this );
                newWidth += this.$.outerWidth( true );
            });
            this.$list.css( 'width', newWidth + 'px' );
        },

        // Waiting youtube API
        youtubeWait : async function( callback ){
            if( typeof( YT ) === 'undefined' || typeof( YT.Player ) === 'undefined' ){
                if( Historys.apiTimeout ){
                    clearTimeout( Historys.apiTimeout );
                }
                Historys.apiTimeout = setTimeout(function(){
                    Historys.youtubeWait( callback );
                }, 50 );
            }
            else {
                clearTimeout( Historys.apiTimeout );
                callback();
            }
        }

    };
    $(function(){ 
        Historys.init(); 
    });

})(jQuery);
