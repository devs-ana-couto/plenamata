(function($){

	var PKSFMethods = {
		
		configure : function configure( data ){
			
			// Open first
			if( data.$.attr( 'data-open-first' ) === 'false' ){
				data.openFirst = false;
			}
			// Se tudo já foi inicializado
			data.initialized = false;
			// Actual style
			data.actualStyle = false;
			// Timeout
			data.timeout = false;
			// Se está ativado
			data.enabled = false;
			// Headers
			data.$headers = [];
			// Contents
			data.$contents = [];
			// Navigation
			data.navigation = false;
			
			// Ítems da sanfona
			data.$items = data.$.find( data.items );
			if( !data.$items ){ 
				console.info( 'Sanfona: Não foi encontrado nenhum ítem:' + data.items );
				return;
			}
			// Headers
			data.$headers = data.$items.find( data.headers );
			if( !data.$headers.length ){ 
				console.info( 'Sanfona: Não foi encontrado nenhum header: ' + data.headers );
				return; 
			}
			// Contents
			data.$contents = data.$items.find( data.contents );
			if( !data.$contents.length ){ 
				console.info( 'Sanfona: Não foi encontrado nenhum conteudo: ' + data.contents );
				return; 
			}

			// Triggers on mobile
			data.triggers = data.$.data( 'triggers' );

			// Associando os headers aos conteúdos
			data.$items.each(function(i){

				this.$ = this.$ || $( this );

				// Header
				this.header = data.$headers.eq( i );
				this.header.get( 0 ).target = data.$items.eq( i );
			
				// Content
				this.content = data.$contents.eq( i );
				this.content.get( 0 ).target = data.$items.eq( i );
				
				if( data.triggers ){
					var _this = this;
					this.$.on( 'click', '.trigger', function(e){
						_this.header.trigger( 'click' );
					});
				}
			
			});
			
			// Se existem links nos headers
			data.$headers.children( 'a' ).bind( 'click.pikiSanfona', function( event ){

				event.preventDefault();
				
				this.$ = this.$ || $( this );
				
				// Hash
				var hash = this.$.attr( 'href' );
				if( hash !== undefined && hash !== '' ){
					
					if( hash.indexOf( 'http' === 0 ) ){
						hash = '#' + hash.split( '#' ).pop();
					}

					var $item = $( hash ).attr( 'id', '' );
					window.location.hash = hash;
					$item.attr( 'id', hash );

					var _referrer = Cookie.get( 'originReferrer' );

				}
			});

			// Responsive
			if( data.breakpoint !== false ){					
				$( window ).bind( 'resize', function(){
					PKSFMethods.resizeBind( data );
				}).resize();
			}
			// Static size
			else {
				PKSFMethods.enable( data, data.style );
			}
			
			// Abrindo pela URL
			var hash = window.location.hash;
			var $item_to_open = data.$items.filter( window.location.hash );
			if( $item_to_open.length ){
				PKSFMethods.toggleItem( data, $item_to_open, true );
			}

			data.initialized = true;

		},
		resize : function resize( data ){
			// Viewport
			var viewport = piki_get_viewport();
			// Estilo para aplicar
			var styleToApply = data.style;
			// Breakpoint
			if( viewport.width <= data.breakpoint.width ){
				styleToApply = data.breakpoint.style;
			}
			// Aplica o estilo, se necessário
			if( styleToApply !== data.actualStyle ){
				if( data.enabled !== true ){
					PKSFMethods.enable( data, styleToApply );
				}
				else {
					PKSFMethods.applyStyle( data, styleToApply );
				}
			}
		},
		enable : function enable( data, style ){
			// Main classes
			data.$.addClass( 'piki-sanfona ' + ( style === undefined ? data.style : style ) );
			// Items
			data.$items.addClass( 'sanfona-item' );
			// Headers
			data.$headers.addClass( 'sanfona-header' );
			data.$.on( 'click.pikiSanfona', '.sanfona-header', function( event ){
				event.preventDefault();
				PKSFMethods.doClick( data, this );
			});
			// Contents
			data.$contents.addClass( 'sanfona-content' );
			// Status
			data.enabled = true;
			// Estilo selecionado
			PKSFMethods.applyStyle( data, style );				
		},
		disable : function disable( data ){
			// Main classes
			data.$.removeClass( 'piki-sanfona ' + data.style );
			// Items
			data.$items.removeClass( 'sanfona-item' );
			// Headers
			$data.$.off( '.pikiSanfona', '.sanfona-header' );
			data.$headers.removeClass( 'sanfona-header' );
			// Contents
			data.$contents.show();
			data.$contents.removeClass( 'sanfona-content' );
			// Status
			data.enabled = false;
		},
		applyStyle : function applyStyle( data, style ){
			
			// Restando a classe
			data.$.removeClass( 'sanfona abas' ).addClass( style );
			
			// Ítem aberto
			var $opened = data.$items.filter( '.opened' );
			
			// Se o estilo será mudado
			var styleChanged = false;
			
			// Abs
			if( style === 'abas' && data.actualStyle !== 'abas'  ){

				// Fecha todos
				data.$contents.hide();

				data.navigation = $( '<ul class="sanfona-controls clear"></ul>' ).prependTo( data.$ );
				data.$headers.each(function(x){
					var newTab = $( '<li class="x-'+ (x+1) +'"></li>' ).appendTo( data.navigation );
					$( this ).appendTo( newTab );
				});
				
				// Triggers
				if( data.triggers ){
					var $triggers = data.$items.children( '.trigger' );
					if( $triggers.length ) $triggers.remove();
				}
				
				data.$.addClass( 'abas' )
				data.actualStyle = 'abas';
				styleChanged = true;
			
			}
			
			// Sanfona
			else if( style === 'sanfona' && data.actualStyle !== 'sanfona' ){

				// Esconde os conteúdos
				data.$contents.hide();

				// Headers
				data.$headers.each(function(){
					$( this ).prependTo( this.target );
				});
				
				// Navigation
				if( data.navigation.length ){
					data.navigation.remove();
				}

				// Triggers
				if( data.triggers ){
					data.$items.each(function(){
						data.trigger = $( '<button class="trigger">'+ data.triggers +'</button>' ).appendTo( this.$ );
					});
				}

				data.$.addClass( 'sanfona' );
				data.actualStyle = 'sanfona';
				styleChanged = true;
			
			}
			// Se o estilo foi mudado
			if( styleChanged ){
				PKSFMethods.clearClasses( data );
				if( $opened.length ){
					PKSFMethods.toggleItem( data, $opened, true );
				}
				else if( data.openFirst === true ){
					PKSFMethods.toggleItem( data, data.$items.first(), true );
				}
			}
			// Callback after change style
			if( data.breakpoint !== undefined && data.breakpoint.callback !== undefined ){
				data.breakpoint.callback.call( data._ );
			}
		},
		resizeBind : function resizeBind( data ){
			clearTimeout( data.timeout );
			data.timeout = setTimeout(function(){
				data.$.pikiSanfona( 'resize' );
			}, 500 );
		},
		doClick : function toggleItem( data, clicked ){
			var $item = clicked.target;
			PKSFMethods.toggleItem( data, $item, false, true );
		},
		toggleItem : function toggleItem( data, $item, stopAnimate, scrollTo ){

			if( stopAnimate === undefined ){ stopAnimate = false; }
			if( scrollTo === undefined ){ scrollTo = false; }

			var clicked = $item.get( 0 );
			
			var isOpened = $item.is( '.opened' );
			if( data.actualStyle == 'abas' && isOpened === true ){
				return;
			}
			
			PKSFMethods.clearClasses( data );
			
			clicked.header.addClass( 'opened' );
			clicked.content.addClass( 'opened' );
			
			clicked.header.parent( 'li' ).addClass( 'opened' );
			
			if( !isOpened ){
				
				$item.addClass( 'opened' );

				if( stopAnimate === true ){
					
					clicked.content.show();
					
					if( scrollTo === true ){
						var offset = data.actualStyle === 'abas' ? 60 : 0;
						PKSFMethods.scrollTo( $item, offset );
					}
				
				}
				else {
					
					clicked.content.stop( true, true ).show();
					PKSFMethods.refreshSlicks( data, $item );
					clicked.content.hide();

					// Animation options
					var animeOptions = { 
						opacity: 'show', 
						height: 'show', 
						paddingBottom: 'show', 
						paddingTop: 'show' 
					};
					
					// Doing
					clicked.content.stop( true, true ).animate( 
						animeOptions, 
						{
							duration : 600,
							start : function( animation ){
								animation.elem.$ = animation.elem.$ || $( animation.elem );
								animation.elem.$.addClass( 'sliding-down' );
							},
							done : function( animation ){
								animation.elem.$ = animation.elem.$ || $( animation.elem );
								animation.elem.$.removeClass( 'sliding-down' );
							},

						}, function(){
							if( scrollTo === true ){
								var offset = data.actualStyle === 'abas' ? 60 : 0;
								PKSFMethods.scrollTo( $item, offset );
							}
						}
					);
				
				}

				if( data.triggers ){
					$item.children( '.trigger' ).html( 'Fechar' );
				}

			}
			else {
			
				$item.removeClass( 'opened' );
				$item.get(0).header.removeClass( 'opened' );
				$item.get(0).content.removeClass( 'opened' );
			
			}
			
			// Fecha os outros
			data.$items.not( '.opened' ).each(function(){

				// Animation options
				var animeOptions = { 
					opacity: 'hide', 
					height: 'hide', 
					paddingBottom: 'hide', 
					paddingTop: 'hide' 
				};
				
				// Doing
				this.content.stop( true, true ).animate( 
					animeOptions, 
					{
						duration : 600,
						start : function( animation ){
							animation.elem.$ = animation.elem.$ || $( animation.elem );
							animation.elem.$.addClass( 'sliding-up' );
						},
						done : function( animation ){
							animation.elem.$ = animation.elem.$ || $( animation.elem );
							animation.elem.$.removeClass( 'sliding-up' );
						},

					}
				);

			});

		},
		scrollTo : function scrollTo( $target, offset ){
			
			offset = parseInt( offset );

			// Espaço
			offset += 10;

			// Discount header
			var $header = $( '#masthead' );
			if( $header.length ){
				if( $header.css( 'position' ) === 'fixed' ){
					//offset += $header.outerHeight();
				}
			}

			// Discount topbar
			var $topbar = $( '#topbar' );
			if( $topbar.length ){
				if( $topbar.css( 'position' ) === 'fixed' ){
					offset += $topbar.outerHeight();
				}
			}
			
			if( offset === undefined || isNaN( offset ) ){
				offset = 0;
			}
            
            $( 'html, body' ).animate({
                scrollTop: ( $target.offset().top - offset )
            }, 500 ); 
		
		},
		refreshSlicks : function refreshSlicks( data, $parent ){
			var $slicks = $( '.slick-slider', $parent );
			if( $slicks.length ){
				for( var s = 0; s < $slicks.length; s++ ){
					var $s = $slicks.eq( s );
					if( $s.is( '.slick-initialized' ) ){
						$s.slick( 'refresh' );
					}
				}
			}
		},
		clearClasses : function clearClasses( data ){
			data.$items.removeClass( 'opened' );
			data.$contents.removeClass( 'opened' );
			data.$headers.removeClass( 'opened' );
			data.$headers.parent( 'li' ).removeClass( 'opened' );			
			if( data.triggers ){
				data.$items.children( '.trigger' ).html( data.triggers );
			} 
		}

	};
	
	// Sanfona
	$.fn.pikiSanfona = function( arg1 ){

		return this.each(function(){
			
			// Jquery object
			if( this.$ === undefined ){
				this.$ = $( this );
			}
			
			// Keeping this
			var data = this.$.data( 'pikiSanfona' );
			
			// Configurando o plugin quando necessário
			if( arg1 === undefined || typeof arg1 === 'object' ){
				
				// Se ainda não foi configurado
				if( data === undefined ){

					// Opções padrão
					var defaults = {
			        	items: '.item',
			        	headers: '.trigger',
			        	contents: '.content',
			        	breakpoint : false,
			        	effect : 'slide',
			        	style : 'sanfona',
			        	openFirst : true
					};
					
					if( typeof arg1 === 'object' ){
						data = $.extend({}, defaults, arg1 );
					}
					else {
						data = defaults;
					}

					data.$ = this.$;
					data._ = this;
					data.$.data( 'pikiSanfona', data );

					PKSFMethods.configure.apply( this, [ data ] );

				}
			
			}
			else if ( PKSFMethods[ arg1 ] ) {
			
				var otherArgs = Array.prototype.slice.call( arguments, 1 );
				Array.prototype.unshift.call( otherArgs, data );
				return PKSFMethods[ arg1 ].apply( this, otherArgs );
			
			}
	
		});
	
	};

})(jQuery);	
