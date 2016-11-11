define(['jquery','myutil','app/baseUrl'],function($,xhr,baseUrl){
	function getBannerData(root) {
        var x1 = xhr();  //创建ajax对象
        x1.open('get',baseUrl.getBaseUrl() + '/zmenu');
        x1.send(null);
        x1.onreadystatechange = function (e) {
            if(x1.readyState === 4){
                var data = JSON.parse(x1.responseText);
                var menuUl = $("<ul id='menu_ul'></ul>");
                for(var i = 0 ; i < 5; i++){
                    var menuLi = $("<li class='menu_li'></li>");
                    //给li添加划过事件
                    //旅游主题
                    var menuH2 = $("<h2 class='address'>" + data[i].title +"</h2>");
                    //国家
                    var menuSubtitle = $("<p class='menu_subtitle'></p>");
                    menuContent = $("<div class='menu_content'></div>");
                    var column = $("<div class='column'></div>");
                    var column1 = $("<div class='column'></div>");
                    //for循环创建浮动窗
                    for(var j = 0 ; j < data[i].moreCity.length;j++){
                        var cityPack = $("<div class='city_pack'></div>");
                        var bigCity = $("<h2 class='big_city'>"+data[i].moreCity[j].cityName+"</h2>");
                        var placeUl = $("<ul class='small_city_pack'></ul>");
                        //由于第六个为图片，所以创建判断语句
                        if(i == 5){
                            for(var x = 0 ; x < data[i].moreCity[j].items.length;x++){
                                var titleImg = $("<li class='small_city'><a href='#'><img src="+ data[5].moreCity[j].items[x] +" alt='' /></a></li>");
                                placeUl.append(titleImg);
                            }
                        }else{
                            for(var x = 0 ; x < data[i].moreCity[j].items.length;x++){
                                var placeli = $("<li class='small_city'><a href='#'>"+ data[i].moreCity[j].items[x] +"</a></li>");
                                placeUl.append(placeli);
                            }
                        }
                        cityPack.append(bigCity);
                        cityPack.append(placeUl);
                        if(i == 3){
                            if(j == 0){
                                column.append(cityPack);
                            }else if(j == 1){
                                column1.append(cityPack);
                            }
                        }else{
                            if (j == 0 || j == 1) {
                                column.append(cityPack);
                            }else if (j == 2){
                                column1.append(cityPack);
                            }
                        }    
                    }
                    var imgDiv = $("<div class='menu_img_div'><img src="+  +" alt='' /></div>")
                    //判断语句，如果有的话就创建图片模块，没有的话就不创建
                    if(data[i].moreCityImg == null){
                    }else{
                        var moreCityImg = $("<div class='big_city_img'><a href='#'><img src=" + data[i].moreCityImg + " alt=''/></a></div>");
                        column1.append(moreCityImg);
                    }
                    menuContent.append(column);
                    menuContent.append(column1);
                    $("#menu_city").append(menuContent);

                    //给li加划过事件
                    menuLi.on("mouseover",function(){
                        for(var i = 0 ; i < data.length; i++){
                            $(".menu_content:eq("+ i +")").css("display","none");
                        }
                        var li = this;
                        var num = $(this).index();
                        for(var i = 0 ; i < data.length; i++){
                            $(".menu_li:eq("+i+")").css("background","none");
                        }
                        $(this).css("background","#fff");
                        $(".menu_content:eq("+ num +")").css("display","block");
                        $("#menu,#menu_city").on("mouseleave",function(){
                            $(li).css("background","none");
                            for(var i = 0 ; i < data.length; i++){
                                $(".menu_content:eq("+ i +")").css("display","none");
                            }
                        })
                    });

                    $("#menu").css("display","none");
                    $(".header_hot").on("mouseenter",mouseEnter);
                    $(".header_hot,#menu,#menu_city").on("mouseleave",mouseLeave);
                    /*function menuDisplay(){
                        $("#menu").css("display","block");
                    }
                    function menuNone(){
                        $("#menu").css("display","none");
                    }*/
                    function mouseEnter(){
                        $(this).children('#menu').css('display','block');
                    }
                    function mouseLeave(){
                        $(this).children('#menu').css('display','none');
                    }


                    for(var j = 0; j < data[i].mainCity.length;j++){
                        var menuA = $("<a href='#'></a>");
                        menuA.html(data[i].mainCity[j]);
                        menuSubtitle.append(menuA);
                    }
                    menuLi.append(menuH2);
                    menuLi.append(menuSubtitle);
                    menuUl.append(menuLi);
                }
                root.append(menuUl);
            }
        }
    }
    return getBannerData;
})