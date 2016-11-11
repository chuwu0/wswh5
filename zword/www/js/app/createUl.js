define(['jquery','myutil','app/baseUrl'],function($,xhr,url){
	function getNavData(root) {
        var x = xhr();  //创建ajax对象
        x.open('get',url.getBaseUrl() + '/znav');
        x.send(null);
        x.onreadystatechange = function (e) {
            if(x.readyState === 4){
                //console.log(xhr.responseText);
                //f(xhr.responseText);
                var data = JSON.parse(x.responseText);
                var navUl = $("<ul id='navul'></ul>");
                for(var i = 0 ; i < data.length; i++){
					var li = $("<li class='navli'></li>");
					var a = $("<a href=" + data[i].url + "/>");
					a.html(data[i].name);
					//给li添加划过划出事件
					// li.on("mouseover",function(){
					// 	$(this).css("background","#ccc");
					// 	$(this).on("mouseout",function(){
					// 		$(this).css("background","#fff");
					// 	})
					// });
					// //给a标签添加划过划出事件
					// a.on("mouseover",function(){
					// 	$(this).css("color","#00b081");
					// 	$(this).on("mouseout",function(){
					// 		$(this).css("color","#000");
					// 	})
					// })
					li.append(a);
					navUl.append(li);
					root.append(navUl);
				}
            }
        }
    }
    return getNavData;
})