<?php
class ListTypes{

    static $cookie_key;

    function __construct( $id ){
        # Iniciando a Sessão
        if( !session_id() ):
            session_start();
        endif;
        # ID
        $this->id = $id;
        # Cookie key
        self::$cookie_key = $this->id . '_list_switcher_type';
        # Mode view
        $this->mode_view = $this->mode_view();
    }
    
    # Modo de visualização
    public static function mode_view(){
        $actual_mode = isset( $_SESSION[ self::$cookie_key ] ) && !empty( $_SESSION[ self::$cookie_key ] ) ? $_SESSION[ self::$cookie_key ] : 'grid';
        if( $actual_mode !== 'grid' && $actual_mode !== 'list' ):
            $actual_mode = 'grid';
        endif;
        return $actual_mode; 
    }

    # Retorna os controles
    public function controls(){
        echo '
            <div class="list-type-switcher '. $this->mode_view .'" rel="'. $this->id .'">
                <a class="grid" title="Ver grade" rel="grid"><span>Grade</span></a>
                <a class="list" title="Ver lista" rel="list"><span>Lista</span></a>
            </div>
        ';
        self::add_files();
    }

    # Adicionar arquivos
    public static function add_files(){
        # Scripts e estilos
        wp_enqueue_script( 'list-types-scripts', Piki::url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
        # Scripts e estilos
        wp_enqueue_style( 'list-types-styles', Piki::url( 'styles.css', __FILE__ ) );
    }

}

