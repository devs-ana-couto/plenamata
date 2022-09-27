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

			var _body = $( 'body' );

			data = {
				_ : field,
				$ : field.$,
				// Target
				target : field.$.children( 'input.ftype-posts-inside' ),
				// ID do post pai
				parentID : field.$.parents( 'form' ).first().find( 'input#post_ID' ).val(),
				// Type do post pai
				parentType : field.$.parents( 'form' ).first().find( 'input#post_type' ).val(),
				// Chave do formulário
				form_key : $( '.field-form-key', field.$ ).first().val(),
				// Nome do campo
				name : $( '.field-name', field.$ ).first().val(),
				// Ítems já inseridos
				items : $( '.posts-list', field.$ ).first(),
				// Model
				itemModel: $( '.posts-list .model', field.$ ),
				// Max
				maxItems : field.$.data( 'max-items' ),
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
				modal : false,

			};
			field.$.data( 'PostField', data );

			// Max items
			PostField.Select.checkTotal( data );

			// Bind insert click
			data.insert.off( 'click' ).on( 'click', function( event ){
				event.preventDefault();
				PostField.openModalForm( data );
			});

			_body.off( 'click' ).on( 'click', 'button[data-action]', function(e){
				
				e.preventDefault();
				this.$ = this.$ || $( this );

				var fieldData = this.$.parents( '.field-posts-wrapper' ).first().data( 'PostField' );

				var
					action = this.$.data( 'action' ),
					$item = this.$.parents( '.post-item' ).first();
				;

				// Evento dos botões de edição de ítem
				if( action === 'edit-post-inside' ){
					PostField.openModalForm( fieldData, $item );
				}
				// Evento dos botões de remoção de ítem
				else if( action === 'remove-post-inside' ){
					PostField.removeItem( fieldData, $item );
				}
				// Apagar ítem do sistema
				else if( action === 'delete-post-inside' ){
					PostField.deleteItem( fieldData, $item );
				}

			});

			// Ordenação
			data.items.sortable({
				update: function( event, ui ){
					PostField.setOrder( data );
				}
			});

			PostField.Select.init( data );
			
			// Botão de adição do footer
			PostField.checkStructure( data );
			
		},

		getTotalItems : function( data ){
			return data.items.find( '.post-item' ).length;
		},

		// Set IDs order
		setOrder : function( data ){

			var $items = data.items.children( 'li.post-item' );
			if( !$items.length ) return;

			var vals = [];
			$items.each(function(){
				this.$ = this.$ || $( this );
				vals.push( this.$.children( 'input' ).val() );
			});

			data.target.val( vals.join( ',' ) );

		},

		toggleSelectionItem : function( data, el ){

			if( el.$.hasClass( 'selected' ) ){
				el.$.removeClass( 'selected' );
			}
			else if( !el.$.hasClass( 'disabled' ) ) {
				el.$.addClass( 'selected' );
			}

			// Check button
			var items = $( '.piki-modal.postsfield .posts-list li.selected' );
			var button = $( '.piki-modal.postsfield button[data-action="do-select"]' );

			// Control select button
			button.prop( 'disabled', !items.length );

			// Max items
			if( data.maxItems ){
				var others = $( '.piki-modal.postsfield .posts-list li:not(.selected)' );
				if( items.length >= data.maxItems ){
					others.addClass( 'disabled' );
				}
				else {
					others.removeClass( 'disabled' );
				}
			}

		},

		// Controla quando o botão de adição do final da lista deve aparecer
		checkStructure : function( data ){
			
			if( data.items.children( 'li' ).length > 1 ){
				data.footer.show();
				data.items.show();
			}
			else {
				data.footer.hide();
				data.items.hide();
			}

			PostField.Select.checkTotal( data );

		},

		// Abre o modal do formulário do post
	  	openModalForm : function( data, $item ){

			var args = {
				action : 'piki_field_ajax',
				field_type : 'posts_inside',
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
			
			$.ajax({
				method: 'POST', 
				url : ajaxurl,
				data : args
			})
			.done(function( response ) {
					
				$.fn.pikiLoader( 'close' );

				// Se o retornno for jSon, mostramos o erro
				if( typeof response == 'object' ){
					Message.open( response.error_message );
					console.log( "response:" );
					console.log( response );
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

							PostField.insertValue( data, response.post.ID );

							var $newItem = data.items.children( '.model' ).clone();
							$( '.title', $newItem ).html( response.post.post_title );
							$( 'input.item-id', $newItem ).val( response.post.ID );
							$newItem.removeClass( 'model' ).addClass( 'post-item' ).hide().appendTo( data.items ).slideDown( 300 );
						
						}					
						
						// Botão de adição do footer
						PostField.checkStructure( data );
						
						// Feacha a modal
						data.modal.Modal( 'close' );
					
					};

					PostField.responseForm( data, response, callback );

				}
				

			})
			.fail(function( jqXHR, textStatus ){

				$.fn.pikiLoader( 'close' );

			  	Message.open( 'Problema ao recuperar Form: ' + textStatus );
			
			});

	  	},

	  	insertValue : function( data, value ){

	  		var newVal = data.target.val().split( ',' );
	  		newVal.push( value );
	  		data.target.val( newVal );

	  	},

	  	removeValue : function( data, value ){

	  		var actual_values = data.target.val();
	  		if( actual_values === '' ) return;

	  		var values = actual_values
	  			.split( ',' )
	  			.filter(
	  				function( id, index, arr ){ 
	  					return parseInt( id ) !== parseInt( value );
	  				} 
	  			)
	  			.join( ',' )
	  		;

	  		data.target.val( values );

	  	},

	  	responseForm : function( data, response, finishCallback ){

			var $actual = $( '#pikiform-postfield-modal' );
			if( $actual.length ) $actual.remove();

			var $response = $( '<div>' + response + "</div>" );
			data.modal = $response.children( '#pikiform-postfield-modal' );
			data.modal.children( '.form-header' ).hide();

			data.modal.appendTo( 'body' );
			data.modal.children( 'form' ).PikiForm({
				finishCallback : finishCallback						
			});

			data.modal.Modal({
				className : 'postsfield wp-core-ui',
				width : '800',
				height : '600',
				title: data.insert.first().attr( 'title' ),
				onClosed : function( data ){
					TextareaField.removeEditors( data.modal );
				}
			});
	  	
	  	},

	  	Select : {

	  		init : function( data ){

				data.select.off( 'click.psbind' ).on( 'click.psbind', function( event ){
				
					event.preventDefault();
				
					// Max items
					var total = PostField.getTotalItems( data );
					if( !data.maxItems || total < data.maxItems ){
						PostField.Select.enable( data );
						PostField.Select.open( data );
					}
					else {
						PostField.Select.disable( data );
					}

				});

				// Selection
				_body.off( 'click.tgsel' ).on( 'click.tgsel', '.posts-field-selection li', function(){
				
					this.$ = this.$ || $( this );

					var field_name = this.$.parents( '.posts-field-selection' ).data( 'field-name' );
					var $field = $( 'div.ftype-posts-inside[data-machine-name="' + field_name + '"] .field-posts-wrapper' );
					var data  = $field.data( 'PostField' );

				 	PostField.toggleSelectionItem( data, this );
				
				});

				_body.off( 'click.tgsel2' ).on( 'click.tgsel2', '.posts-field-selection button[data-action="do-select"]', function(){

					this.$ = this.$ || $( this );
				
					var field_name = this.$.data( 'field-name' );
					var $field = $( 'div.ftype-posts-inside[data-machine-name="' + field_name + '"] .field-posts-wrapper' );
					var data  = $field.data( 'PostField' );

					PostField.Select.selectItems( data );
				
				});


	  		},

	  		// Check total ítems
	  		checkTotal : function( data ){
				
				const totalItems = PostField.getTotalItems( data );
				if( data.maxItems && totalItems >= data.maxItems ){
					PostField.Select.disable( data );
				}
				else {
					PostField.Select.enable( data );
				}
	  		
	  		},

	  		disable : function( data ){
	  			data.select.prop( 'disabled', true );
	  			data.$.addClass( 'selection-disabled' );
	  		},

	  		enable : function( data ){
	  			data.select.prop( 'disabled', false );
	  			data.$.removeClass( 'selection-disabled' );
	  		},

		  	selectItems : function( data ){

		  		var selecteds = $( '.posts-field-selection li.selected' );
		  		if( !selecteds.length ) return true;

		  		selecteds.each(function(){

		  			this.$ = this.$ || $( this );

					// Feacha a modal
					data.selectbox.$.Modal( 'close' );
		  			
		  			var 
		  				ID = this.$.data( 'id' ),
		  				title = this.$.children( 'strong' ).text()
		  			;

		  			PostField.createItemList( data, ID, title );

		  		});

		  	},

	  		open : function( data ){

		  		$.fn.pikiLoader();

				$.ajax({
					method: 'POST', 
					url : ajaxurl,
					data : {
						action : 'piki_field_ajax',
						field_type : 'posts_inside',
						field_action : 'get_selection',
						form_key : data.parentType,
						parent_id : data.parentID,
						field_name : data.name,
						actual_ids : data.target.val(),
					}
				})
				.done(function( response ) {
						
					$.fn.pikiLoader( 'close' );

					// Se o retornno for jSon, mostramos o erro
					if( typeof response == 'object' ){

						var Report;
						if( response.items !== undefined ){
							Report = 'Nenhum post disponível para seleção.';
						}
						else {
							Report = response.error_message;
						}

						Message.open( Report );
					
					}
					// Mostra o formulário
					else{
						PostField.Select.createModal( data, response );
					}
					
				})
				.fail(function( jqXHR, textStatus ){
					$.fn.pikiLoader( 'close' );
				  	Message.open( 'Problema ao recuperar Form: ' + jqXHR.responseText );
				});

	  		},

		  	createModal : function( data, response ){

				// Removendo o formulário existente
				var $actual = $( '.piki-modal.postsfield' );
				if( $actual.length ) $actual.remove();

				// Create new modal
				data.selectbox = {
					$ : $( response ).appendTo( 'body' )
				};
				// Items list wrapper
				data.selectbox.$list = data.selectbox.$.children( '.posts-list' ).first();
				// Footer
				data.selectbox.$footer = data.selectbox.$.children( 'footer' ).first();

				// Filter
				//PostField.Select.initFilters( data );

				// Pager
				PostField.Select.checkPager( data );

				// Open modal
				data.selectbox.$.Modal({
					className : 'postsfield wp-core-ui',
					width : '800',
					height : '600',
					keepVisible : true,
					title: data.select.first().attr( 'title' )
				});

				data.$.data( 'PostField', data );

		  	},

		  	initFilters : function( data ){

		  		data.selectbox.$header = data.selectbox.$.children( 'header' );
		  		if( !data.selectbox.$header.length ) return;

		  		data.selectbox.filters = {
		  			$ : data.selectbox.$header,
		  			$trigger : data.selectbox.$header.children( 'button[data-action="do-filter"]' ),
		  		};
		  		
		  		// Filters
		  		data.selectbox.filters.$fields = data.selectbox.filters.$.children( '.linha-field' ).find( 'input,select' );

		  		// Last filter
		  		data.selectbox.filters.lastFilter = data.selectbox.filters.$.find( 'input,select' ).serialize();

		  		// Enter on search field
		  		data.selectbox.filters.$.find( 'input#nome' ).off( 'keypress.psbind' ).on( 'keypress.psbind', function(e){
		  			if( e.keyCode == 13 ){{
		  				PostField.Select.bindFilterSend( data );
		  			}}
		  		});
		  		data.selectbox.filters.$trigger.off( 'click.psbind' ).on( 'click.psbind', function(e){
		  			event.preventDefault();
		  			PostField.Select.bindFilterSend( data );
		  		});

		  	},

		  	bindFilterSend : function( data ){

		  		var _query = data.selectbox.filters.$.find( 'input,select' ).serialize();

		  		if( _query === data.selectbox.filters.lastFilter ){
		  			return;
		  		}
		  		else {
		  			data.selectbox.filters.lastFilter = _query;
			  		PostField.Select.requireItems( data, false, true );
		  		}
		  	
		  	},

		  	getFilters : function( data ){

		  		var _filters = {};

		  		data.selectbox.filters.$fields.each(function(){
		  			this.$ = this.$ || $( this );
		  			_filters[ this.$.attr( 'name' ) ] = this.$.val();
		  		});

		  		return _filters;

		  	},

		  	clearFilters : function( data ){
		  		
		  		data.selectbox.filters.$fields.val( '' );
		  		data.selectbox.filters.lastFilter = data.selectbox.filters.$fields.serialize();

		  		PostField.Select.requireItems( data, false, true );
		  	
		  	},

		  	checkPager : function( data ){

		  		if( data.selectbox.$pager !== undefined ){
		  			data.selectbox.$pager.remove();
		  		}

		  		var
		  			totalItems = data.selectbox.$.data( 'total-items' ),
		  			itensPerPage = data.selectbox.$.data( 'items-per-page' )
		  		;
		  		if( totalItems <= itensPerPage ) return;

	            // Locator for pager
	            var locator = [];
	            for( var i = 1; i <= totalItems; i++ ){
	                locator.push(i);
	            }

	            // Pager
	            var _id = '_' + Math.random().toString( 36 ).substr( 2, 9 );          
	            data.selectbox.$pager = $( '<div id="' + _id + '" class="tablenav-pages pager"></div>' ).appendTo( data.selectbox.$footer );
	            data.selectbox.$pager.pagination({ 
	                dataSource: locator,
	                totalNumber: totalItems,
	                pageSize: itensPerPage,
	                pageRange: 1,
	                prevText : '‹',
	                nextText : '›',
	                triggerPagingOnInit : false,
	                callback: function( _data, pager ){	
	                   	PostField.Select.requireItems( data, pager.pageNumber );
	                }
	            });

		  	},

	  		requireItems : function( data, page, resetPager ){

	  			Loader();

				$.ajax({
					method: 'POST', 
					url : ajaxurl,
					data : {
						action : 'piki_field_ajax',
						field_type : 'posts_inside',
						field_action : 'get_items',
						form_key : data.parentType,
						field_name : data.name,
						actual_ids : data.target.val(),
						//filters : PostField.Select.getFilters( data ),
						page : page
					}
				})
				.done(function( response ){

					data.selectbox.$.data( 'total-items', response.total_items );

					if( resetPager !== undefined ){
						PostField.Select.checkPager( data );
					}

					if( !response.content ){

						Message.open({
							classname : 'alert',
							title: 'Ops!',
							message: 'Nenhum resultado para estes filtros.',
							buttons : [
								{
									classname : 'button button-primary add',
									label : 'Limpar filtros',
									callback : function(){
										PostField.Select.clearFilters( data );
									}
								},
								{
									classname : 'button',
									label : 'Fechar',
								}
							]
						});
					}
					else {

						if( page < 2 ){
							data.selectbox.$list.html( response.content ).show();
						}
						else {
							data.selectbox.$list.stop( true, true ).fadeOut( 100, function(){
								data.selectbox.$list
									.html( response.content )
									.fadeIn( 200, function(){
										data.selectbox.$list.scrollTo( 0 );
									});
								;
							});
						}

					}

					Loader( 'close' );
				
				})
				.fail(function( jqXHR, textStatus ){

					Loader( 'close' );
				  	Message.open( 'Problema ao recuperar ítems: ' + textStatus );

				  	console.info( "jqXHR" );
				  	console.log( jqXHR );
				  	
				});

	  		}

	  	},
	  	removeEditors : function(){

	  		if ( tinymce === undefined ){
	  			return;
	  		}

			$editors_wrapers = $( '.piki-modal .ftype-textarea-editor-wrapper' );
			if( !$editors_wrapers.length ){
				return;
			}

			$editors_wrapers.each(function(){

			});
			
	  	},

		// Remove list item
	  	removeItem : function( data, $item ){
			PostField.removeItemFromList( data, $item );
	  	},

	  	deleteItem : function( data, $item ){

			Message.open({
				title: 'Apagar ítem',
				message : 'Deseja mesmo apagar este ítem do sistema? <br>Esta operação não poderá ser desfeita futuramente.',
				classname : 'postsfield-warning',
				buttons : [
					{
						label: 'Não',
						classname: 'button button-primary button-large'
					},
					{
						label : 'Sim',
						classname: 'button button-primary button-large danger',
						callback: function(){
							PostField.doDdeleteItem( data, $item );
						}
					},
				]
			}); 

	  	},

	  	doDdeleteItem : function( data, $item ){
	  		
	  		$.fn.pikiLoader();

	  		var post_ID = $( 'input.item-id', $item ).val();

			var args = {
				action : 'piki_field_ajax',
				field_type : 'posts_inside',
				field_action : 'remove_item',
				field_name : data.target.data( 'machine-name' ),
				parent_id : data.parentID,
				post_id : post_ID
			};
			$.post( ajaxurl, args, function( response ) {
				
				$.fn.pikiLoader( 'close' );
				
				// Erro inesperado
				if( typeof response != 'object' ){
					Message.open({
						title: 'Ops!',
						message: response
					});
				}
				
				// Erro reportado
				else if( response.status == 'error' ){

					Message.open({
						title: 'Ops!',
						message: response.error_message
					});
				
				}
				else {
					// Remove list item
					PostField.removeItemFromList( data, $item );
				}
						
			});
	  	
	  	},

	  	// Create item list
	  	createItemList : function( data, ID, title ){
			
			PostField.insertValue( data, ID );

			var $newItem = data.itemModel.clone();
			$( 'input.item-id', $newItem ).val( ID );
			$( '.title', $newItem ).html( title );
			
			// Show item
			$newItem
				.removeClass( 'model' )
				.addClass( 'post-item' )
				.hide()
				.appendTo( data.items )
				.slideDown( 300 )
			;

			PostField.checkStructure( data );
			
	  	},

	  	removeItemFromList : function( data, $item ){

	  		// Post ID
	  		var post_ID = $item.find( 'input.item-id' ).val();

	  		// Remove value
			PostField.removeValue( data, post_ID );
					
			// Remove list item
			$item.slideUp( '300', function(){

				// Do delete finish
				$( this ).remove();
			
				// Botão de adição do footer
				PostField.checkStructure( data );
			
			});

	  	}

	};

})(jQuery);
