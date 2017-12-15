CKEDITOR.plugins.add( 'iconbeyer', {
    icons: 'icon',
    init: function( editor ) {

        editor.addCommand( 'iconbeyer', new CKEDITOR.dialogCommand( 'iconbeyerDialog' ) );

        editor.ui.addButton( 'Icon', {
            label: 'Insert Icon',
            command: 'iconbeyer',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'iconbeyerDialog', this.path + 'dialogs/iconbeyer.js' );
    }
});