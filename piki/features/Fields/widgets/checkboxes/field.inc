<?php
class checkboxes extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Checkboxes' );
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'proccess_after' ] = true;
		$field[ 'options' ] = self::get_options( $field );
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Get FIELD
	public static function get_field( $field ){

		$field[ 'options' ] = self::get_options( $field );
		$default_value = _array_get( $field, 'default_value' );
		$real_values = self::get_item_value( $field );
		$itens_fields = array();

		if( !$real_values && $default_value ):
			if( $default_value == 'all' ):
				$real_values = array_keys( $field[ 'options' ] );
			else:
				$real_values = !is_array( $default_value ) ? array( $default_value ) : $default_value;
			endif;
		endif;

		// Name html
		$name_html = _array_get( $field, 'name_html' );

		// Ícons
		$icons = _array_get( $field, 'icons', array() );

		foreach( $field[ 'options' ] as $key => $label ){

			// Se o campo está marcado
			$checked = !!$real_values && in_array( $key, $real_values ) ? true : false;
			
			// Valor padrão
			$check_item = $field;

			// Ícone
			if( is_array( $label ) ):
				$icon = _array_get( $label, 'icon' );
				$label = _array_get( $label, 'label' );
			elseif( isset( $field[ 'icon' ] ) ):
				$icon = _array_get( $field, 'icon' );
			else:
				$icon = _array_get( $icons, $key );
			endif;
			// General icons with this keys
			if( ( $icon && strpos( $icon, '<' ) !== 0 ) || $icons === true && !$icon ):
				$icon = '<i class="ico-'. $key .'"></i>';
			endif;

			$check_item[ 'id' ] = PikiField::get_subfield_id( $field, $key );

			if( $name_html ):
				$check_item[ 'name_html' ] = PikiField::get_subfield_name( $field, $key );
			endif;
			
			parent::add_attributes( $check_item, array( 'class' => array( 'item-' . $key ) ) );

			$itens_fields[] = array(
				'label' => false,
				'hide_label' => true,
				'value' => $key,
				'checked' => $checked,
				'field' => '<label for="' . $check_item[ 'id' ] . '">' . self::get_field_item( $check_item, $key, $label, $checked ) . '<div>' . ( $icon ? $icon : '' ) . '<strong class="text">' . $label . '</strong></div></label>',
			);
		
		}

		return self::renderize_field( $itens_fields, $field );

	}

	public static function get_item_value( $field ){

		$value = _array_get( $field, 'value' );
		
		// Se o valor é falso
		if( !$value ) return false;

		// String unique value
		if( is_string( $value ) ):
			return array( $value );
		endif;
		
		$vals_to_check = $value;

		$first_value = array_shift( $vals_to_check );
		if( !$first_value ) return array();
		
		if( is_array( $first_value ) ):
			return $first_value;
		else:
			return $value;
		endif;
		
	}

	public static function get_field_item( $field, $key, $label, $checked ){

		$html = '<input type="checkbox" '. ( !empty( $field[ 'name_html' ] ) ? 'name="'. $field[ 'name_html' ] . '"' : '' ) .' id="'. $field[ 'id' ] .'" value="'. $key .'"';
		parent::set_attributes( $html, $field );
		if( $checked ){
			$html .= ' checked="checked"';
		}
		$html .= " />";
		return $html;
	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = null ){
		$_values = _array_get( $values, $field[ 'machine_name' ] );
		return !empty( $_values ) ? array( $_values ) : array();
	}

	public static function renderize_field( $fields, $field ){

		$return = '';
		$return .= '<div class="ftype-checkboxes">';

			if( on( $field, 'controls' ) ):

				$return .= '<div class="controls">
					<button type="button" data-action="check-all" class="button">Marcar todos</button>
					<button type="button" data-action="uncheck-all" class="button">Desmarcar todos</button>
				</div>
				<div class="wrapp-items">';
			
			endif;

			if( count( $fields ) > 0 ):
			
				foreach( $fields as $key_field => $field ):

					// Se o campo está marcado
					$active = $field[ 'value' ] == '1' ? " active" : '';
				
					// HTML do campo
					$return .= '<div class="item-check' . $active . '">';
					$return .= '	' . $field[ 'field' ];
					$return .= '</div>';
				
				endforeach;
			
			endif;

			if( on( $field, 'controls' ) ):
				$return .= '</div>';
			endif;
	
		$return .= '</div>';

		return $return;
	
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		if( PikiField::is_required( $field ) && ( $field[ 'value' ] == 'noposted' || !is_array( $field[ 'value' ] ) || count( $field[ 'value' ] ) == 0 ) ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}

	// Renderize field values
	public static function renderize_values( $field, $options = array() ){

		// Values
		$values = _array_get( $field, 'value' );
		if( empty( $values ) ) return '';

		$format = _array_get( $options, 'format' );
		$return = array();
		
		switch( $format ):

			case 'rest':
				foreach( $values as $keyval ):
					if( isset( $field[ 'options' ][ $keyval ] ) ):
						$return[] = $field[ 'options' ][ $keyval ];
					endif;
				endforeach;
				return $return;
			break;

			default:

				foreach( $values as $keyval ):

					$_val = _array_get( $field[ 'options' ], $keyval );
					if( $_val ):
						$return[] = is_array( $_val ) ? $_val[ 'label' ] : $_val;
					endif;
				
				endforeach;
				return implode( _array_get( $options, 'glue', ',' ), $return );
			
			break;

		endswitch;
		
	}

	public static function get_options( $confs ){

		// Se já existe um array de opções
		if( is_array( $confs[ 'options' ] ) ):
		
			return $confs[ 'options' ];
		
		// Se houver um array com as informações de uma coleção
		elseif( is_array( $confs["collection"] ) ):
		
			return self::__get_options( $confs );
		
		// Se não existe dados sobre as opções
		elseif ( !isset( $confs[ 'options' ] ) || !is_array( $confs[ 'options' ] ) ):
		
			erro('fields', 'O campo do tipo checkboxes deve ter, ou um array com as opções, ou, um array com as configurações da coleção no banco de dados. Arquivo: checkboxes.field.inc, Método: checkboxes::get_options');
		
		endif;
	
	}

	public static function save_meta( $field, $ID, $value ){
		
		// Remove os valores existentes
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		
		// Se nenhum ítem foi marcado
		if( !$value ):
			return;
		endif;
		
		// Insere os ítems no banco
		foreach( $value as $key => $item ):
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $key );
		endforeach;
	
	}

	public static function add_files(){
	    wp_enqueue_script( 'field-checkboxes-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	    wp_enqueue_style( 'field-checkboxes-styles', Piki::url( 'styles.css', __FILE__ ) );
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'options' ) );
		$fields[ 'default_value' ] = array(
			'ftype' => 'text',
			'label' => 'Valor padrão:',
			'description' => 'Coloque a chave do ítem',
		);
		$fields[ 'controls' ] = array(
			'ftype' => 'boolean',
			'label' => 'Mostrar controles?',
			'description' => 'Mostrar botões de marcar e desmarcar todos',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
