var Smalldrop;

(function($){

    Smalldrop = {

        $items : null,

        init : function(){

            this.$items = $( 'div.smalldrop' );
            if( !this.$items.length ) return true;

            this.$items.each(function(){
                Smalldrop.configure( this );
            });
        
        },

        configure : function( drop ){

            drop.$ = drop.$ || $( drop );

            var data = drop.$.data( 'Smalldrop' );
            if( data === undefined ){
                data = {
                    self : drop,
                    $ : drop.$,
                    $button : drop.$.children( 'button' ),
                    $list : drop.$.children( 'nav' )
                };
                drop.$.data( 'Smalldrop', data );
            }

            data.$button.on( 'click', function(e){
                e.preventDefault();
                Smalldrop.toggle( data );
            });
            data.$list.on( 'click', 'a', function(){
                Smalldrop.close( data );
            });

            // Ouside click
            document.addEventListener( 'click', function(event){
                // Self
                event.target.$ = event.target.$ || $( event.target );
                // Parent drop
                event.target.$drop = event.target.$drop || event.target.$.parents( '.smalldrop' );
                // Closing
                if( !event.target.$.hasClass( 'smalldrop' ) && !event.target.$drop.length ){
                    Smalldrop.closeAll();
                }
            });

        },

        // Close all drops
        closeAll : function(){
        
            Smalldrop.$items.each(function(){
                this.$ = this.$ || $( this );
        
                var data = this.$.data( 'Smalldrop' );
                if( data !== undefined ){
                    Smalldrop.close( data );
                }
        
            });
        
        },

        // Toggle
        toggle : function( data ){
            var active = data.$.hasClass( 'opened' );
            if( active ){
                Smalldrop.close( data );
            }
            else {
                Smalldrop.open( data );
            }
        },

        // Opening
        open : function( data ){
            data.$.addClass( 'opened' );
        },

        // Closing
        close : function( data ){
            data.$.removeClass( 'opened' );
        }

    };

    $(function(){ 
        Smalldrop.init(); 
    });

})(jQuery);
