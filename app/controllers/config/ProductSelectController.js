define(['exports', 'jquery', 'Magento_Ui/js/modal/confirm', 'prototype', 'mage/adminhtml/grid', 'extjs/ext-tree'], function (exports, _jquery, _confirm) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _confirm2 = _interopRequireDefault(_confirm);

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

    var ProductSelectController = function () {
        function ProductSelectController($rootScope, $scope, $element, $q, $log) {
            _classCallCheck(this, ProductSelectController);

            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$log = $log;
            this.$scope = $scope;
            this.$scope.$element = $element;
            this.$scope.productId = null;
            this.$scope.productData = null;

            this.initEventListeners();
        }

        _createClass(ProductSelectController, [{
            key: 'initEventListeners',
            value: function initEventListeners() {
                this.$scope.$on('beforeSave', this.beforeSave.bind(this));
            }
        }, {
            key: 'beforeSave',
            value: function beforeSave() {}
        }, {
            key: 'save',
            value: function save() {
                this.$scope.$emit('onSaveData', {
                    scope: this.$scope,
                    data: {
                        productId: this.$scope.productId,
                        product: this.$scope.productData
                    }
                });
            }
        }, {
            key: 'preview',
            value: function preview() {
                this.$scope.$emit('onPreviewData', {
                    scope: this.$scope,
                    data: {
                        productId: this.$scope.productId,
                        product: this.$scope.productData
                    }
                });
            }
        }, {
            key: 'loadProduct',
            value: function loadProduct(productId) {
                var _this = this;

                return this.$q(function (resolve, reject) {
                    (0, _jquery2.default)('body').trigger('processStart');

                    _jquery2.default.ajax({
                        method: 'GET',
                        url: '/enhancedcms/builder/load/id/' + productId + '/page/' + _this.$rootScope.pageId
                    }).done(function (res) {
                        if (res.error) {
                            reject(res.error);
                        } else {
                            resolve(res.product);
                        }

                        (0, _jquery2.default)('body').trigger('processStop');
                    });
                });
            }
        }, {
            key: 'selectProduct',
            value: function selectProduct() {
                var _this2 = this;

                (0, _jquery2.default)('body').trigger('processStart');

                window.FORM_KEY = (0, _jquery2.default)('[name="form_key"]').first().val();

                _jquery2.default.ajax({
                    method: "GET",
                    url: this.$rootScope.productListUrl,
                    data: { element_value: this.$scope.productId, element_label: "Not Selected" }
                }).done(function (res) {
                    if (res.error) {
                        return;
                    }

                    var popup = (0, _confirm2.default)({
                        content: res,
                        buttons: []
                    });

                    var grid = new varienGrid('product_grid', _this2.$rootScope.productListUrl);

                    var gridRowClick = function gridRowClick(event) {
                        var data = {};
                        data.id = (0, _jquery2.default)(event.target).parent('tr').find('.col-id').html().trim();
                        popup.trigger('closeModal');

                        _this2.$scope.productId = data.id;
                        _this2.loadProduct(_this2.$scope.productId).then(function (data) {
                            _this2.$scope.productData = data;
                            _this2.preview();
                        });

                        varienGlobalEvents.removeEventHandler('gridRowClick', gridRowClick);
                    };

                    varienGlobalEvents.attachEventHandler('gridRowClick', gridRowClick);

                    (0, _jquery2.default)('body').trigger('processStop');
                });
            }
        }]);

        return ProductSelectController;
    }();

    exports.default = ProductSelectController;
});
