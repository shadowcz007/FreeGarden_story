var _ = require("lodash");  
  
module.exports = function(opts){  
    //console.log(opts.link);
    console.log("-----------????????????????????");
    var pageUrl=opts.link; //所有目录页面的连接
    
  
    console.log(pageUrl); 
    
    //     
    //   
    //var list=[];
   // pageUrl=pageUrl.slice(0,2);
 console.log(pageUrl.length);
    var page=[];
  
    var fetchList = []; 
 
    var strhttp="http://www.dianping.com/member/jsonp/userCarteData?memberId=";

    this.then(function(){  
        
        var index = 0;  
        // 遍历列表中各个链接,去捕获消息  
        _.each(pageUrl,function(li){
            var uid=li;
            li=strhttp+li;
            console.log(li);  
            this.thenOpen(li,function(li){ 

                this.download(li, "./data/dpUser/user/"+uid); 
              /*  
                // 把imgurl转成img的base64                
                this.then(function(){ 

                    var imgCodes = [];  
                    _.each(rst.picUrl,function(imgUrl){ 

                        this.thenOpen(imgUrl,function(imgUrl){  
                            //console.log(imgUrl);
                            var imgCode = this.base64encode(imgUrl);
                            //console.log(imgCode);  
                            imgCodes.push(imgCode);  
                        }.bind(this,imgUrl));  
                    }.bind(this)); 

                    this.then(function(){  
                        rst.imgCodes = imgCodes; 
                        //this.emit('saveToJson',{index:2,num:index,category:category,rst}); 
                    });  
                });  
  */
                this.echo(index+": "+this.getCurrentUrl());  
                index++;  
               // fetchList.push(rst);

            }.bind(this,li));  
        }.bind(this)); 
        
    }); 

    this.then(function(){  
        // save to file  
        var category = opts.category; 
       // var cl=JSON.stringify(fetchList,["imgCodes"]);


      // console.log(cl);
      //  this.emit('saveToJson',{index:2,list:JSON.parse(cl)}); 
    });  


 
};  