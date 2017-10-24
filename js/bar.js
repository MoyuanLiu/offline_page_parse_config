/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-24 20:17:43
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
	div_main.appendChild(tab_template);
	template = JSON.parse(template);
	for (var i = 0; i < template.length; i++) {
		// if(i==2){
		// 	alert(i+':'+template[i]['col_show_name']);
		// }
		alert(i+':'+template[i]['col_show_name']);
		var row = tab_template.insertRow();
		var label_cell = row.insertCell();
		var label_field = document.createElement('label');
		label_field.innerText = template[i]['col_show_name'];
		label_cell.appendChild(label_field);
		var input_cell = row.insertCell();
		var col_type = template[i]['col_type'];
		var field_input = document.createElement('input');
		if(col_type=='text'){
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.className = 'content';
		}else if(col_type=='const'){
			alert('const:'+template[i]['col_content']);
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.value = template[i]['col_content'];
			//field_input.readonly = 'readonly';
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
				field_input.innerHTML = field_input.innerHTML+"<input type='checkbox' value='"+col_content_arr[i]+"'>"+col_content_arr[i];
				var field_input_sub = document.createElement('br');
				field_input.appendChild(field_input_sub);
			}
			field_input.className = 'content';
		}
		input_cell.appendChild(field_input);
	}
	// var btn_save = document.createElement('input');
	// btn_save.type = 'button';
	// btn_save.value = 'Save record';
	// btn_save.onclick = saveRecord;
	// div_main.appendChild(btn_save);
	// body.appendChild(div_main);
}
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.type == "fillField"){
    	var current_focus = document.getElementById('onfocus');
    	current_focus.value = request.text;
    }
  });
function saveRecord(){
	var data = localStorage.data;
	if(data==null||data.toString()==''){
		data = [];
	}else {
		data = JSON.parse(data);
	}
	var main = document.getElementById('main');
	var fields = main.getElementsByClassName('field');
	var record = {};
	for (var i = 0; i < fields.length; i++) {
		var colname = fields[i].getElementsByClassName('hidden')[0].value;
		alert('colname'+colname);
		var values = fields[i].getElementsByClassName('content');
		alert(values);
		alert(values.length);
		for (var i = 0; i < values.length; i++) {
			if(i==values.length-1){
	 		record[colname]+=values[i].value;
		 	}else{
		 		record[colname]+=values[i].value+',';
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

}