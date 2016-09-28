////第11步 一个用户的点评页，通过爬下来的所有用户点评页，获取点评的信息，保存为type_PersonasAlldp.json,及type_shop_id.json
// 

// 
var fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html

var items=[];

var countNum=0;//先了解共有几组数据 count:0表示一个数据
//var _id=[{"user_id":"8903730","comments":"10617"},{"user_id":"8903730","comments":"10617"},{
//	"user_id":"67087734","comments":"1496"},{"user_id":"21037013","comments":"7881"},{"user_id":"67255928","comments":"461"},{"user_id":"23999832","comments":"7480"},{"user_id":"15864424","comments":"13887"}];

var _id=[{"user_id":"99632986","comments":"2"},{"user_id":"195616","comments":"73"},{"user_id":"28499284","comments":"24"},{"user_id":"7986960","comments":"50"},{"user_id":"1096580053","comments":"31"},{"user_id":"125626504","comments":"9"},{"user_id":"9035871","comments":"31"},{"user_id":"22098346","comments":"31"},{"user_id":"19062301","comments":"237"},{"user_id":"456368","comments":"257"},{"user_id":"134145437","comments":"0"},{"user_id":"3806404","comments":"104"},{"user_id":"792469","comments":"48"},{"user_id":"6763677","comments":"20"},{"user_id":"47254888","comments":"57"},{"user_id":"1012630781","comments":"129"},{"user_id":"6092714","comments":"30"},{"user_id":"56865694","comments":"51"},{"user_id":"46234198","comments":"2"},{"user_id":"21932669","comments":"32"},{"user_id":"18701110","comments":"8"},{"user_id":"28215143","comments":"93"},{"user_id":"4690216","comments":"64"},{"user_id":"41933788","comments":"58"},{"user_id":"9517761","comments":"27"},{"user_id":"26084079","comments":"37"},{"user_id":"3604763","comments":"347"},{"user_id":"2055454","comments":"98"},{"user_id":"5365301","comments":"18"},{"user_id":"2886027","comments":"38"},{"user_id":"461709","comments":"69"},{"user_id":"159583077","comments":"2"},{"user_id":"193386882","comments":"13"},{"user_id":"18572987","comments":"47"},{"user_id":"5389453","comments":"300"},{"user_id":"7994876","comments":"70"},{"user_id":"10615519","comments":"102"},{"user_id":"48165007","comments":"5"},{"user_id":"6349616","comments":"86"},{"user_id":"9546442","comments":"58"}];


var _TYPE="eat_Mr_Nice";

var _PAGE="4";

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
			      		fs.writeFile("./public/data/"+_TYPE+"_PersonasAlldp"+_PAGE+".json",JSON.stringify(items,null,2),function(err){
						    if(!err)
						    console.log("写入成功！");
						console.log(items.length);
						});

						fs.writeFile("./public/data/"+_TYPE+"_PersonasAlldp_shop_id"+_PAGE+".json",JSON.stringify(unique3(shop_id_array)),function(err){
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





