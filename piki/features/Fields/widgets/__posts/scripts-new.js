// Starting fields
PikiFields.add( 'window.startPostsField' );

var PostField;

(function($){

	window.startPostsField = function(){
		$( '.field-posts-wrapper' ).each(function(){
			PostField.configure( this );
		});
	}

	PostField = {

		// Configura
		configure : function( field ){

			field.$ = field.$ || $( field );

			var data = field.$.data( 'PostField' );
			if( data !== undefined ) return true;

			data = {
				_ : field,
				$ : field.$,
				// ID do post pai
				parentID : field.$.parents( 'form' ).first().find( '#post_ID' ).val(),
				// Chave do formulário
				form_key : $( '.field-form-key', field.$ ).first().val(),
				// Nome do campo
				name : $( '.field-name', field.$ ).first().val(),
				// Ítems já inseridos
				items : $( '.posts-list', field.$ ).first(),
				// Header and footer
				header : field.$.children( 'header' ),
				footer : field.$.children( 'footer' ),
				// Botões de adição
				insert : $( 'button[data-action="insert"]', field.$ ),
				// Botões de adição
				select : $( 'button[data-action="select"]', field.$ ),
				// Current ítem
				current_item : false,
				// Modal
				modal : false

			};
			
			data.insert.on( 'click', function( event ){
				event.preventDefault();
				PostField.openModalForm( data );
			});
			
			data.select.on( 'click', function( event ){
				event.preventDefault();
				PostField.openModalSelect( data );
			});
			
			// Evento dos botões de edição de ítem
			data.$.on( 'click', 'input.edit', function( event ){
				event.preventDefault();
				this.$ = this.$ || $( this );
				var $item = this.$.parents( '.post-item' ).first();
				PostField.openModalForm( data, $item );
			});
			
			// Evento dos botões de remoção de ítem
			field.$.on( 'click', 'input.remove', function( event ){
				event.preventDefault();
				this.$ = this.$ || $( this );
				var $item = this.$.parents( '.post-item' ).first();
				PostField.removeItem( data, $item );
			});
			
			// Ordenação
			data.items.sortable();
			
			// Botão de adição do footer
			PostField.checkFooter( data );
			
		},

		// Controla quando o botão de adição do final da lista deve aparecer
		checkFooter : function( data ){
			if( data.items.children( 'li' ).length > 1 ){
				data.footer.show();
				data.items.show();
			}
			else {
				data.footer.hide();
				data.items.hide();
			}
		},

		// Adicionar novo ítem
	  	addNew : function( data ){

			var args = {
				action : 'piki_field_ajax',
				field_type : 'posts',
				field_action : 'get_post_form',
				post_parent : data.parentID,
				form_key : data.form_key,
				field_name : data.name
			};

			$.fn.pikiLoader();
			
			$.post( ajaxurl, args, function( response ) {
				
				$.fn.pikiLoader( 'close' );

				// Se o retornno for jSon, mostramos o erro
				if( typeof response === 'object' ){
					Message.open( response.error_message );
				}
				
				// Mostra o formulário
				else{

					var callback = function( $form, response ){
							
						// Novo ítem na lista
						var $newItem = field.items.children( '.model' ).clone();

						$( '.title', $newItem ).html( response.post.post_title );
						$( 'input.post-id', $newItem ).val( response.post.ID );
						$newItem.removeClass( 'model' ).addClass( 'post-item' ).hide().prependTo( data.items ).slideDown( 300 );
						
						// Botão de adição do footer
						PostField.checkFooter( data );

						// Feacha a modal
						data.modal.Modal( 'close' );
					
					};
					
					PostField.responseForm( data, response, callback );
				
				}
				
			});	
	  	
	  	},

		// Abre o modal do formulário do post
	  	openModalForm : function( data, $item ){

			var args = {
				action : 'piki_field_ajax',
				field_type : 'posts',
				field_action : 'get_post_form',
				post_parent : data.parentID,
				form_key : data.form_key,
				field_name : data.name
			};

			// Item
			if( $item !== undefined && $item.length ){
				args.post_id = $( 'input.item-id', $item ).val();
				data.current_item = $item;
			}
			else {
				args.post_id = false;
				data.current_item = false;
			}

			$.fn.pikiLoader();
			
			$.post( ajaxurl, args, function( response ) {
				
				$.fn.pikiLoader( 'close' );

				// Se o retornno for jSon, mostramos o erro
				if( typeof response == 'object' ){
					console.log( "response:" );
					console.log( response );
					$.fn.pikiAlert( response.error_message );
				}
				
				// Mostra o formulário
				else{

					// Removendo o formulário existente
					var $actual = $( '#pikiform-postfield-modal' );
					if( $actual.length ) $actual.remove();

					var callback = function( $form, response ){
						
						// Edição
						if( data.current_item ) {
						
							data.current_item.slideUp( 200, function(){
								this.$ = this.$ || $( this );
								$( '.title', data.current_item ).html( response.post.post_title );
								this.$.slideDown( 300 );
							});
						
						}
						
						// Novo ítem na lista
						else {
							var $newItem = data.items.children( '.model' ).clone();
							$( '.title', $newItem ).html( response.post.post_title );
							$( 'input.item-id', $newItem ).val( response.post.ID );
							$newItem.removeClass( 'model' ).addClass( 'post-item' ).hide().prependTo( data.items ).slideDown( 300 );
						}					
						
						// Botão de adição do footer
						PostField.checkFooter( data );
						
						// Feacha a modal
						data.modal.Modal( 'close' );
					
					};

					PostField.responseForm( data, response, callback );

				}
				
			});	

	  	},

	  	responseForm : function( data, response, finishCallback ){

			var $actual = $( '#pikiform-postfield-modal' );
			if( $actual.length ) $actual.remove();
			
			data.modal = $( response );
			data.modal.children( '.form-header' ).hide();

			data.modal.appendTo( 'body' );
			data.modal.children( 'form' ).PikiForm({
				finishCallback : finishCallback						
			});

			data.modal.Modal({
				dialogClass : 'postsfields wp-core-ui',
				modal : false,
				width : '800',
				height : '600',
				draggable : false,
				resizable : false,
				title: 'Teste de título',
				afterClose : function( data ){
					field.removeEditors();
				}
			});
	  	},

	  	removeEditors : function(){

	  		if ( tinymce === undefined ){
	  			return;
	  		}

			$editors_wrapers = data.modal.find( '.wp-editor-wrap' );
			if( !$editors_wrapers.length ){
				return;
			}

			$editors_wrapers.each(function(){

				this.$ = this.$ || $( this );

				var $field = $( 'textarea', this.$ );
				var field_id = $field.attr( 'id' );

				for ( var i = tinymce.editors.length - 1 ; i > -1 ; i-- ) {

					var ed = tinymce.editors[ i ];

					if( ed.id === field_id ){

			            try {
			                var oldLength = tinymce.editors.length;
					        tinymce.remove( ed );
					        if ( oldLength == tinymce.editors.length ){
					            tinymce.editors.remove( ed );
					        }
			            } catch (err) {
			            	console.log( err );
			            }

					}
				
				}

			});
			
	  	},

	  	removeItem : function( data, $item ){

			var $confirm = $( '#postfield-confirm' );
			if( !$confirm.length ){
				$confirm = $( '<div id="postfield-confirm" title="Remover ítem?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Esta operação não poderá ser desfeita futuramente.</p></div>' );
			}

		    $confirm.dialog({
				resizable: false,
				width: 300,
				height: 190,
				modal: true,
				buttons: {
					'Sim' : function() {
						PostField.doRemoveItem( data, $item );
						$( this ).dialog( "close" );
					},
					'Não' : function() {
						$( this ).dialog( "close" );
					}
				}
			});

	  	},

	  	doRemoveItem : function( data, $item ){
	  		
	  		$.fn.pikiLoader();

			var args = {
				action : 'piki_field_ajax',
				field_type : 'posts',
				field_action : 'remove_item',
				post_id : $( 'input.item-id', $item ).val()
			};
			$.post( ajaxurl, args, function( response ) {
				
				$.fn.pikiLoader( 'close' );
				
				// Erro inesperado
				if( typeof response != 'object' ){
					$.fn.pikiAlert( response );
				}
				
				// Erro reportado
				else if( response.status == 'error' ){
					$.fn.pikiAlert( status.error_message );
				}
				
				// Sucesso
				$item.slideUp( '300', function(){
					$( this ).remove();
					// Botão de adição do footer
					PostField.checkFooter( data );
				});
						
			});
	  	}

	};

})(jQuery);
