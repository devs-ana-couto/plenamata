<?php
define( 'CAPAS_KEY', 'capa' );

class Capas {

    // Covers types
    static $types = [
        '1' => [
            'id' => '1',
            'label' => 'Destaque full com 2 subdestaques',
            'cover_field' => 'destaque_image',
            'total_seconds' => 2,
            'total_thirds' => 0,
            'version' => 'default',
        ],
        // '2' => [
        //     'id' => '2',
        //     'label' => 'Destaque full com 2 subdestaques (textos sobre a imagem)',
        //     'cover_field' => 'destaque_image',
        //     'total_seconds' => 2,
        //     'total_thirds' => 0,
        //     'version' => 'default',
        // ],
        '3' => [
            'id' => '3',
            'label' => 'Destaque full com 3 subdestaques',
            'cover_field' => 'destaque_image',
            'total_seconds' => 3,
            'total_thirds' => 0,
            'version' => 'default',
        ],
        // '4' => [
        //     'id' => '4',
        //     'label' => 'Destaque full com 3 subdestaques (textos sobre a imagem)',
        //     'cover_field' => 'destaque_image',
        //     'total_seconds' => 3,
        //     'total_thirds' => 0,
        //     'version' => 'default',
        // ],
        '5' => [
            'id' => '5',
            'label' => 'Destaque full com 4 subdestaques',
            'cover_field' => 'destaque_image',
            'total_seconds' => 4,
            'total_thirds' => 0,
            'version' => 'default',
        ],
        // '6' => [
        //     'id' => '6',
        //     'label' => 'Destaque full com 4 subdestaques (textos sobre a imagem)',
        //     'cover_field' => 'destaque_image',
        //     'total_seconds' => 4,
        //     'total_thirds' => 0,
        //     'version' => 'default',
        // ],
        '7' => [
            'id' => '7',
            'label' => 'Destaque menor com 2 destaques com foto à direita',
            'cover_field' => 'destaque_image_small',
            'total_seconds' => 2,
            'total_thirds' => 0,
            'version' => '2',
        ],
        '8' => [
            'id' => '8',
            'label' => 'Destaque menor com 3 destaques à direita (1 com foto e 2 textuais)',
            'cover_field' => 'destaque_image_small',
            'total_seconds' => 1,
            'total_thirds' => 2,
            'version' => '2',
        ],
        '9' => [
            'id' => '9',
            'label' => 'Destaque menor com 5 destaques textuais à direita',
            'cover_field' => 'destaque_image_small',
            'total_seconds' => 0,
            'total_thirds' => 5,
            'version' => '2',
        ],
    ];

	// Get filters in URL
    function __construct(){
    	// Initing
        add_action( 'init', [ $this, 'init' ] );
        // Filter posts selecet
        add_filter( 'post_select_query', [ $this, 'postSelectQuery' ], 10, 2 );
        // Saving data
        add_action('save_post', [ $this, 'saveData' ], 10, 2 );
        // Ajax
        add_action( 'wp_ajax_capas_get_capa', [ $this, 'ajaxGetCapa' ] );
        add_action( 'wp_ajax_capas_get_teaser', [ $this, 'ajaxGetTeaser' ] );
        // Home panel
		add_action( 'add_meta_boxes', [ $this, 'coverPanel' ] );
    }

	// Initing
	public function init(){
		$this->registerPostType();
	}

	// Saving data
    public function saveData( $post_id, $post ){

    	// Automatic save
    	if( !_post( 'original_post_status' ) ) return true;

	    // Template
    	$template = _post( 'template', '1' );
	    update_post_meta( $post_id, 'capa_template', $template );

	    // Posts
    	$data = _post( 'capa' );
	    update_post_meta( $post_id, 'capa_items', serialize( $data ) );
	    
	}

	public function coverPanel(){

		// Metabox
        add_meta_box( 
            'formfields',
            'Composição da capa', 
            array( $this, 'formFields' ),
            CAPAS_KEY, 
            'advanced', 
            'default'
        );

        add_action( 'admin_enqueue_scripts', [ 'Capas', 'addScripts' ] );
	
	}


	// Get actual site cover
	public static function getActual(){

		// Get post
		$capas = get_posts([
			'post_type' => CAPAS_KEY,
			'posts_per_page' => 1
		]);
		if( empty( $capas ) ) return false;

		// First post
		$capa = reset( $capas );

		// Data
    	$capa->data = Capas::getCapaData( $capa->ID );

    	return $capa;

	}

	// Get actual template
	public static function getActualTemplate(){

		$capa = self::getActual();
		if( !$capa ) return false;

		return $capa->data->template;

	}

	public static function getSiteCapa(){

		// Data
    	$capa = self::getActual();

		// Subtemplate
		$subtemplate = 'home' . ( $capa->data->template[ 'version' ] == 'default' ? '' : '-' . $capa->data->template[ 'version' ] );

		get_template_part( 
    		'components/destaques', $subtemplate,
    		[
    		 	'posts' => $capa->data->posts,
    		 	'template' => $capa->data->template,
    		 	'is_admin' => false
    		]
    	);

	}

	// Change select query
	public function postSelectQuery( $query, $options = [] ){

		$add_query = false;

		// Cover full
		if( $options[ 'group' ] == 'sticky' ):

			$add_query = [
	            [
	                'key' => 'destaque_image',
	                'compare' => 'EXISTS',
	            ],
	            [
	                'key' => 'destaque_image',
	                'value' => '',
	                'compare' => '!=',
	            ],
	        ];

	    // Seconds and Thirds
		elseif( $options[ 'template' ] == 'teaser-post' ):

			if( $options[ 'group' ] == 'seconds' ):

				$add_query = [
		            [
		                'key' => 'thumb',
		                'compare' => 'EXISTS',
		            ],
		            [
		                'key' => 'thumb',
		                'value' => '',
		                'compare' => '!=',
		            ]
		        ];
				
			endif;

		endif;

		// Add meta_query
		if( $add_query ):

			if( isset( $query[ 'meta_query' ] ) ):
				$query[ 'meta_query' ] = array_merge( $query[ 'meta_query' ], $add_query );
			else:
				$query[ 'meta_query' ] = $add_query;
			endif;

		endif;

		return $query;
		
	}

    // Default capa data
    public static function getDefaultItems( $template ){

        // Template
        if( empty( $template ) ):
        	$template = reset( self::$types );
        endif;

        // Return object
        $return = new stdClass();

        // Sticky
        $return->sticky = self::getEmptyCapaItem( 'sticky' );
        $return->sticky->class = 'home';

        // Seconds
        if( $template[ 'total_seconds' ] ):
        	$item_second = self::getEmptyCapaItem( 'seconds' );
            $return->seconds = array_fill( 0, $template[ 'total_seconds' ], $item_second );
        else:
            $return->seconds = false;
        endif;

        // Thirds
        if( $template[ 'total_thirds' ] ):
        	$item_third = self::getEmptyCapaItem( 'thirds' );
            $return->thirds = array_fill( 0, $template[ 'total_thirds' ], $item_third );
        else:
            $return->thirds = false;
        endif;
        
        return $return;
                
    }

    // Capa data
    public static function getCapaData( $post_id, $template = false ){

        $return = new stdClass();

        // Template
        if( $template ):
        	$return->template = self::$types[ $template ];
        else:
	        $return->template = get_post_meta( $post_id, 'capa_template', true ); 
	        if( !empty( $return->template ) ):
	        	$return->template = self::$types[ $return->template ];
	        endif;
	    endif;

	    // Default structure
	    $return->posts = self::getDefaultItems( $return->template ); 

	    // Distribute posts
        $saved_posts = get_post_meta( $post_id, 'capa_items', true );

        if( !empty( $saved_posts ) ):

        	$saved_posts = unserialize( $saved_posts );

        	// Put seconds on thirds
        	if(  !$return->template[ 'total_seconds' ] && $return->template[ 'total_thirds' ] ):

        		// Seconds posts
        		$seconds = _array_get( $saved_posts, 'seconds' );
        		if( $seconds ):
        		
        			// Put seconds on thirds data
        			$saved_posts[ 'thirds' ] = empty( $saved_posts[ 'thirds' ] ) ? $seconds : array_merge( $seconds, $saved_posts[ 'thirds' ] );
        		
        		endif;
	        
	        endif;

	        // Keep in Posts
	        if( !empty( $saved_posts[ 'sticky' ] ) ):
	        	Posts::addPostsOut( $saved_posts[ 'sticky' ] );
	        endif;
	        if( !empty( $saved_posts[ 'seconds' ] ) ):
	        	Posts::addPostsOut( $saved_posts[ 'seconds' ] );
	        endif;
	        if( !empty( $saved_posts[ 'thirds' ] ) ):
	        	Posts::addPostsOut( $saved_posts[ 'thirds' ] );
	        endif;
	        
        	// Distribute
        	foreach( $return->posts as $group => $items ):

        		// Empty group
        		if( !isset( $saved_posts[ $group ] ) ) continue;

        		// Items
        		$items = $saved_posts[ $group ];

        		if( $group == 'sticky' ):

        			if( !empty( reset( $items ) ) ):
        				$return->posts->sticky = get_post( reset( $items ) );
        				$return->posts->sticky->group = 'sticky';
	        		endif;
        			
        		else:

	        		foreach( $return->posts->{$group} as $ki => &$item ):

	        			if( isset( $items[ $ki ] ) && !empty( $items[ $ki ] ) ):

	        				$item = get_post( $items[ $ki ] );
	        				$item->group = $group;

	        				// Texts over image on seconds teasers
	        				if( $group == 'seconds' && in_array( $return->template[ 'id' ], [ 2, 4, 6 ] ) ):
	        					$item->class = 'texts-inside';
	        				endif;
	        		
	        			endif;
		        	
		        	endforeach;

		        endif;
        	
        	endforeach;
        
        endif;

        $return->posts = json_decode( json_encode( $return->posts ) );

        return $return;

    }

    // Remove empty posts
    public static function removeEmptyTeasers( &$items ){

    	foreach( $items as $ki => $item ):
    	endforeach;

    }

    // Empty capa item
    public static function getEmptyCapaItem( $group ){
        $item = new stdClass();
        $item->url = '#';
        $item->image = '<picture><img src="https://fakeimg.pl/1280x700/?text=Imagem&font_size=50"></picture>';
        $item->title = 'Título da matéria';
        $item->subtitle = $group == 'sticky' ? 'Subtítulo da matéria' : false;
        $item->editoria = false;
        $item->post_id = false;
        $item->group = $group;
        return $item;
    }

    // Capas
    public static function getCapa( $template = '' ){
        global $Posts;
        return $Posts->_getCapa( $template );
    }
    public function _getCapa( $template ){

        echo '<pre>';
        echo '$template', '<br>';
        var_dump( $template );
        exit();

    }

	public function ajaxGetCapa(){

    	// Data
    	$template_id = _post( 'template' ); 
    	$post_id = _post( 'post_id' );

    	// Template object
    	$template = $this::$types[ $template_id ];

    	// Data
    	$data = Capas::getCapaData( $post_id, $template_id );

		// Subtemplate
		$subtemplate = 'home' . ( $data->template[ 'version' ] == 'default' ? '' : '-' . $data->template[ 'version' ] );

		get_template_part( 
    		'components/destaques', $subtemplate,
    		[
    		 	'posts' => $data->posts,
    		 	'template' => $data->template,
    		 	'is_admin' => true
    		]
    	);

    	exit();

	}

	// Get teaser
	public function ajaxGetTeaser(){

		// Args
		$post_id = _post( 'post_id' );
		$template = _post( 'template' );
		$group = _post( 'group' );

		// Post
		$post = get_post( $post_id );
		$post->group = $group;

		// Template
		get_template_part( 
			'components/' . $template, null, 
			[ 
				'item' => $post,
				'is_admin' => true,
				'excerpt' => ( $template == 'cover-full' ),
				'remove-image' => ( $group == 'thirds' ),
				'class' => ( $template == 'cover-full' ? 'home' : '' ),
			]
		);
		exit();

	}

    // Registra os campos dos formulários do ADMIN
    public function formFields( $post ){ 

    	// Data
    	$data = Capas::getCapaData( $post->ID );

    	// Default template
    	if( empty( $data->template ) ):
    		$data->template = reset( $this::$types );
    	endif;

    	// Default items
    	if( empty( $data->posts ) ):
    		$data->posts = self::getDefaultItems( $data->template );
    	endif;

		// Subtemplate
		$subtemplate = 'home' . ( $data->template[ 'version' ] == 'default' ? '' : '-' . $data->template[ 'version' ] ); ?>

    	<div id="asn-capa-builder" class="asn-wrapper">

    		<div id="type-chooser">

    			<label>Tipo de capa</label><?php
		    	echo select::get_field([
		    		'machine_name' => 'tipo_de_capa',
		    		'id' => 'template',
		    		'name_html' => 'template',
		    		'value' => $data->template[ 'id' ],
		    		'options' => array_combine( 
		    			array_column( Capas::$types, 'id' ), 
		    			array_column( Capas::$types, 'label' ) 
		    		),
		    	]); ?>

		    </div>

		    <div id="sticky-content"><?php	    
				// Get template
		    	get_template_part( 
		    		'components/destaques', $subtemplate, 
		    		[
		    		 	'posts' => $data->posts,
		    		 	'template' => $data->template,
		    		]
		    	); ?>
		    </div>

		</div><?php
    
    }

    public static function getTeaserFields( $opts ){

    	global $post;

		// Parent
    	if( empty( $post ) ):

    		$parent_id = _request( 'post_id' );
    		if( empty( $parent_id ) ):
    			$parent_id = _request( 'post' );
    		endif;
    		
    		if( !empty( $parent_id ) ):
    			$parent = get_post( $parent_id );
    		endif;
    	
    	else:
    	
    		$parent = $post;
    	
    	endif;
    	if( empty( $parent ) ) return '';
    	
		// Group
    	$group = _array_get( $opts, 'group' );

    	// Values
    	$post_id = _array_get( $opts, 'post_id' );

    	// Template
    	$template = _array_get( $opts, 'template' );
    	$template = trim( str_replace( [ get_template_directory(), '.php', '/components' ], '', $template ), '/' );

		echo PostSelect::getItemFields([
			'name' => 'capa[' . $group . '][]',
			'values' => empty( $post_id ) ? [] : [ $post_id ],
			'type_select' => 'single',
			'post_type' => [ 'post' ],
			'parent_id' => $post->ID,
			'group' => $group,
			'labels' => [
				'select' => 'Selecionar post',
				'replace' => 'Substituir post',
			],
			'attr' => 'data-template="'. $template .'"',
		]);

    }

    public static function addScripts(){
    	
    	$baseurl = get_template_directory_uri() . '/assets/';

    	// Libraries
    	Piki::add_library( 'message' );
    	Piki::add_library( 'loader-mask' );

    	// Scripts
    	wp_enqueue_script( 'capas-scripts', $baseurl . 'javascripts/capas.js', [ 'jquery' ] );
    	
    	// Styles
    	wp_enqueue_style( 'capas-styles', $baseurl . 'stylesheets/capas.css' );
    	
    	// Google fonts
		wp_enqueue_style( 'google-fonts-styles', 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&#038;display=swap', array(), NULL );
    
    }

	public static function registerPostType(){

		$labels = array(
			'name'               => __( 'Capas', 'piki' ),
			'singular_name'      => __( 'Capa', 'piki' ),
			'menu_name'          => __( 'Capas', 'piki' ),
			'name_admin_bar'     => __( 'Capas', 'piki' ),
			'add_new'            => __( 'Adicionar nova', 'piki' ),
			'add_new_item'       => __( 'Adicionar nova capa', 'piki' ),
			'new_item'           => __( 'Nova capa', 'piki' ),
			'edit_item'          => __( 'Editar capa', 'piki' ),
			'view_item'          => __( 'Ver capas', 'piki' ),
			'all_items'          => __( 'Todas as capas', 'piki' ),
			'search_items'       => __( 'Procurar capa', 'piki' ),
			'parent_item_colon'  => __( 'Capa mãe:', 'piki' ),
			'not_found'          => __( 'Nenhuma capa encontrada.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhuma capa na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => 'Capa',
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'capas' ),
			'show_in_rest'       => true,
			'has_archive'        => true,
			'hierarchical'       => false,
            'map_meta_cap'       => true,
			'capability_type'    => CAPAS_KEY,
			'menu_position'      => 0,
			'supports'           => array( 'title', 'revisions' ),
			'menu_icon'			 => 'dashicons-format-gallery',
			'gender'			 => 'a',
		);

		register_post_type( CAPAS_KEY, $args );

    }

}
$Capas = new Capas();