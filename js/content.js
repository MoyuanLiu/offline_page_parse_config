/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-20 17:28:59
*/

'use strict';
alert('嵌入源码');
  var barFrame = document.createElement('iframe');
  barFrame.src = chrome.runtime.getURL('html/bar.html');
  barFrame.id = 'iframe_bar';
  barFrame.classList.add('hidden');
 
  
  document.body.appendChild(barFrame);
  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  	console.log(message);
if(message=='showHide'){
	 if(barFrame.classList.contains('hidden')){
  	barFrame.classList.remove('hidden');
  }else{
  	barFrame.classList.add('hidden');
  }
}
  });
