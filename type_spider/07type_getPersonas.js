////第7步 用户画像Personas,保存为type_Personas.json,原文件缺失的清单type_erro_id.json
// 
var jsonObj=[{"id":"66868228","cnums":"44"},{"id":"66375512","cnums":"42"},{"id":"48217808","cnums":"66"},{"id":"58002601","cnums":"42"},{"id":"66914063","cnums":"49"}];



const fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html
var items=[];

var count=0;

var _PersonasNums=1.2;
//PersonasNums 3
var _TYPE="keepfit";
var path=[];
var erro_id=[];

 
for (var i = jsonObj.length - 1; i >= 0; i--) {
        //注意.cnums
    for (var j = Math.ceil(jsonObj[i].cnums/20); j >= 1; j--) {
            
           count++;

         };
    
   
};

for (var i = jsonObj.length - 1; i >= 0; i--) {
        
    for (var j =Math.ceil(jsonObj[i].cnums/20); j >= 1; j--) {
           count--; 
            
           path.push("./"+_TYPE+"_page/"+jsonObj[i].id+"="+j+"p.html");

           if (count<=0) {
                console.log("----------------------------------------------------------------------------------------------------------path准备好"+path.length+"个");

                next();
           };
         };
    
   
};
 
function next(){

	for (var i = path.length - 1; i >= 0; i--) {
		 
		


		try {
				var htmlfile=fs.readFileSync(path[i]);
				var url_id=path[i].replace('./'+_TYPE+'_page/','').replace('p.html','');
				var $ = cheerio.load(htmlfile);
				

				$('li','.comment-list').each(function (idx, element) {
					
				      var $element = $(element).html();
				      var content=cheerio.load($element);


				      var userDom=content(".pic");
				      var user_id=userDom.children().first().attr("user-id");
				      var user_name=userDom.children().first().children().attr("title");
				      var user_pic=userDom.children().first().children().attr("src");
				      var user_contribution=userDom.children().last().children().attr("title");

				      var commentDom=content(".content");
				      var comment_info=commentDom.children().first().text();
				      var comment_txt=commentDom.children().eq(1).text();
				      var comment_pic=commentDom.children().eq(2).children().children().html();
				      var comment_time=commentDom.children().eq(3).children().first().text();
							
							

				      
				     if (user_id) {
				     	items.push({ 	
				      	
				      	"personas":{"user_id":user_id,
							      	"user_name":user_name,
							      	"user_pic":user_pic,
							      	"user_contribution":user_contribution,
							        "comment_info":comment_info,
				      				"comment_txt":comment_txt,
				      				"comment_pic":stringMiddle(comment_pic,'<img src="','" panel-src'),
				      				"comment_time":comment_time,
				      				"target_id":url_id
				      			  }		      	
				      	
				      });

				      console.log("第"+items.length+"---------------------------共"+path.length*20);
				      console.log(items);






				     };
				      
				    

				      
				     // countNum--;//递减
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
							//fs.writeFile("./public/data/"+_TYPE+"_id.json",JSON.stringify(out_idall));
							//fs.writeFile("./public/data/"+_TYPE+"_id2.json",JSON.stringify(out_id2));
							//fs.writeFile("./public/data/"+_TYPE+"_id3.json",JSON.stringify(out_id3));
							//fs.writeFile("./public/data/"+_TYPE+"_id4.json",JSON.stringify(out_id4));
						
				      };
				    	*/	
				});
	    	

		} catch (err) {
			console.log(path[i]+"-------------------------------------------------");
			erro_id.push(path[i].replace('./'+_TYPE+'_page/','').replace('.html',''));
		    console.error(err);
		}

		 
		fs.writeFile("./public/data/"+_TYPE+"_PersonasNums"+_PersonasNums+".json",JSON.stringify(items),function(err){
						    if(!err)
						    console.log("done!!!!!!"+items.length)
						});
		fs.writeFile("./public/data/"+_TYPE+"_erro_id.json",JSON.stringify(erro_id),function(err){
						    if(!err)
						    console.log("erro!!!!!!"+erro_id.length)
						});

	};

};

function stringMiddle(strtarget,one,two){

	var str = strtarget;
	str = str.substring(str.indexOf(one) + 1,str.indexOf(two))
	return str

}