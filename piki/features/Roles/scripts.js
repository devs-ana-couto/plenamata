var PikiRoles;

(function($){

    PikiRoles = {

        $ : false,
        $chooser : false,
        $caps : false,
        role : false,

        init : function(){

            this.$ = $( 'form#pikiroles' );
            if( !this.$.length ) return true;

            // Role
            this.role = $( 'input#role', this.$ ).val();

            // Chooser
            this.$chooser = $( '#role-selection', this.$ );
            this.$chooser.on( 'change', function(){
                document.location.href = Piki.blogurl + '/wp-admin/admin.php?page=piki-roles-settings&role=' + this.value
            });

            // Sanfona
            this.$caps = $( '#pikiroles-caps', this.$ );
            this.$caps
                .pikiSanfona({              
                    items: '>div',
                    headers: '>header',
                    contents: '>div'
                })
                .on( 'click', 'button', function(e){
                    e.preventDefault();
                    PikiRoles.bindToggle( this );
                })
            ;

        },

        bindToggle : function( button ){

            button.$ = button.$ || $( button );

            var action = button.$.hasClass( 'button-primary' ) ? 'remove' : 'insert';

            Message.open({
                title: 'Permissão de usuário',
                title_location : 'inside',
                message : 'Deseja mesmo '+ ( action == 'remove' ? 'remover' : 'adicionar' ) +' esta permissão?',
                classname : 'confirm',
                buttons : [
                    {
                        label : 'Sim',
                        classname: 'button button-primary button-large danger',
                        callback: function(){
                            PikiRoles.changeStatus( button, action );
                        }
                    },
                    {
                        label: 'Não',
                        classname: 'button button-primary button-large'
                    }
                ],
                buttons_location : 'inside'
            });

        },

        changeStatus : function( button, action ){

            $.fn.pikiLoader();

            $.ajax({
                method: 'POST', 
                url : ajaxurl,
                data : {
                    action : 'pikiroles_change_cap',
                    role : PikiRoles.role,
                    capability : button.$.data( 'cap-key' ),
                    status : action
                }
            })
            .done(function( response ) {

                if( response.status === 'success' ){

                    if( action == 'remove' ){
                        button.$.removeClass( 'button-primary' );
                    }
                    else {
                        button.$.addClass( 'button-primary' );
                    }
                    
                    $.fn.pikiLoader( 'close' );
                
                }
                else {
                    
                    $.fn.pikiLoader( 'close' );
                    Message.open( response.error_message );

                }

            })
            .fail(function( jqXHR, textStatus ){

                $.fn.pikiLoader( 'close' );
                Message.open( 'Erro ao '+ ( action == 'remove' ? 'remover' : 'adicionar' ) +' permissão: ' + textStatus );
            
            });

        }

    };
    $(function(){
        PikiRoles.init();
    });

})(jQuery);