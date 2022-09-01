<?php
class Sharing {

    function __construct(){

        add_filter( 'body_class', [ $this, 'body_class' ], 10, 1);
        add_filter( 'document_title_parts', [ $this, 'custom_titles' ], 10, 1 );

        // URL's
        add_filter( 'query_vars', [ $this, 'queryVars' ] );
        add_action( 'generate_rewrite_rules', [ $this, 'rewriteRules' ] );
        add_action( 'template_redirect', [ $this, 'redirectIntercept' ] );
    
    }

    // Adiciona variaveis de busca
    public function queryVars( $qvars ) {
        $qvars[] = 'sharing';
        $qvars[] = 'type';
        return $qvars;
    }
    
    // Create rewrite rules
    public function rewriteRules() {

        global $wp_rewrite;

        $new_rules[ 'sharing/([^/]+)' ] = 'index.php?sharing=true&type=$matches[1]';
        $new_rules[ 'sharing' ] = 'index.php?sharing=true&type=home';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    
    }

    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public function redirectIntercept(){
       
        global $wp_query;

        if( $wp_query->get( 'sharing' ) != 'true' ) return true;
        
        $type = $wp_query->get( 'type' );
        if( $type == '' ) $type = 'home';
        
        Piki::search_template( 'embeds/sharing', $type, __DIR__, true );
    
    }

    public function custom_titles( array $parts ): array {
        return $parts;
    }

    public function body_class( array $classes ): array {
        global $post;
        return $classes;
    }

}
$Sharing = new Sharing();
