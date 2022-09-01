<?php
class posts extends PikiField {

	STATIC $PerPage = 100;
	
	function __construct(){
		// Label do campo
		self::set_label( 'Posts' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
	
		$field[ 'sqlrpc' ] = self::getReplacement();
		
		if( isset( $field[ 'post_type' ] ) && !empty( $field[ 'post_type' ] ) ):
			$field[ 'post_type_object' ] = get_post_type_object( $field[ 'post_type' ] );
		else:
			$field[ 'post_type_object' ] = false;
		endif;
		
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// constroi o campo
	public static function get_field( $field ){

		global $post;

		$post_type = _array_get( $field, 'post_type_object' );
		if( !$post_type ):
			return 'O campo ' . $field[ 'label' ] . ' precisa ter um tipo de post especificado.';
		endif;

		$value = _array_get( $field, 'value' );
		if( $value ):
			$value = implode( ',', $value );
		endif;

		// Selecteds posts
		$childs = false;
		if( !empty( $value ) ):				
			$childs = self::get_childs( $value );
		endif;

		$form_key = PikiForms::get_post_type_form_key( $field[ 'post_type' ] );
		if( !$form_key ) $form_key = $field[ 'post_type' ];

		// Tipo de widget
		$widget = _array_get( $field, 'widget', 'complete' );
		switch( $widget ):

			// Select
			case 'select':
			case 'checkboxes':

				$all_posts = get_posts(array( 
					'numberposts' => -1,
					'post_type' => $post_type->name,
					'orderby' => 'post_title',
					'order' => 'ASC',
				));
				$all_options = array_combine(
					array_column( $all_posts, 'ID' ),
					array_column( $all_posts, 'post_title' )
				);

				$include = _array_get( $field, 'include' );
				if( $include ):

					$to_include = get_posts(array( 
						'numberposts' => -1,
						'post_type' => 'any',
						'include' => $include,
						'orderby' => 'post_title',
						'order' => 'ASC',
					));
					if( !empty( $to_include ) ):
						$all_options = array_combine(
							array_column( $to_include, 'ID' ),
							array_column( $to_include, 'post_title' )
						) + $all_options;
					endif;
				
				endif;

				$field[ 'multiple' ] = true;
				$field[ 'controls' ] = true;
				$field[ 'default_value' ] = _array_get( $field, 'default_value' );
				$field[ 'options' ] = $all_options;

				$html = $widget::get_field( $field );

			break;

			// Complete
			case 'complete':
			default:

				$controls = '<nav><button type="button" class="button button-primary add" data-action="insert" title="Cadastrar ' . $field[ 'post_type_object' ]->labels->singular_name . '">Cadastrar</button><button type="button" class="button button-primary add" data-action="select" title="Selecionar ' . $field[ 'post_type_object' ]->labels->name . '">Selecionar</button></nav>';
				
				ob_start(); ?>
				
				<div class="field-posts-wrapper">

					<header class="clearfix">
						<?php echo $controls; ?>
					</header>

					<ul class="posts-list" style="display:none;">

						<li class="model clearfix" style="display:none;">
							<span class="title" class="title"></span>
							<div class="actions">
								<button type="button" class="edit button" title="Editar <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?>">Editar</button>
								<button type="button" class="remove button" title="Remover <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?> desta lista">Remover</button>
								<button type="button" class="delete button" title="Apagar <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?> no sistema">Apagar</button>
							</div>
							<input type="hidden" class="type-hidden item-id" value="" name="<?php echo $field[ 'name_html' ]; ?>[]" />
						</li>
						
						<?php 
						if( $childs ):
							foreach( $childs as $child ):
								if( empty( $child ) || !is_object( $child ) ) continue;
								?>
								<li class="post-item clearfix">
									<span class="title" class="title"><?php echo $child->post_title; ?></span>
									<div class="actions">
										<button type="button" class="edit button" title="Editar <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?>">Editar</button>
										<button type="button" class="remove button" title="Remover <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?> desta lista">Remover</button>
										<button type="button" class="delete button" title="Apagar <?php echo $field[ 'post_type_object' ]->labels->singular_name; ?> no sistema">Apagar</button>
									</div>
									<input type="hidden" class="type-hidden item-id" value="<?php echo $child->ID; ?>" name="<?php echo $field[ 'name_html' ]; ?>[]" />
								</li>
								<?php 
							endforeach; 
						endif;
						?>

					</ul>

					<footer style="display:none;">
						<?php echo $controls; ?>
						<input type="hidden" value="<?php echo $field[ 'machine_name' ]; ?>" class="field-name" />
						<input type="hidden" value="<?php echo $form_key; ?>" class="field-form-key" />
					</footer>

					<?php 
					$field[ 'value' ] = $value;
					echo hidden::get_field( $field ); 
					?>
				
				</div>

				<?php
				$html = ob_get_contents();
				ob_clean();

			break;

		endswitch;

		self::add_files();
		self::other_files( $field );

		return $html;

	}

	public static function get_childs( $IDs, $exclude = false ){

		$args = array(
			'post_type' => 'any',
			'include' => $IDs
		);
		
		if( $exclude ):
			$args[ 'post__not_in' ] = !is_array( $exclude ) ? array( $exclude ) : $exclude;
		endif;

		$posts = get_posts( $args );
		
		if( !empty( $posts ) ):

			$order = explode( ',', $IDs );
			if( count( $order ) === 1 ) return $posts;

			$ordered = array_flip( $order );
			foreach( $posts as $post ):
				$ordered[ $post->ID ] = $post;
			endforeach;

			return $ordered;
		
		else:
		
			return false;
		
		endif;
	
	}

	public static function add_files(){

		Piki::add_library( 'pagination' );
		Piki::add_library( 'modal' );
	    wp_enqueue_script( 'field-posts-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	    wp_enqueue_style( 'field-posts-styles', Piki::url( 'styles.css', __FILE__ ) );
	
	}

	public static function other_files( $field ){

	    PikiForms::add_files();
	    Pager::add_files();

		// ID do post do formulário
        $form_key = PikiForms::get_post_type_form_key( $field[ 'post_type' ] );
		$fields = PikiForms::get_ptype_form_fields( $form_key );
		
		if( $fields ):

			foreach ( $fields as $key => $field ):

				if( method_exists( $field[ 'ftype' ], 'add_files' ) ):
					call_user_func( array( $field[ 'ftype' ], 'add_files'  ), $field );
				endif;
			
			endforeach;

		endif;
	
	}

	public static function save_meta( $field, $ID, $value ){

		// Se não existe nenhum valor
		if( empty( $value ) ):
			return call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		endif;

		// Explode os IDs
		if( !is_array( $value ) ):
			$value = explode( ',', trim( trim( $value, ',' ) ) );
		endif;
		
		if( !empty( $value ) ):

			$ids = array_unique( $value );

			// Adiciona os valores no banco
			foreach( $ids as $_id ):
				call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $_id );
			endforeach;

			// Ordena os posts
			if( on( $field, 'align_by_date' ) ):
				self::realign_childs_order( $field, $value );
			endif;

		endif;

	}

	// Realinha os posts por data
	public static function realign_childs_order( $field, $ID, $ids ){

		global $wpdb;

		// Data de cadastro da primeira página
		$first_date = $wpdb->get_var($wpdb->prepare(
			"SELECT post_date FROM $wpdb->posts WHERE ID = %d", 
			reset( $ids ) 
		));
		
		// Time base para as datas
		$basetime = strtotime( $first_date );

		// Reverte o array para que a ordem fique correta
		$reversed = array_reverse( $ids );

		// Faz a mudança na data de cada post no banco
		foreach( $reversed as $item_id ):

			// Acrescenta um minuto ao último tempo usado
			$basetime += 60;
			// Modela a data
			$new_date = date( 'Y-m-d H:i:s', $basetime );
			// Updata no banco
			$wpdb->update( 
				$wpdb->posts, 
				array( 'post_date' => $new_date ), 
				array( 'ID' => $item_id ), 
				array( '%s' ), 
				array( '%d' ) 
			);
		
		endforeach;

	}

	public static function get_post_form(){
		
		// ID do post pai
		$post_parent = _post( 'post_parent' );
				
		// Chave do formulário
		$form_key = _post( 'form_key' );
		
		// ID do ítem (edição)
		$item_id = _post( 'post_id' );
		
        Pikiforms::show_form( $form_key, $item_id, $post_parent );
	
	}

	public static function get_selection(){

		global $wpdb;
				
		// Form
		$form_key = _post( 'form_key' );
		$form_settings = PikiForms::get_form_settings( $form_key );

		// Field
		$field_name = _post( 'field_name' );
		$field = PikiFields::extract_field( $form_settings[ 'fields' ], $field_name );

		$post_type = _array_get( $field, 'post_type' );

		// Query total
		$query = "SELECT count(0) FROM {$wpdb->posts} P WHERE P.post_type = %s AND P.post_status IN( 'publish', 'future' )";

		$vals = array( $post_type );

		// Outs
		$outs = _post( 'actual_ids' );		
		if( $outs ):
		
			// Query
			$outs = explode( ',', $outs );
			$rpcs = array_fill( 0, count( $outs ), "%d" );
			$query .= " AND P.ID NOT IN (". implode( ',', $rpcs ) .")";

			// Vals
			$vals = array_merge( $vals, $outs );
		
		endif;	

		// Total de ítems
		$total = $wpdb->get_var($wpdb->prepare( $query, $vals ));
		
		// Post type object
		$ptype_object = get_post_type_object( $post_type );

		$pager_id = md5(uniqid(rand(), true));

		// Filters
		$filters = posts::getFilters( $field );

		// Ítems
		$items = posts::get_items(array(
			'form_key' => $form_key,
			'field_name' => $field_name,
			'pager' => 1
		));
		
		$HTML = '<div class="posts-field-selection" data-items-per-page="' . posts::$PerPage . '" data-total-items="' . ( $items ? $items[ 'total_items' ] : '0' ) . '" data-next-page="">';
		
		// Filters
		if( $filters ):
		$HTML .= '	<header>' . $filters . ' <button type="button" class="button button-primary" data-action="do-filter">Filtrar</button></header>';
		endif;

		$HTML .= '
			<ul class="posts-list">'. ( $items ? $items[ 'content' ] : $ptype_object->labels->not_found ) .'</ul>
			<footer>
				<button type="button" data-action="do-select" class="button button-primary add" title="Selecionar" disabled="disabled">Selecionar</button>
			</footer>
		</div>
		';

		echo $HTML;
		exit();

	}

	public static function get_items( $settings = false ){
		
		// Passed settings
		if( $settings ):

			extract( $settings );
		
		else:

			// Form
			$form_key = _post( 'form_key' );
			// Field
			$field_name = _post( 'field_name' );
			// Pager
			$pager = _post( 'page', 1 );

		endif;		
		
		$form_settings = PikiForms::get_form_settings( $form_key );
		$field = PikiFields::extract_field( $form_settings[ 'fields' ], $field_name );

		// Post type
		$post_type = _array_get( $field, 'post_type' );

		// Arguments
		$query = array(
			'post_type' => $post_type,
			'posts_per_page' => posts::$PerPage,
			'orderby' => 'post_title',
			'order' => 'ASC',
			'paged' => $pager
		);
		
		// Outs
		$outs = _post( 'actual_ids' );
		if( $outs ):
			$query[ 'post__not_in' ] = explode( ',', $outs );
		endif;

		// Filters
		posts::applyFilters( $field, $query );

		// Query posts
		$posts = new WP_Query( $query );

		if( !$posts->have_posts() ):
			if( $settings ):
				return false;
			else:
				Piki::success(array(
					'content' => false
				));
			endif;
		endif;

		$HTML = '';
		foreach( $posts->posts as $post ):
			$cover = Piki::get_cover( $post->ID );
			$HTML .= '<li data-id="'. $post->ID .'">'. ( !$cover ? '' : '<span style="background-image:url('. $cover .');"></span>' ) .'<strong>'. $post->post_title .'</strong></li>';
		endforeach;

		$return = array(
			'total_items' => $posts->found_posts,
			'content' => $HTML
		);

		if( $settings ):
			return $return;
		else:
			Piki::success( $return );
		endif;

	}

	// Filters
	public static function getFilters( $field ){

		$filters = _array_get( $field, 'filters' );
		if( !$filters ) return false;

		$post_type = _array_get( $field, 'post_type' );

		$Filter = new PikiFilter(array(
			'post_type' => $post_type,
			'fields' => $filters,
			'onChange' => false
		));

		return $Filter->getFields();

	}

	// Apply filters
	public static function applyFilters( $field, &$query ){
		
		$filters = _post( 'filters' );
		if( $filters ):

			// Post type
			$post_type = _array_get( $field, 'post_type' );

			// Form
			$form_settings = PikiForms::get_form_settings( $post_type  );

			// Queries conditions
			$meta_query = array();
			$tax_query = array();
			
			foreach( $filters as $field_name => $value ):

				if( !empty( $value ) ):
					
					// Field
					$field = PikiFields::extract_field( $form_settings[ 'fields' ], $field_name );

					// Likes
					if( in_array( $field[ 'ftype' ], array( 'title', 'excerpt', 'body', 'textarea' ) ) ):

						$query[ 's' ] = $value;

					elseif( $field[ 'ftype' ] == 'taxonomy' ):

						//'tax_query' => array(
						$tax_query[] = array(
				            'taxonomy' => _array_get( $field, 'taxonomy' ),
				            'term_id' => $value,
				            'terms' => $value,
					    );

					else:

						$meta_query[] = array(
					        'key'     => $field_name,
					        'value'   => explode( ',', $value ),
					        'compare' => 'IN',
						);
					
					endif;

				endif;
				
			endforeach;

			if( !empty( $meta_query ) ):
				$query[ 'meta_query' ] = $meta_query;
			endif;

			if( !empty( $tax_query ) ):
				$query[ 'tax_query' ] = $tax_query;
			endif;

		endif;
		
	}

	public static function remove_item(){

		// ID do post
		$ID = isset( $_POST[ 'post_id' ] ) && (int)$_POST[ 'post_id' ] > 0 ? $_POST[ 'post_id' ] : false;
		
		// Se o id do post não foi informado
		if( !$ID ) Piki::error( 'O ID do post não foi informado' );
		
		// Post
		$post = get_post( $ID );
		
		// Se o post não existe
		if( !is_object( $post ) ) Piki::error( 'O ID informado é inválido' );

		// Permissão
		$type_object = get_post_type_object( $post->post_type );		
        if( !current_user_can( 'delete_posts' ) ):
            Piki::error( 'Você não tem permissão para apagar '. $type_object->label .'.', 'permission' );
        endif;
        
        // Remove o post
        wp_delete_post( $post->ID, true );

        // Remove value
        $field_name = _post( 'field_name' );
        $parent_id = _post( 'parent_id' );        
        $value = get_post_meta( $parent_id, $field_name, true );
        if( !empty( $value ) ):

        	$_ids = explode( ',', $value );
        	$_ids = array_flip( $_ids );

        	if( isset( $_ids[ $ID ] ) ):

        		unset( $_ids[ $ID ] );
        		$_ids = implode( ',', array_flip( $_ids ) );
        		update_post_meta( $parent_id, $field_name, $_ids );

        	endif;
        	
        endif;
        
        // Sucesso
        Piki::success();
	
	}

	// Mudando o post de status
	public static function on_status_change( $new_status, $old_status, $post ){
		
		global $wpdb;
		
		// Previne loops infinitos
		if( defined( 'POST_FIELD_UPDATE_STATUS_' . $post->ID ) ):
			return;
		else:
			define( 'POST_FIELD_UPDATE_STATUS_' . $post->ID, true );
		endif;

		// Se o status do post não mudou
		if( $new_status == $old_status ) return;
		
		// Filhos
		$childs = self::get_post_childs( $post->ID );
		
		// Se não tiver filhos
		if( !$childs ) return;
		
		// Passa pelos filhos e muda seu status
		foreach( $childs as $key => $ID ):
			$child = array(
				'ID' => $ID,
				'post_status' => $new_status,
			);
			wp_update_post( $child );
		endforeach;

	}

	// Quando o pai é deletado, seus filhos vão juntos
	public static function delete_post( $post_ID ){
		$childs = self::get_post_childs( $post_ID );
		if( !$childs ) return;
		foreach( $childs as $key => $ID ):
			wp_delete_post( $ID, true );
		endforeach;
	}

	// Busca posts filhos
	public static function get_post_childs( $post_ID ){

		global $wpdb;

		// Tipo de post
		$post_type = get_post_type( $post_ID );
		
		// Configurações do form
		$form_settings = PikiForms::get_form_settings( $post_type );
		
		// Campos de posts
	    $posts_fields = PikiFields::extract_field( $form_settings[ 'fields' ], 'posts', 'ftype', false );

		// Post childs
		$post_childs = array();

		// Se não existe nenhum campo do tipo posts
		if( !$posts_fields ) return;

		// Percorre os campos e procura os posts filhos
		foreach( $posts_fields as $key => $field ):
			
			$childs = $wpdb->get_col($wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_type = '%s' AND post_parent='%d'", array( $field[ 'post_type' ], $post_ID )));

			
			if( $childs && !empty( $childs ) ):
				$post_childs = array_merge( $post_childs, $childs );
			endif;

		endforeach;

		return ( empty( $post_childs ) ? false : $post_childs ); 

	}

	public static function get_settings_fields( $values ){

		// Post types
		$post_types = get_post_types( array( '_builtin' => false ) );
		unset( $post_types[ 'pikiform' ] );

		$fields = PikiFields::get_comum_fields( array( 'required', 'hide_label' ) );
		$fields[ 'set_childs' ] = array(
			'label' => 'Definir posts como filhos',
			'machine_name' => 'set_childs',
			'ftype' => 'boolean',
		);
		$fields[ 'post_type' ] = array(
			'label' => 'Tipo de post',
			'machine_name' => 'post_type',
			'ftype' => 'select',
			'options' => $post_types,
		);
		$fields[ 'widget' ] = array(
			'machine_name' => 'widget',
			'label' => 'Tipo de seleção',
			'ftype' => 'select',
			'options' => array(
				'complete' => 'Interface completa',
				'select' => 'Selectbox',
			)
		);

		PikiFields::set_fields_values( $fields, $values );

		return $fields;

	}

}

// Quando um post muda de status
add_action( 'transition_post_status',  array( 'posts', 'on_status_change' ), 10, 3 );
// Quando um post é deletado
add_action( 'before_delete_post', array( 'posts', 'delete_post' ) );
