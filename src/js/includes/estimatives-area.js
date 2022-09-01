(function($){

    var EstimativeArea = {

        $ : null,

        init : function(){

            this.$ = $( '#estimatives-area' );
            if( !this.$.length ) return true;

            this.$buttons = $( 'ul.menu button', this.$ );
            this.$items = $( 'div.info-item', this.$ );

            // Binding
            this.$buttons.on( 'click', function(e){
                EstimativeArea.bindClick( this );
            });

        },

        bindClick : function( button ){

            button.$ = button.$ || $( button );
            if( button.$.hasClass( 'active' ) ) return true;

            // Show content
            this.$items.removeClass( 'active' );
            this.$items.filter( '[rel="'+ button.$.attr( 'rel' ) +'"]' ).addClass( 'active' );

            // Buttons
            this.$buttons.removeClass( 'active' );
            button.$.addClass( 'active' );
            

        }

    };
    $(function(){ EstimativeArea.init(); });

})(jQuery);
