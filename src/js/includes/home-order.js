var HomeOrder;

(function($){

    HomeOrder = {

        $ : null,
        $sctions : null,
        $fixed : null,

        init : function(){

            this.$ = $( 'body.page-template-page-inicio.orderable-blocks' );
            if( !this.$.length ) return true;

            this.$wrapper = this.$.find( '.ordered-blocks' );
            this.$blocks = this.$wrapper.children( 'section' );
            this.$blocks.each(function(){

                this.$ = this.$ || $( this );

                // To yo button
                $top_button = $( '<button type="button" class="home-order-control to-up ico-up" data-action="move-to-up" title="Mover bloco para cima"><span>Mover para cima</span></button>' ).prependTo( this.$ );
                $top_button.data( 'HomeOrder', { target : this } );  

                // To down button
                $down_button = $( '<button type="button" class="home-order-control to-down ico-down" data-action="move-to-down" title="Mover bloco para baixo"><span>Mover para baixo</span></button>' ).appendTo( this.$ );
                $down_button.data( 'HomeOrder', { target : this } );

            });

            this.$wrapper.on( 'click', '.home-order-control', function(){
                HomeOrder.bindClick( this );
            });

        },

        bindClick : function( button ){

            button.$ = button.$ || $( button );

            const 
                sentido = button.$.is( '[data-action="move-to-up"]' ) ? 'up' : 'down',
                section = button.$.parents( 'section' ).first(),
                block = section.data( 'template-name' )
            ;

            HomeOrder.changeOrder( sentido, block, function( response ){
                if( response.status === 'success' ){
                    document.location.reload(true);
                }
                else {
                    Loader( 'close' );
                    console.log( 'error: ' + response );
                }
            });

        },

        changeOrder : async function( sentido, block, callback ){

            Loader();

            $.ajax({
                url : Piki.ajaxurl,
                type : 'POST',
                dataType : 'JSON',
                data : {
                    action: 'home_save_order',
                    sentido : sentido,
                    block_key : block
                }
            }).done(function( response ){
                callback( response );                
            });

        }

    };
    $(function(){ HomeOrder.init(); });

})(jQuery);
