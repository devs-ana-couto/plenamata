<?php
define( 'PROJETO_KEY', 'projeto' );

class Projetos {

    function __construct(){
        add_action( 'init', [ $this, 'registerPostType' ] );
    }

	public static function registerPostType(){

		$labels = array(
			'name'               => __( 'Projetos', 'piki' ),
			'singular_name'      => __( 'Projeto', 'piki' ),
			'menu_name'          => __( 'Projetos', 'piki' ),
			'name_admin_bar'     => __( 'Projetos', 'piki' ),
			'add_new'            => __( 'Adicionar novo', 'piki' ),
			'add_new_item'       => __( 'Adicionar novo projeto', 'piki' ),
			'new_item'           => __( 'Novo projeto', 'piki' ),
			'edit_item'          => __( 'Editar projeto', 'piki' ),
			'view_item'          => __( 'Ver projetos', 'piki' ),
			'all_items'          => __( 'Todos os projeto', 'piki' ),
			'search_items'       => __( 'Procurar projeto', 'piki' ),
			'parent_item_colon'  => __( 'Projeto pai:', 'piki' ),
			'not_found'          => __( 'Nenhum projeto encontrado.', 'piki' ),
			'not_found_in_trash' => __( 'Nenhum projeto na lixeira.', 'piki' )
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Projetos', 'piki' ),
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
			'supports'           => [ 'title', 'editor' ],
			'menu_icon'			 => 'dashicons-portfolio',
		);

		register_post_type( PROJETO_KEY, $args );

    }

}
$Projetos = new Projetos();

// Form settings
function pikiform_projeto_settings(){
	return [
		'key' => PROJETO_KEY,
        'post_type' => PROJETO_KEY,
        'post_type_active' => true,
        'public' => true,
        'placeholders' => true,
        'error_general' => false,
        'submit_button_label' => 'Enviar projeto',
        'success_type' => 'modal',
        'success_message' => '<em>Sua mensagem foi enviada!</em><p>Nossa equipe te responderá o mais rápido possível.</p><button class="styled" data-action="close-modal">OK</button>',
        // Recaptch
        // 'recaptcha_key' => '6Lc2ruYgAAAAAGX9cnNuk3rYGZ60MancGQb-qAwZ',
        // 'recaptcha_secret' => '6Lc2ruYgAAAAAMUVuoDCRykUz3W9HigpikF4_bjJ',
	];
}
function pikiform_projeto_fields(){
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
        'subject' => [
            'machine_name' => 'subject',
            'ftype' => 'text',
            'label' => 'Assunto',
            'maxlength' => 255,
            'placeholder' => 'Do que deseja falar?',
            'required' => true,
        ],
        'message' => [
            'machine_name' => 'message',
            'ftype' => 'textarea',
            'label' => 'Mensagem',
            'placeholder' => 'No que está pensando?',
            'maxlength' => '1000',
            //'show_counter' => true,
            //'counter_format' => '#input de #max caracteres',
            'required' => true,
        ],
        /*'termsuse' => [
            'machine_name' => 'termsuse',
            'ftype' => 'termsuse',
            'label' => 'Li e concordo com os <a href="'. get_site_url( null, '/politica-de-privacidade/' ) .'" data-modal-target="politica-de-privacidade" data-modal-label-button="Li e aceito os termos">Termos de Uso e Privacidade</a>',
            'required' => true,
        ],*/
    ];
}
