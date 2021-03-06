define(['exports', './AbstractWidgetController.min.js', './PictureDialogController.min.js'], function (exports, _AbstractWidgetControllerMin, _PictureDialogControllerMin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PictureController = undefined;

  var _AbstractWidgetControllerMin2 = _interopRequireDefault(_AbstractWidgetControllerMin);

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

  var PictureController = exports.PictureController = function () {
    function PictureController($scope, $rootScope, $element, $mdDialog, $timeout) {
      _classCallCheck(this, PictureController);

      this.$element = $element;
      this.$mdDialog = $mdDialog;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$timeout = $timeout;
    }

    _createClass(PictureController, [{
      key: 'openDialog',
      value: function openDialog() {
        this.$mdDialog.show({
          templateUrl: this.$rootScope.templateBaseUrl + '/dialog/picture-upload.html',
          clickOutsideToClose: true,
          parent: document.body,
          locals: {
            images: this.images,
            scope: this.$scope,
            rootScope: this.$rootScope
          },
          controller: _PictureDialogControllerMin.PictureDialogController.name,
          controllerAs: 'ctrl'
        });
      }
    }, {
      key: '$onInit',
      value: function $onInit() {
        this.$element.dblclick(this.openDialog.bind(this));
        var imageAttr = this.$element[0].getAttribute('images');

        if (imageAttr && JSON.parse(imageAttr)) {
          this.images = JSON.parse(imageAttr);
        } else {
          if (this.$scope.data.fallback_image && !this.images) {
            this.images = {
              xl: this.$scope.data.fallback_image
            };
          }
        }
      }
    }]);

    return PictureController;
  }();
});
