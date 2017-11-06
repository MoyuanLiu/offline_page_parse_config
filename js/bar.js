/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-06 17:37:47
*/




'use strict';
 
/*
 * 根据模板生成解析页面
 * ************************************************************
 */
var template = localStorage.stru_template;
var body = document.body;
if(template != null && template.toString() != ''){
	var div_main = document.createElement('div');
	div_main.id = 'main';
	var tab_template = document.createElement('table');
	tab_template.id = 'tab_template';
	div_main.appendChild(tab_template);
	template = JSON.parse(template);
	for (var i = 0; i < template.length; i++) {
		//alert(i+':'+template[i]['col_show_name']);
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
		if(col_type=='text'){
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.className = 'content';
			field_input.onfocus = addFocus;
		}else if(col_type=='const'){
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.value = template[i]['col_content'];
			field_input.readOnly = 'readonly';
			field_input.className = 'content';
		}else if(col_type=='select'){
			field_input = document.createElement('select');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var i = 0; i < col_content_arr.length; i++) {
				var field_input_sub = document.createElement('option');
				field_input_sub.value = col_content_arr[i];
				field_input_sub.innerText = col_content_arr[i];
				field_input.appendChild(field_input_sub);
			}
			field_input.className = 'content';
		}else if(col_type=='checkbox'){
			field_input = document.createElement('div');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var i = 0; i < col_content_arr.length; i++) {
				field_input.innerHTML = field_input.innerHTML+"<input type='checkbox' class='content' value='"+col_content_arr[i]+"'>"+col_content_arr[i];
				var field_input_sub = document.createElement('br');
				field_input.appendChild(field_input_sub);
			}
		}
		input_cell.appendChild(field_input);
	}
	var btn_save = document.createElement('input');
	btn_save.type = 'button';
	btn_save.value = 'Save record';
	btn_save.onclick = saveRecord;
	div_main.appendChild(btn_save);
	body.appendChild(div_main);
}
/**
 * 提取页面信息填入当前焦点
 */
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.type == "fillField"){
    	var current_focus = document.getElementsByClassName('onfocus')[0];
    	alert(current_focus.tagName);
    	if(current_focus.tagName == 'INPUT'){	
			current_focus.value = request.text;
    	}
    	
    }
  });
/*
为当前焦点文本框添加焦点
 */
function addFocus(sender){
	 var old_focus = document.getElementsByClassName('onfocus')[0];
	 if(old_focus!=null){
		old_focus.classList.remove('onfocus');
	 }
	var current_focus = document.activeElement;
		if(current_focus.tagName == 'INPUT' ){
			current_focus.classList.add('onfocus');
    	}
}
/*
为当前焦点文本框添加焦点
 */
function clearFocus(sender){
var current_focus = document.activeElement;
if(current_focus.tagName == 'input' && current_focus.type == 'text' && current_focus.readOnly!='readonly'){
			current_focus.classList.add('onfocus');
    	}
// sender.classList.add('onfocus');
}
/*
保存数据信息
 */
function saveRecord(){
	var data = localStorage.data;
	if(data==null||data.toString()==''){
		data = [];
	}else {
		data = JSON.parse(data);
	}
	var main = document.getElementById('main');
	var tab_template = document.getElementById('tab_template');
	var record = {};
	var trs = tab_template.getElementsByTagName('tr');
alert(trs.length);
	for (var i = 0; i < trs.length; i++) {
		var colname = trs[i].getElementsByClassName('hidden')[0].value;
		alert('colname:'+colname);
		var values = trs[i].getElementsByClassName('content');
		//alert(values);
		alert(values.length);
		record[colname]="";
		for (var j = 0; j < values.length; j++) {
			alert(values[j].value);
			if(j==values.length-1){
	 		record[colname]+=values[j].value;
		 	}else{
		 		record[colname]+=values[j].value+',';
		 	}
		 }
		if(record[colname]=='$username'){
			record[colname] = localStorage.username;
		}
		alert("colvalue"+record[colname]);
		
	}
	alert("record:"+JSON.stringify(record));
	data.push(record);
	localStorage.data = JSON.stringify(data);
	// var count = localStorage.recordcount;
	// localStorage.recordcount = count+1;
	alert(JSON.stringify(record));
	alert('数据录入成功');
	 var record = localStorage.recordcount;
	 var count = parseInt(record);
	 localStorage.recordcount = count+1;
	 chrome.browserAction.setBadgeText({text: localStorage.recordcount+""});

}