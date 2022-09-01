(function($){

    var copyCode = {

        init : function(){

            var $copylinks = $( 'button.copylink' );
            if( $copylinks.length ){
            
                var clipboard = new ClipboardJS( 'button.copylink' );
                var timeClip = false;
                
                clipboard.on( 'success', function(e){

                    e.trigger.$ = e.trigger.$ || $( e.trigger );
                    e.trigger.$.addClass( 'done' );
        
                    timeClip = setTimeout(function(){
                         e.trigger.$.removeClass( 'done' );
                    }, 2000 );
        
                    e.clearSelection();
                
                });
            }
            
        }

    };

    $(function(){ 
        copyCode.init();  
    });

})(jQuery);
