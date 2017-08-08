$(document).ready(function ()
 {
	//轮播图
	var mySwiper = new Swiper ('.swiper-container', {
	loop: true,
	autoplay: 3000,
	})

	//页面加载的时候高亮显示的频道名称
	
    //默认load时候，呈现社会大课堂页面
        p =parseInt(GetQueryString("p"));
        pindex = p;
        $("nav ul li ").eq(p).addClass('on').siblings().removeClass('on');

     //获取频道名称
      var column = $("nav ul li.on").text();
      $("#des .column i").text(column)
	
	//无限加载初始化
	var start=0;
	var pageSize=10;
	var flag=0;
	var counter=0;
	var d;
	var e;
	var arrs=[{"level":''},{"classes":''},{"days":''},{"minPrice":d},{"maxPrice":e}]
	//var arr=[{column:p},{level:data.level},{classes:data.classes},{days:data.days}{price:data.price}];
	
	//getData(start,pageSize,p,arrs);


	//滚动条小于底部10 的时候
	$(window).scroll(function ()
	{
		if ($(document).height() - $(this).scrollTop() - $(this).height() <10) {
	            counter++;
	            start = counter * pageSize;
	            //getData(start,pageSize,p,arrs);

		}
	})

	//点击筛选出来选框
	$("#filterbtn").click(function(){
		$("#filter").toggle();
	})
	//筛选面板的学段
	$("#filter .level dd").click(function(){
		var index=$(this).index()
		$("#filter .level dd").eq(index-1).children("span").addClass("addbtn"). parents().siblings().children("span").removeClass("addbtn")
	})
	//筛选课程
	$("#filter .classes dd").click(function(){
		var index=$(this).index()
		$("#filter .classes dd").eq(index-1).children("span").addClass("addbtn"). parents().siblings().children("span").removeClass("addbtn")
	})
	//筛选天数
	$("#filter .days dd").click(function(){
		var index=$(this).index()
		$("#filter .days dd").eq(index-1).children("span").addClass("addbtn"). parents().siblings().children("span").removeClass("addbtn")
	})
	//重置
	$(".submit li input:reset").click(function(){
		$("#filter dl dd span").removeClass("addbtn");
		$("#min-price").val("");
		$("#max-price").val("");
	})
	//完成
	$(".submit li input:button").click(function(){
		$("#content .contect-list ul").html("");
		filter(start,pageSize,p,arrs);
		$("#filter").hide();
	})

});
/*
//无限加载函数
	function getData(start,pageSize,p,arrs){
		console.log(start,pageSize,p)
		$.ajax({			
			type:"get",
			url:"../src/data/aa.txt",
			dataType:"json",
			success:function(data){
				var arr=[];
				var sum=data.length;
				var len=start+pageSize;
				var result="";
				//过滤数组中的空元素
				var ary=arrs.filter(function(element){
					//return element.level!=''&&element.classes!=''&&element.days!=''&&element.price!=''		
					for(var k in element)
					{						
						return element[k]!==''&& element[k]!==undefined
					}
			
				})
				//console.log(ary)
				//根据导航的点击。把相应栏目的数据挑出来				
				for(var i=0;i<sum;i++)
				{
					if(data[i].column==p)
					{
							var judge=ary.every(function(element,ary){
								
								return (element[Object.keys(element)]==data[i][Object.keys(element)])||(Object.keys(element)=="minPrice"?element[Object.keys(element)]<=data[i].prices:element[Object.keys(element)]>=data[i].prices)								
							}) 
							//console.log(judge)
							if(judge)
							{
								arr.push(data[i])
							}														
					}
				}
				//console.log(arr)
				//找出来的新数组的长度
				var len1=arr.length;

				if(len>=len1){
					len=len1;
					flag=true;
					$("#content .load-more").html("<span class='count'>共计<i></i>个</span>")
				   
				}
				$(".count i").text(len1);
				for(var i=start;i<len;i++)
				{
					result+="<li><h3><a href='"+arr[i].url+"'>"+arr[i].title+"</a></h3><div class='img-con'><img src='"+arr[i].imgurl+"'/></div><div class='con-con'><p>产品编号："+arr[i].num+"</p><p>行程亮点："+arr[i].shinning+"</p><p>研学课程教案:"+arr[i].leanplan+"</p><p>活动天数："+arr[i].days+"</p><p>适合人数："+arr[i].peoples+"</p><p class='price'>参考价："+arr[i].prices+"</p></div></li>"; 
				}
				$("#content .contect-list ul").append(result)
			},
			error:function(jqXHR){
				alert("发生错误："+jqXHR.json)
			}
		})
	}*/
//获取url参数
    function GetQueryString(p)
    {
        var reg = new RegExp("(^|&)" + p + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

  //筛选面板的操作
  function filter(start,pageSize,p,arrs){
  	if($('.level dd .addbtn'))
  	{		
  	    arrs[0].level=$('.level dd .addbtn').text();	
  	};
  	if($('.classes dd .addbtn'))
  	{
  		arrs[1].classes=$('.classes dd .addbtn').text();	

  	};
  	if($(".days dd .addbtn"))
  	{
  		arrs[2].days=$(".days dd .addbtn").text();
  	};
  	if($(".price dd #min-price")){
  		arrs[3].minPrice=$(".price dd #min-price").val()
  	};
  	if($(".price dd #max-price")){
  		arrs[4].maxPrice=$(".price dd #max-price").val()
  	}
  	getData(start,pageSize,p,arrs);
  }	
