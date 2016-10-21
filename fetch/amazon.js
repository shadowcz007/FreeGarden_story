var _ = require("lodash");  
  
module.exports = function(opts){  
console.log("---------");

console.log(opts.link[0][opts.site]);



    var page=opts.link[0][opts.site];
    var pageUrl=bestSellerHTML(page); //所有目录页面的连接
    var fetchList = []; 
  
   var picUrls=[];
  
    //page
    this.thenOpen(opts.url+opts.category+'/',function(){ 
       
       //console.log(opts.url+opts.category+'/');
       // console.log(this);

       var okk=this.evaluate(function() {

              var pageNumber=[];
              var pNhtml=document.getElementsByClassName('page-numbers');

              for (var i = pNhtml.length - 1; i >= 0; i--) {
                  pageNumber.push(pNhtml[i].innerText);
              };

              return pageNumber;    

        });
//console.log(okk);
       var pMax=okk[0].replace('1/','');
       

       for (var i = pMax; i >= 1; i--) {
           page.push(i);
       };
        
        _.forEach(page, function(pageNum) {
             
            pageUrl.push(opts.url+opts.category+'/page/'+pageNum);

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

    


//获取商品信息 bestSeller("5")

function bestSellerHTML(argument){
  var pageNum=[1,2,3,4,5],urls=[];  

  for (var i = pageNum.length - 1; i >= 0; i--) {
    var url="https://www.amazon.com/Best-Sellers-Clothing/zgbs/apparel/ref=zg_bs_apparel_pg_"+pageNum[i]+"?_encoding=UTF8&pg="+pageNum[i]+"&ajax=1&isAboveTheFold=";
    urls.push(url+0,url+1);
  };  

  return urls;
}
 
};  
