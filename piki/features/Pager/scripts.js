var Pager;

(function($){

	var _window;

	Pager = {

		callbacks : [],
		$header : null,

		main : function(){
			$(function(){
				Pager.init();
			});
		},

		// Initing
		init : function(){
			
			_window = $( window );
			
			// Header of page
			Pager.$header = $( '#masthead' );

			$( '.piki-pager' ).each(function(){
				Pager.configure( this );
			});
		
		},

		// Configuring
		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'PikiPager' );
			if( data !== undefined ) return;

			// Data
			data = {
				_ : el,
				$ : el.$,
				onscroll : el.$.data( 'onscroll' ) == 'true',
				target : el.$.data( 'target' ), 
				list : el.$.data( 'list' ),
				item : el.$.data( 'item' ),
				type : el.$.data( 'type' ),
				randomize : el.$.data( 'randomize' ),
				maxResults : el.$.data( 'max-results' ),
				isloading : false,
				page: 1
			};			

			data.$target = $( data.target );
			data.$list = $( data.list, data.$target ).addClass( 'piki-pager-list' );

			// Keeping data
			el.$.data( 'PikiPager', data );

			// Default pagination
			if( data.type === 'default' ){

				data.source = el.$.data( 'source' );
				data.totalItems = el.$.data( 'total' );
				data.itensPerPage = el.$.data( 'per-page' );
				data.id = '__' + Math.random().toString( 36 ).substr( 2, 9 );

				// No need pager
				if( data.totalItems <= data.itensPerPage ) return;

				// Locator for pager
				var locator = [];
				for( var i = 1; i <= data.totalItems; i++ ){
				    locator.push(i);
				}

				// Pager    
				data.$.$pager = $( '<div id="' + data.id + '" class="tablenav-pages pager"></div>' ).appendTo( data.$ );
				data.$.$pager.pagination({
				    dataSource: locator,
				    totalNumber: data.totalItems,
				    pageSize: data.itensPerPage,
				    pageRange: 1,
				    prevText : '‹',
				    nextText : '›',
				    triggerPagingOnInit : false,
				    timeRemove : false,
				    timeInsert : false,
				    callback: function( _data, pager ){	
				       	Pager.pagerClick( data, pager );
				    }
				});

			}
			else {

				data.next = $( '.nav-next a', el.$ );
				data.prev = $( '.nav-previous a', el.$ );
				data.next_label = data.next.html();
				
				// Se não tem botão de próxima página não faz nada
				if( !data.next.length ) return;
				if( !data.next.length && !data.prev.length ){
					data.$.hide();
					return;
				}
				
				// Paging on scroll
				if( data.onscroll ){
					
					el.$.hide();
					
					_window.bind( 'scroll', function( event ){

						var vHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

						var $target = $( data.selector );
						var offset = parseFloat( $target.offset().top );
						var height = parseFloat( $target.height() );
						var contentBottom = ( offset + height ) - vHeight - 30;
					
						if( _window.scrollTop() >= contentBottom ){
							Pager.next( data );
						}
					
					});
				
				}
				else {

					// Previous
					if( data.prev.length ) data.prev.hide();
					
					// Next
					data.next_label = data.next.attr( 'ajax-label' ) == undefined ? 'Ver mais' : data.next.attr( 'ajax-label' )
					data.next.children( 'strong' ).html( data.next_label );
					data.next.on( 'click', function(event){
						event.preventDefault();
						Pager.next( data );
					});
				
				}

			}

		},

		// Pager click
		pagerClick : function( data, pager ){

			// Page
			data.page = pager.pageNumber;

			// URL
			var url = data.source.replace( '[index]', pager.pageNumber );
			
			// Requesting items
			Pager.requestItems( data, url );	
		
		},

		// Get next page
		next : function( data ){

			// Bloqueia enquanto carrega
			if( data.isloading ) return;
			data.isloading = true;
			
			data.$.show().addClass( 'loading' );
			data.next.children( 'strong' ).html( 'Carregando' );

			var url = data.next.attr( 'href' );

			// Request items
			Pager.requestItems( data, url );

		},

		// Request items
		requestItems : function( data, url ){

			$.fn.pikiLoader();

			$.ajax({
				dataType: 'HTML',
				url: url
			})
			.done(function( response ){
				$.fn.pikiLoader( 'close' );
				Pager.insertItems( data, response );
			})
			.fail(function( jqXHR, textStatus ) {
				$.fn.pikiLoader( 'close' );
				Message.open( "Falha na solicitação: " + jqXHR.statusText );
			});	
		},

		// Inserting items
		insertItems : function( data, response ){

			// Conteúdo
			var $html = $( '<div>' ).append( response );

			// Get items
			var $__target = $html.find( data.target );
			var $new_items = $__target.find( data.list + ' ' + data.item );

			var _Packery = data.$target.data( 'packery' );

			// Loading class
			data.$target.addClass( 'loading' );
			
			// Randomize
			if( data.randomize === true ){
				$new_items.sort(function(){
                    return Math.random() - 0.5;
                });
			}

			if( data.type === 'default' && _Packery === undefined ){

				// Top position
				var 
					topList,
					$targetTop = $( '[data-key="search-content"]' )
				;
				if( !$targetTop.length ){
					$targetTop = data.$list;
				}
				topList = $targetTop.offset().top;
				if( $targetTop.data( 'offset' ) !== undefined ){
					topList -= $targetTop.data( 'offset' );
				}
				if( Pager.$header.length ){
					topList -= this.$header.outerHeight();
				}				

				// Old height
				// var oldHeight = data.$list.outerHeight();
				// data.$list.css( 'height', oldHeight + 'px' );

				// Animate removing
				$old_items = data.$list.find( data.item ).removeClass( 'show' ).addClass( 'removing' );

				$( 'html,body' ).stop( true, true ).animate(
					{ scrollTop: topList }, 
					300, 
					'easeOutQuad'
				);
				
				// Add new items
				if( data.timeRemove ) clearTimeout( data.timeRemove );
				data.timeRemove = setTimeout(function(){
				
					$old_items.remove();
					$new_items.addClass( 'inserted' ).appendTo( data.$list );

					// data.$list.css( 'height', '' );
					// var newHeight = data.$list.outerHeight();
					// data.$list.css( 'height', oldHeight + 'px' );

					if( data.timeInsert ) clearTimeout( data.timeInsert );
					data.timeInsert = setTimeout(function(){
						$new_items.removeClass( 'inserted' ).addClass( 'show' );
					}, 100 );

					/*
					$( 'html,body' ).stop( true, true ).animate(
						{ scrollTop: topList }, 
						400, 
						'easeOutQuad', 
						function(){
			        		data.$list.stop( true, true ).animate(
			        			{ 'height' : newHeight },
			        			400,
			        			'easeOutQuad',
			        			function(){
			        				data.$list.css( 'height', '' );
			        				$new_items.removeClass( 'inserted show' );
			        			}
			        		);
			        	}
			        ); 
			        */   
				
				}, 300 );

			}
			else {

				// Insert items
				$new_items.hide().appendTo( data.$list );

				// Packery
				var _Packery = data.$list.data( 'packery' );
				if( _Packery !== undefined ){
					$new_items.show();
					data.$list.packery( 'appended', $items );
				}
				else {
					$new_items.fadeIn();
				}

				const showNext = ( data.type !== 'default' && ( !data.maxResults || data.$list.find( data.item ).length < data.maxResults ) );
				
				// Remove pager
				if( !showNext ){
					data.$.remove();
				}
				// Search by next button
				else {

					// Get next link
					var $next_link = $html.find( '.piki-pager[data-target="' + data.target + '"] .nav-next a' ).first();
					if( $next_link.length ){
						
						data.next.attr( 'href', $next_link.attr( 'href' ) );
						data.next.children( 'strong' ).html( data.next_label );
						data.$.removeClass( 'loading' );
						
						// On scroll
						if( data.onscroll ) data.$.hide();
						// Insert button
						data.$.appendTo( data.$target );
						// Let free
						data.isloading = false;
					
					}
					// There is no pagination
					else {
						data.$.remove();
					}

				}

				var $section = data.$list.parents( 'section' );
				var target = $section.length ? $section : $new_items.first();
				var offset = target.data( 'offset' );

				// Scrolling to
				$(window).scrollTo(
					target, 
					800, 
					{ 
						offset: { top: ( offset !== undefined ? offset : -20 ) } 
					} 
				);
			
			}

			// Remove loading class
			data.$target.removeClass( 'loading' );

			// Paged class
			if( data.page > 1 ){
				data.$target.addClass( 'paged' );
			}
			else {
				data.$target.removeClass( 'paged' );
			}

			// Finishing
			Pager.doFinish( data, $new_items );

		},

		// Add callback
		addCallback : function( callback ){
			if( !window.in_array( callback, Pager.callbacks ) ){
				Pager.callbacks.push( callback );
			}
		},

		// Callbacks
		doFinish : function( data, $new_items ){

			if( Pager.callbacks.length > 0 ){
				for( var c = 0; c < Pager.callbacks.length; c++ ){
					Pager.callbacks[ c ].call();
				}
			}
		
		}

	};
	Pager.main();

})(jQuery);
