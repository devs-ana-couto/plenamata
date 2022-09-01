<?php
class taxonomy extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Taxonomia';

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		$terms = get_terms( $field[ 'taxonomy' ], 'hide_empty=0' );
		$widget = _array_get( $field, 'widget' );
		$key = _array_get( $field, 'key', 'term_id' );

		// Parse field value
		$values = _array_get( $field, 'value' );
		if( !empty( $values ) ):

			// Set string to array
			if( is_string( $values ) ):
				$values = [ $values ];
			endif;
		 
		 	// Normalize
			$_value = array();
			foreach( $values as $value ):
				if( is_object( $value ) ):
					$_value[] = $value->{$key};
				else:
					$_value = $value;
				endif;
			endforeach;
		
			$field[ 'value' ] = $_value;
		
		endif;

		$changed = $field;

		switch ( $widget ):

			case 'text':
				$changed[ 'ftype' ] = 'text';
				$html = text::get_field( $changed );
			break;
		
			case 'checkboxes':
				$changed[ 'ftype' ] = 'checkboxes';
				$changed[ 'options' ] = self::get_terms_options( $terms );
				$html = checkboxes::get_field( $changed );
			break;
		
			default:
				$changed[ 'ftype' ] = 'select';
				$changed[ 'options' ] = self::get_terms_options( $terms, $key );
				$html = select::get_field( $changed );
			break;
		
		endswitch;

		return $html;
	}

	public static function get_meta( $field, $post_id ){
		$terms = wp_get_post_terms( $post_id, $field[ 'taxonomy' ] );
		return ( !$terms || empty( $terms ) ) ? array() : $terms;
	}

	public static function get_terms_options( $terms, $field = 'term_id' ){
		$return = [];
		foreach( $terms as $key => $term ):
			$return[ $term->{$field} ] = $term->name;
		endforeach;
		return $return;
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		switch ( $field[ 'widget' ] ):
			case 'text':
				return text::validate( $field, $settings );
			break;
			case 'checkboxes':
				return checkboxes::validate( $field, $settings );
			break;
			default:
				return select::validate( $field, $settings );
			break;
		endswitch;

	}

	public static function renderize_values( $field, $opts = array() ){

		// Selected term
		$term = _array_get( $field, 'value' );

		// Widget
		$widget = _array_get( $field, 'widget' );

		// Field name
		$field = _array_get( $opts, 'field', 'name' );

		// Object
		if( _array_get( $opts, 'object' ) ):

			return $term;

		// Slug
		elseif( _array_get( $opts, 'slug' ) ):

			return $term->slug;

		// Widget with parent
		elseif( _array_get( $opts, 'parent' ) && !empty( $term->parent ) ):

			$parent = get_term( $term->parent, $term->taxonomy );
			return '<em class="'. $parent->slug . ' ' . $term->slug . '">
				<strong>'. $parent->name .'</strong> <span class="div">/</span>
				<a href="' . get_term_link( $term ) . '" title="'. $term->name .'">'. $term->name .'</a>
			</em>';

		// Label
		else:
		
			return $term->{$field};
			
		endif;
	
	}

	public static function save_meta( $field, $ID, $value ){
		
		switch( _array_get( $field, 'widget' ) ):
		
			case 'text':
				$post_terms = explode( ',', $value );
			break;
			case 'checkboxes':
				$post_terms = $value;
				foreach ( $post_terms as $key => $term ):
					if( !term_exists( (int)$term, $field[ 'taxonomy' ] ) ):
						unset( $post_terms[ $key ] );
					else:
						$post_terms[ $key ] = (int)$term;
					endif;
				endforeach;
			break;
			default:
				$post_terms = array( (int)$value );
			break;
		
		endswitch;

		wp_set_object_terms( $ID, $post_terms, $field[ 'taxonomy' ], false );
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();

		$fields[ 'taxonomy' ] = array(
			'label' => 'Taxonomia',
			'ftype' => 'select',
			'options' => self::get_taxs_options(),
			'required' => 'true',
			'default_value' => 'category',
		);
		
		$fields[ 'widget' ] = array( 
			'ftype' => 'radios',
			'label' => 'Tipo de widget:',
			'required' => true,
			'options' => array(
				'select' => 'Lista de seleção',
				'checkboxes' => 'Checkboxes',
				'text' => 'Texto, separado por virgula',
			),
			'default_value' => 'select',
		);

		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function get_taxs_options(){
		$taxs = get_taxonomies( '', 'objects' );
		$return = array();
		foreach ( $taxs as $key => $tax) {
			$return[ $key ] = $tax->labels->name;
		}
		return $return;
	}

	public static function dummy( $field ){

		$tax = _array_get( $field, 'taxonomy' );
		$terms = get_terms( $tax, array(
		    'hide_empty' => false,
		));

		// There is no terms
		if( empty( $terms ) ) return '';

		// Return term ID
		$key = array_rand( array_keys( $terms ) );
		return $terms[ $key ]->term_id;
		
	}

}
