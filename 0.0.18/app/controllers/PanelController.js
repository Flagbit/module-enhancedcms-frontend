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

    var PanelController = function () {
        function PanelController($rootScope, $scope, mdPanelRef, $timeout, $compile, $log, $q, $templateRequest, $templateCache, targetScope, $translate) {
            _classCallCheck(this, PanelController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$compile = $compile;
            this.$log = $log;
            this.$q = $q;
            this.$templateRequest = $templateRequest;
            this.$templateCache = $templateCache;
            this.$translate = $translate;

            this.$scope.mdPanelRef = mdPanelRef;
            this.$scope.targetScope = targetScope;

            this.$scope.loaded = false;
            this.$scope.draggable = true;
            this.$scope.collapsableLeft = false;
            this.$scope.collapsableRight = false;
            this.$scope.collapsed = false;
            this.$scope.maximizeable = false;
            this.$scope.minimizeable = true;
            this.$scope.minimized = false;
            this.$scope.closeable = true;
            this.$scope.expanded = true;
            this.$scope.maxHeight = '600px';
            this.$scope.maxWidth = '1000px';
            this.$scope.oldPosition = {};

            this.initEventListeners();
            this.initializePromise = this.initElement();
        }

        _createClass(PanelController, [{
            key: 'getTemplateFile',
            value: function getTemplateFile() {
                return '';
            }
        }, {
            key: 'getTemplateUrl',
            value: function getTemplateUrl() {
                return this.$rootScope.templateBaseUrl + '/panel/' + this.getTemplateFile();
            }
        }, {
            key: 'initEventListeners',
            value: function initEventListeners() {
                this.$scope.$on('beforePagePreview', this.beforePagePreview.bind(this));
                this.$scope.$on('remove', this.close.bind(this));
                this.$scope.$on('minimizePanel', this.minimize.bind(this));
            }
        }, {
            key: 'beforePagePreview',
            value: function beforePagePreview() {
                this.minimize();
                this.collapse();
            }
        }, {
            key: 'collapse',
            value: function collapse() {
                this.$scope.mdPanelRef.panelEl.addClass('panel-collapsed').addClass(this.$scope.collapsableLeft ? 'panel-collapsed-left' : 'panel-collapsed-right');
                this.$scope.collapsed = true;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'expand',
            value: function expand() {
                this.$scope.mdPanelRef.panelEl.removeClass('panel-collapsed').removeClass(this.$scope.collapsableLeft ? 'panel-collapsed-left' : 'panel-collapsed-right');
                this.$scope.collapsed = false;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'toggleCollapse',
            value: function toggleCollapse() {
                this.$scope.collapsed ? this.expand() : this.collapse();
            }
        }, {
            key: 'initElement',
            value: function initElement() {
                var _this = this;

                var deferred = this.$q.defer();

                this.$timeout(function () {
                    _this.$scope.mdPanelRef.panelContainer.css('position', 'fixed');
                    _this.$scope.mdPanelRef.panelEl.on('focus', _this.onFocus.bind(_this)).on('blur', _this.onBlur.bind(_this));

                    if (_this.$scope.collapsableLeft) {
                        _this.$scope.mdPanelRef.panelEl.addClass('panel-collapseable-left');
                    } else if (_this.$scope.collapsableRight) {
                        _this.$scope.mdPanelRef.panelEl.addClass('panel-collapseable-right');
                    }

                    if (_this.$scope.draggable) {
                        _this.$scope.mdPanelRef.panelEl.draggable({
                            scroll: true,
                            handle: 'md-toolbar',
                            start: function start(e) {
                                _this.$scope.mdPanelRef.panelEl.css({ transition: 'none' });
                                _this.onFocus(e);
                            },
                            stop: function stop() {
                                _this.$scope.mdPanelRef.panelEl.css({ transition: '' });
                            }
                        });
                    }

                    deferred.resolve();
                });

                return deferred.promise;
            }
        }, {
            key: 'onClose',
            value: function onClose() {
                this.onBlur();
                this.$rootScope.$emit('panelRemoveFromBar', {
                    scope: this.$scope
                });
                this.$scope.mdPanelRef.destroy();
            }
        }, {
            key: 'onBlur',
            value: function onBlur(e) {
                this.$scope.mdPanelRef.panelEl.removeClass('panel-focused');
                this.$scope.mdPanelRef.panelContainer.css({ 'z-index': 99 });
            }
        }, {
            key: 'onFocus',
            value: function onFocus(e) {
                jQuery('.panel-focused').removeClass('panel-focused');
                this.$scope.mdPanelRef.panelEl.addClass('panel-focused');
                this.$scope.mdPanelRef.panelContainer.css({ 'z-index': 100 });
            }
        }, {
            key: 'hide',
            value: function hide() {
                this.close();
            }
        }, {
            key: 'cancel',
            value: function cancel() {
                this.close();
            }
        }, {
            key: 'close',
            value: function close() {
                this.$scope.mdPanelRef.close().then(this.onClose.bind(this));
            }
        }, {
            key: 'maximize',
            value: function maximize() {
                if (this.$scope.maximizeable === false) return;

                //this.$scope.expanded = true;
                this.$scope.minimizeable = true;
                this.$scope.maximizeable = false;
                this.$scope.minimized = false;

                var el = this.$scope.mdPanelRef.panelEl;
                if (this.$scope.draggable) {
                    el.draggable('enable');
                }

                this.$rootScope.$emit('panelRemoveFromBar', {
                    scope: this.$scope
                });
            }
        }, {
            key: 'minimize',
            value: function minimize(event, data) {
                if (event && event.name && event.name == 'minimizePanel') {
                    if (data.blacklist && data.blacklist.$id == this.$scope.$id) return;
                }

                if (this.$scope.minimizeable === false) return;

                //this.$scope.expanded = false;
                this.$scope.minimizeable = false;
                this.$scope.maximizeable = true;
                this.$scope.minimized = true;

                var el = this.$scope.mdPanelRef.panelEl;
                if (this.$scope.draggable) {
                    el.draggable('disable');
                }

                this.$rootScope.$emit('panelAddToBar', {
                    scope: this.$scope,
                    position: {
                        left: el.css('left'), top: el.css('top')
                    },
                    positionElement: el,
                    sizeElement: el.find('md-toolbar').first()
                });
            }
        }, {
            key: 'onLoaded',
            value: function onLoaded() {
                this.$scope.loaded = true;
                this.$scope.$broadcast('loaded');
            }
        }]);

        return PanelController;
    }();

    exports.default = PanelController;
});
