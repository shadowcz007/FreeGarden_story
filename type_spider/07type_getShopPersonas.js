////第7步 用户画像Personas,保存为type_Personas.json;到访的所有用户id _PersonasList,原文件缺失的清单type_erro_id.json
// [{"id":"8903730","comments":"10617"},{"id":"67087734","comments":"1496"},{"id":"21037013","comments":"7881"},{"id":"67255928","comments":"461"},{"id":"23999832","comments":"7480"},{"id":"15864424","comments":"13887"}];
 

var jsonObj=[{"id":"67255928","comments":"461"},{"id":"23999832","comments":"7480"}];
const fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html
var items=[];

var count=0;

var _PersonasNums=5;
//PersonasNums 5
var _TYPE="eat_Mr_Nice";
var path=[];
var erro_id=[];
var user_id_Array=[];
var comments_Array=[];
 
for (let i = jsonObj.length - 1; i >= 0; i--) {
        //注意.comments
    for (let j = Math.ceil(jsonObj[i].comments/20); j >= 1; j--) {
            
           count++;

         };
    
   
};

for (let i = jsonObj.length - 1; i >= 0; i--) {
        
    for (let j =Math.ceil(jsonObj[i].comments/20); j >= 1; j--) {
           count--; 
            
           path.push("./"+_TYPE+"_page/"+jsonObj[i].id+"="+j+"p.html");

           if (count<=0) {

                console.log("----------------------------------------------------------------------------------------------------------path准备好"+path.length+"个");

                next();
           };
         };
    
   
};
 
function next(){
//path=path.slice(265,530);
console.log(path);
	for (let i = path.length - 1; i >= 0; i--) {
		 
		//for (let i = path.length - 1; i >= 0; i--) {


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
				      				//"comment_pic":stringMiddle(comment_pic,'<img src="','" panel-src').replace('img src="',''),
				      				"comment_time":comment_time,
				      				"target_id":url_id.substring(0,url_id.length-2)
				      			  }		      	
				      	
				      });

				     	user_id_Array.push(user_id);
				     	comments_Array.push(comment_txt);

				      //console.log("第"+items.length+"---------------------------共"+path.length);
				      //console.log(items);






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

		 
		fs.writeFile("./public/data/"+_TYPE+"_Personas"+_PersonasNums+".json",JSON.stringify(items, null, 2),function(err){
						    if(!err)
						    console.log("done!!!!!!"+items.length)
						});
		
		fs.writeFile("./public/data/"+_TYPE+"_PersonasList"+_PersonasNums+".json",JSON.stringify(unique3(user_id_Array)),function(err){
						    if(!err)
						    console.log("done!!!!!!"+items.length)
						});
		fs.writeFile("./public/data/"+_TYPE+"_Personas_comments"+_PersonasNums+".json",JSON.stringify(comments_Array,null,2),function(err){
						    if(!err)
						    console.log("done!!!!!!"+items.length)
						});
		


		/*fs.writeFile("./public/data/"+_TYPE+"_erro_id.json",JSON.stringify(erro_id),function(err){
						    if(!err)
						    console.log("erro!!!!!!"+erro_id.length)
						});
	*/
	};

};

function stringMiddle(strtarget,one,two){

	var str = strtarget;
	str = str.substring(str.indexOf(one) + 1,str.indexOf(two))
	return str

}
function unique3(array){
 var res = [];
 var json = {};
 for(var i = 0; i < array.length; i++){
  if(!json[array[i]]){
   res.push(array[i]);
   json[array[i]] = 1;
  }
 }
 return res;
}


