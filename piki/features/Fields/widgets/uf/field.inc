<?php
class uf extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Estado';

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

		select::set_confs( $field );
	
		$label = _array_get( $field, 'label_to_show', 'nome' );
	
		$field[ 'options' ] = self::get_options( $label, _array_get( $field, 'options_filter' ) );
	
		// Load on change
		$loc = isset( $field[ 'loadOnChange' ] ) && empty( $field[ 'loadOnChange' ] ) ? 'false' : 'true';
		PikiField::add_attributes( $field, array( 'data-load-onchange' => $loc ) );

		if( $label == 'uf' ):
			$field[ 'placeholder' ] = 'UF';
		endif;
	
		return select::get_field( $field );
	
	}

	// All ufs
	public static function getEstados( $estados = false ){
		
		$data = [
			'AC' => (object)[
				'latlng' => '-67.8105087280273,-9.975464820861818,0',
				'nome_cidade' => 'Rio Branco',
				'id' => '1',
				'nome' => 'Acre',
				'slug' => 'acre',
				'uf' => 'AC',
				'prep' => 'no',
			],
			'AL' => (object)[
				'latlng' => '-35.73530960428283,-9.666502951528017,0',
				'nome_cidade' => 'Maceió',
				'id' => '2',
				'nome' => 'Alagoas',
				'slug' => 'alagoas',
				'uf' => 'AL',
				'prep' => 'em',
			],
			'AP' => (object)[
				'latlng' => '-51.06641772615081,0.0385661366162742,0',
				'nome_cidade' => 'Macapá',
				'id' => '4',
				'nome' => 'Amapá',
				'slug' => 'amapa',
				'uf' => 'AP',
				'prep' => 'no',
			],
			'AM' => (object)[
				'latlng' => '-60.0254669189453,-3.102448463439942,0',
				'nome_cidade' => 'Manaus',
				'id' => '3',
				'nome' => 'Amazonas',
				'slug' => 'amazonas',
				'uf' => 'AM',
				'prep' => 'no',
			],
			'BA' => (object)[
				'latlng' => '-38.51133728027344,-12.97151947021485,0',
				'nome_cidade' => 'Salvador',
				'id' => '5',
				'nome' => 'Bahia',
				'slug' => 'bahia',
				'uf' => 'BA',
				'prep' => 'na',
			],
			'CE' => (object)[
				'latlng' => '-38.54332730263089,-3.717461176332951,0',
				'nome_cidade' => 'Fortaleza',
				'id' => '6',
				'nome' => 'Ceará',
				'slug' => 'ceara',
				'uf' => 'CE',
				'prep' => 'no',
			],
			'DF' => (object)[
				'latlng' => '-47.93040848042664,-15.78051948608753,0',
				'nome_cidade' => 'Brasília',
				'id' => '7',
				'nome' => 'Distrito Federal',
				'slug' => 'distrito-federal',
				'uf' => 'DF',
				'prep' => 'no',
			],
			'ES' => (object)[
				'latlng' => '-40.33836364795558,-20.31955337344735,0',
				'nome_cidade' => 'Vitória',
				'id' => '8',
				'nome' => 'Espírito Santo',
				'slug' => 'espirito-santo',
				'uf' => 'ES',
				'prep' => 'no',
			],
			'GO' => (object)[
				'latlng' => '-49.25442511176424,-16.67951967085599,0',
				'nome_cidade' => 'Goiânia',
				'id' => '9',
				'nome' => 'Goiás',
				'slug' => 'goias',
				'uf' => 'GO',
				'prep' => 'em',
			],
			'MA' => (object)[
				'latlng' => '-44.30337141685571,-2.530451062952885,0',
				'nome_cidade' => 'São Luís',
				'id' => '10',
				'nome' => 'Maranhão',
				'slug' => 'maranhao',
				'uf' => 'MA',
				'prep' => 'no',
			],
			'MT' => (object)[
				'latlng' => '-56.09746167602181,-15.59650225807628,0',
				'nome_cidade' => 'Cuiabá',
				'id' => '13',
				'nome' => 'Mato Grosso',
				'slug' => 'mato-grosso',
				'uf' => 'MT',
				'prep' => 'no',
			],
			'MS' => (object)[
				'latlng' => '-54.64646911621095,-20.44351959228516,0',
				'nome_cidade' => 'Campo Grande',
				'id' => '12',
				'nome' => 'Mato Grosso do Sul',
				'slug' => 'mato-grosso-do-sul',
				'uf' => 'MS',
				'prep' => 'em',
			],
			'MG' => (object)[
				'latlng' => '-43.95639037695687,-19.81754303077579,0',
				'nome_cidade' => 'Belo Horizonte',
				'id' => '11',
				'nome' => 'Minas Gerais',
				'slug' => 'minas-gerais',
				'uf' => 'MG',
				'prep' => 'em',
			],
			'PA' => (object)[
				'latlng' => '-48.50439833040193,-1.456443271327079,0',
				'nome_cidade' => 'Belém',
				'id' => '14',
				'nome' => 'Pará',
				'slug' => 'para',
				'uf' => 'PA',
				'prep' => 'no',
			],
			'PB' => (object)[
				'latlng' => '-34.86330038541144,-7.115486600115958,0',
				'nome_cidade' => 'João Pessoa',
				'id' => '15',
				'nome' => 'Paraíba',
				'slug' => 'paraiba',
				'uf' => 'PB',
				'prep' => 'na',
			],
			'PR' => (object)[
				'latlng' => '-49.27344510792839,-25.428548799388,0',
				'nome_cidade' => 'Curitiba',
				'id' => '18',
				'nome' => 'Paraná',
				'slug' => 'parana',
				'uf' => 'PR',
				'prep' => 'no',
			],
			'PE' => (object)[
				'latlng' => '-34.88130188080839,-8.054492949686317,0',
				'nome_cidade' => 'Recife',
				'id' => '16',
				'nome' => 'Pernambuco',
				'slug' => 'pernambuco',
				'uf' => 'PE',
				'prep' => 'em',
			],
			'PI' => (object)[
				'latlng' => '-42.80236053313725,-5.089468478340516,0',
				'nome_cidade' => 'Teresina',
				'id' => '17',
				'nome' => 'Piauí',
				'slug' => 'piaui',
				'uf' => 'PI',
				'prep' => 'no',
			],
			'RJ' => (object)[
				'latlng' => '-43.2083928627163,-22.9035564806147,0',
				'nome_cidade' => 'Rio de Janeiro',
				'id' => '19',
				'nome' => 'Rio de Janeiro',
				'slug' => 'rio-de-janeiro',
				'uf' => 'RJ',
				'prep' => 'no',
			],
			'RN' => (object)[
				'latlng' => '-35.2093048098258,-5.795477377467147,0',
				'nome_cidade' => 'Natal',
				'id' => '20',
				'nome' => 'Rio Grande do Norte',
				'slug' => 'rio-grande-do-norte',
				'uf' => 'RN',
				'prep' => 'no',
			],
			'RS' => (object)[
				'latlng' => '-51.23048019409185,-30.03355026245118,0',
				'nome_cidade' => 'Porto Alegre',
				'id' => '23',
				'nome' => 'Rio Grande do Sul',
				'slug' => 'rio-grande-do-sul',
				'uf' => 'RS',
				'prep' => 'no',
			],
			'RO' => (object)[
				'latlng' => '-63.90448762789465,-8.762467476689642,0',
				'nome_cidade' => 'Porto Velho',
				'id' => '21',
				'nome' => 'Rondônia',
				'slug' => 'rondonia',
				'uf' => 'RO',
				'prep' => 'em',
			],
			'RR' => (object)[
				'latlng' => '-60.67346572875974,2.819580078125003,0',
				'nome_cidade' => 'Boa Vista',
				'id' => '22',
				'nome' => 'Roraima',
				'slug' => 'roraima',
				'uf' => 'RR',
				'prep' => 'em',
			],
			'SC' => (object)[
				'latlng' => '-48.54944615045752,-27.59755514557643,0',
				'nome_cidade' => 'Florianópolis',
				'id' => '24',
				'nome' => 'Santa Catarina',
				'slug' => 'santa-catarina',
				'uf' => 'SC',
				'prep' => 'em',
			],
			'SP' => (object)[
				'latlng' => '-46.63642120299626,-23.54854965191239,0',
				'nome_cidade' => 'São Paulo',
				'id' => '26',
				'nome' => 'São Paulo',
				'slug' => 'sao-paulo',
				'uf' => 'SP',
				'prep' => 'em',
			],
			'SE' => (object)[
				'latlng' => '-37.07231903245476,-10.91150952267382,0',
				'nome_cidade' => 'Aracaju',
				'id' => '25',
				'nome' => 'Sergipe',
				'slug' => 'sergipe',
				'uf' => 'SE',
				'prep' => 'no',
			],
			'TO' => (object)[
				'latlng' => '-48.33340370187268,-10.16749238530456,0',
				'nome_cidade' => 'Palmas',
				'id' => '27',
				'nome' => 'Tocantins',
				'slug' => 'tocantins',
				'uf' => 'TO',
				'prep' => 'em',
			],
		];

		// Todos os estados
		if( empty( $estados ) ):
			return $data;
		endif;

		// Apenas os estados específicos
		if( !is_array( $estados ) ):
			$estados = array( $estados );
		endif;
		
		foreach( $data as $id => $estado ):

			if( !in_array( strtoupper( $estado->uf ), $estados ) ):
				unset( $data[ $id ] );
			endif;

		endforeach;

		return $data;

	}

	public static function renderize_values( $field, $options = array() ){

		$value = _array_get( $field, 'value' );
		if( empty( $value ) ) return '';
		
		$key = _array_get( $field, 'label_to_show', 'nome' );
		$uf = uf::getEstadoBy( 'uf', $value );

		return $uf->{$key};

	}

	public static function getEstadoBy( $key, $value ){
		
		// Normalize key
		$key = intVal( $value ) > 0 ? 'id' : 'uf';

		// All states
		$estados = uf::getEstados();

		// ID keys
		if( is_numeric( $key ) ) $key = 'id';

		// Key search
		if( $key === 'uf' ):
			return _array_get( $estados, $value );
		endif;
		
		// Others fields
		foreach( $estados as $k => $estado ):
			if( $estado->{$key} == $value ):
				return $estado;
			endif;
		endforeach;

		return false;

	}

	// Get uf label
	public static function getLabel( $id, $label = 'nome' ){
		$all = uf::getEstados();
		return !isset( $all[ $id ] ) ? false : $all[ $id ]->{$label};
	}

	// Get UF options
	public static function get_options( $field, $filter = false ){

		$label_field = _array_get( $field, 'label_to_show', 'nome' );
		$estados = uf::getEstados( $filter );
		$options = [];
		
		$plchldr = _array_get( $field, 'placeholder' );
		if( $plchldr ):
			$options[ '' ] = $plchldr;
		endif;

		if( on( $field, 'national_option' ) ):
			$options[ 'nacional' ] = 'Nacional';
		endif;
		
		foreach( $estados as $id => $estado ):
			$options[ $estado->uf ] = _array_get( (array)$estado, $label_field );
		endforeach;
		
		return $options;
	
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'label_to_show' ] = [
			'ftype' => 'select',
			'label' => 'Mostrar opções:',
			'options' => [ 'uf' => 'Sigla', 'nome' => 'Nome' ],
			'description' => 'Se você marcar "Sigla", serão mostradas as siglas de cada estado ( ex. GO, RJ, SP ). A opção nome, mostrará o nome do estado ( ex: Goiás, Rio de Janeiro, São Paulo ).',
		];
		$fields[ 'conect_to' ] = [
			'ftype' => 'text',
			'label' => 'Conectar com:',
			'description' => 'Informe a chave de um campo do tipo <strong>cidade</strong> para que o este campo mostre as opções de cidade para cada estado selecionado.',
		];
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}
