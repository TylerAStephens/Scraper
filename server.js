// npm packages
var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require("request");
var cheerio = require("cheerio");


// Port
var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();


mongoose.Promise = Promise;
// creating database
mongoose.connect("mongodb://localhost/redditScrape", {
  useMongoClient: true
});

// Requesting redit URL link to be scraped
request('https://www.reddit.com/', function(err, resp, html) {
if(!err && resp.statusCode == 200){
// Load in HTML  
  var $ = cheerio.load(html);
// Load in section from p class title 
  $('p.title').each(function(i, element){
// Save title, link, and image link   
  var title = $(element).text();    
  var link = $(element).children().attr("href");
 // var imgLink = $(element).prevAll("a.thumbnail").find("img").attr("href");
  console.log("title " + title);
  console.log("link " + link);

// if statement to keep from pushing data to database without all required fields
  if(title && link){
    // pushing to database
    db.article.create({
      title: title,
      link: link,
     // imgLink: imgLink
    });
   
  }  
});
// end of response  
}
// end of scrape request
});



//Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
