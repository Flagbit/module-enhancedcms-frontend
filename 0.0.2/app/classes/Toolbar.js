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

    var Toolbar = function () {
        function Toolbar(templateUrl, $scope, $compile, $templateCache, $templateRequest) {
            _classCallCheck(this, Toolbar);

            this.templateUrl = templateUrl;
            this.currentElement = null;

            this.$scope = $scope;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$templateRequest = $templateRequest;
        }

        _createClass(Toolbar, [{
            key: 'initEvents',
            value: function initEvents() {
                var toolbar = (0, _jquery2.default)('.ecms-widget-toolbar');
                //toolbar.find('.ecms-toolbar-delete').bind('click', this.onDeleteClick.bind(this));
                //toolbar.find('.ecms-toolbar-config').bind('click', this.onConfigClick.bind(this));
            }
        }, {
            key: 'onDeleteClick',
            value: function onDeleteClick(ev) {
                var el = this.$scope.getSelectedElement(ev.target);
                this.$scope.removeWidget(el);
            }
        }, {
            key: 'onConfigClick',
            value: function onConfigClick(ev) {
                var el = this.$scope.getSelectedElement(ev.target);
                this.$scope.configureWidget(el);
            }
        }, {
            key: 'remove',
            value: function remove() {
                var toolbar = (0, _jquery2.default)('.ecms-widget-toolbar');
                toolbar.fadeOut('fast', function () {
                    toolbar.remove();
                });
            }
        }, {
            key: 'add',
            value: function add(element) {
                return;

                console.log(element);

                this.remove();
                var el = (0, _jquery2.default)('<div/>', {
                    'class': 'ecms-widget-toolbar',
                    html: this.getHtml()
                });

                if (element.hasClass('ecms-widget-container-item')) {
                    var widget = element.parents('.ecms-widget-container');
                    el.clone().prependTo(widget);

                    el.addClass('ecms-widget-toolbar-right');
                }

                el.prependTo(element);
                this.initEvents();
            }
        }, {
            key: 'setElement',
            value: function setElement(element) {
                this._element = element;
            }
        }, {
            key: 'getElement',
            value: function getElement(element) {
                return this._element;
            }
        }]);

        return Toolbar;
    }();

    exports.default = Toolbar;
});
