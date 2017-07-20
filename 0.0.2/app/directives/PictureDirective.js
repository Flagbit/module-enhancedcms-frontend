define(['exports', '../controllers/PictureController'], function (exports, _PictureController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PictureDirective = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PictureDirective = exports.PictureDirective = function PictureDirective() {
    _classCallCheck(this, PictureDirective);

    this.restrict = 'A';
    this.controller = _PictureController.PictureController.name;
    this.controllerAs = 'ctrl';
    this.scope = true;
    return this;
  };
});
