define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var EditorController = function () {
        function EditorController($rootScope, $scope, $element) {
            _classCallCheck(this, EditorController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$scope.$element = $element;
            this.$scope._editorInstance = null;

            this.initEvents();
            this.setElementEditable();
            this.getEditorInstance();
        }

        _createClass(EditorController, [{
            key: 'setElementEditable',
            value: function setElementEditable() {
                this.$scope.$element.prop('contenteditable', 'true');
            }
        }, {
            key: 'initEvents',
            value: function initEvents() {
                this.$scope.$element.click(this.onClick.bind(this));
                this.$scope.$on('remove', this.remove.bind(this));
            }
        }, {
            key: 'onClick',
            value: function onClick(event) {
                if (!this.getEditorInstance()) {
                    this.$scope._editorInstance = CKEDITOR.inline(event.currentTarget);
                    this.initEditorEvents();
                }
            }
        }, {
            key: 'getEditorInstance',
            value: function getEditorInstance() {
                if (!this.$scope._editorInstance) {
                    for (var i in CKEDITOR.instances) {
                        if (CKEDITOR.instances.hasOwnProperty(i)) {
                            if (this.$scope.$element.is(CKEDITOR.instances[i].element.$)) {
                                this.$scope._editorInstance = CKEDITOR.instances[i];
                                this.initEditorEvents();
                                return this.$scope._editorInstance;
                            }
                        }
                    }
                }

                return this.$scope._editorInstance;
            }
        }, {
            key: 'initEditorEvents',
            value: function initEditorEvents() {
                var editor = this.getEditorInstance();
                editor.on('focus', this.onFocus.bind(this));
                editor.on('blur', this.onBlur.bind(this));
            }
        }, {
            key: 'onFocus',
            value: function onFocus() {
                this.$scope.$emit('hideToolbar');
            }
        }, {
            key: 'onBlur',
            value: function onBlur() {
                this.$scope.$emit('showToolbar');
            }
        }, {
            key: 'remove',
            value: function remove(event, mass) {
                if (this.getEditorInstance()) {
                    this.getEditorInstance().destroy();
                    this.$scope._editorInstance = null;
                }
            }
        }]);

        return EditorController;
    }();

    exports.default = EditorController;
});
