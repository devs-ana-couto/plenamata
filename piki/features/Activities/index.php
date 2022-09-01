<?php
class Activities {

    # Escolhe o template correto para cada atividade
    public static function call_template_part( $activity ){

        # Likes
        $like = array( 'like', 'dislike', 'unlike', 'disunlike' );

        # Follows
        $follow = array( 'follow', 'unfollow' );

        # Template
        $template = '';
        if( in_array( $activity->action, $like ) ):
            $template = 'like';
        elseif( in_array( $activity->action, $follow ) ):
            $template = 'follow';
        else:
            $template = $activity->object_type;
        endif;

        # Verifica se é necessário incluir template
        if( !empty( $template ) ):
            Piki::search_template( 'activity', $template, $plugin_uri, false );
        endif;

    }

    public static function get_activities( $user, $type='owers' ){

        $activities = self::get_db_activities( $user, $type );

        $logged = wp_get_current_user();

        foreach ( $activities as $key => $activity ) {

            $activity->type_list = $type;
            $activity->author = get_user_by( 'id', $activity->user_id );

            $activity->author_logged = false;
            $activity->target_logged = false;

            if( $logged->exists() && $activity->user_id == $logged->ID ):
                $activity->author_logged = true;
            elseif( $logged->exists() && $activity->object_type == 'user' && $activity->object_id == $logged->ID ):
                $activity->target_logged = true;
            endif;

            switch( $activity->object_type ):
                # Usuário
                case 'user':
                    $activity->target = get_userdata( $activity->object_id );
                break;
                # Post
                case 'post':
                    $activity->target = get_post( $activity->object_id );
                break;
                # Comentário
                case 'comment':
                    $activity->target = get_comment( $activity->object_id );
                    if( $activity->target && !empty( $activity->target ) ):
                        $activity->post = get_post( $activity->target->comment_post_ID );
                    endif;
                break;
                default:
                break;
            endswitch;

            # Se o target da atividade não existe mais, removemos ela e seus notes
            if( !$activity->target || empty( $activity->target ) ):
                self::delete_activity( $activity->activity_id );
                unset( $activities[ $key ] );
            endif;
            
        }

        return $activities;
    }

    public static function delete_activity( $activity_id ){
        global $wpdb;
        # Campos para comparação
        if( is_array( $activity_id ) ):
            $value = implode( ",", $activity_id );
            $compare = "in ( %s )";
        else:
            $value = $activity_id;
            $compare = "= %d";
        endif;
        # Remove os notes
        $wpdb->query( $wpdb->prepare( "DELETE FROM ". $wpdb->prefix ."notifications WHERE activity_id " . $compare, $value ) );
        # Remove a atividades
        $wpdb->query( $wpdb->prepare( "DELETE FROM ". $wpdb->prefix ."activities WHERE activity_id " . $compare, $value ) );
    }

    public static function get_db_activities( $user, $type='owers' ){
        
        global $wpdb;
        
        $args = array();
        if( $type=='friends' ):

            $query = $wpdb->prepare("
                SELECT ACT.* FROM 
                    ".$wpdb->prefix . "activities ACT,
                    ".$wpdb->prefix . "perfil_followers FOL
                WHERE 
                    FOL.follower_id = %d AND
                    FOL.followed_id = ACT.user_id AND 
                    ACT.activity_time >= FOL.start_date
                GROUP BY 
                    ACT.activity_id
                ORDER BY 
                activity_time DESC
            ", array( $user->ID ));
        else:
            $query = $wpdb->prepare("
                SELECT ACT.* FROM 
                    ". $wpdb->prefix . "activities ACT
                WHERE
                    ACT.user_id = %d
                ORDER BY 
                    activity_time DESC
            ", array( $user->ID ));
        endif;
        $activities = $wpdb->get_results($wpdb->prepare($query, $args));
        return $activities;
    }

    # Registra uma atividade
    public static function register_activity( $action, $object_type, $object_id, $description = '' ){
        
        global $wpdb;

        # Apenas usuários logados
        if( !is_user_logged_in() ):
            return true;
        endif;
        # Usuário corrent
        $user = wp_get_current_user();
        # Insere a atividade no banco
        $activity = $wpdb->insert( 
            $wpdb->prefix ."activities", 
            array( 
                'user_id' => $user->ID, 
                'action' => $action,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'activity_description' => $description,
            ), 
            array( '%d', '%s', '%s', '%d', '%s' )
        );
        # Verifica se foi inserida com sucesso
        if( $activity ):
            return $wpdb->insert_id;
        endif;
        # Houve algum problema    
        return false;

    }

    # Adiciona uma nota
    public static function add_user_note( $activity_id ){

        # Se a atividade não foi registrada
        if( !$activity_id || empty( $activity_id ) ):
            return false;
        endif;

        # Se o usuário não está logado
        $user = wp_get_current_user();
        if( !is_object( $user ) || !isset( $user->ID ) ):
            return false;
        endif;

        global $wpdb;

        # Seguidores do usuário logado
        $followers = PKPerfil::get_user_followers( $user );

        # Se ele não tiver seguidores
        if( !is_array( $followers ) || empty( $followers ) ):
            return true;
        endif;

        # Valores para a query
        $values = array();
        # Placeholders para a query
        $place_holders = array();
        # Início da query
        $query = "INSERT INTO ". $wpdb->prefix ."notifications (user_id, activity_id) VALUES ";
        # Insere os valores e os placeholders da query
        foreach ( $followers as $key => $id_follower ):
            # Valores do ítem
            array_push( $values, $id_follower, $activity_id );
            # Placeholders do ítem
            $place_holders[] = "( %d, %d )";
        endforeach;
        # Completa a query
        $query .= implode( ', ', $place_holders );

        # Faz a inserção no banco
        $results = $wpdb->query( $wpdb->prepare( $query, $values ) );

    }

    # Registra um 'follow'
    public static function register_follow( $perfil_id  ){
        $activity_id = self::register_activity( 'follow', 'user', $perfil_id );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra um 'unfollow'
    public static function register_unfollow( $perfil_id  ){
        $activity_id = self::register_activity( 'unfollow', 'user', $perfil_id );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra um like
    public static function register_like( $action, $type, $ID  ){
        $activity_id = self::register_activity( $action, $type, $ID );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra a publicação de um post
    public static function register_post_publish( $post_id  ){
        $activity_id = self::register_activity( 'post', 'post', $post_id );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra a edição de um post
    public static function register_post_edit( $post_id  ){
        $activity_id = self::register_activity( 'edit', 'post', $post_id );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra a publicação de um comentário
    public static function register_comment_publish( $comment_ID ){
        $activity_id = self::register_activity( 'post', 'comment', $comment_ID );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }
    # Registra a edição de um comentário
    public static function register_comment_edit( $comment_ID ){
        $activity_id = self::register_activity( 'edit', 'comment', $comment_ID );
        if( $activity_id ):
            self::add_user_note( $activity_id );
        endif;
    }

    # Recupera as notificações do usuário
    public static function get_user_notes( $user ){
        global $wpdb;
        $notes = $wpdb->get_results($wpdb->prepare("
            SELECT 
                A.* FROM 
                    " . $wpdb->prefix . "activities A, 
                    " . $wpdb->prefix . "notifications N
                WHERE 
                    A.activity_id = N.activity_id AND N.user_id = %d ORDER BY A.activity_time DESC LIMIT 50
        ", $user->ID ));
        if( !empty( $notes ) ):
            return $notes;
        else:
            return false;
        endif;
    }

    public static function notes_button( $user ){
        # Recupera os notes
        $notes = self::get_user_notes( $user );
        # Apenas se houver algum note
        if( !$notes ): return; endif; 
        # Nonce
        $nonce = wp_create_nonce( 'activities_clear_notes' );
        ?>
        <div class="user-notifications-box" request-nonce="<?php echo $nonce; ?>">
            <p class="notify-button" class="clearfix">
                <a class="count"><?php echo count( $notes ); ?></a> 
                <a class="text"><?php echo ( count( $notes ) == 1 ? 'Notificação' : 'Notificações' ); ?></a>
            </p>
            <ul class="list-activities">
                <?php
                foreach ( $notes as $key => $note ):
                    
                    $friend = get_user_by( 'id', $note->user_id );
                    $data = date_i18n("d M Y", strtotime( $note->activity_time ) );

                    $like = array( 'like', 'dislike', 'unlike', 'disunlike' );
                    $follow = array( 'follow', 'unfollow' );

                    if (  in_array( $note->action, $follow ) ):

                        $text = $note->action == 'follow' ? 'começou a ' : 'deixou de ';
                        if( $note->object_id != $user->ID ):
                            $other_user = get_user_by( 'id', $note->object_id );
                            $text .= 'serguir ' . $other_user->user_login;
                            $nicename = $other_user->user_nicename;
                        else:
                            $text .= 'te seguir';
                            $nicename = $friend->user_nicename;
                        endif;
                        $url = get_bloginfo( 'url' ) . '/perfil/'. $nicename .'/';

                    elseif (  in_array( $note->action, $like ) ):

                        $labels = array( 'like' => 'Curtiu', 'dislike' => 'Deixou de curtir', 'unlike' => 'Não curtiu', 'disunlike' => 'Deixou de não curtir'  );
                        

                        $text = $labels[ $note->action ];
                        

                        if( $note->object_type == 'comment' ):


                            $comment = get_comment( $note->object_id );
                            $post = get_post( $comment->comment_post_ID );
                            $text .= ' o comentário ' . Piki::trim( $comment->comment_content, 8 );
                            $url = get_permalink( $post->ID ) . '#comment-' . $comment->comment_ID;

                        else:

                            $note->target = get_post( $note->object_id );
                            $text .= ' ' . Piki::trim( $note->target->post_title, 8 );
                            $url = get_permalink( $note->target->ID );
                        
                        endif;

                    elseif(  $note->object_type == 'post' ):

                        $note->target = get_post( $note->object_id );
                        $note->target->post_type_object = get_post_type_object( $note->target->post_type );
                        $text = 'Postou em ' . $note->target->post_type_object->labels->name;
                        $text = apply_filters( 'activity_title', $text, $note );
                        $url = get_permalink( $note->target->ID );

                    elseif(  $note->object_type == 'comment' ):

                        $comment = get_comment( $note->object_id );
                        $post = get_post( $comment->comment_post_ID );
                        $text = 'Comentou em ' . $post->post_title;
                        $url = get_permalink( $post->ID ) . '#comment-' . $comment->comment_ID;

                    endif;
                    ?>
                    <li><a href="<?php echo $url; ?>">
                        <span class="apelido"><?php echo $friend->data->user_login; ?></span>
                        <span class="text"><?php echo strip_tags( $text ) ?></span>
                        <span class="text">Em <?php echo $data; ?></span>
                    </a></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php
    }

    public static function clear_notes( $user=false ){
        
        global $wpdb;

        # Verifica o Nonce
        if( !wp_verify_nonce( $_POST[ 'clear_notes_nonce' ], 'activities_clear_notes' ) ):
            exit( 'No naughty please' );
        endif;

        # Apenas usuários logados
        if( !$user ):
            $user = wp_get_current_user();
            if( is_object( $user ) && isset( $user->ID ) ):
                $user_id = $user->ID;
            endif;
        elseif( is_numeric( $user ) && (int)$user > 0 ):
            $user_id = $user;
        endif;
        if( !isset( $user_id ) ):
            Piki::error( 'O usuário informado não existe.' );
        endif;

        # Remove os notes do usuário
        return $wpdb->delete( 
            $wpdb->prefix . 'notifications', 
            array( 'user_id' => $user_id ), 
            array( '%d' ) 
        );
        
    }

    # Remove os dados relacionados ao usuário, do banco de dados
    public static function delete_user( $ID ){
        global $wpdb;
        # Atividades
        $wpdb->query($wpdb->prepare( 
            "DELETE FROM ". $wpdb->prefix ."activities WHERE user_id = %d OR ( object_type = 'user' AND object_id = %d )", 
            array( $ID, $ID ) 
        ));
        # Notas
        self::clear_user_notes( $ID );
    }

    # Remove os dados relacionados aos posts
    public static function delete_post( $ID ){
        
        global $wpdb;
        
        # Verifica se o post é uma revisão
        $post = $wpdb->get_row($wpdb->prepare(
            "SELECT ID, post_parent, post_type FROM $wpdb->posts WHERE ID = %d",
            $ID
        ));
        
        # Se for uma revisão, pegamos o post pai
        if( $post->post_type == 'revision' ):
            $post = $wpdb->get_row($wpdb->prepare(
                "SELECT ID FROM $wpdb->posts WHERE ID = %d",
                $post->post_parent
            ));
        endif;
        
        # Se o post não existe mais
        if( !$post ):
            return;
        endif;

        # Atividades relacionadas ao Post
        $activities = $wpdb->get_col($wpdb->prepare( 
            "SELECT activity_id FROM ". $wpdb->prefix ."activities WHERE object_type = 'post' AND object_id = %d", 
            $post->ID 
        ));
        
        # Se não há atividades
        if( !$activities || empty( $activities ) ):
            return;
        endif;

        # Remove as atividades
        self::delete_activity( $activities );
    
    }

    # Remove os dados relacionados aos Comment
    public static function delete_comment( $ID ){
        global $wpdb;
        # Atividades relacionadas ao Comment
        $activities = $wpdb->get_col( $wpdb->prepare( "SELECT activity_id FROM ". $wpdb->prefix ."activities WHERE object_type = 'comment' AND object_id = %d", $ID ) );
        if( !$activities || empty( $activities ) ):
            return;
        endif;
        self::delete_activity( $activities );
    }

}
# Limpa a lista de atividades do usuário
add_action( 'wp_ajax_nopriv_activities_clear_notes', array( 'Activities', 'clear_notes' ) );
# Remoção do usuario
add_action( 'delete_user', array( 'Activities', 'delete_user' ), 10 );
# Remoção de posts
add_action( 'delete_post', array( 'Activities', 'delete_post' ), 10 );
# Remoção de comments
add_action( 'delete_comment', array( 'Activities', 'delete_comment' ), 10 );
# Adiciona o botão de atividades no box de login do usuário
add_action( 'perfil_userbox', array( 'Activities', 'notes_button' ), 10 );
# Follows
add_action( 'perfil_follow', array( 'Activities', 'register_follow' ), 10 );
add_action( 'perfil_unfollow', array( 'Activities', 'register_unfollow' ), 10 );
# Likes
add_action( 'piki_like', array( 'Activities', 'register_like' ), 10, 3 );
# Comments
add_action( 'comment_post', array( 'Activities', 'register_comment_publish' ), 10 );
add_action( 'edit_comment', array( 'Activities', 'register_comment_edit' ), 10 );
# Posts
function activities_post_types_hoooks(){
    $post_types = get_post_types( array( '_builtin' => false ) );
    if( empty( $post_types ) ):
        return;
    endif;
    foreach ( $post_types as $key => $value ):
        # Posts
        add_action( 'publish_'.$value, array( 'Activities', 'register_post_publish' ), 10 );
        add_action( 'edit_'.$value, array( 'Activities', 'register_post_edit' ), 10 );
    endforeach;
}
add_action( 'init', 'activities_post_types_hoooks', 10 );

