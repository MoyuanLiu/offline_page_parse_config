/*
* @Author: myliu
* @Date:   2017-10-17 17:24:32
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-10-19 13:42:22
*/
/*
 * 初始化配置信息部分
 * ************************************************************
 */
var username = localStorage.username;
if(username != null){
	//document.getElementById('txt_username').placeholder = username;
	document.getElementById('txt_username').value = username;
}
loadTemplate();
var template = localStorage.stru_template;
if(template!=null&&template.toString()!=''){
	loadDataTablebyTemplate(template);
}



/*
 * 保存按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_save').onclick = function(){
/*
 * 保存用户名称
 */
	if(document.getElementById('txt_username').value == null || document.getElementById('txt_username').value == ''){
		alert('用户名不能为空');
	}else{
		localStorage.username = document.getElementById('txt_username').value;
		localStorage.stru_template='';
		var templateTable = document.getElementById('tab_template');
		var trs = templateTable.getElementsByTagName('tr');
		if(trs.length>1){
			for (var i = 1; i < trs.length; i++) {
				var col_name = trs[i].childNodes[1].childNodes[0].value;
				var col_show_name = trs[i].childNodes[2].childNodes[0].value;
				var col_type = trs[i].childNodes[3].childNodes[0].value;
				var col_content = trs[i].childNodes[4].childNodes[0].value;
				var fieldinfo = {};
				fieldinfo['col_name'] = col_name;
				fieldinfo['col_show_name'] = col_show_name;
				fieldinfo['col_type'] = col_type;
				fieldinfo['col_content'] = col_content;
				alert('字段信息：'+fieldinfo['col_name']+','+fieldinfo['col_show_name']+','+fieldinfo['col_type']+','+fieldinfo['col_content']);
				saveFieldInfo(fieldinfo);
			}
		}
	}
alert('保存成功。');
}
/*
 * 添加字段按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_addfield').onclick = function(){
		var new_tr = document.getElementById('tab_template').insertRow();
		var new_tr_index = new_tr.rowIndex;
		new_tr.innerHTML = "<td>"+new_tr_index+"</td><td><input type='text' width='200px' height='30px' name='fieldname' value='字段名称'/></td><td><input type='text' width='200px' height='30px' name='fieldshowname' value='字段显示名称'/></td><td><select name='fieldtype'><option>文本类型</option><option>多选框</option><option>下拉列表</option></select></td><td><input type='text' width='200px' height='30px' name='fieldcontent' value='字段内容'/></td>";
}
/*
 * 删除字段按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_delfield').onclick = function(){
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	if(trs.length>1){
		templateTable.deleteRow(trs.length-1);
	}
}

/*
 * 保存字段信息方法
 * ************************************************************
 */
function saveFieldInfo(fieldinfo){
	if(fieldinfo==null || fieldinfo.toString()==''){
		return;
	}else{
		var template = localStorage.stru_template;
		if(template==null||template.toString()=='') {
			template=[];
			template.push(fieldinfo);
			localStorage.stru_template = JSON.stringify(template);
			alert(localStorage.stru_template);
		}else {
			template = JSON.parse(template);
			template.push(fieldinfo);
			localStorage.stru_template = JSON.stringify(template);
			alert(localStorage.stru_template);
		}

	}
}
/*
 * 导出模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_exporttemplate').onclick = function(){
	var template = localStorage.stru_template;
	if(template==null || template.toString()==''){
		alert('当前没有配置模板');
	}else{
		prompt('当前的模板代码',template);
	}	
}
/*
 * 清空模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_cleartemplate').onclick = function(){
	localStorage.stru_template='';
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	while(trs.length>1){
		templateTable.deleteRow(trs.length-1);
	}	
}
/*
 * 导入模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_importtemplate').onclick = function(){
	var template = localStorage.stru_template;
	if(template!=null && template.toString()!=''){
		var overwrite = confirm('当前已有模板，是否覆盖？');
		if(overwrite){
			var new_template = prompt('导入模板代码');
			localStorage.stru_template = new_template;
			loadTemplate();
		}
	}else{
		var new_template = prompt('导入模板代码');
		localStorage.stru_template = new_template;
		loadTemplate();
	}

}
/*
 * 加载模板方法
 * ************************************************************
 */
function loadTemplate(){
	var template = localStorage.stru_template;
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	while(trs.length>1){
		templateTable.deleteRow(trs.length-1);
	}
	if(template==null||template.toString()==''){
		return;
	}else{
		template = JSON.parse(template);
		for (var i = 0; i < template.length; i++) {
			var new_tr = templateTable.insertRow();
			var new_tr_index = new_tr.rowIndex;
			new_tr.innerHTML = "<td>"+new_tr_index+"</td><td><input type='text' width='200px' height='30px' value='"+template[i]['col_name']+"'/></td><td><input type='text' width='200px' height='30px' value='"+template[i]['col_show_name']+"'/></td><td><select name='fieldtype'><option>文本类型</option><option>多选框</option><option>下拉列表</option></select></td><td><input type='text' width='200px' height='30px' value='"+template[i]['col_content']+"'/></td>";
		}
	}
}
/*
 * 根据模板加载表头方法
 * ************************************************************
 */
function loadDataTablebyTemplate(template){
	template = JSON.parse(template);
	var dataTable = document.getElementById('tab_data');
	var new_tr = dataTable.insertRow();
	new_tr.innerHTML = "<td>行号</td>";
	for (var i = 0; i < template.length; i++) {
		new_tr.innerHTML+="<td>"+template[i]['col_show_name']+"</td>";
	}
}