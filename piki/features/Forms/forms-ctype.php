<?php
/**
FORM DE CONFIGURAÇÃO DOS FORMULÁRIOS E TIPOS DE CONTEÚDO
**/
class PikiForms_ctype extends PikiForms {
    
    public static function init(){
        
        // Tipo de post
        $labels = array(
            'name'              => __( 'Piki Forms', 'piki' ),
            'singular_name'     => __( 'Piki Form', 'piki' ),
            'add_new'           => __( 'Add new', 'piki' ),
            'add_new_item'      => __( 'Add new Piki Form', 'piki' ),
            'edit_item'         => __( 'Edit Piki Form', 'piki' ),
            'new_item'          => __( 'New Piki Form', 'piki' ),
            'view_item'         => __( 'View Piki Form', 'piki' ),
            'search_items'      => __( 'Search Piki Forms', 'piki' ),
            'not_found'         =>  __( 'No Piki Form found', 'piki' ),
            'not_found_in_trash'=> __( 'No Piki Form in the trash', 'piki' ),
            'parent_item_colon' => __(' Parent item colon', 'piki' ),
        );      
        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => false,
            'query_var'             => false,
            'rewrite'               => false,
            'hierarchical'          => false,
            'menu_position'         => 9,
            'exclude_from_search'   => true,
            'supports'              => array( 'title', 'thumbnail' ),
            'show_ui'               => true, 
            'show_in_menu'          => false,
            'menu_icon'             => Piki::url( 'images/piki-icon.png', __FILE__ ),
            'register_meta_box_cb'  => array( 'PikiForms_ctype', 'add_formfields' ),
        );
        register_post_type( PikiForms_ptype, $args );
        // Hook para salvar o conteúdo
        add_action( 'save_post', array( 'PikiForms_ctype', 'save_formfields' ) );
    }

    // Adiciona os campos 
    public static function add_formfields( $post ){
        if( $post->post_type == PikiForms_ptype ):
            add_meta_box( 
                'pikiform_fields', 
                'Campos', 
                array( 'PikiForms_ctype', 'render_formfields' ), 
                PikiForms_ptype, 
                'advanced',
                'high'
            );
        endif;
    }

    public static function render_formfields( $post ){
        $options = get_post_meta( $post->ID, 'formfields', true );
        $options = unserialize( base64_decode( $options ) );
        ?>
        <input type="hidden" name="wp_meta_box_nonce" value="<?php echo wp_create_nonce( basename(__FILE__) ); ?>" />
        <table class="form-table pkmeta" id="pikiform-formfields">
            <tr>
                <td>
                    <div class="PikiField clearfix">
                        <div class="fields-options">
                            <?php echo self::options_fields( $options ); ?>
                        </div>
                        <div class="wrapp-fields">
                            <?php
                            // Constrói os campos já existentes, se existirem
                            $fields_configs = self::get_form_settings_form_content( $options, 'formfields' );
                            if( is_array( $fields_configs ) ):
                                echo implode( '', $fields_configs );
                            endif;
                            ?>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <?php
        wp_enqueue_script( 'jquery-ui-accordion' );
        wp_enqueue_script( 'jquery-ui-droppable' );
        Piki::add_library( 'fields-masks' );
        wp_enqueue_script( 'formfields-script', Piki::url( 'includes/formfields.js', __FILE__ ) . '/', array( 'jquery' ) );
        wp_enqueue_style( 'formfields-css', Piki::url( 'includes/formfields.css', __FILE__ ) . '' );
    }

    // Salva os campos
    public static function save_formfields( $post_id ){
        
        // Dados postados
        $fields = isset( $_POST[ 'formfields' ] ) ? $_POST[ 'formfields' ] : false;
        
        // Remove os campos desnecessários
        unset( $fields[ 'new_field' ] );
       
        // Se não há campos
        if( !$fields ):
            delete_post_meta( $post_id, 'formfields' );
            return;
        endif;
        
        // Formata para ser salvo no banco
        $formated = self::array_to_fields( $fields );
        
        // Dados serializados 
        $serial = base64_encode( serialize( $formated ) );
        
        // Salva as configurações do formulário
        update_post_meta( $post_id, 'formfields', $serial );
    
    }

    public static function array_to_fields( $fields ){

        // Loop nos campos
        foreach ( $fields as $field_name => &$field ):

            // Organiza os fieldsets
            if( $field[ 'ftype' ] == 'fieldset' ):

                // Subcampos do fieldset
                $field [ 'subfields' ] = array();

                // Passa pelas configurações buscando subcampos
                foreach( $field as $key_setting => $setting ):
                    // Se a propridade é um subcampo
                    if( is_array( $setting ) && isset( $setting[ 'ftype' ] ) ):
                        $field [ 'subfields' ][ $key_setting ] = $setting;
                        unset( $field[ $key_setting ] );
                    endif;
                endforeach;

                // Organizando os subcampos
                if( !empty( $field [ 'subfields' ] ) ):
                    $field [ 'subfields' ] = self::array_to_fields( $field [ 'subfields' ] );
                endif;

            else:

                // Campos serializados
                $to_serialize = array( 'select', 'radios', 'checkboxes' );

                // Campo textarea com opções
                if( in_array( $field[ 'ftype' ], $to_serialize ) && $field[ 'options' ] != '' ):
                    $field[ 'options' ] = textarea_options::explode_value( $field[ 'options' ] );
                endif;
                
                // Passa pelas configurações, consolidando cada uma delas
                foreach ( $field as $key_setting2 => $setting2 ):
                   
                    // Se não é um array de opções
                    if( !is_array( $setting2 ) ):
                       
                        // Box de texto
                        if ( $field[ 'ftype' ] == 'boxtext' && $key_setting2 == 'content' ):
                            $field[ 'content' ] = stripslashes( $field[ 'content' ] );
                        
                        // Outras opções  
                        else:
                            $field[ $key_setting2 ] = htmlspecialchars( $setting2 );
                        endif;
                    
                    endif;
                
                endforeach;

            endif;
        
        endforeach;
        
        return $fields;
    
    }

    // Options fields
    public static function options_fields( $meta ){
        $fields = array(
            'titulo' => array(
                'ftype' => 'boxtext',
                'content' => '<div class="title clearfix">Adicionar novo campo:</div>'
            ),
            'new_field_name' => array(
                'ftype' => 'text',
                'required' => true,
                'label' => 'Nome:',
                'hide_label' => true,
                'attr' => array( 'class' => 'pikifield-new-name', 'placeholder' => 'Nome' ),
            ),
            'new_field_machine_name' => array(
                'ftype' => 'text',
                'required' => true,
                'label' => 'ID único:',
                'hide_label' => true,
                'attr' => array( 'class' => 'pikifield-new-machine-name', 'placeholder' => 'ID único' ),
            ),
            'new_field_type' => array(
                'ftype' => 'select',
                'options' => PikiFields::get_types(),
                'required' => true,
                'hide_label' => true,
                'label' => 'Tipo de campo',
                'placeholder' => 'Tipo de campo',
                'attr' => array( 'class' => 'pikifield-new-ftype' ),
            ),
            'new_field_fieldset' => array(
                'ftype' => 'select',
                'options' => self::fsets_options( $meta ),
                'required' => false,
                'attr' => array( 'class' => 'pikifield-new-fieldset' ),
            ),
            'new_field_ok' => array(
                'ftype' => 'button',
                'value' => 'Ok',
                'attr' => array( 'class' => 'button pikifield-new-ok' ),
            ),
        );
        
        $settings = array( 'key' => 'new_field' );
        $fields = PikiFields::prepare_fields( $fields, $settings );
        return form::renderize_fields_form( array( 'classname' => 'add_field_box clearfix', 'fields' => $fields ) );
    
    }

    public static function fsets_options( $fields ){
        if( !is_array( $fields ) || count( $fields )==0 ):
            return false;
        endif;
        $fsets = array( '' => 'Na raiz do formulário' );
        foreach ( $fields as $key => $field ) {
            if( $field[ 'ftype' ] == 'fieldset' ):
                $fsets[ $field['machine_name'] ] = $field['label'];
            endif;
        }
        return $fsets;
    }

    public static function reset_perms(){
        global $wp_roles;
        $all_roles = $wp_roles->roles;
        // Roles to insert caps
        $insert_caps = array( 'administrator', 'editor', 'author' );
        // Caps names
        $caps = array(
            'edit_'. PikiForms_ptype .'s' => true,
            'edit_others_'. PikiForms_ptype .'s' => false,
            'edit_published_'. PikiForms_ptype .'s' => true,
            'publish_'. PikiForms_ptype .'s' => true,
            'delete_'. PikiForms_ptype .'s' => true,
            'delete_others_'. PikiForms_ptype .'s' => false,
            'delete_published_'. PikiForms_ptype .'s' => true,
            'delete_private_'. PikiForms_ptype .'s' => false,
            'edit_private_'. PikiForms_ptype .'s' => true,
            'read_private_'. PikiForms_ptype .'s' => false,
        );
        // Loop por todas as roles
        foreach ( $insert_caps as $key_role => $role_name ):
            // Objeto da role
            $role = get_role( $role_name ); 
            // Removendo e inserindo as caps
            foreach ( $caps as $camp_name => $for_member ):
                // Remove a cap da role
                $role->remove_cap( $camp_name );
                // Insere quando necessário
                if( in_array( $role_name, $insert_caps ) ):
                    $role->add_cap( $camp_name );
                endif;
            endforeach;
        endforeach;
    }

    // Campos de configurações do formulário
    public static function form_settings_fields( $metaboxes ){
        global $post;
        $metaboxes[] = array(
            'id'         => 'pikiform_form',
            'title'      => 'Configurações',
            'post_types' => array( PikiForms_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label'         => __( 'Form title:', 'piki' ),
                    'desc'          => __( 'Whill be show on page form', 'piki' ),
                    'machine_name'  => 'pikiform_form_title',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Form description:', 'piki' ),
                    'desc'          => __( 'A little description of this form', 'piki' ),
                    'machine_name'  => 'pikiform_form_description',
                    'ftype'         => 'textarea',
                ),
                array(
                    'label'         => __( 'Public?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => 'If checked, anonimous users can submit this form.',
                    'machine_name'  => 'pikiform_public',
                    'default_value' => 'on',
                    'ftype'         => 'boolean'
                ),
                array(
                    'label'         => __( 'Preview?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'If checked, user will preview the form content.', 'piki' ),
                    'machine_name'  => 'pikiform_preview',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Callback URL after insert:', 'piki' ),
                    'machine_name'  => 'pikiform_success_redirect',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Callback URL after edit:', 'piki' ),
                    'machine_name'  => 'pikiform_edit_redirect',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Callback URL after delete:', 'piki' ),
                    'machine_name'  => 'pikiform_exclude_redirect',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Add Classes (css):', 'piki' ),
                    'desc'          => __( 'Aditional classes to the tag <form>.', 'piki' ),
                    'machine_name'  => 'pikiform_classname',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Attributes (html):', 'piki' ),
                    'desc'          => __( 'Aditional attributes to the tag <form>.', 'piki' ),
                    'machine_name'  => 'pikiform_attributes',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Success message ( insert ):', 'piki' ),
                    'machine_name'  => 'pikiform_success_message',
                    'ftype'         => 'textarea',
                ),
                array(
                    'label'         => __( 'Success message ( edit ):', 'piki' ),
                    'machine_name'  => 'pikiform_edit_success_message',
                    'ftype'         => 'textarea',
                ),
                array(
                    'label'         => __( 'Default error message:', 'piki' ),
                    'machine_name'  => 'pikiform_error_message',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Errors massages types:', 'piki' ),
                    'machine_name'  => 'pikiform_error_messages',
                    'ftype'         => 'checkboxes',
                    'options'       => array(
                        'tooltip'   => __( 'Tooltips', 'piki' ),
                        'inline'   => __( 'Inline', 'piki' ),
                        'modal'     => __( 'Modal', 'piki' ),
                    ),
                ),
                array(
                    'label'         => __( 'Use placeholders?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'If checked, the fields labels will shoing inside.', 'piki' ),
                    'machine_name'  => 'pikiform_labels_inside',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Submit button label:', 'piki' ),
                    'machine_name'  => 'pikiform_submit_button_label',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Edit button label:', 'piki' ),
                    'machine_name'  => 'pikiform_edit_button_label',
                    'ftype'         => 'text',
                ),
                array(
                    'machine_name'  => 'form_key',
                    'ftype'         => 'hidden',
                    'value'         => PikiForms_ptype,
                ),

            ),
        );
        $metaboxes[] = array(
            'id'         => 'piki_forminfo',
            'title'      => __( 'Post type', 'piki' ),
            'post_types' => array( PikiForms_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label'         => __( 'Activate post type?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Enable or disable this post type', 'piki' ),
                    'machine_name'  => 'ptype_active',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Post type:', 'piki' ),
                    'desc'          => __( 'Just letters, a to z, and hifens(singular)', 'piki' ),
                    'machine_name'  => 'ptype_name',
                    'ftype'         => 'posttype',
                ),
                array(
                    'label'         => __( 'Slug:', 'piki' ),
                    'desc'          => __( 'The name of post type in URL. Ex: slug/name-of-tye-item(plural)', 'piki' ),
                    'machine_name'  => 'ptype_slug',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Taxonomy on slug:', 'piki' ),
                    'desc'          => __( 'The taxonomy to be used on post slug', 'piki' ),
                    'machine_name'  => 'ptype_taxonomy_slug',
                    'ftype'         => 'taxonomy_select',
                ),
                array(
                    'label'         => __( 'Disable query var?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'A post type cannot be loaded at /?{query_var}={single_post_slug}', 'piki' ),
                    'machine_name'  => 'ptype_query_var',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Description:', 'piki' ),
                    'desc'          => __( 'A short descriptive summary of what the post type is.', 'piki' ),
                    'machine_name'  => 'ptype_description',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Public?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Controls how the type is visible to authors (show_in_nav_menus, show_ui) and readers (exclude_from_search, publicly_queryable).', 'piki' ),
                    'machine_name'  => 'ptype_public',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Exclude from search?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Whether to exclude posts with this post type from front end search results.', 'piki' ),
                    'machine_name'  => 'ptype_exclude_from_search',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Publicly queryable?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Whether queries can be performed on the front end as part of parse_request().', 'piki' ),
                    'machine_name'  => 'ptype_publicly_queryable',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Show UI?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Whether to generate a default UI for managing this post type in the admin.', 'piki' ),
                    'machine_name'  => 'ptype_show_ui',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Show in nav menus?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Whether post_type is available for selection in navigation menus.', 'piki' ),
                    'machine_name'  => 'ptype_show_in_nav_menus',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Show in menu?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Where to show the post type in the admin menu. show_ui must be true.', 'piki' ),
                    'machine_name'  => 'ptype_show_in_menu',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Show in admin bar?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Whether to make this post type available in the WordPress admin bar.', 'piki' ),
                    'machine_name'  => 'ptype_show_in_admin_bar',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Menu position', 'piki' ),
                    'desc'          => __( 'The position in the menu order the post type should appear. show_in_menu must be true.', 'piki' ),
                    'machine_name'  => 'ptype_menu_position',
                    'default_value' => 5,
                    'ftype'         => 'number',
                ),
                array(
                    'label'         => __( 'Menu icon name:', 'piki' ),
                    'desc'          => strtr( __( 'The name of the icon from the %s', 'piki' ), array( '%s' => '<a href="http://melchoyce.github.io/dashicons/" target="_blank">iconfont</a>' ) ),
                    'machine_name'  => 'ptype_menu_icon',
                    'ftype'         => 'text',
                ),
                array(
                    'label'         => __( 'Menu ícon image', 'piki' ),
                    'desc'          => __( 'The icon image to be used for this menu', 'piki' ),
                    'machine_name'  => 'ptype_menu_icon_image',
                    'ftype'         => 'imagewp',
                ),
                array(
                    'label' => __( 'Supports:', 'piki' ),
                    'ftype' => 'checkboxes',
                    'options' => array(
                        'editor'            => __( 'Editor', 'piki' ),
                        'author'            => __( 'Autor', 'piki' ),
                        'thumbnail'         => __( 'Thumbnail', 'piki' ),
                        'excerpt'           => __( 'Excerpt', 'piki' ),
                        'trackbacks'        => __( 'Trackbacks', 'piki' ),
                        'revisions'         => __( 'Revisions', 'piki' ),
                        'page-attributes'   => __( 'Page attributes', 'piki' ),
                        'comments'          => __( 'Comments', 'piki' ),
                        'post-formats'      => __( 'Post formats', 'piki' ),
                    ),
                    'machine_name'  => 'ptype_supports',
                ),
                array(
                    'label'         => __( 'Has archive?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Enables post type archives. Will use $post_type as archive slug by default.', 'piki' ),
                    'machine_name'  => 'ptype_has_archive',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Taxonomys:', 'piki' ),
                    'machine_name'  => 'ptype_taxonomys',
                    'ftype'         => 'checkboxes',
                    'options'       => array(
                        'post_tag'  => __( 'Tags', 'piki' ),
                        'category'  => __( 'Category', 'piki' ),
                    ),
                ),
                array(
                    'label'         => __( 'Can export?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Can this post_type be exported.', 'piki' ),
                    'machine_name'  => 'ptype_can_export',
                    'default_value' => 'on',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Moderate?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'Save public submissions as Draft', 'piki' ),
                    'machine_name'  => 'ptype_moderate',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Allways edit?', 'piki' ),
                    'label_option'  => __( 'Yes', 'piki' ),
                    'desc'          => __( 'If check, a new post will be created on start the form, and the right fields will be saved on each submission.', 'piki' ),
                    'machine_name'  => 'ptype_allways_edit',
                    'ftype'         => 'boolean',
                ),
                array(
                    'label'         => __( 'Labels:', 'piki' ),
                    'desc'          => __( 'Labels for this post type. By default, post labels are used for non-hierarchical post types and page labels for hierarchical ones.', 'piki' ),
                    'machine_name'  => 'ptype_labels',
                    'ftype'         => 'textarea_options',
                    'default_value' => 'name|Items
singular_name|Item
add_new|Adicionar novo
add_new_item|Adicionar novo item
edit_item|Editar item
new_item|Novo item
view_item|Ver item
search_items|Buscar items
not_found|Nenhum item encontrado
not_found_in_trash|Nenhum item na lixeira',
                    'merge_with_defaults' => 'on',
                ),
            ),
        );

        $metaboxes[] = array(
            'id'         => 'perms',
            'title'      => 'Permissões',
            'post_types' => array( PikiForms_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => __( 'Permissions', 'piki' ), 
                    'machine_name' => 'capabilities',
                    'ftype' => 'capabilities',
                ),
            ),
        );

        $metaboxes[] = array(
            'id'         => 'email_send',
            'title'      => 'Envio por email',
            'post_types'      => array( PikiForms_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Enviar email?',
                    'label_option' => 'Sim',
                    'desc'   => 'Marcando este ítem, os dados submetidos no formulário serão enviados por email',
                    'machine_name'   => 'send_email',
                    'ftype' => 'boolean',
                ),
                array(
                    'label' => 'Assunto:',
                    'desc'   => 'Assunto do email a ser enviado',
                    'machine_name'   => 'email_subject',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Email de origem:',
                    'desc'   => 'Email sender. Precisa ser um email válido, do mesmo domínio do site',
                    'machine_name'   => 'email_sender',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Email de destino:',
                    'desc'   => 'Email(s) para onde serão enviados os dados. Para mais de um email, separe com ; .',
                    'machine_name'   => 'email_to',
                    'ftype' => 'text',
                ),
                array(
                    'label' => 'Email de resposta (reply to):',
                    'desc'   => 'Endereço para onde o email será enviado em caso de resposta',
                    'machine_name'   => 'email_reply_to',
                    'ftype' => 'text',
                ),
            ),
        );

        /*
        $meta_boxes[] = array(
            'id'         => 'import',
            'title'      => 'Importar campos',
            'post_types'      => array( PikiForms_ptype ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true,
            'fields'     => array(
                array(
                    'label' => 'Nome do arquivo:',
                    'desc'   => 'Arquivo com as configurações dos campos',
                    'machine_name'   => 'import_code',
                    'ftype' => 'text',
                ),
            ),
        );
        */

        return $metaboxes;
    }

    public static function ptypes_options(){
        $ptypes = get_post_types();
        unset( $ptypes[ 'attachment' ], $ptypes[ 'revision' ], $ptypes[ 'nav_menu_item' ], $ptypes[ 'pikiform' ] );
        $ptypes_options = array(array(
            'name' => 'Próprio',
            'value' => '_self'
        ));
        foreach ( $ptypes as $key => $ptype ) {
            $obj = get_post_type_object( $ptype );
            $ptypes_options[] = array(
                'name'  => $obj->labels->singular_name,
                'value' => $ptype,
            );
        }
        return $ptypes_options;
    }

    public static function get_form_settings_form_content( $fields, $form_key ){
        
        // Se não existem campos
        if ( !is_array( $fields ) || count( $fields ) == 0 ):
            return false;
        endif;
        $return = array();
        // Passa por todos os campos existentes
        foreach ( $fields as $f => $fconfigs ) {
            // Se for um subform, envia os campos para renderização
            if ( $fconfigs[ 'ftype' ] == 'fieldset' ):
                $return[] = self::get_form_settings_fieldset( $fconfigs, $form_key );
            else:
                $torender = self::get_form_settings_field( $fconfigs, $form_key, array( $fconfigs[ 'machine_name' ] ) );
                $return[] = $torender[ 'field' ];
            endif;
        }
        return $return;
    }

    public static function get_form_settings_fieldset( $fieldset, $form_key ){
        // Subcampos renderizados, se existirem
        $subs_rendered = array();
        if( array_key_exists( 'subfields', $fieldset ) ):
            $subs = $fieldset[ 'subfields' ];
            unset( $fieldset[ 'subfields' ] );
            if ( isset( $subs[ 'weight' ] ) ):
                unset( $subs[ 'weight' ] );
            endif;
            $subs_rendered = self::get_form_settings_fields( $subs, $form_key, $fieldset[ 'machine_name' ] );
        endif;
        // Fieldset renderizado
        $parent = array( $fieldset[ 'machine_name' ] );
        $htmlsubs = implode( '', $subs_rendered );
        $rendered = self::get_form_settings_field( $fieldset, $form_key, $parent, $htmlsubs );
        return $rendered[ 'field' ];
    }

    public static function get_form_settings_fields( $fields, $form_key, $parent=false ){

        $html_subs = array();
        // Percorre o array de subcampos
        foreach ( $fields as $ks => $sub ) {
            // echo $sub . '<br />';
            // Pais do elemento
            $parents = array( $sub[ 'machine_name' ] );
            if( $parent ){
                array_unshift( $parents , $parent );
            }
            // Elemento renderizado
            $rendered = self::get_form_settings_field( $sub, $form_key, $parents );
            $html_subs[] = $rendered[ 'field' ];
        }
        return $html_subs;
    }

    public static function get_form_settings_field( $field, $form_key, $parents = false, $subfields = '' ){

        if( !class_exists( $field[ 'ftype' ] ) ):
            return $field;
        endif;
        
        // Instancia a classe do campo           
        $f = new $field[ 'ftype' ];
        
        // Recupera o array com as configurações dos campos
        $ftype_fields = $f->get_settings_fields( $field );

        // Configurações do form
        $form_settings = array(
            'key' => $form_key,
            'parents' => $parents,
            'fields' => $ftype_fields,
        );
        
        // Configura os campos
        $ftype_fields = PikiFields::prepare_fields( $ftype_fields, $form_settings );
        
        // Seta o valor do campo ftype       
        $ftype_fields[ 'ftype' ][ 'value' ] = $field[ 'ftype' ];
        
        // Classe do campo
        $classname = ( $field[ 'ftype' ] == 'fieldset' ) ? 'footer clearfix' : 'field-content clearfix';
        
        // Campos renderizados
        $rendereds_fields = form::renderize_fields_form( array( 'classname' => $classname, 'fields' => $ftype_fields ) );
        
        // HTML do campo
        $html_return = self::get_form_settings_field_wrapper( $field, $f->get_label(), $rendereds_fields, $subfields );
        
        return array(
            'status' => 'success',
            'nome' => $f->get_label(),
            'ftype' => $field[ 'ftype' ],
            'field' => $html_return,
            'parent' => $parents,
        );
   
    }

    public static function get_form_settings_field_wrapper( $field, $label, $fields, $subfields=''  ){
        if ( $field[ 'ftype' ] == 'fieldset' ):
            PikiField::add_attributes( $field, array(
                'rel' => $field[ 'machine_name' ],
                'class' => array( 'fieldset-options' ),
            ));
            $html_return = '<div';
            PikiField::set_attributes( $html_return, $field );
            $html_return .= '>
                    <div class="header">
                        <h3 class="clearfix">
                            <span class="dashicons dashicons-info" title="'. $label .'"></span>
                            <span class="nome">' . $field[ 'label' ] . '</span> 
                        </h3>
                        <span class="dashicons dashicons-trash remove-button"></span>
                    </div>
                    <div class="fieldset-content">
                        <div class="fieldset-fields clearfix">'
                            . $subfields .
                        '</div>
                        ' . $fields . '
                    </div>
                </div>'
            ;
        else:
            PikiField::add_attributes( $field, array(
                'rel' => $field[ 'machine_name' ],
                'class' => array( 'field-options' ),
            ));
            $html_return = '<div';
            PikiField::set_attributes( $html_return, $field );
            $html_return .= '>
                    <div class="header">
                        <h3 class="clearfix">
                            <span class="dashicons dashicons-info" title="'. $label .'"></span>
                            <span class="nome">' . $field[ 'label' ] . '</span> 
                            <span class="machine_name">(' . $field[ 'machine_name' ] . ')</span>
                        </h3>
                        <span class="dashicons dashicons-trash remove-button"></span>
                    </div>
                    ' . $fields . '
                </div>'
            ;
        endif;
        return $html_return;
    }

    public static function get_field_settings_fields(){
            
        $name = isset( $_POST[ 'name' ] ) && !isempty( $_POST[ 'name' ] ) ? $_POST[ 'name' ] : false;
        $machine_name = isset( $_POST[ 'machine_name' ] ) && !isempty( $_POST[ 'machine_name' ] ) ? $_POST[ 'machine_name' ] : false;
        $ftype = isset( $_POST[ 'ftype' ] ) && !isempty( $_POST[ 'ftype' ] ) ? $_POST[ 'ftype' ] : false;
        $fieldset = isset( $_POST[ 'parent_field' ] ) && !isempty( $_POST[ 'parent_field' ] ) ? $_POST[ 'parent_field' ] : false;

        if( !$machine_name ):
            Piki::return_json(array(
                'status' => 'error',
                'type' => 'nomachinenamefield'
            ));
        elseif ( !$ftype ):
            Piki::return_json(array(
                'status' => 'error',
                'type' => 'notypefield'
            ));
        endif;

        if( !$name ):
            $name = $machine_name;
        endif;

        $machine_name = transliterate( $machine_name );
        $parents = array( $machine_name );
        if ( $fieldset ):
            array_unshift( $parents , $fieldset );
        endif;

        $topass = array(
            'label' => $name, 
            'ftype' => $ftype,
            'machine_name' => $machine_name,
            'attr' => array( 'class' => 'new-field' ),
        );
        
        $settings_field = self::get_form_settings_field( $topass, 'formfields', $parents );
        
        Piki::return_json( $settings_field );

    }

    // Nova linha de um campo de construção de formulário
    public static function formfields_get_row(){
        self::get_field_settings_fields();
    }

}

// Init
add_action( 'init', array( 'PikiForms_ctype', 'init' ) );
// Ajax para inclusão de um novo campo na montagem dos formulários
add_action( 'wp_ajax_formfields_get_row', array( 'PikiForms_ctype', 'formfields_get_row' ) );
// Campos de configurações do formuláro
//add_filter( 'pkmeta_register_fields', array( 'PikiForms_ctype', 'form_settings_fields' ) );
