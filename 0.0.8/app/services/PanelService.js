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

    var PanelService = function () {
        function PanelService($rootScope, $mdPanel) {
            _classCallCheck(this, PanelService);

            this.$rootScope = $rootScope;
            this.$mdPanel = $mdPanel;
        }

        _createClass(PanelService, [{
            key: 'open',
            value: function open($scope) {
                var controller = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'PanelController';
                var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var panelPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

                var config = {
                    attachTo: $scope.$element,
                    controller: controller,
                    controllerAs: 'ctrl',
                    disableParentScroll: false,
                    templateUrl: this.$rootScope.templateBaseUrl + '/panel/default.html',
                    hasBackdrop: false,
                    panelClass: 'ecms-config-panel',
                    origin: '.ecms-config-panel',
                    trapFocus: false,
                    zIndex: 300,
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    focusOnOpen: true,
                    locals: {
                        targetScope: $scope
                    }
                };

                if (element) {
                    config.animation = this.$mdPanel.newPanelAnimation().openFrom(element).closeTo(element).withAnimation(this.$mdPanel.animation.SCALE);
                }

                if (panelPosition) {
                    config.position = panelPosition;
                }

                this.$rootScope.$broadcast('minimizePanel', { blacklist: $scope });
                this.$mdPanel.open(config);
            }
        }]);

        return PanelService;
    }();

    exports.default = PanelService;
});
