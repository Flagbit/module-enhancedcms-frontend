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

      /*
      if (!$scope.data.images) {
        if ($scope.data.fallback_image) {
          $scope.data.images = {
            'xl': $scope.data.fallback_image
          }
        }
      }
      */

      this.images = this.$scope.data.images || [];
    }

    _createClass(PictureController, [{
      key: 'openDialog',
      value: function openDialog() {
        this.$mdDialog.show({
          templateUrl: this.$rootScope.templateBaseUrl + '/dialog/picture-upload.html',
          clickOutsideToClose: true,
          parent: document.body,
          locals: {
            images: this.$scope.data.images[this.nthOfType],
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

        var widgetId = this.$scope.$parent.$parent.widgetId;
        var pictureComponents = jQuery('#' + widgetId + ' picture-component');
        var pictureComponent = this.$element.find('picture-component').first();
        this.nthOfType = pictureComponents.index(pictureComponent);

        if (!this.$scope.data.images) {
          this.$scope.data.images = [];
        }
        if (this.$scope.data.fallback_image && !this.$scope.data.images[this.nthOfType]) {
          this.$scope.data.images[this.nthOfType] = {
            'xl': this.$scope.data.fallback_image
          };
        }
      }
    }]);

    return PictureController;
  }();
});
