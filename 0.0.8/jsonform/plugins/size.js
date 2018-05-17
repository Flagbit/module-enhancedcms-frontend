define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-size-unit>    \n        <md-input-container>\n            <label for=\"<%= id %>\"><%= node.title %></label>\n            <input type=\"text\" ng-pattern=\"sizePattern\" ng-model=\"currentData.<%= node.name %>\" />\n        </md-input-container>\n        <input type=\"hidden\" <%= (fieldHtmlClass ? 'class=\"' + fieldHtmlClass + '\"' : '') %> \n        name=\"<%= node.name %>\" value=\"<%= escape(value) %>\" \n        ng-value=\"currentData.<%= node.name %>\"\n        id=\"<%= id %>\"<%= (node.disabled? \" disabled\" : \"\")%><%= (node.schemaElement && node.schemaElement.required ? ' required=\"required\"' : '') %> />\n    </div>\n</div>\n"
    };
});
