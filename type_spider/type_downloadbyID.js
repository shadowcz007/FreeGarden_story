var casper = require('casper').create();

var origin="http://m.dianping.com/shop/";

var _ID=[];//下载的url数组

var links=[];

var count=_ID.length;

var downNum=0;

var down_ID=[];

for (var i = _ID.length-1; i >= 0; i--) {
	links.push(origin+_ID[i]);
	count--;
	if (count<=0) {
		
		console.log("url准备好"+links.length+"个");
		next();
	};
};

function next(){
	casper.start().each(links, function(self, link) {
    	self.thenOpen(link, function() {
    			var page=this.getCurrentUrl().replace(origin,'')+'.html';
    			downNum++;
    			down_ID.push(page.replace(".html",""));

    			console.log(page+"-----------第"+downNum);
				this.download(link, page); 
       
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
