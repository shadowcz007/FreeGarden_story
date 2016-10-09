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
	    "memberId": String,
	    "userNickName":String,
		"userFace":String,
		"userPower":String,
		"manaScore":String,
		"cityName":String,
		"userSign":String,
		"userSex": Boolean,
		"reviewCount":Number,
		"noteCount":Number,
		"fansCount":Number,
		"vipStatus":Number,
		"noteCount":Number




},{collection:_TYPE});//记得指定collection

var model=mongoose.model(_TYPE,ScheMa);



//geoToMongodb("./public/data/"+_TYPE+"_geo.json");
//telToMongodb("./public/data/"+_TYPE+"_tel.json");	 

//personasToMongodb("./data/dpUser/"+_shopid+".json");
personasToMongodb1("./data/dpUser/user/");
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


function personasToMongodb1(path){

var filesArry=[];
var countss=0;
fs.readdir(path, function (err, files) {
	if(err) {
		    console.error(err);
		    return;
	} else {
		    files.forEach(function (file) {
		    	fs.readFile(path+file, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
				    if(err) {
				     console.error(err);
				     return;
				    }


				    console.log(file);

				   if (file!=".DS_Store") {
						let str1=data.replace(/.*null\(|\)\;/g,'');
				    
						let jsonobj=JSON.parse(str1);
						console.log("---------------------------------------------------------------------------jsonobj");
						 console.log(jsonobj.msg.userCarte.userId);
						 console.log(jsonobj.msg.userCarte.userNickName);
						 console.log(jsonobj.msg.userCarte.userFace);
						 console.log(jsonobj.msg.userCarte.userPower);
						 console.log(jsonobj.msg.userCarte.manaScore);
						 console.log(jsonobj.msg.userCarte.cityName);
						 console.log(jsonobj.msg.userCarte.userSign);
						 console.log(jsonobj.msg.userCarte.userSex);
						 console.log(jsonobj.msg.userCarte.reviewCount);
						 console.log(jsonobj.msg.userCarte.noteCount);
						 console.log(jsonobj.msg.userCarte.fansCount);
						 //console.log(jsonobj.msg.userCarte.badges);
						 console.log(typeof(jsonobj.msg.userCarte.vipStatus));
						 console.log(jsonobj.msg.userCarte.noteCount);
						console.log("------------------------------------------------------------jsonobj");

						




						let update_where = {"memberId":jsonobj.msg.userCarte.userId};//更新条件
						let update_data ={	
								"userNickName":jsonobj.msg.userCarte.userNickName,
								"userFace":jsonobj.msg.userCarte.userFace,
								"userPower":jsonobj.msg.userCarte.userPower,
								"manaScore":jsonobj.msg.userCarte.manaScore,
								"cityName":jsonobj.msg.userCarte.cityName,
								"userSign":jsonobj.msg.userCarte.userSign,
								"userSex":jsonobj.msg.userCarte.userSex,
								"reviewCount":jsonobj.msg.userCarte.reviewCount,
								"noteCount":jsonobj.msg.userCarte.noteCount,
								"fansCount":jsonobj.msg.userCarte.fansCount,
								"vipStatus":jsonobj.msg.userCarte.vipStatus,
								"noteCount":jsonobj.msg.userCarte.noteCount 
							
						};//更新数据
				 
						model.update(update_where,{$set:update_data},function(err){
						    if(err){
						        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
						    }else{
						        console.log('update success-----------');

						    }
						});	





				   };
				    


				   
				  





				});
		    	 
		    	//console.log(filesArry[0]);
		    });		 
		  }
	});

 






}



