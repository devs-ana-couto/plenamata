(function($){
	window.pikiforms_newsletter_submit = function( $form, json ){
		var $wrapper = $form.parent( '.newsletter-form-content' ).first();
		$wrapper.slideUp( '1200', function(){
			$wrapper.addClass( 'success' ).html( '<div class="finish-form clearfix">'+ json.message +'</div>' ).slideDown( '1200' );
		});
	};
})(jQuery);
