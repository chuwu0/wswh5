var express = require('express');
var app = express();
var fs = require('fs');
//存储数据
var gData = null;
var menuData = null;
var bannerData = null;
var freeData = null;
var cityData = null;

fs.readFile('data/nav.json',function(err,data){
	if (err)
		console.log(err);
	gData = data;
	fs.readFile('data/banner.json',function(err1,data1){
		if (err1)
			console.log(err1);
		bannerData = data1;
		fs.readFile('data/menu.json',function(err2,data2){
			if(err2)
				console.log(err2);
			menuData = data2;
			fs.readFile('data/freeWalk.json',function(err3,data3){
				if(err3)
					console.log(err3);
				freeData = data3;
				fs.readFile('data/cityWalkList.json',function(err4,data4){
					if(err4)
						console.log(err4);
					cityData = data4;
					app.listen(9000);
					console.log("启动成功！");
				})
			});
		});
	});
});
//提供web服务功能
app.use(express.static('www'));

app.all('/*',function(req,res,next){
	//跨域问题
	res.header("Access-Control-Allow-Origin", "*");  
	res.header("Access-Control-Allow-Headers", "X-Requested-With");  
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");	
	next();
})


app.get("/znav",function(req,res){
	res.header("Content-type","application/json");
	res.send(gData);
});
app.get("/zbanner",function(req,res){
	res.header("Content-type","application/json");
	res.send(bannerData);
});
app.get("/zmenu",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(menuData);
});
app.get("/zfree",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(freeData);
});
app.get("/zcity",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(cityData);
});


// app.get("/remote",function(req,res) => {
	
// })
var http = require('http');
app.get('/ajax/:keyword' , function (req , res) {
	var url = req.params.keyword;
    // 查询本机ip
    // http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=b&timer=1478686648677&_=1478678019964
    var sreq = http.request({
        host:     'z.qyer.com', // 目标主机
        path:     '/qcross/home/ajax?action=sitesearch&keyword='+url, // 目标路径
        method:   'get' // 请求方式
    }, function(sres){
        sres.pipe(res);
        sres.on('end', function(){
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});

app.get('/search/:keyword' , function (req , res) {
	var url = req.params.keyword;
    // 查询本机ip
    // http://z.qyer.com/?action=new_search&keyword=p
    var sreq = http.request({
        host:     'z.qyer.com', // 目标主机
        path:     '/?action=new_search&keyword='+url, // 目标路径
        method:   'get' // 请求方式
    }, function(sres){
        sres.pipe(res);
        sres.on('end', function(){
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});

