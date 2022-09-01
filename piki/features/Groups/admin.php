<?php
// Nome do campo no formulário de edição do usuário
define( 'FORM_USER_GROUPS_FIELDS', 'user_groups' );

class GroupsSettingsPage {

    public $groups_obj;
    public $baseurl;
    private $options;
    private $images;
    private $action;
    private $item_id;
    private $item = false;
    private $page;
    private $page2;

    public function __construct() {
        // URL base
        $this->baseurl = get_site_url() . '/wp-admin/users.php?page=piki-grupos';
        // Screen options
        add_filter( 'set-screen-option', array( __CLASS__, 'set_screen' ), 10, 3 );
        // Menu ítem
        add_action( 'admin_menu', array( $this, 'plugin_menu' ) );
    }

    private function init(){
        // Action
        $this->action = isset( $_GET[ 'action' ] ) && in_array( $_GET[ 'action' ], array( 'insert', 'edit' ) ) ? $_GET[ 'action' ] : 'list';
        // Item
        if( $this->action == 'edit' ):
            $this->get_item_from_url();
        endif;   
    }

    public function get_item_from_url(){
        global $wpdb;
        // Ítem ID na URl
        if( !isset( $_GET[ 'item' ] ) || (int)$_GET[ 'item' ] <= 0 ):
            Piki::error( 'O ID do ítem não foi informado' );
        endif;
        // ID do ítem na URL
        $this->item_id = isset( $_GET[ 'item' ] ) && (int)$_GET[ 'item' ] > 0 ? $_GET[ 'item' ] : false;
        // Se o ítem não existe
        if( !$this->item_id ):
            Piki::error( 'O ID não foi informado.' );
        endif;
        // Group
        $this->item = get_custom( $this->item_id, GROUPS_TABLE );
        // Group users
        $this->item->users = Groups::get_group_users( $this->item->ID );
    }

    // Screen
    public static function set_screen( $status, $option, $value ) {
        return $value;
    }
    
    // Add options page
    public function plugin_menu() {
        $this->page = add_submenu_page( 
            'users.php', 
            'Grupos', 
            'Grupos', 
            GROUPS_CAP, 
            'piki-grupos', 
            array( $this, 'admin_groups' ) 
        );
        add_action( "load-$this->page", array( $this, 'screen_option' ) );
        $this->page2 = add_submenu_page(
            'piki-dashboard',
            'Grupos',
            'Grupos',
            GROUPS_CAP,
            'piki-grupos',
            array( $this, 'admin_groups' )
        );
        add_action( "load-$this->page2", array( $this, 'screen_option' ) );
    }

    // Screen options
    public function screen_option(){
        $option = 'per_page';
        $args = array(
            'label'   => __( 'Grupos' ),
            'default' => 20,
            'option'  => 'taxonimies_per_page'
        );
        add_screen_option( $option, $args );
        $this->ptypes_obj = new Piki_List_Table(array(
            'labels' => array(
                'singular' => 'Grupo',
                'plural' => 'Grupos'
            ),
            'table' => GROUPS_TABLE,
            'columns' => array(
                'name' => 'Nome',
                'description' => 'Descrição',
            ),
            'sortable_columns' => array(
                'name' => 'name',
            ),
            'actions' => array(
                'edit' => 'Edit',
                'delete' => 'Delete',
            )
        ));
    }
   
    // Página de administração
    public function admin_groups(){
        // Inicia
        $this->init();
        ?>
        <div class="wrap">
            <?php
            // Lista
            if( $this->action == 'list' ):
                ?>
                <h1>
                    Grupos
                    <a class="add-new-h2" href="<?php echo $this->baseurl; ?>&action=insert">Criar grupo</a>
                </h1>
                <?php
                $this->ptypes_obj->prepare_items();
                $this->ptypes_obj->display();
            // Formulário
            else:
                ?>
                <h1>
                    <?php echo( $this->action == 'insert' ? __( 'Adicionar novo' ) : __( 'Edit' ) ); ?> Grupo
                    <?php if( $this->action == 'edit' ): ?>
                    <a class="add-new-h2" href="<?php echo $this->baseurl; ?>&action=insert">Criar grupo</a>
                    <?php endif; ?>
                </h1>
                <?php
                $this->admin_groups_page();
            endif;
            ?>
        </div>
        <?php
    }

    // Página de edição do formulário
    public function admin_groups_page(){
        ?>
        <div id="poststuff">
            <div id="post-body" class="metabox-holder columns-2">
                <div id="post-body-content">
                    <?php
                    // Formulário
                    $form = PikiForms::get_form( GROUPS_KEY, $this->item );
                    echo $form[ 'html' ];
                    ?>
                </div>
                <div id="postbox-container-1">
                    <div class="postbox" id="submitdiv">
                        <h3 class="hndle ui-sortable-handle"><span>Status</span></h3>
                        <div class="inside">
                            <div id="submitpost" class="submitbox">
                                <div id="minor-publishing">
                                    <div style="display:none;">
                                        <p class="submit"><input type="submit" value="Salvar" class="button" id="save" name="save"></p>
                                    </div>
                                    <div id="misc-publishing-actions">
                                        <div class="misc-pub-section curtime misc-pub-curtime">
                                            <?php 
                                            $time = empty( $this->item ) ? time() : strtotime( $this->item->created ); 
                                            $txt_data = empty( $this->item ) ? 'Data' : 'Criado em';
                                            ?>
                                            <span id="timestamp"><?php echo $txt_data; ?>: <b><?php echo str_replace( '.', ',', date_i18n( 'd M Y \à\s H:i', $time ) ); ?></b></span>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div id="major-publishing-actions">
                                    <?php if( !empty( $this->item ) ): ?>
                                    <div id="delete-action">
                                        <a href="<?php echo Piki_List_Table::_action_link( $this->item->ID ); ?>" class="submitdelete deletion">Excluir</a>
                                    </div>
                                    <?php endif; ?>
                                    <div id="publishing-action">
                                        <span class="spinner"></span>
                                        <input type="hidden" value="<?php echo( empty( $this->item ) ? $form[ 'submit_button_label' ] : $form[ 'edit_button_label' ] ); ?>" id="original_publish" name="original_publish">
                                        <input type="submit" value="<?php echo( empty( $this->item ) ? $form[ 'submit_button_label' ] : $form[ 'edit_button_label' ] ); ?>" id="publish" class="button button-primary button-large" name="save">
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    // Campo de grupo no formulário do usuário
    public function profile_fields( $user ) { 
        global $wpdb;
        $groups = get_customs( GROUPS_TABLE, array( 'ID', 'name' ), 'name' );
        $values = get_user_meta( $user->ID, GROUPS_META_KEY );
        if( empty( $groups ) ):
            $field = 'Nenhum grupo cadastrado.';
        else:
            $_field = array(
                'ftype' => 'select',
                'options' => array(),
                'name_html' => FORM_USER_GROUPS_FIELDS . '[]',
                'id' => FORM_USER_GROUPS_FIELDS,
                'machine_name' => FORM_USER_GROUPS_FIELDS,
                'attr' => array( 'multiple' => 'multiple' ),
                'value' => $values
            );
            foreach( $groups as $group ):
                $_field[ 'options' ][ $group->ID ] = $group->name;
            endforeach;
            $field = select::get_field( $_field );
        endif;
        ?>
        <h3>Grupos</h3>
        <table class="form-table">
            <tr>
                <th><label for="user-group">Grupo que o usuário fará parte</label></th>
                <td>
                    <?php echo $field; ?>
                    <span class="description">Para marcar mais de um grupo, ou desmarcar um já marcado, mantenha a tecla 'Control' pressionada.</span>
                </td>
            </tr>
        </table>
        <?php
    }

    public function profile_save( $user_id ) {

        // Permissions
        if ( !current_user_can( GROUPS_CAP ) || !current_user_can( 'edit_user', $user_id ) ):
            return false;
        endif;

        // Removendo grupos atuais do usuário
        delete_user_meta( $user_id, GROUPS_META_KEY );

        // Grupos postados
        $posted = !isset( $_POST[ FORM_USER_GROUPS_FIELDS ] ) ? array() : $_POST[ FORM_USER_GROUPS_FIELDS ];
        if( empty( $posted ) ){ return; }

        // Adicionando os grupos
        foreach( $posted as $group_id ):
            add_user_meta( $user_id, GROUPS_META_KEY, $group_id );
        endforeach;
        
    }

    // Adicionando usuários ao form
    public function post_meta( $meta, $settings ){
        // Apenas form de grupos
        if( $settings[ 'key' ] !== GROUPS_KEY ):
            return $meta;
        endif;
        // Atribuindo valores
        $meta[ 'users' ] = $this->item->users;
        return $meta;
    }

    // Removendo user meta quando um grupo é removido
    public function delete_group( $table, $group_id ){
        global $wpdb;

        // Just table
        if( $table !== GROUPS_TABLE ){ return; }
        
        // Pemissions
        if ( !current_user_can( GROUPS_CAP ) || !current_user_can( 'edit_user', $user_id ) ):
            return;
        endif;
        
        // Deleting
        $wpdb->query($wpdb->prepare( 
            "DELETE FROM $wpdb->usermeta WHERE meta_key = %s AND meta_value = %d", 
            array( GROUPS_META_KEY, $group_id ) 
        ));
    }

    public static function capability( $cap ) {
        return GROUPS_CAP;
    }
    public static function extra_caps( $caps ) {
        $caps[] = GROUPS_CAP;
        return $caps;
    }

    public static function add_files(){
        wp_enqueue_style( 'groups-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

}
// Inicia a página de administração
$pikigroups_settings_page = new GroupsSettingsPage();
// Formulário do usuário
add_action( 'user_new_form', array( $pikigroups_settings_page, 'profile_fields' ) );
add_action( 'show_user_profile', array( $pikigroups_settings_page, 'profile_fields' ) );
add_action( 'edit_user_profile', array( $pikigroups_settings_page, 'profile_fields' ) );
// Salvando formulário de usuário
add_action( 'edit_user_created_user', array( $pikigroups_settings_page, 'profile_save' ) );
add_action( 'personal_options_update', array( $pikigroups_settings_page, 'profile_save' ) );
add_action( 'edit_user_profile_update', array( $pikigroups_settings_page, 'profile_save' ) );
// Adicionando os usuáros ao form
add_filter( 'pikiform_post_meta', array( $pikigroups_settings_page, 'post_meta' ), 10, 2 );
// Remoção de grupo
add_action( 'piki_list_table_delete', array( $pikigroups_settings_page, 'delete_group' ), 10, 2 );
// Styles and Scripts
add_action( 'admin_enqueue_scripts', array( 'GroupsSettingsPage', 'add_files' ) );
// Members plugin
add_filter( 'groups_capability', array( 'GroupsSettingsPage', 'capability' ) );
add_filter( 'members_get_capabilities', array( 'GroupsSettingsPage', 'extra_caps' ) );



