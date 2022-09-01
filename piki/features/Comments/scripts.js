(function($){

	var Comments = function(){
		return {

			$form : false,
			$content : false,
			$list : false,
			$fields : false,
			$status : false,
			$footer : false,
			$button : false,

			main : function(){

				$(function(){
					Comments.init();
				})

			},

			init : function(){

				// Content
				this.$content = $( '#main-content' );

				// Form
				this.$form = $( '#commentform' );

				if( this.$form.length ){

					// List
					this.$list = $( '#comments-list' );

					// Status box
					this.$status = this.statusBox();
					
					// Binding form
					this.bindForm();
				
				}

				if( this.$content.length ){

					// Editando
					this.$content.on( 'click', 'a.edit-comment-button' , function(event){
						
						event.preventDefault();

						var $button = $( this );
						var $comment = $button.parents( '.comment-item' ).first();

						if( $comment.is( '.editing' ) ){
							Comments.doEdit( $comment, $button );
						}
						else{
							Comments.makeEditable( $comment, $button );
						}

					});

					// Deletando
					this.$content.on( 'click', 'a.remove-comment-button' , function(event){
						
						event.preventDefault();
						var $button = $( this );
						var $comment = $button.parents( '.comment-item' ).first();
						Comments.doDelete( $comment, $button );
					
					});

				}

			},

			bindForm : function(){

				this.$fields = $( 'input, textarea, selecet', this.$form );

				// Change submit URL
				this.$form.attr( 'action', Piki.blogurl + '/envia-comentario/' );
				this.$form.on( 'submit', function(event){
					event.preventDefault();
					Comments.submit();
				});

			},

			// Submetendo formulário
			submit : function(){

				// Removing errors
				this.$fields.removeClass( 'error' );

				var request = $.ajax({
					url: this.$form.attr( 'action' ),
					type: 'POST',
					dataType: "JSON",
					data: this.$form.serialize(),
					beforeSend: function(){
						$.fn.pikiLoader()
						Comments.removeErrors();
					}
				});
				request.done(function( jSon ) {
					$.fn.pikiLoader( 'close' );

					if( jSon.status == 'error' ){
						
						Comments.setError( jSon );			
					
					}
					else{
						
						Comments.insertComment( jSon.comment );
						Comments.setSuccess();

					}
				
				});
				request.fail(function( jqXHR, textStatus ) {
					console.log( "Request failed: " + textStatus );
				});


			},

			// Postando edição do comentário
			doEdit : function( $comment, $button ){
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
						Comments.serError( $comment, jSon );
					}
					else{
						Comments.editSuccess( $comment, jSon );
					}
				
				});
				request.fail(function( jqXHR, textStatus ) {
					console.log( "Request failed: " + textStatus );
				});

			},

			doDelete : function( $comment, $button ){

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
						Comments.setError( $comment, jSon );
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

			},

			// Inserindo comentário
			insertComment : function( comment ){

				var $comment = $( comment ).hide().prependTo( this.$list );
				//var scrollY = Math.round( this.$button.position().top ) + 200;
				//$(window).scrollTo( scrollY );
				$comment.slideDown( 'medium' );

			},

			// Removendo erros
			removeErrors : function(){

				this.$fields.removeClass( 'error' );
				this.$status.fadeOut();

			},

			// Mostrando erro
			setError : function( json ){
				// Insert errors class
				this.$fields.filter( '#' + json.field ).addClass( 'error' );
				// Status box
				this.setStatus( 'error', json.message );
			},

			// Mostrando sucesso
			setSuccess : function(){
				
				// Resetando o form
				this.$form.reset();

				// Mostrando mensagem
				var action = this.$form.is( '.comment-item' ) ? 'edited' : 'sibmited';
				this.setStatus( 'success', 'Your comment has been '+ action +' successfully' );
			
			},

			// Mostrando o status
			setStatus : function( status, message ){
				this.$status
					.removeClass( 'error success alert' )
					.addClass( status )
					.stop( true, true )
					.hide()
					.html( message )
					.fadeIn( 'medium' )
				;
			},

			// Tornando comentário editável
			makeEditable : function( $comment, $button ){

				$button.text( 'Salvar' );

				if( $comment.is( '.editing' ) ){
					return;
				}
				$comment.addClass( 'editing' );

				var $content = $( '.comment-content', $comment );
				
				var $editfield = $( '.content-edit-field', $comment );
				if( !$editfield.length ){
					$editfield = $( '<div class="content-edit-field"><textarea id="contnet-'+ $comment.attr( 'id' ) +'">'+ $content.text() +'</textarea></div>' ).insertAfter( $content ).hide();
				}

				//$( '.pikilike-box', $comment ).fadeOut();
				$content.slideUp( 300 );
				$editfield.slideDown( 450 );

			},

			editSuccess : function( $comment, jSon ){
				
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

			},

			// Box de status
			statusBox : function(){

				// Se já existe
				if( this.$status !== false ) return this.$status;

				// Statusbox
				this.$status = $( '<div class="status"></div>' ).hide();
				// Button
				this.$button = $( '#submit', this.$form );
				// Footer
				this.$footer = $( '.comment-footer', this.$form );
				// Insert after submit
				if( !this.$footer.length ){
					this.$status.insertAfter( this.$button );
				}
				// Insert in footer
				else {
					this.$status.appendTo( $footer );
				}
				// Return status
				return this.$status;

			}

		};
	}();
	Comments.main();

})(jQuery);