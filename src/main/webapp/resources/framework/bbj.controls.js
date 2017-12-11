/**
 * 控件模版
 */
var bbj = (function(bbj) {
	// 用户自定义control
	var customControlResource = {

	};

	// control的模板及默认配置
	var controlResource = {
		infobox: {
			templ: '<div class="info-box {{bgcolorcls}}"><span class="info-box-icon"><i class="{{iconcls}}"></i></span><div class="info-box-content"><span class="info-box-text">{{text}}</span><span class="info-box-number">{{number}}</span>{{#progress}}<div class="progress"><div class="progress-bar" style="width: {{width}}"></div></div><span class="progress-description">{{description}}</span>{{/progress}}</div></div>',
			options: {
				bgcolorcls: 'bg-aqua',
				iconcls: 'fa fa-bookmark-o',
				text: 'text',
				number: 'number'
			}
		}
	};

	jQuery.extend(controlResource, customControlResource);

	return jQuery.extend(bbj, {
		controlResource: controlResource
	});
})(bbj || {});