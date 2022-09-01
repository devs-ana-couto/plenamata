<?php
// Chave do formulário de compartilhametno por email
define( 'NEWSLETTER_KEY', 'newsletter' );

class Newsletter {

    var $settings;

    function __construct(){
        $this->settings = get_option( 'newslettter_settings' );
    }

    public function init(){
        // Share buttons
        add_shortcode( NEWSLETTER_KEY, array( 'Newsletter', 'shortcode' ) );
    }

    // Faz o cadastro do usuário
    public function form_submit( $settings, $posted ){
        
        // Checa se é o formulário correto
        if( $settings[ 'key' ] != NEWSLETTER_KEY ):
            return;
        endif;
        
        // Email postado
        $email = trim( $posted[ 'email' ] );

        // Mailchimp
        if( $this->settings[ 'mailchimp' ][ 'active' ] === true  ):
            $this->mailchimp_subscribe( $email );
        endif;

        // Sendpress
        if( $this->settings[ 'sendpress' ][ 'active' ] === true  ):
            $this->sendpress_subscribe( $email );
        endif;
            
    }

    // Mailchimp
    public function mailchimp_subscribe( $email ){

        // API Key
        if( empty( $this->settings[ 'mailchimp' ][ 'api_key' ] ) ):
            Piki::error( __( 'A API Key do Mailchimp não foi definida', 'amazonia' ) );
        endif;

        // List ID
        if( empty( $this->settings[ 'mailchimp' ][ 'list_id' ] ) ):
            Piki::error( __( 'O ID da lista do Mailchimp não foi definida', 'amazonia' ) );
        endif;

        // API Mailchimp
        include( Piki::path( __FILE__ ) . 'Mailchimp.php');
        $this->mc = new Mailchimp( $this->settings[ 'mailchimp' ][ 'api_key' ] );
        
        // Tenta cadastrar o usuário
        try {
            $this->mc->lists->subscribe( $this->settings[ 'mailchimp' ][ 'list_id' ], array( 'email' => $email ) );
        } 
        catch ( Mailchimp_Error $e ) {
            // Se o cadastro já existe, fazemos o update
            if( $e->getCode() == 214 ):
                $this->mc->lists->updateMember( $this->settings[ 'mailchimp' ][ 'list_id' ], array( 'email' => $email ), null );
            endif;
        }

    }

    // Sendpress
    public function sendpress_subscribe( $email ){

        // Se o usuário já existe
        $exists = SendPress_Data::get_subscriber_by_email( $email );

        // Se o usuário não foi cadastrado
        if( empty( $exists ) ):

            // Listas
            $lists = isset( $this->settings[ 'sendpress' ][ 'lists' ] ) ? implode( ',', array_keys( $this->settings[ 'sendpress' ][ 'lists' ] ) ) : false;
 
            // Outros plugins podem modificar as listas
            $lists = apply_filters( 'newsletter_sendpress_lists', $lists );

            // Primeiro nome, de acordo com o email
            $peaces_email = explode( '@', $email );

            // Insere o usuário na lista
            $response = SendPress_Data::subscribe_user( $lists, $email, array_shift( $peaces_email ), '' );

        endif;

    }


    /* Statics */
        
        public static function shortcode( $atts ){

            $atts = shortcode_atts(
                [
                    'title' => '<h2>' . __( 'Cadastre-se', 'amazonia' ) . '</h2>',
                    'description' => '<span class="text">' . __( 'Receba em 1ª mão as informações e opiniões mais relevantes', 'amazonia' ) . '</span>',
                    'button_label' => false,
                    'icon' => false,
                ], 
                $atts, 
                NEWSLETTER_KEY 
            );

            // Title
            $title = _array_get( $atts, 'title' );
            // Desc
            $desc = _array_get( $atts, 'description' );
            // Button label
            $button_label = _array_get( $atts, 'button_label' );

            $shortcode = '[pikiforms fid="'. NEWSLETTER_KEY .'" class="newsletter"';
            if( $title ):
                $shortcode .= ' title="'. $title .'"';
            endif;
            if( $desc ):
                $shortcode .= ' description="'. $desc .'"';
            endif;
            if( $button_label ):
                $shortcode .= ' submit_button_label="'. $button_label .'"';
            endif;
            $shortcode .= ']';

            // HTML
            $html = '<div class="newsletter-form-wrapper clearfix"><div class="newsletter-form-content clearfix">' . do_shortcode( $shortcode ) . '</div></div>';
            
            // Aditional files
            self::add_files();

            return $html;

        }

        public static function add_files(){
            // Scripts e estilos
            $path = Piki::url( '/', __FILE__ );
            wp_enqueue_script( 'newsletter-scripts', $path . 'newsletter.js', array( 'jquery' ) );
            wp_enqueue_style( 'newsletter-styles', $path . 'newsletter.css' );
        }

}
$Newsletter = new Newsletter();
// Inicio
add_action( 'init', array( $Newsletter, 'init' ) );
// Submissão dos formulários
add_action( 'pikiform_submit', array( $Newsletter, 'form_submit' ), 10, 3 );

// Conteúdo dos emails automáticos
//add_filter( 'pikiforms_email_configs', array( 'Newsletter', 'email_content' ), 2, 3 );

// Dados do formulário de cadastro
function pikiform_newsletter_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => true,
        'pid' => false,
        'key' => NEWSLETTER_KEY,
        'title' => '<h2>' . __( 'Cadastre-se', 'amazonia' ) . '</h2>',
        'description' => '<span class="text">' . __( 'Receba em 1ª mão as informações e opiniões mais relevantes',  'amazonia' ) . '</span>',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'error_general' => false,
        'error_message' => __( 'Ops! Você precisa preencher o seu e-mail corretamente.', 'amazonia' ),
        'success_message' => '<i class="icon icon-check"></i><span class="text">'. __( 'Muito Obrigado por assinar nossa Newsletter!',  'amazonia' ) . '</span>',
        'edit_success_message' => '',
        'classname' => '',
        'attributes' => '',
        'submit_button_label' => __( 'Assinar', 'amazonia' ),
        'edit_button_label' => '',
        'email' => [
            'send' => false,
            'subject' => __( 'Cadastro de newsletter', 'amazonia' ),
            'sender' => get_option( 'admin_email' ),
            'to' => '[field_email]',
            'replyto' => '[field_email]',
        ],
        'public' => true,
        'post_type' => NULL,
        'post_type_active' => true,
    );
}

// Campos do formulário de cadastro
function pikiform_newsletter_fields(){
    return [
        // 'nome' => array(
        //     'label' => 'Nome',
        //     'required' => 'on',
        //     'ftype' => 'text',
        //     'machine_name' => 'nome',
        // ),
        'email' => [
            'required' => 'on',
            'label' => 'E-mail',
            'ftype' => 'email',
            'machine_name' => 'email',
            'require' => 'true',
            'messages' => [
                'required' => __( 'Ops! Você precisa informar seu endereço de email', 'amazonia' ),
                'value' => __( 'Ops! Você precisa preencher o seu e-mail corretamente.', 'amazonia' ),
                'invalid' => __( 'Ops! Você precisa preencher o seu e-mail corretamente.', 'amazonia' ),
            ],
        ],
        'receive_clipping' => [
            'machine_name' => 'receive_clipping',
            'ftype' => 'boolean',
            'label' => __( 'Quero receber o clipping diário de notícias sobre desmatamento', 'amazonia' ),
        ],
        'receive_news' => [
            'machine_name' => 'receive_news',
            'ftype' => 'boolean',
            'label' => __( 'Concordo em receber novidades sobre o PlenaMata e participar de pesquisas de opinião a respeito da plataforma.', 'amazonia' ),
            'require' => true,
        ],
    ];
}