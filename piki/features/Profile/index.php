<?php
class PKPerfil {

    static $pages = [
        'signup', 
        'edit-profile',
        'login', 
        'logout', 
        'confirm', 
        'confirme-seu-cadastro', 
        'forgot-password', 
        'reset-password', 
        'perfil',
    ];

    static $actualPage;

    // Construct
    public function __construct(){

        // User register and authenticate
        add_action( 'user_register', [ $this, 'userRegister' ] );
        add_filter( 'authenticate', [ $this, 'checkActiveUser' ], 100, 2 );

        // Início
        add_action( 'init', [ $this, 'init' ] );
        add_action( 'after_setup_theme', [ $this, 'custom_login' ] );

        // Pre get posts
        add_action( 'pre_get_posts', [ $this, 'preGetPosts' ] );

        // Campos de configurações do formuláro
        //add_filter( 'pkmeta_register_fields', [ $this, 'formFields' ] );

        // Opções de perfil nas configurações dos forms
        add_filter( 'pikiform_settings_write', [ $this, 'formWriteSettings' ], 10, 2 );

        // Modifica a URL para registro do usuário
        add_filter( 'register_url', [ $this, 'registerURL' ] );

        // Permite acentos nos nomes de usuário
        add_filter( 'sanitize_user', [ $this, 'sanitizeUser' ], 10, 3 );

        // Altera dados dos formulários
        add_filter( 'pikiform_valida', [ $this, 'formValida' ], 10, 3 );

        //add_filter( 'pikiform_post_meta', array( 'PKPerfil', 'complete_post_meta' ), 10, 2 );
        add_filter( 'pikiform_settings', [ $this, 'formSettings' ], 10, 2 );

        // Ação para cadastro do formulário
        add_action( 'pikiform_submit', [ $this, 'formSubmit' ], 10, 3 );

        // URL's
        add_filter( 'query_vars', [ $this, 'queryVars' ] );
        add_action( 'generate_rewrite_rules', [ $this, 'rewriteRules' ] );
        add_action( 'template_redirect', [ $this, 'redirectIntercept' ] );

        // Remoção do usuário
        add_action( 'delete_user', [ $this, 'deletedUser' ] );

        // Recuperar usuário via ajax
        add_action( 'wp_ajax_profile_get_user', [ $this, 'getUser' ] );
        add_action( 'wp_ajax_nopriv_profile_get_user', [ $this, 'getUser' ] );
        
    }

    public static function getRole( $form_settings = false ){
        
        // Default role
        $role = 'subscriber';
        
        // For settings specific role
        if( $form_settings && isset( $form_settings[ 'perfil' ] ) ):
            $form_role = _array_get( $form_settings[ 'perfil' ], 'role' );
            if( $form_role ):
                $role = $form_role;
            endif;
        endif;
            
        // Let others plugins change role
        if( !empty( $_role = apply_filters( 'profile_role', $role ) ) ):
            $role = $_role;
        endif;
    
        // Return    
        return $role;
    
    }

    // Initing
    public function init(){
        
        global $pagenow;

        $user = wp_get_current_user();
        $is_ajax = defined( 'DOING_AJAX' ) && DOING_AJAX;
        $role = PKPerfil::getRole();

        // Bloqueia o admin para os membros
        if ( 
            is_admin() 
            &&
            (
                in_array( $role, $user->roles )
                ||
                in_array( 'contributor', $user->roles )
            ) 
            && 
            $pagenow != 'admin-ajax.php'
        ):

            if( in_array( 'contributor', $user->roles ) ):
                $url = '/triagem-tecnica/listar/';
            else:
                $url = '/meus-trabalhos/';
            endif;
            
            wp_redirect( get_site_url( null, $url ) );
            exit();
        
        endif;
        
        // Esconde a barra de administração do front end
        show_admin_bar( false );
    
    }

    // Hook to change page title
    public function preGetPosts( &$query ){
        if( $this->isProfilePage() ):
            add_filter( 'wp_title', [ $this, 'pageTitle' ], 10, 2 );
            add_filter( 'body_class', [ $this, 'bodyClass' ], 10, 2 );
        endif;
    }

    // HTML Title tag
    public function pageTitle( $title ){

        $_title = '';

        switch( $this->actualPage ):

            case 'login':
                $_title = 'Login';
            break;
            case 'confirm':
            case 'confirme-seu-cadastro':
                $_title = 'Confirmação de cadastro';
            break;
            case 'edit-profile':
            case 'alterar-cadastro':
                $_title = 'Alterar cadastro';
            break;
            case 'forgot-password':
                $_title = 'Esqueci minha senha';
            break;
            case 'reset-password':
                $_title = 'Recuperar senha';
            break;
            case 'perfil':
                $_title = 'Meu cadastro';
            break;
            case 'signup':
            default:
                $_title = 'Cadastro';
            break;
        
        endswitch;

        if( !empty( $_title ) ):
             $title = $_title . ' | ' . get_bloginfo( 'name' );
        endif;

        return $title;
        
    }

    public function getActualPage(){

        global $wp_query;

        if( is_null( $this->actualPage ) ):

            foreach( PKPerfil::$pages as $slug ):
                if( !empty( $wp_query->get( $slug ) ) ):
                    $this->actualPage = $slug;
                endif;
            endforeach;

            if( is_null( $this->actualPage ) ):
                $this->actualPage = false;
            endif;

        endif;

        return $this->actualPage;

    }

    // Verify if is Profile page
    public function isProfilePage(){
        return !empty( $this->getActualPage() );
    }
    
    // Create rewrite rules
    public function rewriteRules() {

        global $wp_rewrite;

        $new_rules[ 'cadastro' ] = 'index.php?signup=true';
        $new_rules[ 'signup' ] = 'index.php?signup=true';
        $new_rules[ 'sair' ] = 'index.php?logout=true';
        $new_rules[ 'logout' ] = 'index.php?logout=true';
        $new_rules[ 'login' ] = 'index.php?login=true';
        $new_rules[ 'entrar' ] = 'index.php?login=true';
        $new_rules[ 'edit-profile' ] = 'index.php?edit-profile=true';
        $new_rules[ 'alterar-cadastro' ] = 'index.php?edit-profile=true';
        $new_rules[ 'esqueci-minha-senha' ] = 'index.php?forgot-password=true';
        $new_rules[ 'cadastrar-nova-senha' ] = 'index.php?reset-password=true';
        $new_rules[ 'confirme-seu-cadastro' ] = 'index.php?confirme-seu-cadastro=true';
        $new_rules[ 'confirmar-email/([^/]+)/([^/]+)' ] = 'index.php?confirm=true&id=$matches[1]&code=$matches[2]';
        $new_rules[ 'email-nao-confirmado' ] = 'index.php?confirm=false';
        $new_rules[ 'perfil/([^/]+)/([^/]+)' ] = 'index.php?perfil=true&usuario=$matches[1]&action=$matches[2]';
        $new_rules[ 'perfil/([^/]+)' ] = 'index.php?perfil=true&usuario=$matches[1]';
        $new_rules[ 'perfil' ] = 'index.php?perfil=true';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    
    }

    // Adiciona variaveis de busca
    public function queryVars( $qvars ) {
        $qvars[] = 'cadastro';
        $qvars[] = 'perfil';
        $qvars[] = 'usuario';
        $qvars[] = 'action';
        $qvars[] = 'sair';
        $qvars[] = 'logout';
        $qvars[] = 'login';
        $qvars[] = 'entrar';
        $qvars[] = 'esqueci-minha-senha';
        $qvars[] = 'cadastrar-nova-senha';
        $qvars[] = 'forgot-password';
        $qvars[] = 'reset-password';
        $qvars[] = 'edit-profile';
        $qvars[] = 'alterar-cadastro';
        $qvars[] = 'confirme-seu-cadastro';
        $qvars[] = 'confirmar-email';
        $qvars[] = 'email-nao-confirmado';
        $qvars[] = 'confirm';
        $qvars[] = 'signup';
        $qvars[] = 'id';
        $qvars[] = 'code';
        return $qvars;
    }

    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public function redirectIntercept(){
       
        global $wp_query;

        // Page of the signin routine
        foreach( PKPerfil::$pages as $slug ):
            if( !empty( $wp_query->get( $slug ) ) ):
                $wp_query->is_home = false;
            endif;
        endforeach;

        // Página de cadastro
        if( $wp_query->get( 'signup' ) == 'true' ):

            // Redireciona
            if( is_user_logged_in() ):
                wp_redirect( get_site_url( null, '/alterar-cadastro/' ) ); 
                exit;
            endif;

            Piki::search_template( 'perfil', 'cadastro', dirname( __FILE__ ) );

        // Página de edição do cadastro
        elseif( $wp_query->get( 'edit-profile' ) == 'true' ):

            // Redireciona
            if( !is_user_logged_in() ):
                wp_redirect( get_site_url( null, '/cadastro/' ) ); 
                exit;
            endif;

            Piki::search_template( 'perfil', 'alterar-cadastro', dirname( __FILE__ ) );
       
        // Login
        elseif( $wp_query->get( 'confirm' ) == 'true' ):
            
            // Confirm email code
            $confirm = PKPerfil::confirmEmailCode( $wp_query->get( 'id' ), $wp_query->get( 'code' ) );
            if( $confirm ):
                Piki::search_template( 'perfil', 'confirma-email', dirname( __FILE__ ) );
            else:
                Piki::search_template( 'perfil', 'codigo-invalido', dirname( __FILE__ ) );
            endif;
       
        // Login não confirmado
        elseif( $wp_query->get( 'confirme-seu-cadastro' ) == 'true' ):
            
            Piki::search_template( 'perfil', 'confirme-seu-cadastro', dirname( __FILE__ ) );
       
        // Login não confirmado
        elseif( $wp_query->get( 'confirm' ) == 'false' ):
            
            Piki::search_template( 'perfil', 'email-nao-confirmado', dirname( __FILE__ ) );
       
        // Login
        elseif( $wp_query->get( 'login' ) == 'true' ):
            
            Piki::search_template( 'perfil', 'login', dirname( __FILE__ ) );
        
        // Esqueci minha senha
        elseif( $wp_query->get( 'forgot-password' ) == 'true' ):

            Piki::search_template( 'perfil', 'esqueci-minha-senha', dirname( __FILE__ ) );
        
        // Cadastrar senha
        elseif( $wp_query->get( 'reset-password' ) == 'true' ):
            
            if( PKPerfil::checkResetpassPars() ):
                Piki::search_template( 'perfil', 'cadastrar-senha', dirname( __FILE__ ) );
            endif;
        
        // Logout
        elseif( $wp_query->get( 'logout' ) == 'true' ):

            // URL de redirecionamento após o logout
            $redirect = self::get_redirect( 'logout' );
            
            // Faz o logout
            wp_logout();
            
            // Redireciona
            wp_redirect( $redirect ); 
            exit;
        
        // Página de perfil do usuário
        elseif( $wp_query->get( 'perfil' ) == 'true' ):
            
            // Outras ações do perfil
            self::page_perfil( $wp_query->get( 'usuario' ), $wp_query->get( 'action' ) );
       
       endif;
    
    }

    // Configurações dos forms
    public function formWriteSettings( $settings, $post_id ){
        
        // Status do plugin no formulário
        $status = get_post_meta( $post_id, 'perfil_status', true );
        
        // Se não está ativo
        if( $status !== 'on' && $status !== true ):
            $settings[ 'perfil' ] = false;
            return $settings;
        endif;
        
        $settings[ 'data_type' ] = 'user';
        $settings[ 'perfil' ] = array(
            'roles' => get_post_meta( $post_id, 'perfil_roles', true ),
            'redirect_signin' => get_post_meta( $post_id, 'perfil_redirect_signin', true ),
            'redirect_login' => get_post_meta( $post_id, 'perfil_redirect_login', true ),
        );
        
        return $settings;
    
    }

    // Adicionando classes na tag body
    public function bodyClass( $classes, $class ) {
        
        global $wp_query;

        if( $this->isProfilePage() ):
            
            $classes[] = 'profile-flow';

            $haves = array_intersect( PKPerfil::$pages, array_keys( $wp_query->query ) );
            if( !empty( $haves ) ):
                $classes[] = implode( ' ', $haves );
            endif;

        endif;
        
        return $classes;
    
    }

    // Campo de redirecionamento enviado
    public static function get_redirect( $field_name = false ){

        $custom_redirect = _request( $field_name );

        $redirect = home_url();
        
        if( !empty( $custom_redirect ) ):
            
            if( strpos( $custom_redirect, '//' ) === 0 ):
                
                $redirect = get_site_url() . substr( $custom_redirect, 2 );
            
            elseif( strpos( $custom_redirect, '/' ) === 0 ):
                
                $redirect = get_site_url() . $custom_redirect;
           
            else:
                
                $redirect = Piki::http( $custom_redirect );
            
            endif;
        
        endif;

        $action = $field_name == 'logout' ? 'logout' : 'login' ;
        $redirect = apply_filters( 'custom_' . $action . '_redirect' , $redirect );

        return $redirect;

    }

    public static function perfil( $user = false ){
        if( !$user ){
            global $usuario;
            $user = $usuario;
        }
        return $usuario;
    }

    // User register hook
    public function userRegister( $user_id ){
        // Admin
        if( is_admin() && current_user_can( 'create_users' ) ):
            return;
        endif; 
        // Lock user
        $this->lockUser( $user_id );
    }

    // Confirm user email code
    public static function confirmEmailCode( $user_id, $code ){

        // User lock code
        $lockCodes = PKPerfil::getUserLock( $user_id );

        // User has been confirmed
        if( empty( $lockCodes ) ):

            return true;

        // Confirm code
        elseif( in_array( $code, $lockCodes ) ):

            PKPerfil::unlockUser( $user_id );
            return true;
        
        // Invalid code
        else:

            return false;
        
        endif;
    
    }

    // Get user lock
    public static function getUserLock( $user_id, $first = false ){
        return get_user_meta( $user_id, 'verify-lock', $first );
    }
    
    // Lock user
    public static function lockUser( $user_id ){
        $user = get_user_by( 'id', $user_id );
        $hash = PKPerfil::generateHash( $user->data->user_email );
        add_user_meta( $user_id, 'verify-lock', $hash );
    }

    // Unlock user
    public static function unlockUser( $user_id ){
        delete_user_meta( $user_id, 'verify-lock' );
    }

    // Generating hash
    public static function generateHash( $email ){
        $salt = wp_generate_password( 20 );
        return sha1( $salt . $email . uniqid( time(), true ) );
    }

    // Prevents users from loggin in, if they have not verified their email address
    public function checkActiveUser( $user, $username ){

        // Login não ocorreu
        if( is_wp_error( $user ) ) return $user;
        
        $lock = PKPerfil::getUserLock( $user->ID );
        
        if( !empty( $lock ) ):

            Piki::return_json(array(
                'status' => 'email_not_verified',
                'message' => '<h3>Seu cadastro ainda <br>não foi confirmado</h3><p>Siga as instruções para confirmação de seu cadastro enviadas para o seu e-mail.</p>',
                'redirect' => get_site_url() . '/email-nao-confirmado/',
            ));
       
        endif;

        return $user;

    }

    // URL do perfil do usuário
    public static function perfil_url( $source ){
        
        // Se for um ID
        if( is_numeric( $source ) ):
            $user = get_user_by( 'id', $user );
        
        // Se for um objeto de usuário
        elseif( isset( $source->data ) && $source->exists() ):
            $user = $source;
        
        // Se for um POST
        elseif( isset( $source->post_type ) ):
            $user = get_user_by( 'id', $source->post_author );
        endif;
        
        // Se o usuário não existe
        if( !$user->exists ): return false; endif;
        
        // Retorn a URl do perfil do usuário
        return bloginfo( 'url' ) . '/perfil/' . $user->data->user_nicename;
    
    }

    // Página de perfil
    public static function page_perfil( $usuario = '', $action = '' ){

        global $usuario;

        $current_user = wp_get_current_user();

        // Perfil do usuário logado
        if( $usuario == '' || ( $current_user->exists() && $usuario == $current_user->data->user_nicename ) ):
            $usuario = $current_user;
            $usuario->current = true;
        else:
            $usuario = get_user_by( 'slug', urldecode( $usuario ) );
            $usuario->current = false;
        endif;

        if( !$usuario || !is_object( $usuario ) || !$usuario->exists() ):
            return Piki::set404();
        endif;

        $form_id = get_option( 'pkperfil_fid' );

        $extras_fields = get_post_meta( $form_id, PikiField_metaid, true );
        if( $extras_fields && !empty( $extras_fields ) ):
            $extras_fields = unserialize(base64_decode( $extras_fields ));
        endif;

        PikiForms::inlcude_class( 'show' );
        $s = new show();
        $s->set_data_type( 'user' );
        $usuario->perfil = $s->get_post_meta_view( $usuario->ID, $extras_fields );
        $usuario->perfil->show_info = get_user_meta( $usuario->ID, 'publicar_informacoes', true ) != 'on' ? false : true;

        Piki::search_template( 'perfil', $action, dirname( __FILE__ ) );

    }

    // Validação do formulário
    public function formValida( $validation, $settings, $posted ){

        // Chave do formulário
        $key = _array_get( $settings, 'key' );

        // Se ainda existirem erros do form anterior
        if( $validation[ 'status' ] != 'success' || !empty( $validation[ 'errors' ] ) ):
            return $validation;
        endif;

        // Validate login
        if( $key == 'login' ):
            PKPerfil::validaLogin( $validation, $settings, $posted );
        
        // Validate forgot password
        elseif( $key == 'forgotpass' ):
            PKPerfil::validaForgot( $validation, $settings, $posted );
        
        // Validate create pass
        elseif( $key == 'resetpass' ):
            PKPerfil::validaCreatepass( $validation, $settings, $posted );        
        
        // Validate signin
        else:
            PKPerfil::validaCadastro( $validation, $settings, $posted );
        
        endif;

        return $validation;
    
    }

    public static function validaLogin( &$validation, $settings, $posted ){
 
        // Do login
        $login = PKPerfil::login( $posted );

        // Login error
        if( is_wp_error( $login ) ):

            $k_errors = array_keys( $login->errors );
            $k_erro = array_shift( $k_errors );

            // Validation results
            $new_validation = array();

            if( $k_erro == 'invalid_username' ):

                // Field email
                $field = PikiFields::extract_field( $settings[ 'fields' ], 'user_login' );
                $new_validation[] = array(
                    'field' => $field,
                    'error' => __( 'Email não cadastrado', 'piki' ),
                );

            elseif( $k_erro == 'incorrect_password' ):

                // Field email
                $field = PikiFields::extract_field( $settings[ 'fields' ], 'pwd' );
                $new_validation[] = array(
                    'field' => $field,
                    'error' => __( 'Senha inválida', 'piki' ),
                );

            endif;

            $validation[ 'errors' ] = $new_validation;

        else:

            $redirect = false;
            $redirect =  apply_filters( 'after_login_redirect', $login );

            if( $redirect ):

                Piki::success([
                    'status' => success,
                    'redirect' => $redirect,
                ]);
            
            endif;
                        
        endif;
    
    }

    public static function validaForgot( &$validation, $settings, $posted ){

        // Field
        $userfield = PikiFields::extract_field( $settings[ 'fields' ], 'user_login' );

        // Value
        $login = PikiField::get_posted_value( $userfield, $settings[ 'fields' ], $posted ); 

        // Send email
        $response = PKPerfil::reset_password( $login );
        
        if( $response !== true ):

            unset( $validation[ 'valids' ][ 'user_login' ] );

            $validation[ 'errors' ] = array(array(
                'field' => $userfield,
                'error' => str_replace( 'ERRO:', '', $response ),
            ));

        endif;

        return $validation;

    }

    private static function checkResetpassPars(){
        
        $key = _get( 'key' );
        if ( !empty( $key ) ):

            $value = sprintf( '%s:%s', wp_unslash( _get( 'login' ) ), wp_unslash( $key ) );
            setcookie( 'wp-resetpass-' . COOKIEHASH, $value, 0, '/', COOKIE_DOMAIN, is_ssl(), true );

            wp_safe_redirect( remove_query_arg( array( 'key', 'login' ) ) );
            exit;
        
        endif;

        return true;

    }

    public static function validaCreatepass( &$validation, $settings, $posted ){

        $rp_cookie = 'wp-resetpass-' . COOKIEHASH;
        $password = _array_get( $posted, 'user_pass' );
        $postedkey = _array_get( $posted, 'rp_key' );


        if ( isset( $_COOKIE[ $rp_cookie ] ) && strpos( $_COOKIE[ $rp_cookie ], ':' ) > 0 ):

            list( $rp_login, $rp_key ) = explode( ':', wp_unslash( $_COOKIE[ $rp_cookie ] ), 2 );

            $user = check_password_reset_key( $rp_key, $rp_login );

            if ( $password && !hash_equals( $rp_key, $postedkey ) ):
            
                $user = false;
            
            endif;

        else:
        
            $user = false;
        
        endif;

        if ( !$user || is_wp_error( $user ) ):
            
            setcookie( $rp_cookie, ' ', time() - YEAR_IN_SECONDS, '/', COOKIE_DOMAIN, is_ssl(), true );

            if( $user && $user->get_error_code() === 'expired_key' ):
                $error = 'A chave de recuperação de senha expirou.';
            else:
                $error = 'A chave de recuperação de senha é inválida.';
            endif;

            // Field
            $field = PikiFields::extract_field( $settings[ 'fields' ], 'user_pass' );

            unset( $validation[ 'valids' ][ 'user_pass' ] );
            $validation[ 'errors' ] = array(array(
                'field' => $field,
                'error' => $error,
            ));

        else:

            // Faz a mudança da senha
            wp_set_password( $password, $user->ID );
            update_user_option( $user->ID, 'default_password_nag', false, true );  

            // Envia o email
            PKPerfil::sendNewpassMail( $user );
        
        endif;

        return $validation;

    }

    // Valida o cadastro
    public static function validaCadastro( &$validation, $settings, $posted ){

        // Apenas formulários com perfil ativado
        if( !isset( $settings[ 'perfil' ] ) || empty( $settings[ 'perfil' ] ) ):
            return true;
        endif;

        // Dados do usuário atual
        $user = (object)array(
            'data' => (object)array(
                'user_email' => false,
                'user_login' => false,
            ),
        );

        // Se o usuário está logado
        if( is_user_logged_in() ):
            $user = wp_get_current_user();
        endif;

        // Form step
        $form_step = _array_get( $posted, 'form_step' );
        $filter = $settings[ 'stepped' ] ? [ 'step' => $form_step ] : false;

        // Validation results
        $new_validation = array();

        // Form action
        $action = _array_get( $settings, 'action' );

        // Field email
        $f_email = PikiFields::extract_field( $settings[ 'fields' ], 'email', 'ftype', true, $filter );
        $email = PikiField::get_posted_value( $f_email, $settings[ 'fields' ], $posted );

        if( 
            email_exists( $email ) 
            && 
            ( 
                !is_user_logged_in()
                || 
                ( 
                    $email != $user->data->user_email 
                ) 
            ) 
        ):
        
            if( isset( $f_email[ 'messages' ][ 'unique' ] ) ):
                $message = $f_email[ 'messages' ][ 'unique' ];
            else:
                $message = 'Email já registrado';
            endif;

            $new_validation[] = array(
                'field' => $f_email,
                'error' => $message,
            );
        
        endif;

        // Login
        $f_username = PikiFields::extract_field( $settings[ 'fields' ], 'user_username', true, $filter );
        if ( $f_username && !is_user_logged_in() ):

            $username = PikiField::get_posted_value( $f_username, $settings[ 'fields' ], $posted );                            
            if( username_exists( $username ) ):
        
                $new_validation[] = array(
                    'field' => $f_username,
                    'error' => 'O nome de usuário já existe',
                );            
        
            endif;
        
        endif;

        // Se não há nenhum erro, retorna true
        if( empty( $new_validation ) ):
            return true;
        endif;

        // Return errors
        $validation[ 'errors' ] = $new_validation;

        return $validation;

    }

    // Login customizado
    public static function custom_login(){

        $action = _post( 'perfil-action' );
        if( $action && $action == 'login' && !is_user_logged_in() ):
            
            $login = self::login();
            
            if( !is_wp_error( $login ) ):
            
                $to_redirect = self::get_redirect( 'redirect' );

                if( Piki::ajax() ):
                    echo json_encode(array(
                        'status' => 'success',
                        'redirect' => $to_redirect,
                    ));
                else:
                    wp_redirect( $to_redirect );
                endif;
            
                die();
            
            endif;
        
        endif;
    
    }

    // Reset de password
    public static function reset_password( $login ){

        // Trim
        $login = trim( $login );
        
        // Is email
        $isEmail = strpos( $login, '@' );
        if( $isEmail ):
            $login = trim( wp_unslash( $login ) );
        endif;

        // User data
        $user_data = get_user_by( $isEmail ? 'email' : 'login', $login );
        
        // User not exists
        if( !$user_data ):
            return 'Usuário não cadastrado.';
        endif;

        // Redefining user_login ensures we return the right case in the email.
        $user_login = $user_data->user_login;
        $user_email = $user_data->user_email;
        $key = get_password_reset_key( $user_data );
        
        // Aplly filters to message
        $message = apply_filters( 'retrieve_password_message', '', $key, $user_login, $user_data );
        if( empty( $message ) ):

            // Template
            $message = __( 'Someone has requested a password reset for the following account:' ) . "\r\n\r\n";
            $message .= sprintf( __( 'Site Name: %s'), get_bloginfo( 'name' ) ) . "\r\n\r\n";
            $message .= sprintf( __( 'Username: %s'), $user_login ) . "\r\n\r\n";
            $message .= __( 'If this was a mistake, just ignore this email and nothing will happen.' ) . "\r\n\r\n";
            $message .= __( 'To reset your password, visit the following address:' ) . "\r\n\r\n";
            //$message .= sprintf( '<a href="%s">Redefinir senha</a>', network_site_url( 'wp-login.php?action=rp&key=' . $key . '&login=' . rawurlencode( $user_login ), 'login' ) );
            $message .= sprintf( '<a href="%s">Redefinir senha</a>', get_site_url( null, '/cadastrar-nova-senha/?key=' . $key . '&login=' . rawurlencode( $user_login ), 'login' ) );

        endif;

        // Subject
        $subject = '';
        if( empty( $subject = apply_filters( 'retrieve_password_subject', $subject, $user_login, $user_data ) ) ):
            $subject = 'Esqueci minha senha';
        endif;

        // Send email
        Piki::mail( $user_email, $subject, $message );

        return true;

    }

    // Username postado
    public static function get_posted_username( $posted ){
        return _array_get( $posted, 'user_login' );
    }

    // Grava a sessão com o erro
    public static function login_set_error( $type ){
    
        @session_start();
        $_SESSION[ 'perfil-login' ] = $type;
    
        // Se for ajax, retorna o Json
        if( Piki::ajax() ):
            exit(json_encode(array(
                'status' => 'error',
                'type' => $type,
                'error_message' => self::get_error_message( $type ),
            )));
        endif;
    
        return new WP_Error( $type, __( self::get_error_message( $type ) ) );
    
    }

    // Seta o tipo de data do formulário
    // Se logado, informa o ID do usuário ao form
    public function formSettings( $settings ){

        $key = _array_get( $settings, 'key' );
        $profile = _array_get( $settings, 'perfil' );
        
        if( !empty( $profile ) ):

            $settings[ 'data_type' ] = 'user';
            
            if( is_user_logged_in() ):
                $settings[ 'item' ] = get_current_user_id();
            endif;
        
        endif;
    
        return $settings;
    
    }

    // Extrai os campos extras
    public static function extract_meta_fields( $fields ){

        $fields = PikiFields::remove_fields( $fields, array( 'user_email', 'user_pass', 'user_login' ), 'machine_name' );
        
        unset( $fields[ 'user_email' ] );
        
        if( isset( $fields[ 'user_pass' ] ) ):
            unset( $fields[ 'user_pass' ], $fields[ 'user_pass_confirm' ] );
        endif;
        
        if( isset( $fields[ 'user_login' ] ) ):
            unset( $fields[ 'user_login' ] );
        endif;
        
        return $fields;
    
    }

    // Realiza o login o login
    public static function login( $posted = false ){

        // Data
        if( !$posted ):
            $posted = $_POST;
        endif;
        
        // Nome de usuário
        $username = self::get_posted_username( $posted );

        // Senha
        $password = _array_get( $posted, 'pwd' );
        
        if( !$username ):
            return self::login_set_error( 'empty_username' );
        elseif( !$password ):
            return self::login_set_error( 'empty_password' );
        endif;

        $creds = array(
            'user_login' => $username,
            'user_password' => $password,
            'remember' => on( $posted, 'remember' ),
        );     
        
        return wp_signon( $creds, false );
        
    }

    // Salva os dados postados
    public function formSubmit( $settings, $posted ){
        
        $profile_settings = _array_get( $settings, 'perfil' );

        if( !empty( $profile_settings ) ):
            $this->submitUserForm( $settings, $posted );
        endif;
    
    }

    public static function sendNewpassMail( $user ){

        // Aplly filters to message
        $message = apply_filters( 'create_password_message', '', $user );
        if( empty( $message ) ):
            // Template
            $message = 'A sua senha de cadastro para '. get_bloginfo( 'name' ) .' foi redefinida com sucesso.' . "\r\n\r\n";
            $message .= '<a href="'. get_site_url( null, '/login/' ) .'" title="Fazer login">Clique aqui</a> para fazer o login com a nova senha.' . "\r\n\r\n";
        endif;

        // Subject
        $subject = apply_filters( 'create_password_subject', 'Senha redefinida', $user );
        if( empty( $subject ) ):
            $subject = ' Senha redefinida';
        endif;        

        // Send email
        Piki::mail( $user->data->user_email, $subject, $message );

        return true;

    }

    public function submitUserForm( $settings, $posted ){

        // Dados postados
        $userinfo = PKPerfil::get_posted_user_info( $settings, $posted );

        // Usuário existente
        if( is_user_logged_in() ):

            // Action
            $action = 'edit';
                        
            // ID do usuário
            $user_id = get_current_user_id();
                        
            // Valores atualizados
            $to_update = array();
            
            // Email
            if( !empty( $userinfo[ 'user_email' ] ) ):
                $to_update[ 'user_email' ] = $userinfo[ 'user_email' ];
            endif;
            
            // Nome
            $to_update[ 'first_name' ] = $userinfo[ 'first_name' ];
            $to_update[ 'display_name' ] = $userinfo[ 'display_name' ];
            $to_update[ 'last_name' ] = _array_get( $userinfo, 'last_name' );
           
            // Senha a ser modificada
            $user_pass = PKPerfil::check_update_pass( $userinfo );
            if( $user_pass ):
                $to_update[ 'user_pass' ] = $user_pass;
            endif;
            
            // Se há algo a ser mudado
            if( !empty( $to_update ) ):
                
                // ID do usuário
                $to_update[ 'ID' ] = $user_id;
                
                // Faz a atualização do usuário
                wp_update_user( $to_update );
            
            endif;

        // Novo usuário
        else:

            // Action
            $action = 'insert';

            // Senha enviada pelo usuário
            $user_pass = $userinfo[ 'user_pass' ];

            // Senha enviada pelo usuário
            $user_login = $userinfo[ 'user_login' ];
            
            // Nome amigável
            $user_nicename = $userinfo[ 'user_nicename' ];
            
            // Email do usuário
            $user_email = $userinfo[ 'user_email' ];

            // Papel de usuário atribuído
            $role = PKPerfil::getRole( $settings );

            // Array info
            $user_info = [
                 'user_login' => PKPerfil::generateUsername( $userinfo[ 'user_login' ] ),
                'user_email' => $userinfo[ 'user_email' ],
                'user_pass' => $userinfo[ 'user_pass' ],
                'display_name' => $userinfo[ 'display_name' ],
                'first_name' => $userinfo[ 'first_name' ],
                'last_name' => $userinfo[ 'last_name' ],
                'user_nicename' => $userinfo[ 'user_nicename' ],
                'user_registered' => date( "Y-m-d H:i:s" ),
                'role' => $role,
           ];

            // Cria o usuário com os campos obrigatórios
            $user_id = wp_insert_user( $user_info );

            // Lock user
            PKPerfil::lockUser( $user_id );

            // Notifição do cadastro
            PKPerfil::newUserNotification( $user_id, $user_pass );

            // Logando o usuário
            //$creds = array(
            //    'user_login' => $user_login,
            //    'user_password' => $user_pass,
            //    'remember' => true,
            //);
            //wp_signon( $creds, false );

        endif;
        
        // Salvando meta dados do usuário
        PikiFields::remove_fields( $settings[ 'fields' ], array( 'user_email', 'user_pass', 'user_pass_confirm', 'user_login', 'first_name' , 'last_name' ), 'machine_name' );

        // Set data type
        $settings[ 'data_type' ] = 'user';
        
        // Remove os valores antigos
        if( $action == 'edit' ):
            PKMeta::delete_post_meta( $user_id, $settings, 'user' );
        endif;

        // Save post meta
        $saved = PKMeta::save_post_meta(
            $user_id,   // Entity ID
            $settings,  // Fields
            $posted,    // Posted data
            $action     // Action
        );

    }

    public static function generateUsername( $username ) {

        $username = sanitize_title( $username );

        static $i;

        if( null === $i ):
            $i = 1;
        else:
            $i ++;
        endif;

        if ( !username_exists( $username ) ):
            return $username;
        endif;
        
        $new_username = sprintf( '%s-%s', $username, $i );
        
        if ( !username_exists( $new_username ) ):
            return $new_username;
        else:
            return call_user_func( array( 'PKPerfil', 'generateUsername' ), $username );
        endif;
    
    }

    // Dados postados pelo usuário
    public static function get_posted_user_info( $settings, $posted ){

        $return = array();

        // First name
        $filed_fname = PikiFields::extract_field( $settings[ 'fields' ], 'first_name' );
        
        // First and last name
        if( $filed_fname ):

            // First name
            $fname = PikiField::get_posted_value( $filed_fname, $settings[ 'fields' ], $posted );
            $return[ 'first_name' ] = $fname;
           
            // First name
            $flast_name = PikiFields::extract_field( $settings[ 'fields' ], 'last_name' );
            // Last name
            if( $flast_name ):
                $lname = PikiField::get_posted_value( $flast_name, $settings[ 'fields' ], $posted );
            else:
                $lname = false;
            endif;
            $return[ 'last_name' ] = $flast_name;

            // Display name
            $return[ 'display_name' ] = $fname;
            if( $lname ):
                $peaces_lname = explode( ' ', $lname );
                $return[ 'last_name' ] = $lname;
                $return[ 'display_name' ] .= ' ' . end( $peaces_lname );
            endif;

            // Complete name
            $return[ 'complete_name' ] = $fname . ( $lname ? ' ' . $lname : '' );

        // Complete name
        else:

            // Nome completo
            $fdisplay_field = PikiFields::extract_field( $settings[ 'fields' ], 'display_name' );
            $complete_name = PikiField::get_posted_value( $fdisplay_field, $settings[ 'fields' ], $posted );
            
            // Nome explodido
            $peaces_nome = explode( ' ', $complete_name );
            
            // Primeiro nome
            $return[ 'first_name' ] = reset( $peaces_nome );
            
            // Primeiro nome
            $return[ 'last_name' ] = end( $peaces_nome );
            
            // Display nome
            $return[ 'display_name' ] = reset( $peaces_nome ) . ( count( $peaces_nome ) > 1 ? ' ' . end( $peaces_nome ) : '' );

            // Complete name
            $return[ 'complete_name' ] = $complete_name;

        endif;
        
        // Nome de usuário
        $f_username = PikiFields::extract_field( $settings[ 'fields' ], 'user_username' );
        if( $f_username ):

            $return[ 'user_login' ] = PikiField::get_posted_value( $f_username, $settings[ 'fields' ], $posted );
            $return[ 'user_login' ] = sanitize_user( $return[ 'user_login' ], true );
        
        else:
            
            $return[ 'user_login' ] = sanitize_user( $return[ 'complete_name' ], true );
            $return[ 'user_login' ] = apply_filters( 'pre_user_login', $return[ 'user_login' ] );
            $return[ 'user_login' ] = trim( $return[ 'user_login' ] );
        
        endif;
        
        // Nicename
        $return[ 'user_nicename' ] = sanitize_title( $return[ 'display_name' ] );
        $return[ 'user_nicename' ] = apply_filters( 'pre_user_nicename', $return[ 'user_nicename' ] );
        
        // Senha enviada pelo usuário
        $f_pass = PikiFields::extract_field( $settings[ 'fields' ], 'user_pass' );
        $return[ 'user_pass' ] = PikiField::get_posted_value( $f_pass, $settings[ 'fields' ], $posted );
        
        // Senha enviada pelo usuário
        $f_pass_conf = PikiFields::extract_field( $settings[ 'fields' ], 'user_pass_confirm' );
        $return[ 'user_pass_confirm' ] = PikiField::get_posted_value( $f_pass_conf, $settings[ 'fields' ], $posted );
        
        // Email
        $f_email = PikiFields::extract_field( $settings[ 'fields' ], 'user_email' );
        $return[ 'user_email' ] = PikiField::get_posted_value( $f_email, $settings[ 'fields' ], $posted );

        return $return;

    }

    // Verifica se o usuário postou uma nova senha
    public static function check_update_pass( $data ){
        
        $senha = _array_get( $data, 'user_pass', false );
        $confirm = isset( $data[ 'user_pass_confirm' ] ) && $data[ 'user_pass_confirm' ] != '' ? $data[ 'user_pass_confirm' ] : false;
        
        if( !$senha || !$confirm || $confirm !=  $senha ):
            return false;
        else:
            return $senha;
        endif;
    
    }

    // Avatar do usuário
    public static function get_avatar( $user ){
        $user_id = is_object( $user ) ? $user->ID : $user;
        $meta = get_user_meta( $user_id, 'avatar', true );
        if( is_array( $meta ) ):
            $meta = array_shift( $meta );
        endif;
        $a = new avatar();
        return $a->get_item_url( $meta );
    }

    // Scripts e Estilos
    public static function add_files(){
        // Libraries
        Piki::add_library( 'jquery-ui' );
        // Scripts
        $filesdir = Piki::url( '/' , __FILE__ );
        wp_enqueue_script( 'jquery-form' );
        wp_enqueue_script( 'PikiPerfil-scripts', $filesdir . 'scripts.js', array( 'jquery' ) );
        // Styles
        wp_enqueue_style( 'PikiPerfil-styles', $filesdir . 'styles.css' );
    }

    // Total de posts do usuário
    public static function count_user_posts( $userid, $post_type = 'post' ) {
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $wpdb->posts WHERE post_author = %d AND post_type = %s AND post_status IN ( 'draft', 'pending', 'publish', 'private' )", array( $userid, $post_type ) ));
    }

    // Total de comentários do usuário
    public static function count_user_comments( $userid ) {
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $wpdb->comments WHERE user_id = %d", array( $userid )));
    }

    // Permite acentuação UTF-8 nos logins
    public function sanitizeUser( $raw_username, $username, $strict ){
        $raw_username = $username;
        $username = strip_tags( $username );
        $username = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '', $username);
        $username = preg_replace('/&.+?;/', '', $username); // Kill entities
        if ( $strict ):
            $username = mb_ereg_replace('|[^a-z0-9 _.-@]|i', '', $username);
        endif;
        return apply_filters('sanitize_user_mbstring', $username, $raw_username, $strict);
    }

    // Altera a URL de registro
    public static function registerURL( $url ){
        return home_url() . '/cadastro/';
    }

    // CAMPOS DO FORM DE FORMS
    public function formFields( $metaboxes ){
        
        $metaboxes[] = array(
            'id'         => 'pikiform_perfil',
            'title'      => 'Perfil de usuário',
            'post_types' => array( PikiForms_ptype ),
            'context'    => 'advanced',
            'priority'   => 'low',
            'show_names' => true,
            'fields'     => array(
                'perfil_status' => array(
                    'machine_name' => 'perfil_status',
                    'ftype' => 'boolean',
                    'label' => 'Ativar perfil?',
                    'label_option' => 'Sim',
                ),
                'perfil_roles' => array(
                    'machine_name' => 'perfil_roles',
                    'ftype' => 'roles',
                    'multiple' => false,
                    'label' => 'Papel atribuido'
                ),
                'perfil_redirect_signin' => array(
                    'machine_name' => 'perfil_redirect_signin',
                    'ftype' => 'text',
                    'label' => 'URL de destino no cadastro'
                ),
                'perfil_redirect_login' => array(
                    'machine_name' => 'perfil_redirect_login',
                    'ftype' => 'text',
                    'label' => 'URL de destino no login'
                ),
                'perfil_requireds_text' => array(
                    'machine_name' => 'perfil_requireds_text',
                    'ftype' => 'boxtext',
                    'label' => 'Instruções:',
                    'content' => '<strong>Para usar o formulário como perfil, você precisa ter os seguintes campos no formulário:</strong><br />
                    nickname (text): Nome completo do usuário<br />
                    user_login (username): Login do usuário,<br />
                    user_email (email): Email do usuário,<br />
                    user_pass : (password): Senha de acesso do usuário.<br/>
                    <strong>São opcionais os seguintes campos:</strong><br />
                    avatar (avatar): Avatar do usuário,<br />
                    user_url (url): URL para o site do usuáro,<br />
                    terms_of_use (boolean): Checkbox de aceitação dos termos de uso
                    ',
                ),
            ),
        );
        
        return $metaboxes;

    }
    
    // LOGIN
    public static function loginForm( $options ){

        $title = _array_get( $options, 'title', __( 'Login', 'piki' ) );
        $description = _array_get( $options, 'description' );
        $redirect = _array_get( $options, 'redirect', 'reload' );
        $signup = _array_get( $options, 'signup' );
        $remember = _array_get( $options, 'remember' );
        $form_style = _array_get( $options, 'form_style', 'default' );
        ?>
        <div id="box-login" class="userflow-box">
            <header class="box-title clearfix">
                <?php if( $title != 'false' ): ?>
                <div class="login-title"><strong><?php echo $title; ?></strong></div>
                <?php endif; ?>
                <?php if( $description ): ?>
                <p class="login-description"><?php echo $description; ?></p>
                <?php endif; ?>
                <div class="reset-title" style="display:none;"><strong><?php _e( 'Recover Password', 'piki' ); ?></strong></div>
                <?php /*<div class="signup">
                    Ainda não tem acesso? <a href="<?php get_site_url(); ?>/cadastro/" class="track" title="Cadastre-se agora">Cadastre-se</a>
                </div>*/ ?>
            </header>
            <?php
            echo do_shortcode( '[pikiforms key="login" class="login" form_style="'. $form_style .'"]' );
            ?>
        
        </div>
        <?php
    }
    public static function formLoginSettings(){
        
        // Posted redirect
        $redirect = get_site_url();
        $redirect = apply_filters( 'profile_login_redirect', $redirect );
        
        // Form settings
        return [
            'key' => 'login',
            'title' => false,
            // Errors
            'error_fields' => 'inline', // inline, tooltip
            'error_general' => false, // inline, modal
            // Success insert
            'submit_button_label' => __( 'Entrar', 'piki' ),
            'success_redirect' => $redirect,
            'public' => true,
            'attributes' => [ 'data-recover-title' => 'Recuperar senha' ]
        ];        
    
    }
    public static function formLoginFields(){

        $fields = [];

        $action = _post( 'form_action' );

        // Email
        $fields[ 'user_login' ] = [
            'required' => true,
            'label' => 'E-mail',
            'label_form' => 'Digite seu e-mail',
            'ftype' => 'email',
            'machine_name' => 'user_login',
            'placeholder' => 'Digite seu email',
            'messages' => [
                'required' => 'E-mail obrigatório',
                'value' => 'E-mail inválido',
                'invalid' => 'E-mail inválido',
            ],
        ];

        // Passowrd
        $fields[ 'pwd' ] = [
            'required' => ( $action != 'reset' ),
            'label' => 'Senha',
            'label_form' => 'Digite sua senha',
            'ftype' => 'password',
            'machine_name' => 'pwd',
            'maxlength' => 8,
            'confirm' => false,
            'minlength' => false,
            'placeholder' => 'Digite sua senha',
            'messages' => [
                'required' => 'Senha obrigatória'
            ]
        ];

        // Passowrd
        $fields[ 'remember' ] = [
            'machine_name' => 'remember',
            'ftype' => 'boolean',
            'label' => 'Lembre-se de mim',
        ];

        // Lost password
        $fields[ 'actions' ] = [
            'label' => false,
            'ftype' => 'boxtext',
            'machine_name' => 'lostpass',
            'content' => '<nav class="actions">
                <a href="' . get_site_url() . '/esqueci-minha-senha/" class="btn-esqueci" title="Clique para recuperar sua senha">' . __( 'Esqueci minha senha', 'piki' ) . '</a>
            </nav>',
        ];

        return $fields;
 
    }
    
    // Esqueci minha senha
    public static function forgotForm( $options ){

        $title = _array_get( $options, 'title' );
        $description = _array_get( $options, 'description' );
        $redirect = _array_get( $options, 'redirect', false );
        $form_style = _array_get( $options, 'form_style' );
      
        ?>
        <div id="box-forgotpass" class="userflow-box">
            <?php if( $title || $description ): ?>
            <header class="box-title clearfix">
                <?php if( $title != 'false' ): ?>
                <div class="login-title"><strong><?php echo $title; ?></strong></div>
                <?php endif; ?>
                <?php if( $description ): ?>
                <p class="login-description"><?php echo $description; ?></p>
                <?php endif; ?>
            </header>
            <?php endif; ?>
            <?php
            echo do_shortcode( '[pikiforms fid="forgotpass" class="forgot-password" form_style="' . $form_style .'"]' );
            ?>
        </div>
        <?php
    }
    public static function formForgotSettings(){
        return array(
            'key' => 'forgotpass',
            'title' => false,
            // Errors
            'error_fields' => 'inline', // inline, tooltip
            'error_general' => false, // inline, modal
            // Success insert
            'success_type' => 'modal',
            'success_message' => '<h3>Redefinição de senha</h3><p>Enviamos no seu e-mail um link para a redefinição da sua senha.</p><a href="' . get_site_url() . '" class="button" title="Ir para a página inicial">Página inicial</a>',
            'public' => true
        );        
    }
    public static function formForgotFields(){
        // Email
        $fields[ 'user_login' ] = array(
            'required' => true,
            'label' => 'Digite seu email',
            'ftype' => 'email',
            'machine_name' => 'user_login',
            'messages' => array(
                'required' => 'E-mail obrigatório',
                'value' => 'E-mail inválido',
                'invalid' => 'E-mail inválido',
            ),

        );
        return $fields;
    }

    // Reset password
    public static function resetpassForm( $options = [] ){

        $title = _array_get( $options, 'title' );
        $description = _array_get( $options, 'description' );
        $form_style = _array_get( $options, 'form_style', 'default' );
        ?>
        <div id="box-resetpass" class="userflow-box">
            <?php if( $title || $description ): ?>
            <header class="box-title clearfix">
                <div class="login-title"><strong><?php echo $title; ?></strong></div>
                <?php if( $description ): ?>
                <p class="login-description"><?php echo $description; ?></p>
                <?php endif; ?>
            </header>
            <?php endif; ?>
            <?php
            echo do_shortcode( '[pikiforms fid="resetpass" class="reset-password" form_style="'. $form_style .'"]' );
            ?>
        </div>
        <?php
    
    }
    public static function formResetpassSettings(){
        return array(
            'key' => 'resetpass',
            'title' => false,
            // Errors
            'error_fields' => 'inline', // inline, tooltip
            'error_general' => false, // inline, modal
            // Success insert
            'submit_button_label' => __( 'Salvar', 'piki' ),
            'success_type' => 'modal',
            'success_message' => '<h3>Senha redefinida</h3><p>Agora você pode realizar o login com sua nova senha.</p><a href="'. get_site_url() .'/login/" title="Entrar" class="button">Entrar</a>',
            'public' => true
        );        
    }
    public static function formResetpassFields(){

        $fields[ 'user_pass' ] = array(
            'label' => 'Crie sua nova senha',
            'machine_name' => 'user_pass',
            'maxlength' => 8,
            'minlength' => 8,
            'required' => true,
            'ftype' => 'password',
            'placeholder' => 'Digite sua nova senha',
            'confirm' => [
                'label' => 'Confirme a sua nova senha',
                'placeholder' => 'Confirme a sua nova senha',
            ],
            //'label_suffix' => '<span>Alfanumérica com 8 caracteres</span>',
            'messages' => array(
                'maxlength' => 'A senha deve ter 8 caracteres',
                'minlength' => 'A senha deve ter 8 caracteres',
                'required' => 'Crie sua senha',
                'confirm' => 'As senhas não conferem',
            ),
        );

        $rp_cookie = 'wp-resetpass-' . COOKIEHASH;
        if( isset( $_COOKIE[ $rp_cookie ] ) ):

            list( $rp_login, $rp_key ) = explode( ':', wp_unslash( $_COOKIE[ $rp_cookie ] ), 2 );
            $fields[ 'rp_login' ] = array(
                'ftype' => 'hidden',
                'machine_name' => 'rp_login',
                'value' => $rp_login
            );
            $fields[ 'rp_key' ] = array(
                'ftype' => 'hidden',
                'machine_name' => 'rp_key',
                'value' => $rp_key
            );

        endif;
        
        return $fields;
    
    }

    // Authorization page
    public static function authorizePageUrl( $user ){
        return ( get_site_url() . '/confirmar-email/' . $user->ID . '/' . PKPerfil::getUserLock( $user->ID, true ) . '/?utm_source=confirmacao&utm_medium=email&utm_campaign=cadastrorealizado' );
    }

    // Notificação de novo usuário
    public static function newUserNotification( $user_id, $plaintext_pass = '' ){

        $headers = array( 'Content-Type: text/html; charset=UTF-8' );

        $user = new WP_User( $user_id );
        $user_email = stripslashes( $user->user_email );
        $user_login = stripslashes( $user->user_login );

        // Admin template
        $template  = sprintf( __( 'New user registration on your site %s:' ), get_option( 'blogname' ) ) . "\r\n\r\n";
        $template .= sprintf( __( 'Username: %s' ), $user_login ) . "\r\n\r\n";
        $template .= sprintf( __( 'E-mail: %s' ), $user_email) . "\r\n";
        
        // Send email
        //wp_mail( get_option( 'admin_email' ), sprintf(__( '[%s] New User Registration' ), get_option( 'blogname' ) ), $template, $headers );

        if ( empty( $plaintext_pass ) ):
            return;
        endif;
        
        // User template
        $template = false;
        $template = apply_filters( 'pkperfil_signup_email', $template, $user, $plaintext_pass );

        // Default template
        if( empty( $template ) ):
        
            $template = __( '<h1>Confirme seu e-mail e participe do movimento!</h1>' ) . "\r\n\r\n";
            $template .= __( 'Confirme seu e-mail para finalizar o cadastro e comece agora mesmo a registrar as suas fornecedores no site da #Sebrae. Vamos nessa!</p>' ) . "\r\n\r\n";
            $template .= __( '<a href="' . PKPerfil::authorizePageUrl( $user ) . '">Confirmar Email</button>' ) . "\r\n\r\n";
            $template .= get_site_url() . "\r\n\r\n";

        endif;

        // Send
        $subject = 'Informações para login';
        Piki::mail( $user_email, $subject, $template );
    
    }

    public function deletedUser( $user_id ){

        global $wpdb;

        // Delete user meta
        $result = $wpdb->query($wpdb->prepare(
            "DELETE FROM $wpdb->usermeta WHERE user_id = %d",
            $user_id
        ));

    }

    // Get user data by ajax
    public function getUser(){

        if( !is_user_logged_in() ) die( 'false' );

        $userdata = wp_get_current_user();

        // Not show confidential
        unset( 
            $userdata->data->user_pass, 
            $userdata->data->user_status,
            $userdata->data->user_activation_key
        );

        // Initials
        $peaces = explode( ' ', $userdata->data->display_name );
        $first = reset( $peaces );

        if( count( $peaces ) < 2 ):
            $userdata->data->initials_name = substr( $first, 0, 2 );
        else:
            $last = end( $peaces );
            $userdata->data->initials_name = substr( $first, 0, 1 ) . substr( $last, 0, 1 );
        endif;

        // Roles
        $userdata->data->role = reset( $userdata->roles );

        Piki::return_json(array(
            'status' => 'success',
            'user' => $userdata->data,
        ));
        
    }

}
$PKPerfil = new PKPerfil();

// Formulário de login
function pikiform_login_settings(){
    return PKPerfil::formLoginSettings();
}
function pikiform_login_fields(){
    return PKPerfil::formLoginFields();
}
// Formulário de perdi minha senha
function pikiform_forgotpass_settings(){
    return PKPerfil::formForgotSettings();
}
function pikiform_forgotpass_fields(){
    return PKPerfil::formForgotFields();
}
// Formulário de criação de nova senha
function pikiform_resetpass_settings(){
    return PKPerfil::formResetpassSettings();
}
function pikiform_resetpass_fields(){
    return PKPerfil::formResetpassFields();
}

// Ger profile URL
function get_perfil_url( $user = false ){
    if( !$user ):
        $nicename = get_the_author_meta( 'user_nicename' );
    elseif( is_numeric( $user ) ):
        $nicename = get_the_author_meta( 'user_nicename', $user );
    else:
        $nicename = $user->data->user_nicename;
    endif;
    return get_bloginfo( 'url' ) . '/perfil/' . $nicename . '/';
}
function the_perfil_url( $user=false ){
    echo get_perfil_url( $user );
}

//function wp_new_user_notification( $user_id, $plaintext_pass = '' ){
//    PKPerfil::newUserNotification( $user_id, $plaintext_pass );
//}

// Email de registro

    // Muda  o nome do sender
    function perfil_change_from_email_name() {
        return get_option( 'blogname' );
    }
    add_filter( 'wp_mail_from_name', 'perfil_change_from_email_name' );
    // Muda  o email do sender
    function perfil_hange_from_email() {
       return get_option( 'admin_email' );
    }
    add_filter( 'wp_mail_from', 'perfil_hange_from_email' );

// Permite o login do usuário através do email também

    function perfil_email_login_authenticate( $user, $username, $password ){

        if ( is_a( $user, 'WP_User' ) ):
            return $user;
        endif;
        
        if ( !empty( $username ) ):
            $username = str_replace( '&', '&amp;', stripslashes( $username ) );
            $user = get_user_by( 'email', $username );
            if ( isset( $user, $user->user_login, $user->user_status ) && 0 == (int) $user->user_status )
                $username = $user->user_login;
        endif;
        
        return wp_authenticate_username_password( null, $username, $password );
    
    }
    remove_filter( 'authenticate', 'wp_authenticate_username_password', 20, 3 );
    add_filter( 'authenticate', 'perfil_email_login_authenticate', 20, 3 );

// Widget do header

    class Perfil_Widget extends WP_Widget {

        public function __construct() {
            parent::__construct(
                'perfil_widget', // Base ID
                __('Perfil - Login', 'text_domain'), // Name
                array( 'description' => __( 'Box de login do usuário', 'text_domain' ), ) // Args
            );
        }
        public function widget( $args, $instance = array() ){

            
            PKPerfil::add_files();

            echo '<div id="perfil-userbox" class="clearfix">';

            if( !is_user_logged_in() ): ?>

                <?php 
                $title = isset( $instance[ 'title' ] ) && !empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : "Login";
                $redirect = isset( $instance[ 'redirect' ] ) && !empty( $instance[ 'redirect' ] ) ? $instance[ 'redirect' ] : '';
                ?>
                <div class="box-title clearfix">
                    <div class="login-title"><strong><?php echo $title; ?></strong></div>
                    <div class="reset-title" style="display:none;"><strong><?php _e( 'Recover Password', 'piki' ); ?></strong><?php /*<span><?php _e( 'Enter your email to retrieve your password.', 'piki' ) ?></span>*/ ?></div>
                </div>
                <?php
                echo do_shortcode( '[pikiforms fid="login" class="login" form_stle="' . _array_get( $args, 'form_style' ) . '"]' );
                ?>

            <?php else: ?>

                <?php $user = wp_get_current_user(); ?>
                <a href="<?php echo bloginfo( 'url' ); ?>/logout" class="button logout-button">Sair</a>
                <div class="clearfix avatar-nome">
                    <img src="<?php echo PKPerfil::get_avatar( $user ); ?>" class="avatar" alt="<?php echo $user->data->display_name; ?>" />
                    <p class="nome-user">Olá, <?php echo $user->data->user_login; ?></p>
                </div>
                <a href="<?php echo get_bloginfo( 'url' ); ?>/perfil/" class="button profile-button">Meu perfil</a>
                
                <?php do_action( 'perfil_userbox', $user ); ?>
            
            <?php endif;
        
            echo '</div>';
        }
    }
    add_action( 'widgets_init', 'register_perfil_widget' );
    function register_perfil_widget(){
        return register_widget( 'Perfil_Widget' );
    }


// Return path do wordpress
function perfil_mail_fix( $phpmailer ) {
    $phpmailer->Sender = get_option( 'admin_email' );
}
add_action( 'phpmailer_init', 'perfil_mail_fix' );    

// Email content type
function perfil_email_content_type(){
    return "text/html";
}
add_filter( 'wp_mail_content_type', 'perfil_email_content_type' );

