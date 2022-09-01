(function($){

    var modoClaro = {

        $items : null,

        init : function(){


            $( 'body' ).on( 'click', 'button[data-action="toggle-color-mode"]', function(){

                this.$ = this.$ || $( this );
                
                var active = this.$.hasClass( 'active' );
                if( active ){
                    this.$.removeClass( 'active' );
                    console.log( 'Desativa modo escuro' );
                }
                else {
                    this.$.addClass( 'active' );
                    console.log( 'Ativa modo escuro' );
                }

            });

        }

    };

    $(function(){ 
        modoClaro.init(); 
    });

})(jQuery);
