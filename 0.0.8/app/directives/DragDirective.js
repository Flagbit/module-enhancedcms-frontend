define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function ($window, $document) {

        return {
            link: function link(scope, elem, attrs) {
                (0, _jquery2.default)(elem[0]).draggable({ handle: attrs.rcDrag });
            }
        };
    };

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
