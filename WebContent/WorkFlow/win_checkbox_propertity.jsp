<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
<!--
    var editIndex = undefined;
    function endEditing(){
	    if (editIndex == undefined){return true;}
	    if ($('#dg').datagrid('validateRow', editIndex)){
			var eName = $('#dg').datagrid('getEditor', {index:editIndex,field:'name'});
			var eChecked = $('#dg').datagrid('getEditor', {index:editIndex,field:'checked'});
			var name = $(eName.target).val();
			var checked = $(eChecked.target).val();
			$('#dg').datagrid('getRows')[editIndex]['name'] = name;
			$('#dg').datagrid('getRows')[editIndex]['checked'] = checked;
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
    	    	  {field:'name',title:'选项名称',width:120,editor:{
    	    		  type:'validatebox',
    	    		  options:{
    	    			  required:true,
    	    			  validType:'length[0,25]'
    	    		  } 
    	    	  }},
    	    	  {field:'checked',title:'是否选中',width:120,editor:{  
                      type:'combobox',  
                      options:{
                    	  editable: false,
                    	  panelHeight: 45,
                          valueField:'key',
                          textField:'value', 
                          data:[{'key':true,'value':'是'},{'key':false,'value':'否'}],  
                          required:true 
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
    		var checkboxes = new Array();
    		$($('#dg').datagrid('getRows')).each(function(idx,row){
    			checkboxes[idx] = {label:row.name,checked:row.checked};
    		}); 
    		$("input[name='checkboxes']").val(JSON.stringify(checkboxes));
    	});
    });
//-->
</script>
<form style="margin: 0px; padding: 0px; height: 100px; width: 100%;">
    <div class="win_row">
        <div class="win_column_label">控件名称：<font color="red">*</font></div>
        <div class="win_column_content"><input name="name" class="required"></div>
        <input type="hidden" name="checkboxes" value="">
    </div>
    <div style="margin:20px 20px; height: 120px;"> 
        <div id="dg"style="height: 140px;"></div>
    </div> 
      
</form>