window.backhash = window.location.hash;
window.backurl = window.location.href;
if( window.backhash !== '' && window.backhash !== '#' ){
	window.location.hash = '';
	window.scrollTo( 0, 0 );
}

var 
	Navigation,
	_body,
	_window
;

(function($){

	Navigation = {

		$navs : null,
		$menu : null,
		$header : false,
		timeout : false,
		$triggers : null,
		targets : {},
		totalTargets : 0,
		lastScollTop : 0,
		offseLimit : true,
		timeResize : false,

		components : [],

		init : function(){

			// Body
			if( _body === undefined ){
				_body = $( 'body' );
			} 

			// Window
			if( _window === undefined ){
				_window = $( window );
			}

	    	// Check when resize
	    	$( window ).resize(function(){
	    		
	    		// Time resizing
	    		if( Navigation.timeResize ) clearTimeout( Navigation.timeResize );
	    		
	    		// Start timer
	    		Navigation.timeResize = setTimeout(function(){
	    			
	    			// Check items
					Navigation.checkItems();
	    	
	    		}, 100 );
	    	
	    	});
			Navigation.checkItems();

			// Initial hash
			if( window.backhash !== '' && window.backhash !== '#' ) {
			    setTimeout(function(){
			        Navigation.scrollTo( window.backhash );
			    }, 1 );
			}

		},

		checkItems : function(){

			this.$menu = $( '#menu .menu' );
			//this.$header = $( '#masthead' );

			// Navigations
			this.$navs = $( '[data-role="navigation"]' );

			// Clear components
			Navigation.components = [];
			
			// Targets
	    	if( this.$navs.length ){

	    		// Configura cada componente de navetação
	    		this.$navs.each(function(){
	    			Navigation.configureItem( this );
	    		});

	    		// Se existe algum componente de navetação
	    		if( Navigation.components.length ){
					Navigation.bind();
	    		}
	    		
	    	}
		
		},

		// Bind click
		clickMenuItem : function( data, item ){
			data.triggers.removeClass( 'active' );
			data.triggers.filter( '[href="'+ this.href +'"]' ).addClass( 'active' );
		},

		// Configure navigation
		configureItem : function( item ){

			item.$ = item.$ || $( item );
			
			var data = item.$.data( 'Navigation' );
			if( data === undefined ){

				// Configure data
				data = {
					_ : item,
					$ : item.$,
					triggers : $( 'a', item.$ ),
					positions : [],
					targets : {},
					totalTargets : 0,
					indicator : $( '.indicator', item.$ ),
					locked : false
				};
				item.$.data( 'Navigation', data );

				// Show on hover
				data.$.hover(
					function(){
						data.locked = true;
						data.$.removeClass( 'closed' );
					},
					function(){
						data.locked = false;
					}
				);

			}

			// Fix width
			var full_width = Math.ceil( data.$.outerWidth() * 1.2  );
			data.$.css( 'width', full_width + 'px' );

			// If theres is triggers, check items and calculating positions
    		if( data.triggers.length ){

				// Trigger click
				data.triggers.off( 'click' ).on( 'click', function(){
					this.$ = this.$ || $( this );
					Navigation.clickMenuItem( data, this );	    			
				});

				// Clearing
				data.targets = [];
				data.positions = [];

				// Each trigger
				data.triggers.each(function(){
					
					this.$ = this.$ || $( this );

					// There is no anchor
					if( this.href.indexOf( '#' ) >= 0 ){

						// Just anchor
						if( this.href.indexOf( '#' ) === 0 ){
							_id = url;
						}
						// Anchor with link
						else {
							_id = '#' + this.href.split( '#' ).pop();
						}

						// Target
						var $target = ( _id === '#' ) ? _body : $( _id );
						if( $target.length ){

							// Get top position
							var top_position = parseInt( $target.offset().top );
							if( top_position < 0 ) top_position = 0;

							// Insert in targets array
							if( !data.positions.includes( top_position ) ){
								data.positions.push( top_position );
							}

							// Insert in targets array
							var key_atgts = 'tgts-' + top_position;
							if( data.targets[ key_atgts ] === undefined ){
								data.targets[ key_atgts ] = [];
							}
							data.targets[ key_atgts ].push( $target );

							// Increment total
							data.totalTargets++;

						}

					}

				});

	            // Bind scroll
	    		if( data.totalTargets > 0 ){

	    			// Ordering positions
	    			data.positions = data.positions.sort(function( a, b ){ return a - b });

	    			// Add component
	    			Navigation.components.push( data );	
	    		
	    		}

    		}

		},

	    bind : function(){

	    	// Binding scroll
            Navigation.checkScroll( true );
            _window.bind( 'scroll', function(){
                Navigation.checkScroll();
            });

	        // Bind clicks
	        _body.off( 'click.Navigation' ).on( 'click.Navigation', 'a', function( e ){

	            this.$ = this.$ || $( this );

	            // There is no href
	            if( this.href === undefined || this.href.indexOf( '#' ) < 0 ) return true;

	            // There is no destiny
	            if( this.href === '#' ){
	                event.preventDefault();
	                return;
	            }

	            // Element ID
	            elemnetID = this.href.split( '#' ).pop();

	            // Links
	            if( elemnetID.indexOf( 'http' ) === 0 ){
	                return true;
	            }

	            // Actual url
	            var $target = $( '#' + elemnetID );
	            if( $target.length ){

	                event.preventDefault();

	                // Prevent default page scroll
	                $target.attr( 'id', '' );
	                window.location.hash = elemnetID;
	                $target.attr( 'id', elemnetID );

	                // Scroll to
	                Navigation.scrollTo( $target );
	            
	            }

	        });

	    },

	    getPageTop : function(){
	    	var top = ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop || 0 );
	    	if( this.$header.length ){
	    		top += this.$header.outerHeight();
	    	}
	    	return  top;
	    },

		getPageHeight : function(){
		    var doc = document;
		    return  Math.max(
		        doc.body.scrollHeight, doc.documentElement.scrollHeight,
		        doc.body.offsetHeight, doc.documentElement.offsetHeight,
		        doc.body.clientHeight, doc.documentElement.clientHeight
		    );
		},

		checkIfBottom : function(){

			var 
				pageHeight = this.getPageHeight(),
				pageTop = ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop || 0 ),
				viweportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
			;
			return pageTop >= ( pageTop + viweportHeight - 100 );

		},

	    checkScroll : function( initing ){

	    	// Top page positioun
	    	var scrollTop = Navigation.getPageTop();

	    	// Direction
            var dir = scrollTop >= Navigation.lastScrolTop ? 'down' : 'up';

	    	// Analisys each component
	    	this.components.forEach(function( data ){

	    		// Close when scroll
	    		if( !data.locked && initing === undefined ){
		    		data.$.addClass( 'closed' );
	    		}

		    	var 
		    		start = data.positions[ 0 ],
		    		items_key = false
		    	;

		    	// At top
		    	if( scrollTop <= start ){

		    		items_key = start;
		    	
		    	}
		    	// At bottom
		    	else if( Navigation.checkIfBottom() ){
				
					items_key = data.positions[ data.positions.length - 1 ];
		    	
		    	}
		    	// Calculate positions
		    	else {

		    		// Offset
		    		var top_compare = scrollTop;
		    		if( Navigation.offseLimit ){

		    			var _offset = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 4;
		    			if( dir === 'down' ){
		    				top_compare += _offset;
		    			}
		    			else {
		    				top_compare += _offset * 2;
		    			}
		    		
		    		}
		    	
		    		// Calculate
		    		data.positions.forEach(function( position ){
			    		if( top_compare >= ( parseInt( position ) - start ) ){
			    		   	items_key = position;
			    		}
		    		});
		    	
		    	}

		    	// Unmark triggeres
		    	data.triggers.removeClass( 'active' );

		    	// Marking classes
		    	var targets_keys = Object.keys( data.targets );

				// Walk trought arrays items
		    	targets_keys.forEach(function( target ){
		    		var elements = data.targets[ target ];
		    		elements.forEach(function( item ){
		    			item.removeClass( 'active' );
		    		});
		    	});

		    	// Mark items
		    	var key_atgts = 'tgts-' + items_key;
		    	if( data.targets[ key_atgts ] !== undefined ){

		    		// Add class to target
					data.targets[ key_atgts ].forEach(function( target ){
			    		
			    		// Add class to element
			    		target.addClass( 'active' );
			    		
			    		// Add class to triggers
			    		var _triggers = data.triggers.filter( '[href="#'+ target.attr( 'id' ) +'"]' );
			    		if( _triggers.length ){

				    		_triggers.addClass( 'active' );

				    		if( data.indicator.length ){

				    			var _first_trigger = _triggers.first();
				    			var _befores = _first_trigger.prevAll();
				    			var _new_top = parseInt( _first_trigger.css( 'margin-top' ) );

				    			_befores.each(function(){
				    				this.$ = this.$ || $( this );
				    				_new_top += this.$.outerHeight( true );
				    			});

				    			data.indicator.css( 'top', _new_top );
				    			
				    		}

			    		}
		    	
		    		});
		    	
		    	}
	    		
	    	});

			Navigation.lastScrolTop = scrollTop;

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
	                    _vWidth = Navigation.vWidth()
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

	    },

	    vWidth : function vWidth(){
	        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
		
	};

	$(function(){
		$( 'body' ).imagesLoaded( function() {
			Navigation.init();
		});
	});

})(jQuery);