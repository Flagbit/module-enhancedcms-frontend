define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-product-select>\n        <button <% if (id) { %> id=\"<%= id %>\" <% } %> class=\"btn <%= elt.htmlClass?elt.htmlClass:\"\" %>\" ng-click=\"ctrl.selectProduct()\">\n            Select product...\n        </button>\n        <p ng-if=\"productId\">\n            Selected product: id <span ng-bind=\"productId\"></span>\n        </p>\n        <input ng-init=\"productId = '<%= escape(value) %>'\" type=\"hidden\" ng-value=\"productId\" name=\"<%= node.name %>\" />\n    </div>\n</div>\n"
    };
});
