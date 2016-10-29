
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

function addToCart(){
	//size
	var html=$('#native_dropdown_selected_size_name').children();
	var ln=html.length-1;

	html[1].className="dropdownAvailable";
	html[1].setAttribute('data-a-css-class','dropdownAvailable');
	html[2].className="dropdownSelect";
	html[2].setAttribute('data-a-css-class','dropdownSelect');

//variation_special_size_type
var html2=$($('#variation_special_size_type').children()[1]).children();
var ln2=html2.length;
	html2[0].className="swatchAvailable";	
	html2[1].className="swatchSelect";
	
	$('#addToCart').submit()
}

//模拟输入数量，点击updata， 
	var html=document.getElementsByClassName('sc-list-body').children;
	var ln=html.length;
	    console.log("监控商品数量－－－－－－－－"+ln);
	var j=0;
	var TIME=10000;
	var MAX=999/(ln-1);//监测ln个商品的时候
		console.log("假定每个商品最大库存－－－－－－－－"+MAX);
	var intS=self.setInterval("clock()",TIME);
	var list=[];
	    //console.log("监控频率／秒-------------"+TIME/1000);
	function clock(){
	  console.log(j);
		
	if(j-1>=0 && html[j-1].getElementsByTagName("li")[1]){
	    console.log(html[j-1].getElementsByTagName("li")[1].innerText)
		console.log(html[j-1].getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("href"))
		var title= html[j-1].getElementsByTagName("li")[0].innerText;
	    var stock;
		var testText= html[j-1].getElementsByTagName("li")[1].innerText;  
		var regexp = /Usually/gi;

		if(testText && testText!=="In Stock" && !regexp.test(testText) ){
			stock= html[j-1].getElementsByTagName("li")[1].innerText;
		}else{

	   	 	var pppf= html[j-1].getElementsByClassName('sc-quantity-textfield')[0];
			
			if(pppf){
					 if(pppf.value){
						stock=pppf.value;
					}else{
				         var sel=html[j-1].getElementsByClassName('sc-invisible-when-no-js')[2].getElementsByTagName('select')[0];
				         stock=sel.options[sel.selectedIndex].text;		
					}
			}		
				

	 	}   
	    
		var url= html[j-1].getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("href");
	    
	    list.push({
	        "time":new Date(),
	        "title":title,
	        "stock":stock,
	        "url":url
	        
	    })
			
	}

	if(j>=ln){

	    intS=window.clearInterval(intS);
	    console.log("监控完毕------------");
	    console.log(list);
	    
	    return
	}

	var ppp= html[j].getElementsByClassName('sc-quantity-textfield');

	if(ppp[0]){
	  ppp[0].className=ppp[0].className.replace('sc-hidden','');

	  ppp[0].value=MAX;
	  ppp[0].nextElementSibling.children[0].getElementsByTagName("a")[0].click();
	}else{
	  console.log("erro");  
	}

	j++; 

	console.log("------------------------------------------------") 
	 
	}

//监控 某一个商品的排名，reviews,keywords,ASIN,firtDate,

var regBest=/sellers rank/ig;
var regReviews=/customer reviews/ig;
var regASIN=/ASIN/ig;
var regDF=/Date first available/ig;


var pDOM=document.getElementsByTagName('meta');
var ulDOM=document.getElementById('detailBullets_feature_div').children[0].children;
var trDOM=document.getElementsByTagName('tr');
var rank,reviews,title;
var result={};
for (var u=0;u<=pDOM.length-1;u++){
  if(pDOM[u].getAttribute('name')=='keywords'){
     result['keywords']=pDOM[u].getAttribute('content');

  }
}
for (var j=0;j<=ulDOM.length-1;j++){
  var ostr=ulDOM[j].innerText;
  var cTest=regASIN.test(ostr);
  var dTest=regDF.test(ostr);
  if(cTest){
    result['ASIN']=ostr.replace(/ASIN:|\s/ig,'');
    console.log(result['ASIN']);
  };
  if(dTest){
    result['firstDate']=new Date(ostr.replace(/.*:/ig,''));
    console.log(result['firstDate']);
  }
  
}



result['url']=document.URL;
result['title']=document.URL.replace(/.*.com\/|\/dp.*/g,'');
for(var i=0;i<=trDOM.length-1;i++){
var str=trDOM[i].innerText;
var bTest=regBest.test(str);
var aTest=regReviews.test(str);
if(aTest){
  reviews=str.replace(/\n.*/g,'');
  result['reviews']=reviews;
}
if(bTest){
rank=trDOM[i].innerText.replace(/Best Sellers Rank|\n|\s/ig,' ').replace(/\s{2,}/g,'');
rank=rank.split('#').slice(1);
result['rank']=rank;

}else{
otherBest();
};

};
function otherBest(){
var salesRank=document.getElementById('SalesRank').innerText.replace(/amazon Best Sellers Rank:|\n|\s/ig,' ').replace(/\s{2,}/g,'');;

salesRank=salesRank.split('#').slice(1);
result['rank']=salesRank;

}
console.log(result);


// topReviewers()
setInterval("topReviewers()",3000);
function topReviewers(){
var links=document.links,_result=[],ln=links.length;
var regName=/_name/ig,
    regNext=/Next »/ig;
var next;
for(var i=0;i<=links.length-1;i++){
  ln--;
  if(regName.test(links[i].href)){
   
    _result.push(links[i].href);
  }
  if(regNext.test(links[i].innerText)){
    next=links[i];
  }
if(ln<=0){
console.log();
 localStorage[document.URL.replace(/.*_|.*=/g,'')]=_result;
console.log(next);
next.click()
}
}}


/// user detail
var result={},reviewsContent=[];
result['userID']=document.URL.replace(/.*profile\/|\/ref=.*/ig,'');
result['location']=document.getElementsByClassName('location-and-occupation-holder')[0].innerText.replace(/\n/ig,'');
result['bioExpander']=document.getElementsByClassName('bio-expander')[0].innerText.replace(/\n/ig,'').replace(/Helpful votes.*/ig,'');
var rTitle=document.getElementsByClassName('glimpse-product-title');
var rDate=document.getElementsByClassName('glimpse-raw-timestamp');
 
var ln=rTitle.length;
for(var i=0;i<rTitle.length;i++){
  ln--; 
     
     reviewsContent.push({
    'title':rTitle[i].innerText,
    'date':rDate[i].innerText
   });
 
if(ln<=0){
  result['reviewsContent']=reviewsContent;
}
}
console.log(result)
    
