var PostViews;
(function($){

	PostViews = {

		main : function(){
			$(function(){
				PostViews.init();
			})
		},

		init : function(){

			var viewds = getCookie( 'wp_postviews' );

			if( viewds.PostViewsID !== undefined ){ 
				return;
			}

			var request = $.ajax({
				url: Piki.ajaxurl,
				type: 'POST',
				data: { 
					action : 'post_view_add',
					post_id : PostViewsID
				},
				dataType: "JSON"
			});
			request.done(function( jSon ) {
				if( jSon.status === 'success' ){
					viewds.PostViewsID = true;
					window.setCookie( 'wp_postviews', viewds );
				}												
			});

		}

	};
	PostViews.main();

})(jQuery);