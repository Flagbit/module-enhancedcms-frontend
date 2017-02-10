define(["exports", "jquery", "prototype", "../configs/CONSTANTS.js", "../classes/Widget.js", "../classes/Container.js", "../classes/Carousel.js", "../classes/Toolbar.js", "jquery/ui", "jquery/jquery-storageapi"], function (exports, _jquery, _prototype, _CONSTANTS, _Widget, _Container, _Carousel, _Toolbar) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _prototype2 = _interopRequireDefault(_prototype);

    var _Widget2 = _interopRequireDefault(_Widget);

    var _Container2 = _interopRequireDefault(_Container);

    var _Carousel2 = _interopRequireDefault(_Carousel);

    var _Toolbar2 = _interopRequireDefault(_Toolbar);

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

    var ContentController = function ContentController($rootScope, $scope, $element, $mdPanel, $compile, $interpolate, $templateCache, $templateRequest, $q, $log, $mdDialog, ecmsPanel, ecmsPanelBar, $translate) {
        _classCallCheck(this, ContentController);

        var contentScope = {

            globalData: {},
            globalDefaults: {},
            defaultContentClasses: [],
            widgets: [],
            categories: {},

            pageId: null,
            baseUrl: null,

            toolbar: null,

            toolbarOpen: false,

            searchTerm: '',

            _draggable: false,

            init: function init() {
                var _this = this;

                var builderData = window.builderData;
                document.body.classList.add(_CONSTANTS.CONSTANTS.BODY_CLASSNAME);

                this.$element = $element;

                $rootScope.pageId = builderData.pageId;
                $rootScope.templateBaseUrl = builderData.templateBaseUrl;
                this.globalData = builderData.data.global;

                this.isLoading = false;

                $rootScope.pageId = builderData.pageId;
                $rootScope.imageUploadUrl = builderData.imageUploadUrl;
                $rootScope.widgetData = builderData.builderConfig;
                $rootScope.fileQueue = {};
                $rootScope.productListUrl = builderData.productListUrl;
                $rootScope.saveUrl = builderData.saveUrl;

                $rootScope.findWidgetByElement = function (widgetEl) {
                    var name = (0, _jquery2.default)(widgetEl).attr('data-widget');
                    return $rootScope.findWidgetByName(name);
                };

                $rootScope.findWidgetByName = function (name) {
                    return $rootScope.widgets.find(function (widget) {
                        return widget.getName() == name;
                    });
                };

                $rootScope.$safeApply = function (scope) {
                    if ($rootScope.$$phase != '$apply' && $rootScope.$$phase != '$digest') {
                        scope.$apply();
                    }
                };

                var widgets = builderData.data.widgets;
                this.widgets = [];

                _jquery2.default.each(widgets, function (i, widget) {
                    if (widget.type == 'container') {
                        _this.widgets.push(new _Container2.default(_this, $templateCache, $q, $interpolate, $compile, $mdDialog, widget, builderData.widgetUrl, _this.globalData));
                    } else if (widget.type == 'carousel') {
                        _this.widgets.push(new _Carousel2.default(_this, $templateCache, $q, $interpolate, $compile, $mdDialog, widget, builderData.widgetUrl, _this.globalData));
                    } else {
                        _this.widgets.push(new _Widget2.default(_this, $templateCache, $q, $interpolate, $compile, $mdDialog, widget, builderData.widgetUrl, _this.globalData));
                    }
                });

                $rootScope.widgets = this.widgets;

                $rootScope.toolbarTemplateUrl = $rootScope.templateBaseUrl + '/widget-toolbar.html';

                this.toolbar = new _Toolbar2.default('', this, $compile, $templateCache, $templateRequest);

                this.initEvents();
                this.initGlobalDefaults();

                this.initCategories();
                $rootScope.categories = this.categories;

                this.initSortable();

                ecmsPanel.open($scope, 'EditorToolbarController', null, $mdPanel.newPanelPosition().absolute().left(0).bottom(0));
                ecmsPanel.open($scope, 'WidgetListController', null, $mdPanel.newPanelPosition().absolute().right(0).top(0));
                ecmsPanelBar.initialize();
            },
            initEvents: function initEvents() {
                $rootScope.$on('startProcess', this.startProcess.bind(this));
                $rootScope.$on('stopProcess', this.stopProcess.bind(this));
            },
            startProcess: function startProcess() {
                this.isLoading = true;
            },
            stopProcess: function stopProcess() {
                this.isLoading = false;
            },
            initGlobalDefaults: function initGlobalDefaults() {
                var _this2 = this;

                if (this.globalData.config) {
                    _jquery2.default.each(this.globalData.config, function (i, config) {
                        if (config.options) {
                            var options = config.options;
                            if (options.value) {
                                if (!_this2.globalDefaults[i]) {
                                    _this2.globalDefaults[i] = options.value;
                                }

                                if (options.contentClass) {
                                    _this2.defaultContentClasses.push(options.value);
                                }
                            }
                        }
                    });
                }
            },
            initCategories: function initCategories() {
                var _this3 = this;

                this.categories['All'] = {
                    title: 'All',
                    count: this.widgets.length,
                    value: ''
                };

                _jquery2.default.each(this.widgets, function (i, widget) {
                    if (!widget.getCategory()) {
                        widget.setCategory('No category');
                    }

                    var categories = widget.getCategory().split(',');
                    _jquery2.default.each(categories, function (i, category) {
                        if (_this3.categories[category]) {
                            _this3.categories[category].count++;
                        } else {
                            _this3.categories[category] = {
                                title: category,
                                count: 1,
                                value: category
                            };
                        }
                    });
                });
            },
            onWidgetDrag: function onWidgetDrag(ev, ui) {
                ui.helper.addClass('ecms-widget-dragging');
                $rootScope.hoverDisabled = true;
            },
            onWidgetDrop: function onWidgetDrop(ev, ui) {

                if (!ui.draggable && ui.item) {
                    ui.draggable = ui.item;
                }

                if (!ui.helper && ui.item) {
                    ui.helper = ui.item;
                }

                if (!ui.draggable.hasClass('ui-draggable')) return;

                var widget = $rootScope.findWidgetByElement(ui.helper);

                var attributes = _jquery2.default.map(ui.draggable.get(0).attributes, function (item) {
                    return item.name;
                });

                _jquery2.default.each(attributes, function (i, item) {
                    if (item == 'data-widget') return;
                    ui.draggable.removeAttr(item);
                });

                if (widget.isContainer()) {
                    ui.draggable.addClass('ecms-container-widget-directive');
                    ui.draggable.addClass('ecms-widget-container');
                } else if (widget.isCarousel()) {
                    ui.draggable.addClass('ecms-carousel-widget-directive');
                    ui.draggable.addClass('ecms-widget-carousel');
                } else {
                    ui.draggable.addClass('ecms-widget-directive');
                }

                ui.draggable.addClass('ecms-widget-initialize').attr('ng-click', 'ctrl.click($event)').html('');

                ui.draggable.replaceWith($compile(ui.draggable.get(0).outerHTML)($scope));
            },
            initSortable: function initSortable() {
                var _this4 = this;

                (0, _jquery2.default)("#ecms-page-content").sortable({
                    handle: '.ecms-toolbar-handle',
                    placeholder: 'ecms-widget-placeholder',
                    connectWith: '.ecms-widget-container-item-empty',
                    start: function start(e, ui) {
                        ui.placeholder.height(ui.item.height());
                        $rootScope.hoverDisabled = true;
                    },
                    stop: function stop(ev, ui) {
                        if (ui.item.hasClass('ui-draggable')) {
                            _this4.onWidgetDrop(ev, ui);
                        }
                        $rootScope.hoverDisabled = false;
                    }
                });
            }
        };

        Object.assign($scope, contentScope);

        $scope.init();
    };

    exports.default = ContentController;
});
