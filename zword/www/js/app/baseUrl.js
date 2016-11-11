//定义一个模块
define({
//定义一个模块
	baseUrl : "http://localhost",
	port : 9000,
	getBaseUrl : function(){
		return this.baseUrl + ":" + this.port;
	}
})