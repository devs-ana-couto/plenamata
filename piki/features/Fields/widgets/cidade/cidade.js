PikiFields.add( 'FCidade.init' );

var FCidade;
(function($){

	FCidade = {

		main : function(){

			$(function(){
				FCidade.init();
			});

		},

		init : function(){

			var $fields = $( 'select.ftype-cidade' );
			if( $fields.length ){
				$fields.each(function(){
					FCidade.configure( this );
				});
			}

		},

		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'FCidade' );
			if( data !== undefined ) return;
			
			data = {
				_ : el,
				$ : el.$,
				initialValue : el.$.data( 'initial-value' ),
				wrapper : el.$.parents( '.field-item' ).first(),
				connectTo : el.$.data( 'state-connect' ),
				grouper : false,
				target : false,
				preloader : false
			};

			el.$.data( 'FCidade', data );

			if( data.connectTo !== undefined ){

				// Agrupator
				data.grouper = data.$.parents( '.fieldset-group-fields' ).first();
				if( !data.grouper.length ){
					data.grouper = data.$.parents( 'form' ).first();
				}
				
				data.targetLine = $( '.linha-field.ftype-uf.' + data.connectTo, data.grouper );
				
				data.target = $( 'select.ftype-uf', data.targetLine ).first();
				
				data.preloader = data.wrapper.children( '.preloader' );
				
				if ( data.target.val() != '0' && data.target.val() != '' ){
					FCidade.onStateChange( data, true );
				}

				data.target.on( 'change', function(){
					FCidade.onStateChange( data );
				});
				
			}

		},

		// Mudando de estado
		onStateChange : function( data, initial ){
			FCidade.clearCidades( data );
			FCidade.getCidades( data, initial );
		},

		// Limpa o campo de cidades
		clearCidades : function( data ){
			
			// Primeira opção
			var firstOption = data.$.find( 'option' ).first();
			
			// Mostra o preloader
			data.preloader.css( 'display', 'inline-table' );
			
			// Limpa o campo de cidades e o desabilita
			FCidade.clearField( data.$ );
			FCidade.disableField( data.$ );
			
			// Desabilita o campo de estados
			FCidade.disableField( data.target );

			// Atualiza o valor no campo
			//FCidade.setCidade( data );
		
		},

		enableField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				PikiSelect.enable( $field.data( 'PikiSelect' ) );
			}
			else {
				$field.prop( 'disabled', false );
			}
		},

		disableField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				PikiSelect.disable( $field.data( 'PikiSelect' ) );
			}
			else {
				$field.prop( 'disabled', 'disabled' );
			}
		},

		clearField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				PikiSelect.removeItems( $field.data( 'PikiSelect' ) );
			}
			else {
				$field.children( 'option' ).first().siblings().remove();
			}

		},

		// Populando o campo de cidades
		getCidades : function( data, initial ){

			// Se o valor é zero, limpamos o campo
			if ( data.target.val() == '0' || data.target.val() == '' ) {
				
				// Remove as cidades
				FCidade.clearCidades( data );
				
				// Habilita o campo de destados
				FCidade.enableField( data.target );
				
				// Desabilita o campo de cidades
				FCidade.disableField( data.$ );
				
				// Oculta o preloadeer
				data.preloader.css( 'display', 'none' );
				
				return;
			
			}

			// Recuperamos as cidades correspondentes ao estado selecionado
			$.ajax({
				type: "POST",
				url: Piki.pluginsurl + '/piki/features/Fields/widgets/cidade/sources/' + data.target.val() + '.json',
				dataType: 'JSON',
				beforeSend: function ( xhr ) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				}
			})
			.done(function( jSon ){

				// Popula o campo de cidades
				FCidade.pululateCidades( data, jSon );

				if( initial !== undefined ){
					data.$.val( data.initialValue ).trigger( 'change' );
				}
				
				// Habilita o campo de estados
				FCidade.enableField( data.target );
				
				// Ocultamos o preloader
				data.preloader.css( 'display','none' );
			
			});

		},

		// Popula e habilita o campo
		pululateCidades : function( data, options ){
			
			FCidade.clearField( data.$ );
			
			$.each( options, function( key ){
				data.$.append( '<option value="'+ this.id +'">'+ this.nome +'</option>' );
				FCidade.enableField( data.$ );
			});
		
		}

	};

	FCidade.main();

})(jQuery);