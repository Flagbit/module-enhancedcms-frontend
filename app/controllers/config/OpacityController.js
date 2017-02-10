define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var OpacityController = function OpacityController($rootScope, $scope, $element) {
        _classCallCheck(this, OpacityController);

        this.$rootScope = $rootScope;

        this.$scope = $scope;
        this.$scope.$element = $element;
    };

    exports.default = OpacityController;
});
