<?php
add_action( 'init', 'piki_taxonomies_register', 0 );
function piki_taxonomies_register(){

   $estados_settings=array(
  'public' => true,
  'description' => '',
  'show_ui' => true,
  'show_in_menu' => true,
  'show_in_nav_menus' => true,
  'show_tagcloud' => false,
  'show_in_quick_edit' => true,
  'show_admin_column' => true,
  'hierarchical' => true,
  'update_count_callback' => '',
  'query_var' => 'off',
  'sort' => false,
  'labels' => 
  array(
    'name' => 'Estados',
    'singular_name' => 'estado',
    'search_items' => 'Buscar estados',
    'popular_items' => 'Popular estados',
    'all_items' => 'Todos os estados',
    'edit_item' => 'Editar estado',
    'update_item' => 'Atualizar estado',
    'add_new_item' => 'Adicionar novo estado',
    'new_item_name' => 'Novo nome de estado',
    'separate_items_with_commas' => 'Separar estados com vírgulas',
    'add_or_remove_items' => 'Gerenciar estados',
    'choose_from_most_used' => 'Escolher entre os estados mais usados',
    'not_found' => 'Nenhum estado encontrado',
    'menu_name' => 'Estados',
  ),
  'rewrite' => 
  array(
    'slug' => 'estados',
  ),
);
   register_taxonomy( 'Estados', array( 'imovel' ), $estados_settings );

}