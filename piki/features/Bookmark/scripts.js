var Bookmark;

(function($){

	Bookmark = {

		userLikes : [],
		userCount : 0,
		$multiples : null,
		$single : null,
		$page : null,
		$form : null,
		timeout : false,
		timeCheck : false,

		init : function(){

			// Pager callback
			if( typeof Pager !== 'undefined' ){
				Pager.addCallback(function(){
					Bookmark.likeButtons();
				});
			}

			this.$muliples = $( '.bookmark-box:not(.single)' );
			this.$single = $( '.bookmark-box.single' );
			this.$widgets = $( '.bookmark-widget' );

			// Nenhum botão
			if( !this.$muliples.length && !this.$single.length && !this.$widgets.length ) return;
			
			// Bind button click
			$( 'body' ).on( 'click', 'button.bookmark', function(e){
			
				e.preventDefault();
			
				this.$ = this.$ || $( this );
				this.$w = this.$w || this.$.parent( '.bookmark-box' );
			
				// Data
				var data = Bookmark.getData( this.$w.get(0) );
			
				// Toggle bookmark
				Bookmark.toggleItem( data );
			
			});

			// Load likes
			Bookmark.loadLikes();

			// Single
			if( this.$single.length ){
				var data = Bookmark.getData( this.$single.get(0) );
				Bookmark.uniqueLoad( data );
			}

			// Page
			this.$page = $( 'section.bookmark' );
			if( this.$page.length ){
				this.bindPage();
			}

		},

		bindPage : function(){

			this.$form = $( 'form', this.$page );
			this.$pages = $( 'div.pages', this.$page );
			this.$pagesItems = $( 'li', this.$pages );
			this.$contents = $( 'div.contents', this.page );
			this.$contentsItems = $( 'li', this.$contents );
			this.$noResults = $( '.no-results', this.$page );
			
			$( 'input', this.$form ).on( 'keyup', function(e){

				this.$ = this.$ || $( this );

				var keyword = this.value;
				if( Bookmark.timeout ) clearTimeout( Bookmark.timeout );
				Bookmark.timeout = setTimeout(function(){
					Bookmark.filterPage( keyword );
				}, 100 );
			
			});

			// Like and unlike
			this.$page.on( 'unliked', '.bookmark-box', function( e, data ){

				var $group = data.$.parents( 'div.pages' );
				if( !$group.length ) $group = data.$.parents( 'div.contents' );

				const $parent = data.$.parents( 'li' ).first();
				if( $group.hasClass( 'pages' ) ){
					$parent.fadeOut( 300, function(){
						Bookmark.unlikedItem( $parent );
					});
				}
				else {
					$parent.slideUp( 300, function(){
						Bookmark.unlikedItem( $parent );
					});
				}

			});

		},

		unlikedItem : function( $item ){

			$item.remove();

			if( Bookmark.timeCheck ) clearTimeout( Bookmark.timeCheck );
			Bookmark.timeCheck = setTimeout( Bookmark.checkGroupsContents );

		},

		checkGroupsContents : function(){

			const
				totalPages = Bookmark.$pages.find( 'li' ).length,
				totalContents = Bookmark.$contents.find( 'li' ).length
			;
			if( !totalPages ){
				Bookmark.$pages.slideUp(function(){
					Bookmark.$pages.remove();
				});
			}
			if( !totalContents ){
				Bookmark.$contents.slideUp(function(){
					Bookmark.$contents.remove();
				});
			}
			if( !totalPages && !totalContents ){
				Bookmark.$noResults.slideDown();
			}

		},

		filterPage : async function( keyword ){

			// Normalize keyword
			keyword = Bookmark.normalizeText( keyword );

			// Filter
			var compare = await Bookmark.filterItems( keyword );

			// Pages
			const totalPages = this.$pagesItems.not('.exclude').length;
			if( totalPages < 1 ){
				this.$pages.stop( true, true ).slideUp();
			}
			else {
				this.$pages.stop( true, true ).slideDown();
			}
			// Contents
			const totalContents = this.$contentsItems.not('.exclude').length;
			if( totalContents < 1 ){
				this.$contents.stop( true, true ).slideUp();
			}
			else {
				this.$contents.stop( true, true ).slideDown();
			}

		},

		filterItems : async function( keyword ){

			// Pages
			this.$pagesItems.each(function(){
				this.$ = this.$ || $( this );
				this.$title = this.$title || $( 'h4', this.$ );
				var compare = Bookmark.normalizeText( this.$title.text() );
				if( compare.includes( keyword ) ){
					this.$.removeClass( 'exclude' ).fadeIn();
				}
				else{
					this.$.addClass( 'exclude' ).fadeOut();
				}
			});

			// Contents
			this.$contentsItems.each(function(){
				this.$ = this.$ || $( this );
				this.$title = this.$title || $( 'h4', this.$ );
				var compare = Bookmark.normalizeText( this.$title.children( 'a' ).text() + this.$title.find( '> span > a' ).text() );
				if( compare.includes( keyword ) ){
					this.$.removeClass( 'exclude' ).slideDown( 400 );
				}
				else{
					this.$.addClass( 'exclude' ).slideUp( 800 );
				}
			});

			return true;

		},

		normalizeText : function( string ){
            var r = string.toLowerCase();
            r = r.replace(new RegExp("\\s", 'g'),"");
            r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
            r = r.replace(new RegExp("æ", 'g'),"ae");
            r = r.replace(new RegExp("ç", 'g'),"c");
            r = r.replace(new RegExp("[èéêë]", 'g'),"e");
            r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
            r = r.replace(new RegExp("ñ", 'g'),"n");                            
            r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
            r = r.replace(new RegExp("œ", 'g'),"oe");
            r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
            r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
            r = r.replace(new RegExp("\\W", 'g'),"");
            return r;
		},

		checkWidgets : function(){

			$widgets = $( '.bookmark-widget' );
			if( !$widgets.length ) return;

			// Widgets
			$( '.bookmark-widget' ).each(function(){
				Bookmark.updateWidget( this );
			});

		},

		updateWidget : function( wid ){

			wid.$ = wid.$ || $( wid );

			var data = wid.$.data( 'Bookmark' );
			if( data === undefined ){
				data = {
					$ : wid.$,
					$link : wid.$.children( 'a' ),
					$label : wid.$.find( 'em' ),
					$counter : wid.$.find( 'strong' ),
					labelSing : wid.$.data( 'label-sing' ),
					labelPlural : wid.$.data( 'label-plural' )
				};
				wid.$.data( 'Bookmark', data );
			}
			
			if( Bookmark.userCount >= 1 ){

				data.$link.show();
				data.$counter.text( Bookmark.userCount );
				data.$label.text( Bookmark.userCount > 1 ? data.labelPlural : data.labelSing );
			
			}
			else {

				data.$link.hide();
		
			}

		},

		loadLikes : function(){

			$.ajax({
				type : 'POST',
				url : Piki.ajaxurl,
				data : {
					action : 'bookmark_get_likes'
				}
			})
			.done(function( response ) {
				Bookmark.userLikes = response;
				Bookmark.userCount = response.length;
				Bookmark.likeButtons();
				Bookmark.checkWidgets();
			});		

		},


		likeButtons : function(){

			$boxes = $( '.bookmark-box' ).removeClass( 'active' );
			$boxes.each(function(){
				
				// Data
				var data = Bookmark.getData( this );
				
				// Active if need
				Bookmark.userLikes.forEach(function( ulike ){
					if( parseInt( ulike.post_id ) === parseInt( data.ID ) && ulike.context == data.context ){
						data.$.addClass( 'active' );
					}
				});

			});
		
		},

		getData : function( el ){
			
			el.$ = el.$ || $( el );
			
			var data = el.$.data( 'Bookmark' );
			if( data !== undefined ) return data;
			
			data = {
				$ : el.$,
				_ : el,
				context : el.$.data( 'context' ),
				title : el.$.data( 'title' ),
				ID : el.$.data( 'post-id' ),
				$score : $( '.score', el.$ ),
				$label : $( '.label', el.$ ),
				$button : $( 'button', el.$ )
			};
			data.addLabel = data.$button.data( 'add-label' );
			data.removeLabel = data.$button.data( 'remove-label' );

			return data;

		},

		// Toogle like
		toggleItem : function( data ){
			
			// Prevent various clicks
			if( data.$.hasClass( 'loading' ) ) return;
			data.$.addClass( 'loading' );
		
			// Envia a requisição
			var params = {
				'post_id': data.ID,
				'context': data.context,
				'title' : data.title
			};

			var request = $.ajax({
				url: Piki.ajaxurl + '?action=bookmark_toggle',
				method: 'POST',
				data: params,
				dataType: 'JSON'
			});
			request.done(function( response ){
				Bookmark.setState( data, response );
			});
			request.fail(function( jqXHR, textStatus ){
			 	Message.open( jqXHR.responseText );
			});
		
		},

		setState : function( data, info ){

			// Keep total user bookmarks
			Bookmark.userCount = info.total_user;
			
			// Todos os botões relativos à atração
			var $boxes = $( '.bookmark-box[data-post-id="'+ data.ID +'"]' );	
			$boxes.each(function(){
				
				this.$ = this.$ || $( this );

				var data = Bookmark.getData( this );

				// Remove a classe de carregamento
				data.$.removeClass( 'loading' );

				if( info.bookmarked ){

					data.$.addClass( 'active' );
					data.$label.html( data.removeLabel );
					data.$button.attr( 'title', Bookmark.strip_tags( data.removeLabel ) );
					data.$.trigger( 'liked', data );
				
				}
				else {

					data.$.removeClass( 'active' );
					data.$label.html( data.addLabel );
					data.$button.attr( 'title', Bookmark.strip_tags( data.addLabel ) );
					data.$.trigger( 'unliked', data );

				}

				if( info.total !== undefined ){
					
					if( parseInt( info.total ) === 0 ){
						data.$score.addClass( 'empty' );
					}
					else {
						data.$score.removeClass( 'empty' );
						data.$score.html( info.counter_label );
					}

				}
				
			});

			// Widgets
			Bookmark.checkWidgets();
		
		},

		likesStatus : function( total ){
			
			var $boxes = $( '.total-fornecedores' );
			
			if( $boxes.length ){
				var _s = total > 1 ? 's' : '';
				var _txt = ( total == 0 ? 'Nenhuma' : '<strong>' + total + '</strong>' ) + ' fornecedor' + _s + ' selecionada' + _s;
				$boxes.html( _txt );
			}
		
		},

		// Load unique bookmark button
		uniqueLoad : function( data ){

			$.ajax({
				type : 'POST',
				url : Piki.ajaxurl,
				data : { 
					action : 'bookmark_check',
					post_id : data.ID,
					single_check : true
				}
			})
			.done(function( json ) {
				Bookmark.setState( data, json );
			})
			.fail(function( jqXHR, responseText ) {
				Message.open( jqXHR.statusText )
			});		
		
		},

		strip_tags : function( text ){
			return text.replace(/(<([^>]+)>)/ig,"");
		}

	};
	$(function(){
		Bookmark.init();
	});

})(jQuery);
