var KE_FORM = {
	plug : {
		input : 'input',
		textarea : 'textarea',
		select : 'select',
		checkbox : 'checkbox',
		radio : 'radio',
		datepicker : 'datepicker',
		farmul : 'farmul',
		stamp : 'stamp',
		save : 'save'
	},
	method : {
		convertSerializeArrayToJson : function(formValues) {
			var result = {};
			for ( var formValue, j = 0; j < formValues.length; j++) {
				formValue = formValues[j];
				var name = formValue.name;
				var value = formValue.value;
				if (name.indexOf('.') < 0) {
					result[name] = value;
					continue;
				} else {
					var simpleNames = name.split('.');
					// 构建命名空间
					var obj = result;
					for ( var i = 0; i < simpleNames.length - 1; i++) {
						var simpleName = simpleNames[i];
						if (simpleName.indexOf('[') < 0) {
							if (obj[simpleName] == null)
								obj[simpleName] = {};
							obj = obj[simpleName];
						} else { // 数组
							// 分隔
							var arrNames = simpleName.split('[');
							var arrName = arrNames[0];
							var arrIndex = parseInt(arrNames[1]);
							if (obj[arrName] == null)
								obj[arrName] = [];
							obj = obj[arrName];
							multiChooseArray = result[arrName];
							if (obj[arrIndex] == null)
								obj[arrIndex] = {};
							obj = obj[arrIndex];
						}
					}
					if (obj[simpleNames[simpleNames.length - 1]]) {
						var temp = obj[simpleNames[simpleNames.length - 1]];
						obj[simpleNames[simpleNames.length - 1]] = temp;
					} else {
						obj[simpleNames[simpleNames.length - 1]] = value;
					}
				}
			}
			return result;
		},
		crePlugStyle:function(params){
			var style = "style='";
			if(params.width != null && params.width != undefined && params.width != "" )
				style += "width:"+params.width+"px;";
            if(params.height != null && params.height != undefined && params.height != "" )
            	style += "height:"+params.height+"px;";
            style += "' ";
            return style;
		},
		nullToString:function(param){
			if(param == undefined || param == null)
				param = "";
			return param;
		},
		createPlugCSS:function(params){ 
			var class_ = "class='";
			if(params.required=="true") 
				class_ += "required ";
			if( params.validType != null && params.validType != undefined && params.validType != "" )
				class_ += params.validType+" ";
			class_ += "' ";
			return class_; 
		}
	}
};

// 自定义单行文本框
KindEditor.lang({
	input : '单行文本框'
});
KindEditor.plugin('input', function(K) {
	var dialog = null;
	var self = this, name = 'input';
	self.clickToolbar(name, function() {
		$(".ke-container").append('<div id="win_input_property"></div>');
		dialog = $('#win_input_property').dialog({
			width : 400,
			height : 290,
			modal : true,
			href : './win_input_propertity.jsp',
			title : '单行文本框属性',
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						
						var obj_input = "<input name='" + KE_FORM.method.nullToString(params.name) + "' " + 
						KE_FORM.method.createPlugCSS(params) + KE_FORM.method.crePlugStyle(params) + 
						"value='" + KE_FORM.method.nullToString(params.value) + "'> ";
						
	                    self.insertHtml(obj_input);  
						dialog.panel("destroy"); 
					} 
				} 
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			} ]
		});
	});
});

// 自定义多行文本框
KindEditor.lang({
	textarea : '多行文本输入框'
});
KindEditor.plugin('textarea', function(K) {
	var self = this, name = 'textarea';
	self.clickToolbar(name, function() {
		$(".ke-container").append('<div id="win_textarea_property"></div>');
		dialog = $('#win_textarea_property').dialog({
			width : 400,
			height : 290,
			modal : true, 
			href : './win_textarea_propertity.jsp',
			title : '多行文本框属性', 
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						
						var obj_textarea = "<textarea name='" + KE_FORM.method.nullToString(params.name) + "' " +
						KE_FORM.method.createPlugCSS(params) + KE_FORM.method.crePlugStyle(params) + ">" +
						KE_FORM.method.nullToString(params.Value) + "</textarea>";
						
	                    self.insertHtml(obj_textarea);  
						dialog.panel("destroy"); 
					} 
				} 
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			} ]
		});
	});
});

// 自定义下拉列表
KindEditor.lang({
	select : '下拉列表'
});
KindEditor.plugin('select', function(K) {
	var self = this, name = 'select';
	self.clickToolbar(name, function() {
		$(".ke-container").append('<div id="win_select_property"></div>');
		dialog = $('#win_select_property').dialog({
			width : 400,
			height : 400, 
			modal : true,
			href : './win_select_propertity.jsp',
			title : '下拉框属性',
			onBeforeClose : function() { 
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						
						var obj_select = "<select name='" + KE_FORM.method.nullToString(params.name) + "' " +
						KE_FORM.method.createPlugCSS(params) + KE_FORM.method.crePlugStyle(params) + ">" +
						KE_FORM.method.nullToString(params.options) + "</select>";
						
						
    	                self.insertHtml(obj_select);
    				    dialog.panel("destroy");
					}
				}
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy"); 
				}
			} ]
		});
	});
});

// 自定义复选框
KindEditor.lang({
	checkbox : '复选框'
});
KindEditor.plugin('checkbox', function(K) {
	var self = this, name = 'checkbox';
	self.clickToolbar(name, function() {
		$("body").append('<div id="win_checkbox_property"></div>');
		dialog = $('#win_checkbox_property').dialog({
			width : 400,
			height : 280,
			modal : true,
			href : './win_checkbox_propertity.jsp',
			title : '复选框属性',
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						
						var obj_checkboxes = "";
						$(eval('(' + params.checkboxes + ')')).each(function(idx,obj){
							obj_checkboxes += "<input type='checkbox' id='" + KE_FORM.method.nullToString(obj.label) + "' " + 
							"name='" + KE_FORM.method.nullToString(params.name) + "' " +
							"value='" + KE_FORM.method.nullToString(obj.label) +"' " + 
							KE_FORM.method.crePlugStyle(params);
							if( "true" == obj.checked ) obj_checkboxes += "checked ";
							obj_checkboxes += "><label for='" + KE_FORM.method.nullToString(obj.label) + "'>" + 
							KE_FORM.method.nullToString(obj.label) + "</label>";
						});
					
	                    self.insertHtml(obj_checkboxes);
						dialog.panel("destroy");
					} 
				} 
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			} ]
		}); 
	});
});

// 自定义单选按钮
KindEditor.lang({
	radio : '单选按钮'
});
KindEditor.plugin('radio', function(K) {
	var self = this, name = 'radio';
	self.clickToolbar(name, function() {

		$("body").append('<div id="win_radio_property"></div>');
		dialog = $('#win_radio_property').dialog({
			width : 400,
			height : 320,
			modal : true,
			href : './win_radio_propertity.jsp',
			title : '单选框属性',
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ { 
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						var obj_radioes = ""; 
						$(eval('(' + params.radioes + ')')).each(function(idx,obj){
							obj_radioes += "<input type='radio' id='" + KE_FORM.method.nullToString(obj) + "'" + 
							"name='" + KE_FORM.method.nullToString(params.name) +"' " + 
							"value='" + KE_FORM.method.nullToString(obj) +"' " + 
							KE_FORM.method.crePlugStyle(params);
							if( params.value == obj ) obj_radioes += "checked ";
							obj_radioes += "><label for='" + KE_FORM.method.nullToString(obj) + "'>" + KE_FORM.method.nullToString(obj) + "</label>" ;
						});
	                    self.insertHtml(obj_radioes);
						dialog.panel("destroy");
					} 
				}
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			}]
		});
	});
});

// 自定义计算字段
KindEditor.lang({
	farmul : '计算字段'
});
KindEditor.plugin('farmul', function(K) {
	var self = this, name = 'farmul';
	self.clickToolbar(name, function() {
		
		alert(K.query('input[name="aaa"]')); 
		
	});
}); 

// 自定义盖章
KindEditor.lang({
	stamp : '盖章'
});
KindEditor.plugin('stamp', function(K) {
	var self = this, name = 'stamp';
	self.clickToolbar(name, function() {
		self.insertHtml('<input label="stamp">');
	});
});

// 自定义盖章
KindEditor.lang({
	save : '保存文件'
});
KindEditor.plugin('save', function(K) {
	var self = this, name = 'save';
	self.clickToolbar(name, function() {
		$(".ke-container").append('<div id="win_save_file"></div>');
		dialog = $('#win_save_file').dialog({
			width : 400,
			height : 160,
			modal : true,
			title : '保存文件',
			href : './win_save_file.jsp',
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
					    var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
					    $.ajax({
					    	url:'/WorkFlow/autoform',
					    	type:'post',
					    	dataType:'text',
					    	data:{
					    		name:params.name,
					    		html:self.html()
					    	},
					    	success:function(data){
								dialog.panel("destroy");
					    	}
					    });
					}
				} 
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			} ]
		});
	});
});

//自定义盖章
KindEditor.lang({
	datepicker : '日期框'
});
KindEditor.plugin('datepicker', function(K) {
	var self = this, name = 'datepicker';
	self.clickToolbar(name, function() {
		$(".ke-container").append('<div id="win_datepicker_property"></div>');
		dialog = $('#win_datepicker_property').dialog({
			width : 400,
			height : 260,
			modal : true,
			href : './win_datepicker_propertity.jsp',
			title : '日期框属性',
			onBeforeClose : function() {
				dialog.panel("destroy");
			},
			buttons : [ {
				text : '确定',
				handler : function() {
					if(dialog.find("form").form("validate")){
						var params = KE_FORM.method.convertSerializeArrayToJson(dialog.find("form").serializeArray());
						var class_ = "valid_datepicker";
						if("true" == params.required) class_ += "_required";
						
						var obj_datepicker = "<input name='" + KE_FORM.method.nullToString(params.name) + "' " +
								"value='" + KE_FORM.method.nullToString(params.value) + "' " + KE_FORM.method.crePlugStyle(params) + 
								"class='" + class_ + "'>";
						
	                    self.insertHtml(obj_datepicker);  
						dialog.panel("destroy"); 
					} 
				} 
			}, {
				text : '取消',
				handler : function() {
					dialog.panel("destroy");
				}
			} ]
		});
	});
});