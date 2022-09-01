var 
    $window,
    $body,
    MainMenu
;

(function($){

    MainMenu = {

        $items : null,
        $estados : null,
        $menus : null,
        $keywords: null,

        init : function(){

            $body = $('body');
            $window = $(window);

            this.$estados = $( '.dropdown.estado' );
            this.$keywords = $( 'input[name="s"]' );

            $( '#masthead,.main-menu' ).each(function(){
                MainMenu.configure( this );
            });

            // Search
            $body
                .on( 'click', 'button[data-action="open-search"]', function(e){
                    e.preventDefault();
                    MainMenu.toggleSearch( this, 'open' );
                })
                .on( 'click', 'button[data-action="close-search"]', function(e){
                    e.preventDefault();
                    MainMenu.toggleSearch( this, 'close' );
                })
                .on( 'keyup', 'input[name="s"]', function(e){
                    MainMenu.$keywords.not(this).val( this.value );
                });
            ;

            // Trigger
            //MainMenu.checkSize();

        },

        configure : function( menu ){

            menu.$ = menu.$ || $( menu );
            
            var data = menu.$.data( 'MainMenu' );
            if( data !== undefined ) return data;

            data = {
                _ : menu,
                $ : menu.$,
                $toggles : $( '.dropdown.type--2 > .trigger', menu.$ ),
                $drops : $( '.dropdown', menu.$ ),
                $keyword : $( 'input[name="s"]', menu.$ ),
                $search : $( '.search-box', menu.$ ),
                $sliderEditorias : $( '.slider-editorias', menu.$ ),
                $overlay : $( '.menu-overlay', menu.$ ),
                $menuToggle : $( '.menu-toggle' )
            };
            menu.$.data( 'MainMenu', data );

            // Dropdowns
            data.$drops.not( '.estado' ).each(function(){

                var $this = $( this );

                $this.children( '.trigger' ).on( 'click', function(e){

                    this.$ = this.$ || $( this );

                    var pageWidth = Utils.getPageWidth();
                    if( pageWidth < 768 ){
                    
                        return true;
                    
                    }
                    else {

                        e.preventDefault();

                        // If just opened
                        var opened = $this.hasClass( 'opened' );

                        // Close all
                        MainMenu.closeFloaters();

                        // Open this, if is closed
                        if( !opened ){
                            $this.addClass( 'opened' );
                            this.$.addClass( 'active' );
                        }

                    }
                
                });

            });

            // Overlay
            data.$overlay.on( 'mouseover mousemove click', function(){
                MainMenu.unlock( data );
            });
            data.$overlay.on( 'click', function(){
                MainMenu.closeFloaters();
            });

            // Window events
            $window
                .on( 'click', function(e){
                    if( !$( e.target ).parents( '.dropdown' ).length ){
                        data.$drops.removeClass( 'opened' );
                    }
                })
            ;

            // Close floaters when open estados
            $( '.dropdown.estado' ).on( 'open', function(){
                MainMenu.closeFloaters( true );
            });

        },
        
        // Overlay
        overlayOpen : function( data ){
            data.$overlay.addClass( 'show' );
        },
        overlayClose : function( data ){
            data.$overlay.removeClass( 'show' );
        },

        lock : function( data ){
            data.locked = true;
            MainMenu.overlayOpen( data );
            Utils.lockScroll();
        },

        unlock : function( data ){
            data.locked = false;
            MainMenu.overlayClose( data );
            Utils.unlockScroll();
        },

        // Close all floaters
        closeFloaters : function( skipEstado ){

            // Dropdowns
            var $drops = $( '.dropdown.opened' );
            if( skipEstado === true ){
                $drops = $drops.not( '.estado' );
            }

            $drops
                .removeClass( 'opened' )
                .children( '.trigger' )
                .removeClass( 'active' )
            ;

        },

        // Search box
        toggleSearch : function( button, action ){

            button.$ = button.$ || $( button );

            // Data button
            var data = button.$.data( 'MainMenu' );
            if( data === undefined ){
                data = {
                    _ : button,
                    $ : button.$,
                    $menu = button.$.parents( '#masthead,.main-menu,.menu-suspenso' ).first()
                };
                data.$keyword = $( 'input[name="s"]' );
                button.$.data( 'MainMenu', data );
            }

            // Toggle
            if( action === 'open' ){
                MainMenu.openSearch( data );
            }
            else {
                MainMenu.closeSearch( data );
            }

        },
        openSearch : function( data ){

            //Header.closeFloater();
            MainMenu.closeFloaters();
            
            data.$menu.addClass( 'searching' );
            data.$keyword.focus();
        
        },
        closeSearch : function( data ){
            data.$menu.removeClass( 'searching' );
        }
        
    }
    $(function(){ MainMenu.init(); });

})(jQuery);
