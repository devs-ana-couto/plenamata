(function($){

    var Floater = {

        $ : null,
        $inner : null,
        offset : 80,
        timeResize : false,

        init : function(){

            this.$ = $( 'div.floater-box' );
            if( !this.$.length || $( 'body' ).hasClass( 'single-especial' ) ) return false;

            this.$inner = this.$.children();

            // Get sizes
            Floater.getSizes();
            Floater.checkScroll();

            $(window)
                .scroll( Floater.checkScroll )
                .resize( Floater.checkResize )
            ;

        },

        checkResize : function(){

            if( Floater.timeResize ) clearTimeout( Floater.timeResize );
            Floater.timeResize = setTimeout(function(){

                Floater.getSizes();
                Floater.checkScroll();
            
            }, 50 );

        },

        getSizes : function(){

            Floater.vpWidth = Utils.getPageWidth();
            Floater.floaterTop = Floater.$.offset().top;
            Floater.parentHeight = Floater.$.parent().outerHeight();
            Floater.limitBottom = Floater.floaterTop + Floater.parentHeight - Floater.$inner.outerHeight() - Floater.offset;
        
        },

        checkScroll : function(){

            var pageTop = Utils.getPageTop();
            if( pageTop >= ( Floater.floaterTop - Floater.offset ) ){
            
                Floater.$.addClass( 'sticky' );

                if( pageTop >= Floater.limitBottom ){
                    Floater.$.addClass( 'to-bottom' );
                }
                else {
                    Floater.$.removeClass( 'to-bottom' );
                }
            
            }
            else {
                Floater.$.removeClass( 'sticky' );
            }

        }

    };

    $(function(){ 
        Floater.init(); 
    });

})(jQuery);
