PikiFields.add( 'window.startUsersField' );
(function($){
	// Starting fields
	window.startUsersField = function(){
		$( 'select[data-field-type="users"]' ).usersField();
	}
	$.fn.usersField = function( method ){
		var pluginArgs = arguments;
		return this.each(function(){
			var field = this;
			this.$ = this.$ || $( this );
			// Configura
			this.configure = function(){
				this.$.select2({
					ajax: {
						url: ajaxurl,
						type : 'POST',
						dataType: 'json',
						delay: 250,
						data: function ( params ){
							return {
								action : 'users_get_users',
								q: params.term, // search term
								page: params.page
							};
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							return {
								results: data.items,
									pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: true
					},
					escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
					minimumInputLength: 1
				});
				this.ready = true;
			};
			// Chamando os métodos
			var toCall;
			if( ( toCall = eval( "this."+method ) ) == undefined ){
				// Se já foi configurado, não faz nada
				if( this.ready ) return;
				// Se não foi configurado
				this.configure.apply( this, pluginArgs );
			}
			else{
				toCall.apply( this, Array.prototype.slice.call( pluginArgs, 1 ) );
			}
		});
	};
})(jQuery);