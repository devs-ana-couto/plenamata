(function($){

    var Videos = {

        init : function(){

            var $videos = $( '.component-video' );
            if( !$videos.length ) return true;

            // Configure each video
            $videos.each(function(){

                this.$ = this.$ || $( this );

                var data = this.$.data( 'Video' );
                if( data !== undefined ) return true;

                data = {
                     _ : this,
                     $ : this.$,
                     $title : this.$.children( 'em' ),
                     $video_wrapper : this.$.find( '> .media-wrapper > div' ),
                     $video : this.$.find( 'div[data-type="vimeo"]' ),
                     $close : this.$.find( '[data-action="close-video"]' ),
                     $menu : $( 'body > .menu-navigation' ),
                     timeLock : false,
                     locked : false,
                };

                data.$.on( 'click', function(e){
                    e.preventDefault();
                    Videos.open( data );
                });

                data.$close.on( 'click', function(e){
                    e.preventDefault();
                    Videos.close( data );
                });

                this.$.data( 'Video', data );
                
            });

        },

        open : function( data ){

            // Locked
            if( data.locked ){
                return false;
            }

            // Lock scroll
            $( 'body,window' ).addClass( 'lockscroll' );

            // Hide menu
            data.$menu.addClass( 'hide' );

            // Locking
            data.locked = true;

            // Calculate position
            var position = data.$.offset();

            // Scroll position
            var scrollTop = ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop || 0 );

            // Preapare for animation
            data.$video_wrapper.css({
                position: 'fixed',
                left: position.left + 'px',
                top: ( position.top - scrollTop ) + 'px'
            });

            setTimeout(function(){
                data.$.addClass( 'opened' );
            }, 100 );

            if( data.timeLock ) clearTimeout( data.timeLock );
            timeLock = setTimeout(function(){
                data.locked = false;
            }, 300 );

            $(document).off( 'keyup.Video' ).on( 'keyup.Video', function(e){
                var code = e.keyCode || e.which;
                if( code == 27 && !data.locked ){
                    Videos.close( data );
                }
            });            

        },

        close : function( data ){

            // Locked
            if( data.locked || data.$.hasClass( 'closing' ) || !data.$.hasClass( 'opened' ) ){ 
                return true;
            }

            // Pause vídeo
            var playerData = data.$video.data( 'VimField' );
            if( playerData.active == true ){
                VimField.clickPause( playerData  );
            }
            
            // Locking
            data.locked = true;

            // Calculate position
            var position = data.$.offset();

            // Scroll position
            var scrollTop = ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop || 0 );

            data.$.addClass( 'closing' ).removeClass( 'opened' )
            data.$video_wrapper.css({
                left: position.left + 'px',
                top: ( position.top - scrollTop ) + 'px'
            });

            // Show menu
            data.$menu.removeClass( 'hide' );

            setTimeout(function(){

                data.$.removeClass( 'closing' );
                data.$video_wrapper.css({ 
                    position: '',
                    top: '',
                    left: ''
                });

                // Unlock scroll                
                $( 'body,window' ).removeClass( 'lockscroll' );

                data.locked = false;

            }, 600 );

        }

    };
    $(function(){ Videos.init(); });

})(jQuery);
