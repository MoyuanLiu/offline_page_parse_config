/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-23 16:34:47
*/

'use strict';
/*
 * 在网页中嵌入解析页面
 * ************************************************************
 */

  var barFrame = document.createElement('iframe');
  barFrame.src = chrome.runtime.getURL('html/bar.html');
  barFrame.id = 'iframe_bar';
  barFrame.classList.add('hidden');
  document.body.appendChild(barFrame);

/*
 * 监听消息事件
 * ************************************************************
 */
  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  	console.log(message);
if(message.type=='showHide'){
	 if(barFrame.classList.contains('hidden')){
  	barFrame.classList.remove('hidden');
  }else{
  	barFrame.classList.add('hidden');
  }
}
  });

