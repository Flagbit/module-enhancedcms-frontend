define(['exports', './AbstractWidgetController.min.js', 'jquery'], function (exports, _AbstractWidgetControllerMin, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _AbstractWidgetControllerMin2 = _interopRequireDefault(_AbstractWidgetControllerMin);

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

    var WidgetController = function (_AbstractWidgetContro) {
        _inherits(WidgetController, _AbstractWidgetContro);

        function WidgetController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            _classCallCheck(this, WidgetController);

            var _this = _possibleConstructorReturn(this, (WidgetController.__proto__ || Object.getPrototypeOf(WidgetController)).call(this, $rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest));

            console.log('###', $scope.data);

            _this.$log.debug('Init widget');
            return _this;
        }

        _createClass(WidgetController, [{
            key: 'remove',
            value: function remove(event) {
                _get(WidgetController.prototype.__proto__ || Object.getPrototypeOf(WidgetController.prototype), 'remove', this).call(this, event);
            }
        }]);

        return WidgetController;
    }(_AbstractWidgetControllerMin2.default);

    exports.default = WidgetController;
});
