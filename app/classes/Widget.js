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

    var Widget = function () {
        function Widget($scope, $templateCache, $q, $interpolate, $compile, $mdDialog, data, url) {
            var globalData = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};

            _classCallCheck(this, Widget);

            this.$scope = $scope;
            this.$templateCache = $templateCache;
            this.$q = $q;
            this.$interpolate = $interpolate;
            this.$compile = $compile;
            this.$mdDialog = $mdDialog;
            this.globalData = globalData;

            this._data = data;
            this._url = url;
            this._templatePromise = null;

            this._values = {};

            this.initDefaults();
        }

        _createClass(Widget, [{
            key: 'initDefaults',
            value: function initDefaults() {
                var _this = this;

                if (!this._data.defaults) {
                    this._data.defaults = {};
                }

                var cfg = _jquery2.default.extend({}, this.globalData.config, this.getConfig());
                _jquery2.default.each(cfg, function (i, config) {
                    if (config.options) {
                        var options = config.options;
                        if (options.defaultValues) {
                            _jquery2.default.each(options.defaultValues, function (i, value) {
                                if (!_this._data.defaults[i]) {
                                    _this._data.defaults[i] = value;
                                }
                            });
                        }
                        if (options.value) {
                            if (!_this._data.defaults[i]) {
                                _this._data.defaults[i] = options.value;
                            }
                        }
                    }
                });
            }
        }, {
            key: 'isPluggable',
            value: function isPluggable() {
                if (this.getData().pluggable) {
                    return this.getData().pluggable;
                }

                return false;
            }
        }, {
            key: 'getData',
            value: function getData() {
                if (this._data) {
                    return this._data;
                }

                return false;
            }
        }, {
            key: 'getToolbar',
            value: function getToolbar() {
                if (this.getData()) {
                    if (this.getData().toolbar) {
                        return this.getData().toolbar;
                    }
                }

                return '';
            }
        }, {
            key: 'getName',
            value: function getName() {
                return this.getData().name;
            }
        }, {
            key: 'getTitle',
            value: function getTitle() {
                return this.getData().title;
            }
        }, {
            key: 'getImage',
            value: function getImage() {
                return this.getData().image;
            }
        }, {
            key: 'getCategory',
            value: function getCategory() {
                if (this.getData()) {
                    if (this.getData().category) {
                        return this.getData().category;
                    }
                }

                return '';
            }
        }, {
            key: 'setCategory',
            value: function setCategory(category) {
                if (!this.getData()) {
                    this._data = {};
                }
                this._data.category = category;
            }
        }, {
            key: 'getHtml',
            value: function getHtml() {
                var _this2 = this;

                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                var deferred = this.$q.defer();

                var html = this.$templateCache.get(this.getName() + '.html');
                if (html) {
                    var wData = _jquery2.default.extend({}, this.getDefaults(), data ? data : {});

                    // html = this.$interpolate(html)(wData);

                    deferred.resolve(html);
                } else {
                    _jquery2.default.get(this._url, {
                        widget: this.getName()
                    }).done(function (res) {
                        var html = res.html;
                        _this2.$templateCache.put(_this2.getName() + '.html', html);

                        deferred.resolve(html);
                    });
                }

                return deferred.promise;
            }
        }, {
            key: 'isContainer',
            value: function isContainer() {
                return false;
            }
        }, {
            key: 'isCarousel',
            value: function isCarousel() {
                return false;
            }
        }, {
            key: 'getDefaults',
            value: function getDefaults() {
                if (this.getData()) if (this.getData().defaults) {
                    return this.getData().defaults;
                }

                return [];
            }
        }, {
            key: 'getPlugins',
            value: function getPlugins() {
                if (this.getData()) if (this.getData().plugins) {
                    return this.getData().plugins;
                }

                return {};
            }
        }, {
            key: 'getConfig',
            value: function getConfig() {
                if (this.getData()) if (this.getData().config) {
                    return this.getData().config;
                }

                return {};
            }
        }, {
            key: 'getValues',
            value: function getValues() {
                return this._values;
            }
        }, {
            key: 'configure',
            value: function configure(element) {}
        }]);

        return Widget;
    }();

    exports.default = Widget;
});
