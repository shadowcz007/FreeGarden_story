
//品类，分类，tilte，href
function anyDepartment (argument) {

	var cln=$('#zg_browseRoot').children[1].children.length;

	var array0=$('#zg_browseRoot').children[1].children;

	var result=[];

	for (var p=0;p<cln;p++){
		 result.push({
			"title":array0[p].children[0].innerText,
			"href":array0[p].children[0].getAttribute("href")

		})
	  
	}
	console.log(JSON.stringify(result,null,2));
}



//获取商品信息 bestSeller("5")

function bestSellerHTML(argument){
	var pageNum=[1,2,3,4,5],urls=[];	

	for (var i = pageNum.length - 1; i >= 0; i--) {
		var url="https://www.amazon.com/Best-Sellers-Clothing/zgbs/apparel/ref=zg_bs_apparel_pg_"+pageNum[i]+"?_encoding=UTF8&pg="+pageNum[i]+"&ajax=1&isAboveTheFold=";
		urls.push(url+0,url+1);
	};	

	console.log(urls);
}

//解析bestseller，保存json，及图片
function bestSellerDownload(){
	var html=document.getElementsByClassName("zg_itemImmersion");
	var ln=html.length;console.log(ln);
	var bs=[];
	for (var i = ln - 1; i >= 0; i--) {
		var rank=html[i].getElementsByClassName("zg_rankDiv")[0].innerText.replace('.','');
		var img=html[i].getElementsByTagName("img")[0].getAttribute("src");
		//var title=html[i].getElementsByClassName("zg_title")[0].innerText;
		var link=html[i].getElementsByClassName("zg_title")[0].getElementsByTagName("a")[0].getAttribute("href").replace(/\n|\t/g,'');
		var review=html[i].getElementsByClassName("zg_reviews")[0].innerText.replace(/ out of 5 stars |,/g,'');
		var price=html[i].getElementsByClassName("zg_price")[0].innerText.replace(/\n|\t/g,'');
		bs.push({
			"rank":rank,
			"img":img,
			"title":link.replace(/.*.com\/|\/dp.*/g,''),
			"link":link,
			"review":review,
			"price":price.replace(/\s/g,'')
		})

		//console.log(link);

	}
	console.log(bs)

}