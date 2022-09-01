<?php

/**
 * @param array $args:
 *	'before': (string)
 *	'after': (string)
 *	'options': (string|array) Used to overwrite options set in WP-Admin -> Settings -> PageNavi
 *	'query': (object) A WP_Query instance
 */

function piki_flickr_gallery( $options=array() ) {

	$apikey = $options["apikey_text"];
	$user_id = $options["userid_text"];
	$API = __piki_flickr_init_api($apikey, $options["cachetime"]);

	if(empty($apikey)){
		return '';
	}

	$album_data = __piki_flickr_get_albuns($API, $options);
	$albuns = $album_data["albuns"];
	$pager = $album_data["pager"];

	if(!$albuns){
		return 'Nenhum álbum disponível.';
	}

	$loop = $options["itensperline"];

	$html = '';
	$count = 1;
	foreach($albuns as $key => $album){
		$thumb = array_shift($API->photos_getInfo($album["primary"]));
		$url_thumb =  $API->buildPhotoURL ($thumb, "small");
		$html .= '
			<div class="item-album'.($count==1?" left":($count==$loop?" right":"")).'" rel="'.$album["id"].'">
				<p class="mask-link">
					<a href="#">Álbum:<br /><span>'.$album["title"].'</span></a>
				</p>
				<img src="'.$url_thumb.'" title="'.$album["title"].'" width="296" height="195" />
			</div>
		';
		$count = $count==$loop ? 1 : $count+1;
	}

	$return = '<div class="piki-flickr-gallery">' . $html . '<br style="clear:both;" /></div>';

	if(is_array($pager)){
		$return .= '<div class="piki-pager"><div class="center"><p class="page-info">'.$pager["indice"].' de '.$pager["total_pages"].'</p>' . $pager["back_arrow"] . $pager["links"] . $pager["forw_arrow"] . '</div></div>';
	}

	return $return;

}

function __piki_flickr_get_albuns($API, $options){
	// Recupera os álbuns do usuário
	$result = $API->photosets_getList($options["userid_text"]);
	$albuns = $result["photoset"];

	if(!$albuns || !is_array($albuns) || count($albuns)<1){
		return false;
	}
	else{
		// Total de álbuns
		$total_albuns = count($albuns);
		// Se necessita de paginação
		//if( $options["total_page_itens"] !== 0 && $total_albuns > $options["total_page_itens"] ){
			// Pager
			include dirname( __FILE__ ) . '/class.pager.php';
			$reqIndice = (int)$_REQUEST["pf"];
			$indice = (is_numeric($reqIndice) && $reqIndice>0) ? $reqIndice : 1;
			
			$permalink = get_permalink();
			$pars = array_pop( explode("/", $permalink) );
			$concat_url = strpos($pars, "?") !== false ? "&" : "?";

			$class = new pager($indice, $total_albuns, $options["total_page_itens"], 5, get_permalink().$concat_url."pf={i}");
			$pager = $class->get_pager();
			// Álbuns
			$init = ($indice-1)*$options["total_page_itens"];
			$albuns = array_slice($albuns, $init, $options["total_page_itens"]);
			// Retorno
			return array(
				"albuns" => $albuns,
				"pager" => $pager,
			);
		//}
		//else{
			//return array("albuns" => $albuns);
		//}
	}
}

function __piki_flickr_get_photos_album($album_id){
	$options = __piki_flickr_get_options()->get();
	// Instancia a classe
	$API = __piki_flickr_init_api($options["apikey_text"], $options["cachetime"]);
	// Recupera os álbuns do usuário
	$photos = array_shift($API->photosets_getPhotos($album_id));

	if(count($photos["photo"]) < 1){
		echo('{"status":"fail", "message":"Nenhuma foto"}');
		die();
	}
	$photos_return = '';
	foreach($photos["photo"] as $key => $photo){
		$url_square = $API->buildPhotoURL($photo, 'square');
		$url_large = $API->buildPhotoURL($photo, 'medium_640');
		$photos_return .= '<a href=\"'.$url_large.'\" title=\"'.$photo["title"].'\" rel=\"album-'.$album_id.'\"></a>';
	}
	echo('{"status":"sucesso", "photos":"'.$photos_return.'"}');
	die();
}

class PikiFlickr_Core {
	
	static $options;
	
	function init( $options ) {
		
		self::$options = $options;
		
		add_action( 'wp_print_styles', array( __CLASS__, 'stylesheets' ) );
		add_action( 'wp_head', array(__CLASS__, 'piki_flickr_ajaxurl') );		
		
		wp_enqueue_script( 'piki-flickr-gallery', Piki::url('piki-flickr-gallery.js', __FILE__), array('jquery'), false, true );
		wp_enqueue_script( 'lightbox', Piki::url('lightbox/jquery.lightbox-0.5.min.js', __FILE__), array('jquery'), false, true );
		
		add_shortcode( 'piki-flickr', array( __CLASS__, 'piki_flickr_shortcode') );

	}
	function stylesheets() {
		if ( file_exists( STYLESHEETPATH . '/piki-flickr-gallery.css' ) ){
			$css_file = get_stylesheet_directory_uri() . '/piki-flickr-gallery.css';
		}
		elseif ( file_exists( TEMPLATEPATH . '/piki-flickr-gallery.css' ) ){
			$css_file = get_template_directory_uri() . '/piki-flickr-gallery.css';
		}
		else{
			$css_file = Piki::url( 'piki-flickr-gallery.css', __FILE__ );
		}
		wp_enqueue_style( 'piki-flickr-gallery', $css_file, false, '2.70' );
		wp_enqueue_style( 'lightbox', Piki::url( 'lightbox/jquery.lightbox-0.5.css', __FILE__ ), false, '2.70' );
	}
	
	function piki_flickr_shortcode( $atts ) {
		$gallery = piki_flickr_gallery(self::$options);
		if(!$gallery){
			return '';
		}
		else{
			return $gallery;
		}
	}

	function piki_flickr_ajaxurl() {
		echo('<script type="text/javascript">var PikiFlickr = { ajaxurl: "' . get_admin_url('admin-ajax.php') . '", pluginurl: "' . Piki::url( 'lightbox/', __FILE__ ) . '"}</script>');
	}
}