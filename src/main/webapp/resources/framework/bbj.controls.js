/**
 * 控件模版
 */
var bbj = (function(bbj) {
	// 用户自定义control
	var customControlResource = {

	};

	// control的模板及默认配置
	var controlResource = {
		infobox : {
			templ : '<div class="info-box {{bgcolorcls}}"><span class="info-box-icon"><i class="{{iconcls}}"></i></span><div class="info-box-content"><span class="info-box-text">{{text1}}</span><span class="info-box-number">{{text2}}</span>{{#progress}}<div class="progress"><div class="progress-bar" style="width: {{width}}"></div></div><span class="progress-description">{{description}}</span>{{/progress}}</div></div>',
			options : {
				bgcolorcls : 'bg-aqua',
				iconcls : 'fa fa-bookmark-o',
				text1 : 'text1',
				text2 : 'text2',
				progress : []
			}
		},

		smallbox : {
			templ : '<div class="small-box {{bgcolorcls}}"><div class="inner"><h3>{{text1}}</h3><p>{{text2}}</p></div><div class="icon"><i class="{{iconcls}}"></i></div>{{#footer}}<a href="{{url}}" class="small-box-footer">{{text}}<i class="{{iconcls}}"></i></a>{{/footer}}</div>',
			options : {
				bgcolorcls : 'bg-aqua',
				text1 : 'text1',
				text2 : 'text2',
				iconcls : 'fa fa-shopping-cart',
				footer : []
			}
		},

		panelbox : {
			templ : '<div class="box box-{{state}} {{boxsolid}} {{collapsedbox}}"><div class="box-header {{withborder}}"><h3 class="box-title">{{title}}</h3><div class="box-tools pull-right">{{#button}}<button type="button" class="btn btn-box-tool" data-widget="{{datawidget}}"><i class="{{iconcls}}"></i></button>{{/button}}</div></div><div class="box-body">{{body}}</div>{{#overlay}}<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>{{/overlay}}</div>',
			options : {
				state : 'default',
				boxsolid : 'box-solid',
				collapsedbox : '',
				withborder : 'with-border',
				title : '标题',
				button : [ {
					datawidget : 'collapse',
					iconcls : 'fa fa-plus'
				} ],
				body : '内容',
				overlay : []
			}
		},
		chatbox : {
			templ : '',
			options : {

			}
		}
	};

	jQuery.extend(controlResource, customControlResource);

	return jQuery.extend(bbj, {
		controlResource : controlResource
	});
})(bbj || {});