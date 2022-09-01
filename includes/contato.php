<?php
define( 'CONTATO_KEY', 'contato' );

class Contato {

    function __construct(){
        add_action( 'init', [ $this, 'registerPostType' ] );
    }

	public static function registerPostType(){

		$labels = array(
			'name'               => __( 'Contato', 'piki' ),
			'singular_name'      => __( 'Contato', 'piki' ),
			'menu_name'          => __( 'Contato', 'piki' ),
			'name_admin_bar'     => __( 'Contato', 'piki' ),
			'add_new'            => __( 'Adicionar nova', 'piki' ),
			'add_new_item'       => __( 'Adicionar nova mensagem', 'piki' ),
			'new_item'           => __( 'Nova mensagem', 'piki' ),
			'edit_item'          => __( 'Editar mensagem', 'piki' ),
			'view_item'          => __( 'Ver mensagens', 'piki' ),
			'all_items'          => __( 'Todas as mensagens', 'piki' ),
			'search_items'       => __( 'Procurar mensagem', 'piki' ),
			'parent_item_colon'  => __( 'Mensagem mãe:', 'piki' ),
			'not_found'          => __( 'Nenhuma mensagem encontrada.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhuma mensagem na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Contato', 'piki' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'show_in_rest'       => false,
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => 0,
			'supports'           => array( 'title', 'editor' ),
			'menu_icon'			 => 'dashicons-testimonial',
		);

		register_post_type( CONTATO_KEY, $args );

    }

}
$Contato = new Contato();

// Form settings
function pikiform_contato_settings(){
	return [
		'key' => CONTATO_KEY,
        'post_type' => CONTATO_KEY,
        'post_type_active' => true,
        'public' => true,
        'placeholders' => true,
        'error_general' => false,
        'submit_button_label' => 'Enviar',
        'success_type' => 'modal',
        'success_message' => '<em>Sua mensagem foi enviada!</em><p>Nossa equipe te responderá o mais rápido possível.</p><button class="styled" data-action="close-modal">OK</button>',
        // Recaptch
        // 'recaptcha_key' => '6Lc2ruYgAAAAAGX9cnNuk3rYGZ60MancGQb-qAwZ',
        // 'recaptcha_secret' => '6Lc2ruYgAAAAAMUVuoDCRykUz3W9HigpikF4_bjJ',
        /*
        // Email
        'email' => [
            'send' => false,
            'subject' => 'Fale Conosco - ' . get_option( 'blogname' ),
            'sender' => get_option( 'admin_email' ),
            'to' => get_option( 'admin_email' ),
            'replyto' => false,
        ],
        */
	];
}
function pikiform_contato_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Seu nome',
            'maxlength' => 120,
            'required' => true,
        ],
        'email' => [
            'machine_name' => 'email',
            'ftype' => 'email',
            'label' => 'Seu E-mail',
            'maxlength' => 255,
            'required' => true,
        ],
        'message' => [
            'machine_name' => 'message',
            'ftype' => 'textarea',
            'label' => 'Mensagem',
            'placeholder' => 'Sua mensagem',
            'maxlength' => '1000',
            'required' => true,
        ],
        'termsuse' => [
            'machine_name' => 'termsuse',
            'ftype' => 'termsuse',
            'label' => 'Para enviar, você deve aceitar nossa  <a href="'. get_site_url( null, '/politica-de-privacidade/' ) .'" data-modal-target="politica-de-privacidade" data-modal-label-button="Li e aceito os termos">Declaração de Privacidade</a>.',
            'required' => true,
        ],
    ];
}
