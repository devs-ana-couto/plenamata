var Loader;

(function($){

	var _body = _body || $( 'body' );

	// Máscara de carregamento
	var pikiLoaderMethods = {

		init : function( options ) {

			var $this = $( this );

		    // Default options
		    var defaults = { 
				indexes: [],
				zIndex: 999999,
				target: $this,
				mask: false,
				position: $this.is( 'body' ) ? 'fixed' : 'absolute',
				toBehind: false
		    }; 

			// Se um elemento foi passado
			if( options instanceof jQuery ){
				options = { toBehind: options };
			}
			// Se foi passado um objeto de configurações
			else if( typeof( options === 'object' ) ){
				options = $.extend( {}, defaults, options ); 
			}
			else {
				options = {};
			}
			options = $.extend( {}, defaults, options );

			return this.each(function(){

				var $this = $( this );
				var data = $this.data( 'pikiLoader' );

				if ( data === undefined ) {
					$this.data( 'pikiLoader', options );
					data = $this.data( 'pikiLoader' );
				}

				if ( !data.mask ) {
					$this.pikiLoader( 'configure', options );
				}
				else {
					$this.pikiLoader( 'show', options );
				}

	    	});
	  	},

		configure : function( options ){
			return this.each(function(){
				var $this = $( this );
				var data = $this.data( 'pikiLoader' );
				// Build our base attributes and allow them to be overriden
				var css = {
					position: data.position,
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					margin: 0,
					zIndex: options.zIndex,
					display: 'none',
					stop : false
				};
				// Add opacity handling for IE.
				css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
				// Loader
				data.mask = $( '<div />', { 'class': "piki-loader-full", css: css } ).appendTo( data.target );
				data.mask.append( '<p><span>Carregando...</span></p>' );
				$this.pikiLoader( 'show', options );
			});
		},

		show : function( options ){

			Piki.lockScroll();

			return this.each(function(){				

				var $this = $( this );
				var data = $this.data( 'pikiLoader' );

				$this.pikiLoader( 'start' );

				var zIndex = data.zIndex;
				if ( options !== undefined && options.toBehind !== undefined ) {
					if ( options.toBehind=='all' ) {
						zIndex = 99999;	          	
					}
					else if ( options.toBehind.length ){
						var objZIndex = parseInt( options.toBehind.css( 'z-index' ) );
						if ( !isNaN( objZIndex ) ){
							zIndex = objZIndex-1;
						}
						else {
							options.toBehind.css( 'z-index', zIndex+1 );
						}
					}
				}
				// Organiza o z-index da mascara
				data.mask.css( 'z-index', zIndex );
				data.indexes.push( zIndex );
				
				if( options.stop === true ){
					$this.pikiLoader( 'stop' );
				}
				
				data.mask.show();

			});

		},

		close : function( timeFade ){

			Piki.unlockScroll();

			return this.each(function(){

				var $this = $(this);
				var data = $this.data('pikiLoader');

				if (!data) {
					return $this;
				}

				var lastZIndex = data.indexes.pop();
				if( data.indexes.length < 1 ){
					if (timeFade === undefined){
						data.mask.hide();
					}
					else{
						data.mask.stop(true, true).fadeOut(timeFade);
					}
				}
				else{
					var newZIndex = data.indexes.pop();
					data.mask.css( 'z-index', newZIndex );
					data.indexes.push( newZIndex );
				}

				$this.pikiLoader( 'stop' );

			});

		},
		stop : function() {
			return this.each(function(){

				var $this = $( this );
				var data = $this.data( 'pikiLoader' );

				data.mask.addClass( 'loaded' );

			});
		},
		start : function(){
			return this.each(function(){

				var $this = $(this);
				var data = $this.data('pikiLoader');

				data.mask.removeClass('loaded');

			});
		},
		destroy : function() {

			Piki.unlockScroll();

			return this.each(function(){
				var $this = $(this);
				var data = $this.data( 'pikiLoader' );
				_window.unbind( '.pikiLoader' );
				data.imagesBox.remove();
				$this.removeData( 'pikiLoader' );
			});
			
		}
	};

	$.fn.pikiLoader = function( method ) {
		
		// Target
		var $target;		
		if ( !this.length ){ $target = _body; }
		else { $target = this; }

		if( pikiLoaderMethods[method] ){
			return pikiLoaderMethods[method].apply( $target, Array.prototype.slice.call( arguments, 1 ));
		} else {

			var topass = ( method === 'all' ) ? { toBehind: 'all' } : arguments;
			if( typeof( topass ) === 'object' && topass[0] !== undefined && typeof( topass[0] ) === 'object' ){
				topass = topass[0];
			}
			
			return pikiLoaderMethods.init.apply( $target, [ topass ] );
		
		} 
	};

	Loader = function( action ){
		$.fn.pikiLoader( action );
	};

	window.pikiloder_attach_callback = function( method ){
		var pikiloader_data = _body.data( 'pikiPager' );
		if( !pikiloader_data ){
			_body.data( 'pikiPager', Array( method ) );
		}
		else {
			pikiloader_data.push( method );
		}
	};

})(jQuery);
