(function($){

	// Galeria de imagens
	$.fn.PKDummy = function( method, arg1, arg2 ) {
		return this.each(function(){
			
			var $this = $( this );
			var data = $this.data( 'PKDummy' );		
			
			if( method == undefined ) method = 'configure';
			if( method == 'configure' && data != undefined ){ return; } 
			
			switch( method ){
				
				// Configuração inicial
				case 'configure':

					if( !$( 'body' ).hasClass( 'piki_page_piki-dummys' ) ){
						return false;
					}

					// Data
					data = {
						wrapper : $this,
						button : $( 'input#field_dummys_build' ),
						posts : false,
						status : $( '.status', $this ),
						currentPost : false
					};
					$this.data( 'PKDummy', data );

					data.typeSelect = $( '#piki_dummys_post_type', $this );
					data.total = $( '#piki_dummys_total', $this );

					data.button.on( 'click', function( event ){
						
						event.preventDefault();

						// Valida
						if( data.typeSelect.val() === '' ){
							alert( 'Selecione um tipo de Post!' );
							return;
						}
						
						// Clicado
						if( data.button.is( '.loading' ) ) return;
						
						/// Evita duplos cliques
						data.button.addClass( 'loading' ).prop( 'disabled', true ).removeClass( 'button-primary' );
						
						// Mostra o status
						$this.PKDummy( 'setStatus', 'loading', 'Gerando conteúdo' );
						
						// Busca os posts que precisam ser analisados
						$this.PKDummy( 'generateContent' );
					
					});

					$( 'form' ).on( 'submit', function(e){ 
						e.preventDefault();
						data.button.trigger( 'click' );
					});

				break;

				// Recupera os posts que serão atualizados
				case 'generateContent':
						
					// Faz a busca
					$.ajax({
						type : 'POST',
						dataType : 'JSON',
						url: ajaxurl,
						data : {
							'action': 'piki_dummys_generate',
							'post_type': data.typeSelect.val(),
							'total': data.total.val()
						}
					}).done( function( response ){
						// Set status
						if( response.status == 'error' ){
							$this.PKDummy( 'setStatus', 'error', 'Aconteceu um erro inesperado. Consulte o administrador do sistema.' );
						}
						else {
							data.typeSelect.val( '' );
							$this.PKDummy( 'setStatus', 'success', 'Conteúdo gerado com sucesso.' );
						}
						/// Libera botão
						data.button.removeClass( 'loading' ).prop( 'disabled', false ).addClass( 'button-primary' );
					});

				break;

				// Mudando o status
				case 'setStatus':

					data.status.removeClass( 'error success normal loading' ).addClass( arg1 ).html( arg2 ).slideDown();
				
				break;

			}
		});
	};


	$(function(){
		$( '#pikiforms_dummys_build' ).PKDummy();
	});

})(jQuery);