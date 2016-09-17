var express=require('express');
var fs=require('fs');
var superagent=require('superagent');
var eventproxy = require('eventproxy');
var cheerio=require('cheerio');



var app=express();

fs.readFile('data/shanghaiTUDI.json',function(err,data){  
    if(err) { throw err;  } 
       
  //   console.log(data);     
    var jsonObj=JSON.parse(data);  
    var items=[];
    
    for (var i = jsonObj.data.list.length - 1; i >= 0; i--) {
    	jsonObj.data.list[i];
    	items.push(
    		{
    			year:jsonObj.data.list[i].bianh,
    			mj:jsonObj.data.list[i].mianj,
    			area:jsonObj.data.list[i].dikmc,
    			type:jsonObj.data.list[i].guihyt
    		});
    	
    };

  // console.log(items);
});





/*

app.get('/jianshu',function(req,res,next){
superagent.get(urls).end((err,res)=>{
	cookie=res.headers['set-cookie'].join(',').match(/(_session_id=.+?);/)[1];
	console.log(cookie);
	app.post(urls)
	.set(base_headers)
	.set('Cookie',cookie)
	.type('form')
	.send(conf)
	.redirects(0)
	.end((err,res)=>{
		console.log(res+"okkk");
	})
})
});

*/
app.get('/1',function(req,res,next){
	
	
		
		
		
		superagent.get('http://weixin.sogou.com/weixin?type=1&query=Free_Garden').end(function(err,sres){
			
			if (err) {
				console.log(err);
				return next(err);
			};
			 var topicUrls = [];
		    var $ = cheerio.load(res.text);

		    $('.txt-box a').each(function (idx, element) {
		      var $element = $(element);
		      console.log($element);
		    
		    });
			
			

			
			res.send(items);	
		});
		
	
	
});

app.get('/',function(req,res,next){
	
	
		
		var url="https://www.asla.org/"+year[6]+"awards/index.html";
		console.log(url);
		superagent.get(url).end(function(err,sres){
			
			if (err) {
				console.log(err);
				return next(err);
			};
			var $=cheerio.load(sres.text);
			
			$('.caption a').each(function(idx,element){
				var $element=$(element);
				
				items.push({
					date:year[6],
					//location:$element.html().match(".+?<br>").replace("<br>",""),
					href:$element.attr('href'),
					company:$element.html()
					//img:$element.attr('share-pic')
				});
				console.log(items);
			});
			
			

			
			res.send(items);	
		});
		
	
	
});

app.listen(3000,function(){
	console.log('app is listening at port 3000');
});
