<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
<!--
    var editIndex = undefined;
    function endEditing(){
	    if (editIndex == undefined){return true;}
	    if ($('#dg').datagrid('validateRow', editIndex)){
			var editor = $('#dg').datagrid('getEditor', {index:editIndex,field:'name'});
			var name = $(editor.target).val();
			$('#dg').datagrid('getRows')[editIndex]['name'] = name;
		    $('#dg').datagrid('endEdit', editIndex);
		    editIndex = undefined;
		    return true;
	    } else {
		    return false;
	    }
    }

   
    $(document).ready(function(){
    	$(".required").validatebox({
    	    required: true,
    	    missingMessage: '该输入框不能为空'  
    	});
    	$(".number").validatebox({
    	    validType:"number"
    	});
    	
    	$('#dg').datagrid({
    		fitColumns: true,
    		columns:[[
    	    	  {field:'name',title:'选项名称',width:120,
    	    		  editor:{
    	    			  type:'validatebox',
    	    			  options:{
    	    				  required:true,
    	    				  validType:'length[3,25]'
    	    			  }
    	    	      }
    	    	  }
    	    ]] ,
    	    onDblClickCell:function(index){
    	    	if (editIndex != index){
    	    		if(endEditing()){
        				$('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
        				editIndex = index;
    	    		}
    			}
    	    },
    		toolbar: [{ 
    			text:'添加选项',
    			iconCls: 'icon-add',
    			handler: function(){
    				if(endEditing()){
        				$('#dg').datagrid('appendRow',{status:'P'});
        				editIndex = $('#dg').datagrid('getRows').length-1;
        				$('#dg').datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
    				}
    		    }
    		},'-',{
    			text:'删除选项',
    			iconCls: 'icon-redo',
    			handler: function(){
    				var idx = $("#dg").datagrid("getRowIndex",$("#dg").datagrid("getSelected"));
    				$('#dg').datagrid('deleteRow', idx);
    			}
    		}] 
    	});
    	
    	$(".datagrid-wrap").mouseover(function(){
    		endEditing();
    		var options = "";
    		$($('#dg').datagrid('getRows')).each(function(idx,row){
    				options += "<option value='"+row.name+"'>"+row.name+"</option>";
    		});
    		$("input[name='options']").val(options);
    	}); 
    	
    	
    });
//-->
</script>
<form style="margin: 0px; padding: 0px; height: 100px; width: 100%;">
    <div class="win_row">
        <div class="win_column_label">控件名称：<font color="red">*</font></div>
        <div class="win_column_content"><input name="name" class="required"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">控件默认值：</div>
        <div class="win_column_content"><input name="value"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">控件宽度（像素）：</div>
        <div class="win_column_content"><input name="width" class="number"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">控件高度（像素）：</div>
        <div class="win_column_content"><input name="height" class="number"></div>
    </div>
    <div class="win_row">
        <div class="win_column_label">是否必填：</div>
        <div class="win_column_content">
            <select name="required">
                <option value="false">否</option>  
                <option value="true">是</option> 
            </select>
        </div>
        <div class="win_column_label">
           <input type="hidden" name="options" value="">
        </div>
    </div> 
    <div style="margin:20px 20px; height: 120px;"> 
        <div id="dg"style="height: 140px;"></div>
    </div>
</form>