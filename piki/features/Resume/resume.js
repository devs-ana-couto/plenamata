(function($){

	window.pikiforms_newsletter_submit = function( $form, json ){
		var $wrapper = $form.parent( '.newsletter-form-content' );
		$wrapper.fadeOut( '1000', function(){
			$( this ).html( '<div class="finish-form clearfix">'+ json.message +'</div>' ).fadeIn( '600' );
		})
	}
	
})(jQuery);
