<?php
class image extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Imagem' );
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

		// Value
		$value = _array_get( $field, 'value' );

		// Max file size
		$maxSize = self::getMaxsize( $field );
		$maxSizeLabel = str_replace( ',', '.', size_format( $maxSize, 0 ) );

		// Limits desc
		$limits_desc = _array_get( $field, 'limits_desc', 'Formatos suportados: PNG ou JPEG, máximo de {MAXSIZE}' );

		// Button label
		$buttonLabel = _array_get( $field, 'button_label', 'Selecionar' );

		// Max items
		$maxItems = _array_get( $field, 'maxitems' );
		
		$html =  '<div class="ftype-image item-image '. ( self::isMultiple( $field ) ? 'multiple' : 'single' ) .'"'. ( self::isMultiple( $field ) ? 'data-max-items="'. $maxItems .'"' : '' ) .'>';
		
		$html .= '	<div class="limits-desc">'. str_replace( '{MAXSIZE}', $maxSizeLabel, $limits_desc ) .'</div>';

		// Multiple field
		if( self::isMultiple( $field ) ):
		
			// Remove styles
			if( isset( $value[ 'childs' ] ) ):
				unset( $value[ 'childs' ] );
			endif;

			$html .= '	<div class="wrap-images">';

			$html .= self::getRow( $field );

			if( !empty( $value ) ):
				foreach( $value as $_value ):
					$html .= self::getRow( $field, $_value );
				endforeach;
			endif;

			$html .= '	</div>';
			$html .= '	<input type="file" name="'. $field[ 'name_html' ] .'[files][]" id="'. $field[ 'id' ] .'" accept="image/*" size="1" title="'. $buttonLabel .'" data-max-size="'. $maxSize .'" data-max-size-label="'. $maxSizeLabel .'"';
			parent::set_attributes( $html, $field );
			$html .= '>';
		
		// Single field
		else:

			// File id
			$file_id = _array_get( $value, 'file_id' );
			$img = '';
			if( $file_id ):
				$img = '<img src="' . wp_get_attachment_url( $file_id ) . '">';
			endif;
			
			$field[ 'value' ] = '';
			
			// Crop attributes
			$crop_attrs = '';
			if( image::croppable( $field ) ):
				list( $prevWidth, $prevHeight ) = explode( 'x', $field[ 'crop' ][ 'ratio' ] );
				$crop_attrs .= ' data-preview-width="'. $prevWidth .'" data-preview-height="'. $prevHeight .'"';
			endif;

			// Preview box
			if( !image::croppable( $field ) ):
				$preview_text = _array_get( $field, 'preview_text', 'Pré-visualização' );
				$html .= '	
					<div class="previewbox">
						<span>'. $preview_text .'</span>
						'. $img .'
					</div>
				';
			endif;

			$html .= '	<div class="selection-wrapper clearfix">';
			$html .= '		<input placeholder="Selecione seu arquivo" class="address" disabled="disabled">';
			$html .= '		<div class="field">
								<input type="file" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'" accept="image/*" size="1" title="'. $buttonLabel .'" data-max-size="'. $maxSize .'" data-max-size-label="'. $maxSizeLabel .'"' . $crop_attrs;
								parent::set_attributes( $html, $field );
			$html .= '			>
							</div>';
			$html .= '	</div>';

			// Field crop
			if( image::croppable( $field ) ):
				
				$html .= '	<div class="cropbox">
								<div class="croparea">'. $img .'</div>
							</div>
				';
				$html .= '	<div class="controls clear">
								<button type="button" class="button small delete">
									<i></i>Excluir imagem
								</button>
							</div>
				';

				// Crop info
				$cropinfo = $field;
				$cropinfo_val = _array_get( $value, 'cropinfo' );
				if( $cropinfo_val ):
					$cropinfo[ 'value' ] = is_object( $cropinfo_val ) ? json_encode( $cropinfo_val ) : $cropinfo_val;
				endif;
				parent::set_as_child( $cropinfo, 'cropinfo' );
				parent::add_attributes( $cropinfo, array( 'class' => 'cropinfo' ) );
				$html .= hidden::get_field( $cropinfo );

			endif;

			// File ID
			$_file_id = $field;
			$_file_id[ 'value' ] = $file_id;
			parent::set_as_child( $_file_id, 'file_id' );
			parent::add_attributes( $_file_id, array( 'class' => 'file-id' ) );
			$html .= hidden::get_field( $_file_id );

			// Nonce for deleting
			if( $file_id ):
				$_nonce = $field;
				$_nonce[ 'value' ] = wp_create_nonce( 'field_image_delete-' . $file_id );
				parent::set_as_child( $_nonce, 'nonce' );
				parent::add_attributes( $_nonce, array( 'class' => 'file-nonce' ) );
				$html .= hidden::get_field( $_nonce );
			endif;

			// UNIQUE ID
			$unique_id = $field;
			$unique_id[ 'value' ] = md5(uniqid(rand(), true));
			parent::set_as_child( $unique_id, 'unique_id' );
			parent::add_attributes( $unique_id, array( 'class' => 'unique-id' ) );
			$html .= hidden::get_field( $unique_id );
			

		endif;
		
		$html .= '</div>';

		self::add_files();

		return $html;
	}

	public static function getRow( $field, $value = false ){

		$img = '';
		$filname = '';
		$fieldid = '';
		$nonce = '';

		if( $value ):

			$_url = wp_get_attachment_url( $value );
			$img = '<img src="'. $_url .'">';
			$filname = basename( $_url );

			$fileid = $field;
			$fileid[ 'value' ] = $value;
			$fileid[ 'index' ] = '';
			parent::set_as_child( $fileid, 'ids' );
			parent::add_attributes( $fileid, array( 'class' => 'file-id' ) );
			$fieldid = hidden::get_field( $fileid );

			$_nonce = $field;
			$_nonce[ 'value' ] = wp_create_nonce( 'field_image_delete-' . $value );
			$_nonce[ 'index' ] = '';
			parent::set_as_child( $_nonce, 'nonce' );
			parent::add_attributes( $_nonce, array( 'class' => 'file-nonce' ) );
			$nonce = hidden::get_field( $_nonce );
		
		endif;

		return '<div class="row-image"'. ( !$value ? ' style="display:none;"' : ' data-file-id="'. $value .'"' ) .'>
			<div class="image-box">'. $img .'</div>
			<div class="progress-bar'. ( $value ? ' loaded' : '' ) .'"><span></span></div>
			<div class="filename"><strong>'. $filname .'</strong></div>
			' . ( !$value ? '<em class="percent">10%</em>' : '' ) . '
			<button type="button" class="delete"'. ( !$value ? ' style="display:none;' : '' ) .'"><span>Excluir imagem</span></button>
			'. $fieldid . $nonce . '
		</div>';
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Value
		$values = _array_get( $meta, $field[ 'machine_name' ] );

		// Allways array values
		if( !is_array( $values ) || !isset( $values[ 0 ] ) ) $values = array( $values );

		// Unserialize each value
		foreach( $values as $v => &$value ):
			
			if( is_string( $value ) ):

				$bdecode = base64_decode( $value, true );
				$value = unserialize( !$bdecode ? $value : $bdecode );				
			
			endif;
		
		endforeach;			

		// Retorna o array de resultados		
		return $values;
	
	}

	// Validação do campo
	public static function validate( $field, $action ){

		require_once( ABSPATH . "wp-admin" . '/includes/image.php' );

		$value = _array_get( $field, 'value' );

		if( self::isMultiple( $field ) ):

		else:

			// Edition mode
			if( intVal( $value[ 'file_id' ] ) > 0 ) return true;
			
			// Max size
			$maxSize = self::getMaxsize( $field );	

			$error = '';

			// values
			$size = _array_get( $value, 'size' );
			$tmp_name = _array_get( $value, 'tmp_name' );
			$name = _array_get( $value, 'name' );

			// Empty
			if( parent::is_required( $field ) && empty( $name ) ):
				
				return PikiField::getErrorMessage( $field, 'required' );
			
			// Maxsize problem
			elseif( $name && ( $value[ 'size' ] > $maxSize || empty( $tmp_name ) ) ):

				return PikiField::getErrorMessage( $field, 'maxsize', array( '{SIZE}' => size_format( $maxSize, 0 ) ) );

			// Format problem
			elseif( $name && !file_is_displayable_image( $tmp_name ) ):

				return 'A imagem no campo ' . $field[ 'label' ]  . ' deve estar no formato .gif, .jpg ou .png';
		
			endif;

			if( $error != '' ):
				return $error;
			endif;

		endif;

		return true;

	}

	public static function renderize_values( $field, $options = array() ){

		// Values
		$value = _array_get( $field, 'value' );

		// Childs
		$childs = _array_get( $value, 'childs' );

		if( self::isMultiple( $field ) ):

			if( empty( $childs ) ):

				// Objetos das imagens
				$images = image::getImagesObjects( $value, $field );
				if( empty( $images ) ) return false;

				$childs = array();
				foreach( $images as $image ):

					//makeRelative
					$thumb = wp_get_attachment_image_src( $image->ID, 'thumbnail' );
					$show = wp_get_attachment_image_src( $image->ID, 'full' );

					$childs[ $image->ID ] = array(
						'thumb' => image::makeRelative( reset( $thumb ) ),
						'show' => image::makeRelative( reset( $show ) ),
					);
				
				endforeach;

			endif;

			// Set cover
			$cover = _array_get( $options, 'cover' );
			if( $cover ):
				$childs = $cover + $childs;
			endif;

			return image::createGallery( $childs, $options );

		else:

			if( empty( $value ) ) return '';

			// File id
			$file_id = _array_get( $value, 'file_id' );
			if( !$file_id ) return '';

			// Field styles
			$styles = _array_get( $field, 'styles' );

			// Srcset
			$srcset = image::getSrcsetImage( $options, $childs[ $file_id ] );

			if( $srcset ):

				return $srcset;

			else:

				// Option style
				$style = _array_get( $options, 'style' );
				
				if( $style && isset( $styles[ $style ] ) && isset( $childs[ $file_id ][ $style ] ) ):

					$uri = get_site_url() . '/' . $childs[ $file_id ][ $style ];

				// First style
				elseif( !empty( $styles ) ):

					// Resized first
					if( isset( $childs[ $file_id ][ 'resized' ] ) ):
					
						$uri = get_site_url() . '/' . $childs[ $file_id ][ 'resized' ];
					
					else:
					
						$keys = array_keys( $styles );
						$first = array_shift( $keys );
						if( isset( $childs[ $file_id ][ $first ] ) ):
							return $uri = get_site_url() . '/' . $childs[ $file_id ][ $first ];
						else:
							return false;
						endif;
					
					endif;

				else:

					$childs = _array_get( $value, 'childs' );
					if( !empty( $childs ) && isset( $childs[ $file_id ] ) ):
					
						// Option style
						$style = _array_get( $options, 'style' );
						$uri = get_site_url() . '/' . _array_get( $childs[ $file_id ], $style, reset( $childs ) );
						
					else:

						$image = wp_get_attachment_image_src( $file_id );
						$uri = $image[ 0 ];

					endif;

				endif;

				return '<img src="'. $uri .'">';

			endif;

		endif;

	}

	public static function getSrcsetImage( $options, $childs ){

		// Sourceset
		$srcset = _array_get( $options, 'srcset' );
		if( !$srcset ) return false;

		foreach( $srcset as $style ):
			if( !isset( $childs[ $style ] ) ) return false;
		endforeach;

		// Base url
		$baseurl = get_site_url() . '/';

		// Default image
		$_def = _array_get( $childs, '1x', reset( $srcset ) );

		// HTML
		$HTML = '<img src="'. $baseurl . $childs[ $_def ] .'" srcset="';
		$_csts = array();
		foreach( $srcset as $res => $s ):
			$_csts[] = $baseurl . $childs[ $s ] . ' ' . $res;
		endforeach;
		$HTML .= implode( ',', $_csts ) . '">';
		return $HTML;

	}

	public static function createGallery( $images, $options ){

		// Base URL
		$baseurl = get_site_url( null, '/' );

		// Has figcaption
		$figcaption = _array_get( $options, 'figcaption' );

		// Just one image
		if( count( $images ) == 1 ):

			$images_keys = array_keys( $images );
			$image_id = reset( $images_keys );
			$image = reset( $images );
			$image_post = get_post( $image_id );

			return '<figure class="single-image">
				<img src="'. $baseurl . $image[ 'show' ] .'" alt="'. $image_post->post_title .'" />' . ( $figcaption === 'true' ?
				'<figcaption class="clearfix">
					<strong>'. $image_post->post_title .'</strong>
				</figcaption>' : '' ) . '
			</figure>';

		endif;

		// ID único para cada galeria
		$token = md5(uniqid(rand(), true));
		$id = 'slideshow-' . $token;

		// Se a API deve ser inicializada
		$start_api = _array_get( $options, 'start_api' ) != 'true' ? 'false' : 'true';

		// Tema
		$theme = _array_get( $options, 'theme', 'complete' );

		$return = '<div class="piki-gallery '. $theme .'" id="'. $id .'" data-start-api="'. $start_api .'" data-theme="'. $theme .'" data-figcaption="'. $figcaption .'" data-arrows="'. _array_get( $options, 'arrows', 'true' ) .'">';

		$_images = array();
		$_thumbs = array();
		$_total = count( $images );
		$cont = 1;
		foreach( $images as $image_id => $image ):

			$image_post = get_post( $image_id );

			$_images[] = '
			<figure class="slide-item">
				<img src="'. $baseurl . $image[ 'show' ] .'" alt="'. $image_post->post_title .'" />' . ( $figcaption === 'true' ?
				'<figcaption class="clearfix">
					<strong>'. $image_post->post_title .'</strong>
					<span class="slide-indice">'. $cont .'&nbsp;/&nbsp;'. $_total .'</span>
				</figcaption>' : '' ) . '
			</figure>';

			$_thumbs[] = '
			<figure class="slide-item">
				<img src="'. $baseurl . $image[ 'thumb' ] .'" alt="'. $image_post->post_title .'" />
			</figure>';

			$cont++;

		endforeach;
		
		$return .= '	<div class="main-slider-wrapper clear">
							<div class="main-slider">'. implode( '', $_images ) .'</div>
						</div>';
		$return .= '	<footer class="clear">
							<div class="menu-slider">'. implode( '', $_thumbs ) .'</div>';
		
		// Mosaic
		if( $theme == 'complete' ):
		$return .= '		<div class="see-all">
								<button title="Ver todas as fotos">
									<span class="icon"></span>
									Ver todas as fotos
								</button>
							</div>';
		endif;

		$return .= '	</footer>
					</div>';

				
		// Biblioteca
		Piki::add_library( 'slick' );
		Piki::add_library( 'piki-gallery' );
		
		return $return;

	}

	public static function save_meta( $field, $ID, $value ){

		if( self::isMultiple( $field ) ):

			// Posted IDs
			$_value = _array_get( $value, 'ids', array() );

			// Posted files
			$files = _array_get( $value, 'files' );
			if( !empty( $files ) ):

				foreach( $files as $file ):
				
					if( empty( $file ) || !file_exists( $file[ 'tmp_name' ] ) ) continue;
					$_value[] = self::imageUpload( $file, $ID );

				endforeach;

			endif;
		
			$value = $_value;

			// Gerando as imagens necessárias
			$images = image::getImagesObjects( $_value, $field );
			$value[ 'childs' ] = image::generateChilds( $field, $ID, array( 'images_objects' => $images ) );			

		else:

			// Temp file name
			$tmp_name = _array_get( $value, 'tmp_name' );

			// File id from exists file
			$file_id = _array_get( $value, 'file_id' );
			if( empty( $file_id ) ) $file_id = _array_get( $value, 'ids' );

			// Upload da imagem
			if( !empty( $tmp_name ) && file_exists( $tmp_name ) ):
				$file_id = self::imageUpload( $value, $ID );
				$value[ 'file_id' ] = $file_id;
			endif;

			// Empty field
			if( empty( $file_id ) && empty( $tmp_name ) ) return;

			// Image object
			$image = $file_id ? get_post( $file_id ) : false;

			// Se não existe a imagem
			if( empty( $image ) ):
				
				$value[ 'file_id' ] = '';
				
				// Se a imagem é usada como cover, ela é removida
				if( on( $field, 'cover' ) ):
					delete_post_thumbnail( $ID );
				endif;
				
				return true;

			endif;

			// Values to generate childs
			$valToChilds = array(
				'images_objects' => array( $image )
			);

			// Crop
			if( image::croppable( $field ) ):

				$cropinfo = _array_get( $value, 'cropinfo' );
				if( !is_object( $cropinfo ) ):
					$cropinfo = json_decode( stripslashes( $cropinfo ) );
				endif;

				$coords = $cropinfo->points;
		
				$valToChilds[ 'x' ] = floor( $coords[ 0 ] ) < 0 ? round( $coords[ 0 ] ) : floor( $coords[ 0 ] );
				$valToChilds[ 'y' ] = floor( $coords[ 1 ] ) < 0 ? round( $coords[ 1 ] ) : floor( $coords[ 1 ] );
				$valToChilds[ 'width' ] = round( ( $coords[ 2 ] - $coords[ 0 ] ) );
				$valToChilds[ 'height' ] = round( ( $coords[ 3 ] - $coords[ 1 ] ) );

		
			endif;

			// Gerando as imagens necessárias
			$value[ 'childs' ] = image::generateChilds( $field, $ID, $valToChilds );

			// Remove o objeto da imagem do array de valor
			unset( $value[ 'images_objects' ] );
			
			// Se a imagem é usada como cover, ela é setada
			if( on( $field, 'cover' ) ):
				set_post_thumbnail( $ID, $image->ID );
			endif;

		endif;

		// Serializa os dados
		$serial = base64_encode( serialize( $value ) );

		// Atualiza os valores no banco
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $serial );

		return $value;

	}

	public static function hasChange( $field, $ID, $value ){

		// Get old value
		$old_value = get_post_meta( $ID, $field[ 'machine_name' ] . '_old', true );
		if( !empty( $old_value ) ) $old_value = imagewp::unserialize( $old_value );

		// Old value
		if( 
			( empty( $old_value ) && !empty( $value ) )
			||
			( !empty( $old_value ) && empty( $value ) )
		) return true;

		if( !empty( $old_value ) ):

			if( isset( $old_value[ 'childs' ] ) ):
				unset( $old_value[ 'childs' ] );
			endif;

			return serialize( $old_value ) != serialize( $value );

		endif;

		return $old_value != $value;

	}

	// Delete childs files
	public static function deleteChilds( $childs ){

		if( empty( $childs ) ) return true;

		foreach( $childs as $aid => $vers ):
			
			foreach( $vers as $ver ):

				$path = strpos( $ver, '/' ) === 0 ? $ver : ABSPATH . '/' . $ver;

				if( file_exists( $path ) ):
					unlink( $path );
				endif;

			endforeach;

		endforeach;		

		return true;

	}

	public static function rebuildMeta( $field, $post_id, $value ){
        
        call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $post_id, $field[ 'machine_name' ] );

		if( self::isMultiple( $field ) ):

			if( is_array( reset( $value ) ) ):
				$value = reset( $value );
			endif;
			$value = array( 'ids' => $value );
			
			image::save_meta( $field, $post_id, $value );
			
		else:

			if( is_array( $value ) && !isset( $value[ 'file_id' ] ) ):
				$value = reset( $value );
			endif;

			if( isset( $value[ 'tmp_name' ] ) ):
				unset( $value[ 'tmp_name' ] );
			endif;

			image::save_meta( $field, $post_id, $value );

		endif;
	
	}

	public static function generateChilds( $field, $ID, $value ){

		// Retorno
		$childs = array();

		// Se não existem imagens
		if( empty( $value[ 'images_objects' ] ) ):
			return $childs;
		endif;

		// Estilos de imagens
		$styles = image::extractStyles( $field );

		// Salva cada imagem
		foreach( $value[ 'images_objects' ] as $key => $image ):

			// Array de childs
			$childs[ $image->ID ] = array();

			// Informações da imagem original
			list( $original_url, $original_width, $original_height ) = wp_get_attachment_image_src( $image->ID, 'full' );
			
			// Path da imagem original
			$original_path = image::getPath( $original_url );

			// Not try convert svg
	        if( USE_WEBP && mime_content_type( $original_path ) != 'image/svg' ):
	        	$webp = PikiImages::generateWEBP( $original_path );
	        endif;
			
			// Se o crop é usado
			if( image::croppable( $field ) ):

				// Dimensões do crop
				list( $crop_width, $crop_height ) = explode( 'x', strtolower( $field[ 'crop' ][ 'ratio' ] ) );

				// Instancia a classe
				$sample = wp_get_image_editor( $original_path );
				if( is_wp_error( $sample ) ):
					continue;
				endif;				

				// CROP

					// Caminho físico da imagem
					$cropped_path = image::addSigla( $original_path, $field[ 'machine_name' ] . '_cropped', $ID );

					// Se a área de crop não foi informada, redimensionamos pelo apect ratio da imagem
					if( !isset( $value[ 'x' ] ) || $value[ 'x' ] == '' ):

						$value = image::cropByLimits(
							array( 'width' => $original_width, 'height' => $original_height ),
							$crop_width,
							$crop_height	
						);
					  					
					endif;
					
					// Cropando a imagem
					$sample->crop( $value[ 'x' ], $value[ 'y' ], $value[ 'width' ], $value[ 'height' ] );
				    
				    // Salva
				    $sample->save( $cropped_path );
				    
				    // Adiciona ao array de valores
					$childs[ $image->ID ][ 'cropped' ] = image::makeRelative( $cropped_path );

				// RESIZE

					// URL com sigla
				    $resized_path = image::addSigla( $original_path, $field[ 'machine_name' ] . '_resized', $ID );
					
					// Gera a imagem
				    $pkimage = new images(array( 
				    	'url' => image::makeUrl( $cropped_path ),
				    	'savepath' => $resized_path,
				    ));
				    $resized = $pkimage->create_fixed_size( $crop_width, $crop_height );

				    // Adiciona ao array de valores
					$childs[ $image->ID ][ 'resized' ] = $resized[ 'relative' ];
				
				// STYLES

					if( $styles ):
						$styleds = image::generateStyles( $cropped_path, $styles, $field );
						$childs[ $image->ID ] = array_merge( $childs[ $image->ID ], $styleds );
					endif;

				// Remove cropped file

					unlink( $cropped_path );
					unset( $childs[ $image->ID ][ 'cropped' ] );
				
				// CND

					if( defined( 'W3TC' ) && !empty( $childs[ $tocrop->ID ] ) ):
						image::sendToCdn( $childs[ $image->ID ] );
					endif;

			elseif( !empty( $styles ) ):

				// Estilos gerados
				$item_childs = image::generateStyles( $original_path, $styles, $field );
				
				if( !empty( $item_childs ) ):
					
					// Coloca os childs no array
					$childs[ $image->ID ] = $item_childs;
					
					// Se o CND estiver ativado
					if( defined( 'W3TC' ) && !empty( $childs ) ):
						image::sendToCdn( $item_childs );
					endif;
				
				endif;
								
			endif;

			// Se não tem nenhuma derivação, removemos do array de retorno
			if( empty( $childs[ $image->ID ] ) ):

				unset( $childs[ $image->ID ] );

			// Keep childs to delete with attachment delete
			else:

				$attach_childs = get_post_meta( $image->ID, 'pkchilds', true );
				if( !empty( $attach_childs ) ):
					$attach_childs = array_merge( $attach_childs, array_values( $childs[ $image->ID ] ) );
				else:
					$attach_childs = array_values( $childs[ $image->ID ] );
				endif;

				update_post_meta( $image->ID, 'pkchilds', $attach_childs );
			
			endif;

		endforeach;

		// Retormna as imagens geradas
		return $childs;

	}

	// Gera os estilos da imagem
	public static function generateStyles( $path, $styles, $field = false ){

		// Retorno
		$return = array();
		
		// Percorre os estilos
		foreach( $styles as $style_name => $style ):

			// Width
			if( !isset( $style[ 'width' ] ) ) $style[ 'width' ] = 0;

			// Height
			if( !isset( $style[ 'height' ] ) ) $style[ 'height' ] = 0;

			// Dimensões
			$info = getimagesize( $path );
			$info = array( 'width' => $info[ 0 ], 'height' => $info[ 1 ] );

			// Position
			if( isset( $style[ 'crop' ] ) ):

				// Instancia a classe
				$styled = wp_get_image_editor( $path );
				
				// Qualidade
				$quality = _array_get( $style, 'quality', 90 );
				$styled->set_quality( $quality );

				// Path destino
				$styled_path = image::addSigla( $path, $style_name );

				if( ( $style[ 'width' ] > 0 && $style[ 'height' ] > 0 ) ):

					// Crop by position
					if( $style[ 'crop' ] == 'cc' ):

						// Redimensionando a imagem
						$styled->resize( $style[ 'width' ], $style[ 'height' ], $style[ 'crop' ] );

						// Salva
						$styled->save( $styled_path );

					// Crop by limits
					else:

						// Dimensões
						$info = image::cropByLimits( $info, $style[ 'width' ], $style[ 'height' ] );

						// Cropando a imagem
						$styled->crop( $info[ 'x' ], $info[ 'y' ], $info[ 'width' ], $info[ 'height' ] );
						
						// Salva
						$styled->save( $styled_path );

						// Redimensiona para o tamanho exato
					    $pkimage = new images(array( 
					    	'url' => image::makeUrl( $styled_path ),
					    	'savepath' => $styled_path,
					    	'quality' => $quality
					    ));
					    $resized = $pkimage->create_fixed_size( $style[ 'width' ], $style[ 'height' ] );

					endif;

				else:

					// Redimensionando a imagem
					$styled->resize( $style[ 'width' ], $style[ 'height' ], $style[ 'crop' ] );

					// Salva
					$styled->save( $styled_path );
				
				endif;
			
			else:

				// Calculando por porcentagem
				if( strpos( $style[ 'width' ], '%' ) !== false ):
					$style[ 'width' ] = round( ( $info[ 'width' ] / 100 ) * intVal( $style[ 'width' ] ) );
				endif;
				if( strpos( $style[ 'height' ], '%' ) !== false ):
					$style[ 'height' ] = round( ( $info[ 'height' ] / 100 ) * intVal( $style[ 'height' ] ) );
				endif;

				$image = new images( $path );
				$image->set_sigla( $style_name );

				// No height
				if( empty( $style[ 'height' ] ) ):
					$result = $image->create_by_width( $style[ 'width' ] );
				// No width
				elseif( empty( $style[ 'width' ] ) ):
					$result = $image->create_by_height( $style[ 'height' ] );
				// Exact size
				else:
					$result = $image->create_fixed_size( $style[ 'width' ], $style[ 'height' ] );
				endif;

				// Resize exact size
				$styled_path = $result[ 'path' ];

			endif;
				
			// Otimiza
			images::optimize( $styled_path );

			$return[ $style_name ] = image::makeRelative( $styled_path  );
		
		endforeach;
		
		// Retorna o valor
		return $return;
	
	}
	
	// Max file size
	public static function getMaxsize( $field ){
		$fieldMax = self::parseSize( _array_get( $field, 'maxsize', '2M' ) );
		return min( $fieldMax, wp_max_upload_size() );
	}

	// Image upload
	public static function imageUpload( $file, $parent_id = false ){

		require_once( ABSPATH . "wp-admin" . '/includes/image.php' );
		require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
		require_once( ABSPATH . "wp-admin" . '/includes/media.php' );

		// Diretórios para upload
		$upload_dir = wp_upload_dir();

        if ( !file_is_displayable_image( $file[ 'tmp_name' ] ) ){
			Piki::error( 'Imagem inválida' );
        }
		else{
            $overrides = array( 'test_form' => false );
            $uploaded = wp_handle_upload( $file, $overrides );
		}

		if ( array_key_exists( 'error', $uploaded ) ):
			Piki::error( $uploaded[ 'error' ] );
		endif;

		$attach_id = image::createAttachment( $uploaded[ 'file' ] );

		return $attach_id;
	
	}

	public static function createAttachment( $path ){
		
		require_once( ABSPATH . "wp-admin" . '/includes/image.php' );
		require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
		require_once( ABSPATH . "wp-admin" . '/includes/media.php' );

		$wp_filetype = wp_check_filetype( basename(  $path ), null );

		$attachment = array(
			'post_mime_type' => $wp_filetype[ 'type' ],
			'post_title' => preg_replace('/\.[^.]+$/', '', basename(  $path ) ),
			'post_content' => '',
			'post_status' => 'inherit'
		);

		$attach_id = wp_insert_attachment( $attachment,  $path );
		$attach_data = wp_generate_attachment_metadata( $attach_id, $path );
		wp_update_attachment_metadata( $attach_id, $attach_data );
		
		return $attach_id;

	}

	// Checa se as imagens anexadas possuem os arquivos físicos
	public static function checkImagesFiles( &$images ){
		
		if( empty( $images ) ):
			return;
		endif;
		
		foreach( $images as $key => $img ):

			$path = get_attached_file( $img->ID );
			
			if( !file_exists( $path ) ):
				unset( $images[ $key ] );
			endif;

		endforeach;
	
	}

	// Crop image by limits
	public static function cropByLimits( $info, $width, $height ){

		$ratio = $height/$width;

		// Ajustamos pelo tamanho
		$_width = $info[ 'width' ];
		$_height = round( $_width*$ratio );

		// Se a altura ultrapassou, redimensionamso pela largura
		if( $_height > $info[ 'height' ] ):
			
			$_height = $info[ 'height' ];
			$_width = round( $_height/$ratio );
			
			$y = 0;
			$x = round( ( $info[ 'width' ] - $_width ) / 2 );

		// Redimensionamos pela largura
		else:

			$x = 0;
			$y = round( ( $info[ 'height' ] - $_height ) / 2 );
		
		endif;

		return array(
			'width' 	=> $_width,
			'height' 	=> $_height,
			'x'			=> $x,
			'y' 		=> $y
		);

	}

	// Structure of style: thumb_name|width:100,height:100,crop:cc
	public static function extractStyles( $field ){

		$styles = _array_get( $field, 'styles' );

		// There no styles
		if( empty( $styles ) || ( is_string( $styles ) && $styles == '0|' ) ) return false;

		// Is array
		if( is_array( $styles ) ) return $styles;
		 		
		// Quebra por linhas e |
		$styles = textarea_options::explode_value( $styles );
		
		// Se não tem estilo, retornamos falso
		if( empty( $styles ) ) return false;
		
		foreach ( $styles as $style_name => $style ):
			
			$options = explode( ',', trim( $style ) );			
			$styles[ $style_name ] = array();
			
			foreach( $options as $key_option => $option ):
				list( $ko, $vo ) = explode( ':', $option );
				$styles[ $style_name ][ $ko ] = $vo;
			endforeach;
		
		endforeach;
		
		return $styles;
	
	}

	// Send to CDN
	public static function sendToCdn( $files ){
		
		// Configurações do plugin
		
		$w3tc_configs = w3_instance( 'W3_Config' );
		// Se o CND estiver ativado, enviamos os arquivos para a fila de uploads
        if( $w3tc_configs->get_boolean( 'cdn.enabled' ) === true ):
        	
        	// Pré requisitos para envio dos arquivos para a fila
			w3_require_once( W3TC_LIB_W3_DIR . '/Request.php' );
			$w3_plugin_cdncommon = w3_instance('W3_Plugin_CdnCommon');
        	
        	foreach ( $files as $key => $file ):
        		
        		// PATH
        		$filepath = rtrim( ABSPATH, '/' ) . '/' . $file;
        		
        		// Envia o arquivo para a fila de uploads
				$w3_plugin_cdncommon->queue_upload_url( $filepath );
        	
        	endforeach;
        
        endif;
	
	}

	// Remove file
	public static function unlink( $file ){
		if( file_exists( $file ) ):
			try {
				unlink( $file );
			} catch ( Exception $e ) {
			  echo "Erro ao remover imagem: ",  $e->getMessage();
			}				
		endif;
	}

	// If is croppable
	public static function croppable( $field ){
		return (
			isset( $field[ 'crop' ] )
			&& 
			on( $field[ 'crop' ], 'status' ) 
			&&
			isset( $field[ 'crop' ][ 'ratio' ] )
			&&
			!empty( $field[ 'crop' ][ 'ratio' ] )
		);
	}

	public static function getImagesObjects( $ids, $field ){


		if( is_string( $ids ) ):
			$ids = trim( $ids, ',' );
			$ids = explode( ',', $ids );
		endif;
		if( empty( $ids ) ):
			return false;
		endif;

		$images = get_posts(array(
			'posts_per_page' => -1,
			'post_type' => 'attachment',
			'include' => $ids
		));

		// Se não existem imagens
		if( empty( $images ) ):
			return false;
		endif;

		// Reordena os valores
		if( on( $field, 'gallery' ) ):
			$sorted = array_flip( $ids );	
			foreach( $images as $image ):
				$sorted[ $image->ID ] = $image;
			endforeach;			
			return $sorted;
		else:
			return $images;
		endif;

	}

	public static function makeUrl( $path ){
		$relative = self::makeRelative( $path );
		return rtrim( get_site_url(), '/' ) . '/' . ltrim( $relative, '/' );
	}	

	public static function makeRelative( $url ){

		$toremove = ( strpos( $url, 'http' ) === 0 || strpos( $url, 'http' ) === 0 ) ? get_site_url() : ABSPATH;
		
		$url = str_replace( $toremove, '', $url );

		// Prevent mascaraded paths
		if( strpos( $url, 'http' ) === 0 ):
			$host = $_SERVER[ 'HTTP_HOST' ];
			$url = str_replace( array( $host, 'https://', 'http://' ), '', $url );
		endif;
	
		return ltrim( $url, '/' );
	
	}

	public static function getPath( $url ){
		$relative = self::makeRelative( $url );	
		if( ( $wpcontent = strpos( $relative, 'wp-content' ) ) !== 0 ):
			$relative = substr( $relative, $wpcontent );
		endif;
		return rtrim( ABSPATH, '/' ) . '/' . $relative;
	}

	public static function addSigla( $url, $sigla, $post_id=false ){
		// Sigla
		$_sigla = '';
		if( $post_id ):
			$_sigla .= 'p' . $post_id . '_';
		endif;
		$_sigla .= $sigla;
		// Path info
		$info = pathinfo( $url );
		// Monta o novo nome do arquivo
		$new_name = $info[ 'filename' ] . "_" . $_sigla . "." . $info[ 'extension' ];
		return $info[ 'dirname' ] . '/' . $new_name;
	}

	public static function ajax_delete_image(){

		// Post parent
		$post_id = _post( 'post_id' );
		// File id
		$file_id = _post( 'file_id' );
		// Field key
		$field_key = _post( 'field_key' );
		// Security nonce
		$nonce = _post( 'nonce' );
		
		// Verify nonce
		if( !wp_verify_nonce( $nonce, 'field_image_delete-' . $file_id ) ):
			Piki::error( 'A imagem não pôde ser removida. Por favor, recarregue a página e tente novamente.' );
		endif;

		// Verify if user can delete image
		$image = get_post( $file_id );
		if( empty( $image ) ):
			Piki::error( 'O ID da imagem é inválido.' );
		endif;
		
		// Verify User
		$user_id = get_current_user_id();
		if( empty( $user_id ) ):
			Piki::error( 'Você precisa estar logado para fazer realizar esta ação.' );
		elseif( !is_super_admin() && $user_id != intVal( $image->post_author ) ):
			Piki::error( 'Você não tem permissão para realizar esta ação.' );
		endif;

		// Delete image
		if ( false === wp_delete_attachment( $file_id, true ) ):
			Piki::error( 'Erro ao remover arquivo: Erro desconhecido.' );
		endif;
		
		// Remove a imagem do campo do post
		$meta = get_post_meta( $post_id, $field_key, true );
		if( !empty( $meta ) ):
			
			$meta = unserialize( base64_decode( $meta ) );
			$key = array_search( $file_id, $meta );
			
			if( $key !== false ){
				unset( $meta[ $key ] );
				$newval = base64_encode( serialize( $meta ) );
				update_post_meta( $post_id, $field_key, $newval );
			}
			
		endif;

		Piki::success( 'Imagem removida com sucesso.' );
		
	}

	public static function imageDelete( $post ){

	
	}

	public static function parseSize( $size ){
  		$unit = preg_replace('/[^bkmgtpezy]/i', '', $size); // Remove the non-unit characters from the size.
  		$size = preg_replace('/[^0-9\.]/', '', $size); // Remove the non-numeric characters from the size.
  		if ( $unit ):
    		return round( $size * pow( 1024, stripos( 'bkmgtpezy', $unit[0] ) ) );
  		else:
    		return round( $size );
  		endif;
	}

	public static function humanFilesize( $size, $precision = 2 ){
	    $units = array( 'B','kB','MB','GB','TB','PB','EB','ZB','YB' );
	    $step = 1024;
	    $i = 0;
	    while( ( $size / $step ) > 0.9 ):
	        $size = $size / $step;
	        $i++;
	    endwhile;
	    return round( $size, $precision ) . ' ' . $units[$i];
	}

	public static function add_files(){
	    
	    // Libraries
		Piki::add_library( 'croppie' );
		// Loading images
		Piki::add_library( 'imagesloaded' );

	    // Scripts and Styles
	    wp_enqueue_script( 'image-field-scripts', Piki::url( 'image.field.js', __FILE__ ) );
	    wp_enqueue_style( 'image-field-styles', Piki::url( 'image.field.css', __FILE__ ) );
	
	}

	public static function isMultiple( $field ){
		return _array_get( $field, 'maxitems' ) > 1;
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();

		// Utilizar como imagem destacada?
		$fields[ 'cover' ] = array(
			'label' => 'Usar como destaque?',
			'ftype' => 'boolean',
			'machine_name' => 'cover'
		);
		
		// Utilizar crop?
		$fields[ 'crop' ] = array(
			'label' => 'Cropar imagem?',
			'ftype' => 'crop',
			'machine_name' => 'crop'
		);
		
		// Estilos da imagem
		$fields[ 'styles' ] = array(
			'label' => 'Estilos de imagem',
			'description' => 'Formato: thumb_name|width:100,height:100,crop:cc',
			'ftype' => 'textarea_options',
			'machine_name' => 'styles'
		);
		
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	
	}

	public static function getDummyID(){
		
		$dummy_id = get_option( 'pkfield_imagewp_dummy_id' );
		if( $dummy_id ):
			$dummy = get_post( $dummy_id );
			if( empty( $dummy ) ):
				$dummy_id = false;
				delete_option( 'pkfield_imagewp_dummy_id' );
			endif;
		endif;
		if( !$dummy_id ):
			$dummy_id = image::createDummyImage();
		endif;
		
		return $dummy_id;
	
	}

	public static function createDummyImage(){

		$upload_dir = wp_upload_dir();
		$image_data = file_get_contents( __DIR__ . '/dummy.png' );
		$unique_file_name = wp_unique_filename( $upload_dir[ 'path' ], 'pkimagewp-dummy.png' );
		$filename = basename( $unique_file_name );

		if( wp_mkdir_p( $upload_dir[ 'path' ] ) ):
        	$path = $upload_dir[ 'path' ] . '/' . $filename;
    	else:
        	$path = $upload_dir[ 'basedir' ] . '/' . $filename;
    	endif;

    	// Create the image  file on the server
    	file_put_contents( $path, $image_data );
		$dummy_id = image::createAttachment( $path );

		update_option( 'pkfield_imagewp_dummy_id', $dummy_id );

		return $dummy_id;

	}

}	
