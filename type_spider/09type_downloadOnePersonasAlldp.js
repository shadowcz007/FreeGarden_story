
//第一页跟所有页面，公用此方法 
//获得 用户页第一页 ,及获取用户所有的点评页，先通过id来下载第一页，然后，10type_getPersonasDP.js 来获取点评的数量，再输入获取
//-----11 alldp

var casper = require('casper').create();

var origin="http://www.dianping.com/member/";

var originLast="/reviews";
 console.log(originLast);

//var jsonObj=require('./public/data/play_0.json');
var jsonObj=[{"user_id":"99632986","comments":"2"},{"user_id":"195616","comments":"73"},{"user_id":"28499284","comments":"24"},{"user_id":"7986960","comments":"50"},{"user_id":"1096580053","comments":"31"},{"user_id":"125626504","comments":"9"},{"user_id":"9035871","comments":"31"},{"user_id":"22098346","comments":"31"},{"user_id":"19062301","comments":"237"},{"user_id":"456368","comments":"257"},{"user_id":"134145437","comments":"0"},{"user_id":"3806404","comments":"104"},{"user_id":"792469","comments":"48"},{"user_id":"6763677","comments":"20"},{"user_id":"47254888","comments":"57"},{"user_id":"1012630781","comments":"129"},{"user_id":"6092714","comments":"30"},{"user_id":"56865694","comments":"51"},{"user_id":"46234198","comments":"2"},{"user_id":"21932669","comments":"32"},{"user_id":"18701110","comments":"8"},{"user_id":"28215143","comments":"93"},{"user_id":"4690216","comments":"64"},{"user_id":"41933788","comments":"58"},{"user_id":"9517761","comments":"27"},{"user_id":"26084079","comments":"37"},{"user_id":"3604763","comments":"347"},{"user_id":"2055454","comments":"98"},{"user_id":"5365301","comments":"18"},{"user_id":"2886027","comments":"38"},{"user_id":"461709","comments":"69"},{"user_id":"159583077","comments":"2"},{"user_id":"193386882","comments":"13"},{"user_id":"18572987","comments":"47"},{"user_id":"5389453","comments":"300"},{"user_id":"7994876","comments":"70"},{"user_id":"10615519","comments":"102"},{"user_id":"48165007","comments":"5"},{"user_id":"6349616","comments":"86"},{"user_id":"9546442","comments":"58"}];


var _TYPE="eat_Mr_Nice";
var _ID=50;//页数50

var links=[];
var count=0;

var downNum=0;

var down_ID=[];




for (var i = jsonObj.length - 1; i >= 0; i--) {
        
   if (jsonObj[i].comments) {
   				for (var j =Math.ceil(jsonObj[i].comments/15); j >= 1; j--) {
   						links.push( origin+jsonObj[i].user_id+originLast+"?pg="+j);

   				};


   }else{
 			    links.push( origin+jsonObj[i]+originLast);
           
           console.log("url准备好"+links.length+"个");

   };
          

           
           
        
    
   
};
console.log(links);

next();


function next(){

	casper.start().each(links, function(self, link) {

    	self.thenOpen(link, function() {
	    		var page=this.getCurrentUrl().replace(origin,'').replace(originLast,'').replace('?','');
    			
    			downNum++;    	

    			
    			console.log(page+"-----------第"+downNum);
				this.download(link,"./"+_TYPE+"_page/"+page+".html"); 

					var  dpNums = this.evaluate(function(){
			    		
			    		var  elts = $("li.cur");
			    		var  results = elts.text().replace('点评(','').replace(')',''); 
			    		return results
	    		});

	    		if (dpNums>=16) {
	    			var pageDP=Math.ceil(dpNums/15); 
	    			//console.log(page);
	    			down_ID.push(page.replace(".html",pageDP));
	    			
	    		};
       			
   	 	});
	});

	casper.run(function() {
		console.log(down_ID);
	    this.echo('download Done').exit();
		
	});
};

function chaji_array(arr1,arr2){
    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
                        var flag = true;
                        for (var j = 0; j < arr2.length; j++) {
                            if (arr2[j] == arr1[i]) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            arr3.push(arr1[i]);
                        }
                    }
return arr3;
}
