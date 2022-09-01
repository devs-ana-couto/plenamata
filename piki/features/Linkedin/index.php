<?php
session_start();

/*
Description: Últimos posts de uma página no LinkedIn
Version: 0.1
Author: Thiago Borges (Piki)
Author URI: http://pikiweb.com.br
Author Email: thiago@pikiweb.com.br
*/

define( 'LINKEDIN_CONTENT_TABLE', 'linkedin_content' );
define( 'LINKEDIN_API_URL', 'https://www.linkedin.com/oauth/v2/' );
define( 'LINKEDIN_API_ID', '770tj0oqpoo8rk' );
define( 'LINKEDIN_API_SECRET', 'z4LhITxc96bjaoBG' );

// API
include_once __DIR__ . '/../../vendor/autoload.php';

// import client class
use LinkedIn\Client;
use LinkedIn\Scope;
use LinkedIn\AccessToken;

class PKLinkedin {

    private $options;
    private $images;
    private $api_host = 'https://api.linkedin.com';
    private $client;

    function __construct(){

        // Shortocde
        add_shortcode( 'linkedin', array(  $this, 'shortcode' ) );

        // Linkedin Client
        $this->client = new Client(
            LINKEDIN_API_ID,
            LINKEDIN_API_SECRET
        );
        $this->client->setApiRoot( 'https://api.linkedin.com/v2/' );

        // Pages register
        add_filter( 'query_vars', array( $this, 'addQueryVars' ) );
        add_action( 'generate_rewrite_rules', array( $this, 'createRewriteRules' ) );
        add_action( 'template_redirect', array( $this, 'redirectIntercept' ) );

    }

    private function getToken(){

        // Get token
        $token = get_option( 'pklinkedin_token' );
        if( empty( $token ) ) return false;

        // Decode token
        $token = json_decode( $token );

        // Expired token
        if( time() >= $token->expiresAt ):
            return false;
        endif;

        // Instantiate access token object from stored data
        $accessToken = new AccessToken( $token->token, $token->expiresAt );

        // set token for client
        $this->client->setAccessToken( $accessToken );

        // Return access token
        return $accessToken;

    }

    // Do request token to API
    private function requestTokenButton(){

        // Redirect URL
        $redirectUrl = get_site_url( null, '/linkedin' );

        // Session
        $_SESSION[ 'state' ] = $this->client->getState();
        $_SESSION[ 'redirect_url' ] = $redirectUrl; 

        // Set redirect url
        $this->client->setRedirectUrl( $redirectUrl );

        // define scope
        // r_organization_social,w_organization_social,rw_organization_admin,rw_ads,r_ads_reporting,
        $scopes = [ 'r_liteprofile,r_organization_social' ];

        // Login URl
        $loginUrl = $this->client->getLoginUrl( $scopes );

        return '<a href="'. $loginUrl .'" class="button"><span>Autorizar API do LinkedIn</span></a>';
        
    }

    private function getRedirect(){

        // Code
        $code = _get( 'code' );
        $state = _get( 'state' );
        $error = _get( 'error_description' );
        
        //https://www.linkedin.com/biz/[PROFILE ID]/feed?start=0&v2=true
        
        // State
        $_state = _array_get( $_SESSION, 'state' );
        $_redirect = _array_get( $_SESSION, 'redirect_url' );

        if( $error ): 

            Piki::error( 'PKLindedIn' . $error );
       
        elseif( !$code || !$state || $_state !== $state ):
       
            Piki::error( 'Problema com os dados para geração do access token do LinkedIn' );
       
        endif;

        // Set redirect URL
        $this->client->setRedirectUrl( $_redirect );

        // Get access token
        $accessToken = $this->client->getAccessToken( $code );
        if( $accessToken ):
        
            update_option( 'pklinkedin_token', json_encode( $accessToken ) );
            $this->shortcode();
        
        else:
        
            Piki::error( 'PKLinkedin: Erro ao gerar access token' );
        
        endif;

    }

    // Shortcode
    public function shortcode( $atts ){

        $token = $this->getToken();
        if( empty( $token ) ) return $this->requestTokenButton();

        extract( shortcode_atts( array(
            'total' => '10',
        ), $atts ));
    
        return $this->getForList( $total );
    
    }

    // Para listagem
    public function getForList( $total ){

        global $wpdb;

        // Keep cache
        $last_call = get_option( 'pklinkedin_last_time' );
        if( empty( $last_call ) || now() > ( $last_call + ( MINUTE_IN_SECONDS * 10 ) ) ):
            $this->requestPosts( $total );
        endif;
        
        // Get items
        $table = $wpdb->prefix . LINKEDIN_CONTENT_TABLE;
        $items = $wpdb->get_results($wpdb->prepare(
            "SELECT id, content, chave, status FROM {$table}"
        ));
        
        if( empty( $items ) ) return  false;

        echo '<pre>';
        echo '$items' . "\r\n";
        var_dump( $items );
        exit;
       

    }

    // Busca por hashtag
    public function requestPosts( $total ){

        // 5263320
        try {
        
            $profile = $this->client->get(
                'organizationalEntityAcls',
                [ 'q' => 'roleAssignee' ]
            );
            echo '<pre>';
            echo '$posts' . "\r\n";
            var_dump( $profile );
            exit;
            
        }
        catch( Exception $e ){

            if( $e->getCode() == '403' ):
                
                delete_option( 'pklinkedin_token' );
                header( "Refresh:0" );

            else:

                exit( $e->getCode() . ':' . $e->getDescription() );    

            endif;
            
        }

    }

    public static function clear_cache(){
        global $wpdb;
        $truncate = $wpdb->query( "DELETE FROM $wpdb->prefix" . LINKEDIN_CACHE_TABLE );
        echo Piki::return_json(array(
            'status' => !!$truncate
        ));        
    }

    // Parse response body
    public static function responseBody( $response ){
        $contents = $response->getBody()->getContents();
        return ( strpos( $contents, '{' ) === 0 ) ? json_decode( $contents ) : $contents;
    }

    // Regras de URL
    public function createRewriteRules() {
        global $wp_rewrite; 
        $new_rules[ 'linkedin' ] = 'index.php?linkedin=true';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    }
    // Adiciona variaveis de busca
    public function addQueryVars( $qvars ) {
        $qvars[] = 'linkedin';
        return $qvars;
    }
    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public function redirectIntercept(){

        global $wp_query;
        
        if( $wp_query->get( 'linkedin' ) == 'true' ):
            $this->getRedirect();            
        endif;
    
    }

}
$PKLinkedin = new PKLinkedin();

// Instalação do plugin
register_activation_hook( __FILE__, 'linkedin_activate' );
function linkedin_activate(){
    global $wpdb;
    $sql = "
    CREATE TABLE $wpdb->prefix" . LINKEDIN_CACHE_TABLE . " (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        content text NOT NULL,
        time INT DEFAULT '0',
        chave VARCHAR(255) DEFAULT '' NOT NULL,
        UNIQUE KEY id (id)
    );
    CREATE TABLE $wpdb->prefix" . LINKEDIN_CONTENT_TABLE . " (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        content text NOT NULL,
        chave VARCHAR(255) DEFAULT '' NOT NULL,
        status TINYINT NULL DEFAULT 0,
        UNIQUE KEY id (id)
    );
    ";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}

// Desinstalação do plugin
register_deactivation_hook( __FILE__, 'linkedin_deactivate' );
function linkedin_deactivate(){
    global $wpdb;
    $wpdb->query( "DROP TABLE IF EXISTS $wpdb->prefix" . LINKEDIN_CACHE_TABLE );
}