(function($){

	$(function(){
		$( '.linha-field.ftype-fieldset' ).fieldset();
	});

	var _body = $( 'body' );

	$.fn.fieldset = function( method ){
		
		return this.each(function(){

			var $this = $( this );
			var _this = this;

			if( !$this.is( '.multiple' ) ){
				return;
			}

			// Configura
			this.configure = function(){
				
				// Configurações
				this.field_id = $this.attr( 'rel' );
				
				this.maximo = $this.attr( '--maximo' ) == undefined ? 0 : parseInt( $this.attr( '--maximo' ) );
				
				this.minimo = $this.attr( '--minimo' ) == undefined ? 0 : parseInt( $this.attr( '--minimo' ) );
				
				this.abertos = $this.attr( '--abertos' ) == undefined ? 0 : parseInt( $this.attr( '--abertos' ) );
				
				this.deleteAlert = $this.data( 'delete-alert' );

				this.form = $this.parents( 'form' ).first();

				this.post_id = this.form.find( 'input#post_ID' );
				
				this.form_id = this.form.find( 'input.form-id' ).val();
				
				this.form_key = this.form.find( 'input.form-key' ).val();

				this.metabox_id = $this.data( 'metabox-id' );

				this.rows = $this.children( '.field-item' ).children( '.fieldset-group-fields' );

				this.addLabel = this.rows.data( 'add-label' ) == undefined ? 'Adicionar' : this.rows.data( 'add-label' );
				
				this.moving = false;
				
				this.add_button = false;

				this.actualize_rows();

				// Sortable
				/*
				var sort_options = { 
					axis: "y", 
					handle: "> header > h3", 
					placeholder: "ui-state-highlight",
					start: function( event, ui ){
						_this.moving = true;
						ui.placeholder.css({
							height: ui.item.outerHeight()-2,
							marginBottom: ui.item.css( 'margin-bottom' )
						});
					},
					stop: function(){
						_this.actualize_rows();
						_this.moving = false;
					}
				};
				$this.children( '.field-item' ).sortable( sort_options );
				*/

			};

			// Adiciona uma linha de campos no fieldset
			this.getFieldsetRow = function( $button ){

				var postID = this.post_id.length && this.post_id.val() !== '' ? this.post_id.val() : false;

				var request = $.ajax({
					url: Piki.ajaxurl + ( postID ? '?post=' + postID : '' ),
					type: "POST",
					dataType: "json",
					context: this,
					beforeSend: function(){
						$.fn.pikiLoader();
					},
					data: {
						action: 'piki_field_ajax',
						field_type: 'fieldset',
						field_action: 'ajax_get_row',
						form_id: this.form_id,
						form_key: this.form_key,
						metabox_id: this.metabox_id,
						fieldset_id: this.field_id,
						field_index : this.rows.length,
					}
				});
				request.done(function( jSon ) {

					$.fn.pikiLoader( 'close' );
					
					if( jSon.status == 'error' && jSon.type == 'nofieldsetid' ){
						this.form.PikiForm( 'finish', 'Ops! Ocorreu um erro.', 'Por favor, tente novamente mais tarde.<br />Se o erro persistir, entre em contato com o adminstrador do site.' );
					}
					else{
						
						// Insere a linha de campos no fieldset
						var $row = $( jSon.field );
						$row
							.hide()
							.appendTo( $this.children( '.field-item' ).first() )
						;

						// Customiza os campos
						PikiFields.call( $row.get( 0 ) );

						// Scroll to new row
						$row.slideDown( 300, function(){
							$(window).scrollTo( $row, 500, { offset: { top: -50 } } );
						});
						
						// Atualiza as linhas
						_this.actualize_rows();
					
					}
											
				});
				request.fail(function( jqXHR, textStatus ) {
					console.log( "Request failed: " + textStatus );
				});

			};

			// Atuliza as linhas e o número de linhas
			this.actualize_rows = function(){
				
				// Linhas do fieldset
				this.rows = $this.children( '.field-item' ).children( '.fieldset-group-fields' ).not( '.deleted' );
				
				// Número de linhas
				this.total_rows = this.rows.length;
				
				// Realinha os índices
				this.realignIndexes();
				
				// Realinha os botões
				this.alignButtons();

				// Trigger events
				$this.trigger( 'actualize' );

			};

			// Alinha os botões
			this.alignButtons = function(){
				
				// Se não houverem linhas
				if( !this.rows.length ) return;

				// Zebra
				piki_zebra( this.rows );
				
				// Botão de adicionar linha
				if( this.maximo === 0 || this.total_rows < this.maximo ){
					
					if( !this.add_button ){
						
						this.add_button = $( '<button type="button" class="add-button"><span>' + this.addLabel + '</span></button>' );
						this.add_button.data( 'fieldset', { target : this } );
						this.add_button.on( 'click', function( event ){
							event.preventDefault();
							var $button = $( this );
							$button.data( 'fieldset' ).target.getFieldsetRow( $button );
						});
						this.add_button.appendTo( this );
					}
				
				}
				else{
					
					if( this.add_button ){
						this.add_button.remove();						
					}

					this.add_button = false;
				
				}

				var excludable = this.total_rows > this.minimo;
				
				for( var rw=0; rw < this.total_rows; rw++ ){
						
					// Objeto da linha
					var $row = this.rows.eq( rw ).data( 'fieldset', { target : this } );
					
					// Botão de exclusão
					var $exclude_button = $row.find( '>header .remove-button' );
				
					// Se houverem mais linhas do que o mínimo			
					if( excludable ){
						
						// Clique para exclusão
						$exclude_button.bind( 'click.deleteRow', function( event ){
							if( _this.deleteAlert ){
								eval( _this.deleteAlert )( _this, this.target );
							}
							else {
								_this.deleteRow( this.target );
							}
						});
						
						// Insere o botão
						$exclude_button.show()
					
					}
					else {
						$exclude_button
							.unbind( '.deleteRow' )
							.hide();
					}

				}

			};

			// Remove uma linha do fieldset
			this.deleteRow = function( $row ){

				// Marca a linha como deletada
				$row.addClass( 'deleted' );
				// Recolhe a linha
				$row.slideUp( 500, function(){
					// Remove a linha
					$( this ).remove();
					// Atualiza as linhas
					_this.actualize_rows();
				});

			};

			this.realignIndexes = function(){

				//header
		    	this.rows.each(function( $fi ){ 

		    		var $group = _this.rows.eq( $fi );

		    		_this.setRowHeader( this, $fi );

	    			// Campo weight
	    			$group.children( 'input.weight' ).val( $fi );

	    			// Index nos labels
	    			$group.find( '.linha-field-label label i' ).text( $fi + 1 );

		    		$group.find( 'input,select,textarea' ).each(function(){
		    			
		    			var $item = $( this );

		    			// Mudando o ID
		    			var _old_id = $item.attr( 'id' );
		    			if( _old_id != undefined ){
		    				
		    				// Explode o ID
			    			var _id_peaces = _old_id.split( '_' );
			    			// Incrementa o primeiro índice
			    			for( var p=0; p < _id_peaces.length; p++ ){
			    				if( !isNaN( _id_peaces[ p ] ) ){
			    					_id_peaces[ p ] = $fi;
			    					break;
			    				}
			    			}
			    			// Novo ID
			    			var _new_id = _id_peaces.join( '_' );
			    			// Inserimos o novo ID
			    			$item.attr( 'id', _new_id );

		    			}

		    			// Mudando o name
		    			var _old_name = $item.attr( 'name' );
		    			if( _old_name != undefined ){
		    				// Explode o nome
			    			var _name_peaces = $item.attr( 'name' ).split( '][' );
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
			    			$item.attr( 'name', _new_name );
		    			}

		    			// Atributo FOR do Label
		    			var $label = $group.find( 'label[for="'+ _old_id +'"]' );
		    			if( $label.length ){
		    				$label.attr( 'for', _new_id );
		    			}
		    			
		    		});

		    	});

			};

			this.setRowHeader = function( row, index ){

				var $row = $( row );

				if( row.header === undefined ){

					row.header = { wrapper : $( '<header class="clearfix"></header>' ).prependTo( $row ) };

					row.header.title = $( '<h3>Item '+ ( index + 1 ) +'</h3>' ).appendTo( row.header.wrapper );
					row.header.title.bind( 'mouseup', function(){

						if( _this.moving === true ){
							return;
						}

						var is_opened = $row.is( '.opened' );
						
						_this.rows.removeClass( 'opened' );
						
						if( !is_opened ){
							$row.addClass( 'opened' );
						}
					
					});

					row.header.removeButton = $( '<span class="dashicons dashicons-trash remove-button"></span>' ).appendTo( row.header.wrapper );
					row.header.removeButton.get( 0 ).target = $row;

				}
				else {

					// Atualizando o label do header
					row.header.title.html( 'Item ' + ( index + 1 ) );

				}

			};
			
			if( this.data == undefined ){
				this.configure();
			};

		});

	};

})(jQuery);
