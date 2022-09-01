<?php
// Chave do formulário de compartilhametno por email
define( 'PIKISHARE_FORM_KEY', 'pikishare' );

// Networks suportadas
$PIKISHARE_NETWORKS = array(
    'flickr'        => 'Flickr',
    'spotify'      => 'Spotify',
    'linkedin'      => 'LinkedIn',
    'instagram'      => 'Instagram',
    'facebook'      => 'Facebook',
    'twitter'       => 'Twitter',
    'youtube'       => 'Youtube',
    'google'        => 'Google+',
    'pinterest'     => 'Pinterest',
    'whatsapp'      => 'Whatsapp',
    'workplace'      => 'Workplace',
);

class PikiShare {

    public static function init(){
        // Share buttons
        add_shortcode( 'pikishare', array( 'PikiShare', 'shortcode' ) );
        // Social buttons
        add_shortcode( 'networks_links', array( 'PikiShare', 'networks_links' ) );
        // Adicionar os arquivos necessários
        self::add_files();
    }

    public static function networks_links( $atts ){

        // Redes suportadas
        global $PIKISHARE_NETWORKS;

        // Redes informadas no admin
        $social_settings = get_option( 'pikishare_options' );
        
        // Opções gerais
        $options = array(
            'services' => $PIKISHARE_NETWORKS
        );
        // Extrai os parametros
        shortcode_atts( array(
            'services' => false,
            'target' => false,
            'class' => false
        ), $atts );

        // Services
        $_services = _array_get( $atts, 'services' );
        if( $_services ):

            $_services = explode( ',', $_services );
            
            $options[ 'services' ] = array();
            foreach( $_services as $_s ):
                if( isset( $PIKISHARE_NETWORKS[ $_s ] ) ):
                    $options[ 'services' ][ $_s ] = $PIKISHARE_NETWORKS[ $_s ];
                endif;
            endforeach;
            
        endif;

        // Target
        $options[ 'target' ] = _array_get( $atts, 'target', _array_get( $social_settings, 'target' ) );
        unset( $social_settings[ 'target' ] );
        
        // Constrói os links
        $html = '';
        foreach( $options[ 'services' ] as $key => $label ):
       
            if( isset( $social_settings[ $key ] ) && $social_settings[ $key ] != '' ):

                $url = $social_settings[ $key ];
                // if( $key == 'whatsapp' ):
                //     $url = 'https://wa.me/' . ( strpos( $url, '+' ) !== 0 ? '+55' : '' ) . $social_settings[ $key ];
                // endif;

                $html .= '<li class="'. $key .'"><a href="'. $url .'" title="'. $label .'" class="'. $key .'" '. ( $options[ 'target' ] == '_blank' ? ' target="_blank"' : '' ) .'><i class="icon icon-'. $key .'" aria-hidden="true"></i></a></li>';
       
            endif;
       
        endforeach;

        if( $html == '' ) return '';

        return '<ul class="piki-social-links '. _array_get( $atts, 'class' ) .'">'. $html .'</ul>';

    }

    public static function shortcode( $atts ){

        global 
            $wp_query,
            $post
        ;

        $options = shortcode_atts(
            [
                'services' => false,
                'widget_title' => 'Compartilhe',
                'widget_title_mobile' => false,
                'size' => false,
                'url' => false,
                'title' => false,
                'text' => false,
                'description' => false,
                'email' => false,
                'mailto' => false,
                'copy_title' => 'Link',
                'class' => false,
                'style' => 1,
                'post_id' => false
            ],
            $atts 
        );

        // Patterns
        $patterns = array( '/{URL}/', '/{TITLE}/', '/{TEXT}/', '/{SUBJECT}/' );

        // Posts
        $post_id = _array_get( $options, 'post_id' );
        if( $post_id ):

            // Default URL
            $default_url = get_permalink( $post_id );

            // Default title
            $default_title = get_the_title( $post_id );
            
            // Default subject
            $default_text = get_the_content( $post_id );

        else:

            // Default URL
            if( $wp_query->is_archive() ):
                $default_url = get_post_type_archive_link( $wp_query->get( 'post_type' ) );
            else:
                $default_url = get_site_url();
            endif;
            $default_url .= !empty( $_SERVER[ 'QUERY_STRING' ] ) ? '?' . $_SERVER[ 'QUERY_STRING' ] : '';
            // Default title
            $default_title = get_bloginfo( 'name' );
            // Default subject
            $default_text = get_bloginfo( 'description' );

        endif;

        // URL
        $url = _array_get( $options, 'url', $default_url );
        // Title
        $title = _array_get( $options, 'title', $default_title );
        // Descrição
        $subject = _array_get( $options, 'subject', $default_text );
        
        // Descrição
        $text = _array_get( $options, 'text', $default_text );
        $text = preg_replace( $patterns, array( $url, $title, $text, $subject ), $text );
        $text = Piki::trim( strip_tags( $text ), 300, 'chars' );

        // URL's dos serviços
        $services = array(
            'facebook' => array(
                'url' => 'https://www.facebook.com/sharer/sharer.php?u={URL}',
                'title' => 'Facebook',
                'icon' => '<img class="fig-facebook-blue" alt="Facebook" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'twitter' => array(
                'url' => 'http://twitter.com/share?url={URL}&text={TITLE}', 
                'title' => 'Twitter',
                'icon' => '<img class="fig-twitter-blue" alt="Twitter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'linkedin' => array(
                'url' => 'https://www.linkedin.com/sharing/share-offsite/?url={URL}',
                'title' => 'LinkedIn',
                'icon' => '<img class="fig-linkedin-blue" alt="LinkedIn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'gplus' => array( 
                'url' => 'https://plus.google.com/share?url={URL}&content={TITLE}', 
                'title' => 'Google+',
                'icon' => '<img class="ico-google-azul" alt="Google+" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3AQMAAACSFUAFAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA5JREFUeNpjYBgFQxEAAAG4AAHWGtxOAAAAAElFTkSuQmCC" aria-hidden="true">'
            ),
            'pinterest' => array(
                'url' => 'http://pinterest.com/pin/create/button/?url={URL}&media={URL_MEDIA}&description={TITLE}',
                'title' => 'Pinterest',
            ),
            'whatsapp' => array(
                'url' => 'https://api.whatsapp.com/send?text={URL}',
                'attr' => 'data-action="share/whatsapp/share"',
                //'class' => 'just-mobile',
                'title' => 'Whatsapp',
                'icon' => '<img class="fig-whats-blue" alt="Watsapp" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'workplace' => array(
                'url' => 'https://work.facebook.com/sharer.php?display=popup&u={URL}',
                'title' => 'Workplace',
                'icon' => '<img class="fig-workplace" alt="Workplace" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'email' => array(
                'url' => "mailto:?subject={SUBJECT}&body={TITLE}",
                'attr' => 'subject="'. $subject .'"',
                'title' => 'E-mail',
                'icon' => '<img class="fig-email" alt="Email" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">',
            ),
            'copylink' => array(
                'url' => $url,
                'attr' => 'data-action="copy-link" data-clipboard-text="'. $url .'"',
                'class' => 'copy-link',
                'title' => $options[ 'copy_title' ],
                'icon' => '<img class="fig-link-blue" alt="Copiar URL" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAA9JREFUeNpjYBgFo2D4AAAC0AAB4tdONAAAAABJRU5ErkJggg==" aria-hidden="true">'
            ),
        );

        // Serviços
        $_services = _array_get( $options, 'services' );
        if( $_services ):
            $selecteds = explode( ',', $_services );
        else:
            $selecteds = array_keys( $services );
        endif;
        
        // Email content
        $email_content = _array_get( $options, 'email_content', $text );

        // Widget title
        $widget_title = _array_get( $options, 'widget_title', 'Compartilhar' );
        $widget_title_mob = _array_get( $options, 'widget_title_mobile', $widget_title );

        $html = '
            <div class="pikishare '. _array_get( $options, 'class', '' ) .' style--' . _array_get( $options, 'style', '1' ) . '" share-url="'. $url .'" share-title="'. $title .'" share-text="'. $text .'">
                <em class="title hide-phone" title="'. $widget_title .'">
                    <strong>'. $widget_title .'</strong>
                </em>
                <div class="networks">
                    <ul>';

                        foreach( $selecteds as $key => $service ):
                        
                            $_url = preg_replace( $patterns, array( $url, $title, $text, $subject ), $services[ $service ][ 'url' ] );

                            $srvc = $services[ $service ];

                            $class = $service;
                            if( isset( $srvc[ 'class' ] ) ):
                                $class .= ' ' . $srvc[ 'class' ];
                            endif;
                            
                            $html .= '  <li class="'. $class .'"><a href="'. $_url .'" title="'. $srvc[ 'title' ] .'" class="'. $class . '" target="_blank" rel="noreferrer"';

                            // Attributes
                            if( isset( $srvc[ 'attr' ] ) ):
                                $html .= ' ' . $srvc[ 'attr' ];
                            endif;

                            //$html .= '>' . ( isset( $srvc[ 'icon' ] ) ? $srvc[ 'icon' ] : '' ) . '<span>' . $srvc[ 'title' ] . '</span></a></li>';
                            $html .= ' data-type="'. $service .'"><span>' . $srvc[ 'title' ] . '</span></a></li>';
                        
                        endforeach;
                        
                        // Email
                        if( _array_get( $options, 'mailform' ) ):

                            $html .= '  <li class="email" subject="'. $subject .'" content="'. $email_content .'">';    
                            $html .= do_shortcode( '[pikiforms_button form_key="'. PIKISHARE_FORM_KEY .'" class="email" label="Enviar por email" icon="<i>Eneviar por e-mail</i>"]' );
                            $html .= '  </li>';

                        endif;
        
        $html .= '
                    </ul>
                    <button type="button" class="close" data-action="close" title="Fechar">Fechar</button>
                </div>
                <button data-action="mobile-share" class="mobile" title="'. _array_get( $options, 'widget_title', 'Compartilhar' ) .'">'. $widget_title_mob .'</button>
            </div>';

        self::add_files();

        return $html;
    }

    public static function add_files(){
        
        // Clipboard
        //Piki::add_library( 'clipboard' );

        // Scripts e estilos
        wp_enqueue_script( 'pikishare-scripts', Piki::minified( '/piki-share.js', __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'pikishare-styles', Piki::url( '/piki-share.css', __FILE__ ) );
    
    }

    public static function email_content( $email_configs, $settings, $posted ){

        // Modifica apenas o formulário de compartilhamento
        if( $settings[ 'key' ] != 'pikishare' ):
            return $email_configs;
        endif;
        
        $images = WP_PLUGIN_URL . '/demillus/images/';
        $transparent = '<img src="'. $images .'/transparent.png" border="0" width="1" height="1" style="display:block;border:0;width:1px;height:1px;" aria-hidden="true">';
        $br = '<br /><img src="'. $images .'/transparent.png" border="0" width="1" height="26" style="display:block;border:0;width:1px;height:26px;" aria-hidden="true">';

        $html = '
        <table width="500" cellpadding="0" cellspacing="0" border="0" style="border:0; border-collapse:collapse;">
            <tr>
                <td width="500" height="107" colspan="3" bgcolor="#eb1753"><img src="'. $images .'email_header.jpg" border="0" width="500" height="107" style="display:block;border:0;" /></td>
            </tr>
            <tr><td width="500" colspan="3" bgcolor="#e5e5e5" height="18">'. $transparent .'</td></tr>
            <tr>
                <td width="500" colspan="3" bgcolor="#e5e5e5" align="center">
                    <strong><font face="arial" color="#000000" size="1" style="font-size: 12px; color: #000000 ;">Demillus - Sugestão</font></strong>
                </td>
            </tr>
            <tr><td width="500" colspan="3" bgcolor="#e5e5e5" height="18">'. $transparent .'</td></tr>
            <tr><td width="500" colspan="3" bgcolor="#ffffff" height="46">'. $transparent .'</td></tr>
            <tr>
                <td width="50" bgcolor="#ffffff">'. $transparent .'</td>
                <td width="400">
                    <font face="arial" color="#000000" size="2" style="font-size:14px;color:#000000;">

                        '. $posted[ 'nome' ][ 0 ] .' indicou para você a Revista DeMillus Shopping. Clicando no link abaixo, você vai acessar mais de 400 modelos: lingerie para os diversos biotipos, meias Dantelle, linha masculina, infantil e cosméticos.
                    
                        Assunto: <br /><br />
                        Mensagem: '. $posted[ 'mensagem' ][ 0 ] .'<br /><br />
                        URL: <a href="'. $posted[ 'url' ][ 0 ] .'" target="_blank">'. $posted[ 'url' ][ 0 ] .'</a>
                    
                    </font>
                </td>
                <td width="50" bgcolor="#ffffff">'. $transparent .'</td>
            </tr>
            <tr><td width="500" colspan="3" bgcolor="#ffffff" height="46">'. $transparent .'</td></tr>
            <tr><td width="500" bgcolor="#0f0f0f" colspan="3" height="12">'. $transparent .'</td></tr>
            <tr>
                <td width="50" bgcolor="#0f0f0f">'. $transparent .'</td>
                <td bgcolor="#0f0f0f"><font face="arial" color="#ffffff" size="1" style="font-size:12px;color:#ffffff;text-decoration:none;">
                    SAC DeMillus: (21) 3545-5000<br />
                    <a href="mailto:sac@demillus.com.br" target="_blank" style="text-decoration:none;"><font face="arial" color="#ffffff" size="1" style="font-size:12px;color: #ffffff;text-decoration:none;">sac@demillus.com.br</font></a><br />
                    <a href="http://www.demillus.com.br" target="_blank" style="text-decoration:none;"><font face="arial" color="#ffffff" size="1" style="font-size:12px;color: #ffffff;text-decoration:none;">www.demillus.com.br</font></a>
                </font></td>
                <td width="50" bgcolor="#0f0f0f">'. $transparent .'</td>
            </tr>
            <tr><td width="500" bgcolor="#0f0f0f" colspan="3" height="12">'. $transparent .'</td></tr>
        </table>
        ';

        $email_configs[ 'content' ] = $html;
        return $email_configs;

    }

}
add_action( 'init', array( 'PikiShare', 'init' ) );
// Conteúdo dos emails automáticos
add_filter( 'pikiforms_email_configs', array( 'PikiShare', 'email_content' ), 2, 3 );

// Dados do formulário
function pikiform_pikishare_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => 4,
        'key' => 'pikishare',
        'title' => '',
        'description' => '',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'success_message' => 'Seu email foi enviado com sucesso.<br /><input type="button" class="form-save-button button-primary button-large reload-form" value="Compartilhar novamente" />',
        'edit_success_message' => '',
        'classname' => '',
        'attributes' => '',
        'submit_button_label' => 'Enviar email',
        'edit_button_label' => '',
        'email' => array(
            'send' => true,
            'subject' => get_bloginfo( 'name' ),
            'sender' => get_option( 'admin_email' ),
            'to' => '[field_email_destino]',
            'replyto' => get_option( 'admin_email' ),
        ),
        'public' => true,
        'post_type' => NULL,
        'post_type_active' => true,
    );
}

function pikiform_pikishare_fields(){
    return array(
        'nome' => array(
            'label' => 'De',
            'required' => 'on',
            'ftype' => 'text',
            'machine_name' => 'nome',
            'attr' => array( 'placeholder' => 'Seu nome' )
        ),
        'email_destino' => array(
            'required' => 'on',
            'label' => 'Para',
            'ftype' => 'email',
            'machine_name' => 'email_destino',
             'attr' => array( 'placeholder' => 'Email de destino' )
       ),
        'assunto' => array(
            'required' => 'on',
            'label' => 'Assunto',
            'ftype' => 'text',
            'machine_name' => 'assunto',
        ),
        'mensagem' => array(
            'required' => 'on',
            'label' => 'Mensagem',
            'ftype' => 'textarea',
            'machine_name' => 'mensagem',
        ),
        'url' => array(
            'required' => 'on',
            'label' => 'URL',
            'ftype' => 'text',
            'machine_name' => 'url',
        ),
    );
}

// Apenas ADMIN
if( is_admin() ):
    // Página de administração
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;
