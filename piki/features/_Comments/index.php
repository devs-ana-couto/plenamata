<?php
define( 'PikiComm_dateformat', "d M Y" );

class PikiComm {

    public static function init() {
        add_shortcode( 'pikicomm', array(  'PikiComm', 'shortcode' ) );
    }

    public static function flush_rules(){   
        $rules = get_option( 'rewrite_rules' );
        if ( ! isset( $rules['envia-comentario'] ) ) {
            global $wp_rewrite;
            $wp_rewrite->flush_rules();
        }
    }

    public static function create_rewrite_rules() {
        global $wp_rewrite; 
        $new_rules[ 'envia-comentario' ] = 'index.php?envia-comentario=true';
        $new_rules[ 'edita-comentario' ] = 'index.php?edita-comentario=true';
        $new_rules[ 'exclui-comentario' ] = 'index.php?exclui-comentario=true';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    }

    // Adiciona variaveis de busca
    public static function add_query_vars( $qvars ) {
        $qvars[] = 'envia-comentario';
        $qvars[] = 'edita-comentario';
        $qvars[] = 'exclui-comentario';
        return $qvars;
    }
  
    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public static function template_redirect_intercept(){
        global $wp_query;
        if( $wp_query->get( "envia-comentario" ) == 'true' ):
            self::submit_comment();
        elseif( $wp_query->get( "edita-comentario" ) == 'true' ):
            self::edit_comment();
        elseif( $wp_query->get( "exclui-comentario" ) == 'true' ):
            self::exclui_comment();
        endif;
    }

    // Arquivos
    public static function add_files(){
        // Scripts
        wp_register_script( 'PikiComm-scripts', plugins_url( '/' , __FILE__ ) . 'piki-comments.js' );
        wp_enqueue_script( 'PikiComm-scripts' );
    }

    public static function get_form(){
        //if( !is_user_logged_in() ):
        //    echo '
        //        <div id="respond" class="must-logged comment-respond">
        //            <h3 id="reply-title" class="comment-reply-title">Comentar <span class="must-logged">Você precisa estar <a href="'//. get_bloginfo( 'url' ) .'/cadastro/">logado</a> para comentar.</span></h3>
        //        </div>
        //    ';
        //    return;
        //endif;  
        
        self::add_files();

        $comments_args = array(
            // change the title of send button 
            'label_submit' => 'Enviar',
            // change the title of the reply section
            'title_reply' => 'Comentar',
            // remove "Text or HTML to be displayed after the set of comment fields"
            'comment_notes_after' => '',
            // Precisa estar loogado como
            'must_log_in' => '',
            // Logado como
            'logged_in_as' => '',
            // redefine your own textarea (the comment body)
            'comment_field' => '<p class="comment-form-comment"><textarea id="comment" name="comment" aria-required="true"></textarea></p>',
        );

        // Outros plugins podem alterar o form
        $comments_args = apply_filters( 'piki_comments_form', $comments_args, get_post_type() );

        comment_form( $comments_args ); 
    
    }

    public static function list_comments(){
        echo '<div id="comments-list">';
        while ( have_comments() ): the_comment(); 
            $comment_id = get_comment_ID();
            $comment_obj = get_comment( $comment_id );
            echo self::get_comment( $comment_obj );
        endwhile;
        echo '</div>';
    }

    public static function get_comment( $comment, $user=false ){
        if (!$user) {
            $user = wp_get_current_user();
        }
        $buttons = '';
        if( $user->exists() && (int)$comment->user_id == (int)$user->ID ):
            $buttons  = '<div class="box-comment-actions">';
            $buttons .= '   <a href="'. get_bloginfo( 'url' ) .'/edita-comentario/' . $comment->comment_ID . '/" class="edit-comment-button button" rel="' . $comment->comment_ID . '">Editar</a>';
            $buttons .= '   <a href="'. get_bloginfo( 'url' ) .'/exclui-comentario/' . $comment->comment_ID . '/" class="remove-comment-button button" rel="' . $comment->comment_ID . '">Excluir</a>';
            $buttons .= '</div>';
        endif;
        $return = '
            <div class="comment-item" id="comment-'. $comment->comment_ID .'">
                <h3 class="comment-header"><span class="author"><a href="'. get_perfil_url( $comment->user_id ) .'">' . get_the_author_meta( 'user_login', $comment->user_id ) . '</a></span> &nbsp;|&nbsp; <span class="date">' . get_comment_date( PikiComm_dateformat, $comment->comment_ID ) . '</span></h3>
                <div class="comment-content"><p>'. nl2br( $comment->comment_content ) .'</p></div>
                <div class="comment-footer clearfix">
                    ' . do_shortcode( '[commentlike id="' . $comment->comment_ID . '"]' ) . '
                    '. $buttons .'
                </div>
            </div>
        ';
        return $return;
    }

    public static function exclui_comment(){

        // Verifica se é um POST
        Piki::check_http_method( 'POST', true );

        // Somente usuários logados podem editar comentários
        $user = wp_get_current_user();
        if( !$user->exists() ):
            Piki::error( 'Apenas usuários logados podem excluir seus comentários', 'comment_delete_no_logged' );
        endif;

        // ID do comentário postado
        $comment_ID = isset( $_POST['comment_ID'] ) ? (int) $_POST['comment_ID'] : false;
        if( !$comment_ID ):
            Piki::error( 'O ID do comentário não foi informado', 'comment_delete_no_logged' );
        endif;

        // Objeto do comentário
        $comment = get_comment( $comment_ID, ARRAY_A );
    
        // Se o comentário não existe
        if ( !$comment || is_null( $comment ) ):
            Piki::error( 'O comentário informado não existe', 'comment_no_exists' );
        endif;

        // Se o usuário não é o dono do comentário
        if( !$user->ID == $comment[ 'user_id' ] ):
            Piki::error( 'Somente o dono do comentário pode excluí-lo', 'comment_delete_not_owner' );
        endif;

        $delete = wp_delete_comment( $comment_ID, true );

        if( !$delete ):
            Piki::error( 'Erro inesperado', 'comment_inespered' );
        endif;

        Piki::return_json(array(
            'status' => true,
        ));
       
    }

    public static function edit_comment(){

        // Verifica se é um POST
        Piki::check_http_method( 'POST', true );

        // Somente usuários logados podem editar comentários
        $user = wp_get_current_user();
        if( !$user->exists() ):
            Piki::error( 'Apenas usuários logados podem editar seus comentários', 'comment_edit_no_logged' );
        endif;

        // ID do comentário postado
        $comment_ID = isset( $_POST['comment_ID'] ) ? (int) $_POST['comment_ID'] : false;
        // Conteúdo do Comentário
        $comment_text = isset( $_POST['comment'] ) ? trim( $_POST['comment'] ) : false;

        // Se o ID do comentário não foi postado
        if( !$comment_ID || !is_numeric( $comment_ID ) || $comment_ID == 0 ):
            Piki::error( 'O ID do post não foi informado', 'comment_no_posted_id_sent' );
        // Se o texto do comentário está vazio
        elseif( !$comment_text || empty( $comment_text ) ):
            Piki::error( 'O comentário não pode estar vazio', 'comment_exit_blank' );
        endif;        

        // Objeto do comentário
        $comment = get_comment( $comment_ID, ARRAY_A );
    
        // Se o comentário não existe
        if ( !$comment || is_null( $comment ) ):
            Piki::error( 'O comentário informado não existe', 'comment_no_exists' );
        endif;

        // Se o usuário não é o dono do comentário
        if( !$user->ID == $comment[ 'user_id' ] ):
            Piki::error( 'Somente o dono do comentário pode editá-lo', 'comment_edit_not_owner' );
        endif;

        // Se o texto não foi alterado
        if( $comment[ 'comment_content' ] == $comment_text ):
            Piki::return_json(array(
                'status' => true,
                'comment' => apply_filters( 'the_content', $comment_text ),
            ));
        endif;

        $comment[ 'comment_content' ] = $comment_text;
        $update = wp_update_comment( $comment );

        if( !$update ):
            Piki::error( 'Erro inesperado', 'comment_inespered' );
        endif;

        Piki::return_json(array(
            'status' => true,
            'comment' => apply_filters( 'the_content', $comment_text ),
        ));
       
    }

    public static function submit_comment(){

        // Verifica se é um POST
        Piki::check_http_method( 'POST', true );
        
        nocache_headers();
        $comment_post_ID = isset( $_POST['comment_post_ID'] ) ? (int) $_POST['comment_post_ID'] : false;

        // Se o ID do post não foi informado
        if( !is_numeric( $comment_post_ID ) || $comment_post_ID === 0 ):
            Piki::error( 'O ID do post não foi informado', 'comment_no_posted_id_sent' );
        endif;

        $post = get_post( $comment_post_ID );
        $post_status = get_post_status( $post );

        // Se o ID do post é inválido
        if( !$post || is_null( $post ) ):
            Piki::error( 'O ID do post informado é inválido', 'comment_posted_not_found' );
        endif;

        // Se o post está fechado para comentários
        if ( $post_status != 'publish' || !comments_open( $comment_post_ID ) ) {
            Piki::error( 'Este post não pode ser comentado.', 'comments_closed' );
        }

        // Usuário logado
        $user = wp_get_current_user();

        // Se precisa de login para comentar, e o usuário não estiver logado
        if( !$user->exists() && ( get_option( 'comment_registration' ) || 'private' == $post_status ) ):
            Piki::error( 'Você não tem permissão para comentar este post.', 'comments_closed' );
        endif;

        // Dados do comentário postados
        $commentdata = self::get_posted_values( $user );

        // Valida os dados postados
        $valid_data = self::validate( $user, $commentdata );
        if( is_string( $valid_data ) && $valid_data !== true ):
            Piki::error( $valid_data, 'value_error' );
        endif;

        // Insere o comentário
        $comment_id = wp_new_comment( $commentdata );
        $comment = get_comment( $comment_id );

        do_action( 'set_comment_cookies', $comment, $user );

        $html_comment = self::get_comment( $comment, $user );

        Piki::return_json(array(
            'status' => 'success',
            'comment' => $html_comment
        ));
    }

    public static function duplicated_trigger( $commentdata ){
        global $wp_query;
        if( $wp_query->get( "envia-comentario" ) == 'true' ):
           Piki::error( 'Você já postou este comentário', 'comment_duplicated' );
        endif;
    }

    public static function flood_trigger( $commentdata ){
        global $wp_query;
        if( $wp_query->get( "envia-comentario" ) == 'true' ):
           Piki::error( 'Você está postando comentários rápido demais. Aguarde um momento para enviar outro.', 'comment_duplicated' );
        endif;
    }

    public static function validate( $user, $values ){

        if ( get_option( 'require_name_email' ) && !$user->exists() ) {
            if ( 6 > strlen( $values[ 'comment_author_email'] ) || '' == $values[ 'comment_author' ] )
                return 'Preencha os campos obrigatórios (Nome, Email).';
            elseif ( !is_email( $values[ 'comment_author_email' ]))
                return 'Informe um endereço de email válido';
        }
        if ( '' == $values[ 'comment_content' ] )
            return 'Digite um comentário';

        return true;

    }

    public static function get_posted_values( $user ){

        $comment_post_ID      = isset( $_POST['comment_post_ID'] ) ? (int) $_POST['comment_post_ID'] : false;
        $comment_author       = ( isset($_POST['author']) )  ? trim(strip_tags($_POST['author'])) : null;
        $comment_author_email = ( isset($_POST['email']) )   ? trim($_POST['email']) : null;
        $comment_author_url   = ( isset($_POST['url']) )     ? trim($_POST['url']) : null;
        $comment_content      = ( isset($_POST['comment']) ) ? trim($_POST['comment']) : null;
        $comment_parent       =   isset($_POST['comment_parent']) ? absint( $_POST['comment_parent'] ) : 0;
        $comment_type = '';
        $user_id = 0;
        
        if ( $user->exists() ) {
            
            if ( empty( $user->display_name ) ):
                $user->display_name=$user->user_login;
            endif;
            $comment_author       = wp_slash( $user->display_name );
            $comment_author_email = wp_slash( $user->user_email );
            $comment_author_url   = wp_slash( $user->user_url );
            if ( current_user_can( 'unfiltered_html' ) ) {
                if ( !isset( $_POST['_wp_unfiltered_html_comment'] )
                    || ! wp_verify_nonce( $_POST['_wp_unfiltered_html_comment'], 'unfiltered-html-comment_' . $comment_post_ID )
                ) {
                    kses_remove_filters(); // start with a clean slate
                    kses_init_filters(); // set up the filters
                }
            }

            // Atribui o ID do usuário ao post
            $user_id = $user->ID;

        }
        
        return compact('comment_post_ID', 'comment_author', 'comment_author_email', 'comment_author_url', 'comment_content', 'comment_type', 'comment_parent', 'user_id' );

    }

} 

add_action( 'comment_flood_trigger', array( 'PikiComm', 'flood_trigger' ) );
add_action( 'comment_duplicate_trigger', array( 'PikiComm', 'duplicated_trigger' ) );
add_action( 'init', array( 'PikiComm', 'init' ) );
add_filter( 'query_vars', array( 'PikiComm', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiComm', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiComm', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiComm', 'flush_rules' ) );