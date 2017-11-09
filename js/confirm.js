/*
* @Author: lisiyu
* @Date:   2017-11-08 15:46:57
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-09 16:44:12
*/

'use strict';
/*
 * 获取记录信息
 * ************************************************************
 */
  document.onreadystatechange = function(e){
    if(document.readyState == 'complete') {
        window.addEventListener('message', function(e){
            var record_info = e.data;
            console.log("get data from father window");
            console.log(record_info);
            loadRecordInfo(record_info);
        });
    }
}
/*
 * 加载记录信息
 * ************************************************************
 */
function loadRecordInfo(record_info){
	if(record_info == null || record_info == ""){
		return;
	}
	var tab_record = document.getElementById('tab_record');
	var record = JSON.parse(record_info);
	for (var key in record) {
		var new_row = tab_record.insertRow();
		var cell_name = new_row.insertCell();
		cell_name.innerText = key;
		var cell_value = new_row.insertCell();
		var textarea = document.createElement('textarea');
		textarea.value = record[key];
		// cell_value.innerText = record[key];
		cell_value.appendChild(textarea);
	}
}
/*
 * 保存信息记录按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_save').onclick = function(){
	var record_tab = document.getElementById('tab_record');
	var trs = record_tab.getElementsByTagName('tr');
	var record = {};
	for (var i = 0; i < trs.length; i++) {
		var cur_tr = trs[i];
		var tds = cur_tr.getElementsByTagName('td');
		var key = tds[0].innerText;
		var value = tds[1].getElementsByTagName('textarea')[0].value;
		record[key] = value;
	}
	var data = localStorage.data;
	if(data==null||data==""){
		data="[]";
	}
	data = JSON.parse(data);
	data.push(record);
	localStorage.data = JSON.stringify(data);
	alert('保存记录');
	var record_str = JSON.stringify(record);
	localStorage.recordcount = parseInt(localStorage.recordcount)+1;
	chrome.browserAction.setBadgeText({text: localStorage.recordcount+""});
	console.log('新增记录信息' + record_str);
	window.close();
}
/*
 * 关闭确认窗口按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_cancel').onclick = function(){
	window.close();
}
