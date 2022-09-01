(function($){
	$.fn.allSameHeight = function( base ){
		return this.each(function(){

			var $this = $( this );
			var _this = this;

			this.configure = function(){

				if( $this.is( '.all-same-height' ) ) {
					return;
				}
				$this.addClass( 'all-same-height' );

				this.timeout = null;
				this.$items = $this.children();

				if( base !== undefined && $( base ).length ){
					this.$base = $( base );
				}
				else {
					this.$base = false;
				}

				$( window ).bind( 'resize', function(){
					_this.bindResize();
				}).resize();

			};

			this.bindResize = function(){
				clearTimeout( _this.timeout );
				_this.timeout = setTimeout( _this.resize(), 500 );
			};

			this.resize = function(){

				var new_height;
				if( !this.$base ){
					new_height = 0;
					_this.$items.css( 'height', 'auto' );
					_this.$items.each(function(x){
						if( this.$ === undefined ){
							this.$ = $( this );
						}
						var item_height = this.$.outerHeight();
						if( item_height > new_height ){
							new_height = item_height;
						}
					});
				}
				else {
					_this.$base.css( 'height', 'auto' );
					new_height = _this.$base.outerHeight();
				}

				_this.$items.css( 'height', new_height+'px' );
			
			}

			this.configure();

		});
	};
})(jQuery);
