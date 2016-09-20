var casper = require('casper').create();

var links=["url1","url2","url3"];

casper.start().each(links, function(self, link) {
    self.thenOpen(link, function() {
    			
				this.download(link, this.getCurrentUrl().replace('http','')+'.html');   

       
    });
});

casper.run(function() {
    this.echo('Done.').exit();
});
