<?php
class espaco extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Espaço';
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

	// Constroi o campo do tipo select
	public static function get_field( $field ){

		$html = '';
		$s = new select();

		// Unidades

			$unidades = get_posts(array( 
				'post_type' => 'unidade',
				'posts_per_page' => -1,
				'order' => 'ASC'
			));
			if( empty( $unidades ) ):
				return 'Nenhuma unidade disponível';
			endif;

			// Options
			$uniopts = array();
			foreach( $unidades as $unid ):
				if( $unid->post_name == 'institucional' && !on( $field, 'showinst' ) ):
					continue;
				endif;
				$uniopts[ $unid->ID ] = $unid->post_title;
			endforeach;

			// Select
			$unifield = $field;
			$unifield[ 'machine_name' ] = 'unidade';
			$unifield[ 'ftype' ] = 'select';
			$unifield[ 'placeholder' ] = 'Selecione uma unidade';
			$unifield[ 'options' ] = $uniopts;
			$unifield[ 'value' ] = $field[ 'value' ][ 'unidade' ];
			parent::set_as_child( $unifield, 'unidade' );
			$html .= $s->get_field( $unifield );

		// Locais

			// Options
			$espacos = self::get_espacos( $field[ 'value' ][ 'unidade' ] );

			// Select
			$espfield = $field;
			$espfield[ 'machine_name' ] = 'espaco';
			$espfield[ 'ftype' ] = 'select';
			$espfield[ 'placeholder' ] = 'Selecione um espaço';
			$espfield[ 'options' ] = $espacos;
			$espfield[ 'value' ] = $field[ 'value' ][ 'espaco' ];
			parent::set_as_child( $espfield, 'espaco' );
			$html .= $s->get_field( $espfield );
		
		// Arquivos

		    wp_enqueue_script( 'field-espaco-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_style( 'field-espaco-styles', Piki::url( 'styles.css', __FILE__ ) );

		return $html;

	}

	// Validação do campo
	public static function validate( $field, $settings ){
		
		$error = '';

		list( $UF, $CT ) = explode( '/', $field[ 'value' ] );

		// Se não escolheu o Estado
		if( is_null( $UF ) || $UF == '0' || $UF == '' ):
			
			$error = PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}' => 'uma estado' ) );

		// Se não escolheu a cidade
		elseif( is_null( $CT ) || $CT == '0' || $CT == '' ):
			
			$error = PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}' => 'uma cidade' ) );

		endif;

		if( $error != '' ):
			return $error;
		endif;
		return true;	
	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		// Adiciona o id da Estado
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_unidade', $value[ 'unidade' ] );
		// Adiciona o id do Cidade
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_espaco', $value[ 'espaco' ] );
	}

	public static function get_meta( $field, $ID ){
		
		// Recupera os estados
		$unidade = get_post_meta( $ID, $field[ 'machine_name' ] . '_unidade' );
		// Recupera as cidades
		$espaco = get_post_meta( $ID, $field[ 'machine_name' ] . '_espaco' );
		
		// Retorno
		$values = array();

		// Se existe algum estado cadastrado, organizamos os valores
		if( is_array( $unidade ) ):
			// Percorre os estados
			foreach( $unidade as $weight => $unidade_id ):
				// Adiciona o estado no array de valores
				$values[ $weight ] = array( 'unidade' => $unidade_id );
				// Se a cidade foi escolhida, adicionamos o ID da cidade no array
				$values[ $weight ][ 'espaco' ] = isset( $espaco[ $weight ] ) ? $espaco[ $weight ] : 0;
			endforeach;
		else:
			// Array com valor vazio
			$values[] = array(
				'unidade' => false,
				'espaco' => false
			);
		endif;

		// Retorno
		return $values;

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_unidade' );
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_espaco' );
	}

	public static function renderize_values( $field, $options=array() ){

		global $wpdb;

		if( !isset( $field[ 'value' ][ 'unidade' ] ) || empty( $field[ 'value' ][ 'espaco' ] ) ):
			return '';
		endif;
		
		$espacos = self::get_espacos( $field[ 'value' ][ 'unidade' ] );

		return $espacos[ $field[ 'value' ][ 'espaco' ] ];
		
	}

	public static function get_espacos( $id_unidade ){
		
		$return = array();

		// Espaços
		$espacos = get_posts(array(
			'post_type' => 'espaco',
			'meta_key' => 'unidade',
			'meta_value' => $id_unidade
		));
		if( !empty( $espacos ) ):
			foreach( $espacos as $espaco ):
				$return[ $espaco->ID ] = $espaco->post_title;
			endforeach;
		endif;

		return $return;
	
	}
	
	// Redirecionar as páginas solicitadas para os devidos arquivos 
	public static function ajax_get_espacos() {

		// Return
		$return = array();
		
		// ID uniade
		$id_unidade = isset( $_POST[ 'unidade' ] ) && (int)$_POST[ 'unidade' ] > 0 ? $_POST[ 'unidade' ] : false;

		// ID da unidade não fornecido
		if( !$id_unidade ):
			return $return;
		endif;

		// Espaços
		$espacos = self::get_espacos( $id_unidade );

		// Retorna o jSon
		Piki::return_json( $espacos );

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'showinst' ] = array(
			'ftype' => 'boolean',
			'label' => 'Mostrar opção institucional?',
			'machine_name' => 'showinst',
			'description' => 'Marcando esta opção, o usuário poderá selecionar a opção \'Institucional\'',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}