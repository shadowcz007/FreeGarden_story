////第10步 通过爬下来的用户首页，爬取总点评数
// 

// 
var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html

var items=[];

var countNum=750;//先了解共有几组数据 count:0表示一个数据
var _id=["99632986","195616","28499284","7986960","1096580053","125626504","9035871","22098346","19062301","456368","134145437","3806404","792469","6763677","47254888","1012630781","6092714","56865694","46234198","21932669","18701110","28215143","4690216","41933788","9517761","26084079","3604763","2055454","5365301","2886027","461709","159583077","193386882","18572987","5389453","7994876","10615519","48165007","6349616","9546442"];

var _TYPE="eat_Mr_Nice";
var _PG="4";

var _ID=50;//页数

var path=[];

var count=_id.length;

var downNum=0;

var down_ID=[];

for (var i = _id.length-1; i >=0; i--) {
	path.push("./"+_TYPE+"_page/"+_id[i]+".html");
	
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
			 
			items.push({"user_id":path[i].replace("./"+_TYPE+"_page/","").replace("p.html","").replace('.html',''),
				"comments":comss});
			

			fs.writeFile("./public/data/"+_TYPE+"_PersonasList"+_PG+".json",JSON.stringify(items),function(err){
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









