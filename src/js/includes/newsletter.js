(function($){

	var WidgetNews = {

		$ : null,

		init : function(){

			this.$ = $( '#newsletter' );
			this.$floater = $( '#newsletter-floater' );

			if( !this.$.length ) return true;

			WidgetNews.bind();

		},

		bind : function(){

			// Scroll and position
			var _window = $(window);
            _window.resize(function(){
                WidgetNews.checkScroll();
            });
            _window.bind( 'scroll', function(){
                WidgetNews.checkScroll();
            });
            WidgetNews.checkScroll();

            // Floater click
            this.$floater.on( 'click', function(){

            	var 
            		vpHeight = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 ),
            		formTop = ( WidgetNews.$.offset().top - ( vpHeight - WidgetNews.$.outerHeight() ) )
            	;

				$( 'html, body' ).stop( true, true ).animate({
		            scrollTop: formTop
		        }, 500, 'easeOutQuad' );      
            
            });

		},

		checkScroll : function(){
			
			const 
				scrollTop = ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 ),
				vpHeight = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 ),
				formTop = this.$.offset().top,
				limitBottom = ( formTop - vpHeight )
			;

			if( scrollTop >= vpHeight && scrollTop < limitBottom ){
				this.$floater.addClass( 'showing' );
			}
			else {
				this.$floater.removeClass( 'showing' );
			}

		}
		
		/*
	    scrollTo : function( selector ){

	        $( 'html, body' ).animate({
	            scrollTop: ( newY - ( offset ) )
	        }, 250, 'easeOutQuad' );      

	    }
		*/

	};
	$(function(){
		WidgetNews.init();
	});

})(jQuery);
