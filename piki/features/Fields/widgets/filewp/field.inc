<?php
class filewp extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Arquivo - Wordpress' );
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
	public static function get_field( $field, $settings = [] ){
		
		// Guarda as configurações originais do campo
		$backupfield = $field;

		// Value
		$_value = _array_get( $field, 'value' );
		if( empty( $_value ) ):
			$value = [ 'ids' => '' ];
		else:
			// Multiple values
			if( is_array( $_value ) && !isset( $_value[ 'ids' ] ) ):
				$_value = reset( $_value );
			endif;
			$value = _array_get( $_value, 'ids', '' );
		endif;
		
		// Objetos dos arquivos
		$files = self::get_objects( $value );
				
		// Atributos adicionais
		$attrs_add = [];
		
		// Classe do campo hidden
		$fEx = new hidden();
		
		// Se é múltiplo
		if( on( $field, 'multiple' ) ):
			// Aributos
			$attrs_add[ '--multiple' ] = 'on';
			// Label do campo
			$select_label = 'Adicionar arquivos';
			// Field remove
			$action_field = '';

		// Se não é múltiplo
		else:
			// Atributos
			$attrs_add[ '--multiple' ] = 'off';
			// Label do campo
			$select_label = 'Selecionar arquivo';
			// Field remove
			$action_field = '<input class="filewp-edit-button button ' . ( !$files ? 'hide' : 'show' ) . '" type="button" value="Substituir arquivo" /><input class="filewp-remove-button button ' . ( !$files ? 'hide' : 'show' ) . '" type="button" value="Remover arquivo" />';
		endif;
		
		// Adiciona os atributos
		parent::add_attributes( $field, $attrs_add );

		// HTMl
		$html  = '<div'; parent::set_attributes( $html, $field ); $html .= '>';
		$html .= '	<div class="filewp-media-thumbs clearfix ' . ( $files == '' ? 'hide' : 'show' ) . '">';
		
		// Se já existem valores
		if ( $files ):
			
			foreach ( $files as $ikey => $file ):
				
				// Imagem com tamanho real
				$fileurl = wp_get_attachment_url( $file->ID, 'full' );
					
				$html .= '<div class="thumbnail" rel="'. $file->ID .'">';
				
				$html .= '	<img src="' . wp_mime_type_icon( $file->post_mime_type ) . '" alt="' . $file->post_title . '" />';
				$html .= '	<a href="' . $fileurl . '" rel="' . $file->ID . '" target="_blank" class="action preview" title="' . $file->post_title . '">Visualizar arquivo</a>';
				$html .= '	<a rel="' . $file->ID . '" class="action remove" title="Remover">Remover arquivo</a>';
				$html .= '</div>';

				
			endforeach;
		endif;

		$html .= '	</div>';
		$html .= '	<div id="' . $field[ 'id' ] . '_status" class="filewp-media-status"></div>';
		
		$ids = $backupfield;
		$ids[ 'label' ] = 'Ids';
		$ids[ 'value' ] = $value;
		parent::set_as_child( $ids, 'ids' );
		parent::add_attributes( $ids, [ 'class' => 'filewp-ids' ] );
		$html .= $fEx->get_field( $ids );

		$html .= '	<input class="filewp-select-button button '. ( ( !!$files && !on( $field, 'multiple' ) ) ? 'hide' : 'show' ) .'" type="button" value="'. $select_label .'" />';
		$html .= '	<input class="filewp-upload-label" type="hidden" value="' . $field[ 'machine_name' ] . '" />';
		$html .= $action_field;
		
		$html .= '</div>';

		self::add_files( $field );

		return $html;
	
	}

	public static function get_object( $file ){
		if( empty( $file ) ):
			return false;
		endif;
		$return = get_posts([
			'posts_per_page' => -1,
			'post_type' => 'attachment',
			'include' => $file
		]);
		if( empty( $return ) )
			return false;
		return $return;
	}

	public static function get_objects( $ids ){

		if( is_string( $ids ) ):
			$ids = trim( $ids, ',' );
			$ids = explode( ',', $ids );
		endif;
		if( empty( $ids ) ):
			return false;
		endif;

		$objects = get_posts([
			'posts_per_page' => -1,
			'post_type' => 'attachment',
			'include' => $ids
		]);

		// Se não existem filens
		if( empty( $objects ) ):
			return false;
		endif;

		return $objects;

	}

	// Validação do campo
	public static function validate( $field, $settings = [] ){
		
		$error = '';

		if( parent::is_required( $field ) && ( !isset( $field[ 'value' ][ 'ids' ] ) || $field[ 'value' ][ 'ids' ] == '' ) ):
			$error = PikiField::getErrorMessage( $field, 'doselect', [ '{UMVALOR}' => 'um arquivo' ] );
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	
	}

	public static function renderize_values( $field, $options = [] ){

		// Get value
		$value = _array_get( $field, 'value' );
		if( empty( $value ) ) return false;

		// Multiple
		if( !empty( $value ) && isset( $value[ 0 ] ) ):
			$value = reset( $value );
		endif;

		// IDs
		$ids = _array_get( $value, 'ids' );
		if( empty( $ids ) ):
			return false;
		endif;
		
		// Objetos
		$files = self::get_objects( $ids );

		// Retorno
		$return = [];
		
		// Classes
		$classname = _array_get( $options, 'classname', 'download-button' );

		foreach( $files as $key => $file ):

			// File url
			$url = wp_get_attachment_url( $file->ID );

			// Label
			$label = _array_get( $options, 'label', $file->post_title );
			if( strpos( $label, '{type}' ) > 0 ):
				$label = str_replace( '{type}', pathinfo( $url, PATHINFO_EXTENSION ), $label );
			endif;

			// Title
			$title = _array_get( $options, 'title', strip_tags( $label ) );

			// Just url
			if( on( $options, 'just_url' ) ):

				if( on( $options, 'force_download' ) ):

					$return[] = forceDownload::url( $file->ID );

				else:

					$return[] = wp_get_attachment_url( $file->ID );

				endif;

			// Parts
			elseif( on( $options, 'parts' ) ):

				$return[]  = [
					'extension' => pathinfo( $url, PATHINFO_EXTENSION ),
					'name' => $label,
					'size' => filewp::getSize( $file->ID ),
					'download' => forceDownload::url( $file->ID ),
					'url' => $url
				];

			// Widget
			elseif( on( $options, 'widget' ) ):

				$_url = on( $options, 'force-download' ) ? forceDownload::url( $file->ID ) : $url;

				$return[]  = '<div class="field-file-widget">
					<strong>' . $label .'</strong>
					<span class="extension">.'. pathinfo( $url, PATHINFO_EXTENSION ) .'</span> <span class="filesize">'. filewp::getSize( $file->ID ) .'</span>
					<a href="'. $_url .'" class="'. $classname .'" title="Fazer download do arquivo" target="_blank" rel="noreferrer">Download</a>
				</div>';

			// General
			else:

				if( on( $options, 'force_download' ) ):

					$return[] = '<a href="'. forceDownload::url( $file->ID ) .'" class="'. $classname .'" title="'. $title .'">'. $label .'</a>';

				else:

					switch ( $file->post_mime_type ):
						
						// Vídeo
						case 'video/mp4':
							$better_token = md5(uniqid(rand(), true));
							$return[] = '<video autoplay muted loop id="'. $better_token .'" src="'. $url .'" type="video/mp4"></video>';
						break;
						
						// Áudio
						case 'audio/mpeg':

							if( on( $options, 'native_controls' ) ):

								$return[] = '<audio controls>
								  	<source src="'. $url .'" type="audio/mpeg">
								  	Your browser does not support the audio tag.
								</audio>';

							else:

								$return[] = do_shortcode( '[audio src="'. $url .'" preload="auto"] ' );

							endif;
						
						break;
						
						// Default
						default:

							$return[] = '<a href="'. $url .'" class="'. $classname .'" rel="_blank" title="'. $title .'"><span>'. $label . '</span></a>';
						
						break;
					
					endswitch;		

				endif;

			endif;	
		
		endforeach;

		if( on( $options, 'parts' ) ):
			return $return;
		else:
			return implode( '', $return );
		endif;
	
	}

	public static function getSize( $id ){

		$path = get_attached_file( $id );

		$bytes = filesize( $path );
		$s = [ 'B', 'KB', 'MB', 'GB' ];
		$e = floor( log( $bytes ) / log( 1024 ) );
	
		return sprintf( '%.2f' . $s[ $e ], ( $bytes / pow( 1024, floor( $e ) ) ) );
	
	}

	public static function renderize_audio( $post_id ){

		// Arquivos
	    wp_enqueue_script( 'filewp-audio-script', Piki::url( 'mediaelement/player.min.js', __FILE__ ), [ 'jquery' ] );
	    wp_enqueue_style( 'filewp-audio-style', Piki::url( 'mediaelement/player.min.css', __FILE__ ) );

	    // Código HTML
		$url = wp_get_attachment_url( $post_id );
		$id_player = 'player-' . $post_id;
		$return =  '<audio id="'. $id_player .'" src="'. $url .'" type="audio/mp3" controls="controls"></audio>';
		$return .= '<script>jQuery(function(){ jQuery("#'. $id_player .'").mediaelementplayer(); });</script>';

	    return $return;
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){
		$values = isset( $meta[ $field[ 'machine_name' ] ] ) ? $meta[ $field[ 'machine_name' ] ] : '';
		if( empty( $values ) ):
			return $values;
		endif;
		if( is_array( $values ) ):
			foreach( $values as $key => &$value ):
				$value = maybe_unserialize( $value );
			endforeach;
		else:
			$values = maybe_unserialize( $values );
		endif;
		return $values;
	}

	public static function add_files(){
		// Files
	    wp_enqueue_script( 'filewp.field.js', Piki::url( 'filewp.js', __FILE__ ), [ 'jquery' ] );
	    wp_enqueue_style( 'filewp.field.css', Piki::url( 'filewp.css', __FILE__ ) );
	    // WP Media
		wp_enqueue_media();
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();
		// Galeria de filens?
		$fields[ 'multiple' ] = [
			'label' => 'Seleção multipla?',
			'ftype' => 'boolean',
			'machine_name' => 'multiple'
		];
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	}

}
