var _ = require("lodash");  
  
module.exports = function(opts){  
    //console.log(opts.link);
    console.log("-----------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPic.js");
    var pageUrl=opts.link; //所有目录页面的连接
    
  
    console.log(pageUrl); 
    //     
    //   
    //var list=[];
    var page=[];
  
    var fetchList = []; 
 

    this.then(function(){  
        
        var index = 0;  
        // 遍历列表中各个链接,去捕获消息  
        _.each(pageUrl,function(li){
            
            

        if (li) {
            this.thenOpen(li,function(li){ 
                console.log(li);
                var rst = this.evaluate(function(opts){  
                  
                      var urls=[],titles=[],date=[];

                      var html=document.getElementsByClassName('colorbox_gallery');
                      //var html2=document.getElementsByClassName('post-date');

                      for (var i = html.length - 1; i >= 0; i--) {

                          urls.push(html[i].firstChild.getAttribute("src"));
                          //titles.push(html[i].innerText);
                          //date.push(html2[i].innerText);

                      };  

                   
                     // return urls;用来调试

                    return {  
                        'picUrl':urls 
                        //'tilte':titles,
                        //'date':date,
                        //'pageNum':opts  
                       // userName:userName ,  
                        //postTime:postTime,  
                        //imgUrls:imgUrls  
                    };  
                // 简单原始的对象li可以被注入   
                },li);  
                
                // 把imgurl转成img的base64  
                 
                
                console.log("project----------------------------"); 
                var projectName=this.getCurrentUrl().replace(/.*\/|.htm/g,'');
                console.log(projectName);              
                this.then(function(){ 
                    //var imgCodes = []; 
                    var imgcounts=0; 
                    _.each(rst.picUrl,function(imgUrl){ 

                        this.thenOpen(imgUrl,function(imgUrl){  
                            //console.log(imgUrl);
                            imgcounts++;
                            this.download(imgUrl, "./data/gooood/"+opts.category+"/"+projectName+imgcounts+".png"); 
                            //var imgCode = this.base64encode(imgUrl);
                            //console.log(imgCode);  
                            //imgCodes.push(imgCode);  
                        }.bind(this,imgUrl));  
                    }.bind(this));                     
                });  
  
                this.echo(index+": "+this.getCurrentUrl());  
                index++;  
               // fetchList.push(rst);

            }.bind(this,li));
            };  
        }.bind(this)); 
        
    }); 

    this.then(function(){  
        // save to file  
        var category = opts.category;  
       console.log(fetchList);
      //  this.emit('saveToJson',{index:2,category:category,list:fetchList}); 
    });  


 
};  