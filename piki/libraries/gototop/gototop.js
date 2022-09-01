(function($){

	$(function(){
		
		var scroll_height = _body.prop( 'scrollHeight' );
		var viewport = window.piki_get_viewport();
		if( ( scroll_height - viewport.height ) > 0 ){
			var $button = $( '<a href="#" id="gototop_button">Topo</a>' ).appendTo( _body );
			$button.on( 'click', function(event){
				event.preventDefault();
			 	$( 'html, body' ).animate({
			        scrollTop: 0
			    }, 2000 );		
			});
			_body.data( 'gototopButton', { target : $button });
			_window.bind( 'scroll', function(){
				if( _window.scrollTop() <= 0 ){
					_body.data( 'gototopButton' ).target.removeClass( 'active' );
				}
				else {
					_body.data( 'gototopButton' ).target.addClass( 'active' );
				}
			});
		}	

	});

})(jQuery);
