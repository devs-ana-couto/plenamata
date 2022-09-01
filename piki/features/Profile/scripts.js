var LoginBox;

(function($){

	LoginBox = {

		$main : null,
		$form : null,
		$header : null,

		main : function(){

			this.$main = $( '#box-login' ).first();
			this.$form = $( 'form#login', this.$main );
			this.$header = this.$main.children( 'header' );
			this.$loginTitle = $( '.login-title strong', this.$header );
			this.loginTitle = this.$loginTitle.html();
			this.$showReset = $( '.btn-esqueci', this.$main ).first();
			this.$showLogin = $( '.btn-login', this.$main ).first();
			this.$action = $( 'input#form-action', this.$main ).first();
			this.$button = $( '#form_submit', this.$main );
			this.$passField = $( '.linha-field.pwd' );
			
			this.$acts = $( '.actions', this.$main ).first();
			this.$actsNav = $( 'nav', this.$acts ).first();

			this.formData = this.$form.data( 'PikiForms' );
			
			this.bind();

		},

		bind : function(){

			this.$showReset.on( 'click', function(){
				LoginBox.showReset();
			});
			this.$showLogin.on( 'click', function(){
				LoginBox.showLogin();
			});

		},

		showReset : function(){

			PikiForms.clearErrors( this.formData );	

			this.$action.val( 'reset' );

			this.swapText( this.$loginTitle, 'Esqueci minha senha' );
			this.swapText( this.$button, 'Recuperar senha' );

			this.$passField.stop().slideUp( 300 );
			this.$showReset.stop().fadeOut( 300, function(){
				LoginBox.$showLogin.stop().fadeIn( 300 );
			});

		},

		showLogin : function(){

			PikiForms.clearErrors( this.formData );	
			
			this.$action.val( 'novo' );

			this.swapText( this.$loginTitle, this.loginTitle );
			this.swapText( this.$button, 'Entrar' );

			this.$passField.stop().slideDown( 300 );
			this.$showLogin.stop().fadeOut( 300, function(){
				LoginBox.$showReset.stop().fadeIn( 300 );
			});

		},

		swapText : function( $el, text ){

			$el.fadeOut( 100, function(){
				$el
					.html( text )
					.fadeIn( 100 );
				;
			});
		}

	};
	$(function(){
		//LoginBox.main();
	});

})(jQuery);