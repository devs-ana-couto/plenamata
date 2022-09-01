var 
	fieldDate,
	_body
;
(function($){

	DateField = {

		main : function(){
			$(function(){
				DateField.init();
			});
		},

		init : function(){

			_body = $( 'body' ).first();

			var $items = $( '.linha-field.ftype-date.keep-history' );
			if( !$items.length ) return;
			
			$items.each(function(){

				this.$ = this.$ || $( this );

				var data = this.$.data( 'fieldDate' );
				if( data !== undefined ) return;
 				
 				data = {
 					$ : this.$,
 					_ : this,
 					$add : $( 'button[data-action="add-value"]', this.$ ),
 					modal : {
 						$ : $( '.field-date-modal', this.$ ).appendTo( _body )
 					}
 				};
				data.post_id = data.modal.$.attr( 'data-post-id' );
				data.field_name = data.modal.$.attr( 'data-field-name' );
				data.modal.$start = $( 'input', data.modal.$ ).first();
				data.modal.$end = $( 'input', data.modal.$ ).last();
 				data.modal.$status = $( 'div.status', data.modal.$ );
 				data.modal.$cancel = $( 'button[data-action="cancel"]', data.modal.$ );
 				data.modal.$submit = $( 'button[data-action="submit"]', data.modal.$ );

 				data.$add.on( 'click', function(){
 					DateField.modalOpen( data );
 				});
 				data.modal.$submit.on( 'click', function(){
 					DateField.validate( data );
 				});
 				data.modal.$cancel.on( 'click', function(){
 					DateField.modalClose( data );
 				});
			
			});

		},

		validate : function( data ){

			var error = false;

			// Clear
			DateField.modalClear( data );
			
			// Validate
			if( data.modal.$start.val() == '' ){
				error = 'Informe a data inicial';
				data.modal.$start.addClass( 'error' );
			}
			else if( !DateField.isValidDate( data.modal.$start.val() ) ){
				error = 'Data inicial inválida';
				data.modal.$start.addClass( 'error' );
			}
			else if( data.modal.$end.val() == '' ){
				error = 'Informe a data final';
				data.modal.$end.addClass( 'error' );
			}
			else if( !DateField.isValidDate( data.modal.$end.val() ) ){
				error = 'Data final inválida';
				data.modal.$end.addClass( 'error' );
			}
			if( error ){
				data.modal.$status.html( error ).slideDown( 350 );
			}
			else {
				data.modal.$status.slideUp( 200 );
				DateField.submit( data );
			}

		},

		submit : function( data ){

			$.ajax({
				url : Piki.ajaxurl + '/?action=piki_field_ajax',
				type: 'POST',
				dataType: 'JSON',
				data : {
					field_type : 'date',
					field_action : 'ajax_new_value',
					field_name : data.field_name,
					post_id : data.post_id,
					data_start : data.modal.$start.val(),
					data_end : data.modal.$end.val()
				},
				beforeSend: function( xhr ) {
					$.fn.pikiLoader( 'all' );
				}
			})
			.done(function( response ) {
				
				$.fn.pikiLoader( 'close' );
				if( response.status === 'success' ){
					DateField.modalClose( data );
					DateField.modalClear( data, true );
				}
				
			})
			.error(function( xhr, statusText ){
				$.fn.pikiLoader( 'close' );
                Message.open({
                    title : xhr.statusText,
                    message : xhr.responseText
                });
			});

		},

		modalClear : function( data, empty_fields ){

			data.modal.$start.removeClass( 'error' );
			data.modal.$end.removeClass( 'error' );

			if( empty_fields === true ){
				data.modal.$start.val( '' );
				data.modal.$end.val( '' );
			}
		
		},
		
		modalClose : function( data ){
			data.modal.$.fadeOut();
		},

		modalOpen : function( data ){
			data.modal.$
				.css( 'display', 'flex' )
			    .hide()
			    .fadeIn()
			;
		},

		isValidDate : function( dateString ){

		    // First check for the pattern
		    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
		        return false;

		    // Parse the date parts to integers
		    var parts = dateString.split( '/' );
		    var day = parseInt(parts[0], 10);
		    var month = parseInt(parts[1], 10);
		    var year = parseInt(parts[2], 10);

		    // Check the ranges of month and year
		    if(year < 1000 || year > 3000 || month == 0 || month > 12)
		        return false;

		    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

		    // Adjust for leap years
		    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		        monthLength[1] = 29;

		    // Check the range of the day
		    return day > 0 && day <= monthLength[month - 1];
		
		}

	};
	DateField.main();

})(jQuery);