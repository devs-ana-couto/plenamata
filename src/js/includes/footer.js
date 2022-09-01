(function($){

    var Footer = {

        $ : null,
        $drops : null,
        $search : null,
        $sebraeBar : null,
        $menuToggle : null,
        $toggles : null,
        $sliderWrapper : null,
        $slider : null,
        $floater : null,
        lastScrolTop : 0,
        timeFixa : null,
        locked : false,
        timeResize : false,

        init : function(){

            $body = $('body');
            $window = $(window);

            this.$ = $( 'body > footer' );
  
            // Editorias do menu suspenso
            this.editorias = $( '.editorias > li', this.$ );
            this.drops = $( 'ul', this.editorias );
            this.triggers = this.editorias.children( 'a' );
            this.triggers.on( 'click', function(e){

                this.$ = this.$ || $( this );
                this.$.drop = this.$.drop || this.$.siblings( 'ul' );

                // Se não tem submenu
                if( !this.$.drop.length || Utils.getPageWidth() > 481 ){
                    return true;
                }
                else {
                    e.preventDefault();
                }

                // Verifica se já está aberto
                var isOpened = this.$.drop.hasClass( 'opened' );

                // Fecha todos os ítems
                Footer.drops.removeClass( 'opened' );
                Footer.triggers.removeClass( 'opened' );

                // Se não estava aberto, abrimos
                if( !isOpened ){
                    this.$.addClass( 'opened' );
                    this.$.drop.addClass( 'opened' );
                }

            });
        }

    };
    $(function(){ Footer.init(); });

})(jQuery);
