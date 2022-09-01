<?php
class PikiFieldsHooks {

	public static function init(){
		echo '<pre>';
		var_dump( 'opa!' );
		exit;
	}

	// Imagewp - Deletando derivações das imagens 
	public static function imagewp_delete_attachment( $post_id ){
		
		//echo '<pre>';
		//var_dump( $post_id );
		//exit;

	}

	public static function users_get_users(){
		users::search_users();
	}

}

// Image - Delta uma imagem do campo do tipo image
add_action( 'wp_ajax_field_image_delete', array( 'image', 'ajax_delete_image' ) );
// Removendo imagens atachadas
add_action( 'delete_attachment', array( 'PikiFieldsHooks', 'imagewp_delete_attachment' ) );
// Recuperando lista de usuários
add_action( 'wp_ajax_users_get_users', array( 'PikiFieldsHooks', 'users_get_users' ) );
