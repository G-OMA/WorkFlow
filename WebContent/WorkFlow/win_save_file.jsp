<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
<!--
    $(document).ready(function(){
    	$(".required").validatebox({
    	    required: true,
    	    missingMessage: '该输入框不能为空'  
    	});
    });
//-->
</script>
<form style="margin: 0px; padding: 0px;">
    <div class="win_row">
        <div class="win_column_label">控件名称：<font color="red">*</font></div>
        <div class="win_column_content"><input name="name" class="required"></div>
    </div>
    <div  class="win_row"> 
        <p style="margin-left: 20px; color: gray;">将文件保存到服务器中，以备后续与自定义工作流程关联。</p>
    </div>
</form>