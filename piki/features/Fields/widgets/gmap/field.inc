<?php
class gmap extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Mapa do Google' );

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

		$html = '';

		if( on( $field, 'searching' ) ):
			$tclass = new text();
			$field[ 'ftype' ] = 'text';
			$html .= '<div class="search-box clearfix"><input type="text" class="search-typing ftype-text" placeholder="Para buscar, Digite um endereço" /><input type="button" value="procurar" class="button" /></div>';
		else:
			$tclass = new hidden();
			$field[ 'ftype' ] = 'hidden';
		endif;

		// Área do mapa
		$html .= '<div class="gmap-map-area" id="' . parent::get_subfield_id( $field, 'mapa_area' ) . '"></div>';
		
		// Custmo marker
		$marker = _array_get( $field, 'marker' );
		if( $marker ):
			parent::add_attributes( $field, array( 'data-marker' => $marker ) );
		endif;
		
		// Classame
		parent::add_attributes( $field, array( 'class' => 'gmap-field' ) );

		// Initial zoom
		parent::set_attribute( $field, 'data-initial-zoom', _array_get( $field, 'initial_zoom', 12 ) );
		
		// Connecting
		if( isset( $field[ 'connetct_to' ] ) && !empty( $field[ 'connetct_to' ] ) ){
			parent::add_attributes( $field, array( 'rel' => $field[ 'connetct_to' ] ) );
		}

		// Maybe unserialize
		$value = _array_get( $field, 'value' );
		if( !empty( $value ) && is_array( $value ) ):
			$value = implode( ',', $value );
		endif;
		$field[ 'value' ] = $value;
		
		$html .= $tclass->get_field( $field );

		self::add_files( $field );
		
		return $html;
	}

	public static function add_files(){
		
	    $filesdir = Piki::url( '/', __FILE__ );
	    
	    // Scripts
	    wp_enqueue_script( 'gmap-api', '//maps.googleapis.com/maps/api/js?key=AIzaSyDLDAPBuuR0IVqVr_ZI4k2FkWoW80DmPik&callback=Location.init&language=pt_BR', array( 'jquery' ) );

	    wp_enqueue_script( 'gmap.field.js', $filesdir . 'gmap.field.js', array( 'jquery' ) );
	    // Styles
	    wp_enqueue_style( 'gmap.field.css', $filesdir . 'gmap.field.css' ); 
	}

	// Gravando os dados no banco
	public static function save_meta( $field, $ID, $value ){
		// Apenas se não está vazio
		if( !empty( $value ) ):
			// Explodindo
			list( $lat, $lng ) = explode( ',', $value );
			if( !empty( $lat ) ):
				// Latitude
				call_user_func( 'add_'. $field[ 'data_type' ] .'_meta', $ID, $field[ 'machine_name' ] . '_lat', $lat );
				// Longitude
				call_user_func( 'add_'. $field[ 'data_type' ] .'_meta', $ID, $field[ 'machine_name' ] . '_lng', $lng );
			endif;
		endif;
	}
	// Mudando os valores
	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){
		$return = array();
		$subs = gmap::subfields();
		foreach( $subs as $sub ):
			$key = $field[ 'machine_name' ] . '_' . $sub;
			$value = isset( $meta[ $key ] ) ? $meta[ $key ] : false;
			$return[ $sub ] = isset( $value[ 0 ] ) && !empty( $value[ 0 ] ) ? $value[ 0 ] : '';
		endforeach;
		return array( $return );
	}

	// Nomes dos subcampos
	public static function subfields(){
		return array( 'lat', 'lng' );
	}

	// Renderizando os valores
	public static function renderize_values( $field, $options=array() ){

		if( empty( $field[ 'value' ] ) || empty( $field[ 'value' ][ 'lat' ] ) ):
			return false;
		endif;
		// Carregando arquivos
		self::add_files();
		// ID
		$id = 'gmap-' . md5(uniqid(rand(), true));
		// Coordenadas
		return '<div id="'. $id .'" class="gmap-map-box" data-latitude="'. $field[ 'value' ][ 'lat' ] .'" data-longitude="'. $field[ 'value' ][ 'lng' ] .'" data-icon="'. Piki::url( 'images/pin.png', __FILE__ ) .'"></div>';
	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove os valores
		$subs = gmap::subfields();
		foreach( $subs as $sub ):
			call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_' . $sub );
		endforeach;
	}

	//SELECT id, ( 6371 * acos( cos( radians(37) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(-122) ) + sin( radians(37) ) * sin( radians( lat ) ) ) ) AS distance FROM markers HAVING distance < 25 ORDER BY distance LIMIT 0 , 20;

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'searching' ] = array(
			'label' => 'Campos de busca?',
			'ftype' => 'boolean',
		);
		$fields[ 'connetct_to' ] = array(
			'label' => 'Conectar ao campo:',
			'ftype' => 'text',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}