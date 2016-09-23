////第2步 通过下载下来的index页，提取出url清单,保存为4个type_id.json及原始的type.json
// 

// 
var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html

var items=[];

var countNum=750;//先了解共有几组数据 count:0表示一个数据
var _id=[];

var _TYPE="play";


var _ID=50;//页数

var path=[];

var count=_ID;

var downNum=0;

var down_ID=[];

for (var i = _ID; i >= 1; i--) {
	path.push("./"+_TYPE+"_page/"+i+".html");
	count--;
	if (count<=0) {
		
		console.log("filepath准备好"+path.length+"个");
		next();
	};
};




function next(){

	for (var i = path.length - 1; i >= 0; i--) {
	 
	


		try {
	    	var htmlfile=fs.readFileSync(path[i]);

			var $ = cheerio.load(htmlfile);
			

			$('li','#shop-all-list').each(function (idx, element) {
				
			      var $element = $(element).html();
			      var content=cheerio.load($element);
			      var name=content(".tit").text();
			      var url=content(".tit").children().first().attr("href");
			      var star=content('.sml-rank-stars').attr("class").replace("sml-rank-stars","").replace("sml-str","").replace(" ","");
			      var price=content('.mean-price').text().replace("消费:","");
			      var comments=content('.review-num').text();
			      var area=content('a','.tag-addr').last().text();
			     // _id.push(url.replace("/shop/",""));

			      items.push({
			      	"name":name,
			      	"id":url.replace("/shop/",""),
			      	"star":star,
			      	"price":price,
			      	"area":area,
			      	"comments":comments

			      });
			      console.log("第"+items.length);
			      console.log("---------------------");

			      countNum--;//递减
			      if(countNum<=0){
			      		//最后输出
			      		console.log(countNum);
			      		console.log("共"+items.length);
			      		fs.writeFile("./public/data/"+_TYPE+".json",JSON.stringify(items),function(err){
						    if(!err)
						    console.log("写入成功！");
						console.log(items.length);
						});

			      		var files=Math.ceil(items.length/4);
			      		var out_id1=[];
			      		var out_id2=[];
			      		var out_id3=[];
			      		var out_id4=[];
			      		var out_idall=[];

			      		for (var i = items.length - 1; i >= 0; i--) {
			      			out_idall.push(items[i].id);
			      			if(i>=0 && i<files){out_id1.push(items[i].id);};
			      			if(i>=files && i<files*2){out_id2.push(items[i].id);};
			      			if(i>=files*2 && i<files*3){out_id3.push(items[i].id);};
			      			if(i>=files*3){out_id4.push(items[i].id);};
			      		};
			      	

			      		console.log(out_id1.length+"iididididi");
						fs.writeFile("./public/data/"+_TYPE+"_id.json",JSON.stringify(out_idall));
						//fs.writeFile("./public/data/"+_TYPE+"_id2.json",JSON.stringify(out_id2));
						//fs.writeFile("./public/data/"+_TYPE+"_id3.json",JSON.stringify(out_id3));
						//fs.writeFile("./public/data/"+_TYPE+"_id4.json",JSON.stringify(out_id4));

			      };
			    		
			});

		} catch (err) {
			console.log(path[i]+"-------------------------------------------------");
			//erro_id.push(path[i]);
		    console.error(err);
		}

	 
	 
	

	};


};









