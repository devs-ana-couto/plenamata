<?php
// Chave do formulário de compartilhametno por email
define( 'CONTACT_KEY', 'contact' );

class contact {

    public function init(){
        // Share buttons
        add_shortcode( CONTACT_KEY, array( 'contact', 'shortcode' ) );
    }

    /* Statics */
        
        public static function shortcode( $atts ){

            // Opções
            $defaults = array(
                'title' => false,
                'description' => false,
                'icon' => false,
            );
            $options = shortcode_atts( $defaults, $atts );
            $options = array_merge( $defaults, $options );

            $shortcode = '[pikiforms fid="'. CONTACT_KEY .'" class="contact"';
            if( !empty( $options[ 'title' ] ) ):
                $shortcode .= ' title="'. $options[ 'title' ] .'"';
            endif;
            if( !empty( $options[ 'description' ] ) ):
                $shortcode .= ' description="'. $options[ 'description' ] .'"';
            endif;
            $shortcode .= ']';

            // HTML
            $html = '<div class="contact-form-wrapper clearfix"><div class="contact-form-content clearfix">' . do_shortcode( $shortcode ) . '</div></div>';
            
            // Aditional files
            self::add_files();

            return $html;

        }

        public static function add_files(){
            // Scripts e estilos
            $path = Piki::url( '/', __FILE__ );
            wp_enqueue_script( 'contact-scripts', ( $path . 'scripts.js' ), array( 'jquery' ) );
            wp_enqueue_style( 'contact-styles', ( $path . 'styles.css' ) );
        }

}
$contact = new contact();
// Inicio
add_action( 'init', array( $contact, 'init' ) );

// Conteúdo dos emails automáticos
//add_filter( 'pikiforms_email_configs', array( 'contact', 'email_content' ), 2, 3 );

// Dados do formulário de cadastro
function pikiform_contact_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'pid' => false,
        'key' => CONTACT_KEY,
        'title' => false,
        'error_general' => false,
        'error_message' => 'Ops! Você precisa preencher o seu e-mail corretamente.',
        'success_message' => '<h3>Sua mensagem foi enviada com sucesso!</h3><p>Nossa equipe recebeu sua mensagem. Responderemos o mais rápido possível.</p><a href="'. get_site_url() .'" title="Ir para o início">Ir para o início</a>',
        'submit_button_label' => __( 'Send message', 'piki' ),
        'email' => array(
            'send' => false,
            'subject' => 'Contato pelo site',
            'sender' => get_option( 'admin_email' ),
            'to' => '[field_email]',
            'replyto' => '[field_email]',
        ),
        'public' => true,
        'post_type' => NULL,
        'post_type_active' => true,
    );
}

// Campos do formulário de cadastro
function pikiform_contact_fields(){
    return array(
        'nome' => array(
            'label' => __( 'Name', 'piki' ),
            'required' => true,
            'ftype' => 'title',
            'machine_name' => 'nome',
            'placeholder' => __( 'Type your name', 'piki' ),
            'minlength' => 3,
        ),
        'email' => array(
            'label' => 'Email',
            'required' => true,
            'ftype' => 'email',
            'machine_name' => 'email',
            'placeholder' => __( 'Type your email', 'piki' ),
            'messages' => array(
                'required' => __( 'E-mail is required', 'piki' ),
                'value' => __( 'Please enter a valid email', 'piki' ),
                'invalid' => __( 'Enter a valid email', 'piki' ),
            ),
        ),
        'telefone' => array(
            'label' => __( 'Telephone', 'piki' ),
            'ftype' => 'telephone',
            'machine_name' => 'telefone',
            'placeholder' => '(DDD)',
        ),
        'assunto' => array(
            'label' => __( 'Subject', 'piki' ),
            'required' => true,
            'ftype' => 'text',
            'machine_name' => 'assunto',
            'placeholder' => __( 'Enter subject ', 'piki' ),
            'minlength' => 3,
        ),
        'mensagem' => array(
            'label' => __( 'Message', 'piki' ),
            'required' => true,
            'ftype' => 'textarea',
            'machine_name' => 'mensagem',
            'placeholder' => __( 'Type your message', 'piki' ),
            'minlength' => 3,
        ),
    );
}

// Apenas ADMIN
if( is_admin() ):
    // Página de administração
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;
