<?php
class tags extends PikiField {
	
	function __construct(){

		//Label do campo
		self::set_label( 'Tags' );

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
		tags::add_files();
		parent::set_attribute( $field, 'data-machine-name', $field[ 'machine_name' ] );
		if( !empty( $field[ 'value' ] ) ):
			$field[ 'value' ] = implode( ',', $field[ 'value' ] );
		endif;
		Piki::add_library( 'jquery-ui' );
		return text::get_field( $field );
	}

	// Salva os valores
	public static function save_meta( $field, $ID, $values ){
		if( !empty( $values ) ):
			foreach( $values as $value ):
				add_post_meta( $ID, $field[ 'machine_name' ], $value );
			endforeach;
		endif;
	}

	public static function ajax_list(){

		global $wpdb;

		$user_id = get_current_user_id();

		$group_id = get_user_meta( $user_id, GROUPS_META_KEY, true );

		if( !empty( $group_id ) ):
			
			$values = Groups::get_group_users( $group_id );
			$places = array_fill( 0, count( $values ), "%d" );
			$places = implode( ',', $places );

		else:

			$values = array( $user_id );
			$places = "%d";

		endif;
		
		$values[] = $_POST[ 'field_name' ];
		$values[] = '%' . $wpdb->esc_like( $_POST[ 'q' ] ) . '%';

		$query = $wpdb->prepare(
			"SELECT M.meta_value FROM $wpdb->postmeta M LEFT JOIN $wpdb->posts P ON P.ID = M.post_id WHERE P.post_author IN( $places ) AND M.meta_key = %s AND M.meta_value LIKE %s", 
			$values
		);

		$results = $wpdb->get_col( $query );

		if( isset( $_POST[ 'actuals' ] ) && !empty( $_POST[ 'actuals' ] ) ):
			$results = array_diff ( $results, $_POST[ 'actuals' ] );
		endif;

		echo json_encode( $results );
		exit;
	}

	public static function renderize_values( $field, $options=false ){

		if( empty( $field[ 'value' ] ) ):
			return '';
		endif;

		switch ( $field[ 'mask_type' ] ):
			case 'time-hm':
				$format = isset( $options[ 'format' ] ) ? $options[ 'format' ] : 'H\hi';
				return date( $format, strtotime( $field[ 'value' ] ) );
			break;
			default:
				return $field[ 'value' ];
			break;
		endswitch;
	}

	public static function add_files(){
		// Library
        Piki::add_library( 'tag-it' );
       	// Self files
        wp_enqueue_script( 'field-tags-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields( array( 'placeholder', 'required' ) );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

}