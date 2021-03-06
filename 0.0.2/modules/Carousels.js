define(
  [
      'jquery',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',
      '!domReady'
  ],
  function($) {
    var Carousels = function() {

        this.stylesheets = [
            'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        ];

        this.init = function() {
            this.loadCSS();
            this.buildTabs();
            this.initSlicks();
        };

        this.loadCSS = function() {
            for (var i = 0; i < this.stylesheets.length; i++) {
                var url = this.stylesheets[i];
                var link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = url;
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        };

        this.initSlicks = function() {
            $('.carousel').slick();
            $('.carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
                $(this.parentNode).find('button.active').removeClass('active');
                this.tabs[currentSlide].classList.add('active');
            });
        };

        this.buildTabs = function() {
            $('.carousel').each(function(index, carousel) {
                tabsWrapper = document.createElement('div');
                tabsWrapper.classList.add('carousel-tabs');
                carousel.tabs = [];
                carousel.parentNode.appendChild(tabsWrapper);
                $(carousel).find('.item').each(function(index, item){
                    var headline = $(item).find('h2').last().text().trim();
                    var tab = document.createElement('button');
                    if (index === 0) tab.classList.add('active');
                    tab.innerText = headline;
                    tab.addEventListener('click', function(e){
                        $(carousel).slick('slickGoTo', index);
                        $(carousel.parentNode).find('button.active').removeClass('active');
                        e.target.classList.add('active');
                    });
                    carousel.tabs.push(tab);
                    tabsWrapper.appendChild(tab);
                });
            });
        };
    }

    var CarouselsInstance = new Carousels;
    CarouselsInstance.init();
});