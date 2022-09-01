<?php

class PikiMedia {
	# Ítems
	var $items;
	# Método construtor
	function __construct( $getPikiMedia=false ){
		if ( $getPikiMedia !== false && is_numeric( $getPikiMedia ) ) {
			$this->items = PikiMedia::get_slides( $getPikiMedia );
		}
		else if( $getPikiMedia === true ){
			$this->items = PikiMedia::get_slides();
		}
	}
	# Registra o tipo de post
	public static function activation_plugin() {
		PikiMedia::register_post_types();
		add_shortcode( 'pikislides', array(  'PikiMedia', 'shortcode' ) );
	}
	# Tipo de post
	public static function register_post_types(){
	    
		# Fotos
	    $args = array(
	        'labels' => array(
		        'name' => __( 'Fotos', 'post type general name'),
		        'singular_name' => __( 'Foto', 'post type singular name'),
		        'add_new' => __( 'Adicionar nova', 'book'),
		        'add_new_item' => __( 'Adicionar nova foto'),
		        'edit_item' => __( 'Editar foto'),
		        'new_item' => __( 'Nova foto'),
		        'view_item' => __( 'Ver foto'),
		        'search_items' => __( 'Procurar fotos'),
		        'not_found' =>  __( 'Nenhuma foto encontrada'),
		        'not_found_in_trash' => __( 'Nenhuma foto na lixeira'),
		        'parent_item_colon' => '',
		        'all' => __( 'todas' ),
		    ),
	        'public' => true,
	        'publicly_queryable' => true,
	        'show_ui' => true, 
	        'query_var' => true,
	        'rewrite' => true,
	        'capability_type' => 'post',
	        'hierarchical' => false,
            'exclude_from_search' => false,
	        'menu_position' => 5,
	        'supports' => array( 'title' ),
	        'menu_icon' => Piki::url( 'images/photos-icon.png', __FILE__ )
	    );      
	    register_post_type( 'foto', $args );
	    
		# Vídeos
	    $args = array(
	        'labels' => array(
		        'name' => __( 'Vídeos', 'post type general name'),
		        'singular_name' => __( 'Vídeo', 'post type singular name'),
		        'add_new' => __( 'Adicionar novo', 'book'),
		        'add_new_item' => __( 'Adicionar novo vídeo' ),
		        'edit_item' => __( 'Editar vídeo'),
		        'new_item' => __( 'Novo vídeo'),
		        'view_item' => __( 'Ver vídeo'),
		        'search_items' => __( 'Procurar vídeos'),
		        'not_found' =>  __( 'Nenhum vídeo encontrado' ),
		        'not_found_in_trash' => __( 'Nenhum vídeo na lixeira'),
		        'parent_item_colon' => '',
		        'all' => __( 'todos' ),
		    ),
	        'public' => true,
	        'publicly_queryable' => true,
	        'show_ui' => true, 
	        'query_var' => true,
	        'rewrite' => true,
	        'capability_type' => 'post',
	        'hierarchical' => false,
            'exclude_from_search' => false,
	        'menu_position' => 5,
	        'supports' => array( 'title' ),
	        'menu_icon' => Piki::url( 'images/videos-icon.png', __FILE__ )
	    );      
	    register_post_type( 'video', $args );
	    
		# Áudios
	    $args = array(
	        'labels' => array(
		        'name' => __( 'Áudios', 'post type general name'),
		        'singular_name' => __( 'Áudio', 'post type singular name'),
		        'add_new' => __( 'Adicionar novo', 'book'),
		        'add_new_item' => __( 'Adicionar novo áudio' ),
		        'edit_item' => __( 'Editar áudio'),
		        'new_item' => __( 'Novo áudio'),
		        'view_item' => __( 'Ver áudio'),
		        'search_items' => __( 'Procurar áudios'),
		        'not_found' =>  __( 'Nenhum áudio encontrado' ),
		        'not_found_in_trash' => __( 'Nenhum áudio na lixeira'),
		        'parent_item_colon' => '',
		        'all' => __( 'todos' ),
		    ),
	        'public' => true,
	        'publicly_queryable' => true,
	        'show_ui' => true, 
	        'query_var' => true,
	        'rewrite' => true,
	        'capability_type' => 'post',
	        'hierarchical' => false,
            'exclude_from_search' => false,
	        'menu_position' => 5,
	        'supports' => array( 'title' ),
	        'menu_icon' => Piki::url( 'images/audios-icon.png', __FILE__ )
	    );      
	    register_post_type( 'audio', $args );
	}

	# Registra os campos do tipo de conteúdo
    public static function register_fields( $meta_boxes ){

    	$field_description = array(
            'label' => 'Descrição',
            'machine_name'   => 'descricao',
            'ftype' => 'textarea',
        );
        
        # Fotos
        $meta_boxes[] = array(
            'id'         => 'photo',
            'title'      => 'Sobre a foto',
            'post_types' => array( 'foto' ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Imagens',
                    'machine_name' => 'photo',
                    'ftype' => 'imagewp',
                    'cover' => 'on',
                    'gallery' => 'on'
                ),
                $field_description,
            ),
        );
        
        # Vídeos
        $meta_boxes[] = array(
            'id'         => 'video',
            'title'      => 'Sobre o vídeo',
            'post_types' => array( 'video' ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'URL do Vídeo',
                    'machine_name'   => 'video',
                    'ftype' => 'youtube',
                ),
                $field_description,
            ),
        );
        
        # Áudios
        $meta_boxes[] = array(
            'id'         => 'video',
            'title'      => 'Sobre o áudio',
            'post_types' => array( 'audio' ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Arquivo de áudio',
                    'machine_name'   => 'audio',
                    'ftype' => 'filewp',
                    'player' => 'audio',
                    'mime_type' => array( 'audio/mpeg|audio/mpeg3|audio/x-mpeg-3' ),
                ),
                $field_description,
            ),
        );

        return $meta_boxes;

    }
    # Recupera os meta dados de cada slide
	public static function get_meta_values( $postID ){
		$url = get_post_meta( $postID, PikiMedia_field_url, true );
		if ( !$url || empty( $url ) ) {
			return false;
		}
		return array(
			'url' => array(
				'id' => PikiMedia_field_url,
				'title' => 'URL',
				'value' => str_replace( array( '#home#', '%home%' ), get_bloginfo('url'), $url ),
			),
			'target' => array(
				'id' => PikiMedia_field_target,
				'title' => 'Janela de destino',
				'value' => get_post_meta( $postID, PikiMedia_field_target, true ),
			),
		);
	}

	# Recupera os slides
	public static function get_slides( $total_items, $local=false ){

		# Parametros gerais
		$params = array(
			'posts_per_page'   => $total_items,
			'orderby'          => 'post_date',
			'order'            => 'DESC',
			'post_type'        => PikiMedia_ptype,
			'post_status'      => 'publish',
		);

		# Local
		if( $local ):
			$params[ 'tax_query' ] = array(
				array(
					'taxonomy' => PikiMedia_taxonomy,
					'field'    => 'slug',
					'terms'    => $local,
				)
			);
		endif;

		$slides = get_posts( $params );

		if ( !is_array( $slides ) || empty( $slides ) ) {
			return false;
		}
		foreach ($slides as $key => $slide) {
			$slides[ $key ]->destino = PikiMedia::get_meta_values( $slide->ID );
		}
		return $slides;
	}

    # Scripts e Estilos
    public static function add_files(){
    	Piki::add_library( 'cycle', array( 'video' ) );
        $filesdir = Piki::url( '/' , __FILE__ );
        # Scripts
        wp_enqueue_script( 'pikislides-script', $filesdir . 'piki-slides.js', array( 'jquery' ) );
        # Styles
        wp_enqueue_style( 'pikislides-styles', $filesdir . 'piki-slides.css' );
    }

    # Shortcode que mostra formulários
    public static function shortcode( $atts ) {
        
    	# Valores padrão
    	$defaults = array(
            'total_items' => 6,
            'local' => false,
            'arrows_nav' => false,
            'pager' => false,
            'effect' => 'scrollHorz',
            'timeout' => 6000,
            'speed' => 1000,
            'height' => 410,
            'width' => 0,
            'titles' => false,
            'excerpt' => false,
            'excerpt_field' => false,
            'excerpt_trim' => 8
    	);
    	# Extrai os parâmetros
		$options = shortcode_atts( $defaults, $atts, 'pikislides' );

        # Dimensions

	        $width = ( isset( $options[ 'width' ] ) && $options[ 'width' ] != '' ) ? $options[ 'width' ] : 0;
	        $height = ( isset( $options[ 'height' ] ) && $options[ 'height' ] != '' ) ? $options[ 'height' ] : 0;
	        if( $width == 0 && $height == 0 ):
	        	echo( 'O Slide deve ter o tamanho vertical ou horizontal fornecido.' );
	       	endif;

		# Slides
		$slides = self::get_slides( $options[ 'total_items' ], $options[ 'local' ] );

		if( $slides && !empty( $slides ) ):

			# Cycle
			self::add_files();
			
			$return = '
			<div id="full-banner" class="cycle-wrapper">
				<div class="cycle-slideshow" data-cycle-fx=\''. $options[ 'effect' ] .'\' speed=\''. $options[ 'speed' ] .'\' data-cycle-timeout=\''. $options[ 'timeout' ] . '\' data-cycle-slides=\'>.slide-item\' data-cycle-auto-height=\'1\' ';
				if( $options[ 'arrows_nav' ] ):
					$return .= ' data-cycle-prev=\'#full-banner > .cycle-prev\' data-cycle-next=\'#full-banner > .cycle-next\' ';
				endif;
				if( $options[ 'pager' ] ):
					$return .= ' data-cycle-pager=\'#full-banner .cycle-pager\' ';
				endif;
				$return .= ' > ';
				    foreach( $slides as $slide ):
				    	$return .= '
				    	<div class="slide-item">
				    		<img src="' . Piki::thumbnail( $slide->ID, $width, $height ) . '" />';
				    		if( $options[ 'titles' ] ):
					    	$return .= '
					    	<div class="texts">
					    		<h2 class="title">'. $slide->post_title .'</h2>';
					    		if( $options[ 'excerpt' ] ):
					    			$description = !$options[ 'excerpt_field' ] ? get_post_field( 'post_excerpt', $slide->ID ) : get_post_meta( $slide->ID, $options[ 'excerpt_field' ], true );
					    			if( $description != '' ):
							    		$return .= '<p class="excerpt">'. $description .'</p>';
					    			endif;
					    		endif;
					    	$return .= '
					    	</div>
					    	';
				    		endif;
				    	$return .= '
				    	</div>';
					endforeach;
			    $return .= '</div>';
				if( $options[ 'arrows_nav' ] ):
			    $return .= '<div class="arrow-nav cycle-prev"></div>';
			    $return .= '<div class="arrow-nav cycle-next"></div>';
				endif;
				if( $options[ 'pager' ] ):
				    $return .= '<div class="pager-wrapper"><div class="cycle-pager"></div></div>';
				endif;
			$return .= 
			'</div>
			';
		
		else:

			$return = '';

		endif;

        return $return;

    }

}
add_action( 'init', array( 'PikiMedia', 'activation_plugin' ) );
//add_filter( 'pkmeta_register_fields', array( 'PikiMedia', 'register_fields' ) );
?>