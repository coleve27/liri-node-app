//read and set any environment variables with dotenv package
require("dotenv").config();

//dependency for inquirer, twitter, ombd, spotify, request npm packages
var keys = require('./keys.js');

var inquirer = require("inquirer");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');



//store key.js information  in a variable??
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var action = process.argv[2];
// either the name of a song, or movie
var value = process.argv[3];

// switch case for whatever command the user enters
switch(action){
    case 'my-tweets':
        showTweets();
    break;

    case 'spotify-this-song':
        spotifySong();
    break;

    case 'movie-this':
        movie();
    break;

    case 'do-what-it-says':
        doit();
    break;

    default:
    break;
}

function showTweets(){
  // twitter keys variable, referencing the keys file and export line
  var twitterKeys = require('./keys.js').twitterKeys;
  // npm package
  var Twitter = require('twitter');
  // assigning the keys
  // var client = new Twitter ({
	// 	consumer_key: twitterKeys.consumer_key,
	// 	consumer_secret: twitterKeys.consumer_secret,
	// 	access_token_key: twitterKeys.access_token_key,
	// 	access_token_secret: twitterKeys.access_token_secret

  // what to search for
  var params = {screen_name: 'JacobyJacoby18'};
  //console.log(params);

  // using the npm
  client.get('statuses/user_timeline', params, function(error, tweets) {
    //if error, log it, else log the tweets
    if (error) {
      console.log(error);
    }
    else {
      // for loop to run through the length of my account's tweets
      console.log("\n/////////////////TWEET ME////////////////\n");
      for(i=0; i< tweets.length; i++){
        // adds a number and dot before to show order
        console.log((i+1) + ". " + tweets[i].text);
      }
    }
  });
}


  //SPOTIFY FUNCTION

    function spotifySong() {
        spotify.search({
            'type': 'track',
            'query': value || 'ace of base the sign'
        }, function (error, data) {
            if (error) {
                console.log(error + "\n");
            }
            else {
                    console.log('')
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
                    console.log('')
                    console.log('Song Name: ' + data.tracks.items[0].name);
                    console.log('')
                    console.log('Preview URL: ' + data.tracks.items[0].preview_url);
                    console.log('')
                    console.log('Album Name: ' + data.tracks.items[0].album.name);
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                    console.log('')
            }
        });
    }

    //OMDB FUNCTION
    function movie() {
      //npm package
    // var request = require('request');
    // set movie name equal to user input
    var movieName = value;
    var movieDefault = "Mr.Nobody";
    // search url variable
    var url = 'http://www.omdbapi.com/?i=tt3896198&apikey=143aa98f&t=' + movieName + '&y=&plot=short&r=json';
    var urlDefault = 'http://www.omdbapi.com/i=tt3896198&apikey=143aa98f&?t=' + movieDefault + '&y=&plot=short&r=json';

     // if the user entered a title, search that
     if (movieName != null) {
        request(url, function (error, response, body) {
          // If the request is successful
          if (!error && response.statusCode == 200) {
                  // Parse the body and pull for each attribute
                  console.log("\n/////////////////MOVIE THIS////////////////\n")
                  console.log("Title: " + value);
                  console.log("Year: " + JSON.parse(body)["Year"]);
                  console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                  console.log("Country of Production: " + JSON.parse(body)["Country"]);
                  console.log("Language: " + JSON.parse(body)["Language"]);
                  console.log("Plot: " + JSON.parse(body)["Plot"]);
                  console.log("Actors: " + JSON.parse(body)["Actors"]);
                };//end of if
          });//end of request

        // if user doesn't enter a value, value will be set to Mr.Nobody
        } else {
          request(urlDefault, function (error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode == 200) {
                  console.log("Title: " + movieDefault);
                  console.log("Year: " + JSON.parse(body)["Year"]);
                  console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                  console.log("Country of Production: " + JSON.parse(body)["Country"]);
                  console.log("Language: " + JSON.parse(body)["Language"]);
                  console.log("Plot: " + JSON.parse(body)["Plot"]);
                  console.log("Actors: " + JSON.parse(body)["Actors"]);
                };//end of if
          });//end of request
        } // end of else
      } // end of movie()


  
