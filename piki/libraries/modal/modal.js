var Modal;

(function($){

	// Modal
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

				// Keep visible
				keepVisible : false,

				// Extra css classes
				className : false,

				// Title
				title : false,
				
				// Se a modal já é mostrada quando configurada
				open : true,
				
				// zIndex
				zIndex: 1500,

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
				onConfig : false,
	        	onOpen : false,
	        	onClose : false,
	        	onClosed : false

		    }; 		    

			// Se foi passado um objeto de configurações
			if( typeof options !== 'object' ){
				options = {};
			}

			data = $.extend( {}, new_data, options );
			
			data.$.data( 'pikiModal', data );

			ModalMethods.configure( data );

	  	},

		configure : function( data ){

			// Modal
			var css = { zIndex : data.zIndex };
			data.modal = $( '<div />', { 'class': 'piki-modal ' + ( data.className ? data.className : '' ), css: css } ).appendTo( _body );

			// Scroller
			data.$scroller = $( '<div class="modal-scroller" />' ).appendTo( data.modal );

			// Wrapp content
			data.$inner = $( '<div class="modal-inner" />' ).hide().css({ zIndex : data.zIndex + 1 }).appendTo( data.$scroller );

			// Wrapp title
			if( data.title !== false ){
				data.$title = $( '<div class="modal-title">' + data.title + '</div>' ).appendTo( data.$inner );	
			}

			// Wrapp content
			data.$content = $( '<div class="modal-content" />' ).appendTo( data.$inner );

			// Se foi passado um seletor
			if( typeof data.content === 'string' ){
				data.content = $( data.content );
			}
			
			// Enviando conteúdo para o modal
			data.$.appendTo( data.$content ).show();
			
			// Close button
			var closeHTML = '<a class="modal-close-button native"><strong>Fechar</strong><span class="icone"></span></a>';
			
			// Top
			$( closeHTML ).addClass( 'top' ).prependTo( data.$inner );
			
			// Bottom
			if( !data.keepVisible ){
				$( closeHTML ).addClass( 'bottom' ).appendTo( data.$inner );
			}
			
			// Action			
			data.modal.on( 'click', '.modal-close-button', function(e){
				e.preventDefault();
				ModalMethods.close( data );
			});

			// On config Callback
			if( data.onConfig ){
				data.onConfig( data );
			}

			if( data.open === true ){
				ModalMethods.open( data );
			}

		},

		open : function( data ){

			//ModalMethods.disableScroll();

			// Shoing loader
			$.fn.pikiLoader( data.modal );

			if( data.keepVisible ){
				data.modal.addClass( 'keep-visible' );
			}
			else {
				data.modal.removeClass( 'keep-visible' );
			}
			
			data.modal.show();

			if( data.onOpen ){
				data.onOpen( data );
			}
			
			data.$inner.stop( true, true ).hide().fadeIn( 300, function(){
				$.fn.pikiLoader( 'stop' );
			});
		
		},

		close : function( data ){

			if( data.beforeClose ){
				data.beforeClose( data );
			}
		
			if ( !data ) { return false; }
			data.modal.removeClass( 'opened' );
			$.fn.pikiLoader( 'close', 300 );
			data.modal.fadeOut( 300 );

			if( data.onClosed ){
				data.onClosed( data );
			}
		
			//ModalMethods.enableScroll();
		
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
			$('body,html').addClass( 'lockscroll' );
		},

		// Habilita o scroll vertical
		enableScroll : function(){
			$('body,html').removeClass( 'lockscroll' );
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
		_body.Modal( par1, par2 );
	}

	window.modal_attach_callback = function( method ){
		// Add callback on Pager
		if( Pager !== undefined ){
			Pager.addCallback( method );
		}
	};

})(jQuery);
