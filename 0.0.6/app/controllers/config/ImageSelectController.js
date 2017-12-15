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

    var ImageSelectController = function () {
        function ImageSelectController($rootScope, $scope, $element, $q, $log, Upload, $mdToast, $translate) {
            _classCallCheck(this, ImageSelectController);

            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$log = $log;
            this.Upload = Upload;
            this.$mdToast = $mdToast;
            this.$translate = $translate;

            this.$scope = $scope;
            this.$scope.$element = $element;
            this.$scope.progress = null;

            this.$scope.name = null;

            this.initEventListeners();
        }

        _createClass(ImageSelectController, [{
            key: 'initEventListeners',
            value: function initEventListeners() {
                this.$scope.$on('uploadStart', this.upload.bind(this));
            }
        }, {
            key: 'preview',
            value: function preview() {
                var _this = this;

                this.Upload.dataUrl(this.$scope.file).then(function (url) {
                    var d = {};
                    d[_this.$scope.name] = url;

                    _this.$scope.$emit('onPreviewData', {
                        scope: _this.$scope,
                        data: d
                    });
                });
            }
        }, {
            key: 'upload',
            value: function upload(event, mass) {
                var _this2 = this;

                if (typeof this.$scope.file !== 'undefined') {
                    this.Upload.upload({
                        url: this.$rootScope.imageUploadUrl,
                        data: { file: this.$scope.file }
                    }).then(function (resp) {
                        _this2.$scope.progress = null;

                        var d = {};
                        d[_this2.$scope.name] = resp.data.url;

                        _this2.$scope.$emit('uploadDone', {
                            data: d
                        });
                    }, function (resp) {
                        _this2.$translate('Error while uploading').then(function (translated) {
                            _this2.$mdToast.show(_this2.$mdToast.simple().textContent(translated + ' Code: ' + resp.status).position('bottom left').hideDelay(3000));
                        });
                    }, function (evt) {
                        _this2.$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {
                    this.$scope.$emit('uploadDone', {
                        data: {}
                    });
                }
            }
        }]);

        return ImageSelectController;
    }();

    exports.default = ImageSelectController;
});
