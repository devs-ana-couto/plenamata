// Old browsers
if( !window.console ){
	console = { 
		log: function( content ){
			alert( 'Log: ' + content );
		},
		info: function( content ){
			alert( 'Info: ' + content );
		}
	};
}

var 
	Piki,
	Cookie
;

// Cookies
Cookie = {

    set : function setCookie( name, value, days ){
        
        var expires, days, date;
        // Infinito
        if ( days === undefined ){
            days = 99999;
        }
        // Dura só durante a sessão do browser
        else if ( days === false ){
            days = '';
        }
        // Calcula o tempo de expiração do cookie
        if( days === '' ){
            expires = '';
        }
        else {
            date = new Date();
            date.setTime( date.getTime() + ( days * 24*60*60*1000 ) );
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/; SameSite=Strict"; // domain=" + domain
    
    },

    delete : function deleteCookie( name ){
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    },

    get : function getCookie( name ){
        var name = name + "=";
        var ca = document.cookie.split( ';' );
        for( var i = 0; i < ca.length; i++ ){
            var c = ca[i];
            while( c.charAt(0) == ' ' ){
                c = c.substring(1);
            }
            if( c.indexOf( name ) == 0 ){
                return c.substring( name.length, c.length );
            }
        }
        return '';
    }

};

(function($){
	
	_window = $( window );
	_html = $( 'html' );
	_body = $( 'body' );
	_resize_timeout = null;

	// Piki
	Piki.init = function(){

		Piki.$header = $( '#masthead' );

		// Bind form fields
		Piki.bindFields();

		// Target blank
		_body.on( 'click', 'a[rel="_blank"]', function(){
			$( this ).attr( 'target', '_blank' );
		});

	};
	Piki.bindFields = function(){

		var $form = $( 'form' );

		// Focus nos campos de formulário
		_body.on( 'focus', 'select,input,textarea', function(){
			$( this ).addClass( 'focus' );
		});
		_body.on( 'focusout', 'select,input,textarea', function(){
			$( this ).removeClass( 'focus' );
		});

	};


	// Window functions
	Piki.fixedScroll = false;
	Piki.lockScroll = function(){
		Piki.fixedScroll = Piki.getPageTop();
		$(window).bind( 'scroll.locking', function(e){
			e.preventDefault();
			$(window).scrollTop(Piki.fixedScroll);
		});
	};
	Piki.unlockScroll = function(){
		$(window).unbind( 'scroll.locking' );
	};
	Piki.getPageTop = function(){
	    return ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 );
	};

	Piki.scrollTo = function( selector ){

        var $target = typeof( selector ) === 'object' ? selector : $( selector );            
        if( !$target.length ) return;

		var newY;
        if( $target.attr( 'id' ) === 'inicio' ){
        	newY = 0;
        }
        else {
	        newY = $target.offset().top;
        }

        var actualY = _window.scrollTop();
        var distance = actualY - newY;

        if( distance < 0 ) distance *= -1;
        
        var time = ( 600 - ( distance * 0.1 ) );
        if( time < 600 ) time = 600;
        
        var offset = $target.data( 'offset' );
        if( offset ){

            try {

                var 
                    _json = JSON.parse( offset.split( "'" ).join( '"' ) )
                    _offset = false,
                    _vWidth = Navigation.getPageWidth()
                ;

                $.each( _json.breaks, function( _break ){
                    if( _vWidth <= _break ){
                        _offset = parseInt( this );
                        return false;
                    }
                });

                offset = ( !_offset ) ? parseInt( _json.initial ) : _offset;

            }
            catch( e ){

                var _offset = parseInt( offset );
                offset = _offset > 0 ? _offset : 0;
            
            }

        }
        else {
            offset = 0;
        }

        if( this.$header ){
        	offset += this.$header.outerHeight();
        }

        $( 'html, body' ).animate({
            scrollTop: ( newY - ( offset ) )
        }, 250, 'easeOutQuad' );      

    };
	$(function(){
		Piki.init();
	});

	// Habilita o scroll vertical
	window.enableScroll = function(){
		document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "auto";
		document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "auto";
	};
	// Desabilita o scroll vertical
	window.disableScroll = function(){
		document.getElementsByTagName( 'body' )[ 0 ].style.overflowY = "hidden";
		document.getElementsByTagName( 'html' )[ 0 ].style.overflowY = "hidden";
	};

	window.timthumb = function( url, width, height, zc ){
		// Zera o widht
		if( width === undefined ){
			width = 0;
		}
		// Zera o height
		if( height === undefined ){
			height = 0;
		}
		// Zera o ZC
		if( zc === undefined ){
			zc = 1;
		}
        var sizes = '';
        if( width > 0 || height === 0 ){
        	sizes += '&w=' + width;
        }
        if( height > 0 ){
			sizes += '&h=' + height;
        }
        var img_url = Piki.blogurl + '/wp-content/images/timthumb.php?src=' + url +  sizes + '&zc=' + zc + '&q=100';
        return img_url;
	};

	// HELPER FUNCTIONS

	window.get_url_anchor = function(){
		var url = window.location.href, idx = url.indexOf( "#" );
		var hash = idx != -1 ? url.substring( idx+1 ) : false;
		
		if (hash && strpos(hash, '?')){
			return hash.split('?').shift();
		}

		return hash;
	};

	window.strpos = function( haystack, needle, offset ) {
		var i = ( haystack + '' ).indexOf(needle, ( offset || 0 ) );
		return i === -1 ? false : i;
	};

	window.clear_file_field = function( $field ){
		if( $.browser.msie ){
			$field.replaceWith($field.clone());
		}
		else {
			$field.val( '' );
		}
	};

	window.piki_get_scrolltop = function() {
	   //I never work in IE quirkmode, I always use DOCTYPE as 1st line, so I don't need to test for document.body.scrollTop
	   return self.pageYOffset || document.documentElement.scrollTop; 
	};

	window.piki_get_viewport = function(){
		var viewportwidth;
		var viewportheight;
		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerWidth;
			viewportheight = window.innerHeight;
		}
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		else if (typeof document.documentElement !== undefined && typeof document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0 ){
			viewportwidth = document.documentElement.clientWidth;
			viewportheight = document.documentElement.clientHeight;
		}
		// older versions of IE
		else {
			viewportwidth = document.getElementsByTagName( 'body' )[0].clientWidth;
			viewportheight = document.getElementsByTagName( 'body' )[0].clientHeight;
		}
		return { width: parseInt(viewportwidth), height: parseInt(viewportheight) };
	};

	window.piki_custom_fields = function(){
		init_custom_radios();
		init_custom_checkboxes();
		init_avatar_fields();
	};

	window.piki_zebra = function( $elements ){
		if( $elements === undefined ) return;
		$elements.each(function( i ){
			var classe = i%2 ? 'odd' : 'even';
			$( this ).removeClass( 'odd even' ).addClass( classe );
		});
	};
	
	$.fn.extend({
		
		pikiAlert : function( options ) {

			var defaults = {
				message : 'An error ocurred',
				type : 'error',
				title : 'Ops!',
				overlay : true, 
				focusAfter : false,
				callback : false,
				callbackArgs : false	
			};
			options = $.extend( {}, defaults, options ); 

			var $alert = $('body>#pikiAlert');
			if ( $alert.length ) { $alert.dialog( 'destroy' ).remove(); }

			var _htmlbox = '';
			_htmlbox += '<div id="pikiAlert" class="piki-alert-box '+ options.type +'" title="'+ options.title +'">';
			_htmlbox += '	<div class="content">'+ options.message +'</div>';
			_htmlbox += '</div>';

			$alert = $( _htmlbox ).appendTo( _body );

			var dialogOptions = {
				autoOpen: false,
				resizable: false,
				modal: true,
				width: 458,
				draggable: false,
				dialogClass: options.type,
				show: { effect: 'drop', duration: 300 },
				hide: { effect: 'drop', duration: 200 }
			};

			if ( options.focusAfter || options.callback ) {
				dialogOptions.close = function( event, ui ){
					if( options.focusAfter ){
						options.focusAfter.focus();
					}
					if ( options.callback ) {
						options.callback( options.callbackArgs );
					}
				};
			}
		
			$alert.dialog( dialogOptions );
			$alert.dialog( 'open' );

		}
	});

	$.fn.scrollTo = function( target, options, callback ){
		if( typeof options == 'function' && arguments.length == 2 ){ callback = options; options = target; }
		var settings = $.extend({
			scrollTarget  : target,
			offsetTop     : 50,
			duration      : 500,
			easing        : 'swing'
		}, options);
		return this.each(function(){
			var scrollPane = $(this);
			var scrollTarget = ( typeof settings.scrollTarget == "number" ) ? settings.scrollTarget : $( settings.scrollTarget );
			var scrollY = ( typeof scrollTarget == "number" ) ? scrollTarget : scrollTarget.position().top;
			scrollPane.animate({ scrollTop : scrollY }, parseInt( settings.duration ), settings.easing, function(){
				if ( typeof callback == 'function' ) { callback.call( this ); }
			});
		});
	};

	Array.prototype.unique = function() {
	    var unique= [];
	    for (var i = 0; i < this.length; i += 1 ) {
	        if ( unique.indexOf( this[i] ) == -1 ) {
	            unique.push( this[i] );
	        }
	    }
    	return unique;
	};

	jQuery.fn.reset = function() {
		return this.each( function(){

			this.$ = this.$ || $( this );
			
			// Form element
			var $form;
			if( this.$.is( 'form' ) ) $form = this.$;
			else if( this.$.parents( 'form' ).length ) $form = this.$.parents( 'form' ).first();
			else if( this.$.find( 'form' ).length ) $form = this.$.find( 'form' ).first();
			
			// Trigger before reset
			$form.trigger( 'beforeReset' );

			// Reseting
			var $button = $( '<input type="reset" />' ).hide().appendTo( $form );
			$button.click().remove();


			// Actualize fields
			$( 'input,select,textarea', $form )
				.trigger( 'change' )
				.trigger( 'keydown' )
				.trigger( 'keypress' )
				.trigger( 'keyup' )
				.trigger( 'reset' )
			;

			// Trigger after reset
			$form.trigger( 'afterReset' );
			
		});
	};

	// Filtro com jquery
	$.expr[':'].contains = function( n, i, m ){
		var string = $(n).text();
		string = removeAccents( string );
		var toSearch = removeAccents( m[3] );
        return string.toUpperCase().indexOf(toSearch.toUpperCase()) >= 0;
    };	

	function removeAccents( strAccents ){
	    var strAccents = strAccents.split('');
	    var strAccentsOut = [];
	    var strAccentsLen = strAccents.length;
	    var accents =    "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
	    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	    for( var y = 0; y < strAccentsLen; y++ ){
	        if( accents.indexOf( strAccents[ y ] ) != -1 ){
	            strAccentsOut[ y ] = accentsOut.substr( accents.indexOf( strAccents[ y ] ), 1 );
	        } else
	            strAccentsOut[ y ] = strAccents[ y ];
	    }
	    strAccentsOut = strAccentsOut.join( '' );

	    return strAccentsOut;
	}

})(jQuery);

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	var pluses = /\+/g;
	function encode(s) { return config.raw ? s : encodeURIComponent(s); }
	function decode(s) { return config.raw ? s : decodeURIComponent(s); }
	function stringifyCookieValue(value) { return encode(config.json ? JSON.stringify(value) : String(value)); }
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) { s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'); }
		try { s = decodeURIComponent(s.replace(pluses, ' '));} 
		catch(e) { return; }
		try { return config.json ? JSON.parse(s) : s; } 
		catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') { var days = options.expires, t = options.expires = new Date(); t.setDate(t.getDate() + days); }
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) { result = read(cookie, value); break;}
			if (!key && (cookie = read(cookie)) !== undefined) { result[name] = cookie; }
		} return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) { $.cookie(key, '', $.extend({}, options, { expires: -1 })); return true; }
		return false;
	};
}));

// Set coookie
window.setCookie = function( cname, cvalue, exdays ) {
	// Parse object
	if( typeof( cvalue ) === 'object' || typeof( cvalue ) === 'array' ){
		cvalue = JSON.stringify( cvalue );
	}
    var d = new Date();
    d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';

}
// Get cookie
window.getCookie = function( cname ){
    var name = cname + "=";
    var ca = document.cookie.split( ';' );
    var _return = '';
    for( var i = 0; i < ca.length; i++ ) {
        var c = ca[i];
        while( c.charAt(0) == ' ' ) c = c.substring( 1 );
        if( c.indexOf( name ) == 0 ) _return = c.substring( name.length, c.length );
    }
    if( _return !== '' && _return.substring( 0, 1 ) === '{' ){
    	try {
    		_return = JSON.parse( _return );
		}
		catch (e) {
			deleteCookie( cname );
			_return = '';
		}
    }
    return _return;
}
// Delete cookie
window.deleteCookie = function( cname ) {
	window.setCookie( cname, '', 9999 );
    //document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
window.isMobile = function() {
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	return isMobile;
};
window.validateEmail = function( email ) {  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; if ( !filter.test( email ) ) { return false; }  return true; };
window.in_array = function( needle, haystack, argStrict ) { var key = '', strict = !!argStrict; if (strict) {  for (key in haystack) { if (haystack[key] === needle) { return true; } } } else { for (key in haystack) { if (haystack[key] == needle) { return true; } } } return false; };
window.typeOf = function(value) {var s = typeof value;if(s==='object'){if(value){if(value instanceof Array){s='array';}}else{s='null';}}return s;};
