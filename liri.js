
require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var oper = (process.argv[2]);
var search = JSON.stringify(process.argv[3]);


var getTweets = function () {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'digitldocent',
        count: 10
    };
    console.log(params);
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error)
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }

    });
}


var getTunes = function () {
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: search,
        limit: 5
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
                console.log("Artist(s): " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 4));
                console.log("Song: " + JSON.stringify(data.tracks.items[0].album.name, null, 4));
            
        }
    });
}


var getMovie = function () {

    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("The title is: " + JSON.parse(body).Title);
            console.log("The movie's release date is: " + JSON.parse(body).Year);
            console.log("The IMDB Rating of this movie is: " + JSON.parse(body).imdbRating)
            console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was made in: " + JSON.parse(body).Country);
            console.log("The plot is: " + JSON.parse(body).Plot);
            console.log("The lead actors are: " + JSON.parse(body).Actors);
        } else if (response.statusCode != 200) {
            request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"),
                function (error, response, body) {
                    console.log("The title is: " + JSON.parse(body).Title);
                    console.log("The movie's release date is: " + JSON.parse(body).Year);
                    console.log("The IMDB Rating of this movie is: " + JSON.parse(body).imdbRating)
                    console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
                    console.log("The movie was made in: " + JSON.parse(body).Country);
                    console.log("The plot is: " + JSON.parse(body).Plot);
                    console.log("The lead actors are: " + JSON.parse(body).Actors);
                }
        }

    });
}

var doIt = function () {

        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            } else {
                console.log(data);
                
            }
        });

    }


  
if (oper === "my-tweets") {
    getTweets();
}

if (oper === "spotify-this-song") {
    getTunes();
} 

if (oper === "movie-this") {
    getMovie();
} 

if (oper === "do-what-it-says") {
    doIt();
} 



