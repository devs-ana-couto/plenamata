<?php

class PikiFlickr_Options_Page extends scbAdminPage {

	function setup() {

		$this->args = array(
			'page_title' => 'Piki Flickr Gallery Settings',
			'menu_title' => 'Piki Flickr',
			'page_slug' => 'pikiflickr',
		);
	}

	function validate( $options ) {
		return $options;
	}

	function page_content() {
		$rows = array(
			array(
				'title' => 'Flickr API Key',
				'type' => 'text',
				'name' => 'apikey_text',
				'desc' => '<br />API Key do Flickr',
			),

			array(
				'title' => 'Flickr User ID:',
				'type' => 'text',
				'name' => 'userid_text',
				'desc' => '<br />Para descobrir a sua, <a href="http://idgettr.com/" target="_blank" title="idGett">clique aqui</a>',
			), 

			array(
				'title' => 'Flickr API Secret:',
				'type' => 'text',
				'name' => 'apisecret_text',
			),
		);

		$out =
		 html( 'h3', 'Dados da sua conta no Flickr' )
		.$this->table( $rows );
		
		$rows = array(
			array(
				'title' => 'Ítens por linha',
				'type' => 'text',
				'name' => 'itensperline',
				'desc' => '<br />Total de álbuns por linha',
			),
		);

		$out .=
		 html( 'h3', 'Paginação' )
		.$this->table( $rows );
		
		$rows = array(
			array(
				'title' => 'Ítens por página',
				'type' => 'text',
				'name' => 'total_page_itens',
				'desc' => '<br />Número de álbuns mostrado em cada página.',
			),
			array(
				'title' => 'Número de links',
				'type' => 'text',
				'name' => 'total_links',
				'desc' => '<br />Número de links de páginas mostrados.',
			),
		);

		$out .=
		 html( 'h3', 'Configurações de cache' )
		.$this->table( $rows );
		
		$rows = array(
			array(
				'title' => 'Tempo de vida do cache',
				'type' => 'text',
				'name' => 'cachetime',
				'desc' => '<br />Tempo de renovação do cache (em segundos). 0 para desativar o cache.',
			),
		);

		$out .=
		 html( 'h3', 'Configurações de cache' )
		.$this->table( $rows );

		echo $this->form_wrap( $out );
	}
}