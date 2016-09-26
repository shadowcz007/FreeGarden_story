// 获得 评论页

var casper = require('casper').create();

var origin="http://www.dianping.com/shop/";

var originLast="/review_more?pageno=";
 console.log(originLast);

//var jsonObj=require('./public/data/play_0.json');
var jsonObj=[{"id":"1902862","comments":"840"}];


var _TYPE="keepfit";
var _ID=50;//页数50

var links=[];
var count=0;

var downNum=0;

var down_ID=[];

for (var i = jsonObj.length - 1; i >= 0; i--) {
        
    for (var j = Math.ceil(jsonObj[i].comments/20); j >= 1; j--) {
            
           count++;

         };
    
   
};



for (var i = jsonObj.length - 1; i >= 0; i--) {
        
    for (var j =Math.ceil(jsonObj[i].comments/20); j >= 1; j--) {
           count--; 
           links.push( origin+jsonObj[i].id+originLast+j+'p.html');
           if (count<=0) {
                console.log("url准备好"+links.length+"个");

                next();
           };
         };
    
   
};




function next(){
	casper.start().each(links, function(self, link) {

    	self.thenOpen(link, function() {
    			console.log(this.getCurrentUrl());
    			var page=this.getCurrentUrl().replace(origin,'').replace(originLast,'=');
    			downNum++;
    			down_ID.push(page.replace(".html",""));

    			console.log(page+"-----------第"+downNum);
				this.download(link,"./"+_TYPE+"_page/"+page); 
       
   	 	});
	});

	casper.run(function() {
		var vsResult=chaji_array(down_ID,_ID);
	    this.echo('download Done.but'+vsResult).exit();

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
