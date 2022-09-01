<?php
class ptypes extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Post types' );
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
	public static function get_field( $field, $settings ){

		// Tipos de post
		$post_types = self::get_types();

		// Opções para o campo
		$options = array();
		foreach( $post_types as $post_type => $type_settings ):
			$options[ $post_type ] = $type_settings->label . ' ('. $post_type .')';
		endforeach;

		// Tipo de campo
		if( $field[ 'multiple' ] === true ):
			$f = new checkboxes();
		else:
			$f = new select();
			$options = array_merge( array( '' => 'Selecione um tipo de post' ), $options );
		endif;

		$field[ 'options' ] = $options;
		return $f->get_field( $field );

	}

	// Recupera os tipos de post
	public static function get_types(){
		
		// Todos os tipos de post
		$ptypes = get_post_types( array(), 'objects' );

		// Remove os tipos de post que não podem ser marcados
		unset( 
			$ptypes->revision, 
			$ptypes[ 'nav_menu_item' ], 
			$ptypes[ 'pikiform' ], 
			$ptypes[ 'attachment' ],
			$ptypes[ 'revision' ]
		);
		
		// Retorna os tipos de post
		return $ptypes;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		$t = new text();
		return $t->validate( $field, $settings );
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::field_settings_fields( array( 'multiple', 'required', 'hide_label' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
