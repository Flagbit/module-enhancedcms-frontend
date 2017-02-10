define(['exports', 'jquery', 'Flagbit_EnhancedCMS/js/ckeditor/ckeditor', './controllers/ContentController.js', './controllers/DialogController.js', './controllers/ConfigController.js', './controllers/ContainerController.js', './controllers/WidgetController.js', './controllers/ContainerWidgetController.js', './controllers/ContainerItemWidgetController.js', './controllers/CarouselWidgetController.js', './controllers/EditorController.js', './controllers/EditorToolbarController.js', './controllers/WidgetListController.js', './controllers/config/ProductSelectController.js', './controllers/config/ImageSelectController.js', './controllers/config/SizeUnitController.js', './controllers/config/OpacityController.js', './controllers/PanelController.js', './services/PanelService.js', './services/PanelBarService.js', './directives/DragDirective.js', './directives/WidgetDirective.js', './directives/ContainerWidgetDirective.js', './directives/ContainerItemWidgetDirective.js', './directives/CarouselWidgetDirective.js', './directives/StrictClassDirective.js', './directives/StrictSrcDirective.js', './directives/EditorDirective.js', './directives/WidgetListDirective.js', './directives/config/ProductSelectDirective.js', './directives/config/ImageSelectDirective.js', './directives/config/SizeUnitDirective.js', './directives/config/OpacityDirective.js', 'angular/angular.min', 'angular-animate/angular-animate', 'angular-aria/angular-aria', 'angular-material/angular-material', 'angular-messages/angular-messages', 'angular-redactor/angular-redactor', 'angular-sanitize/angular-sanitize', 'angular-dragdrop/src/angular-dragdrop', 'angular-resizable/src/angular-resizable', 'angular-translate/angular-translate', 'angular-ui-mask/dist/mask', 'ng-file-upload/ng-file-upload', 'spectrum/spectrum', 'jqueryui-touch-punch/jquery.ui.touch-punch', 'ckeditor/adapters/jquery'], function (exports, _jquery, _ckeditor, _ContentController, _DialogController, _ConfigController, _ContainerController, _WidgetController, _ContainerWidgetController, _ContainerItemWidgetController, _CarouselWidgetController, _EditorController, _EditorToolbarController, _WidgetListController, _ProductSelectController, _ImageSelectController, _SizeUnitController, _OpacityController, _PanelController, _PanelService, _PanelBarService, _DragDirective, _WidgetDirective, _ContainerWidgetDirective, _ContainerItemWidgetDirective, _CarouselWidgetDirective, _StrictClassDirective, _StrictSrcDirective, _EditorDirective, _WidgetListDirective, _ProductSelectDirective, _ImageSelectDirective, _SizeUnitDirective, _OpacityDirective) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _ckeditor2 = _interopRequireDefault(_ckeditor);

    var _ContentController2 = _interopRequireDefault(_ContentController);

    var _DialogController2 = _interopRequireDefault(_DialogController);

    var _ConfigController2 = _interopRequireDefault(_ConfigController);

    var _ContainerController2 = _interopRequireDefault(_ContainerController);

    var _WidgetController2 = _interopRequireDefault(_WidgetController);

    var _ContainerWidgetController2 = _interopRequireDefault(_ContainerWidgetController);

    var _ContainerItemWidgetController2 = _interopRequireDefault(_ContainerItemWidgetController);

    var _CarouselWidgetController2 = _interopRequireDefault(_CarouselWidgetController);

    var _EditorController2 = _interopRequireDefault(_EditorController);

    var _EditorToolbarController2 = _interopRequireDefault(_EditorToolbarController);

    var _WidgetListController2 = _interopRequireDefault(_WidgetListController);

    var _ProductSelectController2 = _interopRequireDefault(_ProductSelectController);

    var _ImageSelectController2 = _interopRequireDefault(_ImageSelectController);

    var _SizeUnitController2 = _interopRequireDefault(_SizeUnitController);

    var _OpacityController2 = _interopRequireDefault(_OpacityController);

    var _PanelController2 = _interopRequireDefault(_PanelController);

    var _PanelService2 = _interopRequireDefault(_PanelService);

    var _PanelBarService2 = _interopRequireDefault(_PanelBarService);

    var _DragDirective2 = _interopRequireDefault(_DragDirective);

    var _WidgetDirective2 = _interopRequireDefault(_WidgetDirective);

    var _ContainerWidgetDirective2 = _interopRequireDefault(_ContainerWidgetDirective);

    var _ContainerItemWidgetDirective2 = _interopRequireDefault(_ContainerItemWidgetDirective);

    var _CarouselWidgetDirective2 = _interopRequireDefault(_CarouselWidgetDirective);

    var _StrictClassDirective2 = _interopRequireDefault(_StrictClassDirective);

    var _StrictSrcDirective2 = _interopRequireDefault(_StrictSrcDirective);

    var _EditorDirective2 = _interopRequireDefault(_EditorDirective);

    var _WidgetListDirective2 = _interopRequireDefault(_WidgetListDirective);

    var _ProductSelectDirective2 = _interopRequireDefault(_ProductSelectDirective);

    var _ImageSelectDirective2 = _interopRequireDefault(_ImageSelectDirective);

    var _SizeUnitDirective2 = _interopRequireDefault(_SizeUnitDirective);

    var _OpacityDirective2 = _interopRequireDefault(_OpacityDirective);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    //import 'angular-cookies/angular-cookies';
    var app = angular.module('enhancedcms', ['ngMaterial', 'ngDragDrop', 'ngSanitize', 'ngFileUpload', 'angularResizable', 'ui.mask', 'pascalprecht.translate']).controller('ContentController', _ContentController2.default).controller('DialogController', _DialogController2.default).controller('ConfigController', _ConfigController2.default).controller('ContainerController', _ContainerController2.default).controller('WidgetController', _WidgetController2.default).controller('ContainerWidgetController', _ContainerWidgetController2.default).controller('ContainerItemWidgetController', _ContainerItemWidgetController2.default).controller('CarouselWidgetController', _CarouselWidgetController2.default).controller('EditorController', _EditorController2.default).controller('EditorToolbarController', _EditorToolbarController2.default).controller('WidgetListController', _WidgetListController2.default).controller('ProductSelectController', _ProductSelectController2.default).controller('ImageSelectController', _ImageSelectController2.default).controller('SizeUnitController', _SizeUnitController2.default).controller('OpacityController', _OpacityController2.default).controller('PanelController', _PanelController2.default).directive('dragElement', _DragDirective2.default).directive('ecmsWidgetDirective', _WidgetDirective2.default).directive('ecmsContainerWidgetDirective', _ContainerWidgetDirective2.default).directive('ecmsContainerItemWidgetDirective', _ContainerItemWidgetDirective2.default).directive('ecmsCarouselWidgetDirective', _CarouselWidgetDirective2.default).directive('ngClassStrict', _StrictClassDirective2.default).directive('ngSrcStrict', _StrictSrcDirective2.default).directive('ecmsEditor', _EditorDirective2.default).directive('ecmsWidgetList', _WidgetListDirective2.default).directive('ecmsConfigProductSelect', _ProductSelectDirective2.default).directive('ecmsConfigImageSelect', _ImageSelectDirective2.default).directive('ecmsConfigSizeUnit', _SizeUnitDirective2.default).directive('ecmsConfigOpacity', _OpacityDirective2.default).service('ecmsPanel', _PanelService2.default).service('ecmsPanelBar', _PanelBarService2.default).factory('translationsLoader', function ($http, $q) {
        // return loaderFn
        return function (options) {
            var deferred = $q.defer();

            _jquery2.default.getJSON(window.builderData.translationsUrl, { lang: options.key }).done(function (res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        };
    }).config(function ($mdThemingProvider, $logProvider, $compileProvider, $translateProvider, $interpolateProvider) {
        //
        // Make angular use other characters than double-curly-braces
        // to prevent conflicts between angular and magento widgets 
        //
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        var flagbitPalette = $mdThemingProvider.extendPalette('blue', {
            '500': '#1972ad'
        });
        $mdThemingProvider.definePalette('flagbit', flagbitPalette);

        $mdThemingProvider.theme('default').primaryPalette('flagbit');

        $logProvider.debugEnabled(true);

        //$compileProvider.debugInfoEnabled(false);

        $translateProvider.useLoader('translationsLoader');
        $translateProvider.preferredLanguage(window.builderData.translationsLocale);
    }).filter('trustedUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    angular.bootstrap(document.getElementById('ecms-builder'), ['enhancedcms']);

    window.ECMS_addLinks = function () {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        angular.element(document.getElementById('ecms-builder')).injector().invoke(function ($rootScope, $compile) {
            if (el == null) {
                el = (0, _jquery2.default)('#ecms-builder');
            }

            el.find('.ecms-widget-content').each(function (i, el) {
                var $el = (0, _jquery2.default)(el);

                var linkElement = (0, _jquery2.default)('<a />', {
                    'ng-attr-href': '{[{data.widgetLink}]}',
                    'class': 'ecms-widget-link',
                    html: $el.html()
                });

                $el.html(linkElement);

                var newElement = $compile($el.prop('outerHTML'))($rootScope);
                $el.replaceWith(newElement);
            });
        });
    };

    exports.default = angular.module('enhancedcms');
});
