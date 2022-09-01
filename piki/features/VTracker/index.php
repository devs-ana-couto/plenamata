<?php
// Token to prevent unexpected calls
define( 'VTRACKER_REQUIRE_TOKEN', 'xm7SLaSVWtZOmtG9LJaxsrsRwCcODAJ' );
// Interval between requests (seconds)
define( 'VTRACKER_SEC_INTERVAL', '60' );
// API endpoint
define( 'VTRACKER_SERVICE', 'https://developers.vtracker.com.br/api/rest' );
// VTracker Token
define( 'VTRACKER_TOKEN', '1a96a298-9265-4909-b240-4aec51e11295' );
// Total items
define( 'VTRACKER_TOTAL_ITEMS', 4 );
define( 'VTRACKER_INTERVAL_DAYS', 15 );

// Autoload
require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

class VTracker {

	// Blogs and monitoring IDs
	static $blogs = [
		[
			'id' => '1',
			'domain' => 'na',
			'monit_id' => '4117',
		],
		[
			'id' => '2',
			'domain' => 'ac',
			'monit_id' => false,
		],
		[
			'id' => '3',
			'domain' => 'al',
			'monit_id' => '4084',
		],
		[
			'id' => '4',
			'domain' => 'am',
			'monit_id' => '4086',
		],
		[
			'id' => '5',
			'domain' => 'ap',
			'monit_id' => '4085',
		],
		[
			'id' => '6',
			'domain' => 'ba',
			'monit_id' => '4087',
		],
		[
			'id' => '7',
			'domain' => 'ce',
			'monit_id' => '4088',
		],
		[
			'id' => '8',
			'domain' => 'es',
			'monit_id' => '4090',
		],
		[
			'id' => '9',
			'domain' => 'go',
			'monit_id' => '4091',
		],
		[
			'id' => '10',
			'domain' => 'ma',
			'monit_id' => '4092',
		],
		[
			'id' => '11',
			'domain' => 'mt',
			'monit_id' => '4093',
		],
		[
			'id' => '12',
			'domain' => 'ms',
			'monit_id' => '4094',
		],
		[
			'id' => '13',
			'domain' => 'mg',
			'monit_id' => '4095',
		],
		[
			'id' => '14',
			'domain' => 'pa',
			'monit_id' => '4096',
		],
		[
			'id' => '15',
			'domain' => 'pb',
			'monit_id' => '4097',
		],
		[
			'id' => '16',
			'domain' => 'pr',
			'monit_id' => '4098',
		],
		[
			'id' => '17',
			'domain' => 'pe',
			'monit_id' => '4099',
		],
		[
			'id' => '18',
			'domain' => 'pi',
			'monit_id' => '4100',
		],
		[
			'id' => '19',
			'domain' => 'rj',
			'monit_id' => '4101',
		],
		[
			'id' => '20',
			'domain' => 'rn',
			'monit_id' => '4102',
		],
		[
			'id' => '21',
			'domain' => 'rs',
			'monit_id' => '4103',
		],
		[
			'id' => '22',
			'domain' => 'ro',
			'monit_id' => '4104',
		],
		[
			'id' => '23',
			'domain' => 'rr',
			'monit_id' => false,
		],
		[
			'id' => '24',
			'domain' => 'sc',
			'monit_id' => '4105',
		],
		[
			'id' => '25',
			'domain' => 'sp',
			'monit_id' => '4106',
		],
		[
			'id' => '26',
			'domain' => 'se',
			'monit_id' => '4107',
		],
		[
			'id' => '27',
			'domain' => 'to',
			'monit_id' => '4108',
		],
		[
			'id' => '28',
			'domain' => 'df',
			'monit_id' => '4089',
		],
	];

	// Results list
	var $results;
	// Search start date
	var $date;
	// Limit search date
	var $limitDate;
	// Pagination key
	var $sinceId = 0;
	// Requests counter
	var $countRequests = 0;

	function __construct(){

		// Limit search date
		$this->limitDate = date( 'Y-m-d', strtotime( '-30 days' ) );

		// Require items
		if( _get( 'action' ) === 'vtracker-request' && _get( 'token' ) === VTRACKER_REQUIRE_TOKEN ):

			// Minimun interval
			$this->checkSecurityTime();

	        // Prevent timeout
	        Piki::preventScriptStop();

			// Directory
			$directory = ABSPATH . 'wp-content/vtracker/';
			// Create directory, if not exists
			if( !is_dir( $directory ) ):
				wp_mkdir_p( $directory );
			endif;

			// Each blog
			foreach( $this::$blogs as $blog ):

				// Erase counter
				$this->countRequests = 0;

				// Start date
				$this->date = date( 'Y-m-d' );

				// Pagination key
				$this->sinceId = 0;

				// Retrieve posts
				$this->results = [];

				if( $blog[ 'monit_id' ] ):
					
					// Retrieve items
					$this->getOccurrences( $blog[ 'monit_id' ] );

					// Report
					echo 'Blog ' . strtoupper( $blog[ 'domain' ] ) . '(' . $blog[ 'monit_id' ] . '): ' . $this->countRequests . ' requisições <br>';

				endif;

				// File name
				$filename = 'blog-' . $blog[ 'id' ] . '-twitter.json';
				file_put_contents( $directory . $filename, json_encode( array_values( $this->results ) ) );
				
			endforeach;

			exit( 'Importação realizada com sucesso.' );
			
		endif;
		

	}

	// Minimun interval
	function checkSecurityTime(){
		
		// Actual time
		$now = time();
		
		// Last request time
		$last_request = get_option( 'vtracker_last_time' );
		
		// Check security time
		if( $last_request && $now < ( $last_request + VTRACKER_SEC_INTERVAL ) ):
			exit( 'Aguarde alguns minutos para repetir esta ação.' );
		endif;
		
		// Keep last time
		update_option( 'vtracker_last_time', time() );

	}

	function getOccurrences( $monitoramento_id ){

		// Time
		$time = strtotime( $this->date );

		// Just ready
		if( count( $this->results ) > VTRACKER_TOTAL_ITEMS ):

			$this->results = array_slice( $this->results, 0, VTRACKER_TOTAL_ITEMS );

		// Search by items
		else:

			// Date
			$dataFim = date( 'd/m/Y', $time );
			$dataInicio = date( 'd/m/Y', strtotime( $this->date . ' -' . VTRACKER_INTERVAL_DAYS . ' days' ) );

			// First 
			$last = false;

			// URL
			$url = VTRACKER_SERVICE . '/ocorrencias/listar?key=' . VTRACKER_TOKEN . '&monitoramentoId=' . $monitoramento_id . '&nivel=1&dataInicio=' . $dataInicio . '%2000:00:00&dataFim=' . $dataFim . '%2023:59:59';			

			// Since ID
			if( $this->sinceId > 0 ):
				$url .= '&sinceId=' . $this->sinceId;
			endif;

			// Try resquest items
			try {

				// Request
	            $response = $this->request( $url );

	            // Error code
	            if( $response->codigo != '200' ):
	                echo '<pre>';
	                echo 'SecomVC::checkMonitoramento => Erro ao fazer requisição Vtracker: ' . $url . '<br>';
	                echo( 'Erro!! <br>' );
	                var_dump( $response );
	                exit;
	            endif;  

	            // Se há resultados
	            if( !empty( $response->ocorrencias ) ):

	            	// First item
					$last = end( $response->ocorrencias );

					// Keep items
					foreach( $response->ocorrencias as $post ):
						if( !isset( $this->results[ $post->id ] ) && count( $this->results ) < VTRACKER_TOTAL_ITEMS  ):
							$this->results[ $post->id ] = $post;
						endif;
					endforeach;

	            endif;

				// If not complete, run again
				if( count( $this->results ) < VTRACKER_TOTAL_ITEMS ):

					// Paginação
					if( !empty( $response->ocorrencias ) && count( $response->ocorrencias ) == 200 ):

						$last = end( $response->ocorrencias );
						$this->sinceId = $last->id;
						$this->getOccurrences( $monitoramento_id );

					elseif( $this->date > date( 'Y-m-d', $this->limitDate ) ):

						// Reset since ID
						$this->sinceId = 0;
						// Regread date
						$this->date = date( 'Y-m-d', strtotime( $this->date . ' -' . VTRACKER_INTERVAL_DAYS . ' days' ) );

						// If limite date not came
						if( $this->date > $this->limitDate ):
							$this->getOccurrences( $monitoramento_id );
						endif;

					endif;

				endif;

	        }
	        catch( ClientException $e ){

	            echo Psr7\str( $e->getRequest() );
	            echo Psr7\str( $e->getResponse() );
	            die();
	        
	        }

		endif;

	}

    // Make request call
    public function request( $url ){

    	$this->countRequests += 1;

        // New client
        $client = new Client([
            'headers' => [
               'User-Agent' => 'Mozilla/5.0 (Linux; U; Android 4.3; EN; C6502 Build/10.4.1.B.0.101) AppleWebKit/534.30 (KHTML, //like Gecko) Version/4.0 Mobile Safari/534.30 PlayStation App/1.60.5/EN/EN'
            ],
            'timeout'  => 0,
            'curl' => array( 
                CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_DNS_USE_GLOBAL_CACHE => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPGET => 1,
                CURLOPT_CONNECTTIMEOUT => 0,
                CURLOPT_TIMEOUT        => 0, 
            )
        ]);

        try {

            $response = $client->get( $url );
            $content = $response->getBody()->getContents();
           	return json_decode( $content );
        
        }
        catch( Exception $e ){
           	echo 'VTracker::request => Problema ao acessar conteúdo: ', $e->getMessage(), '<br>';
           	echo $url;
            return false;
        }

        return false;

    }

}
$VTracker = new VTracker();
?>