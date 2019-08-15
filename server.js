// npm packages required
var express = require("express"); 
var bodyParser = require("body-parser");
var path = require ("path");

//port setup
var app = express(); 
var port = process.env.PORT || 3000; 

//add body parser structure 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.text()); 
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//apply routes
app.use(express.static("app/public"));

//api routes
require("./app/routing/api-routes")(app);
require("./app/routing/html-routes")(app);

//listening to port
app.listen(port, () => console.log("Listening on port %s", port)); 
