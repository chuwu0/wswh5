define(['jquery','myutil','app/baseUrl'],function($,xhr,baseUrl){
	function getBannerData(root) {
        var x1 = xhr();  //创建ajax对象
        x1.open('get',baseUrl.getBaseUrl() + '/zbanner');
        x1.send(null);
        x1.onreadystatechange = function (e) {
            if(x1.readyState === 4){
                var data = JSON.parse(x1.responseText);
                var bannerUl = $("<ul id='banner_ul'></ul>");
                bannerUl.css("width",data.length*100 + '%');
                for(var i = 0; i < data.length; i++){
                	var li = $("<li class='bannerli'><img src=" + data[i].imgUrl + " alt='' /></li>");
                	var a = $("<a href='javascript:;'/>");
                	$("#scrollbtn").append(a);
                	bannerUl.append(li);
                }
               	root.append(bannerUl);
		       	//设置背景图定时器
				var timer = setInterval(roll,2000);
            }
            var left = 0;
            //背景图滚动函数
            function roll(){
				if(left == 3){
					left = 0;
				}else{
					left = left + 1;
				}
				//小方块跟随
				$("#scrollbtn").children().attr("class","");
				$("#scrollbtn").children().eq(left).attr("class","a_active");
				bannerUl.css("left",-(left*100) + '%');
			}
			//给小方块添加划过事件
			$("#scrollbtn").children().on("mouseover mouseleave",mouse);
			//判断是否划过
			function mouse(e){
				if(e.type == 'mouseover'){
					clearInterval(timer);
					$(this).siblings().attr("class","");
					$(this).attr("class","a_active");
					left = $(this).index();
					bannerUl.css("left",-(left*100) + '%');
				}
				if(e.type == 'mouseleave'){
					timer = setInterval(roll,2000);
					left = $(this).index();
				}
			}
			//鼠标移入移出scroll事件
			// $("#scroll").on("mouseover mouseleave",stop);
			// function stop(e){
			// 	if(e.type == 'mouseover'){
			// 		clearInterval(timer);
			// 	}
			// 	if(e.type == 'mouseleave'){
			// 		timer = setInterval(roll,2000);
			// 	}
			// }

			//左点击事件
			// $(".go_left").on("mouseover mouseleave click",goLeft);
			// function goLeft(e){
			// 	if(e.type == 'mouseover'){
			// 		clearInterval(timer);
			// 	}
			// 	if(e.type == 'click'){
			// 		if(left > 0){
			// 			left = $(".a_active") -  1;
			// 			bannerUl.css("left",-(left*100) + '%');
			// 		}else{
			// 			left = 3;
			// 			bannerUl.css("left",-(left*100) + '%');
			// 		}
			// 	}
			// 	if(e.type == 'mouseleave'){
			// 		timer = setInterval(roll,2000);
			// 	}
			// }
			// $(".go_right").on("mouseover mouseleave click",goLeft);
			// function goLeft(e){
			// 	if(e.type == 'mouseover'){
			// 		clearInterval(timer);
			// 	}
			// 	if(e.type == 'click'){
			// 		if(left < 3){
			// 			left = $(".a_active") +  1;
			// 			bannerUl.css("left",-(left*100) + '%');
			// 		}else{
			// 			left = 0;
			// 			bannerUl.css("left",-(left*100) + '%');
			// 		}
			// 	}
			// 	if(e.type == 'mouseleave'){
			// 		timer = setInterval(roll,2000);
			// 	}
			// }


            $("#scrollbtn a:eq(0)").attr("class","a_active");
        }
    }
    return getBannerData;
})