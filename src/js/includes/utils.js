var Utils;

(function($){

	var 
		$body,
		$window,
		$htmlBody
	;

	Utils = {

		gadget : false,
		bindedScroll : false,
		fixedScroll : 0,
		lockedScroll : false,

		init : function(){

			$body = $( 'body' );
			$window = $( 'window' );
			$htmlBody = $( 'html,body' );

			this.checkSize();

			// Bind scroll lock
			$(window).on( 'scroll', function(e){
				if( Utils.lockedScroll ){
					e.preventDefault();
					window.scrollTo( 0, Utils.fixedScroll );
				}
			});
		
		},

		isLockedScroll : function(){
			return Utils.lockedScroll === true;
		},

		lockScroll : function(){
			Utils.lockedScroll = true;
			Utils.fixedScroll = Utils.getPageTop();
			$body.addClass( 'locked-scroll' );
		},

		unlockScroll : function(){
			Utils.lockedScroll = false;
			$body.removeClass( 'locked-scroll' );
		},

		body : function(){
			return $body;
		},

		window : function(){
			return $window;
		},

		htmlBody : function(){
			return $htmlBody;
		},

	    // Gadget
	    checkSize : function(){

	    	// Viewport width
	    	const viewportWidth = Utils.getPageWidth();

	    	// Check size
	    	if( viewportWidth >= 769 ){
	    		if( Utils.gadget != 'desktop' ){
		    		Utils.gadget = 'desktop';
	    		}
	    	}
	    	else {
	    		if( Utils.gadget !== 'mobile' ){
	    			Utils.gadget = 'mobile';
	    		}
	    	}

	    	return Utils.gadget;
	    	
	    },

	    getGadget : function(){
	    	return this.checkSize();
	    },

	    getPageTop : function(){
	    	return ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 );
	    },

		getPageHeight : function(){
		    var doc = document;
		    return  Math.max(
		        doc.body.scrollHeight, doc.documentElement.scrollHeight,
		        doc.body.offsetHeight, doc.documentElement.offsetHeight,
		        doc.body.clientHeight, doc.documentElement.clientHeight
		    );
		},

		getPageWidth : function(){
			return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		},

		checkIfBottom : function(){

			var 
				pageHeight = this.getPageHeight(),
				pageTop = ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop || 0 ),
				viweportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
			;
			return pageTop >= ( pageTop + viweportHeight - 100 );

		},

		scrollTo : function( selector ){

	        var $target = typeof( selector ) === 'object' ? selector : $( selector );            
	        if( !$target.length ) return;

			var newY;
	        if( $target.attr( 'id' ) === 'inicio' ){
	        	newY = 0;
	        }
	        else {
		        newY = $target.offset().top;
	        }

	        var actualY = _window.scrollTop();
	        var distance = actualY - newY;

	        if( distance < 0 ) distance *= -1;
	        
	        var time = ( 600 - ( distance * 0.1 ) );
	        if( time < 600 ) time = 600;
	        
	        var offset = $target.data( 'offset' );
	        if( offset ){

	            try {

	                var 
	                    _json = JSON.parse( offset.split( "'" ).join( '"' ) )
	                    _offset = false,
	                    _vWidth = Navigation.getPageWidth()
	                ;

	                $.each( _json.breaks, function( _break ){
	                    if( _vWidth <= _break ){
	                        _offset = parseInt( this );
	                        return false;
	                    }
	                });

	                offset = ( !_offset ) ? parseInt( _json.initial ) : _offset;

	            }
	            catch( e ){

	                var _offset = parseInt( offset );
	                offset = _offset > 0 ? _offset : 0;
	            
	            }

	        }
	        else {

	            offset = 0;
	        
	        }

	        if( this.$header ){
	        	offset += this.$header.outerHeight();
	        }

	        $( 'html, body' ).animate({
	            scrollTop: ( newY - ( offset ) )
	        }, 250, 'easeOutQuad' );      

	    }
		
	}
	$(function(){
		Utils.init();
	});

})(jQuery);
