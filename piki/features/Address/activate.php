<?php
// Requires
global $wpdb;
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

// Nome da tablea
$table_name = $wpdb->prefix . "piki_address";

// Query
$sql = "CREATE TABLE $table_name (
    ID mediumint(9) NOT NULL AUTO_INCREMENT,
    parent_key varchar(30) NOT NULL DEFAULT '',
    parent_id mediumint(9) NOT NULL DEFAULT 0,
    cep varchar(30) NOT NULL DEFAULT '',
    logradouro varchar(255) NOT NULL DEFAULT '',
    complemento varchar(255) NOT NULL DEFAULT '',
    bairro varchar(255) NOT NULL DEFAULT '',
    estado mediumint(9) NOT NULL DEFAULT 0,
    cidade mediumint(9) NOT NULL DEFAULT 0,
    PRIMARY KEY (ID),
    KEY parent_key (parent_key),
    KEY parent_id (parent_id),
    KEY estado (estado),
    KEY cidade (cidade),
    INDEX bairro (bairro)
);";

// Executando a query
dbDelta( $sql );
    
    
