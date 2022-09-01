(function($){
	
	// APP
	var APKForms = {

		// Instanciando os formulários
		init : function init(){

			$( 'form#post[data-piki-admin-form="true"]' ).each(function(){
				APKForms.configure( this );
			});

		},

		// Configurando os formulários
		configure : function configure( form ){

			form.$ = form.$ || $( form );

			var data = form.$.data( 'APKForms' );
			if( data !== undefined ) return data;

			data = { 
				$ : form.$, 
				_ : form 
			};

			data.$haction = $( 'input#hiddenaction', data.$ );
			data.haction = data.$haction.val();

			// Errors
			data.errors = {
				fields : {
					type : 'inline',
					location : '.linha-field-label'
				},
				general : {
					type : 'inline',
					target : '#post-body',
					message : false
				}
			};

			// Natives fields
			
				data.title = false;
				data.body = false;
				data.excerpt = false;
				data.category = false;
				data.post_tags = false;
				data.natives = {};
				
				var $natives = $( 'input[data-group="natives"]', data.$ );
				if( $natives.length ){
					$natives.each(function(){

						this.$ = this.$ || $( this );

						var ftype = this.$.data( 'ftype' );
						var fielddata = {
							$ : this.$,
							ftype : ftype,
							machine_name : this.$.data( 'machine-name' ),
							label : this.$.data( 'label' ),
							minlength : this.$.data( 'minlength' ) === undefined ? false : this.$.data( 'minlength' ),
							maxlength : this.$.data( 'maxlength' ) === undefined ? false : this.$.data( 'maxlength' ),
						};

						if( fielddata.ftype === 'title' ){
							fielddata.target = $( '#title' );
							fielddata.wrapper = $( '#titlewrap' );
						}
						else if( fielddata.ftype === 'body' ){
							fielddata.target = $( '#content' );
							fielddata.wrapper = $( '#wp-content-editor-container' );
						}
						else if( fielddata.ftype === 'excerpt' ){
							fielddata.target = $( '#excerpt' );
							fielddata.wrapper = $( '#postexcerpt' );
							fielddata.label = 'Resumo';
						}
						else if( fielddata.ftype === 'taxonomy' ){
							fielddata.target = $( 'input[name="post_category[]"]' );
							fielddata.taxonomy = this.$.data( 'taxonomy' );
							fielddata.wrapper = $( '#' + fielddata.taxonomy + 'div' );
						}

						// Set field
						if( fielddata.ftype === 'taxonomy' ){
							data.natives[ fielddata.taxonomy ] = fielddata;
						}
						else {
							data.natives[ ftype ] = fielddata;
						}
						
					});
				}
				
			// Type save
			data.typeSave = 'publish';

			// Preview button
			data.$previewButton = $( '#post-preview', data.$ );
			data.$previewButton.on( 'mousedown', function(){
				data.typeSave = 'preview';
			});

			// Save button
			data.$saveDraft = $( '#save-post', data.$ );
			data.$saveDraft.on( 'mousedown', function(){
				data.typeSave = 'draft';
			});

			data.$.bind( 'submit.APKForms', function(event){
				if( data.typeSave === 'publish' ){
					event.preventDefault();
					APKForms.validate( data );
				}
			});

			// Categories
			data.$categs = $( 'form#post #taxonomy-category #category-all #categorychecklist' );
			if( !data.$categs.length ){
				data.$categs = $( 'form#post #taxonomy-categ #categ-all #categchecklist' );
			}

			if( data.$categs ){
				APKForms.bindCategories( data );
			}

			data.$publish = $( 'input#publish', data.$ );
			
			// Keep data
			data.$.data( 'APKForms', data );

		},

		bindCategories : function( data ){

			data.$categs.on( 'change', 'input', function(){

				this.$ = this.$ || $( this );

				// Data
				var data = this.$.data( 'APKForms' );
				if( data === undefined ){
					data = {
						self : this,
						$ : this.$,
						$group : this.$.parents( 'ul' ).first(),
						$parent : this.$.parents( 'li' ).first(),
						$root : this.$.parents( 'li' ).last()
					};
					data.isParent = !data.$group.hasClass( 'children' );	
				}
				data.$siblings = data.$parent.siblings();

				// Checked
				if( data.self.checked ){

					// Disable others
					data.$root.siblings( 'li' ).find( 'input' ).prop( 'checked', false );
					data.$parent.siblings( 'li' ).find( 'input' ).prop( 'checked', false );

					// Parent input
					var $parentInput = data.$group.siblings( 'label' ).first().children( 'input' );
					$parentInput.prop( 'checked', true );

				}
				// Unchecked
				else {

					data.$parent.find( 'input' ).prop( 'checked', false );
				
				}
				
			}); 

		},

		validate : function validate( data ){

			// Removendo erros anteriores
			PikiForms.clearErrors( data );

			// Validando o campo de título
			if( data.natives.title.target.val() === '' ){
				APKForms.showError( data, 'O título é obrigatório', data.natives.title.wrapper );
				data.typeSave = 'publish';
				return;
			}
			else {
				data.natives.title.wrapper.removeClass( 'error-wrapper' );
			}

			// Body
			if( data.natives.body ){
				if( data.natives.body.target.val() === '' ){
					APKForms.showError( data, 'O conteúdo é obrigatório', data.natives.body.wrapper );
					data.typeSave = 'publish';
					return;
				}
				else {
					data.natives.body.wrapper.removeClass( 'error-wrapper' );
				}
			}

			// Excerpt
			if( data.natives.excerpt ){
				if( data.natives.excerpt.target.val() === '' ){
					APKForms.showError( data, 'O resumo é obrigatório', data.natives.excerpt.wrapper );
					data.typeSave = 'publish';
					return;
				}
				else {
					data.natives.excerpt.wrapper.removeClass( 'error-wrapper' );
				}
			}

			// Categs
			if( data.natives.category ){

				// Editoria
				var nivel1 = data.$categs.find( '>li>label>input' );
				var nivel2 = data.$categs.find( '>li>ul>li>label>input' );
				if( !nivel1.filter( ':checked' ).length ){
					APKForms.showError( data, 'Selecione uma editoria', data.natives.category.wrapper );
					data.typeSave = 'publish';
					return;				
				}
				// else if( nivel2.length && !nivel2.filter( ':checked' ).length ){
				// 	APKForms.showError( data, 'Selecione uma subeditoria', data.natives.category.wrapper );
				// 	data.typeSave = 'publish';
				// 	return;				
				// }
				else {
					data.natives.category.wrapper.removeClass( 'error-wrapper' );
				}
				
			}

			// Ajax action
			data.$haction.val( 'admin_form_validate' );

			// Loader
			$.fn.pikiLoader();

			// Faz a validação dos campos do formulário
			data.$.ajaxSubmit({
				
				url : ajaxurl,
				type: 'POST',
				dataType: 'text',
				iframe: false,
				
				success: function( responseText, statusText, xhr, sForm ){

					// Retorna o valor do campo de action
					data.$haction.val( data.haction );
					
					try {
						var jSon = $.parseJSON( responseText );
					}
					catch( err ){

						// Fecha a mascara
						$.fn.pikiLoader( 'close' );

						Message.open({
			                title : 'Ops!',
			                message : 'Problema ao validar ítem: ' + responseText
			            });

						return false;

					}

					// Dados ok!
					if( jSon.status === 'success' ){
						data.$.unbind( 'submit.APKForms' );
						data.$publish.click();
					}
					
					// Erro de validação
					else {

						// Fecha a mascara
						$.fn.pikiLoader( 'close' );
						
						// Seta os erros
						if( jSon.error_type === 'valida' ){
							PikiForms.setErrors( data, jSon.errors );
						}
					
					}

				},
				
				error: function( response, statusText, xhr, sForm ){
					
					// Fecha a mascara
					$.fn.pikiLoader( 'close' );

					Message.open({
		                title : 'Ops!',
		                message : response.responseText
		            });

				}
			
			});
		
		},

		showError : function( data, message, wrapper ){

			var messageData = { 
				$ : data.$, 
				_ : data._,
				errors : {
					fields : {
						type : 'inline',
						location : '.linha-field-label'
					},
					general : {
						type : 'inline',
						target : '#post-body',
						message : message
					}
				}
			};

			PikiForms.showInlineMessage( 
				messageData, 
				{}, 
				'error' 
			);

			wrapper.addClass( 'error-wrapper' );

		},

		validateAfter : function validateAfter( data, response ){

			// Retorna o valor do campo de action
			data.$haction.val( data.haction );
			
			try {
				var jSon = $.parseJSON( responseText );
			}
			catch( err ){
				$.fn.pikiAlert( responseText + '<br /><br />' + statusText + '<br /><br />' );
				return false;
			}

			// Dados ok!
			if( jSon.status === 'success' ){
				data.$.unbind( 'submit.APKForms' ).submit();
			}
			
			// Erro de validação
			else {

				// Fecha a mascara
				$.fn.pikiLoader( 'close' );
				
				// Seta os erros
				if( jSon.error_type === 'valida' ){
					PikiForms.setErrors( data, jSon.errors );
				}
			
			}

		}

	};

	$(function(){
		APKForms.init();
	});

})(jQuery);
