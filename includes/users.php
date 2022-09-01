<?php
class Users {

    public static function init(){

        global $wp_roles;

        if( _get( 'devel' ) ):

            $user_id = get_current_user_id();

            $user = get_userdata( $user_id );

            echo '<pre>';
            echo '$user', '<br>';
            var_dump( $user );
            exit();

            $user_role = reset( $user->roles );

            $role = $wp_roles->roles[ $user_role ];

            echo '<pre>';
            echo '$user', '<br>';
            var_dump( $user->data->display_name );
            var_dump( __( $role[ 'name' ] ) );
            exit();
            
        endif;

    }

    public static function activationEmail( $arg1 ){
        // echo '<pre>';
        // echo 'activationEmail', '<br>';
        // var_dump( $arg1 );
        // exit();
    }
    public static function signupEmail( $html, $user_login, $user_email, $key, $meta ){

        global $wpdb, $wp_roles;

        $user = $wpdb->get_row($wpdb->prepare("
            SELECT 
                signup_id,
                user_login,
                user_email,
                registered,
                activated,
                active,
                activation_key,
                meta
            FROM
                {$wpdb->prefix}signups
            WHERE 
                user_email = %s
            ",
            $user_email
        ));

        $meta = unserialize( $user->meta );

        $role = $wp_roles->roles[ $meta[ 'new_role' ] ];

        $text = 'Olá,'. plenamata_mail_br( 21 ) .'
        Você recebeu um convite para se juntar ao site da Agência Sebrae de Notícias '. get_bloginfo( 'name' ) .' na função de '. $role[ 'name' ] . '.' . plenamata_mail_br( 32 ) . '
        <a href="[LINK]" target="_blank" rel="noreferrer" title="Ativar sua conta"><font color="#3866E5" style="color:#3866E5;">Clique aqui</font></a> para aceitar o convite e ativar a sua conta.'. plenamata_mail_br( 32 ) .'
        Este link irá expirar em poucos dias.'. plenamata_mail_br( 8 ) .'
        Se você não quer se juntar ao site ou acredita que recebeu este e-mail por engano, basta ignorar esta mensagem.'. plenamata_mail_br( 56 ) .'
        Até logo,'. plenamata_mail_br( 8 ) . '
        Time ASN' . plenamata_mail_br( 32 );

        // Template
        $template = plenamata_mail_template( 'Seja bem-vindo!', $text );

        // Replacements
        $template = str_replace( '%', '%%', $template );
        $template = str_replace( '[LINK]', '%s', $template );

        return $template;
        
    }
    public static function signupSubject( $message, $user, $user_email, $key ){
        return 'Agência Sebrae de Notícias - Ativar usuário';
    }

    public static function welcomeEmail( $welcome_email, $blog_id, $user_id, $password, $title, $meta ){

        $user = get_user( $user_id );
        
        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Seu acesso ao Portal ASN foi liberado e você já foi incluído na equipe. Você é agora um dos editores de conteúdo da nossa agência, podendo contribuir cada vez mais para a divulgação de notícias do universo das micro e pequenas empresas brasileiras!'. plenamata_mail_br( 32 ) .'
        Clique <a href="'. network_site_url( 'wp-admin/profile.php' ) .'" target="_blank" rel="noreferrer" title="Acessar meu perfil"><font color="#3866E5" style="color:#3866E5;">aqui</font></a> para acessar seu perfil e atualizar suas informações.'. plenamata_mail_br( 56 ) .'
        Até logo,'. plenamata_mail_br( 8 ) . '
        Time ASN' . plenamata_mail_br( 32 );

        // Template
        $welcome_email = plenamata_mail_template( 'Seja bem-vindo!', $text );

        return $welcome_email;
        
    }
    public static function welcomeSubject( $subject ){
        echo '<pre>';
        echo 'welcomeSubject', '<br>';
        exit();
    }
    public static function welcomeUserEmail( $welcome_email, $user_id, $password, $meta ){
        
        global $wp_roles;

        $user = get_userdata( $user_id );

        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Seu acesso ao Portal ASN foi liberado e você já foi incluído na equipe. Você é agora um dos editores de conteúdo da nossa agência, podendo contribuir cada vez mais para a divulgação de notícias do universo das micro e pequenas empresas brasileiras!'. plenamata_mail_br( 32 ) .'
        Estes são seus dados de acesso:'. plenamata_mail_br( 8 ) .'
        Nome de usuário: <strong>'. $user->data->user_login . '</strong><br>
        Senha: <strong>'. $password .'</strong>
        Clique <a href="'. network_site_url( 'wp-admin/profile.php' ) .'" target="_blank" rel="noreferrer" title="Acessar meu perfil"><font color="#3866E5" style="color:#3866E5;">aqui</font></a> para acessar seu perfil e atualizar suas informações.'. plenamata_mail_br( 56 ) .'
        Até logo,'. plenamata_mail_br( 8 ) . '
        Time ASN' . plenamata_mail_br( 32 );
    
    }
    public static function welcomeUserSubject( $subject ){
        return 'Agência Sebrae de Notícias - Acesso confirmado';
    }

    public function recoverSubject( $subject, $user_login, $user_data ){
        return 'Agência Sebrae de Notícias - Esqueci minha senha';
    }

    public function recoverTitle( $title ){
        return 'Agência Sebrae de Notícias - Esqueci minha senha';
    }

    public static function recoverPassEmail( $message, $key, $user_login, $user_data ){

        // URL
        if( empty( $user_login ) ):
            $user_login = _post( 'user_login' );
        endif;
        $url = network_site_url( 'wp-login.php?action=rp&key='. $key .'&login=' . rawurlencode( $user_login ), 'login' );
       
        // Text
        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Esqueceu sua senha de acesso ao Portal ASN?'. plenamata_mail_br( 21 ) .'
        Redefina sua senha <a href="'. $url .'" target="_blank" rel="noreferrer" title="Redefinir senha"><font color="#3866E5" style="color:#3866E5;">aqui</font></a> e continue contribuindo para a construção de um jornalismo digital de qualidade!';

        // Get template
        return plenamata_mail_template( 'Esqueci minha senha', $text );

    }

    public static function newPasswordMessage( $message, $user ){

        // Text
        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Sua senha de acesso à Agência Sebrae de Notícias foi <strong>redefinida com sucesso</strong>!' . plenamata_mail_br( 21 ) . '
        Clique <a href="'. network_site_url( 'wp-login.php' ) .'" target="_blank" rel="noreferrer" title="Fazer login"><font color="#3866E5" style="color:#3866E5;">aqui</font></a> aqui para fazer login com a nova senha.';

        // Get template
        return plenamata_mail_template( 'Senha redefinida!', $text );

    }

    public static function newUserNotificationEmail( $data, $user, $blogname ){

        $data[ 'subject' ] = 'Prêmio Sebrae de Jornalismo - Detalhes de acesso';

        // URL
        $key = get_password_reset_key( $user );
		$url = network_site_url( 'wp-login.php?action=rp&key=' . $key . '&login=' . rawurlencode( $user->user_login ), 'login' );

        // Text
        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Seu acesso ao Portal ASN foi liberado e você já foi incluído na equipe. Você é agora um dos colaboradores da nossa agência, podendo contribuir cada vez mais para a divulgação de notícias do universo das micro e pequenas empresas brasileiras!' . plenamata_mail_br( 32 ) . 
        'Clique <a href="' . $url .'" title="Acessar meu perfil" rel="noreferrer" target="_blank">aqui</a> para acessar seu perfil e atualizar suas informações.';

        // Get template
        $data[ 'message' ] = plenamata_mail_template( 'Seja bem-vindo!', $text );

        return $data;
        
    }

    public static function invitedUserEmail( $new_user_email, $user_id, $role, $newuser_key ){

        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Seu acesso ao Portal ASN foi liberado e você já foi incluído na equipe. Você é agora um dos editores de conteúdo da nossa agência, podendo contribuir cada vez mais para a divulgação de notícias do universo das micro e pequenas empresas brasileiras!'. plenamata_mail_br( 32 ) .'
        Clique <a href="'. network_site_url( 'wp-admin/profile.php' ) .'" target="_blank" rel="noreferrer" title="Acessar meu perfil"><font color="#3866E5" style="color:#3866E5;">aqui</font></a> para acessar seu perfil e atualizar suas informações.'. plenamata_mail_br( 56 );

        /*
        You\'ve been invited to join \'%1$s\' at
        %2$s with the role of %3$s.

        Please click the following link to confirm the invite:
        %4$s'
        */

        
    }

    public static function setContentType(){
        return "text/html";
    }

    public static function changePassMail( $pass_change_email, $user, $userdata ){

        $text = 'Olá, tudo bem?'. plenamata_mail_br( 21 ) .'
        Este aviso confirma que a sua senha foi alterada em Nacional.'. plenamata_mail_br( 8 ) .'
        Caso você não tenha alterado sua senha, contate a equipe de suporte da Agência Sebrae de Notícias.';

        // Get template
        $pass_change_email[ 'message' ] = plenamata_mail_template( 'Alteração de senha', $text );

        return $pass_change_email;
        
    }

    public static function fromName( $from_name ){
        return 'Agência Sebrae de Notícias';
    }

}

// Testing
//add_action( 'init', [ 'Users', 'init' ] );

// Email content type
add_filter( 'wp_mail_content_type', [ 'Users', 'setContentType' ] );
        
// Recover password email
add_filter( 'retrieve_password_message', [ 'Users', 'recoverPassEmail' ], 10, 4 );
add_filter( 'retrieve_password_subject', [ 'Users', 'recoverSubject' ], 10, 3 );
add_filter( 'retrieve_password_title', [ 'Users', 'recoverTitle' ], 10, 3 );

// Passwords emails
add_filter( 'create_password_message', [ 'Users', 'newPasswordMessage' ], 10, 2 );
add_filter( "password_change_email", [ 'Users', 'changePassMail' ], 10, 3 );

add_filter( 'invited_user_email', [ 'Users', 'invitedUserEmail' ], 10, 4 );
add_filter( 'wp_new_user_notification_email', [ 'Users', 'newUserNotificationEmail' ], 10, 3 );
add_filter( 'wp_mail_from_name', [ 'Users', 'fromName' ] );
add_filter( 'wpmu_signup_user_notification_email', [ 'Users', 'signupEmail' ], 999, 5 );
add_filter( 'wpmu_signup_user_notification_subject', [ 'Users', 'signupSubject' ], 10, 4 );
add_filter( 'wpmu_activation_email_content', [ 'Users', 'activationEmail' ] );
add_filter( 'update_welcome_user_email', [ 'Users', 'welcomeUserEmail' ], 10, 4 );
add_filter( 'update_welcome_user_subject', [ 'Users', 'welcomeUserSubject' ] );
add_filter( 'update_welcome_email', [ 'Users', 'welcomeEmail' ], 10, 6 );
add_filter( 'update_welcome_subject', [ 'Users', 'welcomeSubject' ] );