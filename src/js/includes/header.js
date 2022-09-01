var 
    $window,
    $body,
    Header
;

(function($){

    Header = {

        $ : null,
        $menuToggle : null,
        $toggles : null,
        $floater : null,
        lastScrolTop : 0,
        timeFixa : null,
        locked : false,
        timeResize : false,
        isDashboard : false,

        init : function(){

            $body = $('body');
            $window = $(window);

            this.$ = $( '#masthead' );
            this.$menuToggle = $( '.menu-toggle' );
            this.$floater = $( '.menu-suspenso' );
            this.isDashboard = $body.hasClass( 'page-template-template-dashboard' );

            // Clone
            if( !this.isDashboard ){
                // Menu clone
                this.$clone = this.$
                    .clone()
                    .removeAttr( 'id' )
                    .addClass( 'clone floating' )
                    .appendTo( $body )
                ;
            }
            
            // Vlibras
            $body.on( 'click', '[data-action="open-vlibras"]', function(){;
                var $vlibras = $( 'div[vw-access-button]' );
                $vlibras.trigger( 'click' )
            });

            // Menu complete 
            $body.on( 'click', '.menu-toggle', function(){
                if( $body.hasClass( 'menu-opened' ) ){
                    Header.closeFloater();
                }
                else {
                    Header.openFloater();
                }
            });

            // Trigger
            Header.checkScroll();
            Header.checkSize();
            Header.bindHeader();

        },

        checkSize : function(){
            const viewportWidth = Utils.getPageWidth();
            if( viewportWidth <= 1380 ){
                Header.$.addClass( 'compact' );
            }  
            else {
                Header.$.removeClass( 'compact' );
            }
        },

        lock : function(){
            Header.locked = true;
            Utils.lockScroll();
        },

        unlock : function(){
            Header.locked = false;
            Utils.unlockScroll();
        },

        // Open complete menu
        openFloater : function(){
            Search.close();
            Utils.lockScroll();
            $( 'html,body' ).addClass( 'menu-opened menu-toup' );
        },

        // Close complete menu
        closeFloater : function(){
        
            Utils.unlockScroll();
            $( 'html,body' ).removeClass( 'menu-opened' );
        
        },

        // Uncheck menu items when is top page
        checkScroll : function(){            
            Header.checkHeader();
        },

        checkHeader : function(){

            var scrollTop = _window.scrollTop();

            // Locked
            if( Header.locked || Header.lastScrolTop === scrollTop ) return true;

            var dir = scrollTop >= Header.lastScrolTop ? 'down' : 'up';
            var limitInit = Header.$.outerHeight();

            // Initial position
            if( scrollTop > 0 ){
                if( !Header.$.hasClass( 'floating' ) ){
                     $body.removeClass( 'menu-initial' );
                }
            }
            else {
                $body.addClass( 'menu-initial' );
            }

            // Close menu floater
            if( Header.$floater.hasClass( 'opened' ) ){
                Header.closeFloater();
            }

            // Direction
            $body.removeClass( 'menu-toup menu-todown' );
            Header.$.removeClass( 'toup todown' );
            if( dir === 'up' ){
                $body.addClass( 'menu-toup' );
                Header.$.addClass( 'toup' );
            }
            else {
                $body.addClass( 'menu-todown' );
                Header.$.addClass( 'todown' );
            }

            // Keep last scroll top
            Header.lastScrolTop = scrollTop;
        
        },

        // Binding header
        bindHeader : function(){
            
            // Initial header check
            Header.checkHeader();
            Header.$.removeClass( 'start' );
            
            $window.scroll(function(){
                if( !Utils.isLockedScroll() ){
                    Header.checkHeader();
                }
            });
        
        }

    };
    $(function(){ Header.init(); });

})(jQuery);
