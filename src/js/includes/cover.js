var Cover;

(function($){

    Cover = {

        init : function(){

            var $covers = $( '.cover-full' );
            if( $covers.length ){

                $covers.each(function(){

                    this.$ = this.$ || $( this );
                    this.$t = this.$t || $( '.link-texts', this.$ );

                    var $this = this.$;
                    this.$t.hover(
                        function(e){
                            $this.addClass( 'hover' );
                        },
                        function(e){
                            $this.removeClass( 'hover' );
                        }
                    );

                });

            }
            
        }

    };

    $(function(){ 
        Cover.init();  
    });

})(jQuery);
