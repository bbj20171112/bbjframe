/**
 * menu.js
 */

function initOnload(){
	$.ajax({
		url : "retrieve",
		method : "GET",
		// async : false,
		// data : "maxId=" + maxId,
		dataType : "html"
	}).done(function(responseText) {		
		//console.log("responseText:"+responseText);
		// new Menu().sayHello("bage");
		var menuArray = JSON.parse(responseText);
		var container = $("#menu-navbar");
		buildMenuNavbar(menuArray,container);
		
	}).fail(function(jqXHR, textStatus) {
				
	});	
}

function buildMenuNavbar(menuArray,container){
	
	var firstLevelMenu = container.find("li[name=first-level-menu]");
	var root = menuArray[0];// 只要第一个
	for (var i = 0; i < root.children.length; i++) {
		var firstLevelMenuData = root.children[i]; // firstLevelMenu
		
		var newFirstLevelMenu = firstLevelMenu.clone(true); // TRUE 包含事件处理
		newFirstLevelMenu.insertBefore(firstLevelMenu);
		newFirstLevelMenu.find("span[name=first-level-menu-text]").html(firstLevelMenuData.attributes.text);
		newFirstLevelMenu.show();
		
		var secondLevelMenu = newFirstLevelMenu.find("li[name=second-level-menu]");
		for (var j = 0; j < firstLevelMenuData.children.length; j++) {
			var secondLevelMenuData = firstLevelMenuData.children[j]; // secondLevelMenu
			
			var newSecondLevelMenu = secondLevelMenu.clone();
			newSecondLevelMenu.insertBefore(secondLevelMenu);
			newSecondLevelMenu.children("a[name=second-level-menu-text]").html(secondLevelMenuData.attributes.text);
			newSecondLevelMenu.show();
		}
		// 如果没有二级菜单，则进行隐藏
		if(firstLevelMenuData.children.length < 1){
			secondLevelMenu.parent().hide(); // 隐藏二级菜单父节点
			newFirstLevelMenu.find("span[name=dropdown-icon]").hide(); // 隐藏下拉箭头
		}
	}
}

function open(){
	alert(12);
	$('.dropdown-toggle').dropdown();
}

