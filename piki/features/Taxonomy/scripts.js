(function($){
	$(function(){
		$( '#post-body-content form.PikiForm' ).each(function(){
			var $form = $( this );
			$form.parent().parent( '#post-body' ).find( 'input#publish' ).on( 'click', function(event){
				$form.find( '.form-save-button' ).click();
			});
		});
	});
})(jQuery);