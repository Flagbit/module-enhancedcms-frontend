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

  var PictureDialogController = exports.PictureDialogController = function () {
    function PictureDialogController($mdDialog, $translate, Upload, locals) {
      _classCallCheck(this, PictureDialogController);

      this.$mdDialog = $mdDialog;
      this.$scope = locals.scope;
      this.$rootScope = locals.rootScope;
      this.$translate = $translate;
      this.Upload = Upload;
      this.uploaded = false;
      this.sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
      this.files = {};
      this.progress = {};
      this.images = locals.images;
    }

    _createClass(PictureDialogController, [{
      key: 'hide',
      value: function hide() {
        this.$mdDialog.hide();
      }
    }, {
      key: 'save',
      value: function save() {
        this.$scope.$emit('onSaveData', {
          scope: this.$scope,
          data: {
            images: this.images
          }
        });
        console.log('SAVE DATA');
        this.$mdDialog.hide();
      }
    }, {
      key: 'submitHandler',
      value: function submitHandler() {
        var _this = this;

        if (Object.keys(this.files).length) {
          var _loop = function _loop(size) {
            var file = _this.files[size];
            _this.Upload.upload({
              url: _this.$rootScope.imageUploadUrl,
              data: { file: file }
            }).then(function (resp) {
              _this.images[size] = resp.data.url;
              if (Object.keys(_this.images).length === Object.keys(_this.files).length) {
                _this.$scope.data.images = _this.images;
                /*
                this.$scope.$emit('blubb', {
                  data: this.images
                });
                this.save();
                */
                _this.hide();
              }
            }, function (resp) {
              _this.$translate('Error while uploading').then(function (translated) {
                _this.$mdToast.show(_this.$mdToast.simple().textContent(translated + ' Code: ' + resp.status).position('bottom left').hideDelay(3000));
              });
            }, function (e) {
              console.log(e.total, e.loaded);
              _this.progress[size] = parseInt(100.0 * e.loaded / e.total);
            });
          };

          for (var size in this.files) {
            _loop(size);
          }
        }
      }
    }]);

    return PictureDialogController;
  }();
});
