define(['exports', './PanelController.js'], function (exports, _PanelController2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _PanelController3 = _interopRequireDefault(_PanelController2);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

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

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var WidgetListController = function (_PanelController) {
        _inherits(WidgetListController, _PanelController);

        function WidgetListController($rootScope, $scope, mdPanelRef, $timeout, $compile, $log, $q, $templateRequest, $templateCache, targetScope, $translate) {
            _classCallCheck(this, WidgetListController);

            var _this = _possibleConstructorReturn(this, (WidgetListController.__proto__ || Object.getPrototypeOf(WidgetListController)).call(this, $rootScope, $scope, mdPanelRef, $timeout, $compile, $log, $q, $templateRequest, $templateCache, targetScope, $translate));

            _this.$scope.draggable = false;
            _this.$scope.maximizeable = false;
            _this.$scope.minimizeable = false;
            _this.$scope.closeable = false;
            _this.$scope.collapsableRight = true;
            _this.$scope.maxWidth = '300px';
            _this.$scope.title = 'Templates';

            _this.$scope.widgets = _this.$rootScope.widgets;

            _this.$scope.widgets.forEach(function (widget) {
                widget.categories = widget.getCategory().split(',');
            });
            _this.$scope.categories = _this.$rootScope.categories;
            _this.$scope.catFilter = {};
            return _this;
        }

        _createClass(WidgetListController, [{
            key: 'initEventListeners',
            value: function initEventListeners() {
                _get(WidgetListController.prototype.__proto__ || Object.getPrototypeOf(WidgetListController.prototype), 'initEventListeners', this).call(this);
                this.$rootScope.$on('toggleTemplates', this.toggleCollapse.bind(this));
            }
        }, {
            key: 'getTemplateFile',
            value: function getTemplateFile() {
                return 'widget-list.html';
            }
        }, {
            key: 'onWidgetDragStart',
            value: function onWidgetDragStart(event, o) {
                jQuery(o.helper).addClass('ecms-widget-dragging');
                jQuery(o.helper).html('');
            }
        }]);

        return WidgetListController;
    }(_PanelController3.default);

    exports.default = WidgetListController;
});
