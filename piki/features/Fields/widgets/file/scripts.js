PikiFields.add( 'window.startFile' );

var fileField;
(function($){

	// Starting fields
	window.startFile = function(){
		$( 'input[type="file"].ftype-file' ).each(function(){
			fileField.configure( this );
		});
	}

	fileField = {

		configure : function( el ){
			
			el.$ = el.$ || $( el );

			var data = el.$.data( 'fileField' );
			if( data !== undefined ) return;

			var $main = el.$.parents( 'div.ftype-file.item-file' ).first();

			var data = {
				_ : el,
				$ : el.$,
				wrapper: $main,
				$form : el.$.parents( 'form' ).first(),
				$fake : $( '<div class="jcuston-file-holder"></div>' ),
				$selection : $( '.selection-wrapper', $main ),
				$address : $( 'input.address', $main ),
				$file_id : $( 'input.file_id', $main ),
				maxsize : el.$.data( 'max-size' ),
				maxsizeLabel : el.$.data( 'max-size-label' ),
				title : el.$.attr( 'title' ),
				isMultiple : $main.hasClass( 'multiple' ),
				$thumb : $main.find( '.thumbnail' ),
				$mediaThumbs : $main.find( 'div.media-thumbs' ),				
				$delete : $main.find( 'button[data-action="delete"]' )
			};

		    data.$fake.insertAfter( data.$ );
			data.$.appendTo( data.$fake );
			if( data.title !== undefined ){
				data.$title = $( '<strong>' + data.title + '</strong>' ).appendTo( data.$fake );
			}
			
			// Keep data
		    data.$.data( 'fileField', data );		    

			// On file select
			data.wrapper.on( 'change', 'input[type="file"]', function(){
				fileField.fieldChanged( data );
			});

			// Bind reset
			data.$.bind( 'reset', function(){
				fileField.reset( data );
			});

			// Bind exclude
			if( data.$delete.length ){

				data.$delete.on( 'click', function(){
                    Message.open({
                        title : false,
                        message : '<h3>Tem certeza?</h3><p>Você tem certeza que deseja excluir esse arquivo?</p>',
                        classname : 'confirm',
                        buttons_location : 'inside',
                        buttons : [
                            { 
                                label : 'Excluir',
                                classname : 'button cor2 delete-file-confirm',
                                callback : function(){
                                    fileField.deleteFile( data );
                                }
                            },
                            { 
                                label : 'Cancelar',
                                classname : 'button delete-file-cancel'
                            }
                        ]
                    });
				});

			}


		},

		// Unique ID
	  	uniqueID : function(){
			return '_' + Math.random().toString( 36 ).substr( 2, 9 );
		},

		deleteFile : function( data ){

			$.fn.pikiLoader( 'all' );

			var vars = {
				action : 'piki_field_ajax',
				field_type : 'file',
				field_action : 'ajax_delete_file',
				post_id : data.$form.find( 'input#item_id' ).val(),
				field_key : data.$.parents( '.linha-field' ).first().data( 'machine-name' ),
				nonce : data.$delete.data( 'token' ),
				file_id : data.$delete.data( 'file-id' )
			};
			var ajaxOptions = {
				type: 'POST',
				url: Piki.ajaxurl,
				dataType: 'json',
				data: vars
			};

			var request = $.ajax( ajaxOptions );
			request.done(function( response ){

				$.fn.pikiLoader( 'close' );
				
				if( response.status == 'error' ){
				
					Message.open({
						message : '<em>' + response.error_message + '</em>',
						classname : 'error'
					});
				
				}
				else{
				
					data.$.val( '' );
					fileField.reset( data );
				
				}
		
			});
			request.error(function(){

				$.fn.pikiLoader( 'close' );

				Message.open({
					message : '<em>Erro na requisição</em>',
					classname : 'error'
				});

			});

		},

		varifyLimit : function( data ){
			return ( data.maxItems <= data.$wrapImages.children( '.row-file' ).not( '.removed' ).length );
		},

		fieldChanged : function( data ){

			if( data.$.val() != '' ){

				if( data.isMultiple ){

					fileField.addNewRow( data );

				}
				else {

					fileField.reset( data, function(){

						var reader = new FileReader();

					    reader.onload = function( e ){

					    	// Valida o tamanho
					    	if( e.total > data.maxsize ){
					    		Message.open( 'O arquivo deve ter no máximo ' + data.maxsizeLabel );
					    		return;
					    	}

					    	// Show filename
					    	var filename = data.$.val().split( '\\' ).join( '/' ).replace( '\\', '/' ).split( '/' ).pop();
					    	data.$address.val( filename );
					    	
					    	// Create file
					    	data.$file = $( '<img src="'+ e.target.result +'">' );
					    	
					    	data.$file.appendTo( data.previewbox );

							// Callback
							data.$.trigger( 'afterChange', data );
					    
					    }

					    // Go!
					    reader.readAsDataURL( data._.files[ 0 ] );

					});

				}
			
			}

	  	},

	  	reset : function( data, callback ){
		
			data.$address.val( '' );
	  		data.$file_id.val( '' );	
			data.$mediaThumbs.remove();
			data.$selection.slideDown( 250 );

			data.$.trigger( 'update', [ data ] );

	  		if( callback !== undefined ) callback( data );

	  	}


	};

	// Método chamado pelo iframe para o retorno do upload
	window.fileField_receive_file = function( jSonData ){
		
		$( '#file-field-fake-form' ).remove();
		
		var result = $.parseJSON( jSonData );		
		
		if( result.status == 'error' ){
			
			Message.open( result.message );
			//$.fn.pikiLoader( 'close' );
		
		}
		else{

			var $token_field = $( 'input[value="'+ result.token +'"]' );
			var $file_field = $token_field.parents( '.ftype-file.item-file' ).find( 'input[type="file"]' );
			var data = $file_field.data( 'fileField' );
			fileField.receiveImage( data, result );
		
		}
	
	};

	window.fileField_error = function( unique_id, message ){
		alert( message );
	}
	
})(jQuery);
