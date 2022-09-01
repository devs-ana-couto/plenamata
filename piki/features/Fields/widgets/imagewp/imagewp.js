var ImageWP;

PikiFields.add( 'window.startImageWP' );

(function($){

	// Starting fields
	window.startImageWP = function(){

		var $fields = $( 'div.linha-field.ftype-imagewp, div.field-imagewp-wrapper' );
		if( !$fields.length ) return true;

		for( var fs = 0; fs < $fields.length; fs++ ){
			var $widget = $fields.eq( fs ).find( 'div.ftype-imagewp' );
			if( $widget.length ){
				$widget.imageWpField();
			}
		}

	}

	// Configura novos campos, quando carregados por ajax
	$(function(){
		if ( typeof window.fieldset_field_set_callback == 'function') {
			window.fieldset_field_set_callback( window.startImageWP );			
		}
	});

	ImageWP = {
		
		// Configura
		configure : function( field, options ){

			field.$ = field.$ || $( field );

			var data = field.$.data( 'ImageWP' );
			if( data !== undefined  ) return data;

			// Configs
			data = {
				_ : field,
				$ : field.$,
				target : $( 'input.imagews-ids', field.$ ).first(),
				select : $( 'input.imagewp-select-button', field.$ ).first(),
				edit : $( 'input.imagewp-edit-button', field.$ ).first(),
				remove : $( 'input.imagewp-remove-button', field.$ ).first(),
				label : $( 'input.imagewp-upload-label', field.$ ).first().val(),
				thumbs : $( 'div.imagewp-media-thumbs', field.$ ).first(),
				status : $( 'div.imagewp-media-status', field.$ ).first(),
				multiple : field.$.data( 'multiple' ) != undefined && field.$.data( 'multiple' ) === 'on',
				croppable : field.$.data( 'crop' ) != undefined && field.$.data( 'crop' ) === 'on',
				ready : false
			};

			// Se é cropável
			if( data.croppable ){

				// Proporções do CROP
				data.ratio = data.$.data( 'crop-ratio' ).split( 'x' );
				data.ratio = parseInt( data.ratio[ 0 ] ) / parseInt( data.ratio[ 1 ] );
				
				// Opções do CROP
				data.crop = {
					wrapper : $( '.imagewp-media-croparea', data.$ ).first(),
					coords : {
						x: 		$( 'input.coord-x', data.$ ).first(),
						y: 		$( 'input.coord-y', data.$ ).first(),
						width: 	$( 'input.coord-width', data.$ ).first(),
						height: $( 'input.coord-height', data.$ ).first()								
					},
					ratio : data.ratio
				};

				// Se já existe um valor
				var $hasvalue = $( 'img.imagewp-croparea', data.$ ).first();
				if( $hasvalue.length ){
					data.crop.target = {
						image: $hasvalue,
						width: $hasvalue.attr( 'width' ),
						height: $hasvalue.attr( 'height' )
					};
				}

			}

			// Se não é cropável
			else{

				// Fancybox 
				data.thumbs.on( 'mousedown', 'a.preview', function(event){
					this.$ = this.$ || $( this );
					if( !this.$.is( '.fancy' ) ){
						this.$.addClass( '.fancy' ).fancybox();
					}
					return true;
				});

				// Botão de remover ítem
				data.thumbs.on( 'click', 'a.remove', function(event){ 
					event.preventDefault();
					ImageWP.removeGalleryItem( data, $( this ) ); 
				});

				if( data.multiple ){
					data.thumbs.sortable({ 
						items: 'div.thumbnail',
						stop: function( event, ui ){
							ImageWP.alignValues( data );
						}
					});
					data.thumbs.disableSelection();
				}

			}

			// Create WP media frame.
			data.wpmedia = wp.media.frames.customHeader = wp.media({
				title: data.select.val(),
				library: { type: 'image' },
				button: { text: data.select.val() },
				multiple: data.multiple ? true : false
			});

			// callback for selected image
			data.wpmedia.on( 'select', function() {
				var selection = data.wpmedia.state().get( 'selection' );
				ImageWP.returnFile( data, selection );
				return;
			});

			// Botão de seleção
			data.select.on( 'click', function(event){
				event.preventDefault();
				data.wpmedia.open();
			});

			// Botão de edição
			data.edit.on( 'click', function(event){
				event.preventDefault();
				data.wpmedia.open();
			});

			// Botão de remoção
			data.remove.on( 'click', function(event){

				event.preventDefault();
				
				// Remove os valores
				ImageWP.removeValues( data );

				// Reseta os controles
				ImageWP.resetControls( data );
							
			});

			// Inicia o CROP, quando necessário
			if( data.croppable && data.crop.target != undefined ){
				setTimeout(function(){
					ImageWP.startCrop( data );
				}, 2000 );
			}

			// Bind reset
			data.target.bind( 'reset', function(){
				//alert('target');
			});

			// Diz que o campo já foi configurado
			data.ready = true;

			field.$.data( 'ImageWP', data );

		},

		// Reseta os controles
		resetControls : function( data ){
	
			// Omite o botão de exclusão
			data.remove.hide();
			
			// Omite o botão de edição
			data.edit.hide();
			
			// Mostra novamente o botão de seleção
			data.select.show();

		},

		// Realinha os ID's quando as posições dos thumbs mudam
		alignValues : function( data ){
			var new_value = [];
			data.thumbs.children().each(function(){
				new_value.push( $( this ).attr( 'rel' ) );
			});
			data.target.val( new_value.join( ',' ) );
		},

		// Recebe o arquivo depois da escolha do usuário
		returnFile : function( data, selection ) {

			// Omite o botão de exclusão
			data.remove.show();
			// Se não é múltiplo, remove o valor anterior
			if ( !data.multiple ) {
				// Remove os valores anteriores
				ImageWP.removeValues( data );
				// Mostra o botão de edição
				data.edit.show();
				// Omite o botão de seleção
				data.select.hide();
			}
			else{
				// Omite o botão de edição
				data.edit.hide();
				// Mostra novamente o botão de seleção
				data.select.show();
			}

			// Valor atual do campo
			var values = data.target.val();
			if( values === '' ){
				values = [];
			}
			else {
				values = values.split( ',' );
			}

			selection.map(function( attachment ) {
				
				attachment = attachment.toJSON();

				values.push( attachment.id )

				if( data.crop ){

					var $imagecrop = $( '<img src="'+ attachment.sizes.full.url +'" class="imagewp-croparea" width="'+ attachment.width +'" height="'+ attachment.height +'" />' ).appendTo( data.crop.wrapper ).hide();

					// Definições do crop
					data.crop.target = {
						image: $imagecrop,
						width: attachment.width,
						height: attachment.height
					};
					
					// Remove os valores das coordenadas
					data.crop.coords.x.val( '' );
					data.crop.coords.y.val( '' );
					data.crop.coords.width.val( '' );
					data.crop.coords.height.val( '' );
					
					// Mostra a área de crop
					data.crop.wrapper.show();
					
					// Inicia o CROP
					setTimeout(function(){
						ImageWP.startCrop( data );
					}, 500 );

				}
				else{

					// URL do thumbnail
					var thumb_url = attachment.sizes.thumbnail === undefined ? attachment.sizes.full.url : attachment.sizes.thumbnail.url;

					$newthumb = $( '<div class="thumbnail" rel="'+ attachment.id +'"></div>' );
					$newthumb.html( '<img src="' + thumb_url + '" alt="'+ attachment.alt +'" /><a href="' + attachment.sizes.full.url + '" rel="' + attachment.id + '" target="_blank" class="action preview">Ampliar imagem</a><a rel="' + attachment.id + '" class="action remove" title="Remover">Remover imagem</a>') ;
					data.thumbs.stop( true, true ).css( 'display', 'table' );
					$newthumb.hide().prependTo( data.thumbs ).fadeIn( 400 );
							
				}
			});

			data.target.val( values.join( ',' ) );

		},

		startCrop : function( data ){

			// Oculta a imagem para que o tamanho da área possa ser calculado
			data.crop.target.image.hide();

			// Área do Crop
			var $wrapper = data.$.parents( '.linha-field.ftype-imagewp' ).first();

			const vw = Math.max( document.documentElement.clientWidth, window.innerWidth || 0 );
			const vh = Math.max( document.documentElement.clientHeight, window.innerHeight || 0 );

			// Dimensões da imagem a ser mostrada para o CROP
			var cropWidth = Math.ceil( $wrapper.outerWidth() * 0.9 );
			if( cropWidth > 800 ) cropWidth = 800;

			var cropHeight = Math.ceil( ( cropWidth * data.crop.target.height ) / data.crop.target.width );
			var limitHeight = Math.floor( vh * 0.8 )
			if( cropHeight > limitHeight ){
				cropHeight = limitHeight;
				cropWidth = Math.ceil( ( cropHeight * data.crop.target.width ) / data.crop.target.height );
			}
			
			data.crop.croparea = {
				width : cropWidth,
				height : cropHeight
			};
			
			// Imagem mostrada para o crop
			data.crop.target.image.width( data.crop.croparea.width );
			data.crop.target.image.height( data.crop.croparea.height );

			// Mostra a imagem
			data.crop.target.image.show();
			
			// Coordenadas iniciais do CROP
			coords_ini = get_restored_ini_crop_coords( data );
			if( coords_ini == false ){
				coords_ini = get_default_ini_crop_coords( data.crop );
			}
			
			// Propriedades do CROP
			data.cropAPI = $.Jcrop( data.crop.target.image ,{ 
				bgFade: true,
				bgOpacity: .2,
				aspectRatio: data.crop.ratio,
				minSize: [ 40, 40 ],
				allowSelect: false,
				setSelect: [ 0, 0, 1, 1 ],
				bgColor: 'black',
				onSelect: function( coords ){
					ImageWP.showCoords( data, coords );
				},
	      		onChange: function( coords ){
					ImageWP.showCoords( data, coords );
				}
			});
		    
		    // Set an event handler to animate selection
		    data.cropAPI.animateTo( coords_ini );

		},

		showCoords : function( data, coords ){
			
			// Tamanho real da área do CROP
			var real_x = ( data.crop.target.width * coords.x ) / data.crop.croparea.width;
			var real_y = ( data.crop.target.height * coords.y ) / data.crop.croparea.height;
			var real_w = ( data.crop.target.width * coords.w ) / data.crop.croparea.width;
			var real_h = ( data.crop.target.height * coords.h ) / data.crop.croparea.height;
			
			// Insere os valores nos respectivos campos
			data.crop.coords.x.val( Math.floor( real_x ) );
			data.crop.coords.y.val( Math.floor( real_y ) );
			data.crop.coords.width.val( Math.ceil( real_w ) );
			data.crop.coords.height.val( Math.ceil( real_h ) );
		
		},

		removeValues : function( data ){
			
			// Remove a área do crop, se existir
			if( data.crop ){
				data.crop.wrapper.stop( true, true ).hide().html( '' );
				data.crop.coords.x.val( '' );
				data.crop.coords.y.val( '' );
				data.crop.coords.width.val( '' );
				data.crop.coords.height.val( '' );
			}
			// Remove a área de thumbs
			if( data.thumbs.length ){
				data.thumbs.stop( true, true ).hide().html( '' );
			}
			// Remove os ID's
			data.target.val( '' );

		},

		removeGalleryItem : function( data, $thumb ){

			var id_to_remove = $thumb.attr( 'rel' );
			
			//Remove o ítem
			var actuals = data.target.val().split( ',' );
			var news = [];
			$.each( actuals, function( k, id ){
				if( id != id_to_remove ) news.push( id );
			});
			
			// Atualiza o campo com os ID's
			data.target.val( news.join( ',' ) );
			
			// Remove o thumb
			$thumb.parent().fadeOut( 250, function(){
			
				$( this ).remove();
			
				if( data.target.val() === '' ){
				
					data.thumbs.hide();

					ImageWP.resetControls( data );
				
				}
				else {
					data.thumbs.css( 'display', 'table' );
				}
			
			});

		}

	};

	$.fn.imageWpField = function( method ){

		var pluginArgs = arguments;

		return this.each(function(){

			this.$ = this.$ || $( this );

			var 
				toCall = ImageWP.method === undefined ? false : ImageWP.method,
				data = this.$.data( ' ImageWP' )
			;

			// Chamando os métodos
			if( !toCall && data === undefined ){
				ImageWP.configure( this, pluginArgs );
			}
			else{
				ImageWP.toCall( this, Array.prototype.slice.call( pluginArgs, 1 ) );
			}

		});

	};
	
	// Método que retorna coordeandas iniciais de um CROP
	function get_default_ini_crop_coords( crop ){
		var proportion = 0.9;
		var width = Math.ceil( crop.croparea.width * proportion );
		var height = Math.ceil( width / crop.ratio );
		if( height > crop.croparea.height ){
			height = Math.ceil( crop.croparea.height * proportion );
			width = Math.ceil( height * crop.ratio );
		}
		var coord_x = Math.floor( ( crop.croparea.width-width ) / 2 );
		var coord_y = Math.ceil( ( crop.croparea.height-height ) / 2 );
		return [ coord_x, coord_y, coord_x+width, coord_y+height ];
	}

	// Retorna as coordenadas iniciais de um crop existente
	function get_restored_ini_crop_coords( data ){

		if( data.crop.coords.x.val() == '' ){
			return false;
		}

		// Coordenadas existentes nos campos.
		var crop_x = data.crop.coords.x.val();
		var crop_y = data.crop.coords.y.val();
		var crop_w = data.crop.coords.width.val();
		var crop_h = data.crop.coords.height.val();
		
		// Coordenadas convertidas para o tamanho da área de CROP mostrada ao usuário
		if( crop_x != undefined ){
			show_x = Math.ceil( ( crop_x * data.crop.croparea.width ) / data.crop.target.width );
			show_y = Math.ceil( ( crop_y * data.crop.croparea.height ) / data.crop.target.height );
			show_w = Math.ceil( ( crop_w * data.crop.croparea.width ) / data.crop.target.width );
			show_h = Math.ceil( ( crop_h * data.crop.croparea.height ) / data.crop.target.height );
			return [show_x, show_y, show_w+show_x, show_h+show_y];
		}
		else{
			return false;
		}

	}
	
})(jQuery);
