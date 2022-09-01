(function($){

	$(function(){

		function split( val ) {
	      return val.split( /,\s*/ );
	    }
	    function extractLast( term ) {

	    	console.info( 'term' );
	    	console.log( term );
	    	
			return split( term ).pop();
	    
	    }

	    $( '.linha-field.ftype-tags' ).each(function(){

	    	this.$ = this.$ || $( this );
	   		
	   		var data = this.$.data( 'FieldData' );

	   		if( data === undefined ){
	   		
	   			data = {
	   				$ : this.$,
	   				_ : this,
	   				$content : this.$.children( '.field-item' ),
	   				$field : this.$.find( 'input.ftype-tags' )
	   			};
	   			data.$original = data.$field.clone();

	   			data.$list = $( '<ul></ul>' ).insertAfter( data.$field ).addClass( 'clearfix' );

	   			// Preenchendo os valores
	   			if( data.$original.val() !== '' ){
	   				var values = data.$original.val().split( ',' );
	   				for ( var i = 0; i < values.length; i++ ){
	   					data.$list.append( '<li>'+ values[i] +'</li>' );
	   				}
	   			}

	   			// Remove o campo original
	   			data.$field.remove();
	   		
	   		}
	   		
	   		data.$.data( 'FieldData', data );	   		

	   		data.$list.tagit({
	   			duplicateTagClass: 'bounce',
	   			fieldName : data.$original.attr( 'name' ) + '[]',
				tagSource: function( request, showChoices ){
				    $.ajax({
				        url: ajaxurl,
				    	type: 'POST',
				        dataType: "json",
				        data: {
							action: 'piki_field_ajax',
							field_type: 'tags',
							field_action: 'ajax_list',
							field_name: data.$original.attr( 'data-machine-name' ),
							q: extractLast( request.term ),
							actuals: data.$list.tagit( 'assignedTags' )
				        },
						success: function( choices ){
							showChoices( choices );
      					}
				    });
				},
	   			autocomplete: {
			        delay: 0,
			        minLength: 3
			    }
	   			/*
	   			autocomplete : function(){
			        appendTo: container,
			        position: { at: 'left bottom', of: container },
			        select: function(e, v) {
			            e.preventDefault();
			            //Add the tag if user clicks
			            if (e.which === 1) {
			                example4.add(v.item.value);
			            }
			        }
			    }
			    */
	   		});


	    });

	    /*
	    var example4 = new Taggle($('.example4.textarea').first(), {
	        duplicateTagClass: 'bounce'
	    });

	    var container = example4.getContainer();
	    var input = example4.getInput();
	    var $input = $( input );

	    $input.autocomplete({
			source: function( request, response ) {
				$.getJSON( 
					ajaxurl, {
						action: 'piki_field_ajax',
						field_type: 'tags',
						field_action: 'ajax_list',
						field_name: $this.attr( 'data-field-name' ),
						q: extractLast( request.term ) // search term
					}, 
					response 
				);
			},
	        appendTo: container,
	        position: { at: 'left bottom', of: container },
	        select: function(e, v) {
	            e.preventDefault();
	            //Add the tag if user clicks
	            if (e.which === 1) {
	                example4.add(v.item.value);
	            }
	        }
	    });
	    */

		/*
		$(input)
			// don't navigate away from the field on tab when selecting an item
			//.on( "keydown", function( event ) {
			//  if ( event.keyCode === $.ui.keyCode.TAB &&
			//      $( this ).autocomplete( "instance" ).menu.active ) {
			//    event.preventDefault();
			//  }
			})
			.autocomplete({
				source: function( request, response ) {
					$.getJSON( ajaxurl, {
						term: extractLast( request.term )
					}, response );
				},
				search: function() {
					// custom minLength
					var term = extractLast( this.value );
					if ( term.length < 2 ) {
						return false;
					}
				},
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( ", " );
					return false;
				}
			});
		  });
		*/

		/*$( '.ftype-tags' ).each(function(){

			this.$ = this.$ || $( this );
			var $this = this.$;

			var sampleTags = ['c++', 'java', 'php', 'coldfusion', 'javascript', 'asp', 'ruby', 'python', 'c', 'scala', 'groovy', 'haskell', 'perl', 'erlang', 'apl', 'cobol', 'go', 'lua'];

			$( '#singleFieldTags' ).tagit();

			this.$.select2({
		    	tags: true,
		    	tokenSeparators: [',', ' '],
		    	placeholder: "Digite aqui os valores",
  				allowClear: true,
  				maximumInputLength: 3,
				ajax: {
					url: ajaxurl,
					dataType: 'json',
					type: 'POST',
					delay: 250,
					data: function (params) {
						return {
							action: 'piki_field_ajax',
							field_type: 'tags',
							field_action: 'ajax_list',
							field_name: $this.attr( 'data-field-name' ),
							q: params.term, // search term
							page: params.page
						};
					},
					processResults: function (data, params) {
						// parse the results into the format expected by Select2
						// since we are using custom formatting functions we do not need to
						// alter the remote JSON data, except to indicate that infinite
						// scrolling can be used
						params.page = params.page || 1;

						return {
							results: data.items,
							pagination: {
								more: ( params.page * 3 ) < data.total_count
							}
						};
					},
					cache: true
				}
		    });

		});
		  */

	});

})(jQuery);