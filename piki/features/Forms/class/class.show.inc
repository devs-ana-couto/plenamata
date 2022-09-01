<?php
class show {
	
	var $data_type = 'post';

	// Seta o tipo de data que estamos manipulando ( post ou user )
	public function set_data_type( $type=null ){
		
		// Tipo informado
		if( is_string( $type ) ):			
			$this->data_type = $type;
		
		// Objeto passado
		elseif( is_object( $type ) ):
			// User
			if( isset( $type->roles ) ):
				$this->data_type = 'user';
			// Post
			elseif( isset( $type->post_status ) ):
				$this->data_type = 'post';
			// Custom
			else:
				$this->data_type = 'custom';
			endif;
		
		// Default: Post
		else:
			$this->data_type = $post;
		endif;
	
	}
	
	// Recupera as informações adicionais de um ítem, com valores de mostragem
	public function get_post_meta_view( $ID, $fields, $firsts = false ){

		// Dados do banco
		$data = self::get_post_meta( $ID, $fields );
		$all_fields = array();
		foreach ( $fields as $key => $field ) {
			if( $field[ 'ftype' ] == 'fieldset' ):
				$all_fields = array_merge( $all_fields, $field[ 'subfields' ] );
			else:
				$all_fields[ $key ] = $field;
			endif;
		}
		$return = array();
		foreach ( $all_fields as $key => $field ) {

			$fname = $field[ 'machine_name' ];
			
			if( array_key_exists( $fname, $data ) ):
				// Verificamos se o campo tem um método próprio para renderização
				if( method_exists( $field[ 'ftype' ], 'renderize_values' ) ):
					$value = call_user_func( array( $field[ 'ftype' ], 'renderize_values' ), $field, $data[ $fname ] );
				else:
					if( !is_array( $data[ $fname ] ) ):
						$value = $data[ $fname ];
					else:
						$value = implode( ',', $data[ $fname ] );
					endif;
				endif;
				$return[ $key ] = $value;
			endif;
		
		}
		
		return (object)$return;
	
	}

	// Distribui os valores entre pais e filhos
	public static function set_data_tree( $fields, $values ){
		$values = (array)$values;
		$return = array();
		foreach ( $fields as $key => $field ) {
			if( $field[ 'ftype' ] == 'fieldset' && $field[ 'subfields' ] != false && $values !== false ):
				if( !is_array( $field[ 'subfields' ] ) ):
					echo('<pre>');
					var_dump( $field[ 'set_data_tree' ] );
					var_dump( $field[ 'subfields' ] );
					exit;
				endif;
				$return[ $field[ 'machine_name' ] ] = array(
					'fieldset' => true,
					'title' => $field[ 'label' ],
					'values' => self::set_data_tree( $field[ 'subfields' ], $values )
				);
			else:
				if ( isset( $values[ $field[ 'machine_name' ] ] ) && $values[ $field[ 'machine_name' ] ] !== false ) {
					$return[ $field[ 'machine_name' ] ] = array(
						'title' => $field[ 'label' ],
						'value' => $values[ $field[ 'machine_name' ] ],
					);
				}
			endif;
		}
		return $return;
	}

	// Busca o valor de um campo
	public function get_field_value( $ID, $key, $value ){
		return call_user_func( 'get_'. $this->data_type .'_meta', $ID, $key, $value );
	}

	// Formata um ítem para evio de email
	public static function format_for_email( $settings, $data ){
		$merged = PikiFields::mergeWithData( $settings[ 'fields' ], $data );
		$fields = self::format_fields_for_email( $merged );
		$return = '
			<h1>'. get_the_title( $settings[ 'pid' ] ) .'</h1>
			<div class="fields">
				'. $fields .'
			</div>
		';
		return $return;
	}

	// Formata os campos para envio de email
	public static function format_fields_for_email( $fields ){

		$html = '';
		
		foreach ( $fields as $key => $field ) {
			// Se o campo está vazio, não é mostrado
			if( empty( $field[ 'value' ] ) ):
				continue;
			endif;
			if ( $field[ 'ftype' ] == 'fieldset' ):
				if( ( $html_subs = self::format_fields_for_email( $field[ 'subfields' ] ) ) != '' ):
					$html .= '<div class="item">';
					$html .= '	<h2>'. $field[ 'label' ] .'</h2>';
					$html .= '	<div class="subitems">' . $html_subs . '</div>';
					$html .= '</div>';
				endif;
			else:

				if( method_exists( $field[ 'ftype' ], 'renderize_values' ) ):
					$value = call_user_func( array( $field[ 'ftype' ], 'renderize_values' ), $field, $field[ 'value' ] );
				else:
					$value = $field[ 'value' ];
				endif;

				// Se for um array, implode
				if( is_array( $value ) ):
					$value = implode( ',', $field[ 'value' ] );
				endif;

				$html .= '<div class="item">';
				$html .= '	<h3>'. $field[ 'label' ] .'</h3>';
				$html .= '	<p>'. $value .'</p>';
				$html .= '</div>';

			endif;
		
		}
		
		return $html;
	
	}

	// Busca o valor para mostragem
	public static function get_field_show_value( $field, $post_id, $data_type = 'post' ){
		// Recupera os dados no banco
		$meta = PKMeta::get_field_value( $post_id, $field, $data_type );
		// Nenhum valor
		if( !$meta || empty( $meta ) ) return false;
		// Retorna o campo renderizado
		if( method_exists( $field[ 'ftype' ], 'renderize_values' ) ):
			return call_user_func( array( $field[ 'ftype' ], 'renderize_values' ), $field, $meta );
		else:
			$value = is_array( $meta ) ? array_shift( $meta ) : $meta;
		endif;
	}

	// Busca o valor do campo no banco de dados
	public static function field_get_db_value( $field, $post_id, $data_type='post' ){
		if( method_exists( $field[ 'ftype' ], 'get_meta' ) ):
			return call_user_func( $field[ 'ftype' ], 'get_meta', $field, $post_id );
		else:
			return call_user_func( 'get_' . $data_type . '_meta', $post_id, $field[ 'machine_name' ] );
		endif;
	}
}