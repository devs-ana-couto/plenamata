<?php

// Our class extends the WP_List_Table class, so we need to make sure that it's there
if( !class_exists( 'WP_List_Table' ) ):
   require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
endif;

class Piki_List_Table extends WP_List_Table {

    // Page
    var $page;
    // Tabela
    var $table = NULL;
    // Colunas
    var $columns = array();
    // Primeira coluna
    var $first_col = NULL;
    // Sortables
    var $sortable_columns = array();
    // Before
    var $before = NULL;
    // After
    var $after = NULL;
    // Actions
    var $actions = array();

    // Class constructor
    function __construct( $options ) {

        //  Página
        $this->page = $_REQUEST[ 'page' ];
        
        // Table data
        $this->table = $options[ 'table' ];
        
        // Primeira coluna
        $colkeys = array_keys( $options[ 'columns' ] );
        $this->first_col = array_shift( $colkeys );
        
        // Columns
        $this->columns[ 'cb' ] = '<input type="checkbox" />';
        $this->columns = array_merge( $this->columns, $options[ 'columns' ] );
        
        // Sortable
        if( isset( $options[ 'sortable_columns' ] ) ):
            $this->sortable_columns = $options[ 'sortable_columns' ];
        endif;
        
        // Before
        if( isset( $options[ 'before' ] ) ):
            $this->before = $options[ 'before' ];
        endif;
        
        // After
        if( isset( $options[ 'after' ] ) ):
            $this->after = $options[ 'after' ];
        endif;
        
        // Actions
        if( isset( $options[ 'actions' ] ) ):
            $this->actions = $options[ 'actions' ];
        else:
            $this->actions = array( 'edit', 'delete' );
        endif;
        
        // Construct
        parent::__construct(array(
            'singular'  => $options[ 'labels' ][ 'singular' ],
            'plural'    => $options[ 'labels' ][ 'plural' ],
            'ajax'      => false,
        ));
    
    }

    // Retrieve items data from the database
    public function get_items( $per_page = 20, $page_number = 1 ) {
        
        global $wpdb;
        
        // Campos para o select
        $columns_keys = array_slice( array_keys( $this->columns ), 1 );
        $toselect = array( 'ID' );
        $toselect = array_merge( $toselect, $columns_keys );
        
        // Base
        $sql = "SELECT ". implode( ', ', $toselect ) ." FROM {$wpdb->prefix}" . $this->table;
        
        // Order
        $orderby = !empty( $_GET[ 'orderby' ] ) ? mysql_real_escape_string( $_GET[ 'orderby' ] ) : 'ASC';
        $order = !empty( $_GET[ 'order' ] ) ? mysql_real_escape_string( $_GET[ 'order' ] ) : '';
        if( !empty( $orderby ) && !empty( $order ) ){ 
            $sql .= ' ORDER BY '. $orderby . ' ' . $order; 
        }
        
        // Limit
        $sql .= " LIMIT $per_page";
        
        // Pager
        $sql .= ' OFFSET ' . ( $page_number - 1 ) * $per_page;
        
        // Retrieve
        $result = $wpdb->get_results( $sql, 'ARRAY_A' );
        
        return $result;
    
    }

    // Delete a item record.
    public function delete_item( $id ) {
        global $wpdb;
        $wpdb->delete(
            "{$wpdb->prefix}" . $this->table,
            array( 'ID' => $id ),
            array( '%d' )
        );
        // Hooks after delete
        do_action( 'piki_admin_delete_item', $this->table, $id );
    }

    // Returns the count of records in the database.
    public function record_count() {
        global $wpdb;
        $sql = "SELECT COUNT(*) FROM {$wpdb->prefix}" . $this->table;
        return $wpdb->get_var( $sql );
    }

    // Text displayed when no items data is available
    public function no_items() {
        _e( 'No '. $this->name .' avaliable.', 'piki' );
    }

    // Render a column when no column specific method exists.
    public function column_default( $item, $column_name ){

        if( $this->first_col == $column_name ):
            $title = '<strong>' . $item[ $column_name ] . '</strong>';
            $actions = $this->_row_actions( $item[ 'ID' ] );
            return $title . $this->row_actions( $actions );
        
        else:
            $towrite = $item[ $column_name ];
            if( is_array( $towrite ) ):
                return print_r( $towrite, true );
            else:
                return $towrite;
            endif;
        endif;

    }

    public function _row_actions( $item_id ){
        $actions = array();
        foreach ( $this->actions as $key => $action ):
            // Action link
            $tosprint = '<a href="?page=%s&action=%s&item=%s';
            // create a nonce for Delete action
            if( $key == 'delete' ):
                $tosprint .= '&_wpnonce=' . wp_create_nonce( 'piki_'. $key .'_item' );
            endif;
            $tosprint .= '">'. $action .'</a>';
            $actions[ $key ] = sprintf( $tosprint, esc_attr( $_REQUEST[ 'page' ] ), $key, absint( $item_id ) );
        endforeach;
        return $actions;
    }

    public static function _action_link( $item_id ){
            // Action link
            $tosprint = '?page=%s&action=delete&item=%d&_wpnonce=%s';
            $link = sprintf( $tosprint, esc_attr( $_REQUEST[ 'page' ] ), absint( $item_id ), wp_create_nonce( 'piki_delete_item' ) );
            return $link;
    }

    // Render the bulk edit checkbox
    function column_cb( $item ) {
        return sprintf(
            '<input type="checkbox" name="bulk-action[]" value="%s" />', $item[ 'ID' ]
        );
    }

    // Associative array of columns
    function get_columns() {
        return $this->columns;
    }

    // Columns to make sortable.
    public function get_sortable_columns(){
        if( empty( $this->sortable_columns ) ):
            return array( $first_col => $first_col );
        endif;
        return $this->sortable_columns;
    }

    // Returns an associative array containing the bulk action
    public function get_bulk_actions() {
        $actions = array(
            'bulk-activate' => 'Activate',
            'bulk-deactivate' => 'Deactivate',
            'bulk-delete' => 'Delete',
        );
        return $actions;
    }

    // Handles data query and filter, sorting, and pagination.
    public function prepare_items() {
        // Headers
        $this->_column_headers = $this->get_column_info();        
        // Process bulk action
        $this->process_bulk_action();
        // Ítems por página
        $user = get_current_user_id();
        $screen = get_current_screen();
        $option = $screen->get_option( 'per_page', 'option' );
        $per_page = get_user_meta( $user, $option, true);
        if ( empty ( $per_page) || $per_page < 1 ) {
            $per_page = $screen->get_option( 'per_page', 'default' );
        }
        // Página atual
        $current_page = $this->get_pagenum();
        // Total de ítems
        $total_items  = $this->record_count();
        // Paginação
        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page'    => $per_page
        ));
        // Recuperando os ítems
        $this->items = $this->get_items( $per_page, $current_page );
    }    

    // Process bulk actions
    public function process_bulk_action() {

        global $pagenow;

        $toredirect = get_site_url() . '/wp-admin/'. $pagenow .'?page='. $this->page .'&action=list';

        // Detect when a bulk action is being triggered...
        if ( 'delete' === $this->current_action() ):

            // In our file that handles the request, verify the nonce.
            $nonce = esc_attr( $_GET[ '_wpnonce' ] );
            if ( !wp_verify_nonce( $nonce, 'piki_delete_item' ) ):
                die( 'Go get a life script kiddies.' );
            else:
                $this->delete_item( absint( $_GET[ 'item' ] ) );
                Piki_List_Table::redirect( $toredirect );
            endif;
        
        endif;
        
        // If the delete bulk action is triggered
        if ( ( isset( $_POST[ 'action' ] ) && $_POST[ 'action' ] == 'bulk-delete' ) || ( isset( $_POST[ 'action2' ] ) && $_POST[ 'action2' ] == 'bulk-delete' ) ):
        
            $delete_ids = esc_sql( $_POST[ 'bulk-delete' ] );
        
            // loop over the array of record IDs and delete them
            foreach( $delete_ids as $id ):
                $this->delete_item( $id );
            endforeach;
        
            Piki_List_Table::redirect( $toredirect );
        
        endif;
    
    }

    public static function redirect( $url ){
        echo '<script type="text/javascript">window.location.href=\'' . $url . '\';</script>';
        exit;
    }

}
