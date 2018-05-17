define(['exports', 'jquery', '../classes/Utils.min.js'], function (exports, _jquery, _UtilsMin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _UtilsMin2 = _interopRequireDefault(_UtilsMin);

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

    var AbstractWidgetController = function () {
        function AbstractWidgetController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            var _this = this;

            _classCallCheck(this, AbstractWidgetController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$scope.$element = $element;
            this.$scope.widgetId = null;
            this.$scope.toolbarInitialized = false;
            this.$scope.toolbarVisible = false;
            this.$scope.openConfig = false;
            this.$scope.loadPromise = null;

            this.$attrs = $attrs;
            this.$mdDialog = $mdDialog;
            this.$compile = $compile;
            this.$q = $q;
            this.$log = $log;
            this.$timeout = $timeout;
            this.$translate = $translate;
            this.$templateCache = $templateCache;
            this.$templateRequest = $templateRequest;

            this.ecmsPanel = ecmsPanel;

            this.$scope.toolbarChildren = false;
            this.$scope.dragHandle = true;

            if (this.$scope.$element) {
                this.$scope.$widget = this.$rootScope.findWidgetByElement(this.$scope.$element);
            }

            if (this.$scope.$element.hasClass('ecms-widget-initialize')) {
                this.$timeout(function () {
                    _this.loadWidget();
                });
            } else {
                if (this.$scope.$element && this.$scope.$element.length > 0) {
                    this.$scope.widgetId = this.$scope.$element.prop('id');
                }

                this.$scope.data = {};

                if (this.$scope.$element.attr('data-widget-data')) {
                    this.$scope.data = JSON.parse(this.$scope.$element.attr('data-widget-data'));
                }

                if (_jquery2.default.isEmptyObject(this.$scope.data)) {
                    this.setDefaultData();
                }
            }

            $scope.$watch('data', this.updateWidget.bind(this, false));

            this.initEvents();
        }

        _createClass(AbstractWidgetController, [{
            key: 'updateWidget',
            value: function updateWidget() {
                var apply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                if (apply) {
                    this.$rootScope.$safeApply(this.$scope);
                }
            }
        }, {
            key: 'loadWidget',
            value: function loadWidget() {
                var _this2 = this;

                var deferred = this.$q.defer();

                this.$scope.$emit('startProcess');

                this.clearChildren();
                this.$scope.$widget.getHtml().then(function (html) {
                    _this2.$scope.widgetId = 'ecms-widget-' + _UtilsMin2.default.generateWidgetId(10);
                    _this2.$scope.$element.attr('id', _this2.$scope.widgetId).attr('ng-click', 'ctrl.click($event)').attr('ng-attr-data-widget-data', '{[{data}]}');
                    _this2.$scope.$element.addClass('ecms-widget').addClass('ecms-widget-' + _this2.$scope.$widget.getName());

                    _this2.$scope.$element.hide();
                    _this2.$scope.$element.removeClass('ecms-widget-initialize');

                    var hasUiElement = _this2.$scope.$element.find('.ecms-ui')[0];
                    var formattedWidget = _this2.formatWidgetHtml(html, _this2.$scope.widgetId);
                    _this2.$scope.$element.append(formattedWidget);
                    console.log('COMPILE ANGULAR LOAD');
                    var newElement = _this2.$compile(_this2.$scope.$element[0].outerHTML)(_this2.$scope);

                    _this2.$scope.$element.replaceWith(newElement);
                    _this2.$scope.$element = newElement;

                    _this2.$scope.$element.fadeIn();

                    deferred.resolve();

                    _this2.$scope.$emit('stopProcess');
                });

                this.$scope.loadPromise = deferred.promise;
                return deferred.promise;
            }
        }, {
            key: 'wrapWithLink',
            value: function wrapWithLink(html) {
                var dontWrapWithLinkSelectors = ['[ng-attr-class^="beyerdynamic-widget-references"]'];

                var wrapWithLink = true;

                var tmpNode = document.createElement('div');
                tmpNode.innerHTML = html;

                for (var i = 0; i < dontWrapWithLinkSelectors.length; i++) {
                    var selector = dontWrapWithLinkSelectors[i];
                    if (tmpNode.firstChild.matches(selector)) {
                        wrapWithLink = false;
                        break;
                    }
                }

                return wrapWithLink;
            }
        }, {
            key: 'formatWidgetHtml',
            value: function formatWidgetHtml(html) {
                var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                var linkElement = void 0;
                if (this.wrapWithLink(html)) {
                    linkElement = document.createElement('a');
                    linkElement.setAttribute('ng-attr-href', '{[{data.widgetLink}]}');
                    linkElement.classList.add('ecms-widget-link');
                    linkElement.innerHTML = html;
                } else {
                    linkElement = html;
                }

                return (0, _jquery2.default)('<div/>', {
                    id: name + '_content',
                    'ng-style': "{'margin': data.margin, 'padding': data.padding}",
                    'ng-attr-class': "{[{ctrl.getWidgetContentClass()}]}",
                    html: linkElement
                });
            }
        }, {
            key: 'getWidgetContentClass',
            value: function getWidgetContentClass() {
                var classes = [];

                if (this.$scope.data) {
                    if (this.$scope.data.gutter) {
                        classes.push('ecms-gutter-' + this.$scope.data.gutter);
                    }

                    if (this.$scope.data.contentClasses) {
                        classes.push(this.$scope.data.contentClasses);
                    }
                }

                return 'ecms-widget-content ' + classes.join(' ');
            }
        }, {
            key: 'clearChildren',
            value: function clearChildren() {
                this.$scope.$element.children().not('.ecms-widget-toolbar, .ecms-ui').remove();
            }
        }, {
            key: 'setDefaultData',
            value: function setDefaultData() {
                console.log('### SET DEFAULT DATA');
                if (this.$scope.$widget) {
                    this.$scope.data = this.$scope.$widget.getDefaults();
                }

                this.$scope.data.contentClasses = this.$scope.defaultContentClasses;
            }
        }, {
            key: 'getToolbarHtml',
            value: function getToolbarHtml() {
                var _this3 = this;

                var deferred = this.$q.defer();
                var template = this.$templateCache.get('widget-toolbar.html');

                if (template) {
                    deferred.resolve(template);
                } else {
                    this.$templateRequest(this.$rootScope.toolbarTemplateUrl).then(function (template) {
                        _this3.$templateCache.put('widget-toolbar.html', template);
                        deferred.resolve(template);
                    });
                }

                return deferred.promise;
            }
        }, {
            key: 'showToolbar',
            value: function showToolbar() {
                var _this4 = this;

                console.log('+++ SHOW TOOLBARS');
                if (this.$scope.toolbarInitialized === false) {
                    if (this.$scope.$element && this.$scope.$element.length > 0) {
                        this.$scope.toolbarInitialized = true;
                        this.getToolbarHtml().then(function (html) {
                            console.log('COMPILE ANGULAR TOOLBAR');
                            html = _this4.$compile(html)(_this4.$scope);
                            _this4.$scope.$element.prepend(html);
                            //this.$scope.$element.html(this.$compile(this.$scope.$element.html())(this.$scope));
                            _this4.$scope.$element.addClass('ecms-widget-hover');
                            _this4.$scope.toolbarVisible = true;
                        });
                        return;
                    }
                }

                this.$scope.$element.addClass('ecms-widget-hover');
                this.$scope.toolbarVisible = true;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'hideToolbar',
            value: function hideToolbar() {
                this.$scope.$element.removeClass('ecms-widget-hover');
                this.$scope.toolbarVisible = false;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'removeToolbar',
            value: function removeToolbar() {
                this.$scope.$element.find('.ecms-widget-toolbar').remove();
                this.$scope.toolbarInitialized = false;
                this.$scope.toolbarVisible = false;
            }
        }, {
            key: 'click',
            value: function click(event) {
                event.stopPropagation();
            }
        }, {
            key: 'drag',
            value: function drag(event) {
                event.stopPropagation();
            }
        }, {
            key: 'onFocus',
            value: function onFocus() {
                (0, _jquery2.default)('.ecms-widget-focused').removeClass('ecms-widget-focused');
                this.$scope.$element.addClass('ecms-widget-focused');
                (0, _jquery2.default)('html, body').animate({
                    scrollTop: this.$scope.$element.offset().top - 100
                }, 1000);
            }
        }, {
            key: 'onBlur',
            value: function onBlur() {
                this.$scope.$element.removeClass('ecms-widget-focused');
            }
        }, {
            key: 'configure',
            value: function configure(event) {
                event.stopPropagation();

                if (this.$scope.openConfig !== false && typeof this.$scope.openConfig == 'function') {
                    this.$scope.openConfig(event);
                    return;
                }

                this.ecmsPanel.open(this.$scope, 'ConfigController', event.target);
            }
        }, {
            key: 'previewConfig',
            value: function previewConfig(data) {
                this.$scope.$broadcast('previewConfig', { scope: this.$scope });
                this.$scope.data = data;
                this.updateWidget();
            }
        }, {
            key: 'afterConfigure',
            value: function afterConfigure(data) {
                this.previewConfig(data);
                this.$scope.$broadcast('afterConfigure', { scope: this.$scope, data: data });
            }
        }, {
            key: 'removeConfirmation',
            value: function removeConfirmation() {
                var _this5 = this;

                var deferred = this.$q.defer();

                this.$translate(['Are you sure you want to delete this widget?', 'Remove widget', 'Cancel']).then(function (translated) {
                    _this5.$mdDialog.show(_this5.$mdDialog.confirm().title(translated['Are you sure you want to delete this widget?']).ariaLabel('Remove widget').targetEvent(event).ok(translated['Remove widget']).cancel(translated['Cancel'])).then(function () {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }
        }, {
            key: 'remove',
            value: function remove(event) {
                var _this6 = this;

                var _remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                var confirmation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                if (event.stopPropagation) {
                    event.stopPropagation();
                }

                if (event.name && event.name == 'remove') return;

                var removeFunc = function removeFunc() {
                    if (!event.name || event.name != 'remove') {
                        _this6.$scope.$broadcast('remove', { remove: _remove });
                    }

                    if (_remove) {
                        (0, _jquery2.default)(_this6.$scope.$element).fadeOut('fast', function () {
                            (0, _jquery2.default)(_this6.$scope.$element).remove();
                        });
                    }
                };

                if (confirmation) {
                    this.removeConfirmation().then(function () {
                        removeFunc();
                    });
                } else {
                    removeFunc();
                }
            }
        }, {
            key: 'duplicate',
            value: function duplicate(event) {}
        }, {
            key: 'beforePagePreview',
            value: function beforePagePreview() {
                console.log('beofre page preview');
                this.removeToolbar();
            }
        }, {
            key: 'afterPagePreview',
            value: function afterPagePreview() {
                console.log('page preview');
            }
        }, {
            key: 'beforePageSave',
            value: function beforePageSave() {
                this.removeToolbar();
            }
        }, {
            key: 'compileAngularComponents',
            value: function compileAngularComponents() {
                var _this7 = this;

                var angularComponents = ['beyer-icon', 'beyer-button'];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = angularComponents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var comp = _step.value;

                        this.$scope.$element.find(comp).each(function (index, el) {
                            // only compile if not already compiled
                            // -> sometimes CKEditor is leaving the compiled component as it is???
                            if (!el.classList.contains('ng-isolate-scope') && !el.classList.contains('ng-scope')) {
                                _this7.$compile(el)(_this7.$scope);
                            }
                        });
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
            key: 'afterPageSave',
            value: function afterPageSave() {
                // this.compileAngularComponents();
            }
        }, {
            key: 'onDataChanged',
            value: function onDataChanged(event, mass) {
                console.log('data changd');
                this.$scope.data = _jquery2.default.extend({}, this.$scope.data, mass.data);
            }
        }, {
            key: 'startProcess',
            value: function startProcess() {
                console.log('start process');
                this.$scope.inProcess = true;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'stopProcess',
            value: function stopProcess() {
                console.log('stopProcess');
                this.$scope.inProcess = false;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'onMouseEnter',
            value: function onMouseEnter() {
                if (this.$rootScope.hoverDisabled) return;
                if (typeof this.$scope.mouseTimeout !== 'undefined') {
                    clearTimeout(this.$scope.mouseTimeout);
                }

                this.showToolbar();
            }
        }, {
            key: 'onMouseLeave',
            value: function onMouseLeave() {
                this.hideToolbar();
            }
        }, {
            key: 'initEvents',
            value: function initEvents() {
                this.$scope.$on('startProcess', this.startProcess.bind(this));
                this.$scope.$on('stopProcess', this.stopProcess.bind(this));
                this.$scope.$on('remove', this.remove.bind(this));
                this.$scope.$on('afterPageSave', this.afterPageSave.bind(this));
                this.$scope.$on('beforePageSave', this.beforePageSave.bind(this));
                this.$scope.$on('beforePagePreview', this.beforePagePreview.bind(this));
                this.$scope.$on('afterPagePreview', this.afterPagePreview.bind(this));
                this.$scope.$on('onDataChanged', this.onDataChanged.bind(this));
                this.$scope.$on('hideToolbar', this.hideToolbar.bind(this));
                this.$scope.$on('showToolbar', this.showToolbar.bind(this));

                this.$scope.$element.hover(this.onMouseEnter.bind(this), this.onMouseLeave.bind(this));

                this.$rootScope.$on('editorInstanceReady', this.compileAngularComponents.bind(this));
            }
        }, {
            key: 'pictureToFront',
            value: function pictureToFront(e) {
                this.$scope.$element.find('.widget-container, .text').toggleClass('hide');
            }
        }]);

        return AbstractWidgetController;
    }();

    exports.default = AbstractWidgetController;
});
