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

      $scope.$watch('data', function () {
        console.log('+++', $scope.data);
      });

      console.log('+', $scope.data.images);
      if (!$scope.data.images) {
        console.log('++', $scope.data.fallback_image);
        if ($scope.data.fallback_image) {
          $scope.data.images = {
            'xl': $scope.data.fallback_image
          };
        }
      }

      this.images = this.$scope.data.images || {};
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
        var _this = this;

        var widgetContainerId = this.$element.closest('.ecms-widget-directive')[0].id;
        document.body.addEventListener('dblclick', function (e) {
          var clickedWidgetContainerId = angular.element(e.target).closest('.ecms-widget-directive')[0].id;
          if (widgetContainerId === clickedWidgetContainerId) {
            _this.openDialog();
          };
        });
      }
    }]);

    return PictureController;
  }();
});
