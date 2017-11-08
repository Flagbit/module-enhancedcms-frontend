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
        function EditorController($rootScope, $scope, $element, $compile) {
            _classCallCheck(this, EditorController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$compile = $compile;
            this.$scope.$element = $element;
            this.$scope._editorInstance = null;

            this.initEvents();
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
                var _this = this;

                this.$scope.$element[0].addEventListener('ngComponentViaCKEditor', function (e) {
                    _this.$compile(e.detail)(_this.$scope);
                });
                this.$scope.$element.click(this.onClick.bind(this));
                this.$scope.$on('remove', this.remove.bind(this));
            }
        }, {
            key: 'onClick',
            value: function onClick(event) {
                if (!this.getEditorInstance()) {
                    this.setElementEditable();
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
            key: 'bindDebuggingEvents',
            value: function bindDebuggingEvents(editor) {
                var eventList = ['activeEnterModeChange', 'activeFilterChange', 'afterCommandExec', 'afterInsertHtml', 'afterPaste', 'afterPasteFromWord', 'afterSetData', 'afterUndoImage', 'ariaEditorHelpLabel', 'ariaWidget', 'autogrow', 'beforeCommandExec', 'beforeDestroy', 'beforeGetData', 'beforeModeUnload', 'beforeSetMode', 'beforeUndoImage', 'blur', 'change', 'configLoaded', 'contentDirChanged', 'contentDom', 'contentDomInvalidated', 'contentDomUnload', 'customConfigLoaded', 'dataFiltered', 'dataReady', 'destroy', 'dialogHide', 'dialogShow', 'dirChanged', 'doubleclick', 'dragend', 'dragstart', 'drop', 'elementsPathUpdate', 'fileUploadRequest', 'fileUploadResponse', 'floatingSpaceLayout', 'focus', 'getData', 'getSnapshot', 'insertElement', 'insertHtml', 'insertText', 'instanceReady', 'key', 'langLoaded', 'loadSnapshot', 'loaded', 'lockSnapshot', 'maximize', 'menuShow', 'mode', 'notificationHide', 'notificationShow', 'notificationUpdate', 'paste', 'pasteFromWord', 'pluginsLoaded', 'readOnly', 'removeFormatCleanup', 'required', 'resize', 'save', 'saveSnapshot', 'selectionChange', 'setData', 'stylesSet', 'template', 'toDataFormat', 'toHtml', 'unlockSnapshot', 'updateSnapshot', 'widgetDefinition'];

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var event = _step.value;

                        CKEDITOR.on(event, function () {
                            console.log('### ' + event + ' fired');
                        });
                    };

                    for (var _iterator = eventList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: 'initEditorEvents',
            value: function initEditorEvents() {
                var editor = this.getEditorInstance();
                // this.bindDebuggingEvents(editor);
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
