<?php
class schedule extends PikiField {
	
	// Construtor
	function __construct(){
		// Label do campo
		self::$label = 'Programção';
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

		add_filter( 'calendar', array( 'schedule', 'calendarSettings' ), 10, 2 );

		$value = self::getFieldValue( $field );

		// Tab to be opened
		$defaultTab = empty( $value[ 'start' ] ) && empty( $value[ 'stop' ] ) && empty( $value[ 'dias' ] ) && !empty( $value[ 'dates' ] ) ? '1' : '0';

		$html = '
		<div class="schedule-field-wrapper" class="abas piki-sanfona" data-default-item="'. $defaultTab .'">
			<div id="schecule-interval">
				<h2><a href="#schecule-interval">Intervalo de datas</a></h2>
				<div class="entry-content single clearfix">
					<fieldset>
						<header class="clearfix">
							<legend>Selecione o período:</legend>';

							// Data Inicial
							$start_date = $field;
							$start_date[ 'maxlength' ] = 10;
							parent::set_as_child( $start_date, 'start' );
							parent::add_attributes( $start_date, array( 'masktype' => 'datepicker', 'placeholder' => '__/__/____' ) );
							$start_date[ 'ftype' ] = 'date';
							$start_date[ 'value' ] = _array_get( $value, 'start', '' );
							$html .= '<div class="start"><em>Data<span> inicial</span>:</em>' . text::get_field( $start_date ) . '</div>';

							// Divisão
							$html .= '<div class="div"> à </div>';

							// Data Final
							$stop_date = $field;
							$stop_date[ 'maxlength' ] = 10;
							parent::set_as_child( $stop_date, 'stop' );
							parent::add_attributes( $stop_date, array( 'masktype' => 'datepicker', 'placeholder' => '__/__/____' ) );
							$stop_date[ 'ftype' ] = 'date';		
							$stop_date[ 'value' ] = _array_get( $value, 'stop', '' );	
							$html .= '<div class="stop"><em>Data final:</em>' . text::get_field( $stop_date ) . '</div>';
			
						$html .= '
						</header>
						<div class="content">
							<legend>Informe os horários:</legend>
							<div class="weekdays abas piki-sanfona auto-size-headers">
							';

								// Horário padrão
								$html .= '<div id="schecule-month-day-default">
									<div class="tab">
										<label>
											<span class="text">Padrão</span>
										</label>
										<button type="button" class="dashicons dashicons-clock horarios" title="Definir horários"></button>
									</div>
									<div class="entry-content single clearfix">
										'. self::getHorariosForm( $field, 'default', $value, 'Horário comum aos dias:' ) .'
									</div>
								</div>';

								// Dias da semana
								$weekdays = self::getMontyDays();
								foreach( $weekdays as $kday => $day ):
																		
									$fieldday = $field;
									parent::set_as_child( $fieldday, $kday, 'dias' );
									$html .= '<div id="schecule-month-day-'. $kday .'">
										<div class="tab">
											<input type="checkbox" id="'. $fieldday[ 'id' ] .'" name="'. $fieldday[ 'name_html' ] .'" class="head-check"'. ( on( $value[ 'dias' ], $kday ) ? 'checked="checked"' : '' ) .' />
											<label for="'. $fieldday[ 'id' ] .'">'. $day .'</label>
											<button type="button" class="dashicons dashicons-clock horarios" title="Definir horários"></button>
										</div>
										<div class="entry-content single clearfix">';
									$html .= self::getHorariosForm( $field, $kday, $value, 'Horários de '. $day . ( $kday !== 'sabado' && $kday !== 'domingo' ? '-feira' : '' ) . ':', $value );
									
									$html .= '</div>
									</div>';
								
								endforeach;

		$html .= '			</div>
						</div>
					</fieldset>
				</div>
			</div>
		';

		// Get closest date
		$calendarMonth = date( 'Y-m' );
		
		if( !empty( $value[ 'dates' ] ) ):

			$befores = array();
			$afters = array();

			foreach( $value[ 'dates' ] as $date => $hours ):
				$_date = date( 'Y-m', strtotime( $date ) );
				if( $_date == $calendarMonth ):
					unset( $befores );
					unset( $afters );
					break;
				elseif( $_date < $calendarMonth ):
					$befores[] = $_date;
				else:
					$afters[] = $_date;
				endif;
			endforeach;
		
		endif;

		if( !empty( $afters ) ):
			$afters = array_unique( $afters );
			asort( $afters );
			$calendarMonth = array_shift( $afters );
		elseif( !empty( $befores ) ):
			$befores = array_unique( $befores );
			asort( $befores );
			$calendarMonth = array_pop( $befores );
		endif;

		$Calendar = new Calendar( 'programacao', $calendarMonth . '-01' );
		$html .= '
			<div id="schecule-specifics">
				<h2><a href="#schecule-specifics">Datas específicas</a></h2>
				<div class="entry-content single clearfix">
					<fieldset>
						'. $Calendar->getCalendar( $calendarMonth ) .'
						<div class="horarios-wrapper">
							<legend>Horários para o dia <strong></strong>:</legend>
							<div class="horarios clearfix">
								'. self::getDatesForm( $field, $value ) .'
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
		';

		self::add_files( $field );

		return $html;

	}

	public static function calendarSettings( $calendars, $key ){
		// Id específico para o campo
		$calendars[ $key ] = array(
			'id' => 'calendar-field-' . $key,
			'enableAll' => true
		);
		return $calendars;
	}

	// Intervals hours form
	public static function getHorariosForm( $field, $name, $value, $label ){

		// Horários
		$field = self::prepareHour( $field );
		parent::set_as_child( $field, $name, 'horarios' );
		
		$HTML = '<div class="horarios clearfix">
			<legend>'. $label .'</legend>';
			
			// Items
			$items = _array_get( $value[ 'horarios' ], $name );

			// At last one field
			empty( $items ) && $items[] = '';

			foreach( $items as $ki => $item ):
				$_field = $field;
				$_field[ 'value' ] = $item;
				$HTML .= self::getLineForm( $_field );
			endforeach;
		
		$HTML .= self::getAddButton();
		$HTML .= '
		</div>';

		return $HTML;

	}

	// Specific dates form
	public static function getDatesForm( $field, $value ){

		// Horários
		$field = self::prepareHour( $field );
		
		$_model = $field;
		$_model = self::prepareHour( $_model );
		$_model[ 'value' ] = '';
		parent::set_as_child( $_model, 'model', 'dates' );
		$HTML .= '
		<div class="line-value model clearfix">
			' . text::get_field( $_model ) . '
			<button type="button" class="remove" data-action="remove-horario" title="Remover horário"><span class="dashicons dashicons-trash remove-button"></span></button>
		</div>';

		foreach( $value[ 'dates' ] as $date => $hours ):

			foreach( $hours as $hour ):

				$_field = $field;
				$_field[ 'value' ] = $hour;
				parent::set_as_child( $_field, $date, 'dates' );
				$HTML .= self::getLineForm( $_field, $date );

			endforeach;
			
		endforeach;

		$HTML .= self::getAddButton();

		return $HTML;

	}

	public static function prepareHour( $field ){

		$field[ 'index' ] = '';
		$field[ 'noId' ] = true;
		$field[ 'ftype' ] = 'horario';		
		parent::add_attributes( $field, array( 'placeholder' => '__:__', 'class' => array( 'ftype-time-hm' ) ) );

		return $field;

	}

	public static function getLineForm( $field, $rel = false ){
		return '<div class="line-value clearfix"'. ( $rel ? 'rel="'. $rel .'"' : '' ) .'>
			' . text::get_field( $field ) . '
			<button type="button" class="remove" data-action="remove-horario" title="Remover horário"><span class="dashicons dashicons-trash remove-button"></span></button>
		</div>';
	}

	public static function getAddButton(){
		return '<button type="button" class="add" data-action="add-horario" title="Adicionar horário"><span class="dashicons dashicons-plus-alt add-button"></span></button>';
	}

	public static function getMontyDays(){
		return array(
			'segunda' => __( 'Segunda', 'piki' ),
			'terca' => __( 'Terça', 'piki' ),
			'quarta' => __( 'Quarta', 'piki' ),
			'quinta' => __( 'Quinta', 'piki' ),
			'sexta' => __( 'Sexta', 'piki' ),
			'sabado' => __( 'Sábado', 'piki' ),
			'domingo' => __( 'Domingo', 'piki' ),
		);
	}

    // Extract dates
    public static function extractDates( $values ){

        if( empty( $values ) ) return false;

        $dates = array();
        foreach( $values as $value ):

            $_dates = self::extractDatesItem( $value );
            
            if( $_dates ):
                $dates = $dates + $_dates;
            endif;
            
        endforeach;
        $dates = array_unique( $dates );
        asort( $dates );

        return $dates;

    }

    // Extract dates
    public static function extractDatesItem( $value ){
        
        // Dias da semana
        $weekdays = array( 
            '1' => 'segunda', 
            '2' => 'terca',
            '3' => 'quarta', 
            '4' => 'quinta',
            '5' => 'sexta',
            '6' => 'sabado',
            '7' => 'domingo' 
        );

        // Active days
        $days = _array_get( $value, 'dias' );

        // Dates array
        $dates = array();
        
        // Interval
        $start = _array_get( $value, 'start' );
        $end = _array_get( $value, 'stop' );

        // Walling thrue interval
        if( $start && $end && !empty( $days ) ):

            // Check first day
            $_start_time = strtotime( str_replace( '/', '-', $start ) );
            $_start_wday = $weekdays[ date( 'N', $_start_time ) ];
            if( isset( $days[ $_start_wday ] ) ):
                // Data inicial
                $dates[] = date( 'Y-m-d', $_start_time );
            endif;

            $endtime = strtotime( str_replace( '/', '-', $end ) );            

            while( strtotime( str_replace( '/', '-', $start ) ) <= $endtime ):

                $nexttime = strtotime( '+1 day', strtotime( str_replace( '/', '-', $start ) ) );
                
                $start = date( 'Y-m-d', $nexttime );

                $wday = $weekdays[ date( 'N', $nexttime ) ];

                if( isset( $days[ $wday ] ) ):
                    $dates[] = $start;
                endif;
           
            endwhile;

        endif;

        // Specifics
        $_dates = _array_get( $value, 'dates' );
        if( !empty( $_dates ) ):
            foreach( $_dates as $_date => $hours ):                
                if( !empty( $hours ) && !empty( reset( $hours ) ) ):
                    $dates[] = $_date;
                endif;
            endforeach;
        endif;

        if( empty( $dates ) ): 
            return false;
        endif;
        
        $dates = array_unique( $dates );

        asort( $dates );

        return $dates;

    }

	// Transforma a data para o formato de banco
	public static function format( $value, $format = 'Y-m-d' ){
		$time = strtotime( $value );
		if(!$time){
			return $value;
		}
		else{
			return date_i18n( $format, $time );
		}
	}

	// Validação do campo
	public static function validate( $field, $action ){

		$error = '';

		if( parent::is_required( $field ) && self::is_empty( $field ) ):
			$error = PikiField::getErrorMessage( $field, 'required' );
		endif;

		if( $error != '' ):
			return $error;
		endif;

		return true;

	}

	// Verifica se o campo está vazio
	public static function is_empty( $field ){
		return
			empty( $field[ 'value' ][ 'start' ] )
			&&
			empty( $field[ 'value' ][ 'stop' ] )
			&&
			empty( $field[ 'value' ][ 'dias' ] )
		;
	}

	// Unserialize values
	public static function change_meta_values( $field, $meta ){

		// Get values
		$_values = _array_get( $meta, $field[ 'machine_name' ] );
		
		if( empty( $_values ) ) return false;

		// Unserialize each value
		foreach( $_values as &$value ):
		
			$value = unserialize( $value );

			if( !empty( $value[ 'start' ] ) ):
				$value[ 'start' ] = self::dbToDate( $value[ 'start' ] );
			endif;

			if( !empty( $value[ 'stop' ] ) ):
				$value[ 'stop' ] = self::dbToDate($value[ 'stop' ] );
			endif;

			if( isset( $value[ 'dates' ][ 'model' ] ) ):
				unset( $value[ 'dates' ][ 'model' ] );
			endif;
		
		endforeach;

		return $_values;
	
	}

	// Extract value from field array
	public static function getFieldValue( $field ){

		if( !empty( $field[ 'value' ] ) ):
			$value = isset( $field[ 'value' ][ 'start' ] ) ? $field[ 'value' ] : reset( $field[ 'value' ] );
		else:
			$value = false;
		endif;
		
		if( $value ):
			unset( $value[ 'dates' ][ 'model' ] );
		endif;
	
		return !$value ? self::getDefaultValue() : $value;
	
	}

	// Default field value
	public static function getDefaultValue(){
		return array(
			'start' => '',
			'stop' => '',
			'dias' => array(),
			'horarios' => array(
				'default' 	=> array(),
				'segunda' 	=> array(),
				'terca' 	=> array(),
				'quarta' 	=> array(),
				'quinta' 	=> array(),
				'sexta' 	=> array(),
				'sabado' 	=> array(),
				'domingo' 	=> array(),
			),
			'dates' => array()
		);
	}

	public static function save_meta( $field, $ID, $value ){

		// Remove model
		unset( $value[ 'dates' ][ 'model' ] );

		// Days allways have an array
		if( !isset( $value[ 'dias' ] ) ):
			$value[ 'dias' ] = array();
		endif;

		// Format start and stop
		if( !empty( $value[ 'start' ] ) ):
			$value[ 'start' ] = self::dateToDB( $value[ 'start' ] );
		endif;
		if( !empty( $value[ 'stop' ] ) ):
			$value[ 'stop' ] = self::dateToDB($value[ 'stop' ] );
		endif;

		// Empty date
		if( isset( $value[ 'dates' ][ 'false' ] ) ):
			unset( $value[ 'dates' ][ 'false' ] );
		endif;
		foreach( $value[ 'dates' ] as $date => $hours ):
			foreach( $hours as $kh => $hour ):
				if( empty( $hour ) ):
					unset( $value[ 'dates' ][ $date ][ $kh ] );
				endif;
			endforeach;
			if( empty( $value[ 'dates' ][ $date ] ) ):
				unset( $value[ 'dates' ][ $date ] );
			endif;
		endforeach;

		// Remove empty hours
		foreach( $value[ 'horarios' ] as $wday => &$horarios ):
			foreach( $horarios as $h => &$horario ):
				if( empty( $horario ) ):
					unset( $value[ 'horarios' ][ $wday ] );
				endif;
			endforeach;
		endforeach;
		
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $value );
	
	}

	public static function dateToDB( $val ){
		$p = explode( '/', $val );
		return implode( '-', array_reverse( $p ) );
	}

	public static function dbToDate( $val ){
		$p = explode( '-', $val );
		return implode( '/', array_reverse( $p ) );
	}

	public static function renderize_values( $field, $options = array() ){

		$start = _array_get( $field[ 'value' ], 'start' );
		$stop = _array_get( $field[ 'value' ], 'stop' );
		$wdays = _array_get( $field[ 'value' ], 'dias' );
		$hours = _array_get( $field[ 'value' ], 'horarios' );
		$dates = _array_get( $field[ 'value' ], 'dates' );

		// Empty
		if( ( empty( $start ) || empty( $stop ) || empty( $hours ) ) && empty( $dates ) ):
			return false;
		endif;

		// Separate hours
		$alones = array_intersect_key( $hours, $wdays );
		$defaults = _array_get( $hours, 'default' );
		$common = !empty( $defaults ) ? array_diff_key( $wdays, $alones ) : false;
		$total_blocks = count( $alones ) + ( $common ? 1 : 0 );

		// Type of widget
		if( empty( $start ) || empty( $stop ) || empty( $wdays ) || empty( $hours ) || $total_blocks > 2 ):
			$widgetType = 'complex';
		else:
			$widgetType = 'simple';
		endif;

		$HTML = '<div class="schedule-weeks-wrapper">';

		// Interval
		if( $widgetType == 'simple' ):
			
			$time1 = strtotime( self::dateToDB( $start ) );
			$time2 = strtotime( self::dateToDB( $stop ) );

			if( date( 'm', $time2 ) == date( 'm', $time1 ) ):
				$_desc_dates = date( 'd', $time1 ) . ' a ' . date_i18n( 'd \d\e F', $time2 );
			else:
				$_desc_dates = date_i18n( 'd \d\e F', $time1 ) . ' a ' . date_i18n( 'd \d\e F', $time2 );
			endif;
			
			$HTML .= 
			'<em class="desc-interval">'. $_desc_dates .'</em>
			<ul class="list-results">
				<li class="show-result">';
			
			if( $common ):
				$HTML .= '<div>
					<em>'. self::weekDaysLabels( array_keys( $common ) ) .'</em>
					<p>'. str_replace( ':', 'h', implode( ' - ', $defaults ) ) .'</p>
				</div>';
			endif;

			if( $alones ):

				foreach( $alones as $alwday => $hours ):
					$HTML .= '<div>
						<em>'. self::weekDaysLabels( array( $alwday ) ) .'s</em>
						<p>'. str_replace( ':', 'h', implode( ' - ', $hours ) ) .'</p>
					</div>';
				endforeach;
				
			endif;

			$HTML .= '</li>
			</ul>';

		// Full calendar
		else:
		
			// Dates items
			$items = self::formatDatesItem( $field[ 'value' ] );

			// Total de items
			$total = count( $items );

			if( $total < 3 ):
				
				$_desc_dates = '';
				$_lines = array();
				$_dates = array_keys( $items );
				
				// First
				$time1 = strtotime( reset( $_dates ) );
				$_lines[] = '<div rel="'. reset( $_dates ) .'">
					' . ( $total == 2 ? '<strong>'. date( 'd/m', $time1 ) .'</strong>' : '' ) .'
					<em>'. ucfirst( date_i18n( 'l', $time1 ) ) .'</em>
					<p>'. implode( ' - ', str_replace( ':', 'h', reset( $items ) ) ) .'</p>
				</div>';

				if( $total === 1 ):

					$_desc_dates = date_i18n( 'd \d\e F', $time1 );

				else:

					$time2 = strtotime( end( $_dates ) );

					if( date( 'm', $time2 ) == date( 'm', $time1 ) ):
						$_desc_dates = date( 'd', $time1 ) . ' e ' . date_i18n( 'd \d\e F', $time2 );
					else:
						$_desc_dates = date_i18n( 'd \d\e F', $time1 ) . ' e ' . date_i18n( 'd \d\e F', $time2 );
					endif;

					$_lines[] = '<div rel="'. end( $_dates ) .'">
						<strong>'. date( 'd/m', $time2 ) .'</strong>
						<em>'. ucfirst( date_i18n( 'l', $time2 ) ) .'</em>
						<p>'. implode( ' - ', str_replace( ':', 'h', end( $items ) ) ) .'</p>
					</div>';
				
				endif;
				
				$HTML .= '<em class="desc-interval">'. $_desc_dates .'</em>';
				$HTML .= '<ul class="list-results">
							<li class="show-result">';
				$HTML .= 		implode( $_lines );
				$HTML .= '	</li>';
				$HTML .= '</u>';

			else:

				// Scripts
			    wp_enqueue_script( 'shchedule-scripts', Piki::url( 'theme.js', __FILE__ ), array( 'jquery' ) );

			    // Return calendar
				$HTML .= self::buildCalendar( $items, $options );

			endif;

		endif;

		$HTML .= '</div>';
		
		// Styles
		wp_enqueue_style( 'shchedule-styles', Piki::url( 'theme.css', __FILE__ ) );

		return $HTML;
    	
	}

	public static function weekDaysLabels( $items ){

		$labels = diassemana::getOptions();
		$keyeds = diassemana::weekDaysKeys( true );
		$sequential = true;
		
		$s = 0;
		foreach( $items as &$item ):
			$ki = $keyeds[ $item ];
			if( $s == 0 ): 
				$s = $ki;
			else:
				$s++;
				( $ki !== $s ) && $sequential = false;
			endif;
			$item = strtolower( $labels[ $item ] );
		endforeach;

		// Sequential
		if( $sequential && count( $items ) > 1 ):
			$last = end( $items );
			$value = reset( $items ) . ' à ' . $last . ( $last != 'sábado' && $last != 'domingo' ? '-feira' : '' );
		// Apenas um valor
		elseif( count( $items ) === 1 ):
			$value = array_shift( $items );
		// Dois valores
		elseif( count( $items ) === 2 ):
			$value = implode( 's e ', $items ) . 's';
		// Mais de dois valores
		else:
			$last = array_pop( $items );
			$value = implode( 's, ', $items ) . 's e ' . $last . 's';
		endif;
		
		return ucfirst( $value );

	}

	public static function sameVals( $array ){

	}

	public static function buildCalendar( $dates, $options = array() ){

		// Divid by weeks
    	$Weeks = self::dividByWeeks( $dates );

		// Theme
		$theme = _array_get( $options, 'theme', 'complete' );
			
		if( $theme == 'small' ):
		
			$keys_dates = array_keys( $dates );
			if( $total === 1 ):
				$desc_dates = date_i18n( 'd \d\e F', strtotime( reset( $keys_dates ) ) );
			else:
				$desc_dates = date( 'd/m', strtotime( reset( $keys_dates ) ) ) . ' a ' . date( 'd/m', strtotime( end( $keys_dates ) ) );
			endif;
		
			$HTML .= '<em class="desc-interval">'. $desc_dates .'</em>';
    	
    	endif;
		
		$HTML .= '<div class="calendar '. $theme .'" data-theme="'. $theme .'">
			<div class="slick-slider">';
				foreach( $Weeks as $semana ):
		    	$HTML .= '<div class="semana">';
						if( $theme === 'complete' ):
						$HTML .= '<header class="clear"><span class="desc-month">' . $semana[ 'desc_month' ] . '</span><span class="toright"><span class="desc-week">Semana ' . $semana[ 'week_count' ] . '</span> <span class="desc-days">'. $semana[ 'start_date' ] .' a '. $semana[ 'end_date' ] .'</span></span></header>';
						endif;
					$HTML .= '<ul class="clear">';
						foreach( $semana[ 'days' ] as $day ):
						$HTML .= '<li><a href="#' . date( 'Y-m-d', $day[ 'time' ] ) . '" class="day '. ( $day[ 'status' ] === false ? 'disabled' : 'enabled' ) .'" rel="' . date( 'Y-m-d', $day[ 'time' ] ) . '" data-hours="'. ( !$day[ 'hours' ] ? 'false' : implode( ',', $day[ 'hours' ] ) ) .'"><strong title="'. ucfirst( date_i18n( 'l', $day[ 'time' ] ) ) .'">' . ucfirst( date_i18n( 'D', $day[ 'time' ] ) ) . '</strong><em>' . date( ( $theme == 'small' ? 'd/m' : 'j' ), $day[ 'time' ] ) . '</em></a></li>';
						endforeach;
					$HTML .= '</ul>
				</div>';
				endforeach;
			$HTML .= '</div>
		</div>
		<ul class="list-results">';
		foreach( $dates as $date => $hours ):
			$time = strtotime( $date );
			$HTML .= '
			<li class="show-result" rel="'. $date .'">
				<div>
					<strong>'. date( 'd/m', $time ) .'</strong>
					<em>'. ucfirst( date_i18n( 'l', $time ) ) .'</em>
					<p>'. implode( ' - ', str_replace( ':', 'h', $hours ) ) .'</p>
				</div>
			</li>
			';
		endforeach;
		$HTML .= '</ul>
		';

		return $HTML;

	}

	public static function weekDay( $i ){
        // Dias da semana
        $w = diassemana::weekDaysKeys();
        return $w[ $i ];
	}

    // Extract and format dates and hours
    public static function formatDatesItem( $value ){

        // Active days
        $days = _array_get( $value, 'dias' );

        // Dates array
        $dates = array();
        
        // Interval
        $start = _array_get( $value, 'start' );
        $end = _array_get( $value, 'stop' );

        // Walling thrue interval
        if( $start && $end && !empty( $days ) ):

        	// Format dates interval
        	$start = self::dateToDB( $start );
        	$end = self::dateToDB( $end );        	

            // Check first day
            $start_time = strtotime( $start );
            $start_hours = self::getDateHours( $start_time, $value );
            if( $start_hours ):
            	$dates[ $start ] = $start_hours;
            endif;

            // End time
            $endtime = strtotime( $end );            

            while( strtotime( $start ) <= $endtime ):

                $nexttime = strtotime( '+1 day', strtotime( $start ) );
                
                $start = date( 'Y-m-d', $nexttime );
               
                $next_hours = self::getDateHours( $nexttime, $value );
				if( $next_hours ):
	            	$dates[ date( 'Y-m-d', $nexttime ) ] = $next_hours;
	            endif;
           
            endwhile;

        endif;

        // Specifics
        $_dates = _array_get( $value, 'dates' );
        if( !empty( $_dates ) ):
            foreach( $_dates as $_date => $hours ):
                if( !empty( $hours ) && !empty( reset( $hours ) ) ):
                	if( isset( $dates[ $_date ] ) ):
                		$dates[ $_date ] = array_unique( $dates[ $_date ] + $hours );
                	else:
                		$dates[ $_date ] = $hours;
                	endif;
                endif;
            endforeach;
        endif;

        // Empty
        if( empty( $dates ) ) return false;
        
        // Order
        ksort( $dates );

        return $dates;

    }

    // Divid by weeks
    public static function dividByWeeks( $dates ){

        global $wpdb;
       
        // Todas as datas
        $alldates = array();
        foreach( $dates as $date => $hours ):
            $newtime = strtotime( $date );
            if( !in_array( $date, $alldates ) ):
                $alldates[ $newtime ] = $date;
            endif;
        endforeach;        

        ksort( $alldates, TRUE );

        // Chaves das datas
        $alltimes = array_keys( $alldates );

        // Start
        $start = array_shift( $alltimes );
        $start_month_day = (int)date( 'N', $start );
        if( $start_month_day > 0 ):
            $start = strtotime( '-'. ( $start_month_day - 1 ) .' day', $start );
        endif;

        // Stop
        $stop = empty( $alltimes ) ? strtotime( '+7 day', $start ) : array_pop( $alltimes );
        $stop_month_day = (int)date( 'N', $stop );
        if( $stop_month_day < 7 ):
            $stop = strtotime( '+'. ( 7 - $stop_month_day ) .' day', $stop );
        endif;

        // Tempo atual do loop
        $actual_time = $start;
        
        // Semanas
        $weeks = array();
        
        // Semana atual do loop
        $actual_week = array();
        
        // Loop
        $loop = 1;
        
        // Se adiciona a semana
        $add_week = false;
        
        // Percorre o intervalo de tempo
        while ( $actual_time <= $stop ):
            
            // Data atual do loop
            $item_date = date( 'Y-m-d', $actual_time );

            // Se o dia da semana tem evento
            $is_active = in_array( $item_date, $alldates );
            
            // Adiciona o evento e seu status no array da semana
            $actual_week[ $actual_time ] = $is_active;
            
            // Informa que a semana deve ser adicionada
            if( $is_active ):
                $add_week = true;
            endif;
            
            // Se a semana está completa, resetamos e começamos outra
            if( count( $actual_week ) === 7 ):
                
                // Se existem algum dia com evento na semana
                if( $add_week ):
                    $weeks[] = $actual_week;
                endif;
                
                // Resetamos a semana
                $add_week = false;
                $actual_week = array();
            
            endif; 
            
            // Acrescentamos um dia
            $actual_time = strtotime( '+1 day', $actual_time );
        
        endwhile;

        // Retorno
        $return = array();

        // Formata as semanas e os dias
        $week_count = 1;
        foreach( $weeks as $cont => $week ):

            // Array com os tempos
            $week_times = array_keys( $week );
            
            // Array para adicionar ao retorno
            $toadd = array(
                'start_date' => date( 'd/m', reset( $week_times ) ),
                'end_date' => date( 'd/m', end( $week_times ) ),
                'week_count' => $week_count,
                'desc_month' => ucfirst( date_i18n( 'F Y', $week_times[ 0 ] ) ),
                'days' => array(),
            );
            
            // Percorre e formata os dias
            $add_week = false;
            foreach( $week as $time => $status ):

            	$date = date( 'Y-m-d', $time );
                
                $toadd[ 'days' ][] = array(
                    'status' => $status === true,
                    'time' => $time,
                    'date' => $date,
                    'hours' => isset( $dates[ $date ] ) ? $dates[ $date ] : false
                );
                
                if( $status === true ):
                    $add_week = true;
                endif;
            
            endforeach;
            
            if( $add_week === true ):
                
                $return[] = $toadd;
                $week_count++;
            
            endif;
        
        endforeach;

        // Retorno
        return $return;
    }

    public static function getDateHours( $time, $value ){

    	// Always time
    	if( !is_numeric( $time ) ):
    		$time = strtotime( str_replace( '/', '-', $start ) );
    	endif;

		// Check first day
        $wday = self::weekDay( date( 'N', $time ) );

        if( on( $value[ 'dias' ], $wday ) ):
        	$horarios = _array_get( $value[ 'horarios' ], $wday, $value[ 'horarios' ][ 'default' ] );
        	return empty( $horarios ) ? false : $horarios;
        endif;

        return false;

    }

	public static function add_files( $field ){

		// Libraries
		Piki::add_library( 'sanfona' );

		// Scripts and Styles
	    wp_enqueue_script( 'shchedule-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
	    wp_enqueue_style( 'shchedule-styles', Piki::url( 'styles.css', __FILE__ ) );
	   
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		PikiFields::add_comum_field( $fields, 'required' );
		PikiFields::set_fields_values( $fields, $values );
		return $fields;

	}

	public static function installed(){
		global $wpdb;
		$table = PikiField::getTable( 'schedule' );
		return !empty( $wpdb->get_var( "SHOW TABLES LIKE '$table'" ) );
	}

	public static function install(){
		echo '<pre>';
		echo 'Implementar installer' . "\r\n";
		exit();
		$sql = file_get_contents( 'source/table.sql' );
	}

	public static function uninstall(){

	}

}
