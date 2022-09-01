<?php
ignore_user_abort(true);
set_time_limit(0);

define( 'PIKICEP_MAP_TABLE', 'correios_mapa' );

class PikiCEP {

	public static function init (){
		
		wp_enqueue_script( 'feature-CEP-scripts', Piki::url( 'scripts.js' , __FILE__ ), array( 'jquery' ), false, true );
		wp_enqueue_style( 'feature-CEP-styles', Piki::url( 'styles.css' , __FILE__ ) );

		if( _get( 'populate-table-cep' ) ):
			PikiCEP::populateMapTable();
		endif;

	}

	public static function consultaCEP( $cep = false ){

		global $wpdb;

		$cep = _post( 'cep', $cep );
		if( empty( $cep ) ):
			Piki::error( 'Informe o cep' );
		endif;

		$cep = preg_replace( '/[^0-9]/', '', $cep );
		if( strlen( $cep ) < 8 ):
			Piki::error( 'Informe um CEP válido' );
		endif;
		
		// Search in map table
		$tableSearch = $wpdb->prefix . PIKICEP_MAP_TABLE;
		$search = $wpdb->get_row($wpdb->prepare(
			"SELECT CEP,id,tipo FROM $tableSearch WHERE CEP=%s",
			$cep
		));

		// Not found
		if( empty( $search ) ):
			Piki::return_json(array(
				'status' => 'not_found'
			));
		endif;

		// Localidade
		if( $search->tipo == 'localidade' ):

			$result = $wpdb->get_row($wpdb->prepare(
				"SELECT id as id_cidade, sigla_estado as uf FROM {$wpdb->prefix}correios_localidades WHERE id=%d",
				$search->id
			));

		else:

			// Fields and table
			$fields = array( 
				'EN.id', 
				'EN.sigla_estado AS uf',
				'EN.id_localidade AS id_cidade',
				'EN.nome'
			);
			if( $search->tipo != 'caixa' ):
			
				$fields[] = 'EN.id_bairro';
				$fields[] = 'BA.nome as nome_bairro';
				$join = " LEFT JOIN {$wpdb->prefix}correios_bairros as BA ON BA.id = EN.id_bairro";

			else:
				
				$fields[] = 'EN.endereco';
				$join = '';
			
			endif;
			
			switch( $search->tipo ):
				// Unidades operacionais
				case 'unidade':
					$fields[] = 'EN.endereco';
					$table   = 'correios_unidades';
				break;
				// Grandes usuários
				case 'usuario':
					$fields[] = 'EN.endereco';
					$table   = 'correios_usuarios';
				break;
				// Caixas postais
				case 'caixa':
					$table   = 'correios_caixas';
				break;
				// Logradouros
				case 'logradouro':
				default:
					$fields[] = 'EN.prefixo';
					$table   = 'correios_logradouros';
				break;
			endswitch;

			$fields = implode( ',', $fields );

			// Get address row
			$result = $wpdb->get_row($wpdb->prepare(
				"SELECT $fields FROM {$wpdb->prefix}$table AS EN $join WHERE EN.id=%d",
				$search->id
			));
		
		endif;

		$result->tipo = $search->tipo;
		$result->status = 'success';

		Piki::return_json( $result );		

	}

	// Popula a tabela de consulta
	public static function populateMapTable(){

		global $wpdb;
		
		$indexTable = $wpdb->prefix . PIKICEP_MAP_TABLE;

		// Total de logradouros: 1049457
		//$pertime = 20000;
		//$indice = _get( 'indice', 0 );
		//$offset = ( $indice > 0 ) ? ' OFFSET ' . $indice*$pertime : '';
		//$logradouros = $wpdb->get_results( "SELECT id, CEP FROM {$wpdb->prefix}correios_logradouros LIMIT $pertime $offset" );
		//if( !empty( $logradouros ) ):
		//	foreach( $logradouros as $logradouro ):
		//		if( !empty( $logradouro->CEP ) ):
		//			$_values = array(
		//				'id' => $logradouro->id,
		//				'CEP' => $logradouro->CEP,
		//				'tipo' => 'logradouro'
		//			);
		//			if( !$wpdb->insert( $indexTable, $_values ) ):
		//				echo '<pre>';
		//				echo '$_values' . "\r\n";
		//				var_dump( $_values );
		//				exit();
		//			endif;
		//		endif;
		//	endforeach;
		//	echo 'Importou logradouros ('. $indice .')!' . "\r\n";
		//	echo '<script>window.location.href = "'. get_site_url() .'/?populate-table-cep=1&indice='. ( $indice + 1 ) .'"</script>';
		//endif;
			
		
		// Unidades: 14898
		//$unidades = $wpdb->get_results( "SELECT id, CEP FROM {$wpdb->prefix}correios_unidades" );
		//foreach( $unidades as $unidade ):
		//	if( !empty( $unidade->CEP ) ):
		//		$_values = array(
		//			'id' => $unidade->id,
		//			'CEP' => $unidade->CEP,
		//			'tipo' => 'unidade'
		//		);
		//		if( !$wpdb->insert( $indexTable, $_values ) ):
		//			echo '<pre>';
		//			echo '$_values' . "\r\n";
		//			var_dump( $_values );
		//			exit();
		//		endif;
		//	endif;
		//endforeach;
		//echo 'Importou unidades!' . "\r\n";

		// Usuarios: 11846
		//$usuarios = $wpdb->get_results( "SELECT id, CEP FROM {$wpdb->prefix}correios_usuarios" );
		//foreach( $usuarios as $usuario ):
		//	if( !empty( $usuario->CEP ) ):
		//		$_values = array(
		//			'id' => $usuario->id,
		//			'CEP' => $usuario->CEP,
		//			'tipo' => 'usuario'
		//		);
		//		if( !$wpdb->insert( $indexTable, $_values ) ):
		//			echo '<pre>';
		//			echo '$_values' . "\r\n";
		//			var_dump( $_values );
		//			exit();
		//		endif;
		//	endif;
		//endforeach;
		//echo 'Importou usuários!' . "\r\n";

		// Caixas: 2154
		//$caixas = $wpdb->get_results( "SELECT id, CEP FROM {$wpdb->prefix}correios_caixas" );
		//foreach( $caixas as $caixa ):
		//	if( !empty( $caixa->CEP ) ):
		//		$_values = array(
		//			'id' => $caixa->id,
		//			'CEP' => $caixa->CEP,
		//			'tipo' => 'caixa'
		//		);
		//		if( !$wpdb->insert( $indexTable, $_values ) ):
		//			echo '<pre>';
		//			echo '$_values' . "\r\n";
		//			var_dump( $_values );
		//			exit();
		//		endif;
		//	endif;
		//endforeach;
		//echo 'Importou caixas postais!' . "\r\n";

		// Localidades: 10832
		//$localidades = $wpdb->get_results( "SELECT id, CEP FROM {$wpdb->prefix}correios_localidades" );
		//foreach( $localidades as $localidade ):
		//	if( !empty( $localidade->CEP ) ):
		//		$_values = array(
		//			'id' => $localidade->id,
		//			'CEP' => $localidade->CEP,
		//			'tipo' => 'localidade'
		//		);
		//		if( !$wpdb->insert( $indexTable, $_values ) ):
		//			echo '<pre>';
		//			echo '$_values' . "\r\n";
		//			var_dump( $_values );
		//			exit();
		//		endif;
		//	endif;
		//endforeach;
		//echo 'Importou localidades!' . "\r\n";
		
	}
	
}
//// Registra o tipo de post
add_action(  'init',  array( 'PikiCEP', 'init' ) );
// Ajax
add_action( 'wp_ajax_consulta_cep', array( 'PikiCEP', 'consultaCEP' ) );
add_action( 'wp_ajax_nopriv_consulta_cep', array( 'PikiCEP', 'consultaCEP' ) );
//// Remove o cache das cores quando uma cor é salva
//add_action(  'save_post',  array( 'PikiColors', 'remove_cache' ), 10, 3 );


