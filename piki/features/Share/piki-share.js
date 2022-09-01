var PKShare;

(function($){

	/*
	if (navigator.canShare && navigator.canShare({ files: filesArray })) {
	  navigator.share({
	    files: filesArray,
	    title: 'Vacation Pictures',
	    text: 'Photos from September 27 to October 14.',
	  })
	  .then(() => console.log('Share was successful.'))
	  .catch((error) => console.log('Sharing failed', error));
	} else {
	  console.log(`Your system doesn't support sharing files.`);
	}
	*/

	PKShare = {

		init : function(){

			var _body = $( 'body' );

			_body.on( 'click', 'button[data-action="mobile-share"]', function(e){
				e.preventDefault();
				this.$ = this.$ || $( this );
				PKShare.bindBMobileButtonClick( this );
			});

			_body.on( 'click', '.pikishare a', function(e){
				this.$ = this.$ || $( this );
				PKShare.bindLinkClick( this, e );
			});

			var $sharers = $( '.pikishare' );
			if( $sharers.length ){

				$sharers.each(function(){

					this.$ = this.$ || $( this );

					if( navigator.share ){
						this.$.addClass( 'mobile' );
					}
					else {
						this.$.addClass( 'desktop' );
					}

					// With floater
					if( this.$.hasClass( 'style--2' ) ){
						PKShare.bindFloating( this );
					}

				});
			
			}

			PKShare.bindCopyLinks();

		},

		bindFloating : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'PKShare' );
			if( data !== undefined ) return true;

			data = {
				self : el,
				$ : el.$,
				$trigger : el.$.children( '.title' ),
				$floater : el.$.children( '.networks' ),
				$close : el.$.find( '[data-action="close"]' )
			};
			el.$.data( 'PKShare', data );

			// Trigger button
			data.$trigger.on( 'click', function(e){
			
				e.preventDefault();

				if( data.$.hasClass( 'opened' ) ){
					data.$.removeClass( 'opened' );
				}
				else {
					data.$.addClass( 'opened' );
				}
			
			});
			
			// Close button
			data.$close.on( 'click', function(e){
				e.preventDefault();
				data.$.removeClass( 'opened' );
			});

		},

		bindCopyLinks : function(){

			var $copylinks = $( 'a.copylink' );
			if( $copylinks.length ){
    	    
	    	    var clipboard = new ClipboardJS( 'a.copylink' );
	    	    var timeClip = false;
	            
	            clipboard.on( 'success', function(e){
	    
	                $( '<strong>Copiado!</strong>' ).insertAfter( $( 'span', e.trigger ) );
	                if( timeClip ) clearTimeout( timeClip );
	                
	                timeClip = setTimeout(function(){
	                    $( 'span', e.trigger ).siblings( 'strong' ).remove();
	                }, 2000 );
	    
	                e.clearSelection();
	            
	            });
	        }
		
		},

		// Mobile share
		bindBMobileButtonClick : function( button ){
		
			navigator
				.share({
					title: document.title,
					text: "Hello World",
					url: window.location.href
				})
				.then( function(){
					console.log( 'Successful share' ) 
				})
				.catch(function( error ){
					console.log( 'Error sharing:', error )
				})
			;		
		
		},

		// Desktop share
		bindLinkClick : function( link, e ){

			var url = link.href;

			// Whatsapp
			if( link.$.hasClass( 'whatsapp' ) ){
				return true;
			}
			// Mailto
			else if( link.$.hasClass( 'email' ) || link.$.hasClass( 'email' ) && url.indexOf( 'mailto:' ) === 0 ){
				return true;
			}

			// Others
			e.preventDefault();

			// Copy link
			if( link.$.hasClass( 'copylink' ) ){
				return;
			}

			link.$.PikiShare();
			
		}

	};
	$(function(){
		PKShare.init();	
	})

	// Plugin
	$.fn.PikiShare = function() {
		
		return this.each(function(){

			var $this = $( this );
			var _this = this;

			this.url = this.getAttribute( 'href' );
			this.type = this.$.data( 'type' );
			this.title = this.getAttribute( 'title' );
			this.texto = $this.attr( 'content' );

			// URL a ser compartilhada
			this.content_url = $this.parents( '.pikishare' ).first().attr( 'share-url' );

			this.loading = false;

			this.openEmail = function( data ){

				if( this.loading === true ){
					return;
				}
				else {
					this.loading = true;
				}

				$.fn.pikiLoader();

				if( this.modal === undefined ){

					var request = $.ajax({
						url: this.url,
						type: 'GET',
						beforeSend: function(){
							$.fn.pikiLoader( 'close' );
						}
					});
					request.done(function( response ) {
						
						$.fn.pikiLoader( 'close' );
						_this.modal = $( response ).appendTo( 'body' );
						_this.form = _this.modal.find( 'form' ).first().PikiForm();
						
						$( 'input.url', _this.form ).hide().after( '<span class="fake-field"></span>' );
						$( 'input.assunto', _this.form ).hide().after( '<span class="fake-field"></span>' );
						
						_this.modal.dialog({
							modal : true,
							width : 640,
							title: _this.title,
							show : { effect: 'fade', duration: 300 },
							hide : { effect: 'fade', duration: 200 },
							close : function() {
								_this.loading = false;
							}
						});

						$this.PikiShare( 'insertValues' );

					});
					request.fail(function( jqXHR, textStatus ) {
						console.log( "Request failed: " + textStatus );
					});

				}
				else {
					this.insertValues( data );
					this.modal.dialog( 'open' );
				}

				$.fn.pikiLoader( 'close' );
			};

			this.insertValues = function( data ){
				$( 'input.url', this.form ).val( this.content_url ).siblings( '.fake-field' ).first().html( this.content_url );
				$( 'input.assunto', this.form ).val( data.subject ).siblings( '.fake-field' ).first().html( data.subject );
				$( 'textarea.mensagem', this.form ).val( data.content );
			};

			if( this.type === 'pikiform-ajax-button' ){
				this.openEmail({
					subject : $this.parent().attr( 'subject' ),
					content : $this.parent().attr( 'content' )
				});
			}
			else {
				window.open( this.url, this.title, "width=500,height=500" );
			}

		});

	};

	window.pikiforms_pikishare_submit = function( $form, json ){
					
		$form.slideUp( 800, function(){

			var $form = $( this );

			// Mensagem de sucesso
			var $success = $form.closest( "#status-message" );
			if( !$success.length ){
				
				var html_success = '';
				html_success += '<div id="status-message" class="clearfix success">';
				html_success += '	' + json.message ;
				html_success += '</div>';							
				$success = $( html_success ).hide().insertAfter( $form ).hide();
				
				// Reload button
				var $reload = $success.find( '.reload-form' );
				if( $reload.length ){
					$reload.data( 'PikiForm', { wrapper : $success, target : $form }).click(function(){
						var _reload_data = $( this ).data( 'PikiForm' );
						_reload_data.wrapper.stop( true, true ).slideUp( 800, function(){
							$( 'form#pikishare' ).find( 'input.email_destino' ).focus();
							_reload_data.target.stop( true, true ).slideDown( 800 );

						});
						
					});
				}
			}

			$( 'input.email_destino', $form ).val( '' );

			$success.stop( true, true ).hide().delay( 100 ).slideDown( 800 );

		});

	};
	
})(jQuery);
