PikiFields.add( 'window.textarea_field_init' );

var TextareaField;

(function($){

	TextareaField = {

		editors : [],
		firstFocused : null,

		init : function(){

			this.firstFocused = window.wpActiveEditor;

			TextareaField.removeEditors();
			TextareaField.initEditors();

		},

		initEditors : function(){

			var $editors_wrappers = $( '.ftype-textarea-editor-wrapper' );
			if( !$editors_wrappers.length ) return true;
			
			$editors_wrappers.each(function(){

				this.$ = this.$ || $( this );
				
				data = this.$.data( 'PKTextareaEditor' );
				if( data === undefined ){
					data = { 
						$field : $( 'textarea', this.$ ) 
					};
					data.id = data.$field.attr( 'id' );
					this.$.data( 'PKTextareaEditor', data );
				}

				// Initialize editor
				wp.editor
					.initialize(
						data.id,
						{
							tinymce: {
								wpautop: true,
								autofocus: true,
								height: 300,
								plugins : 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
								toolbar1: 'formatselect,bold,italic,underline,mark,cite,bullist,numlist,blockquote,link,unlink,hr,removeformat,undo,redo',
								toolbar2: ''
							},
							quicktags: true,
							mediaButtons: true,
							init : function(){
					            editor.formatter.register(
					            	'mark', 
					            	{
					                	inline: 'mark', 
					                	classes: 'mark-highlight'
					            	}
					            );
					            editor.formatter.register(
					            	'cite', 
					            	{
					                	inline: 'cite', 
					                	classes: 'cite-highlight'
					            	}
					            );
					        }
						}
					)
		        ;

				// Save id for removal later on
				TextareaField.editors.push( data.id );

				// Add mark button
				var editor = tinymce.get( data.id );
				editor.on( 'init', function() {
		            editor.formatter.register( 
		            	'mark', 
		            	{
		                	inline: 'mark', 
		                	classes: 'mark-highlight'
		            	}
		            );
		            editor.formatter.register( 
		            	'cite', 
		            	{
		                	inline: 'cite', 
		                	classes: 'cite-highlight'
		            	}
		            );
		        });
		        editor.addButton( 'mark', {
		            title: 'Markup',
		            icon: 'backcolor',
		            onclick: function() {
		                tinymce.activeEditor.formatter.toggle( 'mark' );
		            },
		            onPostRender: function() {
		                var ctrl = this;
		                editor.on( 'NodeChange', function( e ){
		                    ctrl.active(
		                        e.element.className.indexOf( 'mark-highlight' ) !== -1
		                    );
		                });
		            }
		        });
		        editor.addButton( 'cite', {
		            title: 'Cite',
		            icon: 'backcolor',
		            onclick: function() {
		                tinymce.activeEditor.formatter.toggle( 'cite' );
		            },
		            onPostRender: function() {
		                var ctrl = this;
		                editor.on( 'NodeChange', function( e ){
		                    ctrl.active(
		                        e.element.className.indexOf( 'cite-highlight' ) !== -1
		                    );
		                });
		            }
		        });

			});

		},

		removeEditors : function(){

			$.each( TextareaField.editors, function( i, editor_id ){
				TextareaField.removeEditor( editor_id );
			});
			TextareaField.editors = [];
		
		},

		removeEditor : function( editor_id ){
			
			// Remove focus
			tinymce.execCommand( 'mceFocus', false, editor_id );

			// WP editor remove
			wp.editor.remove( editor_id );

		},

		get_editor_content : function( editor_id ){

			var mce_editor = tinymce.get( editor_id );
			if( mce_editor ){
				val = wp.editor.getContent( editor_id );
			} 
			else {
				val = $( '#' + editor_id ).val();
			}

		}

	};
	
	// Inicia os campos com editor de html
	window.textarea_field_init = function(){
		TextareaField.init();
	}

})(jQuery);
