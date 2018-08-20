define(["require", "exports", "./CarouselBootstrap"], function (require, exports, CarouselBootstrap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TEMPLATE = "<div id=\"carouselExampleSlidesOnly\" class=\"carousel slide\" data-ride=\"carousel\">\n  <div class=\"carousel-inner\" role=\"listbox\">\n    <div class=\"carousel-item\">\n      <h1>First Slide</h1>\n    </div>\n    <div class=\"carousel-item\">\n      <h1>Second Slide</h1>\n    </div>\n    <div class=\"carousel-item\">\n      <h1>Third Slide</h1>\n    </div>\n  </div>\n</div>";
    describe('CarouselBootstrap', function () {
        var container, carousel, carouselBootstrap, slides;
        beforeAll(function () {
            carouselBootstrap = new CarouselBootstrap_1.CarouselBootstrap;
            container = document.getElementById('main');
            container.innerHTML = TEMPLATE;
            carousel = document.getElementsByClassName('carousel')[0];
            slides = carousel.querySelectorAll('.carousel-item');
        });
        afterAll(function () {
            container.innerHTML = '';
        });
        it('Should set the first .carousel-item active', function () {
            var firstSlide = carouselBootstrap.initCarousel(slides);
            expect(firstSlide.classList.contains('active')).toBe(true);
        });
        it('Should build one dot for every slide and set the first one active', function () {
            var carouselWithDots = carouselBootstrap.buildDots(carousel, slides);
            var dotsContainer = carouselWithDots.getElementsByClassName('carousel-indicators');
            expect(dotsContainer.length).toBe(1);
            var dots = dotsContainer[0].getElementsByTagName('li');
            expect(dots.length).toBe(slides.length);
        });
        it('Should create one control per direction (next/prev)', function () {
            var directions = ['prev', 'next'];
            var carouselWithControls = carouselBootstrap.buildControls(carousel);
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var direction = directions_1[_i];
                var control = carouselWithControls.querySelectorAll("a.carousel-control-" + direction);
                expect(control.length).toBe(1);
            }
        });
    });
});
//# sourceMappingURL=CarouselBootstrap.spec.js.map