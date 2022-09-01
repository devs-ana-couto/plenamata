<?php
class PikiAdminSettings {

    public $key;
    public $slug;
    public $table;
    public $labels;
    public $list;
    public $baseurl;
    public $objects_list;

    private $action;
    private $item_id;
    private $item = false;
    private $page;
    private $menu = false;

    public function __construct( $options ){

        // Option
        $this->key = $options[ 'key' ];
        $this->slug = $options[ 'slug' ];
        $this->table = $options[ 'table' ];
        $this->labels = $options[ 'labels' ];
        $this->list = $options[ 'list' ];

        if( isset( $options[ 'menu_icon' ] ) ):
            $this->menu_icon = $options[ 'menu_icon' ];
        endif;

        // URL base
        $this->baseurl = get_site_url() . '/wp-admin/admin.php?page=' . $this->slug;
        
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
        
        // Ítem
        $this->item = get_custom( $this->item_id, $this->table );
        
    }

    // Screen
    public static function set_screen( $status, $option, $value ) {
        return $value;
    }
    
    // Add options page
    public function plugin_menu() {
        
        // Own button
        if( $this->menu_icon ):

            $dash = $this->slug;

            add_menu_page(
                'Reports', 
                'Reports',
                'edit_posts', 
                $dash, 
                array( $this, 'admin_ptypes' ),
                $this->menu_icon
            );

        // Piki feature link
        else:
            $dash = 'piki-dashboard';
        endif;
       
        $this->page = add_submenu_page(
            $dash,
            $this->labels[ 'plural' ],
            $this->labels[ 'plural' ],
            'edit_posts',
            $this->slug,
            array( $this, 'admin_ptypes' )
        );
        add_action( "load-$this->page", array( $this, 'screen_option' ) );
    
    }

    // Screen options
    public function screen_option(){
        $option = 'per_page';
        $args = array(
            'label'   => __( $this->labels[ 'plural' ] ),
            'default' => 20,
            'option'  => $this->key . '_per_page'
        );
        add_screen_option( $option, $args );
        $this->objects_list = new Piki_List_Table(array(
            'labels' => $this->labels,
            'table' => $this->table,
            'columns' => $this->list[ 'columns' ],
            'sortable_columns' => $this->list[ 'sortable_columns' ],
            'actions' => array(
                'edit' => 'Edit',
                'delete' => 'Delete',
            )
        ));
    }
   
    // Página de administração
    public function admin_ptypes(){
        // Inicia
        $this->init();
        ?>
        <div class="wrap">
            <?php
            // Lista
            if( $this->action == 'list' ):
                ?>
                <h1>
                    <?php echo $this->labels[ 'plural' ] ?>
                    <a class="add-new-h2" href="<?php echo $this->baseurl; ?>&action=insert">Criar <?php echo $this->labels[ 'singular' ]; ?></a>
                </h1>
                <?php
                $this->objects_list->prepare_items();
                $this->objects_list->display();
            // Formulário
            else:
                ?>
                <h1>
                    <?php echo( $this->action == 'insert' ? __( 'Adicionar novo' ) : __( 'Edit' ) ); ?> <?php echo $this->labels[ 'singular' ]; ?>
                    <?php if( $this->action == 'edit' ): ?>
                    <a class="add-new-h2" href="<?php echo $this->baseurl; ?>&action=insert">Criar <?php echo $this->labels[ 'singular' ]; ?></a>
                    <?php endif; ?>
                </h1>
                <?php
                $this->edit_page();
            endif;
            ?>
        </div>
        <?php
    }

    // Página de edição do formulário
    public function edit_page(){ ?>

        <div id="poststuff">
            
            <div id="post-body" class="metabox-holder columns-2">

                <div id="post-body-content"><?php
                    // Formulário
                    $form = PikiForms::get_form(array(
                        'key' => $this->key, 
                        'data' => $this->item,
                    ));
                    echo $form[ 'html' ]; ?>
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
                                        <div class="misc-pub-section curtime misc-pub-curtime"><?php 
                                            $time = empty( $this->item ) ? time() : strtotime( $this->item->created ); 
                                            $txt_data = empty( $this->item ) ? 'Data' : 'Criado em'; ?>
                                            <span id="timestamp"><?php echo $txt_data; ?>: <b><?php echo str_replace( '.', ',', date_i18n( 'd M Y \à\s H:i', $time ) ); ?></b></span>
                                        </div>
                                    </div>
                                
                                    <div class="clear"></div>
                                
                                </div>
                                
                                <div id="major-publishing-actions"><?php 
                                    
                                    if( !empty( $this->item ) ): ?>
                                    <div id="delete-action">
                                        <a href="<?php echo Piki_List_Table::_action_link( $this->item->ID ); ?>" class="submitdelete deletion">Excluir</a>
                                    </div><?php 
                                    endif; ?>
                                    
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

        </div><?php

    }

}
