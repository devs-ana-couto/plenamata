(function($){

	var appPTS = {
		
		// Box da url do post
		$slugbox: false,
		// Caixa de seleção de taxonomia
		$taxbox : false,	
		// Opções da taxonomia
		$taxoptions : false,
		// Opções da taxonomia
		settings: false,
		// Trava do clique
		trava: false,
		// Termo atual
		actual: false,

		configure: function(){

			this.$form = $( 'form#post' );

			// Título
			this.$title = $( 'input#title', this.$form );

			// Caixa da url 
			this.$slugbox = $( '#edit-slug-box', this.$form );
			
			// Box da taxonomia
			this.$taxbox = $( '#taxonomy-' + this.settings.taxonomy.name );
			
			// Termos de opção
			this.$taxoptions = $( 'input[type="checkbox"]', this.$taxbox );

			// Opção default
			this.$defaultTerm = this.$taxoptions.filter( '[value="'+ this.settings.term.term_id +'"]' );

			// Seleção de termos
			this.$taxbox.on( 'change', 'input[type="checkbox"]', function(){

				// Evita duplos cliqueis
				if( appPTS.trava === true ){
					return;
				}
				// Trava enquanto analisa
				appPTS.trava = true;
				// Jquery
				if( this.$ === undefined ){
					this.$ = $( this );
				}
				// Muda o status
				appPTS.change( this );
			
			});

			// Se ainda não teve nenum termo marcado, marcamos o fornecido pelo Plugin
			if( !this.$slugbox.children().length ){
				this.checkDefault();
			}

		},

		change : function( input ){
			
			if( input.$.prop( 'checked' ) === true ){
				this.uncheckOthers( input.$.val() );
			}
			else {
				this.checkDefault();
			}

			// Registra a sessão com o termo escolhido
			this.chooseTerm( input.$ );

			// Destava o clique
			this.trava = false;
		
		},

		uncheckOthers : function( value ){
			this.$taxoptions.not( '[value="'+ value +'"]' ).prop( 'checked', false );
		},

		checkSiblings : function( input ){
			this.$taxoptions.filter( '[value="'+ value +'"]' ).prop( 'checked', true );
		},

		checkDefault: function(){
			this.$defaultTerm.prop( 'checked', true );
			this.chooseTerm( this.$defaultTerm )
		},

		chooseTerm : function( $option ){

			this.actual = $option.val();

			$.fn.pikiLoader();

			$.ajax({
				url : Piki.ajaxurl,
				type : 'POST',
				dataType : 'HTML',
				data : { 
					action : 'ptl_choose_term',
					ID : this.settings.post.ID,
					term_id : this.actual,
					title : this.$title.val(),
					samplepermalinknonce: $( '#samplepermalinknonce' ).val()

				}
			})
			.done(function( response ) {
				$.fn.pikiLoader( 'close' );
				if( response !== '-1' ){
					$( '#edit-slug-box' ).html( response );
				}
			})
			.fail(function( jqXHR, textStatus ) {
				$.fn.pikiLoader( 'close' );
				$.fn.pikiAlert( "Request failed: " + textStatus );
			});
		
		},

		init: function(){

			if( Piki.post_type_link === undefined ){
				return;
			}

			this.settings = Piki.post_type_link;

			$(function(){
				appPTS.configure();
			});

		}

	};
	appPTS.init();

})(jQuery);