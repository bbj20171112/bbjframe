/**
 * menu.js
 */
// init method one
$(document).ready(function() {
	initOnload();
});

var menuArray = [];

function initOnload() {
	Utils.ajax({
		type: "GET",
        url: "retrieve",
        //data: "tagPage=1&pageSize=10",
        success: function(data){
        	
        	//buildMenuTreeFor(menuArray); // 迭代生成菜单
        	buildMenuTreeRecursion(data.data); // 递归生成菜单(推荐使用)
        }
    });
}

function isEmpty(obj){
	if(obj == null || obj == undefined || obj == "" || $.trim("" + obj) == ""){
		return true;
	}
	return false;
}

function isNotEmpty(obj){
	return !isEmpty(obj);
}

function openMenu(menuId){
	
	//var menuId = $("#menu-id").val();
//	$(".treeview").attr("class","treeview");
//	$(".treeview-menu").attr("style","display: none;");
	var menuItem = menuArray[0]; // 取根节点
	var pathArray = [];
	var isFoundObj = {"isFound":false,"currentMenu":{}};
	var menuFootprint = $("#menu-footprint");
	var liSubMenu = menuFootprint.find("li[name=li-sub-menu]");
	var liSubMenuAuto = menuFootprint.find("li[name=li-sub-menu-auto]");
	if(!isEmpty(liSubMenuAuto)){// 清空原有足迹
		liSubMenuAuto.remove();
	}
	getMenuTreePath(menuId,menuItem,pathArray,0,isFoundObj);// isFoundObj 直接给boolean值会因为递归保存现场问题出问题
	
	// 切换页面
	$("#iframe-content-wrapper-main").attr("src","../" + isFoundObj.currentMenu.attributes.link);
	
	
	// console.log(pathArray);
	for(var i = 1; i < pathArray.length; i++){
//		var liLevelMenu = $("#li-level-menu-id-"+pathArray[i].id);
//		var ulLevelMenu = $("#ul-level-menu-id-"+pathArray[i].id);
//		if(!isEmpty(liLevelMenu)){
//			liLevelMenu.attr("class",liLevelMenu.attr("class")+" menu-open");
//		}
//		if(!isEmpty(ulLevelMenu)){
//			ulLevelMenu.attr("style","display: block;");
//		}
		// 足记
		if(i == 1){
			menuFootprint.find("span[name=parent-menu]").html(pathArray[i].text);
		} else {
			var subMenuItem = liSubMenu.clone(true);
			subMenuItem.insertBefore(liSubMenu);
			subMenuItem.attr("name","li-sub-menu-auto");
			subMenuItem.html(pathArray[i].text);
			subMenuItem.show();
		}
	}
}

function getMenuTreePath(menuId,menuItem,pathArray,deepIndex,isFoundObj){
	if(isEmpty(menuItem)){ // 空，直接返回
		return ;
	}
	pathArray[deepIndex] = {"id":0,"text":""};
	pathArray[deepIndex].id = menuItem.attributes.id ; // 保存当前节点作为树路径
	pathArray[deepIndex].text = menuItem.attributes.text ; 
	// 移除当前节点之后的多余的数据
	var removeCount = pathArray.length - deepIndex - 1;
	while (removeCount > 0) {
		removeCount --;
		pathArray.splice(deepIndex + 1,1);
	}
	
	if(menuItem.attributes.id == menuId){ // 已经找到
		isFoundObj.isFound = true;
		isFoundObj.currentMenu = menuItem;
		return ;
	}
	for (var i = 0; i < menuItem.children.length; i++) { // 一级菜单
		var subMenuItem = menuItem.children[i];
		if(!isFoundObj.isFound){
			getMenuTreePath(menuId,subMenuItem,pathArray,deepIndex + 1,isFoundObj);
		}
	}
}

function menuItemOnclick(id){
	openMenu(id);
}

/**
 * 递归生成 菜单树 理论上支持无数层
 * @param menuArray
 * @returns
 */
function buildMenuTreeRecursion(menuArray) {
	var templateItem = $("#menu-tree").find("li[name=li-level-menu]");
	var root = menuArray[0];// 只要第一个
	for (var i = 0; i < root.children.length; i++) { // 一级菜单
		var subMenuItemData = root.children[i];
		var subMenuItem = templateItem.clone(true);
		subMenuItem.insertAfter(templateItem);
		subMenuItem.find("span[name=li-level-menu-text]").html(subMenuItemData.attributes.text);
		subMenuItem.find("a[name=a-level-menu]").attr("onclick","menuItemOnclick("+subMenuItemData.attributes.id+")");
		subMenuItem.attr("id","li-level-menu-id-"+subMenuItemData.attributes.id);
		subMenuItem.show();
		buildMenuTreeRecursionItem(subMenuItemData,subMenuItem,templateItem);
	}
	templateItem.hide();
}
/**
 * 递归生成菜单树
 * @param menuItemData 当前节点的数据
 * @param menuItem 当前的节点
 * @param templateItem 模板节点
 * @returns
 */
function buildMenuTreeRecursionItem(menuItemData,menuItem,templateItem){
	if(isEmpty(menuItemData)){ // 如果空，直接返回
		return ;
	}
	if (menuItemData.children.length > 0) {
		var mountPoint = menuItem.find("ul[name=ul-level-menu]");
		mountPoint.attr("id","ul-level-menu-id-"+menuItemData.attributes.id);
		for (var i = 0; i < menuItemData.children.length; i++) { // 下级菜单
			var subMenuItemData = menuItemData.children[i];
			var subMenuItem = templateItem.clone(true);
			subMenuItem.appendTo(mountPoint);
			subMenuItem.find("span[name=li-level-menu-text]").html(subMenuItemData.attributes.text);
			subMenuItem.find("a[name=a-level-menu]").attr("onclick","menuItemOnclick("+subMenuItemData.attributes.id+")");
			subMenuItem.attr("id","li-level-menu-id-"+subMenuItemData.attributes.id);
			subMenuItem.show();
			// 递归调用
			buildMenuTreeRecursionItem(subMenuItemData,subMenuItem,templateItem);
		}
	} else { // 没有子菜单，隐藏下拉箭头
		menuItem.find("span[class=pull-right-container]").remove();
	}
}

/**
 * for 迭代生成 菜单树 目前仅支持 5 个子菜单深度
 * @param menuArray
 * @returns
 */
function buildMenuTreeFor(menuArray) {
	var menuItem = $("#menu-tree").find("li[name=li-level-menu]");
	var root = menuArray[0];// 只要第一个
	for (var i = 0; i < root.children.length; i++) { // 一级菜单
		var menuItemData1 = root.children[i];

		var menuItem1 = menuItem.clone(true); // TRUE 包含事件处理
		menuItem1.insertAfter(menuItem);
		menuItem1.find("span[name=li-level-menu-text]").html(
				menuItemData1.attributes.text); // 赋值
		menuItem1.show();

		if (menuItemData1.children.length > 0) { // 如果有子节点
			var mountPoint1 = menuItem1.find("ul[name=ul-level-menu]");
			for (var j = 0; j < menuItemData1.children.length; j++) { // 二级菜单
				var menuItemData2 = menuItemData1.children[j];

				var menuItem2 = menuItem.clone(true);
				menuItem2.appendTo(mountPoint1);
				menuItem2.find("span[name=li-level-menu-text]").html(
						menuItemData2.attributes.text);
				menuItem2.show();

				if (menuItemData2.children.length > 0) {
					var mountPoint2 = menuItem2.find("ul[name=ul-level-menu]");
					for (var k = 0; k < menuItemData2.children.length; k++) { // 三级菜单
						var menuItemData3 = menuItemData2.children[k];

						var menuItem3 = menuItem.clone(true);
						menuItem3.appendTo(mountPoint2);
						menuItem3.find("span[name=li-level-menu-text]").html(
								menuItemData3.attributes.text);
						menuItem3.show();

						if (menuItemData3.children.length > 0) {
							var mountPoint3 = menuItem3
									.find("ul[name=ul-level-menu]");
							for (var l = 0; l < menuItemData3.children.length; l++) { // 四级菜单
								var menuItemData4 = menuItemData3.children[l];

								var menuItem4 = menuItem.clone(true);
								menuItem4.appendTo(mountPoint3);
								menuItem4.find("span[name=li-level-menu-text]")
										.html(menuItemData4.attributes.text);
								menuItem4.show();
							}

							if (menuItemData4.children.length > 0) {
								var mountPoint4 = menuItem4
										.find("ul[name=ul-level-menu]");
								for (var m = 0; m < menuItemData4.children.length; m++) { // 五级菜单
									var menuItemData5 = menuItemData4.children[m];

									var menuItem5 = menuItem.clone(true);
									menuItem5.appendTo(mountPoint4);
									menuItem5
											.find(
													"span[name=li-level-menu-text]")
											.html(menuItemData5.attributes.text);
									menuItem5.show();
								}

								if (menuItemData5.children.length > 0) {
									var mountPoint5 = menuItem5
											.find("ul[name=ul-level-menu]");
									for (var n = 0; n < menuItemData5.children.length; n++) { // 六级菜单
										var menuItemData6 = menuItemData5.children[n];

										var menuItem6 = menuItem.clone(true);
										menuItem6.appendTo(mountPoint5);
										menuItem6
												.find(
														"span[name=li-level-menu-text]")
												.html(
														menuItemData6.attributes.text);
										menuItem6.show();
										// 最后一级全部隐藏下拉图标
										menuItem6.find("span[class=pull-right-container]").remove();
									}
								} else {
									menuItem5.find("span[class=pull-right-container]").remove();
								}
							} else {
								menuItem4.find("span[class=pull-right-container]").remove();
							}
						} else {
							menuItem3.find("span[class=pull-right-container]").remove();
						}
					} 
				}else {
					menuItem2.find("span[class=pull-right-container]").remove();
				}
			}
		}else { // 没有子菜单
			menuItem1.find("span[class=pull-right-container]").remove();
		}
	}
	$("#menu-tree").find("li[name=li-level-menu]").hide();
}
