<?php
class timeinterval extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Intervalo de tempo' );
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

	// Constrói o campo
	public static function get_field($confs){
		if(is_array($confs["value"])){
			$value = $confs["value"];
		}
		else if(is_array($confs["default_value"])){
			$value = $confs["default_value"];
		}
		$fields = array();
		$key_fields = __timeinterval_get_subfields_names();
		foreach($key_fields as $id){
			$html_name = get_subfield_html_name($confs, $id);
			$html_id = get_subfield_html_id($confs, $id);
			$field = '<input type="'.($id=="id"?"hidden":"text").'" name="'.$html_name.'" id="'.$html_id.'" value="'.(empty($value["real_value"][$id])?"0":$value["real_value"][$id]).'"';
			$confs_attr = array("type" => $confs["type"], "attr" => array("class"=>$id));
			$field .= get_field_attributes($confs_attr);
			$field .= " />";
			$fields[$id] = $field;
		}
		$fields["self"] = '<input type="hidden" id="'.get_field_id( $confs ).'" />';
		return $fields;
	}

	public static function get_requested_value($confs, $data){
		$keys = __timeinterval_get_subfields_names();
		$values = array();
		foreach($keys as $key):
			$values[$key] = $data[$confs["name_request"]."_".$key][$confs["index"]];
		endforeach;
		return __timeinterval_organize_post_data($values);
	}

	public static function get_values($ctype_table, $ctype_keys, $confs){

		$subs = __timeinterval_get_subfields_names();
		
		$fields = "assoc_id,id," . implode(",", $subs);
		$conditions .= "assoc_ctype='".$ctype_table."' AND " . implode_field_conditions_values("assoc_id", $ctype_keys);
		$conditions .= " ORDER BY weight ASC";

		//assoc_id,id,id,inicio,fim,dom,seg,ter,qua,qui,sex,sab,weight
		
		$db = new db();
		$result = $db->select($confs["db_confs"]["table"], $fields, $conditions);
		
		$values_return = array();
		if(mysql_num_rows($result) > 0){
			while($values = mysql_fetch_assoc($result)){
				$id = array_shift($values);
				$item = __timeinterval_get_show_values_item($values, $confs);
				$values_return[$id][] = $item;
			}
		}
		return $values_return;
	}

	public static function execute($confs, $data){

		$subfields = __timeinterval_get_subfields_names();
		
		//Data postada
		$posted = $data[$confs["name_request"]]["formated"];

		//Deleta os ítens que não serão mais usados'
		__timeinterval_delete_not_posted_itens($confs, $posted);
		
		//Inicia a classe que fará as transações com o banco
		$negocio = new db();
		//Insere os registros
		foreach($posted as $key => $value){
			$query_fields = array();
			$method = "insert";
			foreach($subfields as $field){
				if($field=="id"){
					if(!isempty($value["id"]) && $value["id"] !== "0" && $value["id"] !== 0){
						$query_fields[] = "id='".$value["id"]."'";
						$method = "update";
					}
				}
				else if($field=="weight"){
					$query_fields[] = "weight='".$key."'";
				}
				else{
					$query_fields[] = $field . "='".$value[$field]."'";
				}
			}
			$query_fields[] = "assoc_ctype='".$confs["assoc_ctype"]."'";
			$query_fields[] = "assoc_id='".$confs["assoc_id"]."'";
			$query_fields_str = implode(",",$query_fields);

			if($method == "insert"){
				$negocio->insert($confs["db_confs"]["table"], $query_fields_str);
			}
			else{
				$negocio->update($confs["db_confs"]["table"], $query_fields_str, "id='".$value["id"]."'");
			}
		
		}
		return true;
	}

	public static function delete($confs){
		$delete = new db();
		$result = $delete->delete($confs["db_confs"]["table"], "assoc_ctype='".$confs["assoc_ctype"]."' and assoc_id='".$confs["assoc_id"]."'");
		if(!$result){
			print("<pre>");
			var_dump('Erro ao deletar os registros do campo timeinterval');
			echo mysql_error();
			echo $delete->querys;
			exit;
		}
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		
		// Retira os ítens que não serão validados;
		unset( $values[ 'id' ], $values[ 'weight' ] );
		// Array com os ítens que serão validados
		$subfields = array(
			"inicio" => array_shift( $values ),
			"fim" => array_shift( $values ),
			"dias" => $values,
		);
		// Array com os possívels erros
		$errors = array();
		// Passa pelos subvalores do campo
		foreach( $subfields as $subfield => $value ):
			// Valida cada subvalor do campo
			$notvalid = __timeinterval_validate_subfield_value( $field, $value, $subfield );
			// Se há erro, insere o mesmo no array de erros
			if( $notvalid ):
				$errors[] = $notvalid;
			endif;
		endforeach;
		// Se existem erros
		if( count( $errors ) > 0 ):
			return $errors;
		endif;
		return true;
	}

	public static function renderize_field($html){
		$html_return = '
		<div class="dias">
			<div class="dia seg">SEG'.$html["seg"].'</div>
			<div class="dia ter">TER'.$html["ter"].'</div>
			<div class="dia qua">QUA'.$html["qua"].'</div>
			<div class="dia qui">QUI'.$html["qui"].'</div>
			<div class="dia sex">SEX'.$html["sex"].'</div>
			<div class="dia sab">SAB'.$html["sab"].'</div>
			<div class="dia dom">DOM'.$html["dom"].'</div>
		</div>
		';
		$html_return .= "<span>, das </span>" . $html["inicio"] . "<span> às </span>" . $html["fim"];
		$html_return .= $html["id"] . $html["self"];
		return $html_return;
	}

	// Faz a validação dos subvalores postados em um campo
	function __timeinterval_validate_subfield_value($field, $value, $subfield){

		// Array com as configurações do erro
		$erro = array();
		// Array de validações
		foreach($field["validate"] as $type => $conf){
			if(!array_key_exists("type", $erro)){
				switch($type){
					//Verifica se o campo está vazio
					case "required":
						if($subfield=="inicio"||$subfield=="fim"){
							if(isempty($value)){
								$erro["type"] = $type;
							}
						}
						else{
							if( $value["seg"]=="0" && $value["ter"]=="0" && $value["qua"]=="0" && $value["qui"]=="0" && $value["sex"]=="0" && $value["sab"]=="0" && $value["dom"]=="0"){
								$erro["type"] = $type;
							}
						}
					break;
					//Verifica se o formato do campo é válido
					case "format":
						if($subfield=="inicio"||$subfield=="fim"){
							if(!validate_hour_format($value)){
								$erro["type"] = $type;
							}
						}
					break;
					//Verifica se o valor do campo é válido
					case "value":
						if($subfield=="inicio"||$subfield=="fim"){
							if(!validate_hour_value($value)){
								$erro["type"] = $type;
							}
						}
					break;
				}
			}
		}
		if(array_key_exists("type", $erro)){
			$erro["message"] = __timeinterval_get_field_message($field, $erro[ "type" ], $subfield);
			$erro["id"] = __timeinterval_get_field_id($field, $subfield);
			return $erro;
		}
		return false;
	}

	function __timeinterval_get_field_message( $field, $type_erro, $subfield ){
		$messages = get_field_message( $field, $type_erro );
		return $messages[ $subfield ];
	}

	function __timeinterval_get_field_id( $field, $subfield ){	
		if($subfield=="inicio" || $subfield=="fim"){
			return get_subfield_html_id( $field, $subfield );
		}
		else{
			return get_field_id( $field );
		}
	}

	function __timeinterval_delete_not_posted_itens( $confs, $values ){
		//Deleta os ítens que foram postados
		$posted_itens_ids = array();
		foreach($values as $key_item => $value){
			if(!isempty($value["id"])){
				$posted_itens_ids[] = $value["id"];
			}
		}
		$actual_itens_ids = __timeinterval_get_actual_itens_ids($confs["assoc_ctype"], $confs["assoc_id"], $confs);
		$itens_ids_to_delete = array_diff($actual_itens_ids,  $posted_itens_ids);
		if(count($itens_ids_to_delete) > 0){
			$conditions = implode_field_conditions_values("id", $itens_ids_to_delete, $concat="OR");
			$negocio = new db();
			if(!$negocio->delete($confs["db_confs"]["table"], $conditions)){
				print("<pre>");
				var_dump(mysql_error());
				echo $negocio->querys;
				exit;
			}
		}
		return true;
	}

	function __timeinterval_get_actual_itens_ids($ctype_table, $ctype_keys, $confs){
		
		$conditions .= "assoc_ctype='".$ctype_table."' AND " . implode_field_conditions_values("assoc_id", $ctype_keys);
		$db = new db();
		$result = $db->select($confs["db_confs"]["table"], "id", $conditions);
		$ids_return = array();
		if(mysql_num_rows($result) > 0){
			while($values = mysql_fetch_assoc($result)){
				$ids_return[] = $values["id"];
			}
		}
		if(count($ids_return > 0)){
			return $ids_return;
		}
		else{
			return false;
		}
	}

	function __timeinterval_get_show_values_item($values, $confs){
		$fields = __timeinterval_get_subfields_names();
		$real_value = array();
		foreach($values as $name => $value){
			if(!isempty($value) && $name != "weight"){
				//Valor real
				$real_value[$name] = $value;
			}
		}
		if(count($real_value) < 1){
			return false;
		}
		else{
			return array(
				"real_value" => $real_value,
				"show_value" => __timeinterval_get_show_value($real_value),
				"weight" => isset($value["weight"]) ? $value["weight"] : 0,
			);
		}
	}

	function __timeinterval_get_show_hour_interval($start, $end){
		$hora = (int)array_shift(explode(":",$start));
		$time_to_show .= ($hora>1?"das ":"de ") . substr($start, 0, 5);
		$time_to_show .= " às " . substr($end, 0, 5);
		return $time_to_show;
	}

	function __timeinterval_get_show_value($value){

		$descs = __timeinterval_get_desc_values();
		$time_to_show = __timeinterval_get_show_hour_interval($value["inicio"], $value["fim"]);
		
		unset($value["id"]);
		unset($value["inicio"]);
		unset($value["fim"]);
		unset($value["weight"]);
		
		$days_to_show = array();
		$keys_value = array_keys($value);
		$total_days = count($value);
		$count = 0;
		
		while(count($value) > 0){
			$key = $keys_value[$count];
			$item = $value[$key];
			if($item == 1){
				$sequence = array();
				$sequence[] = $key;
				unset($value[$key]);
				$busca = true;
				foreach($value as $key_int => $item_int){
					if($busca===true && $item_int==="1"){
						$sequence[] = $key_int;
						unset($value[$key_int]);
					}
					else{
						$busca = false;
					}
				}
				if(count($sequence)==1){
					$days_to_show[] = $descs[$sequence[0]];
				}
				else if(count($sequence)==2){
					$days_to_show[] = $descs[$sequence[0]];
					$days_to_show[] = $descs[$sequence[1]];
				}
				else if(count($sequence)==$total_days){
					$days_to_show[] = "todos os dias";
				}
				else{
					$days_to_show[] = "de " . $descs[array_shift($sequence)] . " à " . $descs[array_pop($sequence)];
				}
			}
			else{
				unset($value[$key]);
			}
			$count++;
		}
		return implode_itens($days_to_show) . ", " . $time_to_show;
	}

	function __timeinterval_organize_post_data($values){
		$fields = __timeinterval_get_subfields_names();
		$total = count( $values[$fields[0]] );
		$return = array();
		for($t=0; $t<$total; $t++){
			$item = array();
			foreach($fields as $key){
				$item[$key] = $values[$key][$t];
			}
			$return[] = $item;
		}
		return $return;
	}

	function __timeinterval_get_desc_values($indice="dias"){
		$values = array(
			"dias" => array(
				"dom" => "Domingo",
				"seg" => "Segunda",
				"ter" => "Terça",
				"qua" => "Quarta",
				"qui" => "Quinta",
				"sex" => "Sexta",
				"sab" => "Sábado",
			),
		);
		$values["abrev"] = array_keys($values["dias"]);
		return $values[$indice];
	}

	function __timeinterval_get_subfields_names(){
		return array("id", "inicio", "fim", "dom", "seg", "ter", "qua", "qui", "sex", "sab", "weight");
	}

	function __timeinterval_get_active_days($values){
		$keys = array_keys($values);
		if(array_key_exists("real_value", $keys)){
			$values = array($values);
		}
		$actives_days = array();
		foreach($values as $key => $item){
			foreach($item["real_value"] as $name => $value){
				if($name != "inicio" && $name != "fim" && $name != "weight"){
					if($value == "1"){
						$actives_days[$name][] = array(
							"id"=>$item["real_value"]["id"],
							"inicio"=>$item["real_value"]["inicio"],
							"fim"=>$item["real_value"]["fim"]
						);
					}
				}
			}
		}
		return $actives_days;
	}

	function __timeinterval_get_weekday_hours($values, $date){
		$active_days = __timeinterval_get_active_days($values);
		$weekday = date("w", strtotime($date));
		$abrev_week_days = __timeinterval_get_desc_values("abrev");
		$intervals_day = $active_days[$abrev_week_days[$weekday]];
		if( is_array($intervals_day) ){
			$select_hours = array();
			foreach($intervals_day as $interval){
				$select_hours[$interval["id"]] = __timeinterval_get_show_hour_interval($interval["inicio"], $interval["fim"]);
			}
			return $select_hours;
		}
		else{
			return false;
		}
	}

}