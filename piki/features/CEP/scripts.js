PikiFields.add( 'PikiCEP.init' );

var PikiCEP;

(function($){

	PikiCEP = {

		$fieldCEP : null,

		main : function(){
			$(function(){
				PikiCEP.init();
			});
		},

		init : function(){

			// Complete CEP fields
			var $ceps = $( 'input.ftype-cep' );
			if( $ceps.length ){
				
				$ceps.each(function(){
					PikiCEP.configure( this );
				});
			
			}
			// Just state and city
			else {

				var $ufs = $( 'select.ftype-uf' );
				if( $ufs.length ){
					$ufs.each(function(){
						PikiCEP.checkUFCidade( this );
					});
				}

			}

		},

		// Configure CEP field
		configure : function( el ){

			// Element
			el.$ = el.$ || $( el );

			// Main element
			var $main = PikiCEP.getWrapper( el.$ );
			if( !$main ) return;

			// Data
			var data = $main.data( 'PikiCEP' );
			if( data !== undefined ) return;

			data = {
				$main : $main,
				CEP : $( 'input.ftype-cep', $main ) || false,
				estados : $( 'select.ftype-uf', $main ) || false,
				cidades : $( 'select.ftype-cidade', $main ) || false,
				bairro : $( 'input.bairro', $main ) || false,
				logradouro : $( 'input.logradouro', $main ) || false,
				preloader : $( '.preloader', $main ) || false,
				lastValue : false,
				cidadeActual : false
			};

			$main.data( 'PikiCEP', data );

			if( data.CEP.length ){
			
				data.CEPWrapper = data.CEP.parents( '.linha-field.ftype-cep' ).first();

				data.useDatabase = data.CEP.data( 'use-database' );
				data.lasValue = data.CEP.val();
			
				if( data.useDatabase ){
					PikiCEP.configureCEP( data );
				}
			
			}

			if( data.estados.length && data.cidades.length ){
				PikiCEP.configureUFCidade( data );
			}

		},

		// Check if is UF Cidade without CEP
		checkUFCidade : function( el ){
			
			el.$ = el.$ || $( el );

			// Wrappers
			$main = PikiCEP.getWrapper( el.$ );
			if( !$main ) return;

			var $cidades = $( 'select.ftype-cidade', $main );
			if( $cidades.length ){

				var data = {
					$main : $main,
					estados : el.$,
					cidades : $cidades,
					cidadeActual : false
				};

				$main.data( 'PikiCEP', data );

				PikiCEP.configureUFCidade( data );
			
			}
						
		},

		// Get wrapper
		getWrapper : function( $el ){
			
			var $wrap = $el.parents( '.fieldset-group-fields' );
			if( !$wrap.length ){
				$wrap = $el.parents( 'form' );
			}
			if( !$wrap.length ) return false;
			
			return $wrap.first();

		},

		configureCEP : function( data ){

			data.CEP.on( 'blur', function(e){
		
				var _cep = data.CEP.val();
		
				if( _cep.length === 9 && data.lasValue !== _cep ){
					data.lasValue = _cep;
					PikiCEP.searchCEPData( data );
				}
			
			});
		
		},

		searchCEPData : function( data ){

			// Consulta a base
			$.ajax({
				type: "POST",
				url: Piki.ajaxurl,
				dataType: 'JSON',
				data: {
					action: 'consulta_cep',
					cep : data.CEP.val()
				},
				beforeSend: function ( xhr ) {
					data.CEPWrapper.addClass( 'loading' );
					xhr.overrideMimeType("text/plain; charset=utf-8");
				}
			})
			.done(function( response ){

				if( response.status === 'not_found' ){
					return;
				}
				else if( response.status === 'success' ){
					PikiCEP.receiveCepData( data, response );
				}
				else {
					Message.open({
                        title : 'Ops!',
                        message : response.error_message,
                        classname : 'align-left'
					});
				}
			
			})
			.error(function(){
				// Esconde o loader
				data.CEPWrapper.removeClass( 'loading' );
			});

		},

		receiveCepData : function( data, json ){

			// Estado e cidade
			if( data.estados.length ){

				if( data.estados.val() !== json.uf  ){
					data.cidadeActual = json.id_cidade;
					data.estados.val( json.uf ).trigger( 'change' );
				}
				else {
					data.cidades.val( json.id_cidade ).trigger( 'change' );
				}

			}

			// Localidade não tem mais informações
			if( json.tipo == 'localidade' ){

				if( data.bairro.length ) data.bairro.val( '' );
				if( data.logradouro.length ) data.logradouro.val( '' );

			}
			else {

				// Bairro
				if( json.nome_bairro !== undefined && data.bairro.length ){
					data.bairro.val( json.nome_bairro );
				}

				// Logradouro
				if( data.logradouro.length ){
					var _endereco;
					if( json.tipo === 'logradouro' ){
						_endereco = json.prefixo + ' ' + json.nome;
					}
					else {
						_endereco = json.endereco + ' - ' + json.nome;
					}
					data.logradouro.val( _endereco );
				}

			}
			
		},

		configureUFCidade : function( data ){

			// Keep actual city
			data.cidadeActual = data.cidades.val();

			// Initial value
			data.initialCidade = data.cidades.data( 'initial-value' );
			if( data.initialCidade ){
				data.cidadeActual = data.initialCidade;
			}

			// Cidades wrapper
			data.cidadesWrapper = data.cidades.parents( '.linha-field' ).first();

			// Initial state
			if ( data.estados.val() !== '0' && data.estados.val() !== '' ){
				PikiCEP.changeEstado( data );
			}

			// Estados
			data.estados.on( 'change.PikiCEP', function(){
				if( data.estados.data( 'load-onchange' ) ){
					PikiCEP.changeEstado( data );
				}
			});

			// Manual change
			data.estados.on( 'forceChange', function(){
				PikiCEP.changeEstado( data );
			});

		},

		// Mudando de estado
		changeEstado : function( data ){
			PikiCEP.clearCidades( data );
			PikiCEP.getCidades( data );
		},

		// Limpa o campo de cidades
		clearCidades : function( data ){
			// Primeira opção
			var firstOption = data.cidades.find( 'option' ).first();
			// Limpa o campo de cidades e o desabilita
			PikiCEP.clearField( data.cidades );
			PikiCEP.disableField( data.cidades );
		},

		enableField : function( $field ){
			$field.prop( 'disabled', false ).trigger( 'actualize' );
		},

		disableField : function( $field ){
			$field.prop( 'disabled', true ).trigger( 'actualize' );
		},

		clearField : function( $field ){
			$field.children( 'option' ).first().siblings().remove();
			$field.trigger( 'actualize' );
		},

		// Populando o campo de cidades
		getCidades : function( data ){

			// Se o valor é zero, limpamos o campo
			if ( data.estados.val() == '0' ) {

				// Remove as cidades
				PikiCEP.clearCidades( data );
				// Habilita o campo de destados
				PikiCEP.enableField( data.estados );
				// Desabilita o campo de cidades
				PikiCEP.disableField( data.cidades );
				return;
			
			}			

			// Recuperamos as cidades correspondentes ao estado selecionado
			$.ajax({
				type: "POST",
				url: Piki.ajaxurl + '?estado=' + data.estados.val(),
				dataType: 'JSON',
				data: {
					action: 'piki_field_ajax',
					field_type: 'ufcidade',
					field_action: 'ajax_get_cidades',
					estado : data.estados.val()
				},
				beforeSend: function ( xhr ) {
					data.cidadesWrapper.addClass( 'loading' );
					xhr.overrideMimeType("text/plain; charset=utf-8");
				}
			})
			.done(function( jSon ){

				// Popula o campo de cidades
				PikiCEP.pululateCidades( data, jSon );
				data.cidadesWrapper.removeClass( 'loading' );
			
			})
			.error(function(){
				data.cidadesWrapper.removeClass( 'loading' );
			});

		},

		// Popula e habilita o campo
		pululateCidades : function( data, options ){
			
			PikiCEP.clearField( data.cidades );
			
			// Insert each option
			$.each( options, function( key, label ){
				data.cidades.append( '<option value="'+ key +'">'+ label +'</option>' );
			});

			// Select actual city
			if( data.cidadeActual ){
				var $_option = data.cidades.children( '[value="'+ data.cidadeActual +'"]' );
				if( $_option.length ){
					data.cidades.val( data.cidadeActual );
				}
			}
		
			PikiCEP.enableField( data.cidades );
		
		}

	};
	PikiCEP.main();

})(jQuery);