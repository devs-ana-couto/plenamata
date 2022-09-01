<?php
class select extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Listas de seleção';

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		
		$field[ 'sqlrpc' ] = self::getReplacement();

		$options = _array_get( $field, 'options' );

		if( !empty( $options ) && is_string( $field[ 'options' ] ) ):
			$options = extract_options_by_str( $options );
		endif;
	
		return $field;
	
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// constroi o campo do tipo select
	public static function get_field( $field ){
		
		// Multiple values
		if( on( $field, 'multiple' ) ):
			$field[ 'name_html' ] .= '[]';
			parent::set_attribute( $field, 'multiple', 'multiple' );
		endif;

		// Has parent field
		$parent = _array_get( $field, 'parent' );
		if( $parent ):
			parent::set_attribute( $field, 'data-parent', $parent );
			parent::set_attribute( $field, 'data-require-parent-text', _array_get( $field, 'parent_require_text', false ) );
		endif;

		// Field style
		$style = _array_get( $field, 'style', 'width:100%;' );

		// Select all label
		$selall_label = _array_get( $field, 'all_label' );
		
		$html = '<select name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'" data-select-all-label="'. ( $selall_label ? $selall_label : 'false' ) .'"';
		parent::set_attributes( $html, $field );
		$html .= ( $style ? ' style="'. $style .'"' : '' ) . '>';
		self::select_set_options( $html, $field );
		$html .= "</select>";
	
		self::add_files( $field );

		return $html;

	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$error = '';
		if( parent::is_required( $field ) ):
			if( on( $field, 'multiple' ) ):
				if( emtpy( $field[ 'value' ] ) ):
					$error = PikiField::getErrorMessage( $field, 'doselect' );
				endif;
			else:
				if( $field[ 'value' ] === '' || $field[ 'value' ] === false ):
					$error = PikiField::getErrorMessage( $field, 'doselect' );
				endif;
			endif;
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}

	// Insere as opções no select
	public static function select_set_options( &$html, $field ){

		// Value
		$value = _array_get( $field, 'value', array() );
		
		// Values
		$values = !is_array( $value ) ? array( $value ) : $value;

		// Placeholder
		$placeholder = _array_get( $field, 'placeholder', '' );
		if( on( $field, 'required' ) && empty( $placeholder ) && !on( $field, 'hide_placeholder' ) ):
			$placeholder = 'Selecione';
		endif;
		
		if( $placeholder != '' ):

			$place_disable = !on( $field, 'is_search' ) || on( $field, 'placeholder_disable' );

			$place_value = _array_get( $field, 'placeholder_value', '' );
			$html .= '<option value="'. $place_value .'"'.( in_array( $place_value, $values ) ? ' selected="selected"' : '' ) . ( $place_disable ? '' : ' disabled' ) . '>' . $placeholder .'</option>';
		
		endif;

		// Options
		$options = _array_get( $field, 'options' );		
		if( empty( $options ) ) return $html;

		// Parent
		$parent = _array_get( $field, 'parent' );
		if( $parent ):

			foreach( $options as $kg => $group ):
				foreach( $group as $key => $label ):
					$html .= '<option value="' . $key . '"' . ( in_array( $key, $values ) ? ' selected="selected"' : '' ) . ' rel="'. $kg .'">' . $label . '</option>';

				endforeach;
			endforeach;

		else:

			foreach( $field[ 'options' ] as $key => $label ):				
				$html .= '<option value="' . $key . '"' . ( in_array( $key, $values ) ? ' selected="selected"' : '' ) . '>' . $label . '</option>';
			endforeach;
		
		endif;
		
		return $html;
	
	}


	// Renderizando os valores
	public static function renderize_values( $field, $options = array() ){

		// Value
		$value = _array_get( $field, 'value' );
		if( !$value ) return '';

		// Just key
		if( _array_get( $options, 'format' ) == 'key' ) return $value;

		// If has parent
		if( _array_get( $field, 'parent' ) ):

			foreach( $field[ 'options' ] as $group ):
				if( isset( $group[ $field[ 'value' ] ] ) ) return $group[ $field[ 'value' ] ];
			endforeach;
			
		// Default
		else:
		
			$choosed = _array_get( $field[ 'options' ], $value );
		
		endif;

		// Empty
		if( empty( $choosed ) ) return '';

		return $choosed;
	
	}

	// Scripts and Styles
	public static function add_files( $field ){
	
		// Plugin
		Piki::add_library( 'select2' );
		
		// Field scripts
	    wp_enqueue_script( 'field-select-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
	
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'options', 'required', 'placeholder' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	// Dummy content
	public static function dummy( $field ){
		$options = _array_get( $field, 'options' );
		return array_rand( $options );
	}

}
