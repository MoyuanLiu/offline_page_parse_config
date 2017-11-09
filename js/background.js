/**
 * 后台脚本
 */

 /*
  *初始化启动
  ******************************************
  **/
  var userName = localStorage.username;
  var recordcount = localStorage.recordcount;
  var stru_template = localStorage.stru_template;
  if (userName == null) {
  	localStorage.username = 'username';//用户名默认username
  }

  if (stru_template == null) {
	  localStorage.stru_template = '';
  }
  if (recordcount == null) {
    localStorage.recordcount = 0;//默认记录数为0
  }
  //设置徽章信息
	chrome.browserAction.setBadgeText({text: localStorage.recordcount+""});

  //桌面提示参数
  	var mail_opt={
        type: "list",
        title: "结构化页面提取器",
        message: "结构化页面提取器已启动",
        iconUrl: "../icon/icon.PNG",
        items: [
        	{ title: "1.", message: "当前用户："+localStorage.username},
			{ title: "2.", message: "本地已有数据量："+localStorage.recordcount+"条"}
				]
      };
    if(stru_template==''){//当模板没有配置的时候提示在设置中配置
  		mail_opt = {
        	type: "list",
        	title: "结构化页面提取器",
       		message: "结构化页面提取器已启动",
        	iconUrl: "../icon/icon.PNG",
        	items: [
        		{ title: "1.", message: "当前用户："+localStorage.username},
				{ title: "2.", message: "本地已有数据量："+localStorage.recordcount+"条"},
				{ title: "3.", message: "模板尚未配置请在插件设置中配置"}
					]
      }
  }
/*
 * 桌面提醒插件已启动
 * ******************************
 * */
    chrome.notifications.create('start',mail_opt,function(id){
	  setTimeout(function(){  
      chrome.notifications.clear(id, function(){});  
  		}, 3000);//3秒自动消失  
	  });


 /*
 * 插件点击显示隐藏提取页面事件
 * ******************************
 * */ 
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true,  currentWindow: true},
      function(activeTabs) {
  chrome.tabs.sendMessage(tab.id, {type:'showHide'});
});
});
 /*
 * 右键菜单
 * ************************************************************
 */
chrome.contextMenus.create({
    type: 'normal',
    title: '填入当前页面url',
    id: 'fill_cur_url',
    onclick: fillTabUrl
});
chrome.contextMenus.create({
    type: 'normal',
    title: '填入字段信息',
    id: 'fill_field',
    contexts: ['selection'],
    onclick: fillFieldText
});

chrome.contextMenus.create({
    type: 'normal',
    title: '填入链接url',
    id: 'fill_url',
    contexts: ['link'],
    onclick: fillUrlAddress
});
/*
 * 填充选中文本方法
 * ************************************************************
 */
function fillFieldText(info,tab){
  alert('选中的文本是：' + info.selectionText);
  chrome.runtime.sendMessage({type:'fillField',text:info.selectionText});
}
/*
 * 填充选中的链接
 * ************************************************************
 */
function fillUrlAddress(info,tab){
  alert('选中的链接是：' + info.linkUrl);
  chrome.runtime.sendMessage({type:'fillField',text:info.linkUrl});
}
/*
 * 填充当前页面的链接
 * ************************************************************
 */
function fillTabUrl(info,tab){
  alert('提交当前页面的链接：' + tab.url);
  chrome.runtime.sendMessage({type:'fillField',text:tab.url});
}
  
// 	  /*
// 	   *搜索引擎
// 	   * */
// 	  var sugresult = {
// 	description:"开始搜索"
// }
// 	  chrome.omnibox.setDefaultSuggestion(sugresult)
	  
// 	  function changeSuggest(text){
// 	return suggest([{
//         content: text,
//         description: 'Search '+text+' in structurer parser'
//     }])
// }
// chrome.omnibox.onInputChanged.addListener(function(text, changeSuggest){
// 	changeSuggest(text);
// })






