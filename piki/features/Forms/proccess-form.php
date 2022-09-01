<?php
class ProccessForm {

    var $posted;
    var $settings;

    function __construct( $form_key, $item_id = false, $check_security = true ){

        // Dados postados
        $this->posted = ProccessForm::getPostedValues( $form_key );
        
        // Configurações do formulário
        $this->settings = PikiForms::get_form_settings(array( 
            'key' => $form_key, 
            'posted' => $this->posted,
            'item' => $item_id,
        ));        
        
        // Ítem postado
        if( !empty( $item_id ) ):
            $this->settings[ 'item' ] = $item_id;
        else:
            $this->settings[ 'item' ] = $this->get_posted_item();
        endif;
        
        // Tabela
        if( !isset( $this->settings[ 'table' ] ) ):
            $this->settings[ 'table' ] = false;
        endif;
        
        // Se o ítem vai ser atualizado, ou um novo será um novo
        $this->settings[ 'action' ] = isset( $this->settings[ 'item' ] ) && $this->settings[ 'item' ] !== false ? 'edit' : 'insert';

        // Savind draft
        $this->settings[ 'saving_draft' ] = on( $_POST, 'save_draft' );

    }
   
    // Processa o formulário
    public static function proccess_form( $form_key, $item_id = false ){

        // Instance class
        $Proccess = new ProccessForm( $form_key, $item_id );

        // Validation
        $Proccess->valida();

        // Submete os dados
        $Proccess->submit();

    }

    // Validação
    public function valida( $security = true ){
        
        // Verify recaptcha and nonce
        if( $security ):
            $this->checkSecurity();
        endif;

        // Classe de validação
        $valida = new valida( $this->settings );

        // Validação dos campos
        if( $this->settings[ 'stepped' ] ):

            // Chave do passo postado
            $posted_step = _post( 'form_step' );
            
            // Verifica se o passo existe
            if( !$posted_step || !isset( $this->settings[ 'steps' ][ $posted_step ] ) ):
                Piki::Error( 'O passo ' . $posted_step . ' não existe no formulário ' . $this->settings[ 'key' ] );
            endif;
            
            // Setps status
            $this->settings[ 'steps' ] = PikiFields::distributeFields( $this->settings[ 'steps' ], $this->settings[ 'fields' ] );

            $validation = array();
            foreach( $this->settings[ 'steps' ] as $step_key => $step ):
                // Seta apenas os campos do passo para validação
                $valida->fields = $step[ 'fields' ];
                $validation[ $step_key ] = $valida->get_validation();
            endforeach;
            
            // Permite que outros plugins alterem a validação
            $validation = apply_filters( 'pikiform_valida', $validation, $this->settings, $this->posted );
            
            // Verifica se existem passos com erros
            $have_errors = false;
            foreach ( $this->settings[ 'steps' ] as $step_key => $step ):
                // Se exite um erro, ativa a chave que reportará os mesmos
                if( $validation[ $step_key ][ 'status' ] == 'error' ):
                    $have_errors = true;
                endif;
            endforeach;
            
            // Salva os campos do passo postado
            //if( !empty( $validation[ $posted_step ][ 'valids' ] ) && is_object( $settings[ 'item' ] ) ):
            //    $settings_to_save = $this->settings;
            //    $settings_to_save[ 'fields' ] = $validation[ $posted_step ][ 'valids' ];
            //    $saved = self::save_data( $settings_to_save, $this->posted );
            //endif;
            
            // Se há erros
            if( $have_errors ):

                // Permite que outros plugins façam algo antes de reportar os erros
                do_action( 'pikiform_error', $validation, $this->settings, $this->posted );

                // Retorno do resultado
                Piki::return_json(array(
                    'status' => 'error',
                    'error_type' => 'valida',
                    'errors' => $validation
                ));
            
            endif;
        
        else:

            // Valida o form sem passo
            $validation = $valida->get_validation();
            
            if( !empty( $validation[ 'errors' ] ) ):
                $validation[ 'status' ] = 'error';
            endif;
            
            // Mostra os erros, se existirem
            if( $validation[ 'status' ] === 'error' ):
                
                // Salva os campos válidos no caso de edição
                //if( !empty( $validation[ 'valids' ] ) && is_object( $settings[ 'item' ] ) ):
                    //$settings_to_save = $this->settings;
                    //$settings_to_save[ 'fields' ] = $validation[ 'valids' ];
                    //$saved = self::save_data( $settings_to_save, $this->posted );
                    //$settings[ 'item' ] = get_post( $saved[ 'ID' ] );
                //endif;

               //// Permite que outros plugins façam algo antes de reportar os erros
                do_action( 'pikiform_error', $validation, $this->settings, $this->posted );
                Piki::return_json(array(
                    'status'    => 'error',
                    'error_type' => 'valida',
                    'errors'    => $validation[ 'errors' ]
                ));
                
            endif;

        endif;

        return true;

    }

    // Check for security
    private function checkSecurity(){

        if( !session_id() ) session_start();

        $fkey = _array_get( $this->settings, 'key' );

        // Token do formulário
        $token = isset( $_POST[ $fkey ][ 'token' ] ) ? $_POST[ $fkey ][ 'token' ] : false;
        if( empty( $token ) || !PikiForms::check_token( $fkey, $token ) ):
            Piki::error( 'Desculpe, houve uma falha na solicitação' . ( WP_DEBUG ? ' (nonce)' : '' ) . '. <br />Por favor, recarregue a página e tente novamente.' );
        endif;

        // Captcha
        $captcha = _array_get( $this->settings, 'recaptcha_key' );
        if( $captcha ):

            $token = _array_get( $this->posted, 'recaptcha' );

            if( empty( $token ) ):
                Piki::error( 'Desculpe, houve uma falha na solicitação' . ( WP_DEBUG ? ' (captcha empty)' : '' ) . '. <br />Por favor, recarregue a página e tente novamente.' );
            endif;

            // Verify session
            $in_session = _array_get( $_SESSION, 'form_' . $fkey . '_captcha' );
            if( !$in_session || $in_session != $token ):

                $secret = _array_get( $this->settings, 'recaptcha_secret' );
                $response = json_decode(file_get_contents( 'https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $token ));

                if( !_object_get( $response, 'success' ) ):
                   
                    Piki::error( 'Desculpe, houve uma falha na solicitação' . ( WP_DEBUG ? ' (captcha invalid)' : '' ) . '. <br />Por favor, recarregue a página e tente novamente.' );
                else:
                
                    $_SESSION[ 'form_' . $fkey . '_captcha' ] = $token;
                
                endif;

            endif;

        endif;

        // Check if user can
        PikiForms::user_can( $this->settings );

    }
    
    // Coletando dados postados
    public static function getPostedValues( $form_key ){

        // Form values
        $form_values = _post( $form_key, array() );

        // Files
        $files = _array_get( $_FILES, $form_key, array() );
        if( !empty( $files ) ):
            $files = self::extract_file( $files );
            $form_values = self::array_merge_recursive_distinct( $form_values, $files );
        endif;

        // Form step
        $form_step = _post( 'form_step' );
        if( $form_step ):
            $form_values[ 'form_step' ] = $form_step;
        endif;
        
        // Campos nativos dos formulários do Admin
        if( isset( $_POST[ '_wp_http_referer' ] ) ):
            
            $fields = PikiForms::get_form_fields( [ 'key' => $form_key ] );

            // Extrai os campos
            $natives = PikiFields::extract_field( 
                $fields, 
                [ 'title', 'body', 'excerpt' ], 
                'ftype', 
                false 
            );

            // Se existem campos nativos, inseriomos no array de valores postados
            if( $natives ):
                
                foreach( $natives as $kf => $field ):

                    // Campo nativo
                    $field = reset( $field );

                    // Native posted name
                    $native_name = $field[ 'ftype' ] == 'excerpt' ? $field[ 'ftype' ] : 'post_' . $field[ 'ftype' ];

                    // Inserindo valor
                    if( isset( $_POST[ $native_name ] ) ):
                        $form_values[ $field[ 'machine_name' ] ] = $_POST[ $native_name ];
                    endif;

                endforeach;

            endif;

        endif;

        if( empty( $form_values ) ):
            return false;
        endif;

        return $form_values;

    }

    // Faz a submissão do form
    private function submit(){
        
        $return = array();
        $type_error = '';
                
        // Ação passada pelo form
        $posted_action = $_POST[ 'form_action' ];

        // Actual post status
        $status = isset( $this->settings[ 'item' ] ) ? _object_get( $this->settings[ 'item' ], 'post_status' ) : false;
        
        // Stepped form
        if( $this->settings[ 'stepped' ] ):
            
            // Passo postado
            $posted_step = _post( 'form_step' );
                        
            // Último passo
            $steps_keys = array_keys( $this->settings[ 'steps' ] );
            $last_step = end( $steps_keys );
            
            // Faz alguma ação depois de um passo
            do_action( 'pikiform_submit_step', $this->settings, $this->posted, $posted_step );
           
            // Se não é o último passo, retorna success
            if( $last_step != $posted_step ):
                Piki::success();
            endif;
        
        endif;
        
        // Redirecionamento
        $success_redirect = ProccessForm::getSuccessRedirect( $this->settings, $status );

        // Mensagem
        if( $this->settings[ 'action' ] != 'edit' || ( $this->settings[ 'can_save_draft' ] && $status == 'draft' && !$this->settings[ 'saving_draft' ] ) ):
            $success_message = _array_get( $this->settings, 'success_message', 'Cadastro realizado com sucesso' );
        else:
            $success_message = _array_get( $this->settings, 'edit_success_message', 'Dados atualizados com sucesso' );
        endif;

        // Se a ação for para publicar o post
        if( $this->settings[ 'data_type' ] == 'post' && $posted_action == 'publish' ):
            
            // Publica o post
            ProccessForm::publish_post( $this->settings[ 'item' ] );
            
            // Envia o email
            if( on( $this->settings, 'send_email' ) ):
                $email_sent = ProccessForm::send_email( $this->settings, $this->posted );
            endif;
            
            // Shortcodes messages
            ProccessForm::message_shortcodes( $success_message, $this->settings, $this->posted );

            // Mensagem de sucesso
            Piki::success( $success_message );
        
        endif;

        // Gravar em banco
        if( 
        // Posts
        ( on( $this->settings, 'post_type_active' ) && !empty( $this->settings[ 'post_type' ] ) )
        ||
        // Custom 
        ( $this->settings[ 'data_type' ] == 'custom' && !empty( $this->settings[ 'table' ] ) ) 
        ):

            // Salvando os dados
            $saving = ProccessForm::save_data( $this->settings, $this->posted );

            if( !is_array( $saving ) ):
                Piki::error( 'Ocorreu um problema inesperado. Por favor, tente mais tarde', $saving[ 'type_error' ] );
            endif;

            // Guardamos o ítem salvo
            if( $this->settings[ 'data_type' ] === 'custom' ):
                $this->settings[ 'item' ] = get_custom( $saving[ 'ID' ], $this->settings[ 'table' ] );
            else:
                $this->settings[ 'item' ] = get_post( $saving[ 'ID' ] );
            endif;

            // If is moderate mode, lock on edition
            if( on( $this->settings, 'moderate' ) ):
                ProccessForm::checkModeration( $this->settings[ 'item' ], $this->settings );
            endif;

        // Settings forms
        elseif( on( $this->settings, 'isSettingsForm' ) ):

            // Old options
            $return = get_option( $this->settings[ 'key' ] );
            if( !empty( $return ) ):
                $return = unserialize( $return );
            else:
                $return = [];
            endif;           

            //prepare_meta
            foreach( $this->settings[ 'fields' ] as $fname => $_field ):

                $_field_value = _array_get( $this->posted, $fname );
            
                // Custom database format
                if( method_exists( $_field[ 'ftype' ], 'prepare_meta' ) ):
                
                    $return[ $fname ] = call_user_func( array( $_field[ 'ftype' ], 'prepare_meta' ), $_field, $_field_value, $this->settings[ 'key' ] );
                
                // Not formated data
                else:
                
                    $return[ $fname ] = $_field_value;
                
                endif;
            
            endforeach;

            // Values on database
            update_option( $this->settings[ 'key' ], serialize( $return ) );

        endif;
        
        // Se a ação é pra pré visualizar o post
        if( $posted_action == 'preview' ):

            global $form_settings;
            $form_settings = $this->settings;
            
            Piki::search_template( 'piki-forms-preview', str_replace( '_', '-', $this->settings[ 'key' ] ), Piki::path( __FILE__ ) );
            exit();
        
        endif;

        // Se o form deve disparar um email
        if( on( $this->settings[ 'email' ], 'send' ) && $this->settings[ 'action' ] == 'insert' ):
            $email_sent = ProccessForm::send_email( $this->settings, $this->posted );
        endif;
        
        // Ações após a submissão
        do_action( 'pikiform_submit', $this->settings, $this->posted );
        
        // Shortcodes messages
        ProccessForm::message_shortcodes( $success_message, $this->settings, $this->posted );
        
        $response = array(
            'message' => $success_message,
            'redirect' => $success_redirect,
            'action' => $this->settings[ 'action' ],
        );
        
        if( isset( $this->settings[ 'item' ] ) ):
            $response[ 'post' ] = $this->settings[ 'item' ];
        endif;
       
        Piki::success( $response );
    
    }

    // Get success redirect
    public static function getSuccessRedirect( $settings, $status ){
       
        $return = false;
        
        // Redirect to draf save
        if( on( $settings, 'saving_draft' ) ):
            $return = _array_get( $settings, 'draft_succes_redirect' );
        endif;
        
        // General redirects
        if( empty( $return ) ):
            if( $settings[ 'action' ] == 'edit' && $status !== 'draft' ):
                $return = _array_get( $settings, 'edit_success_redirect' );
            else:
                $return = _array_get( $settings, 'success_redirect' );
            endif;
        endif;
        
        if( !empty( $return ) ):
            if( strpos( $return, '/' ) === 0 ):
                $return = get_site_url( NULL, $return );
            else:
                $return = Piki::http( $return );
            endif;
        endif;

        $return = apply_filters( 'custom_form_redirect', $return, $settings );

        return $return;

    }

    // Check post moderation
    public static function checkModeration( $post, $settings ){

        global $wpdb;

        // Not pending posts
        if( $post->status === 'pending' ):
            return;
        endif;

        // User
        $user = wp_get_current_user();

        // Let administrators and editors
        $can = array_intersect( array( 'administrator', 'editor' ), $user->roles );

        // Se um rascunho está sendo enviado para aprovação, ou se um post foi publicado, mas precisa ser moderado, o tornamos pendente de moderação.
        if( ( $post->post_status == 'publish' && empty( $can ) ) || ( $post->post_status == 'draft' && $settings[ 'action' ] == 'edit' && $settings[ 'can_save_draft' ] && !$settings[ 'saving_draft' ] ) ):

            // update event based on status
            $wpdb->query($wpdb->prepare(
                "UPDATE $wpdb->posts SET post_status = 'pending' WHERE ID=%d",
                $post->ID
            ));

        endif;

    }

    // Faz o replace dos shortcodes
    public static function message_shortcodes( &$message, $settings, $posted, $renderize = true ){

        // Replace home URLs
        $message = str_replace( '[home]', get_bloginfo( 'url' ), $message );
        
        // Data
        $post = isset( $settings[ 'item' ] ) ? $settings[ 'item' ] : false;
        preg_match_all('/\[\w*\]/', $message, $matches );
        $rpcts = array_shift( $matches );
        
        // Se não existem códigos
        if( empty( $rpcts ) ):
            return $message;
        endif;
        $user = wp_get_current_user();
        foreach ( $rpcts as $key => $shortcode ) {
            
            $cleaned = str_replace( array( '[', ']' ), '', $shortcode );
            
            // Dados dos campos
            if( strpos( $shortcode, '[field_' ) === 0 ):
                
                $fieldname = str_replace( 'field_', '', $cleaned );
               
                $field = PikiFields::extract_field( $settings[ 'fields' ], $fieldname );
                
                // Se o shortcode está incorreto, e não representa um campo válido
                if( !$field ) continue;
                
                // Valor do banco
                if( !!$post ):
                    $toinsert = PKMeta::get_field_value( $field, $post->ID );
                
                // Valor postado
                else:
                    $toinsert = PikiField::get_posted_value( $field, $settings[ 'fields' ], $posted );
                endif;

                // Set field value
                $field[ 'value' ] = $toinsert;
                
                // Renderização
                if( $renderize ):
                    if( method_exists( $field[ 'ftype' ], 'renderize_values' ) ):
                        $toinsert = call_user_func( array( $field[ 'ftype' ], 'renderize_values' ), $field, $toinsert );
                    else:
                        $toinsert = is_array( $toinsert ) ? array_shift( $toinsert ) : $toinsert;
                    endif;
                endif;

                // Faz a substituição
                $message = str_replace( $shortcode, $toinsert, $message );

            // Dados do usuário
            elseif( strpos( $shortcode, '[user_' ) === 0 ):
                
                $message = str_replace( $shortcode, $user->data->$cleaned, $message );
            
            endif;

        }
    }

    // Publica um post
    public static function publish_post( $post ){

        if( !$post ):
        
            Piki::error( array( 'O post não existe', 'no_post_id' ) );
        
        elseif( !current_user_can( 'publish_' . $post->post_type . 's', $post->ID ) ):
        
            Piki::error( array( 'Você não tem permissão para publicar este post', 'permission' ) );
        
        endif;
        
        $to_update = array(
            'ID' => $post->ID,
            'post_status' => 'publish'
        );
        return wp_update_post( $to_update );
        
    }

    // Recupera o ítem postado
    public function get_posted_item(){

        $item_id = _post( 'item_id' );
        if( (int)$item_id < 1 ):
            return false;
        endif;            

        $data_table = _array_get( $this->settings, 'table', null );
        
        $item = PKMeta::db_data( $item_id, $this->settings[ 'fields' ], $this->settings[ 'data_type' ], $data_table );
                
        if( !$item || empty( $item ) || is_null( $item ) ):
            return false;
        endif;
        
        return $item;

    }

    // Salva o dados do formulário
    public static function save_data( $settings, $posted ){

        global $wpdb;
                
        // Permite que outros plugins alterem as configurações antes de serem inseridos no banco
        $settings = apply_filters( 'pikiform_presave_settings', $settings, $posted );
        
        // Permite que outros plugins alterem os dados antes de serem inseridos no banco
        $posted = apply_filters( 'pikiform_presave_posted', $posted, $settings );
                
        // Insert
        if( empty( $settings[ 'item' ] ) ):
            
            $action = 'insert';

            // Status
            $status = 'publish';
            if( on( $settings, 'saving_draft' ) ):
                $status = 'draft';
            elseif( on( $settings, 'preview' ) || on( $settings, 'moderate' )  ):
                $status = 'pending';
            endif;     

            // User ID
            $owner = get_current_user_id();

            // Cria o ítem
            switch( $settings[ 'data_type' ] ):

                // Custom
                case 'custom':

                    // Cria o ítem
                    $wpdb->insert( 
                        $wpdb->prefix . $settings[ 'table' ], 
                        array( 'created' => date( 'Y-m-d H:i:s' ) ), 
                        array( '%s' ) 
                    );
                    
                    // ID do ítem criado
                    $item_id = $wpdb->insert_id;
                    
                    // Recupera o ítem criado
                    $settings[ 'item' ] = $wpdb->get_row($wpdb->prepare(
                        "SELECT * FROM $wpdb->prefix" . $settings[ 'table' ] . " WHERE ID = %d",
                        $item_id
                    ));

                break;

                 // Post
                default:

                    // Campo de título
                    $ftitle = PikiFields::extract_field( $settings[ 'fields' ], 'title', 'ftype', true );
                    $title = PikiField::get_posted_value( $ftitle, $settings[ 'fields' ], $posted );

                    // Novo post
                    $new_item = array(
                        'post_title' => $title,
                        'post_type' => $settings[ 'post_type' ],
                        'post_status' => _array_get( $settings, 'insert_status', $status ),
                        'post_author' => $owner,
                        'comment_status' => 'closed',
                    );

                    // Body
                    $fbody = PikiFields::extract_field( $settings[ 'fields' ], 'body', 'ftype', true );
                    if( $fbody ):
                        $new_item[ 'post_content' ] = PikiField::get_posted_value( $fbody, $settings[ 'fields' ], $posted );
                    endif;

                    // Excerpt
                    $fexcerpt = PikiFields::extract_field( $settings[ 'fields' ], 'excerpt', 'ftype', true );
                    if( $fexcerpt ):
                        $new_item[ 'post_excerpt' ] = PikiField::get_posted_value( $fexcerpt, $settings[ 'fields' ], $posted );
                    endif;
                    
                    // Parent
                    $parent = isset( $_POST[ 'item_parent' ] ) && (int)$_POST[ 'item_parent' ] > 0 ? $_POST[ 'item_parent' ] : false;
                    if( $parent ):
                        $new_item[ 'post_parent' ] = $parent;
                    endif;
                    
                    // Insert the post into the database
                    $return = wp_insert_post( $new_item, true );
                    if( is_wp_error( $return ) ){
                        Piki::error( $return->get_error_message() );
                    }

                    // Item
                    $settings[ 'item' ] = get_post( $return );

                break;
           
           endswitch;
            
        // Edition
        else:
            
            // Action
            $action = 'edit';

            // Edita o ítem
            switch( $settings[ 'data_type' ] ):
                
                // Custom data type
                case 'custom':
                    $update = $wpdb->update( 
                        $wpdb->prefix . $settings[ 'table' ], 
                        array( 'modified' => date( 'Y-m-d H:i:s' ) ), 
                        array( 'ID' => $settings[ 'item' ]->ID ), 
                        array( '%s' ), 
                        array( '%d' )
                    );
                break;
                
                // Post
                default:

                    $_post_data = array(
                        'ID' => $settings[ 'item' ]->ID
                    );

                    // Campos nativos
                    foreach( array( 'title' => 'post_title', 'body' => 'post_content', 'excerpt' => 'post_excerpt' ) as $ftype => $column ):

                        $_field = PikiFields::extract_field( $settings[ 'fields' ], $ftype, 'ftype', true );
                        if( $_field ):
                            
                            $_value = PikiField::get_posted_value( $_field, $settings[ 'fields' ], $posted );
                            if( !empty( $_value ) ):
                                $_post_data[ $column ] = $_value;
                            endif;
                        
                        endif;

                    endforeach;

                    wp_update_post( $_post_data );
                
                break;

            endswitch;
        
        endif;

        // Remove os valores antigos
        if( $action == 'edit' ):
            PKMeta::delete_post_meta( $settings[ 'item' ]->ID, $settings, $action );
        endif;

        // Salva os valores
        $saved = PKMeta::save_post_meta( 
            $settings[ 'item' ]->ID, // ID do ítem
            $settings, // Fields
            $posted, // Data postada
            $action // Action
        );
        
        // Retorno
        $return = array( 
            'ID' => $settings[ 'item' ]->ID,
            'item' => $settings[ 'item' ]->ID,
            'action' => $action,
        );

        if( $settings[ 'data_type' ] === 'post' ):
            $return[ 'post' ] = $settings[ 'item' ];
        endif;

        // Action por outros plugins
        do_action( 'pikiform_saved', $settings[ 'item' ]->ID, $settings, $posted );

        return $return;

    }

    // Busca um campo padrão
    public static function search_default_field( $fields, $values, $ftype ){
        foreach( $fields as $key => $field ):
            if( $field[ 'ftype' ] == 'fieldset' ):
                foreach ( $field[ 'subfields' ] as $subkey => $subfield ) {
                    if( $subfield[ 'ftype' ] == $ftype ):
                        return $values[ $key ][ $subkey ][ 0 ];
                    endif;
                }
            elseif( $field[ 'ftype' ] == $ftype ):
                return $values[ $key ];
            endif;
        endforeach;
        return false;
    }


    public static function send_email( $settings, $posted ){
        
        // Defaults
        $email_configs = $settings[ 'email' ];
        $email_configs[ 'content' ] = '';

        // Email de destino
        $email_configs[ 'to' ] = trim( str_replace( ' ', '', $email_configs[ 'to' ] ) );
        if( $email_configs[ 'to' ] && $email_configs[ 'to' ] != '' ):
            self::message_shortcodes( $email_configs[ 'to' ], $settings, $posted, false );
        endif;
        
        // Reply To
        if( isset( $email_configs[ 'replyto' ] ) && $email_configs[ 'replyto' ] != '' ):
            self::message_shortcodes( $email_configs[ 'replyto' ], $settings, $posted, false );
        else:
            $email_configs[ 'replyto' ] = false;
        endif;

        // Sender
        if( strpos( $email_configs[ 'sender' ], '[' ) === 0 ):
            self::message_shortcodes( $email_configs[ 'sender' ], $settings, $posted, false );
        endif;
        
        // Assunto do email
        if( $email_configs[ 'subject' ] == '' ):
            $email_configs[ 'subject' ] = get_option( 'blogname' );
        endif;
        self::message_shortcodes( $email_configs[ 'subject' ], $settings, $posted, false );

        // Conteúdo default para o envio do email
        $email_configs[ 'content' ] = show::format_for_email( $settings, $posted );
        
        // Permite que outros plugins modifiquem o conteúdo do email
        $email_configs = apply_filters( 'pikiforms_email_configs', $email_configs, $settings, $posted );

        do_action( 'pikiforms_send_email', $email_configs, $settings, $posted );

        return Piki::mail( $email_configs[ 'to' ],  $email_configs[ 'subject' ],  $email_configs[ 'content' ], $email_configs[ 'sender' ],  $email_configs[ 'replyto' ] );
        
    }

    public static function exclude_item( $post_id, $post_type ){
        global $wpdb;
        // Verifica se o usuário pode excluir o conteúdo
        if( !current_user_can( 'delete_' . $post_type . 's', $post_id ) ):
            Piki::error( 'Você não tem permissão para excluir este conteúdo.' );
        endif;
        // URL de redirecionamento
        $redirect = false;
        // ID do post do formulário
        $pikiform_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key = 'ptype' AND meta_value='%s' ORDER BY post_id DESC", $post_type ));
        // Se há realmente um ID para o formulário, buscamos a url customizada
        if( $pikiform_id && !is_null( $pikiform_id ) ):
            $custom_url = get_post_meta( $pikiform_id, 'pikiform_exclude_redirect', true );
            if( $custom_url != '' ):
                $redirect = str_replace( "%home%", get_bloginfo( 'url' ), $custom_url );
            endif;
        endif;
        // Se não existe uma custom URL, enviaos para a listagem padrão de posts
        if( !$redirect ):
            $redirect = get_post_type_archive_link( $post_type );
        endif;
        // Remove o contéudo
        wp_delete_post( $post_id );
        // Mensagem de sucesso
        Piki::success( 'O conteúdo foi removido com sucesso.', $redirect );
    }

    // Remove um post
    public static function delete_post( $post_id ){
        $post = get_post( $post_id );
        if( is_null( $post ) || $post->post_type != PikiForms_ptype ):
            return;
        endif;
        parent::disable_post_type( get_post_type( $post->ID ) );
    }

    // Extract files fields values
    public static function extract_file( array $_files, $top = TRUE ){        
        $keys = array_keys( $_files );
        $return = array();
        foreach( $_files as $prop => $file ):
            $organized = self::setAllArray( $file, $prop );
            $return = self::array_merge_recursive_distinct( $return, $organized );
        endforeach;
        return $return;
    }
    // Set all array items as array
    public static function setAllArray( $items, $key ){
        foreach( $items as $i => &$item ):
            if( is_array( $item ) ):
                $item = self::setAllArray( $item, $key );
            else:
                $item = array( $key => $item  );
            endif;
        endforeach;
        return $items;
    }
    // Merge recursive distinct
    public static function array_merge_recursive_distinct ( array &$array1, array &$array2 ){
        $merged = $array1;
        foreach ( $array2 as $key => &$value ):
            if ( is_array ( $value ) && isset ( $merged [$key] ) && is_array ( $merged [$key] ) ):
                $merged[$key] = self::array_merge_recursive_distinct( $merged[ $key ], $value );
            else:
                $merged [$key] = $value;
            endif;
        endforeach;
        return $merged;
    }

    // Extract files
    //public static function extract_file( $array ){
    //
    //    if( !is_array( $array ) || empty( $array ) ):
    //        return false;
    //    endif;
    //
    //    if( !array_key_exists( 'tmp_name', $array ) ):
    //        return ProccessForm::extract_file( array_shift( $array ) );
    //    else:
    //
    //        if( !is_array( $array[ 'name' ] ) ):
    //            return $array;
    //        endif;
    //
    //        $return = array();
    //        foreach ( $array as $key => $value) {
    //            $return[ $key ] = array_flatten( $value );
    //            if( is_array( $return[ $key ] ) ):
    //                $return[ $key ] = array_shift( $return[ $key ] );
    //            endif;
    //        }
    //        return $return;
    //    endif;
    //}

}
?>
