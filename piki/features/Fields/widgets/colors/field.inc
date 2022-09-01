<?php
class colors extends PikiField {

	function __construct(){
		// Label do campo
		self::set_label( 'Cores' );

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

	// constroi o campo
	public static function get_field( $field ){

		// Options
		$options = self::get_options();

		// Field options
		$css = '<style>';
		foreach ( $options as $key_cor => &$cor ):
			$bg = !$cor[ 'thumbnail' ] ? 'background:' . $cor[ 'hexadecimal' ] : 'background-image:url('. $cor[ 'thumbnail' ] . ')';
			$css .= '.j-custom-checkbox.item-' . $key_cor . '{'. $bg . "}\r\n";
			$cor = $cor[ 'label' ];
		endforeach;
		$css .= "</style>";

		// Items
		$checks = new checkboxes();
		$field[ 'ftype' ] = 'checkboxes';
		$field[ 'options' ] = $options;
		$html = $checks->get_field( $field );

		self::add_files();

		return $html . $css;
	}

	// Validate values
	public static function validate_value( $field, $settings ){
		return checkboxes::validate( $field, $settings );
	}

	public static function add_files(){
	    wp_enqueue_script( 'field-colors-scripts', Piki::url( 'colors.field.js', __FILE__ ), array( 'jquery' ) );
	}

	public static function renderize_values( $field, $values, $options=array() ){

		if( empty( $values ) || $values == '' ):
			return false;
		endif;
		if( is_array( $values ) ):
			$values = array_shift( $values );
		endif;

		$options = self::get_options();
		$styles = '';
		$thumbs = '';

		// Imprime as cores
		foreach ( $values as $key => $value ):
			$color = $options[ $value ];
			$thumbs .= '<a class="field-color item-'. $value .'" title="'. $color[ 'label' ] .'">'. $color[ 'label' ] .'</a>';
			$styles .= ".field-color.item-" . $value . "{background-image:url('". $color[ 'thumbnail' ] . "');}\r\n";
		endforeach;
		return '<div class="ftype-colors show-items">'. $thumbs .'</div><style>'. $styles .'</style>';
	}

	// Opções de cores
	public static function get_options(){

		// Se o plugin de cores existe
		if( class_exists( 'PikiColors' ) ):
			
			return PikiColors::get_colors();
		
		// Cores estáticas
		else:
			
			require_once( Piki::path( __FILE__ ) . 'static_colors.inc' );
			return $static_colors;
		
		endif;

	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields( array( 'maxlength', 'required', 'hide_label' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}