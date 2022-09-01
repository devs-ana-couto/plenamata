<?php
// Páginas de administração
$ptypesAdmin = new PikiAdminSettings(array(
    'key' => PIKIFIELDS_KEY,
    'table' => PIKIFIELDS_TABLE,
    'slug' => 'piki-fields',
    'labels' => array(
        'singular' => __( 'Fields group', 'piki' ),
        'plural' => __( 'Fields groups', 'piki' ),
    ),
    'list' => array(
        'columns' => array(
            'label' => __( 'Title', 'piki' ),
            'description' => __( 'Description', 'piki' ),
        ),
        'sortable_columns' => array(
            'label' => 'label',
            'description' => 'description',
        ),
    ),
));