<?php
define( 'PikiForms_ptype', 'pikiform' );
define( 'PikiForms_metakey', 'PikiForms_fid' );

class PikiForms {

    // Início
    public static function init() {
        PikiForms::registerPostTypes();
        add_shortcode( 'pikiforms', array(  'PikiForms', 'shortcode_form' ) );
        add_shortcode( 'pikiforms_button', array(  'PikiForms', 'shortcode_button' ) );
    }

    // Regras de URL
    public static function create_rewrite_rules() {
        global $wp_rewrite; 
        $new_rules[ 'piki-forms/([^/]+)' ] = 'index.php?piki-forms=true&form=$matches[1]';
        $new_rules[ 'show-form/([^/]+)' ] = 'index.php?show-form=true&form=$matches[1]';
        $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
    }

    // Adiciona variaveis de busca
    public static function add_query_vars( $qvars ) {
        $qvars[] = 'piki-forms';
        $qvars[] = 'show-form';
        $qvars[] = 'form';
        $qvars[] = 'action';
        $qvars[] = 'post-type';
        $qvars[] = 'post-id';
        return $qvars;
    }

    // Check if for is materialize mode
    public static function isMaterialize( $settings ){
        return 
            _request( 'form_style' ) == 'materialize'
            || 
            ( 
                !is_admin()
                &&
                _array_get( $settings, 'form_style' ) == 'materialize' 
            ) 
        ;
    }

    // Título das páginas com form
    public static function custom_wp_title( $title, $sep ){
        global $wp_query;
        $settings_form = PikiForms::get_form_settings( $wp_query->get( 'form' ) );
        return get_bloginfo( 'name' ) . ' ' . $sep . ' ' . $settings_form[ 'title' ];
    }
  
    // Redirecionar as páginas solicitadas para os devidos arquivos 
    public static function template_redirect_intercept(){
        
        global $wp_query, $wp_rewrite;

        // Páginas de formulários
        if ( $wp_query->get( 'show-form' ) == 'true' ):
            
            $form_key = $wp_query->get( 'form' );
            if( (int)$form_key > 0 ):
                $form_key = 'pikiform'.$form_key;
            endif;

            add_filter( 'wp_title', array( 'PikiForms', 'custom_wp_title' ), 16, 3 );
            
            global $pikiform;
            $pikiform = PikiForms::get_form( $form_key );

            Piki::search_template( 'pikiform', $form_key, Piki::path( __FILE__ ) );

            exit();
            
        // Outros casos de Pikiforms
        elseif( $wp_query->get( 'piki-forms' ) == 'true' ):

            // Formulários
            if( $wp_query->get( "action" ) == 'insert' || $wp_query->get( "action" ) == 'edit' ):
                
                $post_type = $wp_query->get( "post-type" );
                PikiForms::show_form( $post_type, $form_content );
            
            // Exclusão
            elseif( $wp_query->get( "action" ) == 'excluir' ):
                
                // ID do contéudo
                $post_id = $wp_query->get( 'post-id' );
                
                // Tipo de conteúdo
                $post_type = $wp_query->get( "post-type" );
                
                // Remove o conteúdo
                require_once( Piki::path( __FILE__, '/proccess-form.php' ) );
                ProccessForm::exclude_item( $post_id, $post_type );
            
            // Submissões
            else:

                $action = _post( 'form_action' );
                $form_key = _post( 'form_key' );
                
                require_once( Piki::path( __FILE__, 'proccess-form.php' ) );
                
                // Linha de fieldset
                if( $action == 'get_fieldset_row' ):

                    ProccessForm::fieldset_row( $form_key );
                
                // Submissão de formulário
                else:
                    
                    // Executa o formulário
                    //ProccessForm::proccess_form( $form_key );

                endif;

            endif;
            
            exit();
        
        endif;
    }

    public static function submitForm(){

        // Form key
        $form_key = _post( 'form_key' );
        if( empty( $form_key ) ):
            Piki::error( 'Chave de formulário inválida.' );
        endif;
        
        require_once( Piki::path( __FILE__, 'proccess-form.php' ) );

        // Executa o formulário
        ProccessForm::proccess_form( $form_key );

    }

    // Default form settings
    public static function defaultSettings(){

        return [
            
            // Basics
            'isSettingsForm'        => false,
            'allways_edit'          => false,
            'preview'               => false,
            'can_save_draft'        => false,
            'moderate'              => false,
            'pid'                   => '',
            'key'                   => '',
            'isDummy'               => false,
            'perfil'                => false,
            'public'                => false,
            'data_type'             => 'post',
            'data_table'            => false,
            'post_type'             => '',
            'post_type_active'      => false,
            'post_parent'           => false,
            'fields'                => false,
            'steps'                 => false,
            'groups'                => false,
            'stepped'               => false,
            'item'                  => false,
            'data'                  => false,
            'action'                => 'insert',
            'form_state'            => false,

            // Errors
            'error_fields' => 'inline', // false, inline, tooltip
            'error_fields_location' => '.field-item',
            'error_general' => 'inline', // false, inline, modal
            'error_general_target' => false, // false, selector
            'error_general_message' => 'Revise os campos destacados e corrija os erros',
            
            // Success insert
            'success_type'          => 'slide', // slide, inline, modal
            'success_message'       => 'Dados cadastrados com sucesso',
            'success_target'        => false,
            'success_redirect'      => false,
            'success_tohide'        => false,
            
            // Success redirect
            'draft_succes_redirect' => false,
            
            // Success edit
            'edit_success_type'     => 'inline', // slide, inline, modal
            'edit_success_message'  => 'Dados atualizados com sucesso',
            'edit_success_target'   => false,
            'edit_success_redirect' => false,
            
            // Exclude redirect
            'exclude_redirect'          => false,
            'attributes'                => array(),
            'submit_button_label'       => 'Enviar',
            'edit_button_label'         => 'Salvar',
            'save_draft_button_label'   => 'Salvar e voltar',
            
            // Styling
            'form_style'            => 'default',
            'placeholders'          => false,
            'title_before'          => '',
            'title'                 => '',
            'title_after'           => '',
            'description'           => '', 
            'classname'             => '',
            'tips_location'         => 'label', // label, description, wrapper
            
            // Recaptch
            'recaptcha_key'         => false,
            'recaptcha_secret'      => false,

            // SMS validation
            'sms_status' => false,
            'sms_alias' => false,
            'sms_token' => false,

            // Email
            'email'                 => [
                'send'              => false,
                'subject'           => 'Formulário enviado em ' . get_option( 'blogname' ),
                'sender'            => get_option( 'admin_email' ),
                'to'                => get_option( 'admin_email' ),
                'replyto'           => false,
            ],
        ];

    }

    // Registra os tipos de post
    public static function registerPostTypes(){

        // Forms option
        $types_options = get_option( 'pikiforms_ptypes' );
        
        // Tipos de conteúdo criados pelo plugin
        $toregister = explode( ',', $types_options );
        if( empty( $toregister ) || $toregister[ 0 ] == '' ):
            return;
        endif;
        
        // Faz o registro de todos os tipos
        foreach ( $toregister as $key => $ID ) {
            $exists = PikiForms::loadFormFile( 'pikiform' . $ID );
            if( $exists ):
                call_user_func( 'pikiform' . $ID . '_register' );
            else:
                PikiForms::disable_post_type( $ID );
            endif;
        }
    
    }

    // Retorna um form
    public static function get_form( $_settings, $data = false ){

        // Just form key passed
        if( !is_array( $_settings ) ):
            $_settings = array( 
                'key' => $_settings,
                'data' => $data
            );
        endif;

        // Configurações do formulário
        $settings = PikiForms::get_form_settings( $_settings );

        // Se não há configurações para o form
        if( empty( $settings ) ):
            return 'O formulário não existe';
        endif;

        // Se os dados serão salvos no banco, a permissão é verificada
        PikiForms::user_can( $settings );
        
        // Token
        $settings[ 'token' ] = self::get_token( $settings[ 'key' ] );        
        
        // Instancia a classe que constrói o formuláro
        $form = new form( $settings );
        
        // Permite que outros plugins adicione arquivos
        if( $settings[ 'post_type' ] !== '' ):
            do_action( 'pikiforms_get_form_' . $settings[ 'post_type' ] );
        endif;
        
        // Formulário renderizado
        $rendered = $form->get_rendered_form();

        $settings[ 'html' ] = '';
        
        // Header do Form, se existir
        if( $rendered[ 'title' ] != '' || $rendered[ 'description' ]  != '' ):
            $settings[ 'html' ] .= '<header class="form-header">'. $rendered[ 'title' ] . $rendered[ 'description' ] .'</header>';
        endif;
        
        // Corpo do Form
        $settings[ 'html' ] .= $rendered[ 'header' ] . $rendered[ 'fields' ] . $rendered[ 'footer' ] ;

        // Adiciona os scripts e estilos
        PikiForms::add_files( false, $settings );
        
        // Retorna o formulário renderizado
        return $settings;
    
    }

    // Recupera as configurações de um pikiform
    public static function get_form_settings( $_settings ){

        global $pagenow;

        // If post has passed
        if( is_object( $_settings ) ):

            $_settings = [
                'key' => $_settings->post_type,
                'item' => $_settings
            ];

            $form_key = $_settings[ 'key' ];

        else:

            // Allways an array
            if( !is_array( $_settings ) ):
                $_settings = [ 'key' => $_settings ];
            endif;

            // Compare
            $compare = _array_get( $_settings, 'key' );

            // Get form key
            $form_key = PikiForms::resolveFormKey( $compare );

            // Se não tem um form válido
            if( !$form_key ):
                return false;
            endif;

            // Keep real form key
            $_settings[ 'key' ] = $form_key;
        
        endif;


        // Carrega o arquivo, se existir
        PikiForms::loadFormFile( $form_key );

        // Default settings
        $default_settings = PikiForms::defaultSettings( $_settings );

        // Configurações do formulário
        $settings_function = 'pikiform_'. $form_key .'_settings';
        if( !function_exists( $settings_function ) ) return false;

        // Get file settings
        $settings = call_user_func( $settings_function );

        // Merge settings with defaults
        $settings = array_merge( $default_settings, $settings );

        // Forced settings
        $settings = array_merge( $settings, $_settings );

        // State
        $state = _array_get( $settings, 'form_state' );
        if( empty( $state ) ):
            $settings[ 'form_state' ] = _post( 'form_state', 'default' );
        endif;

        // Users form
        $profile = _array_get( $settings, 'perfil' );
        if( !empty( $profile ) ):
            $settings[ 'data_type' ] = 'user';
        endif;

        // Posted item
        $settings[ 'item' ] = PikiForms::resolveItem( $settings );        

        // Recupera os campos do formulário
        $settings[ 'fields' ] = PikiForms::get_form_fields( $settings );

        // Permite que outros plugins altere as configurações do formulário
        $settings = apply_filters( 'pikiform_settings', $settings );

        // Action
        $settings[ 'action' ] = empty( $settings[ 'item' ] ) ? 'insert' : 'edit';

        // Prepara os campos
        if( $settings[ 'fields' ] ):
            $settings[ 'fields' ] = PikiFields::prepare_fields( $settings[ 'fields' ], $settings );
        endif;

        // Filtering fields
        $fields = apply_filters( 'pikiform_fields', $settings[ 'fields' ], $settings );
        if( !empty( $fields ) ):
            $settings[ 'fields' ] = $fields;
        endif;

        // Stepeed
        $steps = _array_get( $settings, 'steps' );
        if( $steps ) $settings[ 'stepped' ] = true;

        // Recaptcha
        if( defined( 'PIKI_FORMS_CAPTCHA_KEY' ) ):
            $settings[ 'recaptcha_key' ] = _array_get( $settings, 'recaptcha_key', PIKI_FORMS_CAPTCHA_KEY );
            $settings[ 'recaptcha_secret' ] = _array_get( $settings, 'recaptcha_secret', PIKI_FORMS_CAPTCHA_SECRET );
        endif;

        return $settings;

    }
    
    public static function resolveItem( $settings ){

        // Passed item id
        $item_id = _array_get( $settings, 'item' );

        // Posted item ID
        if( !$item_id ):
            $item_id = _post( 'item_id' );
        else:
            $item_id = is_object( $item_id ) ? $item_id->ID : $item_id;
        endif;

        // Valid item id
        if( intVal( $item_id ) < 1 ):
            return false;
        endif;

        // Type and table
        $data_table = _array_get( $settings, 'data_table', null );
        $data_type = _array_get( $settings, 'data_type', 'post' );
        
        // Retrieve data
        $item = PKMeta::db_data( $item_id, $settings[ 'fields' ], $settings[ 'data_type' ], $data_table );
        if( !$item || empty( $item ) || is_null( $item ) ):
            return false;
        endif;
        
        return $item;

    }
    
    public static function resolveFormKey( $compare ){

        $form_key = false;

        // Se for passado um POST
        if( is_object( $compare ) ):
            
            // Se não é um post
            if( !isset( $compare->post_type ) ):
                return false;
            endif;
            
            // Se é um pikiform
            if( $compare->post_type == PikiForms_ptype ):
                $form_key = 'pikiform' . $compare->ID;
            // Se é um post
            else:
                $form_key = PikiForms::get_post_type_form_key( $compare->post_type );
            endif;
        
        // Form key de um form já carregado
        elseif( function_exists( 'pikiform_' . $compare . '_settings' ) ):
            
            $form_key = $compare;

        // Post type passado
        elseif( is_string( $compare ) && post_type_exists( $compare ) ):

            $form_key = PikiForms::get_post_type_form_key( $compare );

        // Se foi passado um ID
        elseif( (int)$compare > 0 ):
            
            // Post
            $post = get_post( $compare );
            
            // Se o ID é inválido
            if( empty( $post ) ):
                return false;
            endif;
            
            // Se é um pikiform
            if( $post->post_type == PikiForms_ptype ):
                $form_key = 'pikiform' . $post->ID;
            
            // Se é um post
            else:
                $form_key = PikiForms::get_post_type_form_key( $post->post_type );
            endif;
        
        // Form key de um pikiform
        elseif( file_exists( Piki::path( __FILE__, 'forms/'. $compare .'.php' ) ) ):
        
            $form_key = $compare;
        
        endif;
        
        // Se não tem um form válido
        return !$form_key ? false : $form_key;

    }

    // Recupera os campos de um form, através de sua chave
    public static function get_form_fields( $settings ){
    
        // Nome do método
        $form_fields_function = 'pikiform_' . $settings[ 'key' ] . '_fields';
        $form_fields = function_exists( $form_fields_function ) ? call_user_func( $form_fields_function, $settings ) : false;

        // Hooking
        $form_fields = apply_filters( 'pikiform_get_fields', $form_fields, $settings );

        // There is no fields
        if( empty( $form_fields ) ) return false;

        // Validate fields
        foreach( $form_fields as $kf => $field ):

            $machine_name = _array_get( $field, 'machine_name' );
            
            if( empty( $field ) || !$machine_name ):
                unset( $form_fields[ $kf ] );
            endif;

            if( $field[ 'ftype' ] == 'fieldset' ):

                foreach( $field[ 'subfields' ] as $ks => $subfield ):

                    $machine_name = _array_get( $subfield, 'machine_name' );
                    
                    if( empty( $subfield ) || !$machine_name ):
                        unset( $form_fields[ $kf ][ 'subfields' ][ $ks ] );
                    endif;

                endforeach;

            endif;
        
        endforeach;
        
        return empty( $form_fields ) ? false : $form_fields;
    
    }

    // Carrega o arquivo de configurações do form
    public static function loadFormFile( $form_key, $debug = true ){
        
        // Se a chave do formulário vem sem o ID
        if( $form_key === 'pikiform' ):
            return false;
        endif;
        
        // Se o método de configurações do form não foi carregado
        if( function_exists( 'pikiform_'. $form_key .'_settings' ) ):
            return true;
        else:
            $filepath = self::form_filepath( $form_key );
            if( file_exists( $filepath ) ):
                require_once( $filepath );
                return true;
            else:
                return false;
            endif;
        endif;
        
        return false;
    
    }
    
    // Salva os ítems de formulários
    public static function save_pikiform_post( $post_id ){

        global $wpdb;

        // Post
        $post = get_post( $post_id );

        // Nothing to do
        if( $post->post_type !== PikiForms_ptype ):
            return;
        endif;

        // Autosave or not pikiform
        if ( ( defined('DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || $post->post_status == 'auto-draft' || $post->post_type != PikiForms_ptype ):
            return $post_id;
        endif;

        // Muda o post_name dos forms para não confligar com os slugs
        if( strpos( $post->post_name, 'pikiform' ) !== 0 ):
            $new_slug = wp_unique_post_slug( 'pikiform', $post_id, $post->post_status, $post->post_type, $post->post_parent  );
            $wpdb->query($wpdb->prepare( "UPDATE $wpdb->posts SET post_name = '%s' WHERE ID = %d", array( $new_slug, $post_id )));
        endif;

        $br = "\n";
        $towrite  = '<?php' . $br;

        // Chave do form
        $pikiform_key = 'pikiform' . $post->ID;

        // Campos
        $fields = get_post_meta( $post->ID, 'formfields', true );
        $fields = unserialize( base64_decode( $fields ) );

        // Post type settings
        if( ( $post_type = $_POST[ 'ptype_name' ] ) != '' && isset( $_POST[ 'ptype_active' ] ) ):

            // Habilita o tipo de post
            PikiForms::enable_post_type( $post_id );

            $towrite .= 'function ' . $pikiform_key . '_register(){' . $br;

            // Post type slug
                
                $post_type_slug = $_POST[ 'ptype_slug' ] == '' ? $post_type.'s' : $_POST[ 'ptype_slug' ];
            
            // Post type supports
                
                $post_type_supports = isset( $_POST[ 'ptype_supports' ] ) ? $_POST[ 'ptype_supports' ] : array();
                
                // Title
                $post_type_supports[] = 'title';
                
                // Body
                if( PikiFields::extract_field( $fields, 'body', 'ftype' ) ):
                    $post_type_supports[] = 'editor';
                endif;
                
                // Excerpt
                if( PikiFields::extract_field( $fields, 'excerpt', 'ftype' ) ):
                    $post_type_supports[] = 'excerpt';
                endif;
                $post_type_supports = array_unique( $post_type_supports );
           
            // Labels
                
                $post_type_labels = get_post_meta( $post->ID, 'ptype_labels', true );
                $post_type_labels = unserialize( base64_decode( $post_type_labels ) );
            
            // Menu icon
                
                if( ( $post_type_icon = trim( $_POST[ 'ptype_menu_icon' ] ) ) == '' ):
                    $post_type_icon = 'dashicons-edit';
                endif;
                if( ( $icon_file_id = (int)$_POST[ 'ptype_menu_icon_image' ][ 'ids' ] ) > 0 ):
                    $url_icon = wp_make_link_relative( wp_get_attachment_url( $icon_file_id ) );
                    $post_type_icon = substr( $url_icon, strpos( $url_icon, '/wp-content' ) );
                endif;

            // Configurações gerais
                
                $post_type_settings = 'array(' . $br;
                $post_type_settings .= '\'can_export\'=>' . ( isset( $_POST[ 'ptype_can_export' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'capability_type\'=>\'' . $post_type . '\',' . $br;
                $post_type_settings .= '\'description\'=>'. var_export( $_POST[ 'ptype_description' ], true ) .',' . $br;
                $post_type_settings .= '\'exclude_from_search\'=>'. ( isset( $_POST[ 'ptype_exclude_from_search' ] ) ? 'true' : 'false' ) .',' . $br;
                $post_type_settings .= '\'has_archive\'=>'. ( isset( $_POST[ 'ptype_has_archive' ] ) ? 'true' : 'false' ) .',' . $br;
                $post_type_settings .= '\'hierarchical\'=>false,' . $br;
                $post_type_settings .= '\'labels\'=>'. var_export(  $post_type_labels, true ) .',' . $br;
                $post_type_settings .= '\'map_meta_cap\'=>true,' . $br;
                $post_type_settings .= '\'menu_icon\'=>'. ( $icon_file_id > 0 ? 'WP_SITEURL.' : '' ) . '\'' . $post_type_icon . '\',' . $br;
                $post_type_settings .= '\'menu_position\'=>\''. ( $_POST[ 'ptype_menu_position' ] == '' ? 5 : (int)$_POST[ 'ptype_menu_position' ] ) . '\',' . $br;
                $post_type_settings .= '\'name\'=>\''. $post_type . '\',' . $br;
                $post_type_settings .= '\'can_export\'=>' . ( isset( $_POST[ 'ptype_can_export' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'public\'=>' . ( isset( $_POST[ 'ptype_public' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'publicly_queryable\'=>' . ( isset( $_POST[ 'ptype_publicly_queryable' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'query_var\'=>' . ( isset( $_POST[ 'ptype_query_var' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'rewrite\'=>array( \'slug\' => \'' . $post_type_slug . '\' ),' . $br;
                $post_type_settings .= '\'show_ui\'=>' . ( isset( $_POST[ 'ptype_show_ui' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'show_in_admin_bar\'=>' . ( isset( $_POST[ 'ptype_show_in_admin_bar' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'show_in_nav_menus\'=>' . ( isset( $_POST[ 'ptype_show_in_nav_menus' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'show_in_menu\'=>' . ( isset( $_POST[ 'ptype_show_in_menu' ] ) ? 'true' : 'false' ) . ',' . $br;
                $post_type_settings .= '\'supports\'=>' . ( empty( $post_type_supports ) ? 'false' : var_export( $post_type_supports, true ) ) . ',' . $br;
                $post_type_settings .= '\'taxonomies\'=>' . ( !isset( $_POST[ 'ptype_taxonomys' ] ) ? 'array()' : var_export( $_POST[ 'ptype_taxonomys' ], true ) ) . ',' . $br;
                $post_type_settings .= '\'slugtax\'=>' . ( empty( $_POST[ 'ptype_taxonomy_slug' ] ) ? 'false' : "'" . $_POST[ 'ptype_taxonomy_slug' ] . "'" ) . ',' . $br;
                $post_type_settings .= ')' . $br;
                $towrite .= '   $post_type_settings=' . $post_type_settings . ';' . $br;
                $towrite .= '   register_post_type( \''. $post_type .'\', $post_type_settings );' . $br;
   
            $towrite .= '}' . $br;

            // Taxonomia no slug
            $slugtax = empty( $_POST[ 'ptype_taxonomy_slug' ] ) ? false : $_POST[ 'ptype_taxonomy_slug' ];
            if( $slugtax ):
                update_option( 'pikiform_slugtax_' . $post_type, $slugtax );
            else:
                delete_option( 'pikiform_slugtax_' . $post_type );
            endif;

        else:

            // Desabilita o tipo de post
            PikiForms::disable_post_type( $post_id );

        endif;

        // Form settings
        $form_settings = array(
            'allways_edit'          => isset( $_POST[ 'ptype_allways_edit' ] ),
            'preview'               => isset( $_POST[ 'pikiform_preview' ] ),
            'moderate'              => isset( $_POST[ 'ptype_moderate' ] ),
            'placeholders'          => isset( $_POST[ 'pikiform_labels_inside' ] ),
            'pid'                   => $post->ID,
            'key'                   => $pikiform_key,
            'title'                 => $_POST[ 'pikiform_form_title' ],
            'description'           => $_POST[ 'pikiform_form_description' ],
            'error_fields' => _post( 'error_fields', 'inline' ), // false, inline, tooltip
            'error_fields_location' => _post( 'error_fields_location', '.field-item' ),
            'error_general' => _post( 'error_general', 'inline' ), // false, inline, modal
            'error_general_target' => _post( 'error_general_target', false ), // false, selector
            'error_general_message' => _post( 'error_general_message', __( 'Revise os campos destacados e corrija os erros', 'piki' ) ),
            'success_type'          => _post( 'success_type', 'slide' ), // slide, inline, modal
            'success_message'       => _post( 'success_message', __( 'Dados cadastrados com sucesso', 'piki' ) ),
            'success_redirect'      => _post( 'success_redirect', false ),
            'success_tohide'        => _post( 'success_tohide', false ),
            'draft_succes_redirect' => _post( 'draft_succes_redirect', false ),
            'edit_success_type'     => _post( 'edit_success_type', 'inline' ), // slide, inline, modal
            'edit_success_message'  => _post( 'edit_success_message', __( 'Dados atualizados com sucesso.', 'piki' ) ),
            'edit_success_redirect' => _post( 'edit_success_redirect', false ),
            'exclude_redirect'      => _post( 'exclude_redirect', false ),
            'classname'             => _post( 'pikiform_classname' ),
            'attributes'            => _post( 'pikiform_attributes' ),
            'submit_button_label'   => _post( 'pikiform_submit_button_label' ),
            'edit_button_label'     => _post( 'pikiform_edit_button_label' ),
            'email'                 => array(
                'send'              => isset( $_POST[ 'send_email' ] ),
                'subject'           => _post( 'email_subject' ),
                'sender'            => _post( 'email_sender' ),
                'to'                => _post( 'email_to' ),
                'replyto'           => _post( 'email_reply_to' ),
            ),
            'public' => isset( $_POST[ 'pikiform_public' ] ),
            'post_type' => $_POST[ 'ptype_name' ] == '' ? false : $_POST[ 'ptype_name' ],
            'post_type_active' => ( isset( $_POST[ 'ptype_active' ] ) && $_POST[ 'ptype_name' ] != '' )
        );

        // Permite que outros plugins altere as configurações do formulário
        $form_settings = apply_filters( 'pikiform_settings_write', $form_settings, $post_id );

        $settings_to_write = var_export( $form_settings, true );
        $settings_to_write = stripslashes( stripslashes( $settings_to_write ) );
        $settings_to_write = str_replace( 
            array( 'array (' ) , 
            array( 'array(' ),
            $settings_to_write
        );

        $towrite .= 'function pikiform_' . $pikiform_key . '_settings(){' . $br;
        $towrite .= '    return ' . $settings_to_write . ';' . $br;
        $towrite .= '}' . $br;
        $towrite .= 'function pikiform_' . $pikiform_key . '_fields(){' . $br;
        $towrite .= '    return ' . str_replace( 'array (', 'array(', var_export( $fields, true ) ) . ';' . $br;
        $towrite .= '}';

        // Caminho do arquivo
        $pathfile = PikiForms::form_filepath( $pikiform_key );
        
        // Escreve o arquivo
        if( !file_put_contents( $pathfile, $towrite, FILE_TEXT ) ):
            Piki::error( 'O arquivo ' . $pathfile . ' não pôde ser criado.' );
        endif;

        flush_rewrite_rules( true );

    }

    // Desabilitando o formulário e removendo o arquivo
    public static function delete_post( $postid, $post ){

        // Deleting pikiform post
        if( $post->post_type == PikiForms_ptype ):

            $filepath = PikiForms::form_filepath( 'pikiform' . $post_id );
            if( file_exists( $filepath ) ):
                @unlink( $filepath );
            endif;

            PikiForms::disable_post_type( $post_id );
            flush_rewrite_rules( true );

        endif;

        // Check if has form to the post
        $settings = PikiForms::get_form_settings( $post );
        if( $settings && !empty( $settings[ 'fields' ] ) ):
            foreach( $settings[ 'fields' ] as $field ):
                if( method_exists( $field[ 'ftype' ], 'post_delete' ) ):
                    call_user_func( array( $field[ 'ftype' ], 'post_delete' ), $field, $post );
                endif;
            endforeach;
        endif;
    
    }
    
    // Recupera um campo de um tipo de post  
    public static function get_ptype_field( $post_type, $field_name ){
        // ID do post do formulário
        $form_post_id = PikiForms::get_post_type_form_id( $post_type );
        // Campos do tipo de post
        $fields = PikiForms::get_ptype_form_fields( 'pikiform' . $form_post_id );
        // Campo desejado
        if( ( $founded = PikiFields::extract_field( $fields, $field_name ) ) !== false ):
            return $founded;
        endif;
        return false;
    }

    // Toogle post type
    public static function toggle_post_type( $ID, $action='disable' ){

        $post_types_option = get_option( 'pikiforms_ptypes', '' );
        $posts_types = $post_types_option === '' ? array() : explode( ',', $post_types_option );
        $key_exists = array_search( $ID, $posts_types );
        
        if( $action === 'disable' && $key_exists !== false ):
            unset( $posts_types[ $key_exists ] );
        elseif( $action == 'enable' && !$key_exists ):
            $posts_types[] = $ID;
        endif;
        
        $unique = array_unique( $posts_types );
    
        update_option( 'pikiforms_ptypes', implode( ',', $unique ) );
    
    }

    // Enable post type
    public static function enable_post_type( $ID ){
        PikiForms::toggle_post_type( $ID, 'enable' );
    }

    // Disable post type
    public static function disable_post_type( $ID ){
        PikiForms::toggle_post_type( $ID, 'disable' );
    }

    public static function get_ptype_form_fields( $form_key ){
        
        // Se foi fornecido o ID do post do Form
        if( is_numeric( $form_key ) ):
            $form_key = 'pikiform' . $form_key;
        endif;
        
        if( function_exists( 'pikiform_' . $form_key . '_fields' ) ):
            $fields = call_user_func( 'pikiform_' . $form_key . '_fields' );
        else:
            $fields = false;
        endif;

        return $fields;

    }

    // Mostra um formulário
    public static function show_form( $post_type, $content = false, $post_parent = false ){
       
        // ID do post do formulário
        $form_key = PikiForms::get_post_type_form_key( $post_type );
       
        // Settings
        $settings = array( 
            'key' => $form_key,
            'data' => $content,
            'post_parent' => $post_parent,
        );

        global $pikiform;
        $pikiform = PikiForms::get_form( $settings );
       
        // Template
        Piki::search_template( 'pikiform', $form_key, Piki::path( __FILE__ ) );
   
    }

    // Templates customizados
    public static function custom_template( $template ){
        global $wp_query;
        if ( isset( $wp_query->query_vars[ 'post_type' ] ) &&  $wp_query->query_vars[ 'post_type' ] == 'pikiform' ) {
            $template_exists = locate_template( 'pikiform-' . $wp_query->query_vars[ 'name' ] . '.php' );
            if ( $template_exists == '' ) { 
                $template = Piki::path( __FILE__, 'template.php' );
            }
        }
        return $template;
    }

    // Carrega os arquivos necessários
    public static function add_files( $admin = false, $settings = array() ){

        // Recaptcha
        $recaptcha = _array_get( $settings, 'recaptcha_key' );
        if( !empty( $recaptcha ) ):
            wp_enqueue_script( 'recaptcha-scripts', 'https://www.google.com/recaptcha/api.js' );
        endif;
       
        // Scripts
        wp_enqueue_script( 'jquery-ui-tooltip' );
        
        // Libraries
        Piki::add_library( 'jquery-form' );
        Piki::add_library( 'jquery-ui' );
        Piki::add_library( 'scrollto' );
        Piki::add_library( 'fields-masks' );
        Piki::add_library( 'message' );

        // Pikiforms files
        PikiForms::add_main_files( $admin );

    }

    // Cria um Token
    public static function get_token( $form_key ){
        return wp_create_nonce( $form_key . '-' . basename( __FILE__ ) );
    }

    // Valida um token
    public static function check_token( $form_key, $token ){
        return wp_verify_nonce( $token, $form_key . '-' . basename( __FILE__ ) );
    }

    // Recupera o último post não publicado do usuário logado
    // Se não existir, um novo é criado
    public static function get_current_post_user( $settings ){
        $user = wp_get_current_user();
        $current = get_posts(array(
            'post_type' => $settings[ 'post_type' ],
            'post_status' => 'draft',
            'posts_per_page' => 1,
            'author' => $user->ID,
        ));
        if( empty( $current ) ):
            $new_post = array(
                'post_title' => 'Rascunho de ' . $user->data->display_name,
                'post_status' => 'draft',
                'post_date' => date('Y-m-d H:i:s'),
                'post_author' => $user->ID,
                'post_type' => $settings[ 'post_type' ],
            );
            return wp_insert_post($new_post);
        endif;
        return array_shift( $current );
    }

    // Shortcode que mostra formulários
    public static function shortcode_form( $atts ) {

        // Options
        $options = shortcode_atts(
            [
                'fid' => false,
                'key' => false,
                'item_id' => false,
                'title' => false,
                'description' => false,
                'classname' => '',
            ], 
            $atts
        );

        // Form style
        if( isset( $atts[ 'form_style' ] ) ):
            $options[ 'form_style' ] = _array_get( $atts, 'form_style' );
        endif;

        // Button label
        $button_label = _array_get( $atts, 'submit_button_label' );
        if( $button_label ) $options[ 'submit_button_label' ] = $button_label;
        
        // Chave do formulário
        if( empty( $options[ 'key' ] ) && !empty( $options[ 'fid' ] ) ):
            if( (int)$options[ 'fid' ] > 0 ):
                $options[ 'key' ] = 'pikiform' . $options[ 'fid' ];
            else:
                $options[ 'key' ] = $options[ 'fid' ];
            endif;
        endif;
        if( empty( $options[ 'key' ] ) ):
            return 'O ID do formulário não foi informado.';
        endif;

        // Dados do form
        $options[ 'item' ] = _array_get( $options, 'item_id' );

        // Formulário
        $form = PikiForms::get_form( $options );

        // Se o form não existe
        if( !is_array( $form ) ) return 'O form com o ID <strong>\'' . $options[ 'key' ] . '\'</strong> não existe.';
        return $form[ 'html' ];
    
    }

    // Shortcode que mostra formulários
    public static function shortcode_button( $atts ) {

        // Opções
        $defaults = array(
            'form_key' => false,
            'class' => '',
            'label' => 'Abrir formulário',
            'icon' => false,
        );
        $options = shortcode_atts( $defaults, $atts );
        $options = array_merge( $defaults, $options );
        
        if( $options[ 'form_key' ] == '' ):
            return 'A chave do formulário não foi informada.';
        endif;
        
        // Chave do formulário
        if( (int)$options[ 'form_key' ] > 0 ):
            $form_key = 'pikiform' . $options[ 'form_key' ];
        else:
            $form_key = $options[ 'form_key' ];
        endif;

        // Label
        $label = !!$options[ 'icon' ] ? '<i class="icon icon-'. $options[ 'icon' ] .'"></i>' : $options[ 'label' ];
        $html = '<a href="'. get_site_url() .'/show-form/' . $form_key . '/" title="'. $options[ 'label' ] .'" class="pikiform-ajax-button '. $options[ 'class' ] .'">'. $label .'</a>';

        // Adiciona os scripts e estilos
        add_action( 'wp_enqueue_scripts', array( 'PikiForms', 'add_files' ) );

        return $html;
        
    }

    // Verifica as permissões do usuário
    public static function user_can( $settings ){

        global $wp_query;

        // Administradores
        if( current_user_can( 'manage_options' ) === true ):
            return true;
        endif;

        // Action
        $action = _array_get( $settings, 'action' );
        
        // Cadastro público
        if( $data_type != 'user' && on( $settings, 'public' ) && $action == 'insert' ):
            return true;
        endif;

        // Tipo de data
        $data_type = _array_get( $settings, 'data_type', 'post' );

        if( $data_type == 'user' ):

            $user_id = _array_get( $settings, 'item' );

            if( is_user_logged_in() && $user_id == get_current_user_id() ):
                return true;
            else:
                return false;
            endif;

        else:

            // Post type
            $post_type = _array_get( $settings, 'post_type' );

            // Form de cadastro
            if( $action == 'insert' ):
            
                if( current_user_can( 'edit_' . $post_type . 's' ) ):
                    return true;
                else:
                    Piki::error( 'Você não tem permissão para postar este tipo conteúdo.', 'permission' );
                endif;

            elseif( $action == 'edit' ):

                $post_id = _array_get( $settings, 'item' );
                
                if( current_user_can( 'edit_'. $post_type, $post_id ) ):
                    return true;
                else:
                    Piki::error( 'Você não tem permissão para editar este conteúdo.', 'permission' );
                endif;
            
            elseif( $wp_query->get( 'action' ) == 'edit' ):
            
                $post_id = $wp_query->get( 'id' );
                if( empty( $post_id ) ) $post_id = $wp_query->get( 'post-id' );

                if( current_user_can( 'edit_'. $post_type, $post_id ) ):
                    return true;
                else:
                    Piki::error( 'Você não tem permissão para editar este conteúdo.', 'permission' );
                endif;
            
            endif;

        endif;
        
        return false;
    
    }

    // Add no header
    public static function head_configs(){
        echo '<script type="text/javascript" data-cfasync="false">PikiForms={
        imagesURL:"' . Piki::url( 'images/', __FILE__ ) . '",
        pluginurl:"' . get_bloginfo( 'url' ) . '/piki-forms"
        }</script>';
    }

    // Arquivos principais dos forms
    public static function add_main_files( $admin = false ){
    
        // Jquery Form
        Piki::add_library( 'jquery-form' );
    
        // Scripts
        wp_enqueue_script( 'PikiForms-scripts', Piki::minified( 'forms.js', __FILE__ ), array( 'jquery' ), false, true );
    
        // Admin form scripts
        if( $admin ):
            wp_enqueue_script( 'pikiforms-admin-scripts', Piki::url( 'admin.js', __FILE__ ), array( 'jquery' ), false, true );
        endif;

        // Forms styles
        wp_enqueue_style( 'PikiForms-styles', Piki::url( 'forms.css', __FILE__ ) );
    
    }

    // Path do arquivo de configurações do pikiform
    public static function form_filepath( $pikiform_key ){
        return Piki::path( __FILE__, 'forms/' . $pikiform_key . '.php' );
    }

    // ID do Pikiform de determinado tipo de conteúdo
    public static function get_post_type_form_id( $post_type ){
        global $wpdb;
        $form_post_id = $wpdb->get_var($wpdb->prepare( "SELECT post_id FROM $wpdb->postmeta AS META WHERE META.meta_key = 'ptype_name' AND META.meta_value = %s", $post_type ) );
        if( (int)$form_post_id > 0 ):
            return $form_post_id;
        endif;
        return false;

    }

    // Chave do formulário por tipo de post
    public static function get_post_type_form_key( $post_type ){

        $function = 'pikiform_' . $post_type . '_settings';
        if( function_exists( $function ) ):
            return $post_type;
        endif;

        $key_by_id = PikiForms::get_post_type_form_id( $post_type );
        if( $key_by_id ):
            return 'pikiform' . $key_by_id;
        endif;

        return false;

    }

    // Mudando o status do pikiform
    public static function status_transitions( $new_status, $old_status, $post ){
        if( $post->post_type !== PikiForms_ptype ):
            return;
        endif;
        if ( $new_status === 'publish' ){
            PikiForms::enable_post_type( $post->ID );
        }
        else {
            PikiForms::disable_post_type( $post->ID );
        }
    }

    // Adiciona um iframe para algumas submissões
    public static function add_iframe(){?>
        <iframe name="pikiform-iframe" id="pikiform-iframe" style="display:none;" src="about:blank"></iframe>
    <?php }

    // Envio de emails
    public static function mail( $to, $subject, $message, $from = false, $replyto = false ){
        
        global $phpmailer;

        // Instance PHPMailer
        if( !is_object( $phpmailer ) || !is_a( $phpmailer, 'PHPMailer' ) ):
            require_once ABSPATH . WPINC . '/class-phpmailer.php';
            require_once ABSPATH . WPINC . '/class-smtp.php';
            $phpmailer = new PHPMailer( true );
        endif;

        $phpmailer->SMTPDebug = false;

        // Empty out the values that may be set
        $phpmailer->ClearAllRecipients();
        $phpmailer->ClearAttachments();
        $phpmailer->ClearCustomHeaders();
        $phpmailer->ClearReplyTos();

        $phpmailer->ContentType = 'text/html';
        $phpmailer->CharSet = get_bloginfo( 'charset' );
        $phpmailer->IsHTML( true );

        // SMTP
        $smtp_options = get_option( 'piki_smtp_options' );

        // From
        if( empty( $from ) ):
            if( isset( $smtp_options[ 'sender' ] ) && !empty( $smtp_options[ 'sender' ] ) ):
                $from = $smtp_options[ 'sender' ];
            else:
                $from = get_option( 'admin_email' );
            endif;
        endif;

        if( strpos( $from, '<' ) > -1 ):
            list( $from_name, $from_email ) = explode( '<', str_replace( '>', '', $from ) );
        else:
            $from_email = $from;
            $from_name = get_bloginfo( 'name' );
            $from_name = _array_get( $smtp_options, 'from_name', get_bloginfo( 'name' ) );
        
        endif;

        // Normalize from name
        $from_name = str_replace( array( ':', '(', ')' ), '-', $from_name );
        $from_name = str_replace( '--', '-', $from_name );
        $from_name = str_replace( array( '<', '>' ), '', $from_name );

        // Set from and sender
        $phpmailer->SetFrom ( $from_email, $from_name );
        $phpmailer->Sender = $from_email;

        // To
        if( !is_array( $to ) ):
            $to = explode( ',', $to );
        endif;
        foreach( $to as $kto => $item_to ):
            $phpmailer->AddAddress ( trim( $item_to ) );
        endforeach;

        // Reply To
        if( $replyto ):
            $phpmailer->AddReplyTo( $replyto );
        endif;

        // Subject
        $phpmailer->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';

        // Body
        $phpmailer->MsgHTML( $message );

        if( on( $smtp_options, 'status' ) ):

            $phpmailer->isSMTP();
            $phpmailer->Mailer = 'smtp';
            $phpmailer->SMTPAuth = TRUE;
            $phpmailer->SMTPSecure = _array_get( $smtp_options, 'secure', 'none' );
            $phpmailer->Host = _array_get( $smtp_options, 'host' );
            $phpmailer->Port = _array_get( $smtp_options, 'port', 465 );
            $phpmailer->Username = _array_get( $smtp_options, 'username' );
            $phpmailer->Password = _array_geT( $smtp_options, 'password' );

        endif;

        try {
            $response = $phpmailer->Send();
            return $response;
        }
        catch( Exception $e ){
            Piki::error( 'Não foi possível enviar o email: ' . $e->getMessage() );
        }

    }

    // Request fix
    public static function requestFix( $query_vars ){

        $ispikiform = _array_get( $query_vars, 'piki-forms' );
        $name = _array_get( $query_vars, 'name' );

        if( $ispikiform && is_array( $name ) ):
            unset( $query_vars[ 'post_type' ] );
            unset( $query_vars[ 'name' ] );
        endif;

        return $query_vars;

    }
    
}

// Autoload
function piki_forms_autoload( $className ){
    $classes = array( 'calendar', 'files', 'form', 'images', 'negocio', 'show', 'valida' );
    if( in_array( $className, $classes ) ):
        require_once( Piki::path( __FILE__, 'class/class.' . $className . '.inc' ) );
    endif;
}
spl_autoload_register( 'piki_forms_autoload' );

// Remove atributos das tags html
add_filter( 'cmb_validate_wysiwyg', 'premier_cmb_validate_wysiwyg' );
function premier_cmb_validate_wysiwyg( $new ) {
    $new = str_replace( '\"', '"', $new );
    $new = preg_replace('#\s(id|required|class|valign|align|nowrap|width|height|style|border|padding|cellpadding|cellspacing)="[^"]+"#', '', $new);
    $new = str_replace( '"', '\"', $new );
    return $new;
}

// Ajax
add_action( 'wp_ajax_submit_form', array( 'PikiForms', 'submitForm' ) );
add_action( 'wp_ajax_nopriv_submit_form', array( 'PikiForms', 'submitForm' ) );

// Request post name fix
//add_filter( 'request', array( 'PikiForms', 'requestFix' ) );

// Init
add_action( 'init', array( 'PikiForms', 'init' ) );

// Header and Footer actions
add_action( 'wp_head', array('PikiForms', 'head_configs') );
add_action( 'admin_head', array('PikiForms', 'head_configs') );
add_action( 'wp_footer', array( 'PikiForms', 'add_iframe' ) );

// Scripts and Styls
add_action( 'wp_enqueue_scripts', array( 'PikiForms', 'add_main_files' ), 1 );
add_action( 'admin_enqueue_scripts', array( 'PikiForms', 'add_main_files' ), 1 );

// Pages register
add_filter( 'query_vars', array( 'PikiForms', 'add_query_vars' ) );
//add_filter( 'the_content', array( 'PikiForms', 'content_filter' ), 20 );
add_action( 'generate_rewrite_rules', array( 'PikiForms', 'create_rewrite_rules' ) );
add_action( 'template_redirect', array( 'PikiForms', 'template_redirect_intercept' ) );

// Posts hooks
add_action( 'save_post', array( 'PikiForms', 'save_pikiform_post' ), 20 );
add_action( 'before_delete_post', array( 'PikiForms', 'delete_post' ), 20, 2 );
add_action( 'transition_post_status',  array( 'PikiForms', 'status_transitions' ), 10, 3 );


// Apenas ADMIN
if( is_admin() ):
    // Tipo de conteúdo Piki Form
    //require_once( Piki::path( __FILE__, 'forms-ctype.php' ) );
    // Formulários no admin
    require_once( Piki::path( __FILE__, 'admin.php' ) );
endif;

