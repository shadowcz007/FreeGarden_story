var express=require('express');
var fs=require('fs');//读写文件
var superagent=require('superagent');//http
var eventproxy = require('eventproxy');//事件控制，多个网页爬取
var cheerio=require('cheerio');//解析html
var url=require('url');//


var app=express();
var items=[];
var content=[];
var ep =new eventproxy();
ep.fail(function (err) {
  throw err;
});
var items=[];
fs.readFile('data/-test.json',function(err,data){  
    if(err) { throw err;  } 
    var jsonObj=JSON.parse(data); 
    for (var i = jsonObj.data.list.length - 1; i >= 0; i--) {
    	var str="http://www.shgtj.gov.cn/i/tdsc/crdk/?id=";
    	var urlobj=str+jsonObj.data.list[i].bianh;
    	items.push(urlobj);
    };
    console.log(items); 

    var ep = new eventproxy();
   
	ep.after('topic_html', items.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0];
      //  console.log(topics);
        if(!topicPair[1]){

        	return({})

        }
        var data = JSON.parse(topicPair[1]).data;
       	
       	return({id:topicUrl.replace('http://www.shgtj.gov.cn/i/tdsc/crdk/?id=',''),
       			data:data
       		})

       /* var $ = cheerio.load(Html);
        
        console.log(Html);
       
        return ({
          zongbj: $('#zongbj').html(),
          zongbr: $('#zongbr').text(),
          
        });
		*/
      });

      console.log('final:');
      fs.writeFile("data/shanghaiTUDIJG.json",JSON.stringify(topics),function(err){
    if(!err)
    console.log("写入成功！")
})
      console.log(topics);
    });

    items.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          console.log('fetch ' + topicUrl + ' successful');
          
          	ep.emit('topic_html', [topicUrl, res.text]);
         
          
        });
    });




      
});







  








  
    
    
    
   


	











/*

app.get('/jianshu',function(req,res,next){
superagent.get(items).end((err,res)=>{
	cookie=res.headers['set-cookie'].join(',').match(/(_session_id=.+?);/)[1];
	console.log(cookie);
	app.post(items)
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
			 var topicitems = [];
		    var $ = cheerio.load(sres.text);

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
