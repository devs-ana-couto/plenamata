<?php
use Google\Web_Stories\Service_Base;
use Google\Web_Stories\Story_Query as Stories;

class Common {

	static $UF;

	// Graph Image and Excerpt
    public static function openGraph( $graph, $post ){

    	global $wp_query;

    	if( $post->post_type == 'page' || $wp_query->is_archive() || is_archive() ):

    		$graph->description = get_bloginfo( 'description' );
    		
    	elseif( in_array( $post->post_type, [ 'post' ] ) ):

    		$meta = new PostMeta( $post );

    		// Destaque
			if( $meta->exists( 'destaque' ) && !$meta->empty( 'destaque' ) ):
	    		$destaque = $meta->getFirst( 'destaque' );
	    	else:
	    		$destaque = false;
	    	endif;

	    	// Thumb
    		if( !$meta->empty( 'thumb' ) ):
    			$graph->image = $meta->render( 'thumb', [ 'urls' => true ] );
	    	elseif( $destaque ):
	    		if( !$destaque->destaque_image_mob->isempty() ):
	    			$graph->image = $destaque->destaque_image_mob->render( [ 'urls' => true ] );
	    		elseif( !$destaque->destaque_image->isempty() ):
	    			$graph->image = $destaque->destaque_image->render( [ 'urls' => true ] );
	    		endif;
    		endif;
    		
    	endif;

        return $graph;

    }

    public static function getActualLang(){
    	$my_current_lang = apply_filters( 'wpml_current_language', NULL );
    	return $my_current_lang;
    }

    // Languages menu
    public static function menuLangs(){

    	// Plugin not activate
    	if( !has_action( 'wpml_language_switcher' ) ) return '';

    	// Get all active languages
		$languages = apply_filters( 'wpml_active_languages', NULL );
		if( empty( $languages ) ) return '';

		$active = false;
		$options = [];
		
		foreach( $languages as $lang ):

			if( $lang[ 'active' ] == '1' ):
				$active = $lang;
			endif;

			$showlng = strtoupper( reset( explode( '-', $lang[ 'tag' ] ) ) );
			
			$options[] = '<a href="' . $lang[ 'url' ] . '" title="'. $showlng .'" class="' . ( $lang[ 'active' ] == '1' ? 'active' : '' ) .'">'. $showlng .'</a>';

		endforeach;

		$showactive = strtoupper( reset( explode( '-', $active[ 'code' ] ) ) );

		echo '<div class="smalldrop languages" data-type="language-switcher">
			<button class="clean">'. $showactive .'</button>
			<nav>'. implode( '', $options ) .'</nav>
		</div>';

    }

    // Post excerpt
    public static function getPostExcerpt( $meta ){

        // Excerpt
        $excerpt = '';

        // Subtítulo do destaque
        $destaque = $meta->exists( 'destaque' ) && !$meta->empty( 'destaque' ) ? $meta->getFirst( 'destaque' ) : false;

        // Campo nativo de resumo
        if( empty( $excerpt ) && $meta->exists( 'excerpt' ) && !$meta->empty( 'excerpt' ) ):
        	$excerpt = $meta->render( 'excerpt', [ 'strip' => true ] );
       	endif;

        // Editor rico
        if( empty( $excerpt ) && $meta->exists( 'body' ) && !$meta->empty( 'body' ) ):
        	$excerpt = $meta->render( 'body', [ 'strip' => true ] );
       	endif;

        // Chamada
        if( empty( $excerpt ) && $meta->exists( 'chamada' ) && !$meta->empty( 'chamada' ) ):
            $excerpt = $meta->render( 'chamada', [ 'strip' => true ] );
        endif;

        // Normalize
        if( !empty( $excerpt ) ):
        
            return Piki::trim( 
                strip_tags( strip_shortcodes( $excerpt ) ), 
                300, 
                'chars' 
            );
        
        else:

        	return false;
        
        endif;
    
    }

    public static function showEditor( $arg1, $post ){
    	return in_array( $post->post_type, [ 'post', 'campanha', 'map', 'map-layer' ] );
    }

    public static function normalizeContent(){

    	global $wpdb;

    	if( is_super_admin() && _get( 'normalize-content' ) == 'true' ):

    		//$wpdb->query( "UPDATE {$wpdb->prefix}posts SET post_content = REPLACE( post_content, 'plenamata.eco/', 'pikiweb.com/' )" );
	    
	    	$wpdb->query( "UPDATE {$wpdb->prefix}posts SET post_content = REPLACE( post_content, 'pikiweb.com/', 'plenamata.eco/' )" );
	    	$wpdb->query( "UPDATE {$wpdb->prefix}posts SET post_content = REPLACE( post_content, 'staged.anacouto.com.br/plenamata/', 'plenamata.eco/' )" );

	    	exit( 'Conteúdo normalizado com sucesso.' );
	    
	    endif;

    }

}
add_action( 'init', [ 'Common', 'normalizeContent' ] );
add_filter( 'piki_graph_tags', [ 'Common', 'openGraph' ], 10, 2 );
add_filter( 'use_block_editor_for_post', [ 'Common', 'showEditor' ], 10, 2 );

function plenamata_template_name( $file ){
	echo str_replace( '.php', '', basename( $file ) );
}

function plenamata_home_link(){
	return apply_filters( 'wpml_home_url', get_option('home') );
}

function plenamata_logo( $context = 'site' ){
	return '<a href="' . plenamata_home_link() . '" title="Plenamata"><img src="'. get_template_directory_uri() .'/assets/images/logo' . ( $context == 'embed' ? '' : '-white' ) . '.svg" class="site-logo" alt="Plenamata"></a>';
}

// Webstories in home
function plenamata_get_webstories( $opts = [] ){

	$stories = new Stories( 
		[
			'view'               => 'view_type',
			'show_author'        => true,
			'circle_size'        => 104,
			'number_of_stories'  => 10,
			'align'				 => 'left',
		],
		[
			'posts_per_page' => 100,
			'order'          => 'DESC',
			'orderby'        => 'post_date',
		]
	);
	
	echo '<section class="webstories-wrapper '. _array_get( $opts, 'class', '' ) .'"  data-template-name="webstories-home">
		<span class="center">
			<h2>' . __( 'Web stories', 'amazonia' ) . '</h2>' . 
			$stories->render() . '
		</span>
	</section>';

}

// Search teaser
function plenamata_get_search_teaser(){

	$meta = new PostMeta();
	
	$data = (object)[
		'meta' => $meta,
		'title' => $meta->render( 'title' ),
		'excerpt' => $meta->empty( 'excerpt' ) ? false : $meta->render( 'excerpt' ),
		'author' => plenamata_get_author( $meta->ID, 'Por ' ),
		'date' => get_the_date( 'd' ) . ' / ' . get_the_date( 'm' ) . ' / ' . get_the_date( 'Y' ),
		'editoria' => plenamata_get_editoria( $meta->item ),
	];

	$thumb = false;
	if( !$meta->empty( 'thumb' ) ):
		$data->thumb = $meta->render( 'thumb' );
	else:
		$data->thumb = '<picture><img src="' . Piki::get_cover( $meta->ID, 'medium' ) . '" alt="'. $data->title .'"></picture>';
	endif;

	// Get URL and Target
	plenamata_get_post_url( $data, $meta );

	get_template_part( 'components/teaser', 'search', [ 'data' => $data ] );
	
}

// Dropdown de radio buttons
function plenamata_get_dropradios( $opts ){

	$id = _array_get( $opts, 'id' );
	$options = _array_get( $opts, 'options' ); 
	$value = _array_get( $opts, 'value', '' ); 
	$placeholder = _array_get( $opts, 'placeholder' ); 
	$force_filled = _array_get( $opts, 'force_filled' ); 
	$toggle_class = _array_get( $opts, 'toggle_class', '' ); 

    // melhor, dificil de adivinhar
    $token = md5(uniqid(rand(), true));

    // Label
    $label = ( $value == '' || !isset( $options[ $value ] ) ? $placeholder : $options[ $value ] );

    $html = '
    <div class="drop-radios '. $id .' '. ( $value != '' ? 'filled' : '' ) . ( $force_filled ? ' force-filled' : '' ) . '" data-placeholder="' . $placeholder . '" data-token="'. $token .'">
        <em>
            <button class="toggle '. $toggle_class .'" type="button" tabindex="0"><span>'. $label .'</span></button>
        </em>
        <div class="drop-radios--options" data-target="'. $token .'">
            <div>
                <strong>'. $placeholder .'</strong>
                <button type="button" data-action="close">' . __( 'Fechar', 'amazonia' ) . '</button>
            </div>
            <div class="list-wrapper">
            	<ul>';
                foreach( $options as $key => $label ):
                    $field_id = $id . '-' . ( empty( $key ) ? 'all' : $key );
                    $html .= '<li><input type="radio" id="'. $field_id .'" name="'. $id .'" value="'. $key .'"'. ( $value == $key ? ' checked="checked"' : '' ) .'><label for="'. $field_id .'" title="'. $label .'">'. $label .'</label></li>';
                endforeach;
    $html .= '	</ul>
    		</div>
        </div>
    </div>';

    return $html;

}

// Regiões
function plenamata_get_regions(){
	return [
        'amazonas' => 'Amazonas',
        'acre' => 'Acre',
        'rondonia' => 'Rondônia',
        'roraima' => 'Roraima',
        'para' => 'Pará',
        'maranhao' => 'Maranhão',
        'amapa' => 'Amapá',
        'tocantins' => 'Tocantins',
        'mato-grosso' => 'Mato Grosso',
        'colombia' => 'Colômbia',
        'peru' => 'Peru',
        'venezuela' => 'Venezuela',
        'equador' => 'Equador',
        'bolivia' => 'Bolívia',
        'guiana' => 'Guiana',
        'suriname ' => 'Suriname ',
        'guiana-francesa' => 'Guiana Francesa',
    ];
}

function plenamata_get_editorias_home(){

	$data = [];

	$categs = [
		'brasil-empreendedor',
		'inovacao',
		'modelos-de-negocio',
		'cultura-empreendedora',
	];

	foreach( $categs as $slug ):

		// Term
		$term = get_category_by_slug( $slug );
		
		// Term image
		$image = get_term_meta( $term->term_id, 'foto', true );
		$image_id = _array_get( $image, 'ids' );
		if( empty( $image_id ) ):
			$term->image = get_template_directory_uri() . '/assets/images/'. $term->slug .'-home.png';
		else:
			$term->image = wp_get_attachment_url( $image_id );
		endif;

		$itemData = new stdClass();
		$itemData->term = $term;
		$itemData->items = Posts::getForHome( $term );

		// Title
		$peces_title = explode( ' ', $itemData->term->name );
		$peces_title[] = '<span>' . array_pop( $peces_title ) . '</span>';
		$itemData->term->name = implode( ' ', $peces_title );
		
		if( !empty( $itemData->items ) ):
			$data[] = $itemData;
		endif;
	
	endforeach;

	get_template_part( 'components/editorias-home', null, $data );

}

// Partners on menu
function plenamata_parners_list(){

	$items = Partners::getList( 5 );

	echo '<div class="partners">';
	echo '	<em>Parceiros</em>';
	echo '	<ul>';
	foreach( $items as $item ):
		$meta = new PostMeta( $item->ID );
		$title = $meta->render( 'title' );
		$site = $meta->empty( 'site' ) ? false : $meta->render( 'site', [ 'just_url' => true ] );
		echo '<li>';
			if( $site ) echo '<a href="' . $site . '" target="_blank" rel="noreferrer" title="'. $title .'">';
			echo $meta->render( 'logo', [ 'alt' => $title ] );
			if( $site ) echo '</a>';
		echo '</li>';
	endforeach;
	echo '	</ul>';
	echo '</div>';
}

// Partners on menu
function plenamata_partners( $options = [] ){

	// Location
	$location = _array_get( $options, 'location', 'pagelist' );

	// Título
	$options[ 'title' ] = _array_get( $options, 'title', 'Parceiros' );

	// Style
	$options[ 'style' ] = _array_get( $options, 'style', 'default' );

	// Image field
	$options[ 'image_field' ] = _array_get( $options, 'image_field', 'logo' );

	// Total de items
	$total = _array_get( $options, 'total', -1 );

	// Partners
	$apoiadores = _array_get( $options, 'apoiadores' );

	// Items
	$options[ 'items' ] = Partners::getList( $total, $options[ 'image_field' ], $apoiadores );

	get_template_part( 'components/list', 'partners', $options );

}

// Category URL by slug
function plenamata_category_url( $slug ) {
    return get_category_link( get_category_by_slug( $slug ) );
}

// Capa da home
function plenamata_get_site_capa(){
	return Capas::getSiteCapa();
}

// Imagens para listas e destaques
function plenamata_images_fields( &$fields, $opts = [] ){
	
	$type_slug = _array_get( $opts, 'type_slug', 'post' );

    $fields[ 'thumb' ] = [
        'machine_name' => 'thumb',
        'ftype' => 'imagewp',
        'label' => 'Thumbnail para listagens',
        'description' => 'Resolução mínima da imagem: 848x487',
        'crop' => [
            'status' => true,
            'ratio' => '848x487',
        ],
        'styles' => [
            'desktop' => [ 
                'width' => '395', 
                'height' => '226',
                'crop' => 'cc' 
            ],
        ],
    ];

	// Imagem para página interna
	$title = _array_get( $opts, 'title', 'Cover' );
    $fields[ 'cover' ] = [
        'machine_name' => 'cover',
        'ftype' => 'fieldset',
        'label' => $title,
        'subfields' => [],
    ];

    if( in_array( $type_slug, [ 'podcasts', 'videos', 'imagens' ] ) ):

	    $fields[ 'cover' ][ 'subfields' ][ 'sticky' ] = [
	        'machine_name' => 'sticky',
	        'ftype' => 'select',
	        'label' => 'Posição de destaque',
	        'options' => [
	            '0' => 'Sem destaque',
	            '50' => 'Destaque principal',
	            '40' => 'Destaque secundário',
	            '30' => 'Destaque sem imagem',
	        ],
	    ];
	
	endif;

    $fields[ 'cover' ][ 'subfields' ][ 'cover_image' ] = [
        'machine_name' => 'cover_image',
        'ftype' => 'imagewp',
        'label' => on( $opts, 'sticky' ) ? 'Imagem para destaque' : false,
        'description' => 'Resolução mínima da imagem: 814x492',
        'crop' => [
            'status' => true,
            'ratio' => '814x492',
        ],
    ];

    // Legend label
    if( !isset( $opts[ 'label' ] ) || $opts[ 'label' ] != false ):
    	$fields[ 'cover' ][ 'subfields' ][ 'cover_legend' ] = [
            'machine_name' => 'cover_legend',
            'ftype' => 'text',
            'label' => 'Legenda da imagem',
        ];
	endif;

	// Campo de destaque na home
	if( in_array( $type_slug, [ 'podcasts', 'videos' ] ) ):

        $fields[ 'cover' ][ 'subfields' ][ 'boxtext' ] = [
        	'machine_name' => 'boxtext',
        	'ftype' => 'boxtext',
        	'content' => '<label class="subtitle"> Página principal da ' . get_bloginfo( 'name' ) .'</label>',
        ];
        $fields[ 'cover' ][ 'subfields' ][ 'home' ] = [
            'machine_name' => 'home',
            'ftype' => 'boolean',
            'label' => 'Promover à página principal',
        ];
        $fields[ 'cover' ][ 'subfields' ][ 'image_home' ] = [
            'machine_name' => 'image_home',
            'ftype' => 'imagewp',
            'label' => false,
            'description' => 'Resolução mínima da imagem: 580x780',
			'crop' => [
	            'status' => true,
	            'ratio' => '580x780',
	        ],
	        'styles' => [
	            'ret' => [ 'width' => '290' ],
	        ],
        ];
	
	endif;

}

// Email template
if( is_super_admin() && _get( 'email' ) ):
	add_action( 
		'init', 
		function(){ 
			$template = plenamata_mail_template( 'Teste de email', 'Lorem ipsum dolor sit amet' );
			echo $template;
			exit();
		} 
	);
endif;
function plenamata_mail_br( $space = 24, $br = true ){
	return ( $br ? '<br>' : '' ) . '<img src="'. $images .'/transparent.png" border="0" width="1" height="'. $space .'" style="display:block;border:0;border-style:none;outline:none;width:1px;height:'. $space .'px;">';
}
function plenamata_mail_template( $title, $content, $nav = '', $type = 1 ){
               
    // Diretório das imagens
    $images = Piki::url( '/assets/mail/' , dirname( __FILE__ ) );

    // Píxel transparent
    $transparent = '<img src="'. $images .'/transparent.png" border="0" width="1" height="1" style="display:block;border:0;border-style:none;outline:none;width:1px;height:1px;">';
    
    // Quebra de linha
    $br = plenamata_mail_br();
    
    // Table reset
    $table_reset = 'cellpadding="0" cellspacing="0" border="0"';

    // Textos
    $amarelo = '#ffe423';
    $azul = '#122842';       

    $template = '
    <html>
        <body>
        	
			<table width="100%" '. $table_reset .' bgcolor="#F4F4F4">
				<tr>
					<td colspan="3">
						<table width="100%" '. $table_reset .' bgcolor="#F4F4F4" style="border-collapse:collapse;background-color:#F4F4F4;">
			        		<tr>
			        			<td colspan="3" width="100%" height="53px" bgcolor="#5083C0" style="width:100%;height:53px;background-color:#5083C0;">'. $transparent .'</td>
			        		</tr>
			        		<tr>
			        			<td colspan="3" width="100%" bgcolor="#5083C0" style="width:100%;background-color:#5083C0;"><img src="'. $images .'logo.png" alt="ASN - Agência Sebrae de Jornalismo" style="display:block;margin:0 auto;"></td>
			        		</tr>
			        		<tr>
			        			<td colspan="3" width="100%" height="43px" bgcolor="#5083C0" style="width:100%;height:43px;background-color:#5083C0;">'. $transparent .'</td>
			        		</tr>
			        	</table>
					</td>
				</tr>
        		<tr>
        			<td valign="top" style="vertical-align:top;">
        				<table width="100%" '. $table_reset .' bgcolor="#5083C0" style="border-collapse:collapse;background-color:#5083C0;">
			        		<tr><td height="109">'. $transparent .'</td></tr></table>
        			</td>
        			<td width="600">
						<table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                <tr>
			                    <td width="600" height="5" colspan="3" align="center">
			                        <table width="600" bgcolor="#5083C0" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6"><img src="'. $images .'box-rounded-left-top.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td align="center"><img src="'. $images .'box-rounded-top.png" width="588" height="5" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td width="6"><img src="'. $images .'box-rounded-right-top.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			                <tr>
			                    <td width="600" colspan="3" align="center">
			                        <table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6" height="104" bgcolor="#5083C0"><img src="'. $images .'box-rounded-left.png" width="6" height="104px" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td rowspan="2" align="center" bgcolor="#ffffff">
			                                	<table width="100%" '. $table_reset .' style="border-collapse:collapse;">
			                                		<tr>
			                                			<td colspan="3" height="29">'. $transparent .'</td>
			                                		</tr>
			                                		<tr>
			                                			<td colspan="3" align="center">
			                                				<font face="arial" color="#12121F" size="2" style="font-size:32px;line-height:38px;color:#12121F;letter-spacing:normal;">'. $title .'</font>
			                                			</td>
			                                		</tr>
			                                		<tr>
			                                			<td colspan="3" height="32">'. $transparent .'</td>
			                                		</tr>
			                                		<tr>
			                                			<td width="23px">'. $transparent .'</td>
			                                			<td>
						                                	<font face="arial" color="#12121F" size="1" style="font-size:14px;color:#12121F;line-height:17px;letter-spacing:normal;">
							                                	'. $content . plenamata_mail_br( 56 ) .'
																Até logo,'. plenamata_mail_br( 8 ) . '
																Time ASN' . plenamata_mail_br( 32 ) . '
															</font>
			                                			</td>
			                                			<td width="20px">'. $transparent .'</td>
			                                		</tr>
			                                	</table>
			                                </td>
			                                <td width="6" height="104" bgcolor="#5083C0"><img src="'. $images .'box-rounded-right.png" width="6" height="104px" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                            </tr>
			                            <tr>
			                                <td width="6" style="background-image:url(' . $images .'box-rounded-left.png)">'. $transparent .'</td>
			                                <td width="6" style="background-image:url(' . $images .'box-rounded-right.png)">'. $transparent .'</td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			                <tr>
			                    <td width="600" height="7" colspan="3" align="center">
			                        <table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6"><img src="'. $images .'box-rounded-left-bottom.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td align="center"><img src="'. $images .'box-rounded-bottom.png" width="588" height="7" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td width="6"><img src="'. $images .'box-rounded-right-bottom.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			            </table>
        			</td>
        			<td valign="top" style="vertical-align:top;">
						<table width="100%" '. $table_reset .' bgcolor="#5083C0" style="border-collapse:collapse;background-color:#5083C0;"><tr><td height="109">'. $transparent .'</td></tr></table>
        			</td>
        		</tr>
				<tr>
					<td colspan="3" height="32">'. $transparent .'</td>
				</tr>
        		<tr>
        			<td>'. $transparent .'</td>
        			<td width="600">
						<table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                <tr>
			                    <td width="600" height="5" colspan="3" align="center">
			                        <table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6"><img src="'. $images .'box-rounded-left-top.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td align="center"><img src="'. $images .'box-rounded-top.png" width="588" height="5" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td width="6"><img src="'. $images .'box-rounded-right-top.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			                <tr>
			                    <td width="600" colspan="3" align="center">
			                        <table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6" style="background-image:url(' . $images .'box-rounded-left.png)">'. $transparent .'</td>
			                                <td align="center" bgcolor="#ffffff">
			                                	<font face="arial" color="#12121F" size="1" style="font-size:14px;color:#12121F;line-height:17px;letter-spacing:normal;">
				                                	'. plenamata_mail_br( 27, false ) .'
				                                	Precisa de ajuda?'. plenamata_mail_br( 8 ) .'
				                                	<a href="mailto:imprensa@sebrae.com.br" title="Vamos conversar"><font color="#3866E5" style="color:#3866E5;">Vamos conversar</font></a>
				                                	'. plenamata_mail_br( 30 ) .'
				                                </font>
			                                </td>
			                                <td width="6" style="background-image:url(' . $images .'box-rounded-right.png)">'. $transparent .'</td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			                <tr>
			                    <td width="600" height="7" colspan="3" align="center">
			                        <table width="600" '. $table_reset .' style="border-collapse:collapse;">
			                            <tr>
			                                <td width="6"><img src="'. $images .'box-rounded-left-bottom.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td align="center"><img src="'. $images .'box-rounded-bottom.png" width="588" height="7" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                                <td width="6"><img src="'. $images .'box-rounded-right-bottom.png" border="0" style="display:block;border:0;border-style:none;outline:none;"></td>
			                            </tr>
			                        </table>
			                    </td>
			                </tr>
			            </table>
        			</td>
        			<td>'. $transparent .'</td>
        		</tr>
				<tr>
					<td colspan="3" height="32">'. $transparent .'</td>
				</tr>
				<tr>
					<td>'. $transparent .'</td>
					<td>
						<table width="100%" '. $table_reset .' style="border-collapse:collapse;">
	                        <tr>
	                            <td width="25">'. $transparent .'</td>
	                            <td align="left">
	                            	<font face="arial" color="#333333" size="1" style="font-size:14px;color:#12121F;line-height:17px;letter-spacing:normal;">
										Sebrae Nacional - Conjunto A, SGAS 605 - DF - 70200-904
									</font>
	                            </td>
	                            <td width="25">'. $transparent .'</td>
	                        </tr>
	                    </table>
					</td>
					<td>'. $transparent .'</td>
				</tr>
				<tr>
					<td colspan="3" height="118">'. $transparent .'</td>
				</tr>
        	</table>
        </body>
    </html>
    ';

    // Replacements
    $template = str_replace( '{images}', $images, $template );
    $template = str_replace( '{br}', $br, $template );
    $template = str_replace( '{table-reset}', $table_reset, $template );

    return $template;

}

// Get svg image
function plenamata_get_svg( $name ){
	echo file_get_contents( __DIR__ . '/../src/svg/' . $name . '.svg' );
}

// Class do header 
function plenamata_header_class(){
	if( is_front_page() ):
		return 'inside-content';
	endif;
}

// Últimas notícias
function plenamata_get_lastest_news(){

	$posts = Posts::getLasts();

	get_template_part( 
		'components/ultimas-noticias', null,
		[ 'posts' => $posts ] 
	);
	
}

// Actual unity
function as_get_actual_label(){

	if( get_current_blog_id() == '1' ):

		return 'Nacional';
	
	else:
		
		$current = str_replace( [ 'https', 'http', '://' ], '', get_bloginfo( 'url' ) );	

		$uf = strtoupper( reset( explode( '.', $current ) ) );
		$uf = uf::getEstadoBy( 'uf', $uf );
		return $uf->nome;

	endif;

}


// Lista links de estados
function plenamata_get_states_links( $wrapper = false, $show_nacional = true ){

	global $current_blog;

	$HTML = '';
	return '';

	// Blogs list
	$blogs = get_sites();

	// First
	$nacional = array_shift( $blogs );

	// Sorting
	$keys = array_column( $blogs, 'domain' );
	array_multisort( $keys, SORT_ASC, $blogs );
	
	// Keep first
	array_unshift( $blogs, $nacional );

	$current = str_replace( [ 'https', 'http', '://' ], '', get_bloginfo( 'url' ) );
		
	foreach( $blogs as $blog ):

		// Not shows actual
		if( $current == $blog->domain || ( $blog->blog_id == '1' && !$show_nacional ) ) continue;
		
		// Wrapper
		if( $wrapper ):
			$HTML .= '<'. $wrapper .'>';
		endif;

		// Site label
		if( $blog->blog_id == 1 ):
		
			$label = 'Nacional';
		
		else:

			$uf = strtoupper( reset( explode( '.', $blog->domain ) ) );
			$uf = uf::getEstadoBy( 'uf', $uf );
			$label = $uf->nome;

		endif;
		
		// Link
		$HTML .= '<a href="https://' . $blog->domain . '" title="' . $label . '">' . $label . '</a>';
		
		// Wrapper
		if( $wrapper ):
			$HTML .= '</'. $wrapper .'>';
		endif;

	endforeach;

	return $HTML;

}

function plenamata_get_thumbnail( $meta, $field = 'thumb' ){

	return imagewp::renderResponsive([
		'meta' => $meta,
		'default' => [
			'field_name' => $field,
			'media' => '(max-width:480px)',
		],
		'breakpoints' => [
			[
				'field_name' => $field,
				'style' => 'desktop',
				'media' => '(min-width:481px)',
			]
		],
		'options' => [
			'style' => 'resized',
		],
	]);

}

// Teaser data
function as_get_post_teaser_data( $post, $opts = [] ){

	$return = new stdClass();

	// Meta
	$return->meta = new PostMeta( $post );

	// Remove image
	$remove_image = _array_get( $opts, 'remove-image' );
	
	// Image field
	$return->image_field = _array_get( $opts, 'image_field', 'destaque_image_small' );

	// List field
	$return->thumb = $return->meta->empty( 'thumb' ) ? false : $return->meta->render( 'thumb' );

	// Editoria
	$return->editoria = plenamata_get_editoria( $post );

	// Sticky
	$sticky = $return->meta->empty( 'destaque' ) ? false : $return->meta->getFirst( 'destaque' );
	
	// Title
	$return->title = $return->meta->render( 'title', [ 'breakline' => true ] );

    // Post excerpt
    $return->subtitle = false;
    if( on( $opts, 'excerpt' ) ):
		$return->subtitle = Common::getPostExcerpt( $return->meta );
    endif;
	
	// Cover
	$return->thumb = $return->meta->exists( 'thumb' ) && !$return->meta->empty( 'thumb' ) ? $return->meta->render( 'thumb' ) : false;

	return $return;

}

// Post url
function plenamata_get_post_url( &$data, $meta ){

	// Partner	
	$url_partner = get_post_meta( $meta->ID, 'external-source-link', true );
	if( !empty( $url_partner ) ):
		$data->url = $url_partner;
		$data->target = true;
	elseif( $meta->exists( 'external_url' ) && !$meta->empty( 'external_url' ) ):
		$data->url = $data->meta->getFirst( 'external_url' );
		$data->target = true;
	else:
		$data->url = get_permalink( $item->ID );	
	endif;

	$data->target = $data->target ? ' target="_blank" rel="noreferrar noopener"' : '';

}

// Teaser post data
function plenamata_get_teaser_data( $item, $opts = [], $debug = false ){

	// Just formated data
	if( isset( $item->url ) ): 
		if( $item->group == 'thirds' ):
			$item->remove_image = true;
		endif;
		return $item;
	endif;

	// Post meta
	$meta = new PostMeta( $item );
	
	// Return data
	$data = new stdClass();
	$data->meta = $meta;
	$data->post_id = $item->ID;
	// Grup
	$data->group = $item->group;
	// Image field
	$data->image_field = _array_get( $opts, 'image_field', 'thumb' );
	// Remove image
	$data->remove_image = _array_get( $opts, 'remove-image' ) == true;
	// Image
	$data->image = false;
	// Title
	$data->title = false;
	// Show subtitle
	$data->show_subtitle = _array_get( $opts, 'excerpt' ) == true;
	// Subtitle
    $data->subtitle = false;
    // Editoria
	$data->editoria = false;
	// Is admin
	$data->is_admin = _array_get( $opts, 'is_admin' );
	// Target
	$data->target = false;
	
	// Author
	$data->author = plenamata_get_author( $item->ID );

	// Partner	
	$url_partner = get_post_meta( $item->ID, 'external-source-link', true );
	if( !empty( $url_partner ) ):

		$data->url = $url_partner;
		$data->target = true;

        if( strpos( $url_partner, 'infoamazonia.org' ) !== false ):
        	$data->author = '<strong class="external"><span>InfoAmazonia</span></strong>';
        elseif( strpos( $url_partner, 'mapbiomas.org' ) !== false ):
        	$data->author = '<strong class="external"><span>MapBiomas</span></strong>';
        else:
        	$data->author = '<strong class="external"><span>' . __( 'External link', 'amazonia' ) . '</span></strong>';
        endif;
		
	elseif( $data->meta->exists( 'external_url' ) && !$data->meta->empty( 'external_url' ) ):
	
		$data->url = $data->meta->getFirst( 'external_url' );
		$data->target = true;
        $data->author = __( 'External link', 'amazonia' );
	
	else:
	
		$data->url = get_permalink( $item->ID );
	
	endif;

	// Target blank
	if( $data->target ):
		$data->target = ' target="_blank" rel="noreferrer noopener"';
	endif;

	// List field
	if( $data->image_field == 'thumb' || $data->image_field == 'cover' ):
		$data->image = $data->meta->render( $data->image_field );
	endif;

	// Destaque data
	$destaque = $data->meta->empty( 'destaque' ) ? false : $data->meta->getFirst( 'destaque' );
	if( $destaque ):

		// Image
		if( !$data->image && !$data->remove_image ):

			if( isset( $destaque->{$data->image_field} ) && !$destaque->{$data->image_field}->isempty() ):

				if( $data->image_field == 'destaque_image' ):

					if( isset( $destaque->destaque_image_mob ) ):

						// Image
	                    $data->image = imagewp::renderResponsive([
	                        'meta' => $destaque,
	                        'default' => [
	                            'field_name' => 'destaque_image',
	                        ],
	                        'breakpoints' => [
	                            [
	                                'field_name' => 'destaque_image_mob',
	                                'media' => '(max-width:550px)',
	                            ]
	                        ],
	                        'nowrap' => true
	                    ]);

	                else:

	                	$data->image = $destaque->destaque_image->render();

	                endif;

				else:

					$data->image = $destaque->{$data->image_field}->render();
				
				endif;
			
			endif;

		endif;

	endif;

    // Post title
    if( !$data->title ):
        $data->title = $data->meta->render( 'title', [ 'breakline' => true ] );
    endif;

	// Cover as thumb
	if( empty( $data->image ) ):
		$size = $data->image_field == 'thumb' ? 'medium' : 'full';
		$cover = Piki::get_cover( $meta->ID, $size );
		if( $cover ) $data->image = '<img src="' . $cover . '" alt="'. strip_tags( $data->title ) .'">';
	endif;

    // Post excerpt
    if( $data->show_subtitle ):
		$data->subtitle = Common::getPostExcerpt( $data->meta );
    endif;

    // Normalize subtitle
    if( $data->subtitle ):
        $data->subtitle = Piki::trim( 
            strip_tags( strip_shortcodes( $data->subtitle ) ), 
            180, 
            'chars' 
        );
    endif;

	// Legend
	$data->legend = ( $cover && isset( $cover->cover_legend ) && !$cover->cover_legend->isempty() ) ? $cover->cover_legend->render() : false;

	// Editoria
	$fixed_editoria = _array_get( $opts, 'editoria' );
	$data->editoria = plenamata_get_editoria( $item, $fixed_editoria );

    // For admin
    if( $data->is_admin ):
	    if( !$data->image ) $data->image = '';
	    if( !$data->title ) $data->title = 'Título da matéria';
	    if( !$data->subtitle && $data->show_subtitle ) $data->subtitle = 'Subtítulo da matéria';
	endif;

	return $data;

}

// Galeria
function plenamata_get_galeria( $meta ){

	// Ítems
	if( $meta->empty( 'galeria' ) ) return '';
	$items = $meta->getAll( 'galeria' );

	foreach( $items as &$item ):

		if( $item->galeria_image->isempty() ) continue;

		$item = [
			'image' => $item->galeria_image->render(),
			'caption' => $item->galeria_legenda->isempty() ? false : '<cite>' . $item->galeria_legenda->render() . '</cite>',
		];

	endforeach;

	get_template_part( 
		'components/slider-full', null, 
		[ 'items' => $items ] 
	); 

}
// Page template
function plenamata_get_page_template( $ID = false, $args = [] ){

	if( !$ID ) $ID = get_the_ID();

	$template = get_page_template_slug( $ID );

	if( empty( $template ) ):

		$template = 'contents/default';
	
	else:

		$template = str_replace( '.php', '', $template );
		$template = str_replace( 'page-', 'contents/', $template );
		
	endif;

	get_template_part( $template, null, $args );

}

// Get author
function plenamata_get_author( $ID, $prefix = '' ){

	$HTML = $prefix;

	$authors = get_coauthors( $ID );
	$partners = get_the_terms( $ID, 'partner' );

	// Internal authors
	if( !empty( $authors ) ):

		// Get names
		$names = [];
		foreach( $authors as $author ):
			if( isset( $author->display_name ) ):
				$names[] = $author->display_name;
			elseif( isset( $author->data ) ):
				$names[] = $author->data->display_name;
			endif;
		endforeach;
		
		// First
		$first = array_shift( $names );
		$join = empty( $names ) && empty( $partners ) ? '' : ( count( $names ) + count( $partners ) > 1 ? ', ' : '' );

		$HTML .= '<strong>' . $first . $join . '</strong>';

		// Others
		if( !empty( $names ) ):

			$last = array_pop( $names );
			
			if( !empty( $names ) ):
				$HTML .= ' <strong>' . implode( ',</strong> <strong>', $names ) . ',</strong>';
			endif;

			$HTML .= ( empty( $partners ) ? ' e ' :  ' ' ) . '<strong>' . $last . ( !empty( $partners ) && count( $partners ) > 1 ? ',' : '' ) . '</strong>';
					
		endif;

	endif;

	// Partners
	if( !empty( $partners ) ):

		$names2 = array_column( $partners, 'name' );

		// First
		$first2 = array_shift( $names2 );
		$join2 = count( $names2 ) > 1 ? ',' : '';

		$HTML .= ( !empty( $HTML ) ? ( empty( $names2 ) ? ' e ' : ' ' ) : '' ) . '<strong class="external"><span>' . $first2 . '</span>' . $join2 . '</strong>';

		if( !empty( $names2 ) ):

			$last2 = array_pop( $names2 );
			
			if( !empty( $names2 ) ):
				$HTML .= ' <strong class="external"><span>' . implode( '</span>,</strong> <strong class="external"><span>', $names2 ) . '</span>,</strong>';
			endif;

			$HTML .= ' e <strong class="external"><span>' . $last2 . '</span></strong>';
					
		endif;
		
	endif;
	
	return $HTML;
	
}

// Get date
function plenamata_get_date( $ID ){
	return plenamata_format_date( get_the_time( 'U', $ID ) );
}

// Get updated
function plenamata_get_updated( $ID ){

	// Times
	$time = get_the_time( 'U', $ID );

	$modified_time = get_the_modified_time( 'U', $ID );
	$modified = date( 'Y-m-d', $modified_time );

	// Not modified
	if( 
		empty( $modified_time ) 
		|| 
		date( 'Y-m-d H:i', $modified_time ) <= date( 'Y-m-d H:i', $time ) 
		||
		$modified_time == $time
	) return false;

	// Now
	$timenow = current_time( 'timestamp' );

	// Hoje
	$today = date( 'Y-m-d' );

	// Ontem
	$yesterday = date( 'Y-m-d', strtotime( '-1 day' ) );

	// Hoje
	if( $modified == $today ):

		$diffHours = ( $timenow - $modified_time  ) / HOUR_IN_SECONDS;
		
		if( $diffHours < 1 ):
			$diffMinuts = ceil( ( $timenow - $modified_time ) / MINUTE_IN_SECONDS );
			return 'Atualizado há '. $diffMinuts .' minuto' . ( $diffMinuts > 1 ? 's' : '' );
		elseif( $diffHours <= 6 ):
			$diffHours = ceil( $diffHours );
			return 'Atualizado há '. $diffHours .' hora' . ( $diffHours > 1 ? 's' : '' );
		else:
			return 'Hoje às '. date( 'H:i', $modified_time );
		endif;

	// Ontem
	elseif( $modified == $yesterday ):

		return 'Ontem às ' . date( 'H:i', $modified_time );
		
	else:
	
		return 'Atualizado em ' . date_i18n( 'd F Y', $modified_time ) . ' ' . __( 'as', 'plenamata' ) . ' ' . date_i18n( 'H:i', $modified_time );

	endif;

}
function plenamata_format_date( $time ){

	// Hoje
	$today = date( 'Y-m-d' );
	// Ontem
	$yesterday = date( 'Y-m-d', strtotime( '-1 day' ) );
	// Data do post
	$date = date( 'Y-m-d', $time );

	if( $date == $today || $date == $yesterday ):
		return ( $date == $yesterday ? 'Ontem' : 'Hoje' ) . ' às ' . date_i18n( 'H:i', $time );
	else:
		return date_i18n( 'd F Y', $time ) . __( ' as ' ) .  date_i18n( 'H:i', $time );
	endif;

}

// Main menu depends mode
function plenamata_get_menu(){
	echo wp_nav_menu([
		'theme_location' => 'main',
		'menu_class' => 'menu navigation',
		'container' => false
	]);
}

// Editoria url
function plenamata_editoria_url( $editoria ){
	return get_site_url( null, '/artigos/?categoria=' ) . $editoria->slug . '#outras-noticias';
}

// Label da editoria
function plenamata_editoria_link( $editoria, $class = '' ){
	return '<a href="'. plenamata_editoria_url( $editoria ) .'" class="editoria '. $editoria->slug .' '. $class .'" title="'. $editoria->name .'"><em>'. $editoria->name .'</em></a>';
}

// Verbete content
function plenamata_get_glossario_content(){

	// Post meta
	$meta = new PostMeta();

	// Context
	$context = $meta->item->post_type == GLOSSARIO_KEY ? 'single' : 'archive';

	// Arguments
	$args = [
		'context' => $context,
		'data' => Glossario::getForPage( $context ),
	];

	// Single
	if( $meta->item->post_type == GLOSSARIO_KEY ):

		$page = Piki::get_post( 'glossario' );
		$args[ 'page' ] = new PostMeta( $page );
		$args[ 'meta' ] = $meta;
		
	// Archive
	else:
		
		$args[ 'page' ] = $meta;

	endif;

	// Get content template
	get_template_part( 'contents/glossario', null, $args);

}

// Posat content
function plenamata_get_post_content(){

	$meta = new PostMeta();

	$editoria = plenamata_get_editoria( $meta->item );
	
	$type = 'noticia';

	// Cover
	$cover = false;
	if( !$meta->empty( 'cover' ) ):
		$cover = $meta->render( 'cover' );
	elseif( ( $cover = Piki::get_cover( $meta->ID ) ) !== false ):
		$cover = '<img src="'. $cover .'" alt=" ">';
	endif;

	// Get content template
	get_template_part( 
		'contents/single', 
		$type,
		[ 
			'meta' => $meta,
			'cover' => $cover,
			'title' => $meta->render( 'title' ),
			'editoria' => $editoria,
			'date' => plenamata_get_date( $meta->ID ),
			'updated' => plenamata_get_updated( $meta->ID ),
		]
	);
	
}

// Multimídia content
function plenamata_get_media_content(){

	$meta = new PostMeta();

	$type = $meta->item->post_type;

	$editoria = plenamata_get_editoria( $meta->item );

	$media_type = false;
	if( $type == 'podcast' || $type == 'video' ):
		$media_type = $meta->getFirst( 'typemidia' );
	endif;

	// Get content template
	get_template_part( 
		'contents/media', null,
		[ 
			'meta' => $meta,
			'type' => $type,
			'editoria' => $editoria,
			'media_type' => $media_type,
		]
	);

}

// Relateds ítems
function plenamata_get_relateds( $meta ){

	// Type
	$type = in_array( $meta->item->post_type, Multimidia::typesKeys() ) ? 'media' : 'materia';

	if( $type == 'materia' ):

		$data = Posts::getRelateds();
		if( !$data ) return '';

		get_template_part(
			'components/relateds',
			'materia',
			$data
		);

	else:

		do_shortcode( '[relateds taxonomy="category" template="components/relateds-'. $type .'"]' );
	
	endif;

}

// Em alta
function plenamata_get_rizes( $post, $term = false ){

	if( $post->post_type == 'post' ):
		$posts = Posts::getRizes( $post, 7 );
	else:
		$posts = Multimidia::getRizes( 5 );
	endif;
	if( empty( $posts ) ) return '';

	get_template_part( 
		'components/em-alta', null,
		[ 
			'posts' => $posts,
			'type' => $post->post_type,
			'term' => $term,
		] 
	);

}

// Single category
function plenamata_single_category( $meta = false, $link_subs = true, $editoria = false ){

	// Post ID
	$ID = $meta ? $meta->ID : get_the_ID();

	// Post
	$post = get_post( $ID );

	// Taxonomy
	$taxonomy = $post->post_type == CAMPANHA_TYPE ? CAMPANHA_TAX : 'category';

	// Get terms
	$terms = get_the_terms( $ID, $taxonomy );
	if( empty( $terms ) ) return '';

	// Sort terms
	$sorteds = [];
	Piki::sortTerms( $terms, $sorteds );

	// Empty
	if( empty( $sorteds ) ) return '';

	// Determined editoria
	if( $editoria && isset( $sorteds[ $editoria->term_id ] ) ):
	
		$terms = $sorteds[ $editoria->term_id ];

	else:

		// Just one tree
		if( count( $sorteds ) > 1 ):

			foreach( $sorteds as $sort_item ):

				if( !empty( $sort_item->children ) ):
			 		$terms = $sort_item;
			 		break;
				endif;
				
			endforeach;

		else: 

			$terms = array_shift( $sorteds );
		
		endif;

	endif;

	// Editory
	$editoria = $terms;
	
	// Category
	$category = empty( $editoria->children ) ? false : array_shift( $editoria->children );

	// Base url
	$URL = $post->post_type == 'post' ? get_site_url( null, '/artigos?categoria=' . $editoria->slug ) : get_site_url( null, '/campanhas?editoria=' . $editoria->slug );

	// Apenas editoria
	if( !$category ):

		$HTML = '<a href="'. $URL .'" title="'. $editoria->name .'" class="editoria-crumb '. $editoria->slug .'">'. $editoria->name .'</a>';
	
	// Editoria e sub-editoria
	else:
	
		//$HTML .= '<a href="'. $URL .'" title="'. $editoria->name .'" class="color '. $editoria->slug .'"><strong>' . $editoria->name . '</strong></a><span class="div">/</span>';

		//if( $link_subs ):

			$URL = $post->post_type == 'post' ? get_site_url( null, '/artigos?categoria=' . $editoria->slug . '?subeditoria=' . $category->slug ) : get_site_url( null, '/campanhas?editoria=' . $category->slug );

			$HTML .= '<a href="'. $URL .'" title="'. $category->name .'" class="editoria-crumb ' . $editoria->slug . '">'. $category->name .'</a>';
		
		//else:

		//	$HTML .= '<strong>' . $category->name . '</strong>';

		//endif; 
	
	endif;

	return $HTML;
	
}

// Slug da categoria
function plenamata_get_editoria( $post, $fixed = false ){

	// Taxonomy
	$taxonomy = $post->post_type == CAMPANHA_TYPE ? CAMPANHA_TAX : 'category';

	// Get terms
	$terms = get_the_terms( $post, $taxonomy );
	if( empty( $terms ) ) return false;

	// fixed category
	if( $fixed ):
		$key = array_search( $fixed->term_id, array_column( $terms, 'term_id' ) );
		if( $key !== false ):
			return $terms[ $key ];
		endif;
	endif;
	
	// Search for all
	foreach( $terms as $term ):
 		if( empty( $term->parent ) ):
 			return $term;
 			break;
 		endif;
	endforeach;

	return false;

}

// Editorias
function plenamata_get_editorias( $arquivo = false){

	$terms = get_terms([
		'taxonomy' => 'category',
    	'hide_empty' => true,
    	'parent' => 0,
    	'exclude' => [ 1 ]
	]);

	if( $arquivo ):
		$terms[] = get_term_by( 'term_id', 1, 'category' );
	endif;

	return empty( $terms ) ? false : $terms;

}

// Opções de editoria para select
function plenamata_get_editorias_options( $arquivo = false ){
	
	$editorias = plenamata_get_editorias( $arquivo );
	if( empty( $editorias ) ) return [];

	$options = [];
	foreach( $editorias as $term ):
		$options[ $term->slug ] = $term->name;
	endforeach;

	return $options;

}

// Dropdown
function plenamata_get_dropdown( $confs ){

	// Field key
	$key = _array_get( $confs, 'key' );

	// Options
	$confs[ 'options' ] = [ '' => _array_get( $confs, 'label_all', 'Todos(as)' ) ];
	
	if( $key == 'ano' ):
	
		// Editorias
		$confs[ 'options' ] = $confs[ 'options' ] + Posts::getArchiveYears();
	
	elseif( $key == 'editoria' ):
	
		// Editorias
		$arquivo = _array_get( $confs, 'arquivo' );
		$confs[ 'options' ] = $confs[ 'options' ] + plenamata_get_editorias_options( $arquivo );

	elseif( $key == 'subeditoria' ):

		$term = _array_get( $confs, 'term' );
		$subterms = get_terms( 
			'category', 
			[
		        'hide_empty' => 1,
		        'parent' => $term->term_id,
		    ]
		);
		if( empty( $subterms ) || count( $subterms ) < 2 ):
			$confs[ 'options' ] = false;
		else:
			$confs[ 'options' ] = $confs[ 'options' ] + array_combine( array_column( $subterms, 'slug' ), array_column( $subterms, 'name' ) );
		endif;
	
	else:
	
		// Estados
		foreach( uf::getEstados() as $uf ):
			$confs[ 'options' ][ $uf->uf ] = $uf->nome;
		endforeach;
	
	endif;
	
	// Value
	$confs[ 'value' ] = _array_get( $confs, 'value', '' );
	
	// Class
	$confs[ 'class' ] = _array_get( $confs, 'class', '' );
	if( $confs[ 'value' ] ) $confs[ 'class' ] .= ' filled';
	
	// Token
	$confs[ 'token' ] = 'drop-' . Piki::token();

	get_template_part(
		'components/dropdown', null,
		$confs
	); 

}  

// Get page cover
function plenamata_get_page_cover( $meta ){

	$cover = $meta->getFirst( 'cover' );
	$type = $cover->cover_type->getValues( true );
	$color = $cover->cvr_color_squeme->getValues( true );
	$font = $cover->cvr_font_size->getValues( true );

	get_template_part(
		'components/cover', $type,
		[
			'meta' => $meta,
			'color' => $color,
			'font' => $font
		]
	);

}

// Subpages menu
function plenamata_get_subpages_menu( $ID ){
	
	$childs = plenamata_get_page_childs( $ID );
	if( empty( $childs ) ) return true;
   
	$childs = array_values( $childs );

   	get_template_part( 
   		'components/pages-tabs', 
   		null, 
   		[ 'items' => $childs ] 
   	);

}

function plenamata_get_childs_templates( $meta ){

	// Page childs
	$childs = plenamata_get_page_childs( $meta->ID );
	if( !empty( $childs ) ):
		
		global $post; 
	
		$count = 1;
		foreach( $childs as $i => $post ):

			setup_postdata( $post );
			plenamata_get_page_template( $post, [ 
				'is_first' => $count == '1',
				'is_last' => $count == count( $childs ),
			]);
			
			$count++;
		
		endforeach;

		wp_reset_postdata();
	
	endif;

}

// Get component by key
function plenamata_get_component( $name, $meta, $meta_key, $args = [] ){

	if( !$meta->exists( $meta_key ) || $meta->empty( $meta_key ) ) return '';

	$items = $meta->getAll( $meta_key );

	$args[ 'meta_key' ] = $meta_key;
	$args[ 'items' ] = $items;

	get_template_part(
		'components/' . $name, null,
		$args
	);

}

// Slider
function plenamata_get_slider( $meta, $key = 'slider', $class = 'style--1' ){

	if( $meta->empty( $key ) ) return '';

	$items = $meta->getAll( $key );
	
	get_template_part(
		'components/slider-full',
		'type--1',
		[
			'class' => $class,
			'items' => $items
		]
	);

}

function plenamata_get_adjacent( $ID, $next = false, $skip_childs = false ){

	global $wpdb;

	$post = get_post( $ID );
	if( empty( $post ) ) return false;

	// Templte
    $template = get_page_template_slug( $ID );

	// If next, search by first child
	if( $next && !$skip_childs && $template == 'page-cover-menu-childs.php' ):

		$first_child = get_posts([
			'post_type' => $post->post_type,
			'posts_per_page' => 1,
			'post_parent' => $post->ID,
			'orderby' => 'menu_order post_title',
			'order' => 'ASC'
		]);

		if( !empty( $first_child ) ):

			$first_child = reset( $first_child );

			$has_child = $wpdb->get_var($wpdb->prepare(
				"SELECT ID FROM $wpdb->posts WHERE post_type = %s AND post_status = 'publish' AND post_parent = %d",
				[ $first_child->post_type, $first_child->ID ]
			));

			if( $has_child ):

				$first_child->parent_parent_id = $post->ID;
				$first_child->parent_title = $post->post_title;
				$first_child->parent_name = $post->post_name;

				return $first_child;

			endif;

		endif;
	
	else:

		// Searching adjacent
		$where = $next ? " PO.menu_order >= %d " : " PO.menu_order <= %d ";
		$order = $next ? " ASC " : " DESC ";

		$query = $wpdb->prepare(
			"
			SELECT 
				PO.ID, 
				PO.post_name, 
				PO.post_title, 
				PO.post_excerpt, 
				PO.post_content, 
				PO.post_parent, 
				PO.menu_order,
				PO.post_type,
				PA.post_parent as parent_parent_id,
				PA.post_title as parent_title,
				PA.post_name as parent_name
			FROM $wpdb->posts PO
			LEFT JOIN $wpdb->posts PA ON 
				PA.post_type = %s AND
				PA.ID = PO.post_parent AND 
				PA.post_parent <> PO.post_parent AND
				PA.ID <> PO.ID AND
				PA.menu_order >= 0
			WHERE 
				PO.post_type = %s AND 
				PO.post_parent = %d AND 
				PO.ID <> %d AND
				PO.menu_order >= 0 AND
				$where
			GROUP BY PO.ID
			ORDER BY 
				PO.menu_order $order, 
				PO.post_title ASC
			LIMIT 1
			",
			[
				$post->post_type,
				$post->post_type,
				$post->post_parent,
				$post->ID,
				$post->menu_order
			]
		);

		$adjacent = $wpdb->get_row( $query );

		// There is no adjacent
		if( empty( $adjacent ) && intVal( $post->post_parent ) > 0 ):

			$parent_parent_id = get_post_field( 'post_parent', $post->post_parent );
			return plenamata_get_adjacent( $post->post_parent, $next, true );

		else:
				
			return empty( $adjacent ) ? false : $adjacent;
		
		endif;

	endif;

}

function plenamata_get_pages_childs_nav( $ID = false, $args = [] ){

	// ID
	if( !$ID ): 
		$ID = get_the_ID();
	endif;

	// Get main childs
	$args[ 'posts' ] = plenamata_get_page_childs( $ID );
	
	if( !empty( $args[ 'posts' ] ) ):

		// Exclude resumo
		if( _array_get( $args, 'exclude_resumo' ) ):
			foreach( $args[ 'posts' ] as $pi => &$_post ):
		        if( strpos( $_post->post_name, 'resumo' ) === 0 ):
		        	unset( $args[ 'posts' ][ $pi ] );
		        endif;
			endforeach;
		endif;

		// Get template
		get_template_part( 'components/pages-childs-nav', null, $args );
	
	endif;

}

// Get page childs
$__CHILDS__ = [];
function plenamata_get_page_childs( $ID = false, $exclude = [] ){

	// Caching
	global $__CHILDS__;

	if( !$ID ): 
		$ID = get_the_ID();
	endif;

	if( !isset( $__CHILDS__[ $ID ] ) ):
		$__CHILDS__[ $ID ] = get_children([ 
			'post_parent' => ( !$ID ? get_the_ID() : $ID ),
			'post_type' => 'page',
			'post_status' => 'publish',
			'orderby' => 'menu_order',
			'order' => 'ASC',
			'exclude' => $exclude,
		]);
	endif;

	return $__CHILDS__[ $ID ];

}

// Breadcrumb items 
function plenamata_crumbs_items( $meta ){

	$items = [];
	plenamata_crumbs_get_parents( $items, $meta->item );

	$items[] = '<strong>' . text::clearTags( $meta->item->post_title ) . '</strong>';

	return $items;
	
}
function plenamata_crumbs_get_parents( &$items, $post ){
 
	$parent = $post->post_parent != '0' ? get_post( $post->post_parent ) : false;	
	if( $parent ):

		$title = text::clearTags( $parent->post_title );
		$items[] = '<a href="'. get_permalink( $parent->ID ) .'" title="'. $title .'">'. $title .'</a>';

		plenamata_crumbs_get_parents( $items, $parent );
	
	endif;

	// Reverse items
	if( !empty( $items ) ) $items = array_reverse( $items );

	return $items;

}

// Wordpress hooks

// Keep categories three 
add_filter( 'wp_terms_checklist_args', 'plenamata_category_tree_view', 10, 2 );
function plenamata_category_tree_view( $args, $post_id ){

    if( $args[ 'taxonomy' ] == 'category' ):
        $args[ 'checked_ontop' ] = false;
    endif;

    return $args;

}

// Change content tags

add_filter( 'the_content', 'plenamata_the_content' );
function plenamata_the_content( $content ){

	// Figcaption
	$content = strtr( 
		$content, 
		[
			'<cite' => '<figcaption',
			'</cite' => '</figcaption'
		]
	);

	/*
	// Blockquote
	$blocks = explode( '<blockquote>', $content );	
	if( count( $blocks ) == 1 ) return $content;

	// Text before first blockquote
	$init = array_shift( $blocks );

	// Each blockquote
	foreach( $blocks as &$block ):
	
		// Explode block
		$peaces = explode( '</strong></p>', $block );

		// Blockquote citation
		$text = array_shift( $peaces );
		$peaces_text = explode( ' ', $text  );
		$last_word = ' <span class="quote-end"><span>' . array_pop( $peaces_text ) . '</span></span>';
		
		$text = implode( ' ', $peaces_text ) . $last_word;

		array_unshift( $peaces, $text  );
		$block = implode( '</strong></p>', $peaces );
	
	endforeach;

	array_unshift( $blocks, $init );
	return implode( '<blockquote>', $blocks );
	*/

	return $content;
	
}

// Normalize category after save
add_action( 'save_post', 'plenamata_check_category', 10, 3 );
function plenamata_check_category( $post_id, $request, $creating ){
   
	$terms = get_the_terms( $post_id, 'category' );
	if( empty( $terms ) ) return '';

	// All terms ids
	$terms_ids = array_column( $terms, 'term_id' );
	
	// Search parents to insert
	$to_add = [];
	foreach( $terms as $term ):
		if( $term->parent > 0 && !in_array( $term->parent, $terms_ids ) ):
			$to_add[] = $term->parent;
		endif;
	endforeach;

	// Inserting parents
	if( !empty( $to_add ) ):
		wp_set_post_terms( 
			$post_id, 
			$to_add, 
			'category', 
			true 
		);
	endif;

}

add_filter( 'img_caption_shortcode', 'my_img_caption_shortcode', 10, 3 );
function my_img_caption_shortcode( $output, $attr, $content ) {
        
    $attr = shortcode_atts(array(
        'id'      => '',
        'align'   => 'alignnone',
        'width'   => '',
        'caption' => ''
    ), $attr );

    if( empty( $attr['caption'] ) ):
        return '';
    endif;
 
    if( $attr['id'] ):
        $attr['id'] = 'id="' . esc_attr( $attr['id'] ) . '" ';
    endif;

    // Width style
    $style = empty( $attr['width'] ) ? '' : ' style="width:100%;max-width:'. $attr['width'] .'px"';
 
    return '<div ' . $attr['id'] . 'class="wp-caption ' . esc_attr( $attr['align'] ) . '" '. $style .'>' . do_shortcode( $content ) . '<figcaption class="wp-caption-text">' . $attr['caption'] . '</figcaption>' . '</div>';
 
}