define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function ($window, $document, $timeout) {

        return {
            restrict: 'A',
            scope: {
                'ngClassStrict': '='
            },
            link: function link(scope, elem, attrs) {
                elem.get(0).className = scope.ngClassStrict.join(' ');
            }
        };
    };
});
