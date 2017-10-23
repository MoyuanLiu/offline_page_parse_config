/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-10-23 22:23:29
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
	template = JSON.parse(template);
	for (var i = 0; i < template.length; i++) {
		var div_field = document.createElement('div');
		div_field.className = 'field';
		var label_field = document.createElement('label');
		var hidden_field = document.createElement('input');
		hidden_field.type='hidden';
		hidden_field.value = template[i]['col_name'];
		hidden_field.className = 'hidden';
		label_field.innerText = template[i]['col_show_name'];
		var field_type = template[i]['col_type'];
		var field_input = document.createElement('input');
		field_input.class = 'input';
		if(field_type=='text'){
			field_input = document.createElement('input');
			field_input.id='onfocus';
			field_input.type = 'text';
			
		}else if(field_type=='const'){
			field_input = document.createElement('label');
			field_input.innerText = template[i]['col_content'];
		}else if(field_type=='checkbox'){
			field_input = document.createElement('div');
			var field_content = template[i]['col_content'];
			var field_content_arr = field_content.split(';');
			for (var j = 0; j < field_content_arr.length; j++) {
				var field_input_sub = document.createElement('input');
				field_input_sub.type = 'checkbox';
				field_input_sub.value = field_content_arr[j];
				var field_input_sub_label = document.createElement('label');
				field_input_sub_label.innerText = field_content_arr[j];
				field_input_sub.name = template[i]['col_name'];
				field_input.appendChild(field_input_sub);
				field_input.appendChild(field_input_sub_label);
			}
		}else if(field_type=='select'){
			field_input = document.createElement('select');
			var field_content = template[i]['col_content'];
			var field_content_arr = field_content.split(';');
			for (var j = 0; j < field_content_arr.length; j++) {
				var field_input_sub = document.createElement('option');
				field_input_sub.value = field_content_arr[j];
				field_input_sub.innerText = field_content_arr[j];
				field_input.appendChild(field_input_sub);
			}
		}
		div_field.appendChild(label_field);
		div_field.appendChild(field_input);
		div_field.appendChild(hidden_field);
		div_main.appendChild(div_field);
		var br = document.createElement('br'); 
		div_main.appendChild(br);
	}
	var btn_save = document.createElement('input');
	btn_save.type = 'button';
	btn_save.value = 'Save record';
	btn_save.onclick = saveRecord;
	// btn_save.width = '100';
	// btn_save.height = '100';
	div_main.appendChild(btn_save);
	body.appendChild(div_main);
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
		var values = fields[i].getElementsByClassName('input');
		alert(values.length);
		// for (var i = 0; i < values.length; i++) {
		// 	if(i==values.length-1){
		// 		record[colname]+=values[i].value;
		// 	}else{
		// 		record[colname]+=values[i].value+',';
		// 	}
		// }
		if(record[colname]=='$username'){
			record[colname] = localStorage.username;
		}
		
	}
	data.push(record);
	localStorage.data = JSON.stringify(data);
	// var count = localStorage.recordcount;
	// localStorage.recordcount = count+1;
	alert(JSON.stringify(record));
	alert('数据录入成功');

}