<?php

# Cria o formulário
$form_id = get_option( 'topicos_fid', false );

/* PERMISSÕES */

    global $wp_roles;
    # Roles

    $all_roles = $wp_roles->roles;
    $editable_roles = apply_filters( 'editable_roles', $all_roles );
    # Roles to insert caps
    $insert_caps = array( 'administrator', 'editor', 'author', PKPerfil_role );
    # Caps names
    $caps = array(
        'edit_[ptype]s' => true,
        'edit_others_[ptype]s' => false,
        'edit_published_[ptype]s' => true,
        'publish_[ptype]s' => true,
        'delete_[ptype]s' => true,
        'delete_others_[ptype]s' => false,
        'delete_published_[ptype]s' => true,
        'delete_private_[ptype]s' => false,
        'edit_private_[ptype]s' => true,
        'read_private_[ptype]s' => false,
    );
    # Loop por todas as roles
    foreach ( $editable_roles as $role_name => $role ):
        # Objeto da role
        $role_obj = get_role( $role_name );  
        # Removendo e inserindo as caps
        foreach ( $caps as $camp_name => $for_member ):
            # Nome da cap com o nome do tipo de post inserido
            $cap_name_replaced = str_replace( '[ptype]', PKForum_ptype, $camp_name );
            # Remove a cap da role
            $role_obj->remove_cap( $cap_name_replaced );
            # Insere quando necessário
            if( in_array( $role_name, $insert_caps ) && ( $role_name != PKPerfil_role || $for_member === true ) ):
                $role_obj->add_cap( $cap_name_replaced );
            endif;
        endforeach;
    endforeach;


if( $form_id !== false ):
    $form = get_post( $form_id );
    if( is_object( $form ) ):
        return;
    else:
        delete_option( 'topicos_fid' );
    endif;
endif;

$default_form = array (
    'campos_obrigatorios' => array (
        'label' => 'todos os campos são obrigatórios',
        'description' => '',
        'ftype' => 'fieldset',
        'machine_name' => 'campos_obrigatorios',
        'multiple' => array (
            'minimo' => '1',
            'maximo' => '10',
            'abertos' => '2',
        ),
        'subfields' => array (
            'tema' => array (
                'label' => 'Em qual tema sua discussão se encaixa melhor?',
                'description' => '',
                'required' => 'on',
                'ftype' => 'taxonomy',
                'machine_name' => 'tema',
                'taxonomy' => 'tipo-de-dependencia',
                'widget' => 'select',
            ),
            'titulo' => array (
                'label' => 'Título',
                'description' => '<b>Título</b>Deve resumir o assunto tratado no tópico',
                'required' => 'on',
                'ftype' => 'title',
                'machine_name' => 'titulo',
                'maxlength' => '',
            ),
            'descricao' => array (
                'label' => 'Descrição',
                'description' => '<b>Descrição</b>Você deve detalhar o tema que quer discutir',
                'required' => 'on',
                'ftype' => 'body',
                'machine_name' => 'descricao',
                'maxlength' => '',
            ),
            'tags' => array (
                'label' => 'Palavras-chave',
                'description' => '<b>Palavras-chave:</b>Resume os temas principais do tópico. Relacione as palavras-chave separando-as por vírgulas (ex.: maconha, cigarro, tratamento)',
                'required' => 'on',
                'ftype' => 'taxonomy',
                'machine_name' => 'tags',
                'taxonomy' => 'post_tag',
                'widget' => 'text',
            ),
        ),
    ),
);

$form_id = wp_insert_post(array(
    'comment_status' => 'closed',
    'ping_status' => 'closed',
    'post_title' => 'Formulário de tópico',
    'post_status' => 'publish',
    'post_type' => PikiForms_ptype,
));
add_option( 'topicos_fid', $form_id );

update_post_meta( $form_id, PikiForms_metakey, 'form'.PKForum_ptype );
update_post_meta( $form_id, PikiField_metaid, base64_encode( serialize( $default_form ) ) );
update_post_meta( $form_id, 'ptype', PKForum_ptype );
update_post_meta( $form_id, 'save_in_db', 'on' );
update_post_meta( $form_id, 'preview', 'on' );
update_post_meta( $form_id, 'pikiform_form_title', 'Crie um tópico' );
update_post_meta( $form_id, 'pikiform_form_description', 'Crie um tópico de discussão e conheça a opinião de outros participantes.' );
update_post_meta( $form_id, 'classname', 'descriptions-floating' );
update_post_meta( $form_id, 'success_message', 'Seu tópico foi criado com sucesso' );
