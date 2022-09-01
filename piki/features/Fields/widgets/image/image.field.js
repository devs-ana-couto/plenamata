PikiFields.add( 'window.startImage' );

var imageField;
(function($){

		// Starting fields
	window.startImage = function(){
		$( 'input[type="file"].ftype-image' ).each(function(){
			imageField.configure( this );
		});
	}

	imageField = {

		configure : function( el ){
			
			el.$ = el.$ || $( el );

			var data = el.$.data( 'imageField' );
			if( data !== undefined ) return;

			var $main = el.$.parents( 'div.ftype-image.item-image' ).first();

			var data = {
				_ : el,
				$ : el.$,
				wrapper: $main,
				$form : el.$.parents( 'form' ).first(),
				$fake : $( '<div class="jcuston-image-holder"></div>' ),
				maxsize : el.$.data( 'max-size' ),
				maxsizeLabel : el.$.data( 'max-size-label' ),
				title : el.$.attr( 'title' ),
				isMultiple : $main.hasClass( 'multiple' )
			}

		    data.$fake.insertAfter( data.$ );
			data.$.appendTo( data.$fake );
			if( data.title !== undefined ){
				data.$title = $( '<strong>' + data.title + '</strong>' ).appendTo( data.$fake );
			}

		    data.$.data( 'imageField', data );		    

			if( data.isMultiple ){

				data.$wrapImages = $( '.wrap-images', data.$main ).first();
				data.$rows = data.$wrapImages.children( '.row-image' );
				data.$rows.first().remove();
				data.maxItems = data.wrapper.data( 'max-items' );
				data.modelItem = data.$rows.first().clone().removeClass( 'model' );
				data.modelField = data.$.clone();
				data.$actualField = data.$;

				// Verify rows limit
				if( imageField.varifyLimit( data ) ){
					data.$fake.addClass( 'disabled' );
					data.$actualField.prop( 'disabled', true );
				}

				data.$wrapImages.on( 'click', '.delete', function(e){
					e.preventDefault();
					this.$ = this.$ || $( this );
					var $row = this.$.parent( '.row-image' );
					imageField.checkDeleteImage( data, $row );
				});

			}
			else {
				
				data.$address = $( 'input.address', $main ).first();
				data.file_id = $( '.file-id', $main ).first();
				data.fullsize = $( '.fullsize', $main ).first();
				data.thumbnail = $( '.thumbnail', $main ).first();
				data.token = $( '.unique-id', $main ).first().val();
				data.cropbox = $( '.cropbox', $main ).first() || false;
				data.previewbox = $( '.previewbox', $main ).first() || false;
				data.preview = {
					width : el.$.data( 'preview-width' ),
					height : el.$.data( 'preview-height' )
				};

				// Cropper
				if( data.cropbox.length ){
					
					data.croparea = $( '.croparea', $main ).first();
					data.$image = $( 'img', data.croparea ).first();
					data.$cropinfo = $( '.cropinfo', $main ).first();
					data.cropinfo = false;
					data.controls = $( '.controls', $main ).first();
					data.delete = $( 'button.delete', data.controls ).first();

					// Edition mode
					if( data.$image.length ){
							
						// Crop options
						var cropOptions = {
						    viewport: {
						        width: data.preview.width,
						        height: data.preview.height
						    },
						    update: function( info ){
						    	data.$cropinfo.val( JSON.stringify( info ) );
						    	data.$.trigger( 'update', [ data, info ] );
					        }
						};

						// Crop points
						data.cropinfo = data.$cropinfo.val() !== '' ? jQuery.parseJSON( data.$cropinfo.val() ) : false;
						if( data.cropinfo ){
							cropOptions.points = data.cropinfo.points;
						}

						data.croparea.imagesLoaded( function() {

							var basic = data.$image.croppie( cropOptions );
							data.controls.slideDown( 100 );
						
						});

					}

					// Delete button bind
					data.delete.on( 'click', function(e){
						imageField.checkDeleteImage( data, data.wrapper );
					});
				
				}
			
			}

			// On file select
			data.wrapper.on( 'change', 'input[type="file"]', function(){
				imageField.fieldChanged( data );
			});

			// Bind reset
			data.$.bind( 'reset', function(){
				imageField.reset( data );
			});


		},

		// Duplicate field
		duplicateField : function( data ){

			var _zIndex = data.$actualField.css( 'z-index' );

			data.$fake.children( 'input' ).hide();

			data.$actualField = data.modelField
				.clone()
				.css( 'z-index', ( _zIndex + 2 ) )
				.val( '' )
				.attr( 'id', imageField.uniqueID() )
				.prependTo( data.$fake )
				.prop( 'disabled', false )
				.show()
			;

			data.$fake.removeClass( 'disabled' );

		},

		// Unique ID
	  	uniqueID : function(){
			return '_' + Math.random().toString( 36 ).substr( 2, 9 );
		},

		addNewRow : function( data ){

			var reader = new FileReader();
		    reader.onload = function( e ){

		    	// Valida o tamanho
		    	if( e.total > data.maxsize ){
		    		Message.open( 'A imagem deve ter no máximo ' + data.maxsizeLabel );
		    		return;
		    	}

		    	// Show filename
		    	var filename = data.$.val().split( '\\' ).join( '/' ).replace( '\\', '/' ).split( '/' ).pop();

		    	// Create new row
		    	var $newRow = data.modelItem.clone().hide();
		    	$newRow.children( '.image-box' ).html( '<img src="'+ e.target.result +'">' );
		    	$newRow.children( '.filename' ).html( '<strong>' + filename + '</strong>' );
				$newRow.data( 'targetID', data.$actualField.attr( 'id' ) );
						
				var 
					$percent = $newRow.children( '.percent' ),
					$progBar = $newRow.children( '.progress-bar' ),
					$progBarIn = $progBar.children( 'span' ),
					$delete = $newRow.children( '.delete' ),
					loaded = 0
				;

	    		$newRow.appendTo( data.$wrapImages ).slideDown(function(){

					var upProgress = setInterval(function(){
						loaded += 1;
						$progBarIn.css( 'width', loaded + '%' );
						$percent.text( loaded + '%' );
						if( loaded >= 100 ){
							$progBar.addClass( 'loaded' );
							$percent.hide();
							$delete.show();
							clearInterval( upProgress );
						}
					}, 5 );
		    	
		    	});

				// Duplicate field
				if( imageField.varifyLimit( data ) ){
					data.$fake.children( 'input' ).hide();
					data.$fake.addClass( 'disabled' );
				}
				else {
					imageField.duplicateField( data );
				}

		    }

		    // Go!
		    reader.readAsDataURL( data.$actualField.get( 0 ).files[ 0 ] )
		
		},

		checkDeleteImage : function( data, $row ){
			
			// File id
			var $fileID = $row.find( 'input.file-id' );

			// Served images
			if( $fileID.length && $fileID.val() !== '' ){

				var vars = {
					action : 'field_image_delete',
					post_id : data.$form.find( 'input#item_id' ).val(),
					field_key : data.$.parents( '.linha-field' ).first().data( 'machine-name' ),
					nonce : $row.find( 'input.file-nonce' ).val(),
					file_id : $row.find( 'input.file-id' ).val(),
					is_multiple : data.isMultiple
				}

	            Message.open({
	                title : false,
	                message : '<strong>Tem certeza de que deseja excluir essa imagem?</strong>',
	                buttons : [
	                    { 
	                        label : 'Excluir imagem',
	                        classname : 'button',
	                        callback : function(){
	                            imageField.deleteServerImage( data, vars, $row );
	                        }
	                    },
	                    { 
	                        label : 'Cancelar',
	                        classname : 'link'
	                    }
	                ]
	            });

			}
			// Temp images
			else {

				// Multiple
				if( data.isMultiple ){

					// Remove target field 
					var targetID = $row.data( 'targetID' );
					data.$fake.children( 'input#' + targetID ).remove();
					imageField.duplicateField( data );

					// Remove row
					imageField.deleteRow( data, $row );

				}
				// Single
				else {

					data.$.val( '' );
					imageField.reset( data );

				}

			}

		},

		deleteServerImage : function( data, vars, $row ){

			$.fn.pikiLoader( 'all' );

			$.ajax({

				type: "POST",
				url: Piki.ajaxurl,
				dataType: 'json',
				data: vars
			
			}).done(function ( response ) {
				
				$.fn.pikiLoader( 'close' );

				if( response.status == 'error' ){
				
					Message.open({
						message : '<em>' + response.error_message + '</em>',
						classname : 'error'
					});
				
				}
				else{
				
					if( data.isMultiple ){
						imageField.deleteRow( data, $row );
					}
					else {
						data.$.val( '' );
						imageField.reset( data );
					}
				
				}
			
			}).error(function( erro1, err2 ){

				$.fn.pikiLoader( 'close' );

				Message.open({
					message : '<em>Erro na requisição</em>',
					classname : 'error'
				});

			});

		},

		// Remove row
		deleteRow : function( data, $row ){
			
			$row.addClass( 'removed' ).slideUp( 250, function(){
				$row.remove();
			});

			// Enable field
			data.$actualField.prop( 'disabled', false ).show();
			data.$fake.removeClass( 'disabled' );
		
		},

		varifyLimit : function( data ){
			return ( data.maxItems <= data.$wrapImages.children( '.row-image' ).not( '.removed' ).length );
		},

		fieldChanged : function( data ){

			if( data.$.val() != '' ){

				if( data.isMultiple ){

					imageField.addNewRow( data );

				}
				else {

					imageField.reset( data, function(){

						var reader = new FileReader();

					    reader.onload = function( e ){

					    	// Valida o tamanho
					    	if( e.total > data.maxsize ){
					    		Message.open( 'A imagem deve ter no máximo ' + data.maxsizeLabel );
					    		return;
					    	}

					    	// Show filename
					    	var filename = data.$.val().split( '\\' ).join( '/' ).replace( '\\', '/' ).split( '/' ).pop();
					    	data.$address.val( filename );
					    	
					    	// Create image
					    	data.$image = $( '<img src="'+ e.target.result +'">' );
					    	
					    	if( data.cropbox.length ){

								data.$image.appendTo( data.croparea );
								
								// Start croppie
								var basic = data.$image.croppie({
								    viewport: {
								        width: data.preview.width,
								        height: data.preview.height
								    },
								    update: function( info ){
								    	data.$cropinfo.val( JSON.stringify( info ) );
										data.$.trigger( 'update', [ data, info ] );
							        }
								});

								data.controls.slideDown();

					    	}
					    	else {

					    		data.$image.appendTo( data.previewbox );

					    	}				    	

							// Callback
							data.$.trigger( 'afterChange', data );
					    
					    }

					    // Go!
					    reader.readAsDataURL( data._.files[ 0 ] );

					});

				}
				/*

				var url = Piki.blogurl +'/campo-imagem/envia/';
				
				//$.fn.pikiLoader( 'all' );
				data.fakeform = $( '<form action="'+ url + '" method="post" enctype="multipart/form-data" target="pikiform-iframe" id="image-field-fake-form"></form>' );
				var $clone = data.wrapper.clone();
				data.wrapper.before( $clone );
				imageField.configure( $clone.find( 'input[type="file"].ftype-image' ) );
				data.fakeform.insertBefore( data.$form );
				data.wrapper.appendTo( data.fakeform );
				data.fakeform.append( '<input type="hidden" name="field-image-token" value="' + data.token + '">' );
				data.fakeform.submit();
				*/
			
			}

	  	},

	  	receiveImage : function( data, response ){

			//data.$.hide();

			data.$image = $( '<img src="'+ response.fullsize +'">' );

			if( data.cropbox ){
				
				data.$image.appendTo( data.cropbox );

				var basic = data.$image.croppie({
				    viewport: {
				        width: data.preview.width,
				        height: data.preview.height
				    }
				});
				
				//on button click
				//data.$image.croppie( 'result', 'html' ).then(function(html) {
				//    // html is div (overflow hidden)
				//    // with img positioned inside.
				//});

				//data.$image.croppie();

				/*
				data.cropAPI = data.$image.croppie({
				    viewport: {
				        width: 150,
				        height: 200
				    }
				});
				data.$image.croppie('bind', {
				    url: response.fullsize,
				    points: [ 77,469,280,739 ]
				});
				//on button click
				data.$image.croppie( 'result', 'html' ).then(function(html) {
				    // html is div (overflow hidden)
				    // with img positioned inside.
				});
				*/
			
			}
			else {
				// Thumbnail
				data.$thumb = $( '<div class="thumbnail"></div>' ).appendTo( data.$wrapper );
				$image.appendTo( $thumb );
			}
						
			
			/*
			// Remove button
			var $remove = $( '<a class="remove-photo-button" title="Remover foto">Deletar foto</a>' ).appendTo( $thumb );

			// Valores dos campos
			data.file_id.val( response.file_id );
			data.fullsize.val( response.fullsize );
			
			// Clique do botão de remover				
			$remove.on( 'click', function(event){
				event.preventDefault();
				//$field.imageField( 'deleteConfirm' );
				imageField.doDelete( data );
			});
			*/

			//$.fn.pikiLoader( 'close' );

	  	},

	  	deleteConfirm : function( data ){

			var $confirmBox = $( '.confirm-box', data.wrapper );
			if( !$confirmBox.length ){
				$confirmBox = $('<div class="confirm-box"></div>');
				$confirmBox.html('<span>Deletar foto?</span><a class="no">Não</a><a class="yes">Sim</a>');
				$confirmBox.appendTo( data.wrapper );
			}

			$confirmBox.find( '.no' ).on( 'click', function(){
				$( this ).parent().hide();
			});
			
			$confirmBox.find( '.yes' ).on( 'click', function(){
				imageField.doDelete( data );
			});

			$confirmBox.show();

	  	},

	  	doDelete : function( data ){
					
			//$.fn.pikiLoader( 'all' );

			$.ajax({

				type: "POST",
				url: Piki.blogurl + '/campo-imagem/remove/' + data.file_id.val(),
				dataType: 'text',
				data: {
					token : data.token
				}
			
			}).done(function ( response ) {
				
				//$.fn.pikiLoader( 'close' );
				
				if( response.status == 'error' ){
					alert( response.error_message );
				}
				else{
					imageField.reset( data );
				}
			
			}).error(function( erro1, err2 ){

				//$.fn.pikiLoader( 'close' );

				console.info( 'erro1' );
				console.log( erro1 );
				console.info( 'err2' );
				console.log( err2 );

			});

			clear_file_field( data.$ );
	  	
	  	},

	  	reset : function( data, callback ){

	  		if( data.isMultiple === false ){
			
				data.$address.val( '' );
		  		data.file_id.val( '' );
				data.fullsize.val( '' );

		  		if( data.cropbox.length ){

		  			data.controls.hide();
		  			data.croparea.hide();
		  			data.$cropinfo.val( '' );
	  				data.croparea.html( '' ).show();
	  				
	  				if( data.$image.length ){
	  					data.$image.croppie( 'destroy' ).remove();
	  					data.$image = false;
	  				}

		  		}
		  		else {
					
					data.wrapper.find( 'div.thumbnail' ).remove();
		  		
		  		}

		  	}
		  	else {

		  		data.$wrapImages.html( '' );
		  		data.$previewbox.html( '' );
		  		data.$fake.children( 'input:not(:last)' ).remove();
		  		data.$actualField = data.$fake.children( 'input' ).first();
		  		data.$actualField.show();

		  	}

			data.$.trigger( 'update', [ data ] );

	  		if( callback !== undefined ) callback( data );

	  	}


	};

	// Método chamado pelo iframe para o retorno do upload
	window.imageField_receive_image = function( jSonData ){
		
		$( '#image-field-fake-form' ).remove();
		
		var result = $.parseJSON( jSonData );		
		
		if( result.status == 'error' ){
			
			Message.open( result.message );
			//$.fn.pikiLoader( 'close' );
		
		}
		else{

			var $token_field = $( 'input[value="'+ result.token +'"]' );
			var $image_field = $token_field.parents( '.ftype-image.item-image' ).find( 'input[type="file"]' );
			var data = $image_field.data( 'imageField' );
			imageField.receiveImage( data, result );
		
		}
	
	};

	window.imageField_error = function( unique_id, message ){
		alert( message );
	}
	
})(jQuery);
