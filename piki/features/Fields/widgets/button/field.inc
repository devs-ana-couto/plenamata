<?php
class button extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Botão' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'no_proccess' ] = true;
		$field[ 'hide_label' ] = true;
		$field[ 'nowrap' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo do tipo select 
	public static function get_field( $field ){

		// Label do campo
		if( isset( $field[ 'label_inside' ] ) && !empty( $field[ 'label_inside' ] ) ):
			$label = $field[ 'label_inside' ];
		elseif( isset( $field[ 'label' ] ) && !empty( $field[ 'label' ] ) ):
			$label = $field[ 'label' ];
		else:
			$label = is_array( $field[ 'value' ] ) ? $field[ 'value' ][ $field[ 'field_index' ] ] : $field[ 'value' ];
		endif;

		$html = '<input type="button" name="' . $field[ "name_html" ] . '" id="' . $field[ "id" ] . '" value="' . $label . '" title="'. $label . '"';
		
		if( isset( $field[ 'classnames' ] ) && !empty( $field[ 'classnames' ] ) ):
			parent::add_attributes( $field, array( 'class' => $field[ 'classnames' ] ) );
		endif;

		parent::set_attributes( $html, $field );
		
		$html .= " />";
		
		return $html;
	}

	public static function validate( $field, $settings ){
		return true;
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'label', 'machine_name', 'icone' ), true );
		$fields[ 'label_inside' ] = array(
			'label' => 'Texto do botão',
			'machine_name' => 'label_inside',
			'ftype' => 'text',
		);
		$fields[ 'classnames' ] = array(
			'label' => 'Classes (css)',
			'machine_name' => 'classnames',
			'ftype' => 'text',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}