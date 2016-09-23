const fs=require('fs');//读写文件
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hello');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});



var _TYPE='jy';

var Schema=mongoose.Schema;

var ScheMa=new Schema({	
	    "url": String,        
        "star": String,
        "area": String,
        "id":String,
        "address":String,
        "lat":String,
        "lng":String,
        "tel":String,
        "comments":String



},{collection:_TYPE});//记得指定collection

var keepfitshopmodel=mongoose.model(_TYPE,ScheMa);
	 

///////  Geo 入库

//geoToMongodb("./public/data/"+_TYPE+"_geo.json");

function geoToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];

	for (var i = jsonObj.length - 1; i >= 0; i--) {
		myarray.push(jsonObj[i].replace("{","").replace("}","").split(/[,_]/));
		

	};

	for (var i = myarray.length - 1; i >= 0; i--) {
		console.log(myarray[i][1]);

		var id=myarray[i][0].replace("id:","");
		var	lat=myarray[i][1];
		var	lng=myarray[i][2];
		var	address=myarray[i][4];

		var update_where = {"id":id};//更新条件
		var update_data = {"lat":lat,"lng":lng,"address":address};//更新数据
		keepfitshopmodel.update(update_where,{$set:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});

		console.log(id);
		console.log(lat);
		console.log(lng);
		console.log(address);
		console.log(myarray.length);
		
		
	};
}



///////  Tel 入库

 telToMongodb("./public/data/"+_TYPE+"_tel.json");

function telToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

	var myarray=[];


	for (var i = jsonObj.length - 1; i >= 0; i--) {
		var _json1=jsonObj[i];
		//myarray.push(_json1.replace("{","").replace("}","").split(/[,_]/));
		
		//console.log(_json1.id)


		var update_where = {"id":_json1.id};//更新条件
		var update_data = {"tel":_json1.tel};//更新数据

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
