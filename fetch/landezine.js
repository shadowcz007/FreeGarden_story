/* document.getElementById("cat1").innerHTML.replace(/<.*">|\(|\)|&nbsp;|<\/option>|[0-9]/g,'')
Australia
	Austria
	Belgium
	Brazil
	Canada
	Chile
	China
	Colombia
	Croatia
	Czech Republic
	Denmark
	Ecuador
	Estonia
	Finland
	France
	Germany
	Hungary
	Ireland
	Israel
	Italy
	Japan
	Korea
	Kuwait
	Latvia
	Lebanon
	Luxembourg
	Mexico
	Morocco
	New Zealand
	Norway
	Oslo
	Poland
	Portugal
	Romania
	Russia
	Scotland
	Singapore
	Slovenia
	South Africa
	Spain
	Sultanate of Oman
	Sweden
	Switzerland
	Taiwan
	Tasmania
	Thailand
	The Netherlands
	Turkey
	UK
	United Arab Emirates
	USA
	Alaska
	Arizona
	California
	Connecticut
	Florida
	Illinois
	Indiana
	Massachusetts
	Minnesota
	Missouri
	Nevada
	New Hampshire
	New York
	Ohio
	Oregon
	Pennsylvania
	Philadelphia
	Tennessee
	Texas
	Virginia
	Washington

*/
var _ = require("lodash"); 
module.exports = function(opts){  
    //     
    //   
    //var list=[];
      console.log(opts.url); 
    var page=["Australia","Austria","Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech-Republic","Denmark","Ecuador","Estonia","Finland","France","Germany","Hungary","Ireland","Israel","Italy","Japan","Korea","Kuwait","Latvia","Lebanon","Luxembourg","Mexico","Morocco","New-Zealand","Norway","Oslo","Poland","Portugal","Romania","Russia","Scotland","Singapore","Slovenia","South-Africa","Spain","Sultanate of Oman","Sweden","Switzerland","Taiwan","Tasmania","Thailand","The-Netherlands","Turkey","UK","United-Arab-Emirates","USA","Alaska","Arizona","California","Connecticut","Florida","Illinois","Indiana","Massachusetts","Minnesota","Missouri","Nevada","New-Hampshire","New-York","Ohio","Oregon","Pennsylvania","Philadelphia","Tennessee","Texas","Virginia","Washington"];
    var pageUrl=[]; //所有目录页面的连接
    var fetchList = []; 
   // var picList=[];
   var picUrls=[];
      //console.log(page); 
    //page
     
 


    this.then(function(){  
 		_.forEach(page, function(pageNum) {
            
            pageUrl.push(opts.url+pageNum);
           
        }); 

        this.echo("pageUrl------------------------------------------- -> "); 
        this.echo("pageUrl length:"+pageUrl.length); 
        this.echo(pageUrl); 
        this.echo("pageUrl------------------------------------------- -> ");  

        var index = 0;  
        // 遍历列表中各个链接,去捕获消息
       // pageUrl=pageUrl.slice(0,5);

        _.forEach(pageUrl,function(li){ 
       
            this.thenOpen(li,function(li){ 
            	  console.log(li);

                var rst = this.evaluate(function(data){  
                  
                      
                    var item=document.getElementById("iwrapin").childNodes[5].children;
					var ut=[];	
					
					for(var i=0;i<=item.length-1;i++){
						 var title;
						 var urls;
						title=item[i].childNodes[1].innerText;
						urls=item[i].childNodes[1].childNodes[0].href;
						ut.push({
							"index":"item"+parseInt(i+1),
							"title":title,
							"url":urls
						});

						};
                		
                		var jsonstr=document.getElementById("iwrapin").childNodes[7].innerText.replace('var locations = ','');
						var jsonstr1=jsonstr.replace(/\s{1,}|\n/g,'').replace(',];',']').replace(/newgoogle.maps.LatLng\(/g,'').replace(/document.getElementById\(/g,'').replace(/\)}/g,'}');
						var jsonstr2=jsonstr1.replace(/latlng:/g,'"latlng":"').replace(/\),info/g,'","info"').replace(/'/g,'"');
						var jsonstr3=JSON.parse(jsonstr2);
                    //  return opts;用来调试


                    	for (var i = jsonstr3.length - 1; i >= 0; i--) {
                    		ut[i].latlng=jsonstr3[i].latlng;
                    	};

                    return {"country":li,
                    		"info":ut
                		}

                // 简单原始的对象li可以被注入   
                },li);  
        
                //console.log(rst.info);
                this.echo(index+": "+this.getCurrentUrl());  
                index++;  
                fetchList.push(rst);
             

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







/*




var LAlocations=[];

 for (var i = locations.length - 1; i >= 0; i--) {
        var url=locations[i].info.childNodes[1].innerHTML.match('[a-zA-z]+://[^\s]*\/.*\/">');
		var geo=locations[i].latlng.toJSON();
		var info=locations[i].info.childNodes[1].innerText;
		LAlocations.push({
			"url":url[0].replace('">',''),
			"lat":geo.lat,
			"lng":geo.lng,
			"info":info
		})
 };

 console.log(JSON.stringify(LAlocations));
 */