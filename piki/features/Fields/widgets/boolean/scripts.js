PikiFields.add( 'window.startBooleans' );

var fieldBoolean;

(function($){

	// Starting fields
	window.startBooleans = function(){
		fieldBoolean.init();
	}

	fieldBoolean = {
		init : function(){
			$('body')
				.off( 'change.fieldBoolean' )
				.on( 
					'change.fieldBoolean', 
					'input.ftype-boolean',
					function(e){
						e.target.$ = e.target.$ || $( e.target );
						e.target.$f = e.target.$f || e.target.$.siblings( 'input[type="hidden"]' ).first();
						e.target.$f.val( e.target.checked ? 'on' : 'off' );
					}
				)
			;
		}
	};

})(jQuery);
