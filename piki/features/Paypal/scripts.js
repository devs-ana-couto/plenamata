(function($){

	var PPButtons = function(){

		var $buttons = $( '.paypal-button' );
		if( $buttons.length ){

			$buttons.each(function(){

				this.$ = this.$ || $( this );

				paypal.Button.render({

			        env: 'sandbox', // Optional: specify 'sandbox' environment

			        client: {
			            sandbox:    'thiago.borges28-facilitator_api1.gmail.com',
			            production: 'thiago.borges28@gmail.com'
			        },

			        payment: function() {

			            var env    = this.props.env;
			            var client = this.props.client;

			            return paypal.rest.payment.create(env, client, {
			                transactions: [
			                    {
			                        amount: { total: '55.00', currency: 'USD' }
			                    }
			                ]
			            });
			        },

			        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

			        onAuthorize: function(data, actions) {

			            // Optional: display a confirmation page here

			            return actions.payment.execute().then(function() {


			            	console.info( 'data' );
			            	console.log( data );
			            	

			                // Show a success page to the buyer
			            });
			        },

			        onError: function(err) {
				    	
				    	console.info( 'err' );
				    	console.log( err );
				    	
				    }

			    }, '#' + this.$.attr( 'id' ) );				
			
			});
		}
	};

	$(function(){

		PPButtons();


		/*
		var token = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5NTQzMGFhZDBjMDAzMDY5YWM1MmUyOWRhYzU2NmNjYjIxZjQ0MjBlNzFkN2YwMzFiNzEwY2M5YWI3YzZiYmU0fGNyZWF0ZWRfYXQ9MjAxNy0wNC0xM1QyMTowODoyMS45NTY4NTA1NjUrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXpwc3R3cWt2c3Y5eGhyY3BcdTAwMjZwdWJsaWNfa2V5PTNkcDl0dmg3a3Jkd3Y0azYiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvenBzdHdxa3Zzdjl4aHJjcC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3pwc3R3cWt2c3Y5eGhyY3AvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3pwc3R3cWt2c3Y5eGhyY3AifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiUGlraXdlYiIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6InBpa2l3ZWIiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6Inpwc3R3cWt2c3Y5eGhyY3AiLCJ2ZW5tbyI6Im9mZiJ9';
		
		// Fetch the button you are using to initiate the PayPal flow
		var paypalButton = document.getElementById( 'paypal-button' );

		// Create a Client component
		braintree.client.create(
			
			{ 
				authorization: token
			}, 
			
			function ( clientErr, clientInstance ){


				console.info( 'clientInstance' );
				console.log( clientInstance );
				
				
				// Create PayPal component
				braintree.paypal.create(
					{ 
						client: clientInstance 
					}, 
					function ( err, paypalInstance ) {

						console.info( 'paypalInstance' );
						console.log( paypalInstance );

						console.info( 'err' );
						console.log( err );
						
						paypalButton.addEventListener('click', function () {
							
							// Tokenize here!
							paypalInstance.tokenize(
								{
									flow: 'checkout', // Required
									amount: 10.00, // Required
									currency: 'USD', // Required
									locale: 'en_US',
									enableShippingAddress: true,
									shippingAddressEditable: false,
									shippingAddressOverride: {
										recipientName: 'Scruff McGruff',
										line1: '1234 Main St.',
										line2: 'Unit 1',
										city: 'Chicago',
										countryCode: 'US',
										postalCode: '60652',
										state: 'IL',
										phone: '123.456.7890'
									}
								
								}, 
								
								function ( err, tokenizationPayload ) {
									// Tokenization complete
									// Send tokenizationPayload.nonce to server
								}
							
							);
						}
					);
				}
			);
		});
		*/

	});


})(jQuery);

/*
var form = document.querySelector('#checkout-form');
var submit = document.querySelector('input[type="submit"]');

braintree.client.create({
  // Replace this with your own authorization.
  authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3YzRiMjE1NmM2NDIzMjlmYzIxZjAwNGYwNmNlNzQzNDEzYjlhMzVhNjk2MDgwOTNmZWFmZDk2ZmM5MzkwZGEwfGNyZWF0ZWRfYXQ9MjAxNy0wNC0xM1QyMDo1NDoxMS4wNTg2NDU5ODMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0='
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
    return;
  }

  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '14pt'
      },
      'input.invalid': {
        'color': 'red'
      },
      'input.valid': {
        'color': 'green'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10/2019'
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
      return;
    }

    submit.removeAttribute('disabled');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
        if (tokenizeErr) {
          // Handle error in Hosted Fields tokenization
          return;
        }

        // Put `payload.nonce` into the `payment_method_nonce` input, and then
        // submit the form. Alternatively, you could send the nonce to your server
        // with AJAX.
        document.querySelector('input[name="payment_method_nonce"]').value = payload.nonce;
        form.submit();
      });
    }, false);
  });
});
*/