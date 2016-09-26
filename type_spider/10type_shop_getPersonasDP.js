////第10步 通过爬下来的用户首页，爬取总点评数
// 

// 
var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html

var items=[];

var countNum=750;//先了解共有几组数据 count:0表示一个数据
var _id=["30923031","5974633","56916037","46362813","526697414","20833928","66756344","104532421","924676467",
  "1056366585","5379090","7926367","29568202","40661949","107255344",  "49805736","62327962","829744081",
  "31421740","11358854"];

var _TYPE="keepfit";


var _ID=50;//页数

var path=[];

var count=_id.length;

var downNum=0;

var down_ID=[];

for (var i = _id.length-1; i >=0; i--) {
	path.push("./"+_TYPE+"_page/"+_id[i]+"p.html");
	
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
			var comss=$('.cur').first().text().replace('点评(','').replace(')','');
			 
			items.push({"user_id":path[i].replace("./"+_TYPE+"_page/","").replace("p.html",""),
				"comments":comss});
			

			fs.writeFile("./public/data/"+_TYPE+"_PersonasList1.json",JSON.stringify(items),function(err){
						    if(!err)
						    console.log("写入成功！");
						console.log(items.length);
						});




			$('.p-term-list').each(function (idx, element) {
				
			      var $element = $(element).text();

			     // _id.push(url.replace("/shop/",""));
			     console.log($element);
			      
			      console.log("第"+items.length);
			      console.log("---------------------");

			      
			      /*
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
			      */
			    		
			});

		} catch (err) {
			console.log(path[i]+"-------------------------------------------------");
			//erro_id.push(path[i]);
		    console.error(err);
		}

	 
	 
	

	};


};









