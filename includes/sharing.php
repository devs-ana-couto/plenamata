<?php
class Sharing {

    function __construct(){

        add_filter( 'body_class', [ $this, 'bodyClass' ] );

        // SEO
        add_filter( 'document_title_parts', [ $this, 'pageTitle' ] );
        add_filter( 'wpseo_opengraph_title', [ $this, 'graphTitle' ], 10, 2 );
        add_filter( 'wpseo_opengraph_image', [ $this, 'graphImage' ], 10, 2 );
        add_filter( 'wpseo_schema_company_logo_meta', [ $this, 'schemeImage' ] );

        // URL's
        add_filter( 'query_vars', [ $this, 'queryVars' ] );
        add_action( 'generate_rewrite_rules', [ $this, 'rewriteRules' ] );
        add_action( 'template_redirect', [ $this, 'redirectIntercept' ] );

    }

    public function schemeGraphPieces( $schema_pieces, $context ){
        return $schema_pieces;
    }

    public function schemeGraph( $graph, $context ){
        return $graph;
    }

    public function graphTitle( $title, $presentation ){

        global $wp_query;

        if( $wp_query->get( 'estimativas' ) == 'true' ):
            $title = 'Estimativas em tempo real - ' . get_bloginfo( 'name' );
        endif;
        return $title;
        
    }

    public function schemeImage( $company_logo_meta ){

        global $wp_query;

        if( $wp_query->get( 'estimativas' ) == 'true' ):
            
            $size = getimagesize( $url );
            $company_logo_meta[ 'url' ] = $this->imageByType( 'baseurl' );
            $company_logo_meta[ 'path' ] = $this->imageByType( 'basedir' );
            $company_logo_meta[ 'width' ] = 1080;
            $company_logo_meta[ 'height' ] = 1080;

        endif;

        return $company_logo_meta;

    }

    public function graphImage( $url, $presentation ){

        global $wp_query;

        if( $wp_query->get( 'estimativas' ) == 'true' ):
            $url = $this->imageByType();
        endif;

        return $url;

    }

    public function imageByType( $keypath = 'baseurl' ){

        global $wp_query;

        // Embed Type
        $type = $wp_query->get( 'type' );
        
        // Upload path
        $uppath = wp_upload_dir();

        return $uppath[ $keypath ] . '/plenamata-desmatamento-' . ( empty( $type ) ? 'arvores' : $type ) . '.png';

    }
    
    public function pageTitle( $title_parts_array ){

        global $wp_query;

        if( $wp_query->get( 'estimativas' ) == 'true' ):
            $title_parts_array[ 'title' ] = 'Estimativas em tempo real';
        endif;

        return $title_parts_array;

    }

    public function bodyClass( $classes ){

        global $wp_query;

        if( $wp_query->get( 'estimativas' ) == 'true' ):
            $classes[] = 'page-embed-share';
        endif;

        return $classes;

    }

    // Adiciona variaveis de busca
    public function queryVars( $qvars ) {
        $qvars[] = 'sharing';
        $qvars[] = 'type';
        $qvars[] = 'generate-share-image';
        $qvars[] = 'download-image';
        $qvars[] = 'filename';
        $qvars[] = 'estimativas';
        return $qvars;
    }
    
    // Create rewrite rules
    public function rewriteRules() {

        global $wp_rewrite;

        $new_rules[ 'sharing/([^/]+)' ] = 'index.php?sharing=true&type=$matches[1]';
        $new_rules[ 'sharing' ] = 'index.php?sharing=true&type=home';
        $new_rules[ 'generate-share-image' ] = 'index.php?generate-share-image=true';
        $new_rules[ 'download-image/([^/]+)' ] = 'index.php?download-image=true&filename=$matches[1]';
        $new_rules[ 'estimativas/([^/]+)' ] = 'index.php?estimativas=true&type=$matches[1]';
        $new_rules[ 'estimativas' ] = 'index.php?estimativas=true&type=arvores';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    
    }

    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public function redirectIntercept(){
       
        global $wp_query;

        // Sharing
        if( $wp_query->get( 'sharing' ) == 'true' ):

            $type = $wp_query->get( 'type' );
            if( $type == '' ) $type = 'home';
            
            Piki::search_template( 'embeds/sharing', $type, __DIR__, true );

        // Generate image
        elseif( $wp_query->get( 'generate-share-image' ) == 'true' ):
        
            $this->generateImage();

        elseif( $wp_query->get( 'download-image' ) == 'true' ):
        
            $this->downloadImage();

        elseif( $wp_query->get( 'estimativas' ) == 'true' ):
            
            $this->pageEsimativas( $wp_query->get( 'type' ) );

        endif;

    }

    public function pageEsimativas( $type ){
        Piki::search_template( 'embeds/estimativas', false, __DIR__, true, [ 'type' => $type ] );
    }

    public function generateImage(){

        if( strpos( _server( 'HTTP_ORIGIN' ), get_site_url() ) !== 0 ):
            die( 'Ops!' );
        endif;

        // Type
        $type = _post( 'type' );
        if( $type !== 'arvores' && $type !== 'area' ):
            die( 'Ops!' );
        endif;
        
        // Texts
        $dadoMaior = _post( 'dadoMaior' );
        $dadoMenor = _post( 'dadoMenor' );

        // Upload path
        $uppath = wp_upload_dir();

        // New name
        $newname = 'plenamata-desmatamento-' . $type . '.png';
        
        // New image path
        $newpath = $uppath[ 'basedir' ] . '/' . $newname;
        
        $textLeft = 65;

        // Font
        $font = get_template_directory() . '/src/fonts/Roboto-Regular.ttf';
        
        // Create image
        $backimage = get_template_directory() . '/src/images/plenamata-desmatamento-' . $type . '.png';
        $frame = images::imagecreatefrom( $backimage );

        // Text 01
        $color = imagecolorallocate( $frame, 255, 255, 255 );
        imagettftext( $frame, 120, 0, $textLeft, 405, $color, $font, $dadoMaior );

        // Text 02
        $color = imagecolorallocate( $frame, 255, 255, 255 );
        imagettftext( $frame, 66, 0, $textLeft, 620, $color, $font, $dadoMenor );
        
        // Saving frame
        $result = images::doimage( 'png', $frame, $newpath, 100 );

        // Let memory free
        imagedestroy( $frame );
        
        /*
        $result = true;
        */

        if( $result ):

            // Optimize image
            PikiImages::optimizeImage( $newpath );

            Piki::success([
                'path' => $newpath,
                'url' => $uppath [ 'baseurl' ] . '/' . $newname,
                'name' => $newname,
                'number_big' => $dadoMaior,
                'number_small' => $dadoMenor
            ]);

        else:

            Piki::error( 'Não foi posssível criar a imagem em ' . $newpath );

        endif;
        
    
    }

    public function downloadImage(){

        global $wp_query;

        // Upload path
        $basepath = wp_upload_dir();
        $basepath = $basepath[ 'basedir' ];

        // file path
        $filepath = $basepath . '/' . $wp_query->get( 'filename' );

        if( !file_exists( $filepath ) ):
            Piki::error( 'A imagem não existe' );
        endif;

        // Tipos para download
        $candown = [
            'image/jpg', 
            'image/jpeg', 
            'image/png', 
            'image/gif', 
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/pdf',
        ];
        
        // Mimetype do arquivo
        $mimetype = mime_content_type( $filepath );
        
        // Verifica se é um tipo de arquivo que pode ser baixado
        if( in_array( $mimetype, $candown ) ):

            header( "Content-Description: Transferência de arquivo" ); 
            header( "Content-Transfer-Encoding: Binary"); 
            header( "Content-disposition: attachment; filename=" . basename( $filepath ) );
            header( "Content-type: " . $mimetype );
            readfile( $filepath );
            exit;
        
        endif;

    }

    // Dimensions of a text
    public static function getTextBox( $text, $fontFile, $fontSize, $fontAngle = 0 ){ 
        $rect = imagettfbbox( $fontSize, $fontAngle, $fontFile, $text ); 
        $minX = min( [ $rect[0], $rect[2], $rect[4], $rect[6] ] ); 
        $maxX = max( [ $rect[0], $rect[2], $rect[4], $rect[6] ] ); 
        $minY = min( [ $rect[1], $rect[3], $rect[5], $rect[7] ] ); 
        $maxY = max( [ $rect[1], $rect[3], $rect[5], $rect[7] ] ); 
        return [
            "left"   => abs( $minX ) - 1, 
            "top"    => abs( $minY ) - 1, 
            "width"  => $maxX - $minX, 
            "height" => $maxY - $minY, 
            "box"    => $rect 
        ]; 
    }

    public function custom_titles( array $parts ): array {
        return $parts;
    }

    public function body_class( array $classes ): array {
        global $post;
        return $classes;
    }

}
$Sharing = new Sharing();
