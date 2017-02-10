define(["exports", "./AbstractWidgetController.min.js"], function (exports, _AbstractWidgetControllerMin) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _AbstractWidgetControllerMin2 = _interopRequireDefault(_AbstractWidgetControllerMin);

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

    var ContainerWidgetController = function (_AbstractWidgetContro) {
        _inherits(ContainerWidgetController, _AbstractWidgetContro);

        function ContainerWidgetController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            _classCallCheck(this, ContainerWidgetController);

            var _this = _possibleConstructorReturn(this, (ContainerWidgetController.__proto__ || Object.getPrototypeOf(ContainerWidgetController)).call(this, $rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest));

            _this.$scope.columnCount = null;

            _this.$log.debug("Init container widget");
            return _this;
        }

        _createClass(ContainerWidgetController, [{
            key: "click",
            value: function click(event) {
                event.stopPropagation();
            }
        }]);

        return ContainerWidgetController;
    }(_AbstractWidgetControllerMin2.default);

    exports.default = ContainerWidgetController;
});
