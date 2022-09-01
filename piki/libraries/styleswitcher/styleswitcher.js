var StyleSwitcher;
(function($){

    StyleSwitcher = {

        $styles : null,
        $default : null,
        cookie : null,
        actual : false,

        init : function(){
            // Elements
            this.$styles = $( 'link[rel*="stylesheet"]' ).filter( '[title]' );
            this.$default = this.$styles.not( '[rel*="alternate"]' ).first();
            // Cookie
            this.cookie = Cookie.get( 'style' );
            // Set stylesheet
            if( this.cookie ){
                this.setActive( this.cookie );
            }
            // Bind triggers
            $( 'body' ).on( 'click', '[data-stylesheet-target]', function( e ){
                if( StyleSwitcher.actual == this.title ){
                    StyleSwitcher.setDefault();
                }
                else {
                    StyleSwitcher.setActive( this.dataset.stylesheetTarget );
                }
            });
        },

        setDefault: function(){
            this.actual = false;
            this.$styles.prop( 'disabled', true );
            this.$default.prop( 'disabled', false );
            Cookie.delete( 'style' );
        },

        setActive : function( title ){
            this.actual = title;
            this.$styles.prop( 'disabled', true );
            this.$styles.filter( '[title="' + title + '"]' ).prop( 'disabled', false );
            Cookie.set( 'style', title );
        }

    };
    $(function(){
        StyleSwitcher.init();
    });

})(jQuery);