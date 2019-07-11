define(['exports', './WidgetController.min.js', 'jquery'], function (exports, _WidgetControllerMin, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _WidgetControllerMin2 = _interopRequireDefault(_WidgetControllerMin);

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

    var TEMPLATE_SLIDE = '<div class="carousel-item">\n    <div\n    picture-upload\n    ng-if="data.fallback_image ||\xA0data.images"\n    ng-attr-images="{[{ ctrl.images }]}">\n    <picture-component>\n    </picture-component>\n    </div>\n    <div\n    class="carousel-caption-bottom">\n    <div class="container">\n        <div class="row justify-content-center">\n        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6 col-xl-6">\n            <div class="text" ecms-editor>\n            <h3 class="light">Caption One</h3>\n            <p class="p5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aliquid molestiae repellendus fugit eveniet, placeat perferendis sunt nulla tenetur asperiores voluptatibus quia!</p>\n            </div>\n        </div>\n        </div>\n    </div>\n  </div>';

    var TEMPLATE_SLIDE_TOOLBAR = '<div style="display:none;" class="ecms-widget-toolbar" ng-class="{\'ecms-widget-toolbar-children\': true}">\n        <md-fab-speed-dial md-open="toolbarVisible" ng-class="{\'md-left\': true, \'md-right\': false}">\n            <md-fab-actions ng-cloak>\n                <div aria-label="Move up" class="md-button md-raised md-mini ecms-toolbar-item" ng-click="ctrl.moveUpSlide($event)">\n                    <md-tooltip md-direction="top">{[{ \'Move up\' | translate }]}</md-tooltip>\n                    <span class="mdi mdi-arrow-up-bold">&nbsp;</span>\n                </div>\n                <button aria-label="Move down" class="md-button md-raised md-mini ecms-toolbar-item" ng-click="ctrl.moveDownSlide($event)">\n                    <md-tooltip md-direction="top">{[{ \'Move down\' | translate }]}</md-tooltip>\n                    <span class="mdi mdi-arrow-down-bold">&nbsp;</span>\n                </button>\n                <button aria-label="Delete" class="md-button md-raised md-mini ecms-toolbar-item ecms-toolbar-delete" ng-click="ctrl.removeSlide($event)">\n                    <md-tooltip md-direction="top">{[{ \'Remove\' | translate }]}</md-tooltip>\n                    <span class="mdi mdi-delete">&nbsp;</span>\n                </button>\n            </md-fab-actions>\n        </md-fab-speed-dial>\n    </div>';

    var CarouselController = function (_WidgetController) {
        _inherits(CarouselController, _WidgetController);

        function CarouselController($rootScope, $scope, $element, $attrs, $mdDialog, $compile, $q, $log, ecmsPanel, $timeout, $translate, $templateCache, $templateRequest) {
            _classCallCheck(this, CarouselController);

            var _this = _possibleConstructorReturn(this, (CarouselController.__proto__ || Object.getPrototypeOf(CarouselController)).apply(this, arguments));

            console.log('CONSTRUCT CAROUSEL WIDGET');
            _this.$compile = $compile;
            _this.$scope = $scope;
            _this.$element = $element;

            angular.forEach($element.find('.carousel-item'), _this.insertSlideToolbar.bind(_this));

            _this.lastSlide = $element.find('.carousel-item').last();
            _this.insertAddSlideBtn(_this.lastSlide);

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
                var slide = this.lastSlide.clone();
                (0, _jquery2.default)(slide).insertAfter(this.lastSlide);
                var newSlide = this.$compile(slide)(this.$scope);
                this.insertSlideToolbar(newSlide[0]);
                this.lastSlide = newSlide;
            }
        }, {
            key: 'insertSlideToolbar',
            value: function insertSlideToolbar(slide) {
                if (slide && slide.classList.contains('carousel-item')) {
                    var toolbar = _jquery2.default.parseHTML(TEMPLATE_SLIDE_TOOLBAR);
                    this.$compile(toolbar)(this.$scope);
                    slide.appendChild(toolbar[0]);
                    slide.addEventListener('mouseenter', this.showHideSlideToolbar.bind(this, slide));
                    slide.addEventListener('mouseleave', this.showHideSlideToolbar.bind(this, slide));
                }
            }
        }, {
            key: 'insertAddSlideBtn',
            value: function insertAddSlideBtn(lastSlide) {
                // console.log('sdfghj', lastSlide);
                //let btn = $.parseHTML('<md-button class="md-fab md-primary ecms-ui" ng-click="ctrl.addSlide()" aria-label="Add Slide"><md-icon md-font-icon="mdi" class="mdi-plus"></md-icon></md-button>');
                var btn = _jquery2.default.parseHTML('<button class="ecms-ui md-button md-primary md-raised " ng-click="ctrl.addSlide()">Add Slide</button>');
                // console.log('BTN', btn)
                // $(btn).click( this.addSlide.apply(this, $lastSlide) );
                this.$compile(btn)(this.$scope);
                (0, _jquery2.default)(btn).insertAfter(lastSlide);
            }
        }, {
            key: 'showHideSlideToolbar',
            value: function showHideSlideToolbar(slide, event) {
                if (slide && slide.classList.contains('carousel-item')) {
                    var toolbar = slide.querySelector('.ecms-widget-toolbar');
                    if (toolbar) {
                        toolbar.style.display = event.type === 'mouseenter' ? 'block' : 'none';
                    }
                }
            }
        }, {
            key: 'getParentCarouselItem',
            value: function getParentCarouselItem(carouselChild) {
                var parent = carouselChild;
                while (parent && !parent.classList.contains('carousel-item')) {
                    parent = parent.parentElement;
                }

                return parent;
            }
        }, {
            key: 'swapSlides',
            value: function swapSlides(slideA, slideB) {
                if (!(slideA && slideB) || slideA === slideB || slideA.parentElement !== slideB.parentElement) {
                    return;
                }
                var parent = slideA.parentElement;
                var nextSiblingA = slideA.nextElementSibling;
                var nextSiblingB = slideB.nextElementSibling;

                if (nextSiblingA === slideB) {
                    // slideA is directly above slideB
                    parent.insertBefore(slideB, slideA);
                } else if (nextSiblingB === slideA) {
                    // slideB is directly above slideA
                    parent.insertBefore(slideA, slideB);
                } else {
                    // slideA and slideB are not adjacent
                    if (nextSiblingA) {
                        parent.insertBefore(nextSiblingA, slideB);
                    } else {
                        parent.appendChild(slideB);
                    }
                    if (nextSiblingB) {
                        parent.insertBefore(nextSiblingB, slideA);
                    } else {
                        parent.appendChild(slideA);
                    }
                }

                if (slideA === this.lastSlide) {
                    this.lastSlide = slideB;
                } else if (slideB === this.lastSlide) {
                    this.lastSlide = slideA;
                }
            }
        }, {
            key: 'moveUpSlide',
            value: function moveUpSlide(event) {
                var carouselItem = this.getParentCarouselItem(event.target);
                var prevItem = carouselItem.previousElementSibling;
                if (prevItem && prevItem.classList.contains('carousel-item')) {
                    this.swapSlides(carouselItem, carouselItem.previousElementSibling);
                }
            }
        }, {
            key: 'moveDownSlide',
            value: function moveDownSlide(event) {
                var carouselItem = this.getParentCarouselItem(event.target);
                var nextItem = carouselItem.nextElementSibling;
                if (nextItem && nextItem.classList.contains('carousel-item')) {
                    this.swapSlides(carouselItem, carouselItem.nextElementSibling);
                }
            }
        }, {
            key: 'removeSlide',
            value: function removeSlide(event) {
                if (this.$element.find('.carousel-item').length > 1) {
                    var carouselItem = this.getParentCarouselItem(event.target);
                    if (carouselItem === this.lastSlide) {
                        this.lastSlide = carouselItem.previousElementSibling;
                    }
                    carouselItem.parentElement.removeChild(carouselItem);
                }
            }
        }]);

        return CarouselController;
    }(_WidgetControllerMin2.default);

    exports.default = CarouselController;
});
