var PikiGallery;

(function($){

	PikiGallery = {

		slicksActives : false,
		slicksStarteds : false,

		main : function(){
			$(function(){
				PikiGallery.init();
			});
		},

		// Searching galleries
		init : function(){
			var $galleries = $( '.piki-gallery' ).not( '.configured' );
			if( $galleries.length ){
				$galleries.each(function(){
					PikiGallery.configure( this );
				});
				// Resize
				//PikiGallery.bindResize();
			}
		},

		configure : function( el ){

			el.$ = el.$ || $( el );

			el.$.addClass( 'configured' );

			var data = {
				_ : el,
				$ : el.$,
				$main : $( '.main-slider', el.$ ),
				$nav : $( '.menu-slider', el.$ ),
				$footer : $( 'footer', el.$ ),
				$wrapper : el.$.parents( 'section' ).first(),
				startAPI : el.$.data( 'start-api' ),
				theme : el.$.data( 'theme' ),
				figcaption : el.$.data( 'figcaption' ),
				arrows : el.$.data( 'arrows' )
			};			

			// Gallery for complete theme
			if( data.theme === 'complete' ){
				// Criando o mosaico
				PikiGallery.createMosaic( data );
			}
			
			// Carrossel principal
            data.$main.on( 'beforeChange', function( slick, currentSlide ){
            	$( '.slide-indice', data.$main ).css( 'opacity', 0 );
            });			
            data.$main.on( 'afterChange', function( slick, currentSlide ){
            	$( '.slide-indice', data.$main ).css( 'opacity', 1 );
            	PikiGallery.resizeParent( data );
            });		

			data.$main.slick({
				adaptiveHeight: true
				,slidesToShow: 1
				,slidesToScroll: 1
				,draggable : false
				,touchMove : false
				,asNavFor: data.$nav
				,arrows : data.arrows
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
			data.$nav.slick({
				adaptiveHeight: false
				,asNavFor: data.$main
  				,focusOnSelect: true
				,slidesToShow: 6
				,slidesToScroll: 1
				,arrows: false
				,initialSlide : 0
				,variableWidth: true
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

			// Start on load
			if( data.startAPI === true ){
				PikiGallery.start( data );
			}

		},
		
		// Starting
		start : function( data ){

			// Just started
			if( data.$main !== undefined && data.$main.length ) return;
			
			data.$main = $( '.main-slider', data.$ );
			data.$nav = $( '.menu-slider', data.$ );
			data.$footer = $( 'footer', data.$ );
			data.$wrapper = data.$.parents( 'section' );

			// Criando o mosaico
			PikiGallery.createMosaic( data );


		},
		
		// Criando o mosaico
		createMosaic : function createMosaic( data ){

			// Botão de abrir
			data.$seall = $( '.see-all button', data.$ );
			// Mosaico
			data.$mosaic = $( '<div class="mosaic"></div>' );
			// Ítems do mosaico
			data.$mosaicGrid = data.$nav.clone().attr( 'class', 'mosaic-grid clearfix' ).appendTo( data.$mosaic );
			// Figures
			data.$mosaicFigures = data.$mosaicGrid.children( 'figure' ).removeClass( 'slide-item' );
			// Fotos
			data.$mosaicItems = data.$mosaicGrid.find( 'img' );
			// Botão de fechar mosaico
			data.$closeMosaic = $( '<button class="mosaic-close">Fechar</button>' ).appendTo( data.$mosaic );
			// Insere o mosaico na galeria
			data.$mosaic.appendTo( data.$ );

			// Botão de ver todas
			data.$seall.on( 'click', function(event){
				event.preventDefault();
				PikiGallery.openMosaic( data );
			});

			// Botão de fechar o mosaico
			data.$closeMosaic.on( 'click', function(event){
				event.preventDefault();
				PikiGallery.closeMosaic( data );
			});

			// Clicando nos thumbs do mosaico
			data.$mosaicItems.on( 'click', function(event){
				event.preventDefault();
				if( this.$ === undefined ){
					this.$ = $( this );
				}
				if( this.$.is( '.current' ) ){
					return;
				}
				else {
					data.$mosaicItems.removeClass( 'current' );
					this.$.addClass( 'current' );
					var index = data.$mosaicItems.index( this.$ );
					data.$mosaicItems.removeClass( 'current' );
					data.$.addClass( 'current' );
					PikiGallery.closeMosaic( data, index );
				}
			});

		},

		openMosaic : function openMosaic( data ){
			
			var active = data.$main.slick( 'getCurrent' );
			data.$mosaicItems.removeClass( 'current' );
			data.$mosaicItems.eq( active ).addClass( 'current' );

			data.$footer.slideUp( 600 );
			data.$main.slideUp( 600, function(){

				if( data.$mosaicGrid.is( '.slick-initialized' ) ){
					data.$mosaic.show();
					data.$mosaicGrid.slick( 'refresh' );
					data.$mosaic.hide();
				}

				data.$mosaic.slideDown( 800, function(){
					PikiGallery.resizeParent( data );
				});

			});

            $( 'html, body' ).animate({
                scrollTop: data.$wrapper.offset().top
            }, 1000);   

		},

		closeMosaic : function closeMosaic( data, goTo ){
			data.$mosaic.slideUp(function(){
				
				data.$main.show();
				data.$footer.show();

				if( goTo !== undefined ){
					data.$main.slick( 'slickGoTo', goTo, true );
				}
				else {
					data.$nav.slick( 'getSlick' ).refresh();
				}
			
				data.$main.hide();
				data.$footer.hide();
				
				data.$footer.slideDown();
				data.$main.slideDown( 800, function(){
					PikiGallery.resizeParent( data );
				});

			});
		},

		// Resize parent binder
		resizeParent : function resizeParent( data ){
			var $sParent = data.$.parents( '.slick-slider' ).first();
			if( $sParent.length && $sParent.is( '.slick-initialized' ) ){
				$sParent.slick( 'getSlick' ).animateHeight();
			}
		},

		// Check slicks mobile
		mobSlicks : function mobSlicks( data ){

        	var vWidth = Math.max( document.documentElement.clientWidth, window.innerWidth || 0 );

        	// Configurando
            if( PikiGallery.slicksStarteds === false ){
                
                PikiGallery.slicksStarteds = true;                     
                
                PikiGallery.$mobSlicks = $( '.mosaic-grid', PikiGallery.$gallerys );
                
                if( PikiGallery.$mobSlicks.length ){
                	PikiGallery.$mobSlicks.each(function(){
                		this.$ = this.$ || $( this );
                		this.$items = this.$.children( 'figure' );
                	});
                }
            
            }

            // Se não existem slicks
            if( !PikiGallery.$mobSlicks.length ){
            	return;
            }
            
            // Responsive
            if( PikiGallery.slicksActives === false && vWidth <= 640 ){
                                   
                // Mostra que o slick está ativo
                PikiGallery.slicksActives = true;
                
            	// Cada mosaico
            	PikiGallery.$mobSlicks.each(function(){
		
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
						customPaging : function( slider, i ){
					        return '<a>'+(i+1)+'</a>';
					    }
                    });

            	});
            
            }
            else if( PikiGallery.slicksActives === true && vWidth > 640 ){

            	PikiGallery.$mobSlicks.each(function(){

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

            	PikiGallery.slicksActives = false;
            
            }

		},
        
        // Resizing
        bindResize : function bindResize(){
        	var timeout = null;
            $( window ).bind( 'resize.PikiGallery', function(){
                clearTimeout( timeout );
                timeout = setTimeout( PikiGallery.mobSlicks, 250 );
            });
            PikiGallery.mobSlicks();
        }

	};
	
	PikiGallery.main();

})(jQuery);