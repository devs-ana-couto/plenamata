<?php
class imagewp extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Imagem - Wordpress' );
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

		if( empty( $field[ 'value' ] ) ):
			$value = array( 'ids' => '' );
		else:
			$value = !isset( $field[ 'value' ][ 'ids' ] ) ? array_shift( $field[ 'value' ] ) : $field[ 'value' ];
		endif;

		// Se é usado como capa, a mesma existe mas ainda não foi setada
		if( 
		empty( $value ) 
		&& 
		on( $field, 'cover' ) 
		&& 
		isset( $settings[ 'data' ]->ID ) 
		&& ( $thumbnail_id = get_post_thumbnail_id( $settings[ 'data' ]->ID ) ) !== false 
		):
			$value = array( 'ids' => $thumbnail_id );
		endif;

		// Objetos das imagens se existirem
		$images = image::getImagesObjects( $value[ 'ids' ], $field );
				
		// Se o crop é utilizado
		$usecrop = image::croppable( $field );
		
		// Atributos adicionais
		$attrs_add = array();
		
		// Se é múltiplo
		if( on( $field, 'gallery' ) ):

			// Aributos
			$attrs_add[ 'data-multiple' ] = 'on';
			// Label do campo
			$select_label = 'Adicionar imagens';
			// Field remove
			$action_field = '';

		// Se não é múltiplo
		else:

			// Atributos
			$attrs_add[ 'data-multiple' ] = 'off';
			// Label do campo
			$select_label = 'Selecionar imagem';
			// Field remove
			$action_field = '
				<input class="imagewp-edit-button button ' . ( !$images ? 'hide' : 'show' ) . '" type="button" value="Substituir imagem">
				<input class="imagewp-remove-button button ' . ( !$images ? 'hide' : 'show' ) . '" type="button" value="Remover imagem">'
			;
		endif;

		// Crop
		if( $usecrop ):
			$attrs_add[ 'data-crop' ] = 'on';
			$attrs_add[ 'data-crop-ratio' ] = $field[ 'crop' ][ 'ratio' ];
		endif;
		
		// Adiciona os atributos
		PikiField::add_attributes( $field, $attrs_add );

		// HTMl
		$html  = '<div'; PikiField::set_attributes( $html, $field ); $html .= '>';
		$html .= '	<div class="imagewp-media-'. ( !$usecrop ? 'thumbs' : 'croparea' ) .'  clearfix ' . ( empty( $images ) ? 'hide' : 'show' ) . '">';
		
		// Se já existem valores
		if( $images ):
			foreach ( $images as $ikey => $image ):
				
				// Imagem com tamanho real
				$full_info = wp_get_attachment_image_src( $image->ID, 'full' );
				
				if( $usecrop ):

					$html .= '<img src="' . $full_info[ 0 ] . '" alt="' . $image->post_title . '" width="'. $full_info[ 1 ] .'" height="'. $full_info[ 2 ] .'" class="imagewp-croparea" />';
				
				else:
					

					$html .= '<div class="thumbnail" rel="'. $image->ID .'">';
					
					// Thumbnail
					$thumb_info = wp_get_attachment_image_src( $image->ID, 'thumbnail' );

					$html .= '	<img src="' . $thumb_info[ 0 ] . '" alt="' . $image->post_title . '" />';
					$html .= '	<a href="' . $full_info[ 0 ] . '" rel="' . $image->ID . '" target="_blank" class="action preview">Ampliar imagem</a>';
					$html .= '	<a rel="' . $image->ID . '" class="action remove" title="Remover">Remover imagem</a>';
					$html .= '</div>';

				endif;
				
			endforeach;
		endif;

		$html .= '	</div>';
		$html .= '	<div id="' . $field[ 'id' ] . '_status" class="imagewp-media-status"></div>';
		
		$ids = $backupfield;
		$ids[ 'label' ] = 'Ids';
		$ids[ 'value' ] = isset( $value[ 'ids' ] ) && !empty( $value[ 'ids' ] ) ? implode( ',', $value[ 'ids' ] ) : '';
		PikiField::set_as_child( $ids, 'ids' );
		PikiField::add_attributes( $ids, array( 'class' => 'imagews-ids' ) );
		$html .= hidden::get_field( $ids );

		$html .= '	<input class="imagewp-select-button button '. ( ( !!$images && !on( $field, 'gallery' ) ) ? 'hide' : 'show' ) .'" type="button" value="'. $select_label .'">';
		$html .= '	<input class="imagewp-upload-label" type="hidden" value="' . $field[ 'machine_name' ] . '">';
		$html .= $action_field;

		if( $usecrop ):
			$extras = self::get_subfields_keys();
			foreach ( $extras as $key => $extra ):
				$extf = $backupfield;
				$extf[ 'label' ] = $extra;
				$extf[ 'value' ] = isset( $value[ $extra ] ) ? $value[ $extra ] : '';
				PikiField::set_as_child( $extf, $extra );
				PikiField::add_attributes( $extf, array( 'class' => 'coord-' . $extra ) );
				$html .= hidden::get_field( $extf );
			endforeach;
		endif;
		
		$html .= '</div>';

		self::add_files( $field );

		return $html;
	}

	// Subcampos 
	public static function get_subfields_keys(){
		return array( 'x', 'y', 'width', 'height' );
	}

	public static function validate( $field, $settings ){

		$error = '';
		if( PikiField::is_required( $field ) && $field[ 'value' ][ 'ids' ] == '' ):
			$error = PikiField::getErrorMessage( $field, 'doselect', array( '{UMVALOR}', 'uma imagem' ) );
		endif;
		if( $error != '' ):
			return $error;
		endif;
		return true;
	}

	// Salva os valores
	public static function save_meta( $field, $ID, $value ){
		
		// Vefiry if has changes
		// $has_change = image::hasChange( $field, $ID, $value );
		// if( !$has_change ): 
		// 	return true;
		// else:
		// 	call_user_func( 'delete_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_old' );
		// endif;

		// Prepare meta
		$_value = imagewp::prepare_meta( $field, $value, $ID );
		
		if( !empty( $_value[ 'ids' ] ) ):

			// Se a imagem é usada como cover, ela é setada
			if( on( $field, 'cover' ) ):
				$arr_ids = explode( ',', $_value[ 'ids' ] );
				set_post_thumbnail( $ID, reset( $arr_ids ) );
			endif;

			// Serializa os dados
			$serial = imagewp::serialize( $_value );
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $serial );

			// Guarda os dados postados
			//$serial_old = imagewp::serialize( $value );
			//call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ] . '_old', $serial_old );

		// Se não existirem imagens, ou, se nenhuma for válida, limpamos o valor
		else:

			// Se a imagem é usada como cover, ela é removida
			if( on( $field, 'cover' ) ):
				delete_post_thumbnail( $ID );
			endif;

			// Insert empty value to fieldsets
			call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], '' );


		endif;

		return $value;

	}

	public static function prepare_meta( $field, $value, $key = '' ){

		// Retira vírgula das extremidades
		$value[ 'ids' ] = trim( $value[ 'ids' ], ',' );

		// Valida se realmente existem imagens
		$images = image::getImagesObjects( $value[ 'ids' ], $field );		

		// Remove as imagens que não possuem arquivos físicos
		image::checkImagesFiles( $images );
		
		// Existem imagens
		if( !empty( $images ) ):

			// Just IDS with phisical images
			$value[ 'ids' ] = array_column( $images, 'ID' );

			// Insere os objectos das imagens no array de valores
			$value[ 'images_objects' ] = $images;
			
			// Gerando as imagens necessárias
			$value[ 'childs' ] = image::generateChilds( $field, $key, $value );

			// Remove o objeto da imagem do array de valor
			unset( $value[ 'images_objects' ] );
			
		// Se não existirem imagens, ou, se nenhuma for válida, limpamos o valor
		else:

			$value[ 'ids' ] = '';

		endif;
		
		return $value;

	}

	public static function delete_meta( $field, $ID, $data_type = false, $table = false, $value = false ){

		$oldvals = get_post_meta( $ID, $field[ 'machine_name' ] );

		if( !empty( $oldvals ) ):

			foreach( $oldvals as $val ):

				if( empty( $val ) ) continue;
				
				$val = self::unserialize( $val );
				if( empty( $val ) ) continue;

				$childs = _array_get( $val, 'childs' );
				if( empty( $childs ) ) continue;

				// Removing images
				foreach( $childs as $child ):

					if( empty( $child ) ) continue;
					
					foreach( $child as $path ):
						if( file_exists( ABSPATH . $path ) ):
							unlink( ABSPATH . $path );
						endif;
					endforeach;
				
				endforeach;
				
			endforeach;

		endif;
	
		call_user_func( 'delete_'. $data_type .'_meta', $ID, $field[ 'machine_name' ] );

	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Get values
		$values = _array_get( $meta, $field[ 'machine_name' ] );

		// Se não existem valores para o campo
		if( !$values ) false;

		// Single value
		if( !is_array( $values ) ) return imagewp::unserialize( $values );

		// Se nenhum valor foi gravado
		foreach ( $values as $key => &$item ):
			$item = imagewp::unserialize( $item );
		endforeach;
		
		// Retorna o array de resultados		
		return $values;
	
	}

	// Serialize value
	public static function serialize( $value ){
		return base64_encode( serialize( $value ) );
	}

	// Unserialize value
	public static function unserialize( $value ){
		return unserialize( base64_decode( $value ) );
	}

	public static function renderize_values( $field, $options = [] ){

		if( empty( $field[ 'value' ] ) ):
			return false;
		endif;

		// ID's das imagens
		$images_ids = _array_get( $field[ 'value' ], 'ids' );
		if( !is_array( $images_ids ) ):
			$images_ids = explode( ',', $images_ids );
		endif;

		// Retorno
		$return = array();

		// Derivações das imagens
		$childs = _array_get( $field[ 'value' ], 'childs' );

		// URL base
		$baseurl = rtrim( get_site_url(), '/' ) . '/';

		// Lazy load
		$lazy = ( !isset( $options[ 'lazy' ] ) || $options[ 'lazy' ] !== false ) ? ' loading="lazy"' : '';

		// Se é uma galeria
		if( on( $field, 'gallery' ) ):

			// Biblioteca
			Piki::add_library( 'slick' );
			Piki::add_library( 'imagesloaded' );

			// Objetos das imagens
			$images = image::getImagesObjects( $images_ids, $field );

			// Se não existem imagens
			if( !$images ): return false; endif;

			// ID único para cada galeria
			$token = md5(uniqid(rand(), true));
			$id = 'slideshow-' . $token;

			// Se a API deve ser inicializada
			$start_api = isset( $options[ 'start_api' ] ) && $options[ 'start_api' ] != 'true' ? 'false' : 'true';

			// Theme
			$theme = _array_get( $options, 'theme', 'complete' );

			// Theme
			$class = _array_get( $options, 'class', '' );

			// Slick tema
			if( $theme == 'simple' ):

				Piki::add_library( 'slick' );

				$return = '
				<div class="imagewp-theme simple '. $class .'" id="'. $id .'" data-start-api="'. $start_api .'">
					<div class="slider">';
						foreach( $images as $image_id => $image_post ):
							$return .= imagewp::render_item( $image_id, $childs, $options );
						endforeach;
						$return .= '
					</div>
				    <nav></nav>
				</div>';

			// Slick tema
			elseif( $theme == 'slick' ):

				$return = '<div class="imagewp-slick-theme '. $class .'" id="'. $id .'" data-start-api="'. $start_api .'">';

				$_images = array();
				$_thumbs = array();
				$_total = count( $images );
				$cont = 1;
				foreach( $images as $image_id => $image_post ):

					// Imagens do form
					if( $childs && isset( $childs[ $image_id ] ) ):
						$urls = $childs[ $image_id ];
					// Imagens padrão
					else: 
						$thumb = wp_get_attachment_image_src( $image_id, 'thumbnail' );
						$show = wp_get_attachment_image_src( $image_id, 'full' );
						$urls = array(
							'thumbnail' => image::makeRelative( $thumb[ 0 ] ),
							'full' => image::makeRelative( $show[ 0 ] ),
						);
					endif;

					$_images[] = '
					<figure class="slide-item">
						<img src="'. $baseurl . $urls[ 'show' ] .'" alt="'. $image_post->post_title .'" ' . $lazy . '>
						<figcaption class="clearfix">
							<strong>'. $image_post->post_title .'</strong>
							<span class="slide-indice">'. $cont .'&nbsp;/&nbsp;'. $_total .'</span>
						</figcaption>
					</figure>';

					$_thumbs[] = '
					<figure class="slide-item">
						<img src="'. $baseurl . $urls[ 'thumb' ] .'" alt="'. $image_post->post_title .'" '. $lazy .'>
					</figure>';

					$cont++;

				endforeach;
				
				$return .= '	<div class="main-slider-wrapper clear">
									<div class="main-slider">'. implode( '', $_images ) .'</div>
								</div>';
				$return .= '	<footer class="clear">
									<div class="menu-slider">'. implode( '', $_thumbs ) .'</div>
									<div class="see-all">
										<button title="Ver todas as fotos">
											<span class="icon"></span>
											Ver todas as fotos
										</button>
									</div>
								</footer>';
								
				$return .= '</div>';

			// Tema padrão
			else:

				Piki::add_library( 'slick' );

				$theme = 'default';

				# Legendas
				$captions = on( $options, 'captions' );
				
				// All images childs
				$all_childs = _array_get( $field[ 'value' ], 'childs' );

				// HTML
				$return = '
				<div class="imagewp-gallery" data-gallery-id="'. $id .'">
					<div class="main-slider '. $class .'">';
						foreach( $images as $key => $image ): 
							

							$full_info = wp_get_attachment_image_src( $image->ID, 'full' );
							$childs = _array_get( $all_childs, $image->ID );
							$retina = _array_get( $childs, 'ret' );
							if( $retina ):
								$child_url = get_site_url( null, $retina );
								$child_retina = $full_info[ 0 ];
							else:
								$child_url = $full_info[ 0 ];
								$child_retina = false;
							endif;
							
							$return .= '
							<div class="slider-item">
								<picture>' . 
									( USE_WEBP ? '<source type="image/webp" srcset="'. $child_url .'.webp' . ( $child_retina ? ', '. $child_retina .'.webp 2x' : '' ) . '">' : '' ) . '
									<img src="'. $child_url .'"' . ( $child_retina ? ' srcset="'. $child_retina .' 2x"': '' ) . ' alt="' . ( $alt ? $alt : ' ' ) . '" ' . $lazy . '>
								</picture>';
								if( $captions ):
									$caption = wp_get_attachment_caption( $image->ID );
									if( !empty( $caption ) ):
										$return .= '<figcaption>'. $caption .'</figcaption>';
									endif;
								endif;
							$return .= '
							</div>
							';

						endforeach;
					$return .= '
					</div>
					<div class="thumbs-slider">
		                <div class="slider">';
							foreach( $images as $key => $image ):

								$childs = _array_get( $all_childs, $image->ID );
								$thumb = _array_get( $childs, 'thumb' );
								$retina = _array_get( $childs, 'thumb_ret' );
								if( $retina ):
									$thumb_url = get_site_url( null, $retina );
									$thumb_retina = get_site_url( null, $thumb );
								else:
									$thumb_url = get_site_url( null, $thumb );
									$thumb_retina = false;
								endif;

								$return .= '
								<div class="slider-item">
									<picture data-index="' . $key . '">' . 
										( USE_WEBP ? '<source type="image/webp" srcset="'. $thumb_url .'.webp' . ( $thumb_retina ? ', '. $thumb_retina .'.webp 2x' : '' ) . '">' : '' ) . '
										<img src="'. $thumb_url .'"' . ( $thumb_retina ? ' srcset="'. $thumb_retina .' 2x"': '' ) . ' alt="' . ( $alt ? $alt : ' ' ) . '" ' . $lazy . '>
									</picture>
								</div>
								';
							
							endforeach;
							$return .= '
		                </div>
		            </div>
				</div>
				';

			endif;

		    wp_enqueue_script( 'imagewp-theme-scripts', Piki::url( 'theme-'. $theme .'.js', __FILE__ ), array( 'jquery' ) );
		    wp_enqueue_style( 'imagewp-theme-styles', Piki::url( 'theme-'. $theme .'.css', __FILE__ ) );

		// Imagem única
		else:

			$torender = array();
			$image_id = reset( $images_ids );
			$return[] = imagewp::render_item( $image_id, $childs, $options );

		endif;

	    if( is_array( $return ) ):
			return implode( '', $return );
		endif;

		return $return;

	}

	//public static function renderResponsive( $meta, $desk, $mob, $break = 768 ){
	public static function renderResponsive( $options ){

		$meta = _array_get( $options, 'meta' );
		$default = _array_get( $options, 'default' );
		$breaks = _array_get( $options, 'breakpoints' );
		$nowrap = _array_get( $options, 'nowrap' );

		// Default field name
		$name = _array_get( $default, 'field_name' );
		if( 
			!$name 
			|| 
			( isset( $meta->{$name} ) && $meta->{$name}->isempty() ) 
			||
			( !isset( $meta->{$name} ) && $meta->empty( $name ) )

		) return '';

		// HTML code
		$html = ( $nowrap ? '' : '<picture class="imagewp '. $name .'">' );
		
		// Breakpoints
		if( $breaks ):

			foreach( $breaks as $break ):

				$break_options = [
					'source' => true, 
					'break' => $break[ 'media' ],
					'style' => _array_get( $break, 'style' ),
				];

				// Fieldset
				if( isset( $meta->{$break[ 'field_name' ]} ) ):

					$html .= $meta->{$break[ 'field_name' ]}->render( $break_options );

				// Single field
				else:

					$html .= $meta->render(
						$break[ 'field_name' ],
						$break_options
					);

				endif;
				
			endforeach;
			
		endif;

		// Options
		$_options = _array_get( $options, 'options', [] );
		$_options[ 'nowrap' ] = true;
		$_options[ 'source' ] = false; 
		$_options[ 'break' ] = _array_get( $default, 'media' );

		// Fieldset
		if( isset( $meta->{$name} ) ):

			$html .= $meta->{$name}->render( $_options );
		
		// Single field
		else:
		
			$html .= $meta->render(  
				$name,
				$_options
			);
		
		endif;

		$html .= ( $nowrap ? '' : '</picture>' );

		return $html;

	}

	public static function render_item( $image_id, $childs, $options = [] ){

		// Returning
		$return = false;

		// Style
		$style = _array_get( $options, 'style' );

		// Just image url
		$urls = _array_get( $options, 'urls' );
		
		// Style
		$retina = _array_get( $options, 'retina' );

		// Default retina key
		if( !$retina && !$style && !empty( $childs ) && _array_get( reset( $childs ), 'ret' ) ) $retina = 'ret';

		// Widget
		$css = _array_get( $options, 'css' );

		// Breakpoint
		$breakpoint = _array_get( $options, 'break' );

		// Breakpoint
		$_mquery = $breakpoint ? ' media="'. $breakpoint .'"' : '';

		// Otheres breakpoints
		$responsive = _array_get( $options, 'responsive' );

		// Alt da imagem
		$alt = _array_get( $options, 'alt' );

		// Source
		$source = _array_get( $options, 'source' );

		// Nowrap
		$nowrap = on( $options, 'nowrap' );

		// Derivações
		$sizes = _array_get( $childs, $image_id, is_array( $childs ) ? reset( $childs ) : '' );

		if( ( $retina || $source ) && !$css ):

			// Original URL
			$image_url = wp_get_attachment_url( $image_id );

			// Style
			if( $style ):
				$image_url = get_site_url( null, _array_get( $sizes, $style, $image_url ) );
			elseif( isset( $sizes[ 'resized' ] ) ):
				$image_url = get_site_url( null, $sizes[ 'resized' ] );
			endif;

			// Just URL
			if( $urls ) return $image_url;

			// SVG
			$ext = end( explode( '.', $image_url ) );
			if( $ext == 'svg' || $ext == 'gif' ):
				return '<img src="'. $image_url .'" alt="'. _array_get( $options, 'alt', ' ' ) .'" ' . _array_get( $options, 'attr', '' ) . '>';
			endif;
			
			// URL da imagem para retina
			$returl = isset( $sizes[ $retina ] ) ? get_site_url() . '/' . $sizes[ $retina ] : false;

			if( $source ):

				if( $returl ):

					$return = ( USE_WEBP ? '<source type="image/webp" srcset="'. $returl .'.webp, '. $image_url .'.webp 2x"'. $_mquery .'>' : '' ) . '
						<source type="image/png" srcset="'. $returl .', '. $image_url .' 2x"'. $_mquery .'>
					';

				else:

					$return = ( USE_WEBP ? '<source type="image/webp" srcset="'. $image_url .'.webp"'. $_mquery .'>' : '' ) . '
						<source type="image/png" srcset="'. $image_url .'"'. $_mquery .'>
					';

				endif;

			else:


				// Picture tag
				$return = ( $nowrap ? '' : '<picture class="imagewp '. _array_get( $options, 'class' ) . '" ' . _array_get( $options, 'attr', '' ) . '>' );

				// Webp
				if( USE_WEBP ):
					$return .= '<source type="image/webp" srcset="'. $returl .'.webp, '. $image_url .'.webp 2x"'. $_mquery .'>';
				endif;

				if( $responsive ):

					foreach( $responsive as $resp_item ):

						// Image url
						$resp_item_style = _array_get( $resp_item, 'style' );
						$resp_item_url = get_site_url() . '/' . _array_get( $sizes, $resp_item_style );

						// Media query
						$resp_item_break = _array_get( $resp_item, 'break' );
						$resp_item_mquery = $resp_item_break ? ' media="'. $resp_item_break .'"' : '';
						
						// Retina style
						$resp_item_retina = _array_get( $resp_item, 'retina' );
						if( $resp_item_retina ):

							$resp_item_retina_url = get_site_url() . '/' . _array_get( $sizes, $resp_item_retina );
							
							$return .= ( USE_WEBP ? '<source type="image/webp" srcset="'. $resp_item_retina_url .'.webp, '. $resp_item_url .'.webp 2x"'. $resp_item_mquery .'>' : '' ) . '
								<source type="image/png" srcset="'. $resp_item_retina_url .', '. $image_url .' 2x"'. $resp_item_mquery .'>
							';
						
						else:

							$return .= ( USE_WEBP ? '<source type="image/webp" srcset="' . $resp_item_url . '.webp"' . $resp_item_mquery . '>' : '' ) . '
								<source type="image/png" srcset="' . $resp_item_url . '"' . $resp_item_mquery . '>
							';

						endif;

					endforeach;

				endif;

				$return .= '<img src="'. $returl .'" srcset="'. $image_url .' 2x" alt="' . ( $alt ? $alt : ' ' ) . '">
				' . ( $nowrap ? '' : '</picture>' );

			endif;

		else:

			if( !$css && !empty( $childs ) && !on( $options, 'origin' ) ):

				$_image_insert = false;

				foreach( $childs as $key => $child ):

					$_child_url = _array_get( $child, $style );

					if( $_child_url ):
						$_image_insert = $child[ $options[ 'style' ] ];
					elseif( !$_image_insert ):
						$_image_insert = isset( $child[ 'resized' ] ) ? $child[ 'resized' ] : reset( $child );
					endif;

				endforeach;

				$torender[] = $_image_insert;

			// Se não há derivações das imagens
			else:

				$image_id = is_array( $image_id ) ? reset( $images_ids ) : $image_id;
				$torender[] = str_replace( get_site_url(), '', wp_get_attachment_url( $image_id ) );
			
			endif;

			// Escrevendo os HTMLs das imagens
			foreach( $torender as $key => $item ):

				// Extensão da imagem
				$ext = end( explode( '.', $item ) );

				if( on( $options, 'urls' ) ):

					$return = get_site_url() . '/' . $item;

				elseif( $css ):

					$imgurl = get_site_url() . $item;
					$selector = _array_get( $css, 'sel' );
					$breakpoint = _array_get( $css, 'break' );

					// Retina
					if( $retina ):
					
						$_childs = reset( $childs );
						$_retina = get_site_url() . '/' . _array_get( $_childs, $retina );

						if( $_retina ):

							$retina = $imgurl;
							$imgurl = $_retina;

						endif;
					
					else:
					
						$_retina = false;
					
					endif;

					$_item_styles = ( $breakpoint ? '@media('. $breakpoint .'){' : '' );

					if( USE_WEBP ):

						$_item_styles .= $selector . '{
							background-image: url(\''. $imgurl .'\');' . ( $ext != 'svg' || $ext != 'gif' ? ( '
							background-image: -webkit-image-set(
							    url(\''. $imgurl .'.webp\') 1x
							    '. ( $retina ? ', url(\'' . $retina . '\') 2x ,url(\'' . $retina . '.webp\') 2x' : '' ) .'
							);
                   			background-image: image-set(
							    url(\''. $imgurl .'.webp\') 1x
							    '. ( $retina ? ', url(\'' . $retina . '\') 2x, url(\'' . $retina . '.webp\') 2x' : '' ) .'
							);' ) : '' ) . '
						}';

					else:

						$_item_styles .= $selector . '{
							background-image: url(\''. $imgurl .'\');';
							if( $retina && $ext != 'svg' && $ext != 'gif' ):
								$_item_styles .= '
									background-image: -webkit-image-set(url(\'' . $retina . '\') 2x);
                   					background-image: image-set(url(\'' . $retina . '\') 2x);
                   				';
							endif;
						$_item_styles .= '}';

					endif;

					$_item_styles .= ( $breakpoint ? '}' : '' );

					$return = '<style type="text/css">' . $_item_styles . '</style>';

				else:

					if( $ext == 'svg' || $ext == 'gif' ):

						$attr = _array_get( $options, 'attr', '' );

						if( $ext == 'svg' && on( $options, 'svgcode' ) ):

							$return = file_get_contents( ABSPATH . $item );

							// str_replace( '<svg ', '<svg id="logo-' . $uniqid . '" preserveAspectRatio="none" viewBox="0 0 433 143"', $logo )

							// Preserv aspection ratio
							if( strpos( $return, 'preserveAspectRatio' ) === false ):
								$return = str_replace( '<svg ', '<svg preserveAspectRatio="none" ', $return );
							endif;
							
							// Viewbox
							if( strpos( $return, 'viewBox' ) === false ):
								$doc = simplexml_load_string( $return );
								$attrs = $doc->attributes();
								$return = str_replace( '<svg ', '<svg viewBox="0 0 '. $attrs[ 'width' ] .' '. $attrs[ 'height' ] .'" ', $return );
							endif;

							if( $attr != '' ):
								$return = str_replace( '<svg ', '<svg ' . $attr . ' ', $return );
							endif;

						else:

							$return = '<img src="'. get_site_url( null, $item ) .'" class="imagewp '. _array_get( $options, 'class', '' ) .'" alt="'. _array_get( $options, 'alt', ' ' ) .'"' . $attr . '>';

						endif;
					
					else:

						$_mquery = $breakpoint ? ' media="'. $breakpoint .'"' : '';

						$return = ( $nowrap ? '' : '<picture class="imagewp '. _array_get( $options, 'class', '' ) . '" '. _array_get( $options, 'attr', '' ) .'>' ); 
						
						$return .= ( USE_WEBP ? '<source srcset="'. get_site_url( null, $item ) .'.webp" type="image/webp">' : '' ) .
							'<source srcset="'. get_site_url( null, $item ) .'" type="image/png"'. $_mquery .'>
							<img src="'. get_site_url( null, $item ) .'" alt="'. _array_get( $options, 'alt', ' ' ) .'">';
						
						$return .= ( $nowrap ? '' : '</picture>' );
					
					endif;

				endif;

			endforeach;

		endif;

		return $return;

	}

	public static function render_value( $value, $options = array() ){
		
		// Image url
		$url = imagewp::get_value_url( $value, $options );
		
		// CSS
		$sel = _array_get( $options, 'sel' );

		// Childs
		$childs = _array_get( $value, 'childs' );
		if( $childs ) $childs = reset( $childs );

		// Style
		$style = _array_get( $options, 'style' );
		
		// Retina
		$ret = _array_get( $options, 'ret' );
		if( !$ret && !$style && isset( $childs[ 'ret' ] ) ):
			$ret = 'ret';
		endif;

		// URL retina
		$url_ret = $ret ? imagewp::get_value_url( $value, [ 'style' => $ret ] ) : false;

		// Breakpoint
		$break = _array_get( $options, 'break' );

		// Just URL
		if( on( $options, 'url' ) ):
			
			return $url;

		elseif( $sel ):

			$css = ( $break ? '@media('. $break . '){' : '' );

			if( $url_ret ):

				$css .= $sel . "{
					background-image: url('$url_ret');
					background-image: -webkit-image-set(
					    " . ( USE_WEBP ? "url('$url_ret.webp') 1x," : "" ) . "
					    url('$url') 2x
					    " . ( USE_WEBP ? ", url('$url.webp') 2x" : "" ) . "
					);
					background-image: image-set(
					    " . ( USE_WEBP ? "url('$url_ret.webp') 1x," : "" ) . "
					    url('$url') 2x
					    " . ( USE_WEBP ? ", url('$url.webp') 2x" : "" ) . "
					);
				}";

			else:

				$css .= $sel . "{
					background-image: url('$url');
					background-image: -webkit-image-set(
					    url('$url.webp') 1x
					);
					background-image: image-set(
					    url('$url.webp') 1x
					);
				}"; 
				
			endif;

			$css .= ( $break ? '}' : '' );

			return '<style type="text/css">'. $css .'</style>';

		else:

			$alt = _array_get( $options, 'alt', ' ' );

			if( $url_ret ):

				return '<picture>
					' . ( USE_WEBP ? '<source type="image/webp" srcset="'. $url_ret .'.webp, '. $url .'.webp 2x">' : '' ) . 
					'<img src="'. $url_ret .'" srcset="'. $url .' 2x" alt="' . $alt . '">
				</picture>';

			else:

				return '<picture>
					' . ( USE_WEBP ? '<source type="image/webp" srcset="'. $url .'.webp">' : '' ) . 
					'<img src="'. $url .'"' . ( $alt ? ' alt="' . $alt . '"' : '' ) . '>
				</picture>';

			endif;
		
		endif;
		
	}

	public static function get_value_url( $value, $options = array() ){
		
		$ids = _array_get( $value, 'ids' );
		if( empty( $value ) || empty( $ids ) ) return false;

		$childs = _array_get( $value, 'childs' );
		if( !is_array( $ids ) ) $ids = explode( ',', $ids );

		if( !$childs ):

			return wp_get_attachment_url( reset( $ids ) );

		else:

			$childs = reset( $childs );
			$style = _array_get( $options, 'style', 'resized' );
			$path = _array_get( $childs, $style );
			if( !$path ):
				$path = _array_get( $childs, 'cropped' );
			endif;
			if( !$path ):
				$path = reset( $childs );
			endif;

		endif;

		return $path ? get_site_url( null, $path ) : false;
		
	}

	public static function is_empty( $field ){
		if( isset( $field[ 'value' ][ 'ids' ] ) && !empty( $field[ 'value' ][ 'ids' ] ) ):
			return false;
		elseif( isset( $field[ 'value' ][ 0 ][ 'ids' ] ) && !empty( $field[ 'value' ][ 0 ][ 'ids' ] ) ):
			return false;
		endif;
		return true;
	}

	public static function post_delete( $field, $post ){

		$meta = get_post_meta( $post->ID, $field[ 'machine_name' ] );
		if( empty( $meta ) ) return true;

		foreach( $meta as $value ):
			$value = imagewp::unserialize( $value  );
			$childs = _array_get( $value, 'childs' );
			if( $childs ) image::deleteChilds( $childs );
		endforeach;

	}

	public static function add_files( $field ){

		// Fancybox
		Piki::add_library( 'fancybox' );

		// Jquery migrate
		Piki::add_library( 'jquery-migrate' );

	    $filesdir = Piki::url( '/', __FILE__ );

	    wp_enqueue_script( 'imagewp-scripts', $filesdir . 'imagewp.js', array( 'jquery' ), false, true );
	    wp_enqueue_style( 'imagewp-styles', $filesdir . 'imagewp.css' );
	   
	    // Arquivos para o crop
	    if( image::croppable( $field ) ):
			wp_enqueue_script( 'crop-script', $filesdir . 'Jcrop/js/jquery.Jcrop.min.js', array( 'jquery' ), '1.0.0', true );
			wp_enqueue_style( 'crop-style', $filesdir . 'Jcrop/css/jquery.Jcrop.css' );
	    endif;

	    // WP Media
		wp_enqueue_media();
	
	}

	public static function get_settings_fields( $values ){
		$fields = PikiFields::get_comum_fields();

		// Galeria de imagens?
		$fields[ 'gallery' ] = array(
			'label' => 'Seleção multipla?',
			'ftype' => 'boolean',
			'machine_name' => 'gallery'
		);
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

	public static function dummy( $field ){
		return [
			'ids' => image::getDummyID()
		];
	}

    // Busca campos de imagens de um tipo de post
	public static function onDeletePost( $postid, $post ){
        
        // Configurações do tipo de post
        $settings = PikiForms::get_form_settings( $post_type );

        // Se não existem campos para o tipo de post
        if( !$settings || empty( $settings[ 'fields' ] ) ):
            return true;
        endif;

        // Campos de imagens, atrelados ao tipo de post
        $image_fields = PikiFields::extract_field( $settings[ 'fields' ], array( 'image', 'imagewp' ), 'ftype', false );
        if( empty( $image_fields ) ) return true;

        foreach( $image_fields as $field ):
        	self::delete_meta( $field, $postid, $settings[ 'data_type' ], $settings[ 'data_table' ] );
        endforeach;

	}

}

// On delete post
add_action( 'before_delete_post', [ 'imagewp', 'onDeletePost' ], 99, 2 );
