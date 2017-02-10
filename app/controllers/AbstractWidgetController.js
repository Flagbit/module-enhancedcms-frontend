define(["exports","jquery","../classes/Utils.js"],function(exports,_jquery,_Utils){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _jquery2=_interopRequireDefault(_jquery),_Utils2=_interopRequireDefault(_Utils),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),AbstractWidgetController=function(){function AbstractWidgetController($rootScope,$scope,$element,$attrs,$mdDialog,$compile,$q,$log,ecmsPanel,$timeout,$translate,$templateCache,$templateRequest){var _this=this;_classCallCheck(this,AbstractWidgetController),this.$rootScope=$rootScope,this.$scope=$scope,this.$scope.$element=$element,this.$scope.widgetId=null,this.$scope.toolbarInitialized=!1,this.$scope.toolbarVisible=!1,this.$scope.openConfig=!1,this.$scope.loadPromise=null,this.$attrs=$attrs,this.$mdDialog=$mdDialog,this.$compile=$compile,this.$q=$q,this.$log=$log,this.$timeout=$timeout,this.$translate=$translate,this.$templateCache=$templateCache,this.$templateRequest=$templateRequest,this.ecmsPanel=ecmsPanel,this.$scope.toolbarChildren=!1,this.$scope.dragHandle=!0,this.$scope.$element&&(this.$scope.$widget=this.$rootScope.findWidgetByElement(this.$scope.$element)),this.$scope.$element.hasClass("ecms-widget-initialize")?this.$timeout(function(){_this.loadWidget()}):(this.$scope.$element&&this.$scope.$element.length>0&&(this.$scope.widgetId=this.$scope.$element.prop("id")),this.$scope.data={},this.$scope.$element.attr("data-widget-data")&&(this.$scope.data=JSON.parse(this.$scope.$element.attr("data-widget-data"))),_jquery2["default"].isEmptyObject(this.$scope.data)&&this.setDefaultData()),$scope.$watch("data",this.updateWidget.bind(this,!1)),this.initEvents()}return _createClass(AbstractWidgetController,[{key:"updateWidget",value:function(){var apply=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];apply&&this.$rootScope.$safeApply(this.$scope)}},{key:"loadWidget",value:function(){var _this2=this,deferred=this.$q.defer();return this.$scope.$emit("startProcess"),this.clearChildren(),this.$scope.$widget.getHtml().then(function(html){_this2.$scope.widgetId="ecms-widget-"+_Utils2["default"].generateWidgetId(10),_this2.$scope.$element.attr("id",_this2.$scope.widgetId).attr("ng-click","ctrl.click($event)").attr("ng-attr-data-widget-data","{[{data}]}"),_this2.$scope.$element.addClass("ecms-widget").addClass("ecms-widget-"+_this2.$scope.$widget.getName()),_this2.$scope.$element.hide(),_this2.$scope.$element.removeClass("ecms-widget-initialize"),_this2.$scope.$element.append(_this2.formatWidgetHtml(html,_this2.$scope.widgetId));var newElement=_this2.$compile(_this2.$scope.$element.prop("outerHTML"))(_this2.$scope);_this2.$scope.$element.replaceWith(newElement),_this2.$scope.$element=newElement,_this2.$scope.$element.fadeIn(),_this2.$scope.$emit("stopProcess"),deferred.resolve()}),this.$scope.loadPromise=deferred.promise,deferred.promise}},{key:"formatWidgetHtml",value:function(html){var name=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",linkElement=(0,_jquery2["default"])("<a />",{"ng-attr-href":"{[{data.widgetLink}]}","class":"ecms-widget-link",html:html});return(0,_jquery2["default"])("<div/>",{id:name+"_content","ng-style":"{'margin': data.margin, 'padding': data.padding}","ng-attr-class":"{[{ctrl.getWidgetContentClass()}]}",html:linkElement})}},{key:"getWidgetContentClass",value:function(){var classes=[];return this.$scope.data&&(this.$scope.data.gutter&&classes.push("ecms-gutter-"+this.$scope.data.gutter),this.$scope.data.contentClasses&&classes.push(this.$scope.data.contentClasses)),"ecms-widget-content "+classes.join(" ")}},{key:"clearChildren",value:function(){this.$scope.$element.children().not(".ecms-widget-toolbar").remove()}},{key:"setDefaultData",value:function(){this.$scope.$widget&&(this.$scope.data=this.$scope.$widget.getDefaults()),this.$scope.data.contentClasses=this.$scope.defaultContentClasses}},{key:"getToolbarHtml",value:function(){var _this3=this,deferred=this.$q.defer(),template=this.$templateCache.get("widget-toolbar.html");return template?deferred.resolve(template):this.$templateRequest(this.$rootScope.toolbarTemplateUrl).then(function(template){_this3.$templateCache.put("widget-toolbar.html",template),deferred.resolve(template)}),deferred.promise}},{key:"showToolbar",value:function(){var _this4=this;return this.$scope.toolbarInitialized===!1&&this.$scope.$element&&this.$scope.$element.length>0?(this.$scope.toolbarInitialized=!0,void this.getToolbarHtml().then(function(html){_this4.$scope.$element.prepend(html),_this4.$scope.$element.html(_this4.$compile(_this4.$scope.$element.html())(_this4.$scope)),_this4.$scope.$element.addClass("ecms-widget-hover"),_this4.$scope.toolbarVisible=!0})):(this.$scope.$element.addClass("ecms-widget-hover"),this.$scope.toolbarVisible=!0,void this.$rootScope.$safeApply(this.$scope))}},{key:"hideToolbar",value:function(){this.$scope.$element.removeClass("ecms-widget-hover"),this.$scope.toolbarVisible=!1,this.$rootScope.$safeApply(this.$scope)}},{key:"removeToolbar",value:function(){this.$scope.$element.find(".ecms-widget-toolbar").remove(),this.$scope.toolbarInitialized=!1,this.$scope.toolbarVisible=!1}},{key:"click",value:function(event){event.stopPropagation()}},{key:"drag",value:function(event){event.stopPropagation()}},{key:"onFocus",value:function(){(0,_jquery2["default"])(".ecms-widget-focused").removeClass("ecms-widget-focused"),this.$scope.$element.addClass("ecms-widget-focused"),(0,_jquery2["default"])("html, body").animate({scrollTop:this.$scope.$element.offset().top-100},1e3)}},{key:"onBlur",value:function(){this.$scope.$element.removeClass("ecms-widget-focused")}},{key:"configure",value:function(event){return event.stopPropagation(),this.$scope.openConfig!==!1&&"function"==typeof this.$scope.openConfig?void this.$scope.openConfig(event):void this.ecmsPanel.open(this.$scope,"ConfigController",event.target)}},{key:"previewConfig",value:function(data){this.$scope.$broadcast("previewConfig",{scope:this.$scope}),this.$scope.data=data,this.updateWidget()}},{key:"afterConfigure",value:function(data){this.previewConfig(data),this.$scope.$broadcast("afterConfigure",{scope:this.$scope,data:data})}},{key:"removeConfirmation",value:function(){var _this5=this,deferred=this.$q.defer();return this.$translate(["Are you sure you want to delete this widget?","Remove widget","Cancel"]).then(function(translated){_this5.$mdDialog.show(_this5.$mdDialog.confirm().title(translated["Are you sure you want to delete this widget?"]).ariaLabel("Remove widget").targetEvent(event).ok(translated["Remove widget"]).cancel(translated.Cancel)).then(function(){deferred.resolve()})}),deferred.promise}},{key:"remove",value:function(event){var _this6=this,_remove=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],confirmation=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(event.stopPropagation&&event.stopPropagation(),!event.name||"remove"!=event.name){var removeFunc=function(){event.name&&"remove"==event.name||_this6.$scope.$broadcast("remove",{remove:_remove}),_remove&&(0,_jquery2["default"])(_this6.$scope.$element).fadeOut("fast",function(){(0,_jquery2["default"])(_this6.$scope.$element).remove()})};confirmation?this.removeConfirmation().then(function(){removeFunc()}):removeFunc()}}},{key:"duplicate",value:function(event){}},{key:"beforePagePreview",value:function(){this.removeToolbar()}},{key:"afterPagePreview",value:function(){}},{key:"beforePageSave",value:function(){this.removeToolbar()}},{key:"afterPageSave",value:function(){}},{key:"onDataChanged",value:function(event,mass){this.$scope.data=_jquery2["default"].extend({},this.$scope.data,mass.data)}},{key:"startProcess",value:function(){this.$scope.inProcess=!0,this.$rootScope.$safeApply(this.$scope)}},{key:"stopProcess",value:function(){this.$scope.inProcess=!1,this.$rootScope.$safeApply(this.$scope)}},{key:"onMouseEnter",value:function(){this.$rootScope.hoverDisabled||("undefined"!=typeof this.$scope.mouseTimeout&&clearTimeout(this.$scope.mouseTimeout),this.showToolbar())}},{key:"onMouseLeave",value:function(){this.hideToolbar()}},{key:"initEvents",value:function(){this.$scope.$on("startProcess",this.startProcess.bind(this)),this.$scope.$on("stopProcess",this.stopProcess.bind(this)),this.$scope.$on("remove",this.remove.bind(this)),this.$scope.$on("afterPageSave",this.afterPageSave.bind(this)),this.$scope.$on("beforePageSave",this.beforePageSave.bind(this)),this.$scope.$on("beforePagePreview",this.beforePagePreview.bind(this)),this.$scope.$on("afterPagePreview",this.afterPagePreview.bind(this)),this.$scope.$on("onDataChanged",this.onDataChanged.bind(this)),this.$scope.$on("hideToolbar",this.hideToolbar.bind(this)),this.$scope.$on("showToolbar",this.showToolbar.bind(this)),this.$scope.$element.hover(this.onMouseEnter.bind(this),this.onMouseLeave.bind(this))}}]),AbstractWidgetController}();exports["default"]=AbstractWidgetController});