<?php
define( 'PikiComm_dateformat', "d M Y" );

class PikiComm {

    public static function init() {
        add_shortcode( 'pikicomm', array(  'PikiComm', 'shortcode' ) );
    }

    public static function flush_rules(){   
        $rules = get_option( 'rewrite_rules' );
        if ( !isset( $rules[ 'envia-comentario' ] ) ):
            global $wp_rewrite;
            $wp_rewrite->flush_rules();
        endif;
    }

    public static function create_rewrite_rules() {
        global $wp_rewrite; 
        $new_rules[ 'edita-comentario' ] = 'index.php?edita-comentario=true';
        $new_rules[ 'exclui-comentario' ] = 'index.php?exclui-comentario=true';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    }

    // Adiciona variaveis de busca
    public static function add_query_vars( $qvars ) {
        $qvars[] = 'edita-comentario';
        $qvars[] = 'exclui-comentario';
        return $qvars;
    }
  
    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public static function template_redirect_intercept(){

        global $wp_query;
        
        if( $wp_query->get( 'envia-comentario' ) == 'true' ):

            echo '<pre>';
            echo 'fafasdfasd' . "\r\n";
            exit;
            
            self::submit_comment();
        elseif( $wp_query->get( 'edita-comentario' ) == 'true' ):
            self::edit_comment();
        elseif( $wp_query->get( 'exclui-comentario' ) == 'true' ):
            self::exclui_comment();
        endif;
    
    }

    // Arquivos
    public static function add_files(){
        // Scripts
        wp_enqueue_script( 'PikiComm-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
    }

    public static function get_form(){
        if ( comments_open() || pings_open() ):
            echo do_shortcode( '[pikiforms fid="comment"]' );
        endif;
    }

    // Listar comentários
    public static function list_comments(){

        $comments = get_comments(array( 'post_id' => get_the_ID() ));

        if( !empty( $comments ) ):
        
            echo '<div id="comments-list" class="clear">';
            
            foreach( $comments as $comment ):
                echo self::get_comment( $comment );
            endforeach;
            
            echo '</div>';

        endif;

    }

    // Get unique comment
    public static function get_comment( $comment, $user=false ){
        
        // User
        if ( !$user ):
            $user = wp_get_current_user();
        endif;

        $comment_note = false;
        if( $comment->comment_approved != '1' ):

            if( !is_super_admin() && ( !is_user_logged_in() || $comment->user_id != $user->ID ) ):
                return false;
            else:
                $comment_note = ( ( is_user_logged_in() && $comment->user_id == $user->ID ) ? 'Seu ' : 'Este' ) . ' comentário está aguardando moderação.';
            endif;

        endif;

        // Buttons
        $buttons = '';
        //if( $user->exists() && (int)$comment->user_id == (int)$user->ID ):
        //    $buttons  = '<div class="box-comment-actions">';
        //    $buttons .= '   <a href="'. get_bloginfo( 'url' ) .'/edita-comentario/' . $comment->comment_ID . '/" //class="edit-comment-button button" rel="' . $comment->comment_ID . '">Editar</a>';
        //    $buttons .= '   <a href="'. get_bloginfo( 'url' ) .'/exclui-comentario/' . $comment->comment_ID . '/" //class="remove-comment-button button" rel="' . $comment->comment_ID . '">Excluir</a>';
        //    $buttons .= '</div>';
        //endif;

        // Return
        $return = '
            <div class="comment-item" id="comment-'. $comment->comment_ID .'">
                <h4 class="comment-header"><span class="author">' . ucfirst( $comment->comment_author ) . '</span> &nbsp;|&nbsp; <span class="date">' . get_comment_date( PikiComm_dateformat, $comment->comment_ID ) . '</span></h4>
                <div class="comment-content">'. nl2br( $comment->comment_content ) .'</div>
                '. ( $comment_note ? '<em>'. $comment_note .'</em>' : '' ) .'
                <div class="comment-footer clearfix">
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
            Piki::error( 'Only logged in users can delete their comments.', 'comment_delete_no_logged' );
        endif;

        // ID do comentário postado
        $comment_ID = isset( $_POST['comment_ID'] ) ? (int) $_POST['comment_ID'] : false;
        if( !$comment_ID ):
            Piki::error( 'Comment ID was not entered.', 'comment_delete_no_logged' );
        endif;

        // Objeto do comentário
        $comment = get_comment( $comment_ID, ARRAY_A );
    
        // Se o comentário não existe
        if ( !$comment || is_null( $comment ) ):
            Piki::error( 'The comment you entered does not exist.', 'comment_no_exists' );
        endif;

        // Se o usuário não é o dono do comentário
        if( !$user->ID == $comment[ 'user_id' ] ):
            Piki::error( 'Only the owner of the comment can delete it.', 'comment_delete_not_owner' );
        endif;

        $delete = wp_delete_comment( $comment_ID, true );

        if( !$delete ):
            Piki::error( 'Unexpected error.', 'comment_inespered' );
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
            Piki::error( 'Only logged in users can edit your comments.', 'comment_edit_no_logged' );
        endif;

        // ID do comentário postado
        $comment_ID = isset( $_POST['comment_ID'] ) ? (int) $_POST['comment_ID'] : false;
        // Conteúdo do Comentário
        $comment_text = isset( $_POST['comment'] ) ? trim( $_POST['comment'] ) : false;

        // Se o ID do comentário não foi postado
        if( !$comment_ID || !is_numeric( $comment_ID ) || $comment_ID == 0 ):
            Piki::error( 'Post ID was not reported.', 'comment_no_posted_id_sent' );
        // Se o texto do comentário está vazio
        elseif( !$comment_text || empty( $comment_text ) ):
            Piki::error( 'Comment can not be empty.', 'comment_exit_blank' );
        endif;        

        // Objeto do comentário
        $comment = get_comment( $comment_ID, ARRAY_A );
    
        // Se o comentário não existe
        if ( !$comment || is_null( $comment ) ):
            Piki::error( 'The comment you entered does not exist.', 'comment_no_exists' );
        endif;

        // Se o usuário não é o dono do comentário
        if( !$user->ID == $comment[ 'user_id' ] ):
            Piki::error( 'Only the owner of the comment can edit it.', 'comment_edit_not_owner' );
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

    public static function duplicated_trigger( $commentdata ){
        global $wp_query;
        if( $wp_query->get( 'envia-comentario' ) == 'true' ):
           Piki::error( 'You have already posted this comment.', 'comment_duplicated' );
        endif;
    }

    public static function flood_trigger( $commentdata ){
        global $wp_query;
        if( $wp_query->get( 'envia-comentario' ) == 'true' ):
           Piki::error( 'You are posting comments too fast. Please wait a moment to submit another one.', 'comment_duplicated' );
        endif;
    }

    public static function get_posted_values( $user ){

        $comment_post_ID      = _post( 'comment_post_ID' );
        $comment_author       = _post( 'author', null );
        $comment_author_email = _post( 'email', null );
        $comment_author_url   = _post( 'url', null );
        $comment_content      = _post( 'comment', null );
        $comment_parent       = _post( 'comment_parent', 0 );
        $comment_type = '';
        $user_id = 0;
        
        if ( $user->exists() ) {
            
            if ( empty( $user->display_name ) ):
                $user->display_name = $user->user_login;
            endif;

            $comment_author       = wp_slash( $user->display_name );
            $comment_author_email = wp_slash( $user->user_email );
            $comment_author_url   = wp_slash( $user->user_url );
            
            if( current_user_can( 'unfiltered_html' ) ):
            
                if ( 
                    !isset( $_POST[ '_wp_unfiltered_html_comment' ] )
                    || 
                    ! wp_verify_nonce( $_POST['_wp_unfiltered_html_comment'], 'unfiltered-html-comment_' . $comment_post_ID )
                ):
                    kses_remove_filters(); // start with a clean slate
                    kses_init_filters(); // set up the filters
                endif;
            
            endif;

            // Atribui o ID do usuário ao post
            $user_id = $user->ID;

        }
        
        return compact(
            'comment_post_ID', 
            'comment_author', 
            'comment_author_email', 
            'comment_author_url', 
            'comment_content', 
            'comment_type', 
            'comment_parent', 
            'user_id'
        );

    }

    // Validando o texto
    public static function CommentValidate( $text ){

        // List of words and phrases
        $settings = get_option( 'pikicomm_options' );
        
        // Bad words
        $wrongs = array();

        // Searching by Words
        $blkwords = _array_get( $settings, 'blacklist_words' );
        if( $blkwords ):

            $blkwords = preg_split( "/\r\n|\n|\r/", $blkwords );
        
            $textValue = $text;
            $testText = explode( ' ', strtolower( $text ) );
            $result = explode( ' ', $text );
            $exact_word = null;

            // Searching by words
            $words = explode( ' ', $text );
            foreach( $words as $kw => $word ):
                $wordTest = strtolower( $word );            
                if( in_array( $wordTest, $blkwords ) ){
                    array_push( $wrongs, $word );
                    $result[ $kw ] = '<u>' . $words[ $kw ] . '</u>';
                    $testText[ $kw ] = '<u>' . $testText[ $kw ] . '</u>';
                }
            endforeach;

            $result = implode( ' ', $result );
            $testText = implode( ' ', $testText );

        endif;
                        
        // Searching by phrases
        $blkphrases = _array_get( $settings, 'blacklist_phrases' );
        if( $blkphrases ):

            $blkphrases = preg_split( "/\r\n|\n|\r/", $blkphrases );

            foreach ( $blkphrases as $kf => $phrase ):
                $praseTest = strtolower( $phrase );
                $windex = strpos( $testText, $praseTest );            
                if ( $windex > -1 ):
                    array_push( $wrongs, $phrase );
                    $exact_word = substr( $result, $windex, strlen( $phrase ) );
                    $sides = explode( $exact_word, $result );
                    $result = implode( '<u>' . $exact_word . '</u>', $sides );
                endif;
            endforeach;

        endif;

        if( count( $wrongs ) > 0 ){
            return array(
                'text' => $result,
                'words' => $wrongs,
            );
        }

        return true;

    }


    // Validação do formulário
    public static function formValida( $validation, $settings, $posted ){

        // Se ainda existirem erros do form anterior
        if( $validation[ 'status' ] != 'success' || !empty( $validation[ 'errors' ] ) || $settings[ 'key' ] != 'comment' ):
            return $validation;
        endif;

        // Comentário
        $comment = _array_get( $posted, 'comment' );

        // Field email
        $field = PikiFields::extract_field( $settings[ 'fields' ], 'comment' );
        
        // Validação do comentário
        $badwords = PikiComm::CommentValidate( $comment );
        if( $badwords !== true):

            $error = array(
                'field' => $field,
                'error' => __( 'O texto é inválido.', 'piki' ),
            );
            $validation[ 'errors' ] = array( $error );

        else:

            // Submit value
            $posted[ 'submit' ] = 'Publicar comentário';
            // Cookies
            $cookies = _array_get( $posted, 'cookies' ) == 'on';
            // Cookies
            if( $cookies ):
                $posted[ 'wp-comment-cookies-consent' ] = 'yes';
            endif;            

            // Send comment
            $comment = wp_handle_comment_submission( wp_unslash( $posted ) );
            if( is_wp_error( $comment ) ):
                
                $data = intval( $comment->get_error_data() );
                if( !empty( $data ) ):
                    $_error = $comment->get_error_message();
                else:
                    $_error = 'O comentário não foi enviado. Por favor, tente novamente.';
                endif;

                $error = array(
                    'field' => $field,
                    'error' => __( $_error, 'piki' ),
                );
                $validation[ 'errors' ] = array( $error );

            else:

                // Cookies
                $user = wp_get_current_user();
                do_action( 'set_comment_cookies', $comment, $user, $cookies );

            endif;

        endif;
        
        return $validation;
    
    }

    // Seta o tipo de data do formulário
    public static function formFields( $fields, $settings ){

        if( $settings[ 'key' ] == 'comment' ):

            $current_author = wp_get_current_commenter();
            if( !empty( $current_author ) ):
                $fields[ 'author' ][ 'value' ] = $current_author[ 'comment_author' ];
                $fields[ 'email' ][ 'value' ] = $current_author[ 'comment_author_email' ];
            endif;

        endif;
        
        return $fields;    
    }

    public static function default_fields( $fields ){ 
        unset( $fields[ 'url' ] );
        return $fields;
    }

} 

// Altera dados dos formulários
add_filter( 'pikiform_valida', array( 'PikiComm', 'formValida' ), 10, 3 );
// Form settings change
add_filter( 'pikiform_fields', array( 'PikiComm', 'formFields' ), 10, 2 );
// Defaut fields form default comment form
add_filter( 'comment_form_default_fields', array( 'PikiComm', 'default_fields' ) );
add_action( 'comment_flood_trigger', array( 'PikiComm', 'flood_trigger' ) );
add_action( 'comment_duplicate_trigger', array( 'PikiComm', 'duplicated_trigger' ) );
add_action( 'init', array( 'PikiComm', 'init' ) );
add_filter( 'query_vars', array( 'PikiComm', 'add_query_vars' ) );
add_action( 'generate_rewrite_rules', array( 'PikiComm', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiComm', 'template_redirect_intercept' ) );
add_action( 'wp_loaded', array( 'PikiComm', 'flush_rules' ) );

// Form settings
function pikiform_comment_settings(){
    return array(
        'key' => 'comment',
        'title' => 'Fazer um comentário',
        'error_general' => false,
        'error_message' => 'Ops! Revise os dados marcados.',
        'success_message' => '<h3>Seu comentário foi enviado com sucesso!</h3><p>Avaliaremos o mais rápido possível.</p>',
        'submit_button_label' => 'Enviar comentário',
        'public' => true,
        'post_type' => false,
        'post_type_active' => false,
        'labels_inside' => true,
    );
}
function pikiform_comment_fields(){
    return array(
        'author' => array(
            'machine_name' => 'author',
            'ftype' => 'text',
            'label' => 'Nome',
            'attributes' => array( 'placeholder' => 'Seu nome' ),
            'required' => true,
            'minlength' => 3,
            'messages' => array(
                'required' => 'Digite seu nome',
                'minlength' => 'Mínimo de 3 caractéres',
            )
        ),
        'email' => array(
            'machine_name' => 'email',
            'ftype' => 'email',
            'label' => 'E-mail',
            'attributes' => array( 'placeholder' => 'Seu E-mail' ),
            'required' => true,
            'messages' => array(
                'required' => 'Digite seu email',
                'invalid' => 'O email é inválido',
            )
        ),
        'comment' => array(
            'machine_name'   => 'comment',
            'label' => 'Comentário',
            'attributes' => array( 'placeholder' => 'Digite aqui seu comentário' ),
            'ftype' => 'textarea',
            'required' => true,
            'minlength' => 10,
            'messages' => array(
                'required' => 'Digite seu comentário',
                'minlength' => 'Mínimo de 10 caractéres',
            )
        ),
        'cookies' => array(
            'machine_name'   => 'cookies',
            'label' => 'Salvar meus dados neste navegador para a próxima vez que eu comentar.',
            'ftype' => 'boolean',
        ),
        'comment_post_ID' => array(
            'machine_name'   => 'comment_post_ID',
            'ftype' => 'hidden',
            'value' => get_the_ID()
        ),
        'comment_parent' => array(
            'machine_name'   => 'comment_parent',
            'ftype' => 'hidden',
            'value' => '0',
        ),
    );
}

// Apenas ADMIN
if( is_admin() ):
    // Página de administração
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;