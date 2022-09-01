<?php
// Optimize images
use Spatie\ImageOptimizer\OptimizerChainFactory;
use WebPConvert\WebPConvert;

class images {
	
	var $url;
	var $realpath;
	var $width;
	var $height;
	var $original_width;
	var $original_height;
	var $max_width = 0;
	var $max_height = 0;
	var $sentido = "w";
	var $upsize = false;
	var $formats = array( 'jpg','jpeg', 'png', 'gif', 'wbmp' );
	var $quality = 90;
	var $directory;
	var $savename;
	var $savepath;
	var $mimeType;
	var $relativepath;
	var $error = false;
	
	// Método construtor
	function __construct( $confs = array() ){

		if( !empty( $confs ) ):

			// Arrayfy
			if( !is_array( $confs ) ):

				// Set path to URL
				if( strpos( $confs, ABSPATH ) === 0 ):
					$url = get_site_url( null, str_replace( ABSPATH, '', realpath( $confs ) ) );
					$this->set_url( $url );
				endif;

				$this->set_path( $confs );
				$this->set_savepath( dirname( $confs ) );
				$this->set_savename( basename( $confs ) );
			
			else:		
				
				// PATH
				if( isset( $confs[ 'path' ] ) ):
					$this->set_path( $confs[ 'path' ] );
				endif;
				
				// URL
				if( isset( $confs[ 'url' ] ) ):
					$this->set_url( $confs[ 'url' ] );
				endif;
				
				// Savepath
				if( isset( $confs[ 'savepath' ] ) ):
					$this->set_savepath( $confs[ 'savepath' ] );
				endif;
			
				// Savename
				if( isset( $confs[ 'savename' ] ) ):
					$this->set_savename( $confs[ 'savename' ] );
				endif;
			
				// Quality
				if( isset( $confs[ 'quality' ] ) ):
					$this->set_quality( $confs[ 'quality' ] );
				endif;
			
			endif;

		endif;

		$this->get_info();

	}

	function set_quality( $quality ){
		$this->quality = $quality;
	}

	// Image info
	function get_info(){

		$image_info = getimagesize( $this->realpath );
		if( !is_array( $image_info ) ):
			$this->error = 'Impossível recuperar informações da imagem ' . $this->realpath;
			return;
		endif;

		$this->width = $image_info[ 0 ];
		$this->height = $image_info[ 1 ];
		$this->mimeType = $image_info[ 'mime' ];
		$this->directory = rtrim( dirname( $this->realpath ), '/' );
		$this->extension = pathinfo( $this->realpath, PATHINFO_EXTENSION );

	}

	function set_url( $url ){

		// Dimensões originais
		if( is_array( $url ) ):

			list( $this->width, $this->height ) = $url;

		else:

			// Set path based on URL
			if( empty( $this->realpath ) ):
				$relative = $this->relative_path( $url );
				$this->set_path( rtrim( ABSPATH, '/' ) . '/' . $relative );
			endif;
			
			// Se o arquivo não existe
			if( !file_exists( $this->realpath ) ):
				$this->error = 'O arquivo ' . $url . ' não existe.';
				exit();
			endif;

		endif;

		$this->url = $url;
	
	}

	function set_path( $path ){
		$this->realpath = realpath( $path );
	}

	function set_sigla( $sigla ){
		$this->savename = $this->add_sigla_name( basename( $this->url ), $sigla );
	}

	function set_savename( $savename ){
		$this->savename = $savename;
	}

	function set_savepath( $savepath ){
		$this->savepath = $savepath;
		$this->set_savename( basename( $savepath ) );
	}

	function relative_path( $uri ){

		$relative = ltrim( wp_make_link_relative( $uri ), '/' );	
		// Correção pastas
		$relative = str_replace( 'var/www/html/wordpress/files', 'wp-content/uploads', $relative );
				
		if( ( $wpcontent = strpos( $relative, 'wp-content' ) ) !== 0 ):
			$relative = substr( $relative, $wpcontent );
		endif;
		
		return $relative;
	
	}

	/*******************************************************************************************
	** DIMENSOES DA IMAGEM
	*******************************************************************************************/

	// Método que informa as coordenadas de um elemento 'cropado'
	function get_size_cropped( $width, $height, $position=0, $upsize=true ){

		// Redimensiona a imagem proporcionalmente com a largura fixa
		$new_size = $this->get_size_by_width( $width, $upsize );

		// Se com o redimensionamento a altura da imagem, ficou menor do que o indicado, a imagem é redimensionada pela altura
		if( $new_size[ 'height' ] < $height ){
			$new_size = $this->get_size_by_height( $height, $upsize );
		}
		// Sobras para cropar
		$new_size[ 'lastX' ] = $new_size[ 'width' ] - $width;
		$new_size[ 'lastY' ] = $new_size[ 'height' ] - $height;

		if( $position !== 0 ){
			
			// Calcula a posição
			list( $posX, $posY ) = str_split( $position );
			
			// posicão left
			if( $posX != 'c' && $posX != 'l' && $posX != 'r' ){
				exit('A posição ' . $position . ' não é válida.');
			}
			if( is_numeric( $new_size[ 'lastX' ] ) && $new_size[ 'lastX' ] > 0 ){
				switch( $posX ){
					case 'c': $new_size[ 'startX' ] = floor( $new_size[ 'lastX' ] / 2 ); break;
					case 'r': $new_size[ 'startX' ] = $new_size[ 'lastX' ]; break;
				}
			}
			else { $new_size[ 'startX' ] = 0; }
		
			// posicão top
			if( $posY != "m" && $posY != "t" && $posY != "b" ){
				exit( 'A posição ' . $position . ' não é válida.' );
			}
			if( is_numeric( $new_size[ 'lastY' ] ) && $new_size[ 'lastY' ] > 0 ){
				switch( $posY ){
					case "m": $new_size[ 'startY' ] = floor( $new_size[ 'lastY'] / 2 ); break;
					case "b": $new_size[ 'startY' ] = $new_size[ 'lastY' ]; break;
				}
			}
			else { $new_size[ 'startY' ] = 0; }
			
			$new_size[ 'startX' ] *= -1;
			$new_size[ 'startY' ] *= -1;
				
		}
		
		return $new_size;
	}
	
	// Redimensiona com tamanho horizontal fixo, sem crop
	function get_size_by_width( $width, $upsize = true ){
		
		// Se a imagem é menor do que o limite e não pode ser aumentada
		if( $width > $this->width && $this->upsize !== true ):
			return array(
				"width" => $this->width, 
				"height" => $this->height,
			);
		endif;
		return array(
			"width" => $width, 
			"height" => ceil( ( $this->height * $width ) / $this->width ),
		);

	}
	
	// Redimensiona com tamanho vertical fixo, sem crop
	function get_size_by_height( $height, $upsize = true ){
		
		// Se a imagem é menor do que o limite e não pode ser aumentada
		if( $height > $this->height && $this->upsize !== true ):
			return array(
				"width" => $this->width, 
				"height" => $this->height,
			);
		endif;
		return array(
			"width" => ceil( ( $this->width * $height ) / $this->height ),
			"height" => $height,
		);
	
	}

	function get_timthumb_size( $new_width = 0, $new_height = 0, $zoom_crop = 1, $quality = 100, $align = 'c', $sharpen = 0, $canvas_color = 'ffffff' ){
		// Get original width and height
		$origin_x = 0;
		$origin_y = 0;
		// generate new w/h if not provided
		if ( $new_width && $new_height == 0 ) {
			$new_height = floor ( $this->height * ( $new_width / $this->width ) );
		} else if ( $new_height && $new_width == 0 ) {
			$new_width = floor ( $this->width * ( $new_height / $this->height ) );
		}
		// scale down and add borders
		if ( $zoom_crop == 3 ) {
			$final_height = $this->height * ( $new_width / $this->width );
			if ( $final_height > $new_height ) {
				$new_width = $this->width * ( $new_height / $this->height );
			} else {
				$new_height = $final_height;
			}
		}
		// Scale down and add borders
		if ( $zoom_crop == 2 ) {
			$final_height = $this->height * ( $new_width / $this->width );
			if ( $final_height > $new_height ) {
				$origin_x = $new_width / 2;
				$new_width = $this->width * ( $new_height / $this->height );
				$origin_x = round ( $origin_x - ( $new_width / 2 ) );
			} else {
				$origin_y = $new_height / 2;
				$new_height = $final_height;
				$origin_y = round ( $origin_y - ( $new_height / 2 ) );
			}
		}
		// Zoom crop
		if ( $zoom_crop > 0 ) {
			$src_x = $src_y = 0;
			$src_w = $this->width;
			$src_h = $this->height;
			$cmp_x = $this->width / $new_width;
			$cmp_y = $this->height / $new_height;
			// calculate x or y coordinate and width or height of source
			if ( $cmp_x > $cmp_y ) {
				$src_w = round( $this->width / $cmp_x * $cmp_y );
				$src_x = round( ( $this->width - ( $this->width / $cmp_x * $cmp_y ) ) / 2 );
			} else if ( $cmp_y > $cmp_x ) {
				$src_h = round ( $this->height / $cmp_y * $cmp_x );
				$src_y = round ( ( $this->height - ( $this->height / $cmp_y * $cmp_x ) ) / 2 );
			}
			// positional cropping!
			if ( $align ) {
				if ( strpos ($align, 't' ) !== false) {
					$src_y = 0;
				}
				if (strpos ( $align, 'b' ) !== false) {
					$src_y = $this->height - $src_h;
				}
				if ( strpos ( $align, 'l' ) !== false ) {
					$src_x = 0;
				}
				if ( strpos ( $align, 'r' ) !== false ) {
					$src_x = $this->width - $src_w;
				}
			}
			return array( 
				'_x_destino' => $origin_x, 
				'_y_destino' => $origin_y, 
				'_x_source' => $src_x, 
				'_y_source' => $src_y, 
				'width_destino' => $new_width, 
				'height_destino' => $new_height, 
				'width_source' => $src_w, 
				'height_source' => $src_h 
			);
		} 
		else {
			return array(
				'_x_destino' => 0, 
				'_y_destino' => 0, 
				'_x_source' => 0, 
				'_y_source' => 0, 
				'width_destino' => $new_width, 
				'height_destino' => $new_height, 
				'width_source' => $this->width, 
				'height_source' => $this->height 
			);
		}
	}

	// Crop image by limits
	function getByLimits( $info, $width, $height ){

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

	/*******************************************************************************************
	** RETORNA O HTML QUE FORÇA O REDIMENSIONAMENTO DE UMA IMAGEM
	*******************************************************************************************/

	// Retorna a imagem redimensionada com largura fixa
	function get_html_by_width($width, $upsize=true){
		// medida modificada pela largura
		$size = $this->get_size_by_width($width);
		return '<img src="' . $this->url . '" width="' . $size[ 'width' ] . '" height="' . $size[ ' height' ] . '">';
	}

	// Retorna a imagem redimensionada com alutra fixa
	function get_html_by_height($height, $upsize=true){
		// medida modificada pela largura
		$size = $this->get_size_by_height($height);
		return '<img src="' . $this->url . '" width="' . $size[ 'width' ] . '" height="' . $size[ 'height' ] . '">';
	}

	// Retorna a imagem redimensionada 'cropada'
	function get_html_croped( $widht, $height, $position='cm', $upsize = true ){
		// medida modificada pela largura
		$size = $this->get_size_cropped($widht, $height, $position );
		// Html de retorno
		echo '<div style="width:'.$widht.'px; height:'.$height.'px; position: relative; overflow: hidden;">
			<img src="' . $this->url . '" width="' . $size[ 'width' ] . '" height="' . $size[ 'height' ] . '" style="position:absolute; top:-' . $size[ 'startY' ] . 'px; left:-' . $size[ 'startX' ] . 'px;">
		</div>';
	}

	/*******************************************************************************************
	** REDIMENSIONA E CROPA IMAGEM
	*******************************************************************************************/

	// medida modificada pela largura
	function create_by_width( $width, $upsize = true ){
		$size = $this->get_size_by_width( $width, $upsize );
		return $this->create_new_image( $size[ 'width' ], $size[ 'height' ], $this->width, $this->height, 0, 0, $size[ 'width' ], $size[ 'height' ], 0, 0 );
	}

	// medida modificada pela largura
	function create_by_height( $height, $upsize = true ){
		$size = $this->get_size_by_height( $height, $upsize );
		return $this->create_new_image( $size[ 'width' ], $size[ 'height' ], $this->width, $this->height, 0, 0, $size[ 'width' ], $size[ 'height' ], 0, 0 );
	}

	// medida modificada pela largura
	function create_by_limits( $width, $height, $upsize = true ){
		$size = $this->get_size_by_width( $width, $upsize );
		if( $size[ 'height' ] > $height ):
			$size = $this->get_size_by_height( $height, $upsize );
		endif;
		$size[ 'url' ] = $this->create_new_image( $size[ 'width' ], $size[ 'height' ], $this->width, $this->height, 0, 0, $size[ 'width' ], $size[ 'height' ], 0, 0 );
		return $size;
	}

	public function create_fixed_size( $width, $height ){		
		return $this->create_new_image( $width, $height, $this->width, $this->height, 0, 0, $width, $height, 0, 0 );
	}

	// Retorna a imagem redimensionada 'cropada'
	function create_croped( $width, $height, $position = 'c' ){
	
		// Sizes
		$size = $this->get_timthumb_size( $width, $height, $position );
	
		// generate new w/h if not provided
		if ( $width && $height == 0 ) {
			$height = floor ( $this->height * ( $width / $this->width ) );
		} 
		else if ( $height && $width == 0 ) {
			$width = floor ( $this->width * ( $height / $this->height ) );
		}
	
		// Cria a imagem
		$size[ 'url' ] = $this->create_new_image( $width, $height, $size[ 'width_source' ], $size[ 'height_source' ], $size[ '_x_source' ], $size[ '_y_source' ], $size[ 'width_destino' ], $size[ 'height_destino' ], $size[ '_x_destino' ], $size[ '_y_destino' ] );
		$size[ 'width' ] = $width;
		$size[ 'height' ] = $height;
	
		return $size;
	
	}

	function create_new_image( $width_frame, $height_frame, $width_source = 0, $height_source = 0, $_x_source = 0, $_y_source = 0, $width_destino = 0, $height_destino = 0, $_x_destino = 0, $_y_destino = 0, $savepath = false, $sharpen = false ){

		require_once( ABSPATH . 'wp-admin/includes/image.php' );

		// Verifica se o arquivo existe
		if( !file_exists( $this->realpath ) ){
			echo( "A imagem " . $this->realpath . " não existe. Arquivo: class.image.inc, Método: create_new_image" );
			return false;
		}

		// Verifica se o diretório existe
		if( !is_dir( $this->directory ) ){
			echo 'O diretório informado não é válido';
			return false;
		}

		// Verifica se o tipo de arquivo é suportado
		if( !file_is_displayable_image( $this->realpath ) ){
			echo 'O tipo de arquivo '. $this->realpath .' é inválido.';
			return false;
		}

		if( $width_source === 0 ){ $width_source = $this->width; }
		if( $height_source === 0 ){ $height_source = $this->height; }

		if( $width_destino === 0 ){ $width_destino = $width_frame; }
		if( $height_destino === 0 ){ $height_destino = $height_frame; }

		// Matriz para a criação da imagem
		$matriz = images::imagecreatefrom( $this->realpath );

		if( !is_resource( $matriz ) ):
			$this->error = 'Invalid image';
			return false;
		endif;

		if( empty( $savepath ) ):
			$savepath = $this->get_result_path();
		endif;

		$new_image = imagecreatetruecolor( $width_frame, $height_frame );

		// preserve transparency
		if( $this->extension == "gif" || $this->extension == "png" ):
			imagecolortransparent( $new_image, imagecolorallocatealpha( $new_image, 0, 0, 0, 127 ) );
			imagealphablending( $new_image, false );
			imagesavealpha( $new_image, true );
		endif;

		// sharpen image
		if ( $sharpen && function_exists( 'imageconvolution' ) ):
			$sharpenMatrix = array (
				array ( -1, -1, -1 ),
				array ( -1, 16, -1 ),
				array ( -1, -1, -1 ),
			);
			$divisor = 8;
			$offset = 0;
			imageconvolution ( $new_image, $sharpenMatrix, $divisor, $offset );
		endif;

		imagecopyresampled ( $new_image, $matriz, $_x_destino, $_y_destino, $_x_source, $_y_source, $width_destino, $height_destino, $width_source, $height_source );

		if( !images::doimage( $this->extension, $new_image, $savepath, $this->quality ) ){
			echo "A imagem " . $savepath . " não pode ser salva.";
			return false;
		}		

		// Remove a imagem base
		imagedestroy( $new_image );

		// Optimize
		images::optimize( $savepath );
		
		return [
			'path' => $savepath,
			'url' => $this->get_result_url(),
			'relative' => $this->relative_path( $savepath ),
		];

	}

	function get_result_url(){
		return dirname( $this->url ) . '/' . $this->savename;
	}

	function get_result_path(){
		return $this->directory . '/' . $this->savename;
	}

	function exists_result(){
		return file_exists( $this->get_result_path() );
	}

	public static function imagecreatefrom( $path ){

		$extension = pathinfo( $path, PATHINFO_EXTENSION );
		if( $extension == 'jpg' ):
			$extension = 'jpeg';
		endif;

		$resource = call_user_func( 'imagecreatefrom' . $extension, $path );
		if( !is_resource( $resource ) ):
			return false;
		endif;

		return $resource;

	}

	public static function doimage( $type, $image, $path, $quality = 90 ){

		// Get type by path
		if( empty( $type ) ):
			$type = pathinfo( $path, PATHINFO_EXTENSION );
		endif;

		switch( $type ){
			case "jpg": case "jpeg":
				return imagejpeg( $image, $path, $quality );
			break;
			case "png":
				$quality = round( ( $quality * 9 ) / 100 );
				return imagepng( $image, $path, $quality );
			break;
			case "gif":
				return imagegif( $image, $path );
			break;
			case "webp":
				return imagewebp( $image, $path, 100 );
			break;
			case "wbmp":
				return imagewbmp( $image, $path );
			break;
		}
		return false;
	}

	function add_sigla_name( $nameOrigem, $diffNome ){
		// Divide a url
		$cacosArquivo = explode( "/", $nameOrigem );
		// Retira o nome do arquivo da url
		$nameArquivo = array_pop( $cacosArquivo );
		// Explode o nome do arquivo
		$cacosNome = explode( ".", $nameArquivo );
		// Retira a extensão do nome do arquivo
		$extensao = array_pop( $cacosNome );
		// Monta o novo nome do arquivo
		$cacosArquivo[] = implode( ".", $cacosNome ) . "_" . $diffNome . "." . $extensao;
		// Retorna a nova url com o novo nome do arquivo
		return implode( "/", $cacosArquivo );
	}

	public static function optimize( $path ){
		PikiImages::optimizeImage( $path );
	}

}