PikiFields.add( 'window.textarea_field_init' );

var FieldYoutube;

(function($){

	FieldYoutube = {

		$fields : null,

		init : function(){

			this.$fields = $( '.youtube-field-wrapper' );
			if( !this.$fields.length ) return true;

			this.$fields.each(function(){
				FieldYoutube.configure( this );
			});
			
		},

		configure : function( field ){

			field.$ = field.$ || $( field );

			var data = field.$.data( 'FieldYoutube' );
			if( data !== undefined ) return data;

			data = {
				self : field,
				$ : field.$,
				$thumb : $( '.thumbnail', field.$ ),
				$thumbImg : $( '.thumbnail img', field.$ ),
				$field : $( 'input', field.$ ),
				timeCheck : false
			};
			data.$thumbImg = $( 'img', data.$thumb );
			data.baseurl = data.$thumb.data( 'base-url' );

			// Keep data
			field.$.data( 'FieldYoutube', data );

			data.$field.on( 'focus focusout blur keypress copy paste cut', function(){

				if( data.timeCheck ) clearTimeout( data.timeCheck );
				data.timeCheck = setTimeout(function(){
					FieldYoutube.checkThumbnail( data );
				}, 200 );

			});
			

		},

		checkThumbnail : function( data ){

			var url = data.$field.val();

			if( url === '' ){

				data.$thumb.slideUp();
			
			}
			else {

				var code = FieldYoutube.YouTubeGetID( url );

				if( !code || code.length < 11 ){
					data.$thumb.slideUp();
				}
				else {

					var newsource = data.baseurl.replace( '[code]', code );
					data.$thumbImg.attr( 'src', newsource );
					data.$thumb.slideDown();

				}

			}

		},

	 	YouTubeGetID : function( url ){
			var ID = '';
		  	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		  	if(url[2] !== undefined) {
		    	ID = url[2].split(/[^0-9a-z_\-]/i);
		    	ID = ID[0];
		  	}
		  	else {
		    	ID = url;
		  	}
		    return ID;
		}

	}
	
	// Inicia os campos com editor de html
	window.textarea_field_init = function(){
		FieldYoutube.init();
	}

})(jQuery);