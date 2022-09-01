<?php
define( 'LIKE', 1 );
define( 'UNLIKE', 2 );
define( 'LIKE_META', 'pklk_total_likes' );
define( 'UNLIKE_META', 'pklk_total_unlikes' );
define( 'LIKES_SCORE_META', 'pklk_total_score' );

class PikiLike {

    var $action;
    var $type;
    var $ID;
    var $table;
    var $user;

    // Métodos estáticos

        function __construct( $type, $ID=false, $action=false ){
            $this->type = $type;
            $this->table = $type . 'like';
            if ( $action ) {
                $this->action = $action == 'like' ? LIKE : UNLIKE;
            }
            if ( $ID ) {
                $this->ID = $ID;
            }
        }

        public static function init() {
            add_shortcode( 'postlike', array(  'PikiLike', 'shortcode_post' ) );
            add_shortcode( 'commentlike', array(  'PikiLike', 'shortcode_comment' ) );
        }

        public static function flush_rules(){   
            $rules = get_option( 'rewrite_rules' );
            if ( ! isset( $rules['like/([^/]+)'] ) ) {
                global $wp_rewrite;
                $wp_rewrite->flush_rules();
            }
        }

        public static function create_rewrite_rules() {
            global $wp_rewrite; 
            $new_rules[ 'like/([^/]+)' ] = 'index.php?like=true&type=$matches[1]';
            $new_rules[ 'unlike/([^/]+)' ] = 'index.php?unlike=true&type=$matches[1]';
            $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
        }

        // Adiciona variaveis de busca
        public static function add_query_vars( $qvars ) {
            $qvars[] = 'like';
            $qvars[] = 'unlike';
            $qvars[] = 'type';
            return $qvars;
        }
  
        // Redirecionar as páginas solicitadas para os devidos arquivos 
        public static function template_redirect_intercept(){
            global $wp_query;
            if( $wp_query->get( "like" ) == 'true' || $wp_query->get( "unlike" ) == 'true' ):

                if( !isset( $_POST[ 'like-object-id' ] ) || !is_numeric( (int)$_POST[ 'like-object-id' ] ) ):
                    Piki::return_json(array(
                        'status' => 'error',
                        'type' => 'no_posted_id',
                        'message' => 'O ID do ' . $wp_query->get( "type" ) . ' não foi informado.',
                    ));
                elseif( $wp_query->get( "type" ) == '' ):
                    Piki::return_json(array(
                        'status' => 'error',
                        'type' => 'no_type_posted',
                        'message' => 'Erro inesperado.',
                    ));
                endif;

                $action = $wp_query->get( "like" ) == 'true' ? 'like' : 'unlike';
                $l = new PikiLike( $wp_query->get( "type" ), $_POST[ 'like-object-id' ], $action );
                $l->set_count();

            endif;
        }

        // Arquivos
        public static function add_files(){
            wp_enqueue_script( 'PikiLike-scripts', Piki::url( 'pikilike.js', __FILE__ ) );
        }

        public static function get_widget( $type, $ID ){

            self::add_files();
           
            $active_class = !is_user_logged_in() ? 'off' : 'on';

            $l = new PikiLike( $type, $ID );
            $scores = $l->get_scores();

            if( is_user_logged_in() ):
                $l->user = wp_get_current_user();
                $voted = $l->get_user_like();
            else:
                $voted = false;
            endif;

            $widget = '
            <div class="pikilike-box '. $active_class .'">
                <a rel="' . $ID . '" href="' . get_bloginfo( 'url' ) . '/like/' . $type . '/" class="button like' . ( $voted==LIKE ? ' own ' : '' ) .' clearfix"><span class="counter">' .  $scores[ 'likes' ] . '</span><span class="ico">Gostei</span></a>
                <a rel="' . $ID . '" href="' . get_bloginfo( 'url' ) . '/unlike/' . $type . '/" class="button unlike '. ( $voted==UNLIKE ? ' own ' : '' ) . ' clearfix"><span class="counter">' . $scores[ 'unlikes' ] . '</span><span class="ico">Não Gostei</span></a>
                <span class="status"></span>
            </div>
            ';
            return $widget;
        }

        public function get_scores(){
            $likes_score = $this->get_meta( LIKES_SCORE_META );
            if( $likes_score != '' ):
                $unlikes = self::get_meta( UNLIKE_META );
                if( $unlikes == '' ): $unlikes = 0; endif;
                $likes = self::get_meta( LIKE_META );
                if( $likes == '' ): $likes = 0; endif;
            else:
                $likes_score = 0;
                $likes = 0;
                $unlikes = 0;
            endif;
            return array(
                'likes' => $likes,
                'unlikes' => $unlikes,
                'score' => $likes_score,
            );
        }

        public function get_meta( $meta ){
            if( $this->type == 'comment' ):
                return get_comment_meta( $this->ID, $meta, true );
            else:
                return get_post_meta( $this->ID, $meta, true );
            endif;
        }

        public function update_meta( $meta, $value ){
            if( $this->type == 'comment' ):
                update_comment_meta( $this->ID, $meta, $value );
            else:
                update_post_meta( $this->ID, $meta, $value );
            endif;
        }

        public static function shortcode_post( $atts ) {
            extract( shortcode_atts( array(
                'id' => null,
            ), $atts ) );
            if( is_null( $atts[ 'id' ] ) ):
                $atts[ 'id' ] = get_post_ID();
            endif;
            $post = get_post( $atts[ 'id' ] );
            return self::get_widget( 'post', $post->ID );
        }

        public static function shortcode_comment( $atts ) {
            extract( shortcode_atts( array(
                'id' => null,
            ), $atts ) );
            if( is_null( $atts[ 'id' ] ) ):
                $atts[ 'id' ] = get_comment_ID();
            endif;
            $comment = get_comment( $atts[ 'id' ] );
            return self::get_widget( 'comment', $comment->comment_ID );
        }

        public static function get_actions(){
            return array( 'like', 'unlike', 'dislike', 'disunlike' );
        }

        public static function activity_title( $title, $activity ){

            if( !in_array( $activity->action, self::get_actions() ) ):
                return $title;
            endif;

            $new_title = '';

            // Ação
            switch ( $activity->action ):
                case 'dislike':
                    $new_title = 'Deixou de curtir ';
                break;
                case 'unlike':
                    $new_title = 'Não curtiu ';
                break;
                case 'disunlike':
                    $new_title = 'Deixou de não curtir ';
                break;
                case 'like':
                default:
                    $new_title = 'Curtiu ';
                break;
            endswitch;

            // Objeto
            switch ( $activity->object_type ):
                case 'comment':
                    $new_title .= 'o comentário ' . $activity->target->comment_title;
                break;
                default:
                    $new_title .= $activity->target->post_title;
                break;
            endswitch;

            return $new_title;
        }

    // Métodos orientados

        public function set_count(){

        	if( !is_user_logged_in() ):
        		Piki::return_json(array(
        			'status' => 'error',
        			'type' => 'no_access',
        			'message' => 'Você precisa estar logado para votar.',
        		));
        	endif;

        	$this->user = wp_get_current_user();

            if( $this->type == 'comment' ):
                $object = get_comment( $this->ID );
            else:
                $object = get_post( $this->ID );
            endif;

        	if ( is_null( $object ) ) {
        		Piki::return_json(array(
        			'status' => 'error',
        			'type' => 'post_error',
        			'message' => $this->type . ' inválido.',
        		));
        	}

        	// Voto anterior
        	$voted = $this->get_user_like( $this->user->ID );

        	// Se ele ainda não curtiu, e está curtindo
        	if( is_null( $voted ) && $this->action == LIKE ):
        		$scores = self::like();
        		$action = 'like';
        	// Se ele ainda não curtiu, e está descurtindo
        	elseif( is_null( $voted ) && $this->action == UNLIKE ):
        		$scores = self::unlike();
        		$action = 'unlike';
        	// Se o usuário havia curtido, e está removendo a curtida
        	elseif( !is_null( $voted ) && $voted == $this->action && $this->action == LIKE ):
        		$scores = self::dislike();
        		$action = 'dislike';
        	// Se o usuário havia descurtido, e está removendo a descurtida
        	elseif( !is_null( $voted ) && $voted == $this->action && $this->action == UNLIKE ):
        		$scores = self::disunlike();
        		$action = 'disunlike';
        	// Se o usuário já votou, e está invertendo o voto
        	elseif( !is_null( $voted ) && $voted != $this->action ):
        		$scores = self::swaplike();
        		$action = $this->action == LIKE ? 'like' : 'unlike';
        	endif;

        	if( is_array( $scores ) ):
                do_action( 'piki_like', $action, $this->type, $this->ID );
        		Piki::return_json(array(
        			'status' => 'success',
        			'scores' => $scores,
        		));
        	else:
        		Piki::return_json(array(
        			'status' => 'error',
        			'type' => $scores,
        		));
        	endif;
        	
        	die();
        }

        public function like(){
        	$this->create_user_like( LIKE );
        	$scores = self::get_scores();
    		$scores[ 'likes' ]++;
    		$scores[ 'score' ] = ( $scores[ 'likes' ] - $scores[ 'unlikes' ] );
    		$this->update_meta( LIKE_META, $scores[ 'likes' ] );
    		$this->update_meta( LIKES_SCORE_META, $scores[ 'score' ] );
        	return $scores;
        }

        public function unlike(){
        	$this->create_user_like( UNLIKE );
        	$scores = $this->get_scores();
    		$scores[ 'unlikes' ]++;
    		$scores[ 'score' ] = ( $scores[ 'likes' ] - $scores[ 'unlikes' ] );
    		$this->update_meta( UNLIKE_META, $scores[ 'unlikes' ] );
    		$this->update_meta( LIKES_SCORE_META, $scores[ 'score' ] );
        	return $scores;
        }

        public function dislike(){
        	$remove = $this->delete_user_like();
        	$scores = $this->get_scores();
        	if( $remove ):
    			$scores[ 'likes' ]--;
    			$scores[ 'score' ] = ( $scores[ 'likes' ] - $scores[ 'unlikes' ] );
    			$this->update_meta( LIKE_META, $scores[ 'likes' ] );
    			$this->update_meta( LIKES_SCORE_META, $scores[ 'score' ] );
        	endif;
        	return $scores;
        }

        public function disunlike(){
        	$remove = $this->delete_user_like();
        	$scores = $this->get_scores();
        	if( $remove ):
    			$scores[ 'unlikes' ]--;
    			$scores[ 'score' ] = ( $scores[ 'likes' ] - $scores[ 'unlikes' ] );
    			$this->update_meta( UNLIKE_META, $scores[ 'unlikes' ] );
    			$this->update_meta( LIKES_SCORE_META, $scores[ 'score' ] );
        	endif;
        	return $scores;
        }

        public function swaplike(){
        	$update = $this->update_user_like( $this->action );
        	$scores = $this->get_scores();
        	if( $update ):
        		if( $this->action == LIKE ):
    				$scores[ 'likes' ]++;
    				$scores[ 'unlikes' ]--;
    			else:
    				$scores[ 'unlikes' ]++;
    				$scores[ 'likes' ]--;
    			endif;
    			$scores[ 'score' ] = ( $scores[ 'likes' ] - $scores[ 'unlikes' ] );
    			$this->update_meta( LIKE_META, $scores[ 'likes' ] );
    			$this->update_meta( UNLIKE_META, $scores[ 'unlikes' ] );
    			$this->update_meta( LIKES_SCORE_META, $scores[ 'score' ] );
        	endif;
        	return $scores;

        }

        // Atualiza o voto anterior do usuário
        public function update_user_like( $status ){
        	global $wpdb;
        	$udpated = $wpdb->query($wpdb->prepare( "UPDATE " . $wpdb->prefix . $this->table . " SET status='%d' WHERE user_id='%d' AND ". $this->type ."_id='%d'", array( $status, $this->user->ID, $this->ID ) ) );
        	if( $udpated === 1 ){
        		return true;
        	}
        	else{
        		return false;
        	}
        }

        // Recupera o voto anterior do usuário
        public function get_user_like(){
        	global $wpdb;
        	return $wpdb->get_var($wpdb->prepare( "SELECT status FROM " . $wpdb->prefix . $this->table . " WHERE user_id='%d' AND ". $this->type ."_id='%d'", array( $this->user->ID, $this->ID ) ));
        }

        // Insere o voto do banco
        public function create_user_like( $status ){
        	global $wpdb;
        	return $wpdb->query($wpdb->prepare( "INSERT INTO " . $wpdb->prefix . $this->table . " SET user_id='%d', ". $this->type ."_id='%d', status='%d'", array( $this->user->ID, $this->ID, $status ) ) );
        }

        public function delete_user_like(){
        	global $wpdb;
        	$removed = $wpdb->query($wpdb->prepare( "DELETE FROM " . $wpdb->prefix . $this->table . " WHERE user_id='%d' AND ". $this->type ."_id='%d'", array( $this->user->ID, $this->ID ) ) );
        	if( $removed === 1 ){
        		return true;
        	}
        	else{
        		return false;
        	}
        }

} 

add_filter( 'activity_title', array( 'PikiLike', 'activity_title' ), 10, 2 );
add_action( 'init', array( 'PikiLike', 'init' ) );
add_filter( 'query_vars', array( 'PikiLike', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiLike', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiLike', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiLike', 'flush_rules' ) );

function pikilike_activation() {
	global $jal_db_version;
	$jal_db_version = "1.0";
	global $wpdb;
	global $jal_db_version;
    $sql = '';
    
    // Posts likes
    $sql .= "CREATE TABLE ".$wpdb->prefix."postlike (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_id mediumint(9) NOT NULL,
        post_id mediumint(9) NOT NULL,
        status tinyint(1) NOT NULL,
        UNIQUE KEY id (id)
    );";

    // Comments likes
    $sql .= "CREATE TABLE ".$wpdb->prefix."commentlike (
	    id mediumint(9) NOT NULL AUTO_INCREMENT,
	    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	    user_id mediumint(9) NOT NULL,
	    comment_id mediumint(9) NOT NULL,
	    status tinyint(1) NOT NULL,
	    UNIQUE KEY id (id)
	);";
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );
	add_option( "jal_db_version", $jal_db_version );
}
register_activation_hook( __FILE__, 'pikilike_activation' );