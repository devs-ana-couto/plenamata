<?php
class datahora extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Data e hora';
	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		parent::add_attributes( $field, array( 'class' => 'inline-childs' ) );
		return $field;
	}
	
	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// Constroi o campo
	public static function get_field( $field ){

		// Value
		$value = _array_get( $field, 'value' );
		if( isset( $value[0] ) ) $value = reset( $value );

		// Date
		$date = _array_get( $value, 'date' );

		if( !$date ):
			$val_date = $val_time = '';
		else:
			$time = strtotime( $date );
			$val_date = date( 'd/m/Y', $time );
			$val_time = date( 'H:i', $time );
		endif;
		
		$t = new text();

		// Data
		$date = $field; 
		$date[ 'maxlength' ] = 10; 
		$date[ 'value' ] = $val_date;		
		parent::set_as_child( $date, 'date' );
		$date[ 'ftype' ] = 'date';		
		if( isset( $field[ 'masktype' ] ) && $field[ 'masktype' ] == 'datepicker' ):
			parent::add_attributes( $date, array( 'masktype' => 'datepicker' ) );
		endif;

		// Hora (início)
		$hour = $field; 
		$hour[ 'maxlength' ] = 5; 		
		$hour[ 'value' ] = $val_time;
		$hour[ 'ftype' ] = 'time-hm';
		$hour_label = on( $field, 'showend' ) ? 'Início' : 'Horário';
		parent::set_as_child( $hour, 'hour' );

		
		$html = '<div class="child-item date"><span>Data:</span>' . $t->get_field( $date ) . '</div>';
		$html .= '<div class="child-item time"><span>'. $hour_label .':</span>' . $t->get_field( $hour ) . '</div>';
		
		// Término
		if( on( $field, 'showend' ) ):
			
			$end = $field;
			$end[ 'maxlength' ] = 5; 		
			$end[ 'value' ] = $field[ 'value' ][ 'end' ];
			$end[ 'ftype' ] = 'time-hm';
			parent::set_as_child( $end, 'end' );
			$html .= '<div class="child-item time"><span>Término:</span>' . $t->get_field( $end ) . '</div>';
		
		endif;

		return $html;

	}

	// Transforma a data para o formato de banco
	public static function format( $value, $format='Y-m-d' ){
		$time = strtotime( $value );
		if(!$time){
			return $value;
		}
		else{
			return date_i18n( $format, $time );
		}
	}

	// Validação do campo
	public static function validate( $field, $settings ){

		$error = '';

		$value = _array_get( $field, 'value' );
		$isEmpty = self::is_empty( $field );

		if( parent::is_required( $field ) && $isEmpty ):
			
			$error = PikiField::getErrorMessage( $field, 'required' );
		
		elseif( !$isEmpty ):

			if( !preg_match( '/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/', $value[ 'date' ] ) ):
			
				$error = PikiField::getErrorMessage( $field, 'invalid' );

			else:

				// Validando a data o formato
				$date = DateTime::createFromFormat( 'd/m/Y H:i', $value[ 'date' ] . ' ' . $value[ 'hour' ] );
				if( !$date ):
					$error = PikiField::getErrorMessage( $field, 'invalid' );
				endif;

			endif;
		
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}

	// Verifica se o campo está vazio
	public static function is_empty( $field ){
		return
			empty( $field[ 'value' ] )
			||
			(
				is_array( $field[ 'value' ] ) && 
				empty( $field[ 'value' ][ 'date' ] ) && 
				empty( $field[ 'value' ][ 'hour' ] )
			)
		;
	}

	public static function save_meta( $field, $ID, $value ){

		if( $value[ 'date' ] == '' ):
			
			return;
		
		else:

			// Juntando os campos
			$union = '';
			$union .= empty( $value[ 'date' ] ) ? '00:00:00' : $value[ 'date' ] . ' ';
			$union .= empty( $value[ 'hour' ] ) ? '00:00' : $value[ 'hour' ];
			
			// Resetando o formato
			$date = DateTime::createFromFormat( 'd/m/Y H:i', $union );
			
			// Criando o formato de banco
			$toinsert = $date->format( 'Y-m-d H:i:s' );
			
			// Inserindo no banco
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $toinsert );

			// Hora de término, se existir
			if( on( $field, 'showend' ) ):

				$end_value = empty( $value[ 'end' ] ) ? '' : $value[ 'end' ];

				call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_end', $end_value );
			
			endif;

		endif;
		
	
	}

	public static function change_meta_values( $field, $values, $data_type = 'post', $data_table = false ){

		$mname = $field[ 'machine_name' ];
		
		$dates = isset( $values[ $mname ] ) ? $values[ $mname ] : array();
		$ends = false;
		if( on( $field, 'showend' ) ):
			$ends = isset( $values[ $mname . '_end' ] ) ? $values[ $mname . '_end' ] : array();
		endif;

		$return = array();

		foreach( $dates as $weight => $date ):
			$return[ $weight ] = array(
				'date' => $date
			);
			if( $ends ):
				$return[ $weight ][ 'end' ] = isset( $ends[ $weight ] ) ? substr( $ends[ $weight ], 0, 5 ) : '';
			endif;
		endforeach;

		return $return;

	}

	public static function renderize_values( $field, $value, $options=false ){
		$format = isset( $options[ 'format' ] ) ? $options[ 'format' ] : 'd/m/Y';
		if( is_array( $value ) ) $value = array_shift( $value );
		return date( $format, strtotime( $value ) );
	}

	// Deleta os valores
	public static function delete_meta( $field, $ID ){
		// Remove o valor do estado
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] );
		// Remove o valor da cidade
		call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_end' );
	}

	public static function get_settings_fields( $values ){

		$fields = PikiFields::get_comum_fields();
		// Mostrar horário de término?
		$fields[ 'showend' ] = array(
			'label' => 'Mostrar hora de término?',
			'ftype' => 'boolean',
			'machine_name' => 'showend',
		);
		$fields[ 'masktype' ] = array(
			'ftype' => 'select',
			'label' => 'Tipo de máscara:',
			'options' => array( 'normal' => 'Normal', 'datepicker' => 'Pop up' ),
			'description' => 'Se você marcar "Normal", a data será formatada enquanto você digita. Já a opção "Pop up", fará o campo mostrar um calendário para que a data seja escolhida.',
		);
		$fields = PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}
}
