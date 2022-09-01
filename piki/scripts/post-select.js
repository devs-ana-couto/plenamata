var PostSelect;

$(function($){

	PostSelect = {

  		init : function(){

  			_body.on( 'click', 'button[data-action="post-select-open"]', function( event ){
				event.preventDefault();
				PostSelect.open();
			});

			// Selection
			_body.off( 'click.tgsel' ).on( 'click.tgsel', '.posts-field-selection li', function(){
			
				this.$ = this.$ || $( this );

				var field_name = this.$.parents( '.posts-field-selection' ).data( 'field-name' );
				var $field = $( 'div.ftype-posts-inside[data-machine-name="' + field_name + '"] .field-posts-wrapper' );
				var data  = $field.data( 'PostField' );

			 	PostField.toggleSelectionItem( data, this );
			
			});

			_body.off( 'click.tgsel2' ).on( 'click.tgsel2', '.posts-field-selection button[data-action="do-select"]', function(){

				this.$ = this.$ || $( this );
			
				var field_name = this.$.data( 'field-name' );
				var $field = $( 'div.ftype-posts-inside[data-machine-name="' + field_name + '"] .field-posts-wrapper' );
				var data  = $field.data( 'PostField' );

				PostField.Select.selectItems( data );
			
			});

  		},

	  	selectItems : function( data ){


	  		console.info( "data.$.data()" );
	  		console.log( data.$.data() );
	  		

	  		var selecteds = $( '.posts-field-selection li.selected' );
	  		if( !selecteds.length ) return true;

	  		selecteds.each(function(){

	  			this.$ = this.$ || $( this );


	  			console.info( "data.selectbox" );
	  			console.log( data.selectbox );
	  			

				// Feacha a modal
				data.selectbox.$.Modal( 'close' );
	  			
	  			var 
	  				ID = this.$.data( 'id' ),
	  				title = this.$.children( 'strong' ).text()
	  			;

	  			PostField.createItemList( data, ID, title );

	  		});

	  	},

  		open : function( data ){

	  		$.fn.pikiLoader();

			$.ajax({
				method: 'POST', 
				url : ajaxurl,
				data : {
					action : 'piki_field_ajax',
					field_type : 'posts_inside',
					field_action : 'get_selection',
					form_key : data.parentType,
					parent_id : data.parentID,
					field_name : data.name,
					actual_ids : data.target.val(),
				}
			})
			.done(function( response ) {
					
				$.fn.pikiLoader( 'close' );

				// Se o retornno for jSon, mostramos o erro
				if( typeof response == 'object' ){

					var Report;
					if( response.items !== undefined ){
						Report = 'Nenhum post disponível para seleção.';
					}
					else {
						Report = response.error_message;
					}

					Message.open( Report );
				
				}
				// Mostra o formulário
				else{
					PostField.Select.createModal( data, response );
				}
				
			})
			.fail(function( jqXHR, textStatus ){
				$.fn.pikiLoader( 'close' );
			  	Message.open( 'Problema ao recuperar Form: ' + jqXHR.responseText );
			});

  		},

	  	createModal : function( data, response ){

			// Removendo o formulário existente
			var $actual = $( '.piki-modal.postsfield' );
			if( $actual.length ) $actual.remove();

			// Create new modal
			data.selectbox = {
				$ : $( response ).appendTo( 'body' )
			};
			// Items list wrapper
			data.selectbox.$list = data.selectbox.$.children( '.posts-list' ).first();
			// Footer
			data.selectbox.$footer = data.selectbox.$.children( 'footer' ).first();

			// Filter
			PostField.Select.initFilters( data );

			// Pager
			PostField.Select.checkPager( data );

			// Open modal
			data.selectbox.$.Modal({
				className : 'postsfield wp-core-ui',
				width : '800',
				height : '600',
				keepVisible : true,
				title: data.select.first().attr( 'title' )
			});

			data.$.data( 'PostField', data );

	  	},

	  	initFilters : function( data ){

	  		data.selectbox.$header = data.selectbox.$.children( 'header' );
	  		if( !data.selectbox.$header.length ) return;

	  		data.selectbox.filters = {
	  			$ : data.selectbox.$header,
	  			$trigger : data.selectbox.$header.children( 'button[data-action="do-filter"]' ),
	  		};
	  		
	  		// Filters
	  		data.selectbox.filters.$fields = data.selectbox.filters.$.children( '.linha-field' ).find( 'input,select' );

	  		// Last filter
	  		data.selectbox.filters.lastFilter = data.selectbox.filters.$.find( 'input,select' ).serialize()

	  		// Enter on search field
	  		data.selectbox.filters.$.find( 'input#nome' ).off( 'keypress.psbind' ).on( 'keypress.psbind', function(e){
	  			if( e.keyCode == 13 ){{
	  				PostField.Select.bindFilterSend( data );
	  			}}
	  		});
	  		data.selectbox.filters.$trigger.off( 'click.psbind' ).on( 'click.psbind', function(e){
	  			event.preventDefault();
	  			PostField.Select.bindFilterSend( data );
	  		});

	  	},

	  	bindFilterSend : function( data ){

	  		var _query = data.selectbox.filters.$.find( 'input,select' ).serialize();

	  		if( _query === data.selectbox.filters.lastFilter ){
	  			return;
	  		}
	  		else {
	  			data.selectbox.filters.lastFilter = _query;
		  		PostField.Select.requireItems( data, false, true );
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

	  		PostField.Select.requireItems( data, false, true );
	  	
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
                   	PostField.Select.requireItems( data, pager.pageNumber );
                }
            });

	  	},

  		requireItems : function( data, page, resetPager ){

			$.ajax({
				method: 'POST', 
				url : ajaxurl,
				data : {
					action : 'piki_field_ajax',
					field_type : 'posts_inside',
					field_action : 'get_items',
					form_key : data.parentType,
					field_name : data.name,
					actual_ids : data.target.val(),
					filters : PostField.Select.getFilters( data ),
					page : page
				}
			})
			.done(function( response ){

				data.selectbox.$.data( 'total-items', response.total_items );

				if( resetPager !== undefined ){
					PostField.Select.checkPager( data );
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
									PostField.Select.clearFilters( data );
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
				$.fn.pikiLoader( 'close' );
			  	Message.open( 'Problema ao recuperar ítems: ' + textStatus );
			});

  		}

	};

})(jQuery);