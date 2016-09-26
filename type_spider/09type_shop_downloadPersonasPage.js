
// 获得 用户页第一页 ,及获取用户所有的点评页，先通过id来下载第一页，然后，10type_getPersonasDP.js 来获取点评的数量，再输入获取

var casper = require('casper').create();

var origin="http://www.dianping.com/member/";

var originLast="/reviews";
 console.log(originLast);

//var jsonObj=require('./public/data/play_0.json');
var jsonObj=[{"user_id":"30923031","comments":"1"},{"user_id":"5974633","comments":"10"},{"user_id":"56916037","comments":"76"},{"user_id":"46362813","comments":"13"},{"user_id":"526697414","comments":"1"},{"user_id":"20833928","comments":"27"},{"user_id":"66756344","comments":"2"},{"user_id":"104532421","comments":"20"},{"user_id":"924676467","comments":"2"},{"user_id":"1056366585","comments":"1"},{"user_id":"5379090","comments":"1"},{"user_id":"7926367","comments":"8"},{"user_id":"29568202","comments":"5"},{"user_id":"40661949","comments":"4"},{"user_id":"107255344","comments":"3"},{"user_id":"49805736","comments":"10"},{"user_id":"62327962","comments":"10"},{"user_id":"829744081","comments":"13"},{"user_id":"31421740","comments":"11"},{"user_id":"11358854","comments":"6"}];


var _TYPE="keepfit";
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
 			    links.push( origin+jsonObj[i].user_id+originLast);
           
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
