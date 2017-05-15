define(['exports', 'jquery', 'ckeditor/ckeditor', './configs/CONSTANTS.min.js', './controllers/ContentController.min.js', './controllers/DialogController.min.js', './controllers/ConfigController.min.js', './controllers/ContainerController.min.js', './controllers/WidgetController.min.js', './controllers/ContainerWidgetController.min.js', './controllers/ContainerItemWidgetController.min.js', './controllers/CarouselWidgetController.min.js', './controllers/EditorController.min.js', './controllers/EditorToolbarController.min.js', './controllers/InterfaceController.min.js', './controllers/WidgetListController.min.js', './controllers/config/ProductSelectController.min.js', './controllers/config/ImageSelectController.min.js', './controllers/config/SizeUnitController.min.js', './controllers/config/YoutubeIdController.min.js', './controllers/config/OpacityController.min.js', './controllers/PanelController.min.js', './services/PanelService.min.js', './services/PanelBarService.min.js', './directives/DragDirective.min.js', './directives/WidgetDirective.min.js', './directives/ContainerWidgetDirective.min.js', './directives/ContainerItemWidgetDirective.min.js', './directives/CarouselWidgetDirective.min.js', './directives/StrictClassDirective.min.js', './directives/StrictSrcDirective.min.js', './directives/EditorDirective.min.js', './directives/InterfaceDirective.min.js', './directives/WidgetListDirective.min.js', './directives/EditorToolbarDirective.min.js', './directives/config/ProductSelectDirective.min.js', './directives/config/ImageSelectDirective.min.js', './directives/config/SizeUnitDirective.min.js', './directives/config/YoutubeIdDirective.min.js', './directives/config/OpacityDirective.min.js', 'ckeditor/adapters/jquery', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-aria.min.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.min.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-messages.min.js', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.min.js', 'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js', 'https://cdn.rawgit.com/codef0rmer/angular-dragdrop/gh-pages/angular-dragdrop.min.js', 'https://cdn.rawgit.com/Reklino/angular-resizable/master/angular-resizable.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/angular-translate/2.14.0/angular-translate.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-mask/1.8.7/mask.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/12.2.13/ng-file-upload.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js'], function (exports, _jquery, _ckeditor, _CONSTANTSMin, _ContentControllerMin, _DialogControllerMin, _ConfigControllerMin, _ContainerControllerMin, _WidgetControllerMin, _ContainerWidgetControllerMin, _ContainerItemWidgetControllerMin, _CarouselWidgetControllerMin, _EditorControllerMin, _EditorToolbarControllerMin, _InterfaceControllerMin, _WidgetListControllerMin, _ProductSelectControllerMin, _ImageSelectControllerMin, _SizeUnitControllerMin, _YoutubeIdControllerMin, _OpacityControllerMin, _PanelControllerMin, _PanelServiceMin, _PanelBarServiceMin, _DragDirectiveMin, _WidgetDirectiveMin, _ContainerWidgetDirectiveMin, _ContainerItemWidgetDirectiveMin, _CarouselWidgetDirectiveMin, _StrictClassDirectiveMin, _StrictSrcDirectiveMin, _EditorDirectiveMin, _InterfaceDirectiveMin, _WidgetListDirectiveMin, _EditorToolbarDirectiveMin, _ProductSelectDirectiveMin, _ImageSelectDirectiveMin, _SizeUnitDirectiveMin, _YoutubeIdDirectiveMin, _OpacityDirectiveMin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _ckeditor2 = _interopRequireDefault(_ckeditor);

    var _ContentControllerMin2 = _interopRequireDefault(_ContentControllerMin);

    var _DialogControllerMin2 = _interopRequireDefault(_DialogControllerMin);

    var _ConfigControllerMin2 = _interopRequireDefault(_ConfigControllerMin);

    var _ContainerControllerMin2 = _interopRequireDefault(_ContainerControllerMin);

    var _WidgetControllerMin2 = _interopRequireDefault(_WidgetControllerMin);

    var _ContainerWidgetControllerMin2 = _interopRequireDefault(_ContainerWidgetControllerMin);

    var _ContainerItemWidgetControllerMin2 = _interopRequireDefault(_ContainerItemWidgetControllerMin);

    var _CarouselWidgetControllerMin2 = _interopRequireDefault(_CarouselWidgetControllerMin);

    var _EditorControllerMin2 = _interopRequireDefault(_EditorControllerMin);

    var _EditorToolbarControllerMin2 = _interopRequireDefault(_EditorToolbarControllerMin);

    var _InterfaceControllerMin2 = _interopRequireDefault(_InterfaceControllerMin);

    var _WidgetListControllerMin2 = _interopRequireDefault(_WidgetListControllerMin);

    var _ProductSelectControllerMin2 = _interopRequireDefault(_ProductSelectControllerMin);

    var _ImageSelectControllerMin2 = _interopRequireDefault(_ImageSelectControllerMin);

    var _SizeUnitControllerMin2 = _interopRequireDefault(_SizeUnitControllerMin);

    var _YoutubeIdControllerMin2 = _interopRequireDefault(_YoutubeIdControllerMin);

    var _OpacityControllerMin2 = _interopRequireDefault(_OpacityControllerMin);

    var _PanelControllerMin2 = _interopRequireDefault(_PanelControllerMin);

    var _PanelServiceMin2 = _interopRequireDefault(_PanelServiceMin);

    var _PanelBarServiceMin2 = _interopRequireDefault(_PanelBarServiceMin);

    var _DragDirectiveMin2 = _interopRequireDefault(_DragDirectiveMin);

    var _WidgetDirectiveMin2 = _interopRequireDefault(_WidgetDirectiveMin);

    var _ContainerWidgetDirectiveMin2 = _interopRequireDefault(_ContainerWidgetDirectiveMin);

    var _ContainerItemWidgetDirectiveMin2 = _interopRequireDefault(_ContainerItemWidgetDirectiveMin);

    var _CarouselWidgetDirectiveMin2 = _interopRequireDefault(_CarouselWidgetDirectiveMin);

    var _StrictClassDirectiveMin2 = _interopRequireDefault(_StrictClassDirectiveMin);

    var _StrictSrcDirectiveMin2 = _interopRequireDefault(_StrictSrcDirectiveMin);

    var _EditorDirectiveMin2 = _interopRequireDefault(_EditorDirectiveMin);

    var _InterfaceDirectiveMin2 = _interopRequireDefault(_InterfaceDirectiveMin);

    var _WidgetListDirectiveMin2 = _interopRequireDefault(_WidgetListDirectiveMin);

    var _EditorToolbarDirectiveMin2 = _interopRequireDefault(_EditorToolbarDirectiveMin);

    var _ProductSelectDirectiveMin2 = _interopRequireDefault(_ProductSelectDirectiveMin);

    var _ImageSelectDirectiveMin2 = _interopRequireDefault(_ImageSelectDirectiveMin);

    var _SizeUnitDirectiveMin2 = _interopRequireDefault(_SizeUnitDirectiveMin);

    var _YoutubeIdDirectiveMin2 = _interopRequireDefault(_YoutubeIdDirectiveMin);

    var _OpacityDirectiveMin2 = _interopRequireDefault(_OpacityDirectiveMin);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var config = window.ecmsConfig;

    exports.default = angular.module('enhancedcms', ['ngMaterial', 'ngDragDrop', 'ngSanitize', 'ngFileUpload', 'angularResizable', 'ui.mask', 'pascalprecht.translate']).constant('CONFIG', config).controller('ContentController', _ContentControllerMin2.default).controller('DialogController', _DialogControllerMin2.default).controller('ConfigController', _ConfigControllerMin2.default).controller('ContainerController', _ContainerControllerMin2.default).controller('WidgetController', _WidgetControllerMin2.default).controller('ContainerWidgetController', _ContainerWidgetControllerMin2.default).controller('ContainerItemWidgetController', _ContainerItemWidgetControllerMin2.default).controller('CarouselWidgetController', _CarouselWidgetControllerMin2.default).controller('EditorController', _EditorControllerMin2.default).controller('EditorToolbarController', _EditorToolbarControllerMin2.default).controller('InterfaceController', _InterfaceControllerMin2.default).controller('WidgetListController', _WidgetListControllerMin2.default).controller('ProductSelectController', _ProductSelectControllerMin2.default).controller('ImageSelectController', _ImageSelectControllerMin2.default).controller('SizeUnitController', _SizeUnitControllerMin2.default).controller('YoutubeIdController', _YoutubeIdControllerMin2.default).controller('OpacityController', _OpacityControllerMin2.default).controller('PanelController', _PanelControllerMin2.default).directive('dragElement', _DragDirectiveMin2.default).directive('ecmsWidgetDirective', _WidgetDirectiveMin2.default).directive('ecmsContainerWidgetDirective', _ContainerWidgetDirectiveMin2.default).directive('ecmsContainerItemWidgetDirective', _ContainerItemWidgetDirectiveMin2.default).directive('ecmsCarouselWidgetDirective', _CarouselWidgetDirectiveMin2.default).directive('ngClassStrict', _StrictClassDirectiveMin2.default).directive('ngSrcStrict', _StrictSrcDirectiveMin2.default).directive('ecmsEditor', _EditorDirectiveMin2.default).directive('ecmsInterface', _InterfaceDirectiveMin2.default).directive('ecmsWidgetList', _WidgetListDirectiveMin2.default).directive('ecmsEditorToolbar', _EditorToolbarDirectiveMin2.default).directive('ecmsConfigProductSelect', _ProductSelectDirectiveMin2.default).directive('ecmsConfigImageSelect', _ImageSelectDirectiveMin2.default).directive('ecmsConfigSizeUnit', _SizeUnitDirectiveMin2.default).directive('ecmsConfigYoutubeId', _YoutubeIdDirectiveMin2.default).directive('ecmsConfigOpacity', _OpacityDirectiveMin2.default).service('ecmsPanel', _PanelServiceMin2.default).service('ecmsPanelBar', _PanelBarServiceMin2.default).factory('translationsLoader', function ($http, $q, CONFIG) {
        // return loaderFn
        return function (options) {
            var deferred = $q.defer();

            _jquery2.default.getJSON(CONFIG.translationsUrl, { lang: options.key }).done(function (res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        };
    }).config(function ($mdThemingProvider, $logProvider, $compileProvider, $translateProvider, $interpolateProvider, $sceDelegateProvider, CONFIG) {
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
        $translateProvider.preferredLanguage(CONFIG.translationsLocale);

        $sceDelegateProvider.resourceUrlWhitelist(['self', config.baseUrl + '/**']);
    }).filter('trustedUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]).filter('inArray', function ($filter) {
        return function (list, arrayFilter, element) {
            if (arrayFilter) {
                return $filter("filter")(list, function (listItem) {
                    return arrayFilter.indexOf(listItem[element]) != -1;
                });
            }
        };
    });
});
