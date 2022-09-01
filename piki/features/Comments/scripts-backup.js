(function($){


	$(function(){

		$( '#commentform' )
			.attr( 'action', Piki.blogurl + '/envia-comentario/' )
			.submit(function(event){
				event.preventDefault();
				PikiComm_submit( $( this ) );
			});

		$( '#main-content' ).on( 'click', 'a.edit-comment-button' , function(event){
			event.preventDefault();

			var $button = $( this );
			var $comment = $button.parents( '.comment-item' ).first();

			if( $comment.is( '.editing' ) ){
				window.PikiComm_edit( $comment, $button );
			}
			else{
				$button.text( 'Salvar' );
				window.PikiComm_make_editable( $comment );
			}

		});

		$( '#main-content' ).on( 'click', 'a.remove-comment-button' , function(event){
			event.preventDefault();
			var $button = $( this );
			var $comment = $button.parents( '.comment-item' ).first();
			window.PikiComm_delete( $comment, $button );
		});


	});

	window.PikiComm_make_editable = function( $comment ){

		if( $comment.is( '.editing' ) ){
			return;
		}
		$comment.addClass( 'editing' );

		var $content = $( '.comment-content', $comment );
		
		var $editfield = $( '.content-edit-field', $comment );
		if( !$editfield.length ){
			$editfield = $( '<div class="content-edit-field"><textarea id="contnet-'+ $comment.attr( 'id' ) +'">'+ $content.text() +'</textarea></div>' ).insertAfter( $content ).hide();
		}

		$( '.pikilike-box', $comment ).fadeOut();
		$content.slideUp( 300 );
		$editfield.slideDown( 450 );

	}

	window.PikiComm_edit = function( $comment, $button ){
		var request = $.ajax({
			url: $button.attr( 'href' ),
			type: 'POST',
			dataType: "JSON",
			data: { 
				'comment_ID' : $button.attr( 'rel' ),
				'comment' : $comment.find( '.content-edit-field textarea' ).val(),
				'editing' : true
			},
			beforeSend: function(){
				$.fn.pikiLoader()
				PikiComm_remove_erro( $comment );
			}
		});
		request.done(function( jSon ) {
			$.fn.pikiLoader( 'close' );

			if( jSon.status == 'error' ){
				PikiComm_set_erro( $comment, jSon );
				console.log( jSon );
			}
			else{
				window.PikiComm_edit_success( $comment, jSon );
			}
		});
		request.fail(function( jqXHR, textStatus ) {
			console.log( "Request failed: " + textStatus );
		});

	}

	window.PikiComm_delete = function( $comment, $button ){

		$.fn.pikiLoader();

		var request = $.ajax({
			url: $button.attr( 'href' ),
			type: 'POST',
			dataType: "JSON",
			data: { 'comment_ID' : $button.attr( 'rel' ) },
		});
		request.done(function( jSon ) {
			
			$.fn.pikiLoader( 'close' );

			if( jSon.status == 'error' ){
				PikiComm_set_erro( $comment, jSon );
				console.log( jSon );
			}
			else{
				$comment.slideUp( 300, function(){
					$( this ).remove();
				});
			}
		});
		request.fail(function( jqXHR, textStatus ) {
			console.log( "Request failed: " + textStatus );
		});

	}

	window.PikiComm_edit_success = function( $comment, jSon ){
		// Remove o status de edição
		$comment.removeClass( 'editing' );
		// Remove os erros
		window.PikiComm_remove_erro( $comment );
		// Conteúdo do widget
		var $content = $( '.comment-content', $comment );
		// Mostra o comentário já editado
		$content.html(  jSon.comment  ).slideDown( 450 );
		// Esconde o campo de edição
		$( '.content-edit-field', $comment ).slideUp( 300 );
		// Mostra os botões de curtir
		$( '.pikilike-box', $comment ).fadeIn();
		// Muda o status do botão
		$( '.edit-comment-button', $comment ).text( 'Editar' );

	};

	window.PikiComm_submit = function( $form ){

		var request = $.ajax({
			url: $form.attr( 'action' ),
			type: 'POST',
			dataType: "JSON",
			data: $form.serialize(),
			beforeSend: function(){
				$.fn.pikiLoader()
				PikiComm_remove_erro( $form );
			}
		});
		request.done(function( jSon ) {
			$.fn.pikiLoader( 'close' );

			if( jSon.status == 'error' ){
				
				PikiComm_set_erro( $form, jSon );
				console.log( jSon );
			
			}
			else{
				$form.reset();
				var $comment = $( jSon.comment ).hide().prependTo( '#comments-list' );
				PikiComm_set_success( $form );

				var scrollY = Math.round( $form.find( 'input#submit' ).first().position().top ) + 200;

				$(window).scrollTo( scrollY );
				$comment.slideDown( 'medium' );

			}
		});
		request.fail(function( jqXHR, textStatus ) {
			console.log( "Request failed: " + textStatus );
		});

	}

	window.PikiComm_set_erro = function( $form, json ){
		
		var $statusbox = PikiComm_statusbox( $form );
		
		console.log( "statusbox:" );
		console.log( $statusbox );


		console.info( 'json.error_message' );
		console.log( json.error_message );
		
		
		$form.addClass( 'error' );
		$statusbox.addClass( 'error' ).stop( true, true ).hide().html( json.error_message ).fadeIn( 'medium' );
	
	}

	window.PikiComm_set_success = function( $form, json ){
		var action = $form.is( '.comment-item' ) ? 'editado' : 'enviado';
		var $statusbox = PikiComm_statusbox( $form );
		$form.removeClass( 'error' );
		$statusbox.removeClass( 'error' ).addClass( 'success' ).html( 'Seu comentário foi '+ action +' com sucesso' ).fadeIn( 'medium' );
	}

	window.PikiComm_remove_erro = function( $form ){
		var $statusbox = PikiComm_statusbox( $form );
		$form.removeClass( 'error' );
		$statusbox.removeClass( 'error' ).stop( true, true ).fadeOut( 'fast', function(){
			$( this ).html( '' );
		});
	}

	window.PikiComm_statusbox = function( $form ){

		var $footer = $( '.comment-footer', $form );
		if( !$footer.length ){
			$footer = $( '.form-submit', $form );
		}

		var $statusbox = $footer.find( 'div.status', $form );
		if( !$statusbox.length ){
			$statusbox = $( '<div class="status"></div>' ).appendTo( $footer ).hide();
		}
		return $statusbox;
	}

})(jQuery);