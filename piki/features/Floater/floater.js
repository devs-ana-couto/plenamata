(function($){

	$(function(){
		$( 'body' ).on( 'click', 'a.piki-page-floater', function(event){
			event.preventDefault();
			window.click_floater_link( $( this ) );
		});
		$( 'body' ).on( 'click', '.piki-floater-close-button', function(event){
			event.preventDefault();
			window.close_floater_page( $( this ).parents( '.piki-floater-page' ).first() );
		});
	});

	window.click_floater_link = function( $clicked ){
		
		var _url = $clicked.attr( 'href' );
		var _id = $clicked.attr( 'rel' );
		var _callback = $clicked.attr( '--callback' );	

		$.fn.pikiLoader();	

		var $pgfloater = $( '#'+_id );
		if( !$pgfloater.length ){
			$pgfloater = window.create_page_floater( _id );
			request_floater_content( $pgfloater, _url, _callback );
		}
		else{
			window.open_floater_page( $pgfloater );
		}
	}

	window.request_floater_content = function( $floater, url, callback ){
		var request = $.ajax({
			url: url,
			type: 'GET',
			beforeSend: function(){
				$.fn.pikiLoader()
			}
		});
		request.done(function( response ) {
			$.fn.pikiLoader( 'close' );
			window.insert_floater_content( $floater, response, callback );
		});
		request.fail(function( jqXHR, textStatus ) {
			console.log( "Request failed: " + textStatus );
		});

	}

	window.open_floater_page = function( $pgfloater ){
		$.fn.pikiLoader( 'close' );

		//$(window).scrollTo( $( '#masthead' ).outerHeight() );
		
		//var viewport = piki_get_viewport();
		//var _content_height = $( '#page' ).height() - $( '#masthead' ).height() - $( '#colophon' ).height();
		
		$.fancybox( $pgfloater );

	}

	window.close_floater_page = function( $pgfloater ){
		$pgfloater.fadeOut( 300 );
	}

	window.create_page_floater = function( unique_id ){
		
		var html = '';
		html += '<div id="'+ unique_id +'" class="piki-floater-page">';
		html += '	<div class="content-page clearfix">';
		html += '	</div>';
		html += '</div>';

		$page = $( 'body' ).appendTo( $( '#main' ) ).hide();
		$( '.button.close', $page ).click(function(event){
			event.preventDefault();
			close_page_floater( $( this ).parents( 'div.piki-floater-page' ).first() );
		});
		return $page;
	}

	window.insert_floater_content = function( $floater, response, callback ){

		var $floter_content = $( '.content-page', $floater ).first();
		
		$( response ).find( '#content' ).removeAttr( 'id' ).appendTo( $floter_content );
		$( '<a class="button piki-floater-close-button">Voltar</a>' ).prependTo( $floter_content  )
		
		if( callback != undefined ){
			eval( callback + "();" );
		}

		window.open_floater_page( $floater );
	}

})(jQuery);