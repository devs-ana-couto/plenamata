<?php
class calendar { 

	var $date; 
	var $time;
	var $days;
	var $descMonths;
	var $descActualMonth;
	var $descDaysWeek;
	var $descDaysWeekShort;
	var $actualDate;
	var $beforeDate;
	var $afterDate;
	var $activeDates;
	var $classCSS;
	var $callendarURL;
	var $contentURL;
	var $dbTable;
	var $condsQuery;
	var $activeWeekDays;
	var $ctype;
	
	public function __construct($date="") { 

		$this->classCSS = "calendario";
		
		$this->descMonths = array("", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
		$this->descDaysWeek = array("segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo");
		$this->descDaysWeekShort = array("D", "S", "T", "Q", "Q", "S", "S");
		
		$this->date = $date=="" ? date("Y-m-d") : date("Y-m-d", strtotime($date));
		$this->time = strtotime($this->date);
		$this->activeWeekDays = array();

	}
	public static function set_date($new_date) {  
		$this->date = $new_date;   
	}
	public function get_calendar($class="") {
			
		calendar::prepare_days_from_date();
		
		$this->descActualMonth = '<span class="mes">'.$this->descMonths[date("n", $this->time)] . '</span><span class="dia">' . date("Y", $this->time).'</span>';
		
		if($class!=""){
			$this->classCSS = $class;
		}
		return calendar::get_html_calendar();
	}
	public function prepare_days_from_date(){
			
		//Dia indicado
		$data_total_dias = date("t", $this->time);
		$data_mes = date("m", $this->time);
		$data_ano = date("Y", $this->time);
		$data_mes_ano = substr($this->date, 0, 8);
		
		//Primeiro dia do mes indicado
		$dia_ini = $data_mes_ano . "01";
		$dia_ini_time = strtotime($dia_ini);
		$dia_ini_diasemana = date("N", $dia_ini_time);
		
		//Último dia do mes indicado
		$dia_fim = substr($this->date, 0, 8) . $data_total_dias;
		$dia_fim_time = strtotime($dia_fim);
		$dia_fim_diasemana = date("N", $dia_fim_time);
		
		//Array com os dias do calendário
		$array_dias = array();
		
		//Dados do mês anterior
		$mes_anterior_ano = (int)$data_ano;
		$mes_anterior = (int)$data_mes-1;
		if($mes_anterior==0){ $mes_anterior = 12; $mes_anterior_ano -= 1; }
		$mes_ano_anterior = $mes_anterior_ano."-"._double($mes_anterior)."-";
		//Data do primeiro dia do mês anterior
		$data_mes_anterior = $mes_ano_anterior."01";
		//Preenche o array de dias com os dias do mês anterior
		if($dia_ini_diasemana != "7"){
			//Último dia do mês anterior
			$mes_anterior_diafim = date("t", strtotime($data_mes_anterior));
			//Dia início do mês anterior a ser mostrado
			$mes_anterior_diaini = $mes_anterior_diafim - $dia_ini_diasemana + 1;
			for($d=$mes_anterior_diaini; $d<=$mes_anterior_diafim; $d++){
				$array_dias[] = array("dia" => $d, "tipo" => "pre", "data" => $mes_ano_anterior._double($d));
			}
			
			//Data início usada no select dos nodes caso haja dias do mês anterior
			$data_inicio_query =  $mes_anterior_ano."-"._double($mes_anterior)."-"._double($mes_anterior_diaini);
		}
		else{
			//Data início usada no select dos nodes, no caso de não haver dias do mês anterior
			$data_inicio_query = $dia_ini;
		}
		
		//Preenche o array de dias com os dias do mês solicitado
		for($d=1; $d<=$data_total_dias; $d++){
			$array_dias[] = array("dia"=>$d, "tipo"=>"atual", "data"=>$data_mes_ano._double($d) );
		}
		
		//Preenche o array de dias com os dias do mês posterior
		$mes_posterior_ano = (int)$data_ano;
		$mes_posterior = (int)$data_mes+1;
		if($mes_posterior==13){ $mes_posterior = 1; $mes_posterior_ano += 1; }
		$mes_ano_posterior = $mes_posterior_ano."-"._double($mes_posterior)."-";
		$data_mes_posterior = $mes_ano_posterior."01";
		$mes_posterior_diaini = 1;
		$mes_posterior_diafim = 42 - count($array_dias);
		
		for($d=$mes_posterior_diaini; $d<=$mes_posterior_diafim; $d++){
			$array_dias[] = array("dia" => $d, "tipo" => "pos", "data"=>$mes_ano_posterior._double($d));
		}
		
		//Data fim usada no select dos nodes
		$data_fim_query = $mes_posterior_ano."-"._double($mes_posterior)."-"._double($mes_posterior_diafim);

		$datas_ativas = calendar::get_calendar_db_itens("data", $data_inicio_query, $data_fim_query);

		$this->days = $array_dias;
		$this->actualDate = $this->date;
		$this->beforeDate = $data_mes_anterior;
		$this->afterDate = $data_mes_posterior;
		$this->activeDates =  $datas_ativas;

		return true;
	}
	function get_html_calendar(){
		
		$total_dias = count($this->days);
		$week_days = array("", "dom", "seg","ter","qua","qui","sex","sab");

		$htmlReturn = '
		<table rel="'.$this->callendarURL.'" class="alpha-calendar '.$this->classCSS.'">
			<thead>
				<tr>
					<td colspan="7">
						<div class="loader"><span></span></div>
						<div class="head">
							<a rel="'.$this->beforeDate.'" class="button voltar" title="Mês anterior"><span>Mês anterior</span></a>
							<p class="desc-date">'.$this->descActualMonth.'</span></p>
							<a rel="'.$this->afterDate.'" class="button avancar" title="Próximo mês"><span>Próximo mes</span></a>
						</div>
					</td>
				</tr>
				<tr class="week">
		';
		foreach($this->descDaysWeekShort as $dia){
			$htmlReturn .= '<th><span>'.$dia.'<span></th>';
		}
		$htmlReturn .= '
				</tr>
			</thead>
			<tbody>
				<tr>
		';
		
		$passo = 1;
		foreach($this->days as $id => $dia){

			//Classe a ser inserida no icone da data
			$ico_class = array();
			$td_class = array();
			
			//Se o dia é ativo
			if(array_key_exists($week_days[$passo], $this->activeWeekDays)){
				//Campo que mostrará quantos períodos estão disponíveis no dia
				$fieldLasts = '<input type="hidden" value="" />';
				//Total de períodos possíveis
				$periods = $this->activeWeekDays[$week_days[$passo]];
				//Se ainda restam períodos disponíveis
				if(array_key_exists($dia["data"], $this->activeDates) && $this->activeDates[$dia["data"]] >= $periods){
					$td_class[] = "reserved";
				}
				//Se todos os períodos foram reservados
				else{
					$td_class[] = "enabled";
				}
				$input_periods = '<input type="hidden" value="' . ($periods-$this->activeDates[$dia["data"]]) . '" name="periods" />';
				
				//Tipo de tag do ítem
				$tag = "a";
			}
			else{

				$ico_class[] = "disabled";
				$td_class[] = "disabled";
				
				//Tipo de tag do ítem
				$tag = "span";
			}
			
			if(date("Y-m-d")==$dia["data"]){
				$ico_class[] = 'atual';
				$td_class[] = 'dia-hoje';
			}

			if(count($ico_class) > 0){
				$classInsere = ' class="' . implode(' ', $ico_class) . '"';
			}
			else{
				$classInsere = '';
			}
			
			$htmlData = '<'.$tag.' rel="'.$this->contentURL.$dia["data"].'"'.$classInsere.'>'.$input_periods.$dia["dia"].'</'.$tag.'>';
			$htmlReturn .= '<td class="'.$dia["tipo"]." ".implode(" ",$td_class).'" rel="'.$dia["data"].'">'.$htmlData.'</td>';
			
			if($passo == "7"){ 
				$passo = 1; 
				if($id < ($total_dias-1)){
					$htmlReturn .= '</tr><tr>'; 
				}
			}
			else{ 
				$passo = $passo+1; 
			}
		}

		$htmlReturn .= '
				</tr>
			</tbody>
		</table>
		';

		return $htmlReturn;

	}

	function get_calendar_db_itens($field_data="data", $date_ini, $date_fim){
		
		includeClass("db");
		$db_dates = new db();
		$conds = "(data >= '".$date_ini."' AND data <= '".$date_fim."')";
		if($this->condsQuery){
			$conds .= " AND (".$this->condsQuery.")";
		}
		$db_dates->select($this->dbTable, $field_data . " AS date",  $conds);
		$dates = array();

		if( !$db_dates->result ):
			return $dates;
		endif;

		while($item = mysql_fetch_array($db_dates->result)){
			$dates[$item["date"]] += 1;
		}

		return $dates;

	}

}