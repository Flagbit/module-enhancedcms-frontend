/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	config.allowedContent = true;
	config.extraAllowedContent = 'p(*)';

	if (window.builderData && window.builderData.imageUploadUrl) {
		config.uploadUrl = window.builderData.imageUploadUrl;
		config.filebrowserUploadUrl = window.builderData.imageUploadUrl;
		config.filebrowserImageUploadUrl = window.builderData.imageUploadUrl;
	}

	config.extraPlugins = 'uploadimage,image2,fontawesome,buttonbeyer,iconbeyer';
  config.colorButton_colors = 'ff5900,e1e6e1,a2a9a8,343d45,000000,ffffff'

	config.skin = 'office2013';
	config.title = false;
};

/*
CKEDITOR.dtd['beyer-button'] = { '#' : 1, 'span' : 1 }; //only text and span
CKEDITOR.dtd.$inline['beyer-button'] = 1;// Custom tag is inline
CKEDITOR.dtd.body['beyer-button'] = 1;
*/