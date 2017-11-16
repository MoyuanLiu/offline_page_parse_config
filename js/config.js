/*
* @Author: myliu
* @Date:   2017-10-17 17:24:32
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-16 17:20:26
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
loadTemplate();//加载模板列表
loadDataPage(1);//加载数据


/*
 * 保存用户名按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_saveusername').onclick = function(){
	if (document.getElementById('txt_username').value == null || document.getElementById('txt_username').value == '') {
		alert('用户名不能为空');
	}else {
		var name = document.getElementById('txt_username').value;
		if (name != localStorage.username) {
			localStorage.username = name;
			alert('用户名已修改为' + localStorage.username);
			console.log('用户名已修改为' + localStorage.username);
		}
	}
}
/*
 * 保存按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_save').onclick = function(){
		var data = localStorage.data;
		if (data != null && data.toString() != '') {
			alert('当前还有未提交或导出的数据，不能随意修改模板！！！');
			return;
		}
		localStorage.stru_template='';
		var templateTable = document.getElementById('tab_template');
		var trs = templateTable.getElementsByTagName('tr');
		if(trs.length > 1){
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
				console.log('字段信息：' + fieldinfo['col_name'] + ',' + fieldinfo['col_show_name'] + ',' + fieldinfo['col_type'] + ',' + fieldinfo['col_content']);
				saveFieldInfo(fieldinfo);
			}
		}
alert('保存成功');
console.log('设置保存成功');
loadDataPage(1);
}
/*
 * 添加字段按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_addfield').onclick = function(){
	var data = localStorage.data;
	if(data != null && data.toString() != ''){
		alert('当前还有未提交或导出的数据，不能随意修改模板！！！');
		return;
	}
	var new_tr = document.getElementById('tab_template').insertRow();
	var new_tr_index = new_tr.rowIndex;
	new_tr.innerHTML = "<td>" + new_tr_index + "</td><td><input type='text' width='200px' height='30px' name='fieldname' value='' placeholder='字段名称'/></td><td><input type='text' width='200px' height='30px' name='fieldshowname' value='' placeholder='字段显示名称'/></td><td><select name='fieldtype'><option value='text'>文本类型</option><option value='checkbox'>多选框</option><option value='select'>下拉列表</option><option value='const'>常量</option></select></td><td><input type='text' width='200px' height='30px' name='fieldcontent' value='' placeholder='字段内容'/></td>";
}
/*
 * 删除字段按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_delfield').onclick = function(){
	var data = localStorage.data;
	if(data != null && data.toString() != ''){
		alert('当前还有未提交或导出的数据，不能随意修改模板！！！');
		return;
	}
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	if (trs.length > 1) {
		templateTable.deleteRow(trs.length - 1);
	}
}

/*
 * 保存字段信息方法
 * ************************************************************
 */
function saveFieldInfo(fieldinfo){
	if (fieldinfo == null || fieldinfo.toString() == '') {
		return;
	}else{
		var template = localStorage.stru_template;
		if(template == null || template.toString() == '') {
			template = [];
			template.push(fieldinfo);
			localStorage.stru_template = JSON.stringify(template);
		}else {
			template = JSON.parse(template);
			template.push(fieldinfo);
			localStorage.stru_template = JSON.stringify(template);
		}

	}
}
/*
 * 导出模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_exporttemplate').onclick = function(){
	var template = localStorage.stru_template;
	if(template == null || template.toString() == ''){
		alert('当前没有配置模板');
	}else{
		console.log('导出模板');
		prompt('当前的模板代码',template);
	}	
}
/*
 * 清空模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_cleartemplate').onclick = function(){
	var cleartemplate_confirm = confirm('是否清空模板？');
	if (cleartemplate_confirm) {
		localStorage.stru_template = '';
		var templateTable = document.getElementById('tab_template');
		var trs = templateTable.getElementsByTagName('tr');
		while (trs.length > 1) {
			templateTable.deleteRow(trs.length - 1);
		}
	}		
}
/*
 * 导入模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_importtemplate').onclick = function(){
	var template = localStorage.stru_template;
	var data = localStorage.data;
	if(data != null && data.toString() != ''){
		alert('当前还有未提交或导出的数据，请先将数据提交或导出并清空！！！');
		return;
	}
	if(template != null && template.toString() != ''){
		var overwrite = confirm('当前已有模板，是否覆盖？');
		if (overwrite) {
			var new_template = prompt('导入模板代码');
			localStorage.stru_template = new_template;
			loadTemplate();
			console.log('导入新模板：' + new_template);
		}
	}else{
		var new_template = prompt('导入模板代码');
		localStorage.stru_template = new_template;
		loadTemplate();
		console.log('导入新模板：' + new_template);
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
	while (trs.length > 1) {
		templateTable.deleteRow(trs.length - 1);
	}
	if(template == null || template.toString() == ''){
		return;
	}else{
		template = JSON.parse(template);
		for (var i = 0; i < template.length; i++) {
			var new_tr = templateTable.insertRow();
			var new_tr_index = new_tr.rowIndex;
			new_tr.innerHTML = "<td>" + new_tr_index + "</td><td><input type='text' width='200px' height='30px' value='" + template[i]['col_name'] + "'/></td><td><input type='text' width='200px' height='30px' value='" + template[i]['col_show_name'] + "'/></td>";
			if (template[i]['col_type'] == 'text') {
				new_tr.innerHTML += "<td><select name='fieldtype'><option value='text' selected='selected'>文本类型</option><option value='checkbox'>多选框</option><option value='select'>下拉列表</option><option value='const'>常量</option></select></td>";
			}else if (template[i]['col_type'] == 'checkbox') {
				new_tr.innerHTML += "<td><select name='fieldtype'><option value='text' >文本类型</option><option value='checkbox' selected='selected'>多选框</option><option value='select'>下拉列表</option><option value='const'>常量</option></select></td>";
			}else if (template[i]['col_type'] == 'select') {
				new_tr.innerHTML += "<td><select name='fieldtype'><option value='text' >文本类型</option><option value='checkbox' >多选框</option><option value='select' selected='selected'>下拉列表</option><option value='const'>常量</option></select></td>";
			}else if (template[i]['col_type'] == 'const') {
				new_tr.innerHTML += "<td><select name='fieldtype'><option value='text' >文本类型</option><option value='checkbox' >多选框</option><option value='select' >下拉列表</option><option value='const' selected='selected'>常量</option></select></td>";
			}
			new_tr.innerHTML += "<td><input type='text' width='200px' height='30px' value='" + template[i]['col_content'] + "'/></td>";
		}
	}
}


/*
 * 导出数据按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_exportdata').onclick = function(){
	var data = localStorage.data;
	if (data == null || data.toString() == '') {
		alert('当前没有存量数据');
	}else {
		prompt('导出存量数据：',data);
	}	
}
/*
 * 数据分页方法
 * ************************************************************
 */
function loadDataPage(pagenum){
	console.log('加载第' + pagenum);
	var pageSize = 20;
	var dataTable = document.getElementById('tab_data');
	dataTable.innerHTML = '';
	var data = localStorage.data;
	if(data == null || data == ""){
		data = "[]";
	}
	data = JSON.parse(data);
	var totalRecord = data.length;
	var totalPageNum =  Math.floor((totalRecord  +  pageSize  - 1) / pageSize);
	if (totalPageNum == 0) {
		totalPageNum = 1;
	} 
	var page_select = document.getElementById('page_select');
	page_select.innerHTML = "";
	for (var i = 0; i < totalPageNum; i++) {
		var page_select_option = document.createElement('option');
		page_select_option.value = (i+1);
		page_select_option.innerText = (i+1);
		page_select.appendChild(page_select_option);
	}
	var lab_curpage = document.getElementById('cur_page');
	lab_curpage.innerText = pagenum;

	var template = localStorage.stru_template;
	if (template == null || template == "") {
		return;
	}
	template = JSON.parse(template);
	
	var startRow = (pagenum - 1) * pageSize+1; 
	var endRow = pagenum * pageSize;
	if(totalRecord < endRow){
		endRow = totalRecord;
	}
	var new_tr = dataTable.insertRow();
	new_tr.innerHTML = "<td>行号</td>";
	for (var i = 0; i < template.length; i++) {
		new_tr.innerHTML += "<td>" + template[i]['col_show_name'] + "</td>";
	}
	for (var i = startRow; i <= endRow; i++) {
		var new_tr = dataTable.insertRow();
		new_tr.innerHTML = "<td>" + i + "</td>";
		for (var j = 0; j < template.length; j++) {
			var new_cell = new_tr.insertCell();
			var new_cell_span = document.createElement('span');
			new_cell_span.innerText = data[i-1][template[j]['col_name']];
			new_cell.appendChild(new_cell_span);
		}
	}
}
/*
 * 上一页按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_lastpage').onclick = function(){
	var lab_curpage = document.getElementById('cur_page');
	var curpage = lab_curpage.innerText;
	curpage = parseInt(curpage);
	if (curpage == 1) {
		alert('当前已经是首页了')
	}else {
		loadDataPage(curpage-1);
	}
	
}
/*
 * 下一页按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_nextpage').onclick = function(){

	var pageSize = 20;
	var data = localStorage.data;
	if(data==null||data==""){
		data="[]";
	}
	data = JSON.parse(data);
	var totalRecord = data.length;
	var totalPageNum =  Math.floor((totalRecord  +  pageSize  - 1) / pageSize);
	if (totalPageNum == 0) {
		totalPageNum = 1;
	}
	var lab_curpage = document.getElementById('cur_page');
	var curpage = lab_curpage.innerText;
	curpage = parseInt(curpage);
	if(curpage == totalPageNum){
		alert('当前已经是末页了');
	}else{
		loadDataPage(curpage + 1);
	}
	
}
/*
 * 页面跳转按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_jumppage').onclick = function(){
	var select_page = parseInt(document.getElementById('page_select').value);
	loadDataPage(select_page);
}
/*
 * 清空数据按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_cleardata').onclick = function(){
	var cleardata_confirm = confirm('是否清空所有数据？');
	if (cleardata_confirm) {
		localStorage.data="";
		localStorage.recordcount=0;
		chrome.browserAction.setBadgeText({text: localStorage.recordcount+""});
		loadDataPage(1);
	}
}