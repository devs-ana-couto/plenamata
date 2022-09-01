<?php
class TaxonomySettingsPage {

    public $taxies_obj;
    private $options;
    private $images;
    private $action;
    private $item_id;
    private $item = false;

    public function __construct() {
        // Screen options
        add_filter( 'set-screen-option', array( __CLASS__, 'set_screen' ), 10, 3 );
        // Menu ítem
        add_action( 'admin_menu', array( $this, 'plugin_menu' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
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

        // Ítem
        $this->item = get_custom( $this->item_id, TAXONOMY_TABLE );
    
    }

    // Screen
    public static function set_screen( $status, $option, $value ) {
        return $value;
    }
    
    // Add options page
    public function plugin_menu() {
        $hook = add_submenu_page(
            'piki-dashboard',
            'Taxonomy',
            'Taxonomy',
            'manage_options',
            'piki-taxonomies',
            array( $this, 'admin_taxonomies' )
        );
        add_action( "load-$hook", array( $this, 'screen_option' ) );
    }

    // Screen options
    public function screen_option(){
        $option = 'per_page';
        $args = array(
            'label'   => __( 'Taxonomy' ),
            'default' => 20,
            'option'  => 'taxonimies_per_page'
        );
        add_screen_option( $option, $args );
        $this->ptypes_obj = new Piki_List_Table(array(
            'labels' => array(
                'singular' => 'Taxonomias',
                'plural' => 'Taxonomia'
            ),
            'table' => TAXONOMY_TABLE,
            'columns' => array(
                'taxonomy' => 'Taxonomia',
                'slug' => 'Slug',
                'description' => 'Descrição',
            ),
            'sortable_columns' => array(
                'taxonomy' => 'taxonomy',
                'slug' => 'slug'
            ),
            'actions' => array(
                'edit' => 'Edit',
                'delete' => 'Delete',
            )
        ));
    }
   
    // Página de administração
    public function admin_taxonomies(){

        // Inicia
        $this->init();

        ?>
        <div class="wrap">
            <?php

            // Lista
            if( $this->action == 'list' ):
                ?>
                <h1>
                    Taxonomy
                    <a class="add-new-h2" href="<?php echo get_site_url(); ?>/wp-admin/admin.php?page=piki-taxonomies&action=insert">Add new</a>
                </h1>
                <?php
                $this->ptypes_obj->prepare_items();
                $this->ptypes_obj->display();

            // Formulário
            else:
                ?>
                <h1>
                    <?php echo( $this->action == 'insert' ? __( 'Add new' ) : __( 'Edit' ) ); ?> Taxonomy
                    <?php if( $this->action == 'edit' ): ?>
                    <a class="add-new-h2" href="<?php echo get_site_url(); ?>/wp-admin/admin.php?page=piki-taxonomies&action=insert">Add new</a>
                    <?php endif; ?>
                </h1>
                <?php
                $this->admin_taxonomy();
            endif;
            
            ?>
        </div>
        <?php
    }

    // Página de edição do formulário
    public function admin_taxonomy(){
        ?>
        <div id="poststuff">
            <div id="post-body" class="metabox-holder columns-2">
                <div id="post-body-content">
                    <?php
                    // Formulário
                    $form = PikiForms::get_form( 'taxonomy', $this->item );
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
                                        <a href="http://pikiweb.com/wp-admin/post.php?post=22&amp;action=trash&amp;_wpnonce=fab90aa88d" class="submitdelete deletion">Excluir</a>
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

    // Register and add settings
    public function page_init() {
        wp_enqueue_script( 'post-types-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ), false, true );
    }
}
// Inicia a página de administração
$pikiimages_settings_page = new TaxonomySettingsPage();
