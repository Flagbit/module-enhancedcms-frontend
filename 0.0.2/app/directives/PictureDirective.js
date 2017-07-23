define(['exports', '../controllers/PictureController.min.js'], function (exports, _PictureControllerMin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function ($window, $document, $timeout) {
        return {
            restrict: 'A',
            controller: _PictureControllerMin.PictureController.name,
            controllerAs: 'ctrl',
            scope: true
        };
    };
});
