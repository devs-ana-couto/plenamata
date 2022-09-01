<?php
function verificaPalavroes( $string ){

    // Retira espaços, hífens e pontuações da String
    $arrayRemover = array( '.', '-', ' ' );
    $arrayNormal = array( "", "", "" );
    $normal = str_replace( $arrayRemover, $arrayNormal, $string );
    
    // Remove os acentos da string
    $de = 'àáãâéêíóõôúüç';
    $para   = 'aaaaeeiooouuc';
    $string_final = strtr( strtolower( $normal ), $de, $para );
    
    // Array em Filtro de Palavrões
    $array = array(
        'arrombado',
        'arrombada',
        'bosta',
        'bost@',
        'bost1nha',
        'bostinha',
        'bostao',
        'bostaum',
        'bucet@',
        'buceta',
        'boceta',
        'bocet@',
        'bocetao',
        'bucetinha',
        'bucetao',
        'bucet@o',
        'bucetaum',
        'blowjob',
        '#@?$%~',
        'caralinho',
        'caralhao',
        'caralhaum',
        'caralhex',
        'car@lho',
        'c@ralho',
        'c@r@lho',
        'c*',
        'cacete',
        'cacetinho',
        'cacetao',
        'cacetaum',
        'epenis',
        'foder',
        'f****',
        'fodase',
        'fodasi',
        'fodassi',
        'fodassa',
        'fodinha',
        'fodao',
        'fodaum',
        'foda1',
        'fodona',
        'f***',
        'fodeu',
        'fodasse',
        'fuckoff',
        'fuckyou',
        'fuck',
        'filhodaputa',
        'filhadaputa',
        'gozo',
        'gozar',
        'gozada',
        'gozadanacara',
        'm*****',
        'merda',
        'merdao',
        'merdaum',
        'merdinha',
        'vadia',
        'vasefoder',
        'venhasefoder',
        'voufoder',
        'vasefuder',
        'venhasefuder',
        'voufuder',
        'vaisefoder',
        'vaisefuder',
        'venhasefuder',
        'vaisifude',
        'v****',
        'vaisifuder',
        'vasifuder',
        'vasefuder',
        'vasefoder',
        'pirigueti',
        'piriguete',
        'p****',
        'porraloca',
        'porraloka',
        'porranacara',
        '#@?$%~',
        'putinha',
        'putona',
        'putassa',
        'putao',
        'punheta',
        'putamerda',
        'putaquepariu',
        'putaquemepariu',
        'putaquetepariu',
        'putavadia',
        'pqp',
        'putaqpariu',
        'putaqpario',
        'putaqparil',
        'peido',
        'peidar',
        'xoxota',
        'xota',
        'xoxotinha',
        'xoxotona'
    );

    if( in_array( $string_final, $array ) ){
        return true;
    } else {
        return false;
    }
}

//for($n=0;$n<count($array);$n++) {
//  $msg=str_replace($array[$n], "[CENSURADO]", $msg);
//}