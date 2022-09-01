var Capas;

(function($){

	Capas = {

		$ : null,
		$switcher : null,
		$form : null,
		$content : null,
		scrollOffset : null,
		post_id : null,
		actualType : null,

		init : function(){

			this.$ = $( '#asn-capa-builder' );
			if( !this.$.length ) return true;

			// Form and post id
			this.$form = $( 'form#post' );
			this.post_id = $( 'input#post_ID', this.$form ).val();

			// Content object
			this.$content = $( '#sticky-content', this.$ );
			this.$content.on( 'click', 'a', function(e){
				e.preventDefault();
			});
			
			// Scroll offset
			this.scrollOffset = $( '#wpadminbar' ).outerHeight();

			// Template switcher
			this.$switcher = $( 'select#template', this.$ );
			this.$switcher.on( 'change', function(){
				Capas.requestCapa( this.value );
			});	

			// Bind capas fields
			this.bindCapa();

		},

		requestCapa : function( type ){

			Loader();

			var data = {
				action : 'capas_get_capa',
				post_id : Capas.post_id,
				template : type
			};

			$.ajax({
				url : Piki.ajaxurl,
				type : 'POST',
				data : data
			})
			.done(function(response){

				Loader( 'close' );

				Capas.$content
					.fadeOut( 300 )
					.html( response )
					.fadeIn(function(){

						// Bind capas fields
						Capas.bindCapa();

						// Scrolling
						window.scroll({
							top: ( Capas.$.offset().top - Capas.scrollOffset ),
							behavior: 'smooth'
						});
					
					})
				;
				
			})
			.fail(function( error ){
				Loader( 'close' );
				Message.open( error.responseText );
			});

		},

		bindCapa : function(){
			this.$.on( 'select', 'button[data-action="post-select-open"]', function( e, data ){
				Capas.getTeaser( data );
			});
		},

		getTeaser : function( data ){

			Loader();

			var parameters = {
				action : 'capas_get_teaser',
				parent_id : Capas.post_id,
				post_id : data.$target.val(),
				template : data.template,
				group : data.group
			};

			$.ajax({
				url : Piki.ajaxurl,
				type : 'POST',
				data : parameters
			})
			.done(function(response){

				Loader( 'close' );

				$parent = data.$.parent();

				$html = $( response ).insertAfter( $parent );
				$parent.remove();

			})
			.fail(function( error ){
				Loader( 'close' );
				Message.open( error.responseText );
			});
			
		}

	};
	$(function(){
		Capas.init();
	});

})(jQuery);