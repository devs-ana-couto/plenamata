$(function(){

	// Items
	$( ".piki-youtube-gallery .item-video .mask-link").mouseover(function(){
		$(this).stop();
		$(this).animate({"left":"0"}, 400);
	});
	$( ".piki-youtube-gallery .item-video .mask-link").mouseout(function(){
		$(this).stop();
		$(this).animate({"left":"-296px"}, 300);
	});

	$( ".piki-youtube-gallery .item-video .mask-link").click(function() {
		var url_video = $(this).attr("href");
		$.fancybox({
			'autoScale' : false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title' : this.title,
			'width' : 680,
			'height' : 495,
			'type' : 'iframe',
			'href' : url_video
		});
		return false;
	});

});