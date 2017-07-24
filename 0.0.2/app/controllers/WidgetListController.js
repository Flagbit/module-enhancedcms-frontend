define(['exports', '../configs/CONSTANTS.min.js'], function (exports, _CONSTANTSMin) {
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

    var WidgetListController = function () {
        function WidgetListController($rootScope, $scope, $compile, $log, $translate) {
            _classCallCheck(this, WidgetListController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;

            this.$compile = $compile;
            this.$log = $log;
            this.$translate = $translate;

            this.$scope.widgets = this.$rootScope.widgets;

            this.$scope.widgets.forEach(function (widget) {
                widget.categories = widget.getCategory().split(',');
            });
            this.$scope.categories = this.$rootScope.categories;
            console.log(this.$scope.categories);
            this.$scope.catFilter = {};
            this.$scope.expandedCategory = null;
        }

        _createClass(WidgetListController, [{
            key: 'getIcon',
            value: function getIcon(title) {
                return _CONSTANTSMin.CATEGORY_ICONS[title];
            }
        }, {
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
    }();

    exports.default = WidgetListController;
});
