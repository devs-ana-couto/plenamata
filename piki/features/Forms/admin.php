<?php
require_once( Piki::path( __FILE__ ) . '/proccess-form.php' );

class PKFAdmin {

    var $form_key;
    var $settings;
    var $action;

    // Add options page
    public function add_plugin_page() {
        add_submenu_page(
            'piki-dashboard', 
            'Forms', 
            'Forms', 
            'manage_options', 
            'edit.php?post_type=' . PikiForms_ptype
        );
    }

   	// Campos dos formulários do ADMIN
    public function admin_form_fields(){
        
        // Página carregada
        global $pagenow;
        
        // Ação
        $this->action = isset( $_GET[ 'action' ] ) && $_GET[ 'action' ] != '' ? $_GET[ 'action' ] : false;
        
        // Páginas permitidas
        $edit_pages = array( 'post-new.php', 'post.php' );
        
        // Tipo de post
        $post_type = false;
        if( $pagenow == 'post-new.php' ):
            $post_type = _get( 'post_type', 'post' );
        elseif( $pagenow =='post.php' && isset( $_GET[ 'post' ] ) ):
            $post_type = get_post_type( $_GET[ 'post' ] );
        endif;
        
        // Não registra os campos na página de configuração do formulário
        if( !$post_type || $post_type == 'pikiform' || !in_array( $pagenow, $edit_pages ) ):
            return;
        endif;
       	
        // Chave do formulário
        $this->form_key = PikiForms::get_post_type_form_key( $post_type );
        
        // Não existe formulário para este tipo de post
        if( !$this->form_key ):
            return;
        endif;

        // Configurações do formuláro
        $this->settings = PikiForms::get_form_settings( $this->form_key );
        
        // Se não existe configurações para este tipo de conteúdo
        if( empty( $this->settings ) || empty( $this->settings[ 'fields' ] ) ):
            return;
        endif;

        // Title field
        $title = PikiFields::extract_field( $this->settings[ 'fields' ], 'title', 'ftype' );
        if( $title ):

            $this->settings[ 'fields' ][ '_field_title' ] = [ 
                'machine_name' =>  '_field_title',
                'ftype' => 'hidden',
                'id' => '_field_title',
                'nowrap' => true,
                'attr' => [ 
                    'data-maxlength' => _array_get( $title, 'maxlength' ), 
                    'data-minlength' => _array_get( $title, 'minlength' ) 
                ],
            ];
            title::add_files();
        endif; 

        if( !empty( $this->settings[ 'fields' ] ) ):

            // Metabox
            add_meta_box( 
                'formfields', 
                'Informações adicionais', 
                array( $this, 'register_form_fields' ),
                $post_type, 
                'advanced', 
                'default'
            );

        endif;
    
    }

    // Registra os campos dos formulários do ADMIN
    public function register_form_fields( $post ){

        // Post
        $this->settings[ 'data' ] = $post;

        // Admin
        $this->settings[ 'admin' ] = true;

        // Constroi os campos do form
        $form = new form( $this->settings );
        $rendered = $form->get_rendered_form();
        
        // HTML
        echo $rendered[ 'fields' ];
        echo '<input type="hidden" name="form_key" id="form_key" value="'. $this->form_key .'" class="form-key">';
        echo '<input type="hidden" name="automatic_type_fields" id="automatic_type_fields" value="on">';
        
        // Scripts and Styles
        PikiForms::add_files( true );
    
    }

    // Salva os campos extras dos posts
    public static function save_custom_fields( $post_id ){

        // Check if is automatic post type fields
        $is_automatic_fields = _post( 'automatic_type_fields' );
        if( $is_automatic_fields !== 'on' ) return true;

        // Check if is admin form
        if( !_post( 'original_post_status' ) ) return true;

        // Apenas forms no admin
        if( !Piki::isRealAdmin() || _get( 'action' ) == 'submit_form' ) return true;

        // Prevenindo loops infinitos
        if( defined( '__PIKIFORM_SAVING_CUSTOM_FIELDS__' ) && __PIKIFORM_SAVING_CUSTOM_FIELDS__ === true ):
            return;
        endif;
        define( '__PIKIFORM_SAVING_CUSTOM_FIELDS__', true );
        
        // Post
        $post = get_post( $post_id );

        // Autosave or not pikiform
        if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || $post->post_status == 'auto-draft' || $post->post_status == 'trash' ):
            return $post_id;
        endif;

        // Se for uma revisão de post, pegamos o post principal para recuperar as configurações do FORM
        if( $post->post_type == 'revision' ):
            $for_settings = get_post( $post->post_parent );
        else:
            $for_settings = $post;
        endif;

        // Configurações do pikiform
        $pikiform_settings = PikiForms::get_form_settings( $for_settings );     
        
        // Se existe configurações de formulário para o tipo de post
        if( $pikiform_settings ):
            
            // Processa os valores do formulário
            PKFAdmin::proccess_fields( $post, $pikiform_settings );
        
        endif;
    
    }
    
    // Valida o formulário
    public static function form_validate() {

        // Classe de processamento do form
        require_once( Piki::path( __FILE__ ) . '/proccess-form.php' );

        // Chave do formulário
        $form_key = isset( $_POST[ 'form_key' ] ) ? $_POST[ 'form_key' ] : false;
        if( empty( $form_key ) ):
            Piki::success();
        endif;
        
        // Ítem postado
        $post_ID = $_POST[ 'post_ID' ];
        if( empty( $post_ID ) ):
            Piki::error( 'ID do post não informado.' );
        endif;
        $post_item = PKMeta::db_data( $post_ID );
        if( empty( $post_item ) ):
            Piki::error( 'ID do post inválido.' );
        endif;

        // Inicia a classe de processamento 
        $proccess = new ProccessForm( $form_key, $post_item );

        // Valida os campos
        $validation = $proccess->valida( false );

        // Retorno
        if( $validation === true ):
            Piki::success();
        endif;

    }

    // Processa os campos do formulário
    public static function proccess_fields( $post, $settings ){    
        
        global $pagenow;

        // Action
        $action = _post( 'action' );        

        // Dados postados
        $posted = ProccessForm::getPostedValues( $settings[ 'key' ] );    

        // Permite que outros plugins alterem os dados antes de serem inseridos no banco
        $posted = apply_filters( 'pikiform_presave_posted', $posted, $settings );

        // Se nada foi postado
        if( empty( $posted ) ) return;

        // Fields
        $_fields = $settings[ 'fields' ];
                
        // Remove o campo de título se existir
        PikiFields::remove_fields( $_fields, array( 'title', 'excerpt', 'body', 'taxonomy' ) );

        // Valida os campos
        //$valida = new valida( $settings, $posted );
        //$validation = $valida->get_validation();
        //if( is_array( $validation ) && !empty( $validation ) ):
        //    PikiForms::set_notice( $validation );
        //endif;

        // Campos com suas configurações
        $fields = PikiFields::prepare_fields( $_fields, $settings );

        $settings[ 'fields' ] = $_fields;

        // Remove os valores antigos
        PKMeta::delete_post_meta( $post->ID, $settings, $posted );

        // Salva os valores
        $saved = PKMeta::save_post_meta( 
            $post->ID, 
            $settings,
            $posted,
            $action == 'editpost' ? 'edit' : 'insert'
        );
    
    }

	// Permite o upload de imagens
    public function edit_form_tag(){
        
        // Mensagem padrão de erro
        $error_message = isset( $this->settings[ 'error_message' ] ) && !empty( $this->settings[ 'error_message' ] ) ? $this->settings[ 'error_message' ] : 'Preencha corretamento os campos marcados';
        
        // Error messages
        $attr_error_messages = '';
        $error_messages = _array_get( $this->settings, 'error_messages' );
        if( $error_messages ):
            foreach ( $this->settings[ 'error_messages' ] as $key_em => $em ):
                $attr_error_messages .= 'pikiform-message-' . $key_em . '="true" ';
            endforeach;
        endif;

        // Adicionando atributos
        echo ' enctype="multipart/form-data" class="pikiform" error-message="', $error_message, '"', $attr_error_messages;

        if( !empty( $this->settings ) ):
            echo ' data-piki-admin-form="true"';
        endif;

        if( !empty( $this->settings[ 'key' ] ) ):
            echo ' data-form-key="'. $this->settings[ 'key' ] .'"';
        endif;

        // Tipo de post
        $post_type = isset( $_GET[ 'post' ] ) ? get_post_type( $_GET[ 'post' ] ) : false;
        if( $post_type ):
            echo ' data-post-type="'. $post_type .'"';
        endif;

    }

}
$PKFAdmin = new PKFAdmin();

// Ajax de validação
add_action( 'wp_ajax_admin_form_validate', array( 'PKFAdmin', 'form_validate' ) );
// Adiciona o link no menu
//add_action( 'admin_menu', array( $PKFAdmin, 'add_plugin_page' ) );
// Registra os campos no formulário do wordpresss
add_action( 'admin_menu', array( $PKFAdmin, 'admin_form_fields' ) );
// Permite o upload de imagens
add_action( 'post_edit_form_tag' , array( $PKFAdmin, 'edit_form_tag' ) );
// Salva os campos adicionais no formulário do admin
add_action( 'save_post', array( 'PKFAdmin', 'save_custom_fields' ), 20 );

