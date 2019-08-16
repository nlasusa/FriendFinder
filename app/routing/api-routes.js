// Link in Friends Data
var friends = require("../data/friends");

// Includes Two Routes
module.exports = function(app) {
  // GET route to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // POST route for incoming survey results & compatibility logic.
  app.post("/api/friends", function(req, res) {
    // Var to calculate diff of user's score and the score of each friend
    var totalDifference = 0;

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    //console log my user's score and info to make sure all is running ok 
    console.log("-------------------------------------");
    console.log("**NEW USER ADDED**");
    console.log("Name: " + userName);
    console.log("User Score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);

    console.log("Sum of new user score " + sum);
    console.log("-------------------------------------");

     //loop through the friends data array of objects to get each friends scores
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      //console log each friend's score and info to make sure all is running ok 
      var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      console.log("Total friend score " + bfriendScore);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log("Best match friend pt difference = " + totalDifference);
      console.log("-----------------------------------");

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
     
    }
    // The push method use to save user's data to the database
    friends.push(userData);
    console.log("According to your survey answers, your best match is:"); 
    console.log(bestMatch);
    //res.json method will return a JSON data with user's match 
    res.json(bestMatch);
  });
};