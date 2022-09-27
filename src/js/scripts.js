if( window.console == null ){
    window.console = {
        log: function (p) {},
    };
}

var 
    _body,
    _window
;

var plenamata_FN = function(){
    plenamata = this;
    plenamata.init();
};

(function($){

    plenamata_FN.prototype = {
        
        init: function() {

            _body = $( 'body' );
            _window = $( window );
            _vp_width = Utils.getPageWidth();

            // Custom scrolls
            var $scroller = $( '.scroller' );
            if( $scroller.length ){
                
                $scroller.each(function(){

                    this.$ = this.$ || $( this );

                    if( $scroller.css( 'overflow-y' ) === 'auto' ){
                        this.$.mCustomScrollbar({ 
                            axis : 'y',
                            scrollbarPosition : 'outside'
                        });
                    }
                    
                });

            }

            // Função de resize da janela do browser ( Define qual o viewport )
            // plenamata.resizing();
            // window.onresize = plenamata.resizing;

            // Control of page scroll
            // plenamata.scrolling();
            // _window.on( 'scroll', plenamata.scrolling );

            // Sanfonas
            //plenamata.bindSanfonas();

            // General functions
            plenamata.general();

        },

        // Properties of Class
        properties: {
            timeEffects: 400, // Tempo para os efeitos
            device: 'desktop', // Device default
            scrollTop: 0,
            loading: false,
            userbars: false,
        },

        // Função de resize da janela do browser ( Define qual o viewport )
        resizing: function () {
            
            var _wWidth = _window.outerWidth();

            // Define qual o viewport
            if( _wWidth < 768 ){
                plenamata.properties.device = 'smartphone';
            }
            else if ( _wWidth >= 768 && _wWidth <= 1279 ){
                plenamata.properties.device = 'tablet';
            }
            else { 
                plenamata.properties.device = 'desktop';
            }

            if ( plenamata.properties.device === 'desktop' ){
                _body
                    .removeClass( 'tablet' )
                    .removeClass( 'mobile' )
                    .addClass( 'desktop' )
                ;
            } 
            else if( plenamata.properties.device === 'tablet' ){
                _body
                    .removeClass( 'desktop' )
                    .removeClass( 'mobile' )
                    .addClass( 'tablet' )
                ;
            } 
            else if( plenamata.properties.device === 'smartphone' ){
                _body
                    .removeClass( 'desktop' )
                    .removeClass( 'tablet' )
                    .addClass( 'mobile' )
                ;
            }
        
        },

        bindSanfonas : function bindSanfonas(){

            // Informações úteis
            $( '.piki-sanfona' ).pikiSanfona({              
                items: '>div',
                headers: '>header',
                contents: '>div'
            });
        
        },

        // Controla o scroll da página
        scrolling: function( e ){

            var 
                $header = $( 'header' ),
                $nav = $( 'body > nav' )
            ;

            if (
                _window.scrollTop() < plenamata.properties.scrollTop &&
                _window.scrollTop() > $header.innerHeight() + $header.offset().top
            ){
                $nav.addClass( 'active' );
            } 
            else {
                $nav.removeClass( 'active' );
            }

            // Keep last scrolltop
            plenamata.properties.scrollTop = _window.scrollTop();
        
        },

        // Lock scroll
        lockScroll : function(){
            Utils.lockScroll();
        },

        // Unlock scroll
        unlockScroll : function(){
            Utils.unlockScroll();
        },

        // Funções gerais de todo o site
        general: function (){

            // do-scroll
            $( '.do-scroll' ).on( 'click', function(e){
                e.preventDefault();
                var vpHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
                $( 'html, body' ).animate({
                    scrollTop: vpHeight
                }, 450, 'easeOutQuad' );      
            });

            // Binds
            $( 'body' )
                .on( 'mouseenter', '.item,.teaser', function(e){
                    this.$ = this.$ || $( this );
                    this.$.addClass( 'hover hover-persists' );
                })
                .on( 'mouseleave', '.item,.teaser', function(e){
                    this.$ = this.$ || $( this );
                    this.$.removeClass( 'hover hover-persists' );
                })
                .on( 'mouseenter', '.editoria-crumb', function(e){
                    this.$ = this.$ || $( this );
                    this.$p = this.$p || this.$.parents( '.item,.teaser' );
                    if( this.$p.length ){
                        this.$p.first().removeClass( 'hover' );
                    }
                })
                .on( 'mouseleave', '.editoria-crumb', function(e){
                    this.$ = this.$ || $( this );
                    this.$p = this.$p || this.$.parents( '.item,.teaser' );
                    if( this.$p.length ){
                        this.$p.first().addClass( 'hover' );
                    }
                })
                // Toggle parent
                .on( 'click', '[data-action="toggle-parent"]', function(e){
                    this.$ = this.$ || $( this );
                    this.$p = this.$p || this.$.parent();
                    this.$p.toggleClass( 'opened' );
                })
            ;

            // Sliders
            var $slider = $( '.destaques.slider' );
            if( $slider.length ){
                $slider.slick({
                    fade: true,
                    dots: true
                });
            }

            // Single gallery
            $gals = $( '.gallery-grid' );
            if( $gals.length ){
                $gals.slick({
                    adaptiveHeight: true
                });
            }

            // Parceiros
            var $partners = $( '.lista-parceiros.slider ul' );
            if( $partners.length ){

                $partners.each(function(){

                    this.$ = this.$ || $( this );

                    var $nav = $( '<nav class="slider-nav compact"></nav>' ).appendTo( this.$.parent() );

                    this.$.slick({
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        appendArrows: $nav,
                        responsive: [
                            {
                                breakpoint: 1044,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 640,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                
                });
            
            }

            // Mais buscados
            var $partners = $( '.more-searcheds ul' );
            if( $partners.length ){

                $partners.each(function(){

                    this.$ = this.$ || $( this );

                    var $nav = this.$.parents( '.more-searcheds' ).first().find( '.top nav' );

                    this.$.slick({
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        appendArrows: $nav,
                        responsive: [
                            {
                              breakpoint: 940,
                              settings: {
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        appendArrows: $nav,
                              }
                            },
                            {
                              breakpoint: 600,
                              settings: {
                        infinite: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        appendArrows: $nav,
                              }
                            },
                            {
                              breakpoint: 480,
                              settings: {
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        appendArrows: $nav,
                              }
                            }
                        ]
                    });
                
                });
            
            }

            // Slider when needs
            var $swn = $( '.slider-when-needs' );
            if( $swn.length ){

                $swn.each(function(){

                    this.$ = this.$ || $( this );
                    this.$p = this.$p || this.$.parent();

                    if( Utils.getPageWidth() > 540 ){

                        this.$.addClass( 'no-slider' );

                    }
                    else {
                    
                        const 
                            maxWidth = this.$.data( 'max-to-sliding' ),
                            pageWidth = Utils.getPageWidth()
                        ;

                        // Max width to mount carousel
                        if( maxWidth !== undefined && pageWidth > maxWidth ) return true;

                        let 
                            $childs = this.$.find( '.swiper-wrapper' ).children(),
                            space = this.$.innerWidth(),
                            totalSize = 0,
                            breakIndex = false
                        ;
                        $childs.each(function( i ){
                        
                            this.$ = this.$ || $( this );

                            totalSize += this.$.outerWidth( true );

                            if( totalSize > space && !breakIndex ){
                                breakIndex = i;
                            }
                        
                        });

                        if( breakIndex ){

                            this.$.addClass( 'with-slider' );
                            
                            const $slider = this.$.children( '.swiper' );
                            const $pager = $( '<div class="swiper-pagination"></div>' ).appendTo( $slider );
                            var swiper = new Swiper( $slider.get(0), {
                                slidesPerView: 'auto',
                                spaceBetween: 20,
                                freeMode: true,
                                pagination: {
                                    el: $pager.get(0),
                                    clickable: true,
                                },
                            });

                        }
                        else {

                            this.$.addClass( 'no-slider' );

                        }

                    }

                });

            }

        }

    };

    $(function () {
        plenamata = new plenamata_FN();
    });
  
})(jQuery);
