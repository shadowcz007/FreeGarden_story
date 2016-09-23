var fs=require('fs');//读写文件

var items=[];

var _id=[];

//Json1to4();

function Json1to4(){
		fs.readFile('./public/data/keepfit-id1.json',function(err,data){ 

		console.log(data);
		var jsonObj=JSON.parse(data);
		
		var files=Math.ceil(jsonObj.length/4);
		      		var out_id1=[];
		      		var out_id2=[];
		      		var out_id3=[];
		      		var out_id4=[];

		      		for (var i = jsonObj.length - 1; i >= 0; i--) {
		      			if(i>=0 && i<files){out_id1.push(jsonObj[i]);};
		      			if(i>=files && i<files*2){out_id2.push(jsonObj[i]);};
		      			if(i>=files*2 && i<files*3){out_id3.push(jsonObj[i]);};
		      			if(i>=files*3){out_id4.push(jsonObj[i]);};
		      		};
		      	
					fs.writeFileSync("./public/data/keepfit_id1_1.json",JSON.stringify(out_id1));
					fs.writeFileSync("./public/data/keepfit_id1_2.json",JSON.stringify(out_id2));
					fs.writeFileSync("./public/data/keepfit_id1_3.json",JSON.stringify(out_id3));
					fs.writeFileSync("./public/data/keepfit_id1_4.json",JSON.stringify(out_id4));
					console.log(out_id1.length);
					console.log(out_id2.length);
					console.log(out_id3.length);
					console.log(out_id4.length);


	}) 

}


