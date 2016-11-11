requirejs.config({
	baseUrl : "js/lib",//模块加载根路径
	paths : {
		'app' : "../app",
		"jquery" : "jquery-3.1.1",
		'myutil' : '../app/myutil'
	},
	shim : {
		'myutil' : {
			exports : 'createXHR'
		}
	}
});
// require.config();也可以这样写


// define(["jquery",'js/app/navbase.js','myutil'],function($,base,xhr){
// 	//取数据并且填充到页面的div中
// 	var navUl = $("<ul id='navul'></ul>");
// 	$("#nav").append(navUl);
// 	var x = xhr();
// 	x.open("get",base.getBaseUrl() + '/znav');
// 	x.send(null);
// 	x.onreadystatechange = function(){
// 		if (x.status == 200 || x.status == 304){
// 			if (x.readyState == 4){
// 				createUl(JSON.parse(x.responseText));
// 			}
// 		}
// 	}
// 	function createUl(data){
// 		for(var i = 0 ; i < data.length; i++){
// 			var li = $("<li class='navli'></li>");
// 			var a = $("<a href=" + data[i].url + "/>");
// 			a.html(data[i].name);
// 			//给li添加划过划出事件
// 			li.on("mouseover",function(){
// 				$(this).css("background","#ccc");
// 				$(this).on("mouseout",function(){
// 					$(this).css("background","#fff");
// 				})
// 			});
// 			//给a标签添加划过划出事件
// 			a.on("mouseover",function(){
// 				$(this).css("color","#00b081");
// 				$(this).on("mouseout",function(){
// 					$(this).css("color","#000");
// 				})
// 			})
// 			li.append(a);
// 			navUl.append(li);
// 		}
// 	}

// });//第一个参数为字符串数组,第二个参数为回调函数
define(['jquery','app/createUl','app/createBanner','app/createMenu','app/createTig','app/search','app/titleSearch'],function($,nav,banner,menu,tig,searchs,title){
    //调用nav模块的方法
    var navRoot = $("#nav");
    nav(navRoot);
    var bannerRoot = $("#scroll");
    banner(bannerRoot);
    var menuRoot = $("#menu");
    menu(menuRoot);
    var tigRoot = $(".ziyouxing_title");
    tig(tigRoot);
    var searchRoot = $(".banner_list");
    searchs(searchRoot);
    var titleRoot = $(".top_search");
    title(titleRoot);
});