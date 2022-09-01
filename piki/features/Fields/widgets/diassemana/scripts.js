(function($){
		$.fn.UFCidade = function( method ){
		var pluginArgs = arguments;
		return this.each(function(){

			var field = this;
			var $this = $( this );

			// Configura
			this.configure = function(){

				this.estados = $( 'select.estado', $this );
				this.cidades = $( 'select.cidade', $this );
				this.target = $( '.target-field', $this );
				this.preloader = $( '.preloader', $this );

				this.estados.data( 'ufcidade', { target : $this });
				this.cidades.data( 'ufcidade', { target : $this });

				if ( this.estados.val() != "0" && this.cidades.val() == "0" ) {
					this.changeEstado();
					//ufcidade_change_estado( $field );
				}

				this.estados.on( 'change', function(){
					field.changeEstado();
				});

				this.cidades.on( 'change', function(){
					field.setCidade();
					//var $target = $( this ).data( 'ufcidade' ).target;
					//set_cidade_value( $target );
				});

				// Diz que o campo já foi configurado
				this.ready = true;

			};

			// Mudando de estado
			this.changeEstado = function(){
				this.clearCidades();
				this.getCidades();
			}

			// Limpa o campo de cidades
			this.clearCidades = function(){
				// Primeira opção
				var firstOption = this.cidades.find( 'option' ).first();
				// Mostra o preloader
				this.preloader.css( 'display', 'inline-table' );
				// Limpa o campo de cidades e o desabilita
				this.cidades.pikiSelect( 'removeItems' ).pikiSelect( 'disable' )
				// Desabilita o campo de estados
				this.estados.pikiSelect( 'disable' );
				// Atualiza o valor no campo
				this.setCidade();
			}

			// Atualiza o valor do campo
			this.setCidade = function(){
				this.target.val( this.estados.val() + '/' + this.cidades.val() );
			}

			// Populando o campo de cidades
			this.getCidades = function(){

				// Se o valor é zero, limpamos o campo
				if ( this.estados.val() == '0' ) {
					// Remove as cidades
					this.clearCidades();
					// Habilita o campo de destados
					this.estados.pikiSelect( 'enable' );
					// Desabilita o campo de cidades
					this.cidades.pikiSelect( 'disable' );
					// Oculta o preloadeer
					this.preloader.css( 'display', 'none' );
					return;
				};

				// Recuperamos as cidades correspondentes ao estado selecionado
				$.ajax({
					type: "POST",
					url: Piki.ajaxurl,
					dataType: 'JSON',
					data: {
						action: 'piki_field_ajax',
						field_type: 'ufcidade',
						field_action: 'ajax_get_cidades',
						estado : field.estados.val()
					},
					beforeSend: function ( xhr ) {
						xhr.overrideMimeType("text/plain; charset=utf-8");
					}
				}).done(function(jSon){
					// Popula o campo de cidades
					field.pululateCidades( jSon );
					// Habilita o campo de estados
					field.estados.pikiSelect( 'enable' );
					// Ocultamos o preloader
					field.preloader.css( 'display','none' );
				});

			}

			// Popula e habilita o campo
			this.pululateCidades = function( options ){
				this.cidades.pikiSelect( 'populate', options, true ).pikiSelect( 'enable' );
			}
		
			// Chamando os métodos
			var toCall;
			if( ( toCall = eval( "this."+method ) ) == undefined && this.ready == undefined ){
				this.configure.apply( this, pluginArgs );
			}
			else{
				toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) );
			}

		});

	};
	$(function(){
		$( ".linha-field.ftype-ufcidade > .field-item" ).UFCidade();
	});
})(jQuery);
