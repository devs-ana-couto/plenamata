PikiFields.add( 'window.startFieldset' );

(function($){

	var _body = $( 'body' );

	window.startFieldset = function(){
		Fieldset.init();
	}

	var Fieldset = {

		// Initing
		init : function(){
			$( '.linha-field.ftype-fieldset' ).each(function(){
				Fieldset.configure( this );
			});
		},

		// Configure fieldset field
		configure : function( fset ){

			fset.$ = fset.$ || $( fset );

			// Check if just configured
			var data = fset.$.data( 'Fieldset' );
			if( data !== undefined ) return data;

			data = {
				// Self
				_ : fset,
				$ : fset.$,
				// Field ID
				field_id : fset.$.attr( 'rel' ),
				// If fieldset is multiple
				isMultiple : fset.$.hasClass( 'multiple' ),
				// Maximum of rows
				maximo : fset.$.attr( '--maximo' ) === undefined ? 0 : parseInt( fset.$.attr( '--maximo' ) ),
				// Minimum of rows
				minimo : fset.$.attr( '--minimo' ) === undefined ? 1 : parseInt( fset.$.attr( '--minimo' ) ),
				// Initial openeds items number
				abertos : fset.$.attr( '--abertos' ) === undefined ? 0 : parseInt( fset.$.attr( '--abertos' ) ),
				// Form
				$form : fset.$.parents( 'form' ).first(),
				// Fieldset rows
				$rows : fset.$.children( '.field-item' ).children( '.fieldset-group-fields' ),
				// ID of metabox
				metabox_id : fset.$.data( 'metabox-id' ),
				// If request confimation on delete
				deleteAlert : fset.$.data( 'delete-alert' ),
				// No rows labels
				noLabels : fset.$.data( 'no-labels' ) !== undefined,
				// Check if is moving								
				moving : false,
				// Add button field
				add_button : false,
			};
			// Others
			data.$post_id = $( 'input[name="post_ID"]', data.$form );
			data.$item_id = $( 'input[name="item_id"]', data.$form );
			data.form_id = $( 'input[name="form_id"]', data.$form ).val();
			data.form_key = $( 'input[name="form_key"]', data.$form ).val();
			data.form_style = $( 'input[name="form_style"]', data.$form ).val();
			data.form_state = $( 'input[name="form_state"]', data.$form ).val();
			data.addLabel = data.$rows.data( 'add-label' ) === undefined ? 'Adicionar' : data.$rows.data( 'add-label' );
			
			// Consolidate
			if( data.minimo === 0 ) data.minimo = 1;
			
			fset.$.data( 'Fieldset', data );

			if( data.isMultiple ){
				this.makeMultiple( data );
			}

		},

		// Set fieldset as multiple
		makeMultiple : function( data ){

			// Actualize rows data
			Fieldset.actualizeRows( data );

		},

		// Actualize rows data
		actualizeRows : function( data ){
				
			// Linhas do fieldset
			data.$rows = data.$.children( '.field-item' ).children( '.fieldset-group-fields' ).not( '.deleted' );
			
			// Número de linhas
			data.total_rows = data.$rows.length;
			
			// Realinha os índices
			Fieldset.realignIndexes( data);
			
			// Realinha os botões
			Fieldset.alignButtons( data );

			// Trigger events
			data.$.trigger( 'actualize' );

		},

		// Relign indexes
		realignIndexes : function( data ){

			//header
	    	data.$rows.each(function( $fi ){ 

	    		var $group = data.$rows.eq( $fi );

	    		Fieldset.setRowHeader( data, this, $fi );

    			// Campo weight
    			$group.children( 'input.weight' ).val( $fi );

    			// Index nos labels
    			$group.find( '.linha-field-label label i' ).text( $fi + 1 );

    			// realign fields
	    		$group.find( 'input,select,textarea' ).each(function(){

	    			this.$ = this.$ || $( this );
	    			
	    			// Mudando o ID
	    			var _old_id = this.$.attr( 'id' );
	    			if( _old_id != undefined ){
	    				
	    				// Explode o ID
		    			var _id_peaces = _old_id.split( '_' );
		    			// Incrementa o primeiro índice
		    			for( var p = 0; p < _id_peaces.length; p++ ){
		    				if( !isNaN( _id_peaces[ p ] ) ){
		    					_id_peaces[ p ] = $fi;
		    					break;
		    				}
		    			}
		    			// Novo ID
		    			var _new_id = _id_peaces.join( '_' );
		    			// Inserimos o novo ID
		    			this.$.attr( 'id', _new_id );

	    			}

	    			// Mudando o name
	    			var _old_name = this.$.attr( 'name' );
	    			if( _old_name != undefined ){
	    				// Explode o nome
		    			var _name_peaces = this.$.attr( 'name' ).split( '][' );
		    			// Incrementa o primeiro índice
		    			for( var p=0; p < _name_peaces.length; p++ ){
		    				if( !isNaN( _name_peaces[ p ] ) ){
		    					_name_peaces[ p ] = $fi;
		    					break;
		    				}
		    			}
		    			// Novo nome
		    			var _new_name = _name_peaces.join( '][' );
		    			// Inserimos o novo nome
		    			this.$.attr( 'name', _new_name );
	    			}

	    			// Atributo FOR do Label
	    			var $label = $group.find( 'label[for="'+ _old_id +'"]' );
	    			if( $label.length ){
	    				$label.attr( 'for', _new_id );
	    			}
	    			
	    		});

	    	});

		},

		// Alinha os botões
		alignButtons : function( data ){
			
			// Se não houverem linhas
			if( !data.$rows.length ) return;

			// Zebra
			piki_zebra( data.$rows );
			
			// Botão de adicionar linha
			if( data.maximo === 0 || data.total_rows < data.maximo ){
				
				if( !data.add_button ){
					
					data.add_button = $( '<button type="button" class="add-button button"><span>' + data.addLabel + '</span></button>' );
					data.add_button.data( 'fieldset', { target : data._ } );
					data.add_button.on( 'click', function( event ){
						event.preventDefault();
						Fieldset.getFieldsetRow( data, this );
					});
					data.add_button.appendTo( data.$ );
				}
			
			}
			else{
				
				if( data.add_button ){
					data.add_button.remove();						
				}

				data.add_button = false;
			
			}

			var excludable = data.total_rows > data.minimo;
			
			for( var rw = 0; rw < data.total_rows; rw++ ){
					
				// Objeto da linha
				var $row = data.$rows.eq( rw ).data( 'fieldset', { target : data } );
				
				// Botão de exclusão
				var $exclude_button = $row.find( '.remove-button' );
			
				// Se houverem mais linhas do que o mínimo			
				if( excludable ){
					
					// Clique para exclusão
					$exclude_button.bind( 'click.deleteRow', function(e){

						e.preventDefault();

						// Prevent empty fields
						if( data.total_rows <= data.minimo ) return;

						// Deletation
						if( data.deleteAlert ){
							eval( data.deleteAlert )( data, this.target );
						}
						else {
							Fieldset.deleteRow( data, this.target );
						}
					
					});
					
					// Insere o botão
					$exclude_button.fadeIn( 200 );
				
				}
				else {

					$exclude_button
						.unbind( '.deleteRow' )
						.fadeOut( 200 );
				
				}

			}

		},

		// Adiciona uma linha de campos no fieldset
		getFieldsetRow : function( data, button ){

			button.$ = button.$ || $( button );

			// Post ID
			var postID = data.$post_id.length && data.$post_id.val() !== '' ? data.$post_id.val() : false;
			if( !postID ){
				postID = data.$item_id.length && data.$item_id.val() !== '' ? data.$item_id.val() : false;
			}

			var post_data = {
				action: 'piki_field_ajax',
				field_type: 'fieldset',
				field_action: 'ajax_get_row',
				form_id: data.form_id,
				form_key: data.form_key,
				form_state : data.form_state,
				form_style: data.form_style,
				metabox_id: data.metabox_id,
				fieldset_id: data.field_id,
				field_index : data.$rows.length
			};

			// Requesting
			var request = $.ajax({
				url: Piki.ajaxurl + ( postID ? '?post=' + postID : '' ),
				type: "POST",
				dataType: "json",
				context: data.$,
				beforeSend: function(){
					$.fn.pikiLoader();
				},
				data: post_data
			});
			request.done(function( jSon ) {

				$.fn.pikiLoader( 'close' );
				
				if( jSon.status == 'error' && jSon.type == 'nofieldsetid' ){
					data.$form.PikiForm( 'finish', 'Ops! Ocorreu um erro.', 'Por favor, tente novamente mais tarde.<br />Se o erro persistir, entre em contato com o adminstrador do site.' );
				}
				else{
					
					// Insere a linha de campos no fieldset
					var $row = $( jSon.field );
					$row
						.hide()
						.appendTo( data.$.children( '.field-item' ).first() )
					;

					// Customiza os campos
					PikiFields.call( $row.get( 0 ) );
					
					// Atualiza as linhas
					Fieldset.actualizeRows( data );

					// Scroll to new row
					$row.slideDown( 300, function(){

						var $modal = data.$form.parents( '.piki-modal' );
						if( !$modal.length ){

							var top = $row.offset().top;
							PikiForms.setScroll( top );
						
						}
					
					});
				
				}
										
			});
			request.fail(function( jqXHR, textStatus ){

				$.fn.pikiLoader( 'close' );

				Message.open({
					message : jqXHR.responseText
				});
				
			});

		},

		// Remove uma linha do fieldset
		deleteRow : function( data, $row ){

			// Marca a linha como deletada
			$row.addClass( 'deleted' );
			
			// Recolhe a linha
			$row.slideUp( 200, function(){
				// Remove a linha
				$( this ).remove();
				// Atualiza as linhas
				Fieldset.actualizeRows( data );
			});

		},

		// Set row header
		setRowHeader : function( data, row, index ){

			row.$ = row.$ || $( row );

			// Remove button HTML
			var htmlRemove = '<button type="button" class="dashicons dashicons-trash remove-button" data-action="delete-row">Remover</button>';

			// Without labels
			if( data.noLabels ){
				
				if( row.removeButton === undefined ){
					row.removeButton = $( htmlRemove ).hide().prependTo( row.$ ).fadeIn( 200 );
					row.removeButton.get( 0 ).target = row.$;
				}

			}
			// With labels
			else {

				if( row.header === undefined ){

					row.header = { wrapper : $( '<header></header>' ).prependTo( row.$ ) };

					row.header.title = $( '<h3>Item '+ ( index + 1 ) +'</h3>' ).appendTo( row.header.wrapper );
					row.header.title.bind( 'mouseup', function(){

						if( data.moving === true ){
							return;
						}

						var is_opened = $row.$.is( '.opened' );
						
						data.rows.removeClass( 'opened' );
						
						if( !is_opened ){
							row.$.addClass( 'opened' );
						}
					
					});

					row.removeButton = $( htmlRemove ).hide().appendTo( row.header.wrapper ).fadeIn( 200 );
					row.removeButton.get( 0 ).target = row.$;

				}
				else {

					// Atualizando o label do header
					row.header.title.html( 'Item ' + ( index + 1 ) );

				}

			}

		}

	};

})(jQuery);
