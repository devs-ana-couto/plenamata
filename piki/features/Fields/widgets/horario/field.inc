<?php
class horario extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Horário';
	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		if( on( $field, 'interval' ) ):
			parent::add_attributes( $field, array( 'class' => 'inline-childs' ) );
		endif;
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		$value = isset( $field[ 'value' ][ 0 ] ) ? array_shift( $field[ 'value' ] ) : $field[ 'value' ];

		$t = new text();

		// Data
		$field[ 'maxlength' ] = 5; 
		$field[ 'ftype' ] = 'time-hm';

		// Início
		$start = $field;
		$start[ 'value' ] = $value[ 'start' ];
		parent::set_as_child( $start, 'start' );

		// Se não é um período, já retornamos o campo
		if( off( $field, 'interval' ) ):
			return $f->get_field( $start );
		endif;

		// Fim
		$stop = $field; 
		$stop[ 'value' ] = isset( $value[ 'stop' ] ) ? $value[ 'stop' ] : '';
		parent::set_as_child( $stop, 'stop' );
				
		$html = '<div class="child-item start"><span>De</span>' . $t->get_field( $start ) . '</div>';
		$html .= '<div class="child-item stop"><span> às </span>' . $t->get_field( $stop ) . '</div>';
		
		return $html;

	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		if( parent::is_required( $field ) && empty( $field[ 'value' ] ) ):
			
			$error = PikiField::getErrorMessage( $field, 'required' );
		
		elseif( !empty( $field[ 'value' ] ) && !preg_match( '/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/', $field[ 'value' ] ) ):
			
			$error = PikiField::getErrorMessage( $field, 'invalid' );
		
		elseif( !empty( $value ) ):
			
			list( $d, $m, $y ) = explode( '/', $field[ 'value' ] );
			if( !checkdate( $m, $d, $y ) ):
				$error = PikiField::getErrorMessage( $field, 'format', '00:00' );
			endif;
		
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}


	public static function save_meta( $field, $ID, $value ){

		if( $value[ 'start' ] == '' ):
			
			return;
		
		else:

			// Inicial
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value[ 'start' ] );
			
			// Fim
			if( on( $field, 'interval' ) ):
				call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_stop', $value[ 'stop' ] );
			endif;

		endif;
		
	
	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_stop' );
	}

	public static function change_meta_values( $field, $values, $ID, $parent ){

		$mname = $field[ 'machine_name' ];
		
		$starts = isset( $values[ $mname ] ) ? $values[ $mname ] : array();
				
		if( on( $field, 'interval' ) ):
			$stops = isset( $values[ $mname . '_stop' ] ) ? $values[ $mname . '_stop' ] : array();
		endif;

		$return = array();

		foreach( $starts as $weight => $start ):

			$return[ $weight ] = array();

			// Value
			$return[ $weight ][ 'start' ] = $start;
			
			// Ends
			if( $stops ):
				$return[ $weight ][ 'stop' ] = $stops[ $weight ];
			endif;

		endforeach;

		return $return;

	}

	public static function renderize_values( $field, $options=false ){

		// Valor vazio
		if( empty( $field[ 'value' ][ 'start' ] ) ):
			return '';
		endif;

		// Format 
		$format = isset( $field[ 'format' ] ) ? $field[ 'format' ] : 'H:i';
		
		// Start time
		$time_start = strtotime( $field[ 'value' ][ 'start' ] );

		if( on( $field, 'interval' ) && !empty( $field[ 'value' ][ 'stop' ] ) ):

			$time_stop = strtotime( $field[ 'value' ][ 'stop' ] );

			return '<span class="horario rounded start">' . date( $format, $time_start ) . '</span> <span class="div">às</span> <span class="horario rounded stop">' . date( $format, $time_stop ) . '</span>';

		else:

			return '<span class="horario rounded start">' . date( $format, $time_start ) . '</span>';

		endif;

	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		$fields[ 'interval' ] = array(
			'machine_name' => 'interval',
			'ftype' => 'boolean',
			'label' => 'Usar como intervalo?:',
			'description' => 'Marcando esta opção, será apresentado um campo de término do período',
		);
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}
}
