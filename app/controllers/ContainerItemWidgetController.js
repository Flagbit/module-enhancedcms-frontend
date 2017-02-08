define(['exports', './AbstractWidgetController'], function (exports, _AbstractWidgetController) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _AbstractWidgetController2 = _interopRequireDefault(_AbstractWidgetController);

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

    var ContainerItemWidgetController = function (_AbstractWidgetContro) {
        _inherits(ContainerItemWidgetController, _AbstractWidgetContro);

        function ContainerItemWidgetController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            _classCallCheck(this, ContainerItemWidgetController);

            var _this = _possibleConstructorReturn(this, (ContainerItemWidgetController.__proto__ || Object.getPrototypeOf(ContainerItemWidgetController)).call(this, $rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest));

            _this.$scope.empty = false;
            if ($element) {
                if ($element.hasClass('ecms-widget-container-item-empty')) {
                    _this.$scope.empty = true;
                }
            }

            _this.$scope.toolbarChildren = true;
            _this.$scope.dragHandle = false;
            _this.$scope.width = null;
            return _this;
        }

        _createClass(ContainerItemWidgetController, [{
            key: 'click',
            value: function click(event) {
                var _this2 = this;

                if (event.stopPropagation) {
                    event.stopPropagation();
                }

                if (this.$scope.empty || typeof this.$scope.empty === 'undefined') {
                    this.$mdDialog.show({
                        controller: 'ContainerController',
                        templateUrl: this.$rootScope.templateBaseUrl + '/dialog/container-item-select.html',
                        parent: document.body,
                        clickOutsideToClose: true,
                        locals: {
                            widgets: this.$scope.widgets,
                            isPluggable: function isPluggable(widget) {
                                return widget.isPluggable();
                            }
                        }
                    }).then(function (widget) {
                        _this2.$scope.$widget = widget;
                        _this2.$scope.$element.removeClass('ecms-widget-container-item-empty').attr('data-widget', widget.getName());

                        _this2.loadWidget().then(function () {
                            _this2.$scope.empty = false;
                        });
                    });
                }
            }
        }, {
            key: 'showToolbar',
            value: function showToolbar() {
                if (!this.$scope.empty) {
                    _get(ContainerItemWidgetController.prototype.__proto__ || Object.getPrototypeOf(ContainerItemWidgetController.prototype), 'showToolbar', this).call(this);
                }
            }
        }, {
            key: 'getWidth',
            value: function getWidth() {
                var gutter = 0;

                if (this.$scope.$parent.data.gutter) {
                    gutter = parseFloat(this.$scope.$parent.data.gutter);
                } else if (this.$scope.$parent.$parent.data.gutter) {
                    gutter = parseFloat(this.$scope.$parent.$parent.data.gutter);
                }

                return parseInt(this.$scope.width) - gutter / parseInt(this.$scope.columnCount) + '%';
            }
        }, {
            key: 'remove',
            value: function remove(event) {
                var _this3 = this;

                var _remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                var confirmation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                if (typeof event.targetScope !== 'undefined' && event.targetScope.$id !== this.$scope.$id) {
                    return _get(ContainerItemWidgetController.prototype.__proto__ || Object.getPrototypeOf(ContainerItemWidgetController.prototype), 'remove', this).call(this, event, _remove, confirmation);
                }

                if (typeof event.name !== 'undefined' && event.name == 'remove') {
                    return;
                }

                _get(ContainerItemWidgetController.prototype.__proto__ || Object.getPrototypeOf(ContainerItemWidgetController.prototype), 'remove', this).call(this, event, false, false);
                this.removeConfirmation().then(function () {
                    _this3.$scope.$element.addClass('ecms-widget-container-item-empty').find('.ecms-widget-content').remove();
                    _this3.$scope.empty = true;
                    _this3.$scope.$widget = null;
                    _this3.$scope.$widgetId = null;
                });

                this.hideToolbar();
            }
        }]);

        return ContainerItemWidgetController;
    }(_AbstractWidgetController2.default);

    exports.default = ContainerItemWidgetController;
});
