var Search;

(function($){

    Search = {

        $page : null,
        $search : null,
        $modal : null,
        $header : null,
        context : false,
        actualTerm : false,

        init : function(){

            this.$body = $( 'body' );
            this.$toggle = $( 'button[data-action="toggle-search"]' );
            this.$form = $( 'form.search-filteres' );
            this.$page = $( 'section#page-search' );
            this.$header = $( '#masthead' );

            // There is no search
            if( !this.$toggle.length && !this.$page.length ) return true;

            // Context
            this.context = this.$page.length ? 'page' : 'floater';
            
            Search.configure();
        
        },

        // Configure search
        configure : function(){

            // Toggle
            if( this.$toggle.length ){
                this.$toggle.on( 'click', function(e){
                    e.preventDefault();
                    Search.toggle();
                });
            }

            // If is search page
            if( this.$page.length ){
                this.configurePage();
            }

        },

        // Toggle search
        toggle : function(){

            if( Search.$body.hasClass( 'search-opened' ) ){

                Search.close();

            }
            else {

                if( !this.$page.length ){
                    Search.getPage();
                }
                else {
                    Search.open();
                }

            }

        },

        open : function(){

            // Close menu
            Header.closeFloater();
            
            // Add opened class
            $('html,body').addClass( 'search-opened' );

            // Header position
            if( Utils.getPageTop() < this.$header.outerHeight() ){

                $('html,body').stop().animate(
                    { scrollTop: 0 }, 
                    600, 
                    function(){
                        Utils.lockScroll();
                    }
                );
            
            }
            else {

                Utils.lockScroll();

            }
        
        },

        close : function(){
            
            $('html,body').removeClass( 'search-opened' );
            Utils.unlockScroll();
        
        },

        getPage : async function(){

            Loader();


            console.info( "Piki.blogurl" );
            console.log( Piki.blogurl );
            

            var request = await $
                .ajax({
                    url : Piki.blogurl + '/?s=',
                    type : 'GET',
                    dataType : 'HTML'
                })
                .done(function( response ){

                    Search.$page = $( '<div>' + response + '</div>' )
                        .find( 'section#page-search' )
                        .addClass( 'floating' )
                        .appendTo( Search.$body )
                    ;
                    
                    // Configure media
                    setTimeout( () => { Search.configurePage() }, 100 );

                })
                .fail(function( error ){

                    Loader( 'close' );
                    console.info( "error" );
                    console.log( error );
                
                })
            ;

            return true;

        },

        configurePage : function(){

            Loader( 'close' );

            this.$form = this.$page.children( 'form' );
            this.$search = $( 'fieldset.search', this.$form );
            this.$filters = $( 'fieldset.filters input', this.$form );
            this.$keyword = $( 'input[name="s"]', this.$search );
            this.$submit = $( 'button[type="submit"]', this.$search );
            this.$clear = $( 'button[data-action="clear"]', this.$search );
            this.$results = $( '#results > span', this.$page );
            this.$listItems = $( '.list-teasers', this.$page );
            this.$overview = $( '[data-type="overview"]', this.$page );
            this.$order = $( 'input[name="ordenar-por"]', this.$page );

            // Actual term
            this.actualTerm = this.$keyword.val();

            // Bind form
            this.$form.on( 'submit', function(e){
                e.preventDefault();
                Search.checkSubmit();
            });

            // Bind search typing
            this.$keyword.on( 'keyup', function(e){
                Search.bindKeywordType( e );
            });

            // Clear button
            this.$clear.on( 'click', function(e){
                e.preventDefault();
                if( !Search.$search.hasClass( 'empty' ) ){
                    Search.clear();
                }
            });

            // Bind filters
            this.$filters.on( 'change', function(){
                Search.checkSubmit( true );
            });
            // Bind order
            this.$order.on( 'change', function(){
                Search.checkSubmit( true );
            });

            // Open when floating
            if( this.context === 'floater' ){
                DropRadios.init();                
                Search.open();
            }
            
        },

        bindKeywordType : function( e ){

            let value = this.$keyword.val();

            var keynum = window.event ? e.keyCode : e.which;
            if( keynum === 13 ){
                this.checkSubmit();
            }
            else {

                this.$search.removeClass( 'empty filled' );
                if( value === '' ){
                    this.$search.addClass( 'empty' );
                }
                else {
                    this.$search.addClass( 'filled' );
                }
                
            }

            // Submit button
            if( value.length < 3 ){
                this.$submit.prop( 'disabled', true );
            }
            else {
                this.$submit.prop( 'disabled', false );
            }

        },

        clear : function(){
            this.actualTerm = false;
            this.$page.removeClass( 'filled no-results' ).addClass( 'empty initial' );
            this.$search.removeClass( 'filled' );
            this.$keyword.val( '' );
            this.$filters.filter( ':checked' ).prop( 'checked', false ).trigger( 'actualize' )
        },

        checkSubmit : async function( isFilter ){

            // keyword
            var keyword = this.$keyword.val();

            // Minimum 3 characters
            if( keyword.length < 3 ) return true;

            // Lock same search
            if( this.actualTerm === keyword && isFilter === undefined ) return true;

            // Loading class
            Search.$page.addClass( 'loading' );
            
            Loader();
            
            var request = await $.ajax({
                    url : Piki.blogurl,
                    type : 'GET',
                    dataType : 'HTML',
                    data : Search.$form.serialize()
                })
                .done(function( response ){

                    Search.actualTerm = keyword;

                    var $result = $( '<div>' + response + '</div>' ).find( 'div#results' );
                    var $items = $result.find( '.list-teasers > .teaser' );

                    if( !$result.find( '.list-teasers > .teaser' ).length ){
                        Search.$page.removeClass( 'initial' ).addClass( 'no-results' );
                    }
                    else {
                        Search.showResults( $result );
                    }

                    Search.$page.removeClass( 'loading' );
                    Loader( 'close' );

                })
                .fail(function( error ){
                    console.info( "error" );
                    console.log( error );
                    Search.$page.removeClass( 'loading' );
                })
            ;

        },

        showResults : function( $result ){

            // Remove before content
            let $oldItems = this.$listItems.find( '.teaser' );
            if( $oldItems.length ) $oldItems.remove()
            let $oldPager = this.$page.find( '.piki-pager' );
            if( $oldPager.length ) $oldPager.remove()

            // Results
            let $items = $result.find( '.list-teasers > .teaser' );
            if( $items.length ){
                $items.appendTo( this.$listItems );
            }

            // Pager
            let $pager = $( '.piki-pager', $result );
            if( $pager.length ){ 
                $pager.appendTo( this.$results );
                Pager.init();
            }

            // Overview
            let overview = $( '[data-type="overview"]', $result ).html();
            this.$overview.html( overview );

            Search.$page.removeClass( 'empty no-results' ).addClass( 'initial filled' );

        }

    };
    $(function(){ 
        Search.init(); 
    });

})(jQuery);
