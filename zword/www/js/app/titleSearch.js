define(["jquery",'app/baseUrl'],function($,url){
	function getSearch(root){
		var searchDiv = $("<div class='title_search_div'></div>");
		var searchUl = $("<ul class='title_search_ul'></ul>");
		$(".sousuo").on("focus",function(){
			$(".sousuo").on("keyup",function(){
				root.css("display","block");
				$(".title_search_ul").html("");
				if($(".sousuo").val() == ''){

				}else{
					var baseUrl = url.getBaseUrl() + "/ajax/" + $(".sousuo").val();
					$.ajax({
						type : 'get',
						url : baseUrl,
						success : function(data){
							var datas = JSON.parse(data);
							for(var i = 0;i < datas.data.list.length;i++){
								var searchLi = $("<li></li>");
								if(datas.data.list[i].src == null){
									var searchA = $("<a href='#'>"+ datas.data.list[i].word +"</a>");
								}else{
									var searchA = $("<a href='#'><dl><dt><img src="+ datas.data.list[i].src +" alt='' /></dt><dd><p>"+ datas.data.list[i].en_name +"</p><p>"+ datas.data.list[i].belong_name +"</p></dd></dl></a>");
								}
								searchLi.append(searchA);
								searchUl.append(searchLi);
							}
						}
					})
				}
			})
		}).on("blur",function(){
			root.css("display","none");
		})
		searchDiv.append(searchUl);
		root.append(searchDiv);
	}
	return getSearch;

})