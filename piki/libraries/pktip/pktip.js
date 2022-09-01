var PKTips;
(function($){

	PKTips = {

		$tips : null,

		init : function(){

			this.$tips = $( 'div.pktip' );
			if( !this.$tips.length ) return;

			this.$tips.each(function(i){
				this.$ = this.$ || $( this );
				PKTips.configure( this );
			});

		},

		configure : function( el ){

			var data = el.$.data( 'PKTips' );
			if( data === undefined ){

				data = {
					_ : el,
					$ : el.$,
					$box : el.$.children( 'div' ),
					$bot : el.$.children( 'button' ),
					timeClose : false
				};
				el.$.data( 'PKTips', data );
				
				// Toggle trigger click
				data.$bot.bind( 'click', function(e){
					e.preventDefault();
					PKTips.toggle( data );						
				});

				// Close button
				data.$close = $( '<button type="button" class="close">Fechar</button>' ).appendTo( data.$box );
				data.$close.on( 'click', function(e){
					e.preventDefault();
					PKTips.close( data );
				});

				// Creating time to close
				data.$.on( 'mouseout mouseleave', function(){
					if( data.timeClose ) clearTimeout( data.timeClose );
					data.timeClose = setTimeout(function(){
						PKTips.close( data );
					}, 2000 );
				});
				data.$box.on( 'mouseout mouseleave', function(){
					if( data.timeClose ) clearTimeout( data.timeClose );
					data.timeClose = setTimeout(function(){
						PKTips.close( data );
					}, 2000 );
				});
				// Clearing time to close
				data.$.on( 'mouseover mousemove mouseenter', function(){
					if( data.timeClose ) clearTimeout( data.timeClose );
				});
				data.$box.on( 'mouseover mousemove mouseenter', function(){
					if( data.timeClose ) clearTimeout( data.timeClose );
				});
				data.$close.on( 'mouseover mousemove mouseenter', function(){
					if( data.timeClose ) clearTimeout( data.timeClose );
				});

				// Field line
				var $fline = data.$.parents( '.linha-field' );
				if( $fline.length ){
					var _class = $fline.first().data( 'machine-name' );
					if( _class !== undefined ){
						data.$.addClass( _class );
					}
				}

			}

		},

		close : function( data ){
			
			// Closing
			data.$.removeClass( 'tip-open' );
			data.$box.stop( true, true ).fadeOut( 200 );
			
			// Timeout to close
			if( data.timeClose ) clearTimeout( data.timeClose );
		
		},

		open : function( data ){

			// Closing all
			this.$tips.each(function(){
				this.$ = this.$ || $( this );
				var data = this.$.data( 'PKTips' );
				PKTips.close( data );
			});
			
			// Opening
			data.$.addClass( 'tip-open' );
			data.$box.stop( true, true ).fadeIn( 200 );
		
			// Timeout to close
			if( data.timeClose ) clearTimeout( data.timeClose );
		
		},

		toggle : function( data ){

			if( data.$.hasClass( 'tip-open' ) ){
				PKTips.close( data );
			}
			else {
				PKTips.open( data );
			}

		}

	};
	$(function(){ PKTips.init(); });

})(jQuery);
