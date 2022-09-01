var SelectField;
(function($){

	PikiFields.add( 'window.startSelectFields' );

	// Starting fields
	window.startSelectFields = function(){

		const $selects = $( 'select' );
		if( !$selects.length ) return;

		$selects.each(function(){
			data = SelectField.configure( this );
		});

	}

	SelectField = {

		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'SelectField' );
			if( data !== undefined ) return data;

			// Data
			data = {
				_ : el,
				$ : el.$,
				$options : el.$.children( 'option' ),
				$customHolder : el.$.parent( '.j-custom-select-holder' ),
				parent : el.$.data( 'parent' ),
				parentRequireText : el.$.data( 'require-parent-text' ),
				selectAllLabel : el.$.data( 'select-all-label' ) !== undefined ? el.$.data( 'select-all-label' ) : false,
				lastValue : el.$.val()
			}

			// Customize select
			data.$.select2({
	            minimumResultsForSearch: -1,
	            width: 'resolve'
	        });

			// Bind selection
			data.$.on( 'select2:select', function(e){
				
				var 
					$target = $( e.currentTarget ),
					data = $target.data( 'select2' )
				;
				
				if( data.$element.val() !== '' ){
					data.$container.addClass( 'filled' );
					data.$dropdown.addClass( 'filled' );
				}
				else {
					data.$container.removeClass( 'filled' );
					data.$dropdown.removeClass( 'filled' );
				}

			});

			// Placeholder
			data.$placeholder = data.$options.filter( '[value=""]' );
			if( data.$placeholder ){
				data.placeholder = data.$placeholder.text();
			}

			// Select all label
			if( data.selectAllLabel !== false  && data.selectAllLabel !== '' ){
				SelectField.bindSelectAll( data );
			}
			
			// Dependent field
			data.$parent = $( 'select[data-machine-name="'+ data.parent +'"]' );
			if( data.$parent.length ){
				SelectField.bindParent( data );
			}
			
			// Return data
			return data;

		},

		bindSelectAll : function( data ){

			setTimeout(function(){
				SelectField.checkAllLabel( data );
			}, 10 );

			if( data.$placeholder.length ){
				data.$.on( 'select2:select', function(e){	
					SelectField.checkAllLabel( data );
				});
			}

		},

		checkAllLabel : function( data ){

			// Change label
			var value = data.$.val();
			var newLabel = ( value === '' ) ? data.placeholder : data.selectAllLabel;
			
			// Remove older placeholder
			if( data.$placeholder !== newLabel ){

				// Remove older placeholder
				data.$placeholder.remove();
				
				// Insert new placeholder
				data.$placeholder = $( '<option value="">'+ newLabel +'</option>' ).prependTo( data.$ );
				
				// If value is empty, set empty val
				if( value === '' ) data.$.val( '' );

				// Actualize plugin
				data.$.trigger( 'change:select2' );

			}

		},

		bindParent : function( data ){

			data.$parentOptions = data.$parent.children( 'option' );

			var parentValue = data.$parent.val();

			// Initial state
			SelectField.setOptions( data );

			// Binding
			data.$parent.on( 'change', function(){
				SelectField.setOptions( data );
			});
			data.$.on( 'change', function(){
				if( this.$.val() !== '' ){
					data.lastValue = this.$.val();
				}
			});

		},

		// Get parent value
		getParentValue : function( data ){
			var value = data.$parentOptions.filter( ':selected' );
			return value.length ? value.val() : false;
		},

		setOptions : function( data ){

			var value = SelectField.getParentValue( data );

			if( !value || value == '' ){
				SelectField.disable( data );
			}
			else {

				data.$options.hide();
			
				if( data.$placeholder.length ){	
					data.$placeholder.show();
				}

				var $toShow = data.$options.filter( '[rel="' + value + '"]' ).show();
				var $selected = $toShow.filter( '[value="'+ data.lastValue +'"]' );
				
				if( $selected.length ){
					$selected.prop( 'selected', true );
				}
				else if( data.$placeholder.length ){
					data.$placeholder.prop( 'selected', true );
				}
			
				SelectField.enable( data );
			
			}

		},

		enable : function( data ){
		
			data.$.prop( 'disabled', false );
			
			if( data.$placeholder.length && data.parentRequireText !== undefined ){
				data.$placeholder.text( data.placeholder );
			}

			data.$.trigger( 'change.select2' );
		
		},

		disable : function( data ){
			
			data.$.prop( 'disabled', true );

			data.$options.hide();

			if( data.$placeholder.length ){

				data.$placeholder.show();

				if( data.parentRequireText !== undefined ){
					data.$placeholder.show().text( data.parentRequireText );
				}
				
				data.$placeholder.prop( 'selected', true );
			}

			data.$.trigger( 'change.select2' );

		}
	
	};

})(jQuery);
