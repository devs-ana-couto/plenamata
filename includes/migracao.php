<?php
Piki::preventScriptStop();

class Migracao {

	// Databse 
	var $mgdb;

	// Limit to import
	var $limit_time = '2022-01-01 00:00:00';

	// Older URL
	static $old_url = 'https://www.agenciasebrae.com.br';

	// Blogs IDs
	static $blogs_ids = [
		'NA'  => '1',
		'AC'  => '2',
		'AL'  => '3',
		'AM'  => '4',
		'AP'  => '5',
		'BA'  => '6',
		'CE'  => '7',
		'ES'  => '8',
		'GO'  => '9',
		'MA'  => '10',
		'MT'  => '11',
		'MS'  => '12',
		'MG'  => '13',
		'PA'  => '14',
		'PB'  => '15',
		'PR'  => '16',
		'PE'  => '17',
		'PI'  => '18',
		'RJ'  => '19',
		'RN'  => '20',
		'RS'  => '21',
		'RO'  => '22',
		'RR'  => '23',
		'SC'  => '24',
		'SP'  => '25',
		'SE'  => '26',
		'TO'  => '27',
		'DF'  => '28',
	];

	// Import status
	static $status = [
		'0' => 'Importação pendente',
		'1' => 'Importada com sucesso',
		'2' => 'Não pode ser importado',
		'3' => 'Reparado',
	];

	// Correspondents themes
	static $temas = [
		'Leis' => 5,
		'Empreendedorismo' => 5,
		'Mercado e Vendas' => 5,
		'Finanças' => 5,
		'Organização' => 5,
		'Planejamento' => 5,
		'Inovação' => 2,
		'Pessoas' => 9,
		'Cooperação' => 9,
	];

	function __construct(){
		if( is_super_admin() ):
			add_action( 'init', [ $this, 'init' ] );
		endif;
	}

	public function init(){

		// Start database
		$this->mgdb = new wpdb( 'root', 'sp4rt@cu$', 'plenamata_migracao', 'localhost' );
		
		// Start import
		if( _get( 'importa' ) ):

			// Set limit to time
			$this->limit_time = strtotime( $this->limit_time );
		
			// Start
			$this->checkNext();
		
		endif;
	
	}

	private function checkNext(){

		// Next
		$next = $this->getNext( 0 );

		// There is no more items to import
		if( !$next ):
			exit( 'Importação concluída com sucesso!' );
		endif;

		// Switch to blog
		$blog_id = ( empty( $next->sigla ) ) ? '1' : $this::$blogs_ids[ $next->sigla ];
		switch_to_blog( $blog_id );

		// Time
		$next_time = strtotime( $next->data_noticia );
		if( $next_time >= $this->limit_time ):

			// Clearing content
			$next->corpo_noticia = $this->clearContent( $next->corpo_noticia );

			// Não é possível importar
			if( empty( $next->titulo ) || empty( $next->corpo_noticia ) ):

				$this->mgdb->query($this->mgdb->prepare(
					"UPDATE noticia SET migrated = 2 WHERE id = %s",
					$next->id
				));

				$this->checkNext();

			else:

				// If was imported
				$post = $this->getCreatedPost( $next->id );

				// Repaire
				if( !empty( $post ) ):
					$this->doRepaire( $next, $post );
				// Import
				else:
					$this->doImport( $next );
				endif;

			endif;

		else:
		
			exit( 'Importação concluída com sucesso!' );
		
		endif;

	}

	// Get Next
	private function getNext( $status ){
		
		$next = $this->mgdb->get_row($this->mgdb->prepare("
			SELECT 
				id, 
				titulo, 
				subtitulo, 
				data_noticia, 
				corpo_noticia, 
				olho, 
				autor_olho, 
				tema, 
				autor_assinatura, 
				sigla, 
				tags, 
				url_pagina 
			FROM
				noticia
			WHERE 
				migrated = %d
			ORDER BY data_noticia DESC
			LIMIT 1",
			$status
		));

		// There is no more items to import
		return empty( $next ) ? false : $next;
	
	}

	// Repaire migrated post
	private function doRepaire( $item, $post ){

		global $wpdb;

		$has_image = strpos( $post->post_content, 'img' ) !== false;
		$has_imgbox = strpos( $item->corpo_noticia, 'imageInTextBlock' ) !== false && strpos( $post->post_content, '[imgbox' ) === false;

		if( $has_image || $has_imgbox ):

			// Dom document
			$doc = new DOMDocument( '1.0', 'UTF-8' );
			$doc->preserveWhiteSpace = false;		
			$doc->loadHTML( mb_convert_encoding( $post->post_content, 'HTML-ENTITIES', 'UTF-8' ) );

		    // Normalize images
		    if( $has_image ):
		    	$this->checkContentImages( $doc, $item );
		    endif;

			// Image box missed
			if( strpos( $item->corpo_noticia, 'imageInTextBlock' ) !== false && strpos( $post->post_content, '[imgbox' ) === false ):

				// New content
				$new_content = $this->normalizeContent( $doc, $item );
				
			endif;

			// Update content
			$wpdb->query($wpdb->prepare(
				"UPDATE {$wpdb->posts} SET post_content = %s WHERE ID = %d",
				[ $new_content, $post->ID ]
			));

		endif;
			
		// Change status
		$this->mgdb->query($this->mgdb->prepare(
			"UPDATE noticia SET migrated = 3 WHERE id = %s",
			$item->id
		));

		$this->checkNext();

	}

	private function doImport( $item ){

		// Blog ID
		$blog_id = empty( $item->sigla ) ? '1' : $this::$blogs_ids[ $item->sigla ];


		echo '<pre><br>';
		echo '$item->corpo_noticia' . '<br>';
		var_dump( $item->corpo_noticia );
		exit;
		

		// Dom document
		$doc = new DOMDocument( '1.0', 'UTF-8' );
		$doc->preserveWhiteSpace = false;		
		$doc->loadHTML( mb_convert_encoding( $item->corpo_noticia, 'HTML-ENTITIES', 'UTF-8' ) );

	    // Normalize images
	    $this->checkContentImages( $doc, $item );

		// New content
		$content = $this->normalizeContent( $doc, $item );

		echo '<pre><br>';
		echo '$content' . '<br>';
		var_dump( $content );
		exit;

		// Post data
		$post_data = [
			'post_type' => 'post',
			'post_title' => wp_strip_all_tags( $item->titulo ),
			'post_date' => $item->data_noticia,
			'post_content' => $content,
			'post_status' => 'publish',
		];
		$post_id = wp_insert_post( $post_data );

		// Meta
		add_post_meta( $post_id, 'migrated_id', $item->id  );
		add_post_meta( $post_id, 'type', 'simples'  );

		// Author
		$author = empty( $item->autor_assinatura ) ? 'Redação' : $item->autor_assinatura;
		update_post_meta( $post_id, 'author', $author );

		// Subtitle
		if( !empty( $item->subtitulo ) ):
			update_post_meta( $post_id, 'destaque_subtitle', $item->subtitulo );
		endif;

		// Category
		$categ_id = empty( $item->tema ) ? 1 : $this::$temas[ $item->tema ];
		wp_set_object_terms( $post_id, intVal( $categ_id ), 'category', false );

		// Tags
		if( !empty( $item->tags ) ):
			wp_set_post_terms( $post_id, $item->tags, 'post_tag', false );
		endif;

		// Update in database
		$this->mgdb->query($this->mgdb->prepare(
			"UPDATE noticia SET migrated = 1 WHERE id = %s",
			$item->id
		));				

		// Check next
		$this->checkNext();

	}

	// Check content images
	private function checkContentImages( &$doc, $item ){

		// Simple images
	    $imageTags = $doc->getElementsByTagName( 'img' );
	    foreach( $imageTags as $image ):

	    	// Image source
	    	$source = $image->getAttribute( 'src' );

	    	// Fotos já normalizadas
	    	if( strpos( $source, '/wp-content' ) !== 0 ):

	    		// Image alt
				$alt = $image->getAttribute( 'alt' );

				// Rack image
				$racked = $this->rackImage( $source, $item );
				if( $racked ):
				
					$image->setAttribute( 'src', '/' . $racked[ 'relative' ] );
					if( empty( $alt ) ):
						$image->setAttribute( 'alt', $item->post_title );
					endif;
				
				// If cant hacked image, remove it
				else:
					$image->parentNode->removeChild( $image );
				endif;
	    	
	    	endif;

	    endforeach;

	}

	public function rackImage( $url, $item ){


		echo '<pre><br>';
		echo '$url';
		var_dump( $url );
		exit;
		

		// URL normalize
		if( strpos( $url, '/./asn' ) === 0 ):
			$url = $this::$old_url . substr( $url, 2 );
		endif;

		// Filepath
		$time = strtotime( $item->data_noticia );
		$updir = wp_upload_dir();
		$filedir = $updir[ 'basedir' ] . '/migracao/' . date( 'Y', $time ) . '/' . date( 'm', $time );

		if( !file_exists( $filedir ) && !wp_mkdir_p( $filedir ) ):
			exit( 'Falha ao criar o diretório ' . $filedir  );
		endif;

		// Filename
        $extension = pathinfo( $url, PATHINFO_EXTENSION );
        $filename = Piki::slug( urldecode( pathinfo( $url, PATHINFO_FILENAME ) ) ) . '.' . $extension;
        $filename = get_new_file_name( $filedir, $filename );

		// Filepath
		$filepath = $filedir . '/' . $filename;

		// file content
		$content = file_get_contents( $url );
		if( $content ):
			
			$fopen = fopen( $filepath, "w" );
			fwrite( $fopen, $content );
			fclose( $fopen );

			// Optimize
			if( class_exists( 'PikiImages' ) ):
				PikiImages::optimizeImage( $filepath );
			endif;

			// Return
			return [
				'absolute' => $filepath,
				'relative' => str_replace( ABSPATH, '', $filepath ),
			];

		else:

			return false;

		endif;

	}

	public function normalizeContent( $dom, $item ){

		// Imageboxes		
		$xpath = new DOMXPath( $dom );
		foreach( $xpath->query('//div[contains(@class,"imageInTextBlock")]' ) as $imgbox ):

			// Replacement
			$replace = false;

			// Legenda
			$legend = $imgbox->getElementsByTagName( 'p' );
			$legend = $text[0]->nodeValue;

			// Image 
			$img_src = false;
			$img_alt = false;
			foreach( $imgbox->getElementsByTagName( 'img' ) as $img ):
				if( $img->getAttribute( 'class' ) == 'imageInText' ):
					$img_src = $img->getAttribute( 'src' );
					$img_alt = $img->getAttribute( 'alt' );
				endif;
			endforeach;
			if( $img_src ):
				$replace = $dom->createTextNode( '[imgbox src="'. $img_src .'" legend="'. ( $legend ? $legend : '' ) .'" alt="'. ( $img_alt ? $img_alt : $item->titulo ) .'"]' );
			endif;

			if( $replace ):
				$imgbox->parentNode->replaceChild( $replace, $imgbox );
			else:
				$imgbox->parentNode->removeChild( $imgbox );
			endif;

		endforeach;

		// Cleaning attributes
		foreach( $xpath->query('//@*[not(name()="src" or name()="alt" or name()="href" or name()="title")]') as $attr ):
		    $attr->parentNode->removeAttribute( $attr->nodeName );		
		endforeach;

		// Just body content
		$domBody = $dom->getElementsByTagName( 'body' );
		$content = $this->DOMinnerHTML( $domBody[ 0 ] );

		return trim( strval( $content ) );

	}

	public function clearContent( $content ){
		
		// Replaces
		$content = str_replace( 'http:','https:', $content );
		$content = str_replace( [ '<html>', '</html>', '<head>', '</head>', '<body>', '</body>', '<p>_Olho_</p>', '_Olho_', '&nbsp;', '</p> <p', '  ' ], '', $content );
		$content = preg_replace( "/\r|\n/", '', $content );
		$content = strtr( 
			$content,
			[ 
				'</p> <p' => '</p><p', 
				'> </' => '></', 
				'  ' => '' 
			] 
		);
		$content = str_replace( '<div class="imageInTextBlock"></div>', '', $content );

		return $content;
	
	}

	private function getCreatedPost( $older_id ){

		global $wpdb;

		// Search post
		$post_query = $wpdb->prepare("
			SELECT 
				PO.ID, 
				PO.post_title,
				PO.post_content 
			FROM 
				{$wpdb->posts} PO
			LEFT JOIN 
				{$wpdb->postmeta} ME ON ME.post_id = PO.ID AND ME.meta_key = 'migrated_id'
			WHERE
				PO.post_status = 'publish'
				AND 
				ME.meta_value = %s
			LIMIT 1",
			$older_id
		);

		return $wpdb->get_row( $post_query );

	}

	private function DOMinnerHTML( $element ){

	    $innerHTML = ''; 
	    $children = $element->childNodes; 
	
	    foreach( $children as $child ):
	        $tmp_dom = new DOMDocument(); 
	        $tmp_dom->appendChild( $tmp_dom->importNode( $child, true ) ); 
	        $innerHTML .= trim( $tmp_dom->saveHTML() ); 
	    endforeach;
	
	    return $innerHTML; 
	
	}

}
$Migracao = new Migracao();