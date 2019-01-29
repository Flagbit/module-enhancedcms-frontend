define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-image-select ng-init=\"name = '<%= node.name %>'; file = currentData.<%= node.name %>\">\n        <form flex<% if (id) { %> id=\"<%= id %>\" <% } %> class=\"<%= elt.htmlClass?elt.htmlClass:\"\" %>\">\n          <div class=\"ecms-image-select\" ngf-select=\"ctrl.preview()\" ngf-drop=\"ctrl.preview()\" ng-model=\"file\" name=\"file\" ngf-pattern=\"'image/*'\"\n            ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" layout=\"row\" layout-align=\"center center\">\n            <span ng-if=\"!file\">Select or drop image here</span>\n            <img ng-if=\"file\" ngf-thumbnail=\"file || ''\" style=\"max-height: 150px; width: auto;\" />\n           </div>\n           <md-progress-linear ng-show=\"progress\" md-mode=\"determinate\" value=\"{[{progress}]}\"></md-progress-linear>\n        </form>\n        <input type=\"hidden\" name=\"<%= node.name %>\" ng-value=\"file\" />\n    </div>\n</div>\n"
    };
});
