var PikiFields;

(function($){

	var $body;

	PikiFields = function(){
		
		// Métodos adicionados
		var methods = [];

		var init = function(){

			$body = $( 'body' );

			var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
			if( isChrome ){
				$body.addClass( 'is-chrome' );
			}

			// Call attachments fields
			PikiFields.call();

			// General calls
			PikiFields.bindAll();

			// Call depenedents fieds
			PikiFields.bindConditionals();

		};
		
		// Adicionando um método
		var add = function( method ){		
			if( !window.in_array( PikiFields.methods, method ) ){
				PikiFields.methods.push( method );
			}
		}
		
		// Evocando métodos
		var call = function( context ){

			// Total de métodos
			var total = PikiFields.methods.length;

			// Chamando cada método
			for( var pi = 0; pi < total; pi++ ){

				// Nome do método
				var method = eval( PikiFields.methods[ pi ] );
			
				try{ 
					method.call( context ); 
				}
				catch( err ){ 
					console.log( 'Hove um problemas com método de campo ' + PikiFields.methods[ pi ] );
				}
			
			}
		
		};

		var checkFillClass = function( el ){

			el._$ = el._$ || $( el );
			el._$lf = el._$lf || el._$.parents( '.linha-field' );

			if( el._$lf.length ){

				var _type = typeof( el.type ) !== undefined ? el.type.toLowerCase : false;

				var _filled;
				if( _type === 'checkbox' || _type === 'radio' ){
					_filled = el._$.prop( 'checked' );
				}
				else {
					_filled = el._$.val() !== '';
				}

				if( _filled ){
					el._$lf.addClass( 'filled' );
				}
				else {
					el._$lf.removeClass( 'filled' );
				}
			
			}

		};
		
		// Bind all fields
		var bindAll = function(){

			// Initial checking
			$( 'input,select,textarea' ).each(function(){
				PikiFields.checkFillClass( this );
			});
 
 			// Bind actions
			$body.on( 'change keypress focus focusout blur', 'input', function(){
				PikiFields.checkFillClass( this );
			});

		};

		var bindConditionals = function(){

			// Conditional fields
			var $conditionals = $( '.linha-field[data-show-when]' );
			if( $conditionals.length ){

				$conditionals.each(function(){

					this.$ = this.$ || $( this );

					var data = this.$.data( 'conditions' );
					if( data !== undefined ) return data;

					data = {
						_ : this,
						$ : this.$,
						conditions : this.$.data( 'show-when' )
					};
					this.$.data( 'conditions', data );

					data.conditions.forEach(function( cond, i ){

						var $field = $( '.linha-field.' + cond.field );

						// Checkboxes and Radios
						if( 
							$field.hasClass( 'ftype-checkboxes' ) 
							||  
							$field.hasClass( 'ftype-radios' ) 
							|| 
							$field.hasClass( 'ftype-boolean' ) 
							|| 
							$field.hasClass( 'ftype-termsuse' ) 
						){

							var $_fields = $( 'input[type="checkbox"],input[type="radio"]', $field );

							$_fields.on( 'change.PikiFields', function(){

								this.$ = this.$ || $( this );
								this.$.stop( true, true );

								var checkeds = $_fields.filter( ':checked' );

								var value;
								if( $field.hasClass( 'ftype-checkboxes' ) ){
									
									value = [];
									if( checkeds.length ){
										checkeds.each(function(){
											this.$ = this.$ || $( this );
											value.push( this.value );
										});
									}
									
								}
								else {
									value = checkeds.length ? checkeds.val() : false;
								}

								if( 
									(
										typeof( value ) === 'object'
										&&
										(
											( cond.value == 'notempty' && value.lenght > 0 )
											||
											( cond.value == 'empty' && value.lenght < 1 )
											||
											value.includes( cond.value )
										)
									)
									||
									(
										( cond.value == 'notempty' && this.$.prop( 'checked' ) )
										||
										( cond.value == 'empty' && !this.$.prop( 'checked' ) )
										|| 
										( value && cond.value === value )
									)
								){
									data.$.slideDown( 300 );
								}
								else {
									data.$.slideUp( 300 );
								}

							}).trigger( 'change' );

						}
						// Select
						else if( $field.hasClass( 'ftype-select' ) ){

							var $field = $( 'select', $field );
							$field.on( 'change.PikiFields', function(){

								this.$ = this.$ || $( this );
								this.$.stop( true, true );

								if( 
									( cond.value === 'notempty' && $field.val() !== '' && $field.val() !== '0' )
									||
									( cond.value === 'empty' && ( $field.val() === '' || $field.val() === '0' ) )
									|| 
									( cond.value === $field.val() )
								){
									data.$.slideDown( 300 );
								}
								else {
									data.$.slideUp( 300 );
								}

							}).trigger( 'change' );

						}

					});

				});

			}

		};

		// Retorno
		return {

			methods : methods,
			
			add : function( method ){
				add( method );
			},
			
			init : function(){
				init();
			},
			
			bindConditionals : function(){
				bindConditionals();
			},
			
			bindAll : function(){
				bindAll();
			},
			
			checkFillClass : function( el ){
				checkFillClass( el );
			},
			
			call : function( context ){
				call( context );
			}
		
		};

	}();

	$(function(){ 
		PikiFields.init(); 
	});

})(jQuery);
