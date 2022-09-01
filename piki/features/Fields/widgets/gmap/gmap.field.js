PikiFields.add( 'window.startGMapField' );

(function($){

	window.startGMapField = function(){

		// Campos
		var $gmaps_fields = $( 'input.gmap-field' );
		if( $gmaps_fields.length ){
			$gmaps_fields.gmapField();
		}
		// Mapas
		var $gmaps_boxes = $( 'div.gmap-map-box' );
		if( $gmaps_boxes.length ){
			$gmaps_boxes.mapShow();
		}

	}

	window.gmap_load_api = function(){
		var gmap_library = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBlz40lqgiHqmHSkomJeVcZK1ywvmmDcY8&libraries=places&language=pt_BR&ver=3.20';
		$.getScript( gmap_library, function( data, textStatus, jqxhr ) {
			if( !textStatus == 'success' ){
				console.log( 'A API do google maps não foi carregada.' );
				return false;
			}
			else{
				return true;
			}
		});
	}

	$.fn.mapShow = function(){

		_this = this;
		this.$ = $( this );
		this.timeOut = null;
		
		// ID do elemento
		this.ID = this.$.attr( 'id' );

		// Icon
		this.icon = this.$.attr( 'data-icon' );

		// Posição
		this.latLng = {
			lat : parseFloat( this.$.attr( 'data-latitude' ) ),
			lng : parseFloat( this.$.attr( 'data-longitude' ) )
		};

		// Mapa
		this.map = new google.maps.Map( document.getElementById( this.ID ), {
			center: this.latLng,
			scrollwheel : false,
			zoom : 12
		});

		// Ponto
	  	this.marker = new google.maps.Marker({
	    	map: this.map,
	    	position: this.latLng,
	    	title: 'Localização',
	    	icon: this.icon
	 	});

	 	this.setCenter = function(){
		 	_this.map.setCenter( _this.latLng );	
	 	};

	 	$(window).bind( 'resize', function(){
	 		clearTimeout( _this.timeOut );
	 		_this.timeOut = setTimeout( _this.setCenter(), 1000 );
	 	});

	}

	// Manipula o campo
	var GMFMethods = {

		init : function( data ) {

			// Se já foi configurado
			if( data.$mapa !== undefined ){
				return;
			}

			// Mapa
			data.$mapa = data.$.siblings( '.gmap-map-area' ).first();

			// Se o mapa não existe
			if( !data.$mapa ){
				return;
			}

		    // Valor do campo
		    if( data.$.val() != '' ){
		    
		    	var coords = data.$.val().split( ',' );
		    	var init_zoom = data.$.data( 'initial-zoom' ) === undefined ? data.zoom.max : data.$.data( 'initial-zoom' );
		    
		    	data.initials.lat = coords[ 0 ];
		    	data.initials.lng = coords[ 1 ];
		    	data.zoom.init = init_zoom;

		    }
		    else {

		    	data.zoom.init = data.initials.zoom;
		    	
		    }

		    // Campo de busca
		    var $searchbox = data.$mapa.siblings( '.search-box' );
		    if( $searchbox.length ){
		    	data.search = {
		    		field : $( 'input.search-typing', $searchbox ),
		    		button : $( 'input.button', $searchbox )
		    	};
		    }
		    else{
		    	data.search = false;
		    }
		    
		    data.target = data.$mapa;
		    data.target.data( 'gmapField', { target : data.$ } );
		    
		    GMFMethods.configure( data );

	  	},

	  	configure : function( data ){

			geocoder = new google.maps.Geocoder(); //{ 'address': address }

			if ( data.initial_map ){

				data.initials.lat = initial_map.lat;
				data.initials.lng = initial_map.lng;
				data.zoom.init = initial_map.zoom;
			}

			var init_center = new google.maps.LatLng( data.initials.lat, data.initials.lng );
			
			var mapOptions = {
				disableDefaultUI : true,
				center: init_center,
				zoom: data.zoom.init,
				minZoom: data.zoom.min,
				maxZoom: data.zoom.max,
				zoomControl : true,
				zoomControlOptions : { style : google.maps.ZoomControlStyle.LARGE },
				disableDoubleClickZoom: false,
				scrollwheel: data.scrollwhell,
				styles: [{featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
				mapTypeControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			data.map = new google.maps.Map( document.getElementById( data.target.attr( 'id' ) ), mapOptions );

			// Marker options
			var markerOptions = {
	            map: data.map,
	            draggable : true,
	            position : init_center,
	            title : 'Arraste para escolher o local exato'
	        };

			// Custom marker
			var customMarker = data.$.data( 'marker' );
			if( customMarker !== undefined ){
				markerOptions.icon = customMarker;
			}
			
			data.user_mark = new google.maps.Marker( markerOptions );

	        data.user_mark.target = data.$;
			google.maps.event.addListener( data.user_mark, 'dragend', function(e) {
				var new_map_position = data.user_mark.getPosition();
				data.$.val( new_map_position.lat() + ',' + new_map_position.lng() );
				data.map.panTo ( new_map_position );
				data.$.trigger( 'dragend', data );
			});
			google.maps.event.addListener( data.user_mark, 'dragstart', function(e) {
				var data_target = data.user_mark.target.data( 'gmapField' );
				//data_target.stopAutoSearch = true;
				data.$.trigger( 'dragstart', data );
			});

			if( data.search ){
		    	data.search.button.on( 'click', function(event){
		    		event.preventDefault();
		    		if( data.search.field.val() == '' ){
			    		alert( 'Para fazer a busca, digite um endereço.' )
		    		}
		    		else {
		    			var endereco = data.search.field.val();
		    			GMFMethods.doSearch( data, endereco );
		    		}
		    	});
			}

			GMFMethods.setConnections( data );

	  	},

	  	setConnections : function( data ){

			if( !data.connections ){
				return;
			}

			// Onde buscar os campos para integração
			var $wrapper;
			if( data.$.parents( '.fieldset-group-fields' ).length ){
				$wrapper = data.$.parents( '.fieldset-group-fields' ).first();
			}
			else{
				$wrapper = data.$.parents( 'form' ).first();
			}

			//var types = [ 'logradouro', 'number', 'bairro' ,'cidade', 'estado', 'pais', 'cep' ];
			var types = [ 'cep' ];

			$.each( types, function( index, type ){
				var $field = $( 'input.ftype-'+ type + ',select.ftype-'+ type, $wrapper ).first();
				if( $field.length ){
					data.connections.push( $field );
					if( $field.is( 'input' ) ){
						$field.on( 'blur', function(){
							GMFMethods.prepareSearch( data, $( this ) );
						});
					}
					else if( $field.is( 'select' ) ){
						$field.on( 'change', function(){
							GMFMethods.prepareSearch( data, $( this ) );
						});
					}
				}
			});

	  	},

	  	prepareSearch : function( data, $field ){

			// Avenida Rio Verde, Setor Faicalville, Goiás, Brasil

			// Se não há conexões não fazemos nada
			if( !data.connections || data.connections.length < 1 || data.stopAutoSearch == true )
				return;

			var address = [];

			$.each( data.connections, function( i, $field ){

				var val_insert = $field.val();

				if( val_insert !== 0 && val_insert !== '0' && val_insert != '_____-___' && val_insert != '' ){
					if( $field.is( 'select' ) ){
						val_insert = $field.children( 'option[value="'+ val_insert +'"]' ).text();
					}
					address.push( val_insert )
				}

			});

			var _address = address.join( ', ' );
			GMFMethods.doSearch( data, _address );

	  	},

	  	doSearch : function( data, address ){

	  		//$.fn.pikiLoader();

	  		if( address.length < 9 ) return;
				
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': address }, function( results, status ) {
			  	//$.fn.pikiLoader( 'close' );
				if ( status == google.maps.GeocoderStatus.OK ) {
					GMFMethods.actualizeDragger( data, results[0].geometry.location );
				} 
				else {
					if( status == 'ZERO_RESULTS' ){
						console.log( 'Endereço não encontrado' )
						return 'ZERO_RESULTS';
					}
					else{
						console.log( 'erro' );
						return false;
					}
				}
			});

	  	},

	  	actualizeDragger : function( data, latlng ){

			data.$.val( latlng.lat() + ',' + latlng.lng() );
			data.map.panTo ( latlng );
			data.user_mark.setPosition( latlng );
			data.map.setZoom( data.zoom.search );

		},

		renderBox : function( data ){
				
			if( data == undefined ){
				data = {
					lat : data.$.attr( 'latitude' ),
					lng : data.$.attr( 'longitude' ),
					id : data.$.attr( 'id' )
				};
				data.$.data( 'gmapRender', data );
			} 


			data.geocoder = new google.maps.Geocoder();

			data.center = new google.maps.LatLng( data.lat, data.lng );

			data.mapOptions = {
				disableDefaultUI : true,
				center: data.center,
				zoom: 15,
				minZoom: 1,
				maxZoom: 22,
				zoomControl : true,
				zoomControlOptions : { style : google.maps.ZoomControlStyle.LARGE },
				disableDoubleClickZoom: false,
				scrollwheel: true,
				styles: [{featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
				mapTypeControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			data.map = new google.maps.Map( document.getElementById( data.id ), data.mapOptions );
			data.marker = new google.maps.Marker({
	            map: data.map,
	            draggable : false,
	            position : data.center
	        });
	        data.marker.target = data.$;

		}
	};

	$.fn.gmapField = function( method, options ) {

		return this.each(function(){

			if( this.$ === undefined ){
				this.$ = $( this );
			}

			var data = this.$.data( 'gmapField' );
			
			if( data === undefined ){

				var defaults = {

					$ : this.$,
					connections: [],
					map : false,
					zoomSlider : false,
					makers : [],
					infowindow : false,

					// PARA A BUSCA AUTOMÁTICA DEPOIS QUE O USUÁRIO ARRASTA O PIN
					stopAutoSearch: false,

					// BARRA DE ZOOM 
					zoom : { 
						min : 4, 
						max : 22, 
						init : this.$.data( 'initial-zoom' ),
						search : 18 
					},

					scrollwhell : false,

					// LOCALIZAÇÃO INICIAL
					initials : { lat: -15.793900, lng: -47.882764, zoom: 5 },

					// Autocomplete
					autocomplete : false,
					geocoder : false,
					lastSearchedString : false,

					// PikiMap a ser aberto 
					initial_map : false,
					pikimapOpened : false,
					cidadeBairros : false

				};

			    var _data = $.extend( {}, defaults, options );		    
				this.$.data( 'gmapField', _data );
				data = this.$.data( 'gmapField' );
			
			}

			if ( GMFMethods[ method ] ) {
				var _args = Array.prototype.slice.call( arguments, 1 );
				Array.prototype.unshift.call( _args, data );
				return GMFMethods[ method ].apply( this, _args );
			} 
			else {
				Array.prototype.unshift.call( arguments, data );
				return GMFMethods.init.apply( this, arguments );
			}

		});
			
	};
	
	window.gfield_search_address = function( address ) {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log( results );
				return results;
			} 
			else {
				if( status == 'ZERO_RESULTS' ){
					console.log( 'not found' )
					return 'ZERO_RESULTS';
				}
				else{
					console.log( 'erro' );
					return false;
				}
			}
		});
	}


})(jQuery);