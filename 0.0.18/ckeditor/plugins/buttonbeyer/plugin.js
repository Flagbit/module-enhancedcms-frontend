CKEDITOR.plugins.add( 'buttonbeyer', {
    icons: 'button',
    init: function( editor ) {

        editor.addCommand( 'buttonbeyer', new CKEDITOR.dialogCommand( 'buttonbeyerDialog' ) );

        editor.ui.addButton( 'Button', {
            label: 'Insert Button',
            command: 'buttonbeyer',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'buttonbeyerDialog', this.path + 'dialogs/buttonbeyer.js' );
    }
});