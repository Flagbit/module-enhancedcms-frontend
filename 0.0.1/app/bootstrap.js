define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EnhancedCMSBootstrap = EnhancedCMSBootstrap;
  function EnhancedCMSBootstrap(config) {

    function loadCSS(href) {
      var headNode = document.getElementsByTagName('head')[0];
      var linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'stylesheet');
      linkTag.setAttribute('type', 'text/css');
      linkTag.setAttribute('href', href);
      headNode.appendChild(linkTag);
    }

    var ANGULAR_VERSION = '1.5.11';
    var ANGULAR_MATERIAL_VERSION = '1.1.1';

    var GOOGLE_CDN_PREFIX = 'https://ajax.googleapis.com/ajax/libs/angularjs/' + ANGULAR_VERSION;
    var DEPENDENCIES_GOGLE_CDN = [GOOGLE_CDN_PREFIX + '/angular-aria.min.js', GOOGLE_CDN_PREFIX + '/angular-animate.min.js', GOOGLE_CDN_PREFIX + '/angular-messages.min.js', GOOGLE_CDN_PREFIX + '/angular-sanitize.min.js', 'https://ajax.googleapis.com/ajax/libs/angular_material/' + ANGULAR_MATERIAL_VERSION + '/angular-material.min.js'];

    var DEPENDENCIES_GITHUB_CDN = ['https://cdn.rawgit.com/codef0rmer/angular-dragdrop/gh-pages/angular-dragdrop.min.js', 'https://cdn.rawgit.com/Reklino/angular-resizable/master/angular-resizable.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/angular-translate/2.14.0/angular-translate.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-mask/1.8.7/mask.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/12.2.13/ng-file-upload.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js'];

    var DEPENDENCIES = DEPENDENCIES_GOGLE_CDN.concat(DEPENDENCIES_GITHUB_CDN);

    var APP_ENTRY_POINT = config.baseUrl + '/app/index.min.js';

    loadCSS(config.baseUrl + '/css/styles.min.css');

    require([GOOGLE_CDN_PREFIX + '/angular.min.js'], function () {
      require(DEPENDENCIES, function () {
        require([APP_ENTRY_POINT], function (ecms) {
          ecms.default(config);
        });
      });
    });
  }
});
