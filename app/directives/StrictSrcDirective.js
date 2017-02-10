define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function ($window, $document, $timeout) {

        return {
            restrict: 'A',
            scope: {
                'ngSrcStrict': '='
            },
            link: function link(scope, elem, attrs) {
                elem.prop('src', scope.ngSrcStrict);
            }
        };
    };
});
