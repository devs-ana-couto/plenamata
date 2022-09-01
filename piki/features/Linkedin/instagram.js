(function($){

	$(function(){

		$( '.instagram-field' ).on( 'click', 'input.aprovar', function( event ){
			event.preventDefault();
			window.toogle_status( $( this ), 'aproved' );
		});

		$( '.instagram-field' ).on( 'click', 'input.reprovar', function( event ){
			event.preventDefault();
			window.toogle_status( $( this ), 'reproved' );
		});

		$( '.instagram-field' ).on( 'click', '.load-more-button', function( event ){
			event.preventDefault();
			var $button = $( this );
			window.instagram_prepare_ajax( $button );
			$.ajax({
				type : 'POST',
				dataType : 'JSON',
				url: ajaxurl,
				data : {
					'action': 'instagram_load_options',
					'next_max_tag_id': $button.attr( 'rel' )
				}
			}).done( function( response ) {
				window.instagram_callback_ajax( $button, response );
			});
		});

		$( '.instagram-field a.ampliar' ).fancybox();

		// Limpando o cache
		$( '#instagram-clear-cache' ).on( 'click', function(event){
			event.preventDefault();
			window.instagram_clear_cache();
		});

	});

	window.toogle_status = function( $button, status ){

		var $wrapper = $button.parents( '.item-image' ).first();
		if( $wrapper.is( '.'+status ) ){
			return;
		}

		$.fn.pikiLoader();
		
		$.ajax({
			type : 'POST',
			dataType : 'JSON',
			url: ajaxurl,
			data : {
				'action' : 'instagram_change_status',
				'chave' : $wrapper.find( '.image-key' ).val(),
				'status' : status
			}
		}).done( function( response ) {
			$.fn.pikiLoader( 'close' );
			if( response.status == 'error' ){
				alert( 'Erro ao mudar o status da imagem. Consulte o administrador do sistema.' );
			}
			else {
				$wrapper.removeClass( 'pending aproved reproved' ).addClass( response.new_state );
			}
		});
	}

	window.instagram_prepare_ajax = function( $button ){
		$.fn.pikiLoader();
		var label = $button.attr( 'text-label' );
		if( label == undefined ){
			$button.attr( 'text-label', $button.val() );
		}
		$button.addClass( 'loading' ).val( 'carregando...' );
	}

	window.instagram_callback_ajax = function( $button, response ){
		$.fn.pikiLoader( 'close' );
		// Se não existe mais imagens
		if( response.status == 'empty' ){
			return;
		}
		// Opções
		var $wrapper = $button.parents( '.instagram-field' ).first();
		$wrapper.append( response.options );
		// Botão
		if( !response.next_id ){
			$button.hide();
		}
		else {
			$button.removeClass( 'loading' ).attr( { 'rel' : response.next_id, 'value' : $button.attr( 'text-label' ) } ).appendTo( $button.parent() );
		}
	}

	window.instagram_clear_cache = function(){
		
		$.fn.pikiLoader();
		
		$.ajax({
			type : 'POST',
			dataType : 'JSON',
			url: ajaxurl,
			data : { 'action' : 'instagram_clear_cache' }
		}).done( function( response ) {
			$.fn.pikiLoader( 'close' );
			if( response.status == true ){
				$.fn.pikiAlert( 'O cache foi removido.' );
				window.location.reload();
			}
			else {
				$.fn.pikiAlert( 'Houve um problema ao remover o cache.<br />Entre em contato com o administrador do sistema.' );
			}
		});
	}

})(jQuery);