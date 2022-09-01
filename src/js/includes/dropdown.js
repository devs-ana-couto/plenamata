(function($){

    var Dropdown = {

        $drops : null,

        init : function(){

            this.$drops = $( '.dropdown' );
            if( !this.$drops.length ) return true;

            $(document).on( 'click', function(e){

                e.target.$ = e.target.$ || $( e.target );
                e.target.$d = e.target.$d || e.target.$.parents( '.dropdown' );
                if( e.target.$.hasClass( '.dropdown' ) || e.target.$d.length ) return true;

                Dropdown.closeAll();                

            });

            // Configure each video
            this.$drops.each(function(){

                this.$ = this.$ || $( this );

                var data = this.$.data( 'Dropdown' );
                if( data !== undefined ) return true;

                data = {
                    _ : this,
                    $ : this.$,
                    $toggle : $( 'button[data-action="toggle"]', this.$ ),
                    $target : this.$.children( 'input' ),
                    $list : $( 'ul', this.$ ),
                    $options : $( 'ul button', this.$ ),
                    $label : this.$.children( 'button' ).children( 'strong' ),
                    label : this.$.data( 'label' )
                };
                data.intialValue = data.$target.val();

                this.$.data( 'Dropdown', data );

                // Toggle
                data.$toggle.on( 'click', function(e){
                    e.preventDefault();
                    Dropdown.toggle( data );
                });

                // Bind options click
                data.$list.on( 'click', 'button', function(e){
                    e.preventDefault();
                    Dropdown.bindSelection( data, this );
                })

                // data.$close.on( 'click', function(e){
                //     e.preventDefault();
                //     Dropdown.close( data );
                // });

                this.$.data( 'Video', data );
                
            });

        },

        bindSelection : function( data, option ){

            option.$ = option.$ || $( option );

            // Not double
            if( option.$.hasClass( 'selected' ) ) return true;

            // Filled or not
            var newLabel;
            if( option.$.val() == '' ){
                newLabel = data.label;
                data.$.removeClass( 'filled' );
            }
            else {
                data.$.addClass( 'filled' );
                newLabel = option.$.text();
            }
            data.$label.html( newLabel );

            // Check clicked
            data.$options.removeClass( 'selected' );
            data.$target.val( option.value );
            option.$.addClass( 'selected' );

            // Close
            Dropdown.close( data );

            // Trigger
            data.$target.trigger( 'change' );

        },

        toggle : function( data ){
            if( data.$.hasClass( 'opened' ) ){
                Dropdown.close( data );   
            }
            else {
                Dropdown.open( data );
            }
        },

        open : function( data ){

            Dropdown.$drops.removeClass( 'opened' );
            data.$.addClass( 'opened' );       
            data.$.trigger( 'open' );

        },

        close : function( data ){

            data.$.removeClass( 'opened' );
            data.$.trigger( 'close' );

        },

        closeAll : function(){

            this.$drops.each(function(){
                var data = this.$.data( 'Dropdown' );
                Dropdown.close( data );
            });

        }

    };
    $(function(){ Dropdown.init(); });

})(jQuery);
