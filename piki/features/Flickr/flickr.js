$(function(){
	$(".piki-flickr-gallery .item-album .mask-link").live("mouseover", function(){
		$(this).stop();
		$(this).animate({"top":"-68px"}, 300);
	});
	$(".piki-flickr-gallery .item-album .mask-link").live("mouseout", function(){
		$(this).stop();
		$(this).animate({"top":"0"}, 200);
	});
	$(".piki-flickr-gallery .item-album .mask-link").live("click", function(){
		var item_album = $(this).parents('.item-album');
		var photoset = $(item_album).attr("rel");
		var album_thumbs = $("div#album-"+photoset);
		if(album_thumbs.length){
			$(album_thumbs).find("a:first").click();
		}
		else{
			showLoaderFULL();
			$.ajax({
				type: 'POST',
				url: PikiFlickr.ajaxurl + 'admin-ajax.php',
				data: 'action=PFOpenAlbum&photoset='+photoset,
				success: function( data ){
					response = eval("("+data+")");
					$(item_album).append('<div id="album-'+photoset+'" style="display:none;">'+response.photos+'</div>');
					__start_lightbox("#album-"+photoset+" a");
					$("#album-"+photoset+" a"+":first").click();
					closeLoaderFULL();
				}
			});
		}
		return false;
	});
});

function __start_lightbox(album){
	var opts = {
		imageLoading: PikiFlickr.pluginurl + 'images/lightbox-ico-loading.gif',
		imageBtnPrev: PikiFlickr.pluginurl + 'images/lightbox-btn-prev.png',
		imageBtnNext: PikiFlickr.pluginurl + 'images/lightbox-btn-next.png',
		imageBtnClose: PikiFlickr.pluginurl + 'images/lightbox-btn-close.png',
		imageBlank: PikiFlickr.pluginurl + 'images/lightbox-blank.gif',
		txtImage:'Imagem',
		txtOf:'de'
	};
	$(album).lightBox(opts);
}