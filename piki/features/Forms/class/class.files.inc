<?php
class files {

	var $path;
	var $directory;
	var $name;
	var $size;
	var $type;
	var $extension;
	var $filetypes;
	var $erro;

	function __construct($path=""){

		// Se foi configurado um array de extensões permitidas, ele é usado
		global $piki_filetypes;
		if(is_array($piki_filetypes)){
			$this->filetypes = $piki_filetypes;
		}
		else{
			// Tipos de arquivos permitidos por padrão
			$this->filetypes = array("jpg", "jpeg", "png", "gif", "xls", "ppt", "pptx", "doc", "docx", "pdf");
		}

		// Se o endereço do arquivo foi passado
		if($path != ""){
				files::init_file($path);
		}

	}

	function init_file($path){
		
		// Verifica a extensão do arquivo
		files::validate_extension($path);
		// Verifica o diretório do arquivo
		files::validate_directory($path);
		
		// Verifica se o arquivo existe
		if(!is_file($path)){
			$this->erro = "O arquivo '".$path."' não existe.";
			return "erro_filenotexists";
		}
		
	}

	function upload($file, $dir, $name){
	}

	function upload_file_form_sended($fileinfo, $filename="", $path=""){
		// Verifica se o arquivo foi postado
		if( isempty($fileinfo) ){
			$this->erro = "O arquivo informado não foi postado.";
			return "erro_empty";
		}
		// Se o diretório de destino não é informado, o diretório default é usado
		if( $path == "" ){
			$path = basedir() . "/" . PATHFILE;
		}
		else{
			files::validate_directory($path);
		}
		// Se o caminho não terminar com '/', ela é acrescentada
		if( substr($path, -1, 1) != "/" ){ $path .= "/"; }
		// Se o diretório não tiver permissão de escrita
		if( !is_writable($path) ){
			$this->erro = "O diretório de destino ('".dirname($file)."') não tem permissão de escrita.";
			return "erro_privilege";
		}

		$name_up = $filename=="" ? $fileinfo["name"] : $filename;

		$file_name = files::get_new_file_name($path, $name_up);
		$file_path = $path . $file_name;
		
		if(!move_uploaded_file($fileinfo["tmp_name"], $file_path)){
			$this->erro = "Erro ao fazer o upload do arquivo ".$file_path.". Erro desconhecido.";
			return "erro_unknown";
		}
		else{
			return array(
				"filename" => $file_name,
				"filepath" => $file_path,
			);	
		}
	}

	function validate_file_form_sended($file, $types="", $size=0){
		
		// Valida a extensão do arquivo
		files::validate_extension($file);
		
		// Valida o tamanho do arquivo
		files::validate_size($file);

		
		if($validate_extension !== true){
			$this->erro = "Erro ao fazer o upload do arquivo ".$file_path.". Erro desconhecido.";
			return $validate_extension;
		}
		if( $valid_extension !== true ){

			exit('{"status":"erro","message":"'. $class->erro .'"}');	
		}
	}

	function delete($file){
		if(!is_file($file)){
			$this->erro = "O arquivo '".$file."' não existe.";
			return "erro_filenotexists";
		}
		if(!is_writable(dirname($file)) ){
			$this->erro = "O diretório de destino ('".dirname($file)."') não tem permissão de escrita.";
			return "erro_privilege";
		}
		if(!(unlink($file))){
			$this->erro = "Erro ao remover o arquivo ".$origem.". Erro desconhecido.";
			return "erro_unknown";
		}
	}

	function copy($origem, $destino){
		if(!is_file($origem)){
			$this->erro = "O arquivo '".$origem."' não existe.";
			return "erro_filenotexists";
		}
		if( !is_dir($destino) ){
			$this->erro = "O diretório de destino ('".dirname($destino)."') não existe.";
			return "erro_directory";
		}
		if(!is_writable($destino) ){
			$this->erro = "O diretório de destino ('".dirname($destino)."') não tem permissão de escrita.";
			return "erro_privilege";
		}
		if(!copy($origem, $destino)){
			$this->erro = "Erro ao copiar o arquivo ".$origem." para  ".$destino.". Erro desconhecido.";
			return "erro_unknown";
		}
		return true;
	}

	function move($origem, $destino){
		if(!is_file($origem)){
			$this->erro = "O arquivo '".$origem."' não existe.";
			return "erro_filenotexists";
		}
		if( !is_dir(dirname($destino)) ){
			$this->erro = "O diretório de destino ('".dirname($destino)."') não existe.";
			return "erro_directory";
		}
		
		if(is_dir($destino) && !is_writable($destino) ){
			$this->erro = "O diretório de destino ('".dirname($destino)."') não tem permissão de escrita.";
			return "erro_privilege";
		}

		if(!rename($origem, $destino)){
			$this->erro = "Erro ao mover o arquivo ".$origem." para  ".dirname($destino).". Erro desconhecido.";
			return "erro_unknown";
		}
		return true;
	}
	
	function replace($origem, $replacement){
	}

	function validate_type($file=""){
		if( $file != "" ){
		}
	}

	function validate_extension($file){

		if( files::is_posted_form_field($file) ){
			$this->name = $file["name"];
			$this->filesize = $file["size"];
		}
		else{
			// Retira as contra-barras
			$file = str_replace('\\', '/', $file);
			// Nome do arquivo
			$this->name = basename($file);
			// Se for um arquivo
			if(is_file($file)){
				// Seta o tamanho do arquivo na classe
				$this->filesize = files::get_file_size($file);
				// Seta o caminho do arquivo na classe
				$this->path = $file;
			}
		}

		// Se houve falha na captura do nome
		if( !$this->name ){
			$this->erro = "Nome de arquivo inválido";
			return "erro_basename";
		}
		
		// Extensão do arquivo
		$this->extension = strtolower(array_pop(explode(".", $this->name)));
		// Se o arquivo tem uma extensão inválida
		if( !in_array($this->extension, $this->filetypes) ){
			$this->erro = "O arquivo não é valido. São permitidos somente arquivos com as extensões '".implode(", ",$this->filetypes)."'.";
			return "erro_extension";
		}

		return true;
	}

	function get_file_size($file=""){
		if( files::is_posted_form_field($file) ){
			return $file["size"];			
		}
		else {
			if( $file == "" ){
				if( !is_null($this->filesize) ){
					return $this->filesize;
				}
			}
			else{
				if(is_file($path)){
					return filesize($path);
				}
			}
			return false;
		}
	}

	function validate_directory($path){
		// Diretório onde se encontra o arquivo
		$this->directory = dirname($path);
		// Se o diretório está incorreto
		if( !is_dir($this->directory) ){
			$this->erro = "O diretório '".$this->directory."' não existe.";
			return "erro_directory";
		}
	}

	function validate_size($file, $maxsize=""){
		
		$size = files::get_file_size($file);

		// Se a classe não conseguiu ler o tamanho do arquivo
		if(!$size){ 
			$this->erro = "Não foi possível encontrar o tamanho do arquivo";
			return "erro_getfilesize";
		}

		else if($maxsize == ""){
			global $piki_maxfilesize;
			if( $size > $piki_maxfilesize ){
				$this->erro = "O arquivo ultrapassou o limite de peso.";
				return "erro_filesize";
			}
		}
		else{
			if( $size > $maxsize ){
				$this->erro = "O arquivo ultrapassou o limite de peso.";
				return "erro_filesize";
			}
		}
	}

	function prepare_dir_to_upload(){
	}

	// Verifica se o arquivo informado foi postado por um formulário
	function is_posted_form_field($file){
		if( is_array($file) && array_key_exists("tmp_name", $file) ){
			return true;
		}
		else{
			return false;
		}
	}


	//Retorna o nome do arquivo a ser gravado
	function get_new_file_name($dir, $file_name){
		//URL default do arquivo
		$url_default = $dir."/".$file_name;
		//Se o arquivo já existe, é gerado um novo nome
		if(is_file($url_default)){
			$peaces = explode(".", $file_name);
			$extensao = array_pop($peaces);
			$name = implode(".", $peaces);
			$new_name = "";
			$cont = 1;
			while($new_name == "") {
				$name_test = $name."(".$cont.")".".".$extensao;
				$url_test = $dir."/".$name_test;
				if( !is_file($url_test)){
					$new_name = $name_test;
				}
				$cont++;
			}
		}
		else{
			$new_name = $file_name;			
		}
		return $new_name;
	}
}