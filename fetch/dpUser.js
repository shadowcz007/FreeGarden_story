
var _ = require("lodash");  
console.log('ddfd');  
module.exports = function(opts){  
    //     
    //   
    //var list=[];
      console.log(opts); 
    var page=[];
    var pageUrl=[]; //所有目录页面的连接
    var fetchList = []; 
   // var picList=[];
   var picUrls=[];
   
    //page
    this.thenOpen(opts.url+opts.category+'/review_more',function(){ 
       
       // console.log(opts.url);
       console.log(opts.url+opts.category+'/review_more');


       pMax=this.evaluate(function() {

               var pgn=$('.PageMore').next().text();
              
              return  pgn   

        });
        
       if (opts.pg) {
          pMax=opts.pg;
       };

        if (!pMax) {
          pMax=10;
          console.log("请输入页码,默认设置为--------"+pMax);
        }else {
           console.log("页码正常获取，为--------"+pMax);
        };
       
    
       for (var i = pMax; i >= 1; i--) {

           page.push(i);
       };
        
        _.forEach(page, function(pageNum) {
            
            pageUrl.push(opts.url+opts.category+'/review_more?pageno='+pageNum);
           
        });
         
         //pageUrl=pageUrl.slice(0,2);
       //page=_.slice(okk.pageNumber,2);

       //var str=_.join(okk, '~');

      // console.log(page);

      // list.push({'url':okk.url,'page':page});

       //this.emit('saveToJson',{'url':okk.url,'pageNumber':pMax});


    }); 

    this.then(function(){  

        this.echo("pageUrl------------------------------------------- -> "); 
        this.echo("pageUrl length:"+pageUrl.length); 
        this.echo(pageUrl); 
        this.echo("pageUrl------------------------------------------- -> ");  
    }); 


    this.then(function(){  
 
        var index = 0;  
        // 遍历列表中各个链接,去捕获消息  
        _.each(pageUrl,function(li){  
            this.thenOpen(li,function(li){ 

                var rst = this.evaluate(function(data){  
                  
                      var urls=[];

                      var html=$('.comment-list').children().children().context;
                     
                      // return $(html.context[1]).attr('data-id');

                       for (var i = html.length - 1; i >= 0; i--) {
                          var dataid=$(html[i]).children().first().children().first().attr('user-id');
                           urls.push(dataid);
                       };

                 
                   
                    //  return opts;用来调试

                    return {"user_id":urls}

                // 简单原始的对象li可以被注入   
                },li);  
        
                console.log(rst);
                this.echo(index+": "+this.getCurrentUrl());  
                index++;  
                fetchList.push(rst);

               // picUrls.push(rst[1]);

            }.bind(this,li));  
        }.bind(this)); 
        
    }); 




//piclist

    

/*

    this.then(function(){ 
 console.log("-????????--------------"+picUrls[3]); 
 
        var index2 = 0;  
        // 遍历列表中各个链接,去捕获消息  
        _.each(picUrls,function(pu){  
            this.thenOpen(pu,function(pu){ 

  
                this.echo(index2+"详情页: "+this.getCurrentUrl());  
                index2++;  
                picList.push(rst2);  

            }.bind(this,pu));  
        }.bind(this));  

    });  

*/

    this.then(function(){  
        // save to file  
        var category = opts.category; 
        //picUrls=picUrls.join(",").split(","); 
        //this.emit('saveToJson',fetchList);
        this.emit('saveToJson',{index:0,category:category,list:fetchList});
    }); 

    


/*
    this.eachThen(opts.url+'/page/'+page,function(){ 
       
        console.log(opts.url);
       // console.log(this);

       var okk=this.evaluate(function() {

              var urls=[];

              var html=document.getElementsByClassName('entry-title');

              for (var i = html.length - 1; i >= 0; i--) {

                  urls.push(html[i].firstChild.getAttribute("href"));

              };

              return {'url':urls,'pageNumber':pageNumber};
              
            

        });
       var pMax=okk.pageNumber[0].replace('1/','');
        

       //var str=_.join(okk, '~');

       console.log(okk.pageNumber);

       this.emit('saveToJson',{'url':okk.url,'pageNumber':pMax});

    });  
  */
 
};  
