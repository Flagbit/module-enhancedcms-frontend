define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function () {

        return {
            restrict: 'A',
            controller: 'WidgetListController',
            controllerAs: 'ctrl',
            templateUrl: function templateUrl() {
                return window.builderData.templateBaseUrl + '/widget-list.html';
            },
            scope: true
        };
    };
});
