// Galeria de imagens
$.fn.PikiGallery = function( method, arg2, arg3 ) {
	return this.each(function(){
		var $this = $( this );
		var $thumb;
		var data = $this.data( 'PikiGallery' );		
		if( method === undefined ){
			method = 'configure';
		} 
		if( method == 'configure' && data !== undefined ){ 
			return; 
		} 
		switch( method ){
			
			// Filtra pelo índice
			case 'configure':
				data = {
					wrapper : $this,
					thumbs : $this.children( 'a' ),
					current_image : false,
					loading : false
				};
				var attr_target = $this.attr( 'piki-gallery-target' );
				if( attr_target != 'undefined' ){
					data.target = $( attr_target );
				}
				data.thumbs.data( 'PikiGallery', { target : $this } ).on( 'click', function(event){
					event.preventDefault();
					var $clicked = $( this );
					$clicked.data( 'PikiGallery' ).target.PikiGallery( 'click', $clicked );
				});
				$this.data( 'PikiGallery', data );
				data.thumbs.first().click();
			break;

			// Quando clicado em algum thumb
			case 'click':
				$thumb = arg2;
				var _thumb_rel = $thumb.attr( 'rel' );
				var _target_rel = data.target.attr( 'rel' );
				if( data.loading === true || _thumb_rel == _target_rel ){
					return;
				}
				else{
					data.target.attr( 'rel', _thumb_rel );
					data.loading = true;
				}
				// Mascara de carregametno
				$.fn.pikiLoader({ target : data.target, position : 'absolute' });
				// Objeto da imagem
				var newImg = new Image();
				// Attributos
				$( newImg ).attr( 'data-zoom-image', $thumb.attr( 'href' ) ).data( 'PikiGallery', { target : $this } );
				// Trigger	
				newImg.onload = function() {
				   $( this ).data( 'PikiGallery' ).target.PikiGallery( 'change', $thumb, $( this ) );
				};
				// Imagem para preview
				var _preview_url = $thumb.attr( 'preview-url' );
				// Atribui a imagem
				newImg.src = _preview_url;

			break;

			// Quando clicado em algum thumb
			case 'change':
				$thumb = arg2;
				var $image = arg3;
				data.thumbs.removeClass( 'active' );
				$thumb.addClass( 'active' );
				$.fn.pikiLoader( 'close' );
				if( !!data.current_image ) data.target.html( '' );
				data.target.append( $image );
				data.target.append( '<span class="instructions">Passe o mouse sobre a foto para ver os detalhes.</span>' );
				data.current_image = $image;
				data.loading = false;
				$image.elevateZoom({
					zoomType : "inner",
				 	cursor : "crosshair"
				});
			break;
		}
	});
};

