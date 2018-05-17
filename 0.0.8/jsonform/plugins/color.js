define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var escapeSelector = function escapeSelector(selector) {
        return selector.replace(/([ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1');
    };

    exports.default = {
        'template': '\n<input type="text" <%= (fieldHtmlClass ? \'class="\' + fieldHtmlClass + \'"\' : \'\') %> \nname="<%= node.name %>" value="<%= escape(value) %>" \nid="<%= id %>"<%= (node.disabled? " disabled" : "")%><%= (node.schemaElement && node.schemaElement.required ? \' required="required"\' : \'\') %> />\n    ',
        'fieldtemplate': true,
        'inputfield': true,
        'onInsert': function onInsert(evt, node) {
            jQuery(node.el).find('#' + escapeSelector(node.id)).spectrum({
                preferredFormat: "hex",
                allowEmpty: true,
                showInput: true,
                showInitial: true,
                showAlpha: true
            });
        }
    };
});
