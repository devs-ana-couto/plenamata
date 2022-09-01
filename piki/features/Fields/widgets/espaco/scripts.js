(function($){
		
	$.fn.Espaco = function( method ){
		
		var pluginArgs = arguments;
		
		return this.each(function(){

			var _this = this;
			var $this = $( this );

			// Configura
			this.configure = function(){

				// Unidades
				this.unidades = $( 'select.unidade', $this );
				
				// Espaços
				this.espacos = $( 'select.espaco', $this );
				
				// Preloader
				this.preloader = $( '.preloader', $this );

				// Unidades
				if ( this.unidades.val() !== '' && this.espacos.val() === '' ){
					var actual_val = this.espacos.val();
					this.changeUnidade();
					this.espacos.val( actual_val );
				}
				this.unidades.on( 'change', function(){
					_this.changeUnidade();
				});

				// Diz que o campo já foi configurado
				this.ready = true;

			};

			// Mudando de unidade
			this.changeUnidade = function(){
				this.clearEspacos();
				this.getEspacos();
			};

			// Limpa o campo de espacos
			this.clearEspacos = function(){
				// Primeira opção
				var firstOption = this.espacos.find( 'option' ).first();
				// Mostra o preloader
				this.preloader.css( 'display', 'inline-table' );
				// Limpa o campo de espacos e o desabilita
				this.clearField( this.espacos );
				this.disableField( this.espacos );
				// Desabilita o campo de unidades
				this.disableField( this.unidades );
			};

			this.enableField = function( $field ){
				if( $field.is( '.piki-select' ) ){
					$field.get( 0 ).enable();
				}
				else {
					$field.prop( 'disabled', false );
				}
			};

			this.disableField = function( $field ){
				if( $field.is( '.piki-select' ) ){
					$field.get( 0 ).disable();
				}
				else {
					$field.prop( 'disabled', 'disabled' );
				}
			};

			this.clearField = function( $field ){
				if( $field.is( '.piki-select' ) ){
					$field.get( 0 ).removeItems();
				}
				else {
					$field.children( 'option' ).first().siblings().remove();
				}

			};

			// Populando o campo de espacos
			this.getEspacos = function(){

				// Se o valor é zero, limpamos o campo
				if ( this.unidades.val() == '0' ) {
					// Remove as espacos
					this.clearEspacos();
					// Habilita o campo de dunidades
					this.enableField( this.unidades );
					// Desabilita o campo de espacos
					this.disableField( this.espacos );
					// Oculta o preloadeer
					this.preloader.css( 'display', 'none' );
					return;
				}

				// Recuperamos as espacos correspondentes ao unidade selecionado
				$.ajax({
					type: "POST",
					url: Piki.ajaxurl,
					dataType: 'JSON',
					data: {
						action: 'piki_field_ajax',
						field_type: 'espaco',
						field_action: 'ajax_get_espacos',
						unidade : _this.unidades.val()
					},
					beforeSend: function ( xhr ) {
						xhr.overrideMimeType("text/plain; charset=utf-8");
					}
				}).done(function(jSon){
					// Popula o campo de espacos
					_this.pululateEspacos( jSon );
					// Habilita o campo de unidades
					_this.enableField( _this.unidades );
					// Ocultamos o preloader
					_this.preloader.css( 'display','none' );
				});

			};

			// Popula e habilita o campo
			this.pululateEspacos = function( options ){
				
				// Remove as opções anteriores
				_this.clearField( this.espacos );

				// Se não há resultados
				if( options === 0 ){
					_this.enableField( _this.espacos );
					return;
				}

				// Popula o campo
				if( _this.espacos.is( '.piki-select' ) ){
					_this.espacos.get( 0 ).populate( options, true );
				}
				else {
					$.each( options, function( key, label ){
						_this.espacos.append( '<option value="'+ key +'">'+ label +'</option>' );
					});
				}
				
				// Habilita o campo
				_this.enableField( _this.espacos );
			
			};
		
			// Chamando os métodos
			var toCall;
			if( typeof method == 'object' ){
				this.configure.apply( this, pluginArgs );
			}
			else if( ( toCall = eval( "this." + method ) ) === undefined ){
				if( this.ready !== undefined ){ return; }
				this.configure.apply( this, pluginArgs );
			}
			else{ toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) ); }

		});

	};

	window.initEspacosField = function(){
		$( ".linha-field.ftype-espaco > .field-item" ).Espaco();
	}
	
	// Configura novos textareas, quando carregados por ajax
	$(function(){
		window.initEspacosField();	
		window.fieldset_field_set_callback( window.initEspacosField );
	});

})(jQuery);
