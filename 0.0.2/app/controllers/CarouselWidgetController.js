define(['exports', './WidgetController.min.js', 'jquery', 'Holder'], function (exports, _WidgetControllerMin, _jquery, _Holder) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _WidgetControllerMin2 = _interopRequireDefault(_WidgetControllerMin);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _Holder2 = _interopRequireDefault(_Holder);

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

    var TEMPLATE_SLIDE = '<div class="carousel-item" ecms-editor>\n  <img class="d-block img-fluid" data-src="holder.js/2000x400" />\n  <div class="carousel-caption-bottom d-none d-md-block">\n    <h3>Carousel Caption</h3>\n  </div>\n</div>';

    var CarouselController = function (_WidgetController) {
        _inherits(CarouselController, _WidgetController);

        function CarouselController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            _classCallCheck(this, CarouselController);

            var _this = _possibleConstructorReturn(this, (CarouselController.__proto__ || Object.getPrototypeOf(CarouselController)).apply(this, arguments));

            console.log('CONSTRUCT CAROUSEL WIDGET');
            _this.$compile = $compile;
            _this.$scope = $scope;
            _this.$element = $element;

            var lastSlide = $element.find('.carousel-item').last();
            _this.insertAddSlideBtn(lastSlide);

            _this.$scope.$on('stopProcess', function () {
                _Holder2.default.run({
                    images: document.getElementById($element.attr('id')).querySelectorAll('img')
                });
            });

            _this.$scope.slickConfig = {};
            return _this;
        }

        _createClass(CarouselController, [{
            key: 'getSlickConfig',
            value: function getSlickConfig() {
                return this.$scope.slickConfig;
            }
        }, {
            key: 'addSlide',
            value: function addSlide() {
                console.log('ADD SLIDE');
                var slide = _jquery2.default.parseHTML(TEMPLATE_SLIDE);
                (0, _jquery2.default)(slide).insertAfter(this.$element.find('.carousel-item').last());
                var image = slide[0].getElementsByTagName('img')[0];
                console.log(image);
                _Holder2.default.run({
                    images: slide[0].getElementsByTagName('img')[0]
                });
                this.$compile(slide)(this.$scope);
            }
        }, {
            key: 'insertAddSlideBtn',
            value: function insertAddSlideBtn(lastSlide) {
                console.log('sdfghj', lastSlide);
                //let btn = $.parseHTML('<md-button class="md-fab md-primary ecms-ui" ng-click="ctrl.addSlide()" aria-label="Add Slide"><md-icon md-font-icon="mdi" class="mdi-plus"></md-icon></md-button>');
                var btn = _jquery2.default.parseHTML('<button class="ecms-ui md-button md-primary md-raised " ng-click="ctrl.addSlide()">Add Slide</button>');
                console.log('BTN', btn);
                //$(btn).click( this.addSlide.apply(this, $lastSlide) );
                this.$compile(btn)(this.$scope);
                (0, _jquery2.default)(btn).insertAfter(lastSlide);
            }
        }]);

        return CarouselController;
    }(_WidgetControllerMin2.default);

    exports.default = CarouselController;
});
