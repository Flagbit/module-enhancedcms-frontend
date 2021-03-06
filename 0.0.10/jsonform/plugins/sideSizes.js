define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-size-unit layout=\"row\" layout-align=\"space-between\" \n    class=\"ecms-config-side-sizes\" \n    ng-init=\"ctrl.initValues('<%= node.name %>')\">\n        <md-input-container flex>\n            <label for=\"<%= node.name %>_top\">Top</label>\n            <input flex id=\"<%= node.name %>_top\" name=\"<%= node.name %>_top\"\n            ng-model=\"currentData.<%= node.name %>_top\" type=\"string\" ng-pattern=\"sizePattern\" />\n        </md-input-container>\n        <md-input-container flex>\n            <label for=\"<%= node.name %>_right\">Right</label>\n            <input flex id=\"<%= node.name %>_right\" name=\"<%= node.name %>_right\"\n            ng-model=\"currentData.<%= node.name %>_right\" type=\"string\" ng-pattern=\"sizePattern\" />\n        </md-input-container>\n        <md-input-container flex>\n            <label for=\"<%= node.name %>_bottom\">Bottom</label>\n            <input flex id=\"<%= node.name %>_bottom\" name=\"<%= node.name %>_bottom\"\n            ng-model=\"currentData.<%= node.name %>_bottom\" type=\"string\" ng-pattern=\"sizePattern\" />\n        </md-input-container>\n        <md-input-container flex>\n            <label for=\"<%= node.name %>_left\">Left</label>\n            <input flex id=\"<%= node.name %>_left\" name=\"<%= node.name %>_left\"\n            ng-model=\"currentData.<%= node.name %>_left\" type=\"string\" ng-pattern=\"sizePattern\" />    \n        </md-input-container>\n        <input type=\"hidden\" <%= (fieldHtmlClass ? 'class=\"' + fieldHtmlClass + '\"' : '') %> \n        name=\"<%= node.name %>\" value=\"<%= escape(value) %>\" \n        ng-value=\"ctrl.getValues('<%= node.name %>')\"\n        id=\"<%= id %>\"<%= (node.disabled? \" disabled\" : \"\")%><%= (node.schemaElement && node.schemaElement.required ? ' required=\"required\"' : '') %> />\n    </div>\n</div>\n"
    };
});
