<?php
session_start();

define( 'FIVE_STARS_TABLE', 'piki_fivestars' );
define( 'FIVE_STARS_META', 'fivestars_total_score' );
define( 'FIVE_STARS_COOKIE', 'piki_fivestars' );

class FiveStars {

    // Init
    public static function init() {
        add_shortcode( 'fivestars', array(  'FiveStars', 'shortcode' ) );
    }

    // Arquivos
    public static function add_files(){
        wp_enqueue_script( 'five-stars-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
        wp_enqueue_style( 'five-stars-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

    public static function shortcode( $atts ) {

        // Opções
        $defaults = array(
            'id' => get_the_ID(),
            'class' => '',
        );
        $options = shortcode_atts( $defaults, $atts );
        $options = array_merge( $defaults, $options );

        if( empty( $options[ 'id' ] ) ):
            return '';
        endif;

        $post = get_post( $options[ 'id' ] );

        return self::get_widget( $post->ID, 'post' );
    }

    public static function get_widget( $ID, $type="post" ){

        global $wpdb;

        self::add_files();

        // Média de pontos
        $score_media = self::score_media( $ID, $type );

        // Voto do usuário
        $user_vote = self::get_user_vote( $ID, $type );
        $user_score = empty( $user_vote ) ? 0 : $user_vote->score;

        // Votos marcados no ínício
        $initial_scores = $user_score > 0 ? $user_score : $score_media;
        
        // HTML
        $widget = '<div class="five-stars-box free clearfix" score-media="'. $score_media .'" user-score="' . $user_score . '" type="'. $type .'" rel="'. $ID .'" data-success-message="Sua avaliação foi recebida!"><ul>';
        for( $x = 1; $x <= 5; $x++ ):
            $widget .= '<li><button score="'. $x .'" class="star'.( $x <= $initial_scores ? ' active' : '' ).'"></button></li>';
        endfor;
        $widget .= '</ul><em>Avaliar com <strong>5</strong> estrela<span>s</span></em></div>';
        
        return $widget;
    
    }

    // Média de pontos
    public static function score_media( $ID, $type ){

        global $wpdb;
        
        $total_score = $wpdb->get_var($wpdb->prepare(
            "SELECT ROUND( SUM(score) / count(0) ) FROM $wpdb->prefix" . FIVE_STARS_TABLE . " WHERE object_type = %s AND object_id = %d",
            array(
                $type,
                $ID
            )
        ));
        
        return empty( $total_score ) ? 0 : $total_score;
    
    }

    public static function vote(){

        extract( $_POST );

        // ID
        if( empty( $ID ) ):
            Piki::error( 'O ID do objeto não foi informado' );
        endif;

        // Type
        $type = empty( $type ) ? 'post' : $type;

        // IP
        $IP = Piki::client_ip();

        // Score
        $score = (int)$score < 1 ? 1 : $score;

        // User ID
        $user_ID = get_current_user_id();

        // Voto do usuário
        $user_vote = self::get_user_vote( $ID, $type, $user_ID );

        // Se o usuário não votou
        if( empty( $user_vote ) ):
            $response = self::add_vote( $type, $ID, $IP, $score, $user_ID );
        // Se o usuário já votou
        else:
            $response = self::update_vote( $user_vote, $score, $IP );
        endif;

        // Atualizando o valor de pontos
        self::update_vote_total_scores( $ID, $type );

        // Média de pontos
        $score_media = self::score_media( $ID, $type );

        if( empty( $score_media ) ):
            Piki::error( 'Ocorreu um erro inesperado. Por favor, tente mais tarde.' );
        endif;

        Piki::success(array(
            'total' => $score_media,
            'user_score' => $score
        ));

    }

    // Recupera um voto no banco de dados
    public static function get_db_vote( $vote_id ){
        global $wpdb;
        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $wpdb->prefix" . FIVE_STARS_TABLE . " WHERE id = %d",
            $vote_id
        ));
    }

    // Recupera o voto de um usuário
    public static function get_user_vote( $ID, $type = 'post', $user_ID = false ){

        global $wpdb;

        // Voto do usuário
        $user_vote = null;

        // Se o ID do usuário não foi passado
        if( !$user_ID ):
            $user_ID = get_current_user_id();
        endif;

        // Se o usuário está logado, buscamos o voto no banco de dados
        if( !empty( $user_ID ) ):

            // Busca pelo voto no banco
            $user_vote = $wpdb->get_row($wpdb->prepare(
                "SELECT * FROM $wpdb->prefix" . FIVE_STARS_TABLE . " WHERE object_type = %s AND object_id = %d AND user_id = %d",
                array(
                    $type,
                    $ID,
                    $user_ID
                )
            ));

        endif;

        // Se não foi encontrado o voto no banco, procuramos via cookie
        if( empty( $user_vote ) ):

            // Cookie
            $user_cookie = self::cookie_get( $ID, $type );
            
            // Cookie vote
            if( $user_cookie ):
            
                $user_vote = self::get_db_vote( $user_cookie );

            endif;

        endif;

        return $user_vote;
   
    }

    public static function add_vote( $type, $ID, $IP, $score, $user_ID = 0 ){
        
        global $wpdb;
        
        // Insere o voto no banco
        $insert = $wpdb->query($wpdb->prepare( 
            "INSERT INTO $wpdb->prefix" . FIVE_STARS_TABLE . " SET object_type = %s, object_id = %d, ip = %s, score = %d, user_id = %d", 
            array( 
                $type, 
                $ID, 
                $IP,
                $score,
                $user_ID
            ) 
        ));

        // Erro na inserção no banco de dados
        if( empty( $insert ) ):
            Piki::error( 'Não foi possível computar seu voto: $wpdb->last_error' );
        endif;

        // Setando o cookie
        self::cookie_set( $type, $ID, $wpdb->insert_id );

        return true;
    
    }

    public static function update_vote( $vote, $score, $IP ){

        global $wpdb;

        // Se o voto é o mesmo, não fazemos nada
        if( $vote->score == $score && $vote->ip == $IP ):
            return true;
        endif;

        // Faz o update no banco
        $result = $wpdb->query($wpdb->prepare(
            "UPDATE $wpdb->prefix" . FIVE_STARS_TABLE . " SET score = %d, ip = %s, time = %s WHERE id = %d",
            array(
                $score,
                $IP,
                date( 'Y-m-d H:i:s' ),
                $vote->id
            )
        ));

        // Setando o cookie
        self::cookie_set( $vote->object_type, $vote->object_id, $vote->id );

        return true;

    }

    public static function update_vote_total_scores( $ID, $type ){

        global $wpdb;

        $total = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(score) AS total FROM $wpdb->prefix" . FIVE_STARS_TABLE . " WHERE object_type = %s AND object_id = %d",
            array(
                $type,
                $ID
            )
        ));

        call_user_func( 'update_' . $type . '_meta', $ID, FIVE_STARS_META, $total );

        return (int)$total;

    }

    // Cookie do usuário
    public static function cookie_get( $ID, $type = 'post' ){

        return isset( $_COOKIE[ FIVE_STARS_COOKIE ][ $type.$ID ] ) ? $_COOKIE[ FIVE_STARS_COOKIE ][ $type.$ID ] : false;
    
    }

    // Insere um voto no cookie
    public static function cookie_set( $type, $ID, $db_id ){
        
        // Nome do cookie
        $cookie_name = FIVE_STARS_COOKIE . '[' . $type.$ID . ']';

        // Seta o cookie
        setcookie( $cookie_name, $db_id, self::cookie_time(), COOKIEPATH, COOKIE_DOMAIN, false );

        return true;
    
    }

    // Tempo do cookie
    public static function cookie_time(){
        return time() + ( 86400 * 360 );
    }

} 

add_filter( 'activity_title', array( 'FiveStars', 'activity_title' ), 10, 2 );
add_action( 'init', array( 'FiveStars', 'init' ) );
add_action( 'wp_ajax_five_stars_vote', array( 'FiveStars', 'vote' ) );
add_action( 'wp_ajax_nopriv_five_stars_vote', array( 'FiveStars', 'vote' ) );
