<?php

class file extends PikiField {
	
	function __construct(){
		// Label do campo
		self::set_label( 'Arquivo' );
	}
		
	// Mime types
	function getMimes( $exts, $revert = false ){
		require_once( __DIR__ . '/mimetypes.php' );
		return pkmimes( $exts, $revert );
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

		// Formats
		$ftypes = _array_get( $field, 'accepts' );

		// Limits desc
		$lstype = count( $ftypes ) > 1 ? array_pop( $ftypes ) : false;

		if( $lstype ):
			$default_desc = '(<strong>' . implode( '</strong>, <strong>', $ftypes ) . '</strong> ou <strong>'. $lstype .'</strong> de até {MAXSIZE})';
		else:
			$default_desc = '(<strong>' . reset( $ftypes ) . '</strong> de até {MAXSIZE})';
		endif;
		
		$limit_desc = _array_get( $field, 'limits_desc', $default_desc );
		$limit_desc = '<div class="limits-desc">'. str_replace( '{MAXSIZE}', $maxSizeLabel, $limit_desc ) .'</div>';
		$limit_desc_position = _array_get( $field, 'limit_desc_position' );

		// Button label
		$buttonLabel = _array_get( $field, 'button_label', 'Selecionar' );

		// Max items
		$maxItems = _array_get( $field, 'maxitems' );
		
		$html =  '<div class="ftype-file item-file '. ( self::isMultiple( $field ) ? 'multiple' : 'single' ) .'"'. ( self::isMultiple( $field ) ? 'data-max-items="'. $maxItems .'"' : '' ) .'>';
		

		// Desc on top
		if( $limit_desc_position != 'bottom' ):
			$html .= $limit_desc;
		endif;

		// Allowed mime types
		$accepts = _array_get( $field, 'accepts' );
		if( !$accepts ):
			$mimes = [ 'file/*' ];
		else:

			// MP3
			if( count( $accepts ) == 1 && reset( $accepts ) == 'mp3' ):
				$mimes = [ '.mp3', 'audio/*' ];
			else:
				$mimes = self::getMimes( $accepts );
			endif;
		
		endif;

		// File id
		$file_id = _array_get( $value, 'file_id' );
		if( $file_id ):
			
			// Post do arquivo
			$file = get_post( $file_id );

			// Imagem com tamanho real
			$fileurl = wp_get_attachment_url( $file->ID, 'full' );

			// Nonce
			$nonce = wp_create_nonce( 'delete-trabalho-' . $file->ID );

			// Icon
			$mime = get_post_mime_type( $file_id );
			$ext = file::getMimes( $mime, true );
			$ext = $ext ? reset( $ext ) : 'file';
			
			// Media thumbs
			$html .= '
			<div class="media-thumbs">
				<div class="thumbnail" rel="'. $file->ID .'">
					<div>
						<i class="'. $ext .'"><img src="' . wp_mime_type_icon( $file->post_mime_type ) . '" alt="' . $file->post_title . '"></i>
						<a href="' . $fileurl . '" target="_blank" class="action preview" title="Visualizar arquivo">'. basename( $fileurl ) .'</a>
					</div>
					<button type="button" data-file-id="' . $file->ID . '" data-token="'. $nonce .'" data-action="delete">Remover arquivo</button>
				</div>
			</div>
			';

			$buttonLabel = _array_get( $field, 'button_replace_label', 'Substituir' );
		
		endif;
		
		$field[ 'value' ] = '';
		$html .= '	<div class="selection-wrapper"' . ( !!$file_id ? ' style="display:none"' : '' ) . '>';
		$html .= '		<div>
							<input placeholder="' . _array_get( $field, 'placeholder', 'Selecione um arquivo' ) . '" class="address" disabled="disabled">';
		$html .= '			<div class="field">
								<input type="file" name="'. $field[ 'name_html' ] .'" id="'. $field[ 'id' ] .'" accept="'. implode( ', ', $mimes ) .'" size="1" title="'. $buttonLabel .'" data-max-size="'. $maxSize .'" data-max-size-label="'. $maxSizeLabel .'"';
									parent::set_attributes( $html, $field );
		$html .= '				>
							</div>
						</div>';
		
		// Limit desc on bottom
		if( $limit_desc_position == 'bottom' ):
			$html .= $limit_desc;
		endif;
		
		$html .= '	</div>';

		// File ID
		$_file_id = $field;
		$_file_id[ 'value' ] = $file_id;
		parent::set_as_child( $_file_id, 'file_id' );
		parent::add_attributes( $_file_id, array( 'class' => 'file-id' ) );
		$html .= hidden::get_field( $_file_id );

		// UNIQUE ID
		$unique_id = $field;
		$unique_id[ 'value' ] = md5(uniqid(rand(), true));
		parent::set_as_child( $unique_id, 'unique_id' );
		parent::add_attributes( $unique_id, array( 'class' => 'unique-id' ) );
		$html .= hidden::get_field( $unique_id );
			
		$html .= '</div>';

		self::add_files();

		return $html;
	}

	public static function change_meta_values( $field, $meta, $data_type = 'post', $data_table = false ){

		// Value
		$values = _array_get( $meta, $field[ 'machine_name' ] );
		$value = $values ? reset( $values ) : false;

		if( $value && is_string( $value ) ):
			$bdecode = base64_decode( $value, true );
			$value = unserialize( !$bdecode ? $value : $bdecode );				
		endif;

		// Retorna o array de resultados		
		return $value;
	
	}

	// Validação do campo
	public static function validate( $field, $action ){

		require_once( ABSPATH . "wp-admin" . '/includes/file.php' );

		$value = _array_get( $field, 'value' );

		if( self::isMultiple( $field ) ):

		else:

			// Edition mode
			if( intVal( $value[ 'file_id' ] ) > 0 ) return true;
			
			// Max size
			$maxSize = self::getMaxsize( $field );	

			// Filetypes
			$accepts = _array_get( $field, 'accepts' );

			// values
			$size = _array_get( $value, 'size' );
			$tmp_name = _array_get( $value, 'tmp_name' );
			$name = _array_get( $value, 'name' );
			$type = _array_get( $value, 'type' );

			// Error desc
			$error = '';

			// Empty
			if( parent::is_required( $field ) && empty( $name ) ):
				
				$error = PikiField::getErrorMessage( $field, 'required' );
			
			// Maxsize problem
			elseif( $name && ( $value[ 'size' ] > $maxSize || empty( $tmp_name ) ) ):

				$error = PikiField::getErrorMessage( $field, 'maxsize', array( '{SIZE}' => size_format( $maxSize, 0 ) ) );

			// Format problem
			elseif( $name && !self::validateType( $field, $type ) ):

				// Last extension
				$last = array_pop( $accepts );
				$error = 'O arquivo deve ser do tipo <strong>.';
				if( count( $accepts ) > 0 ):
					$error .= implode( '</strong>, <strong>.', $accepts ) . 'ou .' . $last;
				else:
					$error .= $last;
				endif;
				$error .= '</strong>';
		
			endif;

			if( $error != '' ):
				return $error;
			endif;

		endif;

		return true;

	}

	public static function validateType( $field, $type ){

		// Natives permitted types
		$natives = get_allowed_mime_types();

		// Get mime type extensions
		$exts = array_search( $type, $natives );		
		if( !$exts ) return false;

		// Explode extensions
		$exts = explode( '|', $exts );		

		// Allowed extensions to field
		$accepts = _array_get( $field, 'accepts', [ 'pdf' ] );

		// Valids
		$valids = array_intersect( $exts, $accepts );

		return !empty( $valids );

	}

	// Renderize values
	public static function renderize_values( $field, $options = [] ){

		// Values
		$value = _array_get( $field, 'value' );

		// Childs
		$childs = _array_get( $value, 'childs' );

		if( self::isMultiple( $field ) ):

			echo 'Implements field file multiple render';
		
		else:

			if( empty( $value ) ) return '';

			// File ID
			$file_id = _array_get( $value, 'file_id' );

			// Set URL value
			$field[ 'value' ] = wp_get_attachment_url( $file_id );

			// Set label
			$options[ 'label' ] = _array_get( $options, 'label' );
			if( $options[ 'label' ] == 'filename' ):
				$options[ 'label' ] = basename( $field[ 'value' ] );
			endif;

			// Icon
			if( on( $options, 'icon' ) ):
				$mime = get_post_mime_type( $file_id );
				$ext = file::getMimes( $mime, true );
				$ext = $ext ? reset( $ext ) : 'file';
				$options[ 'prefix' ] = '<i class="'. $ext .'">'. $ext .'</i>';
			endif;

			return url::renderize_values( $field, $options );

		endif;

	}

	// Saving meta
	public static function save_meta( $field, $ID, $value ){

		// Temp file name
		$tmp_name = _array_get( $value, 'tmp_name' );

		// File id from exists file
		$file_id = _array_get( $value, 'file_id' );

		// Upload da file
		if( !empty( $tmp_name ) && file_exists( $tmp_name ) ):
			$file_id = self::fileUpload( $value, $ID );
			$value[ 'file_id' ] = $file_id;
		endif;

		// Empty field
		if( empty( $file_id ) ) return true;

		// Image object
		$file = $file_id ? get_post( $file_id ) : false;
		if( empty( $file ) ) return true;

		// Clean
		unset( 
			$value[ 'tmp_name' ], 
			$value[ 'unique_id' ],
			$value[ 'error' ] 
		);

		// Serializa os dados
		$serial = base64_encode( serialize( $value ) );

		// Atualiza os valores no banco
		call_user_func( 'add_' . $field[ 'data_type' ] . '_meta', $ID, $field[ 'machine_name' ], $serial );

		return $value;

	}

	// Max file size
	public static function getMaxsize( $field ){
		$fieldMax = self::parseSize( _array_get( $field, 'maxsize', '2M' ) );
		return min( $fieldMax, wp_max_upload_size() );
	}

	// Image upload
	public static function fileUpload( $file, $parent_id = false ){

		require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
		require_once( ABSPATH . "wp-admin" . '/includes/media.php' );

		// Diretórios para upload
		$upload_dir = wp_upload_dir();
        $overrides = array( 'test_form' => false );
        $uploaded = wp_handle_upload( $file, $overrides );

		if ( array_key_exists( 'error', $uploaded ) ):
			Piki::error( $uploaded[ 'error' ] );
		endif;

		$attach_id = file::createAttachment( $uploaded[ 'file' ] );

		return $attach_id;
	
	}

	// Create attachment
	public static function createAttachment( $path ){
		
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

	// Checa se as filens anexadas possuem os arquivos físicos
	public static function checkFiles( &$files ){
		
		if( empty( $files ) ):
			return;
		endif;
		
		foreach( $files as $key => $img ):

			$path = get_attached_file( $img->ID );
			
			if( !file_exists( $path ) ):
				unset( $files[ $key ] );
			endif;

		endforeach;
	
	}

	// Remove file
	public static function unlink( $file ){
		if( file_exists( $file ) ):
			try {
				unlink( $file );
			} catch ( Exception $e ) {
			  echo "Erro ao remover arquivo: ",  $e->getMessage();
			}				
		endif;
	}

	public static function getObjects( $ids, $field ){

		if( is_string( $ids ) ):
			$ids = trim( $ids, ',' );
			$ids = explode( ',', $ids );
		endif;
		if( empty( $ids ) ):
			return false;
		endif;

		$files = get_posts(array(
			'posts_per_page' => -1,
			'post_type' => 'attachment',
			'include' => $ids
		));

		// Se não existem filens
		if( empty( $files ) ):
			return false;
		endif;

		// Reordena os valores
		if( on( $field, 'gallery' ) ):
			$sorted = array_flip( $ids );	
			foreach( $files as $file ):
				$sorted[ $file->ID ] = $file;
			endforeach;			
			return $sorted;
		else:
			return $files;
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

	public static function ajax_delete_file(){

		// Post parent
		$post_id = _post( 'post_id' );
		
		// File id
		$file_id = _post( 'file_id' );
		
		// Field key
		$field_key = _post( 'field_key' );
		
		// Security nonce
		$nonce = _post( 'nonce' );
		
		// Verify nonce
		if( !wp_verify_nonce( $nonce, 'delete-trabalho-' . $file_id ) ):
			Piki::error( 'O arquivo não pôde ser removido. Por favor, recarregue a página e tente novamente.' );
		endif;

		// Verify if user can delete file
		$file = get_post( $file_id );
		if( empty( $file ) ):
			Piki::error( 'O ID do arquivo é inválido.' );
		endif;
		
		// Verify User
		$user_id = get_current_user_id();
		if( empty( $user_id ) ):
			Piki::error( 'Você precisa estar logado para realizar esta ação.' );
		elseif( !is_super_admin() && $user_id != intVal( $file->post_author ) ):
			Piki::error( 'Você não tem permissão para realizar esta ação.' );
		endif;

		// Delete file
		if ( false === wp_delete_attachment( $file_id, true ) ):
			Piki::error( 'Erro ao remover arquivo: Erro desconhecido.' );
		endif;

		// Remove a filem do campo do post
		delete_post_meta( $post_id, $field_key );

		Piki::success( 'Arquivo removido com sucesso.' );
		
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
	    
		// Loading files
		Piki::add_library( 'filesloaded' );

	    // Scripts and Styles
	    wp_enqueue_script( 'file-field-scripts', Piki::url( 'scripts.js' , __FILE__ ) );
	    wp_enqueue_style( 'file-field-styles', Piki::url( 'styles.css' , __FILE__ ) );
	
	}

	public static function isMultiple( $field ){
		return _array_get( $field, 'maxitems' ) > 1;
	}

	public static function get_settings_fields( $values ){
		
		$fields = PikiFields::get_comum_fields();
		
		// Estilos da filem
		$fields[ 'alloweds' ] = array(
			'label' => 'Extenções permitidas (uma por linha)',
			'ftype' => 'textarea_options',
			'machine_name' => 'alloweds'
		);
		
		PikiFields::set_fields_values( $fields, $values );
		return $fields;
	
	}

	public static function getDummyID(){
		
		$dummy_id = get_option( 'pkfield_file_dummy_id' );
		if( $dummy_id ):
			$dummy = get_post( $dummy_id );
			if( empty( $dummy ) ):
				$dummy_id = false;
				delete_option( 'pkfield_file_dummy_id' );
			endif;
		endif;
		if( !$dummy_id ):
			$dummy_id = file::createDummyImage();
		endif;
		
		return $dummy_id;
	
	}

	public static function createDummyFile(){

		$upload_dir = wp_upload_dir();
		$file_data = file_get_contents( __DIR__ . '/dummy.pdf' );
		$unique_file_name = wp_unique_filename( $upload_dir[ 'path' ], 'pkfilewp-dummy.pdf' );
		$filename = basename( $unique_file_name );

		if( wp_mkdir_p( $upload_dir[ 'path' ] ) ):
        	$path = $upload_dir[ 'path' ] . '/' . $filename;
    	else:
        	$path = $upload_dir[ 'basedir' ] . '/' . $filename;
    	endif;

    	// Create the file  file on the server
    	file_put_contents( $path, $file_data );
		$dummy_id = file::createAttachment( $path );

		update_option( 'pkfield_file_dummy_id', $dummy_id );

		return $dummy_id;

	}

}	
