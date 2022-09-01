var PostSelect;
var $body;

(function($){

	PostSelect = {

  		init : function(){

  			$body = $( 'body' );

  			$body.off( 'click.PostSelect' ).on( 'click.PostSelect', 'button[data-action="post-select-open"]', function( event ){
				event.preventDefault();
				PostSelect.bindSelect( this );
			});

  		},

  		getButtonData : function( button ){

  			button.$ = button.$ || $( button );

  			var data = button.$.data( 'PostSelect' );
  			if( data !== undefined ) return data;

  			data = {
  				_ : button,
  				$ : button.$,
  				$target : button.$.siblings( 'input[data-group="post-select"]' ),
  				postTypes : button.$.data( 'post-types' ),
  				parentID : button.$.data( 'post-parent' ),
  				group : button.$.data( 'group' ),
  				template : button.$.data( 'template' ),
  				labelSelect : button.$.data( 'label-select' ),
  				labelReplace : button.$.data( 'label-replace' ),
  			};
  			
  			return data;

  		},

  		bindSelect : function( button ){
  			var data = this.getButtonData( button );
  			PostSelect.open( data );
  		},

	  	selectItems : function( data ){

	  		var selecteds = $( '.posts-field-selection li.selected' );
	  		if( !selecteds.length ) return true;

	  		selecteds.each(function(){

	  			this.$ = this.$ || $( this );

				// Feacha a modal
				data.selectbox.$.Modal( 'close' );
	  			
	  			var 
	  				ID = this.$.data( 'id' ),
	  				title = this.$.children( 'strong' ).text()
	  			;

	  			PostSelect.createItemList( data, ID, title );

	  		});

	  	},

	  	postsOuts : function( data ){

	  		var 
	  			$outs = $( 'input[data-group="post-select"]' ),
	  			outsIDs = []
	  		;

	  		$outs.each(function(){
	  			if( this.value !== '' ){
		  			outsIDs.push( this.value );
	  			}
	  		});

	  		return outsIDs;

	  	},

  		open : function( data ){

	  		Loader();

			$.ajax({
				method: 'POST', 
				url : ajaxurl,
				data : {
					action : 'post_select_list',
					post_types : data.postTypes,
					parent_id : data.parentID,
					actual_ids : data.$target.val(),
					group : data.group,
					template : data.template,
					posts_out : PostSelect.postsOuts( data )
				}
			})
			.done(function( response ) {
					
				Loader( 'close' );

				// Se o retornno for jSon, mostramos o erro
				if( typeof response == 'object' ){

					var report;
					if( response.items !== undefined ){
						report = 'Nenhum post disponível para seleção.';
					}
					else {
						report = response.error_message;
					}

					Message.open( report );
				
				}
				// Mostra o modal
				else {
					PostSelect.createModal( data, response );
				}
				
			})
			.fail(function( jqXHR, textStatus ){
				Loader( 'close' );
			  	Message.open( 'Problema ao recuperar Form: ' + jqXHR.responseText );
			});

  		},

	  	createModal : function( data, response ){

			// Removendo o formulário existente
			var $actual = $( '.piki-modal.post-select' );
			if( $actual.length ) $actual.remove();

			// Create new modal
			data.selectbox = {
				$ : $( response ).appendTo( 'body' )
			};
			// Form
			data.selectbox.$form = $( 'form', data.selectbox.$ );
			// Items list wrapper
			data.selectbox.$list = data.selectbox.$.children( '.posts-list' ).first();
			// Footer
			data.selectbox.$footer = data.selectbox.$.children( 'footer' ).first();
			// Select button
			data.selectbox.$button = $( 'button[data-action="do-select"]', data.selectbox.$ );

			// Filter
			PostSelect.initFilters( data );

			// Pager
			PostSelect.checkPager( data );

			// Bind change field
			data.selectbox.$list.on( 'change', 'input', function(e){
				var total = data.selectbox.$list.find( 'input:checked' ).length;
				data.selectbox.$button.prop( 'disabled', total < 1 );
			});

			// Bind select button
			data.selectbox.$button.on( 'click', function(e){
				e.preventDefault();
				PostSelect.doSelect( data, this );
			});

			// Open modal
			data.selectbox.$.Modal({
				className : 'post-select wp-core-ui',
				width : '800',
				height : '600',
				keepVisible : true,
				title: 'Selecionar post'
			});

			data.$.data( 'PostSelect', data );

	  	},

	  	doSelect : function( data ){

			var $selecteds = data.selectbox.$list.find( 'input:checked' );
			if( $selecteds.length ){
			
				var ids = [];
				$selecteds.each(function(){
					ids.push( this.value );
				});
			
				data.$target.val( ids.join( ',' ) );
			
			}
			else {
			
				data.$target.val( '' );
				data.$.html( data.labelSelect );
			
			}

			// Trigger
			data.$.trigger( 'select', [ data ] );

			// Close modal
			data.selectbox.$.Modal( 'close' );

	  	},

	  	initFilters : function( data ){
	  		
	  		if( !data.selectbox.$form.length ) return;
	  		data.selectbox.$form.on( 'submit', function( e ){
	  			e.preventDefault();
	  		});

	  		// Header
	  		data.selectbox.$header = data.selectbox.$.children( 'header' );

	  		// Filters
	  		data.selectbox.filters = {
	  			$ : data.selectbox.$header,
	  			$trigger : data.selectbox.$header.find( 'button[data-action="do-filter"]' ),
	  		};
	  		
	  		// Filters
	  		data.selectbox.filters.$fields = data.selectbox.filters.$.find( 'input,select' );

	  		// Last filter
	  		data.selectbox.filters.lastFilter = data.selectbox.filters.$fields.serialize();

	  		// Enter on search field
	  		data.selectbox.filters.$.find( 'input#palavra-chave' ).off( 'keypress.psbind' ).on( 'keypress.psbind', function(e){
	  			if( e.keyCode == 13 ){{
	  				PostSelect.bindFilterSend( data );
	  			}}
	  		});
	  		data.selectbox.filters.$trigger.off( 'click.psbind' ).on( 'click.psbind', function(e){
	  			event.preventDefault();
	  			PostSelect.bindFilterSend( data );
	  		});

	  	},

	  	bindFilterSend : function( data ){

	  		var _query = data.selectbox.filters.$.find( 'input,select' ).serialize();

	  		if( _query === data.selectbox.filters.lastFilter ){
	  			return;
	  		}
	  		else {
	  			data.selectbox.filters.lastFilter = _query;
		  		PostSelect.requireItems( data, false, true );
	  		}
	  	
	  	},

	  	getFilters : function( data ){

	  		var _filters = {};

	  		data.selectbox.filters.$fields.each(function(){
	  			this.$ = this.$ || $( this );
	  			_filters[ this.$.attr( 'name' ) ] = this.$.val();
	  		});

	  		return _filters;

	  	},

	  	clearFilters : function( data ){
	  		
	  		data.selectbox.filters.$fields.val( '' );
	  		data.selectbox.filters.lastFilter = data.selectbox.filters.$fields.serialize();

	  		PostSelect.requireItems( data, false, true );
	  	
	  	},

	  	checkPager : function( data ){

	  		if( data.selectbox.$pager !== undefined ){
	  			data.selectbox.$pager.remove();
	  		}

	  		var
	  			totalItems = data.selectbox.$.data( 'total-items' ),
	  			itensPerPage = data.selectbox.$.data( 'items-per-page' )
	  		;

	  		if( totalItems <= itensPerPage ) return;

            // Locator for pager
            var locator = [];
            for( var i = 1; i <= totalItems; i++ ){
                locator.push(i);
            }

            // Pager
            var _id = '_' + Math.random().toString( 36 ).substr( 2, 9 );          
            data.selectbox.$pager = $( '<div id="' + _id + '" class="tablenav-pages pager"></div>' ).appendTo( data.selectbox.$footer );
            data.selectbox.$pager.pagination({ 
                dataSource: locator,
                totalNumber: totalItems,
                pageSize: itensPerPage,
                pageRange: 1,
                prevText : '‹',
                nextText : '›',
                triggerPagingOnInit : false,
                callback: function( _data, pager ){	
                   	PostSelect.requireItems( data, pager.pageNumber );
                }
            });

	  	},

  		requireItems : function( data, page, resetPager ){

  			Loader();

			$.ajax({
				method: 'POST', 
				url : ajaxurl,
				data : {
					action : 'post_select_items',
					post_types : data.postTypes,
					parent_id : data.parentID,
					actual_ids : data.$target.val(),
					posts_out : PostSelect.postsOuts( data ),
					group : data.group,
					template : data.template,
					page : page,
					filters : PostSelect.getFilters( data )
				}
			})
			.done(function( response ){

				Loader( 'close' );

				data.selectbox.$.data( 'total-items', response.total_items );

				if( resetPager !== undefined ){
					PostSelect.checkPager( data );
				}

				if( !response.content ){

					Message.open({
						classname : 'alert',
						title: 'Ops!',
						message: 'Nenhum resultado para estes filtros.',
						buttons : [
							{
								classname : 'button button-primary add',
								label : 'Limpar filtros',
								callback : function(){
									PostSelect.clearFilters( data );
								}
							},
							{
								classname : 'button',
								label : 'Fechar',
							}
						]
					});
				}
				else {

					if( page < 2 ){
						data.selectbox.$list.html( response.content ).show();
					}
					else {
						data.selectbox.$list.stop( true, true ).fadeOut( 100, function(){
							data.selectbox.$list
								.html( response.content )
								.fadeIn( 200, function(){
									data.selectbox.$list.scrollTo( 0 );
								});
							;
						});
					}

				}
			
			})
			.fail(function( jqXHR, textStatus ){

				Loader( 'close' );
			  	Message.open( 'Problema ao recuperar ítems: ' + textStatus );
			
			});

  		}

	};
	$(function(){
		PostSelect.init();
	});

})(jQuery);
