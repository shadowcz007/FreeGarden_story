
var _shopid="88532840";

var _TYPE='keepfitPerfectPersonas1';

var _connectDB="keepfit";





const fs=require('fs');//读写文件
// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost/'+_connectDB
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
		"noteCount":Number,
		"birthloc":String,
		"tx":String,
		"love":String,
		"bday":String,
		"xz":String,
		"ip":String,
		"zy":String,
		"like":String,
		"school":String,
		"fans":Number,
		"tag":String,
		"repeat":Array	




},{collection:_TYPE});//记得指定collection

var model=mongoose.model(_TYPE,ScheMa);

var GPScheMa=new Schema({	
	    "user_id":String,
	    "shop_id":String,
	    "star":Number,
	    "date":String,
	    "lat":Number,
        "lng":Number,
        "shopname":String,
        "address":String
        




},{collection:"goodPoint"});//记得指定collection

var GPmodel=mongoose.model("goodPoint",GPScheMa);

//geoToMongodb("./data/dpUser/goodPoint.json");


 //personasToMongodb("./data/dpUser/"+_shopid+".json");
 

//personasToMongodb1("./data/dpUser/user/");
personasToMongodb2("./data/dpUser/KF2.json");//moreinfo


function geoToMongodb(path){
	var data=fs.readFileSync(path);
	var jsonObj=JSON.parse(data);

		
	for (let i = jsonObj.length - 1; i >= 0; i--) {
		console.log(jsonObj[i]);

		let id=jsonObj[i].shop_id;
		let	lat=jsonObj[i].lat;
		let	lng=jsonObj[i].lng;
		let	address=jsonObj[i].address;
		let	name=jsonObj[i].shopname;

		let update_where = {"shop_id":id};//更新条件
		let update_data = {"lat":lat,"lng":lng,"address":address,"shopname":name};//更新数据
		
		GPmodel.update(update_where,{$set:update_data},function(err){
		    if(err){
		        console.log('update error!!!!!!!!!!!!!!!!!!!!!'+i);
		    }else{
		        console.log('update success-----------'+i);

		    }
		});

		
		console.log(jsonObj.length);
		
		
	};
}


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
				'memberId':_json1[i],
				"repeat":_shopid.replace(/.{1}$/,'')	
				
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
      			let update_where = {'memberId':_json1[i]};//更新条件
				let update_data ={	
								"repeat":_shopid.replace(/.{1}$/,'')							 
							
						};//更新数据
							
				 
				model.update(update_where,{$addToSet:update_data},function(err){
						    if(err){
						        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
						    }else{
						        console.log('update success-----------'+_shopid.replace(/.{1}$/,''));

						    }
				});	

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
	 try {
		    files.forEach(function (file) {
		    	fs.readFile(path+file, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
				    if(err) {
				     console.error(err+"-------------------------------------");

				     //return;
				    }


				    //console.log(file);

				   if (file!=".DS_Store") {
						let str1=data.replace(/.*null\(|\)\;/g,'');
						var reg=/!DOCTYPE html PUBLIC/;
				    	if (reg.test(str1)) {
				    		  console.error("---html----------------------------------");
				    	}else{
				    		
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

				   };
				    


				   
				  





				});
		    	 
		    	//console.log(filesArry[0]);
		    });		 
		  }catch(err) {
		   // console.error(err);		    
			}

	});

 






}



function personasToMongodb2(path){

let data=fs.readFileSync(path);




	let jsonobj1=JSON.parse(data);
	
	let jsonObj=jsonobj1.list;

	 

	let count_per=0;

	for (let i = jsonObj.length - 1; i >= 0; i--) {
		let more_info=jsonObj[i].more_info;
		let user_id=jsonObj[i].user_id;
		let ufas=jsonObj[i].fans;
		let utag=jsonObj[i].tag;
		 
	if (more_info) {

		more_info=more_info.replace(/\s{1,}/g,'');

		let birthloc=null,
			tx=null,
			love=null,
			bday=null,
			xz=null,
			ip=null,
			zy=null,
			like=null,
			school=null;

		var reg=/出生地：/;
		if (reg.test(more_info)) {
			birthloc=more_info.replace(reg,'').replace(/,.*/,'').replace(/~/g,'');

		};		
		 
		let txr=/.*体型：/;
		if (txr.test(more_info)) {
			tx=more_info.replace(txr,'').replace(/,.*/,'');
		};


		let lover=/.*恋爱状况：/;
		if (lover.test(more_info)) {
			love=more_info.replace(lover,'').replace(/,.*/,'');
		};

		let bdayr=/.*生日：/;
		if (bdayr.test(more_info)) {
			bday=more_info.replace(bdayr,'').replace(/,.*/,'');
		};

		let xzr=/.*星座：/;
		if (xzr.test(more_info)) {
			xz=more_info.replace(xzr,'').replace(/,.*/,'');
		};

		let ipr=/.*个人主页：/;
		if (ipr.test(more_info)) {
			ip=more_info.replace(ipr,'').replace(/,.*/,'');
		};

		let zyr=/.*行业职业：/;
		if (zyr.test(more_info)) {
			zy=more_info.replace(zyr,'').replace(/,.*/,'');
		};

		let liker=/.*爱好：/;
		if (liker.test(more_info)) {
			like=more_info.replace(liker,'').replace(/电影\/导演\/演员：|音乐\/歌曲\/音乐人：|菜肴\/菜系\/餐厅：|书\/作者：|无,/g,'').replace('.',',');
		};

		let schoolr=/.*毕业大学：/;
		if (schoolr.test(more_info)) {
			school=more_info.replace(schoolr,'').replace(/,.*/,'');
		};

		console.log(birthloc);
		console.log(tx);
		console.log(love);
		console.log(bday);
		console.log(xz);
		console.log(ip);
		console.log(zy);
		console.log(like);
		console.log(school);
		console.log(ufas);
		console.log(utag);
		//console.log("-------------")
		//console.log(more_info);
		console.log("---------------------------------------------------");
		//console.log(_json1.user_id);
		
		let update_where = {"memberId":user_id};//更新条件

		let update_data ={	
								"birthloc":birthloc,
								"tx":tx,
								"love":love,
								"bday":bday,
								"xz":xz,
								"ip":ip,
								"zy":zy,
								"like":like,
								"school":school,
								"fans":ufas,
								"tag":utag	 
							
						};//更新数据
				 
		model.update(update_where,{$set:update_data},function(err){
						    if(err){
						        console.log('update error!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
						    }else{
						        console.log('update success-----------');

						    }
		});	
	 
 

	}; 

	};

 






}


