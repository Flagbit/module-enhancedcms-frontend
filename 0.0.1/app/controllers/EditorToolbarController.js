define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    var EditorToolbarController = function () {
        function EditorToolbarController($rootScope, $scope, $compile, $log, $translate, $mdDialog, $mdToast) {
            _classCallCheck(this, EditorToolbarController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;

            this.$compile = $compile;
            this.$log = $log;
            this.$translate = $translate;

            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;

            this.$scope.previewActive = false;
        }

        _createClass(EditorToolbarController, [{
            key: 'initEventListeners',
            value: function initEventListeners() {
                _get(EditorToolbarController.prototype.__proto__ || Object.getPrototypeOf(EditorToolbarController.prototype), 'initEventListeners', this).call(this);
            }
        }, {
            key: 'getTemplateFile',
            value: function getTemplateFile() {
                return 'editor-toolbar.html';
            }
        }, {
            key: 'showSourceCode',
            value: function showSourceCode() {
                var _this = this;

                var s = this.$mdDialog.show({
                    templateUrl: this.$rootScope.templateBaseUrl + '/dialog/source-code.html',
                    clickOutsideToClose: true,
                    parent: document.body,
                    locals: {
                        content: (0, _jquery2.default)('#ecms-page-content').html().trim()
                    },
                    controller: 'DialogController'
                }).then(function (answer) {
                    if (answer) {
                        if (answer.content) {
                            (0, _jquery2.default)('#ecms-page-content').html('').append(_this.$compile(answer.content)(_this.$scope));
                        } else if (answer.content == '') {
                            (0, _jquery2.default)('#ecms-page-content').html('');
                        }
                    }
                });
            }
        }, {
            key: 'previewPage',
            value: function previewPage() {
                var container = (0, _jquery2.default)("#ecms-builder");
                if (!this.$scope.previewActive) {
                    container.addClass('ecms-preview');
                    this.$rootScope.$broadcast('beforePagePreview');
                } else {
                    this.$rootScope.$broadcast('afterPagePreview');
                    container.removeClass('ecms-preview');
                }

                this.$scope.previewActive = !this.$scope.previewActive;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'openPage',
            value: function openPage() {
                window.open(document.location.origin + document.location.pathname, '_blank');
            }
        }, {
            key: 'tidyUpElement',
            value: function tidyUpElement(el) {
                el.find('.md-panel-outer-wrapper, .ecms-tidyup').remove();
                el.find('*').not('iframe, iframe *').each(function (idx, currentEl) {
                    var $currentEl = (0, _jquery2.default)(currentEl);

                    $currentEl.contents().filter(function (i, el) {
                        return el.nodeType == 8;
                    }).each(function (i, e) {
                        (0, _jquery2.default)(e).remove();
                    });

                    if ($currentEl.hasClass('cke_image_resizer') || $currentEl.hasClass('cke_reset')) {
                        $currentEl.remove();
                        return;
                    }

                    if (typeof currentEl.attributes !== 'undefined') {
                        var attributes = _jquery2.default.map(currentEl.attributes, function (item) {
                            var name = item.name;
                            if (name.startsWith('ng-')) return name;
                            if (name.startsWith('ecms-')) return name;
                            if (name.startsWith('cke-')) return name;
                            if (name.startsWith('data-cke-')) return name;
                            if (name.startsWith('contenteditable')) return name;
                        });

                        _jquery2.default.each(attributes, function (i, item) {
                            $currentEl.removeAttr(item);
                        });
                    }

                    if (typeof currentEl.className !== 'undefined') {
                        var regex = /\s(cke_.*?)(?=\s)/g;
                        currentEl.className = currentEl.className.replace(regex, '');
                        regex = /\s(ng-.*?)(?=\s)/g;
                        currentEl.className = currentEl.className.replace(regex, '');
                    }
                });
            }
        }, {
            key: 'savePage',
            value: function savePage() {
                var _this2 = this;

                this.$rootScope.$emit('startProcess');
                this.$rootScope.$broadcast('beforePageSave');

                var el = (0, _jquery2.default)('#ecms-page-content');
                var clonedEl = el.clone();
                this.tidyUpElement(clonedEl);

                _jquery2.default.ajax({
                    url: this.$rootScope.saveUrl,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'id': this.$rootScope.id,
                        'content': clonedEl.html(),
                        'builder_content': el.html(),
                        'config': ''
                    },
                    success: function success(response) {
                        _this2.$rootScope.$emit('stopProcess');

                        _this2.$mdToast.show(_this2.$mdToast.simple().textContent(response.message).position('bottom left').hideDelay(3000));

                        _this2.$rootScope.$broadcast('afterPageSave');
                    },
                    error: function error(response) {
                        _this2.$rootScope.$emit('stopProcess');

                        _this2.$translate('Error occured').then(function (translated) {
                            _this2.$mdToast.show(_this2.$mdToast.simple().textContent(translated).position('bottom left').hideDelay(3000));
                        });
                    }
                });
            }
        }, {
            key: 'toggleTemplates',
            value: function toggleTemplates() {
                this.$rootScope.$emit('toggleTemplates');
            }
        }, {
            key: 'responsive',
            value: function responsive() {
                var px = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var pageWrapper = (0, _jquery2.default)('.page-wrapper').first();
                var viewportSize = (0, _jquery2.default)(window).width();

                if (!px) {
                    px = viewportSize;
                }

                pageWrapper.css('margin', 'auto');
                pageWrapper.css('box-shadow', '0 5px 30px rgba(43,135,218,.2)');

                if (pageWrapper.css('max-width') == 'none') pageWrapper.css('max-width', viewportSize);
                pageWrapper.animate({
                    'max-width': px
                }, 1000, 'easeOutBounce');

                (0, _jquery2.default)('head meta[name=viewport]').attr('content', 'width=' + px + ', initial-scale=1, maximum-scale=1.0, user-scalable=no');
                document.body.style.opacity = .9999;
                setTimeout(function () {
                    document.body.style.opacity = 1;
                }, 1);
            }
        }]);

        return EditorToolbarController;
    }();

    exports.default = EditorToolbarController;
});
