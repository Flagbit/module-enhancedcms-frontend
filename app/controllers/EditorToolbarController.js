define(["exports","jquery","./PanelController.js"],function(exports,_jquery,_PanelController2){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _jquery2=_interopRequireDefault(_jquery),_PanelController3=_interopRequireDefault(_PanelController2),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},EditorToolbarController=function(_PanelController){function EditorToolbarController($rootScope,$scope,mdPanelRef,$timeout,$compile,$log,$q,$templateRequest,$templateCache,targetScope,$translate,$mdDialog,$mdToast){_classCallCheck(this,EditorToolbarController);var _this=_possibleConstructorReturn(this,(EditorToolbarController.__proto__||Object.getPrototypeOf(EditorToolbarController)).call(this,$rootScope,$scope,mdPanelRef,$timeout,$compile,$log,$q,$templateRequest,$templateCache,targetScope,$translate));return _this.$mdDialog=$mdDialog,_this.$mdToast=$mdToast,_this.$scope.draggable=!1,_this.$scope.maximizeable=!1,_this.$scope.minimizeable=!1,_this.$scope.closeable=!1,_this.$scope.collapsableLeft=!0,_this.$scope.title="Editor",_this.$scope.previewActive=!1,_this}return _inherits(EditorToolbarController,_PanelController),_createClass(EditorToolbarController,[{key:"initEventListeners",value:function(){_get(EditorToolbarController.prototype.__proto__||Object.getPrototypeOf(EditorToolbarController.prototype),"initEventListeners",this).call(this)}},{key:"getTemplateFile",value:function(){return"editor-toolbar.html"}},{key:"showSourceCode",value:function(){var _this2=this;this.$mdDialog.show({templateUrl:this.$rootScope.templateBaseUrl+"/dialog/source-code.html",clickOutsideToClose:!0,parent:document.body,locals:{content:(0,_jquery2["default"])("#ecms-page-content").html().trim()},controller:"DialogController"}).then(function(answer){answer&&(answer.content?(0,_jquery2["default"])("#ecms-page-content").html("").append(_this2.$compile(answer.content)(_this2.$scope)):""==answer.content&&(0,_jquery2["default"])("#ecms-page-content").html(""))})}},{key:"previewPage",value:function(){var container=(0,_jquery2["default"])("#ecms-builder");this.$scope.previewActive?(this.$rootScope.$broadcast("afterPagePreview"),container.removeClass("ecms-preview")):(container.addClass("ecms-preview"),this.$rootScope.$broadcast("beforePagePreview")),this.$scope.previewActive=!this.$scope.previewActive,this.$rootScope.$safeApply(this.$scope)}},{key:"openPage",value:function(){window.open(document.location.origin+document.location.pathname,"_blank")}},{key:"tidyUpElement",value:function(el){el.find(".md-panel-outer-wrapper, .ecms-tidyup").remove(),el.find("*").not("iframe, iframe *").each(function(idx,currentEl){var $currentEl=(0,_jquery2["default"])(currentEl);if($currentEl.contents().filter(function(i,el){return 8==el.nodeType}).each(function(i,e){(0,_jquery2["default"])(e).remove()}),$currentEl.hasClass("cke_image_resizer")||$currentEl.hasClass("cke_reset"))return void $currentEl.remove();if("undefined"!=typeof currentEl.attributes){var attributes=_jquery2["default"].map(currentEl.attributes,function(item){var name=item.name;return name.startsWith("ng-")?name:name.startsWith("ecms-")?name:name.startsWith("cke-")?name:name.startsWith("data-cke-")?name:name.startsWith("contenteditable")?name:void 0});_jquery2["default"].each(attributes,function(i,item){$currentEl.removeAttr(item)})}if("undefined"!=typeof currentEl.className){var regex=/\s(cke_.*?)(?=\s)/g;currentEl.className=currentEl.className.replace(regex,""),regex=/\s(ng-.*?)(?=\s)/g,currentEl.className=currentEl.className.replace(regex,"")}})}},{key:"savePage",value:function(){var _this3=this;this.$rootScope.$emit("startProcess"),this.$rootScope.$broadcast("beforePageSave");var el=(0,_jquery2["default"])("#ecms-page-content"),clonedEl=el.clone();this.tidyUpElement(clonedEl),(0,_jquery2["default"])("body").trigger("processStart"),_jquery2["default"].ajax({url:this.$rootScope.saveUrl,type:"post",dataType:"json",data:{id:this.$rootScope.pageId,content:clonedEl.html(),builder_content:el.html(),config:""},success:function(response){_this3.$rootScope.$emit("stopProcess"),_this3.$mdToast.show(_this3.$mdToast.simple().textContent(response.message).position("bottom left").hideDelay(3e3)),_this3.$rootScope.$broadcast("afterPageSave")},error:function(response){_this3.$rootScope.$emit("stopProcess"),_this3.$translate("Error occured").then(function(translated){_this3.$mdToast.show(_this3.$mdToast.simple().textContent(translated).position("bottom left").hideDelay(3e3))})}}).always(function(){(0,_jquery2["default"])("body").trigger("processStop")})}},{key:"toggleTemplates",value:function(){this.$rootScope.$emit("toggleTemplates")}},{key:"responsive",value:function(){var px=arguments.length>0&&void 0!==arguments[0]&&arguments[0],pageWrapper=(0,_jquery2["default"])(".page-wrapper").first(),viewportSize=(0,_jquery2["default"])(window).width();px||(px=viewportSize),pageWrapper.css("margin","auto"),pageWrapper.css("box-shadow","0 5px 30px rgba(43,135,218,.2)"),"none"==pageWrapper.css("max-width")&&pageWrapper.css("max-width",viewportSize),pageWrapper.animate({"max-width":px},1e3,"easeOutBounce"),(0,_jquery2["default"])("head meta[name=viewport]").attr("content","width="+px+", initial-scale=1, maximum-scale=1.0, user-scalable=no"),document.body.style.opacity=.9999,setTimeout(function(){document.body.style.opacity=1},1)}}]),EditorToolbarController}(_PanelController3["default"]);exports["default"]=EditorToolbarController});