/*
* @Author: lisiyu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-19 17:25:31
*/

'use strict';
alert('嵌入源码');
  var barFrame = document.createElement('iframe');
  barFrame.src = chrome.runtime.getURL('bar.html');
  barFrame.id = 'xh-bar';