(function($){

	// Galeria de imagens
	$.fn.PikiImages = function( method, arg1, arg2 ) {
		return this.each(function(){
			
			var $this = $( this );
			var data = $this.data( 'PikiImages' );		
			
			if( method == undefined ) method = 'configure';
			if( method == 'configure' && data != undefined ){ return; } 
			
			switch( method ){
				
				// Configuração inicial
				case 'configure':

					// Data
					data = {
						wrapper : $this,
						button : $( 'input#field_images_rebuild' ),
						table : $( 'table.wp-list-table', $this ),
						list : $( 'table.wp-list-table tbody', $this ),
						posts : false,
						status : $( '.status', $this ),
						currentPost : false
					};
					$this.data( 'PikiImages', data );

					data.typeSelect = $( '#piki_images_post_type', $this );

					data.button.on( 'click', function(event){
						
						event.preventDefault();

						// Valida
						if( data.typeSelect.val() === '' ){
							alert( 'Selecione um tipo de Post!' );
							return;
						}
						
						// Clicado
						if( data.button.is( '.loading' ) ) return;
						$.fn.pikiLoader();
						
						// Evita duplos cliques
						data.button.addClass( 'loading' ).prop( 'disabled', true ).removeClass( 'button-primary' );
						
						// Mostra o status
						$this.PikiImages( 'setStatus', 'loading', 'Buscando posts com imagens' );
						
						// Busca os posts que precisam ser analisados
						$this.PikiImages( 'retrivePosts', 1 );
					
					});

				break;

				// Recupera os posts que serão atualizados
				case 'retrivePosts':
						
					// Faz a busca
					$.ajax({
						type : 'POST',
						dataType : 'JSON',
						url: ajaxurl,
						data : {
							'action': 'piki_images_to_rebuild',
							'post_type': data.typeSelect.val(),
							'paged' : arg1
						}
					}).done( function( response ) {


						console.info( 'response' );
						console.log( response );
						
						// Erro
						if( response.status == 'error' ) {
							alert( 'Aconteceu um erro inesperado. Consulte o administrador do sistema.' );
							return;
						}
						// Se não existem posts para análise
						if( response.status == 'no_fields' || response.status == 'no_posts' ) {
							$this.PikiImages( 'setStatus', 'success', response.message );
							return;
						}
						
						// Mostra os posts
						$this.PikiImages( 'insertPosts', response.posts );
						
						// Se houverem mais posts, buscamos
						if( response.next_page ){
							$this.PikiImages( 'retrivePosts', response.next_page );
						}
						// Inicia a geração das imagesn
						else {
							
							// Lista de posts
							data.posts = data.list.children( 'tr' );
							
							$this.PikiImages( 'setStatus', 'loading', 'Analisando post <strong class="actual-key">1</strong> de <strong class="total-posts">'+ data.posts.length +'</strong>' );

							$.fn.pikiLoader( 'close' );
							// Se não há mais posts, finaliza o processo
							if( data.posts.length == 0 ){
								$this.PikiImages( 'setStatus', 'success', 'Nenhuma imagem a ser gerada.' );
							}
							else{
								$this.PikiImages( 'proccessQueue' );
							}

						}

					});

				break;

				// Insere os posts na lista
				case 'insertPosts':
					data.table.show();
					$.each( arg1, function( i ){
						var new_row = $( '<tr class="pending '+ ( (i % 2) ? 'alternate' : '' ) +'" post-id="'+ this.ID +'"  post-type="'+ this.post_type +'"></tr>' ).data( 'post', this ).appendTo( data.list );
						new_row.append( '<td>'+ this.ID +'</td><td>'+ this.post_title +'</td><td class="report"><span></span>Pendente</td>' );
					});
				break;

				case 'proccessQueue':

					$next = data.posts.filter( '.pending' ).first();
					if( $next.length ){
						data.currentPost = $next;
						$this.PikiImages( 'proccessPost' );
					}
					else{
						alert( 'Todas as imagens foram geradas com sucesso.' );
						data.button.removeClass( 'loading' ).prop( 'disabled', false ).addClass( 'button-primary' );
					}

				break;

				// Processa um post
				case 'proccessPost':
					
					data.currentPost.removeClass( 'pending' ).addClass( 'proccessing' );
					data.currentPost.children( 'td.report' ).html( '<span></span>Processando Post' );

					// Atualiza o contador
					var $counter = data.status.find( 'strong.actual-key' ).first();
					$counter.html( parseInt( $counter.html() ) + 1 );

					// Submete o processamento do post
					$.ajax({
						type : 'POST',
						dataType : 'JSON',
						url: ajaxurl,
						data : {
							'action' : 'piki_images_proccess_post',
							'post_id' : data.currentPost.attr( 'post-id' ),
							'post_type' : data.currentPost.attr( 'post-type' )
						}
					}).done( function( response ) {
						// Erro
						if( response.status == 'error' ) {
							alert( 'Aconteceu um erro inesperado. Consulte o administrador do sistema.' );
							return;
						}
						// Muda o status do post processado
						$this.PikiImages( 'finalizePost', data.currentPost );
						// Segue o processamento dos posts
						$this.PikiImages( 'proccessQueue' );
					});


				break;

				case 'finalizePost':
					var $post = arg1;
					$post.removeClass( 'proccessing' ).addClass( 'processed' );
					$post.children( 'td.report' ).html( '<span></span>Imagens processadas' );
					$post.delay( 1000 ).slideUp( 300, function(){
						$( this ).remove();
					});
				break;

				// Mudando o status
				case 'setStatus':
					data.status.removeClass( 'error success normal' ).addClass( arg1 ).html( arg2 ).slideDown();
				break;

			}
		});
	};


	$(function(){
		$( '#pikiforms_images_rebuild' ).PikiImages();
	});

})(jQuery);