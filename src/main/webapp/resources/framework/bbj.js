if(!window.bbj) {
	window.bbj = {};
}

/**
 * bbj.parseControl 解析控件方法
 */
(function(win, $) {
	var controlResource = bbj.controlResource || {};
	var M = Mustache;
	var parseControl = function(options) {
		var type = options.type,
			config = controlResource[type],
			tpl, opt;

		if(config) {
			tpl = config.templ;
			opt = config.options;

			if(tpl) {
				if(opt) {
					options = $.extend({}, opt, options);
				}
				return M.render(tpl, options);
			}
		}
		console.warn('widget解析失败！未找到该类型的widget模板！options：', options);
		return '';
	};

	win.bbj = (function(bbj) {
		return jQuery.extend(bbj, {
			parseControl: parseControl
		});
	})(win.bbj || {});

}(this, jQuery));

/**
 * 写bbj的通用方法
 */
jQuery.extend(bbj, (function(win, $) {

	/**
	 * 简单判断字符串是否null
	 * undefined、null、""、"   "
	 */
	function isNull(str) {
		if(str == null || typeof(str) == 'undefined' || str == 'undefined' || str == "" || str.trim() == "") {
			return true;
		}
		return false;
	}

	return {
		//渲染页面
		renderHtml: function(id, options) {
			$('#' + id).html(bbj.parseControl(options));
		},
		isNull: isNull,
		//不为空
		isNotNull: !isNull
	}

}(this, jQuery)));