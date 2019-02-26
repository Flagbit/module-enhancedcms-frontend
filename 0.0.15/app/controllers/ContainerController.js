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

    var ContainerController = function ContainerController($scope, $mdDialog, locals) {
        _classCallCheck(this, ContainerController);

        var contentScope = {

            _opened: false,

            hide: function hide() {
                $mdDialog.hide();
            },
            cancel: function cancel() {
                $mdDialog.cancel();
            },
            answer: function answer(_answer) {
                $mdDialog.hide(_answer);
            }
        };

        $scope.locals = locals;

        Object.assign($scope, contentScope);
    };

    exports.default = ContainerController;
});
