<?php
# Desinstalação da feature
function piki_forms_deactivate(){
    global $wp_roles;
    # Objeto da role
    $role_obj = get_role( 'administrator' );  
    # Caps names
    $caps = array(
        'edit_pikiforms' => true,
        'edit_others_pikiforms' => false,
        'edit_published_pikiforms' => true,
        'publish_pikiforms' => true,
        'delete_pikiforms' => true,
        'delete_others_pikiforms' => false,
        'delete_published_pikiforms' => true,
        'delete_private_pikiforms' => false,
        'edit_private_pikiforms' => true,
        'read_private_pikiforms' => false,
    );
    # Removendo e inserindo as caps
    foreach ( $caps as $camp_name => $for_member ):
        # Insere quando necessário
        $role_obj->remove_cap( $camp_name );
    endforeach;
}
piki_forms_deactivate();
