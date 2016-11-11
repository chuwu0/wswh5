
//定义一个IIFE,把工具里的变量从全局的变成局部的，消除污染
(function(g){
	//我的工具
	function MyUtil(info,baseUrl){
		this.info = info;
		this.baseUrl = baseUrl;
	}

	//打印msg指定内容，并且附加打印的时间
	MyUtil.prototype.print = function(msg){
		console.log("时间：" + this.handleDate() + "；打印：" + msg);
	}

	// 创建Ajax对象

	MyUtil.prototype.createXHR= createXHR;
	function createXHR(){//注意浏览器的兼容问题
		// 如果浏览器支持XMLHttpRequest那么直接创建返回该对象
		if(typeof XMLHttpRequest!="undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject!="undefined"){
			if(typeof arguments.callee.ActiveXObject!="string"){
				var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
				for(var i=0;i<versions.length;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
					}catch(ell){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("无法正常创建Ajax对象");
		}
	}









	//把当前日期以字符串的形式返回
	MyUtil.prototype.handleDate = function(){
		//2016-10-11 11:13:50
		var now = new Date();
		var result = now.getFullYear() + "-" +
		 (now.getMonth() + 1) + "-" +  now.getDate();
		return result;
	}

	/**
	 * 判断指定的属性是不是指定对象原型上的属性，
	 * 是返回true，否则返回false
	 * @param  {Object}  obj  [判定的对象]
	 * @param  {String}  prop [指定的属性]
	 * @return {Boolean}      
	 */
	MyUtil.prototype.isPrototype = function(obj, prop){
		return !obj.hasOwnProperty(prop) && (prop in obj);
	}

	//即将Ajax封装到一个对象中，把参数封装到对象中
	MyUtil.prototype.ajax = ajax;
	function ajax(obj){
		//创建一个XMLHttpReauest对象
		var xhr = createXHR();
		//在不影响内容的前提下，欺骗浏览器，使其不断的从服务端拿取数据，即给地址加上参数，但是参数不能一成不变，不然浏览器会从缓存中抓取数据，所以我们可以加上随机数
		obj.url = obj.url + "?rand="+Math.random();
		
		//2，初始化
		if(obj.async == true){
			xhr.open(obj.method,obj.url);
		}else{
			xhr.open(obj.method,obj.url,false);
		}

		//3，发送处理
		if(obj.sendType == "application/json"){
			xhr.setRequestHeader("Content-type","application/json");
			//文件为json时
			xhr.send(JSON.stringify(obj.data));
		}else if(obj.sendType == "application/www-form-urlencoded"){
			xhr.setRequestHeader("Content-type","application/www-form-urlencoded")
			//正常时
			xhr.send(handleData(obj.data));
		}else{
			throw new Error("其他格式数据发送为支持");
		}

		//4，处理响应
		xhr.onreadystatechange = function(){
			if(xhr.status == 200 || xhr.status == 304){
				if(xhr.readyState == 4){
					callback();//回调函数
				}
			}
		}
		function callback(){
			obj.success(xhr.reaponseText);
		}
	}


	MyUtil.prototype.headleDate = function headleDate(data){
		var ar = [];
		for(var p in data){
			ar.push(p + "=" + data[p]);
		}
		return ar.join('&');
	}



	var mTool = new MyUtil("cohen.lee的工具","http://10.0.161.193:6500");
	// 如何获取window
	g.tool=mTool;//g就是window,tool就是把mTool放到tool中
})(window);