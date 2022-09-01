(function($){

	$(function(){
		$( "div.PikiField" ).PikiField();
	});

	$.fn.PikiField = function( method ){

		// Argumentos passados
		var args = arguments;

		return this.each(function(){

			var field = this;
			var $field = $( this );

			this.init = function(){

				// ID do post
				this.post_id = $field.parents( 'form' ).first().find( 'input#post_ID' ).first().val();

				// set up default options 
				var defaults = { 
					target: false,
				}; 
				var options = $.extend( {}, defaults, options );

				this.fields = $( '.wrapp-fields', $field ).first();
				this.new_ftype = $( 'select.pikifield-new-ftype', $field ).first();
				this.new_name = $( 'input.pikifield-new-name', $field ).first();
				this.new_machine_name = $( 'input.pikifield-new-machine-name', $field ).first();

				// Machine name
				this.new_machine_name.on( 'keypress', function (e) {
					// Delete ou arrows
					if( e.keyCode == 8 || ( e.keyCode >= 37 && e.keyCode <=40 ) ){
						return true;
					}
				    // Permitidos
				    var allowedChars = new RegExp("^[a-zA-Z0-9\_]+$");
				    // Digitado
				    var str = String.fromCharCode( !e.charCode ? e.which : e.charCode );
				    // Permite a inserção
				    if ( allowedChars.test( str ) ) {
				        return true;
				    }
				    // Bloqueia o caractere
				    e.preventDefault();
				    return false;
				});
				this.new_machine_name.on( 'keyup', function() {
				    var forbiddenChars = new RegExp( "[^a-zA-Z0-9\_]", 'g' );
				    var $_field = $( this );
				    if ( forbiddenChars.test( $_field.val() ) ) {
				        $_field.val( $_field.val().replace( forbiddenChars, '' ) );
				    }
				});
				
				// Submit
				this.new_submit = $( 'input.pikifield-new-ok', $field ).first();
				this.new_submit.click(function() {
					field.addField( $( this ) );
				});
				
				// Fieldset
				this.new_fieldset = $( 'select.pikifield-new-fieldset', $field ).first();
				if ( this.new_fieldset.children( 'option' ).length == 1 ) {
					this.new_fieldset.parents( '.linha-field' ).first().hide();
				};
				this.new_fieldset.change(function(){
					var val = $( this ).val();
					if( val != '' ){
						field.closeField( field.fields.children( '.fieldset-options' ) );
						field.openField( field.fields.children( '.fieldset-options[rel="'+ val +'"]' ) );
					}
				});

				// Sortable
				var sort_options = { 
					axis: "y", 
					handle: "> .header > h3", 
					placeholder: "ui-state-highlight",
					start: function( event, ui ){
						ui.placeholder.css( 'height', ui.item.outerHeight()-2 );
					}
				};
				this.fields.sortable( sort_options );
				this.fields.find( '.fieldset-fields' ).sortable( sort_options );
				
				// Fecha os campos
				this.initCloseFields();

				// Header
				this.fields.on( 'mouseup', 'h3', function(){
					var $_field = $( this ).parents( '.fieldset-options, .field-options' ).first();
					field.toogleField( $_field );
				});
				
				// Botão de remover
				this.fields.on( 'click', '.remove-button', function( event ){
					event.preventDefault();
					var $_field = $( this ).parents( '.fieldset-options, .field-options' ).first();
					field.removeField( $_field );
				});

				// Atualizando em tempo real
				this.fields.on( 'keydown', 'input.label', function( event ){
					var $_field = $( this );
					var data = $_field.data( 'before_value' );
					if( !data ){
						$_field.data( 'before_value', $_field.val() );
					}
				});
				this.fields.on( 'keyup', 'input.label', function( event ){
					$_field = $( this );
					var new_label = $_field.val() == '' ? 'Nome do campo' : $_field.val();
					var $_wrapper = $_field.parents( '.fieldset-options, .field-options' ).first();
					$_wrapper.find( ' > .header .nome' ).html( new_label );
				});
				this.fields.on( 'blur', 'input.label', function( event ){
					$_field = $( this );
					if( $_field.val().length < 2 ) {
						alert( 'O nome do campo deve ter pelo menos dois caracteres' );
						$_field.val( $_field.data( 'before_value' ) );
						return;
					}
				});

			};

			// Inicia a abertura dos campos
			this.initCloseFields = function(){

				var _parent = $.cookie( 'PikiField_parent_' + this.post_id );
				var _field = $.cookie( 'PikiField_child_' + this.post_id );
				var $_parents = this.fields.children( '.fieldset-options,.field-options' );
				$_parents.each(function( i ){
					var $_parent = $( this );
					if( _parent != i ){ 
						field.closeField( $_parent ); 
					}
					if ( $_parent.is( '.fieldset-options' ) ) {
						$_parent.find( '.field-options' ).each(function( f ){
							var $_field = $( this );
							if( _parent == i && $_field.index() == _field ){ ; }
							else{ field.closeField( $_field ); }
						});
					};
				});

			};

			// Clique do campo
			this.toogleField = function( $_field ){
				if ( $_field.is( '.closed' ) ){
					field.openField( $_field );
					field.closeSiblings( $_field );
				}
				else{
					field.closeField( $_field );
				}
				this.setCookie( $_field );
			};

			// Remove um campo
			this.removeField = function( $_field ){
				$_field.fadeOut( 300 );
				$_field.delay( 310 ).remove();
			};
			
			// Atualiza o cookie
			this.setCookie = function( $_field ){
				
				var type = $_field.parent().is( '.wrapp-fields' ) ? 'parent' : 'child';
				var pid = $_field.parents( 'form' ).first().find( 'input#post_ID' ).first().val();
				var c_name = 'PikiField_' + type + '_' + pid;
				var new_cooke = $_field.is( '.closed' ) ? 'x' : $_field.index();
				$.cookie( c_name, new_cooke );			

			};

			this.reorganizeFields = function( $_field ){
	
				// Footer				
				var _footer = '';
				if ( $_field.is( '.fieldset-options' ) ) {
					_footer += '.footer ';
				};
				
				// Campo com ID único
				var $machine_name = $_field.find( _footer + 'input.machine_name' );
				
				// ID único
				var _machine_name = $machine_name.val();
				
				// Valida se está vazio
				if ( _machine_name == '' ) {
					alert( 'Problemas com o nome do campo.' );
					return;
				}
				
				// Profundidade
				var _deph = $_field.parent().is( '.fieldset-fields' ) ? 2 : 1;
				
				// Organiza os subcampos
				$_field.find( 'input,select,textarea' ).each(function(){
					
					var $_item = $( this );
					var peaces = $_item.attr( 'name' ).split( '[' );
					var basename = peaces.shift();
					if ( _deph == 2 ) {
						basename += '[' + peaces.shift();
					}
					peaces.shift();
					var new_name = basename + '['+ _machine_name +']['+ peaces.join( '[' );
					$_item.attr( 'name', new_name );
					var new_id = new_name.split( '][' ).join( '_' ).replace( '[', '_' ).replace( ']', '' );
					$_item.attr( 'id', new_id );
				
				});

			};

			// Fecha um campo
			this.closeField = function( $_field ){
				var $_header = $_field.children( '.header' );
				$_field.css( 'height', ( $_header.outerHeight()-1 ) ).addClass( 'closed' );
			};

			// Abre um campo
			this.openField = function( $_field ){
				$_field.css( 'height', 'auto' ).removeClass( 'closed' );
			};

			// Fecha os campos vizinhos
			this.closeSiblings = function( $_field ){
				$_field.siblings().each(function(){
					field.closeField( $( this ) );
				});
			};

			// Atualiza os fieldsets
			this.actualizeFieldsets = function(){

				var $_fieldsets = this.fields.children( '.fieldset-options' );
				var _options = '';
				$_fieldsets.each(function(){
					var $_child = $( this );
					var $_machine_name = $_child.find( '.footer input.machine_name' );
					if ( $_machine_name.val() != '' ) {
						$_child.attr( 'rel', $_machine_name.val() );
						_options += '<option value="' + $_machine_name.val() + '">no grupo ' + $_child.find('.footer input.label').val() + '</option>';
					}
				});
				var $_first = this.new_fieldset.find( 'option' ).first();
				this.new_fieldset.html( $_first );
				if ( _options != '' ) {
					this.new_fieldset.append( _options );
					this.new_fieldset.parents( '.linha-field' ).first().show();	
				}

			};

			// Adiciona um novo campo
			this.addField = function(){

				var _has_similar_machine_name = $field.find( 'input.machine_name[value="'+ this.new_machine_name.val() +'"]' ).length;

				// Verifica se o nome foi preenchido
				if ( this.new_name.val() == '' ) {
					alert( 'Informe o nome do campo que deseja criar' );
					return false;
				}
				// Verifica se o id único
				else if( this.new_machine_name.val() == '' ) {
					alert( 'Informe o ID único do campo que deseja criar' );
					return false;
				}
				// Se o ID único é muito curto
				else if ( _has_similar_machine_name ) {
					alert( 'O ID único informado já existe no formulário' );
					return false;
				}
				// Se o ID único é muito curto
				else if ( this.new_machine_name.val().length < 3 ) {
					alert( 'O ID único do campo deve ter no míniomo 3 caracteres' );
					return false;
				}
				// Se o tipo de campo foi informado
				else if ( this.new_ftype.val() == 0 ) {
					alert( 'Selecione um tipo de campo' );
					return false;
				}

				// Parametros
				var request_pars = {
					action : 'formfields_get_row',
					ftype : this.new_ftype.val(), 
					name: this.new_name.val(),
					machine_name: this.new_machine_name.val()
				};
				// Adiciona o fieldset, se for o caso
				if ( this.new_fieldset.val() != '0' ) {
					request_pars.parent_field = this.new_fieldset.val();
				};
				
				$.fn.pikiLoader();
				
				$.ajax({
					type: "POST",
					data: request_pars,
					url: Piki.ajaxurl,
					dataType: 'JSON'
				}).done(function ( jSon ) {
					
					$.fn.pikiLoader( 'close' );
					
					if ( jSon.status=='success' ) {
						
						// Reseta o form de novos campos
						field.resetAddForm();
						
						// Insere o campo no formulário
						var $_new_field = $( jSon.field );
						if ( jSon.parent && jSon.parent.length > 1 ) {
							var $_append_to = field.fields.children( '.fieldset-options[rel="' + jSon.parent[ 0 ] +'"]' );
							$_new_field.appendTo( $_append_to.find( '.fieldset-fields' ) );
						}
						else{
							field.fields.append( $_new_field );
						}
						
						// Fecha os outros campos
						field.closeSiblings( $_new_field );
						
						// Torna o fieldset 'sortable'
						if( jSon.ftype == 'fieldset' ){
							$_new_field.find( '.fieldset-content .fieldset-fields' ).sortable();
							field.actualizeFieldsets();
						}
					
					}

				});

			};

			// Reseta um formulário
			this.resetAddForm = function(){
				this.new_name.val( '' );
				this.new_ftype.val( '' );
			};

			// Chamando os métodos
			var toCall;
			if( ( toCall = eval( "this."+method ) ) == undefined ){
				if( !this.ready == undefined ){
					return;
				}
				this.init.apply( this, args );
			}
			else{
				toCall.apply( this, Array.prototype.slice.call( args, 1 ) );
			}

		});

	};

})(jQuery);
