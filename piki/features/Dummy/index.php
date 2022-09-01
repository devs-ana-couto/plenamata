<?php
class PKDummy {

    private $options;
    private $dummys;

    // Busca as imagens que precisam ser atualizadas e geradas
    public static function generateContent(){
        
        Piki::preventScriptStop();

        global 
            $PKDummy,
            $wpdb
        ;

        // Post type
        $post_type = _post( 'post_type' );
        
        // Total de ítens
        $total = _post( 'total', 10 );

        // Settings
        $settings = PikiForms::get_form_settings( $post_type );
        $settings[ 'isDummy' ] = true;

        for( $p = 0; $p < $total; $p++ ):
            PKDummy::createPost( $settings );
        endfor;

        Piki::success();

    }

    public static function createPost( $settings ){

        $fields = _array_get( $settings, 'fields' );

        $data = [];
        foreach( $fields as $field ):
            $ftype = method_exists( $field[ 'ftype' ], 'dummy' ) ? $field[ 'ftype' ] : 'text';
            $data[ $field[ 'machine_name' ] ] = call_user_func( array( $ftype, 'dummy' ), $field );
        endforeach;

        return ProccessForm::save_data( $settings, $data );

    }

}
$PKDummy = new PKDummy();

// Página de administração
if( is_admin() ):
    require_once( Piki::path( __FILE__ ) . '/admin.php' );
endif;

