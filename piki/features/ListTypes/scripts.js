(function($){

	// Máscara de carregamento
	var listTypesMethods = {

		configure : function( options ) {
			return this.each(function(){

			    // Default options
			    var defaults = { 
					afterLoad: false,
					afterChange: false,
					afterClear: false,
					afterReset: false
			    }; 

				var data = $.extend( {}, defaults, options );

				data.$ = $( this );
				data.self = this;

				// Programas
				data.programas = $( '.list-items', data.$ );
		    	
		    	// Masonry
				data.programas.masonry({
					columnWidth: 'span.grid-sizer',
					itemSelector: 'a.item-prog',
					percentPosition: true
		        });
		        
		        // Ítems na grid
		        data.items = data.programas.children( 'a.item-prog' );
		        
		        // Backup dos ítems
		        data._items = data.items.clone();
			    
			    // Recupera os ítems ativos
			    data.getItems = function(){
			    	return data.programas.children( 'a.item-prog' ).not( 'deleted' );
			    };

				// View mode
				data.cookieName = data.self.id + '_list_switcher_type';
				
				// Cookie com o modo atual
				data.cookie = window.getCookie( data.cookieName );
				
				// Setando o modo
				data.actualMode = data.cookie === undefined ? 'grid' : data.cookie;
				
				// Modo anterior
				data.beforeMode = false;

				// Header
				data.header = $( '#header-programacao' ).first();

				// Calendário
				data.calendar = data.$.children( '.calendario' );

				// Atribui os dados ao calendário
				data.$.data( 'listTypes', data );
				
				// Switcher view mode
				data.switcher = $( '.list-type-switcher[rel="'+ data.self.id +'"]' );

				data.switcher.addClass( data.actualMode );
				data.switcher.children( 'a' ).on( 'click', function(event){	
					event.preventDefault();
					var rel = $( this ).attr( 'rel' );
					if( data.actualMode === rel ){
						return;
					}
					data.beforeMode = data.actualMode;
					if( rel === 'list' ){
						data.$.listTypes( 'setMode', 'list' );
					}
					else {
						data.$.listTypes( 'setMode', 'grid' );
					}
				});

				// Modo de grade
				if( data.actualMode === 'grid' ){
					data.$.listTypes( 'setMode', 'grid' );
				}
				// Modo de lista
				else {
					data.$.listTypes( 'setMode', 'list' );
				}

				// Resize
				data.timeout = false;
				data.resize = function(){
			    	var wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			    	if( wWidth <= 640 ){
			    		if( data.actualMode !== 'phone' ){
			    			data.$.listTypes( 'setMode', 'phone' );
			    		}
			    	}
			    	else {
			    		if( data.actualMode === 'phone' ){
			    			if( data.beforeMode === 'grid' ){
			    				data.$.listTypes( 'setMode', 'grid' );
			    			}
			    			else {
			    				data.$.listTypes( 'setMode', 'list' );
			    			}
			    		}
			    	}
				};

				// Size
				$( window ).bind( 'resize', function(){
					data.$.listTypes( 'resizeBind' );
				}).resize();

			});
		
		},

		setMode : function( data, mode ){
			return this.each(function(){

				data.actualMode = mode;
				data.$.removeClass( 'list-mode grid-mode phone-mode' ).addClass( mode + '-mode' );
				data.switcher.removeClass( 'list grid phone' ).addClass( mode );
				window.setCookie( data.cookieName, mode, 365 );
				data.$.listTypes( 'resetItems', true );



				// After load event
				if( data.afterChange !== false ){
					data.afterChange.call( data.self, data );
				}

			});
		},

	    // Remover programas
	    removeItems : function( data, selector ){
			return this.each(function(){

		    	var items = data.getItems().filter( selector ).addClass( 'deleted' ); 
	    		data.programas
	    			.masonry( 'remove', items )
	    			.masonry( 'layout' )
	    		;

	    	});
	    },

	    // Adicionar programas
	    restoreItems : function( data, selector ){
			return this.each(function(){
		    	
		    	var items = data._items.filter( selector ).clone();
	    		data.programas
	    			.prepend( items )
	    			.masonry( 'prepended', items )
	    			.masonry( 'layout' )
	    		;

	    	});
	    },

	    // Remove todos os ítems
		clear : function( data, callback ){
			return this.each(function(){
		    	
		    	// Remove os ítems atuais
		    	var items = data.getItems().addClass( 'deleted' );
		    	data.programas.masonry( 'remove', items );
		    	
				// After load event
				if( data.afterClear !== false ){
					data.afterClear.call( data.self, data );
				}
		    	
				// Callback
				if( callback !== undefined ){
					callback.call( data.self, data );
				}

		    });
		},

	    // Resetando os programas
	    resetItems : function( data, forceAll ){
			return this.each(function(){

		    	// Remove todos os ítems atuais
		    	data.$.listTypes( 'clear' );

		    	// Ítems para restaurar
		    	if( forceAll === true ){
		    		data._items.removeClass( 'disabled' );
		    	}

		    	// Clona os ítems
				var items = data._items.not( '.disabled' ).clone();

		    	// Reseta a lista de progrmas
	    		data.programas
	    			.prepend( items )
	    			.masonry( 'prepended', items )
	    			.masonry( 'layout' )
	    		;

				// After load event
				if( data.afterReset !== false ){
					data.afterReset.call( data.self, data );
				}

			});
	    },

		resizeBind : function( data ){
			return this.each(function(){
				clearTimeout( data.timeout );
				data.timeout = setTimeout( data.resize, 200 );
			});
		}

	};

	$.fn.listTypes = function( method ) {
		var data = this.data( 'listTypes' );
		if( data === undefined ){
			return listTypesMethods.configure.apply( this, arguments );
		}
		else if( listTypesMethods[ method ] ){
			var args = Array.prototype.slice.call( arguments, 1 );
			args.unshift( data );
			return listTypesMethods[ method ].apply( this, args );
		}
	};

})(jQuery);
