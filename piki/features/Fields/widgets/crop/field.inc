<?php
class crop extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Crop (configurações)' );
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

		$value = self::format_value( $field );

		// Classe de number
		$n = new number();
		// Classe de boolean
		$b = new boolean();
		// Classe de texto
		$t = new text();

		$field[ 'hide_label' ] = false;

		// Multiplo
		$status = $field;
		$status[ 'label' ] = 'Sim';
		$status[ 'value' ] = isset( $value[ 'status' ] ) ? array( $value[ 'status' ] ) : false ;
		parent::set_as_child( $status, 'status' );
		$html = '<div class="field crop">' . $b->get_field( $status ) . '</div>';

		// Aspect ratio
		$ratio = $field;
		$ratio[ 'ftype' ] = 'text';
		$ratio[ 'label' ] = 'Proporção da Imagem';
		$ratio[ 'value' ] = isset( $value[ 'ratio' ] ) ? $value[ 'ratio' ] : '' ;
		parent::set_as_child( $ratio, 'ratio' );
		parent::add_attributes( $ratio, array( 'class' => 'ratio' ) );
		$html .= '<div class="field ratio"><label>Proporção da Imagem</label>' . $t->get_field( $ratio ) . '</div>';

		return $html;
	}

	public static function format_value( $field ){
		if( is_array( $field ) ):
			return $field[ 'value' ];
		else:
			$unserialized = unserialize( $field[ 'value' ] );
			if( !$unserialized ):
				return false;
			endif;
			return $unserialized;
		endif;
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		/*
		$value = !is_array( $values ) ? $values : $values[ $key ];
		$error = '';

		if( parent::is_required( $field ) && empty( $value ) ):
			$error = 'O campo "' . $field[ 'label' ] . '" é obrigatório.';
		elseif( parent::minlength( $field ) && strlen( $value ) < parent::minlength( $field ) ):
			$error = 'O campo "' . $field[ 'label' ] . '" deve ter no mínimo ' . parent::minlength( $field )  . ' caracteres.';
		elseif( parent::maxlength( $field ) && strlen( $value ) > parent::maxlength( $field ) ):
			$error = 'O campo "' . $field[ 'label' ] . '" deve ter no máximo ' . parent::maxlength( $field )  . ' caracteres.';
		endif;

		if( $error != '' ):
			return $error;
		endif;
		*/

		return true;

	}

	public static function is_emtpy( $field, $value ){

	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

	public static function save_meta( $field, $ID, $value ){
		// Insert images
		foreach( $value as $key => $item_value ):
			if( isset( $item_value[ 'file_id' ] ) && (int)$item_value[ 'file_id' ] > 0 ):
				$attatchment = array(
					'ID' => $item_value[ 'file_id' ],
					'post_parent' => $ID
				);
				wp_update_post( $attatchment );
				call_user_func( 'update_' . $field[ 'data_type' ] . '_meta', $ID, 'full', $item_value[ 'file_id' ], true );
			endif;
		endforeach;
	}

}	

add_filter( 'query_vars', array( 'image', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'image', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'image', 'template_redirect_intercept' ) );
