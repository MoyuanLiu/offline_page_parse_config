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
	var recordcount = localStorage.recordcount;//本地数据数
  	//chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, .7]});
  	//chrome.browserAction.setBadgeBackgroundColor({color: [255, 30, 0, 255]});
  	
	chrome.browserAction.setBadgeText({text: recordcount+""});
  	var mail_opt={
        type: "list",
        title: "结构化页面提取器",
        message: "结构化页面提取器已启动",
        iconUrl: "../icon/icon.PNG",
        items: [
        	{ title: "1.", message: "当前用户："+localStorage.username},
			{ title: "2.", message: "本地已有数据量："+localStorage.recordcount+"条"}
				]
      };//桌面提示参数
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






