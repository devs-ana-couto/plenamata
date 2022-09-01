<?php
define( 'FALE_KEY', 'faleconosco' );

class FaleConosco {

    function __construct(){
        add_action( 'init', [ $this, 'init' ] );
        add_filter( 'body_class', [ $this, 'customBodyClass' ] );
    }

	public function init(){
		$this->registerPostType();
	}

    public function customBodyClass( $classes ){

        global $wp_query;

        // Menu hidden
        if( is_page() && $wp_query->get( 'pagename' ) == 'fale-conosco' ):
            $classes[] = 'menu-hidden';
        endif;        

        return $classes;

    }

	public static function registerPostType(){

		$labels = array(
			'name'               => __( 'Fale conosco', 'piki' ),
			'singular_name'      => __( 'Fale conosco', 'piki' ),
			'menu_name'          => __( 'Fale conosco', 'piki' ),
			'name_admin_bar'     => __( 'Fale conosco', 'piki' ),
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
			'description'        => __( 'Fale Conosco', 'piki' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'noticias' ),
			'show_in_rest'       => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 0,
			'taxonomies'		 => [ 'category' ],
			'supports'           => array( 'title', 'excerpt', 'revisions' ),
			'menu_icon'			 => 'dashicons-calendar-alt',
		);

		register_post_type( FALE_KEY, $args );

    }

}
$FaleConosco = new FaleConosco();

// Form settings
function pikiform_faleconosco_settings(){
	return [
		'key' => FALE_KEY,
        'post_type' => FALE_KEY,
        'post_type_active' => true,
        'public' => true,
        'error_general' => false,
        'success_type' => 'modal',
        'success_message' => '<em>Sua mensagem foi enviada!</em><p>Nossa equipe te responderá o mais rápido possível.</p><button class="styled" data-action="close-modal">OK</button>',
        // Recaptch
        'recaptcha_key' => '6Lc2ruYgAAAAAGX9cnNuk3rYGZ60MancGQb-qAwZ',
        'recaptcha_secret' => '6Lc2ruYgAAAAAMUVuoDCRykUz3W9HigpikF4_bjJ',
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
function pikiform_faleconosco_fields(){
	return [
        'title' => [
            'machine_name' => 'title',
            'ftype' => 'title',
            'label' => 'Seu nome',
            'maxlength' => 120,
            'placeholder' => 'Como você se chama?',
            'required' => true,
        ],
        'email' => [
            'machine_name' => 'email',
            'ftype' => 'email',
            'label' => 'E-mail',
            'placeholder' => 'Qual é o seu email?',
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
            'show_counter' => true,
            'counter_format' => '#input de #max caracteres',
            'required' => true,
        ],
        'termsuse' => [
            'machine_name' => 'termsuse',
            'ftype' => 'termsuse',
            'label' => 'Li e concordo com os <a href="'. get_site_url( null, '/politica-de-privacidade/' ) .'" data-modal-target="politica-de-privacidade" data-modal-label-button="Li e aceito os termos">Termos de Uso e Privacidade</a>',
            'required' => true,
        ],
    ];
}
