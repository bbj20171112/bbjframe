/**
 * 常用工具类
 */
var Utils = new Utils();
function Utils() {
	
	/**
	 * 是否存在属性
	 */
	this.hasOwnProperty = function (obj,attr){
		if(obj == null || obj == undefined || obj == ""){
			return false;
		}
		return obj.hasOwnProperty(attr);;
	}
	
	/**
	 * 判断空
	 */
	this.isEmpty = function (obj){
		if(obj == null || obj == undefined || obj == "" || $.trim("" + obj) == ""){
			return true;
		}
		return false;
	}

	/**
	 * 判断不空
	 */
	this.isNotEmpty = function (obj){
		if(obj != null && obj != undefined && obj != "" || $.trim("" + obj) != ""){
			return true;
		}
		return false;
	}
	
	/**
	 * ajax 方法
	 */
	this.ajax = function (ajaxSetting){
		// 在这里进行处理一些别的操作控制，比如加密，安全过滤等
		// TODO
		return $.ajax(ajaxSetting);
	}
	
}
