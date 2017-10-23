/**
 * 后台脚本
 */

 /*
  *初始化启动
  ******************************************
  **/
  var userName = localStorage.username;
  var recordCount = localStorage.recordcount;
  var stru_template = localStorage.stru_template;
  if(userName==null){
  	localStorage.username='username';
  }
  if(recordCount==null){
	localStorage.recordcount=0;
  }
  if(stru_template==null){
	localStorage.strutemplate='';
  }

  //设置徽章信息
	var recordcount = localStorage.recordcount;//本地数据数
	chrome.browserAction.setBadgeText({text: recordcount+""});

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
  		}, 3000);  
	  });

    function handleRequest(request, sender, cb) {
  // 访问控制，非法访问时页面跳转
  if(request.type == 'redirect') {
      chrome.tabs.query({active: true, currentWindow: true},function(activeTabs) {
          var activeTabUrl = activeTabs[0].url;
          if (activeTabUrl.indexOf(request.errorUrl) == -1) {
              chrome.tabs.create({url: request.url, active: true});
          }
      });
  }
  // 把页面来的消息再传回给bar页面
  else {
      chrome.tabs.sendMessage(sender.tab.id, request, cb);
  }
}

//注册消息监听器
chrome.runtime.onMessage.addListener(handleRequest);
 /*
 * 插件点击事件
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
    title: '填入字段信息',
    id: 'fill_field',
    contexts: ['selection'],
    onclick: fillFieldText
});
function fillFieldText(info,tab){
  alert('选中的文本是：'+info.selectionText);
  chrome.tabs.sendMessage(sender.tab.id, {type:'fillField',text:info.selectionText});
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






