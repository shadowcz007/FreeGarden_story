////第11步 通过爬下来的所有用户点评页，获取点评的信息，保存为type_PersonasAlldp.json,及type_shop_id.json
// 

// 
var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html

var items=[];

var countNum=0;//先了解共有几组数据 count:0表示一个数据
var _id=[{"user_id":"30923031","comments":"1"},{"user_id":"5974633","comments":"10"},{"user_id":"56916037","comments":"76"},{"user_id":"46362813","comments":"13"},{"user_id":"526697414","comments":"1"},{"user_id":"20833928","comments":"27"},{"user_id":"66756344","comments":"2"},{"user_id":"104532421","comments":"20"},{"user_id":"924676467","comments":"2"},{"user_id":"1056366585","comments":"1"},{"user_id":"5379090","comments":"1"},{"user_id":"7926367","comments":"8"},{"user_id":"29568202","comments":"5"},{"user_id":"40661949","comments":"4"},{"user_id":"107255344","comments":"3"},{"user_id":"49805736","comments":"10"},{"user_id":"62327962","comments":"10"},{"user_id":"829744081","comments":"13"},{"user_id":"31421740","comments":"11"},{"user_id":"11358854","comments":"6"}];

var _TYPE="keepfit";


var _ID=50;//页数

var path=[];

var count=0;

var downNum=0;

var down_ID=[];

var shop_id_array=[];

for (let i = _id.length - 1; i >= 0; i--) {
	for (let j =Math.ceil(_id[i].comments/15); j >= 1; j--) {
		count=_id.length;
	}
} 




for (let i = _id.length - 1; i >= 0; i--) {
        
  	

   	for (let j =Math.ceil(_id[i].comments/15); j >= 1; j--) {
   		
   		path.push("./"+_TYPE+"_page/"+_id[i].user_id+"pg="+j+".html");
		count--;
   		
   		console.log(count);

   	};

   		if (count<=0) {
			 console.log("url准备好"+path.length+"个");
			 countNum=path.length;

			 next();
   		};

   console.log(count);
};




function next(){

	for (var i = path.length - 1; i >= 0; i--) {
	 

		try {
	    	var htmlfile=fs.readFileSync(path[i]);

			var $ = cheerio.load(htmlfile);
			let user_id=$('.head-user').children().children().attr('href').replace('/member/','');

		$('#J_review').children().children().children().each(function (idx, element) {
				
			      var $element = $(element).html();

			      var content=cheerio.load($element);

			      var shop_id=content(".J_rpttitle").attr("href").replace('http://www.dianping.com/shop/','');
				var star=content('.item-rank-rst').attr("class").replace("item-rank-rst","").replace("irr-star","").replace(" ","");
			      
			      var date=content(".info").children().first().text();
			       
			      items.push({
			      	"user_id":user_id,
			      	"shop_id":shop_id,
			      	"star":star,
			      	"date":date

			      } );
			      shop_id_array.push(shop_id);
			      console.log("第"+items.length);
			      console.log("--------------------------");

			      countNum--;
			      
			      if(countNum<=0){
			      		//最后输出
			      		console.log(countNum);
			      		console.log("共"+items.length);
			      		fs.writeFile("./public/data/"+_TYPE+"_PersonasAlldp.json",JSON.stringify(items,null,2),function(err){
						    if(!err)
						    console.log("写入成功！");
						console.log(items.length);
						});

						fs.writeFile("./public/data/"+_TYPE+"_PersonasAlldp_shop_id.json",JSON.stringify(unique3(shop_id_array)),function(err){
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
			      
			    		
			});

		} catch (err) {
			console.log(path[i]+"-------------------------------------------------");
			//erro_id.push(path[i]);
		    console.error(err);
		}

	 
	 
	

	};


};



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





