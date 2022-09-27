var 
    Share,
    $body
;

(function($){

    Share = {

        $box : null,
        $body : null,
        $buttons : null,
        $close : null,
        activeData : null,
        request : false,

        services : {
            facebook : {
                url : 'https://www.facebook.com/sharer/sharer.php?u={URL}&message={TITLE}',
                title : 'Facebook'
            },
            twitter : {
                url : 'http://twitter.com/share?url={URL}&text={TITLE}', 
                title : 'Twitter'
            },
            linkedin : {
                url : 'https://www.linkedin.com/sharing/share-offsite/?url={URL}',
                title : 'LinkedIn'
            },
            pinterest : {
                url : 'http://pinterest.com/pin/create/button/?url={URL}&media={URL_MEDIA}&description={TITLE}',
                title : 'Pinterest'
            },
            whatsapp : {
                url : 'https://api.whatsapp.com/send?text={TITLE} {URL}',
                data : { 'action' : 'share/whatsapp/share' },
                title : 'Whatsapp',
            },
            workplace : {
                url : 'https://work.facebook.com/sharer.php?display=popup&u={URL}',
                title : 'Workplace'
            },
            email : {
                url : 'mailto:?subject={SUBJECT}&body={TITLE} {URL}',
                data : { 'subject' : '{SUBJECT}' },
                title : 'E-mail',
            },
            copylink : {
                url : '{URL}',
                attr : 'data-action="copy-link" data-clipboard-text="{URL}"',
                title : '{COPY_TITLE}',
            }
        },

        init : function(){

            Share.$body = $( 'body' ).first();
            Share.$body.on( 'click', '[data-action="share"]', function(e){
                e.preventDefault();
                Share.bindShareClick( this );
            });

            Share.$box = $( '#sharebox' );
            Share.$image = $( '.image-wrapper', Share.$box );
            Share.$buttons = $( '.networks a', this.$box );
            Share.$download = Share.$buttons.filter( '.download' );
            Share.$close = $( 'button.close', Share.$box );
            Share.$back = $( 'button[data-action="set-share-mode"]', Share.$box );
            
            // Embed
            Share.embed = {
                $trigger : $( 'button[data-type="incorporar"]', this.$box ),
                $iframe : $( 'iframe', this.$box ),
                $code : $( 'textarea', this.$box ),
                $copy : $( 'button[data-action="copy-code"]', this.$box ),
                timeout : false
            };
            Share.embed.$trigger.on( 'click', function(e){
                e.preventDefault();
                Share.setEmbedMode();
            });
            Share.$back.on( 'click', function(e){
                e.preventDefault();
                Share.setShareMode();
            });

            // Bind social medias click
            Share.$buttons.on( 'click', function(e){
                Share.bindNetworkClick( this, e );
            });

            // Bind close
            Share.$close.on( 'click', function(e){
                e.preventDefault();
                Share.close();
            });

            // Copy code
            Share.embed.$copy.on( 'click', function(e){
                e.preventDefault();
                Share.copyCode();            
            });

        },

        copyCode : function(){

            Share.embed.$code.select();
            document.execCommand( 'copy' );
            Share.embed.$copy.addClass( 'success' );

            if( Share.embed.timout ) clearTimeout( Share.embed.timeout );
            Share.embed.timeout = setTimeout(function(){
                Share.embed.$copy.removeClass( 'success' );
            }, 2000 );

        },

        setEmbedMode : function(){
            Share.$box.addClass( 'embed-mode' );
        },

        setShareMode : function(){
            Share.$box.removeClass( 'embed-mode' );
        },

        // Desktop share
        bindNetworkClick : function( link, e ){

            link.$ = link.$ || $( link );

            // Media type
            const type = link.$.data( 'type' );

            // Whatsapp, Mailto and Copy link
            if( type === 'whatsapp' || type === 'download' || type === 'copylink' || ( type === 'email' && urlshare.indexOf( 'mailto:' ) === 0 ) ){
                return true;
            }

            // Others
            e.preventDefault();

            var urlshare = Share.getButtonURL( link.$ );

            window.open( urlshare, Share.activeData.title, "width=500,height=500" );
            
        },

        getButtonURL : function( $button ){

            const URL = $button.data( 'service-url' )
                .replace( '{TITLE}', Share.activeData.title )
                .replace( '{URL}', Share.activeData.url )
            ;

            return URL;

        },

        bindShareClick : async function( button ){

            Loader();

            var data = this.getData( button );

            // Using button data
            Share.activeData = data;

            // Estimatives area
            if( data.context === 'estimatives-area' ){

                var 
                    type = data.estimatives.$buttons.filter( '.active' ).attr( 'rel' ),
                    numberBig,
                    numberSmall,
                    urlshare = Piki.blogurl + '/estimativas/'
                ;

                if( type === 'area' ){

                    numberBig = $( '[data-deter="hectaresThisYear"]', data.estimatives.$ ).text();
                    numberSmall = $( '[data-deter="hectaresPerDay"]', data.estimatives.$ ).text();
                    urlshare += 'area/';
                
                }
                else {
                
                    numberBig = $( '[data-deter="treesEstimative"]', data.estimatives.$ ).text();
                    numberSmall = $( '[data-deter="treesPerDay"]', data.estimatives.$ ).text();
                
                }

                // Keep URL in data
                data.url = urlshare;

                // Not controlled buttons
                var $whatsapp = Share.$buttons.filter( '[data-type="whatsapp"]' );
                if( $whatsapp.length ){
                    var whats_url = Share.getButtonURL( $whatsapp );
                    $whatsapp.attr( 'href', whats_url );
                }

                // Create image
                try {

                    var 
                        image = await Share.requestImage( type, numberBig, numberSmall ),
                        download_url = Piki.blogurl + '/download-image/' + ( image.url.split( '/wp-content/uploads/' ).pop() );
                    ;
                    
                    Share.$image.html( '<img src="' + image.url + '" alt=" ">' );
                    Share.$download.attr( 'href', download_url );
                
                }
                catch( e ){
                    console.info( "e" );
                    console.log( e );
                }
                
            }
            else {

                Share.$download.hide();

            }

            Loader( 'close' );

            Share.open();

        },

        requestImage : async function( type, numberBig, numberSmall ){            
            return new Promise(function( resolve, reject ) {
                $.ajax({
                    url: Piki.blogurl + '/generate-share-image/',
                    type: 'POST',
                    dataType: 'JSON',
                    data: { 
                        type : type,
                        dadoMaior : numberBig,
                        dadoMenor : numberSmall
                    },
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(err) {
                        reject(err);
                    }
                });
            });
        },

        getData : function( button ){

            button.$ = button.$ || $( button );
            var data = button.$.data( 'Share' );

            if( data === undefined ){

                data = {
                    self : button,
                    $ : button.$,
                    context : button.$.data( 'context' ),
                    url : button.$.data( 'url' ),
                    title : button.$.data( 'share-title' ),
                    desc : button.$.data( 'share-escription' )
                };
            
                if( data.context === 'estimatives-area' ){
                    data.estimatives = { $ : $( '#estimatives-area' ) };
                    data.estimatives.$buttons = $( '.menu button', data.estimatives.$ );
                }

                button.$.data( 'Share', data );
            
            }

            return data;

        },

        open : function(){

            Utils.lockScroll();
            Share.$box.addClass( 'opened' );

        },

        close : function(){

            Share.$box.removeClass( 'opened' );
            Utils.unlockScroll();

        }
        
    }
    $(function(){ Share.init(); });

})(jQuery);
