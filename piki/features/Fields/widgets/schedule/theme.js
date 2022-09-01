var ScheduleTheme;
(function($){

	ScheduleTheme = {

		configure : function( el ){

			el.$ = el.$ || $( el );

			var data = el.$.data( 'ScheduleTheme' );
			if( data !== undefined ) return;

			data = {
				_ : el,
				$ : el.$,
				$calendar : $( '.calendar', el.$ )
			}
			data.theme = data.$calendar.data( 'theme' );
			data.$slider = $( '.slick-slider', data.$calendar );
			data.$semanas = data.$slider.children( '.semana' );
			data.$results = $( '.list-results li', el.$ ).hide();

			// Calendário
			ScheduleTheme.bindSemanas( data );

			// Dias clicáveis
			data.$days = data.$semanas.find( 'a.enabled' );
			
			// Configura cada dia clicável
			data.$days.each(function( d ){
				this.$ = data.$days.eq( d );
				this.date = this.$.attr( 'rel' );
				if( d === 0 ){
					ScheduleTheme.clickDay( data, this );
				}
			});
			
			// Evento do clique no dia
			data.$semanas.on( 'click', 'a.enabled', function( event ){
				event.preventDefault();
				ScheduleTheme.clickDay( data, this );
			});

		},

		bindSemanas : function( data ){

			// Carrossel
			if( data.$semanas.length > 1 ){
			
				// Slick
				data.$slider.slick({ 
					ciclic : false, 
					infinite: false,
					arrows : data.theme === 'small',
				});
				data.$slider.on( 'beforeChange', function( event, slick ){
					slick.$slider.addClass( 'moving' );
				});
				data.$slider.on( 'afterChange', function( event, slick, currentSlide ){
					slick.$slider.removeClass( 'moving' );
					if( data.theme === 'complete' ){
						data.$floterButtons.removeClass( 'active' ).eq( currentSlide ).addClass( 'active' );
					}
				});

			}

			// Menu flutuante
			if( data.theme === 'complete' ){
				
				if( data.$semanas.length === 1 ){
				
					data.$semanas.first().find( 'header .toright' ).hide();
				
				}
				else{

					data.$floterMenu = $( '<div class="floater-semanas"></div>' ).appendTo( data.$calendar ).hide();
					data.$semanas.each(function( s ){
						var $s = data.$semanas.eq( s );
						var label = $( 'header .desc-week', $s ).html();
						var dates = $( 'header .desc-days', $s ).html();
						var newLine = $( '<a title="'+ label +'" class="clear"><span class="label">'+ label +'</span><span class="dates">'+ dates +'</span></a>' );
						data.$floterMenu.append( newLine );
					});
					data.$floterButtons = data.$floterMenu.children( 'a' );
					data.$floterButtons.on( 'click', function(event){
						event.preventDefault();
						data.$floterButtons.removeClass( 'active' );
						var $clicked = $( this ).addClass( 'active' );
						data.$slider.slick( 'slickGoTo', $clicked.index() );
						ScheduleTheme.closeFloater( data );
					});

					// Abrindo e fechando menu flutuante
					data.$toogleMenu = $( 'header .desc-week', data.$ );
					data.$toogleMenu.on( 'click', function(event){
						event.preventDefault();
						ScheduleTheme.openFloater( data );
					});

					$( 'body' ).on( 'click', function(event){
						if( data.$floterMenu.is( '.opened' ) && !$( event.target ).parents( '.calendar' ).length ){
							ScheduleTheme.closeFloater( data );
						}
					});

				}

			}

		},

		openFloater : function( data ){
			data.$floterMenu.addClass( 'opened' ).stop( true, true ).slideDown( 500 );
		},

		closeFloater : function( data ){
			data.$floterMenu.removeClass( 'opened' ).stop( true, true ).slideUp( 300 );
		},

		// Clica no dia
		clickDay : function( data, day ){
			
			// Se já está clicado
			if( day.$.is( '.active' ) ){
				return;
			}

			// Desmarca o que estiver clicado
			data.$days.filter( '.active' ).removeClass( 'active' );

			// Marca o que foi clicado
			day.$.addClass( 'active' );

			// Mostra o resultado
			var $_active = data.$results.filter( '.active' ).removeClass( 'active' );
			var $_toopen = data.$results.filter( '[rel="'+ day.$.attr( 'rel' ) +'"]' ).addClass( 'active' );
			if( $_active.length ){
				$_active.stop( true, true ).slideUp( 200, function(){
					$_toopen.slideDown( 400 );
				});
			}
			else {
				$_toopen.slideDown( 400 );
			}

		},

		addZero : function( i ){
			if( i < 10 ){
				i = '0' + i;
			}
			return i;
		},

		bestHour : function( hours ){

			var d = new Date();
			var now = ScheduleTheme.addZero( d.getHours() ) + ':' + ScheduleTheme.addZero( d.getMinutes() );

			$.each( hours, function(){
				if( this > now ){
					return now
				}
			});

			return hours.pop();

		}

	};

	$( '.schedule-weeks-wrapper' ).each(function(){
		ScheduleTheme.configure( this );
	});

})(jQuery);

/*
(function($){

	ScheduleTheme = {

		init : function(){

			var $fields = $( 'div.schedule-field-wrapper' );
			if( !$fields.length ) return;

			$fields.each(function(){
				this.$ = this.$ || $( this );
				ScheduleField.configure( this );				
			});

		},

		// Configure item
		configure : function( el ){

			// Data
			var data = {
				_ : el,
				$ : el.$,
				$interval : el.$.find( '#schecule-interval' ).first(),
				$specifics : el.$.find( '#schecule-specifics' ).first()
			};
			data.$weekdays = data.$interval.find( '.piki-sanfona' ).first();
			data.$headChecks = data.$interval.find( 'input.head-check' );

			el.$.data( 'ScheduleField', data );

			ScheduleField.initSanfonas( data );
			ScheduleField.bindTabs( data );

			// Inicia os blocos de horários
			ScheduleField.Hours.init( data );

			// Inicia o calendário
			ScheduleField.Calendar.init( data );

		},

		// Desmarcanado uma data em um intervalo de datas
		bindTabs : function( data ){
			
			data.$headChecks.on( 'change', function(){
				
				this.$ = this.$ || $( this );
				
				var $header = this.$.parent( '.sanfona-header' );
				
				if( this.$.prop( 'checked' ) === false ){

					$header.find( 'button' ).removeClass( 'active' );

					if( $header.hasClass( 'opened' ) ){
						
						var dataSanfona = data.$weekdays.data( 'PikiSanfona' );
						PikiSanfona.closeAll( dataSanfona );
					
					}

				}
				else {

					// Check if have custom hour
					ScheduleField.Hours.checkHours( data, $header.get(0).target );

				}
				
			});

		},

		initSanfonas : function( data ){

			// Opções de modos
			data.$.pikiSanfona({
	        	items: '>div',
	        	headers: '>h2',
	        	contents: '>div',
	        	style : 'abas',
	        	lockHash : true,
    			onOpen : function(){
    				console.log( 'muda campo que indentifica a opção escolhida.' );
    			},
	        	breakpoint : {
	    			width : 1230,
	    			style : 'sanfona',
	        	}
			});

			// Sanfona no modo de intervalo de datas
			data.$weekdays.pikiSanfona({
	        	items : '>div',
	        	headers : '>div.tab',
	        	triggers : 'button',
	        	contents : '>div.entry-content',
	        	style : 'abas',
	        	defaultItem : 0,
	        	effect : false,
	        	effectDuration: 300,
				beforeOpen : function( data, $el ){

					// Check item as active
					var el = $el.get( 0 );
					el.header.find( 'input[type="checkbox"]' ).prop( 'checked', true );

					// Verifying hours
					ScheduleField.Hours.checkHours( data, $el );
				
				},
				afterInit : function( data ){

					// Check whatches with custo dates
					data.$contents.each(function(i){

						this.$ = this.$ || $( this );
						if( i === 0 ) return;
						ScheduleField.Hours.checkHours( data, this.$ );
					
					});
					
				},
	        	breakpoint : {
	    			width : 1230,
	    			style : 'sanfona'
	        	}
			});

		},

		Hours : {

			init : function( data ){

				// Check hours trigger
				data.$interval.on( 'keypress focus focusout blur', 'input.ftype-horario', function(e){
					this.$ = this.$ || $( this );
					ScheduleField.Hours.checkHours( data, this.$ );
				});

				// Duplicate trigger
				data.$interval.on( 'click', 'button[data-action="add-horario"]', function(e){
					e.preventDefault();
					this.$ = this.$ || $( this );
					ScheduleField.Hours.duplicateHour( data, this.$ );
				});

				// Remove trigger
				data.$interval.on( 'click', 'button[data-action="remove-horario"]', function(e){
					e.preventDefault();
					this.$ = this.$ || $( this );
					this.$w = this.w || this.$.parent( '.line-value' );
					ScheduleField.Hours.removeHour( data, this.$w );
				});

			},

			// Duplicate hour field
			duplicateHour : function( data, $el ){

				var $new = $el.siblings( '.line-value' ).first().clone();
				var $input = $new.children( 'input' ).val( '' ).removeClass( 'masked' );
				$new.hide().insertBefore( $el ).show();
				$input.focus();

			},

			// Remove hour field
			removeHour : function( data, $el ){

				var $wrapper = $el.parents( '.horarios' ).first();

				var others = $el.siblings( '.line-value' ).length;
				if( !others ){
					$el.children( 'input' ).val( '' );
				}
				else {
					$el.stop( true, true ).remove();
				}

				// Check if have custom hour
				ScheduleField.Hours.checkHours( data, $wrapper );

			},

			// Check hours items
			checkHours : function( data, $content ){

				// If internal element
				if( !$content.hasClass( 'sanfona-item' ) ){
					$content = $content.parents( '.sanfona-item' ).first();
				}

				// All hour items
				var empty = true;
				$content.find( '.horarios input[type="text"]' ).each(function(){
					this.$ = this.$ || $( this );
					if( this.$.val() !== '' ){
						empty = false;
						return false;
					}
				});

				// Set button status
				var $button = $content.get( 0 ).header.find( 'button' );
				if( !empty ){
					$button.addClass( 'active' );
				}
				else {
					$button.removeClass( 'active' )
				}

			}

		},

		Calendar : {

		 	init : function( data ){

		 		// Elements
		 		data.Specifics = {
		 			actualDate : false,
		 			$calendar : $( '#calendar-field-programacao', data.$specifics ).first(),
		 			$horarios : $( '.horarios-wrapper', data.$specifics ).first()
		 		};
		 		data.Specifics.$legend = $( 'legend strong', data.Specifics.$horarios ).first();
		 		data.Specifics.$model = $( '.line-value.model', data.Specifics.$horarios ).first().clone();		 		

		 		// Delete model
		 		$( '.line-value.model', data.$specifics.$horarios ).hide();

		 		data.Specifics.$calendar.Calendar({
		 			afterLoad : function( calendar ){
		 				ScheduleField.Calendar.checkDates( data );
		 			},
		 			afterChange : function( calendar ){
		 				ScheduleField.Calendar.checkDates( data );
		 			},
		 			onChangeDate : function( calendar ){
		 				ScheduleField.Calendar.selectDay( data, calendar );
		 			}
		 		});

		 		// Add button
		 		data.Specifics.$add = $( '[data-action="add-horario"]', data.Specifics.$horarios );
		 		data.Specifics.$add.on( 'click', function(e){
		 			ScheduleField.Calendar.duplicate( data );
		 		});

		 		// Remove button
		 		data.Specifics.$horarios.on( 'click', '[data-action="remove-horario"]', function(e){
		 			this.$ = this.$ || $( this );
		 			ScheduleField.Calendar.removeHour( data, this.$ );
		 		});
		 		
			},

			selectDay : function( data, calendar ){

				data.Specifics.actualDate = calendar.selectedDate;

				if( data.Specifics.actualDate ){
					var _monthLabel = calendar.selectedDate.split( '-' ).pop() + ', ' + calendar.controls.label.text();
					data.Specifics.$legend.text( _monthLabel );
				}
				
				var $lines = $( '.line-value', data.Specifics.$horarios ).hide();
				var $items = $lines.filter( '[rel="'+ data.Specifics.actualDate +'"]' );

				if( $items.length ){
					$items.show();
				}
				else {
					ScheduleField.Calendar.duplicate( data );
				}

				ScheduleField.Calendar.checkDates( data );

			},

			// Remove hour
			removeHour : function( data, $el ){
				var $p = $el.parent();
				var $o = $p.siblings( '[rel="'+ $p.attr( 'rel' ) +'"]' );
				if( $o.length ){
					$p.remove();
				}
				else {
					$p.find( 'input' ).val( '' );
				}
			},

			duplicate : function( data ){
			
				var $_model = data.Specifics.$model.clone().attr( 'rel', data.Specifics.actualDate );
				var $_input = $( 'input', $_model );
				var _name = $_input.attr( 'name' ).replace( '[model]', '[' + data.Specifics.actualDate + ']' );
				$_model.insertBefore( data.Specifics.$add ).show();
				$_input.attr( 'name', _name ).focus();
			
			},

			checkDates : function( data ){
				
				var $days = $( '.grid-days > span.atual', data.Specifics.$calendar ).removeClass( 'selected' );
				var $vals = data.Specifics.$horarios.find( '.line-value' );
				$vals.each(function(){

					this.$ = this.$ || $( this );
					this.$f = this.$f || this.$.children( 'input' );

					if( this.$f.val() !== '' && this.$f.val().length === 5 ){
						var $toSelect = $days.filter( '[rel="'+ this.$.attr( 'rel' ) +'"]' );
						if( $toSelect.length ){
							$toSelect.addClass( 'selected' );
						}
					}
					
				});

				// Show box
				var _actual_exists = ( data.Specifics.actualDate ? $days.filter( '[rel="'+ data.Specifics.actualDate +'"]' ).length : false );
				if( _actual_exists ){
					data.Specifics.$horarios.slideDown();
				}
				else {
					data.Specifics.$horarios.slideUp();
				}
				
			}

		}

	};

	$(function(){

		if ( typeof window.fieldset_field_set_callback == 'function') {
			window.fieldset_field_set_callback( ScheduleField.init );			
		}

		ScheduleField.init();
	
	});

})(jQuery);
*/
