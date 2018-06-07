define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var PanelBarService = function () {
        function PanelBarService($rootScope, $mdPanel) {
            _classCallCheck(this, PanelBarService);

            this.$rootScope = $rootScope;
            this.$mdPanel = $mdPanel;
        }

        _createClass(PanelBarService, [{
            key: 'initialize',
            value: function initialize() {
                this.panelIndex = 0;
                this.panels = {};
                this.initEventListeners();
            }
        }, {
            key: 'initEventListeners',
            value: function initEventListeners() {
                this.$rootScope.$on('panelAddToBar', this.addPanel.bind(this));
                this.$rootScope.$on('panelRemoveFromBar', this.removePanel.bind(this));
            }
        }, {
            key: 'addPanel',
            value: function addPanel(mass, data) {
                this.panels[data.scope.$id] = data;
                this.movePanels();
            }
        }, {
            key: 'removePanel',
            value: function removePanel(mass, data) {
                if (this.panels[data.scope.$id]) {
                    this.panels[data.scope.$id].positionElement.css(this.panels[data.scope.$id].position);
                    delete this.panels[data.scope.$id];
                    this.$rootScope.$broadcast('minimizePanel', { blacklist: data.scope });
                    this.movePanels();
                }
            }
        }, {
            key: 'calculateCurrentOffset',
            value: function calculateCurrentOffset() {
                var viewportWidth = (0, _jquery2.default)(window).width();
                var offset = 0;

                _jquery2.default.each(this.panels, function (key, value) {
                    offset += value.sizeElement.width();
                });

                return viewportWidth / 2 - offset / 2;
            }
        }, {
            key: 'movePanels',
            value: function movePanels() {
                var viewportHeight = (0, _jquery2.default)(window).height();
                var offset = 0;

                var pageOffset = this.calculateCurrentOffset();
                _jquery2.default.each(this.panels, function (key, value) {
                    value.positionElement.css({
                        left: pageOffset + offset,
                        top: viewportHeight - value.sizeElement.height()
                    });

                    offset += value.sizeElement.width();
                });
            }
        }]);

        return PanelBarService;
    }();

    exports.default = PanelBarService;
});
