//npm package require 
var path = require("path"); 

module.exports = function(app) {
    //get route
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname + "/../public/survey.html")); 
    });
    //use route 
    app.use(function(req,res){
        res.sendFile(path.join(__dirname + "/../public/home.html")); 
    });
}