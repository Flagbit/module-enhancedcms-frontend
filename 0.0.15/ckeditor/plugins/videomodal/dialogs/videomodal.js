CKEDITOR.dialog.add('videomodalDialog', function (editor) {
    return {
        title: 'Video Modal Settings',
        minWidth: 500,
        minHeight: 200,

        onShow: function () {
            var element = editor.getSelection().getStartElement();

            if (element) {
                element = element.getAscendant('video-modal', true);
            }

            this.element = element && element.getName() === 'video-modal' ? element : null;

            if (this.element) {
                this.setupContent(this.element);
            }
        },

        onOk: function () {
            if (this.element) {
                this.element.remove();
            }

            this.element = editor.document.createElement('video-modal');
            this.commitContent(this.element);
            editor.insertElement(this.element);

            var event = new CustomEvent('ngComponentViaCKEditor', { 'detail': this.element.$ });
            editor.element.$.dispatchEvent(event);
        },

        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'text',
                        label: 'Text',
                        validate: CKEDITOR.dialog.validate.notEmpty("Text field cannot be empty."),
                        setup: function (element) {
                            var ele = element.findOne('ng-transclude');
                            if (ele) {
                                this.setValue(ele.getText());
                            }
                        },
                        commit: function (element) {
                            element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'link',
                        label: 'Link',
                        validate: CKEDITOR.dialog.validate.notEmpty("Link field cannot be empty."),
                        setup: function (element) {
                            this.setValue(element.getAttribute('src').replace(/^'|'$/g, ''));
                        },
                        commit: function (element) {
                            element.setAttribute('src', this.getValue().replace(/^|$/g, "'"));
                        }
                    }
                ]
            }
        ]

    };
});
