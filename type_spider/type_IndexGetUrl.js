var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html
var items=[];

var count=900;//先了解共有几组数据
var _id=[];

fs.readFile('origin/ysindex.html',function(err,data){  
    if(err) { throw err;  } 
    
    var $ = cheerio.load(data);

		$('.item').each(function (idx, element) {
			console.log(idx);
		      var $element = $(element).html();
		      var content=cheerio.load($element);
		      var name=content(".name").text();
		      var url=$(element).attr("href");
		      var star=content('.star').attr("class").replace("star","").replace("star-","").replace(" ","");
		      var price=content('.comment').text().replace("消费:","");
		      var area=content('.intro').children().first().text();
		      _id.push(url.replace("/shop/",""));

		      items.push({
		      	"name":name,
		      	"id":url.replace("/shop/",""),
		      	"star":star,
		      	"price":price,
		      	"area":area

		      });
		      console.log("第"+items.length);
		      console.log("---------------------");

		      count--;//递减
		      if(count<=0){
		      		//最后输出
		      		console.log(count);
		      		console.log("共"+items.length);
		      		fs.writeFile("data/ys.json",JSON.stringify(items),function(err){
					    if(!err)
					    console.log("写入成功！")
					});

					fs.writeFile("data/ys_id.json",JSON.stringify(_id),function(err){
					    if(!err)
					    console.log(_id.length)
					});

		      };
		    		
		});



    
  // console.log("00"+items.length); 

});
