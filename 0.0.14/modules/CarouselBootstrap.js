define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarouselBootstrap = (function () {
        function CarouselBootstrap() {
            var carousels = document.querySelectorAll('.carousel:not(.carousel--alpha)');
            if (carousels) {
                for (var i = 0; i < carousels.length; i++) {
                    var carousel = carousels[i];
                    var slides = carousel.querySelectorAll('.carousel-item');
                    this.buildDots(carousel, slides);
                    this.buildControls(carousel);
                    this.attachClickHandler(slides);
                    this.initCarousel(slides);
                }
            }
        }
        CarouselBootstrap.prototype.initCarousel = function (slides) {
            slides[0].classList.add('active');
            return slides[0];
        };
        CarouselBootstrap.prototype.attachClickHandler = function (slides) {
            var openLinkHandler = function (href) { window.location.href = href; };
            for (var i = 0, slide = void 0; (slide = slides[i]); i++) {
                var button = slide.querySelector('beyer-button');
                if (button) {
                    var link = button.getAttribute('link');
                    if (link) {
                        slide.addEventListener('click', openLinkHandler.bind(this, link));
                    }
                }
            }
        };
        CarouselBootstrap.prototype.buildDots = function (carousel, slides) {
            if (carousel.querySelector('.carousel-indicators')) {
                return;
            }
            var dotsContainer = document.createElement('ol');
            dotsContainer.classList.add('carousel-indicators');
            for (var i = 0; i < slides.length; i++) {
                var dot = document.createElement('li');
                if (i === 0)
                    dot.classList.add('active');
                if (slides[i].querySelector('.icon-indicator')) {
                    dot.appendChild(slides[i].querySelector('.icon-indicator'));
                }
                dot.dataset.target = "#" + carousel.id;
                dot.dataset.slideTo = i.toString();
                dotsContainer.appendChild(dot);
            }
            carousel.appendChild(dotsContainer);
            return carousel;
        };
        CarouselBootstrap.prototype.buildControls = function (carousel) {
            if (!carousel.getElementsByClassName('carousel-control-prev').length) {
                var directions = ['prev', 'next'];
                var _loop_1 = function (direction) {
                    var link = document.createElement('a');
                    link.classList.add("carousel-control-" + direction);
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        jQuery("#" + carousel.id).carousel(direction);
                    });
                    var icon = document.createElement('span');
                    icon.classList.add("carousel-control-" + direction + "-icon");
                    link.appendChild(icon);
                    carousel.appendChild(link);
                };
                for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                    var direction = directions_1[_i];
                    _loop_1(direction);
                }
            }
            return carousel;
        };
        return CarouselBootstrap;
    }());
    exports.CarouselBootstrap = CarouselBootstrap;
});
//# sourceMappingURL=CarouselBootstrap.js.map