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
define(['jquery','app/createUl','app/createBanner','app/citywalkmenu','app/createTig','app/search','app/walkPlace','app/titleSearch'],function($,nav,banner,menu,tig,searchs,place,title){
    //调用nav模块的方法
    var navRoot = $(".header_nav");
    nav(navRoot);
    var searchRoot = $(".banner_list");
    searchs(searchRoot);
    var menuRoot = $("#menu");
    menu(menuRoot);
    var placeRoot = $("#places");
    place(placeRoot);
    var titleRoot = $(".top_search");
    title(titleRoot);
});