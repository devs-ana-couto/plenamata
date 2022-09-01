var 
    $window,
    $body,
    Dashboard
;

(function($){

    Dashboard = {

        $ : null,
        timeResize : false,
        isDashboard : false,
        $mapWrapper : [],
        $map : [],

        init : function(){

            $body = $('body');
            $window = $(window);

            // Just dashboard page
            if( !$body.hasClass( 'page-template-template-dashboard' ) ) return true;

            // Trigger
            $window.scroll(function(){
                Dashboard.checkMap();
            });
            setTimeout(function(){
                Dashboard.checkMap();
            }, 1500 );

        },

        checkMap : function(){

            if( !this.getElements() ) return true;
            
            var scrollTop = Utils.getPageTop();
            var limitBottom = this.$mapWrapper.outerHeight() - this.$map.outerHeight();

            if( scrollTop >= limitBottom ){
                this.$map.addClass( 'sticked' );
            }
            else {
                 this.$map.removeClass( 'sticked' );
            }
            
        },

        getElements : function(){

            if( !this.$map.length ){
                this.$ = $( 'div.dashboard' );
                this.$mapWrapper = $( '.dashboard__map', this.$ );
                this.$map = this.$mapWrapper.children( 'div' );
            }

            return this.$map.length;
        
        },

    };
    $(function(){ 
        Dashboard.init(); 
    });

})(jQuery);
