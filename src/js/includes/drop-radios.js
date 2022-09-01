var DropRadios;

(function($){

    var $body;

    DropRadios = {

        $drops : null,
        timeResize : false,

        init : function(){
            
            $body = $( 'body' );

            this.$drops = $( '.drop-radios' );

            // Configure each dropdown
            this.$drops.each(function(){
                DropRadios.configure( this );
            });

            $( 'body' ).on( 'click', '.drop-radios button.toggle', function(e){

                this.$ = this.$ || $( this );
                this.$drop = this.$drop || this.$.parents( '.drop-radios' );

                var data = this.$drop.data( 'DropRadios' );
                if( data === undefined ){
                    DropRadios.configure( this.$drop.get(0), true );
                }
                else {
                    DropRadios.open( data );
                }

            });

            // Bind resizing
            $(window).resize(function(){
                if( DropRadios.timeResize ) clearTimeout( DropRadios.timeResize );
                DropRadios.timeResize = setTimeout( DropRadios.bindResize, 100 );
            });

        },

        configure : function( drop, open ){
                
            drop.$ = drop.$ || $( drop );

            var data = drop.$.data( 'DropRadios' );
            if( data !== undefined ) return true;

            data = {
                _ : drop,
                $ : drop.$,
                $trigger : $( 'button', drop.$ ),
                $showValue : $( 'button span', drop.$ ),
                $list : $( '.drop-radios--options', drop.$ ),
                $options : $( 'input[type="radio"]', drop.$ ),
                $labels : $( 'label', drop.$ ),
                $floater : false,
                staticLabel : drop.$.hasClass( 'free-label' ),
                placeholder : drop.$.data( 'placeholder' ),
                dropLocation : 'self'
            };
            data.intialValue = data.$options.filter( ':checked' ).val();

            // Keep data
            drop.$.data( 'DropRadios', data );

            // Toggle
            data.$trigger
                .on( 'focus', function(e){
                    DropRadios.open( data );
                })
                .on( 'blur focusout', function(e){
                    DropRadios.close( data );
                })
            ;

            data.$options.on( 'change', function(){
                DropRadios.checkLabel( data );
            });
            data.$options.on( 'actualize', function(){
                DropRadios.checkLabel( data );
            });

            if( open !== undefined ){
                data.$trigger.focus();
            }

            // Check size
            DropRadios.checkSize( data );        

        },

        checkLabel : function( data ){

            if( data.staticLabel ) return true;

            let $value = data.$options.filter( ':checked' );
            if( !$value.length ) $value = data.$options.first();

            let labelInsert;
            if( $value.val() === '' ){
                labelInsert = data.placeholder;
                data.$.removeClass( 'filled' );
            }
            else {
                labelInsert = data.$labels.filter( '[for="'+ $value.attr( 'id' ) +'"]' ).text();
                data.$.addClass( 'filled' );
            }
            data.$showValue.html( labelInsert );

        },

        bindResize : function(){
            
            // Configure each video
            DropRadios.$drops.each(function(){

                this.$ = this.$ || $( this );

                var data = this.$.data( 'DropRadios' );
                if( data === undefined ) return true;

                DropRadios.checkSize( data );

            });

        },

        checkSize : function( data ){

            if( DropRadios.isMobile() ){
                if( data.dropLocation !== 'body' ){
                    DropRadios.createFloater( data );
                    data.dropLocation = 'body';
                }
            }
            else {
                if( data.dropLocation !== 'self' ){
                    data.dropLocation = 'self';
                }
            }
            
        },

        createFloater : function( data ){

            if( data.$floater ) return true;

            data.$floater = data.$list.clone().appendTo( $body );

            $( 'ul li', data.$floater ).each(function(){

                var 
                    $field = $( 'input', this ),
                    $label = $( 'label', this ),
                    old_id = $field.attr( 'id' ),
                    $target = data.$list.find( 'input[id="'+ old_id +'"]' ),
                    new_id = '_' +  old_id
                ;

                $label.attr( 'for', new_id );

                $field
                    .data( 'target-id', old_id )
                    .attr( 'id', new_id )
                    .on( 'change', function(){
                        var newStatus = this.checked;
                        $target.prop( 'checked', newStatus ).trigger( 'change' );
                    });
                ;

            });

        },
        
        open : function( data ){

            // Disabled
            if( data.$.is( ':disabled' ) ) return true;
            
            data.$.addClass( 'opened' );

            if( data.$floater ){
                data.$floater.addClass( 'opened' );
            }

            if( DropRadios.isMobile() ){
                Utils.lockScroll();
            }

        },

        close : function( data ){

            data.$.removeClass( 'opened' );

            if( data.$floater ){
                data.$floater.removeClass( 'opened' );
            }

            Utils.unlockScroll();

        },

        isMobile : function(){
            return Utils.getPageWidth() <= 550;
        }

    };
    $(function(){ 
        DropRadios.init(); 
    });

})(jQuery);
