(function($){

    var Markers = {

        $items : null,
        pageHeight : null,
        offset : 40,
        timeResize : false,

        init : function(){

            // Get items
            this.getItems();

            // There is no markers
            if( !this.$items.length ) return true;

            // Get sizes
            Markers.getSizes();
            Markers.checkScroll();

            $(window)
                .scroll( Markers.checkScroll )
                .resize( Markers.checkResize )
            ;

        },

        getItems : function(){
            this.$items = $( 'p mark' ).not( '.animated' );
        },

        checkResize : function(){

            if( Markers.timeResize ) clearTimeout( Markers.timeResize );
            Markers.timeResize = setTimeout(function(){

                Markers.getSizes();
                Markers.checkScroll();
            
            }, 50 );

        },

        getSizes : function(){

            // Page height
            Markers.pageHeight = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );

            // Get items
            Markers.getItems();

            // Check item top
            Markers.$items.each(function(){

                this.$ = this.$ || $( this );
                this.$.data( 'Markers', {
                    limitTop : this.$.offset().top - Markers.pageHeight + ( Markers.pageHeight / 6 )
                });

            });
        
        },

        checkScroll : function(){

            var pageTop = Utils.getPageTop();

            Markers.$items.not( '.animated' ).each(function(){

                this.$ = this.$ || $( this );

                var limit = this.$.data( 'Markers' ).limitTop;

                if( pageTop >= limit ){
                    this.$.addClass( 'animated' );
                }

            });

        }

    };

    $(function(){ 
        Markers.init(); 
    });

})(jQuery);
