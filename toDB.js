const fs=require('fs');//读写文件
// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost/hello'
  , options = {};
	
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};
	
mongoose.connect(connectionString, options, function(err, res) {  
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connectionString);
  }
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});

var _shopid="588393680";

var _TYPE='DisneySH';

var Schema=mongoose.Schema;

var ScheMa=new Schema({	
	    "memberId": String




},{collection:_TYPE});//记得指定collection

var model=mongoose.model(_TYPE,ScheMa);



//geoToMongodb("./public/data/"+_TYPE+"_geo.json");
//telToMongodb("./public/data/"+_TYPE+"_tel.json");	 

personasToMongodb("./data/dpUser/"+_shopid+".json");
//comsToMongodb("./public/data/"+_TYPE+"_PersonasNums1.json");
//comsNumsToMongodb("./public/data/"+_TYPE+".json");




///personas入库


function personasToMongodb(path){
	let data=fs.readFileSync(path);
	let jsonobj1=JSON.parse(data);
	let jsonObj=jsonobj1.list;

	let myarray=[];

	let count_per=0;

	for (let i = jsonObj.length - 1; i >= 0; i--) {
		let _json1=jsonObj[i].user_id;

		for (let i = _json1.length - 1; i >= 0; i--) {
			 
	
		//myarray.push(_json1.replace("{","").replace("}","").split(/[,_]/));
		
		console.log("---------------");
		//console.log(_json1.user_id);
		
		let newUser_id = {'memberId':_json1[i]};
		let newUser={
				'memberId':_json1[i]
				
		};
		model.findOne(newUser_id,function(err,person){
      
      		//console.log(person);
      		
      		if (person==null) {
      			model.create(newUser,function(){
      				count_per++;
		    		console.log("------------------create user ok,共"+count_per);
		    	});

      		}else{
      			console.log(_json1.user_id+"已经存在---------------");

      		};
      		
    	});

	};

	};
 
}

//comments


function comsToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];


	for (let i = jsonObj.length - 1; i >= 0; i--) {
		let _json1=jsonObj[i].personas;
		//myarray.push(_json1.replace("{","").replace("}","").split(/[,_]/));
		
		//console.log(_json1.id)


		let update_where = {"id":_json1.target_id};//更新条件
		let update_data ={"personas":{	
				"user_id":_json1.user_id,
				"comment_info":_json1.comment_info,
				"comment_txt":_json1.comment_txt,
				"comment_pic":_json1.comment_pic,
				"comment_time":_json1.comment_time
			
		}};//更新数据
 
		keepfitshopmodel.update(update_where,{$addToSet:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});





	};
 
}
//查找数据
//user_line("523261");
function user_line(uid){
	eat_Mr_Nice_PersonasAlldpmodel.find({"user_id":uid},{"shop_id":1},function(err,data){
		var jijij=data;
		
		for (var i = jijij.length - 1; i >= 0; i--) {
			
			eat_Mr_Nice_geomodel.find({"shop_id":jijij[i].shop_id},{"lat":1,"lng":1},function(err,data){
			console.log(data);
			});
		};



});	

}

function comsNumsToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];


	for (let i = jsonObj.length - 1; i >= 0; i--) {
		let _json1=jsonObj[i];
		//myarray.push(_json1.replace("{","").replace("}","").split(/[,_]/));
		
		//console.log(_json1.id)


		let update_where = {"id":_json1.id};//更新条件
		let update_data = {"comments":_json1.comments};//更新数据

		keepfitshopmodel.update(update_where,{$set:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});





	};
 
}



///////  Geo 入库



function geoToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];

	for (let i = jsonObj.length - 1; i >= 0; i--) {
		myarray.push(jsonObj[i].replace("{","").replace("}","").split(/[,_]/));
		

	};

	for (let i = myarray.length - 1; i >= 0; i--) {
		console.log(myarray[i][1]);

		let id=myarray[i][0].replace("id:","");
		let	lat=myarray[i][1];
		let	lng=myarray[i][2];
		let	address=myarray[i][4];

		let update_where = {"id":id};//更新条件
		let update_data = {"lat":lat,"lng":lng,"address":address};//更新数据
		keepfitshopmodel.update(update_where,{$set:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});

		
		console.log(myarray.length);
		
		
	};
}



///////  Tel 入库

 

function telToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];


	for (let i = jsonObj.length - 1; i >= 0; i--) {
		let _json1=jsonObj[i];
		//myarray.push(_json1.replace("{","").replace("}","").split(/[,_]/));
		
		//console.log(_json1.id)


		let update_where = {"id":_json1.id};//更新条件
		let update_data = {"tel":_json1.tel};//更新数据

		keepfitshopmodel.update(update_where,{$set:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});





	};
 
}

//////

/*
var query = keepfitshopmodel.find({});//当不带回调时会返回一个query对象
query.where('tel').lt(1)//字段小于1
    .exec(function(err,data){
    //回调函数，do some thing
    console.log(data);
});
*/
/*
var query = personModel.find({});//当不带回调时会返回一个query对象
query
    .skip(10)//跳过十行记录
    .limit(10)//查询十行记录
    .sort({_id:-1})//按id逆序排列
    .where('age').gt(17).lt(66)//age字段大于17小于66
    .exec(function(err,data){
    //回调函数，do some thing
});
*/
