<?php
class pager{
	
	var $indice;
	var $total_itens;
	var $total_pages;
	var $total_page_itens;
	var $total_links;
	var $base_link;

	function __construct($indice, $total_itens, $total_page_itens, $total_links=5, $base_link=""){
		
		// Indice da paginação
		if($indice == "" || $indice === 0 || $indice === "0"){
			$this->indice = 1;
		}
		else{
			$this->indice = $indice;
		}

		// Total de ítens existentes
		$this->total_itens = (int)$total_itens;

		// Total de ítens mostrados por página
		$this->total_page_itens = (int)$total_page_itens;
		
		// Base dos links
		if($base_link===false || $base_link == ""){
			$this->base_link = get_permalink()."pf={i}";
		}
		else{
			$this->base_link = $base_link;
		}

		// Total de links
		$this->total_links = $total_links;

	}

	function get_pager(){

		$indices_links = pager::get_indices_links();

		if(!$indices_links){
			return false;
		}
		$pager_links = '';
		foreach($indices_links as $k => $link){
			$pager_links .= '<a href="'.pager::get_link_url($link).'" class="link-item'.($link==$this->indice?" atual":"").($k==0?" first":"").'">'.$link.'</a>';
		}

		$back_arrow = pager::get_prev_arrow();
		$forw_arrow = pager::get_fowr_arrow();
		
		return array(
			"back_arrow" => $back_arrow,
			"forw_arrow" => $forw_arrow,
			"links" => $pager_links,
			"indice" => $this->indice,
			"total_pages" => pager::get_total_pages(),
		);
	}

	function get_indices_links(){
		
		$this->total_pages = pager::get_total_pages();
		
		//Se só existe uma página, não há necessidade de paginação
		if($this->total_pages == 1){
			return false;
		}
		//Se existem mais links, do que número de páginas, não há necessidade de calculo
		else if($this->total_pages <= $this->total_links){
			$first_link = 1;
			$last_link = $this->total_pages;
		}
		//Se não, calculamos o início e o fim dos links
		else{
			$first_link = $this->indice - (($this->total_links-1)/2);
			$last_link = $this->indice + (($this->total_links-1)/2);
		}

		if($last_link > $this->total_pages){
			$last_link = $this->total_pages;
			$first_link = $last_link - ($this->total_links-1);
		}

		if($first_link < 1){
			$first_link = 1;
			$last_link = $this->total_links;
		}

		$links = array();
		for($lks=$first_link; $lks<=$last_link; $lks++){
			$links[] = $lks;
		}

		return $links;
	}

	function get_prev_arrow(){
		if($this->indice <= 1){
			return '<span class="back-arrow off">« Anterior</span>';
		}
		else{
			return '<a href="'.pager::get_link_url($this->indice-1).'" class="back-arrow on">« Anterior</a>';
		}
	}

	function get_fowr_arrow(){
		if($this->indice >= $this->total_pages){
			return '<span class="forw-arrow off">Próxima »</span>';
		}
		else{
			return '<a href="'.pager::get_link_url($this->indice+1).'" class="forw-arrow on">Próxima »</a>';
		}
	}

	function get_total_pages(){
		if(!is_numeric($this->total_page_itens)){
			global $total_page_itens;
			$this->total_page_itens = $total_page_itens;
		}
		return ceil($this->total_itens/$this->total_page_itens);
	}

	function get_link_url($indice){
		return str_replace('{i}', $indice, $this->base_link);
	}
}
?>