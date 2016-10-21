var _ = require("lodash");  
  
module.exports = function(opts){  
     console.log(opts.link);
    console.log("-----------????????????????????");
    var pageUrl; //所有目录页面的连接
    
    pageUrl=opts.link;
    
    var userMoreInfo=[]; 
   // console.log(pageUrl); 
    
    //     
    //   
    //var list=[];
 pageUrl=pageUrl.slice(14200,14248);//爬取到这里

 //pageUrl=pageUrl.slice(14200,14248);//下载json
 
console.log("-----------14248??????????????----??????????????----??????????????----????????????????????");

console.log(pageUrl.length);

console.log("startform:"+pageUrl[0]);

console.log("endto:"+pageUrl[39]);
console.log("-----------??????????????----??????????????----??????????????----????????????????????");
    var page=[];
  
    var fetchList = []; 
 
    var strhttp="http://www.dianping.com/member/jsonp/userCarteData?memberId=";

    this.then(function(){  
        
        var index = 0;  
        // 遍历列表中各个链接,去捕获消息  
        _.each(pageUrl,function(li){
            var uid=li;
            var user_id;

            if (!opts.pic) {
                li=strhttp+li;
            }else{

                user_id=li.memberId;
                li=li.userFace;

            };
            
            //console.log(li); 
  
            //下载头像，用户的头像url
    /*
            this.thenOpen(li,function(li){ 
                if (opts.pic) {
                      
                     this.download(li, "./data/dpUser/userPic/"+user_id+".png");
                     console.log(user_id); 
                }else{
                     this.download(li, "./data/dpUser/user/"+uid+".json"); 
                     this.echo("download================"+uid);  
                };
               
                this.echo(index+": "+this.getCurrentUrl());  
                index++;  
 
            }.bind(this,li));

*/



               var liN;
                var ok2=true;
            
            if (!opts.pic && ok2) {
                    liN="http://www.dianping.com/member/"+li.replace(strhttp,'');
                console.log("liN"+liN);
                 this.thenOpen(liN,function(){ 
                    
                    var user_id1=liN.replace('http://www.dianping.com/member/','');
                    this.echo(user_id1);
                    var result=this.evaluate(function(){
                        var moreinfo1=$('#J_UMoreInfoD').text(),
                            moreinfo2=$('.user_atten').text(),
                            moreinfo3=$('#J_usertag').text();


                        if (moreinfo1) {
                            moreinfo1=moreinfo1.replace(/\t|\s{2,}/g,',').replace(',','');
                        }else{
                            moreinfo1="0";
                        };
                        if (moreinfo2) {
                            moreinfo2=moreinfo2.replace(/\s{1,}/g,'').replace(/.*粉丝|互动.*/g,'');

                        }else{
                            moreinfo2="0";
                        };
                        if (moreinfo3) {
                            moreinfo3=moreinfo3.replace(/\s{2,}/g,' ');
                        }else{
                            moreinfo3="0";
                        };

                        return [moreinfo1,moreinfo2,moreinfo3]                        
                        

                    });

                    this.echo(result);
                    userMoreInfo.push({
                        "user_id":user_id1,
                        "more_info":result[0],
                        "fans":result[1],
                        "tag":result[2]
                    });

                });};
             
        

          //  }.bind(this,li));
            
            
   

        }.bind(this)); 
        
    }); 

    this.then(function(){  
        // save to file  
        var category = opts.category; 
       // var cl=JSON.stringify(fetchList,["imgCodes"]);


      // console.log(cl);
      this.emit('saveToJson',{index:2,list:userMoreInfo}); 
    });  


 
};  