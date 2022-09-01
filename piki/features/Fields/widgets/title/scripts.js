(function($){

	PKTitle = {

		$ : null,
		$title : null,

		init : function(){

			this.$ = $( 'input#_field_title' );
			this.$title = $( 'form input#title' );

			if( !this.$.length || !this.$title ) return;

			var maxlength = this.$.data( 'maxlength' );
			if( maxlength ){
				
				this.$title.attr( 'maxlength', maxlength );

				var value = this.$title.val();
				if( value.length > maxlength ){
					this.$title.val( value.substring( 0, maxlength ) );
				}
			
			}

			var minlength = this.$.data( 'minlength' );
			if( minlength ){
				//$title.attr( 'maxlength', maxlength );
			}
			
		}

	};
	$(function(){ PKTitle.init() });

})(jQuery);