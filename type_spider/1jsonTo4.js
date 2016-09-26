var fs=require('fs');//读写文件

var items=[];

var _id=[];
var links=[];

//Json1to4();

JsondownloadPic();

function JsondownloadPic(){
		fs.readFile('./public/data/keepfit_Personas.json',function(err,data){ 

		console.log(data);
		var jsonObj=JSON.parse(data);
		
		for (var i = jsonObj.length - 1; i >= 0; i--) {
			links.push({
			  		"id":jsonObj[i].personas.user_id,
			  		"url":jsonObj[i].personas.user_pic});
		};
		


		var files=Math.ceil(jsonObj.length/4);
		      		var out_id1=[];
		      		var out_id2=[];
		      		var out_id3=[];
		      		var out_id4=[];

		      		for (var i = links.length - 1; i >= 0; i--) {
		      			if(i>=0 && i<files){out_id1.push(links[i]);};
		      			if(i>=files && i<files*2){out_id2.push(links[i]);};
		      			if(i>=files*2 && i<files*3){out_id3.push(links[i]);};
		      			if(i>=files*3){out_id4.push(links[i]);};
		      		};
		      	
					fs.writeFileSync("./public/data/keepfit_PersonasPic.json",JSON.stringify(out_id1, null, 2));
				
					


	}) 

}






function Json1to4(){
		fs.readFile('./public/data/play.json',function(err,data){ 

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
		      	
					fs.writeFileSync("./public/data/play_1.json",JSON.stringify(out_id1));
					fs.writeFileSync("./public/data/play_2.json",JSON.stringify(out_id2));
					fs.writeFileSync("./public/data/play_3.json",JSON.stringify(out_id3));
					fs.writeFileSync("./public/data/play_4.json",JSON.stringify(out_id4));
					console.log(out_id1.length);
					console.log(out_id2.length);
					console.log(out_id3.length);
					console.log(out_id4.length);


	}) 

}


