// Inicia
function piki_meta_init(){
	
	// Todos os boxes registrados
	$pkmeta_boxes = piki_meta_meta_settings();

	// Registra todos os boxes
	if( !empty( $pkmeta_boxes ) ):
	
		foreach ( $pkmeta_boxes as $key => $metabox ):
			$postmeta = new PKMetaBox( $metabox );
		endforeach;
	
		add_action( 'admin_enqueue_scripts', array( 'PKMeta', 'add_files' ) );
	
	endif;

}
add_action( 'init', 'piki_meta_init', 100 );

// Meta boxes adicionados
function piki_meta_meta_settings(){

	STATIC $meta_settings;
	
	if( is_null( $meta_settings ) ):
	
		$meta_settings = array();
		$meta_settings = apply_filters( 'pkmeta_register_fields', $meta_settings );
	
	endif; 	

	if( !empty( $meta_settings ) ):
		foreach( $meta_settings as &$meta ):
			if( !empty( $meta[ 'fields' ] ) ):
				$meta[ 'fields' ] = PikiFields::prepare_fields( $meta[ 'fields' ] );
			endif;
		endforeach;
	endif;
	
	return $meta_settings;

}

// Campos de um tipo de conteúdo
function piki_meta_get_type_fields( $post_type ){

	$meta_settings = piki_meta_meta_settings();
	if( empty( $meta_settings ) ):
		return array();
	endif;

	$fields = array();
	foreach( $meta_settings as $key => $metabox ):
		if( !in_array( $post_type, $metabox[ 'post_types' ] ) ):
			continue;
		endif;
		$fields = array_merge( $fields, $metabox[ 'fields' ] );
	endforeach;
	if( empty( $fields ) ):
		return false;
	endif;

	return $fields;

}

// METABOXES
class PKMetaBox {

	var $metabox;
	var $data_type;
	var $post_type = false;

	// Método construtor
	public function __construct( $_metabox ){
		
		// Não há metabox ou o array está vazio
		if( !is_array( $_metabox ) || empty( $_metabox ) ):
			return;
		endif;
		
		// Atribui o metabox
		$this->metabox = $_metabox;
		
		// Tipo de dado
		$this->data_type = 'post';
		
		// Registra o box
		add_action( 'admin_menu', array( &$this, 'register' ) );
		
		// Hook para salvar o conteúdo
		add_action( 'save_post', array( &$this, 'save' ) );
	
	}

	// Search specific meta field by meta id and fieldname
	public static function searchMetaField( $meta_id, $fieldname ){

		$metaboxes = piki_meta_meta_settings();
		if( empty( $metaboxes ) ) return false;

		foreach( $metaboxes as $metabox ):
			if( $metabox[ 'id' ] != $meta_id ) continue;
			return _array_get( $metabox[ 'fields' ], $fieldname );
		endforeach;

		return false;

	}

	// Registra um metabox
	public function register() {

		global $pagenow;

		// Se não houverem campos, não mostramos nada
		if( !is_array( $this->metabox[ 'fields'] ) || empty( $this->metabox[ 'fields' ] ) ):
			return;
		endif;

		// Post
		global $post;
		if( is_null( $post ) && isset( $_GET[ 'post' ] ) ):
			$post = get_post( $_GET[ 'post' ] );
		endif;

		//Só registra os campos nas páginas corretas		
		if( $pagenow == 'post-new.php' || $pagenow == 'edit.php' ):
			$this->post_type = isset( $_GET[ 'post_type' ] ) ? $_GET[ 'post_type' ] : 'post';
		elseif( $pagenow == 'post.php' && isset( $_GET[ 'action' ] ) && $_GET[ 'action' ] == 'edit' ):
			$this->post_type = $post->post_type;
		endif;

		// Apenas para posts específicos
		if( isset( $this->metabox[ 'post_names' ] ) && !empty( $this->metabox[ 'post_names' ] ) ):
			if( is_null( $post ) || !in_array( $post->post_name, $this->metabox[ 'post_names' ] ) ):
				return;
			endif;
		endif;
		
		// All post types
		if( $this->metabox[ 'post_types' ] === 'any' ):
			$this->metabox[ 'post_types' ] = array( $this->post_type );
		endif;

		// Apenas páginas de adição e edição de posts
		if( !$this->post_type || !in_array( $this->post_type, $this->metabox[ 'post_types' ] ) ):
			return;
		endif;

		$this->metabox[ 'context' ] = !isset( $this->metabox[ 'context' ] ) ? 'normal' : $this->metabox[ 'context' ];
		$this->metabox[ 'priority' ] = !isset( $this->metabox[ 'priority' ] ) ? 'high' : $this->metabox[ 'priority' ];
		
		foreach( $this->metabox[ 'post_types' ] as $post_type ):
			add_meta_box( 
				$this->metabox[ 'id' ], 
				$this->metabox[ 'title' ], 
				array( &$this, 'render' ), 
				$post_type, 
				$this->metabox[ 'context' ], 
				$this->metabox[ 'priority' ]
			);
		endforeach;

	}

	// Renderiza um metabox
	public function render( $post ){
		
		$values = '';

		$settings = array(
			'post_type' => $this->post_type,
			'fields' => $this->metabox[ 'fields' ],
			'data' => $post,
		);
		
		echo '<input type="hidden" name="wp_meta_box_nonce" value="', wp_create_nonce( basename(__FILE__) ), '" />';
		echo '<table class="form-table pkmeta">';
		
		foreach ( $this->metabox[ 'fields' ] as $key => $field ):

			// Valor do campo			
			$field[ 'value' ] = PKMeta::get_field_value( $field, $post->ID );

			// Ítem a que o post é relacionado
			$field[ 'item' ] = PKMeta::db_data( $post->ID, null, $this->data_type );

			// Classnames
			$class = 'linha-field ftype-' . $field[ 'ftype' ] . ( PikiField::is_multiple( $field ) ? ' multiple' : '' );
				
			echo '<tr>';
			if( !on( $field, 'hide_label' ) && !empty( $field[ 'label' ] ) ):
			echo '	<th style="width:18%"><label for="', $field[ 'machine_name' ], '">', $field[ 'label' ], '</label></th>';
			echo '	<td>';
			else:
			echo '	<td colspan="2">';
			endif;
			echo 		'<div class="' . $class . '" data-metabox-id="'. $this->metabox[ 'id' ] .'" rel="'. $field[ 'machine_name' ] .'">';
			echo 		'	<div class="field-item">', $this->get_html_field( $field, $settings ), '</div>';
			echo 		'</div>';
			if( isset( $field[ 'desc' ] ) && $field[ 'desc' ] != '' ):
			echo '		<p class="pkmeta_description">'. $field[ 'desc' ] .'</p>';
			endif;				
			echo '	</td>';
			echo '</tr>';
		
		endforeach;
		
		echo '</table>';
	
	}

	// Evoca as classes dos campos para renderização dos mesmos
	public function get_html_field( $field, $settings ){
		
		$field[ 'id' ] = $field[ 'machine_name' ];
		$field[ 'name_html' ] = $field[ 'machine_name' ];
		$field[ 'field_index' ] = 0;
		$f = new $field[ 'ftype' ];
		$html = $f->get_field( $field, $settings );
		
		return $html;
	
	}
	
	// Salva os valores de um metabox
	public function save( $post_id ){


		return $post_id;
		
		// Nonce
		$nonce = isset( $_POST[ 'wp_meta_box_nonce' ] ) ? $_POST[ 'wp_meta_box_nonce' ] : false;
		
		if( !$nonce || !wp_verify_nonce( $nonce, basename(__FILE__) ) ):
			return $post_id;
		endif;
		
		// Autosave
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}
		
		// Post
		$post = get_post( $post_id );

		// Check if post type has metabox
		if( !in_array( $post->post_type, $this->metabox[ 'post_types' ] ) ):
			return $post_id;
		endif;

		// check permissions
		if( !Piki::user_can( $post->post_type, 'edit', $post_id ) ):
			return $post_id;
		endif;
		
		// Salva os valores dos campos
		foreach( $this->metabox[ 'fields' ] as $key => $field ):

			// Tipo de dado
			$field[ 'data_type' ] = 'post';
			
			// Valor postado
			$value = _post( $field[ 'machine_name' ] );

			// Remove os valores anteriores
			PKMeta::delete_field_value( $field, $post_id, 'post', false, $value );

			// Salva os novos valores
			PKMeta::save_field_value( $field, $post_id, $value );
		
		endforeach;

		update_post_meta( $post_id, 'pikiform_saved', time() );
		
	}

}