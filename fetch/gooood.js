var _ = require("lodash");  
  
module.exports = function(opts){  
    //     
    //   
    //var list=[];
    var page=[];
    var pageUrl=[]; //所有目录页面的连接
    var fetchList = []; 
   // var picList=[];
   var picUrls=[];
    
    //page
    this.thenOpen(opts.url,function(){ 
       
       // console.log(opts.url);
       // console.log(this);

       var okk=this.evaluate(function() {

              var pageNumber=[];
              var pNhtml=document.getElementsByClassName('page-numbers');

              for (var i = pNhtml.length - 1; i >= 0; i--) {
                  pageNumber.push(pNhtml[i].innerText);
              };

              return pageNumber;    

        });

       var pMax=okk[0].replace('1/','');
       

       for (var i = pMax; i >= 1; i--) {
           page.push(i);
       };
        
        _.forEach(page, function(pageNum) {
             
            pageUrl.push(opts.url+'/page/'+pageNum);

        });
         
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
                  
                      var urls=[],titles=[],date=[];

                      var html=document.getElementsByClassName('entry-title');
                      var html2=document.getElementsByClassName('post-date');

                      for (var i = html.length - 1; i >= 0; i--) {

                          urls.push(html[i].firstChild.getAttribute("href"));
                          titles.push(html[i].innerText);
                          date.push(html2[i].innerText);

                      };  

                   
                    //  return opts;用来调试

                    return {  
                        'url':urls,  
                        'tilte':titles,
                        'date':date,
                        'pageNum':data  
                       // userName:userName ,  
                        //postTime:postTime,  
                        //imgUrls:imgUrls  
                    };  
                // 简单原始的对象li可以被注入   
                },li);  
        
  
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
        this.emit('saveToJson',fetchList);
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
