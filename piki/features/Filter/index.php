<?php
class PikiFilter {
	
	// Post type
	var $post_type;
	// Child post type
	var $post_type_child = false;
	// Fields
	var $fields;
	// Search values
	var $values;
	// Trigger change
	var $onChange = false;

	function __construct( $options ){

		// Scripts
		add_action( 'wp_enqueue_scripts', array( 'PikiFilter', 'add_files' ) );

		// Tipo de post
		!is_array( $options ) && $options = array( 'post_type' => $options );
		$this->post_type = $options[ 'post_type' ];

		// Tipo de post filho
		if( isset( $options[ 'post_type_child' ] ) ):
			$this->post_type_child = $options[ 'post_type_child' ];
		endif;
		
		// Campos
		if( isset( $options[ 'fields' ] ) ):
			$this->fields = $options[ 'fields' ];
		endif;

		// Values
		$this->values = $this->get_values();

		// Modificando a query
		if( $this->values ):
			// Filtros padrões
			add_action( 'pre_get_posts', array( $this, 'modify_query' ) );
		endif;
		
		// Arquivos
		add_action( 'wp_enqueue_scripts', array( 'PikiFilter', 'add_files' ) );

	}

	public static function field_order(){

		$f = array(
			'machine_name' => 'order',
			'id' => 'order',
			'name_html' => 'order',
			'ftype' => 'select',
			'options' => array(
				'' => 'Ordenar por',
				'mais-caro' => 'Mais caro',
				'mais-barato' => 'Mais barato',
			),
			'value' => PikiFilter::get_order(),
		);
	
		return select::get_field( $f );
	
	} 

	public function get_form( $classname = '' ){

		global $wpdb;

		// Action
		if( is_post_type_archive( $this->post_type ) ):	
			$this->action = '//' . $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ];
		else:	
			$ptype_data = get_post_type_object( $this->post_type );
		    $ptype_slug = $ptype_data->rewrite[ 'slug' ];			
			$this->action = get_site_url( null, '/' . $ptype_slug .  '/' );
		endif;

		// Removendo a paginação

		$pagepos = strpos( $this->action, '/page/' );
		if( $pagepos && $pagepos > 0 ):
			$peaces = explode( '/page/', $this->action );
			$peaces[ 1 ] = explode( '/', $peaces[ 1 ] );
			array_shift( $peaces[ 1 ] );
			$peaces[ 1 ] = implode( '/', $peaces[ 1 ] );
			$this->action = implode( '/', $peaces );
		endif;
		
		// Campos
		$this->fields = !is_array( $this->fields ) ? array( $this->fields ) : $this->fields;

        // Valores dos filtros já marcados
        $values = $this->get_values();

        $form = '';

        $form .= '<form id="search-form" method="GET" action="' . $this->action . '" class="piki-filter-form ' . $this->post_type . ' ' . $classname . '" submit-onchange="' . var_export( $this->onChange, true ) . '">';
        $form .= '	<fieldset class="clearfix">';

		$form .= $this->getFields();

		$form .= '	</fieldset>';

		if( $this->onChange !== TRUE ):
		$form .= '	<button type="submit" form="search-form" value="Buscar" class="submit-button"><strong>Buscar</strong></button>';
		endif;
		$form .= '	<input type="hidden" name="ordenar-por" id="ordenar-por" value="'. PikiFilter::get_order() .'" />';
		
		$form .= '</form>';

		return $form;

	}

	//Fields
	public function getFields(){

		// Form settings
		$form_settings = PikiForms::get_form_settings( $this->post_type );

		// Formulário do tipo filho
		if( $this->post_type_child ):
			$cform_settings = PikiForms::get_form_settings( $this->post_type_child );
		endif;

		$fields = '';
		
		foreach( $this->fields as $key => $field ):

			// Campos customizados
			if( isset( $field[ 'ftype' ] ) ):
				
				$field[ 'extra' ] = true;
				$_field = $field;
				$fname = $field[ 'machine_name' ];
			
			// Campos do formulário
			else:
				
				$fname = is_array( $field ) ? $key : $field;

				if( on( $field, 'child' ) ):
					$_field = PikiFields::extract_field( $cform_settings[ 'fields' ], $fname );
				else:
					$_field = PikiFields::extract_field( $form_settings[ 'fields' ], $fname );
				endif;
			
			endif;

			// Muda o tipo de campo para a busca
			$widget = is_array( $field ) && isset( $field[ 'widget' ] ) ? $field[ 'widget' ] : false;

			// Campo que não existe, nem é customizado
			if( !$_field ):
				continue;
			endif;
			
			// Valores e atributos html
			$_field[ 'value' ] = $values[ $fname ];
			$_field[ 'name_html' ] = $fname;
			$_field[ 'id' ] = $fname;
			
			// Permite que os plugins modifiquem os campos dos filtros
			if( method_exists( $_field[ 'ftype' ], 'change_for_filter' ) ):
				$_field = call_user_func( array( $_field[ 'ftype' ], 'change_for_filter' ), $_field );
			endif;

			if( isset( $field[ 'options' ] ) ):
				$_field[ 'options' ] = array();
				foreach( $field[ 'options' ] as $fok => $option ):
					$_field[ 'options' ][ $fok ] = $option[ 'label' ];
				endforeach;
			endif;

			// Apenas opções de seleção, que já foram marcadas
			if( isset( $_field[ 'options' ] ) && isset( $field[ 'just_checkeds' ] ) ):

				$rpcts = array();
				$total_opts = count( $_field[ 'options' ] );
				for( $r = 0; $r < $total_opts; $r++ ):
					$rpct[] = '%s';
				endfor;

				$checkeds = $wpdb->get_col($wpdb->prepare(
					"SELECT META.meta_value FROM $wpdb->postmeta META WHERE META.meta_value in ( ". implode( ',', $rpct ) ." )",
					array_keys( $_field[ 'options' ] )
				));

				if( empty( $checkeds ) || count( $checkeds ) == 1 ):
					continue;
				endif;

				// Novo array de opções
				$new_options = array();

				// Opção para resetar o filtro
				if( isset( $field[ 'disable_label' ] ) ):
					$new_options[ '' ] = $field[ 'disable_label' ];
				endif;

				foreach( $checkeds as $checked ):
					$new_options[ $checked ] = $_field[ 'options' ][ $checked ];
				endforeach;

				$_field[ 'options' ] = $new_options;

			endif;

			// Mudando tipo de campo para o filtro
			if( $widget ):
				$_field[ 'ftype' ] = $widget;
			endif;

			// Ícone
			$icone = isset( $field[ 'icone' ] ) ? $field[ 'icone' ] : false;

			// Linha do campo
			$fields .= '<div class="linha-field ftype-'. $_field[ 'ftype' ] .' '. $fname .''. ( $icone ? ' with-icon icon-' . $icone : '' ) .'">';

			// Ícone
			if( $icone ):
				$fields .= '<span class="icon '. $icone .'"></span>';
			endif;

			// Label
			if( isset( $field[ 'label' ] ) ):
				$fields .= '<label for="'. $_field[ 'id' ] .'">' . $field[ 'label' ] . '</label>';
			endif;

			// Required for selects
			if( $_field[ 'ftype' ] == 'select' ):
			 	$_field[ 'required' ] = true;
			endif;

			// Placeholder
			$placeholder = _array_get( $_field, 'placenolder' );
			if( !$placeholder ):
			 	$_field[ 'placeholder' ] = $_field[ 'label' ];
			endif;

			// Tell is search
			$_field[ 'is_search' ] = true;

			// Campo
			$fields .= $_field[ 'ftype' ]::get_field( $_field );

			$fields .= '</div>';

		endforeach;

		return $fields;
	
	}

	public static function get_order(){
		return isset( $_GET[ 'ordenar-por' ] ) ? $_GET[ 'ordenar-por' ] : '';
	}

	public function modify_query( $query ) {

		if ( 
		// Apenas no front	
		is_admin() || 
		// Apenas main query
		!$query->is_main_query() || 
		// Apenas arquivos
		!$query->is_post_type_archive() 
		):
			return $query;
		endif;

		$meta_querys = array();

		// Filtrando por filhos
		if( $this->post_type_child ):
			
			$by_childs_ids = $this->get_childs_parents();
			
			if( $by_childs_ids !== false ):
				$bci_value = empty( $by_childs_ids ) ? 'nenhum' : $by_childs_ids;
				$query->set( 'post__in', $bci_value );
			endif;
		
		endif;

		foreach( $this->fields as $key => $field ):
			$fname = is_array( $field ) ? $key : $field;
			if( empty( $this->values[ $fname ] ) || on( $field, 'child' ) ):
				continue;
			endif;
			if( isset( $field[ 'search' ] ) && $field[ 'search' ] === true ):
				$query->set( 's', $this->values[ $fname ] );		
			else:
				$meta_querys[] = $this->get_field_query( $field, $fname );
			endif;
		endforeach;

		$order = PikiFilter::get_order();
		
		//if( !empty( $order ) ):
		//	$order = $order === 'mais-caro' ? 'DESC' : 'ASC';
		//	$query->set( 'meta_key', 'valor' );
		//	$query->set( 'orderby', 'meta_value_num' );
		//	$query->set( 'order', $order );
		//endif;

		if( !empty( $meta_querys ) ):
			$query->set( 'meta_query', $meta_querys );
		endif;


	}

	// Incluindo filhos na busca
	private function get_childs_parents(){

		// Tipo de post dos filhos
		$query_posts = array(
			'post_type' => $this->post_type_child,
			'posts_per_page' => -1
		);

		// Campos marcados
		$meta_querys = array();
		
		// Busca por valores enviados
		foreach( $this->fields as $key => $field ):
			
			// Nome do campo
			$fname = is_array( $field ) ? $key : $field;
			
			// Se não foi enviado, ou se não é um campo filho, passamos
			if( empty( $this->values[ $fname ] ) || !on( $field, 'child' ) ):
				continue;
			endif;
			
			// Se for do tipo busca
			if( on( $field, 'search' ) ):
				
				$query_posts[ 's' ] = $this->values[ $fname ];
			
			// Todos os outros tipos
			else:
				
				$meta_querys[] = $this->get_field_query( $field, $fname );
			
			endif;
		
		endforeach;

		// Se nenhum campo foi marcado
		if( !empty( $meta_querys ) ):
			// Passando o meta query
			$query_posts[ 'meta_query' ] = $meta_querys;
		endif;

		// Se não há nenhum parâmetro
		if( !isset( $query_posts[ 's' ] ) && !isset( $query_posts[ 'meta_query' ] ) ):
			return false;
		endif;

		// Filhos
		$childs = new WP_Query( $query_posts );
		$results = $childs->get_posts();
		wp_reset_query();
		
		// ID's dos Parents
		$ids = array();

		// Se não existem filhos, retorna falso
		if( empty( $results ) ):
			return $ids;
		endif;

		// Recuperando os ID's dos parents
		foreach( $results as $_post ):
			$ids[] = $_post->post_parent;
		endforeach;

		// Retorno
		return $ids;
	
	}

	private function get_field_query( $field, $fname ){

		global $wpdb;
		
		if( isset( $field[ 'options' ] ) ):

			$option = $field[ 'options' ][ $this->values[ $fname ] ];
			if( isset( $option[ 'key' ] ) ):
				$this->values[ $fname ] = $option[ 'key' ];
			endif;

			$compare = isset( $option[ 'compare' ] ) ? $option[ 'compare' ] : 'IN';
			$type = isset( $option[ 'type' ] ) ? $option[ 'type' ] : 'CHAR';

		else:
			
			$compare = isset( $field[ 'compare' ] ) ? $field[ 'compare' ] : 'IN';
			$type = isset( $field[ 'type' ] ) ? $field[ 'type' ] : 'CHAR';

		endif;

		// Meta query
		$meta_key = isset( $field[ 'meta_key' ] ) ? $field[ 'meta_key' ] : $fname;

		// Value
		$_meta_query = array(
			'key'     	=> $meta_key,
			'value'   	=> $this->values[ $fname ],
			'compare' 	=> $compare,
			'type'		=> $type
		);

		return $_meta_query;
	
	}

	// Get values
	private function get_values(){

		if( empty( $_GET ) ):
			return false;
		endif;
		
		$empty = true;
		
		$values = array();
		foreach( $this->fields as $key => $field ):
			
			// Nome do campo na query string
			if( isset( $field[ 'ftype' ] ) ):
				$fname = $field[ 'machine_name' ];
			else:
				$fname = is_array( $field ) ? $key : $field;
			endif;
			
			// Value
			if( isset( $_GET[ $fname ] ) && !empty( $_GET[ $fname ] ) ):
				$values[ $fname ] = $_GET[ $fname ];
				$empty = false;
			else:
				$values[ $fname ] = false;
			endif;
		
		endforeach;
		
		return $empty ? false : $values;
	
	}

	// Add files
	public static function add_files(){
		wp_enqueue_script( 'piki-filter-form', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
	}
}

/*
add_filter( 'posts_request', 'dump_request' );
function dump_request( $input ) {
    var_dump($input);
    return $input;
}
*/
