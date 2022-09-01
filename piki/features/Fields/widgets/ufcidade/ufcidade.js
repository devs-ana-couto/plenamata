PikiFields.add( 'window.startUFCidade' );

var UFCidade;

(function($){

	UFCidade = {
		
		configure : function( el ){

			el.$ = el.$ || $( el );
			var data = el.$.data( 'UFCidade' );

			// Just configured
			if( data !== undefined ) return;

			var data = {
				_ : el,
				$ : el.$,
				estados : $( 'select.estado', el.$ ),
				cidades : $( 'select.cidade', el.$ ),
				target : $( '.target-field', el.$ ),
				preloader : $( '.preloader', el.$ )
			};
		
			data.estados.data( 'UFCidade', { target : data.$ });
			data.cidades.data( 'UFCidade', { target : data.$ });

			// Keep data
			data.$.data( 'UFCidade', data );

			if ( data.estados.val() != "0" && data.cidades.val() == "0" ) {
				UFCidade.changeEstado( data );
			}

			data.estados.on( 'change', function(){
				UFCidade.changeEstado( data );
			});

			data.cidades.on( 'change', function(){
				UFCidade.setCidade( data );
				//var $target = $( this ).data( 'UFCidade' ).target;
				//set_cidade_value( $target );
			});

			if( typeof select2 !== 'undefined' ){

				$( 'select', data.$ ).select2({
	                autocomplete: false,
	                minimumResultsForSearch: Infinity
	            });

			}
			
			// Diz que o campo já foi configurado
			data.ready = true;
			
		},

		// Mudando de estado
		changeEstado : function( data ){
			UFCidade.clearCidades( data );
			UFCidade.getCidades( data );
		},

		// Limpa o campo de cidades
		clearCidades : function( data ){
			// Primeira opção
			var firstOption = data.cidades.find( 'option' ).first();
			// Mostra o preloader
			data.preloader.css( 'display', 'inline-table' );
			// Limpa o campo de cidades e o desabilita
			UFCidade.clearField( data.cidades );
			UFCidade.disableField( data.cidades );
			// Desabilita o campo de estados
			UFCidade.disableField( data.estados );
			// Atualiza o valor no campo
			UFCidade.setCidade( data );
		},

		enableField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				$field.get( 0 ).enable();
			}
			else {
				$field.prop( 'disabled', false );
			}
		},

		disableField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				$field.get( 0 ).disable();
			}
			else {
				$field.prop( 'disabled', 'disabled' );
			}
		},

		clearField : function( $field ){
			if( $field.is( '.piki-select' ) ){
				$field.get( 0 ).removeItems();
			}
			else {
				$field.children( 'option' ).first().siblings().remove();
			}

		},

		// Atualiza o valor do campo
		setCidade : function( data ){
			data.target.val( data.estados.val() + '/' + data.cidades.val() );
		},

		// Populando o campo de cidades
		getCidades : function( data ){

			// Se o valor é zero, limpamos o campo
			if ( data.estados.val() == '0' ) {
				// Remove as cidades
				UFCidade.clearCidades( data );
				// Habilita o campo de destados
				UFCidade.enableField( data.estados );
				// Desabilita o campo de cidades
				UFCidade.disableField( data.cidades );
				// Oculta o preloadeer
				data.preloader.css( 'display', 'none' );
				return;
			}

			// Recuperamos as cidades correspondentes ao estado selecionado
			$.ajax({
				type: 'GET',
				url: Piki.baseurl + '/features/Fields/widgets/cidade/sources/'+ data.estados.val() +'.json',
				dataType: 'JSON',
				beforeSend: function ( xhr ) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				}
			})
			.done(function( jSon ){

				// Popula o campo de cidades
				UFCidade.pululateCidades( data, jSon );
				
				// Habilita o campo de estados
				UFCidade.enableField( data.estados );
				
				// Ocultamos o preloader
				data.preloader.css( 'display','none' );
			
			});

		},

		// Popula e habilita o campo
		pululateCidades : function( data, options ){
			if( data.cidades.is( '.piki-select' ) ){
				data.cidades.get( 0 ).populate( options, true ).enable();
			}
			else {
				UFCidade.clearField( data.cidades );
				$.each( options, function( key, cidade ){
					data.cidades.append( '<option value="'+ cidade.id +'">'+ cidade.nome +'</option>' );
					UFCidade.enableField( data.cidades );
				});
			}
		}

	};

	window.startUFCidade = function(){
		var $fields = $( '.linha-field.ftype-ufcidade' );
		if( $fields.length ){
			$fields.each(function(){
				UFCidade.configure( this );
			});
		}
	}

	$(function(){
		window.startUFCidade();
	});

})(jQuery);