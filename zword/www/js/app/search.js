define(["jquery","myutil",'app/baseUrl'],function($,xhr,url){
	function getSearch(root){
		var searchDiv = $("<div class='search_div'></div>");
		var searchUl = $("<ul class='search_ul'></ul>");
		$(".keyword").on("focus",function(){
			$(".search_ul").html("");
			if($(".keyword").val() == ''){
				$(".banner_default").css("display","block");
			}
			$(".keyword").on("keyup",function(){
				$(".search_ul").html("");
				$(".banner_default").css("display","none");
				$(".banner_list").css("display","block");
				if($(".keyword").val() == ''){

				}else{
					var baseUrl1 = url.getBaseUrl() + "/search/" + $(".keyword").val();
					$.ajax({
						type : 'get',
						url : baseUrl1,
						success : function(data){
							var datas = JSON.parse(data);
							for(var i = 0;i < datas.data.keywords.length;i++){
								var searchLi = $("<li class='search_li'><em>" + datas.data.keywords[i].type+ "</em><span class='search_span'>" + datas.data.keywords[i].title  + "</span></li>");
								searchUl.append(searchLi);
							}
						}
					})
				}
			})
		}).on("blur",function(){
			$(".banner_default").css("display","none");
			$(".banner_list").css("display","none");
		})
		searchDiv.append(searchUl);
		root.append(searchDiv);
	}
	return getSearch;
})