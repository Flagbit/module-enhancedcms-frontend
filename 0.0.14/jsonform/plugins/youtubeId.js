define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        fieldtemplate: true,
        inputfield: true,
        template: "\n<div class=\"ecms-config-compile\">\n    <div ecms-config-youtube-id>    \n        <md-input-container>\n            <label for=\"<%= id %>\"><%= node.title %></label>\n            <input type=\"text\" ng-pattern=\"youtubeId\" ng-model=\"currentData.<%= node.name %>\" />\n        </md-input-container>\n    </div>\n</div>\n"
    };
});
