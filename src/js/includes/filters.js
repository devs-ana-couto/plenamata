var Filters;

(function($){

    Filters = {

        $ : null,
        list : {},
        search : {},
        filter : {},
        $toggle : null,
        $radios : null,
        $search : null,
        $searchClear : null,
        $drops : null,
        $list : null,
        initialkeyword : null,

        init : function(){

            this.$ = $( 'section.page-archive' );
            if( !this.$.length ) return true;

            Filters.configure();
        
        },

        configure : function(){

            // General
            this.$form = $( 'form.filter', this.$ );

            // Toggle
            this.$toggle = $( 'button[data-action="toggle-form"]', this.$ );
            if( this.$toggle.length ){

                this.$toggle.on( 'click', function(e){

                    e.preventDefault();
                
                    if( Filters.$.hasClass( 'search-opened' ) ){
                        Filters.closeSearch();
                    }
                    else {
                        Filters.openSearch();
                    }
                
                });

                this.$close = $( 'button[data-action="close"]', this.$form );
                if( this.$close.length ){
                    this.$close.on( 'click', function(e){
                        e.preventDefault();
                        Filters.closeSearch();
                    });
                }

                this.$apply = $( 'button[data-action="apply"]' );                
                if( this.$apply.length ){
                    this.$apply.on( 'click', function(e){
                        e.preventDefault();
                        Filters.$form.submit();
                    });
                }


            }

            // Bind submit
            if( Utils.getPageWidth() > 890 ){

                // Radios
                this.$radios = $( 'input[type="radio"]', this.$form );
                this.$radios.on( 'change', function(){
                    Filters.$form.submit();
                });

                // Selects
                this.$selects = $( 'select', this.$form );
                this.$selects.on( 'change', function(){
                    Filters.$form.submit();
                });
               
            }

            // Menu items
            this.$menuRadios = this.$form.find( 'ul' ).first().find( ' > li > label input' );
            this.$menuRadios.on( 'change', function(){
                if( this.checked ){
                    Filters.closeFloaters();
                }
            });
            
            // Drops
            this.$withSubmenu = $( 'li.has-child', this.$form );
            this.$withSubmenu.each(function(){

                this.$ = this.$ || $( this );

                var data = this.$.data( 'Filters' );
                if( data === undefined ){

                    data = {
                        self : this,
                        $ : this.$,
                        $trigger : this.$.children( 'button' ),
                        $floater : this.$.children( 'ul' ),
                        $fields : this.$.find( 'input' )
                    };
                    this.$.data( 'Filters', data );

                    // Close on select
                    data.$fields.on( 'change', function(){
                        Filters.closeFloater( data );
                    });

                    // Bind trigger
                    data.$trigger.on( 'click', function(e){

                        e.preventDefault();

                        if( data.$.hasClass( 'opened' ) ){
                            Filters.closeFloater( data );
                        }
                        else {
                            Filters.openFloater( data );
                        }
                    
                    });
                
                }
                
            });

            // Form submit
            this.$form.on( 'submit.Filters', function(e){

                var doSubmit = Filters.$form.data( 'doSubmit' );
                if( doSubmit !== undefined && doSubmit === true ){
                    return true;
                }
                else {
                    e.preventDefault();
                    Filters.submit();
                }
            
            });

            // Binders
            //this.bindFilters();

            // Scrolling
            var qString = document.location.href.split( '?' );
            if( qString.length >= 2 ){
                var $target = $( '[data-key="search-content"]' );
                Utils.scrollTo( $target );
            }

        },

        openSearch : function(){
            Utils.lockScroll();
            $('body').addClass( 'menu-toup' );
            this.$.addClass( 'search-opened' );
        },
        closeSearch : function(){
            Utils.unlockScroll();
            this.$.removeClass( 'search-opened' );
        },

        openFloater : function( data ){
            data.$.addClass( 'opened' );
        },

        closeFloater : function( data ){
            data.$.removeClass( 'opened' );
        },

        closeFloaters : function(){
            Filters.$withSubmenu.each(function(){
                this.$ = this.$ || $( this );
                var data = this.$.data( 'Filters' );
                Filters.closeFloater( data );
            });
        },

        // Filter
        bindFilters : function(){
            
            // On drops change
            this.$drops.on( 'change', function(){
                Filters.submit();
            });
            // On checkbox change
            this.$checksTipos.on( 'change', function(){
                Filters.submit();
            });

        },

        cleanFilters : function(){

            this.filter.$checks.filter( ':checked' ).each(function(){
            
                this.$ = this.$ || $( this );
                this.$.prop( 'checked', false ).removeAttr( 'checked' );

                // Remove actove
                Filters.unckeckFilter( this );
            
            });
                
            Filters.submit();

        },

        setFilterValues : function( callback ){

            Loader();

            var tipos = [];
            this.$checksTipos.filter( ':checked' ).each(function(){
                this.$ = this.$ || $( this );
                tipos.push( this.$.val() );
            });
            this.$tipos.val( tipos.length ? tipos.join( ',' ) : '' );

            if( callback !== undefined ){
                callback();
            }

        },

        submit : function(){

            Loader();

            Filters.closeFloaters();

            $( 'input,select' ).each(function(){
                this.$ = this.$ || $( this );
                if( this.$.val() === '' ){
                    this.$.removeAttr( 'name' );
                }
            });

            Filters.$form
                .off( 'submit.Filters' )
                .data( 'doSubmit', true )
                .submit()
            ;

            /*
            Filters.setFilterValues(function(){

                // Remove empty fields
                $( 'input,select', Filters.$ ).each(function(){
                    this.$ = this.$ || $( this );
                    if( this.$.val() == '' ){
                        this.$.remove();
                    }
                });

                

                // var URL = Filters.$form.attr( 'action' );
                // Filters.request = $.ajax({
                //     method: "GET",
                //     url: URL,
                //     data: Filters.$form.serialize()
                // });
                // Filters.request.done(function( response ) {
                //     Filters.receiveRequest( response );
                // });
                     
                // Filters.request.fail(function( jqXHR, textStatus ) {
                //     Loader( 'close' );
                //     alert( "Request failed: " + textStatus );
                // });
                 
           });
           */

        },

        receiveRequest : function( response ){

            // Check filters
            Loader( 'close' );
                
            var $page = $( '<div>' + response + '</div>' );
            
            // To insert
            var $toInsert = $page.find( '.mosaic-images' ).children( 'div' );
            if( !$toInsert.length ){
                $toInsert = $( '<div class="no-results"><span class="inner">Não encontramos um match perfeito ao que você procura.</span></div>' );
            }

            // Remove actuals
            var $actuals = this.$list.children( 'div' );
            $actuals.removeClass( 'inserted show' ).addClass( 'removing' );

            // Wait remove animation
            setTimeout(function(){
               
                // Remove actuals
                $actuals.remove();

                // Inser news
                $toInsert.addClass( 'inserted' ).appendTo( Filters.$list );
                setTimeout(function(){
                    $toInsert.addClass( 'show' );
                }, 10 );
            
            }, 300 );
            
            natura.loaderHide();
    
        }

    };
    $(function(){ 
        Filters.init(); 
    });

})(jQuery);
