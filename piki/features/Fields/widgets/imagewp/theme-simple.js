(function($){

	IMGWPSimple = {

		init : function(){

			$items = $( '.imagewp-theme.simple' );
			if( !$items.length ) return;

			$items.each(function(){
				IMGWPSimple.configure( this );
			});

		},

		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'IMGWPSimple' );
			if( data !== undefined ) return data;

			data = {
				_ : el,
				$ : el.$,
				$slider : el.$.children( '.slider' ),
				$arrows : el.$.children( 'nav' )
			};
			el.$.data( 'IMGWPSimple', data );

            data.$slider.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ){
                slick.$slides.eq( currentSlide ).addClass( 'outing' );
                slick.$slides.eq( nextSlide ).addClass( 'entering' );
            });
            data.$slider.on( 'afterChange', function( event, slick, currentSlide ){
                slick.$slides.removeClass( 'outing entering' );
            });
            data.$slider.slick({
                infinite: false,
                appendArrows : data.$arrows
            });

        }

	}
	$(function(){
		IMGWPSimple.init();
	});

})(jQuery);