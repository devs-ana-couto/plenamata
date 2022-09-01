<?php
// Plugin settings
require_once( Piki::path( __FILE__ ) . '/settings.php' );

class Groups {

    public static function get_group_users( $group_id ){
        global $wpdb;
        return $wpdb->get_col($wpdb->prepare(
            "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value = %s",
            array( GROUPS_META_KEY, $group_id )
        ));
    }
    
    public static function change_caps( $all_caps, $caps, $args, $user ){

        global $pagenow;

        // Verifica se o usuário já tem as permissões
        $can = true;
        foreach ( (array)$caps as $cap ) {
            if ( !isset( $all_caps[ $cap ] ) || empty( $all_caps[ $cap ] ) ):
                $can = false;
            endif;
        }
        if( $can ){ return $all_caps; }

        // ID do atual usuário
        $actual_id = (int)$user->ID;
       
        // ID do post
        $post_id = false;
        if( $pagenow === 'post.php' && isset( $_POST[ 'post_ID' ] ) ):
            $post_id = $_POST[ 'post_ID' ];
        elseif( isset( $args[ 2 ] ) ) :
            $post_id = (int)$args[ 2 ];
        endif;
        // Se o post não foi informado
        if( empty( $post_id ) ):
            return $all_caps;
        endif;
        // Proprietário do post
        $owner_id = (int)get_post_field( 'post_author', $post_id );
       
        // Se é do próprio usuário
        if( $actual_id === $owner_id ){ return $all_caps; }

        // Verifica se é do mesmo grupo do dono
        if( !Groups::same_group( $owner_id, $actual_id ) ){ return $all_caps; }

        // Dá a permissão necessária
        foreach ( (array) $caps as $cap ):

            // Tipo de permissão
            $type = false;
            if( strpos( $cap, '_others_' ) ):
                $type = 'others';
            elseif( strpos( $cap, '_private_' ) ):
                $type = 'private';
            endif;

            // Permissão proprietária
            $permissao_prop = str_replace( $type . '_', '', $cap );

            if( $type && isset( $user->allcaps[ $permissao_prop ] ) && !empty( $user->allcaps[ $permissao_prop ] ) ):
                $all_caps[ $cap ] = true;
            endif;
        
        endforeach;

        return $all_caps;

    }

    public static function same_group( $user1, $user2 ){
        // User 1 groups
        $user1_groups = get_user_meta( $user1, GROUPS_META_KEY );
        if( empty( $user1_groups ) ){ return false; }
        // User 2 groups
        $user2_groups = get_user_meta( $user2, GROUPS_META_KEY );
        if( empty( $user2_groups ) ){ return false; }
        // Verifica se existe algum grupo em comum
        $same_group = array_intersect ( $user1_groups, $user2_groups );
        return count( $same_group ) !== 0;
    }

    // Salva os grupos para os usuários
    public static function group_submit( $settings, $posted ){     

        global $wpdb;
        
        // Apenas o formulário de tipos de post
        if( $settings[ 'key' ] != GROUPS_KEY || empty( $posted[ 'users' ] ) ):
            return;
        endif;
        
        // ID do grupo
        $group_id = absint( $settings[ 'post_item' ]->ID );

        // Usuários atuais
        $actuals = $wpdb->get_col($wpdb->prepare(
            "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value = %d",
            array( GROUPS_META_KEY, $group_id )
        ));

        // Usuários postados
        $posteds = $posted[ 'users' ];

        // Usuários que devem ser removidos
        $toremove = array_diff( $actuals, $posteds );
        if( !empty( $toremove ) ):
            foreach( $toremove as $id_to_remove ):
                delete_user_meta( $id_to_remove, GROUPS_META_KEY, $group_id );
            endforeach;
        endif;
        
        // Associando o grupo aos usuários
        foreach( $posteds as $user_id ):
            
            // Grupos que o usuário já tem
            $user_actuals = get_user_meta( $user_id, GROUPS_META_KEY );
            
            // Se necessário, adiciona
            if( !in_array( $group_id, $user_actuals ) ):
                add_user_meta( $user_id, GROUPS_META_KEY, $group_id );
            endif;
        
        endforeach;
    
    }

}
// Alterando as permissões
add_action( 'user_has_cap', array( 'Groups', 'change_caps' ), 10, 4 );
// Salvando o tipo de post
add_action( 'pikiform_submit', array( 'Groups', 'group_submit' ), 10, 2 );

// Dados do formulário de tipos de post
function pikiform_groups_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => false,
        'key' => GROUPS_KEY,
        'title' => '',
        'description' => '',
        'edit_redirect' => false,
        'success_redirect' => false,
        'exclude_redirect' => false,
        'success_message' => '<div class="updated notice notice-success" id="message"><p>Grupo criado com sucesso</p></div>',
        'error_messages' => array(
            'tooltip' => 'tooltip',
        ),
        'edit_success_message' => '<div class="updated notice notice-success" id="message"><p>Grupo editado com sucesso</p></div>',
        'classname' => 'settings-form',
        'attributes' => '',
        'submit_button_label' => 'Criar',
        'edit_button_label' => 'Salvar',
        'email' => array(
            'send' => false,
            'subject' => '',
            'sender' => '',
            'to' => '',
            'replyto' => '',
        ),
        'public' => false,
        'post_type' => '',
        'data_type' => 'custom',
        'table' => $wpdb->prefix . GROUPS_TABLE
    );
}

// Campos do formulário de cadastro
function pikiform_groups_fields(){
    return array(
        array(
            'label'         => __( 'Nome:', 'piki' ),
            'description'   => __( 'Nome do grupo.', 'piki' ),
            'machine_name'  => 'name',
            'ftype'         => 'text',
            'unique'        => true,
            'required'      => true,
            'maxlength'     => 32,
        ),
        array(
            'label'         => __( 'Descrição:', 'piki' ),
            'description'   => __( 'Descrição do grupo.', 'piki' ),
            'machine_name'  => 'description',
            'ftype'         => 'text',
            'unique'        => false,
            'required'      => false,
        ),
        array(
            'label'         => __( 'Usuários:', 'piki' ),
            'description'   => __( 'Digite o nome do usuário que deseja adicionar.', 'piki' ),
            'machine_name'  => 'users',
            'ftype'         => 'users',
            'unique'        => true,
            'no_proccess'   => true,
        ),
    );
}

// Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;
