(function($){
	// Distribui nodes em colunas
	$.fn.pikiWall = function( method ){
		
		var pluginArgs = arguments;
		
		return this.each(function(){

			var $this = $( this );
			var _this = this;

			// Configura
			this.configure = function(){

			    // Default options
			    var defaults = { 
					cols: false,
					sizes: [],
					tooths: [],
					squares: true,
					breakpoints: false
			    };

				// Se foi passado um objeto de configurações
				if( typeof method == 'object' ){
					this.options = $.extend( {}, defaults, method ); 
				}
				else {
					this.options = defaults;
				}

				// Timeout
				this.timeout = null;
				
				// Ítems da parede
				this.items = $this.children();
				
				// Se não há filhos
				if( !this.items ){ return; }

				// Breakpoint atual
				this.actualBreak = false;
				
				// Organiza
				_window.bind( 'resize', function(){
					clearTimeout( _this.timeout );
					_this.timeout = setTimeout( _this.resize, 50 );
					
				}).resize();

			};

			// Breakpoints
			this.getBreakpoint = function(){
				// Padrão de retorno
				var noBreaks = {
					cols: _this.options.cols,
					sizes: _this.options.sizes,
					tooths: _this.options.tooths,
					squares: _this.options.squares,
					width: false
				};
				// Se não tem nenhum breakpoint
				if( !this.options.breakpoints ){
					return noBreaks;
				}
				// Tamanho total da janela
				this.fullwidth = $this.width();
				// Total de breakpoints
				var totalBreaks = this.options.breakpoints.length;
				// Breakpoint de retorno
				var returnBreak = false;
				// Procura o breakpoint aplicável
				for( var b = 0; b < totalBreaks; b++ ){
					if( this.fullwidth <= this.options.breakpoints[ b ].width ){
						returnBreak = this.options.breakpoints[ b ];
					}
				}
				// Se há um breakpoint aplicável
				if( returnBreak !== false ){
					return returnBreak;
				}
				// Nenhum breakpoint
				return noBreaks;
			};

			this.resize = function(){

				var breakpoint = _this.getBreakpoint();

				// Se ainda é o mesmo breakpoint, apenas ajusta os tamanhos
				if( breakpoint.width === _this.actualBreak.width ){
					_this.setSizes( breakpoint );
					return;
				}

				// Distribuindo nas colunas
				var totalCols = breakpoint.cols === false ? 0 : parseInt( breakpoint.cols );
				var actualCols = _this.cols === undefined || _this.getTotalCols() === 0 ? 0 : _this.cols.length;
				if( totalCols !== actualCols ){
					_this.distributeToCols( breakpoint );
				}

				// Ítems quadrados
				_this.setSizes( breakpoint );

				// Guarda os dados
				_this.actualBreak = breakpoint;

			};

			this.distributeToCols = function( breakpoint ){

				// Se já existem colunas
				if( this.cols !== undefined && this.cols.length ){

					// Total de colunas
					var totalCols = this.cols.length;
					
					// Enquanto houverem colunas
					while( this.getTotalCols() > 0 ){
						
						// Remove os ítems das colunas
						for( var ccs = 0; ccs < totalCols; ccs++ ){
							
							// Coluna
							var $col = this.cols.eq( ccs );
							
							// Ítem
							var $items = $col.children();
							
							// Se há ítems
							if( $items.length ){
								
								// Remove o ítem
								var $toPass = $items.first();
								$toPass.appendTo( $this );
								
								// Se a coluna está vazia, removemos a mesma
								if( $col.children().length === 0 ){
									$col.remove();
								}

							}

						}
						
					}

				}
					
				// Criando as colunas
				for ( var c = 0; c < breakpoint.cols; c++ ){
					// Tamanho horizontal da coluna
					var col_width = breakpoint.sizes.length && breakpoint.sizes[ c ] !== undefined ? breakpoint.sizes[ c ] : ( 100 / breakpoint.cols );
					// Nova coluna
					var $new_col = $( '<div class="col pos-'+ ( c + 1 ) +'" />' ).css({ float: 'left', width: col_width + '%' }).appendTo( $this );
					// Inserindo os 'dentes' na coluna
					if( breakpoint.tooths.length && breakpoint.tooths[ c ] !== undefined && parseInt( breakpoint.tooths[ c ] ) > 0 ){
						$new_col.css( 'margin-top', breakpoint.tooths[ c ] );
					}
				}
				this.cols = $this.children( '.col' );
				
				// distribuindo os ítems
				var cont = 0;
				this.items.each(function(i){
					// Ítem
					var $item = $( this );
					// Coluna de destino
					var $col = _this.cols.eq( cont );
					$item.appendTo( $col ).css({ width:  '100%' });
					// Coluna da vez
					cont = cont == ( breakpoint.cols - 1 ) ? 0 : cont + 1;
				});
			
			};

			this.getTotalCols = function(){
				return $this.children( '.col' ).length;
			};

			this.setSizes = function( breakpoint ){

				var totalItems = this.items.length;
				for (var ti = 0; ti < totalItems; ti++ ) {
					
					var $item = this.items.eq( ti ).addClass( 'notransition' );

					// Width
					var itemWidth;
					if( breakpoint.sizes !== undefined && ( typeof breakpoint.sizes === 'string' ) ){
						$item.css( 'width', breakpoint.sizes );
					}
					else {
						$item.css( 'width', '' );
					}

					// Height
					var itemHeight;
					if( this.options.squares === true ){
						$item.css({ height: $item.width() });
					}

					$item.removeClass( 'notransition' );

				}

			};

			// Chamando os métodos
			var toCall;
			if( typeof method == 'object' ){
				this.configure.apply( this, pluginArgs );
			}
			else if( ( toCall = eval( "this." + method ) ) === undefined ){
				if( this.ready !== undefined ){ return; }
				this.configure.apply( this, pluginArgs );
			}
			else{ toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) ); }

		});

	};
})(jQuery);
