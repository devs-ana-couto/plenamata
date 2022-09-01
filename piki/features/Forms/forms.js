var PikiForms;

(function($){

	var total = 0;
	
	window.initPikiForms = function(){ 
		var $pikiforms = $( 'form[data-piki-form="true"]' );
		if( $pikiforms.length ){
			$pikiforms.PikiForm(); 
		}
	};
	$(function(){  
		
		// Piki Forms
		window.initPikiForms(); 
		
		// Piki fields in admin forms
		var $adminForms = $( 'form[data-piki-admin-form="true"]' );
		if( $adminForms.length ){
			PikiFields.init();
		}
	
	});

	// PikiForm
	$.fn.PikiForm = function( options ){
		return this.each(function(){
			PikiForms.init( this, options );
		});
	};

	PikiForms = {

		$header : null,

		// Initializae form
		init : function init( form, options ){
		
			form.$ = form.$ || $( form );
		
			var data = form.$.data( 'PikiForms' );
			if( data === undefined ){
		
				var data = { 
					$ : form.$, 
					_ : form,
					steps : false,
					conditionals : false
				};
				if( options !== undefined ){
					data = $.extend({}, data, options );
				}
		
				form.$.data( 'PikiForms', data );
		
				PikiForms.structure( data );
				PikiForms.configure( data );
		
			}
		
		},

		// Get site header
		getHeader : function(){

			if( this.$header === null ){
				var $header = $( 'body > header, #masthead, #header, #site-header, #wpadminbar' );
				this.$header = $header.length ? $header.first() : false;
			}
			
			return this.$header;
		
		},

		getStartScroll : function(){

			var $header = this.getHeader();
			if( !this.$header ) return 0;

			return this.$header.outerHeight();

		},

		// Struturando os elementos
		structure : function structure( data ){

			// Action
			data.$action = $( 'input.form-action', data.$ );
			data.action = data.$action.val();
			data.$action.data( 'PikiForm', { initialValue :  data.$action.val() } );

			// If is PikiForm
			data.isPikiForm = data.$.attr( 'data-piki-form' ) === 'true';
			data.isPikiAdminForm = data.$.attr( 'data-piki-admin-form' ) === 'true';

			//data-next-label="Continuar"
			
			// Submit button
			if( data.$.attr( 'id' ) === 'post' ){
			
				data.isAdmin = true;
				data.$submit = $( 'input#publish', data.$ );
				data.$preview = $( 'input#post-preview', data.$ );
			
			}
			else {

				data.isAdmin = false;

				var selectors = '#' + data.$.attr( 'id' ) + ' .form-save-button';
				if( data.$.hasClass( 'settings-form' ) ){
					selectors += ', #submitpost #publish';
				}

				data.$submit = $( selectors );
			
			}
			data.$submit.data( 'PikiForm', { initialLabel :  data.$submit.val() } );

			// Materialize
			data.materialize = data.$.hasClass( 'materialize' );

			// Save draft
			data.isDraft = false;
			data.$saveDraft = $( 'button[data-action="save-draft"]' );
			if( data.$saveDraft.length ){
				data.canSaveDraft = true;
				data.$doSaveDraft = $( 'input[name="save_draft"]' );
			}

			// Footer form
			data.$footer = data.$.children( '.footer-form' );
			
			data.key = $( 'input.form-key', data.$ ).val();
			data.id = $( 'input.form-id', data.$ ).val();
			data.preview = data.$.attr( '--preview' ) === 'on';
			data.original_attr_action = data.$.attr( 'action' );
			data.original_attr_target = data.$.attr( 'target' );

			// Errors
			data.errors = {
				fields : {
					type : data.$.data( 'errors-fields' ),
					location : data.$.data( 'errors-fields-location' )
				},
				general : {
					type : data.$.data( 'errors-general' ),
					target : data.$.data( 'errors-general-target' ),
					message : data.$.data( 'errors-general-message' )
				}
			};

			// Success
			data.success = {
				type : data.$.data( 'success-type' ),
				message : data.$.data( 'success-message' ),
				redirect : data.$.data( 'success-redirect' ),
				tohide : data.$.data( 'success-tohide' ),
				target : data.$.data( 'success-target' ),
				$ : false
			};

			// Settings form
			data.isSettingsForm = data.$.hasClass( 'settings-form' );
			
			// Preview Button
			data.$previewBack = data.$.find( '.form-alter-button' );

			// Tooltips
			data.$tooltips = $( '.tooltip', data.$ );

			// Use Terms
			data.useTerms = $( 'input.ftype-termsuse' );
			if( data.useTerms.length ){
				
				data.useTermsWrapper = data.useTerms.parents( '.linha-field' ).first();
				data.useTermsLinks = data.useTermsWrapper.find( '[data-modal-target]' );
				data.useTermsOrigin = false;
				
				PikiForms.bindTermos( data );

			}

			// Steps
			var $stepField = $( 'input.form-step', data.$footer );
			if( $stepField.length ){

				var $steps_items = data.$.find( '>.form-fields>.form-step' );
				var $stepsStatus = data.$.find( '>.form-fields>.form-navigation' );
				
				data.steps = {
					$field : $stepField,
					$step: $stepField,
					$items: $steps_items,
					$actual: $steps_items.filter( '#' + $stepField.val() ),
					$status: $stepsStatus,
					$triggers : $stepsStatus.find( '.tabs a' ),
					nextLabel : data.$submit.data( 'next-label' )
				};
				data.steps.lastStep = data.steps.$items.last().attr( 'id' );
				data.steps.top = Math.round( data.steps.$status.offset().top );
			
			}

		},

		configure : function configure( data ){

			// Captcha
			PikiForms.captchaConfigure( data );

			// Actions
			data.$submit.click(function( event ){
				event.preventDefault();
				data.isDraft = false;
				PikiForms.submit( data );
			});

			// Save draft button
			if( data.$saveDraft.length ){
				data.$saveDraft.on( 'click', function(e){
					e.preventDefault();
					data.isDraft = true;
					PikiForms.submit( data );
				});
			}

			// Preview Button
			if( data.preview && data.$previewBack.length ){
				data.$previewBack.on( 'click', function( event ){
					event.preventDefault();
					PikiForms.previewBack( data );
				});
			}

			// Tooltips
			if( data.$tooltips.length ){

				var closeTip = function( data ){
					
					// Closing
					data.$.removeClass( 'tip-open' );
					data.$box.stop( true, true ).fadeOut( 200 );
					
					// Timeout to close
					if( data.timeClose ) clearTimeout( data.timeClose );
				
				};
				var openTip = function( data ){
					
					// Opening
					data.$.addClass( 'tip-open' );
					data.$box.stop( true, true ).fadeIn( 200 );
				
					// Timeout to close
					if( data.timeClose ) clearTimeout( data.timeClose );
				
				};
				var toggleTip = function( data ){
					if( data.$.hasClass( 'tip-open' ) ){
						closeTip( data );
					}
					else {
						openTip( data );
					}
				};
				
				data.$tooltips.each(function(){

					this.$ = this.$ || $( this );

					var data = this.$.data( 'tolltip' );
					if( data === undefined ){

						data = {
							_ : this,
							$ : this.$,
							$box : this.$.children( 'div' ),
							$bot : this.$.children( 'button' ),
							timeClose : false
						};
						this.$.data( 'tooltip', data );
						
						// Toggle trigger click
						data.$bot.bind( 'click', function(e){
							e.preventDefault();
							toggleTip( data );						
						});

						// Close button
						data.$close = $( '<button type="button" class="close">Fechar</button>' ).appendTo( data.$box );
						data.$close.on( 'click', function(e){
							e.preventDefault();
							closeTip( data );
						});

						// Creating time to close
						data.$.on( 'mouseout mouseleave', function(){
							if( data.timeClose ) clearTimeout( data.timeClose );
							data.timeClose = setTimeout(function(){
								closeTip( data );
							}, 2000 );
						});
						data.$box.on( 'mouseout mouseleave', function(){
							if( data.timeClose ) clearTimeout( data.timeClose );
							data.timeClose = setTimeout(function(){
								closeTip( data );
							}, 2000 );
						});
						// Clearing time to close
						data.$.on( 'mouseover mousemove mouseenter', function(){
							if( data.timeClose ) clearTimeout( data.timeClose );
						});
						data.$box.on( 'mouseover mousemove mouseenter', function(){
							if( data.timeClose ) clearTimeout( data.timeClose );
						});
						data.$close.on( 'mouseover mousemove mouseenter', function(){
							if( data.timeClose ) clearTimeout( data.timeClose );
						});

						var _class = data.$.parents( '.linha-field' ).data( 'machine-name' );
						data.$.addClass( _class );

					}

				});
			
			}

			// Submit on ENTER
			data.$.delegate( 'input', 'keypress', function( event ){
				if( event.which === 13 ){
					event.preventDefault();
					data.$submit.click();
				}
			});

			// Steps
			if( data.steps !== false ){
				PikiForms.initSteps( data );
			}

			// Conditionals
			PikiFields.bindConditionals();

			data.$.delegate( '.desc-error', 'click', function(e){
				this.$ = this.$ || $( this );
				this.$target = this.$target || this.$.parents( '.field-item' ).first().find( 'input,textarea' );
				if( this.$target.length ){
					this.$target.focus();
				}
			
			});

			$( 'input, textarea, select', this.$ )
				.on( 'focus', function(){
					this.$ = this.$ || $( this );
					this.$.parents( '.linha-field' ).first().addClass( 'focus' );
				})
				.on( 'blur focusout', function(){
					this.$ = this.$ || $( this );
					this.$.parents( '.linha-field' ).first().removeClass( 'focus' );
				})
			;

			// Atualiza os botões
			PikiForms.actualizeButtons( data );

			// Callbacks
			PikiFields.call();

		},

		captchaConfigure : function( data ){
			
			data.$captchaField = $( 'input#recaptcha', data.$ );
			if( data.$captchaField.length ){
			
				data.useCaptcha = true;
				data.$recaptcha = $( 'div[data-recaptcha-key]' );
				data.recaptchaKey = data.$recaptcha.data( 'recaptcha-key' );
				data.recaptchaID = data.$recaptcha.attr( 'id' );
				grecaptcha.ready(function(){
			
					data.recaptcha = grecaptcha.render(
						data.recaptchaID, 
						{
	                		'sitekey' : data.recaptchaKey,
	                		'size' : 'invisible',
	                		'callback' : function( token ){
	                			PikiForms.captchaCallback( data, token );
	                		}
	                	}
	                );
			
				});
			
			}

		},

		// Captcha callback
		captchaCallback : function( data, token ){

			// Insert captcha token
			data.$captchaField.val( token );			
			// Submit form
			PikiForms.submit( data );
		
		},

		// Termos de uso
		bindTermos : function( data ){

			data.useTerms.on( 'change', function(e){
				if( data.useTerms.prop( 'checked' ) === true ){
					data.useTermsOrigin = 'field';
					PikiForms.checkTerms( data );
				}
			});
			
            data.useTermsWrapper.off( 'click.termsUse' ).on( 'click.termsUse', '[data-modal-target]', function(e){
                e.preventDefault();
                data.useTermsOrigin = 'link';
                PikiForms.openTerm( data, this );
            });

        },

        openTerm : function( data, el ){
            PikiForms.openModal( data, el );
        },

        checkTerms : function( data ){
			
			var pends = data.useTermsLinks.not( '.accepted' );
			
			if( pends.length ){
				data.useTerms.prop( 'checked', false );
                PikiForms.openTerm( data, pends.first().get( 0 ) );
			}
			else {
				data.useTerms.prop( 'checked', true );
				data.useTerms.trigger( 'accept' );
			}
        
        },

        callbackTerms : function( data, el ){
        	
        	el.$.addClass( 'accepted' );        	
        	el.$.trigger( 'accept' );        	

        	if( data.useTermsOrigin === 'field' ){
	        	PikiForms.checkTerms( data );
	        }
	        else {

	        	var pends = data.useTermsLinks.not( '.accepted' );
	        	if( !pends.length ){
	        		data.useTerms.prop( 'checked', true );
	        	}

        	}
       
		},

        openModal : function( data, el ){

            el.$ = el.$ || $( el );

            var labelButton = el.$.data( 'modal-label-button' ) || 'ok';

            $.ajax({
                type: "POST",
                url: Piki.blogurl + '/' + el.$.data( 'modal-target' ) + '/',
                dataType : 'HTML',
                success: function( response, status, xhr ){

                    var $html = $( response );
                    var $title = $( '.page-title', $html ).html();
                    var $content = $( '#content' , $html ).html();
                    
                    Message.open({
                        title : '<span>' + $title + '<span>',
                        message : $content,
                        fitScreen : true,
                        buttons : [
                        	{
                        		label : labelButton,
                        		classname : 'button small',
                        		callback : function(){
                        			PikiForms.callbackTerms( data, el );
                        		}
                        	}
                        ],
                        classname : 'form-useterms',
                    });

                }
            
            });

        },

		initSteps : function initSteps( data ){
							
			data.steps.$triggers.on( 'click', function( event ){
				this.$ = this.$ || $( this );
				PikiForms.changeStep( data, this.$.attr( 'rel' ) );
			});
						
			// Oculta todos os passos
			data.steps.$items.removeClass( 'current' );
			
			// Mostra só o passo ativo
			if( window.location.hash != '' ){
				var _current = window.location.hash.replace( '#', '' );
				data.steps.$step.val( _current );
			}
			else {
				var _current = data.steps.$step.val();
			}
			//data.steps.$items.filter( '#'+_current ).addClass( 'current' ).slideDown();

			// Back Button
			data.$backButton = false;
			// data.$backButton = $( '<input type="button" class="prev-step" data-action="prev-step" value="Anterior"></button>' ).appendTo( data.$footer );
			// data.$backButton.on( 'click', function(){
			// 	PikiForms.prevStep( data );
			// });
			
			// Atualiza o status
			PikiForms.changeStep( data, _current, true );

			// Scroll
			// $( window ).bind( 'scroll', function(){
			// 	PikiForms.statusPosition( data );
			// });

		},

		// Mostrando o status
		statusPosition : function statusPosition( data ){
			var scrollTop = Math.round( $( window ).scrollTop() );
			if( scrollTop > data.steps.top ){
				data.$.children( '.form-fields' ).css( 'padding-top', data.steps.$status.outerHeight() );
				data.steps.$status.css({ position: 'fixed', top: 0 });
			}
			else {
				data.$.children( '.form-fields' ).css( 'padding-top', 0 );
				data.steps.$status.css({ position: 'relative', top: 'none' });
			}
		},

		// Mudando o passo
		changeStep : function changeStep( data, step, initing ){

			PikiForms.clearErrors( data );

			// Button label
			if( data.steps.nextLabel !== undefined  ){
				var newLabel = ( step === data.steps.lastStep ) ? data.$submit.data( 'PikiForm' ).initialLabel : data.steps.nextLabel;
				data.$submit.html( newLabel ).attr( 'title', newLabel );
			}

			// Break in actual step
			var stop_steps = '';
			
			// Changing statuses
			data.steps.$triggers.removeClass( 'before-current current error' );
			data.steps.$triggers.each(function(e){

				this.$ = this.$ || $( this );

				if( stop_steps ) return;

				if( this.$.attr( 'rel' ) === step ){
					this.$.addClass( 'current' );
					stop_steps = true;
				}
				else {
					this.$.addClass( 'before-current' );
				}
			
			});

			if( initing === undefined && data.steps.$actual.attr( 'id' ) === step ){
				return;
			}

			// Keep step value
			data.steps.$step.val( step );

			// Triggering
			data.$.trigger( 'onChangeStep', [ data, step ] );

			// Shoing
			data.steps.$actual.stop( true, true ).fadeOut( 300, function(){

				this.$ = this.$ || $( this );
				this.$.removeClass( 'current' );

				var $next = data.steps.$items.filter( '#' + step );
				
				$next.stop( true, true ).addClass( 'current' );
				if( initing === undefined ){
					$next.fadeIn( 200 )
				}
				else {
					$next.slideDown();
				}

				data.steps.$actual = $next;
				
				PikiForms.actualizeButtons( data );
			
			});

		},

		// Próximo passo
		nextStep : function nextStep( data ){	
			var $next = data.steps.$actual.next();
			if( $next.length ){
				PikiForms.changeStep( data, $next.attr( 'id' ) );
			}
		},

		// Passo anterior
		prevStep : function prevStep( data ){
			var $prev = data.steps.$actual.prev( '.form-step' );
			if( $prev.length ){
				PikiForms.changeStep( data, $prev.attr( 'id' ) );
			}
		},

		// Atualizando os botões
		actualizeButtons : function actualizeButtons( data ){

			if( !data.steps ){
				return;
			}

			var total_steps = data.steps.$items.length;
			var actual_index = data.steps.$items.index( data.steps.$actual ) + 1;

			if( data.$backButton ){	
				if( actual_index == 1 ){
					data.$backButton.hide();
				}
				else{
					data.$backButton.show();
				}
			}

			if( actual_index === 0 ){
				data.$footer.slideUp();
			}
			else if( actual_index < total_steps ){
				data.$submit.val( 'Próxima' );
			}
			else{
				if( data.preview ){
					data.$submit.val( 'Próxima' );
					data.$action.val( 'preview' );
				}
				else {
					data.$submit.val( data.$submit.data( 'PikiForm' ).initialLabel );
				}
			}

		},

		// Submetendo
		submit : function submit( data ){

			// Recaptcha
			if( data.useCaptcha && data.$captchaField.val() === '' ){
				grecaptcha.execute( data.recaptcha );
				return;
			}

			// Limpando os erros
			PikiForms.clearErrors( data );
			
			try { tinyMCE.triggerSave(); }
			catch( e ){}

			// Tipo de callback
			var submit_callback = data.$action.val() == 'preview' ? 'previewCallback' : 'submitCallback';

			// URL
			var url = data.isAdmin === true ? ajaxurl : data.$.attr( 'action' );

			// Save draft
			if( data.canSaveDraft ){
				if( data.isDraft === true ){
					data.$doSaveDraft.val( 'on' );
				}
				else{
					data.$doSaveDraft.val( 'off' );
				}
			}

			// Submetendo o form
			data.$.ajaxSubmit({
				url : Piki.ajaxurl + '?action=submit_form',
				type: "POST",
				dataType: 'text',
				iframe: false,
				beforeSubmit:  function(){
					$.fn.pikiLoader( 'all' );
				},
				success: function( responseText, statusText, xhr, sForm ){

					$.fn.pikiLoader( 'close' );
					
					try{
						var jSon = $.parseJSON( responseText );
					}
					catch( err ){
						var jSon = false;
					}
					
					if( data.$action.val() == 'preview' && !jSon  ){
						
						PikiForms.previewCallback( data, responseText );
					
					}
					else if( !jSon ){
						
	                    Message.open({
	                        title : 'Ops!',
	                        message : xhr.responseText,
	                        classname : 'align-left alert',
	                    });
						return false;
					
					}
					else if( jSon.error_message !== undefined ){

						if( jSon.redirect ){
							
							document.location.href = jSon.redirect;
						
						}
						else {
						
							Message.open({
		                        title : ( jSon.title !== undefined ? jSon.title : 'Ops!' ),
		                        message : jSon.error_message,
		                        classname : 'align-left alert',
		                        buttons : jSon.buttons !== undefined ? jSon.buttons : false
							});

						}

						return;
					
					}
					else{
						
						PikiForms.submitCallback( data, jSon );
					
					}
				
				},
				error: function( response, statusText, xhr, sForm ){

					$.fn.pikiLoader( 'close' );

                    Message.open({
                    	classname : 'alert',
                        title : response.statusText,
                        message : response.responseText
                    });
				
				}
			
			});
		
		},

		submitCallback : function submitCallback( data, jSon ){
			
			// Target para rolar a página
			data.targetScroll = false;
			
			// Removendo as classes de erro
			PikiForms.clearErrors( data );
			
			// Error
			if( jSon.status === 'error' ) {
				
				// Erro de validação
				if( jSon.error_type === 'valida' ){

					PikiForms.setErrors( data, jSon.errors );
				
				}
				// Erro de processamento
				else {
					
					var message = jSon.error_message != undefined ? jSon.error_message : 'Por favor, tente novamente mais tarde.<br />Se o erro persistir, entre em contato com o adminstrador do site.';
					PikiForms.showInlineMessage( data, jSon, 'error' );
				
				}

				return false;
			
			}
			else {
				
				// Passos de formulário
				if( data.steps ){
					
					data.steps.$status.find( 'div.messages' ).slideUp();
					var _last = data.steps.$items.last().attr( 'id' );
					var _current = data.steps.$step.val();
					if( _current != _last ){
						var next_step = data.steps.$actual.next().attr( 'id' );
						PikiForms.changeStep( data, next_step );
						return;
					}
				
				}
				
				// Finalizando o formulário
				PikiForms.finish( data, jSon );

			}
		
		},

		previewCallback : function previewCallback( data, html ){

			var $preview = $( html );
			
			// Atribui o ID do ítem, se ele ainda não for setado
			$id_item_field = $( 'input#item_id', data.$ ).first();
			
			data.$.slideUp( '400', function(){

				data.$.children( '.form-fields' ).after( $preview ).hide();
				
				if( $id_item_field.val() === '' ){
					var _item_id = $( 'input#preview_item_id', $preview ).first().val();
					$id_item_field.val( _item_id );
				}

				// Organiza os botões
				data.$previewBack.show();
				if( data.$backButton !== 'undefined' ){
					data.$backButton.hide();
				}
				
				data.$submit.val( data.$submit.data( 'PikiForm' ).initialLabel );
				data.$action.val( 'publish' );

				data.$.slideDown( 'medium' );
			
			});

		},

		previewBack : function previewBack( data ){
				
			data.$.slideUp( '400', function(){
								
				data.$.children( '.form-preview' ).remove();
				data.$.children( '.form-fields' ).show();
				
				$( '.form-alter-button', data.$ ).hide();

				PikiForms.actualizeButtons();

				data.$.slideDown( 'medium' );

			});

		},

		setErrors : function setErrors( data, errors ){

			// Se existem passo no formulário
			if ( data.steps ) {

				var 
					actual_step_key = data.steps.$actual.attr( 'id' ),
					actual_step_status = errors[ actual_step_key ],
					total_steps = data.steps.$items.length,
					actual_index = data.steps.$items.index( data.steps.$actual ) + 1,
					error_step_name,
					error_step_errors
				;

				if( errors[ actual_step_key ].status === 'error' || actual_index == total_steps ){

					// Se o passo atual tem erros, os mesmos são mostrados
					if( errors[ actual_step_key ].status === 'error' ){

						PikiForms.setFieldsErros( data, errors[ actual_step_key ].errors );						
						data.steps.$triggers.filter( '[rel="'+ actual_step_key +'"]' ).addClass( 'error' );

					}
					// Se estamos no último passo, buscamos o passo com erros
					else if( actual_index == total_steps ){

						var error_step_name;
						$.each( errors, function( step_name, step_status ){
							// Verifica se o passo possui erros
							if( step_status.status == 'error' ){
								error_step_name = step_name;
							}
						});
						PikiForms.changeStep( data, error_step_name ); 
					
					}
					
					// General message
					if( data.errors.general ){
						PikiForms.showInlineMessage( data, errors, 'error' );
					}
					
				}
				// Passamos ao próximo passo
				else {
					PikiForms.nextStep( data ); 
				}

			}
			// Mostra os erros de um formulário sem passos
			else {

				// Mostras os erros
				var setErros = PikiForms.setFieldsErros( data, errors );

				// Mostra a mensagem geral de erro
				if( data.errors.general.type ){
					PikiForms.showInlineMessage( data, errors, 'error' );
				}

				// Trigger others scripts
				data.$.trigger( 'setErros', [ data ] );
			
				// Método customizado
				try { 

					var _custom_name = 'window.pikiforms_'+ data.$.attr( 'id' ) +'_set_errors';
					_custom( data._, errors ); 
				
				}
				catch( err ) {
					//console.log( err );
				}
				
				// Mostra o primeiro campo com erro
				if( data.errors.general.type !== 'inline' ){

					var _target_scroll = $( data.targetScroll );

					if( _target_scroll.length ){
						var _postop = _target_scroll.offset().top;
						//if( _postop == 0 ){
						//	_postop = $( data.targetScroll ).parents( '.fieldset-group-fields' ).first().offset().top;
						//}
						//if( data.steps ){
						//	_postop -= data.steps.status.outerHeight();
						//}
						PikiForms.setScroll( _postop );

					}					

				}

			}

			// Mostra o modal com a descrição dos erros
			if( data.errors.general.type === 'modal' ){

				Message.open({
                    title : 'Erro',
                    message : setErros.messages,
                    classname : 'form-error',
                    onClose : function(){
                    	PikiForms.setScroll();
                    }
                });

			}

			// Triger events
			data.$.trigger( 'setErrors', [ data, errors ] );

		},

		finish : function finish( data, jSon ){
			
			if( data.steps ){

				console.info( "data.steps" );
				console.log( data.steps );
			
				var _last = data.steps.$items.last().attr( 'id' );
				var _current = data.steps.$step.val();
			
				if( _current != _last ){

					PikiForms.nextStep( data );
					return;
				
				}
			
			}

			// Triger events
			data.$.trigger( 'finish', [ data, jSon ] );

			// Callback
			if( data.finishCallback !== undefined ){
				data.finishCallback( data.$, jSon );
			}

			// Name of custom finish for this form
			var _custom_name = 'window.pikiforms_'+ data.$.attr( 'id' ) +'_submit';

			// Método customizado para o form atual
			try { 
				
				_custom = eval( _custom_name );
				_custom( data.$, jSon, data ); 
				return true;
			
			}
			catch( err ) {

				// Se uma url de redirecionamento foi fornecida
				if( jSon.redirect !== undefined && jSon.redirect !== false && jSon.redirect !== '' ){
					
					$.fn.pikiLoader( 'all' );
					window.location.href = jSon.redirect;
					return;
				
				}

				// Message
				var message = 'Dados cadastrados com sucesso.';
				if( jSon.message !== undefined ){
					message = jSon.message;
				}
				else if( data.success.message ){
					message = data.success.message;
				}

				// Elements to hide
				if( data.success.tohide ){
					$( data.success.tohide ).slideUp( 200 );
				}

				// Inline message
				if( data.isSettingsForm || data.success.type == 'inline' ){

					PikiForms.showInlineMessage( data, { message: message }, 'success' );

				}
				// Slide
				else {

					// Modal or Slide
					if( data.success.type === 'modal' ){

						Message.open({
	                        title : false,
	                        message : message,
	                        classname : 'form-success form-' + data.$.attr( 'id' ),
	                        onClose : function(){
	                        	PikiForms.setScroll();
	                        }
	                    });

					}
					else {

						data.$.stop().slideUp( 400, function(){
							
							// Mensagem de sucesso
							if( !data.success.$ ){
								
								var html_success = '';
								html_success += '<div id="status-message" class="clearfix success">';
								html_success += '	<div class="content">' + message + '</div>';
								html_success += '</div>';							
								data.success.$ = $( html_success ).hide().insertAfter( data.$ ).hide();
								
								// Reload button
								var $reload = data.success.$.find( '.reload-form' );
								if( $reload.length ){
									$reload.data( 'PikiForm', { wrapper : $success }).click(function(){
										var _reload_data = $( this ).data( 'PikiForm' );
										_reload_data.wrapper.stop( true, true ).slideUp( 400, function(){
											data.$.stop( true, true ).slideDown( 600 );
										});
										
									});
								}
							
							}

							data.success.$.removeClass( 'inline' ).addClass( 'slide' ).stop( true, true ).hide();
							setTimeout(function(){
								data.success.$.slideDown( 600 );
							}, 100 );
						
						});

						// Mostra o form novamente
						setTimeout(function(){
							data.success.$.slideUp( 400, function(){
								data.$.stop().slideDown( 600 );
							});
						}, 3000 );

					}

				}

				// Reseta o form
				if( !data.isSettingsForm && jSon.action !== 'edit' ){
					PikiForms.resetForm( data );
				}
				
				return true;
			}

		},

		// Show inline message
		showInlineMessage : function( data, jSon, status ){

			var classname = !data.errors.general.class ? 'error' : data.errors.general.class;

			try { 

				var _custom_name = 'window.pikiforms_'+ data.$.attr( 'id' ) +'_inline_message';
				_custom = eval( _custom_name );
				_custom( data.$, jSon ); 
				return true;
			
			}
			catch( err ) {

				var message = 'Verifique os campos marcados e tente novamente';

				if( status === 'error' ){

					if( !data.errors.general.type ) return;

					// Mensagem pré definida
					if( data.errors.general.message ){
						message = data.errors.general.message;
					}
					
					// Primeira mensagem
					else if( data.errors.general.type === 'first_error' ){
						message = PikiForms.firstErrorMessage( jSon );
					}
				
				}
				else {
					
					// Mensagem padrão
					if( jSon.message !== undefined ){
						message = jSon.message;
					}
					else if( data.success.message ){
						message = data.success.message;
					}
					else {
						message = ( 'Dados ' + ( data.$action.val() === 'edit' ? 'cadastrados' : 'atualizados' ) + ' com sucesso' );
					}
				
				}

				if( message ){

					// Status
					var $status = data.$.find( 'div.form-status' );
					if( !$status.length ){
						$status = $( '<div class="status form-status inline"><div class="content"></div><button type="button" class="close"><span>Fechar</span></button></div>' ).hide();
					}

					// Insert message
					if( data.errors.general.target ){

						$status.prependTo( $( data.errors.general.target ) );
					
					}
					else { 
					
						if( data.steps ){
					
							$status.insertAfter( data.steps.$status );
					
						}
						else {

							// success_target					
							if( data.success.target ){

								if( data.success.target === 'after' ){
									$status.appendTo( data.$ );
								}
								else {
									$status.prependTo( data.$ );
								}

							}
							else {

								$status.prependTo( data.$ );

							}							
					
						}
					
					}

					// Close button
					$status.on( 'click', 'button.close', function(e){
						$status.stop( true ).slideUp();
					});
					
					// Show message
					$status
						.stop()
						.removeClass( 'error success alert' )
						.addClass( status )
						.children( '.content' )
						.html( message )
					;
					$status.slideDown();

					// Scroll to message
					var _postop = $status.offset().top;
					PikiForms.setScroll( _postop );
					
					// Hide message after 5 secunds
					if( status === 'success' ){
						//$status.delay( 5000 ).slideUp();
					}

				}

			}
			
		},			

		// Primeira mensagem de erro
		firstErrorMessage : function( response ){

			// General error messages
			if( response.error_message !== undefined ){
				return response.error_message;
			}
 
 			// Form error messages
			var first_message = response[ Object.keys( response )[ 0 ] ];
			if( first_message !== undefined ){

				if( typeof first_message.error === 'string' ){
					message = first_message.error;
				}
				else {

					var fsetErros = first_message.error.pop().errors;
					message = fsetErros[ Object.keys( fsetErros )[ 0 ] ].error;
				
				}

				return message;
			
			}

			return false;

		},

		clearErrors : function clearErrors( data ){
					
			// Hide status error						
			var $status = data.$.find( 'div.form-status' );
			if( $status.hasClass( 'error' ) ){
				$status.hide();
			}
			
			// Descs and classes
			$( '.error', data.$ ).removeClass( 'error' );
			$( '.error-wrapper', data.$ ).removeClass( 'error-wrapper' );
			$( '.desc-error' ).stop( true, true ).fadeOut( 100 );

			// Hide description, if exists
			var $descriptions = data.$.find( '.field-item .description' );
			if( $descriptions.length ){
				$descriptions.delay( 100 ).fadeIn( 200 );
			}
			
			// Fieldset errors
			$( 'div.fset-error-status', data.$ ).stop( true, true ).slideUp( 100 );
		
		},

		// Clearing field error
		clearFieldError : function( $field ){

			$field.removeClass( 'error' );
			$( '.error', $field ).removeClass( 'error' );
			$( '.desc-error', $field ).stop( true, true ).fadeOut( 100 );

			var $descriptions = $field.find( '.field-item .description' );
			if( $descriptions.length ){
				$descriptions.delay( 100 ).fadeIn( 200 );
			}

		},

		// Marca os campos com erro
		setFieldsErros : function setFieldsErros( data, fields, weight ){
			
			// Mensagens
			var messages = new Array();
			// Peso
			if( weight == undefined ){ weight = 0; }

			$.each( fields, function( i ){
				
				var _parent = this;

				// Se for fieldset, marca os campos filhos com erros
				if( this.field.ftype === 'fieldset' ){

					// Seta o erro apenas no fieldset
					if( $.type( this.error ) === 'string' ){

						var $fset = $( '#' + this.field.machine_name, data.$ );

						$fset.addClass( 'fset-error' );

						var $fset_message = $fset.find( 'div.fset-error-status' );
						if( !$fset_message.length ){
							$fset_message = $( '<div class="fset-error-status"></div>' ).prependTo( $fset ).hide();
						}
						$fset_message.html( this.error ).slideDown( 400 );

					}
					
					// Seta os erros 
					else {

						$.each( this.error, function( si ){
							
							_fset_erros = PikiForms.setFieldsErros( data, this.errors, si );

							if( _fset_erros ){
								if( si === 0 ){
									targetScroll = _fset_erros.targetScroll;							
								}
								messages.push( '<div class="fieldset"><h3>'+ _parent.field.label +'</h3><p class="subfields">'+ _fset_erros.messages +'</p></div>' );
							}
						});

					}
					
				}

				// Campos comuns
				else {

					var _target;

					if( data.isPikiAdminForm === true ){
						_target = 'input#title';
					}
					else {
						_target = '.linha-field.' + this.field.machine_name;
					}
					
					// Scrolling
					if( data.targetScroll === false ){
						data.targetScroll = _target;
					}

					// Target
					var $target = data.$.find( _target ).eq( weight );
					$target.addClass( 'error' );

					// Tooltips and Inline reports
					if( data.errors.fields.type ){
						
						var $target_desc;
						var $desc_error;
						var $description;
						
						// Get target
						if( data.errors.fields.type == 'tooltips' ){
						
							if( !data.errors.fields.location ){
								data.errors.fields.location = '.linha-field-label';
							}
						
							$target_desc = $target.children( data.errors.fields.location );
						
						}
						else {

							if( data.materialize ){
								$target_desc = $target;
							}
							else {
								if( !data.errors.fields.type.location ){								
									data.errors.fields.type.location = '.field-item';
								}
								$target_desc = $target.find( data.errors.fields.location );
							}
							

							// Description
							$description = $target.find( '.description' );
							if( $description.length && data.errors.fields.location === '.field-item' ){
								$description.hide();
							}
						
						}
						
						$desc_error = $target_desc.children( 'span.desc-error' );
						
						if( !$desc_error.length ){
							
							if( data.errors.fields.type == 'tooltips' ){
								$desc_error = $( '<span class="desc-error tooltip" title="'+ this.error +'"></span>' ).hide().appendTo( $target_desc );
							}
							else {
								$desc_error = $( '<span class="desc-error inline">'+ this.error +'</span>' ).hide().appendTo( $target_desc );
							}

						}
						else {

							if( data.errors.fields.type == 'tooltips' ){
								$desc_error.attr( 'title', this.error );
							}
							else {
								$desc_error.html( this.error );
							}

						}
						
						setTimeout(function(){	
							$desc_error.stop( true, true ).slideDown( '300' );
						}, 10 );
					
					}

					// Adiciona a mensagem de erro
					messages.push( '- ' + this.error );

				}
			});

			$( '.desc-error', data.$ ).tooltip({
				position: { my: "left+3 center", at: "right center" },
				tooltipClass: "pikiform-tooltip-error"
			});

			// Se houver algum erro, retorna os erros e o primeiro elemento com erro
			if( messages.length > 0 ){
				return {
					messages : messages.join( '<br />' )
				};	
			}
			// Não há erros
			else {
				return false;
			}

		},

		// Scrolling to position
		setScroll : function( position, offset ){

			// Start scroll
			var startScroll = this.getStartScroll();

			// Offset
			if( offset === undefined ) offset = 0;

			if( position === undefined ){
				position = startScroll - 10;
			}
			else {
				position -= startScroll;
			}

			$('html,body').animate({
	        	scrollTop: position
	      	}, 800 );

			//$(window).scrollTo( position );

		},

		resetForm : function resetForm( data ){
			data.$.reset();
			PikiForms.clearErrors( data );
		}

	};

	window.pikiform_do_delete = function( $button ){
		
		$.fn.pikiLoader( 'all' );
		var $actions_box = $button.parents( '.pikiforms-actions-buttons' );
		var request = $.ajax({
			url: $( 'a.delete', $actions_box ).attr( 'href' ),
			type: "POST",
			dataType: "json",
		});
		
		request.done(function( jSon ) {
			$.fn.pikiLoader( 'close' );
			if( jSon.status == 'error' ){
				$.fn.pikiAlert( 'Ops! Ocorreu um erro.<br />Por favor, tente novamente mais tarde.<br />Se o erro persistir, entre em contato com o adminstrador do site.' )
			}
			else{
				$actions_box.addClass( 'success' );
				$( 'div.bttons', $actions_box ).hide();
				$( 'span.question', $actions_box ).html( jSon.message );
				if( jSon.redirect != undefined ){
					setTimeout( "window.location.href='" + jSon.redirect + "';", 1500 )
				}
			}
		});
		
		request.fail(function( jqXHR, textStatus ) {
			Message.open({
				classname : 'alert',
                title : 'Ops!',
                message : 'Problema ao remover ítem: ' . response.responseText
            });
		});
	
	};

})(jQuery);
