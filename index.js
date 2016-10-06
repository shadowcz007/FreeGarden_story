// 生成casper的实例  
// verbose默认值为false,即不输出来自phantom的信息(请记住,casper是基于phantom的)  
// logLevel表示何种级别输出信息,枚举为debug, info, warning, error  
var fs=require('fs');
var casper = require('casper').create({  
    verbose: true,  
    logLevel: 'erro'  
});  
  
  

  
// 读取命令行的参数  
var url = casper.cli.get("url"),  
    fetch = casper.cli.get("fetch"),
    category=casper.cli.get("category");  
  
  
 console.log(url);  
 console.log(fetch);  
 console.log(category);  
  
  
// casper.exit();  
  
  
var opts = {  
    url : casper.cli.get("url"),  
    fetch : casper.cli.get("fetch"),  
    category : casper.cli.get("category")  
};  
  
  
// 用来计算时间  
var startTime, endTime;  
  
  
// start中可以什么都不写  
casper.start();  
  
  
// 这句很重要,如果没有设置userAgent,则很多website会拒绝访问  
var userAgentString = 'Mozilla/5.0 (Macintosh; Intel Mac OS X)';  
casper.userAgent(userAgentString);  
  

  
// 记录开始时间  
casper.then(function(){startTime = + new Date;});  
  
  
// 使用fetch文件夹中相对应的方法去捕获信息  
casper.then(function(){  
    require("./fetch/"+fetch).call(casper,opts);  
});  

casper.on('saveToJson', function(data) {
    //console.log(data);
    
    var json=JSON.stringify(data,undefined,2); 

    fs.write('./data/'+fetch.replace('.js','')+'/'+category+data.index+'.json',json, 'w');

    this.echo('saveToJson');
});  
  
// 记录结束时间  
casper.then(function(){endTime = + new Date;});  
  
  
// 打印消耗的时间,单位分钟  
casper.then(function() {  
    var mins = Math.floor((endTime - startTime) / 60 / 100)/10;  
    this.echo(mins+" mins"); 
    
});  
 
 
  
casper.run();
