(function($){
	$(function(){
		$( '#main-content' ).on( 'click', 'a' , function(event){
			$clicked = $(this);
			if( $clicked.parent().is( '.pikilike-box' ) ){
				event.preventDefault();
				pikiLike_click( $clicked );

			}
		});
	});

	window.pikiLike_click = function( $clicked ){

		if( $clicked.parent().is( '.off' ) ){
			return;
		}

		var request = $.ajax({
			url: $clicked.attr( 'href' ),
			type: 'POST',
			data: { 'like-object-id' : $clicked.attr( 'rel' ) },
			dataType: "JSON",
			beforeSend: function(){
				$.fn.pikiLoader()
			}
		});
		request.done(function( jSon ) {
			
			$.fn.pikiLoader( 'close' );
			
			if( jSon.status == 'error' ){
				console.log( jSon.type );
				alert( 'Ops! Ocorreu um erro. Por favor, tente novamente mais tarde. Se o erro persistir, entre em contato com o adminstrador do site.' );
			}
			else{

				if( $clicked.is( '.own' ) ){
					$clicked.removeClass( 'own' );
				}
				else{
					$clicked.siblings( 'a' ).removeClass( 'own' );
					$clicked.addClass( 'own' );
				}

				var $like_count = $clicked.parent( '.pikilike-box' ).find( 'a.like .counter' );
				$like_count.html( jSon.scores.likes );

				var $unlike_count = $clicked.parent( '.pikilike-box' ).find( 'a.unlike .counter' );
				$unlike_count.html( jSon.scores.unlikes );
				
			}
									
		});
		request.fail(function( jqXHR, textStatus ) {
			console.log( "Request failed: " + textStatus );
		});

	}

})(jQuery);