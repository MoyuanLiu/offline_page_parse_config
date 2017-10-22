/*
* @Author: lisiyu
* @Date:   2017-10-20 17:03:25
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-10-22 15:20:42
*/

'use strict';
 var stru_template = localStorage.stru_template;
stru_template = JSON.parse(stru_template);
for (var i = stru_template.length - 1; i >= 0; i--) {
	alert(i);
	var div = document.createElement('div');
	var label = document.createElement('label');
	alert(stru_template[i]['col_show_name']);
	label.innerText = stru_template[i]['col_show_name']+":";
	var input = document.createElement('input');
	if(stru_template[i]['col_type']=='text'){
		input.type = 'text';
	}else if(stru_template[i]['col_type']=='checkbox'){
		input.type = 'checkbox';
	}
	var body = document.body;
	div.appendChild(label);
	div.appendChild(input);
	body.appendChild(div);
}