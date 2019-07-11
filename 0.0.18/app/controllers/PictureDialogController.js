define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var PictureDialogController = exports.PictureDialogController = function () {
        function PictureDialogController($mdDialog, $translate, Upload, locals) {
            _classCallCheck(this, PictureDialogController);

            this.$mdDialog = $mdDialog;
            this.$scope = locals.scope;
            this.$rootScope = locals.rootScope;
            this.$translate = $translate;
            this.Upload = Upload;
            this.uploaded = false;
            this.sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
            this.files = {};
            this.progress = {};
            this.images = locals.images;
            this.maxFileSize = 1048576;
            this.showWarning = false;
            this.ignoreFileSize = false;
        }

        _createClass(PictureDialogController, [{
            key: 'hide',
            value: function hide() {
                this.$mdDialog.hide();
            }
        }, {
            key: 'save',
            value: function save() {
                this.$scope.$emit('onSaveData', {
                    scope: this.$scope,
                    data: {
                        images: this.images
                    }
                });
            }
        }, {
            key: 'submitHandler',
            value: function submitHandler() {
                var _this = this;

                if (Object.keys(this.files).length) {
                    var _loop = function _loop(size) {
                        var file = _this.files[size];

                        if (!_this.ignoreFileSize && _this.files[size].size > _this.maxFileSize) {
                            _this.showWarning = true;
                            return {
                                v: void 0
                            };
                        } else {
                            _this.Upload.upload({
                                url: _this.$rootScope.imageUploadUrl,
                                data: { file: file }
                            }).then(function (resp) {
                                _this.images[size] = resp.data.url;
                                if (Object.keys(_this.images).length === Object.keys(_this.files).length) {
                                    _this.$scope.data.images = _this.images;
                                    _this.save();

                                    document.getElementById('ecms-page-content').dispatchEvent(new CustomEvent('updateImages', {
                                        bubbles: false,
                                        cancelable: true,
                                        detail: { token: Math.floor(Math.random() * Math.floor(99999999)), currentScope: _this.$scope, images: _this.images }
                                    }));
                                }
                            }, function (resp) {
                                _this.$translate('Error while uploading').then(function (translated) {
                                    _this.$mdToast.show(_this.$mdToast.simple().textContent(translated + ' Code: ' + resp.status).position('bottom left').hideDelay(3000));
                                });
                            }, function (e) {
                                console.log(e.total, e.loaded);
                                _this.progress[size] = parseInt(100.0 * e.loaded / e.total);
                            });
                        }
                    };

                    for (var size in this.files) {
                        var _ret = _loop(size);

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }

                    if (!this.showWarning || this.ignoreFileSize) {
                        this.hide();
                    }
                }
            }
        }, {
            key: 'closeWarning',
            value: function closeWarning(upload) {
                this.ignoreFileSize = true;
                this.showWarning = false;
                if (upload) {
                    this.submitHandler();
                    this.ignoreFileSize = false;
                }
            }
        }]);

        return PictureDialogController;
    }();
});
