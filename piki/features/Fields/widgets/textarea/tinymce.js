tinymce.PluginManager.add( 'piki_tinymce', function( editor, url ){
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
    editor.addButton('mark', {
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
    editor.addButton('cite', {
        title: 'Legend',
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
