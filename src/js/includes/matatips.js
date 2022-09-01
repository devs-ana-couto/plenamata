(function($){

    var MataTips = {

        init : function(){

            var $tips = $( '.matatips' );
            if( !$tips.length ) return true;

            $( 'body' ).on( 'click', 'button[data-action="open-matatip"]', function(){
                MataTips.toggle( this );
            });

        },

        toggle : function( button ){


            console.info( "button" );
            console.log( button );
            

            button.$ = button.$ || $( button );
            button.$tip = button.$tip || button.$.parent( '.matatips' ).first();

            var data = button.$tip.data( 'MataTips' );
            if( data === undefined ){
                data = {
                    $ : button.$tip,
                    $trigger : button.$,
                    timeClose : false
                };
                button.$tip.data( 'MataTips', data );
            }

            if( button.$tip.hasClass( 'opened' ) ){
                MataTips.close( data );
            }
            else {
                MataTips.open( data );
            }

        },

        open : function( data ){

            if( data.timeClose ) clearTimeout( data.timeClose );
            data.timeClose = setTimeout(function(){
                MataTips.close( data );
            }, 2500 );

            data.$.addClass( 'opened' );

        },

        close : function( data ){
            data.$.removeClass( 'opened' );
            if( data.timeClose ) clearTimeout( data.timeClose );
        }

    };
    $(function(){ MataTips.init(); });

})(jQuery);
