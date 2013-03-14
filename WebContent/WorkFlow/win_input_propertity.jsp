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
        <div class="win_column_content"><input name="value"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">数据类型：<font color="red">*</font></div>
        <div class="win_column_content">
            <select name="validType">
                <option value="valid_length">字符型[长度为255以内]</option>
                <option value="valid_telephone">手机号码</option>
                <option value="valid_mobile">电话号码</option>
                <option value="valid_email">Email</option>
                <option value="valid_number">数字</option>
                <option value="valid_IP">IP</option>
            </select> 
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