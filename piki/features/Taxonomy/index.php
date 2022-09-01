<?php
# Tabela no banco
define( 'TAXONOMY_TABLE', 'piki_taxonomy' );

# Arquivo de registro das taxonomias
require_once( Taxonomies::taxies_filepath() );

# Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

class Taxonomies {  

    # Escreve o arquivo para registro dos tipos de post
    public static function taxonomy_submit( $settings, $posted ){
        
        global $wpdb;

        # Apenas o formulário de tipos de post
        if( $settings[ 'key' ] != 'taxonomy' ):
            return;
        endif;
        
        # Tipos de post no banco
        $taxonomies = get_customs( TAXONOMY_TABLE );
        
        # Se não temos taxonomias para escrever
        if( empty( $taxonomies ) ):
            return;
        endif;

        # Escreve o arquivos para registro dos tipos de post
        self::write_file( $taxonomies );

    }

    # Escreve o arquivos para registro dos tipos de post
    public static function write_file( $taxys ){
        
        # Quebra de linha
        $br = "\n";
        
        # Conteúdo do arquivo
        $towrite  = '<?php' . $br;
        $towrite  .= 'add_action( \'init\', \'piki_taxonomies_register\', 0 );' . $br;
        $towrite  .= 'function piki_taxonomies_register(){' . $br . $br;

        # Fields
        $fields = pikiform_taxonomy_fields();
                
        # Campos inteiros
        $ints = array( 'ID' );
        
        # Campos booleanos
        $booleans = array( 'public', 'show_ui', 'show_in_menu', 'show_in_nav_menus', 'show_tagcloud', 'show_in_quick_edit', 'show_admin_column', 'hierarchical', 'sort' );
  
        # Escreve cada taxonomia
        foreach( $taxys as $key => $taxy ):

            # Dados consolidados
            $item = PKMeta::db_data( $taxy, $fields, 'custom', TAXONOMY_TABLE );
            $meta = $item->meta;

            # Tipos de post
            $post_types = $meta[ 'post_types' ];
            unset( $meta[ 'post_types' ] );

            # Se não foi associada à nenhum tipo de post
            if( empty( $post_types ) ):
                continue;
            endif;

            # Taxonomy name
            $taxname = $meta[ 'taxonomy' ];
            unset( $meta[ 'taxonomy' ] );

            # Meta box CB
            if( empty( $meta[ 'meta_box_cb' ] ) ):
                unset( $meta[ 'meta_box_cb' ] );
            endif;

            # Capabilities
            unset( $meta[ 'capabilities' ] );

            # Rewrite
            $slug = empty( $meta[ 'slug' ] ) ? transliterate( $taxname ) : $meta[ 'slug' ];
            $meta[ 'rewrite' ] = array( 'slug' => $slug );
            unset( $meta[ 'slug' ] );

            # Tax key
            $tax_key = str_replace( '-', '', $slug );

            # Consolidando os valores
            foreach( $meta as $option => &$value ):
                
                # Valores inteiros
                if( in_array( $option, $ints ) ):
                    
                    $value = (int)$value;
                
                # Booleanos
                elseif( in_array( $option, $booleans ) ):
                    
                    $value = (int)$value === 1 || $value === 'on';
                
                endif;
            
            endforeach;
            
            $towrite .= '   $'. $tax_key .'_settings=' . var_export( $meta, true ) . ';' . $br;
            
            $towrite .= '   register_taxonomy( \''. $taxname .'\', array( \'' . implode( "','", $post_types ) .'\' ), $'. $tax_key .'_settings );' . $br . $br;
        
        endforeach;
        
        $towrite  .= '}';
        $towrite = stripslashes( stripslashes( $towrite ) );
        $towrite = str_replace( 
            array( 'array (' ) , 
            array( 'array(' ),
            $towrite
        );
        
        # Caminho do arquivo
        $pathfile = self::taxies_filepath();
        
        # Escreve o arquivo
        if( !file_put_contents( $pathfile, $towrite, FILE_TEXT ) ):
            Piki::error( 'O arquivo ' . $pathfile . ' não pôde ser criado.' );
        endif;
    }

    # Path do arquivo de configurações do pikiform
    public static function taxies_filepath(){
        return Piki::path( __FILE__ ) . 'taxonomies.php';
    }

}
# Salvando o tipo de post
add_action( 'pikiform_submit', array( 'Taxonomies', 'taxonomy_submit' ), 10, 2 );

# Dados do formulário de tipos de post
function pikiform_taxonomy_settings(){
    return array(
        'allways_edit' => false,
        'preview' => false,
        'moderate' => false,
        'placeholders' => false,
        'pid' => false,
        'key' => 'taxonomy',
        'title' => '',
        'description' => '',
        'edit_redirect' => '',
        'success_redirect' => '',
        'exclude_redirect' => '',
        'success_message' => '<div class="updated notice notice-success" id="message"><p>Taxonomia criada com sucesso</p></div>',
        'error_messages' => array(
            'tooltip' => 'tooltip',
        ),
        'edit_success_message' => '<div class="updated notice notice-success" id="message"><p>Taxonomia editada com sucesso</p></div>',
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
        'table' => $wpdb->prefix . TAXONOMY_TABLE
    );
}
# Campos do formulário de cadastro
function pikiform_taxonomy_fields(){
    return array(
        array(
            'label'         => __( 'Taxonomia:', 'piki' ),
            'description'   => __( 'The name of the taxonomy. Name should only contain lowercase letters and the underscore character, and not be more than 32 characters long (database structure restriction).', 'piki' ),
            'machine_name'  => 'taxonomy',
            'ftype'         => 'text',
            'unique'        => true,
            'required'      => true,
            'maxlength'     => 32,
        ),
        array(
            'label'         => __( 'Slug:', 'piki' ),
            'description'   => __( 'The name of taxonomy in URL. Ex: slug/name-of-tye-item(plural)', 'piki' ),
            'machine_name'  => 'slug',
            'ftype'         => 'text',
            'unique'        => true,
            'required'      => true,
        ),
        array(
            'label'         => __( 'Post types:', 'piki' ),
            'description'   => __( 'Name of the object type for the taxonomy object. Object-types can be built-in Post Type or any Custom Post Type that may be registered.', 'piki' ),
            'machine_name'  => 'post_types',
            'ftype'         => 'ptypes',
            'multiple'      => true,
            'required'      => true,
        ),
        array(
            'label'         => __( 'Public?', 'piki' ),
            'label_option'  => __( 'Public?', 'piki' ),
            'description'   => __( 'If the taxonomy should be publicly queryable.', 'piki' ),
            'default_value' => 1, 
            'machine_name'  => 'public',
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Description:', 'piki' ),
            'description'   => __( 'Include a description of the taxonomy.', 'piki' ),
            'machine_name'  => 'description',
            'ftype'         => 'text',
        ),
        array(
            'label'         => __( 'Show UI?', 'piki' ),
            'label_option'  => __( 'Show UI?', 'piki' ),
            'description'   => __( 'Whether to generate a default UI for managing this taxonomy.', 'piki' ),
            'machine_name'  => 'show_ui',
            'default_value' => 1,
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Show in menu?', 'piki' ),
            'label_option'  => __( 'Show in menu?', 'piki' ),
            'description'   => __( 'Where to show the taxonomy in the admin menu. show_ui must be true.', 'piki' ),
            'machine_name'  => 'show_in_menu',
            'default_value' => 1,
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Show in nav menus?', 'piki' ),
            'label_option'  => __( 'Show in nav menus?', 'piki' ),
            'description'   => __( 'true makes this taxonomy available for selection in navigation menus.', 'piki' ),
            'machine_name'  => 'show_in_nav_menus',
            'default_value' => 1,
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Show tag cloud?', 'piki' ),
            'label_option'  => __( 'Show tag cloud?', 'piki' ),
            'description'   => __( 'Whether to allow the Tag Cloud widget to use this taxonomy.', 'piki' ),
            'machine_name'  => 'show_tagcloud',
            'default_value' => 1,
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Show in quick edit?', 'piki' ),
            'label_option'  => __( 'Show in quick edit?', 'piki' ),
            'description'   => __( 'Whether to show the taxonomy in the quick/bulk edit panel.', 'piki' ),
            'machine_name'  => 'show_in_quick_edit',
            'default_value' => 1,
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Metabox CB', 'piki' ),
            'description'   => __( 'Provide a callback function name for the meta box display.', 'piki' ),
            'machine_name'  => 'meta_box_cb',
            'ftype'         => 'text',
        ),
        array(
            'label'         => __( 'Show admin column?', 'piki' ),
            'label_option'  => __( 'Show admin column?', 'piki' ),
            'description'   => __( 'Whether to allow automatic creation of taxonomy columns on associated post-types table.', 'piki' ),
            'machine_name'  => 'show_admin_column',
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Hierarchical?', 'piki' ),
            'label_option'  => __( 'Hierarchical?', 'piki' ),
            'description'   => __( 'Is this taxonomy hierarchical (have descendants) like categories or not hierarchical like tags.', 'piki' ),
            'machine_name'  => 'hierarchical',
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Update count callback:', 'piki' ),
            'description'   => __( 'A function name that will be called when the count of an associated $object_type, such as post, is updated. Works much like a hook.', 'piki' ),
            'machine_name'  => 'update_count_callback',
            'ftype'         => 'text',
        ),
        array(
            'label'         => __( 'Disable query var?', 'piki' ),
            'label_option'  => __( 'Disable query var?', 'piki' ),
            'description'   => __( 'A post type cannot be loaded at /?{query_var}={single_post_slug}', 'piki' ),
            'machine_name'  => 'query_var',
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Sort?', 'piki' ),
            'label_option'  => __( 'Sort?', 'piki' ),
            'description'   => __( ' Whether this taxonomy should remember the order in which terms are added to objects.', 'piki' ),
            'machine_name'  => 'sort',
            'ftype'         => 'boolean',
        ),
        array(
            'label'         => __( 'Labels:', 'piki' ),
            'description'   => __( 'An array of labels for this taxonomy. By default tag labels are used for non-hierarchical types and category labels for hierarchical ones.', 'piki' ),
            'machine_name'  => 'labels',
            'ftype'         => 'textarea_options',
            'default_value' => 'name|Categorias
singular_name|categoria
search_items|Buscar categorias
popular_items|Popular categorias
all_items|Todas as categorias
edit_item|Editar categoria
update_item|Atualizar categoria
add_new_item|Adicionar nova categoria
new_item_name|Novo nome de categoria
separate_items_with_commas|Separar categorias com vírgulas
add_or_remove_items|Gerenciar categorias
choose_from_most_used|Escolher entre as categorias mais usadas
not_found|Nenhuma categoria encontrada
menu_name|Categorias'
            ,
            'merge_with_defaults' => 'on',
        ),
        /*
        array(
            'label' => __( 'Permissions', 'piki' ), 
            'machine_name' => 'capabilities',
            'ftype' => 'capabilities',
        ),
        */
    );
}
