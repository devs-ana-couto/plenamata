<?php

define( 'PIKI_YOUTUBE_CACHE_TABLE', 'piki_youtube_cache' );

# Página de administração dos pikiforms
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

class PikiYoutube {
	
	static $options;
	static $API;

	function __construct(){
		$this->options = get_option( 'pikiyoutube_options' );
		add_shortcode( 'piki-youtube', array( $this, 'piki_youtube_shortcode') );

		if( isset( $_GET[ 'piki-youtube-clear-cache' ] ) ):
			$this->clear_cache();
		endif;

	}
	
	function init( $options ) {
		self::$options = $options;
	}

	function init_api(){
    	require_once( Piki::path( __FILE__ ) . '/Google/autoload.php' );
    	# Inicia a API do Google
		$client = new Google_Client();
		$client->setDeveloperKey( $this->options[ 'api-key' ] );
		# Inicia a API do Youtube
		$this->API = new Google_Service_YouTube( $client );
		# Verifica se o ID da Playlist já foi recuperado
		if( !isset( $this->options[ 'playlist-id' ] ) || $this->options[ 'playlist-id' ] == '' ):
			$this->set_playlist_id();
		endif;
		return $this->API;
	}

	# Recupera o ID da playlist do Canal
	function set_playlist_id(){
		# Recupera os canais do Usuário
		$channels = $this->API->channels->listChannels( 'id,snippet,contentDetails', array(
	        'forUsername' => $this->options[ 'user-id' ],
	        'maxResults' => 1,
	    ));
	    # Se houver canais, pega o ID da Playlist do primeiro Canal
	    foreach( $channels->getItems() as $key => $channel ):
	    	$playlist = $channel->getContentDetails()->getRelatedPlaylists();
	    	$this->options[ 'playlist-id' ] = $playlist->getUploads();
	    	# Atualiza o valor da playlist no Banco
	    	update_option( 'pikiyoutube_options', $this->options );
	    	return true;
	   	endforeach;
	    return false;
	}

	function get_videos( $page_token = NULL ){

		$query_options = array(
	        'playlistId' => $this->options[ 'playlist-id' ],
	        'maxResults' => $this->options[ 'items-per-page' ],
		);
		if( !is_null( $page_token ) ):
			$query_options[ 'pageToken' ] = $page_token;
		endif;

		# Verifica se tem cache disponível e válido
		$cache_key = md5( serialize( $query_options ) );
		//$cached_items = $this->get_cached( $cache_key );
		$cached_items = $this->get_cached( $cache_key );

		if( $cached_items ):
			
			$return = $cached_items;
		
		# Se não tem cache, busca os resultados
		else:

			# Inicia a API
			if( is_null( $this->API ) ) $this->init_api();
		    
		    $videos_list = $this->API->playlistItems->listPlaylistItems( 'id,snippet', $query_options );
			$return = (object)array(
		    	'items' => (object)$this->organize_meta( $videos_list->getItems() ),
		    	'pager' => (object)array(
		    		'total_items' => $videos_list->getPageInfo()->getTotalResults(),
			    	'previous' => $videos_list->getPrevPageToken(),
			    	'next' => $videos_list->getNextPageToken(),
		    	),
		    );

			# Insere o cache no banco
		    $this->set_cache( $cache_key, $return );
		
		endif;

	    return $return;

	}

	function organize_meta( $videos ){
		$return = array();
		foreach( $videos as $key => $video ){
			$return[] = (object)array(
				'video_id' => $video->getSnippet()->getResourceId()->getVideoId(),
				'title' => $video->getSnippet()->getTitle(),
				'thumbnail' => $video->getSnippet()->getThumbnails()->getHigh()->getUrl(),
			);
		}
		return $return;
	}

	function set_cache( $key, $content ){
		global $wpdb;
        # Tbela de cache
        $cache_table = $wpdb->prefix . PIKI_YOUTUBE_CACHE_TABLE;
        # Timestamp atual
        $current_time = current_time( 'timestamp' );
        # Insere o resultado no banco
        return $wpdb->insert( 
            $cache_table, 
            array( 'chave' => $key, 'content' => json_encode( $content ), 'time' => $current_time ), 
            array( '%s', '%s', '%s' ) 
        );
	}

	function get_cached( $key ){

		global $wpdb;
        # Tbela de cache
        $cache_table = $wpdb->prefix . PIKI_YOUTUBE_CACHE_TABLE;
        # Timestamp atual
        $current_time = current_time( 'timestamp' );
        
        # Tempo do cache
        if( (int)$this->options[ 'cache-lifetime' ] < 1 ):
            $cache_time = 15*60;
        else:
            $cache_time = $this->options[ 'cache-lifetime' ]*60;
        endif;

        # Recupera o registro, se houver
        $cached = $wpdb->get_row( $wpdb->prepare( "SELECT id, content, time, chave FROM $cache_table WHERE chave = '%s'", $key ) );

        if( is_null( $cached ) || $current_time > ( $cached->time + $cache_time ) ):
			# Remove o registro, se existir
            $wpdb->delete( $cache_table, array( 'chave' => $key ) );
        	return false;
        else:
        	return json_decode( $cached->content );
        endif;
	
	}

    function clear_cache(){
        global $wpdb;
        $wpdb->query( "DELETE FROM $wpdb->prefix" . PIKI_YOUTUBE_CACHE_TABLE );
    }

	
	function piki_youtube_shortcode( $atts ) {

		$this->add_scripts();

		$page_token = isset( $_GET[ 'page-token' ] ) && $_GET[ 'page-token' ] != '' ? $_GET[ 'page-token' ] : NULL;

		$content = $this->get_videos( $page_token );

		if( !$content->items || count( $content->items ) < 1 ){
			return 'Nenhum vídeo disponível.';
		}

		$html = '<div class="piki-youtube-gallery"><div class="list-items">';
		foreach( $content->items as $key => $video ){

			$html .= '
				<div class="item-video" rel="' . $video->video_id . '">
					<a href="http://www.youtube.com/embed/'. $video->video_id  .'?autoplay=true" class="mask-link" target="_blank">
						<span class="titulo">'. $video->title  .'</span>
						<span class="assistir">Assistir</span>
					</a>
					<img src="'. $video->thumbnail .'" title="'. $video->title .'" width="296" height="222" />
				</div>
			';
		
		}
		$html .= '<br style="clear:both;" /></div>';

		if( !is_null( $content->pager->previous ) || !is_null( $content->pager->next ) ){
			$html .= '<div class="pager">';
			if( !is_null( $content->pager->previous ) ):
				$html .= '<a href="./?page-token='. $content->pager->previous .'" rel="'. $content->pager->previous .'" class="button prev"><< Videos Anteriores</a>';
			endif;
			if( !is_null( $content->pager->next ) ):
				$html .= '<a href="./?page-token='. $content->pager->next .'" rel="'. $content->pager->next .'" class="button next">Próximos vídeos >></a>';
			endif;
			$html .= '</div>';
		}

		$html .= '</div>';

		return $html;
	
	}

	function add_scripts() {

		wp_enqueue_script( 'piki-youtube-gallery', Piki::url( 'piki-youtube-gallery.js', __FILE__ ), array( 'jquery' ), false, true );
		wp_enqueue_script( 'fancybox', Piki::url( 'fancybox/jquery.fancybox-1.3.4.js', __FILE__ ), array( 'jquery' ), false, true );

		wp_enqueue_style( 'piki-youtube-gallery', Piki::url( 'piki-youtube-gallery.css', __FILE__ ), false, '2.70' );
		wp_enqueue_style( 'fancybox', Piki::url( 'fancybox/jquery.fancybox-1.3.4.css', __FILE__ ), false, '2.70' );
	}

	function piki_youtube_ajaxurl() {
		echo('<script type="text/javascript">var PikiYoutube = { ajaxurl: "' . get_admin_url( 'admin-ajax.php' ) . '", pluginurl: "' . Piki::url( 'lightbox/', __FILE__ ) . '"}</script>');
	}
}
$PikiYoutube = new PikiYoutube();

# Instalação do plugin
register_activation_hook( __FILE__, 'piki_youtube_gallery_activate' );
function piki_youtube_gallery_activate(){
    global $wpdb;
    $sql = "
    CREATE TABLE $wpdb->prefix" . PIKI_YOUTUBE_CACHE_TABLE . " (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        content text NOT NULL,
        time INT DEFAULT '0',
        chave VARCHAR(255) DEFAULT '' NOT NULL,
        UNIQUE KEY id (id)
    );
    ";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}

# Desinstalação do plugin
register_deactivation_hook( __FILE__, 'piki_youtube_gallery_deactivate' );
function piki_youtube_gallery_deactivate(){
    global $wpdb;
    $wpdb->query( "DROP TABLE IF EXISTS $wpdb->prefix" . PIKI_YOUTUBE_CACHE_TABLE );
}


