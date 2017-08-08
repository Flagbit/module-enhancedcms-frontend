define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarouselBootstrap = (function () {
        function CarouselBootstrap() {
            var carousels = document.getElementsByClassName('carousel');
            console.log('CAROUSEL BOOtSTRAP', carousels);
            if (carousels) {
                for (var i = 0; i < carousels.length; i++) {
                    var carousel = carousels[i];
                    var slides = carousel.querySelectorAll('.carousel-item');
                    this.buildDots(carousel, slides);
                    // this.buildControls(carousel);
                    this.initCarousel(slides);
                }
            }
        }
        CarouselBootstrap.prototype.initCarousel = function (slides) {
            slides[0].classList.add('active');
            return slides[0];
        };
        CarouselBootstrap.prototype.buildDots = function (carousel, slides) {
            var dotsContainer = document.createElement('ol');
            dotsContainer.classList.add('carousel-indicators');
            for (var i = 0; i < slides.length; i++) {
                var dot = document.createElement('li');
                if (i === 0)
                    dot.classList.add('active');
                dot.dataset.target = "#" + carousel.id;
                dot.dataset.slideTo = i.toString();
                dotsContainer.appendChild(dot);
            }
            carousel.appendChild(dotsContainer);
            return carousel;
        };
        CarouselBootstrap.prototype.buildControls = function (carousel) {
            var directions = ['prev', 'next'];
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var direction = directions_1[_i];
                var link = document.createElement('a');
                link.classList.add("carousel-control-" + direction);
                link.href = "#" + carousel.id;
                link.dataset.slide = direction;
                var icon = document.createElement('span');
                icon.classList.add("carousel-control-" + direction + "-icon");
                link.appendChild(icon);
                carousel.appendChild(link);
            }
            return carousel;
        };
        return CarouselBootstrap;
    }());
    exports.CarouselBootstrap = CarouselBootstrap;
});
//# sourceMappingURL=CarouselBootstrap.js.map