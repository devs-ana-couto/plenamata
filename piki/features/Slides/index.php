<?php
define( 'PikiSlides_ptype', 'slide' );
define( 'PikiSlides_taxonomy', 'locais_slides' );

class PikiSlides {

	// Ítems
	var $items;
	
	// Método construtor
	function __construct( $getPikiSlides=false ){
		if ( $getPikiSlides !== false && is_numeric( $getPikiSlides ) ) {
			$this->items = PikiSlides::get_slides( $getPikiSlides );
		}
		else if( $getPikiSlides === true ){
			$this->items = PikiSlides::get_slides();
		}
	}
	
	// Registra o tipo de post
	public static function activation_plugin() {
		// Post type
		PikiSlides::register_post_type();
		// Taxonomy
		//PikiSlides::register_taxonomy();
		// Shortcode
		add_shortcode( 'pikislides', array(  'PikiSlides', 'shortcode' ) );
		// Flushing rules
		flush_rewrite_rules();
	}
	
	// Tipo de post
	public static function register_post_type(){
	    
	    $labels = array(
	        'name' => __( 'Slides', 'piki' ),
	        'singular_name' => __( 'Slide', 'piki' ),
	        'add_new' => __( 'Add new', 'book' ),
	        'add_new_item' => __('Add new Slide', 'piki' ),
	        'edit_item' => __( 'Edit Slide', 'piki' ),
	        'new_item' => __( 'New Slide', 'piki' ),
	        'view_item' => __( 'View Slide', 'piki' ),
	        'search_items' => __( 'Search Slides', 'piki' ),
	        'not_found' =>  __( 'No slide founded', 'piki' ),
	        'not_found_in_trash' => __( 'No slide in the trash', 'piki' ),
	        'parent_item_colon' => ''
	    );

	    $args = array(
	        'labels' => $labels,
	        'public' => true,
	        'publicly_queryable' => true,
	        'show_ui' => true, 
	        'query_var' => true,
	        'rewrite' => true,
	        'capability_type' => 'post',
	        'map_meta_cap' => true,
	        'hierarchical' => false,
            'exclude_from_search' => true,
	        'menu_position' => 0,
	        'supports' => array( 'title' ) ,
	        'menu_icon' => Piki::url( 'images/menu-icon.png', __FILE__ )
	    );
	      
	    register_post_type( PikiSlides_ptype, $args );
	
	}
	
	// Registra a Taxonomia
	public static function register_taxonomy(){
		
		$taxonomy_settings=array(
			'hierarchical' => true,
			'labels' => array(
				'name' => __( 'Slides places', 'piki' ),
				'singular_name' => __( 'Slide place', 'pikii' ),
				'all_items' => __( 'All palces', 'piki' ),
				'edit_item' => __( 'Edit place', 'piki' ),
				'view_item' => __( 'View place', 'piki' ),
				'update_item' => __( 'Actualize palce', 'piki' ),
				'add_new_item' => __( 'New place', 'piki' ),
				'new_item_name' => __( 'New place name', 'piki' ),
				'parent_item' => __( 'Parent place', 'piki' ),
				'parent_item_colon' => __( 'Parent place', 'piki' ),
				'search_items' => __( 'Search places', 'piki' ),
				'popular_items' => __( 'Popular places', 'piki' ),
				'separate_items_with_commas' => __( 'Separate places with commas', 'piki' ),
				'add_or_remove_items' => __( 'Insert or remove places', 'piki' ),
				'choose_from_most_used' => __( 'Choose in more used loales', 'piki' ),
				'not_found' => __( 'No locale founded', 'piki' ),
				'menu_name' => __( 'Locales', 'piki' ),
			),
			'show_ui' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'rewrite' => array(
				'slug' => 'locais-dos-slides',
			),
		);
		register_taxonomy( PikiSlides_taxonomy, array( PikiSlides_ptype ), $taxonomy_settings );
	
	}
	
	// Registra os campos do tipo de conteúdo
    public static function register_fields( $meta_boxes ){

    	$posOptions = array(
        	'midcenter' => 'Middle and Center',
        	'topleft' => 'Top and Left',
        	'topcenter' => 'Top and Center',
        	'topright' => 'Top and Rigth',
        	'midleft' => 'Middle and Left',
        	'midright' => 'Middle and Rigth',
        	'botleft' => 'Bottom and Left',
        	'botcenter' => 'Bottom and Center',
        	'botright' => 'Bottom and Rigth',
    	);
        
        $meta_boxes[] = array(
            'id'         => 'imagem',
            'title'      => 'Content',
            'post_types' => array( PikiSlides_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => __( 'Title', 'piki' ),
                    'machine_name' => 'title',
                    'ftype' => 'text',
                ),
                array(
                    'label' => __( 'Excerpt',  'piki' ),
                    'machine_name' => 'resume',
                    'ftype' => 'excerpt',
                ),
                array(
                    'label' => 'Cover (desktop)',
                    'machine_name' => 'image',
                    'ftype' => 'imagewp',
                    'crop' => array(
	                    'ratio' => '2560x992',
	                    'status' => 'on',
                    ),
                    'styles' => [
                    	'retina' => [ 'width' => '1280' ],
                    ],
                    'cover' => true,
                ),
                array(
                    'label' => 'Cover (mobile)',
                    'machine_name'   => 'image_mobile',
                    'ftype' => 'imagewp',
                    /*'crop' => array(
	                    'ratio' => '640x640',
	                    'status' => 'on',
                    ),*/
                ),
                array(
                    'label' => 'Vídeo',
                    'machine_name' => 'video',
                    'ftype' => 'youtube',
                ),
            ),
        );
        
        $meta_boxes[] = array(
            'id'         => 'layout',
            'title'      => 'Text design',
            'post_types' => array( PikiSlides_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Width (% or px)',
                    'machine_name'   => 'width',
                    'ftype' => 'text',
                    'default_value' => '100%',
                ),
                array(
                    'label' => 'Opacity (1 a 100)',
                    'machine_name'   => 'opacity',
                    'ftype' => 'number',
                    'default_value' => '100',
                ),
                array(
                    'label' => 'Color (normal)',
                    'machine_name'   => 'text_color',
                    'ftype' => 'colorpicker',
                ),
                array(
                    'label' => 'Color (bold)',
                    'machine_name'   => 'text_color_bold',
                    'ftype' => 'colorpicker',
                ),
                array(
                    'label' => 'Text stroke size(px)',
                    'machine_name' => 'text_stroke',
                    'ftype' => 'number',
                ),
                array(
                    'label' => 'Text stroke color',
                    'machine_name' => 'text_stroke_color',
                    'ftype' => 'colorpicker',
                ),
                array(
                    'label' => 'Position',
                    'machine_name'   => 'text_position',
                    'ftype' => 'select',
                    'options' => $posOptions,
                ),
                array(
                    'label' => 'Background position',
                    'machine_name'   => 'bgposition',
                    'ftype' => 'select',
                    'options' => $posOptions,
                ),
                array(
                    'label' => 'Offset top',
                    'machine_name'   => 'text_offset_top',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Offset right',
                    'machine_name'   => 'text_offset_right',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Offset bottom',
                    'machine_name'   => 'text_offset_bottom',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Offset left',
                    'machine_name'   => 'text_offset_left',
                    'ftype' => 'text',
                ),
            ),
        );
        
        $meta_boxes[] = array(
            'id'         => 'destino',
            'title'      => 'Target',
            'post_types' => array( PikiSlides_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'URL',
                    'machine_name'   => 'url',
                    'ftype' => 'text',
                ),
	            array(
	                'label' => 'Window',
	                'machine_name'   => 'target',
	                'ftype'    => 'select',
	                'options' => array(
	                    '_self' => 'Self window',
	                    '_blank' => 'New window',
	                ),
	            ),
            ),
        );

        return $meta_boxes;
    
    }
    
    // Recupera os meta dados de cada slide
	public static function get_meta_values( $postID ){

		$meta = new PostMeta( $postID );

		// Image render options
		$imgopts = array( 'first' => true, 'style' => 'croped', 'urls' => true );

		// Default values
		$return = array(
			'image' => $meta->values->image->render( $imgopts ),
			'image_mobile' => $meta->values->image_mobile->render( $imgopts ),
			'video' => $meta->values->video->render( array( 'format' => 'api' ) ),
		);

		// URL e Target
		if( isset( $meta->values->url ) ):
			$retur[ 'url' ] = reset( $meta->values->url->value );
			$retur[ 'target' ] = reset( $meta->values->target->value );
		endif;

		// URL de destino
		if( !empty( $return[ 'url' ] ) ):
			$return[ 'url' ] = str_replace( array( '#home#', '%home%' ), get_bloginfo( 'url' ), $return[ 'url' ] );
		endif;

		// Title
		$return[ 'title' ] = $meta->values->title->render(array(
			'tags' => true,
			'breakline' => true,
		));

		// Width
		$width = $meta->values->width->render();

		// Design
		$return[ 'design' ] = array(
			'width' => empty( $width ) ? false : $width,
			'opacity' => reset( $meta->values->opacity->value ),
			'position' => reset( $meta->values->text_position->value ),
			'bgposition' => reset( $meta->values->bgposition->value ),
			'color' => reset( $meta->values->text_color->value ),
			'color_bold' => reset( $meta->values->text_color_bold->value ),
			'stroke_size' => reset( $meta->values->text_stroke->value ),
			'stroke_color' => reset( $meta->values->text_stroke_color->value ),
			'position' => reset( $meta->values->text_position->value ),
			'offtop' => reset( $meta->values->text_offset_top->value ),
			'offright' => reset( $meta->values->text_offset_right->value ),
			'offbottom' => reset( $meta->values->text_offset_bottom->value ),
			'offleft' => reset( $meta->values->text_offset_left->value ),
		);
		
		return $return;

	}
	
	// Recupera os slides
	public static function get_slides( $total_items, $local = false ){

		// Parametros gerais
		$params = array(
			'posts_per_page'   => $total_items,
			'orderby'          => 'post_date',
			'order'            => 'DESC',
			'post_type'        => PikiSlides_ptype,
			'post_status'      => 'publish',
		);

		// Local
		if( $local ):
			$params[ 'tax_query' ] = array(
				array(
					'taxonomy' => PikiSlides_taxonomy,
					'field'    => 'slug',
					'terms'    => $local,
				)
			);
		endif;

		$slides = get_posts( $params );
		$slides = apply_filters( 'slides_get_slides', $slides, $local );
		
		if ( !is_array( $slides ) || empty( $slides ) ) {
			return false;
		}
		foreach ( $slides as $key => $slide ) {
			$slides[ $key ]->meta = PikiSlides::get_meta_values( $slide->ID );
		}
		
		return $slides;
	
	}
    
    // Scripts e Estilos
    public static function add_files(){

    	Piki::add_library( 'slick' );

        $filesdir = Piki::url( '/', __FILE__ );
        // Scripts
        wp_enqueue_script( 'pikislides-script', $filesdir . 'slides.js', array( 'jquery' ) );
        // Styles
        wp_enqueue_style( 'pikislides-styles', $filesdir . 'slides.css' );
    
    }

    // Shortcode que mostra formulários
    public static function shortcode( $atts ) {
        
    	// Valores padrão
    	$defaults = array(
            'total_items' => 6,
            'local' => false,
            'arrows_nav' => false,
            'pager' => false,
            'effect' => 'scrollHorz',
            'timeout' => 6000,
            'speed' => 1000,
            'titles' => true,
            'excerpt' => false,
            'excerpt_field' => false,
            'excerpt_trim' => 8,
            'bg_selector' => ''
    	);
    	// Extrai os parâmetros
		$options = shortcode_atts( $defaults, $atts, 'pikislides' );
        $options = array_merge( $defaults, $options );

		// Slides
		$slides = self::get_slides( $options[ 'total_items' ], $options[ 'local' ] );

		if( $slides && !empty( $slides ) ):

			// Files
			self::add_files();
			
			$styles = array();
			$return = '
			<div id="full-banner" class="slider-wrapper">
				<div class=\'slider-slideshow\' slider-pager=\''. $options[ 'pager' ] .'\' slider-arrows=\''. $options[ 'arrows_nav' ] .'\' slider-effect=\''. $options[ 'effect' ] .'\' slider-speed=\''. $options[ 'speed' ] .'\' slider-timeout=\''. $options[ 'timeout' ] . '\'>';
				    
				    foreach( $slides as $slide ):

				    	// Slide ID
				    	$slide_key = $slide->post_name;

				    	// Se é um vídeo
				    	$isVideo = !empty( $slide->meta[ 'video' ] );

				    	// Se tem url, é um link
				    	$return .= empty( $slide->meta[ 'url' ] ) || $isVideo ? '<div class="slide-item '. $slide_key .' bg-' . $slide->meta[ 'design' ][ 'bgposition' ] . '">' : '<a href="'. $slide->meta[ 'url' ] .'" class="slide-item '. $slide_key .'">';

					    	// Imgem
					    	$styles[] = PikiSlides::setStyles( $slide, $slide_key, $atts );
				    		
				    		// Textos
				    		if( $options[ 'titles' ] && !$isVideo ):
						    	$return .= '<div class="texts '. $slide->meta[ 'design' ][ 'position' ] .'"><h2 class="title">'. $slide->meta[ 'title' ] .'</h2>';
					    		if( $options[ 'excerpt' ] ):
					    			$description = !$options[ 'excerpt_field' ] ? get_post_field( 'post_excerpt', $slide->ID ) : get_post_meta( $slide->ID, $options[ 'excerpt_field' ], true );
					    			if( $description != '' ):
							    		$return .= '<p class="excerpt">'. nl2br( $description ) .'</p>';
					    			endif;
					    		endif;
							    $return .= '</div>';
					    	endif;

					    	// Vídeo
					    	if( $isVideo ):
					    		
					    		$return .= '<div class="box-player">
									<a class="controll-button">
										<i class="icon-arrow-right3"></i>
									</a>
									'. $slide->meta[ 'video' ] .'
								</div>';
							
							endif;
				    	
				    	// Se tem url, é um link
				    	$return .= !_array_get( $slide->meta, 'url' ) || $isVideo ? '</div>' : '</a>';

					endforeach;
			    
			    $return .= '
				</div>
			</div>';

			$return .= '<style type="text/css">'. implode('', $styles ) .'</style>';
		
		else:

			$return = '';

		endif;

        return $return;

    }

    public static function setStyles( $slide, $key, $atts = false ){

    	// Slide selector
    	$bgsel = '.slide-item.'.  $key . _array_get( $atts, 'bg_selector', '' );

    	// Styles
    	$css = '';

    	// Image
    	if( !empty( $slide->meta[ 'image' ] ) ):
    		$css .= $bgsel . '{background-image:url(\'' . $slide->meta[ 'image' ] . '\');}';
    	endif;

    	// Design
    	$css .= '.slide-item.'.  $key . ' .texts {';
    	if( !empty( $slide->meta[ 'design' ][ 'color' ] ) ):
    		$css .= 'color:' . $slide->meta[ 'design' ][ 'color' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'stroke_size' ] ) ):
    		$css .= '-webkit-text-stroke-width:' . $slide->meta[ 'design' ][ 'stroke_size' ] . 'px;text-stroke-width:' . $slide->meta[ 'design' ][ 'stroke_size' ] . 'px;';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'stroke_color' ] ) ):
    		$css .= '-webkit-text-stroke-color:' . $slide->meta[ 'design' ][ 'stroke_color' ] . ';text-stroke-color:' . $slide->meta[ 'design' ][ 'stroke_color' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'offtop' ] ) ):
    		$css .= 'margin-top:' . $slide->meta[ 'design' ][ 'offtop' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'offright' ] ) ):
    		$css .= 'margin-right:' . $slide->meta[ 'design' ][ 'offright' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'offbottom' ] ) ):
    		$css .= 'margin-bottom:' . $slide->meta[ 'design' ][ 'offbottom' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'offleft' ] ) ):
    		$css .= 'margin-left:' . $slide->meta[ 'design' ][ 'offleft' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'width' ] ) ):
    		$css .= 'width:100%;max-width:' . $slide->meta[ 'design' ][ 'width' ] . ';';
    	endif;
    	if( !empty( $slide->meta[ 'design' ][ 'opacity' ] )  && $slide->meta[ 'design' ][ 'opacity' ] < 100 ):
    		$css .= 'opacity:0.' . $slide->meta[ 'design' ][ 'opacity' ] . ';';
    	endif;
    	$css .= '}';

    	// Strong color
    	if( !empty( $slide->meta[ 'design' ][ 'color_bold' ] ) ):
    		$css .= '.slide-item.'.  $key . ' strong{color:'. $slide->meta[ 'design' ][ 'color_bold' ] .';}';
    	endif;
    	
    	// Mobile image
    	if( !empty( $slide->meta[ 'image_mobile' ] ) ):
    		$css .= '@media(max-width:768px){' . $bgsel . '{background-image:url(\'' . $slide->meta[ 'image_mobile' ] . '\');}}';
    	endif;

    	return $css;

    }

}

// Ativação do plugin
add_action( 'init', array( 'PikiSlides', 'activation_plugin' ) );

// Campos extras no formulário
//add_filter( 'pkmeta_register_fields', array( 'PikiSlides', 'register_fields' ) );
?>