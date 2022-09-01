<?php
define( 'UFCIDADE_CIDADES_TABLE', 'correios_localidades' );

class ufcidade extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Estado e cidade';
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

		global $wpdb;

		if( isset( $field[ 'value' ][ 0 ] ) ):
			$field[ 'value' ] = reset( $field[ 'value' ] );
		endif;

		// Todos os estados
		$estados = uf::getEstados( _array_get( $field, 'options_filter' ) );

		$val_estado = _array_get( $field[ 'value' ], 'estado' );
		$val_cidade = _array_get( $field[ 'value' ], 'cidade' );

		// Cidade escolhida
		$estado_cidades = ( $val_estado && $val_cidade ) ? cidade::get_all_cidades( $val_estado ) : false;

		$html = '<div class="field field-ufcidade clear">';
		
		$html .= '<div class="field col estado"><select id="'. parent::get_subfield_id( $field, 'estado' ) . '" name="'. parent::get_subfield_name( $field, 'estado' ) . '" class="estado ftype-estado" style="width:100%;"><option value="0">UF</option>';
		foreach ( $estados as $key => $estado ):
		$html .= '	<option value="' . $estado->uf . '"'. ( $estado->uf == $val_estado ? ' selected="selected"' : '' ) . ' rel="' . $estado->latlng . '">' . $estado->uf . '</option>';
		endforeach;
		$html .= '</select></div>';

		$html .= '<div class="field col cidade right"><select id="'. parent::get_subfield_id( $field, 'cidade' ) . '" name="'. parent::get_subfield_name( $field, 'estado' ) . '"' . ( $val_cidade == 0 ? ' disabled="disabled"' : '' ) . ' class="cidade ftype-cidade" style="width:100%;"><option value="0">Cidade</option>';
		
		if( $estado_cidades ):
			foreach( $estado_cidades as $key => $cidade ):
			$html .= '	<option value="' . $cidade->id . '"'. ( $cidade->id == $val_cidade ? ' selected="selected"' : '' ) . '>' . $cidade->nome . '</option>';
			endforeach;
		endif;
		
		$html .= '</select></div>';
		$html .= '<span class="preloader">Carregando...</span>';

		if( $val_estado == 0 && $val_cidade == 0 ):
			$val_input = '';
		else:
			$val_input = $val_estado . '/' . $val_cidade;
		endif;

		$html .= '<input id="'. $field[ 'id' ] .'" class="target-field ftype-hidden '. $field[ 'machine_name' ] .'" type="hidden" value="'. $val_input .'" name="'. $field[ 'name_html' ] .'">';

		$html .= '</div>';

		self::add_files();

		return $html;
	}

	public static function extract_item_value( $value, $key ){
		if( !isset( $value[ $key ] ) || !$value[ $key ] ):
			return 0;
		elseif( is_array( $value[ $key ] ) ):
			return array_shift( $value[ $key ] );
		else:
			return $item_value;
		endif;
	}

	public static function db_to_str( $field, $value ){
	}

	public static function add_files(){
	    wp_enqueue_script( 'UFCidade', Piki::url( 'ufcidade.js', __FILE__ ), 'jquery', false, true );
		wp_enqueue_style( 'UFCidade', Piki::url( 'ufcidade.css', __FILE__ ) );
	}

	public static function get_estado( $id ){
		$estados = uf::getEstados();
		return $estados[ $id ];
	}

	public static function get_estado_by_uf( $uf ){
		$estados = uf::getEstados();
		foreach( $estados as $estado ):
			if( $estado->uf === strtoupper( $uf ) ):
				return $estado;
			endif;
		endforeach;
		return false;
	}

	// Recupera as cidades de acordo com IDS passados
	public static function get_cidades( $ids = [], $with_estados = false, $keyed = false ){
		
		global $wpdb;
		
		if ( !is_array( $ids ) ) return false;

		$pars = str_replace( ',,', ',', implode( ',', $ids ) );

		$fields = 'id, latlng, nome' . ( $with_estados === true ? ', estado' : '' );
		$cidades = $wpdb->get_results( $wpdb->prepare("
			SELECT $fields
			FROM " . $wpdb->prefix . "ufcidade_cidade
			WHERE id in (" . $pars . ")
			ORDER BY nome ASC
		"), ( $keyed ? OBJECT_K : OBJECT ) );

		// Associando estados
		if( $with_estados === true ):
			foreach( $cidades as &$cidade ):
				$cidade->estado = self::get_estado( $cidade->estado );
			endforeach;
		endif;

		return $cidades;
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		if( on( $field, 'required' ) && empty( $field[ 'value' ] ) ):
			
			return PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}' => 'um estado' ) );

		elseif( !empty( $field[ 'value' ] ) ):

			list( $UF, $CT ) = explode( '/', $field[ 'value' ] );
			
			// Se não escolheu o Estado
			if( is_null( $UF ) || $UF == '0' || $UF == '' ):

				return PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}' => 'um estado' ) );
			
			// Se não escolheu a cidade
			elseif( is_null( $CT ) || $CT == '0' || $CT == '' ):
			
				return PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}' => 'uma cidade' ) );
			
			endif;
		
		endif;

		return true;
		
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'label_to_show' ] = [
			'ftype' => 'select',
			'label' => 'Mostrar opções:',
			'options' => [ 'sigla' => 'Sigla', 'name' => 'Nome' ],
			'description' => 'Se você marcar "Sigla", serão mostradas as siglas de cada estado ( ex. GO, RJ, SP ). A opção nome, mostrará o nome do estado ( ex: Goiás, Rio de Janeiro, São Paulo ).',
		];
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	// Atualiza os valores nos campos
	public static function save_meta( $field, $ID, $value ){
		list( $estado, $cidade ) = explode( '/', $value );
		// Adiciona o id da Estado
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_estado', $estado );
		// Adiciona o id do Cidade
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_cidade', $cidade );
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Estado
		$estado = _array_get( $meta, $field[ 'machine_name' ] . '_estado' );
		// Cidade
		$cidade = _array_get( $meta, $field[ 'machine_name' ] . '_cidade' );

		// Empty
		if( empty( $estado ) ):
			return [
				'estado' => false,
				'cidade' => false
			];
		endif;

		if( !is_array( $estado ) ):
			$estado = [ $estado ];
			$cidade = [ $cidade ];
		endif;

		// Retorno
		$values = [];

		// Percorre os estados
		foreach( $estado as $weight => $estado_id ):
			// Adiciona o estado no array de valores
			$values[ $weight ] = [ 'estado' => $estado_id ];
			// Se a cidade foi escolhida, adicionamos o ID da cidade no array
			$values[ $weight ][ 'cidade' ] = isset( $cidade[ $weight ] ) ? $cidade[ $weight ] : 0;
		endforeach;

		return $values;
	
	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_estado' );		
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_cidade' );
	}

	public static function get_show_value( $name, $meta=false ){

		global $wpdb;

		if( is_array( $name ) ):
			$estado = (int)$name[ 0 ];
			$cidade = (int)$name[ 1 ];
		else:
			$estado = ( ! (int)$meta[ $name . '_estado' ] > 0) ? false : $meta[ $name . '_estado' ];
			$cidade = ( ! (int)$meta[ $name . '_cidade' ] > 0 ) ? false : $meta[ $name . '_cidade' ];
		endif;
		

		if (!$estado && !$cidade) {
			return false;
		}
		if ($estado) {
			$estado_vals = $wpdb->get_row($wpdb->prepare( "SELECT id, nome, uf FROM " . $wpdb->prefix . "ufcidade_estado WHERE id = '%d' ORDER BY nome ASC", $estado ));
		}
		if ($cidade) {
			$cidade_vals = $wpdb->get_row($wpdb->prepare("SELECT latlng, nome as nome_cidade FROM " . $wpdb->prefix . "ufcidade_cidade WHERE id = '%d' ORDER BY nome ASC", $cidade ));
		}

		return $cidade_vals->nome_cidade . '/' . $estado_vals->nome;
			
	}

	public static function renderize_values( $field, $options = [] ){

		global $wpdb;

		$estado = _array_get( $field[ 'value' ], 'estado' );
		$cidade = _array_get( $field[ 'value' ], 'cidade' );

		if( empty( $estado ) || empty( $cidade ) ):
			return '';
		endif;

		// Estado
		if( $estado ):
		
			$estado = uf::getEstadoBy( 'uf', $estado );
			$estado_field = _array_get( $options, 'sigla_estado', 'nome' );
			$estado_label = $estado->{$estado_field};
		
		endif;

		// Cidade
		if( $estado && $cidade ):

			$cidade = cidade::get_cidade( $estado->uf, $cidade );
			$cidade_label = $cidade->nome;
		
		endif;

		// Template
		$format = _array_get( $options, 'format' );
		if( $format ):

			return strtr( 
				$format, 
				[ 
					'[cidade]' => $cidade_label, 
					'[estado]' => $estado_label, 
					'[prep]' => $estado->prep
				]
			);

		// Default
		else:
		
			$space = isset( $options[ 'separator' ] ) ? $options[ 'separator' ] :  '/';
			return $cidade . $space . $estado->{$uf};

		endif;

	}

	// Nomes do valor estado/cidade
	public static function get_names( $value ){
		global $wpdb;
		list( $e, $c ) = explode( '/', $value );
		return array(
			'cidade' => $wpdb->get_var($wpdb->prepare("SELECT nome FROM " . $wpdb->prefix . "ufcidade_cidade WHERE id = '%d' LIMIT 1", $c ) ),
			'estado' => $wpdb->get_var($wpdb->prepare( "SELECT nome FROM " . $wpdb->prefix . "ufcidade_estado WHERE id = '%d' LIMIT 1", $e ) ),
		);
	}

	// Recupera uma cidade pelo nome da mesma, e pela sigla do estado
	public static function get_cidade_by_name( $cidade, $uf ){
		global $wpdb;
		$estado = self::get_estado_by_uf( $uf );
		$cidade = $wpdb->get_row($wpdb->prepare(
            "SELECT id, nome, codigo, latlng FROM $wpdb->prefix" . UFCIDADE_CIDADES_TABLE . " WHERE estado = %d AND nome = %s",
            array(
            	$estado->id,
            	$cidade
            )
        ));
        if( empty( $cidade ) ):
        	return false;
        endif;
		return $cidade;
	}
	
	// Redirecionar as páginas solicitadas para os devidos arquivos 
	public static function ajax_get_cidades() {

		// Estado
		$uf = _post( 'estado' );

		// Lista de cidades
		$cidades = cidade::get_all_cidades( $uf );
		
		// Array para retorno
		$keyed = [];
		// Monta o array chaveado
		foreach ( $cidades as $id => $cidade ):
			$keyed[ $cidade->ID ] = $cidade->nome;
		endforeach;
		
		// Retorna o jSon
		Piki::return_json( $keyed );
	}

	public static function dummy( $field ){
		// Estado
		$estados = uf::getEstados();
		$uf = array_rand( $estados );
		// Cidade
		$cidades = cidade::get_all_cidades( $uf );
		$cidade = array_rand( (array)$cidades );
		// Join
		return $uf . '/' . $cidade;
	}

}