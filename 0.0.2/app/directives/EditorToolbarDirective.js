define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function (CONFIG) {

        return {
            restrict: 'E',
            controller: 'EditorToolbarController',
            controllerAs: 'ctrl',
            templateUrl: function templateUrl() {
                return CONFIG.templateBaseUrl + '/editor-toolbar.html';
            },
            scope: true
        };
    };
});
