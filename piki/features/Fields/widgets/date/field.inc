<?php
class date extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Data';
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		if( on( $field, 'isperiod' ) ):
			PikiField::add_attributes( $field, array( 'class' => 'inline-childs' ) );
		endif;
		if( on( $field, 'keep_history' ) ):
			PikiField::add_attributes( $field, array( 'class' => 'keep-history' ) );
		endif;
		return $field;
	}
	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		// min="1997-01-01" max="2030-12-31"

		// Valor
		$value = _array_get( $field, 'value' );
		$value = is_array( $value ) && isset( $value[ 0 ] ) ? reset( $value ) : $value;

		// Calendar
		// if( _array_get( $field, 'widget' ) == 'calendar' ):
		// 	PikiField::add_attributes( $field, array( 'masktype' => 'datepicker' ) );
		// endif;

		if( !on( $field, 'isperiod' ) ):

			$field[ 'tagType' ] = 'date';
			$field[ 'placeholder' ] = 'dd-mm-yyyy';
			return text::get_field( $field );

		else:

			// Início
			$init = $field;
			$init[ 'value' ] = empty( $value ) ? '' : $value;
			PikiField::set_as_child( $init, 'date' );

			// Fim
			$end = $field; 
			$end[ 'value' ] = _array_get( $value, 'final', '' );
			PikiField::set_as_child( $end, 'final' );
					
			$html = '<div class="child-item init"><span>De</span>' . text::get_field( $init ) . '</div>';
			$html .= '<div class="child-item final"><span> até </span>' . text::get_field( $end ) . '</div>';

			if( _array_get( $field, 'keep_history' ) && $field[ 'form_settings' ][ 'action' ] == 'edit' ):
				
				$add_label = _array_get( $field, 'add_label', '+ Adicionar' );
				$add_desc = _array_get( $field, 'add_desc', 'Atualize as datas de início e fim.' );

				$_init = $init;
				$_init[ 'id' ] = $_init[ 'name_html' ] = $_init[ 'value' ] = '';
				$_end = $end;
				$_end[ 'id' ] = $_end[ 'name_html' ] = $_end[ 'value' ] = '';
				
				$html .= '<button type="button" title="'. $add_label .'" data-action="add-value">'. $add_label .'</button>';
				$html .= '
				<div class="field-date-modal" data-field-name="'. $field[ 'machine_name' ] .'" data-post-id="'. $field[ 'form_settings' ][ 'data' ] .'" sytle="display:none;">
					<div>
						<h2>'. $add_label .'</h2>
						<em>'. $add_desc .'</em>
						<fieldset>
							<div class="child-item init"><span>De</span>' . text::get_field( $_init ) . '</div>
							<div class="child-item final"><span> até </span>' . text::get_field( $_end ) . '</div>
						</fieldset>
						<div class="status"></div>
						<nav>
							<button type="button" class="submit" data-action="submit">'. $add_label .'</button>
							<button type="button" class="cancel" data-action="cancel">Cancelar</button>
						</nav>
					</div>
				</div>';
			
			endif;

		endif;

		date::add_files();
		
		return $html;

	}

	// Get time
	public static function getTime( $value ){
		if( strpos( $value, '/' ) > 0 ):
			return strtotime( DateTime::createFromFormat( 'd/m/Y', $value )->format( 'Y-m-d' ) );
		else:
			return strtotime( $value );
		endif;
	}

	// Transforma a data para o formato de banco
	public static function format( $value, $format = 'Y-m-d' ){
		$time = strtotime( $value );
		if( !$time ):
			return $value;
		else:
			return date_i18n( $format, $time );
		endif;
	}

	// Transforma a data para o formato configurado no campo
	public static function db_to_str( $field, $value ){
		$time = strtotime( $value );
		if( !$time ){
			return '';
		}
		return date( 'd/m/Y', $time );
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		// Just date
		if( !on( $field, 'isperiod' ) ):

			// Date value
			$date = _array_get( $field, 'value' );

			// Limit
			$limit_start = _array_get( $field, 'limit_start' );
			$limit_end = _array_get( $field, 'limit_end' );

			if( parent::is_required( $field ) && empty( $date ) ):

				$error = PikiField::getErrorMessage( $field, 'required' );
			
			elseif( !empty( $date ) ):

				if( !date::validate_format( $date ) ):
				
					$error = PikiField::getErrorMessage( $field, 'format' );

				elseif( $limit_start &&  $date < $limit_start ):

						$error = PikiField::getErrorMessage( $field, 'limit_start', [ '{LIMITSTART}' => self::show_format( $limit_start ) ] );

				elseif( $limit_end && $date > $limit_end ):

						$error = PikiField::getErrorMessage( $field, 'limit_end', [ '{LIMITEND}' => self::show_format( $limit_end ) ] );

				endif;
			
			endif;

		// Interval date
		else:

			// Date
			$date = _array_get( $field[ 'value' ], 'date' );
			
			// End date
			$final = _array_get( $field[ 'value' ], 'final' );

			if( parent::is_required( $field ) ):

				if( empty( $date ) ):
					$error = 'Digite a data inicial';
				elseif( empty( $final ) ):
					$error = 'Digite a data final';
				endif;

			endif;
			
			if( $error == '' && !empty( $date ) ):

				if( !self::validate_format( $date ) ):
					$error = 'Data inicial com formato inválido';
				elseif( !self::validate_value( $date ) ):
					$error = 'Data inicial inválida';
				endif;

			endif;
			
			if( $error == '' && !empty( $final ) ):
				if( !self::validate_format( $final ) ):
					$error = 'Data final com formato inválido';
				elseif( !self::validate_value( $final ) ):
					$error = 'Data final inválida';
				endif;
			endif;
			
			// Compare two dates
			if( $error == '' && !empty( $date ) && !empty( $final ) ):
				
				// Data inicial
				list( $dd, $dm, $dy ) = explode( '/', $date );		
				$compare_start = $dy . $dm . $dd;

				// Data final
				list( $fd, $fm, $fy ) = explode( '/', $final );		
				$compare_final = $fy . $fm . $fd;

				if( $compare_final <= $compare_start ):
					$error = 'A data final deve ser maior que a data inicial';
				endif;

			endif;

		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}

	// Validate date format
	public static function validate_value( $str ){
		list( $d, $m, $y ) = explode( '/', $str );
		return checkdate( $m, $d, $y );
	}

	// Validate date value
	public static function validate_format( $str ){
		return preg_match( '/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/', $str );
	}

	public static function save_meta( $field, $ID, $value ){

		// Not period dates
		if( !on( $field, 'isperiod' ) ):

			if( empty( $value ) ) return;
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );

		// Period dates
		else:
		
			$date = _array_get( $value, 'date' );
			if( !$date ) return;
		
			// Inicial
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $date );

			// Fim
			if( on( $field, 'isperiod' ) ):
				$final_value = $value[ 'final' ];
				call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_final', $final_value );
			endif;

		endif;
	
	}

	public static function ajax_new_value(){

		// Posted
		$field_name = _post( 'field_name' );
		$post_id = _post( 'post_id' );
		$start = _post( 'data_start' );
		$end = _post( 'data_end' );

		$post = get_post( $post_id );
		if( empty( $post ) ):
			Piki::error( 'O post é inválido' );
		endif;

		// Save actual
		$act_ini = get_post_meta( $post_id, $field_name, true );
		$act_end = get_post_meta( $post_id, $field_name . '_final', true );
		add_post_meta( $post_id, $field_name . '_history', $act_ini . ',' . $end );

		// Save new values
		update_post_meta( $post_id, $field_name, $start );
		update_post_meta( $post_id, $field_name . '_final', $end );

		// Let others plugins play
		do_action( 'piki_date_inserted', $field_name, $post );

		Piki::success( 'Datas adicionadas com sucesso.' );

	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_final' );
	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = false ){

		$mname = $field[ 'machine_name' ];
		
		$dates = _array_get( $values, $mname, [] );

		// Is not period field
		if( !on( $field, 'isperiod' ) ):

			return $dates;

		// Period field
		else:

			$return = array();

			foreach( $dates as $weight => $date ):

				// Each return value
				$return[ $weight ] = array();
				// Value
				$return[ $weight ][ 'date' ] = $date;
				
				// Ends dates
				$ends = _array_get( $values, $mname . '_final', [] );
				if( $ends ):
					$return[ $weight ][ 'final' ] = $ends[ $weight ];
				endif;

			endforeach;

		endif;

		return $return;

	}

	// Database format
	public static function db_format( $date ){
		if( strpos( $date, '/' ) !== false ):
			list( $d, $m, $Y ) = explode( '/', $date );
			return $Y . '-' . $m . '-' . $d;
		endif;
		return $date;
	}

	// Showing format
	public static function show_format( $date ){
		if( strpos( $date, '-' ) !== false ):
			return date( 'd/m/Y', strtotime( $date ) );
		endif;
		return $date;
	}

	// Renderize values
	public static function renderize_values( $field, $options = array() ){

		// Formato
		if( is_string( $options ) ):
			$format = $options;
		else:
			$format = _array_get( $options, 'format', 'd/m/Y' );
		endif;

		// Value
		$value = _array_get( $field, 'value' );

		if( !on( $field, 'isperiod' ) ):

			$time = strtotime( is_array( $value ) ? reset( $value ) : $value );
			return date( $format, $time );

		else:

			$date = _array_get( $value, 'date' );

			// Se o campo está vazio
			if( !$date ):
				return '';
			endif;
			
			// Data inicial
			$time_init = strtotime( $field[ 'value' ][ 'date' ] );
	 	
	 		// Se o campo está sendo usado como período
			if( on( $field, 'isperiod' ) && !empty( $field[ 'value' ][ 'final' ] ) ):

				// Tempo final
				$time_final = strtotime( $field[ 'value' ][ 'final' ] );

				// Separador
				$glue = isset( $options[ 'glue' ] ) ? $options[ 'glue' ] : ' até ';

				// Prefix
				$prefix = isset( $options[ 'prefix' ] ) ? '<span class="prefix">' . $options[ 'prefix' ] . '</span>' : '';

				// Forma a frase
	 			return $prefix . '<span class="start">' . date( $format, $time_init ) . '</span> <span class="glue">' . $glue . '</span> <span class="stop">' . date( $format, $time_final ) . '</span>';

			else:
				
				// Retorna apenas o valor da data inical
				if( on( $options, 'strip' ) ):
					return date( $format, $time_init );
				else:
					return '<span class="start">' . date( $format, $time_init ) . '</span>';
				endif;
			
			endif;

		endif;
	
	}

	public static function add_files(){

	    $filesdir = Piki::url( '/', __FILE__ );

	    wp_enqueue_script( 'date-field-scripts', $filesdir . 'scripts.js', array( 'jquery' ), false, true );
	    wp_enqueue_style( 'date-field-styles', $filesdir . 'styles.css' );

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'isperiod' ] = array(
			'machine_name' => 'isperiod',
			'ftype' => 'boolean',
			'label' => 'Usar como período?:',
			'description' => 'Marcando esta opção, será apresentado um campo de término do período',
		);
		$fields[ 'widget' ] = array(
			'ftype' => 'select',
			'label' => 'Tipo de máscara:',
			'options' => array( 
				'normal' => 'Máscara', 
				'calendar' => 'Calendário' 
			),
			'description' => 'Se você marcar "Máscara", a data será formatada enquanto você digita. Já a opção "Calendário" fará o campo mostrar um popup para que a data seja selecionada.',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function dummy( $field ){
		$time = rand( strtotime( '1980-01-01 00:00:00' ), time() );
		return [ 'date' => date( 'd/m/Y', $time ) ];
	
	}

}
