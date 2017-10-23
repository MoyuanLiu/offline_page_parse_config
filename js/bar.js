/*
* @Author: myliu
* @Date:   2017-10-20 17:03:25
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-23 15:24:11
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
	div_main.className = 'main';
	template = JSON.parse(template);
	for (var i = 0; i < template.length; i++) {
		var div_field = document.createElement('div');
		div_field.className = 'field';
		var label_field = document.createElement('label');
		label_field.innerText = template[i]['col_show_name'];
		var field_type = template[i]['col_type'];
		var field_input = document.createElement('input');;
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
		div_main.appendChild(div_field);
		var br = document.createElement('br'); 
		div_main.appendChild(br);
	}
	body.appendChild(div_main);
}
