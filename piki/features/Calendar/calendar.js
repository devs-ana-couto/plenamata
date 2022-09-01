(function($){

	// Máscara de carregamento
	var CalendarMethods = {

		configure : function( options ) {
			return this.each(function(){

			    // Default options
			    var defaults = { 
					afterLoad: false,
					afterChange: false
			    }; 

				var data = $.extend( {}, defaults, options );

				data.$ = $( this );
				data.self = this;

				// Interval
				data.interval = false;

				// Ano atual
				data.actualYear = data.$.attr( 'actual-year' );
				// Mes atual
				data.actualMonth = data.$.attr( 'actual-month' );

				// Controls
				data.controls = { wrapper : data.$.children( '.navigation' ) };
				data.controls.prev = $( 'a.left', data.controls.wrapper );
				data.controls.next = $( 'a.right', data.controls.wrapper );
				data.controls.label = $( '.desc-date', data.controls.wrapper );

				// Prev button
				data.controls.prev.on( 'click', function(event){
					event.preventDefault();
					if( !data.controls.prev.is( 'disabled' ) ){
						data.$.Calendar( 'getPrevMonth' );
					}
				});

				// Next button
				data.controls.next.on( 'click', function(event){
					event.preventDefault();
					if( !data.controls.next.is( 'disabled' ) ){
						data.$.Calendar( 'getNextMonth' );
					}
				});

				// Toggle button
				data.openText = 'Abrir calendário';
				data.closeText = 'Fechar calendário';
				data.toggleButton = $( '<span class="toggle-button"><span>'+ data.openText +'</span></span>' ).appendTo( data.$ );
				data.toggleButton.bind( 'click', function(event){
					event.preventDefault();
					if( data.$.is( '.opened' ) ){
						data.$.removeClass( 'opened' );
						data.toggleButton.html( '<span>'+ data.openText +'</span>' );
					}
					else {
						data.$.addClass( 'opened' );
						data.toggleButton.html( '<span>'+ data.closeText +'</span>' );
					}
				});
				
				// Grid days
				data.gridDays = data.$.children( '.grid-days' );

				// Atualizando os dias 
				data.actualizeDays = function(){
					// Dias
					data.allDays = data.gridDays.children( 'span' );
					// Dias atuais
					data.actualDays = data.allDays.filter( '.atual' );
				};
				data.actualizeDays();

				// Mostra a máscara de carregamento
				data.showLoader = function(){
					data.$.pikiLoader({ position : 'absolute' });
				};

				// Esconde a máscara de carregamento
				data.hideLoader = function(){
					data.$.pikiLoader( 'close' );
				};

				// Resize
				data.resize = function(){
					var wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					if( wWidth <= 640 ){
						data.$.Calendar( 'setMobile' );
					}
					else {
						data.$.Calendar( 'setDefault' );
					}
				};

				// After load event
				if( data.afterLoad !== false ){
					data.afterLoad.call( this, data );
				}

				// Atribui os dados ao calendário
				data.$.data( 'Calendar', data );

				// Size
				$( window ).bind( 'resize', function(){
					data.$.Calendar( 'resizeBind' );
				}).resize();

			});
		},

		// Modo mobile
		setMobile : function( data ){
			data.$.addClass( 'mobile' );
		},

		// Modo default do calendário
		setDefault : function( data ){
			data.$.removeClass( 'mobile' );
		},

		close : function( data ){

		},

		open : function( data ){

		},

		getNextMonth : function( data ){
			return this.each(function(){

				data.actualMonth++;
				if( data.actualMonth === 13 ){
					data.actualMonth = 1;
					data.actualYear++;
				}
				data.$.Calendar( 'requestCalendar', data.actualYear, data.actualMonth );

			});
		},

		getPrevMonth : function( data ){
			return this.each(function(){

				data.actualMonth--;
				if( data.actualMonth === 0 ){
					data.actualMonth = 12;
					data.actualYear--;
				}
				data.$.Calendar( 'requestCalendar', data.actualYear, data.actualMonth );
			
			});
		},

		requestCalendar : function( data, year, month ){
			return this.each(function(){

				data.showLoader();
				
				$.ajax({
					type: "POST",
					url: Piki.ajaxurl,
					dataType: 'JSON',
					data: {
						action: 'calendar_get_month',
						year: year,
						month: month
					},
					beforeSend: function ( xhr ) {
						xhr.overrideMimeType("text/plain; charset=utf-8");
					}
				}).done(function( response ){
					
					data.gridDays.html( response.days );
					
					data.controls.label.html(  response.year + ' ' + response.month );

					data.actualizeDays();
					
					data.hideLoader();

					// After load event
					if( data.afterChange !== false ){
						data.afterLoad.call( data.self, data );
					}

				});

			});
		},

		resizeBind : function( data ){
			return this.each(function(){
				clearTimeout( data.timeout );
				data.timeout = setTimeout( data.resize, 200 );
			});
		}

	};

	$.fn.Calendar = function( method ) {

		var data = this.data( 'Calendar' );

		if( data === undefined ){
			return CalendarMethods.configure.apply( this, arguments );
		}
		else if( CalendarMethods[ method ] ){
			var args = Array.prototype.slice.call( arguments, 1 );
			args.unshift( data );
			return CalendarMethods[ method ].apply( this, args );
		}

	};

})(jQuery);
