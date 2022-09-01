(function($){
	window.pikiforms_contact_submit = function( $form, json ){
		var $wrapper = $form.parent( '.contact-form-content' ).first();
		$wrapper.slideUp( '1200', function(){
			$wrapper.addClass( 'success' ).html( '<div class="finish-form clearfix">'+ json.message +'</div>' ).slideDown( '1200' );
		});
	};
})(jQuery);
