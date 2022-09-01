(function($){

	// Agenda
	var ScheduleMethods = {

		configure : function( options ) {

			var data = {
				$ 		: $( this ),
				self 	: this,
				call 	: ScheduleMethods
			};

			data.$.on( 'selectDay', function( e, calendar ){
				data.calendar = calendar;
				data.call.getDay( data );
			});

		},

		getDay : function( data ){

			data.call.requestDay( data );

		},

		requestDay : function( data ){

			data.calendar.showLoader();

			var pars = {
				action: 'schedule_get_day',
				date 	: data.calendar.selectedDay.getAttribute( 'rel' ),
				post_id : data.calendar.self.getAttribute( 'data-post-id' )
			};
			
			$.ajax({
				
				type: "POST",
				url: Piki.ajaxurl,
				dataType: 'JSON',
				data: pars,
				beforeSend: function ( xhr ) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				}
			
			}).done(function( response ){

				data.call.showDay( data, response );
				
			});
			
		},

		showDay : function ( data, response ){

			data.calendar.hideLoader();

			data.calendar.openSelectedDay( data.calendar, response.content );
			
		},

		closeDay : function( data ){

			alert( 'fecha o dia' );
		
		},
	};

	$.fn.Schedule = function( method ) {
		return this.each(function(){

			this.$ = this.$ || $( this );

			var data = this.$.data( 'Schedule' );
			if( data === undefined ){
				return ScheduleMethods.configure.apply( this, arguments );
			}
			else if( ScheduleMethods[ method ] ){
				var args = Array.prototype.slice.call( arguments, 1 );
				args.unshift( data );
				return ScheduleMethods[ method ].apply( this, args );
			}

		});
	};

	$(function(){
		var $schedules = $( '#schedule-post-field' );
		if( $schedules.length ){
			$schedules.Schedule();
		}
	});

})(jQuery);
