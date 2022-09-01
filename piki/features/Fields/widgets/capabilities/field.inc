<?php
class capabilities extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Capabilities' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'not_formfields' ] = true;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo do tipo select
	public static function get_field( $field ){
		
		global $post, $wp_roles;
		
		// Post type
		$post_type = get_post_meta( $post->ID, 'ptype_name', true );
		
		// Roles
		$all_roles = $wp_roles->roles;
		$editable_roles = apply_filters('editable_roles', $all_roles);
		
		// Caps types
		$caps_types = self::get_caps( $post_type );
		$base_field = $field;
		$checks = new checkboxes();
		$tabs_buttons = array();
		$tabs_contents = array();
		foreach( $editable_roles as $key => $role ):
			$tabs_buttons[] = '<li><a href="#pikiforms-roles-tabs-'. $key .'">'. $role[ 'name' ] .'</a></li>';
			$field_caps = $base_field;
			$field_caps[ 'ftype' ] = 'checkboxes';
			parent::set_as_child( $field_caps, $key );
			$field_caps[ 'machine_name' ] .= '_' . $key;
			$field_caps[ 'options' ] = $caps_types;
			$field_caps[ 'value' ] = self::get_seted_caps( $role, $post_type );
			$tabs_contents[] = '<div class="group-caps" id="pikiforms-roles-tabs-'. $key .'">' . $checks->get_field( $field_caps ) . '</div>';
		endforeach;
		
		Piki::add_library( 'jquery-ui' );
		
		return '<div id="pikiforms-field-caps"><ul>'.implode( '', $tabs_buttons ).'</ul>'. implode( '', $tabs_contents ) .'</div>';
	
	}

	public static function get_seted_caps( $cap, $post_type ){
		$type_caps = self::get_caps();
		$return = array();
		foreach ( $type_caps as $key => $item ):
			if( isset( $cap[ 'capabilities' ][ $key . '_' . $post_type . 's' ] ) ):
				$return[ $key ] = $key;
			endif;
		endforeach;
		return $return;
	}

	public static function get_caps(){
		return array(
		    'read_private' => 'Ver privados',
		    'edit' => 'Editar (inserir)',
		    'edit_others' => 'Editar outros',
		    'edit_published' => 'Editar publicados',
		    'edit_private' => 'Editar privados',
		    'publish' => 'Publicar',
		    'delete' => 'Deletar',
		    'delete_others' => 'Deletar outros',
		    'delete_published' => 'Deletar publicados',
		    'delete_private' => 'Deletar privados',
		);
	}

	// Salva os valores
	public static function save_meta( $field, $ID, $value ){

		// Se o nome do tipo de conteúdo não foi postado
		if( !isset( $_POST[ 'ptype_name' ] ) || $_POST[ 'ptype_name' ] == '' ):
			return;
		endif;

		// Tipo de post
		$post_type = $_POST[ 'ptype_name' ];
		
		// Roles
		global $wp_roles;
		$all_roles = $wp_roles->roles;
		$editable_roles = apply_filters( 'editable_roles', $all_roles );

		// Se não foi postado nenhum valor
		if( empty( $value ) ):
			$value = array();
		endif;
		
		// Caps names
		$caps = array( 'edit', 'edit_others', 'edit_published', 'publish', 'delete', 'delete_others', 'delete_published', 'delete_private', 'edit_private', 'read_private' );
		
		// Loop por todas as roles
		foreach ( $editable_roles as $role_name => $role ):
		    
		    // Objeto da role
		    $role_obj = get_role( $role_name );  
	        
	        // Removendo e inserindo as caps
	        foreach ( $caps as $cap_key ):
	        	
	        	$complete_cap_name = $cap_key . '_' . $post_type . 's';
	        	
	        	if( isset( $value[ $role_name ][ $cap_key ] ) ):
	                
	                $role_obj->add_cap( $complete_cap_name );
	        	
	        	else:
		            
		            $role_obj->remove_cap( $complete_cap_name );
	        	
	        	endif;
	        
	        endforeach;
		
		endforeach;
	
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields(array( 'maxlength' ));
		$fields[ 'lines_number' ] = array(
			'ftype' => 'number',
			'label' => 'Número de linhas',
		);
		$fields[ 'show_counter' ] = array(
			'ftype' => 'boolean',
			'label' => 'Mostrar contador',
			'hide_label' => true,
			'description' => 'Marcando esta opção, o campo terá um widget que mostra quantos caracteres ainda podem ser inseridos.',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}

