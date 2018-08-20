define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function ($window, $document, $timeout, CONFIG) {

        return {
            restrict: 'E',
            controller: 'InterfaceController',
            controllerAs: 'ctrl',
            scope: true,
            templateUrl: function templateUrl() {
                return CONFIG.templateBaseUrl + '/interface.html';
            }
        };
    };
});
