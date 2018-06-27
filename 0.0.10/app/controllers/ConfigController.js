define(['exports', 'jquery', '../classes/Utils.min.js', './PanelController.min.js', '../../jsonform/config.min.js'], function (exports, _jquery, _UtilsMin, _PanelControllerMin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _UtilsMin2 = _interopRequireDefault(_UtilsMin);

    var _PanelControllerMin2 = _interopRequireDefault(_PanelControllerMin);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ConfigController = function (_PanelController) {
        _inherits(ConfigController, _PanelController);

        function ConfigController($rootScope, $scope, mdPanelRef, $timeout, $compile, $log, $q, $templateRequest, $templateCache, targetScope, $translate) {
            _classCallCheck(this, ConfigController);

            var _this = _possibleConstructorReturn(this, (ConfigController.__proto__ || Object.getPrototypeOf(ConfigController)).call(this, $rootScope, $scope, mdPanelRef, $timeout, $compile, $log, $q, $templateRequest, $templateCache, targetScope, $translate));

            _this.$translate('Configure Widget').then(function (translated) {
                _this.$scope.title = translated;
            });

            _this.$scope.isWidgetConfigLoading = false;
            _this.$scope.isWidgetConfigEmpty = true;
            _this.$scope.isWidgetConfigSaving = false;
            _this.$scope.isWidgetConfigUploading = false;
            _this.$scope.unsaved = false;
            _this.$scope.currentData = {};

            _this.$scope.uploadCount = 0;

            _this.$scope.targetScope.openConfig = _this.openConfig.bind(_this);
            _this.$scope.title = _this.findTitle();

            _this.initializePromise.then(function () {});
            return _this;
        }

        _createClass(ConfigController, [{
            key: 'getTemplateFile',
            value: function getTemplateFile() {
                return 'config.html';
            }
        }, {
            key: 'initEventListeners',
            value: function initEventListeners() {
                var _this2 = this;

                _get(ConfigController.prototype.__proto__ || Object.getPrototypeOf(ConfigController.prototype), 'initEventListeners', this).call(this);

                this.$scope.$on('onSaveData', function (event, mass) {
                    _this2.save(mass.data);
                });
                this.$scope.$on('onPreviewData', function (event, mass) {
                    _this2.preview(mass.data);
                });
                this.$scope.$on('loaded', function (event, mass) {
                    _this2.$scope.formElement = _this2.mdPanelRef.panelContainer.find('#ecms-config-dialog-form');
                    _this2.loadForm();
                });

                this.$scope.$on('uploadDone', function (event, mass) {
                    _this2.$scope.currentData = _jquery2.default.extend(_this2.$scope.currentData, mass.data);
                    _this2.$scope.uploadCount--;
                    if (_this2.$scope.uploadCount == 0) {
                        _this2._save();
                    }
                });
            }
        }, {
            key: 'openConfig',
            value: function openConfig(e) {
                this.onFocus(e);
                this.maximize();
            }
        }, {
            key: 'onFocus',
            value: function onFocus(e) {
                _get(ConfigController.prototype.__proto__ || Object.getPrototypeOf(ConfigController.prototype), 'onFocus', this).call(this, e);
                if (e.type != 'dragstart') {
                    this.$scope.targetScope.ctrl.onFocus();
                }
            }
        }, {
            key: 'onBlur',
            value: function onBlur(e) {
                _get(ConfigController.prototype.__proto__ || Object.getPrototypeOf(ConfigController.prototype), 'onBlur', this).call(this);
                this.$scope.targetScope.ctrl.onBlur();
            }
        }, {
            key: 'onClose',
            value: function onClose() {
                _get(ConfigController.prototype.__proto__ || Object.getPrototypeOf(ConfigController.prototype), 'onClose', this).call(this);
                this.$scope.targetScope.openConfig = false;
            }
        }, {
            key: 'removeForm',
            value: function removeForm() {
                this.$scope.formElement.html('');
            }
        }, {
            key: 'loadForm',
            value: function loadForm() {
                var _this3 = this;

                this.$log.debug('loading form...');

                var wScope = this.$scope.targetScope;

                this.$scope.isWidgetConfigLoading = true;

                if (!wScope.$widget) return;

                var fields = {};

                if (!_jquery2.default.isEmptyObject(wScope.$widget.getConfig())) {
                    _jquery2.default.extend(fields, wScope.$widget.getConfig());
                }

                fields = _jquery2.default.extend(fields, wScope.globalData.config);

                var values = {};
                if (wScope.data) {
                    values = wScope.data;
                }

                if (_jquery2.default.isEmptyObject(fields)) {
                    this.$scope.isWidgetConfigLoading = false;
                    return;
                }

                this.$scope.widgetConfigOriginalData = values;

                var formData = [];

                var schema = {};

                var groups = {};

                this.$scope.contentClasses = [];

                _jquery2.default.each(fields, function (name, field) {
                    if (field.options) {
                        var options = field.options;

                        if (options.defaultValues) {
                            _jquery2.default.each(options.defaultValues, function (name, value) {
                                if (!_this3.$scope.widgetConfigOriginalData[name]) {
                                    _this3.$scope.widgetConfigOriginalData[name] = value;
                                }
                            });
                        }

                        if (options.value) {
                            if (!_this3.$scope.widgetConfigOriginalData[name]) {
                                _this3.$scope.widgetConfigOriginalData[name] = options.value;
                            }
                        }

                        var d = {
                            "key": name,
                            "onChange": function onChange() {
                                _this3.preview();
                            }
                        };

                        if (options.form) {
                            d = _jquery2.default.extend({}, d, options.form);
                        }

                        if (options.values) {
                            options.enum = _jquery2.default.map(options.values, function (element, index) {
                                return index;
                            });
                            d.titleMap = options.values;
                        }

                        schema[name] = options;

                        if (options.contentClass) {
                            _this3.$scope.contentClasses.push(name);
                        }

                        if (options.group) {
                            if (!groups[options.group]) {
                                groups[options.group] = [];
                            }

                            d.key = name;
                            groups[options.group].push(d);
                        }
                    }
                });

                this.$scope.currentData = angular.copy(this.$scope.widgetConfigOriginalData);

                _jquery2.default.each(groups, function (title, options) {
                    formData.push({
                        type: 'fieldset',
                        title: title,
                        items: options
                    });
                });

                this.$scope.formElement.jsonForm({
                    schema: schema,
                    value: this.$scope.widgetConfigOriginalData,
                    form: formData
                });

                this.$scope.formElement.find('.ecms-config-compile').each(function (idx, el) {
                    el = (0, _jquery2.default)(el);
                    el.html(_this3.$compile(el.html())(_this3.$scope));
                });

                this.$scope.formElement.find('input,select').on('focus', this.onFocus.bind(this)).on('blur', this.onBlur.bind(this));

                this.$scope.isWidgetConfigLoading = false;
                this.$scope.isWidgetConfigEmpty = false;
            }
        }, {
            key: 'cancel',
            value: function cancel() {
                this.$scope.targetScope.ctrl.afterConfigure(this.$scope.widgetConfigOriginalData);
                _get(ConfigController.prototype.__proto__ || Object.getPrototypeOf(ConfigController.prototype), 'cancel', this).call(this);
            }
        }, {
            key: 'triggerPreview',
            value: function triggerPreview() {
                this.$scope.$broadcast('beforePreview', { scope: this.$scope.targetScope, data: this.$scope.currentData });
                this.$scope.targetScope.ctrl.previewConfig(this.$scope.currentData);
                this.$scope.$broadcast('afterPreview', { scope: this.$scope.targetScope, data: this.$scope.currentData });
            }
        }, {
            key: 'preview',
            value: function preview() {
                var additionalData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var data = this.$scope.formElement.serializeArray();
                data = _UtilsMin2.default.keyValuePairToObject(data);
                data = _jquery2.default.extend(this.$scope.currentData, data, additionalData ? additionalData : {});
                data.contentClasses = this.getContentClasses(data, this.$scope.contentClasses);
                this.$scope.currentData = data;

                this.$scope.unsaved = !angular.equals(data, this.$scope.widgetConfigOriginalData);
                this.triggerPreview();
            }
        }, {
            key: 'save',
            value: function save() {
                this.$scope.unsaved = false;

                var data = this.$scope.currentData;
                this.$scope.$broadcast('beforeSave', {
                    scope: this.$scope.targetScope,
                    configScope: this.$scope,
                    data: data
                });

                if (typeof this.$scope.$$listenerCount.uploadStart === 'undefined' || this.$scope.$$listenerCount.uploadStart <= 0) {
                    this._save();
                } else {
                    this.$scope.uploadCount = this.$scope.$$listenerCount.uploadStart;
                    this.$scope.isWidgetConfigUploading = true;
                    this.$rootScope.$safeApply(this.$scope);

                    this.$scope.$broadcast('uploadStart', {
                        scope: this.$scope.targetScope,
                        configScope: this.$scope
                    });
                }
            }
        }, {
            key: '_save',
            value: function _save() {
                var _this4 = this;

                this.$scope.isWidgetConfigSaving = true;
                this.$scope.isWidgetConfigUploading = false;

                var data = this.$scope.currentData;
                this.$scope.widgetConfigOriginalData = angular.copy(data);
                this.$scope.targetScope.ctrl.afterConfigure(data);
                this.$scope.$broadcast('afterSave', {
                    scope: this.$scope.targetScope,
                    configScope: this.$scope,
                    data: data
                });

                setTimeout(function () {
                    _this4.$scope.isWidgetConfigSaving = false;
                    _this4.$rootScope.$safeApply(_this4.$scope);
                }, 1000);
            }
        }, {
            key: 'getContentClasses',
            value: function getContentClasses(data, contentClasses) {
                var _contentClasses = [];
                if (contentClasses.length) {
                    _jquery2.default.each(contentClasses, function (idx, contentClass) {
                        if (data[contentClass]) {
                            _contentClasses.push(data[contentClass]);
                        }
                    });
                }

                return _contentClasses;
            }
        }, {
            key: 'findTitle',
            value: function findTitle() {
                var el = this.$scope.targetScope.$element;
                var headings = el.find('h1,h2,h3,h4').first();

                if (headings) {
                    el = headings;
                }

                var text = el.text().trim();
                text = text.length < 15 ? text : text.substr(0, 15).trim() + '...';

                if (!text) {
                    text = this.$scope.title;

                    if (this.$scope.targetScope.$widget && this.$scope.targetScope.$widget.getTitle()) {
                        text = this.$scope.targetScope.$widget.getTitle();
                        text = text.length < 15 ? text : text.substr(0, 15).trim() + '...';
                    }
                }

                return text;
            }
        }]);

        return ConfigController;
    }(_PanelControllerMin2.default);

    exports.default = ConfigController;
});
