(function($){

	// Máscara de carregamento
	var ModalMethods = {

		init : function( data, options ) {

			if( data.initialized !== false ){
				return ModalMethods.open( data );
			}
			data.initialized = true;

		    // Default options
		    var new_data = {
		    	
		    	$ : data.$,
				modal: false,
				// Se a modal já é mostrada quando configurada
				open : false,
				// zIndex
				zIndex: 500,

		    	// General
		    	animate: false,
		    	
				// Content
				scroller : false,
	        	maxWidth : false,
	        	minHeight : false,
	        	maxHeight : false,

	        	// Overlay
				overlay : true,

				// Loader
				useLoader : true,

				// Callbacks
	        	onOpen : false,
	        	onClose : false,
	        	onClosed : false

		    }; 

			// Se um elemento foi passado
			if( options instanceof jQuery ){
				options = { toBehind: options };
			}
			// Se foi passado um objeto de configurações
			else if( typeof options == 'object' ){
				;
			}
			else {
				options = {};
			}

			data = $.extend( {}, new_data, options );
			data.$.data( 'pikiModal', data );

			ModalMethods.configure( data );

	  	},

		configure : function( data ){

			// Modal
			var css = { zIndex : data.zIndex };
			data.modal = $( '<div />', { 'class': "piki-modal", css: css } ).appendTo( _body );
			
			// Scroller
			data.$scroller = $( '<div class="modal-scroller" />' ).appendTo( data.modal );

			// Wrapp content
			data.$inner = $( '<div class="modal-inner" />' ).hide().css({ zIndex : data.zIndex+1 }).appendTo( data.$scroller );

			// Se foi passado um seletor
			if( typeof data.content === 'string' ){
				data.content = $( data.content );
			}
			data.$.appendTo( data.$inner ).show();
			
			// Close button
			var closeHTML = '<a class="modal-close-button">Fechar<span class="icone"></span></a>';
			// Top
			$( closeHTML ).addClass( 'top' ).prependTo( data.$inner );
			// Bottom
			$( closeHTML ).addClass( 'bottom' ).appendTo( data.$inner );
			// Action
			data.closeButton = $( '.modal-close-button', data.$inner );
			data.closeButton.on( 'click', function(e){
				e.preventDefault();
				ModalMethods.close( data );

			});

			if( data.open === true ){
				ModalMethods.open( data );
			}

		},

		open : function( data ){
			ModalMethods.disableScroll();
			// Shoing loader
			Loader( data.modal );
			data.modal.show();
			data.$inner.stop( true, true ).hide().fadeIn( 300, function(){
				Loader( 'stop' );
			});
		},

		close : function( data ){
			if ( !data ) { return false; }
			data.modal.removeClass( 'opened' );
			Loader( 'close', 300 );
			data.modal.fadeOut( 300 );
			ModalMethods.enableScroll();
		},

		resizeBind : function( data ){
			return this.each(function(){
				clearTimeout( data.timeout );
				data.timeout = setTimeout( function(){
					//data.$.Sanfona( 'resize' );
				}, 200 );
			});
		},

		// Desabilita o scroll vertical
		disableScroll : function(){
			document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "hidden";
			document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "hidden";
		},

		// Habilita o scroll vertical
		enableScroll : function(){
			document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "auto";
			document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "auto";
		},

		// Destruindo
		destroy : function( data ) {
			_window.unbind( '.pikiModal' );
			data.imagesBox.remove();
			data.$.removeData( 'pikiModal' );
		}
	};

	$.fn.Modal = function( arg1, arg2 ) {
		
		return this.each(function(){

			this.$ = this.$ || $( this );
			
			var 
				method, 
				options = false,
				data = this.$.data( 'pikiModal' )
			;
			if( data === undefined ){
				data = { $ : this.$, initialized: false };
			}

			if( arg1 === undefined || ( typeof arg1 ) === 'object' ){
				method = 'init';
				argToPass = arg1;
			}
			else {
				method = arg1;
				argToPass = arg2;
			}

			ModalMethods[ method ]( data, argToPass );

			return this.$;

		});

	}

	Modal = function( par1, par2 ){
		_body.Modal( par1, par2 )
	}

	window.modal_attach_callback = function( method ){
		var modal_data = _body.data( 'pikiPager' );
		if( !modal_data ){
			_body.data( 'pikiPager', Array( method ) );
		}
		else {
			modal_data.push( method );
		}
	};

})(jQuery);
