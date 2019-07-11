define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function (CONFIG) {

        return {
            restrict: 'E',
            controller: 'WidgetListController',
            controllerAs: 'ctrl',
            templateUrl: function templateUrl() {
                return CONFIG.templateBaseUrl + '/widget-list.html';
            },
            scope: true
        };
    };
});
