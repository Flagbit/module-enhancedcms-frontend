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

    if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    var Widget = function () {
        function Widget() {
            _classCallCheck(this, Widget);
        }

        _createClass(Widget, null, [{
            key: 'keyValuePairToObject',
            value: function keyValuePairToObject(arr) {
                var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
                var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value';

                var obj = {};
                _jquery2.default.each(arr, function (i, item) {
                    if (item[key] && item[value]) {
                        obj[item[key]] = item[value];
                    }
                });

                return obj;
            }
        }, {
            key: 'generateWidgetId',
            value: function generateWidgetId() {
                var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

                var characters = "abcdefghijklmnopqrstuvwxyz";
                var string = "";

                for (var i = 0; i < length; i++) {
                    string += characters.charAt(Math.floor(Math.random() * characters.length));
                }

                return string;
            }
        }]);

        return Widget;
    }();

    exports.default = Widget;
});
