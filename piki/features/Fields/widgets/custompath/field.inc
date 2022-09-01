<?php
class custompath extends PikiField {
	
	function __construct(){

		// Label do campo
		self::set_label( 'Custom path' );
		// Configurações específicas do campo

	}

	// Configurações específicas do campo
	public static function set_confs( $field ){
		$field[ 'sqlrpc' ] = self::getReplacement();
		$field[ 'proccess_after' ] = true;
		$field[ 'validate' ][ 'format' ] = '__custompath_validate';
		$field[ 'validate' ][ 'unique' ] = true;
		$field[ 'collection' ] = [
			'type' => 'assoc_fields',
			'table' => 'custompath',
			'fields_desc' => [ 'realpath', 'custompath' ],
		];
		return $field;
	}

	// Get replacement
	public static function getReplacement(){
		return '%s';
	}

	// constroi o campo do tipo select
	public static function get_field($confs){
		$field = '<input type="text" name="'.$confs["name_html"].'" id="'.$confs["id"].'"';
		if(!isempty($confs["value"]["real_value"]["custompath"])){
			$field .= ' value="'.$confs["value"]["real_value"]["custompath"].'"';
		}
		set_field_attributes($field, $confs);
		$field .= " />";
		return $field;
	}

	// Validação do campo
	public static function validate( $field, $settings ){
		exit( 'implementar validação custompath' );
	}


	public static function execute($confs, $data){

		$user = get_loged_user_data();
		$owner = !$user ? 0 : $user["id"];
		
		//Data postada
		$posted = array_shift($data[$confs["name_request"]]["formated"]);
		includeClass("db");
		$db = new db();
		// Remove a url existente, caso exista
		$delete = $db->query("DELETE FROM {custompath} WHERE assoc_ctype='%s' AND assoc_id='%n'", array($confs["assoc_ctype"], $confs["assoc_id"]));
		// Inclui a nova url no banco
		$vars = array(
			$confs["assoc_ctype"] . "/" . $confs["assoc_id"], //realpath
			$posted, //custompath
			$confs["assoc_ctype"], //nome do tipo de conteudo
			$confs["assoc_id"], // Id do ítem associado
			$owner, // Id do usuário
		);

		// Faz a transação
		$db->query("INSERT INTO {custompath} SET realpath='%s', custompath='%s', assoc_ctype='%s', assoc_id='%n', owner='%n'", $vars);
		return true;
	}

	public static function delete($confs){
		$db = new db();
		$delete = $db->query("DELETE FROM {custompath} WHERE assoc_ctype='%s' AND assoc_id='%n'", array($confs["assoc_ctype"], $confs["assoc_id"]));
		if($delete===false){
			erro("dababase", 'Erro ao deletar os registros do campo custompath. Arquivo: custompath.field.inc, Método: custompath_delete, Query: ' . $delete->querys . ", Erro: " . mysql_error());
			return false;
		}
	}

	// Verifica se há uma url customizada, e se houver, retorna a mesma
	public static function __custompath_exists($url, $confs){

		// Faz a seleção da url original, se form uma url customizada
		includeClass("db");
		$db = new db();
		$result = $db->query("SELECT realpath, assoc_id, assoc_ctype FROM {custompath} WHERE custompath='%s'", array($url));

		// Se não houver nenhum registro, retorna falso
		if(!$result || $result === 0){
			return false;
		}

		$custompath = mysql_fetch_assoc($result);
		if(!$custompath){
			return false;
		}
		else{
			// No caso de edição, exclui a própria URL do select
			if(isSet($confs["assoc_id"]) && $custompath["assoc_ctype"] == $confs["assoc_ctype"] && $custompath["assoc_id"] == $confs["assoc_id"]){
				return false;
			}
			else{
				return true;
			}
		}
	}

	public static function __custompath_get_sugest($value){
		$others = __custompath_get_others($value);
		if(!$others){
			return $value . '-1';
		}
		else{
			$reurn_poss = '';
			$cont = 1;
			while($reurn_poss == ''){
				$possible = $value."-".$cont;
				if( !in_array($possible, $others) ){
					$reurn_poss = $possible;
				}
				$cont++;
			}
			return $reurn_poss;
		}
	}
}