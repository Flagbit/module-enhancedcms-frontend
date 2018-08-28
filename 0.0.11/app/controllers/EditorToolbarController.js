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

    var EditorToolbarController = function () {
        function EditorToolbarController($rootScope, $scope, $compile, $log, $translate, $mdDialog, $mdToast) {
            _classCallCheck(this, EditorToolbarController);

            this.$rootScope = $rootScope;
            this.$scope = $scope;

            this.$compile = $compile;
            this.$log = $log;
            this.$translate = $translate;

            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;

            this.$scope.previewActive = false;
        }

        _createClass(EditorToolbarController, [{
            key: 'initEventListeners',
            value: function initEventListeners() {
                _get(EditorToolbarController.prototype.__proto__ || Object.getPrototypeOf(EditorToolbarController.prototype), 'initEventListeners', this).call(this);
            }
        }, {
            key: 'getTemplateFile',
            value: function getTemplateFile() {
                return 'editor-toolbar.html';
            }
        }, {
            key: 'showSourceCode',
            value: function showSourceCode() {
                var _this = this;

                var s = this.$mdDialog.show({
                    templateUrl: this.$rootScope.templateBaseUrl + '/dialog/source-code.html',
                    clickOutsideToClose: true,
                    parent: document.body,
                    locals: {
                        content: (0, _jquery2.default)('#ecms-page-content').html().trim()
                    },
                    controller: 'DialogController'
                }).then(function (answer) {
                    if (answer) {
                        if (answer.content) {
                            (0, _jquery2.default)('#ecms-page-content').html('').append(_this.$compile(answer.content)(_this.$scope));
                        } else if (answer.content == '') {
                            (0, _jquery2.default)('#ecms-page-content').html('');
                        }
                    }
                });
            }
        }, {
            key: 'previewPage',
            value: function previewPage() {
                var container = (0, _jquery2.default)("#ecms-builder");
                if (!this.$scope.previewActive) {
                    container.addClass('ecms-preview');
                    this.$rootScope.$broadcast('beforePagePreview');
                } else {
                    this.$rootScope.$broadcast('afterPagePreview');
                    container.removeClass('ecms-preview');
                }

                this.$scope.previewActive = !this.$scope.previewActive;
                this.$rootScope.$safeApply(this.$scope);
            }
        }, {
            key: 'openPage',
            value: function openPage() {
                window.open(document.location.origin + document.location.pathname, '_blank');
            }
        }, {
            key: 'unwrapFromEcmsWidgetLink',
            value: function unwrapFromEcmsWidgetLink(tag, el) {
                el.find(tag).each(function (_, el) {
                    if (el.parentElement.tagName.toLowerCase() === 'a' && el.parentElement.getAttribute('class') === 'ecms-widget-link') {
                        var ecmsWidgetLink = el.parentElement;
                        el.parentElement.parentElement.appendChild(el);
                        ecmsWidgetLink.parentElement.removeChild(ecmsWidgetLink);
                    }
                });
            }
        }, {
            key: 'unpackTranscludedComponentsContent',
            value: function unpackTranscludedComponentsContent(tag, el) {
                this.unpackHTMLFromInnerTag(tag, 'ng-transclude, [ng-transclude]', el);
            }
        }, {
            key: 'unpackTextFromInnerTag',
            value: function unpackTextFromInnerTag(parentTag, innerTag, el) {
                var fallbackText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

                el.find(parentTag).each(function (_, el) {
                    var innerEl = el.querySelector(innerTag);
                    el.innerText = innerEl ? innerEl.innerText : fallbackText;
                });
            }
        }, {
            key: 'unpackHTMLFromInnerTag',
            value: function unpackHTMLFromInnerTag(parentTag, innerTag, el) {
                var fallbackHTML = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

                el.find(parentTag).each(function (_, el) {
                    var innerEl = el.querySelector(innerTag);
                    el.innerHTML = innerEl ? innerEl.innerHTML : fallbackHTML;
                });
            }
        }, {
            key: 'deleteHTMLContent',
            value: function deleteHTMLContent(tag, el) {
                el.find(tag).html('');
            }
        }, {
            key: 'deleteClass',
            value: function deleteClass(tag, el) {
                el.find(tag).attr('class', '');
            }
        }, {
            key: 'tidyUpBeyerIcon',
            value: function tidyUpBeyerIcon(el) {
                var TAG = 'beyer-icon';
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpVideoBg',
            value: function tidyUpVideoBg(el) {
                // get element
                var SELECTOR = '[video-id]';
                var videoEl = el.find(SELECTOR);
                // reset tag (rename tag, remove class, remove style)
                var resetEl = angular.element(document.createElement('video-bg'));
                resetEl.attr('video-id', videoEl.attr('video-id'));
                resetEl.attr('ratio', videoEl.attr('ratio'));
                resetEl.attr('content-z-index', videoEl.attr('content-z-index'));
                // copy content
                // resetEl.html(videoEl.html());
                // remove rendered element
                resetEl.insertBefore(videoEl);
                // ==> videoEl.parentNode.insertBefore(resetEl, videoEl);
                videoEl.remove();
                // ==> videoEl.parentNode.removeChild(videoEl);
                // reset siblings (remove style)
                resetEl.siblings().removeAttr('style');
                // reset parent (remove style)
                resetEl.parent().removeAttr('style');
                /*
                const TAG = 'video-bg';
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
                */
            }
        }, {
            key: 'tidyUpBeyerCategoryProducts',
            value: function tidyUpBeyerCategoryProducts(el) {
                var TAG = 'beyer-widget-category-products';
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpBeyerAttributesComponent',
            value: function tidyUpBeyerAttributesComponent(el) {
                var TAG = 'beyer-attributes';
                this.unwrapFromEcmsWidgetLink(TAG + ', div.attribute-filter', el);
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpPictureComponent',
            value: function tidyUpPictureComponent(el) {
                var TAG = 'picture-component';
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpWidgetProducts',
            value: function tidyUpWidgetProducts(el) {
                var TAG = 'widget-products';
                this.deleteHTMLContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpBeyerButton',
            value: function tidyUpBeyerButton(el) {
                var TAG = 'beyer-button';
                this.unpackTextFromInnerTag(TAG, 'span', el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpBeyerTileReference',
            value: function tidyUpBeyerTileReference(el) {
                var TAG = 'beyer-tile-reference';
                this.unpackTranscludedComponentsContent(TAG, el);
                this.deleteClass(TAG, el);
            }
        }, {
            key: 'tidyUpTileAnimated',
            value: function tidyUpTileAnimated(el) {
                this.unpackTranscludedComponentsContent('beyer-tile-animated', el);
            }
        }, {
            key: 'tidyUpCarousel',
            value: function tidyUpCarousel(el) {
                el.find('.carousel .carousel-item').attr('style', '');
                el.find('.carousel .carousel-item img[data-widget]').each(function (index, el) {
                    var stillPlaceholder = el.src.slice(0, 5) === 'data:';
                    if (!stillPlaceholder) {
                        el.removeAttribute('data-src');
                        //el.removeAttribute('data-holder-rendered');
                        el.removeAttribute('style');
                    }
                });
            }
        }, {
            key: 'prepareVideoBg',
            value: function prepareVideoBg(el) {
                console.log(el);
                var SELECTOR = '[video-id]';
                var videoEl = el.find(SELECTOR);
                console.log(videoEl);
                var scope = angular.element(videoEl.get(0)).scope();
                console.log(scope);
            }
        }, {
            key: 'removeEditorElements',
            value: function removeEditorElements(el) {
                this.prepareVideoBg(el);
                el.find('.md-panel-outer-wrapper, .ecms-tidyup').remove();
                // el.find('*').not('iframe, iframe *').each((idx, currentEl) => {
                el.find('*').not('iframe *').each(function (idx, currentEl) {
                    var $currentEl = (0, _jquery2.default)(currentEl);

                    if (currentEl.nodeName !== 'IFRAME') {
                        $currentEl.contents().filter(function (i, el) {
                            return el.nodeType == 8;
                        }).each(function (i, e) {
                            (0, _jquery2.default)(e).remove();
                        });
                    }

                    if ($currentEl.hasClass('cke_image_resizer') || $currentEl.hasClass('cke_reset')) {
                        $currentEl.remove();
                        return;
                    }

                    if (typeof currentEl.attributes !== 'undefined') {
                        var attributes = _jquery2.default.map(currentEl.attributes, function (item) {
                            var name = item.name;
                            if (name.startsWith('ng-')) {
                                return name;
                            }
                            if (name.startsWith('ecms-')) return name;
                            if (name.startsWith('cke-')) return name;
                            if (name.startsWith('data-cke-')) return name;
                            if (name.startsWith('contenteditable')) return name;
                        });

                        _jquery2.default.each(attributes, function (i, item) {
                            $currentEl.removeAttr(item);
                        });
                    }

                    if (typeof currentEl.className !== 'undefined') {
                        var regex = /\s(cke_.*?)(?=\s)/g;
                        currentEl.className = currentEl.className.replace(regex, '');
                        regex = /\s(ng-.*?)(?=\s)/g;
                        currentEl.className = currentEl.className.replace(regex, '');
                    }
                });
            }
        }, {
            key: 'removeUIElements',
            value: function removeUIElements(html) {
                var UI_SELECTORS = ['.ecms-ui'];
                html.find(UI_SELECTORS.join(',')).remove();
            }
        }, {
            key: 'savePage',
            value: function savePage() {
                var _this2 = this;

                this.$rootScope.$emit('startProcess');
                this.$rootScope.$broadcast('beforePageSave');

                var el = (0, _jquery2.default)('#ecms-page-content');
                this.removeUIElements(el);

                var tidyUps = ['BeyerButton', 'BeyerIcon', 'BeyerCategoryProducts', 'BeyerAttributesComponent', 'PictureComponent', 'WidgetProducts', 'BeyerTileReference', 'TileAnimated', 'Carousel', 'VideoBg'];
                for (var i = 0, name, func; name = tidyUps[i]; i++) {
                    func = 'tidyUp' + name;
                    if (func in this && typeof this[func] === 'function') {
                        this[func](el);
                    }
                }

                var content = el.clone();
                this.removeEditorElements(content);
                content = content.html();

                _jquery2.default.ajax({
                    url: this.$rootScope.saveUrl,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'id': this.$rootScope.id,
                        'content': content,
                        'builder_content': el.html(),
                        'config': ''
                    },
                    success: function success(response) {
                        _this2.$rootScope.$emit('stopProcess');

                        _this2.$mdToast.show(_this2.$mdToast.simple().textContent(response.message).position('bottom left').hideDelay(3000));

                        // Clone and replace the editor content to remove all previous event
                        // listeners that might otherwise get duplicated from subsequent compiling.
                        var clonedEl = el.clone();
                        el.replaceWith(clonedEl);
                        _this2.$compile(clonedEl)(_this2.$scope);

                        _this2.$rootScope.$broadcast('afterPageSave');
                    },
                    error: function error(response) {
                        _this2.$rootScope.$emit('stopProcess');

                        _this2.$translate('Error occured').then(function (translated) {
                            _this2.$mdToast.show(_this2.$mdToast.simple().textContent(translated).position('bottom left').hideDelay(3000));
                        });
                    }
                });
            }
        }, {
            key: 'toggleTemplates',
            value: function toggleTemplates() {
                this.$rootScope.$emit('toggleTemplates');
            }
        }, {
            key: 'responsive',
            value: function responsive() {
                var px = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var pageWrapper = (0, _jquery2.default)('.page-wrapper').first();
                var viewportSize = (0, _jquery2.default)(window).width();

                if (!px) {
                    px = viewportSize;
                }

                pageWrapper.css('margin', 'auto');
                pageWrapper.css('box-shadow', '0 5px 30px rgba(43,135,218,.2)');

                if (pageWrapper.css('max-width') == 'none') pageWrapper.css('max-width', viewportSize);
                pageWrapper.animate({
                    'max-width': px
                }, 1000, 'easeOutBounce');

                (0, _jquery2.default)('head meta[name=viewport]').attr('content', 'width=' + px + ', initial-scale=1, maximum-scale=1.0, user-scalable=no');
                document.body.style.opacity = .9999;
                setTimeout(function () {
                    document.body.style.opacity = 1;
                }, 1);
            }
        }]);

        return EditorToolbarController;
    }();

    exports.default = EditorToolbarController;
});
