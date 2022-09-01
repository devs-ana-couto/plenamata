/*
var Slider;

(function($){

    Slider = {

        $items : null,

        init : function(){

            this.$items = $( 'div.swiper' );
            if( !this.$items.length ) return false;

            this.$items.each(function(){
                Slider.configure( this );
            });

        },
        
        configure : function( el ){

            el.$ = el.$ || $( el );

            var data = {
                _ : el,
                $ : el.$,
                swiper : false,
                autoCreate : el.$.data( 'auto-create' ),
                wrapper : el.$.parent( '.slider-wrapper' )
            };
            data.pager = $( '.swiper-pagination', data.wrapper );
            data.prev = $( '.button.prev', data.wrapper );
            data.next = $( '.button.next', data.wrapper );
            
            el.$.data( 'Slider', data );

            // Do not auto create
            if( data.autoCreate !== undefined && data.autoCreate === false ){
                return true;
            }            

            // Initing swiper
            data.swiper = new Swiper( el, {
                slidesPerView: 1,
                spaceBetween: 16,
                mousewheel: {
                    forceToAxis: true
                },
                navigation: ( 
                    data.prev.length 
                    ? {
                        nextEl: data.next.get( 0 ),
                        prevEl: data.prev.get( 0 )
                    } 
                    : false 
                ),
                pagination: { 
                    el: data.pager.get( 0 ) 
                },
                breakpoints : {
                    481: {
                        slidesPerView: 'auto',
                        freeMode: true,
                        spaceBetween: 16,
                        centerInsufficientSlides : true,
                        pagination: { el: data.pager }
                    },
                    768: {
                        slidesPerView: 'auto',
                        freeMode: true,
                        spaceBetween: 40,
                        centerInsufficientSlides : true,
                        pagination: { el: data.pager }
                    },
                }
            });

        }

    };

    $(function(){
        $('body').imagesLoaded(function(){
            Slider.init(); 
        });
    });

})(jQuery);
*/
