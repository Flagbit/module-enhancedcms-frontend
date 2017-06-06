define(['jquery', './plugins/productSelect.min.js', './plugins/imageSelect.min.js', './plugins/sideSizes.min.js', './plugins/size.min.js', './plugins/youtubeId.min.js', './plugins/color.min.js', './plugins/opacity.min.js', './plugins/replaceQuotes.min.js', './jsonform.min.js'], function (_jquery, _productSelectMin, _imageSelectMin, _sideSizesMin, _sizeMin, _youtubeIdMin, _colorMin, _opacityMin, _replaceQuotesMin) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  var _productSelectMin2 = _interopRequireDefault(_productSelectMin);

  var _imageSelectMin2 = _interopRequireDefault(_imageSelectMin);

  var _sideSizesMin2 = _interopRequireDefault(_sideSizesMin);

  var _sizeMin2 = _interopRequireDefault(_sizeMin);

  var _youtubeIdMin2 = _interopRequireDefault(_youtubeIdMin);

  var _colorMin2 = _interopRequireDefault(_colorMin);

  var _opacityMin2 = _interopRequireDefault(_opacityMin);

  var _replaceQuotesMin2 = _interopRequireDefault(_replaceQuotesMin);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  JSONForm.elementTypes['productSelect'] = _productSelectMin2.default;
  JSONForm.elementTypes['imageSelect'] = _imageSelectMin2.default;
  JSONForm.elementTypes['sideSizes'] = _sideSizesMin2.default;
  JSONForm.elementTypes['size'] = _sizeMin2.default;
  JSONForm.elementTypes['youtubeId'] = _youtubeIdMin2.default;
  JSONForm.elementTypes['color'] = _colorMin2.default;
  JSONForm.elementTypes['opacity'] = _opacityMin2.default;
  JSONForm.elementTypes['replaceQuotes'] = _replaceQuotesMin2.default;
});
