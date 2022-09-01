(function($){

	var PKLGPD = {

		$ : false,
		$button : false,

		init : function(){

			this.$ = $( '#pklgpd-box' );
			this.$buttons = $( 'button', this.$ );

			if( !this.$.length ) return;

			var cookie = Cookie.get( 'pklgpd_accept' );
			if( cookie === '' ){
				this.$.show();
			}

			this.$buttons.on( 'click', function(e){
				
				e.preventDefault();

				this.$ = this.$ || $( this );

				const action = this.$.data( 'action' );

				if( action !== 'close' ){
					Cookie.set( 'pklgpd_accept', action, 9999 );
				}

				PKLGPD.$.addClass( 'hide' );
			
			});

		}

	};
	$(function(){
		PKLGPD.init();
	})

})(jQuery);

window.addEventListener( 'load', function(){
	

});	