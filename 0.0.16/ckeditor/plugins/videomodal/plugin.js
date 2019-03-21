CKEDITOR.plugins.add('videomodal', {
    icons: 'videomodal',
    init: function (editor) {

        editor.addCommand('videomodal', new CKEDITOR.dialogCommand('videomodalDialog'));

        editor.ui.addButton('videomodalButton', {
            label: 'Insert Video Modal',
            icon: this.path + 'icons/videomodal.png',
            command: 'videomodal',
            toolbar: 'insert'
        });

        if (editor.contextMenu) {
            editor.addMenuItem('videomodal', {
                label: 'Edit Video Modal',
                icon: this.path + 'icons/videomodal.png',
                command: 'videomodal',
                group: 'link'
            });

            editor.contextMenu.addListener(function(element) {
                if (element.getAscendant('video-modal', true)) {
                    return { videomodal: CKEDITOR.TRISTATE_OFF };
                }
            });
        }

        CKEDITOR.dialog.add('videomodalDialog', this.path + 'dialogs/videomodal.js');
    }
});
