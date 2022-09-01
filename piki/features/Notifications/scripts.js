var Notifications;

(function($){

	Notifications = {

		$ : null,
		$menuToggle : null,
		$toggle : null,
		$menu : null,
		$list : null,
		$row : null,
		$settings : null,
		loaded : false,

		init : function(){

			// Main object
			this.$ = $( '#wiget-notifications' );
			if( !this.$.length ) return true;

			// Menu toggle
			this.$menuToggle = $( '#masthead button[data-action="toggle-menu"]' );

			// Menu
			this.$menu = $( 'nav', this.$ );
			this.$filters = $( 'button[data-action="filter"]', this.$ );
			this.$unreadsButton = this.$filters.filter( '[rel="unreads"]' );

			// Toggle
			this.$toggle = $( 'button[data-action="toggle-notifications"]', this.$ );

			// List
			this.$list = $( 'ul', this.$ );
			this.$row = $( 'li', this.$list ).first().clone();
			$( 'li', this.$list ).remove();

			// Settings
			this.$settings = $( '.menu-settings', this.$ );
			this.$settingsToggle = $( 'button[data-action="toggle-settings"]', this.$ );
			this.$userEmail = $( '[data-meta-key="email"]', this.$ );
			this.$totalUnreads = $( '[data-meta-key="total-unreads"]', this.$ );

			// Signup toggle
			this.$signup = $( '#mail-signup', this.$ );

			// Initial load
			this.load();

		},

		load : async function(){

			const response = await this.getNotesList();
			this.populate( response );

			// Binding
			this.bind();

		},

		// Populate list
		populate : function( data ){

			// Email
			this.$userEmail.text( data.user.data.user_email );

			// Unreads report
			if( data.pendings > 0 ){

				// Show counter
				this.$totalUnreads.text( data.pendings + '+' ).fadeIn();

				// Unreadeds filter
				this.$unreadsButton.attr( 'disabled', false ).removeClass( 'disabled' );
				
				// Menu toggle icon
				$( '<i class="warning"></i>' ).appendTo( this.$menuToggle );
			
			}
			else {
				
				// Hide counter
				this.$totalUnreads.text( '' ).fadeOut();

				// Unreadeds filter
				this.$unreadsButton.attr( 'disabled', true ).addClass( 'disabled' );

				var $menuWarning = $( 'i.warning', this.$menuToggle );
				if( $menuWarning.length ) $menuWarning.remove();
			
			}

			// Sigup toggle
			this.$signup.prop( 'checked', data.signup === 'true' );

			// Items list
			if( data.items ){

				// Clear
				Notifications.$list.html( '' );

				// Inser items
				data.items.forEach(function( item ){

					// New list
					var $new = 
						Notifications.$row
						.clone()
						.addClass( item.status )
						.appendTo( Notifications.$list )
					;

					// Populate item
					$new.find( 'em' ).html( item.type_label );
					$new.find( 'strong' ).html( item.section );
					$new.find( 'span' ).html( item.post_title );

					// Link
					var $link = $new.children( 'a' );
					$link.attr( 'href', item.url ).attr( 'rel', item.ID );

					// Bind click
					if( item.status === 'pending' ){
						$link.attr( 'data-action', 'go-to-content' );
					}

				});

			}

		},

		bind : function(){

			// View count
			this.$.on( 'click', 'a[data-action="go-to-content"]', async function(e){

				this.$ = this.$ || $( this );
			
				var response = await Notifications.setView( this );
				if( response.status === 'success' ){
					this.parents( 'li' ).first().removeClass( 'pending' ).addClass( 'readed' );
					return true;
				}
			
			});

			// Bind menu
			this.$filters.on( 'click', function(e){
				e.preventDefault();
				Notifications.clickFilter( this );			
			});

			// Toggle settings
			this.$settingsToggle.on( 'click', function(e){

				this.$ = this.$ || $( this );
				
				if( this.$.hasClass( 'active' ) ){
					this.$.removeClass( 'active' );
					Notifications.$settings.removeClass( 'opened' );
				}
				else {
					this.$.addClass( 'active' );
					Notifications.$settings.addClass( 'opened' );
				}
			
			});

			// Signup change
			this.$signup.on( 'change', function(){
				Notifications.signup( this.checked );
			});

		},

		clickFilter : async function( button ){

			button.$ = button.$ || $( button );
			if( button.$.hasClass( 'active' ) ) return true;

			const response = await Notifications.getNotesList( button.$.attr( 'rel' ) );
			Notifications.populate( response );

			// Mark active
			Notifications.$filters.removeClass( 'active' );
			button.$.addClass( 'active' );

		},

		getNotesList : function( filter ){

			return $.ajax({
				url: Piki.ajaxurl + '?action=get_notifications',
				type : 'POST',
				dataType : 'json',
				data : {
					filter : ( filter == undefined ? '' : filter )
				}
			})
			.done(function( data ) {
				return data;
			});

		},

		setView : async function( button ){

			return $.ajax({
				url: Piki.ajaxurl + '?action=notification_set_view',
				type : 'POST',
				dataType : 'json',
				data : {
					'notification_id' : button.$.attr( 'rel' )
				}
			})
			.done(function( data ) {
				return data;
			});

		},

		signup : function( status ){

			return $.ajax({
				url: Piki.ajaxurl + '?action=notification_singup',
				type : 'POST',
				dataType : 'json',
				data : {
					'status' : status ? 'in' : 'out'
				}
			})
			.done(function( data ) {
				return data;
			});

		}

	};
	$(function(){
		Notifications.init();
	});

})(jQuery);