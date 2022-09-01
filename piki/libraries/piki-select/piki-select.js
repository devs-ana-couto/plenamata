var PikiSelect;
(function($){

	PikiSelect = {

		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'PikiSelect' );
			if( data !== undefined ) return;

			data = {
				_ : el,
				$ : el.$.addClass( 'piki-select' ),
				$label : null,
				$wrapper : $( '<div class="j-custom-select-holder" />' ).insertBefore( el.$ ),
				$selected : null,
				$options : el.$.children( 'option' ),
				$label : $( '<div class="text"></div>' ),
				$labelInner : $( '<span></span>' ),
				$picker : $( '<span class="picker"></span>' ),
				autosize : el.$.data( 'autosize' ) !== false
			}

			// Wrapper
			data.$.appendTo( data.$wrapper );
			data.$wrapper
				.attr( 'tabindex', 1 )
				.attr( el.$.attr( 'class' ) )
			;
			data.$label.appendTo( data.$wrapper );
			data.$labelInner.appendTo( data.$label );
			data.$picker.appendTo( data.$wrapper );

			el.$.data( 'PikiSelect', data );

			if( el.$.prop( 'disabled' ) ){
				data.$wrapper.addClass( 'disabled' );
			}

			// Autosize field
			this.resize( data );
			
			data.$.on( 'focus', function(){
				$( document ).on( 'keyup.PikiSelect', function(){
					PikiSelect.event( data );
				});			
			});
			data.$.on( 'focusout', function(){
				$( document ).off( 'keyup.PikiSelect', function(){
					PikiSelect.event( data );
				});		
			});
			
			// Set initial label
			var $selected = data.$options.filter( ':selected' );
			var _label = !$selected.length ? data.$options.first().html() : $selected.html();
			data.$labelInner.html( _label );
			
			// Bind change
			el.$.on( 'change.PikiSelect', function(){
				PikiSelect.onChange( data );
			});

			// Actualize widget
			el.$.on( 'actualize', function(){
				var _data = el.$.data( 'PikiSelect', data );
				PikiSelect.actualizeLabel( data );
			});

		},

		onChange : function( data ){

			// Último valor
			data.lastValue = data.$.val();

			// Atualiza o label
			PikiSelect.actualizeLabel( data );
			
			// Callback funciton
			var fieldId = data.$.attr( 'id' );
			if( fieldId !== undefined && fieldId.lastIndexOf( "[" ) ){
				fieldId = fieldId.replace( '[', '' ).replace( ']', '' );
			}
			
			// Callback
			var functionString = "pikiSelect__" + fieldId;
			if( eval( 'typeof ' + functionString ) == 'function' ){
				eval( functionString + "( data )");
			}

		},

		// Atualiza o label do campo
		actualizeLabel : function( data ){

			// Disabled class
			if( data.$.prop( 'disabled' ) ){
				data.$wrapper.addClass( 'disabled' );
			}
			else {
				data.$wrapper.removeClass( 'disabled' );
			}

			data.selected = data.$.find( 'option[value="' + data.$.val() + '"]' );
			data.labelText = !data.selected.length ? data.$options.first().html() : data.selected.html();
			data.$label.html( data.labelText );
		
		},

		resize : function( data ){

			if( !data.autosize ) return;

			// Tamanho do campo no css
			var field_width = parseInt( data.$.css( 'width' ) );

			// Se o tamanho do campo é fixo
			if( field_width > 0 ){
			
				return;
			
			}
			// Tamanho variável
			else {
			
				// Elemento parar cálculo
				var clone = data.$wrapper.clone().css({ position : 'absolute', top : 0, left : 0, visibility : 'hidden', display : 'block', width : '100%' }).appendTo( 'body' );
				var clone_label = clone.find( '.text' ).first().css({ 'width' : 'auto', 'display' : 'table' });
				var clone_target = clone.find( 'select' ).first();
				var _label_width = 0;
				clone_target.children( 'option' ).each(function(){
					this.$ = this.$ || $( this );
					clone_label.children( 'span' ).html( this.$.html() );
					if( clone_label.outerWidth() > _label_width ){
						_label_width = clone_label.outerWidth();
					}
				});
				clone_target.remove();
			
			}
			
			data.$label.css({ 'width' : _label_width, 'display' : 'block' });
			data.$wrapper.css({ 'width' : _label_width });
			data.$.css( 'width', '100%' );

		},

		event : function( event, data ){
		    if ( event.keyCode >= 37 && event.keyCode <= 40 ) { 
		    	data.$label.html( data.$options.filter( ':selected' ).html() );
		    }
		},

		labelWidth : function( data ){

			var _return = 0;
			var _total = data.options.length;
			
			for( var o=0; o < _total; o++ ){
				
				data.$labelInner.html( data.$options.get( o ).html() );
				if( data.label.outerWidth() > _return ){
					_return = data.label.outerWidth();
				}
				if( o == ( _total - 1 ) ){
					return _return;
				}
			}
		
		},

		val : function( data, value ){

			if( value == undefined ){ 
				value = data.$.find( 'option:selected' ).val(); 
			}
			if( value == undefined){
				value = data.$.find( 'option' ).first().val(); 
			}

			data.$.val( value );
			
			var newLabel = data.$.find( 'option:selected' ).html();
			data.$labelInner.html( newLabel );

		},
		
		disable : function( data ){

			data.$.prop( 'disabled', 'disabled' );
			data.$wrapper.addClass( 'disabled' );
		
		},
		
		enable : function( data ){

			data.$.prop( 'disabled', false );
			
			if( data ){
				data.$wrapper.removeClass( 'disabled' );
			};
		
		},
		
		populate : function( data, items, keepFirst ){
			
			var $first;
			if ( keepFirst !== undefined && keepFirst === true ) {
				$first = data.$.find( 'option' ).first().clone();
			}
			else {
				$first = '';
			}

			data.$.html( '' ).append( $first );
			$.each( items, function( key, label ){
				data.$.append( '<option value="'+ key +'">'+ label +'</option>' );
			});
		
		},

		removeItems : function( data ){
			
			PikiSelect.disable( data );
			
			data.$.find( 'option' ).each(function(i){
				this.$ = this.$ || $( this );
				if( i > 0 ){
					this.$.remove();
				};
			});
			
			PikiSelect.val( data, data.$.find( 'option' ).first().val() );
			PikiSelect.enable( data );
		
		}

	};

	window.init_custom_selectboxes = function(){

		var $selects = $( 'select' );
		if( $selects.length ){
			$selects.each(function(){
				PikiSelect.configure( this );
			});
		}

	};

})(jQuery);