<?php 
class PikiMenu {

	public static function setTitle( $title, $item, $args, $depth ){
		return $title;
	}

	public static function setAttributes( $atts, $item, $args, $depth ){

		global $post;

		if( empty( $atts[ 'title' ] ) ):
			$atts[ 'title' ] = preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $item->title );
		endif;

		return $atts;

	}

	public static function setClassnmae( $classes, $item ){

		global $post, $wp_query;

		// Clean title
		$title = trim( preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $item->title ) );

		// Slug
		$slug = transliterate( $title, '-' );
				
		// Name
		$classes[] = $slug;

		// Mark as current
		$mark_as_current = false;

		// Mark by name in URL
		$url_slug = false;
		if( strpos( $item->url, '/' ) !== false || strpos( $item->url, '#' ) !== false ):
		
			$url_slug = trim( trim( $item->url, '/' ), '#' );		
			
			if( $wp_query->get( $url_slug ) != '' ):
				$mark_as_current = true;
			endif;
					
		endif;

		// Remove mark relative links
		if( strpos( $item->url, '/' ) === 0 || strpos( $item->url, '#' ) === 0 ):

			// Hash link as URL on his page
			$post_name = _object_get( $post, 'post_name' );
			
			// Current anchor page
			if( $post_name && $item->url == '/#' . $post_name ):

				$item->url = get_permalink( $post->ID );
				$mark_as_current = true;

			else:

				$classes = array_diff( $classes, [ 'current-menu-item', 'current_page_item' ] );
			
			endif;

		endif;

		// If current item
		if( $mark_as_current ):
			$classes[] = 'current-menu-item';
		endif;

		// Parent archive
		if( is_single() && $item->type == 'post_type_archive' && $item->object == $post->post_type ):
			$classes[] = 'current-archive-parent';
		endif;

	    return $classes;

	}

}
add_filter( 'nav_menu_item_title', array( 'PikiMenu', 'setTitle' ), 10, 4 );
add_filter( 'nav_menu_link_attributes', array( 'PikiMenu', 'setAttributes' ), 10, 4 );
add_filter( 'nav_menu_css_class' , array( 'PikiMenu', 'setClassnmae' ), 10 , 2 );
