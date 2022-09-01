var Message;
(function($){

    Message = function(){
        return {

            data : {
                $nav : false
            },
            timeout : null,
            
            configure : function( options ){

                // Remove older
                this.data.$ = _body.children( '#piki-message' );
                if( this.data.$.length ) this.data.$.remove();

                // Create elements    
                this.data.$ = $( '<div id="piki-message"></div>' ).appendTo( _body );
                this.data.$inner = $( '<div class="inner"></div>' ).appendTo( this.data.$ );

                // Content
                this.data.$content = $( '<div class="content"></div>' ).appendTo( this.data.$inner );
                this.data.$scroller = $( '<div class="scroller"><div class="center-content">' + options.message + '</div></div>' ).appendTo( this.data.$content );

                // Fit screen
                this.data.fitScreen = options.fitScreen !== undefined && options.fitScreen === true;
                
                // Title
                if( options.title !== false && options.title !== undefined ){
                
                    this.data.$title = $( '<div class="modal-title">'+ options.title +'</div>' );

                    if( !this.data.fitScreen && options.title_location !== undefined && options.title_location === 'inside' ){
                        this.data.$title.prependTo( this.data.$scroller );
                        this.data.$.addClass( 'title-inside' );
                    }
                    else{
                        this.data.$title.prependTo( this.data.$inner );
                    }
                
                }
                else {
                    this.data.$title = false;
                }

                // Close
                this.$close = $( '<button class="close-button native" data-action="close-modal">Fechar</button>' ).appendTo( this.data.$inner );
                
                // Classes
                if( options.classname !== undefined ){
                    this.data.$.addClass( options.classname );
                }
                if( this.data.fitScreen ){
                    this.data.$.addClass( 'fit-screen' );
                }

                // Others close buttons
                _body.on( 'click', '[data-action="close-modal"]', function(e){
                    this.$ = this.$ || $( this );
                    if( this.$.parents( '#piki-message' ).length ){
                        Message.close();
                    }
                });

                // Navigation
                if( options.buttons !== undefined ){

                    // Navigation
                    this.data.$nav = $( '<nav />' );
                    if( !this.data.fitScreen && options.buttons_location !== undefined && options.buttons_location === 'inside' ){
                        this.data.$nav.appendTo( this.data.$scroller );
                        this.data.$.addClass( 'buttons-inside' );
                    }
                    else{
                        this.data.$nav.appendTo( this.data.$inner );
                    }

                    // Buttons
                    $.each( options.buttons, function(i){

                        var button = this;

                        // Attributes
                        var atrributes = '';
                        if( button.attributes !== undefined ){
                            $.each( button.attributes, function( key ){
                                atrributes += key + '="' + this + '"';
                            });
                        }

                        // Create object
                        button.$ = $( '<button type="button"'+ atrributes + '>' + button.label +'</button>' ).appendTo( Message.data.$nav );
                        
                        // CSS class
                        if( button.classname !== undefined ){
                            button.$.attr( 'class', button.classname );
                        }
                        // Style
                        if( button.style !== undefined ){
                            button.$.css( button.style );
                        }
                        // Bind click
                        button.$.off( '.Message' ).on( 'click.Message', function(e){
                            // Close
                            if( button.close === undefined || button.close === true ){
                                 Message.close();
                            }
                            // Callback
                            if( button.callback ){
                                try {
                                    button.callback();
                                }
                                catch(e){
                                    console.log( 'Não foi possível acessar o método ' + button.callback );
                                }

                            }
                        });
                        
                    });

                }

                // Keep options
                this.options = options;
            
            },
            
            open : function( content, title ){

                var options;
                if( typeof( content ) === 'object' ){
                    options = content;
                }
                else {
                    options = {
                        message : content, 
                        title : ( title === undefined ? false : title )
                    };
                }

                // Configuring
                Message.configure( options );

                // Close triggers
                this.data.$content.on( 'click', '[data-action="close"]', function(e){
                    e.preventDefault();
                    Message.close();
                });

                // Showing
                Piki.lockScroll();

                $(window).off( 'resize.Message' );

                if( this.data.fitScreen ){

                    // Custom scroll
                    Message.customScroll( this.data );

                    var _data = this.data;

                    $(window).on( 'resize.Message', function(){

                        if( Message.timeout ) clearTimeout( Message.timeout );
                        
                        Message.timeout = setTimeout(function(){
                            Message.checkSize( _data );
                        }, 10 );
                    
                    }).resize();

                }

                // Mostra o conteúdo
                this.data.$.show();
                
                // Add class
                this.data.$.addClass( 'opened' );

            },

            customScroll : function( data ){
                // Custom scroller
                try {
                    data.$scroller.mCustomScrollbar({
                        axis: 'Y',
                        scrollbarPosition: 'outside',
                        autoHideScrollbar: true,
                        autoExpandScrollbar: true,
                        alwaysShowScrollbar: false
                    });
                }
                catch(err){}
            },

            checkSize : function( data ){

                // Leave to calculate size
                data.$content.css( 'max-height', '' );
                data.$inner.css( 'height', '100%' );

                // Leave custom scroller to calculate
                var $customScroller = $( '.mCustomScrollBox', data.$ );
                if( $customScroller.length ) $customScroller.css( 'max-height', '100%' );

                // Discount title
                if( data.$title || data.$nav ){

                    // Total space height
                    var spaceHeight = data.$inner.innerHeight() - parseInt( data.$inner.css( 'padding-top' ) ) - parseInt( data.$inner.css( 'padding-bottom' ) );
                    
                    if( data.$title ){
                        spaceHeight -= data.$title.outerHeight();
                    }
                    if( data.$nav ){
                        spaceHeight -= data.$nav.outerHeight();
                    } 

                    data.$content.css( 'max-height', spaceHeight + 'px' );

                }
                
                data.$inner.attr( 'style', '' );

            },
            
            // Closing
            close : function(){

                $(window).off( 'resize.Message' );

                // Is not opened
                if( this.data.$ === undefined ) return;

                // Remove opened class
                this.data.$.removeClass( 'opened' );
                
                // Unlock body scroll
                Piki.unlockScroll();
               
               // Showing
                this.data.$.hide();

                // Callback
                if( this.options.onClose !== undefined ){
                    this.options.onClose();
                }
            
            }

        }

    }();
})(jQuery);
