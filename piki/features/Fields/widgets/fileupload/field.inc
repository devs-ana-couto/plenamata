<?php
class fileupload extends PikiField {
	
	function __construct(){

		// Label do campo
		self::$label = 'Upload de arquivos';

	}
		
	// Configurações específicas do campo
	public static function set_confs( $field ){

		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'proccess_after' ] = true;
		if( !is_array( $field[ 'filetypes' ] ) ):
			$field[ 'filetypes' ] = self::$piki_filetypes;
		endif;
		if( isempty( $field[ 'maxlength' ] ) ):
			$field["validate"]["maxlength"] = self::$piki_maxfilesize;
		endif;
		$field[ 'db_confs' ] = array(	
			'table' => 'arquivos'
		);
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	public static function get_field( $confs ){
		
		$value = $confs["value"]["real_value"];
		
		$field =  '<div class="hold-custom-input-file ftype-fileupload">';
		$field .= '<input type="file" id="'.$confs["id"].'" name="'.$confs["name_html"].'" class="custom-style" />';
		$name_file = (!isempty($value["url"])) ? $value["url"] : "";
		$field .= '<input type="hidden" value="'.$value["id"].'" name="'. get_subfield_html_name($confs, "id").'" id="'. get_subfield_html_id($confs, "id").'" class="id-file" />';
		$field .= '<input type="hidden" value="'.$name_file.'" name="'. get_subfield_html_name($confs, "url").'" id="'. get_subfield_html_id($confs, "url").'" class="url-file" style="display:none;" />';
		$field .= '<input type="hidden" value="0" name="'. get_subfield_html_name($confs, "delete").'" id="'. get_subfield_html_id($confs, "delete").'" class="delete-file" />';
		$field .= '</div>';
		
		return $field;

	}

	public static function get_values($ctype_table, $ctype_keys, $confs){

		$subs = __fileupload_get_subfields_names("db");
		
		$fields = "assoc_id," . implode(",", $subs);
		$conditions .= "assoc_ctype='".$ctype_table."' AND " . implode_field_conditions_values("assoc_id", $ctype_keys);
		
		$db = new db();
		$result = $db->select($confs["db_confs"]["table"], $fields, $conditions);
		
		if($result){
			$values_return = array();
			if(mysql_num_rows($result) > 0){
				while($values = mysql_fetch_assoc($result)){
					$id = array_shift($values);
					$item = __fileupload_get_show_values_item($values, $confs);
					$values_return[$id][$item["weight"]] = $item;
				}
			}
		}
		else{
			print("<pre>");
			echo("Ocorreu um erro no processamento.");
			echo mysql_error();
			var_dump( $db->querys );
			exit;
		}
		return $values_return;
	}

	public static function get_requested_value($confs, $data){
		$keys = __fileupload_get_subfields_names("request");
		$values = array();
		foreach($keys as $key):
			$values[$key] = $data[$confs["name_request"]."_".$key][$confs["index"]];
		endforeach;
		$values["file"] = $data[$confs["name_request"]][$confs["index"]];
		
		return  __fileupload_organize_post_data($values);
	}

	// Validação do campo
	public static function validate( $field, $action ){

		$errors = array();
		
		echo '<pre>';
		var_dump( 'implementar validação' );
		exit;
		
	}

	public static function execute($confs, $data){

		$values = $data[$confs["name_request"]]["formated"];
		$fulldir = prepare_dir_files(PATHFILE);

		//Deleta os ítens que não serão mais usados e captura o maior 'weight'
		$weight_insert = __fileupload_delete_files($confs, $values) + 1;
		
		foreach($values as $key => $value){
			if(!isempty($value["file"]["name"])){
				$file_name = get_new_name_file($fulldir, $value["file"]["name"]);
				$file_full_location = $fulldir."/".$file_name;
				$file_rel_location = url_files."/".$file_name;
				if(!move_uploaded_file($value["file"]["tmp_name"], $file_full_location)){
					print("<pre>");
					print("Não foi possível fazer o upload do arquivo <br />");
					print($value["file"]["tmp_name"] . "<br />");
					print($file_full_location . "<br />");
					exit;
				}
				else{
					$query_fields = "assoc_ctype='".$confs["assoc_ctype"]."', assoc_id='".$confs["assoc_id"]."', url='".$file_rel_location."', weight='".$weight_insert."', posted=now()";
					$db = new db();
					if(!$db->insert($confs["db_confs"]["table"], $query_fields)){
						print("<pre>");
						echo('Erro ao inserir o arquivo no banco');
						echo($db->querys);
						echo($db->mysql_error());
						exit;
					}
					$weight_insert++;
				}
			}
		}
	}

	public static function __fileupload_delete_files($confs, $values){
		//Deleta os ítens que foram postados
		$posted_itens_ids = array();
		foreach($values as $key_item => $value){
			if(__fileupload_is_deletable_file($value)){
				__fileupload_delete_item($value);
			}
			if(!isempty($value["id"])){
				$posted_itens_ids[$key_item] = $value["id"];
			}
		}
		//Deleta os ítens que não foram postados de volta
		$actual_itens = array_shift(fileupload_get_values($confs["assoc_ctype"], $confs["assoc_id"], $confs));
		$max_weight = 0;
		if(count($actual_itens) > 0){
			foreach($actual_itens as $key => $item){
				if(!in_array($item["real_value"]["id"], $posted_itens_ids)){
					__fileupload_delete_item($item["real_value"]);
				}
				else{
					if($item["real_value"]["weight"] > $max_weight){
						$max_weight = $item["real_value"]["weight"];
					}
				}
			}
		}
		return $max_weight;
	}

	public static function __fileupload_is_deletable_file($value){
		if(
			!isempty($value["id"])
			&&
			(
				($value["delete"]===1||$value["delete"]==="1")
				||
				!isempty($value["file"]["name"])
			)
		){
			return true;
		}
		else{
			return false;
		}
	}

	public static function __fileupload_delete_item($value){
		//Deleta o arquivo
		if( is_file(basedir() . "/" . $value["url"]) ){
			if(!unlink(basedir() . "/" . $value["url"])){
				exit("Não foi possível remover o arquvio " . $value["url"]);
			}
		}
		//Remove o registro no banco de dados
		$db = new db();
		if(!$db->delete("arquivos", "id='".$value["id"]."'")){
			exit("Não foi possível remover o arquivo do banco de dados");
		}
	}

	public static function __fileupload_is_same_file($value){
		if( !isempty($value["id"]) && $value["delete"]!==1 && $value["delete"]!=="1" && isempty($value["name"])){
			return true;
		}
		else{
			return false;
		}
	}

	public static function __fileupload_organize_post_data($values){
		$fields = __fileupload_get_subfields_names("request");
		$fields[] = "file";
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

	public static function __fileupload_get_show_values_item($values, $confs){
		global $default_date_format;
		$real_values = array();
		$show_values = array();
		foreach($values as $name => $value){
			$real_values[$name] = $value;
			switch($name){
				case "url":
					$show_values[$name] = '<a href="'.baseurl()."/".$value.'">'.basename($value).'</a>';
				break;
				case "posted":
					$show_values[$name] = date($default_date_format, strtotime($value));
				break;
				default:
					$show_values[$name] = $value;
				break;
			}
		}
		return array(
			"real_value" => $real_values,
			"show_value" => $show_values,
			"weight" => $values["weight"],
		);
	}

	public static function __fileupload_get_subfields_names($type="db"){
		if($type=="db"){
			return array("id", "url", "weight", "posted");
		}
		else if($type=="request"){
			return array("id", "url", "delete");
		}
	}

}