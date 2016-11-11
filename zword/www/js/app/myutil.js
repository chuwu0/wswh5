function createXHR(){
	//写我们的模块的代码
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else if(typeof ActiveXOject != 'undefined'){
		if (typeof arguments.callee.avtiveXString != 'string') {
			var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
			for (var i = 0; i < versions.length; i++) {
			 	try{
			 		new ActiveXOject(versions[i]);
			 		arguments.callee.activeXString = versions[i];
			 	}catch(e){

			 	}
			}
		}
		return new ActiveXOject(arguments.callee.activeXString);
	}else{
		throw new Error("无法正常创建Ajax对象");
	}
}