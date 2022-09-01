(function($){
	
	// Alerta
	window.openAlert = function( options ){

		$.fn.pikiLoader( $alertBox );
		
		var $alertBox = $( '#alert-box' );

		if( !$alertBox.length ){

			var _htmlbox = '';
			_htmlbox += '<div id="alert-box">';
			_htmlbox += '	<div class="header">';
			_htmlbox += '		<h2></h2>';
			_htmlbox += '		<a class="close-button"></a>';
			_htmlbox += '	</div>';
			_htmlbox += '	<div class="content">';
			_htmlbox += '		<div class="text"></div>';
			_htmlbox += '	</div>';
			_htmlbox += '</div>';
			
			$alertBox = $( _htmlbox ).appendTo( _body ).hide();

		}

		var defaults = {
			title: 'Ops!',
			status: 'error',
			focusAfter: false,
			buttonText: 'Ok',
			buttonCallback: false,
			content: ''
		};
		if( typeof options == 'string' ){
			dataOptions = defaults;
			dataOptions.content = options;
		}
		else{
			dataOptions = $.extend({}, defaults, options); 
		}

		$alertBox.attr('class', 'box-message ' + ' ' + dataOptions.status );
		$alertBox.find('.header h2').html( dataOptions.title );
		$alertBox.find('.content .text').html( dataOptions.content );
		$alertBox.find('.ok-button').html( dataOptions.buttonText );

		piki_center_object_y( $alertBox );
		$alertBox.show();
		$.fn.pikiLoader( 'stop' );

		$alertBox.data( 'pikiAlert', dataOptions );

	};
	
	window.closeAlert = function( $clicked ){
		
		var $alertBox = $( "#alert-box" );
		var data = $alertBox.data( 'pikiAlert' );
		
		$.fn.pikiLoader( 'close' );
		$alertBox.hide();
		
		if( data.focusAfter && data.focusAfter.length ){
			data.focusAfter.focus();
		}
		if ( data.buttonCallback && $clicked.length && $clicked.is( '.ok-button' ) ) {
			data.buttonCallback( $alertBox );
		}

	};

	$(function(){
		$( "#alert-box .header .close-button, #alert-box .ok-button" ).click(function(){
			closeAlert( $( this ) );
		});
	});

})(jQuery);
