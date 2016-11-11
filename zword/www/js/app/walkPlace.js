define(["jquery","myutil",'app/baseUrl'],function($,xhr,url){
	function getCity(root){
		var x1 = xhr();  //创建ajax对象
        x1.open('get',url.getBaseUrl() + "/zcity");
        x1.send(null);
        x1.onreadystatechange = function (e) {
            if(x1.readyState === 4){
                var data = JSON.parse(x1.responseText);
                var bigDiv1 = $("<div class='big_div'></div>");
                var bigDiv2 = $("<div class='big_div'></div>");
                //第一页
                var pageOne = $("<div class='first_page'></div>");
                //第二页
                var pageTwo = $("<div class='secound_page'></div>");
               	//遍历创建旅游地
               	for(var i = 0 ; i < data.length;i++){
               		//将整个分为两个页面，页面的个数为二，则除以二
               		if(i < data.length/2){
               			var placeDiv = $("<div class='bigCase'></div>");
	               		var caseDiv = $("<div class='case_div'></div>")
	               		var smallPlace = $("<a href='#'><img src="+ data[i].imgurl +" alt='' /></a>");
	               		var textDiv = $("<div class='text_div'></div>");
	               		var infoSpan = $("<span class='bigcard'>"+ data[i].address +"</span>");
	               		var infonum = $("<div class='infornum'><span>"+ data[i].browseCount +"</span>次浏览<span>"+ data[i].soldCount +"</span>件已售</div>");
	               		var infoH2 =  $("<h2><a href='#'>"+ data[i].title +"</a></h2>");
	               		var infoUl = $("<ul class='infolist'></ul>");
	               		for(var j = 0; j < data[i].introduce.length;j++){
	               			var li = $("<li><span class='star'></span>" + data[i].introduce[j] + "</li>");
	               			infoUl.append(li);
	               		}
	               		var price = $("<div class='infoprice'><span class='line'>" + data[i].oldPrice + "元</span><em>"+ data[i].newPrice +"</em>元起</div>");
	               		var lastDiv = $("<div class='bottombar'><a href='#'>立即预定</a></div>");
	               		textDiv.append(infoSpan).append(infonum).append(infoH2).append(infoUl).append(price).append(lastDiv);
	               		caseDiv.append(smallPlace).append(textDiv);
	               		placeDiv.append(caseDiv);
               			bigDiv1.append(placeDiv);
               			pageOne.append(bigDiv1);
               		}else{
               			var placeDiv = $("<div class='bigCase'></div>");
	               		var caseDiv = $("<div class='case_div'></div>")
	               		var smallPlace = $("<a href='#'><img src="+ data[i].imgurl +" alt='' /></a>");
	               		var textDiv = $("<div class='text_div'></div>");
	               		var infoSpan = $("<span class='bigcard'>"+ data[i].address +"</span>");
	               		var infonum = $("<div class='infornum'><span>"+ data[i].browseCount +"</span>次浏览<span>"+ data[i].soldCount +"</span>件已售</div>");
	               		var infoH2 =  $("<h2><a href='#'>"+ data[i].title +"</a></h2>");
	               		var infoUl = $("<ul class='infolist'></ul>");
	               		for(var j = 0; j < data[i].introduce.length;j++){
	               			var li = $("<li><span class='star'></span>" + data[i].introduce[j] + "</li>");
	               			infoUl.append(li);
	               		}
	               		var price = $("<div class='infoprice'><span class='line'>" + data[i].oldPrice + "元</span><em>"+ data[i].newPrice +"</em>元起</div>");
	               		var lastDiv = $("<div class='bottombar'><a href='#'>立即预定</a></div>");
	               		textDiv.append(infoSpan).append(infonum).append(infoH2).append(infoUl).append(price).append(lastDiv);
	               		caseDiv.append(smallPlace).append(textDiv);
	               		placeDiv.append(caseDiv);
               			bigDiv2.append(placeDiv);
               			pageTwo.append(bigDiv2);
               		}
               	}

               	//翻页点击标签
               	var turnPage = $("<div class='page_turning'></div>");
               	var ulPage = $("<div class='ul_page'></div>");
               	var buttonA = $("<a href='#'>上一页</a>");
               	var buttonB = $("<a href='#'>1</a>");
               	var buttonC = $("<a href='#'>2</a>");
               	var buttonD = $("<a href='#'>下一页</a>");
               	ulPage.append(buttonA).append(buttonB).append(buttonC).append(buttonD);
               	turnPage.append(ulPage);

               	//点击事件
	            buttonA.on("click",pageOneBlock);
	            buttonB.on("click",pageOneBlock);
	            buttonC.on("click",pageTwoBlock);
	            buttonD.on("click",pageTwoBlock);

	            //判断页面显示状态
            	var firstDisplay = $(".first_page").css("display");
	            var secoundDisplay = $(".secound_page").css("display");
	            if(firstDisplay == 'block'){
	            	buttonB.css("background","#00b081");
	            }
	            if(secoundDisplay == 'block'){
	            	buttonC.css("background","#00b081");
	            }
            }

            //触发函数
            function pageOneBlock(){
            	$(".first_page").css("display","block");
            	$(".secound_page").css("display","none");
            }
            function pageTwoBlock(){
            	$(".first_page").css("display","none");
            	$(".secound_page").css("display","block");
            }
        	root.append(pageOne).append(pageTwo).append(turnPage);
        }
	}
	return getCity;
})