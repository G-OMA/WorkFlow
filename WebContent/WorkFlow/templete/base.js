$(document).ready(function(){
	
	$("#af").dialog({
		modal : true,
		title : 'xxxxx',
		onBeforeClose : function() {
			alert("beforeClose");
		},
		buttons : [ {
			text : '确定',
			handler : function() {
				if($("#af").find("form").form("validate")){
					alert('Ok');
				}
			} 
		}, {
			text : '取消',
			handler : function() {
				alert("Canel");
			} 
		} ]
	});
	
	
	$(".valid_required").validatebox({
	    required: true,
	    missingMessage: '该输入框不能为空'  
	});
	
	$(".valid_datepicker_required").datebox({
		required:true,
		panelWidth: $(".valid_datepicker_required").width(),
		validType: 'date',
		formatter: function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y + "-" + m + "-" + d;
		}
	}); 
	
	$(".valid_datepicker").datebox({
		validType: 'date',
		panelWidth: $(".valid_datepicker").width(),
		formatter: function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y + "-" + m + "-" + d;
		}
	}); 
	
	$(".valid_number").validatebox({
	    validType:"number"
	});
	$(".valid_email").validatebox({
	    validType:"email"
	});
	$(".valid_length").validatebox({
	    validType:"length[0,255]"
	});
	$(".valid_ip").validatebox({
	    validType:"ip"
	});
	$(".valid_telephone").validatebox({
	    validType:"phone"
	});
	$(".valid_mobile").validatebox({
	    validType:"mobileNumber"
	});
	$(".valid_date").validatebox({
	    validType:"date"
	});
});