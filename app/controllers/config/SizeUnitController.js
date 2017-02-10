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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var SizeUnitController = function () {
        function SizeUnitController($rootScope, $scope, $element) {
            _classCallCheck(this, SizeUnitController);

            this.$rootScope = $rootScope;

            this.$scope = $scope;
            this.$scope.$element = $element;

            this.$scope.sizePattern = '^(0|\\d+(px|%|em|rem))$';
            this.$scope.sides = ['top', 'right', 'bottom', 'left'];
        }

        _createClass(SizeUnitController, [{
            key: 'initValues',
            value: function initValues(name) {
                if (this.$scope.currentData && this.$scope.currentData[name]) {
                    var values = this.$scope.currentData[name].split(' ');
                    for (var i in this.$scope.sides) {
                        if (this.$scope.sides.hasOwnProperty(i)) {
                            var str = this.$scope.sides[i];
                            if (!this.$scope.currentData[name + '_' + str] && values[i]) {
                                this.$scope.currentData[name + '_' + str] = values[i];
                            }
                        }
                    }
                }
            }
        }, {
            key: 'getValues',
            value: function getValues(name) {
                var values = [];
                if (this.$scope.currentData) {
                    for (var i in this.$scope.sides) {
                        if (this.$scope.sides.hasOwnProperty(i)) {
                            var str = this.$scope.sides[i];
                            if (typeof this.$scope.currentData[name + '_' + str] === 'undefined') {
                                values.push(0);
                            } else {
                                values.push(this.$scope.currentData[name + '_' + str]);
                            }
                        }
                    }
                }

                return values.join(' ');
            }
        }]);

        return SizeUnitController;
    }();

    exports.default = SizeUnitController;
});
