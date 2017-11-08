define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-opacity>\n        <md-slider aria-label=\"<%= node.name %> Opacity\" \n        md-discrete name=\"<%= node.name %>\" <%= (fieldHtmlClass ? 'class=\"' + fieldHtmlClass + '\"' : '') %> \n        flex min=\"0\" max=\"100\" ng-model=\"currentData.<%= node.name %>\" \n        id=\"<%= id %>\"<%= (node.disabled? \" disabled\" : \"\")%>\n        <%= (node.schemaElement && node.schemaElement.required ? ' required=\"required\"' : '') %>>\n        </md-slider>\n    </div>\n</div>\n"
    };
});
