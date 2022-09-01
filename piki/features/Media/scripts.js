(function($){
	$(function(){
		$( '.cycle-wrapper' ).hover(
			function(){
				$( this ).addClass( 'hover' );
			},
			function(){
				$( this ).removeClass( 'hover' );
			}
		);
		$( '.cycle-wrapper' ).on( 'cycle-before', function( event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
			// Out
			var data = window.piki_slides_slide_data( outgoingSlideEl );
			if( data.texts ){
				data.texts.stop( true, true ).fadeOut( 100 );
			}
			// In
			var data_in = window.piki_slides_slide_data( incomingSlideEl );
			if( data_in.texts ){
				data_in.texts.stop( true, true ).hide();
			}
		});
		$( '.cycle-wrapper' ).on( 'cycle-after', function( event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
			var data = window.piki_slides_slide_data( incomingSlideEl );
			if( data.texts ){
				data.texts.stop( true, true ).fadeIn( 1200 );
			}
		});
	});

	window.piki_slides_slide_data = function( slide ){
		var $slide = $( slide );
		var data = $slide.data( 'pikiSlides' );
		if( !data ){
			var $texts = $slide.children( '.texts' ).first();
			if( !$texts.length ){
				$texts = false;
			} 
			data = { target : $slide, texts : $texts };
			$slide.data( 'pikiSlides', data );
		}
		return data;
	}
})(jQuery);