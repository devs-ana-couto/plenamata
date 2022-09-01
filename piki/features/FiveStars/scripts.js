(function($){

	// Five stars
	var fiveStarsMethods = {

		configure : function( star, callback ) {
			return this.each(function(){

				var data = {
					$ : $( this ),
					self : this,
					locked : false
				};

				// Type
				data.type = data.$.attr( 'type' );

				// Type
				data.ID = data.$.attr( 'rel' );
				
				// Stars
				data.stars = data.$.find( '.star' );

				// Score
				data.scoreMedia = data.$.attr( 'score-media' );
				
				// Voto do usuário
				data.userScore = data.$.attr( 'user-score' );

				// Status element
				data.status = data.$.find( 'em' ).first();
				data.statusNumber = $( 'strong', data.status ).first();
				data.statusPlural = $( 'span', data.status ).first();
				
				// Voto do usuário
				data.successMessage = data.$.attr( 'data-success-message' );

				// Guardando DATA
				data.$.data( 'fiveStars', data );
				
				// Callback
				if( callback !== undefined ){
					fiveStarsMethods[ callback ].apply( data.$, [ data, star ] );
				}

	    	});
		},

		setScores : function( data, score ){
			return this.each(function(){
				data.stars.removeClass( 'active' );
				for( var s = 1; s <= score; s++ ){
					data.stars.eq( s - 1 ).addClass( 'active' )
				}
			});
		},

		mouseover : function( data, star ){
			return this.each(function(){

				data.$.fiveStars( 'setScores', star.score );

				data.statusNumber.text( star.score );
				( star.score > 1 ) ? data.statusPlural.show() : data.statusPlural.hide();
				data.status.stop().fadeIn( 200 );
			
			});
		},

		click : function( data, star ){
			return this.each(function(){

				$.fn.pikiLoader();

				$.ajax({
					url : Piki.ajaxurl,
					type : 'POST',
					dataType : 'JSON',
					data : { 
						action : 'five_stars_vote',
						ID : data.ID,
						type : data.type,
						score : star.score
					}
				})
				.done(function( response ) {

					data.userScore = response.user_score;
					data.scoreMedia = response.total;

					// Success message
					data.locked = true;
					data.$.removeClass( 'free' ).addClass( 'locked' );
					data.status.html( data.successMessage ).stop().show();
					fiveStarsMethods[ 'setScores' ].apply( data.$, [ data, data.userScore ] );

					$.fn.pikiLoader( 'close' );

				})
				.fail(function( jqXHR, textStatus ) {
					
					$.fn.pikiLoader( 'close' );
					$.fn.pikiAlert( "Request failed: " + textStatus );
				
				});
			});
		},

		mouseout : function( data, star ){
			return this.each(function(){
				var scores = data.userScore > 0 ? data.userScore : data.scoreMedia;
				fiveStarsMethods[ 'setScores' ].apply( data.$, [ data, scores ] );
				data.status.stop().fadeOut();
			});
		}

	};

	$.fn.fiveStars = function( method, star ) {
		var data = $( this ).data( 'fiveStars' );
		if( data === undefined ){
			return fiveStarsMethods.configure.apply( $( this ), [ star, method ] );
		}
		else {
			if( data.locked ){ 
				data.status.show();
				return this;
			}
			else {
				return fiveStarsMethods[ method ].apply( $( this ), [ data, star ] );	
			}
		}
	};

	
	$(function(){
		
		$( 'body' ).on( 'mouseover click mouseout', '.five-stars-box .star' , function(event){
			if( this.$ === undefined ){
				this.$ = $( this );
				this.target = this.$.parents( '.five-stars-box' ).first();
				this.score = this.$.attr( 'score' );
			}
			this.target.fiveStars( event.type, this );
		});
	
	});

})(jQuery);