(function($){

	var IWPApp = {

		slicksActives : false,
		slicksStarteds : false,

		// Start
		init : function init(){
			$(function(){
				IWPApp.startGallerys();
			});
		},

		// Instancia as galerias
		startGallerys : function startSlicks(){

			// Todas as galerias
			this.$gallerys = $( '.imagewp-slick-theme' );

			// Nenhuma galeria
			if( !this.$gallerys.length ){
				return;
			}

			// Incia cada galeria que ainda não foi iniciada
			this.$gallerys.each(function(){
				
				if( this.$ === undefined ){ 					
					this.$ = $( this );
					var _this = this;
				}

				this.start = function(){
					
					this.$main = $( '.main-slider', this.$ );
					this.$nav = $( '.menu-slider', this.$ );
					this.$footer = $( 'footer', this.$ );
					this.$wrapper = this.$.parents( 'section' );

					// Criando o mosaico
					IWPApp.createMosaic( this );

					// Carrossel principal
		            this.$main.on( 'beforeChange', function( slick, currentSlide ){
		            	$( '.slide-indice', _this.$main ).css( 'opacity', 0 );
		            });			
		            this.$main.on( 'afterChange', function( slick, currentSlide ){
		            	$( '.slide-indice', _this.$main ).css( 'opacity', 1 );
		            	IWPApp.resizeParent( _this );
		            });			
					this.$main.slick({
						adaptiveHeight: true
						,slidesToShow: 1
						,slidesToScroll: 1
						,draggable : false
						,touchMove : false
						,asNavFor: this.$nav
						,responsive: [
							{
								breakpoint: 640,
								settings: {
									arrows: false
								}
							}
						]
					});
					
					// Carrossel de thumbs
					this.$nav.slick({
						adaptiveHeight: false
						,asNavFor: this.$main
		  				,focusOnSelect: true
						,slidesToShow: 6
						,slidesToScroll: 1
						,arrows: false
						,initialSlide : 0
						,responsive: [
							{
								breakpoint: 768,
								settings: {
									slidesToShow: 4
								}
							},
							{
								breakpoint: 640,
								settings: {
									slidesToShow: 2
								}
							}
						]
					});

				};

				if( this.$.attr( 'data-start-api' ) === 'true' ){
					this.start();
				}
			
			});

			// Resize
			IWPApp.bindResize();

		},

		resizeParent : function resizeParent( gal ){
			var $sParent = gal.$.parents( '.slick-slider' ).first();
			if( $sParent.length && $sParent.is( '.slick-initialized' ) ){
				$sParent.slick( 'getSlick' ).animateHeight();
			}
		},

		// Criando o mosaico
		createMosaic : function createMosaic( gal ){

			// Botão de abrir
			gal.$seall = $( '.see-all button', gal.$ );
			// Mosaico
			gal.$mosaic = $( '<div class="mosaic"></div>' );
			// Ítems do mosaico
			gal.$mosaicGrid = gal.$nav.clone().attr( 'class', 'mosaic-grid clearfix' ).appendTo( gal.$mosaic );
			// Figures
			gal.$mosaicFigures = gal.$mosaicGrid.children( 'figure' ).removeClass( 'slide-item' );
			// Fotos
			gal.$mosaicItems = gal.$mosaicGrid.find( 'img' );
			// Botão de fechar mosaico
			gal.$closeMosaic = $( '<button class="mosaic-close">Fechar</button>' ).appendTo( gal.$mosaic );
			// Insere o mosaico na galeria
			gal.$mosaic.appendTo( gal.$ );

			// Botão de ver todas
			gal.$seall.on( 'click', function(event){
				event.preventDefault();
				IWPApp.openMosaic( gal );
			});

			// Botão de fechar o mosaico
			gal.$closeMosaic.on( 'click', function(event){
				event.preventDefault();
				IWPApp.closeMosaic( gal );
			});

			// Clicando nos thumbs do mosaico
			gal.$mosaicItems.on( 'click', function(event){
				event.preventDefault();
				if( this.$ === undefined ){
					this.$ = $( this );
				}
				if( this.$.is( '.current' ) ){
					return;
				}
				else {

					gal.$mosaicItems.removeClass( 'current' );
					this.$.addClass( 'current' );

					var index = gal.$mosaicItems.index( this.$ );
					gal.$mosaicItems.removeClass( 'current' );
					gal.$.addClass( 'current' );
					IWPApp.closeMosaic( gal, index );
				}
			});

		},

		openMosaic : function openMosaic( gal ){
			
			var active = gal.$main.slick( 'getCurrent' );
			gal.$mosaicItems.removeClass( 'current' );
			gal.$mosaicItems.eq( active ).addClass( 'current' );

			gal.$footer.slideUp( 600 );
			gal.$main.slideUp( 600, function(){

				if( gal.$mosaicGrid.is( '.slick-initialized' ) ){
					gal.$mosaic.show();
					gal.$mosaicGrid.slick( 'refresh' );
					gal.$mosaic.hide();
				}

				gal.$mosaic.slideDown( 800, function(){
					IWPApp.resizeParent( gal );
				});

			});

            $('html, body').animate({
                scrollTop: gal.$wrapper.offset().top
            }, 1000);   

		},

		closeMosaic : function closeMosaic( gal, goTo ){
			gal.$mosaic.slideUp(function(){
				
				gal.$main.show();
				gal.$footer.show();

				if( goTo !== undefined ){
					gal.$main.slick( 'slickGoTo', goTo, true );
				}
				else {
					gal.$nav.slick( 'getSlick' ).refresh();
				}
			
				gal.$main.hide();
				gal.$footer.hide();
				
				gal.$footer.slideDown();
				gal.$main.slideDown( 800, function(){
					IWPApp.resizeParent( gal );
				});

			});
		},

		mobSlicks : function mobSlicks( gal ){

        	var vWidth = Math.max( document.documentElement.clientWidth, window.innerWidth || 0 );

        	// Configurando
            if( IWPApp.slicksStarteds === false ){
                
                IWPApp.slicksStarteds = true;                     
                
                IWPApp.$mobSlicks = $( '.mosaic-grid', IWPApp.$gallerys );
                
                if( IWPApp.$mobSlicks.length ){
                	IWPApp.$mobSlicks.each(function(){
                		this.$ = $( this );
                		this.$items = this.$.children( 'figure' );
                	});
                }
            }

            // Se não existem slicks
            if( !IWPApp.$mobSlicks.length ){
            	return;
            }
            
            // Responsive
            if( IWPApp.slicksActives === false && vWidth <= 640 ){
                                   
                // Mostra que o slick está ativo
                IWPApp.slicksActives = true;
                
            	// Cada mosaico
            	IWPApp.$mobSlicks.each(function(){
		
					// Distribui os ítems em linhas
					var perline = 8;
					var totalRows = Math.ceil( this.$items.length / perline );
					for( var tr = 0; tr < totalRows; tr++ ){
						var start = tr * perline;
						var end = start + perline;
						var $row = $( '<div class="row clearfix"></div>' ).appendTo( this.$ );
						var $totransport = this.$items.slice( start, end ).appendTo( $row );
					}
                    
                    this.$.slick({
                        arrows: false,
                        dots: true,
                        adaptiveHeight: true,
                        touchMove : false,
						draggable : false,
						infinite : false,
						customPaging : function(slider, i) {
					        return '<a>'+(i+1)+'</a>';
					    }
                    });

            	});
            
            }
            else if( IWPApp.slicksActives === true && vWidth > 640 ){

            	IWPApp.$mobSlicks.each(function(){

	            	// Destruindo o slick
	                this.$.slick( 'unslick' );
	                var _this = this;

	                // Retirando os thumbs das linhas
	                var $rows = this.$.children( '.row' );
	                $rows.each(function(r){
	                	var $row = $rows.eq( r );
	                	$row.children( 'figure' ).appendTo( _this.$ );
	                });
	                $rows.remove();

            	});

            	IWPApp.slicksActives = false;
            
            }

		},
        
        // Resizing
        bindResize : function bindResize(){
        	var timeout = null;
            $( window ).bind( 'resize.IWPApp', function(){
                clearTimeout( timeout );
                timeout = setTimeout( IWPApp.mobSlicks, 250 );
            });
            IWPApp.mobSlicks();
        }

	};
	IWPApp.init();

})(jQuery);