define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var YoutubeIdController = function YoutubeIdController($rootScope, $scope, $element) {
        _classCallCheck(this, YoutubeIdController);

        this.$rootScope = $rootScope;

        this.$scope = $scope;
        this.$scope.$element = $element;

        this.$scope.youtubeId = '^([A-Za-z0-9_\-]{11})$';
    };

    exports.default = YoutubeIdController;
});
