/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-14 09:34:10
*/




'use strict';
 
/*
 * 根据模板生成解析页面
 * ************************************************************
 */
var template = localStorage.stru_template;
var body = document.body;
if (template != null && template.toString() != '') {
	var div_main = document.createElement('div');
	div_main.id = 'main';
	var tab_template = document.createElement('table');
	tab_template.id = 'tab_template';
	var br = document.createElement('br');
	div_main.appendChild(tab_template);
	div_main.appendChild(br);
	template = JSON.parse(template);
	for (var i = 0; i < template.length; i++) {
		var row = tab_template.insertRow();
		var label_cell = row.insertCell();
		var label_field = document.createElement('label');
		label_field.innerText = template[i]['col_show_name'];
		var input_hidden = document.createElement('input');
		input_hidden.type = 'hidden';
		input_hidden.className = 'hidden';
		input_hidden.value = template[i]['col_name'];
		label_cell.appendChild(label_field);
		label_cell.appendChild(input_hidden);
		var input_cell = row.insertCell();
		var col_type = template[i]['col_type'];
		var field_input = document.createElement('input');
		if(col_type == 'text'){
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.className = 'content';
			field_input.onfocus = addFocus;
		}else if(col_type == 'const'){
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.value = template[i]['col_content'];
			field_input.readOnly = 'readonly';
			field_input.className = 'content';
		}else if(col_type == 'select'){
			field_input = document.createElement('select');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var j = 0; j < col_content_arr.length; j++) {
				var field_input_sub = document.createElement('option');
				field_input_sub.value = col_content_arr[j].split(',')[1];
				field_input_sub.innerText = col_content_arr[j].split(',')[0];
				field_input.appendChild(field_input_sub);
			}
			field_input.className = 'content';
		}else if(col_type == 'checkbox'){
			field_input = document.createElement('div');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var k = 0; k < col_content_arr.length; k++) {
				field_input_sub = document.createElement('input');
				field_input_sub.type = 'checkbox';
				field_input_sub.value = col_content_arr[k].split(',')[1];
				field_input_sub.onclick = clickCheckbox;
				var field_input_span = document.createElement('span');
				field_input_span.innerText = col_content_arr[k].split(',')[0];
				var field_input_br = document.createElement('br');
				field_input.appendChild(field_input_sub);
				field_input.appendChild(field_input_span);
				field_input.appendChild(field_input_br);
			}
		}
		input_cell.appendChild(field_input);
	}
	var btn_save = document.createElement('input');
	btn_save.id='btn_save';
	btn_save.type = 'button';
	btn_save.value = '保存记录信息';
	btn_save.onclick = saveRecord;
	div_main.appendChild(btn_save);
	body.appendChild(div_main);
}
/*
 * 提取页面信息填入当前焦点
 * ************************************************************
 */
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.type == "fillField"){
    	var current_focus = document.getElementsByClassName('onfocus')[0];
    	if(current_focus.tagName == 'INPUT'){	
			current_focus.value = request.text;
    	}
    }
  });
/*
 * 为当前焦点文本框添加焦点
 * ************************************************************
 */
function addFocus(sender){
	 var old_focus = document.getElementsByClassName('onfocus')[0];
	 if(old_focus != null){
		old_focus.classList.remove('onfocus');
	 }
	var current_focus = document.activeElement;
		if(current_focus.tagName == 'INPUT' ){
			current_focus.classList.add('onfocus');
    	}
}
/*
 * 保存数据信息
 * ************************************************************
 */
function saveRecord(){
	var main = document.getElementById('main');
	var tab_template = document.getElementById('tab_template');
	var record = {};
	var trs = tab_template.getElementsByTagName('tr');

	for (var i = 0; i < trs.length; i++) {
		var colname = trs[i].getElementsByClassName('hidden')[0].value;
		var values = trs[i].getElementsByClassName('content');
		record[colname]="";
		for (var j = 0; j < values.length; j++) {
			if (j == values.length - 1) {
	 		record[colname] += values[j].value;
		 	}else {
		 		record[colname] += values[j].value + ',';
		 	}
		 }
		if(record[colname] == '$username'){
			record[colname] = localStorage.username;
		}else if(record[colname] == '$inputtime'){
			var currDate = new Date();
			record[colname] = getNowFormatDate();
		}
		
	}
	var confirmWindow = window.open('confirm.html','保存确认','height=500, width=1000, top=300, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	 confirmWindow.onload = function(e) {
          confirmWindow.postMessage(JSON.stringify(record),"chrome-extension://" + window.location.host);
      }
}
/*
 * 获取当前日期时间
 * ************************************************************
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strSecond = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
     if (strSecond >= 0 && strSecond <= 9) {
        strSecond = "0" + strSecond;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + strSecond;
    return currentdate;
}
/*
 * 多选框点击事件
 * ************************************************************
 */
function clickCheckbox(sender) {
	var current_focus = document.activeElement;
	if(current_focus.classList.contains('content')){
		current_focus.classList.remove('content');
	}else{
		current_focus.classList.add('content');
	}

}