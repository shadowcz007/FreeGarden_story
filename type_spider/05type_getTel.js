////第5步 tel,保存为type_tel.json,原文件缺失的清单type_erro_id.json
// 

// 
const fs=require('fs');//读写文件
var cheerio=require('cheerio');//解析html
var items=[];

var count=1050;//先了解共有几组数据 count:0表示一个数据
var _id=["1902862","43616597","66860473","19670205","24633052","18053835","27311183","17869659","3056302","522398","5224264","17846611","512075","13703446","1796314","13764057","32883444","22350718","19592696","6096920","32638191","3891889","19416247","20731524","27198912","32462758","19450319","5374910","22827687","2693254","24608007","4131721","5306307","17957718","21117786","15909534","21670471","8995198","2383222","23572426","6043927","14892760","21171513","4272562","2382304","500407","19011222","2939686","3132361","22162457","500714","18499724","5275754","23895008","3876475","2786317","9964281","6015312","20953235","3292306","8353544","11566615","18397825","17940227","9040316","18326475","5183684","33599276","2878744","2420104","5149335","2650585","2640982","5391580","66104376","15928431","1891444","500346","3311626","5371439","2103985","21362798","6116539","6136444","2491156","4674001","12592198","58490499","2795311","37942165","21083941","5411868","3441013","2220496","13665974","4538396","13879004","21090022","6007901","2285251","4092412","4500491","1966345","3500710","2060188","5588943","6225640","15117629","5743843","18325667","45829444","58400820","18220202","23481472","10343688","24337026","22675929","24011289","22736557","19170415","21869582","17889474","20685891","19145913","21172060","5239407","2459488","52348336","23584188","8020875","23912021","18685223","13803854","9359347","6357438","67112164","18498945","27314032","26979034","517014","8920228","17180012","27148257","23214020","22163464","13799609","24899623","23594892","13665834","21007122","66381841","65594166","23595507","27511239","5325201","14903180","2027095","4135811","8977492","8004243","4133350","2034064","2943646","24096337","18377708","4621391","18814971","21413229","2211082","63057639","23740568","17679013","18080179","18357630","4269890","22517173","4285905","9322234","2692024","8693057","21049219","9462534","3370339","4713472","43557139","67439680","500617","17931142","23035634","9976057"];

var _telNo=1;
//tel 1
var _TYPE="keepfit_shop_1902862";
var path=[];
var erro_id=[];

for (var i = _id.length - 1; i >= 0; i--) {

	 path.push("./"+_TYPE+"_page/"+_id[i]+".html");
	
	
	
};

 


for (var i = path.length - 1; i >= 0; i--) {
	 
	


	try {
    	var htmlfile=fs.readFileSync(path[i]);
    	
		var url_id=path[i].replace('./'+_TYPE+'_page/','').replace('.html','');
		var $ = cheerio.load(htmlfile);

		//var tel=$('.phone').text();
		var tel=$('.tel').text();
		
		//var tel=$('.J_phone .phone').text();
		//console.log(i);
		items.push({
			"id":url_id,
			"tel": tel

		});
		    
		  // console.log("00"+items.length); 

	} catch (err) {
		console.log(path[i]+"-------------------------------------------------");
		erro_id.push(path[i].replace('./'+_TYPE+'_page/','').replace('.html',''));
	    console.error(err);
	}

	 
	fs.writeFile("./public/data/"+_TYPE+"_tel"+_telNo+".json",JSON.stringify(items,null,2),function(err){
					    if(!err)
					    console.log("done!!!!!!"+items.length)
					});
	fs.writeFile("./public/data/"+_TYPE+"_erro_id.json",JSON.stringify(erro_id),function(err){
					    if(!err)
					    console.log("erro!!!!!!"+erro_id.length)
					});

};



