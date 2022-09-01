var ImageInfo;

(function($){

    ImageInfo = {

        init : function(){

            $( 'body' ).on( 'click', '.image-info-wrapper .image-description-toggle', function(e){
                e.preventDefault();
                ImageInfo.bindClick( this );
            });

        },

        bindClick : function( item ){
            item.$ = item.$ || $( item );
            item.$p = item.$p || item.$.parents( '.image-info-wrapper' ).first();
            item.$p.toggleClass( 'active' );
        }

    };

    $(function(){ 
        ImageInfo.init();  
    });

})(jQuery);
