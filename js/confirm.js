/*
* @Author: lisiyu
* @Date:   2017-11-08 15:46:57
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-08 17:57:17
*/

'use strict';
  document.onreadystatechange = function(e){
    if(document.readyState == 'complete') {
        window.addEventListener('message', function(e){
            var record_info = e.data;
            console.log("get data from father");
            console.log(record_info);
            loadRecordInfo(record_info);
        });
    }
}
function loadRecordInfo(record_info){
	if(record_info==null || record_info==""){
		return;
	}
	
	var tab_record = document.getElementById('tab_record');
	var record = JSON.parse(record_info);
	for (var key in record) {
		var new_row = tab_record.insertRow();
		var cell_name = new_row.insertCell();
		cell_name.innerText=key;
		var cell_value = new_row.insertCell();
		cell_value.innerText=record[key];
	}
}
