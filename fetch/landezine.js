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