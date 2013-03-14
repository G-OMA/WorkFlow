<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
<!--
    $(document).ready(function(){
    	$(".required").validatebox({
    	    required: true,
    	    missingMessage: '该输入框不能为空'  
    	});
    	$(".number").validatebox({
    	    validType:"number"
    	});
    	
    	$('.datepicker').datebox({
    		width: 193,
    		panelWidth: 193,
    		formatter: function(date){
    			var y = date.getFullYear();
    			var m = date.getMonth()+1;
    			var d = date.getDate();
    			return y + "-" + m + "-" + d;
    		}
    	});  
    });
//-->
</script>
<form style="margin: 0px; padding: 0px;">
    <div class="win_row">
        <div class="win_column_label">控件名称：<font color="red">*</font></div>
        <div class="win_column_content"><input name="name" class="required"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">控件默认值：</div>
        <div class="win_column_content">
            <input class="datepicker" name="value" value="">
        </div> 
    </div>
    <div class="win_row">
        <div class="win_column_label">是否必填：<font color="red">*</font></div>
        <div class="win_column_content">
            <select name="required">
                <option value="false">否</option>
                <option value="true">是</option> 
            </select> 
        </div>
    </div> 
    <div class="win_row">
        <div class="win_column_label">控件宽度（像素）：</div>
        <div class="win_column_content"><input name="width" class="number"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">控件高度（像素）：</div>
        <div class="win_column_content"><input name="height" class="number"></div>
    </div>
    
</form>