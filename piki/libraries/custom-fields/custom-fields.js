(function($){

	// Selectboxes
		
		$.fn.pikiSelect = function( method ){

			var pluginArgs = arguments;

			return this.each(function(){

				var field = this;
				var $this = $( this );

				// Configura
				this.configure = function(){

					// Valor atual
					this.last_value = $this.val();
					// Wrapper
					this.wrapper = $('<div class="j-custom-select-holder clearfix" />').attr( 'tabindex', 1 ).insertBefore( $this );
					// Classe do campo no wrapper
					this.wrapper.addClass( $this.attr( 'class' ) );
					// Encapsulamos o campo
					$this.appendTo( this.wrapper );
					// Se o campo tem tamanho fixo
					this.fidex_size = $this.attr( 'fixed-size' ) == undefined ? false : true;
					// Se o campo é redimensionado automaticamente
					this.autosize = $this.data( 'autosize' ) !== false;
					// Opções do select
					this.items = $this.find( 'option' );
					// Label do campo
					this.label = $( '<span class="text" />' ).appendTo( this.wrapper );
					// Arrow do campo
					this.picker = $( '<span class="picker" />' ).appendTo( this.wrapper );
					// Tamanho da seta
					this.picker_width = parseInt( this.picker.outerWidth() );
					// Se o campo é desabilitado
					if( $this.prop( 'disabled' ) ){
						this.wrapper.addClass( 'disabled' );
					}
					// Eventos
					$this.on( 'focus', function(){
						$( document ).on( 'keyup', function(event){
							field.selectEvent( event );
						});			
					});
					$this.on( 'focusout', function(){
						$( document ).off( 'keyup', function(event){
							field.selectEvent( event );
						});		
					});
					$this.on( 'change', function(){
						field.onChange();
					});

					this.on( 'actualize', function(){
						fiele.actualizeLabel();
					});

					// Redimensiona
					this.resize();
					// Atualiza o label
					this.actualizeLabel();
					// Diz que o campo já foi configurado
					this.ready = true;

				};

				this.onChange = function(){

					// Último valor
					this.last_value = $this.val();
					
					// Atualiza o label
					field.actualizeLabel();				
				
				};

				// Atualiza o label do campo
				this.actualizeLabel = function(){
					this.selected = $this.find( 'option[value="' + $this.val() + '"]' );
					this.labelText = !this.selected.length ? this.items.first().html() : this.selected.html();
					this.label.html( this.labelText );
				
				};

				// Calcula o tamanho do campo
				this.resize = function(){

					// Tamanho do label
					var _label_width, _width_adds = 0;
					// Se o tamanho do campo é fixo
					if( this.fidex_size ){
						_label_width = this.fidex_size - this.picker.outerWidth();
					}
					// Tamanho variável
					else {
						// Elemento para cálculo
						var clone = this.wrapper.clone().css({ position : 'absolute', top : 0, left : 0, visibility : 'hidden', display : 'block', width : '100%' }).appendTo( _body );
						var clone_label = clone.find( '.text' ).first().css({ 'width' : 'auto', 'display' : 'table' });
						var clone_target = clone.find( 'select' ).first();
						_label_width = 0;
						clone_target.children( 'option' ).each(function(){
							clone_label.html( $( this ).html() );
							if( clone_label.outerWidth() > _label_width ){
								_label_width = clone_label.outerWidth();
							}
						});
						clone_target.remove();
					}
					// Inernet explorer 7 ou menor
					if( $.browser.msie && $.browser.version < 8 ){
						// Paddings laterais do label
						var padding_left = parseInt( this.label.css( 'padding-left' ) );
						var padding_right = parseInt( this.label.css( 'padding-right' ) );
						// Bordas laterais do label
						var border_left_label = parseInt( this.label.css( 'border-left-width' ) );
						var border_right_label = parseInt( this.label.css( 'border-right-width' ) );
						// Reduz o tamaho real do label
						_label_width -= padding_left + padding_right;
						// Adiciona o tamaho dos adicionais
						_width_adds += padding_left + padding_right + border_left_label + border_right_label;
					}
					// Tamanho total do campo
					var all_width = _label_width + this.picker_width + _width_adds;
					// Redimensiona o label
					this.label.css({ 'width' : _label_width + 'px', 'display' : 'block' });
					// Redimensiona o tamanho do wrapper
					this.wrapper.css( 'width', all_width + 'px' );
					$this.css( 'width', all_width + 'px' );			
				};

				// Define um valor
				this.setValue = function( value ){
					$this.val( value ).change();
				};

				// Navegação com setas
				this.selectEvent = function( event ){
				    if ( event.keyCode >= 37 && event.keyCode <= 40 && $this.val() != this.last_value ) {
					    $this.change();
				    }
				};

				// Desabilita o campo
				this.disable = function(){
					$this.prop( 'disabled', 'disabled' );
					this.wrapper.addClass( 'disabled' );
				};

				// Desabilita o campo
				this.enable = function(){
					$this.prop( 'disabled', false );
					this.wrapper.removeClass( 'disabled' );
				};

				// Popula o campo com valores fornecidos
				this.populate = function( data, keepFirst ){
					var $first;
					if ( keepFirst != undefined && keepFirst == true ) {
						$this.find( 'option' ).first().siblings().remove();
					}
					else {
						$this.find( 'option' ).remove();
					}
					$.each( data, function( key, label ){
						$this.append( '<option value="'+ key +'">'+ label +'</option>' );
					});
					this.resize();
				};

				// Remove todos os ítems do campo
				this.removeItems = function(){
					this.disable();
					$this.find( 'option' ).first().siblings().remove();
					this.setValue( $this.find( 'option' ).first().val() );
					this.enable();
				};

				// Chamando os métodos
				var toCall;
				if( ( toCall = eval( "this."+method ) ) == undefined && this.ready == undefined ){
					this.configure.apply( this, pluginArgs );
				}
				else{
					toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) );
				}

			});

		};

	// Checkboxes
		
		$.fn.pikiCheckbox = function( method ){
			var pluginArgs = arguments;
			return this.each(function(){
				var field = this;
				var $this = $( this );

				// Apenas checkboxes
				if( $this.attr( 'type' ) !== 'checkbox' ){
					return;					
				}

				// Configura
				this.configure = function(){
					// Se já foi configurado
					if( this.ready === true ){
						return;
					}
					// Valor atual
					this.init_value = $this.prop( 'checked' );
					// Wrapper
					this.wrapper = $( '<div class="j-custom-checkbox"></div>' ).insertBefore( $this );
					// Background
					var custom_bg = $this.attr( 'piki-check-background' );
					if( custom_bg != undefined ){
						this.wrapper.css( 'background-image', 'url(' + custom_bg + ')' );
					}
					// Inserindo o campo no wrapper
					$this.appendTo( this.wrapper );
					this.actualize();
					// Focus In
					$this.on( 'focus', function(){
						field.wrapper.addClass( 'focus' );		
						$this.parents( 'label' ).first().addClass( 'focus' );		
					});
					// Focus Out
					$this.on( 'focusout', function(){
						field.wrapper.removeClass( 'focus' );		
						$this.parents( 'label' ).first().removeClass( 'focus' );		
					});
					// Trigger do field
					$this.change(function(){
						if( $this.prop( 'checked' ) === true ){
							field.wrapper.addClass( 'checked' );
							$this.parents( 'label' ).first().addClass( 'checked' );
						}
						else{
							field.wrapper.removeClass( 'checked' );
							$this.parents( 'label' ).first().removeClass( 'checked' );
						}
					});
					// Form
					var $form = $this.parents( 'form' ).first();
					if( $form.length ){
						$form.bind( 'reset', function() {
							field.reset();
						});
					}
					this.ready = true;
				};

				// Atualiza o campo
				this.actualize = function(){
					if( $this.prop( 'checked' ) === true || $this.prop( 'checked' ) === 'checked' ){
						this.wrapper.addClass( 'checked' ).parent().addClass( 'checked' );
					}
					else {
						this.wrapper.removeClass( 'checked' ).parent().removeClass( 'checked' );
					}
				};

				// Reseta o campo
				this.reset = function(){
					if( this.init_value === true ){
						$this.prop( 'checked', true );
					}
					else {
						$this.prop( 'checked', false );
					}
					this.actualize();
				};

				// Chamando os métodos
				var toCall;
				if( ( toCall = eval( "this."+method ) ) == undefined && this.ready == undefined ){
					this.configure.apply( this, pluginArgs );
				}
				else{
					toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) );
				}

			});
		}

		window.init_custom_checkboxes = function( seletor, callback ){
			if (seletor==undefined) {
				jselect = 'input:checkbox';
			}
			else{
				jselect = seletor + ' input:checkbox';
			}
			var $fields = $( jselect );
			if( !$fields.length ){
				return;
			}
			$fields.pikiCheckbox();
			if ( callback != undefined ){
				callback( $fields );
			}
		};

	/* Radios */
	window.init_custom_radios = function( seletor, callback ){

		if ( seletor == undefined ) {
			jselect = 'input:radio';
		}
		else{
			jselect = seletor + ' input:radio';
		}

		$( jselect ).not('.ready').each(function(){
			
			var $field = $( this );
			var status_class = $field.prop( 'checked' ) ? ' checked' : '';
			var $wrapper = $( '<div class="j-custom-radio"></div>' ).addClass( status_class ).insertBefore( $field );
			$field.appendTo( $wrapper );
			$field.on( 'focus', function(){
				$( this ).parent().addClass( 'focus' );		
			});
			$field.on( 'focusout', function(){
				$( this ).parent().removeClass( 'focus' );		
			});
			$field
				.addClass('ready')
				.data( 'PikiRadio', {
					terget: $field,
					wrapper: $wrapper
				})
			;
			$field.change(function(){
				custom_radios_actualize_item( $( this ) );
			});

		}).addClass('ready');
	};

	function custom_radios_actualize_item( $field ){
		var radio_name = $field.attr('name');
		var $all_items = $('input[name="'+radio_name+'"]');
		/* Desmarca todos os ítens */
		$all_items.parent('.j-custom-radio').removeClass('checked');
		/* Se houver algum ítem marcado, ele adiciona a classe */
		if( $all_items.filter(':checked').length > 0 ){
			$field.parent('.j-custom-radio').addClass('checked');
		}	
	};


	// File fields

	window.init_custom_filefields = function(){
		jQuery('input:file').not('.ready').each(function(){
			var $field = jQuery(this);
			$field.wrap('<div class="j-custom-filefield-holder"></div>');
		}).addClass('ready');
	};

	// Campos de imagem

	window.init_image_fields = function(){
		
		var $form = $("#form-denuncia");
		
		$("input.denuncia-photo").change(function(){
			var $field = jQuery(this);
			if($field.val() != ''){
				$form.find('#action-name').val('image-upload');
				$form.find('#action-target').val( $field.attr('rel') );
				$.fn.pikiLoader( 'all' );
				$form.submit();
				return false;
			}
		});

		$('a.remove-photo-button').live('click', function(event){
			event.preventDefault();
			confir_image_delete( jQuery(this) );
		});
		
		$('div.col.photo div.confirm-box .no').live('click', function(){
			$(this).parent().hide();
		});
		
		$('div.col.photo div.confirm-box .yes').live('click', function(){
			var $fieldBox = jQuery( this ).parent().parent( '.field' );
			var info = { target: $fieldBox.find('input:file').attr('id') };
			image_field_change_state( 'clear', info );
		});

	};

	window.confir_image_delete = function( $clicked ){
		var $boxField = $clicked.parents('.field');
		var $confirmBox = $boxField.find('.confirm-box');
		if( !$confirmBox.length ){
			$confirmBox = jQuery('<div class="confirm-box"></div>');
			$confirmBox.html('<span>'+_t('delete_photo').toUpperCase()+'?</span><a class="no">'+_t('no').toUpperCase()+'</a><a class="yes">'+_t('yes').toUpperCase()+'</a>');
			$confirmBox.appendTo($boxField);
			$confirmBox.hide();
		}
		$confirmBox.show();
	};

	window.image_field_change_state = function( action, info ){
		
		var $field = $( '#'+info.target );
		var $field_value = $( '#'+info.target+'-uri' );
		var $thumb_value = $( '#'+info.target+'-thumb-uri' );
		var $fieldBox = $field.parent().parent('.field');

		if( action == 'clear' ){
			
			$.ajax({
				type: "POST",
				url: blog_url + '?api=true&action=image-delete',
				dataType: 'JSON',
				data: "image_uri="+$field_value.val()+'&thumb_uri='+$thumb_value.val(),
				beforeSend: function ( xhr ) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
					$.fn.pikiLoader( 'all' );
				}
			}).done(function ( data ) {
				$.fn.pikiLoader('close');

				if( data.status == 'error' ){
					openAlert({
						content: data.message,
						status: data.status
					});
				}
				else{
					image_field_change_state( 'reset', info );
				}

			});
			clear_file_field( $field );

		}
		else if( action == 'reset' ){
			$fieldBox.find("div.thumbnail").remove();
			$fieldBox.find("div.confirm-box").remove();
			$field_value.val('');
			clear_file_field( $field );
		}
		else{

			// thumbnail
			var $thumb = $('<div class="thumbnail"></div>');
			$thumb.append('<img src="'+info.thumbnail.url+'" />');
			$thumb.append('<a class="remove-photo-button" title="'+_t("delete_photo")+'">'+_t("delete_photo")+'</a>');
			$thumb.appendTo($fieldBox);
			// field url fullsize
			$fieldBox.find('input#'+info.target+'-uri').val( info.fullsize.uri );
			$fieldBox.find('input#'+info.target+'-thumb-uri').val( info.thumbnail.uri );

		}
	};
	window.reset_photo_field = function( target ){

		var $field = $( '#'+target );
		var $fieldBox = $field.parent().parent('.field');
		var $field_value = $( '#'+target+'-uri' );

		$fieldBox.find("div.thumbnail").remove();
		$fieldBox.find("div.confirm-box").remove();
		$field_value.val('');
		clear_file_field( $field );


	};
	window.clear_photo_fields = function(){
		$("fieldset#photos div.col.photo input:file").each(function(){
			clear_file_field( $(this) );
		});
	};

	/* Avatar field */
	window.init_avatar_fields = function(){
		$('.ftype-avatar').not('.ready').each(function(){
			var $this = $( this );

			var $widget = $this.find( '.widget' );
			var $target = $this.find( 'select' );
			$widget.children( '.options' ).find( '[rel="'+ $target.val() +'"]' ).addClass( 'selected' );
			
			var $left = $widget.children( '.arrow.left' ).click(function(){
				avatar_field_change( $( this ) );
			});
			var $right = $widget.children( '.arrow.right' ).click(function(){
				avatar_field_change( $( this ) );
			});

		});
	};
	window.avatar_field_change = function( $this ){
		var sent = $this.is( '.left' ) ? 'prev' : 'next';
		var $field = $this.parents( '.field-item' ).first();
		var $options = $field.find( '.widget .options' );
		var $actual = $options.find( 'img.selected' );
		var $nextItem = ( 'next' == sent ) ? $actual.next() : $actual.prev();
		if( !$nextItem.length ){
			$nextItem = ( 'next' == sent ) ? $options.find( 'img' ).first() : $options.find( 'img' ).last();
		}
		$actual.removeClass( 'selected' );
		$nextItem.addClass( 'selected' );
		pikiSelectVal( $field.find( 'select' ), $nextItem.attr( 'rel' ) );
		console.log( "$clicked:" );
		console.log( $nextItem );
	};

})(jQuery);
