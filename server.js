var request = require ('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "https://www.reddit.com/top/";

request(url , function(error,response,body){
    
     if (error) {
       console.log("Error: " + error);
     }
     console.log("Status code: " + response.statusCode);

     var $ = cheerio.load(body);

     $("div#siteTable > div.link").each(function(index) {
       var title = $(this)
         .find("p.title > a.title")
         .text()
         .trim();
       var score = $(this)
         .find("div.score.unvoted")
         .text()
         .trim();
       var user = $(this)
         .find("a.author")
         .text()
         .trim();
       console.log("Title: " + title);
       console.log("Score: " + score);
       console.log("User: " + user);
       fs.appendFileSync("reddit.txt", "Title: "+title + "\n" + "Score: "+score + "\n" + "UserName: "+user + "\n");
     });
});