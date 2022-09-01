<?php
// Starting session
if( session_id() == '' ) session_start();

// Piki pack
require_once( __DIR__ . '/piki/piki.php' );

// Older theme
require __DIR__ . '/inc/template-tags.php';
require __DIR__ . '/inc/gutenberg-blocks.php';

// Gutemberg blocks
//require_once( __DIR__ . '/blocks/04-controls/index.php' );

// Includes
require_once( __DIR__ . '/includes/common.php' );
require_once( __DIR__ . '/includes/users.php' );
require_once( __DIR__ . '/includes/posts.php' );
require_once( __DIR__ . '/includes/coringas.php' );
require_once( __DIR__ . '/includes/glossario.php' );
require_once( __DIR__ . '/includes/campanhas.php' );
require_once( __DIR__ . '/includes/historias.php' );
require_once( __DIR__ . '/includes/partners.php' );
require_once( __DIR__ . '/includes/pages.php' );
require_once( __DIR__ . '/includes/projetos.php' );
require_once( __DIR__ . '/includes/contato.php' );
require_once( __DIR__ . '/includes/search.php' );
require_once( __DIR__ . '/includes/newsletter.php' );
require_once( __DIR__ . '/includes/home.php' );
require_once( __DIR__ . '/includes/sharing.php' );

/**
 * ASN functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Mar_de_Acoes
 * @since 1.0.0
 */

function plenamata_setup(){
	
	// Text domain
  	load_theme_textdomain( 'amazonia', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( [ 'main' => __( 'Main menu' ) ] );
	register_nav_menus( [ 'footer' => __( 'Footer menu' ) ] );

	// Add support for editor styles.
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/stylesheets/style-editor.css' );

	// Add support for responsive embedded content.
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
    
    add_post_type_support( 'post', 'excerpt' );
    add_post_type_support( 'page', 'excerpt' );

    // OLDER NEWS

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for Block Styles.
	add_theme_support( 'wp-block-styles' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	// Add support for editor styles.
	add_theme_support( 'editor-styles' );

	// Enqueue editor styles.
	add_editor_style( 'assets/stylesheets/noticias/style-editor.css' );
	add_editor_style( 'assets/stylesheets/noticias/style-editor-customizer.css' );
	add_editor_style( 'assets/stylesheets/noticias/style-editor-overrides.css' );

	// Add custom editor font sizes.
	add_theme_support(
		'editor-font-sizes',
		array(
			array(
				'name'      => __( 'Small', 'amazonia' ),
				'shortName' => __( 'S', 'amazonia' ),
				'size'      => 16,
				'slug'      => 'small',
			),
			array(
				'name'      => __( 'Normal', 'amazonia' ),
				'shortName' => __( 'M', 'amazonia' ),
				'size'      => 20,
				'slug'      => 'normal',
			),
			array(
				'name'      => __( 'Large', 'amazonia' ),
				'shortName' => __( 'L', 'amazonia' ),
				'size'      => 36,
				'slug'      => 'large',
			),
			array(
				'name'      => __( 'Huge', 'plenamata' ),
				'shortName' => __( 'XL', 'amazonia' ),
				'size'      => 44,
				'slug'      => 'huge',
			),
		)
	);


}
add_action( 'after_setup_theme', 'plenamata_setup' );

// Admin styles
function plenamata_admin_styles( $hook ){
    wp_enqueue_style( 'asn-admin-styles', get_template_directory_uri() . '/assets/stylesheets/admin.css', [], '2' );
}
add_action( 'admin_enqueue_scripts', 'plenamata_admin_styles' );
// Admin favicon
function plenamata_favicon_admin(){
	echo '<link rel="icon" type="image/png" href="'. get_template_directory_uri() .'/assets/favicon/favicon-16x16.png">';
}
add_action( 'admin_head', 'plenamata_favicon_admin' );
add_action( 'login_head', 'plenamata_favicon_admin' );

// Logo da tela de login
function plenamata_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_template_directory_uri() . '/assets/stylesheets/login.css' );
}
add_action( 'login_enqueue_scripts', 'plenamata_login_stylesheet' );

/**
 * Enqueue scripts and styles.
 */
function plenamata_scripts(){

	// Libraries
	Piki::add_library( 'malihu' );
	Piki::add_library( 'swiper' );
	Piki::add_library( 'slick' );
	Piki::add_library( 'imagesloaded' );

	// Pager
	Pager::add_files();

	// Google fonts
	wp_enqueue_style( 'google-fonts-styles', 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400&display=swap', [], NULL );

	// Scripts
	wp_enqueue_script( 'asn-scripts', get_template_directory_uri() . '/assets/javascripts/main.js', false, true );
	
	// Stylesheets
	wp_enqueue_style( 'main-style', get_template_directory_uri() . '/assets/stylesheets/main.css', [], '2' );

	wp_style_add_data( 'asn-style', 'rtl', 'replace' );

}
add_action( 'wp_enqueue_scripts', 'plenamata_scripts' );

function custom_class( $classes ){

	global $wp_query, $post;

	// JS Helper
	$classes[] = 'no-js';

	// Attachment
	if( !is_admin() && is_attachment() ):
		$classes[] = 'menu-hidden';
	endif;

	// Home
	if( is_front_page() ):
		$classes[] = 'home menu-above';
	endif;
	
	// Page classname
	if( !empty( $wp_query->get( 'pagename' ) ) ):
		$classes[] = 'page-' . $wp_query->get( 'pagename' );
	endif;

	$URI = explode( '/', trim( $_SERVER[ 'REQUEST_URI' ], '/' ) );
	if( !empty( $URI ) ):
		$first = reset( $URI );
		if( !in_array( $first, $classes ) ):
			$classes[] = $first;
		endif;
	endif;

	// Editor and admin
	if( current_user_can( 'editor' ) || current_user_can( 'administrator' ) ):
		$classes[] = 'orderable-blocks';
	endif;
	
	return $classes;
   
}
add_filter( 'body_class', 'custom_class' );

// Vídeo wrapper
add_filter( 'the_content', 'plenamata_content_filter' );
function plenamata_content_filter( $content ){
	$content = str_replace(
		[ 
			'<iframe', 
			'</iframe>',
			'[b]',
			'[/b]',
			'[em]',
			'[/em]',
		], 
		[ 
			'<div class="video-wrapper"><iframe', 
			'</iframe></div>',
			'<strong>',
			'</strong>',
			'<em>',
			'</em>',
		], 
		$content 
	);
	return $content;
}

function plenamata_remove_menus(){
	remove_menu_page( 'index.php' );
	remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'plenamata_remove_menus' );