<?php
class Follow{

    # Botão seguir
    public static function follow_button( $perfil ){
        if( !is_user_logged_in() ):
            return '';
        else:
            $user = wp_get_current_user();
            if( self::is_following( $user, $perfil ) ):
                return '<a href="'. get_bloginfo( 'url' ) .'/nao-seguir/' . $perfil->data->user_nicename . '" class="button clearfix follow-button active" rel="'. $perfil->data->user_nicename .'">Seguindo</a>';
            else:
                return '<a href="'. get_bloginfo( 'url' ) .'/seguir/'. $perfil->data->user_nicename .'" class="button clearfix follow-button" rel="'. $perfil->data->user_nicename .'">Seguir</a>';
            endif;
        endif;
    }

    # Ação de seguir    
    public static function set_follow( $action, $perfil_slug ){

        # Se o usuário não está logado
        if( !is_user_logged_in() ):
            Piki::error( 'Para seguir um usuário, você precisa estar logado' );
        endif;
        
        # Usuário
        $user = wp_get_current_user();
        
        # Perfil
        $perfil = get_user_by( 'slug', $perfil_slug );
        if( !$perfil || !$perfil->exists() ):
           Piki::error( 'O usuário informado não existe' );
        endif;

        # Executa a ação
        if( $action == 'follow' ):
            self::follow( $user, $perfil );
        else:
            self::unfollow( $user, $perfil );
        endif;

    }

    # Registro no banco de seguir
    public static function follow( $user, $tofollow ){
        # Verifica se o usuário já está seguindo        
        if( self::is_following( $user, $tofollow ) ):
            Piki::error( 'Você já está seguindo este usuário' );
        endif;
        # Faz o registro na tabela
        global $wpdb;
        $wpdb->insert( 
            $wpdb->prefix ."perfil_followers", 
            array( 
                'follower_id' => $user->ID, 
                'followed_id' => $tofollow->ID
            ), 
            array( '%d', '%d' ) 
        );
        do_action( 'perfil_follow', $tofollow->ID );
        Piki::success(array(
            'text' => 'Seguindo',
            'new_status' => 'seguindo',
            'url' => get_bloginfo( 'url' ) . '/nao-seguir/',
        ));
    }

    # Remoção do registro de seguir do banco
    public static function unfollow( $user, $tounfollow ){
        global $wpdb;
        $wpdb->delete( 
            $wpdb->prefix ."perfil_followers",
            array( 
                'follower_id' => $user->ID, 
                'followed_id' => $tounfollow->ID
            ), 
            array( '%d', '%d' )
        );
        do_action( 'perfil_unfollow', $tounfollow->ID );
        Piki::success(array(
            'text' => 'Seguir',
            'new_status' => 'seguir',
            'url' => get_bloginfo( 'url' ) . '/seguir/',
        ));
    }

    # Total de seguidos
    public function get_total_following( $user ){
        global $wpdb;
        $follows = $wpdb->get_var($wpdb->prepare( "SELECT count(1) FROM ". $wpdb->prefix ."perfil_followers WHERE follower_id=%d", array( $user->ID ) ) );
        $followers = $wpdb->get_var($wpdb->prepare( "SELECT count(1) FROM ". $wpdb->prefix ."perfil_followers WHERE followed_id=%d", array( $user->ID ) ) );
    }

    # Usuários seguidos
    public static function get_user_followings( $user ){
        global $wpdb;
        return $wpdb->get_col($wpdb->prepare( "SELECT followed_id FROM ". $wpdb->prefix ."perfil_followers WHERE follower_id=%d", array( $user->ID ) ) );
    }

    # Usuários seguidores
    public static function get_user_followers( $user ){
        global $wpdb;
        return $wpdb->get_col($wpdb->prepare( "SELECT follower_id FROM ". $wpdb->prefix ."perfil_followers WHERE followed_id=%d", array( $user->ID ) ) );
    }

    # Total de usuários seguidos
    public static function total_user_following( $user ){
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare( "SELECT count(1) FROM ". $wpdb->prefix ."perfil_followers WHERE follower_id=%d", array( $user->ID ) ) );
    }

    # Total de usuário seguidores
    public static function total_user_followers( $user ){
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare( "SELECT count(1) FROM ". $wpdb->prefix ."perfil_followers WHERE followed_id=%d", array( $user->ID ) ) );
    }

    # Verifica se o perfil está seguindo determinado usuário
    public static function is_following( $user, $perfil ){
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare( "SELECT count(1) FROM ". $wpdb->prefix ."perfil_followers WHERE follower_id=%d AND followed_id=%d", array( $user->ID, $perfil->ID ) ) );
    }

}
