define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var STYLESHEETS = [window.ecmsConfig.baseUrl + '/css/styles.min.css'];
  var BOOTSTRAP_TIMEOUT = 5000;
  var ROOT_ELEMENT = document.getElementById('ecms-builder');

  var EnhancedCMSBootstrap = function () {
    function EnhancedCMSBootstrap() {
      _classCallCheck(this, EnhancedCMSBootstrap);

      this.baseUrl = window.ecmsHost;
      this.loadCss();
      this.checkForBootstrappedApplication().then(function (result) {
        console.log('IUHUZGBN', result);
        if (!result) {
          angular.bootstrap(ROOT_ELEMENT, ['enhancedcms']);
        }
      });
    }

    _createClass(EnhancedCMSBootstrap, [{
      key: 'insertStylesheet',
      value: function insertStylesheet(href) {
        var headNode = document.getElementsByTagName('head')[0];
        var linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/css');
        linkTag.setAttribute('href', href);
        headNode.appendChild(linkTag);
      }
    }, {
      key: 'loadCss',
      value: function loadCss() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = STYLESHEETS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var stylesheet = _step.value;

            this.insertStylesheet(stylesheet);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'checkForBootstrappedApplication',
      value: function checkForBootstrappedApplication() {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(ROOT_ELEMENT.parentNode.closest('.ng-scope'));
          }, BOOTSTRAP_TIMEOUT);
        });
      }
    }]);

    return EnhancedCMSBootstrap;
  }();

  exports.default = new EnhancedCMSBootstrap();
});
